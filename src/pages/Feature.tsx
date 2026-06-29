import { Link } from "react-router-dom"
import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import Reveal from "../components/common/Reveal"

const heroCards = [
  ["Routine 1 chạm", "Lộ trình cá nhân hóa ngay từ ngày đầu tiên.", "#FFC857"],
  ["Sức khỏe ổn định", "Cân bằng thể chất và tinh thần trong cùng một hệ thống.", "#3A8157"],
  ["Cảm giác bình tĩnh", "Duy trì thay đổi mà không tạo thêm áp lực.", "#529CFF"],
]

const coreFeatures = [
  {
    title: "Onboarding Tự Động",
    desc: 'Khảo sát thông minh dựa trên khoa học hành vi, tự động thiết lập lộ trình routine cá nhân hóa ngay từ ngày đầu tiên. Nói "không" với việc bắt đầu từ một trang giấy trắng khô khan.',
    icon: "psychology",
    color: "#FFC857",
  },
  {
    title: "Visual Verification",
    desc: "Thay thế những ô checkbox nhàm chán bằng việc lưu giữ khoảnh khắc thực tế qua hình ảnh hoặc video. Mỗi thói quen hoàn thành là một mảnh ghép thị giác sống động.",
    icon: "photo_camera",
    color: "#529CFF",
  },
  {
    title: "Động lực kép",
    desc: "Không gian đồng hành nhóm văn minh. Thúc đẩy nhau cùng tiến bộ thông qua sự đồng cảm, loại bỏ hoàn toàn áp lực từ các bảng xếp hạng độc hại.",
    icon: "diversity_3",
    color: "#3A8157",
  },
]

const problems = [
  ["Quá nhiều app rời rạc", "Người trẻ phải dùng nhiều app khác nhau cho habit, mood, journal và sức khỏe.", "#FFC857"],
  ["Không biết bắt đầu từ đâu", "Nhiều app bắt người dùng tự tạo mục tiêu từ đầu, dễ gây nản và bỏ cuộc.", "#529CFF"],
  ["Duy trì không bền vững", "Streak và reminder thô thường tạo áp lực thay vì giúp người dùng thật sự thay đổi.", "#F25F5C"],
]

