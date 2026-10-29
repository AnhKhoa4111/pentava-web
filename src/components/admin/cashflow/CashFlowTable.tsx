import { useEffect, useState } from "react"
import type { CashFlowTransaction } from "../../../services/adminCashflowService"
import TablePagination from "../common/TablePagination"

function fmtVnd(n: number) {
  return n.toLocaleString("vi-VN") + " ₫"
}

function fmtRuby(n: number) {
  return n.toLocaleString("vi-VN") + " 💎"
}

function fmtDate(s?: string | null) {
  if (!s) return "—"
  try {
    return new Date(s).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return s
  }
}

const TYPE_LABEL: Record<string, string> = {
  TOPUP_RUBY: "Nạp Ruby",
  SUBSCRIPTION_PLAN: "Gói cước",
  SHOP_PURCHASE: "Mua Shop",
}

const TYPE_COLOR: Record<string, string> = {
  TOPUP_RUBY: "bg-[#FFF3CD] text-[#856404] border border-[#FFC857]",
  SUBSCRIPTION_PLAN: "bg-[#EDE9FE] text-[#5B21B6] border border-[#8B63F6]",
  SHOP_PURCHASE: "bg-[#DBEAFE] text-[#1D4ED8] border border-[#529CFF]",
}

const STATUS_BADGE: Record<string, string> = {
  SUCCESS: "bg-emerald-100 text-emerald-800",
  PENDING: "bg-amber-100 text-amber-800",
  FAILED: "bg-red-100 text-red-800",
}

const STATUS_LABEL: Record<string, string> = {
  SUCCESS: "Thành công",
  PENDING: "Chờ duyệt",
  FAILED: "Thất bại",
}

interface CashFlowTableProps {
  rows: CashFlowTransaction[]
  newTxCode: string | null
  onSelectTx: (tx: CashFlowTransaction) => void
  onQuickApprove?: (code: string) => void
  isApproving?: boolean
}

export default function CashFlowTable({
  rows,
  newTxCode,
  onSelectTx,
  onQuickApprove,
  isApproving,
}: CashFlowTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Reset về trang 1 khi danh sách thay đổi
  useEffect(() => {
    setCurrentPage(1)
  }, [rows.length])

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedRows = rows.slice((safePage - 1) * pageSize, safePage * pageSize)

  return (
    <div>
      <div className="overflow-hidden rounded-[20px] border border-[#E5E7EB]">
        <table className="w-full table-fixed border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[10px] font-black uppercase tracking-wider text-[#727272]">
              <th className="w-[125px] py-3 pl-3 pr-2">Mã GD</th>
              <th className="w-[88px] px-2 py-3">Phân loại</th>
              <th className="w-[16%] px-2 py-3">Khách hàng</th>
              <th className="w-[20%] px-2 py-3">Nội dung</th>
              <th className="w-[100px] px-2 py-3">Giá trị</th>
              <th className="w-[100px] px-2 py-3">Trạng thái</th>
              <th className="w-[105px] px-2 py-3">Thời gian</th>
              <th className="w-[135px] py-3 pl-2 pr-3 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB] font-semibold text-[#111827]">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-[#727272]">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[40px] text-gray-300">
                      receipt_long
                    </span>
                    <p className="text-base font-extrabold">Không có giao dịch nào</p>
                    <p className="text-xs">
                      Hãy thử thay đổi bộ lọc hoặc tạo giao dịch mới để kiểm tra.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedRows.map((tx) => {
                const isNew = newTxCode === tx.transactionCode
                return (
                  <tr
                    key={`${tx.id}-${tx.transactionCode}`}
                    onClick={() => onSelectTx(tx)}
                    className={`cursor-pointer transition-colors hover:bg-[#F9FAFB] ${
                      isNew ? "bg-[#FFF9ED] ring-2 ring-inset ring-[#FFC857]" : ""
                    }`}
                  >
                    <td className="whitespace-nowrap py-3 pl-3 pr-2">
                      <div className="flex items-center gap-1.5">
                        {isNew && (
                          <span
                            className="inline-block h-2.5 w-2.5 animate-ping rounded-full bg-[#3A8157]"
                            title="Mới nhận qua SSE Realtime"
                          />
                        )}
                        <span className="font-mono text-xs font-extrabold text-[#111827]">
                          {tx.transactionCode}
                        </span>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-2 py-3">
                      <span
                        className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                          TYPE_COLOR[tx.type] ?? "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {TYPE_LABEL[tx.type] ?? tx.type}
                      </span>
                    </td>

                    <td className="max-w-[130px] px-2 py-3 xl:max-w-[160px]">
                      <p className="truncate text-xs font-extrabold text-[#111827]">
                        {tx.userName ?? `User #${tx.userId}`}
                      </p>
                      {tx.userEmail && (
                        <p className="truncate font-mono text-[10px] text-[#727272]">
                          {tx.userEmail}
                        </p>
                      )}
                    </td>

                    <td className="max-w-[150px] px-2 py-3 xl:max-w-[200px]">
                      <p className="truncate text-xs text-[#374151]" title={tx.description}>
                        {tx.description}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-2 py-3">
                      {tx.direction === "IN" ? (
                        <span className="text-xs font-extrabold text-[#3A8157]">
                          +{fmtVnd(tx.amountVnd)}
                        </span>
                      ) : (
                        <span className="text-xs font-extrabold text-[#529CFF]">
                          −{fmtRuby(tx.rubyAmount)}
                        </span>
                      )}
                    </td>

                    <td className="whitespace-nowrap px-2 py-3">
                      <span
                        className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-bold ${
                          STATUS_BADGE[tx.status] ?? "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          {tx.status === "SUCCESS"
                            ? "check_circle"
                            : tx.status === "PENDING"
                              ? "schedule"
                              : "error"}
                        </span>
                        {STATUS_LABEL[tx.status] ?? tx.status}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-2 py-3 text-[11px] text-[#727272]">
                      {fmtDate(tx.createdAt)}
                    </td>

                    <td className="whitespace-nowrap py-3 pl-2 pr-3 text-right">
                      <div
                        className="flex items-center justify-end gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {tx.status === "PENDING" && onQuickApprove && (
                          <button
                            type="button"
                            disabled={isApproving}
                            onClick={() => onQuickApprove(tx.transactionCode)}
                            className="inline-flex h-7 shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-[#3A8157] px-2 text-[11px] font-extrabold text-white transition hover:bg-[#2F6B47] disabled:opacity-60"
                            title="Duyệt khớp tiền ngay"
                          >
                            <span className="material-symbols-outlined text-[13px]">done_all</span>
                            Duyệt
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => onSelectTx(tx)}
                          className="inline-flex h-7 shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-[#E8F3EC] px-2 text-[11px] font-bold text-[#3A8157] transition hover:bg-[#3A8157] hover:text-white"
                        >
                          <span className="material-symbols-outlined text-[13px]">visibility</span>
                          Chi tiết
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      {rows.length > 0 && (
        <TablePagination
          totalItems={rows.length}
          currentPage={safePage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      )}
    </div>
  )
}
