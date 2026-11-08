import type { CashFlowSummary } from "../../../services/adminCashflowService"

function fmtVnd(n: number) {
  return n.toLocaleString("vi-VN") + " ₫"
}

interface CashFlowStatsCardsProps {
  summary: CashFlowSummary | null
}

export default function CashFlowStatsCards({ summary }: CashFlowStatsCardsProps) {
  return (
    <div className="space-y-3">
      {/* Hero Card: Tổng doanh thu nổi bật & to hơn */}
      <div className="rounded-[22px] border border-[#D9D9D9] bg-gradient-to-r from-[#F0FDF4] via-white to-white p-5 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)] sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F3EC] text-[#3A8157]">
                <span className="material-symbols-outlined text-[22px]">payments</span>
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-[#727272]">
                Tổng doanh thu
              </span>
            </div>
            <p className="mt-2 text-3xl font-black tracking-tight text-black sm:text-4xl lg:text-[42px]">
              {fmtVnd(summary?.totalRevenueVnd ?? 0)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:flex-col sm:items-end sm:gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-extrabold text-[#3A8157]">
              <span className="h-2 w-2 rounded-full bg-[#3A8157] animate-pulse" />
              Hôm nay: +{fmtVnd(summary?.todayRevenueVnd ?? 0)}
            </span>
            <p className="text-[11px] font-semibold text-[#8E8E93]">
              Doanh thu thực nhận từ Nạp Ruby & Gói cước
            </p>
          </div>
        </div>
      </div>

      {/* 3 thẻ phân bổ nguồn thu & tiêu thụ */}
      {summary && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center justify-between rounded-[18px] border border-[#D9D9D9] bg-white px-4 py-3 shadow-[0_3px_0px_0px_rgba(0,0,0,0.04)]">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#727272]">
                Thu từ Nạp Ruby
              </p>
              <p className="mt-0.5 text-base font-extrabold text-[#D97706]">
                {fmtVnd(summary.revenueBySource?.rubyTopupVnd ?? 0)}
              </p>
            </div>
            <div className="rounded-xl bg-amber-50 p-2">
              <img src="/image/ruby.png" alt="Ruby" className="h-6 w-6 object-contain" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-[18px] border border-[#D9D9D9] bg-white px-4 py-3 shadow-[0_3px_0px_0px_rgba(0,0,0,0.04)]">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#727272]">
                Thu từ Gói cước
              </p>
              <p className="mt-0.5 text-base font-extrabold text-[#8B63F6]">
                {fmtVnd(summary.revenueBySource?.subscriptionVnd ?? 0)}
              </p>
            </div>
            <span className="material-symbols-outlined rounded-xl bg-purple-50 p-2 text-[22px] text-[#8B63F6]">
              workspace_premium
            </span>
          </div>

          <div className="flex items-center justify-between rounded-[18px] border border-[#D9D9D9] bg-white px-4 py-3 shadow-[0_3px_0px_0px_rgba(0,0,0,0.04)]">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#727272]">
                Ruby tiêu thụ trong Shop
              </p>
              <p className="mt-0.5 inline-flex items-center gap-1.5 text-base font-extrabold text-[#E11D48]">
                {(summary.rubySpent ?? 0).toLocaleString("vi-VN")}
                <img src="/image/ruby.png" alt="Ruby" className="h-4 w-4 object-contain" />
              </p>
            </div>
            <div className="rounded-xl bg-rose-50 p-2">
              <img src="/image/ruby.png" alt="Ruby" className="h-6 w-6 object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

