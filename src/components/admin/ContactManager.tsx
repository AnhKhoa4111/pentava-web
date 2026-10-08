import { useEffect, useMemo, useState } from "react"
import {
  contactService,
  STATUS_META,
  type ContactInquiry,
  type ContactStatus,
} from "../../services/contactService"

const ALL_STATUSES: { key: ContactStatus | "ALL"; label: string }[] = [
  { key: "ALL", label: "Tất cả" },
  { key: "PENDING", label: "Chờ xử lý" },
  { key: "IN_PROGRESS", label: "Đang xử lý" },
  { key: "RESOLVED", label: "Đã giải quyết" },
  { key: "SPAM", label: "Spam" },
]

export default function ContactManager() {
  const [contacts, setContacts] = useState<ContactInquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<ContactStatus | "ALL">("ALL")
  const [searchTerm, setSearchTerm] = useState("")

  // Modal detail & update state
  const [selectedContact, setSelectedContact] = useState<ContactInquiry | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [newStatus, setNewStatus] = useState<ContactStatus>("PENDING")
  const [newAdminNote, setNewAdminNote] = useState("")

  // Notification toast
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text })
    setTimeout(() => {
      setToast(null)
    }, 4000)
  }

  // Fetch contacts
  const fetchContacts = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await contactService.getContacts(
        statusFilter === "ALL" ? "" : statusFilter,
      )
      setContacts(data)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Không thể tải danh sách liên hệ."
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [statusFilter])

  // Open detail modal and fetch freshest details from GET /api/manage/contacts/{id}
  const handleOpenDetail = async (contact: ContactInquiry) => {
    setSelectedContact(contact)
    setNewStatus(contact.status)
    setNewAdminNote(contact.adminNote || "")
    setDetailLoading(true)

    try {
      const fullDetail = await contactService.getContactById(contact.id)
      setSelectedContact(fullDetail)
      setNewStatus(fullDetail.status)
      setNewAdminNote(fullDetail.adminNote || "")
    } catch (err) {
      console.warn("Could not fetch contact detail, using cached:", err)
    } finally {
      setDetailLoading(false)
    }
  }

  // Update status & admin note
  const handleUpdateStatus = async () => {
    if (!selectedContact) return
    setUpdating(true)
    try {
      const updated = await contactService.updateStatus(selectedContact.id, {
        status: newStatus,
        adminNote: newAdminNote.trim() || undefined,
      })

      // Update in state
      setContacts((prev) =>
        prev.map((item) => (item.id === selectedContact.id ? { ...item, ...updated } : item)),
      )
      setSelectedContact(updated)
      showToast("success", `Cập nhật liên hệ #${selectedContact.id} thành công!`)
      setSelectedContact(null)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Cập nhật trạng thái thất bại."
      showToast("error", msg)
    } finally {
      setUpdating(false)
    }
  }

  // Delete contact
  const handleDelete = async (contact: ContactInquiry) => {
    const confirm = window.confirm(
      `Bạn có chắc chắn muốn xóa liên hệ #${contact.id} từ "${contact.fullName}" không?`,
    )
    if (!confirm) return

    try {
      await contactService.deleteContact(contact.id)
      setContacts((prev) => prev.filter((item) => item.id !== contact.id))
      if (selectedContact?.id === contact.id) {
        setSelectedContact(null)
      }
      showToast("success", `Đã xóa liên hệ #${contact.id} thành công.`)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Không thể xóa liên hệ."
      showToast("error", msg)
    }
  }

  // Filter contacts by search query
  const filteredContacts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return contacts

    return contacts.filter((item) => {
      const textToSearch = [
        item.fullName,
        item.email,
        item.phone || "",
        item.subject,
        item.message,
        item.adminNote || "",
        String(item.id),
      ]
        .join(" ")
        .toLowerCase()

      return textToSearch.includes(query)
    })
  }, [contacts, searchTerm])

  // Status stats counters
  const counts = useMemo(() => {
    const res = {
      TOTAL: contacts.length,
      PENDING: 0,
      IN_PROGRESS: 0,
      RESOLVED: 0,
      SPAM: 0,
    }
    contacts.forEach((c) => {
      if (c.status && res[c.status] !== undefined) {
        res[c.status]++
      }
    })
    return res
  }, [contacts])

  // Export CSV
  const handleExportCsv = () => {
    const header = [
      "ID",
      "Họ và tên",
      "Email",
      "Số điện thoại",
      "Tiêu đề",
      "Nội dung",
      "Trạng thái",
      "Ghi chú Admin",
      "Ngày tạo",
      "Ngày cập nhật",
    ]

    const rows = filteredContacts.map((c) => [
      c.id,
      c.fullName,
      c.email,
      c.phone || "",
      c.subject,
      c.message,
      STATUS_META[c.status]?.label || c.status,
      c.adminNote || "",
      c.createdAt,
      c.updatedAt,
    ])

    const csvContent =
      "\ufeff" +
      [header, ...rows]
        .map((row) =>
          row.map((field) => `"${String(field).replaceAll('"', '""')}"`).join(","),
        )
        .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `pentava-contacts-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const formatDate = (isoString?: string) => {
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

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed right-6 top-24 z-50 flex items-center gap-3 rounded-2xl border-2 px-5 py-4 shadow-xl transition-all ${toast.type === "success"
            ? "border-[#3A8157] bg-white text-[#3A8157]"
            : "border-red-500 bg-white text-red-600"
            }`}
        >
          <span className="material-symbols-outlined text-[24px]">
            {toast.type === "success" ? "check_circle" : "error"}
          </span>
          <span className="text-sm font-extrabold">{toast.text}</span>
        </div>
      )}

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-[20px] border border-[#D9D9D9] bg-white p-4 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#727272]">Tổng liên hệ</span>
            <span className="material-symbols-outlined text-[22px] text-[#3A8157]">inbox</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-black">{counts.TOTAL}</p>
        </div>

        <div className="rounded-[20px] border border-amber-200 bg-[#FFFBEB] p-4 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800">Chờ xử lý</span>
            <span className="material-symbols-outlined text-[22px] text-amber-600">schedule</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-amber-900">{counts.PENDING}</p>
        </div>

        <div className="rounded-[20px] border border-blue-200 bg-[#EFF6FF] p-4 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-800">Đang xử lý</span>
            <span className="material-symbols-outlined text-[22px] text-blue-600">sync</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-blue-900">{counts.IN_PROGRESS}</p>
        </div>

        <div className="rounded-[20px] border border-emerald-200 bg-[#ECFDF5] p-4 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800">Đã giải quyết</span>
            <span className="material-symbols-outlined text-[22px] text-emerald-600">task_alt</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-emerald-900">{counts.RESOLVED}</p>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="rounded-[24px] border border-[#D9D9D9] bg-white p-5 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] md:p-6">
        {/* Header Actions */}
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[26px] text-[#3A8157]">
                contact_mail
              </span>
              <h2 className="text-2xl font-extrabold text-black">Yêu cầu liên hệ từ khách hàng</h2>
            </div>
            {/* <p className="mt-1 text-xs font-semibold text-[#727272]">
              Dữ liệu trực tiếp từ Landing Page qua API backend <code className="rounded bg-[#F0F2F5] px-1.5 py-0.5 text-[#3A8157]">/api/manage/contacts</code>
            </p> */}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-[#3A8157] bg-white px-4 text-xs font-extrabold text-[#3A8157] transition-colors hover:bg-[#E8F3EC]"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Xuất CSV
            </button> */}

            <button
              type="button"
              onClick={fetchContacts}
              disabled={loading}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#3A8157] px-4 text-xs font-extrabold uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_#FFC857] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              <span className={`material-symbols-outlined text-[18px] ${loading ? "animate-spin" : ""}`}>
                refresh
              </span>
              Làm mới
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-3 text-[20px] text-[#727272]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên, email, số điện thoại, tiêu đề, nội dung..."
              className="h-11 w-full rounded-full border border-[#D9D9D9] bg-[#F7FAFF] pl-11 pr-4 text-sm font-semibold outline-none transition-colors focus:border-[#3A8157] focus:bg-white"
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {ALL_STATUSES.map((item) => {
              const active = statusFilter === item.key
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setStatusFilter(item.key)}
                  className={`rounded-full px-3.5 py-2 text-xs font-extrabold transition-all ${active
                    ? "bg-[#3A8157] text-white shadow-[2px_2px_0px_0px_#FFC857]"
                    : "border border-[#D9D9D9] bg-white text-[#727272] hover:bg-[#F7FAFF]"
                    }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 flex items-center justify-between rounded-[18px] border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-600">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">warning</span>
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={fetchContacts}
              className="rounded-full bg-red-600 px-3 py-1 text-xs text-white"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#3A8157] border-t-transparent" />
            <p className="mt-3 text-sm font-bold text-[#727272]">Đang tải dữ liệu liên hệ...</p>
          </div>
        )}

        {/* Table */}
        {!loading && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="border-b border-[#D9D9D9] text-[10px] uppercase tracking-widest text-[#727272]">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Người gửi</th>
                  <th className="px-4 py-3">Tiêu đề & Nội dung</th>
                  <th className="px-4 py-3">Thời gian</th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3">Ghi chú xử lý</th>
                  <th className="px-4 py-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF1F5]">
                {filteredContacts.map((contact) => {
                  const meta = STATUS_META[contact.status] || STATUS_META.PENDING
                  return (
                    <tr
                      key={contact.id}
                      className="text-sm transition-colors hover:bg-[#F7FAFF]"
                    >
                      <td className="px-4 py-4 font-extrabold text-black">
                        #{contact.id}
                      </td>

                      <td className="px-4 py-4">
                        <p className="font-extrabold text-black">{contact.fullName}</p>
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-xs font-semibold text-[#529CFF] hover:underline"
                        >
                          {contact.email}
                        </a>
                        {contact.phone && (
                          <p className="text-xs text-[#727272]">{contact.phone}</p>
                        )}
                      </td>

                      <td className="max-w-[280px] px-4 py-4">
                        <p className="truncate font-extrabold text-black">{contact.subject}</p>
                        <p className="line-clamp-2 text-xs text-[#727272]">
                          {contact.message}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-xs font-semibold text-[#727272]">
                        {formatDate(contact.createdAt)}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-extrabold ${meta.badgeClass}`}
                        >
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: meta.text }}
                          />
                          {meta.label}
                        </span>
                      </td>

                      <td className="max-w-[180px] px-4 py-4 text-xs font-semibold text-[#727272]">
                        {contact.adminNote ? (
                          <span className="line-clamp-2 italic text-[#4A5568]">
                            "{contact.adminNote}"
                          </span>
                        ) : (
                          <span className="text-gray-400">— Chưa có —</span>
                        )}
                      </td>

                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenDetail(contact)}
                            className="inline-flex items-center gap-1 rounded-full border border-[#3A8157] bg-white px-3 py-1.5 text-xs font-extrabold text-[#3A8157] transition-all hover:bg-[#3A8157] hover:text-white"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              edit_note
                            </span>
                            Xử lý
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(contact)}
                            title="Xóa liên hệ này"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-50"
                          >
                            <span className="material-symbols-outlined text-[18px]">
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

            {filteredContacts.length === 0 && (
              <div className="py-16 text-center">
                <span className="material-symbols-outlined text-[48px] text-[#D9D9D9]">
                  contact_mail
                </span>
                <p className="mt-3 text-base font-extrabold text-black">
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
        )}
      </div>

      {/* Modal: View Details & Update Status */}
      {selectedContact && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedContact(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-[620px] overflow-y-auto rounded-[28px] border-2 border-[#3A8157] bg-white p-6 shadow-[10px_10px_0px_0px_#FFC857] md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="mb-6 flex items-start justify-between border-b border-[#EEF1F5] pb-4">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#3A8157]">
                  Chi tiết yêu cầu #{selectedContact.id}
                </span>
                <h3 className="mt-1 text-2xl font-extrabold text-black">
                  {selectedContact.subject}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedContact(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7FAFF] text-[#727272] hover:bg-[#EEF1F5]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {detailLoading ? (
              <div className="py-12 text-center text-sm font-bold text-[#727272]">
                Đang tải thông tin chi tiết...
              </div>
            ) : (
              <div className="space-y-6">
                {/* Contact Sender Information */}
                <div className="rounded-[20px] border border-[#E5E9F0] bg-[#F7FAFF] p-4">
                  <h4 className="mb-3 text-[11px] font-extrabold uppercase tracking-wider text-[#727272]">
                    Thông tin người liên hệ
                  </h4>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm">
                    <div>
                      <span className="text-xs text-[#727272]">Họ và tên:</span>
                      <p className="font-extrabold text-black">{selectedContact.fullName}</p>
                    </div>

                    <div>
                      <span className="text-xs text-[#727272]">Email:</span>
                      <p>
                        <a
                          href={`mailto:${selectedContact.email}`}
                          className="font-extrabold text-[#529CFF] hover:underline"
                        >
                          {selectedContact.email}
                        </a>
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-[#727272]">Số điện thoại:</span>
                      <p className="font-extrabold text-black">
                        {selectedContact.phone ? (
                          <a href={`tel:${selectedContact.phone}`} className="hover:underline">
                            {selectedContact.phone}
                          </a>
                        ) : (
                          "Không cung cấp"
                        )}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-[#727272]">Thời gian gửi:</span>
                      <p className="font-extrabold text-black">
                        {formatDate(selectedContact.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div>
                  <h4 className="mb-2 text-[11px] font-extrabold uppercase tracking-wider text-[#727272]">
                    Nội dung yêu cầu từ khách hàng
                  </h4>
                  <div className="rounded-[18px] border border-[#D9D9D9] bg-white p-4 text-sm leading-relaxed text-[#2D3748]">
                    {selectedContact.message}
                  </div>
                </div>

                {/* Status Update Form */}
                <div className="rounded-[20px] border-2 border-[#529CFF]/30 bg-[#F7FAFF] p-5">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-extrabold text-black">
                    <span className="material-symbols-outlined text-[20px] text-[#529CFF]">
                      published_with_changes
                    </span>
                    Cập nhật trạng thái & Ghi chú xử lý (Admin)
                  </h4>

                  {/* Status Selection */}
                  <div className="mb-4">
                    <label className="mb-2 block text-xs font-bold text-[#727272]">
                      Trạng thái hiện tại:
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {(["PENDING", "IN_PROGRESS", "RESOLVED", "SPAM"] as ContactStatus[]).map(
                        (st) => {
                          const meta = STATUS_META[st]
                          const isSelected = newStatus === st
                          return (
                            <button
                              key={st}
                              type="button"
                              onClick={() => setNewStatus(st)}
                              className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-extrabold transition-all ${isSelected
                                ? `${meta.badgeClass} ring-2 ring-offset-1 ring-[#3A8157]`
                                : "border-[#D9D9D9] bg-white text-[#727272] hover:bg-gray-50"
                                }`}
                            >
                              <span
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: meta.text }}
                              />
                              {meta.label}
                            </button>
                          )
                        },
                      )}
                    </div>
                  </div>

                  {/* Admin Note Input */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-[#727272]">
                      Ghi chú nội bộ / Phương án giải quyết (adminNote):
                    </label>
                    <textarea
                      rows={3}
                      value={newAdminNote}
                      onChange={(e) => setNewAdminNote(e.target.value)}
                      placeholder="Ví dụ: Đã gửi email phản hồi lúc 10:00; hoặc đánh dấu spam do chứa quảng cáo..."
                      className="w-full resize-none rounded-[14px] border-2 border-[#D9D9D9] bg-white p-3 text-xs font-semibold outline-none transition-colors focus:border-[#3A8157]"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedContact(null)}
                    className="rounded-full border border-[#D9D9D9] bg-white px-5 py-2.5 text-xs font-bold text-[#727272] hover:bg-gray-100"
                  >
                    Đóng
                  </button>

                  <button
                    type="button"
                    onClick={handleUpdateStatus}
                    disabled={updating}
                    className="inline-flex items-center gap-2 rounded-full bg-[#3A8157] px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_#FFC857] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {updating ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Đang lưu...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[17px]">save</span>
                        Lưu cập nhật
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
