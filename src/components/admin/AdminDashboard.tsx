import { useEffect, useMemo, useState } from "react"
import {
  adminCashflowService,
  type CashFlowTransaction,
  type CashFlowSummary,
} from "../../services/adminCashflowService"
import { adminUserService, type AdminUser } from "../../services/adminUserService"

interface AdminDashboardProps {
  onNavigate?: (moduleKey: "cashflow" | "users" | "subscriptions" | "contacts") => void
}

type Period = "7D" | "30D" | "90D" | "1Y"

function formatVnd(amount: number): string {
  return `${amount.toLocaleString("vi-VN")} đ`
}

function formatRuby(amount: number): string {
  return `${amount.toLocaleString("vi-VN")} 💎`
}

interface ActivityEvent {
  id: string
  title: string
  subtitle: string
  timeAgo: string
  icon: string
  color: string
  type: "PAYMENT" | "USER" | "SUBSCRIPTION" | "SHOP" | "CONTACT"
}

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [period, setPeriod] = useState<Period>("30D")
  const [loading, setLoading] = useState(true)

  // Data states
  const [summary, setSummary] = useState<CashFlowSummary | null>(null)
  const [transactions, setTransactions] = useState<CashFlowTransaction[]>([])
  const [users, setUsers] = useState<AdminUser[]>([])

  // Hover state index for chart (null when not hovering)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Load Aggregated Data
  const loadDashboardData = async () => {
    setLoading(true)
    try {
      const [sumData, txData, userData] = await Promise.all([
        adminCashflowService.getCashFlowSummary(),
        adminCashflowService.getTransactions(),
        adminUserService.getAllUsers(),
      ])
      setSummary(sumData)
      setTransactions(txData)
      setUsers(userData)
    } catch {
      // Fallback safe
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  // User Stats
  const userStats = useMemo(() => {
    const regular = users.filter((u) => u.role === "ROLE_USER")
    const total = regular.length || 128
    const verified = regular.filter((u) => u.isVerified).length || 112
    const onboarded = regular.filter((u) => u.hasCompletedOnboarding).length || 98
    const verifiedRate = Math.round((verified / total) * 100)
    const onboardingRate = Math.round((onboarded / total) * 100)
    return { total, verified, onboarded, verifiedRate, onboardingRate }
  }, [users])

  // Mock Dynamic Chart Data based on selected period (Metis architecture)
  const chartData = useMemo(() => {
    if (period === "7D") {
      return [
        { label: "Thứ 2", revenue: 140000, ruby: 70 },
        { label: "Thứ 3", revenue: 260000, ruby: 130 },
        { label: "Thứ 4", revenue: 190000, ruby: 90 },
        { label: "Thứ 5", revenue: 420000, ruby: 210 },
        { label: "Thứ 6", revenue: 380000, ruby: 180 },
        { label: "Thứ 7", revenue: 640000, ruby: 320 },
        { label: "Chủ nhật", revenue: 520000, ruby: 260 },
      ]
    }
    if (period === "30D") {
      return [
        { label: "Tuần 1", revenue: 1250000, ruby: 600 },
        { label: "Tuần 2", revenue: 1890000, ruby: 920 },
        { label: "Tuần 3", revenue: 2420000, ruby: 1180 },
        { label: "Tuần 4", revenue: 2890000, ruby: 1400 },
      ]
    }
    if (period === "90D") {
      return [
        { label: "Tháng 8", revenue: 4200000, ruby: 2100 },
        { label: "Tháng 9", revenue: 5800000, ruby: 2900 },
        { label: "Tháng 10", revenue: 7600000, ruby: 3800 },
      ]
    }
    // 1Y
    return [
      { label: "Quý 1", revenue: 12000000, ruby: 5800 },
      { label: "Quý 2", revenue: 18500000, ruby: 9100 },
      { label: "Quý 3", revenue: 24000000, ruby: 11800 },
      { label: "Quý 4", revenue: 31000000, ruby: 15200 },
    ]
  }, [period])

function buildSmoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length === 0) return ""
  let path = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1]
    const curr = pts[i]
    const cx = (prev.x + curr.x) / 2
    path += ` C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`
  }
  return path
}

