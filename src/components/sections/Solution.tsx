import { motion } from "motion/react"
import { ArrowRight, Film, Heart } from "lucide-react"

export default function Solution() {
  return (
    <section
      id="solution"
      className="relative bg-[#F7FAFF] py-20 md:py-28 scroll-mt-20 overflow-hidden"
    >
      <div className="mx-auto max-w-[1240px] px-6 md:px-8">
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-[#1E7444]">
            GIẢI PHÁP & CHUYỂN HÓA
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[44px] font-black leading-tight tracking-tight text-gray-900">
            Từ rào cản phân mảnh đến{" "}
            <span className="text-[#1E7444]">hành trình an lành.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-600">
            Phát triển bản thân không nên là một cuộc chạy đua kiệt sức. Cùng khám phá cách PENTAVA chuyển hóa những áp lực thường ngày thành thói quen kiên trì đầy cảm hứng qua góc nhìn thực tế.
          </p>
        </div>

        {/* 3 Thẻ Chuyển Hóa Cốt Lõi */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {/* Card 1: Routine 1 chạm tinh gọn */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1E7444] mb-2">
                01 • THÓI QUEN
              </p>

              <h3 className="text-xl font-black text-gray-900">
                Routine 1 chạm tinh gọn
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Xây dựng thói quen dễ dàng, cá nhân hóa theo mục tiêu của bạn.
              </p>
            </div>

            {/* Visual Minh Họa */}
            <div className="relative mt-8 rounded-2xl bg-[#F0F8F3] p-5 overflow-hidden flex items-center justify-between min-h-[110px]">
              {/* Mockup điện thoại nhỏ gọn */}
              <div className="flex items-center gap-3.5">
                <div className="w-24 rounded-2xl border-3 border-gray-800 bg-white p-2 shadow-sm">
                  <div className="space-y-1.5">
                    <div className="h-2.5 w-12 rounded-full bg-amber-200" />
                    <div className="h-4 w-full rounded-md bg-purple-100 flex items-center px-1.5">
                      <span className="h-1.5 w-8 rounded-full bg-[#8B63F6]/50" />
                    </div>
                    <div className="h-4 w-full rounded-md bg-emerald-100 flex items-center px-1.5">
                      <span className="h-1.5 w-10 rounded-full bg-emerald-500/50" />
                    </div>
                    <div className="h-4 w-full rounded-md bg-sky-100 flex items-center px-1.5">
                      <span className="h-1.5 w-7 rounded-full bg-sky-400/50" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    1 chạm xong ngay
                  </span>
                  <p className="text-[11px] font-medium text-gray-500">  Đồng bộ tự động</p>
                </div>
              </div>

              {/* Nút tròn mũi tên */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-transform group-hover:translate-x-1 shrink-0">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </motion.div>

          {/* Card 2: Thước phim PENTA-CINEMA */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-xl transition-all duration-300"
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

            {/* Visual Minh Họa Cinema */}
            <div className="relative mt-8 rounded-2xl bg-[#F6F2FF] p-5 overflow-hidden flex items-center justify-between min-h-[110px]">
              {/* Clapperboard & Video frame */}
              <div className="flex items-center gap-3.5">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-1.5 shadow-sm border border-purple-100">
                    <Film className="h-4 w-4 text-[#8B63F6]" />
                    <span className="text-xs font-bold text-gray-700">Weekly Recap</span>
                  </div>
                  <div className="h-7 w-26 rounded-xl bg-[#8B63F6]/20 flex items-center justify-center gap-1.5">
                    <span className="h-4 w-4 rounded-full bg-[#8B63F6] flex items-center justify-center text-white text-[8px]">▶</span>
                    <span className="text-[10px] font-bold text-[#8B63F6]">Phát lại</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold text-[#8B63F6]">
                    Visual Log
                  </span>
                  <p className="text-[11px] font-medium text-gray-500">Kỷ niệm sinh động</p>
                </div>
              </div>

              {/* Nút tròn mũi tên */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-transform group-hover:translate-x-1 shrink-0">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Nhịp thở an lành & Cộng đồng tiếp sức */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-rose-600 mb-2">
                03 • CỘNG ĐỒNG
              </p>

              <h3 className="text-xl font-black text-gray-900">
                Nhịp thở an lành & Cộng đồng tiếp sức
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Kết nối, chia sẻ và lan tỏa năng lượng tích cực mỗi ngày.
              </p>
            </div>

            {/* Visual Minh Họa Cộng đồng */}
            <div className="relative mt-8 rounded-2xl bg-[#FFF5F5] p-5 overflow-hidden flex items-center justify-between min-h-[110px]">
              {/* Hearts & High-five icons */}
              <div className="flex items-center gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-white shadow-xs text-xs">
                      <Heart className="h-3 w-3 fill-current" />
                    </span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-white shadow-xs text-xs">
                      ✋
                    </span>
                  </div>
                  <div className="rounded-xl bg-white px-2.5 py-1 shadow-xs text-[10px] font-bold text-gray-700 border border-rose-100">
                    Tiếp sức bạn! ✨
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold text-rose-700">
                    Tương tác vui
                  </span>
                  <p className="text-[11px] font-medium text-gray-500">Đồng hành lành mạnh</p>
                </div>
              </div>

              {/* Nút tròn mũi tên */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-transform group-hover:translate-x-1 shrink-0">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
