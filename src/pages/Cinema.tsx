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

                <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-[64px]">
                  PENTA-CINEMA – Bộ phim điện ảnh về hành trình trưởng thành của bạn
                </h1>

                <p className="max-w-[600px] text-base leading-8 text-[#727272]">
                  Tính năng độc quyền biến những hình ảnh Visual Verification hằng ngày và những thước phim Weekly Capsule thành một cuốn phim tua nhanh đầy nghệ thuật.
                </p>
              </div>

              <div className="relative rounded-[32px] border border-[#D9D9D9] bg-white p-6 shadow-[12px_12px_0px_0px_#FFC857]">
                <div className="aspect-[9/14] rounded-[26px] bg-[#3A8157] p-6 text-white">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#FFC857]">
                      Weekly Capsule
                    </span>
                    <span className="material-symbols-outlined text-[#FFC857]">
                      movie
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-square rounded-3xl bg-[#FFC857]" />
                    <div className="aspect-square rounded-3xl bg-[#529CFF]" />
                    <div className="aspect-square rounded-3xl bg-[#8B63F6]" />
                    <div className="aspect-square rounded-3xl bg-[#F25F5C]" />
                  </div>

                  <div className="mt-8 rounded-3xl bg-white/15 p-5">
                    <div className="mb-3 h-2 w-24 rounded-full bg-white" />
                    <div className="h-2 w-40 rounded-full bg-white/50" />
                  </div>
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