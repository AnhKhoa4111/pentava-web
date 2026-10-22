import { useState } from "react"
import type { FormEvent } from "react"
import { motion } from "motion/react"
import { contactService, type CreateContactRequest } from "../../services/contactService"

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
    <section id={id} className="scroll-mt-20 px-4 pt-6 pb-20 md:pt-10 md:pb-28 md:px-8 bg-white">
      <div className="mx-auto max-w-[1240px]">
        {/* Header Badge & Title */}
        <div className="mb-12 text-center md:mb-16">
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-[#1E7444]">
            KÊNH HỖ TRỢ TRỰC TIẾP
          </p>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-black leading-tight text-gray-900">
            {title}
          </h2>

          <p className="mx-auto mt-3 max-w-[680px] text-sm sm:text-base leading-relaxed text-gray-600">
            {subtitle}
          </p>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* Cột trái: Thông tin cam kết & Kênh hỗ trợ */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-[#F7FAFF] p-7 md:p-9 shadow-sm">
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1E7444] text-white shadow-sm">
                <span className="material-symbols-outlined text-[26px]">mark_chat_unread</span>
              </span>

              <h3 className="text-2xl font-black text-gray-900">
                Chúng tôi luôn sẵn sàng lắng nghe!
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Mọi ý kiến đóng góp, thắc mắc hoặc đề xuất tính năng của bạn đều là động lực quý giá để PENTAVA hoàn thiện tốt hơn mỗi ngày.
              </p>

              <div className="mt-7 space-y-3.5">
                <div className="flex items-start gap-4 rounded-2xl border border-gray-200/80 bg-white p-4 transition-colors hover:border-emerald-500/40">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">bolt</span>
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Phản hồi nhanh chóng</h4>
                    <p className="text-xs leading-5 text-gray-500">
                      Nhận giải đáp trong vòng 24 giờ làm việc từ đội ngũ PENTAVA.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-gray-200/80 bg-white p-4 transition-colors hover:border-emerald-500/40">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1E7444] text-white shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">shield</span>
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Bảo mật thông tin</h4>
                    <p className="text-xs leading-5 text-gray-500">
                      Dữ liệu liên hệ được mã hóa an toàn, không chia sẻ cho bên thứ ba.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-gray-200/80 bg-white p-4 transition-colors hover:border-emerald-500/40">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-gray-950 shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Hỗ trợ tận tâm</h4>
                    <p className="text-xs leading-5 text-gray-500">
                      Đồng hành giải quyết cặn kẽ mọi phản hồi về tính năng & tài khoản.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 gap-3">
              <a
                href="mailto:pentava.official@gmail.com"
                className="flex w-full items-center gap-3.5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-emerald-500 hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#1E7444]">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Email trực tiếp</p>
                  <p className="break-all text-xs font-bold text-gray-900">pentava.official@gmail.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Cột phải: Form gửi liên hệ */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl md:p-9">
            {success ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-[#1E7444] shadow-sm">
                  <span className="material-symbols-outlined text-[36px]">check_circle</span>
                </span>
                <h3 className="text-2xl font-black text-gray-900">
                  Gửi yêu cầu thành công!
                </h3>
                <p className="mt-3 max-w-[420px] text-sm leading-relaxed text-gray-600">
                  Cảm ơn bạn đã liên hệ với PENTAVA. Chúng tôi đã nhận được thông tin và sẽ phản hồi sớm nhất qua email của bạn.
                </p>

                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1E7444] px-7 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#165a34] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[19px]">edit_note</span>
                  Gửi thêm lời nhắn khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-2xl font-black text-gray-900">Để lại thông tin của bạn</h3>
                  <p className="text-xs font-medium text-gray-500 mt-1">
                    Điền đầy đủ các thông tin có dấu <span className="text-red-500">*</span> để chúng tôi hỗ trợ tốt nhất.
                  </p>
                </div>

                {error && (
                  <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
                    <span className="material-symbols-outlined shrink-0 text-[20px]">error</span>
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-600">
                      Họ và tên <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Văn A"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium outline-none transition-all focus:border-[#1E7444] focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-600">
                      Email liên hệ <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium outline-none transition-all focus:border-[#1E7444] focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-600">
                      Số điện thoại
                    </span>
                    <input
                      type="tel"
                      placeholder="Ví dụ: 0912 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium outline-none transition-all focus:border-[#1E7444] focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-600">
                      Tiêu đề <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Cần tư vấn lộ trình"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium outline-none transition-all focus:border-[#1E7444] focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </label>
                </div>

                {/* Quick Subject Tags */}
                <div>
                  <span className="mb-2 block text-xs font-bold text-gray-600">
                    Gợi ý chủ đề nhanh:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {SUBJECT_SUGGESTIONS.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => setFormData({ ...formData, subject: topic })}
                        className={`rounded-full border px-3.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                          formData.subject === topic
                            ? "border-emerald-600 bg-[#1E7444] text-white"
                            : "border-gray-200 bg-gray-50 text-gray-600 hover:border-emerald-500 hover:text-[#1E7444]"
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="block">
                  <span className="mb-1.5 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-600">
                    Nội dung yêu cầu <span className="text-red-500">*</span>
                  </span>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hãy mô tả chi tiết thắc mắc hoặc điều bạn muốn PENTAVA hỗ trợ..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm font-medium outline-none transition-all focus:border-[#1E7444] focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                  />
                </label>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#1E7444] px-6 text-sm font-bold text-white shadow-md transition-all hover:bg-[#165a34] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Đang gửi yêu cầu...
                    </>
                  ) : (
                    <>
                      <span>Gửi yêu cầu hỗ trợ</span>
                      <span className="material-symbols-outlined text-[18px]">send</span>
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
