import { useState } from "react"
import type { FormEvent } from "react"
import { motion } from "motion/react"
import { contactService, type CreateContactRequest } from "../../services/contactService"
import ScrambleText from "../common/ScrambleText"

const SUBJECT_SUGGESTIONS = [
  "Tư vấn tính năng PENTAVA",
  "Hỗ trợ kỹ thuật & tài khoản",
  "Góp ý trải nghiệm ứng dụng",
  "Hợp tác truyền thông / Đối tác",
]

interface ContactSectionProps {
  id?: string
  title?: string
  subtitle?: string
}

export default function ContactSection({
  id = "contact",
  title = "Gửi thông tin liên hệ & hỗ trợ",
  subtitle = "Bạn có bất kỳ thắc mắc, phản hồi hoặc cần hỗ trợ về ứng dụng? Hãy để lại lời nhắn, đội ngũ PENTAVA sẽ phản hồi sớm nhất!",
}: ContactSectionProps) {
  const [formData, setFormData] = useState<CreateContactRequest>({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate
    if (!formData.fullName.trim()) {
      setError("Vui lòng nhập họ và tên của bạn.")
      return
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("Vui lòng nhập địa chỉ email hợp lệ.")
      return
    }
    if (!formData.subject.trim()) {
      setError("Vui lòng nhập hoặc chọn tiêu đề cần hỗ trợ.")
      return
    }
    if (!formData.message.trim()) {
      setError("Vui lòng nhập nội dung cần hỗ trợ.")
      return
    }

    setLoading(true)

    try {
      await contactService.submitContact({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || undefined,
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      })

      setSuccess(true)
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Đã có lỗi xảy ra khi gửi liên hệ."
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id={id} className="scroll-mt-24 px-4 pt-6 pb-20 md:pt-10 md:pb-28 md:px-8">
      <div className="mx-auto max-w-[1200px]">
        {/* Header Badge & Title */}
        <div className="mb-12 text-center md:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#E8F3EC] px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#3A8157] shadow-[3px_3px_0px_0px_#FFC857]">
            <span className="h-2 w-2 rounded-full bg-[#3A8157] animate-pulse" />
            <ScrambleText text="KÊNH HỖ TRỢ TRỰC TIẾP" scrambleSpeed={30} />
          </span>

          <h2 className="mt-4 text-[32px] font-extrabold leading-tight text-black md:text-[46px]">
            {title}
          </h2>

          <p className="mx-auto mt-3 max-w-[680px] text-sm leading-7 text-[#727272] md:text-base">
            {subtitle}
          </p>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* Cột trái: Thông tin cam kết & Kênh hỗ trợ */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="rounded-3xl border-2 border-black bg-white p-7 shadow-[8px_8px_0px_0px_#FFC857] md:p-9">
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-[#3A8157] text-white shadow-[3px_3px_0px_0px_#529CFF]">
                <span className="material-symbols-outlined text-[26px]">mark_chat_unread</span>
              </span>

              <h3 className="text-2xl font-extrabold text-black">
                Chúng tôi luôn sẵn sàng lắng nghe!
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#727272]">
                Mọi ý kiến đóng góp, thắc mắc hoặc đề xuất tính năng của bạn đều là động lực quý giá để PENTAVA hoàn thiện tốt hơn mỗi ngày.
              </p>

              <div className="mt-7 space-y-4">
                <div className="flex items-start gap-4 rounded-2xl border-2 border-black/10 bg-[#F7FAFF] p-4 transition-colors hover:border-black">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-[#529CFF] text-white shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">bolt</span>
                  </span>
                  <div>
                    <h4 className="text-sm font-extrabold text-black">Phản hồi nhanh chóng</h4>
                    <p className="text-xs leading-5 text-[#727272]">
                      Nhận giải đáp trong vòng 24 giờ làm việc từ đội ngũ PENTAVA.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border-2 border-black/10 bg-[#F7FAFF] p-4 transition-colors hover:border-black">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-[#3A8157] text-white shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">shield</span>
                  </span>
                  <div>
                    <h4 className="text-sm font-extrabold text-black">Bảo mật thông tin</h4>
                    <p className="text-xs leading-5 text-[#727272]">
                      Dữ liệu liên hệ được mã hóa an toàn, không chia sẻ cho bên thứ ba.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border-2 border-black/10 bg-[#F7FAFF] p-4 transition-colors hover:border-black">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-[#FFC857] text-black shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                  </span>
                  <div>
                    <h4 className="text-sm font-extrabold text-black">Hỗ trợ tận tâm</h4>
                    <p className="text-xs leading-5 text-[#727272]">
                      Đồng hành giải quyết cặn kẽ mọi phản hồi về tính năng & tài khoản.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href="mailto:hello@pentava.vn"
                className="flex items-center gap-3 rounded-2xl border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#3A8157] transition-all hover:-translate-y-0.5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black bg-[#E8F3EC] text-[#3A8157]">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#727272]">Email trực tiếp</p>
                  <p className="truncate text-xs font-black text-black">hello@pentava.vn</p>
                </div>
              </a>

              <div className="flex items-center gap-3 rounded-2xl border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#FFC857]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black bg-[#FFF4D8] text-[#B45309]">
                  <span className="material-symbols-outlined text-[20px]">forum</span>
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#727272]">Kênh cộng đồng</p>
                  <p className="truncate text-xs font-black text-black">PENTAVA Community</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cột phải: Form gửi liên hệ */}
          <div className="rounded-3xl border-2 border-black bg-white p-6 shadow-[10px_10px_0px_0px_#529CFF] md:p-9">
            {success ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <span className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-black bg-[#E8F5E9] text-[#15803D] shadow-[4px_4px_0px_0px_#3A8157]">
                  <span className="material-symbols-outlined text-[44px]">check_circle</span>
                </span>
                <h3 className="text-2xl font-extrabold text-black">
                  Gửi yêu cầu thành công!
                </h3>
                <p className="mt-3 max-w-[420px] text-sm leading-relaxed text-[#727272]">
                  Cảm ơn bạn đã liên hệ với PENTAVA. Chúng tôi đã nhận được thông tin và sẽ phản hồi sớm nhất qua email của bạn.
                </p>

                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#3A8157] px-7 py-3 text-sm font-extrabold text-white shadow-[4px_4px_0px_0px_#FFC857] transition-transform hover:-translate-y-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[19px]">edit_note</span>
                  Gửi thêm lời nhắn khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-2xl font-extrabold text-black">Để lại thông tin của bạn</h3>
                  <p className="text-xs font-semibold text-[#727272] mt-1">
                    Điền đầy đủ các thông tin có dấu <span className="text-red-500">*</span> để chúng tôi hỗ trợ tốt nhất.
                  </p>
                </div>

                {error && (
                  <div className="flex items-center gap-3 rounded-2xl border-2 border-red-500 bg-red-50 p-4 text-sm font-bold text-red-600 shadow-[2px_2px_0px_0px_#EF4444]">
                    <span className="material-symbols-outlined shrink-0 text-[20px]">error</span>
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-[#727272]">
                      Họ và tên <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Văn A"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="h-12 w-full rounded-2xl border-2 border-black/20 bg-[#F7FAFF] px-4 text-sm font-semibold outline-none transition-all focus:border-black focus:bg-white focus:shadow-[3px_3px_0px_0px_#FFC857]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-[#727272]">
                      Email liên hệ <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 w-full rounded-2xl border-2 border-black/20 bg-[#F7FAFF] px-4 text-sm font-semibold outline-none transition-all focus:border-black focus:bg-white focus:shadow-[3px_3px_0px_0px_#FFC857]"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-[#727272]">
                      Số điện thoại
                    </span>
                    <input
                      type="tel"
                      placeholder="Ví dụ: 0912 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12 w-full rounded-2xl border-2 border-black/20 bg-[#F7FAFF] px-4 text-sm font-semibold outline-none transition-all focus:border-black focus:bg-white focus:shadow-[3px_3px_0px_0px_#FFC857]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-[#727272]">
                      Tiêu đề <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Cần tư vấn lộ trình"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="h-12 w-full rounded-2xl border-2 border-black/20 bg-[#F7FAFF] px-4 text-sm font-semibold outline-none transition-all focus:border-black focus:bg-white focus:shadow-[3px_3px_0px_0px_#FFC857]"
                    />
                  </label>
                </div>

                {/* Quick Subject Tags */}
                <div>
                  <span className="mb-2 block text-[11px] font-bold text-[#727272]">
                    Gợi ý chủ đề nhanh:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {SUBJECT_SUGGESTIONS.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => setFormData({ ...formData, subject: topic })}
                        className={`rounded-full border-2 border-black px-3.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                          formData.subject === topic
                            ? "bg-[#3A8157] text-white shadow-[2px_2px_0px_0px_#FFC857]"
                            : "bg-[#F7FAFF] text-[#727272] hover:bg-[#FFC857] hover:text-black hover:shadow-[2px_2px_0px_0px_#3A8157]"
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="block">
                  <span className="mb-1.5 flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-[#727272]">
                    Nội dung yêu cầu <span className="text-red-500">*</span>
                  </span>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hãy mô tả chi tiết thắc mắc hoặc điều bạn muốn PENTAVA hỗ trợ..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full resize-none rounded-2xl border-2 border-black/20 bg-[#F7FAFF] p-4 text-sm font-semibold outline-none transition-all focus:border-black focus:bg-white focus:shadow-[3px_3px_0px_0px_#FFC857]"
                  />
                </label>

                <motion.button
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full border-2 border-black bg-[#3A8157] px-6 text-sm font-extrabold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_#FFC857] transition-all hover:bg-[#326f4a] hover:shadow-[6px_6px_0px_0px_#FFC857] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Đang gửi yêu cầu...
                    </>
                  ) : (
                    <>
                      Gửi yêu cầu hỗ trợ
                      <span className="material-symbols-outlined text-[20px]">send</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
