import { motion } from "motion/react"
import { Heart } from "lucide-react"

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
            className="group flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-7 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300"
          >
            <div>
              <p className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#10B981] mb-2">
                01 • THÓI QUEN
              </p>

              <h3 className="text-xl sm:text-[22px] font-black text-gray-900 tracking-tight">
                Routine 1 chạm tinh gọn
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 font-normal">
                Xây dựng thói quen dễ dàng, cá nhân hóa theo mục tiêu của bạn.
              </p>
            </div>

            {/* Visual Minh Họa Card 1 */}
            <div className="relative mt-8 rounded-2xl bg-[#F0FDF4] p-5 flex items-center gap-4 min-h-[110px]">
              {/* Checklist Card trắng */}
              <div className="relative shrink-0">
                <div className="w-[72px] h-[72px] rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-3 flex flex-col justify-between">
                  {/* Row 1: Vàng cam */}
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shrink-0" />
                    <span className="h-2 w-7 rounded-full bg-[#FEF3C7]" />
                  </div>
                  {/* Row 2: Tím */}
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] shrink-0" />
                    <span className="h-2 w-8 rounded-full bg-[#EDE9FE]" />
                  </div>
                  {/* Row 3: Xanh ngọc */}
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0" />
                    <span className="h-2 w-7 rounded-full bg-[#D1FAE5]" />
                  </div>
                  {/* Row 4: Xanh dương nhạt */}
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] shrink-0" />
                    <span className="h-2 w-8 rounded-full bg-[#E0F2FE]" />
                  </div>
                </div>


              </div>

              {/* Text & Badge */}
              <div className="space-y-1.5">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#15803D]">
                  1 chạm xong ngay
                </span>
                <div className="text-xs sm:text-sm font-medium text-gray-600 leading-snug">
                  <p>Đồng bộ tự động</p>
                  <p>trên mọi thiết bị.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Thước phim PENTA-CINEMA */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-7 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300"
          >
            <div>
              <p className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#8B63F6] mb-2">
                02 • ĐIỆN ẢNH
              </p>

              <h3 className="text-xl sm:text-[22px] font-black text-gray-900 tracking-tight">
                Thước phim PENTA-CINEMA
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 font-normal">
                Lưu lại hành trình phát triển bằng hình ảnh, video sinh động.
              </p>
            </div>

            {/* Visual Minh Họa Card 2 */}
            <div className="relative mt-8 rounded-2xl bg-[#F8F5FE] p-5 flex items-center gap-4 min-h-[110px]">
              {/* Film Clapper/Reel Card trắng */}
              <div className="relative shrink-0">
                <div className="w-[72px] h-[72px] rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center justify-center p-2">
                  <svg
                    width="44"
                    height="38"
                    viewBox="0 0 44 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="44" height="38" rx="8" fill="#8B63F6" />
                    {/* Lỗ cuộn phim bên trái */}
                    <rect x="3" y="5" width="4" height="5" rx="1.5" fill="white" />
                    <rect x="3" y="16.5" width="4" height="5" rx="1.5" fill="white" />
                    <rect x="3" y="28" width="4" height="5" rx="1.5" fill="white" />
                    {/* Lỗ cuộn phim bên phải */}
                    <rect x="37" y="5" width="4" height="5" rx="1.5" fill="white" />
                    <rect x="37" y="16.5" width="4" height="5" rx="1.5" fill="white" />
                    <rect x="37" y="28" width="4" height="5" rx="1.5" fill="white" />
                    {/* Nút Play ở giữa */}
                    <path d="M19 13.5L29 19L19 24.5V13.5Z" fill="white" />
                  </svg>
                </div>

                
              </div>

              {/* Text & Badges */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white text-[#8B63F6] border border-[#DDD6FE] shadow-2xs">
                    Weekly Recap
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white text-[#8B63F6] border border-[#DDD6FE] shadow-2xs">
                    Visual Log
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-medium text-gray-600 leading-snug">
                  <p>Kỷ niệm sinh động</p>
                  <p>hành trình của bạn.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Nhịp thở an lành & Cộng đồng tiếp sức */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-7 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300"
          >
            <div>
              <p className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#E11D48] mb-2">
                03 • CỘNG ĐỒNG
              </p>

              <h3 className="text-xl sm:text-[22px] font-black text-gray-900 tracking-tight">
                Nhịp thở an lành &amp; Cộng đồng <br className="hidden sm:inline" />
                tiếp sức
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 font-normal">
                Kết nối, chia sẻ và lan tỏa năng lượng tích cực mỗi ngày.
              </p>
            </div>

            {/* Visual Minh Họa Card 3 */}
            <div className="relative mt-8 rounded-2xl bg-[#FFF5F5] p-5 flex items-center gap-4 min-h-[110px]">
              {/* Hai vòng tròn Tim & Tiếp sức */}
              <div className="relative flex items-center shrink-0">
                {/* Decorative accents */}
                <svg
                  className="absolute -top-2.5 -left-1.5 w-3 h-3 text-[#FF2D55]"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M2 9C2 5 5 3 8 2" />
                </svg>

                

                {/* Circle 1: Red Heart */}
                <div className="w-11 h-11 rounded-full bg-[#FF2D55] flex items-center justify-center text-white shadow-xs z-10">
                  <Heart className="w-5 h-5 fill-white text-white" />
                </div>

                {/* Circle 2: Yellow Hand High Five */}
                <div className="w-11 h-11 rounded-full bg-[#FFB800] -ml-2.5 flex items-center justify-center text-white shadow-xs">
                  <svg
                    className="w-5 h-5 fill-white text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8.5 2a1 1 0 0 1 1 1v6.5h1V1a1 1 0 0 1 2 0v7.5h1V2.5a1 1 0 0 1 2 0v6h1V5.5a1 1 0 0 1 2 0v7a6.5 6.5 0 0 1-6.5 6.5h-1A6.5 6.5 0 0 1 4.5 12.5V8a1 1 0 0 1 2 0v3h1V3a1 1 0 0 1 1-1z" />
                  </svg>
                </div>
              </div>

              {/* Text & Badge */}
              <div className="space-y-1.5">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#FFE4E6] text-[#E11D48]">
                  Tiếp sức bạn!
                </span>
                <div className="text-xs sm:text-sm font-medium text-gray-600 leading-snug">
                  <p>Tương tác vui</p>
                  <p>Đồng hành lành mạnh.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

