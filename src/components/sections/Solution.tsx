import { motion } from "motion/react"
import ScrambleText from "../common/ScrambleText"
import {
  ScrollReelTestimonials,
  type ScrollReelTestimonial,
} from "../ui/scroll-reel-testimonials"
import { GlowCard } from "../ui/spotlight-card"

const TRANSFORMATION_STORIES: ScrollReelTestimonial[] = [
  {
    quote:
      "Trước đây mình dùng 4-5 app rời rạc cho thói quen, cảm xúc và nhật ký. Với PENTAVA, Routine 1 chạm tích hợp trọn vẹn giúp mình bắt đầu ngày mới nhẹ nhàng mà không quá tải.",
    author: "Minh Anh • Giải pháp Routine 1 chạm tích hợp",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    alt: "Chân dung Minh Anh",
  },
  {
    quote:
      "Các ứng dụng khác trừng phạt khi lỡ đứt streak khiến mình rất tội lỗi. PENTAVA có tính năng Nhịp thở an lành tự động hạ cường độ khi mệt, giúp mình phục hồi và gắn bó lâu dài.",
    author: "Quốc Bảo • Chuyển hóa từ áp lực streak sang kỷ luật tử tế",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    alt: "Chân dung Quốc Bảo",
  },
  {
    quote:
      "Thay vì những ô checkbox vô hồn, PENTAVA lưu lại ảnh và mood thật, cuối tuần dựng thành thước phim PENTA-CINEMA sinh động. Cảm giác nhìn thấy chính mình tiến bộ mỗi tuần thật tuyệt vời.",
    author: "Thảo Vy • Visual Verification & PENTA-CINEMA Recap",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    alt: "Chân dung Thảo Vy",
  },
  {
    quote:
      "Nhóm đồng hành 5 người không hề có bảng xếp hạng hay đố kỵ, chỉ có những cái đập tay tiếp sức chân thành. Mình tìm thấy sự kỷ luật tự giác mà không hề cảm thấy cô đơn.",
    author: "Hoàng Long • Đồng hành nhóm nhỏ văn minh",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    alt: "Chân dung Hoàng Long",
  },
]

const PILLARS = [
  {
    step: "01",
    tag: "TÍCH HỢP TOÀN DIỆN",
    before: "Phân mảnh 4-5 ứng dụng riêng lẻ",
    after: "Routine 1 chạm tinh gọn 5 khía cạnh sức khỏe",
    color: "#FFC857",
    glow: "orange" as const,
    icon: "all_inclusive",
  },
  {
    step: "02",
    tag: "TRỰC QUAN HÓA",
    before: "Checkbox khô khan, dễ nản lòng",
    after: "Visual log & Thước phim PENTA-CINEMA",
    color: "#529CFF",
    glow: "blue" as const,
    icon: "movie_filter",
  },
  {
    step: "03",
    tag: "KỶ LUẬT TỬ TẾ",
    before: "Áp lực Streak đè nặng, sợ đứt chuỗi",
    after: "Nhịp thở an lành & Nhóm nhỏ 5 người tiếp sức",
    color: "#3A8157",
    glow: "green" as const,
    icon: "spa",
  },
]

export default function Solution() {
  return (
    <section
      id="solution"
      className="relative border-y-2 border-black/10 bg-[#F7FAFF] py-24 md:py-32 scroll-mt-24 overflow-hidden"
    >
      {/* Nền trang trí phong cách Neo-Brutalist */}
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#FFC857]/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-[#3A8157]/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1240px] px-6 md:px-8">
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#3A8157] shadow-[3px_3px_0px_0px_#FFC857]">
            <span className="h-2 w-2 rounded-full bg-[#3A8157] animate-pulse" />
            <ScrambleText text="GIẢI PHÁP & CHUYỂN HÓA" scrambleSpeed={30} />
          </span>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-black md:text-5xl">
            Từ rào cản phân mảnh đến{" "}
            <span className="relative inline-block text-[#3A8157]">
              hành trình an lành.
              <span className="absolute -bottom-1 left-0 right-0 h-3 rounded-full bg-[#FFC857]/50 -z-10" />
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#727272] md:text-lg">
            Phát triển bản thân không nên là một cuộc chạy đua kiệt sức. Cùng khám
            phá cách PENTAVA chuyển hóa những áp lực thường ngày thành thói quen
            kiên trì đầy cảm hứng qua góc nhìn thực tế.
          </p>
        </div>

        {/* COMPONENT SCROLL REEL TESTIMONIALS */}
        <div className="flex justify-center mb-16">
          <ScrollReelTestimonials
            testimonials={TRANSFORMATION_STORIES}
            className="w-full"
          />
        </div>

        {/* 3 TRỤ CỘT CHUYỂN HÓA CỐT LÕI (3 PILLARS CARDS VỚI GLOW SPOTLIGHT) */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((item) => (
            <motion.div
              key={item.step}
              whileHover={{ y: -4 }}
              className="h-full"
            >
              <GlowCard
                customSize
                glowColor={item.glow}
                className="relative h-full flex flex-col justify-between rounded-3xl border-2 border-black bg-white p-7 shadow-[6px_6px_0px_0px_#3A8157] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-black font-black text-white text-sm shadow-[2px_2px_0px_0px_#FFC857]">
                      {item.step}
                    </span>
                    <span className="rounded-full border border-black/10 bg-[#F7FAFF] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#727272]">
                      {item.tag}
                    </span>
                  </div>

                  {/* Rào cản cũ */}
                  <div className="mb-4 rounded-2xl border border-red-200 bg-red-50/70 p-3.5">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-red-600 mb-1">
                      Rào cản cũ
                    </p>
                    <p className="text-xs font-bold text-black/80">{item.before}</p>
                  </div>

                  {/* Mũi tên chuyển đổi */}
                  <div className="my-2 flex justify-center">
                    <span className="material-symbols-outlined text-[18px] text-[#3A8157] animate-bounce">
                      arrow_downward
                    </span>
                  </div>
                </div>

                {/* Giải pháp PENTAVA */}
                <div
                  className="rounded-2xl border-2 border-black p-4 shadow-sm mt-2"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#3A8157] font-bold">
                      check_circle
                    </span>
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#3A8157]">
                      PENTAVA Chuyển hóa
                    </p>
                  </div>
                  <p className="text-sm font-extrabold text-black">{item.after}</p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
