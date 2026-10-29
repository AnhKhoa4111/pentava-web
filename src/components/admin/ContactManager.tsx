import { useCallback, useEffect, useMemo, useState } from "react"
import {
  contactService,
  STATUS_META,
  type ContactInquiry,
  type ContactStatus,
} from "../../services/contactService"
import ContactTable from "./contact/ContactTable"
import ContactDetailModal from "./contact/ContactDetailModal"

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
    setTimeout(() => setToast(null), 4000)
  }

  // Fetch contacts
  const fetchContacts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await contactService.getContacts(
        statusFilter === "ALL" ? "" : statusFilter
      )
      setContacts(data)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Không thể tải danh sách liên hệ."
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    void fetchContacts()
  }, [fetchContacts])

  // Open detail modal
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
    } catch {
      // Dùng dữ liệu cache nếu lỗi
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

      setContacts((prev) =>
        prev.map((item) => (item.id === selectedContact.id ? { ...item, ...updated } : item))
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
      `Bạn có chắc chắn muốn xóa liên hệ #${contact.id} từ "${contact.fullName}" không?`
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
      const msg = err instanceof Error ? err.message : "Xóa liên hệ thất bại."
      showToast("error", msg)
    }
  }

  // Filter contacts by search query
  const filteredContacts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return contacts

    return contacts.filter((c) => {
      return (
        c.fullName.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        (c.phone && c.phone.toLowerCase().includes(query)) ||
        c.subject.toLowerCase().includes(query) ||
        c.message.toLowerCase().includes(query) ||
        (c.adminNote && c.adminNote.toLowerCase().includes(query))
      )
    })
  }, [contacts, searchTerm])

  // Summary counts
  const counts = useMemo(() => {
    return {
      TOTAL: contacts.length,
      PENDING: contacts.filter((c) => c.status === "PENDING").length,
      IN_PROGRESS: contacts.filter((c) => c.status === "IN_PROGRESS").length,
      RESOLVED: contacts.filter((c) => c.status === "RESOLVED").length,
    }
  }, [contacts])

  // Export CSV
  const handleExportCsv = () => {
    const header = [
      "ID",
      "Họ và tên",
      "Email",
      "Số điện thoại",
      "Chủ đề",
      "Nội dung",
      "Trạng thái",
      "Ghi chú Admin",
      "Ngày tạo",
      "Cập nhật lần cuối",
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
        .map((row) => row.map((field) => `"${String(field).replaceAll('"', '""')}"`).join(","))
        .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `pentava-contacts-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed right-6 top-24 z-50 flex items-center gap-3 rounded-2xl border-2 px-5 py-4 shadow-xl transition-all ${
            toast.type === "success"
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
            <p className="mt-1 text-xs font-semibold text-[#727272]">
              Tiếp nhận và xử lý các phản hồi trực tiếp từ khách hàng thông qua Manage-service.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-[#3A8157] bg-white px-4 text-xs font-extrabold text-[#3A8157] transition-colors hover:bg-[#E8F3EC]"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Xuất CSV
            </button>

            <button
              type="button"
              onClick={fetchContacts}
              disabled={loading}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#3A8157] px-4 text-xs font-extrabold uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_#FFC857] transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
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
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-3 text-[20px] text-[#727272]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên, email, SĐT, tiêu đề, nội dung..."
              className="h-11 w-full rounded-full border border-[#D9D9D9] bg-[#F7FAFF] pl-11 pr-4 text-sm font-semibold outline-none transition-colors focus:border-[#3A8157] focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {ALL_STATUSES.map((st) => {
              const active = statusFilter === st.key
              return (
                <button
                  key={st.key}
                  type="button"
                  onClick={() => setStatusFilter(st.key)}
                  className={`rounded-full px-3.5 py-2 text-xs font-extrabold transition-all ${
                    active
                      ? "bg-[#3A8157] text-white shadow-sm"
                      : "bg-[#F7FAFF] text-[#727272] hover:bg-[#E8F3EC] hover:text-[#3A8157]"
                  }`}
                >
                  {st.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-5 flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            <div className="flex items-center gap-2 text-sm font-bold">
              <span className="material-symbols-outlined">warning</span>
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={fetchContacts}
              className="rounded-full bg-red-600 px-3 py-1 text-xs font-extrabold text-white hover:bg-red-700"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Loading / Table */}
        {loading ? (
          <div className="py-12 text-center text-[#727272]">
            <div className="inline-flex items-center gap-2">
              <span className="material-symbols-outlined animate-spin text-[#3A8157]">
                progress_activity
              </span>
              <span className="text-sm font-bold">Đang tải dữ liệu liên hệ...</span>
            </div>
          </div>
        ) : (
          <ContactTable
            contacts={filteredContacts}
            searchTerm={searchTerm}
            onOpenDetail={handleOpenDetail}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Modal Detail & Status Update */}
      {selectedContact && (
        <ContactDetailModal
          contact={selectedContact}
          detailLoading={detailLoading}
          updating={updating}
          newStatus={newStatus}
          setNewStatus={setNewStatus}
          newAdminNote={newAdminNote}
          setNewAdminNote={setNewAdminNote}
          onClose={() => setSelectedContact(null)}
          onSave={handleUpdateStatus}
        />
      )}
    </div>
  )
}
