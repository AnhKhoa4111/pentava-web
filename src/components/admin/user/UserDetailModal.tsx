import type { AdminUser } from "../../../services/adminUserService"

interface UserDetailModalProps {
  user: AdminUser
  isEditingName: boolean
  setIsEditingName: (editing: boolean) => void
  editNameInput: string
  setEditNameInput: (name: string) => void
  isUpdating: boolean
  loadingDetail: boolean
  onClose: () => void
  onSaveName: (e: React.FormEvent) => void
}

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

export default function UserDetailModal({
  user,
  isEditingName,
  setIsEditingName,
  editNameInput,
  setEditNameInput,
  isUpdating,
  loadingDetail,
  onClose,
  onSaveName,
}: UserDetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b-2 border-black pb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#3A8157]">
              {isEditingName ? "edit" : "account_circle"}
            </span>
            <h3 className="text-lg font-black text-[#111827]">
              {isEditingName ? "Cập nhật tên người dùng" : "Chi tiết Người dùng"}
            </h3>
            {loadingDetail && (
              <span className="material-symbols-outlined animate-spin text-sm text-[#3A8157]">
                progress_activity
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 transition hover:bg-[#F7FAFF] hover:text-black"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Nội dung Modal: Chế độ Sửa tên HOẶC Chế độ Xem chi tiết */}
        {isEditingName ? (
          <form onSubmit={onSaveName} className="mt-4 space-y-4">
            <div className="rounded-2xl border border-[#EEF1F5] bg-[#F7FAFF] p-3.5 text-xs">
              <p className="text-[#727272]">
                User ID: <span className="font-mono font-bold text-[#111827]">#{user.id}</span>
              </p>
              <p className="mt-1 text-[#727272]">
                Email liên kết: <span className="font-mono font-bold text-[#111827]">{user.email}</span>
              </p>
            </div>

            <div>
              <label className="text-xs font-black uppercase tracking-wider text-[#111827]">
                Tên người dùng mới <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={editNameInput}
                onChange={(e) => setEditNameInput(e.target.value)}
                placeholder="Nhập họ và tên mới..."
                required
                autoFocus
                className="mt-1.5 h-11 w-full rounded-2xl border-2 border-[#D9D9D9] bg-[#F7FAFF] px-4 text-sm font-semibold outline-none transition focus:border-[#3A8157] focus:bg-white"
              />
            </div>

            <div className="flex justify-end gap-3 border-t border-[#EEF1F5] pt-3">
              <button
                type="button"
                onClick={() => setIsEditingName(false)}
                disabled={isUpdating}
                className="rounded-full border border-gray-300 px-5 py-2 text-xs font-bold text-gray-700 transition hover:bg-gray-100"
              >
                Quay lại xem chi tiết
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="inline-flex items-center gap-2 rounded-full border border-black bg-[#3A8157] px-6 py-2 text-xs font-black uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_#FFC857] transition hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
              >
                {isUpdating ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[16px]">
                      progress_activity
                    </span>
                    Đang lưu...
                  </>
                ) : (
                  "Lưu thay đổi"
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-4 space-y-4">
            {/* Profile Card */}
            <div className="flex items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-[#F7FAFF] p-4">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name || user.email}
                  className="h-16 w-16 rounded-full border-2 border-[#3A8157] object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F3EC] text-2xl font-black text-[#3A8157]">
                  {(user.name || user.email || "?").charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-black text-[#111827]">
                    {user.name || <span className="italic text-gray-400">Chưa đặt tên</span>}
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsEditingName(true)}
                    className="inline-flex items-center gap-1 rounded-full border border-[#3A8157] bg-white px-3 py-1 text-[11px] font-extrabold text-[#3A8157] transition hover:bg-[#E8F3EC]"
                    title="Chỉnh sửa tên"
                  >
                    <span className="material-symbols-outlined text-[14px]">edit</span>
                    Sửa
                  </button>
                </div>
                <p className="mt-0.5 font-mono text-xs text-[#727272]">{user.email}</p>
                {user.bio && (
                  <p className="mt-2 rounded-lg border border-gray-100 bg-white p-2 text-xs italic text-gray-600">
                    "{user.bio}"
                  </p>
                )}
              </div>
            </div>

            {/* Detail Info Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-gray-200 bg-white p-3">
                <span className="font-bold text-[#727272]">User ID:</span>
                <p className="mt-1 font-mono font-bold text-[#111827]">#{user.id}</p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-3">
                <span className="font-bold text-[#727272]">Xác thực Email:</span>
                <p className="mt-1 font-bold">
                  {user.isVerified ? (
                    <span className="flex items-center gap-1 text-emerald-700">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Đã xác thực
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-gray-500">
                      <span className="material-symbols-outlined text-[16px]">cancel</span>
                      Chưa xác thực
                    </span>
                  )}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-3">
                <span className="font-bold text-[#727272]">Trạng thái Onboarding:</span>
                <p className="mt-1 font-bold">
                  {user.hasCompletedOnboarding ? (
                    <span className="flex items-center gap-1 text-blue-700">
                      <span className="material-symbols-outlined text-[16px]">task_alt</span>
                      Đã hoàn tất
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-700">
                      <span className="material-symbols-outlined text-[16px]">pending</span>
                      Chưa hoàn tất
                    </span>
                  )}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-3">
                <span className="font-bold text-[#727272]">Ngày tạo tài khoản:</span>
                <p className="mt-1 font-bold text-[#111827]">{formatDate(user.createdAt)}</p>
              </div>
            </div>

            {/* Footer Modal Actions */}
            <div className="flex items-center justify-between border-t border-[#EEF1F5] pt-4">
              <button
                type="button"
                onClick={() => setIsEditingName(true)}
                className="inline-flex items-center gap-1.5 rounded-full border border-black bg-white px-4 py-2 text-xs font-bold text-[#111827] shadow-[2px_2px_0px_0px_#3A8157] transition hover:-translate-y-0.5"
              >
                <span className="material-symbols-outlined text-[16px]">edit</span>
                Đổi tên người dùng này
              </button>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-black px-6 py-2 text-xs font-black uppercase tracking-wider text-white transition hover:bg-gray-800"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

