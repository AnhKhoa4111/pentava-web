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
          <section className="mx-auto max-w-[1200px] px-6 py-20 text-center md:px-8">
            <span className="inline-block rounded-full bg-[#8B63F6] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-[3px_3px_0px_0px_#529CFF]">
              PENTAVA MAGAZINE
            </span>

            <h1 className="mx-auto mt-8 max-w-5xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-[64px]">
              PENTAVA Magazine – Cảm hứng sống và Tâm lý học ứng dụng
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