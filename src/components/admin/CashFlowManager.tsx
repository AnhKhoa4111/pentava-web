import { useCallback, useEffect, useRef, useState } from "react"
import {
  adminCashflowService,
  GATEWAY_CONFIG,
  type CashFlowFilters,
  type CashFlowStatus,
  type CashFlowSummary,
  type CashFlowTransaction,
  type GatewayConfigInfo,
} from "../../services/adminCashflowService"
import CashFlowStatsCards from "./cashflow/CashFlowStatsCards"
import CashFlowTable from "./cashflow/CashFlowTable"
import CashFlowGatewayTab from "./cashflow/CashFlowGatewayTab"
import CashFlowDetailModal from "./cashflow/CashFlowDetailModal"

function fmtVnd(n: number) {
  return n.toLocaleString("vi-VN") + " ₫"
}

function fmtRuby(n: number) {
  return n.toLocaleString("vi-VN") + " 💎"
}

const TYPE_LABEL: Record<string, string> = {
  TOPUP_RUBY: "Nạp Ruby",
  SUBSCRIPTION_PLAN: "Gói cước",
  SHOP_PURCHASE: "Mua Shop",
}

type Tab = "overview" | "inflow" | "outflow" | "gateway"

export default function CashFlowManager() {
  const [activeTab, setActiveTab] = useState<Tab>("overview")
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<CashFlowSummary | null>(null)
  const [transactions, setTransactions] = useState<CashFlowTransaction[]>([])
  const [gatewayConfig, setGatewayConfig] = useState<GatewayConfigInfo>(GATEWAY_CONFIG)

  // Filters
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"ALL" | CashFlowStatus>("ALL")
  const [dateFilter, setDateFilter] = useState<"ALL" | "TODAY" | "7DAYS" | "30DAYS">("ALL")
  const [typeFilter, setTypeFilter] = useState<
    "ALL" | "TOPUP_RUBY" | "SUBSCRIPTION_PLAN" | "SHOP_PURCHASE"
  >("ALL")

  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Realtime SSE state & recent event log
  const [realtimeStatus, setRealtimeStatus] = useState<"CONNECTING" | "CONNECTED" | "ERROR">(
    "CONNECTING"
  )
  const [newTxCode, setNewTxCode] = useState<string | null>(null)
  const [latestRealtimeEvent, setLatestRealtimeEvent] = useState<string | null>(null)

  // Modal Detail & Approve
  const [selectedTx, setSelectedTx] = useState<CashFlowTransaction | null>(null)
  const [isApproving, setIsApproving] = useState(false)

  // Toast
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const showToast = useCallback((type: "success" | "error", text: string) => {
    setToast({ type, text })
    setTimeout(() => setToast(null), 5000)
  }, [])

  // Load transactions
  const fetchTransactions = useCallback(
    async (filters?: CashFlowFilters) => {
      try {
        const data = await adminCashflowService.getTransactions(filters)
        setTransactions(data)
      } catch (err) {
        showToast("error", err instanceof Error ? err.message : "Lỗi tải danh sách giao dịch")
      }
    },
    [showToast]
  )

  // Load KPI summary
  const fetchSummary = useCallback(async () => {
    try {
      const data = await adminCashflowService.getCashFlowSummary()
      setSummary(data)
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Lỗi tải KPI sổ quỹ")
    }
  }, [showToast])

  // Initial load & SSE Realtime Stream
  useEffect(() => {
    const init = async () => {
      setLoading(true)
      const [, , gw] = await Promise.all([
        fetchSummary(),
        fetchTransactions(),
        adminCashflowService.getGatewayConfig(),
      ])
      setGatewayConfig(gw)
      setLoading(false)
    }
    void init()

    const unsub = adminCashflowService.subscribeCashflowStream(
      (newTx) => {
        setTransactions((prev) => {
          const idx = prev.findIndex((t) => t.transactionCode === newTx.transactionCode)
          if (idx >= 0) {
            const next = [...prev]
            next[idx] = newTx
            return next
          }
          return [newTx, ...prev]
        })

        setNewTxCode(newTx.transactionCode)
        setTimeout(() => setNewTxCode((c) => (c === newTx.transactionCode ? null : c)), 8000)

        void fetchSummary()

        const typeLabel = TYPE_LABEL[newTx.type] ?? newTx.type
        const amtLabel =
          newTx.direction === "IN" ? fmtVnd(newTx.amountVnd) : fmtRuby(newTx.rubyAmount)
        const eventMsg = `[${new Date().toLocaleTimeString("vi-VN")}] ${
          newTx.status === "SUCCESS" ? "✅ Khớp lệnh thành công" : "⏳ Đơn mới khởi tạo"
        }: ${typeLabel} (${amtLabel}) — Mã ${newTx.transactionCode} (${
          newTx.userName ?? `User #${newTx.userId}`
        })`

        setLatestRealtimeEvent(eventMsg)
        showToast("success", `🔔 REALTIME: ${eventMsg}`)
      },
      (s) => setRealtimeStatus(s)
    )
    return () => unsub()
  }, [fetchSummary, fetchTransactions, showToast])

  // Re-fetch on filter change
  useEffect(() => {
    if (activeTab === "gateway") return
    const direction: "ALL" | "IN" | "OUT" =
      activeTab === "inflow" ? "IN" : activeTab === "outflow" ? "OUT" : "ALL"

    const filters: CashFlowFilters = {
      direction,
      type: typeFilter,
      status: statusFilter,
      dateRange: dateFilter,
      searchTerm,
    }

    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current)
    searchDebounceRef.current = setTimeout(
      () => {
        void fetchTransactions(filters)
      },
      searchTerm ? 350 : 0
    )

    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current)
    }
  }, [activeTab, typeFilter, statusFilter, dateFilter, searchTerm, fetchTransactions])

  // Approve PENDING transaction
  const handleApprove = async (code: string) => {
    setIsApproving(true)
    try {
      const updated = await adminCashflowService.approveTransaction(code)
      setTransactions((prev) =>
        prev.map((t) => (t.transactionCode === updated.transactionCode ? updated : t))
      )
      if (selectedTx?.transactionCode === updated.transactionCode) setSelectedTx(updated)
      await fetchSummary()
      showToast("success", `Đã duyệt & khớp tiền giao dịch ${code} thành công!`)
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Duyệt giao dịch thất bại")
    } finally {
      setIsApproving(false)
    }
  }

  const inflowTxs = transactions.filter((t) => t.direction === "IN")
  const outflowTxs = transactions.filter((t) => t.direction === "OUT")
  const pendingTxs = transactions.filter((t) => t.status === "PENDING")

  const TABS: { id: Tab; label: string; icon: string; count?: number }[] = [
    { id: "overview", label: "Sổ quỹ tổng hợp", icon: "list_alt", count: transactions.length },
    { id: "inflow", label: "Tiền vào (Thu)", icon: "south_west", count: inflowTxs.length },
    { id: "outflow", label: "Tiêu thụ Ruby", icon: "north_east", count: outflowTxs.length },
    { id: "gateway", label: "Cổng SePay & Test", icon: "qr_code_scanner" },
  ]

  const statusMeta = {
    CONNECTING: { dot: "bg-amber-400 animate-pulse", text: "Đang kết nối SSE..." },
    CONNECTED: { dot: "bg-[#3A8157]", text: "Realtime Live (SSE)" },
    ERROR: { dot: "bg-red-500", text: "Ngắt kết nối SSE" },
  }[realtimeStatus]

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed right-6 top-24 z-50 flex max-w-md items-center gap-3 rounded-2xl border-2 px-5 py-4 shadow-xl transition-all ${
            toast.type === "success"
              ? "border-[#3A8157] bg-white text-[#3A8157]"
              : "border-red-500 bg-white text-red-600"
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">
            {toast.type === "success" ? "notifications_active" : "error"}
          </span>
          <span className="text-xs font-extrabold leading-snug">{toast.text}</span>
        </div>
      )}

      {/* KPI Stats Cards */}
      <CashFlowStatsCards summary={summary} />

      {/* Live SSE Banner nếu vừa nhận được log realtime */}
      {latestRealtimeEvent && (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-300 bg-[#ECFDF5] px-4 py-2.5 text-xs font-bold text-emerald-900">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 animate-ping rounded-full bg-[#3A8157]" />
            <span>Log Realtime mới nhất: {latestRealtimeEvent}</span>
          </div>
          <button
            type="button"
            onClick={() => setLatestRealtimeEvent(null)}
            className="text-emerald-700 hover:underline"
          >
            Ẩn
          </button>
        </div>
      )}

      {/* Main Container — Đồng bộ 100% lề trục X với UserManager & ContactManager */}
      <div className="rounded-[24px] border border-[#D9D9D9] bg-white p-5 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] md:p-6">
        {/* Header Actions */}
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="material-symbols-outlined text-[26px] text-[#3A8157]">
                payments
              </span>
              <h2 className="text-2xl font-extrabold text-black">Quản lý Dòng tiền & Sổ quỹ</h2>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D9D9D9] bg-[#F7FAFF] px-3 py-1 text-[11px] font-bold text-[#727272]">
                <span className={`h-2 w-2 rounded-full ${statusMeta.dot}`} />
                {statusMeta.text}
              </span>
              {pendingTxs.length > 0 && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-extrabold text-amber-800">
                  ⏳ {pendingTxs.length} chờ duyệt
                </span>
              )}
            </div>
            <p className="mt-1 text-xs font-semibold text-[#727272]">
              Đồng bộ thời gian thực qua Server-Sent Events (SSE) khi người dùng mua gói cước hoặc nạp Ruby SePay.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => adminCashflowService.exportCsv(transactions)}
              className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-[#3A8157] bg-white px-4 text-xs font-extrabold text-[#3A8157] transition-colors hover:bg-[#E8F3EC]"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Xuất CSV
            </button>

            <button
              type="button"
              onClick={() => {
                void fetchSummary()
                void fetchTransactions()
              }}
              disabled={loading}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#3A8157] px-4 text-xs font-extrabold uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_#FFC857] transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
            >
              <span className={`material-symbols-outlined text-[18px] ${loading ? "animate-spin" : ""}`}>
                refresh
              </span>
              Làm mới
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-5 flex flex-wrap gap-2 border-b border-[#EEF1F5] pb-3">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-extrabold transition ${
                activeTab === tab.id
                  ? "bg-[#3A8157] text-white shadow-sm"
                  : "bg-[#F7FAFF] text-[#727272] hover:text-black"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-black ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-[#E5E7EB] text-[#374151]"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Filter Bar (Hiển thị cho các tab danh sách giao dịch) */}
        {activeTab !== "gateway" && (
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-4 top-3 text-[20px] text-[#727272]">
                search
              </span>
              <input
                type="text"
                placeholder="Tìm mã GD (PENTAVA...), tên khách hàng, email, mã SePay..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 w-full rounded-full border border-[#D9D9D9] bg-[#F7FAFF] pl-11 pr-4 text-sm font-semibold outline-none transition-colors focus:border-[#3A8157] focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {activeTab === "overview" && (
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
                  className="h-10 rounded-full border border-[#D9D9D9] bg-white px-3.5 text-xs font-bold text-[#111827] outline-none focus:border-[#3A8157]"
                >
                  <option value="ALL">Loại: Tất cả</option>
                  <option value="TOPUP_RUBY">Nạp Ruby</option>
                  <option value="SUBSCRIPTION_PLAN">Gói cước</option>
                  <option value="SHOP_PURCHASE">Mua Shop</option>
                </select>
              )}

              {activeTab === "inflow" && (
                <select
                  value={typeFilter === "SHOP_PURCHASE" ? "ALL" : typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
                  className="h-10 rounded-full border border-[#D9D9D9] bg-white px-3.5 text-xs font-bold text-[#111827] outline-none focus:border-[#3A8157]"
                >
                  <option value="ALL">Nguồn thu: Tất cả</option>
                  <option value="TOPUP_RUBY">Nạp Ruby (VietQR)</option>
                  <option value="SUBSCRIPTION_PLAN">Gói cước (VietQR)</option>
                </select>
              )}

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="h-10 rounded-full border border-[#D9D9D9] bg-white px-3.5 text-xs font-bold text-[#111827] outline-none focus:border-[#3A8157]"
              >
                <option value="ALL">Trạng thái: Tất cả</option>
                <option value="SUCCESS">Thành công</option>
                <option value="PENDING">Chờ duyệt</option>
                <option value="FAILED">Thất bại</option>
              </select>

              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as typeof dateFilter)}
                className="h-10 rounded-full border border-[#D9D9D9] bg-white px-3.5 text-xs font-bold text-[#111827] outline-none focus:border-[#3A8157]"
              >
                <option value="ALL">Thời gian: Tất cả</option>
                <option value="TODAY">Hôm nay</option>
                <option value="7DAYS">7 ngày qua</option>
                <option value="30DAYS">30 ngày qua</option>
              </select>

              {(typeFilter !== "ALL" ||
                statusFilter !== "ALL" ||
                dateFilter !== "ALL" ||
                Boolean(searchTerm.trim())) && (
                <button
                  type="button"
                  onClick={() => {
                    setTypeFilter("ALL")
                    setStatusFilter("ALL")
                    setDateFilter("ALL")
                    setSearchTerm("")
                  }}
                  className="px-2 text-xs font-bold text-red-500 hover:underline"
                >
                  Đặt lại
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab Body */}
        {loading ? (
          <div className="py-16 text-center text-[#727272]">
            <div className="inline-flex items-center gap-2">
              <span className="material-symbols-outlined animate-spin text-[#3A8157]">
                progress_activity
              </span>
              <span className="text-sm font-bold">Đang tải sổ quỹ dòng tiền...</span>
            </div>
          </div>
        ) : activeTab === "gateway" ? (
          <CashFlowGatewayTab
            config={gatewayConfig}
            onShowToast={showToast}
            onSwitchToOverview={() => setActiveTab("overview")}
          />
        ) : (
          <CashFlowTable
            rows={
              activeTab === "inflow"
                ? inflowTxs
                : activeTab === "outflow"
                  ? outflowTxs
                  : transactions
            }
            newTxCode={newTxCode}
            onSelectTx={setSelectedTx}
            onQuickApprove={handleApprove}
            isApproving={isApproving}
          />
        )}
      </div>

      {/* Transaction Detail Modal */}
      {selectedTx && (
        <CashFlowDetailModal
          tx={selectedTx}
          isApproving={isApproving}
          onClose={() => setSelectedTx(null)}
          onApprove={handleApprove}
        />
      )}
    </div>
  )
}
