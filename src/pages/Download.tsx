import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import Reveal from "../components/common/Reveal"

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

              <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-[64px]">
                Bắt đầu hành trình thiết lập Routine 1 Chạm
              </h1>

              <p className="max-w-[560px] text-base leading-8 text-[#727272]">
                Có sẵn trên App Store cho iOS và Google Play cho Android.
              </p>

              <p className="max-w-[560px] rounded-[24px] border border-[#D9D9D9] bg-white p-6 text-base leading-8 text-[#727272] shadow-[0_5px_0px_0px_rgba(58,129,87,0.2)]">
                Quét mã QR để tải ngay PENTAVA và nhận bản Onboarding thiết kế riêng cho bạn ngày hôm nay. Miễn phí trải nghiệm các tính năng cốt lõi.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <button className="rounded-full bg-[#3A8157] px-8 py-4 font-bold text-white shadow-[4px_4px_0px_0px_#FFC857] transition-all hover:-translate-y-1">
                  App Store
                </button>

                <button className="rounded-full bg-[#529CFF] px-8 py-4 font-bold text-white shadow-[4px_4px_0px_0px_#8B63F6] transition-all hover:-translate-y-1">
                  Google Play
                </button>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[420px] rounded-[32px] border border-[#D9D9D9] bg-white p-8 shadow-[12px_12px_0px_0px_#FFC857]">
              <div className="aspect-square rounded-[28px] border-4 border-[#3A8157] bg-[#F7FAFF] p-8">
                <div className="grid h-full grid-cols-5 grid-rows-5 gap-3">
                  {Array.from({ length: 25 }).map((_, index) => (
                    <div
                      key={index}
                      className="rounded-md"
                      style={{
                        backgroundColor:
                          index % 5 === 0
                            ? "#3A8157"
                            : index % 4 === 0
                              ? "#529CFF"
                              : index % 3 === 0
                                ? "#FFC857"
                                : "#FFFFFF",
                      }}
                    />
                  ))}
                </div>
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