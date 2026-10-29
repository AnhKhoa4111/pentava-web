interface TablePaginationProps {
  totalItems: number
  currentPage: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
  pageSizeOptions?: number[]
}

export default function TablePagination({
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
}: TablePaginationProps) {
  if (totalItems === 0) return null

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const safePage = Math.min(Math.max(1, currentPage), totalPages)
  const startItem = (safePage - 1) * pageSize + 1
  const endItem = Math.min(safePage * pageSize, totalItems)

  // Tạo danh sách các số trang hiển thị gọn gàng
  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    if (safePage <= 3) {
      return [1, 2, 3, 4, "...", totalPages]
    }
    if (safePage >= totalPages - 2) {
      return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }
    return [1, "...", safePage - 1, safePage, safePage + 1, "...", totalPages]
  }

  return (
    <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t border-[#EEF1F5] pt-3.5 text-xs sm:flex-row">
      {/* Left: Thông tin hiển thị & chọn số dòng */}
      <div className="flex flex-wrap items-center gap-3 text-[#727272]">
        <span>
          Hiển thị <strong className="font-extrabold text-[#111827]">{startItem}</strong>–
          <strong className="font-extrabold text-[#111827]">{endItem}</strong> trong tổng số{" "}
          <strong className="font-extrabold text-[#3A8157]">{totalItems}</strong> bản ghi
        </span>

        {onPageSizeChange && (
          <div className="flex items-center gap-1.5">
            <span>· Hiển thị:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                onPageSizeChange(Number(e.target.value))
                onPageChange(1)
              }}
              className="h-7 rounded-lg border border-[#D9D9D9] bg-white px-2 text-xs font-extrabold text-[#111827] outline-none focus:border-[#3A8157]"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt} dòng
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Right: Các nút chuyển trang */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={safePage <= 1}
          onClick={() => onPageChange(safePage - 1)}
          className="inline-flex h-8 items-center gap-1 rounded-full border border-[#D9D9D9] bg-white px-2.5 text-xs font-bold text-[#111827] transition hover:border-[#3A8157] hover:text-[#3A8157] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="material-symbols-outlined text-[15px]">chevron_left</span>
          Trước
        </button>

        {getPageNumbers().map((p, idx) =>
          p === "..." ? (
            <span key={`dots-${idx}`} className="px-1.5 font-bold text-[#727272]">
              ...
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold transition ${
                safePage === p
                  ? "bg-[#3A8157] text-white shadow-sm"
                  : "border border-[#D9D9D9] bg-white text-[#111827] hover:border-[#3A8157] hover:text-[#3A8157]"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          type="button"
          disabled={safePage >= totalPages}
          onClick={() => onPageChange(safePage + 1)}
          className="inline-flex h-8 items-center gap-1 rounded-full border border-[#D9D9D9] bg-white px-2.5 text-xs font-bold text-[#111827] transition hover:border-[#3A8157] hover:text-[#3A8157] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Sau
          <span className="material-symbols-outlined text-[15px]">chevron_right</span>
        </button>
      </div>
    </div>
  )
}

