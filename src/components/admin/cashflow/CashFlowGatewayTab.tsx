import { useState } from "react"
import {
  adminCashflowService,
  type GatewayConfigInfo,
} from "../../../services/adminCashflowService"

function fmtVnd(n: number) {
  return n.toLocaleString("vi-VN") + " ₫"
}

interface CashFlowGatewayTabProps {
  config: GatewayConfigInfo
  onShowToast: (type: "success" | "error", text: string) => void
  onSwitchToOverview: () => void
}

export default function CashFlowGatewayTab({
  config,
  onShowToast,
  onSwitchToOverview,
}: CashFlowGatewayTabProps) {
  const [testingCode, setTestingCode] = useState<string | null>(null)

  const handleTestSubscription = async (planCode: "BASIC" | "GOLD" | "PREMIUM") => {
    setTestingCode(`SUB_${planCode}`)
    try {
      const res = await adminCashflowService.testInitSubscription(planCode)
      onShowToast(
        "success",
        `Đã khởi tạo đơn mua Gói ${planCode} (#${res.transactionCode})! Kiểm tra luồng Realtime SSE ở bảng Tổng quan.`
      )
      onSwitchToOverview()
    } catch (err) {
      onShowToast(
        "error",
        err instanceof Error ? err.message : "Không thể khởi tạo đơn mua gói cước."
      )
    } finally {
      setTestingCode(null)
    }
  }

  const handleTestTopup = async (packageCode: "SMALL" | "MEDIUM" | "LARGE") => {
    setTestingCode(`TOPUP_${packageCode}`)
    try {
      const res = await adminCashflowService.testInitTopup(packageCode)
      onShowToast(
        "success",
        `Đã khởi tạo đơn nạp Ruby ${packageCode} (#${res.transactionCode})! Kiểm tra luồng Realtime SSE.`
      )
      onSwitchToOverview()
    } catch (err) {
      onShowToast(
        "error",
        err instanceof Error ? err.message : "Không thể khởi tạo đơn nạp Ruby."
      )
    } finally {
      setTestingCode(null)
    }
  }

  return (
    <div className="space-y-5">
      {/* Bảng Test Realtime SSE (Giúp test mua gói / nạp Ruby xem nó log liền không) */}
      <div className="rounded-2xl border-2 border-[#3A8157] bg-[#ECFDF5] p-4">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#3A8157]">bolt</span>
              <h3 className="text-sm font-black text-[#065F46]">
                Kiểm thử bắn Log Realtime (SSE) — Mua Gói Cước & Nạp Ruby
              </h3>
            </div>
            <p className="mt-0.5 text-xs font-semibold text-[#047857]">
              Bấm nút bên dưới để gọi trực tiếp API khởi tạo đơn trên Backend và xem giao dịch tự động nhảy vào bảng Sổ quỹ tức thì qua SSE.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(["BASIC", "GOLD", "PREMIUM"] as const).map((plan) => (
              <button
                key={plan}
                type="button"
                disabled={testingCode !== null}
                onClick={() => handleTestSubscription(plan)}
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#8B63F6] px-3.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-[#7C3AED] disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-[15px]">workspace_premium</span>
                {testingCode === `SUB_${plan}` ? "Đang tạo..." : `Test Mua Gói ${plan}`}
              </button>
            ))}

            <button
              type="button"
              disabled={testingCode !== null}
              onClick={() => handleTestTopup("SMALL")}
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#D97706] px-3.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-[#B45309] disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-[15px]">diamond</span>
              {testingCode === "TOPUP_SMALL" ? "Đang tạo..." : "Test Nạp Small Pack"}
            </button>
          </div>
        </div>
      </div>

      {/* Bank info & VietQR Demo */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#D9D9D9] bg-[#F7FAFF] p-5">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-extrabold text-[#111827]">
            <span className="material-symbols-outlined text-[20px] text-[#3A8157]">
              account_balance
            </span>
            Tài khoản ngân hàng đối soát SePay
          </h3>
          <div className="space-y-3">
            {[
              { label: "Ngân hàng thụ hưởng", value: config.bankCode },
              { label: "Số tài khoản", value: config.accountNumber },
              { label: "Chủ tài khoản", value: config.accountName },
              {
                label: "Tỷ giá quy đổi cơ sở",
                value: `${config.baseRateVndPerRuby.toLocaleString("vi-VN")} ₫ / 1 Ruby`,
              },
              {
                label: "Hạn mức nạp lẻ tối thiểu",
                value: `${config.minTopupVnd.toLocaleString("vi-VN")} ₫ (${config.minTopupRuby} Ruby)`,
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between border-b border-[#E5E7EB] pb-2.5 last:border-none last:pb-0"
              >
                <span className="text-xs font-bold text-[#727272]">{label}</span>
                <span className="font-mono text-xs font-extrabold text-[#111827]">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#D9D9D9] bg-[#F7FAFF] p-5">
          <p className="mb-3 text-[11px] font-extrabold uppercase tracking-wider text-[#727272]">
            Mẫu mã QR động VietQR SePay
          </p>
          <img
            src={`https://qr.sepay.vn/img?acc=${config.accountNumber}&bank=${config.bankCode}&amount=100000&des=PENTAVA_DEMO&template=compact`}
            alt="QR SePay Demo"
            className="w-40 rounded-xl border border-[#D9D9D9] bg-white p-1 shadow-sm"
            onError={(e) => {
              ;(e.target as HTMLImageElement).style.display = "none"
            }}
          />
          <p className="mt-2.5 text-xs text-[#727272]">
            Cú pháp tự động khớp lệnh:{" "}
            <strong className="font-mono text-[#111827]">PENTAVA + [Mã GD]</strong>
          </p>
        </div>
      </div>

      {/* Ruby packages */}
      <div>
        <h3 className="mb-3 text-sm font-extrabold text-[#111827]">
          💎 Các gói nạp Ruby đang mở bán
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {config.packages.map((pkg) => (
            <div
              key={pkg.code}
              className={`rounded-2xl border p-4 ${
                pkg.isPopular
                  ? "border-amber-300 bg-[#FFFBEB]"
                  : pkg.isBestValue
                    ? "border-emerald-300 bg-[#ECFDF5]"
                    : "border-[#D9D9D9] bg-white"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#111827]">{pkg.name}</span>
                {pkg.isPopular && (
                  <span className="rounded-full bg-[#FFC857] px-2 py-0.5 text-[9px] font-black text-black">
                    PHỔ BIẾN
                  </span>
                )}
                {pkg.isBestValue && (
                  <span className="rounded-full bg-[#3A8157] px-2 py-0.5 text-[9px] font-black text-white">
                    TỐT NHẤT
                  </span>
                )}
              </div>
              <p className="text-xl font-black text-[#3A8157]">{pkg.rubyAmount} 💎</p>
              <p className="text-sm font-extrabold text-[#111827]">{fmtVnd(pkg.priceVnd)}</p>
              {pkg.bonusRuby > 0 && (
                <p className="mt-1 text-[11px] font-bold text-[#3A8157]">
                  +{pkg.bonusRuby} Ruby thưởng thêm
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Webhook info */}
      <div className="rounded-2xl border border-[#D9D9D9] bg-[#F7FAFF] p-4">
        <p className="mb-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#727272]">
          SePay Webhook Callback Endpoint
        </p>
        <code className="block rounded-lg border border-[#D9D9D9] bg-white px-3 py-2 font-mono text-xs font-bold text-[#3A8157]">
          POST {config.webhookUrl}
        </code>
        <p className="mt-2 text-xs text-[#727272]">
          Khi khách hàng quét mã VietQR chuyển khoản, SePay tự động bắn webhook về endpoint này để xác thực số tiền, cộng Ruby hoặc kích hoạt gói hội viên và đẩy thông báo SSE tới Admin.
        </p>
      </div>
    </div>
  )
}

