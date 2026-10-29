import type { CashFlowSummary } from "../../../services/adminCashflowService"

function fmtVnd(n: number) {
  return n.toLocaleString("vi-VN") + " ₫"
}

function fmtRuby(n: number) {
  return n.toLocaleString("vi-VN") + " 💎"
}

interface CashFlowStatsCardsProps {
  summary: CashFlowSummary | null
}

export default function CashFlowStatsCards({ summary }: CashFlowStatsCardsProps) {
  return (
    <div className="space-y-3">
      {/* 4 KPI Cards chính — đồng bộ chuẩn trục X với UserManager & ContactManager */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-[20px] border border-[#D9D9D9] bg-white p-4 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#727272]">Tổng doanh thu</span>
            <span className="material-symbols-outlined text-[22px] text-[#3A8157]">payments</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-black">
            {fmtVnd(summary?.totalRevenueVnd ?? 0)}
          </p>
          <p className="mt-1 text-[11px] font-semibold text-[#3A8157]">
            Hôm nay: {fmtVnd(summary?.todayRevenueVnd ?? 0)}
          </p>
        </div>

        <div className="rounded-[20px] border border-amber-200 bg-[#FFFBEB] p-4 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800">Ruby đã phát hành</span>
            <span className="material-symbols-outlined text-[22px] text-amber-600">diamond</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-amber-900">
            {fmtRuby(summary?.rubyMinted ?? 0)}
          </p>
          <p className="mt-1 text-[11px] font-semibold text-amber-700">
            Lưu hành: {fmtRuby(summary?.rubyCirculating ?? 0)}
          </p>
        </div>

        <div className="rounded-[20px] border border-blue-200 bg-[#EFF6FF] p-4 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-800">Tổng giao dịch</span>
            <span className="material-symbols-outlined text-[22px] text-blue-600">receipt_long</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-blue-900">
            {(summary?.totalTransactions ?? 0).toLocaleString("vi-VN")}
          </p>
          <p className="mt-1 text-[11px] font-semibold text-blue-700">
            {summary?.successCount ?? 0} xong · {summary?.pendingCount ?? 0} chờ · {summary?.failedCount ?? 0} lỗi
          </p>
        </div>

        <div className="rounded-[20px] border border-purple-200 bg-[#F5F3FF] p-4 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-800">Tỷ lệ chuyển đổi</span>
            <span className="material-symbols-outlined text-[22px] text-purple-600">trending_up</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-purple-900">
            {((summary?.conversionRate ?? 0) * 100).toFixed(1)}%
          </p>
          <p className="mt-1 text-[11px] font-semibold text-purple-700">
            Chờ thu: {fmtVnd(summary?.pendingRevenueVnd ?? 0)}
          </p>
        </div>
      </div>

      {/* 3 thẻ phân bổ nguồn thu & tiêu thụ */}
      {summary && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center justify-between rounded-[18px] border border-[#D9D9D9] bg-white px-4 py-3 shadow-[0_3px_0px_0px_rgba(0,0,0,0.04)]">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#727272]">
                Thu từ Nạp Ruby (VietQR)
              </p>
              <p className="mt-0.5 text-base font-extrabold text-[#D97706]">
                {fmtVnd(summary.revenueBySource?.rubyTopupVnd ?? 0)}
              </p>
            </div>
            <span className="rounded-xl bg-amber-50 p-2 text-lg">💎</span>
          </div>

          <div className="flex items-center justify-between rounded-[18px] border border-[#D9D9D9] bg-white px-4 py-3 shadow-[0_3px_0px_0px_rgba(0,0,0,0.04)]">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#727272]">
                Thu từ Gói cước (VietQR)
              </p>
              <p className="mt-0.5 text-base font-extrabold text-[#8B63F6]">
                {fmtVnd(summary.revenueBySource?.subscriptionVnd ?? 0)}
              </p>
            </div>
            <span className="rounded-xl bg-purple-50 p-2 text-lg">👑</span>
          </div>

          <div className="flex items-center justify-between rounded-[18px] border border-[#D9D9D9] bg-white px-4 py-3 shadow-[0_3px_0px_0px_rgba(0,0,0,0.04)]">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#727272]">
                Ruby tiêu thụ trong Shop
              </p>
              <p className="mt-0.5 text-base font-extrabold text-[#529CFF]">
                {fmtRuby(summary.rubySpent ?? 0)}
              </p>
            </div>
            <span className="rounded-xl bg-blue-50 p-2 text-lg">🛍️</span>
          </div>
        </div>
      )}
    </div>
  )
}

