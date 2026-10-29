import {
  STATUS_META,
  type ContactInquiry,
  type ContactStatus,
} from "../../../services/contactService"

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

interface ContactDetailModalProps {
  contact: ContactInquiry
  detailLoading: boolean
  updating: boolean
  newStatus: ContactStatus
  setNewStatus: (st: ContactStatus) => void
  newAdminNote: string
  setNewAdminNote: (note: string) => void
  onClose: () => void
  onSave: () => void
}

export default function ContactDetailModal({
  contact,
  detailLoading,
  updating,
  newStatus,
  setNewStatus,
  newAdminNote,
  setNewAdminNote,
  onClose,
  onSave,
}: ContactDetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-[620px] overflow-y-auto rounded-3xl border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000] md:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="mb-5 flex items-start justify-between border-b-2 border-black pb-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#3A8157]">
              Chi tiết yêu cầu #{contact.id}
            </span>
            <h3 className="mt-1 text-xl font-black text-black">{contact.subject}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 transition hover:bg-[#F7FAFF] hover:text-black"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {detailLoading ? (
          <div className="py-12 text-center text-sm font-bold text-[#727272]">
            Đang tải thông tin chi tiết...
          </div>
        ) : (
          <div className="space-y-5">
            {/* Contact Sender Information */}
            <div className="rounded-2xl border border-[#E5E9F0] bg-[#F7FAFF] p-4">
              <h4 className="mb-3 text-[11px] font-extrabold uppercase tracking-wider text-[#727272]">
                Thông tin người liên hệ
              </h4>

              <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <div>
                  <span className="text-xs text-[#727272]">Họ và tên:</span>
                  <p className="font-extrabold text-black">{contact.fullName}</p>
                </div>

                <div>
                  <span className="text-xs text-[#727272]">Email:</span>
                  <p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-extrabold text-[#529CFF] hover:underline"
                    >
                      {contact.email}
                    </a>
                  </p>
                </div>

                <div>
                  <span className="text-xs text-[#727272]">Số điện thoại:</span>
                  <p className="font-extrabold text-black">
                    {contact.phone ? (
                      <a href={`tel:${contact.phone}`} className="hover:underline">
                        {contact.phone}
                      </a>
                    ) : (
                      "Không cung cấp"
                    )}
                  </p>
                </div>

                <div>
                  <span className="text-xs text-[#727272]">Thời gian gửi:</span>
                  <p className="font-extrabold text-black">{formatDate(contact.createdAt)}</p>
                </div>
              </div>
            </div>

            {/* Message Content */}
            <div>
              <h4 className="mb-2 text-[11px] font-extrabold uppercase tracking-wider text-[#727272]">
                Nội dung yêu cầu từ khách hàng
              </h4>
              <div className="rounded-2xl border border-[#D9D9D9] bg-white p-4 text-sm leading-relaxed text-[#2D3748]">
                {contact.message}
              </div>
            </div>

            {/* Status Update Form */}
            <div className="rounded-2xl border border-[#D9D9D9] bg-[#F7FAFF] p-4">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-extrabold text-black">
                <span className="material-symbols-outlined text-[20px] text-[#3A8157]">
                  published_with_changes
                </span>
                Cập nhật trạng thái & Ghi chú xử lý
              </h4>

              {/* Status Selection */}
              <div className="mb-4">
                <label className="mb-2 block text-xs font-bold text-[#727272]">
                  Trạng thái hiện tại:
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(["PENDING", "IN_PROGRESS", "RESOLVED", "SPAM"] as ContactStatus[]).map((st) => {
                    const meta = STATUS_META[st]
                    const isSelected = newStatus === st
                    return (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setNewStatus(st)}
                        className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-extrabold transition-all ${
                          isSelected
                            ? `${meta.badgeClass} ring-2 ring-[#3A8157] ring-offset-1`
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
                  })}
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
                  placeholder="Ví dụ: Đã gửi email phản hồi lúc 10:00; hoặc đánh dấu spam..."
                  className="w-full resize-none rounded-xl border-2 border-[#D9D9D9] bg-white p-3 text-xs font-semibold outline-none transition-colors focus:border-[#3A8157]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 border-t border-[#EEF1F5] pt-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-[#D9D9D9] bg-white px-5 py-2 text-xs font-bold text-[#727272] hover:bg-gray-100"
              >
                Đóng
              </button>

              <button
                type="button"
                onClick={onSave}
                disabled={updating}
                className="inline-flex items-center gap-2 rounded-full bg-[#3A8157] px-6 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_#FFC857] transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
              >
                {updating ? "Đang lưu..." : "Lưu cập nhật"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

