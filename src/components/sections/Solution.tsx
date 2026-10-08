import { useRef } from "react"
import { motion, useScroll, useSpring } from "motion/react"

interface TransformationStep {
  id: string
  stepNumber: string
  themeColor: string
  shadowColor: string
  struggle: {
    tag: string
    title: string
    desc: string
    icon: string
  }
  solution: {
    tag: string
    title: string
    desc: string
    icon: string
    benefits: string[]
  }
}

const steps: TransformationStep[] = [
  {
    id: "step-1",
    stepNumber: "01",
    themeColor: "#FFC857",
    shadowColor: "#FFC857",
    struggle: {
      tag: "RÀO CẢN CŨ",
      title: "Phân mảnh vì quá nhiều ứng dụng rời rạc",
      desc: "Habit, mood log, nhật ký và sức khỏe nằm ở 4-5 ứng dụng khác nhau. Mỗi sáng thức dậy phải mở cả loạt app khiến bạn quá tải ý chí và dễ bỏ cuộc giữa chừng.",
      icon: "grid_view",
    },
    solution: {
      tag: "PENTAVA CHUYỂN HÓA",
      title: "Done-for-you Routine — Tích hợp trọn vẹn 1 chạm",
      desc: "PENTAVA tinh gọn mọi thứ vào một nhịp sống duy nhất. 5 micro-task gợi ý mỗi ngày cân bằng hoàn hảo giữa vận động, giấc ngủ, dinh dưỡng, tâm trạng và phản chiếu bản thân.",
      icon: "touch_app",
      benefits: [
        "1 chạm bắt đầu ngày mới, không tốn ý chí lên kế hoạch",
        "Khảo sát thông minh tự động cá nhân hóa theo mức năng lượng",
        "Giảm 80% ma sát bắt đầu và duy trì đều đặn",
      ],
    },
  },
  {
    id: "step-2",
    stepNumber: "02",
    themeColor: "#529CFF",
    shadowColor: "#529CFF",
    struggle: {
      tag: "RÀO CẢN CŨ",
      title: "Mông lung trước trang giấy trắng & checkbox vô hồn",
      desc: "Không biết bắt đầu từ đâu, và sau nhiều tuần tích lũy những ô checkbox khô khan, bạn vẫn không cảm nhận hay nhìn thấy rõ sự tiến bộ của chính mình.",
      icon: "visibility_off",
    },
    solution: {
      tag: "PENTAVA CHUYỂN HÓA",
      title: "Visual Verification & PENTA-CINEMA — Thước phim tiến bộ",
      desc: "Thay checkbox bằng ảnh và video thật để lưu lại minh chứng sống động. PENTA-CINEMA tự động tổng hợp Weekly Capsule thành một thước phim điện ảnh truyền cảm hứng về hành trình của bạn.",
      icon: "movie",
      benefits: [
        "Dấu vết tiến bộ trực quan, sinh động qua ảnh và video thật",
        "Weekly Recap điện ảnh giúp bạn tự hào nhìn lại nỗ lực",
        "Toàn bộ khoảnh khắc mặc định riêng tư và bảo mật tuyệt đối",
      ],
    },
  },
  {
    id: "step-3",
    stepNumber: "03",
    themeColor: "#3A8157",
    shadowColor: "#3A8157",
    struggle: {
      tag: "RÀO CẢN CŨ",
      title: "Áp lực Streak đè nặng khiến kỷ luật thành gánh nặng",
      desc: "Lỡ mất một ngày là đứt chuỗi kèm cảm giác tội lỗi. Các thông báo nhắc nhở dồn dập biến việc phát triển bản thân thành một cuộc đua kiệt sức và căng thẳng.",
      icon: "cached",
    },
    solution: {
      tag: "PENTAVA CHUYỂN HÓA",
      title: "Nhịp thở an lành & Động lực kép — Đồng hành tử tế",
      desc: "Khi bạn mệt mỏi, tính năng 'Nhịp thở an lành' tự động hạ cường độ để bạn phục hồi mà không trừng phạt. Nhóm nhỏ cùng chí hướng tiếp sức bằng high-five ấm áp, không bảng xếp hạng hơn thua.",
      icon: "spa",
      benefits: [
        "Hạ nhịp thông minh khi mất sức thay vì áp đặt streak độc hại",
        "Đồng hành nhóm nhỏ văn minh, khích lệ và đồng cảm",
        "Tiến bộ bền bỉ, an nhiên theo đúng nhịp sinh học của bạn",
      ],
    },
  },
]

