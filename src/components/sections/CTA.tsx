import { motion } from "motion/react"
import ScrambleText from "../common/ScrambleText"
import { NumberTicker } from "../common/Ticker"

export default function CTA() {
  return (
    <section id="download" className="relative bg-[#3A8157] py-24 md:py-32 text-white scroll-mt-24 overflow-hidden">
      {/* Họa tiết nền trang trí nhẹ nhàng */}
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#FFC857]/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-[#529CFF]/10 blur-3xl pointer-events-none" />

      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 px-6 md:px-8 lg:grid-cols-[1.1fr_380px]">
        {/* CỘT TRÁI: Nội dung kêu gọi tải App */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#FFC857] px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]">
            <span className="h-2 w-2 rounded-full bg-[#3A8157] animate-pulse" />
            <ScrambleText text="TẢI PENTAVA NGAY" scrambleSpeed={35} />
          </div>

          <h2 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl text-white">
            Bắt đầu Routine 1 chạm cho{" "}
            <span className="text-[#FFC857] underline decoration-wavy decoration-[#FFC857]/60 underline-offset-8">
              phiên bản tốt hơn
            </span>{" "}
            của chính bạn.
          </h2>

          <p className="max-w-2xl text-base md:text-lg leading-relaxed text-white/85">
            Trải nghiệm miễn phí các tính năng cốt lõi ngay hôm nay. Không quảng cáo độc hại, không áp lực streak vô nghĩa, đồng hành cùng bạn trên từng bước tiến bộ nhỏ nhất.
          </p>

          {/* Live Stat Ticker */}
          <div className="inline-flex items-center gap-3 rounded-2xl border-2 border-black bg-white/10 backdrop-blur-md px-5 py-3 text-sm text-white shadow-[3px_3px_0px_0px_#FFC857]">
            <span className="material-symbols-outlined text-2xl text-[#FFC857]">trending_up</span>
            <div>
              <p className="font-extrabold text-white text-base">
                <NumberTicker value={5420} suffix="+" /> bạn trẻ đã bắt đầu
              </p>
              <p className="text-xs text-white/75 font-semibold">
                Đánh giá ⭐ 4.9/5 trên App Store & Google Play
              </p>
            </div>
          </div>

          {/* Nút tải App */}
          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.96 }}
              href="#download"
              className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-black bg-white px-8 py-4 font-extrabold text-[#3A8157] shadow-[4px_4px_0px_0px_#FFC857] transition-all"
            >
              <span className="material-symbols-outlined text-[24px]">phone_iphone</span>
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase leading-none text-[#727272]">Tải trên</p>
                <p className="text-base font-black leading-tight text-black">App Store</p>
              </div>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.96 }}
              href="#download"
              className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-black bg-[#529CFF] px-8 py-4 font-extrabold text-white shadow-[4px_4px_0px_0px_#FFC857] transition-all"
            >
              <span className="material-symbols-outlined text-[24px]">android</span>
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase leading-none text-white/80">Tải trên</p>
                <p className="text-base font-black leading-tight text-white">Google Play</p>
              </div>
            </motion.a>
          </div>
        </div>

        {/* CỘT PHẢI: Thẻ QR Code Neo-Brutalist */}
        <div className="rounded-3xl border-2 border-black bg-white p-7 text-black shadow-[10px_10px_0px_0px_#FFC857] transition-all">
          <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#3A8157]">
              Mã QR cài đặt
            </span>
            <span className="flex items-center gap-1 rounded-full bg-[#E8F3EC] px-2.5 py-0.5 text-[10px] font-extrabold text-[#3A8157]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3A8157] animate-pulse" />
              Sẵn sàng quét
            </span>
          </div>

          <div className="aspect-square rounded-2xl border-2 border-black bg-[#F7FAFF] p-6 shadow-inner">
            <div className="grid h-full grid-cols-5 grid-rows-5 gap-2.5">
              {Array.from({ length: 25 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-sm transition-transform hover:scale-110"
                  style={{
                    backgroundColor:
                      index % 5 === 0
                        ? "#3A8157"
                        : index % 4 === 0
                          ? "#529CFF"
                          : index % 3 === 0
                            ? "#FFC857"
                            : "#000000",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="mt-5 text-center">
            <p className="text-sm font-black text-black">
              Quét mã để tải nhanh PENTAVA
            </p>
            <p className="mt-1 text-xs text-[#727272]">
              Tương thích hoàn toàn với iOS 16+ & Android 12+
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
