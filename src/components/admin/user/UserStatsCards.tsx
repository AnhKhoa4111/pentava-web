interface UserStatsCardsProps {
  stats: {
    total: number
    verified: number
    onboarded: number
    incompleted: number
  }
}

export default function UserStatsCards({ stats }: UserStatsCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <div className="rounded-[20px] border border-[#D9D9D9] bg-white p-4 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#727272]">Tổng người dùng</span>
          <span className="material-symbols-outlined text-[22px] text-[#3A8157]">group</span>
        </div>
        <p className="mt-2 text-2xl font-extrabold text-black">{stats.total}</p>
      </div>

      <div className="rounded-[20px] border border-emerald-200 bg-[#ECFDF5] p-4 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-emerald-800">Đã xác thực email</span>
          <span className="material-symbols-outlined text-[22px] text-emerald-600">verified</span>
        </div>
        <p className="mt-2 text-2xl font-extrabold text-emerald-900">{stats.verified}</p>
      </div>

      <div className="rounded-[20px] border border-blue-200 bg-[#EFF6FF] p-4 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-blue-800">Hoàn tất Onboarding</span>
          <span className="material-symbols-outlined text-[22px] text-blue-600">flag</span>
        </div>
        <p className="mt-2 text-2xl font-extrabold text-blue-900">{stats.onboarded}</p>
      </div>

      <div className="rounded-[20px] border border-amber-200 bg-[#FFFBEB] p-4 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-800">Chưa xong Onboarding</span>
          <span className="material-symbols-outlined text-[22px] text-amber-600">pending</span>
        </div>
        <p className="mt-2 text-2xl font-extrabold text-amber-900">{stats.incompleted}</p>
      </div>
    </div>
  )
}
