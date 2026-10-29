export type VerifyFilter = "ALL" | "VERIFIED" | "UNVERIFIED"
export type OnboardingFilter = "ALL" | "COMPLETED" | "INCOMPLETE"
export type SearchMode = "KEYWORD" | "ID" | "EMAIL"

interface UserFilterBarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  searchMode: SearchMode
  setSearchMode: (mode: SearchMode) => void
  verifyFilter: VerifyFilter
  setVerifyFilter: (filter: VerifyFilter) => void
  onboardingFilter: OnboardingFilter
  setOnboardingFilter: (filter: OnboardingFilter) => void
  loading: boolean
  onSearchSubmit: (e?: React.FormEvent) => void
  onResetFilters: () => void
}

export default function UserFilterBar({
  searchTerm,
  setSearchTerm,
  searchMode,
  setSearchMode,
  verifyFilter,
  setVerifyFilter,
  onboardingFilter,
  setOnboardingFilter,
  loading,
  onSearchSubmit,
  onResetFilters,
}: UserFilterBarProps) {
  const hasActiveFilters =
    verifyFilter !== "ALL" || onboardingFilter !== "ALL" || Boolean(searchTerm.trim())

  return (
    <form onSubmit={onSearchSubmit} className="mb-6 space-y-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        {/* Search Mode Pill */}
        <div className="flex rounded-full border-2 border-black bg-[#F7FAFF] p-1 text-xs font-bold">
          {(["KEYWORD", "ID", "EMAIL"] as const).map((mode) => {
            const labels = { KEYWORD: "Từ khóa", ID: "User ID", EMAIL: "Email" }
            return (
              <button
                key={mode}
                type="button"
                onClick={() => setSearchMode(mode)}
                className={`rounded-full px-3 py-1.5 transition ${
                  searchMode === mode
                    ? "bg-[#3A8157] text-white shadow-sm"
                    : "text-[#727272] hover:text-black"
                }`}
              >
                {labels[mode]}
              </button>
            )
          })}
        </div>

        {/* Search input field */}
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-4 top-3 text-[20px] text-[#727272]">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              searchMode === "ID"
                ? "Nhập User ID (VD: 14)..."
                : searchMode === "EMAIL"
                  ? "Nhập Email chính xác (VD: pentava.official@gmail.com)..."
                  : "Tìm theo tên, email, từ khóa..."
            }
            className="h-11 w-full rounded-full border-2 border-[#D9D9D9] bg-[#F7FAFF] pl-11 pr-24 text-sm font-semibold outline-none transition-colors focus:border-[#3A8157] focus:bg-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-1.5 top-1.5 inline-flex h-8 items-center rounded-full border border-black bg-[#3A8157] px-4 text-xs font-extrabold text-white transition hover:bg-[#2F6B47] disabled:opacity-60"
          >
            Tìm
          </button>
        </div>
      </div>

      {/* Quick Dropdown Filters */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
        <span className="font-bold text-[#727272]">Lọc:</span>

        <select
          value={verifyFilter}
          onChange={(e) => setVerifyFilter(e.target.value as VerifyFilter)}
          className="h-8 rounded-lg border-2 border-[#D9D9D9] bg-white px-2.5 text-xs font-bold text-[#111827] outline-none focus:border-[#3A8157]"
        >
          <option value="ALL">Xác thực: Tất cả</option>
          <option value="VERIFIED">Đã xác thực email</option>
          <option value="UNVERIFIED">Chưa xác thực email</option>
        </select>

        <select
          value={onboardingFilter}
          onChange={(e) => setOnboardingFilter(e.target.value as OnboardingFilter)}
          className="h-8 rounded-lg border-2 border-[#D9D9D9] bg-white px-2.5 text-xs font-bold text-[#111827] outline-none focus:border-[#3A8157]"
        >
          <option value="ALL">Onboarding: Tất cả</option>
          <option value="COMPLETED">Đã hoàn tất onboarding</option>
          <option value="INCOMPLETE">Chưa hoàn tất</option>
        </select>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="ml-2 text-xs font-bold text-red-500 hover:underline"
          >
            Đặt lại bộ lọc
          </button>
        )}
      </div>
    </form>
  )
}