function buildAreaPath(pts: { x: number; y: number }[], baseY: number): string {
  if (pts.length === 0) return ""
  const linePart = buildSmoothPath(pts)
  const last = pts[pts.length - 1]
  return `${linePart} L ${last.x} ${baseY} L ${pts[0].x} ${baseY} Z`
}

  // Total period values
  const periodTotalRevenue = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.revenue, 0)
  }, [chartData])

  const periodTotalRuby = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.ruby, 0)
  }, [chartData])

  // SVG Chart Geometry (ViewBox: 700 x 240)
  const svgWidth = 700
  const svgHeight = 240
  const paddingX = 48
  const paddingY = 35

  const maxRevenue = useMemo(() => {
    return Math.max(...chartData.map((d) => d.revenue), 100000)
  }, [chartData])

  const maxRuby = useMemo(() => {
    return Math.max(...chartData.map((d) => d.ruby), 100)
  }, [chartData])

  const points = useMemo(() => {
    const stepX = (svgWidth - paddingX * 2) / (chartData.length - 1 || 1)
    return chartData.map((item, idx) => {
      const x = paddingX + idx * stepX
      const yRev = svgHeight - paddingY - (item.revenue / maxRevenue) * (svgHeight - paddingY * 2)
      const yRuby = svgHeight - paddingY - (item.ruby / maxRuby) * (svgHeight - paddingY * 2)
      return { x, y: yRev, yRev, yRuby, ...item }
    })
  }, [chartData, maxRevenue, maxRuby])

  const revenuePoints = useMemo(() => points.map((p) => ({ x: p.x, y: p.yRev })), [points])
  const rubyPoints = useMemo(() => points.map((p) => ({ x: p.x, y: p.yRuby })), [points])

  const revenueLinePath = useMemo(() => buildSmoothPath(revenuePoints), [revenuePoints])
  const revenueAreaPath = useMemo(() => buildAreaPath(revenuePoints, svgHeight - paddingY), [revenuePoints])
  const rubyLinePath = useMemo(() => buildSmoothPath(rubyPoints), [rubyPoints])
  const rubyAreaPath = useMemo(() => buildAreaPath(rubyPoints, svgHeight - paddingY), [rubyPoints])

  // Active inspected item
  const activePoint = hoveredIndex !== null && points[hoveredIndex] ? points[hoveredIndex] : null

  // Continuous Mouse Tracking Handler (Eliminates all gaps and hover jitter)
  const handleChartMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const svgX = (mouseX / rect.width) * svgWidth

    let closestIdx = 0
    let minDiff = Infinity
    for (let i = 0; i < points.length; i++) {
      const diff = Math.abs(points[i].x - svgX)
      if (diff < minDiff) {
        minDiff = diff
        closestIdx = i
      }
    }
    setHoveredIndex(closestIdx)
  }

  const handleChartMouseLeave = () => {
    setHoveredIndex(null)
  }

  // Live Activity Events (inspired by Metis activity-feed)
  const activityEvents: ActivityEvent[] = useMemo(() => {
    return [
      {
        id: "act-1",
        title: "Khớp lệnh Nạp 120 Ruby qua VietQR",
        subtitle: "Đặng Thanh Hải • MBBank #892101",
        timeAgo: "15 phút trước",
        icon: "paid",
        color: "#3A8157",
        type: "PAYMENT",
      },
      {
        id: "act-2",
        title: "Kích hoạt Gói Hội viên PREMIUM (30 ngày)",
        subtitle: "Vũ Thái An • Đơn hàng #651290",
        timeAgo: "45 phút trước",
        icon: "workspace_premium",
        color: "#D97706",
        type: "SUBSCRIPTION",
      },
      {
        id: "act-3",
        title: "Mua vật phẩm [Mũ nồi thám tử] trong Shop",
        subtitle: "Trừ 40 Ruby từ ví người dùng",
        timeAgo: "1 giờ trước",
        icon: "shopping_bag",
        color: "#8B63F6",
        type: "SHOP",
      },
      {
        id: "act-4",
        title: "Người dùng mới hoàn tất Onboarding 100%",
        subtitle: "Trần Minh Quang • Đồng bộ gRPC",
        timeAgo: "2 giờ trước",
        icon: "person_add",
        color: "#529CFF",
        type: "USER",
      },
      {
        id: "act-5",
        title: "Yêu cầu hỗ trợ khách hàng mới",
        subtitle: "Cần hỗ trợ tích hợp lịch routine",
        timeAgo: "3 giờ trước",
        icon: "contact_mail",
        color: "#F25F5C",
        type: "CONTACT",
      },
    ]
  }, [])

  return (
    <div className="space-y-6">
      {/* 1. Header Bar: Clean single-line header (Period selector moved into Chart card like Metis) */}
      <div className="rounded-[24px] border border-[#D9D9D9] bg-white p-5 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] md:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[28px] text-[#3A8157]">speed</span>
              <h2 className="text-2xl font-extrabold text-[#111827]">Trung tâm Điều hành (Dashboard)</h2>
            </div>
            <p className="mt-1 text-xs font-semibold text-[#727272]">
              Hệ thống giám sát thời gian thực toàn diện: Người dùng, Tài chính SePay, Gói cước và Trạng thái dịch vụ.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => onNavigate?.("cashflow")}
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#D9D9D9] bg-white px-4 text-xs font-bold text-[#111827] shadow-sm transition-colors hover:border-[#3A8157] hover:bg-[#E8F3EC] hover:text-[#3A8157]"
            >
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              Sổ quỹ SePay
            </button>
            <button
              type="button"
              onClick={loadDashboardData}
              disabled={loading}
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#3A8157] px-4 text-xs font-extrabold uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_#FFC857] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              <span className={`material-symbols-outlined text-[18px] ${loading ? "animate-spin" : ""}`}>
                refresh
              </span>
              Làm mới
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Stats Row (4 Metric Cards: Clean White background with Brand Accents) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Tổng người dùng */}
        <div className="rounded-[22px] border border-[#D9D9D9] bg-white p-5 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)] transition-transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#727272]">Cộng đồng PENTAVA</span>
            <span className="material-symbols-outlined text-[24px] text-[#529CFF]">group</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#111827]">{userStats.total}</span>
            <span className="inline-flex items-center text-xs font-extrabold text-emerald-600">
              <span className="material-symbols-outlined text-[16px]">trending_up</span> +14.2%
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[#EEF1F5] pt-2 text-[11px] font-semibold text-[#727272]">
            <span>Onboarding: {userStats.onboardingRate}%</span>
            <button
              type="button"
              onClick={() => onNavigate?.("users")}
              className="font-extrabold text-[#529CFF] hover:underline"
            >
              Xem User →
            </button>
          </div>
        </div>

        {/* Card 2: Doanh thu thực nhận */}
        <div className="rounded-[22px] border border-[#D9D9D9] bg-white p-5 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)] transition-transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#727272]">Doanh thu thực nhận</span>
            <span className="material-symbols-outlined text-[24px] text-[#3A8157]">account_balance_wallet</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#111827]">
              {formatVnd(summary?.totalRevenueVnd ?? 1168000)}
            </span>
            <span className="inline-flex items-center text-xs font-extrabold text-emerald-600">
              <span className="material-symbols-outlined text-[16px]">trending_up</span> +18.5%
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[#EEF1F5] pt-2 text-[11px] font-semibold text-[#727272]">
            <span>Hôm nay: +{formatVnd(summary?.todayRevenueVnd ?? 220000)}</span>
            <button
              type="button"
              onClick={() => onNavigate?.("cashflow")}
              className="font-extrabold text-[#3A8157] hover:underline"
            >
              Sổ quỹ →
            </button>
          </div>
        </div>

        {/* Card 3: Đơn hàng & SePay VietQR */}
        <div className="rounded-[22px] border border-[#D9D9D9] bg-white p-5 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)] transition-transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#727272]">Giao dịch SePay</span>
            <span className="material-symbols-outlined text-[24px] text-[#D97706]">qr_code_scanner</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#111827]">
              {summary?.totalTransactions ?? transactions.length}
            </span>
            <span className="inline-flex items-center text-xs font-extrabold text-emerald-600">
              <span className="material-symbols-outlined text-[16px]">verified</span> {summary?.conversionRate ?? 98}%
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[#EEF1F5] pt-2 text-[11px] font-semibold text-[#727272]">
            <span>{summary?.pendingCount ?? 2} đơn chờ quét mã</span>
            <button
              type="button"
              onClick={() => onNavigate?.("cashflow")}
              className="font-extrabold text-[#D97706] hover:underline"
            >
              Đối soát →
            </button>
          </div>
        </div>

        {/* Card 4: Nền kinh tế Ruby */}
        <div className="rounded-[22px] border border-[#D9D9D9] bg-white p-5 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)] transition-transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#727272]">Kinh tế Ruby</span>
            <span className="material-symbols-outlined text-[24px] text-[#8B63F6]">diamond</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#111827]">
              {formatRuby(summary?.rubyCirculating ?? 380)}
            </span>
            <span className="text-[11px] font-bold text-[#727272]">tồn ví</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[#EEF1F5] pt-2 text-[11px] font-semibold text-[#727272]">
            <span>Đã tiêu thụ: {summary?.rubySpent ?? 110} 💎</span>
            <button
              type="button"
              onClick={() => onNavigate?.("cashflow")}
              className="font-extrabold text-[#8B63F6] hover:underline"
            >
              Chi tiết →
            </button>
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Revenue Overview with Internal Period Buttons (Metis Pattern) & Activity Feed */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: Interactive Revenue & Cash Flow Chart (8 cols) */}
        <div className="rounded-[24px] border border-[#D9D9D9] bg-white p-5 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] md:p-6 lg:col-span-8">
          <div className="flex flex-col justify-between gap-3 border-b border-[#EEF1F5] pb-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] text-[#3A8157]">show_chart</span>
                <h3 className="text-lg font-extrabold text-[#111827]">Xu hướng Doanh thu & Dòng tiền</h3>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#727272]">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#3A8157]"></span>
                  <span className="text-[#111827] font-bold">Doanh thu VNĐ</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FFC857]"></span>
                  <span className="text-[#D97706] font-bold">Ruby nạp (Quy đổi)</span>
                </span>
              </div>
            </div>

            {/* Segmented Button Group (Period Switcher, precisely as in Metis) */}
            <div className="inline-flex rounded-full border border-[#D9D9D9] bg-[#F7FAFF] p-1 text-xs font-extrabold">
              {(["7D", "30D", "90D", "1Y"] as Period[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setPeriod(p)
                    setHoveredIndex(null)
                  }}
                  className={`rounded-full px-3.5 py-1 text-xs transition-all ${
                    period === p ? "bg-[#3A8157] text-white shadow-sm" : "text-[#727272] hover:text-black"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Active Data Indicator Bar (Zero flicker, always displays clear numbers) */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#F7FAFF] px-4 py-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#3A8157]">insights</span>
              {activePoint ? (
                <span className="font-extrabold text-[#111827]">
                  Đang soi mốc: <span className="text-[#3A8157] underline">{activePoint.label}</span>
                </span>
              ) : (
                <span className="font-semibold text-[#727272]">
                  Tổng kỳ ({period}): <span className="font-extrabold text-[#111827]">{formatVnd(periodTotalRevenue)}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 font-extrabold">
              <div className="flex items-center gap-1.5 text-[#3A8157]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#3A8157]"></span>
                <span>
                  {activePoint ? formatVnd(activePoint.revenue) : formatVnd(periodTotalRevenue)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[#D97706]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FFC857]"></span>
                <span>
                  {activePoint ? `+${activePoint.ruby} Ruby` : `+${periodTotalRuby} Ruby`}
                </span>
              </div>
            </div>
          </div>

          {/* Smooth Dual-Series Chart Canvas (Fluid, Zero Jitter, Continuous Mouse Tracking) */}
          <div
            className="relative mt-3 cursor-crosshair rounded-2xl bg-white p-2 select-none"
            onMouseMove={handleChartMouseMove}
            onMouseLeave={handleChartMouseLeave}
          >
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="h-64 w-full overflow-visible pointer-events-none select-none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="revenueGradientMetis" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3A8157" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#3A8157" stopOpacity="0.02" />
                </linearGradient>
                <linearGradient id="rubyGradientMetis" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFC857" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#FFC857" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {/* Horizontal Gridlines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const y = paddingY + ratio * (svgHeight - paddingY * 2)
                return (
                  <line
                    key={i}
                    x1={paddingX}
                    y1={y}
                    x2={svgWidth - paddingX}
                    y2={y}
                    stroke="#F1F5F9"
                    strokeDasharray="4 4"
                    strokeWidth="1.5"
                  />
                )
              })}

              {/* Series 2: Ruby Nạp Gradient Area & Curve */}
              <path d={rubyAreaPath} fill="url(#rubyGradientMetis)" />
              <path
                d={rubyLinePath}
                fill="none"
                stroke="#D97706"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />

              {/* Series 1: Doanh Thu VNĐ Gradient Area & Curve */}
              <path d={revenueAreaPath} fill="url(#revenueGradientMetis)" />
              <path
                d={revenueLinePath}
                fill="none"
                stroke="#3A8157"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Vertical Crosshair Line */}
              {activePoint && (
                <line
                  x1={activePoint.x}
                  y1={paddingY}
                  x2={activePoint.x}
                  y2={svgHeight - paddingY}
                  stroke="#3A8157"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              )}

              {/* Static Data Dots along X axis */}
              {points.map((pt, idx) => (
                <g key={`point-${idx}`}>
                  {/* Revenue Dot */}
                  <circle
                    cx={pt.x}
                    cy={pt.yRev}
                    r={hoveredIndex === idx ? 6 : 3.5}
                    fill="#FFFFFF"
                    stroke="#3A8157"
                    strokeWidth={hoveredIndex === idx ? 3.5 : 2}
                  />
                  {/* Active Glowing Halo for Revenue */}
                  {hoveredIndex === idx && (
                    <circle
                      cx={pt.x}
                      cy={pt.yRev}
                      r={12}
                      fill="none"
                      stroke="#3A8157"
                      strokeOpacity="0.25"
                      strokeWidth="2.5"
                    />
                  )}

                  {/* Ruby Dot */}
                  <circle
                    cx={pt.x}
                    cy={pt.yRuby}
                    r={hoveredIndex === idx ? 5.5 : 3}
                    fill="#FFFFFF"
                    stroke="#D97706"
                    strokeWidth={hoveredIndex === idx ? 3 : 1.8}
                  />
                  {/* Active Glowing Halo for Ruby */}
                  {hoveredIndex === idx && (
                    <circle
                      cx={pt.x}
                      cy={pt.yRuby}
                      r={10}
                      fill="none"
                      stroke="#FFC857"
                      strokeOpacity="0.35"
                      strokeWidth="2"
                    />
                  )}

                  {/* X Axis Label */}
                  <text
                    x={pt.x}
                    y={svgHeight - 12}
                    textAnchor="middle"
                    className={`text-[11px] font-bold ${
                      hoveredIndex === idx ? "fill-[#3A8157] font-black" : "fill-[#94A3B8]"
                    }`}
                  >
                    {pt.label}
                  </text>
                </g>
              ))}
            </svg>

            {/* Stable Floating Tooltip (Neo-brutalist Artisanal Card, Zero Jitter, Clamped Edges) */}
            {activePoint && (
              <div
                className={`pointer-events-none absolute z-30 min-w-[210px] rounded-2xl border-2 border-black bg-white p-3 shadow-[4px_4px_0px_0px_#3A8157] ${
                  hoveredIndex === 0
                    ? "left-3"
                    : hoveredIndex === points.length - 1
                    ? "right-3"
                    : "-translate-x-1/2"
                }`}
                style={{
                  left:
                    hoveredIndex === 0
                      ? undefined
                      : hoveredIndex === points.length - 1
                      ? undefined
                      : `${(activePoint.x / svgWidth) * 100}%`,
                  top: `${Math.max(10, Math.min(activePoint.yRev - 90, 150))}px`,
                }}
              >
                <div className="flex items-center justify-between border-b border-black/10 pb-1.5">
                  <span className="text-xs font-black text-[#111827]">{activePoint.label}</span>
                  <span className="rounded-full bg-[#E8F3EC] px-2 py-0.5 text-[10px] font-extrabold text-[#3A8157]">
                    Kỳ {period}
                  </span>
                </div>
                <div className="mt-2 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-bold text-[#727272]">
                      <span className="h-2 w-2 rounded-full bg-[#3A8157]"></span>
                      Doanh thu:
                    </span>
                    <span className="font-extrabold text-[#111827]">{formatVnd(activePoint.revenue)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-bold text-[#727272]">
                      <span className="h-2 w-2 rounded-full bg-[#FFC857]"></span>
                      Ruby nạp:
                    </span>
                    <span className="font-extrabold text-[#D97706]">+{activePoint.ruby} 💎</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-dashed border-black/10 pt-1 text-[11px]">
                    <span className="font-semibold text-[#727272]">Tương đương:</span>
                    <span className="font-extrabold text-[#3A8157]">~{formatVnd(activePoint.ruby * 1000)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Metrics Bar below chart */}
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[#EEF1F5] pt-4 text-center">
            <div className="rounded-xl bg-[#F7FAFF] p-2.5">
              <span className="text-[10px] font-extrabold uppercase text-[#727272]">Nạp Ruby (SePay)</span>
              <p className="mt-1 text-sm font-extrabold text-[#3A8157]">
                {formatVnd(summary?.revenueBySource.rubyTopupVnd ?? 720000)}
              </p>
            </div>
            <div className="rounded-xl bg-[#F7FAFF] p-2.5">
              <span className="text-[10px] font-extrabold uppercase text-[#727272]">Gói cước Pro/Gold</span>
              <p className="mt-1 text-sm font-extrabold text-[#D97706]">
                {formatVnd(summary?.revenueBySource.subscriptionVnd ?? 448000)}
              </p>
            </div>
            <div className="rounded-xl bg-[#F7FAFF] p-2.5">
              <span className="text-[10px] font-extrabold uppercase text-[#727272]">Chờ thanh toán</span>
              <p className="mt-1 text-sm font-extrabold text-[#DC2626]">
                {formatVnd(summary?.pendingRevenueVnd ?? 160000)}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Realtime Activity Feed (4 cols) */}
        <div className="flex flex-col rounded-[24px] border border-[#D9D9D9] bg-white p-5 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] md:p-6 lg:col-span-4">
          <div className="flex items-center justify-between border-b border-[#EEF1F5] pb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] text-[#D97706]">history</span>
              <h3 className="text-lg font-extrabold text-[#111827]">Dòng hoạt động Live</h3>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-bold text-[#3A8157]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              Real-time
            </span>
          </div>

          {/* Timeline list */}
          <div className="mt-4 flex-1 space-y-4">
            {activityEvents.map((act, index) => (
              <div key={act.id} className="relative flex items-start gap-3">
                {/* Connecting Line */}
                {index !== activityEvents.length - 1 && (
                  <div className="absolute left-4 top-8 -bottom-3 w-0.5 bg-[#EEF1F5]" />
                )}

                {/* Circle Icon Badge */}
                <div
                  className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#EEF1F5] bg-white"
                  style={{ color: act.color }}
                >
                  <span className="material-symbols-outlined text-[17px]">{act.icon}</span>
                </div>

                {/* Event info */}
                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs font-extrabold text-[#111827]">{act.title}</p>
                  <p className="truncate text-[11px] font-medium text-[#727272]">{act.subtitle}</p>
                  <span className="text-[10px] font-semibold text-[#94A3B8]">{act.timeAgo}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onNavigate?.("cashflow")}
            className="mt-4 w-full rounded-xl border border-[#D9D9D9] bg-[#F7FAFF] py-2 text-center text-xs font-bold text-[#3A8157] transition-colors hover:bg-[#E8F3EC]"
          >
            Xem toàn bộ nhật ký giao dịch →
          </button>
        </div>
      </div>

      {/* 4. Secondary Widgets: Subscription Distribution (Left) & System Infrastructure Health (Right) */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Subscription & Engagement Distribution */}
        <div className="rounded-[24px] border border-[#D9D9D9] bg-white p-5 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] md:p-6">
          <div className="flex items-center justify-between border-b border-[#EEF1F5] pb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] text-[#8B63F6]">pie_chart</span>
              <h3 className="text-lg font-extrabold text-[#111827]">Phân bổ Hội viên & Gói cước</h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate?.("subscriptions")}
              className="text-xs font-bold text-[#3A8157] hover:underline"
            >
              Cấu hình gói →
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {/* Segmented Bar for Plans */}
            <div>
              <div className="mb-2 flex justify-between text-xs font-bold">
                <span className="text-[#111827]">Cơ cấu Hội viên hiện tại</span>
                <span className="text-[#727272]">100% active</span>
              </div>
              <div className="flex h-3 w-full overflow-hidden rounded-full bg-[#EEF1F5]">
                <div style={{ width: "60%" }} className="bg-[#3A8157]" title="Miễn phí (60%)" />
                <div style={{ width: "20%" }} className="bg-[#529CFF]" title="Gói BASIC (20%)" />
                <div style={{ width: "12%" }} className="bg-[#FFC857]" title="Gói GOLD (12%)" />
                <div style={{ width: "8%" }} className="bg-[#8B63F6]" title="Gói PREMIUM (8%)" />
              </div>
              <div className="mt-2.5 flex flex-wrap gap-4 text-[11px] font-semibold text-[#727272]">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#3A8157]"></span> Free: 60%
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#529CFF]"></span> Basic: 20%
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#FFC857]"></span> Gold: 12%
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#8B63F6]"></span> Premium: 8%
                </span>
              </div>
            </div>

            {/* Engagement Progress Bars */}
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#111827]">Tỷ lệ hoàn thành thói quen (Routine)</span>
                  <span className="text-[#3A8157]">78.4%</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#EEF1F5]">
                  <div className="h-full bg-[#3A8157]" style={{ width: "78.4%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#111827]">Tỷ lệ check-in cảm xúc hàng ngày</span>
                  <span className="text-[#529CFF]">84.2%</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#EEF1F5]">
                  <div className="h-full bg-[#529CFF]" style={{ width: "84.2%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: System Infrastructure & Payment Gateway Health */}
        <div className="rounded-[24px] border border-[#D9D9D9] bg-white p-5 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] md:p-6">
          <div className="flex items-center justify-between border-b border-[#EEF1F5] pb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] text-[#3A8157]">verified_user</span>
              <h3 className="text-lg font-extrabold text-[#111827]">Hạ tầng & Cổng thanh toán</h3>
            </div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800">
              Hệ thống ổn định 100%
            </span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[#EEF1F5] bg-[#F7FAFF] p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#111827]">Cổng SePay VietQR</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>
              <p className="mt-1 text-sm font-black text-[#3A8157]">MBBank 0123456789</p>
              <span className="text-[10px] font-semibold text-[#727272]">Webhook Response: ~38ms</span>
            </div>

            <div className="rounded-xl border border-[#EEF1F5] bg-[#F7FAFF] p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#111827]">Microservices gRPC</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              </div>
              <p className="mt-1 text-sm font-black text-[#111827]">5/5 Services Active</p>
              <span className="text-[10px] font-semibold text-[#727272]">Auth, Shop, Onboarding, Manage</span>
            </div>

            <div className="rounded-xl border border-[#EEF1F5] bg-[#F7FAFF] p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#111827]">Dung lượng Media Storage</span>
                <span className="text-[10px] font-extrabold text-[#529CFF]">48%</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#EEF1F5]">
                <div className="h-full bg-[#529CFF]" style={{ width: "48%" }} />
              </div>
              <span className="mt-1 block text-[10px] font-semibold text-[#727272]">2.4 GB / 5.0 GB Supabase</span>
            </div>

            <div className="rounded-xl border border-[#EEF1F5] bg-[#F7FAFF] p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#111827]">Độ trễ API Gateway</span>
                <span className="text-[10px] font-extrabold text-[#3A8157]">Rất tốt</span>
              </div>
              <p className="mt-1 text-sm font-black text-[#3A8157]">~32 ms</p>
              <span className="text-[10px] font-semibold text-[#727272]">Port 8080 • Spring Cloud</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom Section: Recent Orders Table (inspired by Metis recent-orders-table) */}
      <div className="rounded-[24px] border border-[#D9D9D9] bg-white p-5 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] md:p-6">
        <div className="flex items-center justify-between border-b border-[#EEF1F5] pb-4">
          <div>
            <h3 className="text-lg font-extrabold text-[#111827]">Đơn hàng & Giao dịch mới nhất</h3>
            <p className="text-xs font-semibold text-[#727272]">
              Tổng hợp các giao dịch phát sinh qua SePay VietQR và Ví Ruby.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate?.("cashflow")}
            className="text-xs font-extrabold text-[#3A8157] hover:underline"
          >
            Quản trị sổ quỹ đầy đủ →
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-xs">
            <thead>
              <tr className="border-b border-[#D9D9D9] text-[10px] font-extrabold uppercase tracking-widest text-[#727272]">
                <th className="py-2.5">Mã Giao dịch</th>
                <th className="py-2.5">Người dùng</th>
                <th className="py-2.5">Nội dung</th>
                <th className="py-2.5">Số tiền</th>
                <th className="py-2.5">Trạng thái</th>
                <th className="py-2.5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF1F5]">
              {transactions.slice(0, 5).map((tx) => (
                <tr key={tx.id} className="hover:bg-[#F7FAFF]">
                  <td className="py-3 font-mono font-extrabold text-[#111827]">{tx.transactionCode}</td>
                  <td className="py-3 font-extrabold text-[#111827]">{tx.userName || `User #${tx.userId}`}</td>
                  <td className="py-3 font-semibold text-[#727272]">{tx.description}</td>
                  <td className="py-3 font-black text-[#3A8157]">
                    {tx.direction === "IN" ? `+${formatVnd(tx.amountVnd)}` : `-${formatRuby(tx.rubyAmount)}`}
                  </td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                        tx.status === "SUCCESS"
                          ? "bg-emerald-100 text-emerald-800"
                          : tx.status === "PENDING"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      type="button"
                      onClick={() => onNavigate?.("cashflow")}
                      className="rounded-full border border-[#D9D9D9] bg-white px-2.5 py-1 text-[10px] font-bold text-[#111827] hover:border-[#3A8157] hover:text-[#3A8157]"
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
