import { useEffect, useState } from "react"
import type { AdminUser } from "../../../services/adminUserService"
import TablePagination from "../common/TablePagination"

interface UserTableProps {
  users: AdminUser[]
  loading: boolean
  onOpenDetail: (user: AdminUser) => void
  onOpenEditName: (user: AdminUser) => void
}

function formatDateParts(isoString?: string): { date: string; time: string } {
  if (!isoString) return { date: "—", time: "" }
  try {
    const d = new Date(isoString)
    return {
      date: d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      time: d.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  } catch {
    return { date: isoString, time: "" }
  }
}

export default function UserTable({
  users,
  loading,
  onOpenDetail,
  onOpenEditName,
}: UserTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Reset về trang 1 khi danh sách lọc thay đổi
  useEffect(() => {
    setCurrentPage(1)
  }, [users.length])

  const totalPages = Math.max(1, Math.ceil(users.length / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedUsers = users.slice((safePage - 1) * pageSize, safePage * pageSize)

  return (
    <div>
      <div className="overflow-x-auto rounded-[20px] border border-[#E5E7EB]">
        <table className="w-full min-w-[760px] table-fixed border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[10px] font-black uppercase tracking-wider text-[#727272]">
              <th className="w-[48px] py-3 pl-3 pr-1">ID</th>
              <th className="w-[20%] px-2 py-3">Người dùng</th>
              <th className="w-[22%] px-2 py-3">Email</th>
              <th className="w-[105px] px-2 py-3">Xác thực</th>
              <th className="w-[98px] px-2 py-3">Onboarding</th>
              <th className="w-[95px] px-2 py-3">Ngày tạo</th>
              <th className="w-[172px] py-3 pl-2 pr-3 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB] font-semibold text-[#111827]">
            {loading ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-[#727272]">
                  <div className="inline-flex items-center gap-2">
                    <span className="material-symbols-outlined animate-spin text-[#3A8157]">
                      progress_activity
                    </span>
                    <span>Đang tải danh sách người dùng...</span>
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-[#727272]">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[40px] text-gray-300">
                      person_search
                    </span>
                    <p className="text-base font-extrabold">Không tìm thấy người dùng nào</p>
                    <p className="text-xs">Hãy thử thay đổi từ khóa tìm kiếm hoặc đặt lại bộ lọc.</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => {
                const initial = (user.name || user.email || "?").charAt(0).toUpperCase()
                const { date, time } = formatDateParts(user.createdAt)
                return (
                  <tr key={user.id} className="transition-colors hover:bg-[#F9FAFB]">
                    <td className="overflow-hidden truncate py-3 pl-3 pr-1 font-mono text-xs font-bold text-[#727272]">
                      #{user.id}
                    </td>

                    <td className="overflow-hidden px-2 py-3">
                      <div className="flex items-center gap-2 overflow-hidden">
                        {user.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt={user.name || user.email}
                            className="h-8 w-8 shrink-0 rounded-full border border-gray-200 object-cover"
                          />
                        ) : (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F3EC] text-xs font-black text-[#3A8157]">
                            {initial}
                          </div>
                        )}
                        <div className="min-w-0 flex-1 overflow-hidden">
                          <p
                            className="truncate text-xs font-extrabold text-[#111827]"
                            title={user.name || "Chưa đặt tên"}
                          >
                            {user.name || <span className="italic text-gray-400">Chưa đặt tên</span>}
                          </p>
                          {user.bio ? (
                            <p className="truncate text-[10px] text-[#727272]" title={user.bio}>
                              {user.bio}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </td>

                    <td className="overflow-hidden px-2 py-3">
                      <p
                        className="truncate font-mono text-[11px] text-[#374151]"
                        title={user.email}
                      >
                        {user.email}
                      </p>
                    </td>

                    <td className="overflow-hidden whitespace-nowrap px-2 py-3">
                      {user.isVerified ? (
                        <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-emerald-100 px-2 py-0.5 text-[8px] font-bold text-emerald-800">
                          <span className="material-symbols-outlined text-[8px]">check_circle</span>
                          Đã xác thực
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-gray-100 px-2 py-0.5 text-[8px] font-bold text-gray-600">
                          <span className="material-symbols-outlined text-[8px]">cancel</span>
                          Chưa
                        </span>
                      )}
                    </td>

                    <td className="overflow-hidden whitespace-nowrap px-2 py-3">
                      {user.hasCompletedOnboarding ? (
                        <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-blue-100 px-2 py-0.5 text-[8px] font-bold text-blue-800">
                          <span className="material-symbols-outlined text-[8px]">task_alt</span>
                          Hoàn tất
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-amber-100 px-2 py-0.5 text-[8px] font-bold text-amber-800">
                          <span className="material-symbols-outlined text-[8px]">pending</span>
                          Chưa xong
                        </span>
                      )}
                    </td>

                    <td className="overflow-hidden whitespace-nowrap px-2 py-3 leading-tight">
                      <p className="text-[11px] font-bold text-[#374151]">{date}</p>
                      {time && <p className="text-[10px] text-[#727272]">{time}</p>}
                    </td>

                    <td className="overflow-hidden whitespace-nowrap py-3 pl-2 pr-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onOpenEditName(user)}
                          className="inline-flex h-7 shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-[#D9D9D9] bg-white px-2.5 text-[8px] font-bold text-[#111827] transition hover:border-[#3A8157] hover:text-[#3A8157]"
                          title="Sửa tên người dùng"
                        >
                          <span className="material-symbols-outlined text-[8px]">edit</span>
                          Sửa tên
                        </button>

                        <button
                          type="button"
                          onClick={() => onOpenDetail(user)}
                          className="inline-flex h-7 shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-[#E8F3EC] px-2.5 text-[8px] font-bold text-[#3A8157] transition hover:bg-[#3A8157] hover:text-white"
                          title="Xem chi tiết"
                        >
                          <span className="material-symbols-outlined text-[8px]">visibility</span>
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
      {!loading && users.length > 0 && (
        <TablePagination
          totalItems={users.length}
          currentPage={safePage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      )}
    </div>
  )
}
