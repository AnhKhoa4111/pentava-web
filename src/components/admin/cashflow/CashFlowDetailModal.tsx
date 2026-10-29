import type { CashFlowTransaction } from "../../../services/adminCashflowService"

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

interface CashFlowDetailModalProps {
  tx: CashFlowTransaction
  isApproving: boolean
  onClose: () => void
  onApprove: (code: string) => void
}

export default function CashFlowDetailModal({
  tx,
  isApproving,
  onClose,
  onApprove,
}: CashFlowDetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl border-2 border-black bg-white shadow-[8px_8px_0px_0px_#000]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between border-b-2 border-black px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#3A8157]">
              receipt_long
            </span>
            <div>
              <h3 className="text-base font-black text-[#111827]">Chi tiết giao dịch</h3>
              <p className="font-mono text-xs font-bold text-[#727272]">{tx.transactionCode}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-bold ${STATUS_BADGE[tx.status]}`}
            >
              {STATUS_LABEL[tx.status]}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1 text-gray-400 transition hover:bg-[#F7FAFF] hover:text-black"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal body */}
        <div className="max-h-[65vh] space-y-3 overflow-y-auto p-5">
          {/* Type + Direction */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#EEF1F5] bg-[#F7FAFF] p-3">
              <p className="text-[10px] font-extrabold text-[#727272]">LOẠI GIAO DỊCH</p>
              <p className="mt-1 text-xs font-extrabold text-[#111827]">
                {TYPE_LABEL[tx.type] ?? tx.type}
              </p>
            </div>
            <div className="rounded-xl border border-[#EEF1F5] bg-[#F7FAFF] p-3">
              <p className="text-[10px] font-extrabold text-[#727272]">CHIỀU DÒNG TIỀN</p>
              <p
                className={`mt-1 text-xs font-extrabold ${
                  tx.direction === "IN" ? "text-[#3A8157]" : "text-[#529CFF]"
                }`}
              >
                {tx.direction === "IN" ? "📥 Tiền vào (Thu)" : "📤 Tiêu thụ (Chi)"}
              </p>
            </div>
          </div>

          {/* User */}
          <div className="rounded-xl border border-[#EEF1F5] bg-[#F7FAFF] p-3">
            <p className="text-[10px] font-extrabold text-[#727272]">KHÁCH HÀNG / TÀI KHOẢN</p>
            <p className="mt-1 text-sm font-extrabold text-[#111827]">
              {tx.userName ?? `User #${tx.userId}`}
            </p>
            <p className="font-mono text-xs text-[#727272]">
              {tx.userEmail ?? `User ID: ${tx.userId}`}
            </p>
          </div>

          {/* Amounts */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#EEF1F5] bg-[#F7FAFF] p-3">
              <p className="text-[10px] font-extrabold text-[#727272]">SỐ TIỀN VNĐ</p>
              <p className="mt-1 text-sm font-extrabold text-[#3A8157]">{fmtVnd(tx.amountVnd)}</p>
            </div>
            <div className="rounded-xl border border-[#EEF1F5] bg-[#F7FAFF] p-3">
              <p className="text-[10px] font-extrabold text-[#727272]">SỐ RUBY</p>
              <p className="mt-1 text-sm font-extrabold text-[#529CFF]">{fmtRuby(tx.rubyAmount)}</p>
            </div>
          </div>

          {/* Item details */}
          {tx.itemDetails && (
            <div className="rounded-xl border border-[#EEF1F5] bg-[#F7FAFF] p-3">
              <p className="mb-2 text-[10px] font-extrabold text-[#727272]">
                CHI TIẾT SẢN PHẨM / DỊCH VỤ
              </p>
              <div className="flex flex-wrap gap-2">
                {tx.itemDetails.itemName && (
                  <span className="rounded-lg border border-[#D9D9D9] bg-white px-2.5 py-1 text-xs font-bold">
                    📦 {tx.itemDetails.itemName}
                  </span>
                )}
                {tx.itemDetails.planCode && (
                  <span className="rounded-lg bg-purple-100 px-2.5 py-1 text-xs font-bold text-purple-800">
                    🎯 Gói {tx.itemDetails.planCode} ({tx.itemDetails.durationDays ?? 30} ngày)
                  </span>
                )}
                {tx.itemDetails.slot && (
                  <span className="rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-800">
                    🎨 Vị trí: {tx.itemDetails.slot}
                  </span>
                )}
                {tx.itemDetails.bonusRuby && tx.itemDetails.bonusRuby > 0 ? (
                  <span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                    +{tx.itemDetails.bonusRuby} Ruby thưởng
                  </span>
                ) : null}
              </div>
            </div>
          )}

          {/* Payment method */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#EEF1F5] bg-[#F7FAFF] p-3">
              <p className="text-[10px] font-extrabold text-[#727272]">PHƯƠNG THỨC</p>
              <p className="mt-1 text-xs font-extrabold text-[#111827]">{tx.paymentMethod}</p>
              {tx.bankCode && <p className="text-[11px] text-[#727272]">{tx.bankCode}</p>}
            </div>
            {tx.accountNumber && (
              <div className="rounded-xl border border-[#EEF1F5] bg-[#F7FAFF] p-3">
                <p className="text-[10px] font-extrabold text-[#727272]">TÀI KHOẢN THỤ HƯỞNG</p>
                <p className="mt-1 font-mono text-xs font-extrabold text-[#111827]">
                  {tx.accountNumber}
                </p>
                <p className="text-[11px] text-[#727272]">{tx.accountName}</p>
              </div>
            )}
          </div>

          {/* SePay ref */}
          {tx.sepayReferenceCode && (
            <div className="rounded-xl border border-[#EEF1F5] bg-[#F7FAFF] p-3">
              <p className="text-[10px] font-extrabold text-[#727272]">
                MÃ THAM CHIẾU NGÂN HÀNG (SEPAY)
              </p>
              <p className="mt-1 font-mono text-xs font-extrabold text-[#111827]">
                {tx.sepayReferenceCode}
              </p>
            </div>
          )}

          {/* Description */}
          <div className="rounded-xl border border-[#EEF1F5] bg-[#F7FAFF] p-3">
            <p className="text-[10px] font-extrabold text-[#727272]">NỘI DUNG GIAO DỊCH</p>
            <p className="mt-1 text-xs font-semibold text-[#111827]">{tx.description}</p>
          </div>

          {/* Timestamps */}
          <div className="flex justify-between text-[11px] font-semibold text-[#727272]">
            <span>Khởi tạo: {fmtDate(tx.createdAt)}</span>
            <span>Hoàn tất: {fmtDate(tx.completedAt)}</span>
          </div>

          {/* QR nếu còn pending */}
          {tx.status === "PENDING" && tx.qrCodeUrl && (
            <div className="flex flex-col items-center rounded-xl border-2 border-[#FFC857] bg-[#FFF9ED] p-4">
              <p className="mb-2 text-xs font-extrabold text-[#78350F]">
                ⏳ Đang chờ quét mã thanh toán VietQR
              </p>
              <img
                src={tx.qrCodeUrl}
                alt="QR thanh toán"
                className="w-36 rounded-xl border border-[#D9D9D9] bg-white p-1"
              />
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="flex justify-end gap-3 border-t-2 border-black px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#D9D9D9] bg-white px-5 py-2 text-xs font-bold hover:bg-[#F7FAFF]"
          >
            Đóng
          </button>
          {tx.status === "PENDING" && (
            <button
              type="button"
              onClick={() => onApprove(tx.transactionCode)}
              disabled={isApproving}
              className="rounded-full bg-[#3A8157] px-5 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_#FFC857] transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
            >
              {isApproving ? "Đang duyệt..." : "✅ Duyệt & Khớp tiền ngay"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

