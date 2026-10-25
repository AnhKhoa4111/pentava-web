import { useEffect, useMemo, useState } from "react"
import {
  adminCashflowService,
  type CashFlowStatus,
  type CashFlowTransaction,
  type CashFlowSummary,
  type GatewayConfigInfo,
} from "../../services/adminCashflowService"

type ActiveTab = "overview" | "inflow" | "outflow" | "gateway"

function formatVnd(amount: number): string {
  return `${amount.toLocaleString("vi-VN")} đ`
}

function formatRuby(amount: number): string {
  return `${amount.toLocaleString("vi-VN")} 💎`
}

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "—"
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return dateStr
  }
}

export default function CashFlowManager() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview")
  const [loading, setLoading] = useState(true)

  // Data
  const [summary, setSummary] = useState<CashFlowSummary | null>(null)
  const [transactions, setTransactions] = useState<CashFlowTransaction[]>([])
  const [gatewayConfig, setGatewayConfig] = useState<GatewayConfigInfo | null>(null)

  // Filters for Inflow & Outflow
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"ALL" | CashFlowStatus>("ALL")
  const [dateFilter, setDateFilter] = useState<"ALL" | "TODAY" | "7DAYS" | "30DAYS">("ALL")
  const [inflowSourceFilter, setInflowSourceFilter] = useState<"ALL" | "TOPUP_RUBY" | "SUBSCRIPTION_PLAN">("ALL")

  // Realtime Status & Live Notification
  const [realtimeStatus, setRealtimeStatus] = useState<"CONNECTING" | "CONNECTED" | "ERROR">("CONNECTING")
  const [newArrivalTxCode, setNewArrivalTxCode] = useState<string | null>(null)

  // Modal Detail & Reconciliation
  const [selectedTx, setSelectedTx] = useState<CashFlowTransaction | null>(null)
  const [isApproving, setIsApproving] = useState(false)

  // Toast
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text })
    setTimeout(() => setToast(null), 5000)
  }

  // Load Initial Data
  const loadData = async () => {
    setLoading(true)
    try {
      const [sumData, txData, gwData] = await Promise.all([
        adminCashflowService.getCashFlowSummary(),
        adminCashflowService.getTransactions(),
        adminCashflowService.getGatewayConfig(),
      ])
      setSummary(sumData)
      setTransactions(txData)
      setGatewayConfig(gwData)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Không thể tải dữ liệu sổ quỹ dòng tiền."
      showToast("error", msg)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()

    // Lắng nghe luồng sự kiện thanh toán thời gian thực Server-Sent Events (SSE)
    const unsubscribe = adminCashflowService.subscribeCashflowStream(
      (newTx) => {
        setTransactions((prev) => {
          const index = prev.findIndex((t) => t.transactionCode === newTx.transactionCode)
          if (index >= 0) {
            const next = [...prev]
            next[index] = newTx
            return next
          }
          return [newTx, ...prev]
        })

        // Kích hoạt hiệu ứng nổi bật tức thì cho dòng giao dịch mới
        setNewArrivalTxCode(newTx.transactionCode)
        setTimeout(() => {
          setNewArrivalTxCode((curr) => (curr === newTx.transactionCode ? null : curr))
        }, 7000)

        // Cập nhật lại các thẻ KPI tổng quan
        adminCashflowService.getCashFlowSummary().then((sum) => setSummary(sum))

        // Hiển thị thông báo Toast realtime
        const typeLabel =
          newTx.type === "TOPUP_RUBY"
            ? "Nạp Ruby VietQR"
            : newTx.type === "SUBSCRIPTION_PLAN"
              ? "Gói cước VietQR"
              : "Mua đồ Shop"
        const amountLabel =
          newTx.direction === "IN" ? formatVnd(newTx.amountVnd) : `${newTx.rubyAmount} 💎`
        const userLabel = newTx.userName || `User #${newTx.userId}`

        showToast(
          "success",
          `⚡ [REALTIME] ${newTx.status === "SUCCESS" ? "Thanh toán thành công" : "Khởi tạo thanh toán"}: ${typeLabel} (${amountLabel}) - ${userLabel}`
        )
      },
      (status) => setRealtimeStatus(status)
    )

    return () => {
      unsubscribe()
    }
  }, [])

  // Filtered Inflow Transactions
  const filteredInflowTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      if (tx.direction !== "IN") return false
      if (statusFilter !== "ALL" && tx.status !== statusFilter) return false
      if (inflowSourceFilter !== "ALL" && tx.type !== inflowSourceFilter) return false

      if (searchTerm.trim()) {
        const q = searchTerm.trim().toLowerCase()
        const matchCode = tx.transactionCode.toLowerCase().includes(q)
        const matchUser = (tx.userName && tx.userName.toLowerCase().includes(q)) || String(tx.userId) === q
        const matchRef = tx.sepayReferenceCode && tx.sepayReferenceCode.toLowerCase().includes(q)
        const matchDesc = tx.description.toLowerCase().includes(q)
        if (!matchCode && !matchUser && !matchRef && !matchDesc) return false
      }

      if (dateFilter !== "ALL") {
        const txTime = new Date(tx.createdAt).getTime()
        const now = Date.now()
        if (dateFilter === "TODAY") {
          const startOfToday = new Date()
          startOfToday.setHours(0, 0, 0, 0)
          if (txTime < startOfToday.getTime()) return false
        } else if (dateFilter === "7DAYS" && txTime < now - 7 * 86400000) {
          return false
        } else if (dateFilter === "30DAYS" && txTime < now - 30 * 86400000) {
          return false
        }
      }

      return true
    })
  }, [transactions, statusFilter, inflowSourceFilter, searchTerm, dateFilter])

  // Filtered Outflow Transactions (Ruby Spent in Shop)
  const filteredOutflowTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      if (tx.direction !== "OUT") return false
      if (searchTerm.trim()) {
        const q = searchTerm.trim().toLowerCase()
        const matchCode = tx.transactionCode.toLowerCase().includes(q)
        const matchUser = (tx.userName && tx.userName.toLowerCase().includes(q)) || String(tx.userId) === q
        const matchDesc = tx.description.toLowerCase().includes(q)
        if (!matchCode && !matchUser && !matchDesc) return false
      }
      return true
    })
  }, [transactions, searchTerm])

  // Handle Approve / Confirm
  const handleApprove = async (txCode: string) => {
    setIsApproving(true)
    try {
      const updatedTx = await adminCashflowService.approveTransaction(txCode)
      showToast("success", `Đã phê duyệt và hoàn tất giao dịch ${txCode}!`)

      setTransactions((prev) => prev.map((t) => (t.transactionCode === txCode ? updatedTx : t)))
      if (selectedTx?.transactionCode === txCode) {
        setSelectedTx(updatedTx)
      }

      const sum = await adminCashflowService.getCashFlowSummary()
      setSummary(sum)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Phê duyệt giao dịch thất bại."
      showToast("error", msg)
    } finally {
      setIsApproving(false)
    }
  }

  // Handle Export CSV
  const handleExportCsv = (list: CashFlowTransaction[]) => {
    adminCashflowService.exportCsv(list)
    showToast("success", `Đã xuất ${list.length} bản ghi giao dịch ra file CSV!`)
  }

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed right-6 top-24 z-50 flex items-center gap-3 rounded-2xl border px-5 py-4 shadow-xl transition-all ${toast.type === "success"
            ? "border-[#3A8157] bg-white text-[#3A8157]"
            : "border-red-500 bg-white text-red-600"
            }`}
        >
          <span className="material-symbols-outlined text-[22px]">
            {toast.type === "success" ? "check_circle" : "error"}
          </span>
          <span className="text-sm font-extrabold">{toast.text}</span>
        </div>
      )}

      {/* Main Header & Tab Navigation Card */}
      <div className="rounded-[24px] border border-[#D9D9D9] bg-white p-5 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] md:p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[28px] text-[#3A8157]">payments</span>
              <h2 className="text-2xl font-extrabold text-[#111827]">Quản trị Dòng tiền & Sổ quỹ</h2>
            </div>
            {/* <p className="mt-1 text-xs font-semibold text-[#727272]">
              Giám sát dòng tiền vào (Nạp Ruby, Gói cước), dòng tiêu thụ Ruby và đối soát cổng thanh toán SePay VietQR.
            </p> */}
          </div>

          {/* Action Buttons & Live Indicator */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div
              className="flex items-center gap-2 rounded-full border border-[#D9D9D9] bg-[#F7FAFF] px-3.5 py-2 shadow-sm"
              title={
                realtimeStatus === "CONNECTED"
                  ? "Đang kết nối Server-Sent Events (SSE). Bất kỳ thanh toán nào cũng sẽ xuất hiện tức thì!"
                  : realtimeStatus === "CONNECTING"
                    ? "Đang kết nối luồng sự kiện realtime..."
                    : "Mất kết nối realtime, hệ thống tự động đồng bộ lại."
              }
            >
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${realtimeStatus === "CONNECTED"
                      ? "animate-ping bg-[#3A8157]"
                      : realtimeStatus === "CONNECTING"
                        ? "animate-ping bg-[#FFC857]"
                        : "bg-red-400"
                    }`}
                ></span>
                <span
                  className={`relative inline-flex h-2.5 w-2.5 rounded-full ${realtimeStatus === "CONNECTED"
                      ? "bg-[#3A8157]"
                      : realtimeStatus === "CONNECTING"
                        ? "bg-[#FFC857]"
                        : "bg-red-500"
                    }`}
                ></span>
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#111827]">
                {realtimeStatus === "CONNECTED"
                  ? "Realtime Live"
                  : realtimeStatus === "CONNECTING"
                    ? "Đang kết nối..."
                    : "Offline"}
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleExportCsv(transactions)}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[#D9D9D9] bg-white px-4 text-xs font-bold text-[#111827] shadow-sm transition-colors hover:border-[#3A8157] hover:bg-[#E8F3EC] hover:text-[#3A8157]"
            >
              <span className="material-symbols-outlined text-[18px]">download</span> Xuất CSV
            </button>
            <button
              type="button"
              onClick={loadData}
              disabled={loading}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-[#3A8157] px-4 text-xs font-extrabold uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_#FFC857] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              <span className={`material-symbols-outlined text-[18px] ${loading ? "animate-spin" : ""}`}>refresh</span>
              Làm mới
            </button>
          </div>
        </div>

        {/* Clean Sub-Tabs Navigation */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-[#EEF1F5] pb-3">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-extrabold transition-all ${activeTab === "overview"
              ? "bg-[#3A8157] text-white shadow-sm"
              : "bg-[#F7FAFF] text-[#727272] hover:bg-[#E8F3EC] hover:text-[#3A8157]"
              }`}
          >
            <span className="material-symbols-outlined text-[18px]">dashboard</span>
            Tổng quan & KPI
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("inflow")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-extrabold transition-all ${activeTab === "inflow"
              ? "bg-[#3A8157] text-white shadow-sm"
              : "bg-[#F7FAFF] text-[#727272] hover:bg-[#E8F3EC] hover:text-[#3A8157]"
              }`}
          >
            <span className="material-symbols-outlined text-[18px]">trending_up</span>
            Tiền vào VNĐ
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${activeTab === "inflow" ? "bg-white/25 text-white" : "bg-[#EEF1F5] text-[#727272]"
                }`}
            >
              {transactions.filter((t) => t.direction === "IN").length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("outflow")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-extrabold transition-all ${activeTab === "outflow"
              ? "bg-[#3A8157] text-white shadow-sm"
              : "bg-[#F7FAFF] text-[#727272] hover:bg-[#E8F3EC] hover:text-[#3A8157]"
              }`}
          >
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            Tiêu thụ Ruby
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${activeTab === "outflow" ? "bg-white/25 text-white" : "bg-[#EEF1F5] text-[#727272]"
                }`}
            >
              {transactions.filter((t) => t.direction === "OUT").length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("gateway")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-extrabold transition-all ${activeTab === "gateway"
              ? "bg-[#3A8157] text-white shadow-sm"
              : "bg-[#F7FAFF] text-[#727272] hover:bg-[#E8F3EC] hover:text-[#3A8157]"
              }`}
          >
            <span className="material-symbols-outlined text-[18px]">account_balance</span>
            Cổng SePay & Tỷ giá
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW & KPIS */}
      {activeTab === "overview" && summary && (
        <div className="space-y-6">
          {/* 4 KPI Cards */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {/* Card 1: Tổng doanh thu */}
            <div className="rounded-[20px] border border-[#D9D9D9] bg-white p-4 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)] transition-transform hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#727272]">Doanh thu thực nhận</span>
                <span className="material-symbols-outlined text-[24px] text-[#3A8157]">
                  account_balance_wallet
                </span>
              </div>
              <p className="mt-2 text-2xl font-black text-[#111827]">{formatVnd(summary.totalRevenueVnd)}</p>
              <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-[#3A8157]">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>+{formatVnd(summary.todayRevenueVnd)} hôm nay</span>
              </div>
            </div>

            {/* Card 2: Chờ đối soát */}
            <div className="rounded-[20px] border border-[#D9D9D9] bg-white p-4 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)] transition-transform hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#727272]">Chờ quét mã / Đối soát</span>
                <span className="material-symbols-outlined text-[24px] text-[#D97706]">hourglass_top</span>
              </div>
              <p className="mt-2 text-2xl font-black text-[#111827]">{formatVnd(summary.pendingRevenueVnd)}</p>
              <div className="mt-2 text-xs font-bold text-[#D97706]">
                <span>{summary.pendingCount} đơn PENDING</span>
              </div>
            </div>

            {/* Card 3: Kinh tế Ruby */}
            <div className="rounded-[20px] border border-[#D9D9D9] bg-white p-4 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)] transition-transform hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#727272]">Kinh tế Ruby (Nạp / Tiêu)</span>
                <span className="material-symbols-outlined text-[24px] text-[#529CFF]">diamond</span>
              </div>
              <p className="mt-2 text-2xl font-black text-[#111827]">{formatRuby(summary.rubyMinted)}</p>
              <div className="mt-2 text-[11px] font-semibold text-[#529CFF]">
                <span>Đã tiêu: {summary.rubySpent} 💎 • Tồn: {summary.rubyCirculating} 💎</span>
              </div>
            </div>

            {/* Card 4: Tỷ lệ chuyển đổi */}
            <div className="rounded-[20px] border border-[#D9D9D9] bg-white p-4 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)] transition-transform hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#727272]">Tỷ lệ khớp lệnh SePay</span>
                <span className="material-symbols-outlined text-[24px] text-[#8B63F6]">verified</span>
              </div>
              <p className="mt-2 text-2xl font-black text-[#111827]">{summary.conversionRate}%</p>
              <div className="mt-2 text-xs font-bold text-[#8B63F6]">
                <span>{summary.successCount} đơn thành công</span>
              </div>
            </div>
          </div>

          {/* Phân bổ nguồn thu & Hoạt động gần đây */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Phân bổ nguồn thu */}
            <div className="rounded-[24px] border border-[#D9D9D9] bg-white p-5 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] md:p-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[24px] text-[#3A8157]">pie_chart</span>
                <h3 className="text-lg font-extrabold text-[#111827]">Cơ cấu nguồn doanh thu</h3>
              </div>
              <p className="mt-1 text-xs font-semibold text-[#727272]">
                Phân tích tỷ trọng dòng tiền vào giữa Nạp Ruby và Mua gói cước hội viên.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="flex items-center gap-1.5 text-[#3A8157]">
                      <span className="h-3 w-3 rounded-full bg-[#3A8157]"></span>
                      Nạp Ruby (SePay VietQR)
                    </span>
                    <span className="text-black font-extrabold">{formatVnd(summary.revenueBySource.rubyTopupVnd)}</span>
                  </div>
                  <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-[#EEF1F5]">
                    <div
                      className="h-full bg-[#3A8157] transition-all"
                      style={{
                        width: `${summary.totalRevenueVnd > 0
                          ? Math.round((summary.revenueBySource.rubyTopupVnd / summary.totalRevenueVnd) * 100)
                          : 50
                          }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="flex items-center gap-1.5 text-[#D97706]">
                      <span className="h-3 w-3 rounded-full bg-[#FFC857]"></span>
                      Gói cước Hội viên (Pro/Gold/Premium)
                    </span>
                    <span className="text-black font-extrabold">{formatVnd(summary.revenueBySource.subscriptionVnd)}</span>
                  </div>
                  <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-[#EEF1F5]">
                    <div
                      className="h-full bg-[#FFC857] transition-all"
                      style={{
                        width: `${summary.totalRevenueVnd > 0
                          ? Math.round((summary.revenueBySource.subscriptionVnd / summary.totalRevenueVnd) * 100)
                          : 50
                          }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[#EEF1F5] bg-[#F7FAFF] p-4 text-xs font-semibold text-[#727272]">
                <p className="font-extrabold text-[#111827]">💡 Nhận định tài chính:</p>
                <p className="mt-1 leading-relaxed">
                  Dòng tiền nạp Ruby chiếm tỷ trọng lớn nhờ chính sách thưởng thêm Ruby khi mua gói Medium & Large Pack.
                </p>
              </div>
            </div>

            {/* Hoạt động giao dịch mới nhất */}
            <div className="rounded-[24px] border border-[#D9D9D9] bg-white p-5 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] md:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[24px] text-[#D97706]">history</span>
                  <h3 className="text-lg font-extrabold text-[#111827]">Giao dịch gần đây</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("inflow")}
                  className="text-xs font-extrabold text-[#3A8157] hover:underline"
                >
                  Xem tất cả →
                </button>
              </div>

              <div className="mt-4 divide-y divide-[#EEF1F5]">
                {transactions.slice(0, 5).map((tx) => (
                  <div
                    key={tx.id}
                    className={`flex items-center justify-between rounded-xl px-2 py-3 text-xs transition-all duration-700 ${tx.transactionCode === newArrivalTxCode
                        ? "bg-emerald-50/90 ring-2 ring-[#3A8157]"
                        : "hover:bg-[#F7FAFF]"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border border-[#EEF1F5] bg-white ${tx.direction === "IN" ? "text-[#3A8157]" : "text-[#8B63F6]"
                          }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {tx.direction === "IN" ? "arrow_downward" : "arrow_upward"}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-extrabold text-[#111827]">{tx.description}</p>
                          {tx.transactionCode === newArrivalTxCode && (
                            <span className="animate-bounce rounded-full bg-[#3A8157] px-1.5 py-0.2 text-[9px] font-black uppercase text-white shadow-sm">
                              ⚡ Mới
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-semibold text-[#727272]">
                          {tx.transactionCode} • {formatDate(tx.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-black ${tx.direction === "IN" ? "text-[#3A8157]" : "text-[#8B63F6]"
                          }`}
                      >
                        {tx.direction === "IN" ? `+${formatVnd(tx.amountVnd)}` : `-${formatRuby(tx.rubyAmount)}`}
                      </p>
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-bold ${tx.status === "SUCCESS"
                          ? "text-[#3A8157]"
                          : tx.status === "PENDING"
                            ? "text-[#D97706]"
                            : "text-[#DC2626]"
                          }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                        {tx.status === "SUCCESS"
                          ? "Thành công"
                          : tx.status === "PENDING"
                            ? "Chờ quét mã"
                            : "Thất bại"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TIỀN VÀO VNĐ (TOPUP & GÓI CƯỚC) */}
      {activeTab === "inflow" && (
        <div className="rounded-[24px] border border-[#D9D9D9] bg-white p-5 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] md:p-6">
          {/* Bộ lọc Inflow */}
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-4 top-3 text-[20px] text-[#727272]">
                search
              </span>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm theo Mã GD (PENTAVA...), Tên, Email, Mã SePay Ref..."
                className="h-11 w-full rounded-full border border-[#D9D9D9] bg-[#F7FAFF] pl-11 pr-4 text-xs font-semibold outline-none focus:border-[#3A8157]"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <select
                  value={inflowSourceFilter}
                  onChange={(e) => setInflowSourceFilter(e.target.value as any)}
                  className="h-11 cursor-pointer appearance-none rounded-full border border-[#D9D9D9] bg-white pl-4 pr-9 text-xs font-bold outline-none transition-colors hover:border-[#3A8157] focus:border-[#3A8157]"
                >
                  <option value="ALL">Nguồn: Tất cả</option>
                  <option value="TOPUP_RUBY">Nạp Ruby</option>
                  <option value="SUBSCRIPTION_PLAN">Gói cước</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-[#727272]">
                  keyboard_arrow_down
                </span>
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="h-11 cursor-pointer appearance-none rounded-full border border-[#D9D9D9] bg-white pl-4 pr-9 text-xs font-bold outline-none transition-colors hover:border-[#3A8157] focus:border-[#3A8157]"
                >
                  <option value="ALL">Trạng thái: Tất cả</option>
                  <option value="SUCCESS">Thành công (SUCCESS)</option>
                  <option value="PENDING">Chờ quét mã (PENDING)</option>
                  <option value="FAILED">Thất bại (FAILED)</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-[#727272]">
                  keyboard_arrow_down
                </span>
              </div>

              <div className="relative">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value as any)}
                  className="h-11 cursor-pointer appearance-none rounded-full border border-[#D9D9D9] bg-white pl-4 pr-9 text-xs font-bold outline-none transition-colors hover:border-[#3A8157] focus:border-[#3A8157]"
                >
                  <option value="ALL">Thời gian: Tất cả</option>
                  <option value="TODAY">Hôm nay</option>
                  <option value="7DAYS">7 ngày qua</option>
                  <option value="30DAYS">30 ngày qua</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-[#727272]">
                  keyboard_arrow_down
                </span>
              </div>
            </div>
          </div>

          {/* Bảng giao dịch Inflow */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="border-b border-[#D9D9D9] text-[10px] font-extrabold uppercase tracking-widest text-[#727272]">
                  <th className="px-3 py-3">Mã GD / Thời gian</th>
                  <th className="px-3 py-3">Khách hàng</th>
                  <th className="px-3 py-3">Nguồn thu / Chi tiết</th>
                  <th className="px-3 py-3">Số tiền VNĐ</th>
                  <th className="px-3 py-3">Cổng thanh toán</th>
                  <th className="px-3 py-3">Trạng thái</th>
                  <th className="px-3 py-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF1F5]">
                {filteredInflowTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-xs font-semibold text-[#727272]">
                      Không tìm thấy giao dịch nào phù hợp với bộ lọc.
                    </td>
                  </tr>
                ) : (
                  filteredInflowTransactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className={`text-xs transition-all duration-700 ${tx.transactionCode === newArrivalTxCode
                          ? "bg-emerald-50/90 ring-2 ring-[#3A8157]"
                          : "hover:bg-[#F7FAFF]"
                        }`}
                    >
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-extrabold text-[#111827]">{tx.transactionCode}</span>
                          {tx.transactionCode === newArrivalTxCode && (
                            <span className="animate-bounce rounded-full bg-[#3A8157] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-sm">
                              ⚡ Mới
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-[11px] font-semibold text-[#727272]">{formatDate(tx.createdAt)}</p>
                      </td>
                      <td className="px-3 py-4">
                        <p className="font-extrabold text-[#111827]">{tx.userName || `User #${tx.userId}`}</p>
                        <p className="text-[11px] font-semibold text-[#727272]">{tx.userEmail || `ID: ${tx.userId}`}</p>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${tx.type === "TOPUP_RUBY"
                                ? "bg-[#E8F3EC] text-[#3A8157]"
                                : "bg-amber-100 text-amber-800"
                              }`}
                          >
                            {tx.type === "TOPUP_RUBY" ? "Nạp Ruby" : "Gói cước"}
                          </span>
                          {tx.itemDetails?.planCode && (
                            <span className="rounded-md bg-purple-100 px-1.5 py-0.5 text-[10px] font-extrabold text-purple-700">
                              Gói {tx.itemDetails.planCode} ({tx.itemDetails.durationDays || 30} ngày)
                            </span>
                          )}
                          {tx.itemDetails?.bonusRuby && tx.itemDetails.bonusRuby > 0 && (
                            <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-800">
                              +{tx.itemDetails.bonusRuby} Ruby thưởng
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs font-semibold text-[#111827]">{tx.description}</p>
                      </td>
                      <td className="px-3 py-4">
                        <p className="font-extrabold text-[#3A8157]">{formatVnd(tx.amountVnd)}</p>
                        {tx.rubyAmount > 0 && (
                          <p className="text-[11px] font-bold text-[#529CFF]">+{tx.rubyAmount} Ruby</p>
                        )}
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-1.5 font-bold text-[#111827]">
                          <span className="material-symbols-outlined text-[16px] text-[#3A8157]">qr_code_2</span>
                          <span>{tx.paymentMethod}</span>
                        </div>
                        {tx.sepayReferenceCode && (
                          <p className="font-mono text-[10px] text-[#727272]">{tx.sepayReferenceCode}</p>
                        )}
                      </td>
                      <td className="px-3 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-bold ${tx.status === "SUCCESS"
                            ? "text-[#3A8157]"
                            : tx.status === "PENDING"
                              ? "text-[#D97706]"
                              : "text-[#DC2626]"
                            }`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                          {tx.status === "SUCCESS"
                            ? "Thành công"
                            : tx.status === "PENDING"
                              ? "Chờ quét QR"
                              : "Thất bại"}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          {tx.status === "PENDING" && (
                            <button
                              type="button"
                              onClick={() => handleApprove(tx.transactionCode)}
                              disabled={isApproving}
                              className="text-xs font-bold text-[#D97706] hover:underline"
                            >
                              Duyệt
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setSelectedTx(tx)}
                            className="rounded-lg border border-[#D9D9D9] bg-white px-3 py-1.5 text-xs font-bold text-[#111827] transition-colors hover:border-[#3A8157] hover:text-[#3A8157]"
                          >
                            Chi tiết
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: TIÊU THỤ RUBY (OUTFLOW / SHOP ITEMS) */}
      {activeTab === "outflow" && (
        <div className="rounded-[24px] border border-[#D9D9D9] bg-white p-5 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] md:p-6">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="text-lg font-extrabold text-[#111827]">Nhật ký tiêu dùng Ruby trong Shop</h3>
              <p className="text-xs font-semibold text-[#727272]">
                Theo dõi các giao dịch trừ Ruby khi người dùng mua skin và phụ kiện nhân vật.
              </p>
            </div>
            <div className="relative w-full md:w-72">
              <span className="material-symbols-outlined absolute left-4 top-3 text-[20px] text-[#727272]">
                search
              </span>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm vật phẩm, người dùng..."
                className="h-11 w-full rounded-full border border-[#D9D9D9] bg-[#F7FAFF] pl-11 pr-4 text-xs font-semibold outline-none focus:border-[#3A8157]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead>
                <tr className="border-b border-[#D9D9D9] text-[10px] font-extrabold uppercase tracking-widest text-[#727272]">
                  <th className="px-3 py-3">Mã GD / Thời gian</th>
                  <th className="px-3 py-3">Người dùng</th>
                  <th className="px-3 py-3">Vật phẩm đã mua</th>
                  <th className="px-3 py-3">Vị trí (Slot)</th>
                  <th className="px-3 py-3">Ruby đã trừ</th>
                  <th className="px-3 py-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF1F5]">
                {filteredOutflowTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-xs font-semibold text-[#727272]">
                      Chưa có giao dịch chi tiêu Ruby nào phù hợp.
                    </td>
                  </tr>
                ) : (
                  filteredOutflowTransactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className={`text-xs transition-all duration-700 ${tx.transactionCode === newArrivalTxCode
                          ? "bg-purple-50/90 ring-2 ring-[#8B63F6]"
                          : "hover:bg-[#F7FAFF]"
                        }`}
                    >
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-[#111827]">{tx.transactionCode}</span>
                          {tx.transactionCode === newArrivalTxCode && (
                            <span className="animate-bounce rounded-full bg-[#8B63F6] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-sm">
                              ⚡ Mới
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-[11px] text-[#727272]">{formatDate(tx.createdAt)}</p>
                      </td>
                      <td className="px-3 py-4">
                        <p className="font-bold text-[#111827]">{tx.userName || `User #${tx.userId}`}</p>
                        <p className="text-[11px] text-[#727272]">ID: {tx.userId}</p>
                      </td>
                      <td className="px-3 py-4">
                        <p className="font-bold text-[#111827]">
                          {tx.itemDetails?.itemName || tx.description}
                        </p>
                        {tx.itemDetails?.itemCode && (
                          <p className="font-mono text-[10px] text-[#727272]">{tx.itemDetails.itemCode}</p>
                        )}
                      </td>
                      <td className="px-3 py-4">
                        <span className="text-xs font-bold text-[#8B63F6]">
                          {tx.itemDetails?.slot || "EQUIPMENT"}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <span className="font-bold text-[#DC2626]">-{tx.rubyAmount} 💎</span>
                      </td>
                      <td className="px-3 py-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3A8157]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#3A8157]"></span>
                          Đã trừ ví
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: CỔNG SEPAY & BẢNG TỶ GIÁ */}
      {activeTab === "gateway" && gatewayConfig && (
        <div className="space-y-6">
          {/* Thông số cổng SePay */}
          <div className="rounded-[24px] border border-[#D9D9D9] bg-white p-5 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] md:p-6">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-[#FFFBEB] p-2.5 text-[#D97706]">
                <span className="material-symbols-outlined text-[26px]">account_balance</span>
              </span>
              <div>
                <h3 className="text-xl font-extrabold text-[#111827]">Thông số Cổng thanh toán SePay / VietQR</h3>
                <p className="text-xs font-semibold text-[#727272]">
                  Tài khoản nhận tiền tự động khớp lệnh biến động số dư cho hệ sinh thái PENTAVA.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="rounded-2xl border border-[#EEF1F5] bg-[#F7FAFF] p-4">
                <span className="text-[10px] font-extrabold uppercase text-[#727272]">Ngân hàng thụ hưởng</span>
                <p className="mt-1 text-base font-extrabold text-[#111827]">{gatewayConfig.bankCode}</p>
              </div>
              <div className="rounded-2xl border border-[#EEF1F5] bg-[#F7FAFF] p-4">
                <span className="text-[10px] font-extrabold uppercase text-[#727272]">Số tài khoản</span>
                <p className="mt-1 font-mono text-base font-extrabold text-[#3A8157]">{gatewayConfig.accountNumber}</p>
              </div>
              <div className="rounded-2xl border border-[#EEF1F5] bg-[#F7FAFF] p-4">
                <span className="text-[10px] font-extrabold uppercase text-[#727272]">Tên chủ tài khoản</span>
                <p className="mt-1 text-base font-extrabold text-[#111827]">{gatewayConfig.accountName}</p>
              </div>
              <div className="rounded-2xl border border-[#EEF1F5] bg-[#F7FAFF] p-4">
                <span className="text-[10px] font-extrabold uppercase text-[#727272]">Webhook Status</span>
                <div className="mt-1 flex items-center gap-1.5 text-xs font-extrabold text-[#3A8157]">
                  <span className="h-2 w-2 rounded-full bg-[#3A8157] animate-pulse"></span>
                  <span>Đang hoạt động (LIVE)</span>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-[#EEF1F5] bg-[#F7FAFF] p-4 text-xs font-semibold text-[#727272]">
              <p className="font-extrabold text-[#111827]">🔗 Webhook Endpoint URL:</p>
              <code className="mt-1 block rounded-lg border border-[#D9D9D9] bg-white p-2.5 font-mono text-[11px] text-[#3A8157]">
                {gatewayConfig.webhookUrl}
              </code>
            </div>
          </div>

          {/* Bảng giá các gói nạp Ruby */}
          <div className="rounded-[24px] border border-[#D9D9D9] bg-white p-5 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] md:p-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px] text-[#3A8157]">diamond</span>
              <h3 className="text-lg font-extrabold text-[#111827]">Chính sách Tỷ giá nạp Ruby hiện hành</h3>
            </div>
            <p className="mt-1 text-xs font-semibold text-[#727272]">
              Tỷ giá quy đổi cơ sở: <strong>1 Ruby = 2.000 VNĐ</strong> (Tối thiểu 10 Ruby = 20.000 VNĐ).
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {gatewayConfig.packages.map((pkg) => (
                <div
                  key={pkg.code}
                  className={`relative rounded-2xl border p-5 transition-all ${pkg.isPopular
                    ? "border-amber-300 bg-[#FFFBEB] shadow-sm"
                    : pkg.isBestValue
                      ? "border-emerald-300 bg-[#ECFDF5] shadow-sm"
                      : "border-[#EEF1F5] bg-white"
                    }`}
                >
                  {pkg.isPopular && (
                    <span className="absolute -top-3 right-4 rounded-full bg-[#FFC857] px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-black shadow-sm">
                      Phổ biến nhất
                    </span>
                  )}
                  {pkg.isBestValue && (
                    <span className="absolute -top-3 right-4 rounded-full bg-[#3A8157] px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm">
                      Ưu đãi nhất
                    </span>
                  )}
                  <h4 className="text-base font-extrabold text-[#111827]">{pkg.name}</h4>
                  <p className="mt-2 text-2xl font-black text-[#3A8157]">{formatVnd(pkg.priceVnd)}</p>
                  <p className="mt-1 text-xs font-extrabold text-[#529CFF]">
                    Nhận: {pkg.rubyAmount} Ruby {pkg.bonusRuby > 0 && `(+${pkg.bonusRuby} thưởng)`}
                  </p>
                  <p className="mt-3 text-xs font-semibold text-[#727272]">{pkg.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL CHI TIẾT GIAO DỊCH & ĐỐI SOÁT VIETQR */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[24px] border border-[#D9D9D9] bg-white p-6 shadow-2xl md:p-8">
            <div className="flex items-center justify-between border-b border-[#EEF1F5] pb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[26px] text-[#3A8157]">receipt_long</span>
                <h3 className="text-xl font-extrabold text-[#111827]">Đối soát giao dịch</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTx(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D9D9D9] bg-white hover:bg-[#EEF1F5]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="mt-6 space-y-4 text-xs font-semibold">
              {/* QR Code SePay nếu có */}
              {selectedTx.qrCodeUrl && selectedTx.direction === "IN" && (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-[#EEF1F5] bg-[#F7FAFF] p-4 text-center">
                  <p className="text-[10px] font-extrabold uppercase text-[#727272]">Mã QR thanh toán VietQR SePay</p>
                  <img
                    src={selectedTx.qrCodeUrl}
                    alt="VietQR SePay"
                    className="mt-2 h-44 w-44 rounded-xl border border-[#D9D9D9] p-1 bg-white shadow-sm"
                  />
                  <p className="mt-2 font-mono text-[11px] font-extrabold text-[#111827]">
                    Nội dung CK: <span className="text-[#3A8157]">{selectedTx.transactionCode}</span>
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#EEF1F5] bg-[#F7FAFF] p-3">
                  <span className="text-[10px] font-extrabold text-[#727272]">MÃ GIAO DỊCH</span>
                  <p className="font-mono text-sm font-extrabold text-[#111827]">{selectedTx.transactionCode}</p>
                </div>
                <div className="rounded-xl border border-[#EEF1F5] bg-[#F7FAFF] p-3">
                  <span className="text-[10px] font-extrabold text-[#727272]">TRẠNG THÁI</span>
                  <p
                    className={`text-sm font-extrabold ${selectedTx.status === "SUCCESS"
                      ? "text-[#3A8157]"
                      : selectedTx.status === "PENDING"
                        ? "text-[#D97706]"
                        : "text-[#DC2626]"
                      }`}
                  >
                    {selectedTx.status}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[#EEF1F5] bg-[#F7FAFF] p-3">
                <span className="text-[10px] font-extrabold text-[#727272]">KHÁCH HÀNG / TÀI KHOẢN</span>
                <p className="text-sm font-extrabold text-[#111827]">{selectedTx.userName || `User #${selectedTx.userId}`}</p>
                <p className="text-[11px] font-semibold text-[#727272]">{selectedTx.userEmail || `User ID: ${selectedTx.userId}`}</p>
              </div>

              {selectedTx.itemDetails && (
                <div className="rounded-xl border border-[#EEF1F5] bg-[#F7FAFF] p-3">
                  <span className="text-[10px] font-extrabold text-[#727272]">CHI TIẾT THANH TOÁN (MẶT HÀNG / GÓI DỊCH VỤ)</span>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold text-[#111827]">
                    {selectedTx.itemDetails.itemName && (
                      <span className="rounded-lg border border-[#D9D9D9] bg-white px-2.5 py-1">
                        Sản phẩm: {selectedTx.itemDetails.itemName}
                      </span>
                    )}
                    {selectedTx.itemDetails.planCode && (
                      <span className="rounded-lg bg-purple-100 px-2.5 py-1 text-purple-800">
                        Gói cước: {selectedTx.itemDetails.planCode} ({selectedTx.itemDetails.durationDays || 30} ngày)
                      </span>
                    )}
                    {selectedTx.itemDetails.slot && (
                      <span className="rounded-lg bg-blue-100 px-2.5 py-1 text-blue-800">
                        Vị trí: {selectedTx.itemDetails.slot}
                      </span>
                    )}
                    {selectedTx.itemDetails.itemCode && (
                      <span className="rounded-lg bg-gray-100 px-2.5 py-1 font-mono text-gray-700">
                        Mã code: {selectedTx.itemDetails.itemCode}
                      </span>
                    )}
                    {selectedTx.itemDetails.bonusRuby && selectedTx.itemDetails.bonusRuby > 0 && (
                      <span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-emerald-800">
                        +{selectedTx.itemDetails.bonusRuby} Ruby thưởng
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#EEF1F5] bg-[#F7FAFF] p-3">
                  <span className="text-[10px] font-extrabold text-[#727272]">SỐ TIỀN VNĐ</span>
                  <p className="text-sm font-extrabold text-[#3A8157]">{formatVnd(selectedTx.amountVnd)}</p>
                </div>
                <div className="rounded-xl border border-[#EEF1F5] bg-[#F7FAFF] p-3">
                  <span className="text-[10px] font-extrabold text-[#727272]">SỐ RUBY</span>
                  <p className="text-sm font-extrabold text-[#529CFF]">{formatRuby(selectedTx.rubyAmount)}</p>
                </div>
              </div>

              {selectedTx.sepayReferenceCode && (
                <div className="rounded-xl border border-[#EEF1F5] bg-[#F7FAFF] p-3">
                  <span className="text-[10px] font-extrabold text-[#727272]">MÃ THAM CHIẾU NGÂN HÀNG SEPAY</span>
                  <p className="font-mono text-xs font-extrabold text-[#111827]">{selectedTx.sepayReferenceCode}</p>
                </div>
              )}

              <div className="flex justify-between text-[11px] text-[#727272]">
                <span>Khởi tạo: {formatDate(selectedTx.createdAt)}</span>
                <span>Hoàn tất: {formatDate(selectedTx.completedAt)}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-[#EEF1F5] pt-4">
              <button
                type="button"
                onClick={() => setSelectedTx(null)}
                className="rounded-full border border-[#D9D9D9] bg-white px-5 py-2 text-xs font-bold hover:bg-[#EEF1F5]"
              >
                Đóng
              </button>
              {selectedTx.status === "PENDING" && (
                <button
                  type="button"
                  onClick={() => handleApprove(selectedTx.transactionCode)}
                  disabled={isApproving}
                  className="rounded-full bg-[#3A8157] px-5 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_#FFC857] hover:-translate-y-0.5"
                >
                  {isApproving ? "Đang duyệt..." : "Duyệt & Khớp tiền ngay"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
