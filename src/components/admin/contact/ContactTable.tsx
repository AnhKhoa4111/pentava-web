import { useEffect, useState } from "react"
import {
  STATUS_META,
  type ContactInquiry,
} from "../../../services/contactService"
import TablePagination from "../common/TablePagination"

function formatDate(isoString?: string) {
  if (!isoString) return "—"
  try {
    const d = new Date(isoString)
    return d.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return isoString
  }
}

interface ContactTableProps {
  contacts: ContactInquiry[]
  searchTerm: string
  onOpenDetail: (contact: ContactInquiry) => void
  onDelete: (contact: ContactInquiry) => void
}

export default function ContactTable({
  contacts,
  searchTerm,
  onOpenDetail,
  onDelete,
}: ContactTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Reset về trang 1 khi danh sách thay đổi
  useEffect(() => {
    setCurrentPage(1)
  }, [contacts.length])

  const totalPages = Math.max(1, Math.ceil(contacts.length / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedContacts = contacts.slice((safePage - 1) * pageSize, safePage * pageSize)

  return (
    <div>
      <div className="overflow-hidden rounded-[20px] border border-[#E5E7EB]">
        <table className="w-full table-fixed border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[10px] font-black uppercase tracking-wider text-[#727272]">
              <th className="w-[50px] py-3 pl-3 pr-1.5">ID</th>
              <th className="w-[18%] px-2 py-3">Người gửi</th>
              <th className="w-[24%] px-2 py-3">Tiêu đề & Nội dung</th>
              <th className="w-[105px] px-2 py-3">Thời gian</th>
              <th className="w-[115px] px-2 py-3">Trạng thái</th>
              <th className="w-[15%] px-2 py-3">Ghi chú xử lý</th>
              <th className="w-[115px] py-3 pl-2 pr-3 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB] font-semibold text-[#111827]">
            {paginatedContacts.map((contact) => {
              const meta = STATUS_META[contact.status] || STATUS_META.PENDING
              return (
                <tr
                  key={contact.id}
                  className="transition-colors hover:bg-[#F9FAFB]"
                >
                  <td className="whitespace-nowrap py-3 pl-3 pr-1.5 font-mono text-xs font-bold text-[#727272]">
                    #{contact.id}
                  </td>

                  <td className="max-w-[140px] px-2 py-3 xl:max-w-[170px]">
                    <p className="truncate font-extrabold text-black">{contact.fullName}</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="block truncate font-mono text-[11px] font-semibold text-[#529CFF] hover:underline"
                    >
                      {contact.email}
                    </a>
                    {contact.phone && (
                      <p className="text-[11px] text-[#727272]">{contact.phone}</p>
                    )}
                  </td>

                  <td className="max-w-[170px] px-2 py-3 xl:max-w-[230px]">
                    <p className="truncate font-extrabold text-black">{contact.subject}</p>
                    <p className="line-clamp-2 text-[11px] text-[#727272]">
                      {contact.message}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-2 py-3 text-[11px] text-[#727272]">
                    {formatDate(contact.createdAt)}
                  </td>

                  <td className="whitespace-nowrap px-2 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-extrabold ${meta.badgeClass}`}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: meta.text }}
                      />
                      {meta.label}
                    </span>
                  </td>

                  <td className="max-w-[130px] px-2 py-3 text-[11px] text-[#727272]">
                    {contact.adminNote ? (
                      <span className="line-clamp-2 italic text-[#4A5568]">
                        "{contact.adminNote}"
                      </span>
                    ) : (
                      <span className="text-gray-400">— Chưa có —</span>
                    )}
                  </td>

                  <td className="whitespace-nowrap py-3 pl-2 pr-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onOpenDetail(contact)}
                        className="inline-flex h-7 shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-[#E8F3EC] px-2 text-[11px] font-bold text-[#3A8157] transition hover:bg-[#3A8157] hover:text-white"
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          edit_note
                        </span>
                        Xử lý
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(contact)}
                        title="Xóa liên hệ này"
                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-50"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {contacts.length === 0 && (
          <div className="py-12 text-center">
            <span className="material-symbols-outlined text-[40px] text-gray-300">
              contact_mail
            </span>
            <p className="mt-2 text-base font-extrabold text-[#727272]">
              Không có yêu cầu liên hệ nào
            </p>
            <p className="text-xs text-[#727272]">
              {searchTerm
                ? "Không tìm thấy kết quả phù hợp với từ khóa."
                : "Chưa có liên hệ nào thuộc trạng thái này."}
            </p>
          </div>
        )}
      </div>

      {/* Phân trang */}
      {contacts.length > 0 && (
        <TablePagination
          totalItems={contacts.length}
          currentPage={safePage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      )}
    </div>
  )
}
