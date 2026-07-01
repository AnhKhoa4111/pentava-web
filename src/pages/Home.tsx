import { Link } from "react-router-dom"
import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import Reveal from "../components/common/Reveal"

const heroCards = [
  ["Routine 1 chạm", "Bắt đầu nhanh với lộ trình đã được cá nhân hóa.", "#FFC857"],
  ["Sức khỏe ổn định", "Cân bằng thể chất và tinh thần theo cách nhẹ nhàng.", "#3A8157"],
  ["Cảm giác bình tĩnh", "Ghi lại mood, hình ảnh và hành trình thay đổi.", "#529CFF"],
]

export default function Home() {
  return (
    <>
      <Header />

      <main className="bg-[#F7FAFF] pt-32 text-black lg:pt-28">
        <Reveal>
          <section className="mx-auto grid min-h-[720px] max-w-[1200px] grid-cols-1 items-center gap-16 px-6 py-20 md:px-8 lg:grid-cols-2">
            <div className="space-y-8">
              <span className="inline-block rounded-full border-2 border-[#FFC857] bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#3A8157] shadow-[3px_3px_0px_0px_#FFC857]">
                PENTAVA ECOSYSTEM
              </span>

              <h1 className="max-w-4xl font-extrabold leading-[0.95] tracking-tight text-black">
                <span className="mb-3 block text-[42px] leading-none text-[#3A8157] md:text-[56px]">
                  Hệ sinh thái
                </span>

                <span className="block max-w-[720px] text-[46px] leading-[1.08] md:text-[64px]">
                  phát triển bản thân toàn diện
                </span>

                <span className="relative mt-4 inline-block text-[64px] leading-none tracking-[-0.06em] text-black md:text-[96px]">
                  <span className="relative z-10">PENTAVA</span>
                  <span className="absolute bottom-2 left-1 right-1 z-0 h-5 rounded-full bg-[#FFC857] md:h-7" />
                </span>
              </h1>

              <p className="max-w-[560px] text-base leading-8 text-[#727272]">
                PENTAVA là ứng dụng giúp người trẻ phát triển bản thân thông qua việc chăm sóc sức khỏe toàn diện và lưu lại hành trình thay đổi bản thân theo cách trực quan, tích cực và đầy động lực.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/feature"
                  className="rounded-full bg-[#3A8157] px-8 py-4 font-bold text-white shadow-[4px_4px_0px_0px_#FFC857] transition-all hover:-translate-y-1"
                >
                  Khám phá PENTAVA
                </Link>

                <Link
                  to="/feature#pentava-solution"
                  className="rounded-full border-2 border-[#529CFF] bg-white px-8 py-4 font-bold text-[#529CFF] shadow-[4px_4px_0px_0px_rgba(82,156,255,0.25)] transition-all hover:-translate-y-1"
                >
                  Có thể bạn chưa biết
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-5 pt-8 sm:grid-cols-3">
                {heroCards.map(([title, desc, color]) => (
                  <div
                    key={title}
                    className="rounded-[20px] border border-[#D9D9D9] bg-white p-5 shadow-[0_5px_0px_0px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-1"
                  >
                    <div
                      className="mb-4 h-3 w-12 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <h3 className="mb-2 text-sm font-extrabold">{title}</h3>
                    <p className="text-xs leading-relaxed text-[#727272]">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto hidden w-full max-w-[420px] lg:block">
              <div className="rounded-[42px] border-[4px] border-[#3A8157] bg-[#FFC857] p-3 shadow-[16px_16px_0px_0px_#529CFF]">
                <div className="aspect-[9/18] overflow-hidden rounded-[32px] border-2 border-white bg-white p-8">
                  <div className="flex h-full flex-col justify-between rounded-[28px] bg-[#F7FAFF] p-6">
                    <div>
                      <div className="mb-6 h-3 w-24 rounded-full bg-[#3A8157]" />
                      <div className="space-y-3">
                        <div className="h-14 rounded-2xl bg-white shadow-sm" />
                        <div className="h-14 rounded-2xl bg-white shadow-sm" />
                        <div className="h-14 rounded-2xl bg-white shadow-sm" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="aspect-square rounded-2xl bg-[#FFC857]" />
                      <div className="aspect-square rounded-2xl bg-[#529CFF]" />
                      <div className="aspect-square rounded-2xl bg-[#8B63F6]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 -top-8 rotate-12 rounded-full bg-white p-5 shadow-xl">
                <span className="material-symbols-outlined text-5xl text-[#8B63F6]">
                  auto_awesome
                </span>
              </div>
            </div>
          </section>
        </Reveal>
      </main>

      <Footer />
    </>
  )
}