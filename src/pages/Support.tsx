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
              <span className="inline-block rounded-full bg-[#529CFF] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-[3px_3px_0px_0px_#8B63F6]">
                FAQ
              </span>

              <h1 className="mx-auto mt-8 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-[64px]">
                Trung tâm hỗ trợ người dùng PENTAVA
              </h1>
            </div>

            <div className="space-y-6">
              {faqs.map((item, index) => (
                <div
                  key={item.q}
                  className="rounded-[26px] border border-[#D9D9D9] bg-white p-8 shadow-[0_5px_0px_0px_rgba(0,0,0,0.06)]"
                >
                  <div className="mb-5 flex items-start gap-4">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white"
                      style={{
                        backgroundColor: index === 0 ? "#3A8157" : "#F25F5C",
                      }}
                    >
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