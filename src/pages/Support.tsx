import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import Reveal from "../components/common/Reveal"

const faqs = [
  {
    q: "Hình ảnh tôi chụp để check-in thói quen có bị công khai không?",
    a: 'Không. Mọi hình ảnh/video của bạn mặc định là riêng tư. Chúng chỉ được chia sẻ trong nhóm bạn bè thân thiết nếu bạn chủ động bật tính năng "Đồng hành".',
  },
  {
    q: "Nếu tôi lỡ đứt chuỗi (streak) làm thói quen thì sao?",
    a: 'PENTAVA không trừng phạt bạn bằng áp lực streak độc hại. Chúng tôi có tính năng "Nhịp thở an lành" giúp bạn điều chỉnh lại lộ trình mà không làm giảm động lực.',
  },
]

export default function Support() {
  return (
    <>
      <Header />

      <main className="bg-[#F7FAFF] pt-32 text-black lg:pt-28">
        <Reveal>
          <section className="mx-auto max-w-[960px] px-6 py-20 md:px-8">
            <div className="mb-14 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D9D9D9] bg-white px-4 py-2 shadow-[3px_3px_0px_0px_rgba(82,156,255,0.25)]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#529CFF] text-white">
                  <span className="material-symbols-outlined text-[18px]">
                    support_agent
                  </span>
                </span>

                <span className="text-[10px] font-bold uppercase tracking-widest text-[#529CFF]">
                  FAQ
                </span>
              </div>

              <h1 className="mx-auto mt-8 max-w-4xl font-extrabold tracking-tight text-black">
                <span className="mb-4 block text-[34px] leading-none text-[#3A8157] md:text-[46px]">
                  Trung tâm hỗ trợ
                </span>

                <span className="flex flex-wrap items-baseline justify-center gap-3 text-[40px] leading-[1.12] md:text-[58px]">
                  <span>người dùng</span>

                  <span className="relative inline-block text-[44px] leading-none tracking-[-0.05em] text-black md:text-[68px]">
                    <span className="relative z-10">PENTAVA</span>
                    <span className="absolute bottom-1 left-1 right-1 z-0 h-3 rounded-full bg-[#529CFF]/30 md:bottom-2 md:h-5" />
                  </span>
                </span>


              </h1>
            </div>

            <div className="space-y-6">
              {faqs.map((item) => (
                <div
                  key={item.q}
                  className="rounded-[26px] border border-[#D9D9D9] bg-white p-8 shadow-[0_5px_0px_0px_rgba(0,0,0,0.06)]"
                >
                  <div className="mb-5 flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3A8157] text-sm font-extrabold text-white">
                      Q
                    </span>

                    <h2 className="text-xl font-extrabold">{item.q}</h2>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFC857] text-sm font-extrabold text-black">
                      A
                    </span>

                    <p className="text-sm leading-7 text-[#727272]">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      </main>

      <Footer />
    </>
  )
}