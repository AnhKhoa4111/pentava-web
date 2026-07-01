import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import Reveal from "../components/common/Reveal"

const values = [
  ["Đồng cảm", "Empathy", "Thiết kế trải nghiệm không phán xét, không tạo thêm áp lực."],
  ["Trực quan", "Visual-first", "Dùng hình ảnh, capsule và điện ảnh để ghi lại hành trình thay đổi."],
  ["Bền vững", "Sustainability", "Ưu tiên sức khỏe dài hạn thay vì thành tích ngắn hạn."],
  ["Kết nối lành mạnh", "Healthy Connection", "Tạo cộng đồng đồng hành văn minh, không leaderboard độc hại."],
]

const colors = ["#FFC857", "#529CFF", "#3A8157", "#8B63F6"]

export default function About() {
  return (
    <>
      <Header />

      <main className="bg-[#F7FAFF] pt-32 text-black lg:pt-28">
        <Reveal>
          <section className="mx-auto max-w-[1200px] px-6 py-20 text-center md:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D9D9D9] bg-white px-4 py-2 shadow-[3px_3px_0px_0px_rgba(255,200,87,0.75)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFC857]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#3A8157]">
                Về PENTAVA
              </span>
            </div>

            <h1 className="mx-auto mt-8 max-w-5xl font-extrabold tracking-tight text-black">
              <span className="mb-4 block text-[34px] leading-none text-[#727272] md:text-[44px]">
                Câu chuyện
              </span>

              <span className="relative inline-block rotate-[-1deg] rounded-[26px] bg-[#FFC857] px-5 py-3 text-[54px] leading-none tracking-[-0.06em] text-black shadow-[6px_6px_0px_0px_#3A8157] md:px-7 md:py-4 md:text-[84px]">
                PENTAVA
              </span>

              <span className="mt-7 block text-[34px] leading-[1.12] text-[#3A8157] md:text-[52px]">
                Tái định nghĩa cách
              </span>

              <span className="mx-auto mt-2 block max-w-[800px] text-[40px] leading-[1.12] md:text-[56px]">
                người trẻ chăm sóc bản thân
              </span>
            </h1>
          </section>
        </Reveal>

        <Reveal>
          <section className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-6 pb-20 md:grid-cols-2 md:px-8">
            <div className="rounded-[26px] border border-[#D9D9D9] bg-white p-10 shadow-[0_5px_0px_0px_rgba(82,156,255,0.35)]">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#529CFF] text-white">
                <span className="material-symbols-outlined text-3xl">
                  flag
                </span>
              </div>

              <h2 className="mb-4 text-2xl font-extrabold">Sứ mệnh</h2>
              <p className="text-sm leading-7 text-[#727272]">
                Giúp thế hệ trẻ xây dựng lối sống lành mạnh và nuôi dưỡng sức khỏe tinh thần một cách trực quan, bền vững và đầy cảm hứng.
              </p>
            </div>

            <div className="rounded-[26px] border border-[#D9D9D9] bg-white p-10 shadow-[0_5px_0px_0px_rgba(58,129,87,0.35)]">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3A8157] text-white">
                <span className="material-symbols-outlined text-3xl">
                  visibility
                </span>
              </div>

              <h2 className="mb-4 text-2xl font-extrabold">Tầm nhìn</h2>
              <p className="text-sm leading-7 text-[#727272]">
                Trở thành ứng dụng All-in-one hàng đầu đồng hành cùng người trẻ trong việc cân bằng giữa áp lực cuộc sống và sự bình yên trong tâm trí thông qua ngôn ngữ của thị giác và điện ảnh.
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="border-y border-[#D9D9D9] bg-white py-24">
            <div className="mx-auto max-w-[1200px] px-6 md:px-8">
              <div className="mb-14 max-w-2xl">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B63F6]">
                  Câu chuyện thiết kế
                </span>
                <h2 className="mt-4 text-4xl font-extrabold leading-tight">
                  Từ Quarter-life Crisis đến Routine vững chắc
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="rounded-[26px] bg-[#F7FAFF] p-10 shadow-[0_5px_0px_0px_rgba(255,200,87,0.6)]">
                  <h3 className="mb-4 text-2xl font-extrabold text-[#3A8157]">
                    Big Three Health Behaviors
                  </h3>

                  <p className="mb-6 text-sm leading-7 text-[#727272]">
                    PENTAVA lấy cảm hứng từ nghiên cứu về vai trò của giấc ngủ, vận động thể
                    chất và dinh dưỡng đối với well-being ở người trẻ. Đây là ba hành vi nền
                    tảng giúp hành trình chăm sóc bản thân trở nên toàn diện, thực tế và bền
                    vững hơn.
                  </p>

                  <a
                    href="https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0329689"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full bg-[#FFC857] px-6 py-3 text-sm font-bold text-black shadow-[3px_3px_0px_0px_#3A8157] transition-all hover:-translate-y-1"
                  >
                    Xem nghiên cứu nền tảng
                  </a>
                </div>

                <div className="rounded-[26px] bg-[#3A8157] p-10 text-white shadow-[0_5px_0px_0px_rgba(82,156,255,0.6)]">
                  <h3 className="mb-4 text-2xl font-extrabold">
                    Tâm lý học hành vi
                  </h3>
                  <p className="mb-6 text-sm leading-7 text-white/80">
                    PENTAVA sử dụng cách tiếp cận micro-guidance: chia hành động thành những bước nhỏ, dễ bắt đầu, dễ duy trì và giảm cảm giác quá tải khi người dùng muốn thay đổi bản thân.
                  </p>

                  <p className="rounded-[20px] bg-white/10 p-5 text-sm font-semibold italic">
                    “Biến hành trình thay đổi bản thân thành kỷ niệm đầy nghệ thuật”
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mx-auto max-w-[1200px] px-6 py-24 md:px-8">
            <div className="mb-14 text-center">
              <span className="inline-block rounded-full bg-[#529CFF] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
                Giá trị cốt lõi
              </span>

              <h2 className="mt-6 text-4xl font-extrabold">
                Đồng cảm – Trực quan – Bền vững – Kết nối lành mạnh
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              {values.map(([title, en, desc], index) => (
                <div
                  key={title}
                  className="rounded-[24px] border border-[#D9D9D9] bg-white p-7 transition-all hover:-translate-y-1"
                  style={{
                    boxShadow: `0 5px 0px 0px ${colors[index]}`,
                  }}
                >
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#727272]">
                    {en}
                  </p>
                  <h3 className="mb-4 text-xl font-extrabold">{title}</h3>
                  <p className="text-sm leading-7 text-[#727272]">{desc}</p>
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