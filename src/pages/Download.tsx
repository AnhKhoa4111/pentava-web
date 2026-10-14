import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import Reveal from "../components/common/Reveal"
import { motion } from "motion/react"

export default function Download() {
  return (
    <>
      <Header />

      <main className="bg-[#F7FAFF] pt-32 text-black lg:pt-28">
        <Reveal>
          <section className="mx-auto grid min-h-[680px] max-w-[1200px] grid-cols-1 items-center gap-14 px-6 py-20 md:px-8 lg:grid-cols-2">
            <div className="space-y-8">
              <span className="inline-block rounded-full bg-[#FFC857] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-black shadow-[3px_3px_0px_0px_#3A8157]">
                DOWNLOAD PENTAVA
              </span>

              <h1 className="max-w-4xl font-extrabold tracking-tight text-black">
                <span className="mb-4 block text-[34px] leading-none text-[#3A8157] md:text-[48px]">
                  Bắt đầu hành trình
                </span>

                <span className="block text-[38px] leading-[1.1] md:text-[56px]">
                  thiết lập
                </span>

                <span className="mt-5 inline-flex rotate-[-1deg] items-center gap-3 rounded-[26px] border-2 border-[#3A8157] bg-white px-5 py-4 text-[42px] leading-none text-black shadow-[6px_6px_0px_0px_#FFC857] md:px-7 md:py-5 md:text-[68px]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3A8157] text-white md:h-14 md:w-14">
                    <span className="material-symbols-outlined text-[28px] md:text-[34px]">
                      touch_app
                    </span>
                  </span>

                  <span className="tracking-[-0.06em]">
                    Routine 1 Chạm
                  </span>
                </span>
              </h1>

              <p className="max-w-[560px] text-base leading-8 text-[#727272]">
                Có sẵn trên App Store cho iOS và Google Play cho Android.
              </p>

              <p className="max-w-[560px] rounded-[24px] border border-[#D9D9D9] bg-white p-6 text-base leading-8 text-[#727272] shadow-[0_5px_0px_0px_rgba(58,129,87,0.2)]">
                Quét mã QR để tải ngay PENTAVA và nhận bản Onboarding thiết kế riêng cho bạn ngày hôm nay. Miễn phí trải nghiệm các tính năng cốt lõi.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <motion.a
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  href="#download"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Ứng dụng PENTAVA trên App Store hiện đang được phát triển thêm. Vui lòng quay lại sau nhé!");
                  }}
                  className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-black bg-white px-8 py-4 font-extrabold text-[#3A8157] shadow-[4px_4px_0px_0px_#FFC857] transition-all"
                >
                  <span className="material-symbols-outlined text-[24px]">
                    phone_iphone
                  </span>
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase leading-none text-[#727272]">
                      Tải trên
                    </p>
                    <p className="text-base font-black leading-tight text-black">
                      App Store
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  href="https://play.google.com/store/apps/details?id=com.pentava&hl=vi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-black bg-[#529CFF] px-8 py-4 font-extrabold text-white shadow-[4px_4px_0px_0px_#FFC857] transition-all"
                >
                  <span className="material-symbols-outlined text-[24px]">
                    android
                  </span>
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase leading-none text-white/80">
                      Tải trên
                    </p>
                    <p className="text-base font-black leading-tight text-white">
                      Google Play
                    </p>
                  </div>
                </motion.a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[420px] rounded-[32px] border border-[#D9D9D9] bg-white p-8 shadow-[12px_12px_0px_0px_#FFC857]">
              <div className="aspect-square rounded-2xl border-2 border-black bg-[#F7FAFF] p-6 shadow-inner">
                <img
                  src="\image\pentava_google_play_qr.png"
                  alt="Quét mã QR để tải ứng dụng PENTAVA trên Google Play"
                  className="h-full w-full rounded-xl object-contain"
                />
              </div>

              <p className="mt-6 text-center text-sm font-bold text-[#727272]">
                QR tải ứng dụng PENTAVA
              </p>
            </div>
          </section>
        </Reveal>
      </main>

      <Footer />
    </>
  )
}