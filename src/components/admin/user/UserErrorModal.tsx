interface UserErrorModalProps {
  error: { title: string; message: string }
  onClose: () => void
}

export default function UserErrorModal({ error, onClose }: UserErrorModalProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#F25F5C]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 text-red-600">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100">
            <span className="material-symbols-outlined text-3xl">error</span>
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-900">{error.title}</h3>
            <p className="text-xs font-semibold text-red-500">Thao tác không thành công</p>
          </div>
        </div>

        <div className="mt-4 whitespace-pre-wrap rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold leading-relaxed text-red-800">
          {error.message}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-black bg-red-600 px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_#000] transition hover:bg-red-700"
          >
            Đã hiểu & Đóng
          </button>
        </div>
      </div>
    </div>
  )
}

