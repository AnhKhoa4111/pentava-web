import { Link } from "react-router-dom"
import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import Reveal from "../components/common/Reveal"

const heroCards = [
  ["Routine 1 chạm", "Lộ trình cá nhân hóa ngay từ ngày đầu tiên.", "#FFC857"],
  ["Sức khỏe ổn định", "Cân bằng thể chất và tinh thần trong cùng một hệ thống.", "#3A8157"],
  ["Cảm giác bình tĩnh", "Duy trì thay đổi mà không tạo thêm áp lực.", "#529CFF"],
]

export default function Feature() {
  return (
    <>
      <Header />

      <main className="bg-[#F7FAFF] pt-32 text-black lg:pt-28">
        <Reveal>
          <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-8">
            <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
              <div className="space-y-8">
                <span className="inline-block rounded-full border-2 border-[#FFC857] bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#3A8157] shadow-[3px_3px_0px_0px_#FFC857]">
                  PENTAVA ECOSYSTEM
                </span>

                <h1 className="max-w-4xl font-extrabold tracking-tight text-black">
                  <span className="mb-4 block text-[42px] leading-none text-[#3A8157] md:text-[56px]">
                    Hệ sinh thái
                  </span>

                  <span className="block max-w-[680px] text-[40px] leading-[1.12] md:text-[56px]">
                    phát triển bản thân toàn diện
                  </span>

                  <span className="relative mt-5 inline-block text-[64px] leading-none tracking-[-0.06em] text-black md:text-[96px]">
                    <span className="relative z-10">PENTAVA</span>
                    <span className="absolute bottom-1 left-1 right-1 z-0 h-4 rounded-full bg-[#FFC857] md:bottom-2 md:h-7" />
                  </span>
                </h1>

                <p className="max-w-[600px] text-base leading-8 text-[#727272]">
                  PENTAVA là ứng dụng giúp người trẻ phát triển bản thân thông qua việc chăm sóc sức khỏe toàn diện và lưu lại hành trình thay đổi bản thân theo cách trực quan, tích cực và đầy động lực.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/feature/core"
                    className="rounded-full bg-[#3A8157] px-8 py-4 font-bold text-white shadow-[4px_4px_0px_0px_#FFC857] transition-all hover:-translate-y-1"
                  >
                    Khám phá PENTAVA
                  </Link>

                  <Link
                    to="/feature/solution"
                    className="rounded-full border-2 border-[#529CFF] bg-white px-8 py-4 font-bold text-[#529CFF] shadow-[4px_4px_0px_0px_rgba(82,156,255,0.25)] transition-all hover:-translate-y-1"
                  >
                    Có thể bạn chưa biết
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-1">
                {heroCards.map(([title, desc, color]) => (
                  <div
                    key={title}
                    className="rounded-[22px] border border-[#D9D9D9] bg-white p-6 shadow-[0_5px_0px_0px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-1"
                  >
                    <div
                      className="mb-4 h-3 w-14 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <h3 className="mb-2 text-lg font-extrabold">{title}</h3>
                    <p className="text-sm leading-relaxed text-[#727272]">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      </main>

      <Footer />
    </>
  )
}