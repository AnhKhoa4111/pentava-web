import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import Reveal from "../components/common/Reveal"

export default function Cinema() {
  return (
    <>
      <Header />

      <main className="bg-[#F7FAFF] pt-32 text-black lg:pt-28">
        <Reveal>
          <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-8">
            <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
              <div className="space-y-8">
                <span className="inline-block rounded-full bg-[#8B63F6] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-[3px_3px_0px_0px_#529CFF]">
                  PENTA-CINEMA
                </span>

                <h1 className="max-w-4xl font-extrabold tracking-tight text-black">
                  <span className="relative mb-6 inline-flex rotate-[-1.5deg] items-center overflow-hidden rounded-[24px] border-2 border-[#3A8157] bg-black px-6 py-4 text-[34px] leading-none text-white shadow-[6px_6px_0px_0px_#FFC857] md:px-8 md:py-5 md:text-[52px]">
                    <span className="absolute left-0 top-2 flex w-full justify-between px-3">
                      {Array.from({ length: 9 }).map((_, index) => (
                        <span
                          key={index}
                          className="h-2 w-2 rounded-sm bg-white/35 md:h-3 md:w-3"
                        />
                      ))}
                    </span>

                    <span className="absolute bottom-2 left-0 flex w-full justify-between px-3">
                      {Array.from({ length: 9 }).map((_, index) => (
                        <span
                          key={index}
                          className="h-2 w-2 rounded-sm bg-white/35 md:h-3 md:w-3"
                        />
                      ))}
                    </span>

                    <span className="relative z-10 tracking-[-0.05em]">
                      PENTA-CINEMA
                    </span>
                  </span>

                  <span className="block text-[38px] leading-[1.12] md:text-[56px]">
                    Bộ phim điện ảnh
                  </span>

                  <span className="mt-2 block max-w-[900px] text-[#3A8157]">
                    <span className="block text-[32px] leading-[1.12] sm:whitespace-nowrap md:text-[46px]">
                      về hành trình trở thành
                    </span>

                    <span className="block text-[34px] leading-[1.12] md:text-[48px]">
                      phiên bản tốt hơn
                    </span>

                    <span className="block text-[30px] leading-[1.12] md:text-[42px]">
                      của bạn
                    </span>
                  </span>
                </h1>

                <p className="max-w-[600px] text-base leading-8 text-[#727272]">
                  Tính năng độc quyền biến những hình ảnh Visual Verification hằng ngày và những thước phim Weekly Capsule thành một cuốn phim tua nhanh đầy nghệ thuật.
                </p>
              </div>

              <div className="relative rounded-[32px] border border-[#D9D9D9] bg-white p-4 shadow-[12px_12px_0px_0px_#FFC857]">
                <div className="aspect-[9/14] overflow-hidden rounded-[26px] bg-[#3A8157]">
                  <img
                    src="/image/pentava-web-cinema.png"
                    alt="PENTA-CINEMA preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="border-y border-[#D9D9D9] bg-white py-24">
            <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-6 md:grid-cols-2 md:px-8">
              <div className="rounded-[26px] border border-[#D9D9D9] bg-[#F7FAFF] p-10 shadow-[0_5px_0px_0px_rgba(82,156,255,0.35)]">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#529CFF] text-white">
                  <span className="material-symbols-outlined text-3xl">
                    photo_camera
                  </span>
                </div>
                <h2 className="mb-4 text-2xl font-extrabold">Khái niệm</h2>
                <p className="text-sm leading-7 text-[#727272]">
                  PENTA-CINEMA biến những hình ảnh Visual Verification hằng ngày và những thước phim Weekly Capsule thành một cuốn phim tua nhanh Cinematic Recap đầy nghệ thuật.
                </p>
              </div>

              <div className="rounded-[26px] border border-[#D9D9D9] bg-[#F7FAFF] p-10 shadow-[0_5px_0px_0px_rgba(139,99,246,0.35)]">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8B63F6] text-white">
                  <span className="material-symbols-outlined text-3xl">
                    auto_awesome
                  </span>
                </div>
                <h2 className="mb-4 text-2xl font-extrabold">Giá trị</h2>
                <p className="text-sm leading-7 text-[#727272]">
                  Nhìn lại nỗ lực của bản thân dưới góc nhìn điện ảnh. Bạn chính là nhân vật chính trong bộ phim phát triển của cuộc đời mình. Mỗi tuần, mỗi tháng trôi qua đều là một thước phim vô giá ghi lại sự thay đổi tích cực của tâm trí và cơ thể.
                </p>
              </div>
            </div>
          </section>
        </Reveal>
      </main>

      <Footer />
    </>
  )
}