const pillars = [
  {
    title: "Done-for-you Routine & Micro-guidance",
    subtitle: 'Phá vỡ áp lực "Trang giấy trắng" bằng Lộ trình 1 chạm',
    desc: "PENTAVA bắt đầu bằng bài trắc nghiệm ngắn 2 phút dựa trên thang đo WHO-5, sau đó tự động tạo routine 5 nhiệm vụ tối ưu mỗi ngày, cân bằng cả thể chất lẫn tinh thần.",
    color: "#FFC857",
  },
  {
    title: "Visual Verification & PENTA-CINEMA",
    subtitle: "Điện ảnh hóa hành trình trưởng thành của bạn",
    desc: "PENTAVA thay checkbox bằng ảnh thực tế, Weekly Capsule và video cinematic recap, giúp mỗi tuần nỗ lực trở thành một thước phim đáng nhớ.",
    color: "#529CFF",
  },
  {
    title: "Động lực kép & Cộng đồng chữa lành",
    subtitle: "Kỷ luật tự giác nhưng không cô độc, kết nối nhưng không áp lực",
    desc: "PENTAVA tạo nhóm nhỏ cùng mục tiêu, không leaderboard hơn thua, chỉ có high-five, sự đồng cảm và chế độ Nhịp thở an lành khi bạn cần nghỉ.",
    color: "#3A8157",
  },
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

                <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-[64px]">
                  Hệ sinh thái phát triển bản thân toàn diện PENTAVA
                </h1>

                <p className="max-w-[600px] text-base leading-8 text-[#727272]">
                  PENTAVA là ứng dụng giúp người trẻ phát triển bản thân thông qua việc chăm sóc sức khỏe toàn diện và lưu lại hành trình thay đổi bản thân theo cách trực quan, tích cực và đầy động lực.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="#core"
                    className="rounded-full bg-[#3A8157] px-8 py-4 font-bold text-white shadow-[4px_4px_0px_0px_#FFC857] transition-all hover:-translate-y-1"
                  >
                    Khám phá PENTAVA
                  </a>

                  <a
                    href="#pentava-solution"
                    className="rounded-full border-2 border-[#529CFF] bg-white px-8 py-4 font-bold text-[#529CFF] shadow-[4px_4px_0px_0px_rgba(82,156,255,0.25)] transition-all hover:-translate-y-1"
                  >
                    Có thể bạn chưa biết
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-1">
                {heroCards.map(([title, desc, color]) => (
                  <div
                    key={title}
                    className="rounded-[22px] border border-[#D9D9D9] bg-white p-6 shadow-[0_5px_0px_0px_rgba(0,0,0,0.06)]"
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

        <Reveal>
          <section id="core" className="border-y border-[#D9D9D9] bg-white py-24">
            <div className="mx-auto max-w-[1200px] px-6 md:px-8">
              <div className="mb-14 max-w-2xl">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3A8157]">
                  Nội dung cốt lõi
                </span>
                <h2 className="mt-4 text-4xl font-extrabold leading-tight">
                  Ba trải nghiệm chính giúp người dùng bắt đầu dễ hơn và duy trì bền vững hơn.
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {coreFeatures.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[24px] border border-[#D9D9D9] bg-[#F7FAFF] p-8 shadow-[0_5px_0px_0px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-1"
                  >
                    <div
                      className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                      style={{ backgroundColor: item.color }}
                    >
                      <span className="material-symbols-outlined text-3xl">
                        {item.icon}
                      </span>
                    </div>
                    <h3 className="mb-4 text-xl font-extrabold">{item.title}</h3>
                    <p className="text-sm leading-7 text-[#727272]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="pentava-solution" className="py-24">
            <div className="mx-auto max-w-[1200px] px-6 md:px-8">
              <div className="mb-16 text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#529CFF]">
                  Vấn đề chính và Giải pháp PENTAVA
                </span>
                <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold leading-tight">
                  PENTAVA được tạo ra để giảm ma sát khi bắt đầu và biến thay đổi bản thân thành hành trình có cảm hứng.
                </h2>
              </div>

              <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
                {problems.map(([title, desc, color]) => (
                  <div
                    key={title}
                    className="rounded-[22px] border border-[#D9D9D9] bg-white p-8 shadow-[0_5px_0px_0px_rgba(0,0,0,0.06)]"
                  >
                    <div
                      className="mb-5 h-3 w-16 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <h3 className="mb-3 text-xl font-extrabold">{title}</h3>
                    <p className="text-sm leading-7 text-[#727272]">{desc}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-8">
                {pillars.map((item, index) => (
                  <div
                    key={item.title}
                    className="grid grid-cols-1 overflow-hidden rounded-[26px] border border-[#D9D9D9] bg-white shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] lg:grid-cols-[260px_1fr]"
                  >
                    <div
                      className="flex items-center justify-center p-10 text-6xl font-extrabold"
                      style={{ backgroundColor: item.color }}
                    >
                      0{index + 1}
                    </div>

                    <div className="p-8 md:p-10">
                      <h3 className="mb-2 text-2xl font-extrabold">{item.title}</h3>
                      <p className="mb-5 font-bold text-[#3A8157]">{item.subtitle}</p>
                      <p className="max-w-3xl text-sm leading-7 text-[#727272]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 text-center">
                <Link
                  to="/cinema"
                  className="inline-flex rounded-full bg-[#8B63F6] px-8 py-4 font-bold text-white shadow-[4px_4px_0px_0px_#529CFF] transition-all hover:-translate-y-1"
                >
                  Xem PENTA-CINEMA
                </Link>
              </div>
            </div>
          </section>
        </Reveal>
      </main>

      <Footer />
    </>
  )
}