export default function Solution() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll Animation using Motion's useScroll & useSpring
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  })

  const scrollToStep = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  return (
    <section
      id="solution"
      ref={containerRef}
      className="relative border-y-2 border-[#D9D9D9] bg-white py-24 md:py-32 scroll-mt-24"
    >
      <div className="mx-auto max-w-[1240px] px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* CỘT TRÁI: Sticky Header & Scroll Navigation */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#3A8157]/30 bg-[#E8F3EC] px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#3A8157]">
                <span className="h-2 w-2 rounded-full bg-[#3A8157] animate-pulse" />
                Vấn đề & Hướng giải quyết
              </span>

              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-black md:text-5xl">
                Từ rào cản phân mảnh đến{" "}
                <span className="relative inline-block text-[#3A8157]">
                  routine bền vững.
                  <span className="absolute -bottom-1 left-0 right-0 h-3 rounded-full bg-[#FFC857]/50 -z-10" />
                </span>
              </h2>

              <p className="text-base leading-relaxed text-[#727272]">
                Phát triển bản thân không nên là một cuộc chạy đua kiệt sức. PENTAVA thay thế những rào cản thường gặp bằng trải nghiệm trực quan, tinh giản và tử tế.
              </p>

              {/* TIMELINE PROGRESS TRACKER */}
              <div className="hidden lg:block pt-6">
                <p className="text-xs font-black uppercase tracking-widest text-[#727272] mb-4">
                  Hành trình chuyển hóa (Cuộn để xem)
                </p>

                <div className="relative pl-6 space-y-6">
                  {/* Đường ray nền */}
                  <div className="absolute left-[7px] top-2 bottom-2 w-[3px] rounded-full bg-[#E5E7EB]" />

                  {/* Đường ray chuyển động động theo useScroll */}
                  <motion.div
                    style={{ scaleY: smoothProgress, transformOrigin: "top" }}
                    className="absolute left-[7px] top-2 bottom-2 w-[3px] rounded-full bg-[#3A8157]"
                  />

                  {steps.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToStep(item.id)}
                      type="button"
                      className="group flex w-full items-center gap-4 text-left cursor-pointer transition-all focus:outline-none"
                    >
                      <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-black bg-white text-xs font-black text-black group-hover:bg-[#FFC857] group-hover:border-[#3A8157] transition-colors shadow-[2px_2px_0px_0px_#3A8157]">
                        {item.stepNumber}
                      </span>
                      <div>
                        <p className="text-xs font-extrabold text-black group-hover:text-[#3A8157] transition-colors">
                          {item.solution.title.split("—")[0]}
                        </p>
                        <p className="text-[11px] text-[#727272] line-clamp-1">
                          {item.struggle.title}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: Danh sách Thẻ Chuyển Hóa (Transformation Cards) */}
          <div className="space-y-12 lg:col-span-7">
            {steps.map((step) => (
              <motion.article
                id={step.id}
                key={step.id}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="group relative rounded-3xl border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#3A8157] transition-all md:p-8"
              >
                {/* Header Card: Mốc số & Tiêu đề chung */}
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-5 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-black font-black text-white text-lg shadow-[3px_3px_0px_0px_#FFC857]">
                      {step.stepNumber}
                    </span>
                    <span className="text-xs font-black uppercase tracking-wider text-[#727272]">
                      Chuyển đổi cốt lõi
                    </span>
                  </div>

                  <span className="rounded-full bg-[#F7FAFF] px-3.5 py-1 text-xs font-bold text-black border border-black/10">
                    Bước {step.stepNumber} / 03
                  </span>
                </div>

                {/* 1. KHỐI RÀO CẢN CŨ (THE STRUGGLE) */}
                <div className="rounded-2xl border border-[#F25F5C]/30 bg-[#FFF6F6] p-5 md:p-6 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#F25F5C] shadow-sm">
                      <span className="material-symbols-outlined text-[14px]">warning</span>
                      {step.struggle.tag}
                    </span>
                    <span className="material-symbols-outlined text-2xl text-[#F25F5C]/80">
                      {step.struggle.icon}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-extrabold text-black">
                    {step.struggle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#727272]">
                    {step.struggle.desc}
                  </p>
                </div>

                {/* CẦU NỐI CHUYỂN TIẾP (TRANSITION BRIDGE) */}
                <div className="my-4 flex items-center justify-center">
                  <div className="flex items-center gap-2 rounded-full border-2 border-black bg-[#FFC857] px-4 py-1.5 text-xs font-extrabold text-black shadow-[3px_3px_0px_0px_#3A8157]">
                    <span>Giải pháp từ PENTAVA</span>
                    <span className="material-symbols-outlined text-[16px] animate-bounce">
                      arrow_downward
                    </span>
                  </div>
                </div>

                {/* 2. KHỐI GIẢI PHÁP PENTAVA (THE SOLUTION) */}
                <div className="rounded-2xl border-2 border-[#3A8157] bg-[#F4FBF6] p-6 md:p-7 shadow-[4px_4px_0px_0px_#3A8157]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3A8157] px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      {step.solution.tag}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#3A8157] shadow-sm">
                      <span className="material-symbols-outlined text-2xl">
                        {step.solution.icon}
                      </span>
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-black">
                    {step.solution.title}
                  </h3>

                  <p className="mt-3 text-sm md:text-base leading-relaxed text-[#555555]">
                    {step.solution.desc}
                  </p>

                  {/* LỢI ÍCH TRỰC QUAN (BENEFITS LIST) */}
                  <div className="mt-6 space-y-2.5 pt-5 border-t border-[#3A8157]/20">
                    {step.solution.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-[18px] text-[#3A8157] shrink-0 mt-0.5 font-bold">
                          done_all
                        </span>
                        <span className="text-xs md:text-sm font-bold text-black">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
