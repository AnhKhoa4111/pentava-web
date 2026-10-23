import { motion } from "motion/react"
import { ArrowRight, Film, Heart, Users, Check, Play, Zap } from "lucide-react"

export default function Solution() {
  return (
    <section
      id="solution"
      className="relative bg-white py-20 md:py-28 scroll-mt-20 overflow-hidden"
    >
      <div className="mx-auto max-w-[1240px] px-6 md:px-8">
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-8 bg-[#8B63F6]/50" />
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.18em] text-[#8B63F6]">
              GIẢI PHÁP & CHUYỂN HÓA
            </p>
            <span className="h-px w-8 bg-[#8B63F6]/50" />
          </div>

          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-[44px] font-black leading-tight tracking-tight text-gray-900">
            Từ rào cản phân mảnh đến hành trình an lành.
          </h2>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto">
            Ba mảnh ghép đồng hành cùng bạn kiến tạo phiên bản tốt hơn mỗi ngày, từ thói quen, trải nghiệm đến cộng đồng.
          </p>
        </div>

        {/* 3 Thẻ Chuyển Hóa Cốt Lõi */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {/* Card 1: Routine 1 chạm tinh gọn */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-7 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#10B981] mb-2">
                01 • THÓI QUEN
              </p>

              <h3 className="text-xl font-black text-gray-900">
                Routine 1 chạm tinh gọn
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Xây dựng thói quen dễ dàng, cá nhân hóa theo mục tiêu của bạn.
              </p>
            </div>

            {/* Visual Minh Họa Card 1 */}
            <div className="relative mt-8 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] p-4 flex items-center justify-between min-h-[96px]">
              <div className="flex items-center gap-3">
                {/* Hộp Checklist trắng 3 mục */}
                <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-emerald-100/60 p-2 flex flex-col justify-between shrink-0">
                  {/* Row 1: Green check */}
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-[8px]">
                      <Check className="h-2 w-2 stroke-[3]" />
                    </span>
                    <span className="h-1.5 w-6 rounded-full bg-emerald-100" />
                  </div>
                  {/* Row 2: Purple check */}
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-[#8B63F6] text-white text-[8px]">
                      <Check className="h-2 w-2 stroke-[3]" />
                    </span>
                    <span className="h-1.5 w-5 rounded-full bg-purple-100" />
                  </div>
                  {/* Row 3: Cyan check */}
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-sky-400 text-white text-[8px]">
                      <Check className="h-2 w-2 stroke-[3]" />
                    </span>
                    <span className="h-1.5 w-6 rounded-full bg-sky-100" />
                  </div>
                </div>

                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-bold text-emerald-800">
                    1 chạm xong ngay
                  </p>
                  <p className="text-[11px] font-medium text-gray-500">
                    Đồng bộ tự động
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Thước phim PENTA-CINEMA */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-7 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8B63F6] mb-2">
                02 • ĐIỆN ẢNH
              </p>

              <h3 className="text-xl font-black text-gray-900">
                Thước phim PENTA-CINEMA
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Lưu lại hành trình phát triển bằng hình ảnh, video sinh động.
              </p>
            </div>

            {/* Visual Minh Họa Card 2 */}
            <div className="relative mt-8 rounded-2xl bg-[#FAF5FF] border border-[#F3E8FF] p-4 flex items-center justify-between min-h-[96px]">
              <div className="flex items-center gap-3">
                {/* Hộp icon Film cuộn phim */}
                <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-purple-100/60 flex items-center justify-center shrink-0">
                  <Film className="h-6 w-6 text-[#8B63F6]" />
                </div>

                <div className="space-y-1">
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-gray-900">
                      Weekly Recap
                    </p>
                    <p className="text-[11px] font-medium text-gray-500">
                      Kỷ niệm sinh động
                    </p>
                  </div>

                  {/* Nút Phát lại tím */}
                  <div className="inline-flex items-center gap-1 rounded-full bg-[#8B63F6] px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
                    <Play className="h-2.5 w-2.5 fill-current" />
                    <span>Phát lại</span>
                  </div>
                </div>
              </div>

              
            </div>
          </motion.div>

          {/* Card 3: Nhịp thở an lành & Cộng đồng tiếp sức */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-7 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#E11D48] mb-2">
                03 • CỘNG ĐỒNG
              </p>

              <h3 className="text-xl font-black text-gray-900">
                Nhịp thở an lành & Cộng đồng tiếp sức
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Kết nối, chia sẻ và lan tỏa năng lượng tích cực mỗi ngày.
              </p>
            </div>

            {/* Visual Minh Họa Card 3 */}
            <div className="relative mt-8 rounded-2xl bg-[#FFF5F5] border border-[#FFE4E6] p-4 flex items-center justify-between min-h-[96px]">
              <div className="flex items-center gap-3">
                {/* Cụm biểu tượng Tim & Người + Tiếp sức bạn */}
                <div className="flex flex-col gap-1.5 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-white shadow-xs text-xs">
                      <Heart className="h-3 w-3 fill-current" />
                    </span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-500 shadow-xs text-xs">
                      <Users className="h-3 w-3" />
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[9px] font-bold text-rose-600 shadow-xs border border-rose-100">
                    <Zap className="h-2.5 w-2.5 fill-rose-500 text-rose-500" />
                    <span>Tiếp sức bạn!</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-bold text-rose-900">
                    Tương tác vui
                  </p>
                  <p className="text-[11px] font-medium text-gray-500">
                    Đồng hành lành mạnh
                  </p>
                </div>
              </div>


            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
