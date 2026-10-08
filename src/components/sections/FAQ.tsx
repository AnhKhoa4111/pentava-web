import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import ScrambleText from "../common/ScrambleText"

interface FaqItem {
  id: number
  category: "all" | "privacy" | "feature" | "pricing"
  q: string
  a: string
}

const faqs: FaqItem[] = [
  {
    id: 1,
    category: "privacy",
    q: "Ảnh check-in và dữ liệu cá nhân của tôi có bị công khai không?",
    a: "Hoàn toàn không. Toàn bộ hình ảnh, video và nhật ký cá nhân mặc định là 100% riêng tư. Bạn chỉ chia sẻ khi chủ động bật tính năng đồng hành cùng nhóm nhỏ tối đa 5 người thân quen của mình.",
  },
  {
    id: 2,
    category: "feature",
    q: "Nếu tôi bận hoặc lỡ đứt chuỗi thì có bị mất tiến trình không?",
    a: "PENTAVA không trừng phạt người dùng bằng streak độc hại. Tính năng 'Nhịp thở an lành' sẽ tự động hỗ trợ bạn hạ 40% cường độ mục tiêu trong những ngày mệt mỏi và bắt đầu lại một cách nhẹ nhàng nhất.",
  },
  {
    id: 3,
    category: "feature",
    q: "PENTAVA khác gì so với các ứng dụng Todo hay Habit thông thường?",
    a: "PENTAVA không bắt bạn tự vắt óc lên kế hoạch từ đầu. Chúng tôi cung cấp lộ trình cá nhân hóa 1 chạm, kiểm chứng bằng ảnh/video thật thay vì checkbox vô hồn, và tự động dựng Weekly Capsule thành một thước phim recap điện ảnh cảm xúc.",
  },
  {
    id: 4,
    category: "pricing",
    q: "PENTAVA có hoàn toàn miễn phí khi sử dụng không?",
    a: "Bạn hoàn toàn có thể bắt đầu và trải nghiệm miễn phí các tính năng cốt lõi (Routine 1 chạm, mood log, visual verification cơ bản). Khi cần thước phim recap điện ảnh mở rộng hoặc lưu trữ không giới hạn, bạn có thể cân nhắc gói cao cấp sau.",
  },
]

const categories = [
  { key: "all", label: "Tất cả" },
  { key: "privacy", label: "Bảo mật & Quyền riêng tư" },
  { key: "feature", label: "Tính năng & Routine" },
  { key: "pricing", label: "Chi phí & Gói dùng" },
]

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const filteredFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((item) => item.category === activeCategory)

  const toggle = (id: number) => {
    setOpenIndex(openIndex === id ? null : id)
  }

  return (
    <section id="faq" className="mx-auto max-w-[980px] px-6 pt-20 md:pt-28 pb-8 md:pb-12 md:px-8 scroll-mt-24">
      {/* Header section với ScrambleText */}
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#529CFF] px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-[3px_3px_0px_0px_#FFC857]">
          <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
          <ScrambleText text="HỎI ĐÁP & HỖ TRỢ" scrambleSpeed={30} />
        </span>

        <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-black md:text-5xl">
          Câu hỏi thường gặp
        </h2>

        <p className="mt-3 text-base text-[#727272]">
          Những giải đáp chi tiết nhất giúp bạn an tâm bắt đầu hành trình cùng PENTAVA
        </p>
      </div>

      {/* Bộ lọc chủ đề câu hỏi */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeCategory === cat.key
                ? "border-2 border-black bg-[#3A8157] text-white shadow-[2px_2px_0px_0px_#FFC857]"
                : "border-2 border-black/15 bg-white text-[#727272] hover:border-black hover:text-black"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Danh sách Accordion FAQ */}
      <div className="space-y-4">
        {filteredFaqs.map((item) => {
          const isOpen = openIndex === item.id
          return (
            <div
              key={item.id}
              className={`rounded-2xl border-2 transition-all duration-200 ${
                isOpen
                  ? "border-black bg-white shadow-[6px_6px_0px_0px_#3A8157]"
                  : "border-black/20 bg-white hover:border-black hover:shadow-[4px_4px_0px_0px_#FFC857]"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="flex w-full cursor-pointer items-center justify-between p-6 text-left"
              >
                <span
                  className={`text-base md:text-lg font-extrabold pr-4 transition-colors ${
                    isOpen ? "text-[#3A8157]" : "text-black"
                  }`}
                >
                  {item.q}
                </span>

                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className={`material-symbols-outlined flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl transition-colors ${
                    isOpen
                      ? "bg-[#3A8157] text-white"
                      : "bg-[#F7FAFF] text-[#727272]"
                  }`}
                >
                  expand_more
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-[#F0F0F0] px-6 pb-6 pt-4 text-sm md:text-base leading-relaxed text-[#555]">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Khối cầu nối mượt mà dẫn xuống form liên hệ trực tiếp */}
      <div className="mt-12 rounded-3xl border-2 border-black bg-gradient-to-r from-[#F7FAFF] to-[#FFFBEB] p-6 md:p-8 text-center shadow-[6px_6px_0px_0px_#3A8157]">
        <span className="material-symbols-outlined text-3xl text-[#3A8157]">
          help_center
        </span>
        <h3 className="mt-2 text-xl md:text-2xl font-black text-black">
          Chưa tìm thấy câu trả lời cho vấn đề của bạn?
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[#727272]">
          Đừng ngần ngại để lại câu hỏi ở biểu mẫu liên hệ bên dưới. Đội ngũ PENTAVA sẽ phản hồi và hỗ trợ bạn trong vòng 24 giờ!
        </p>
        <div className="mt-5">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#FFC857] px-7 py-3 text-xs font-black uppercase tracking-wider text-black shadow-[3px_3px_0px_0px_#3A8157] hover:bg-[#ffe082] hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <span>Điền biểu mẫu liên hệ bên dưới</span>
            <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
          </a>
        </div>
      </div>
    </section>
  )
}
