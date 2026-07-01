import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import Reveal from "../components/common/Reveal"

const categories = [
  {
    title: "Tâm lý thế hệ",
    desc: "Giải mã các hội chứng tâm lý người trẻ thường gặp như Burnout, Peer Pressure, FOMO dưới góc nhìn khoa học nhẹ nhàng.",
    color: "#FFC857",
    icon: "psychology",
  },
  {
    title: "Nghệ thuật sống",
    desc: "Bí quyết thiết lập routine buổi sáng, tối tối ưu, phương pháp thiền định trực quan.",
    color: "#3A8157",
    icon: "spa",
  },
  {
    title: "Product Update",
    desc: "Nhật ký cập nhật tính năng mới từ đội ngũ phát triển PENTAVA.",
    color: "#529CFF",
    icon: "new_releases",
  },
]

export default function Blog() {
  return (
    <>
      <Header />

      <main className="bg-[#F7FAFF] pt-32 text-black lg:pt-28">
        <Reveal>
          <section className="mx-auto max-w-[1200px] px-6 pb-20 pt-20 text-center md:px-8">
            <h1 className="mx-auto max-w-5xl font-extrabold tracking-tight text-black">
              <span className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[48px] leading-none tracking-[-0.06em] md:text-[82px]">
                <span>PENTAVA</span>

                <span className="rotate-[-1deg] rounded-[24px] bg-[#8B63F6] px-5 py-3 text-[34px] leading-none text-white shadow-[5px_5px_0px_0px_#529CFF] md:px-7 md:py-4 md:text-[54px]">
                  Magazine
                </span>
              </span>

              <span className="mt-8 flex flex-col items-center text-center">
                <span className="block text-[38px] leading-[1.05] text-[#3A8157] md:text-[58px]">
                  Cảm hứng sống
                </span>

                <span className="relative mt-3 inline-block w-fit text-[34px] leading-[1.08] text-black md:text-[52px]">
                  <span className="relative z-10">& Tâm lý học ứng dụng</span>
                  <span className="absolute bottom-1 left-1 right-1 z-0 h-3 rounded-full bg-[#FFC857] md:bottom-2 md:h-5" />
                </span>
              </span>
            </h1>
          </section>
        </Reveal>

        <Reveal>
          <section className="mx-auto max-w-[1200px] px-6 pb-24 md:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {categories.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[26px] border border-[#D9D9D9] bg-white p-8 shadow-[0_5px_0px_0px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-1"
                >
                  <div
                    className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    <span className="material-symbols-outlined text-3xl">
                      {item.icon}
                    </span>
                  </div>

                  <h2 className="mb-4 text-xl font-extrabold">{item.title}</h2>
                  <p className="text-sm leading-7 text-[#727272]">{item.desc}</p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>
      </main>

      <Footer />
    </>
  )
}