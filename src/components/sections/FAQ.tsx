import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Plus, Minus, HelpCircle, ArrowDown } from "lucide-react"

interface FaqItem {
  id: number
  q: string
  a: string
}

const faqs: FaqItem[] = [
  {
    id: 1,
    q: "PENTAVA phù hợp với ai?",
    a: "PENTAVA được thiết kế riêng cho người trẻ, sinh viên và người đi làm muốn cải thiện thói quen, chăm sóc sức khỏe thể chất & tinh thần nhưng không muốn bị áp lực bởi những con số hoặc chuỗi streak trừng phạt.",
  },
  {
    id: 2,
    q: "Dữ liệu của tôi có an toàn không?",
    a: "Hoàn toàn an toàn. Toàn bộ hình ảnh, video và nhật ký cá nhân của bạn mặc định là 100% riêng tư. Bạn chỉ chia sẻ khi chủ động tương tác cùng cộng đồng hoặc nhóm bạn thân thiết.",
  },
  {
    id: 3,
    q: "Tôi có thể sử dụng PENTAVA trên những thiết bị nào?",
    a: "Hiện tại PENTAVA đã có mặt chính thức trên Android (Google Play) và đang hoàn tất những khâu kiểm duyệt cuối cùng cho bản iOS (App Store) cũng như giao diện web đồng bộ.",
  },
  {
    id: 4,
    q: "PENTAVA có miễn phí khi bắt đầu không?",
    a: "Có! Bạn hoàn toàn có thể bắt đầu và trải nghiệm miễn phí các tính năng cốt lõi (Routine 1 chạm, mood log, visual verification cơ bản).",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (id: number) => {
    setOpenIndex(openIndex === id ? null : id)
  }

  return (
    <section id="faq" className="relative bg-white py-20 md:py-28 scroll-mt-20 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Cột trái: Tiêu đề & Nhãn FAQ */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D9D9D9] bg-white px-3.5 py-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#3A8157] text-white">
                <HelpCircle className="h-3 w-3" />
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#3A8157]">
                FAQ • HỎI ĐÁP PHỔ BIẾN
              </span>
            </div>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-black leading-tight tracking-tight text-gray-900">
              Câu hỏi thường gặp
            </h2>

            <p className="mt-3 text-base text-[#727272]">
              Những thắc mắc phổ biến về PENTAVA.
            </p>

            <div className="mt-8 hidden lg:block rounded-3xl bg-[#F7FAFF] border border-[#D9D9D9] p-6 ">
              <div className="flex items-center gap-3 text-[#3A8157] font-bold text-sm">
                <HelpCircle className="h-5 w-5 text-[#3A8157]" />
                <span>Cần hỗ trợ trực tiếp?</span>
              </div>
              <p className="mt-2 text-xs text-[#727272] leading-relaxed">
                Đội ngũ PENTAVA luôn sẵn sàng lắng nghe mọi góp ý và giải đáp thắc mắc của bạn qua biểu mẫu hỗ trợ.
              </p>
              <a
                href="#contact"
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#3A8157] hover:underline"
              >
                <span>Gửi thắc mắc cho chúng tôi</span>
                <ArrowDown className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Cột phải: Danh sách Accordion */}
          <div className="space-y-4">
            {faqs.map((item) => {
              const isOpen = openIndex === item.id
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen
                    ? "border-[#3A8157] bg-emerald-50/20 shadow-[3px_3px_0px_0px_#FFC857]"
                    : "border-[#D9D9D9] bg-white hover:border-[#3A8157] shadow-sm"
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    className="flex w-full cursor-pointer items-center justify-between p-5 sm:p-6 text-left"
                  >
                    <span
                      className={`text-base font-bold pr-4 transition-colors ${isOpen ? "text-[#3A8157]" : "text-gray-900"
                        }`}
                    >
                      {item.q}
                    </span>

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm transition-colors ${isOpen
                        ? "bg-[#3A8157] text-white"
                        : "bg-gray-100 text-[#727272]"
                        }`}
                    >
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-gray-100 px-5 sm:px-6 pb-6 pt-3 text-sm leading-relaxed text-gray-600">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
