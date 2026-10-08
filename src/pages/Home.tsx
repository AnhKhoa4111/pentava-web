import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import Reveal from "../components/common/Reveal"

const stats = [
  ["05", "nhiệm vụ gợi ý mỗi ngày"],
  ["02 phút", "để tạo routine đầu tiên"],
  ["01 app", "cho habit, mood, journal và community"],
]

const problems = [
  {
    title: "Nhiều app rời rạc",
    desc: "Habit, mood, journal và sức khỏe nằm ở nhiều nơi khiến người dùng dễ bỏ cuộc.",
    icon: "grid_view",
    color: "#FFC857",
  },
  {
    title: "Không biết bắt đầu",
    desc: "Trang giấy trắng tạo áp lực, nhất là khi người dùng đang mệt hoặc mất nhịp.",
    icon: "visibility_off",
    color: "#529CFF",
  },
  {
    title: "Duy trì chưa bền",
    desc: "Streak và reminder thô thường biến phát triển bản thân thành cuộc chạy đua.",
    icon: "cached",
    color: "#F25F5C",
  },
]

const features = [
  {
    title: "Onboarding tự động",
    desc: "Bài khảo sát ngắn giúp PENTAVA hiểu nhịp sống, mục tiêu và trạng thái hiện tại để tạo lộ trình bắt đầu ngay.",
    icon: "psychology",
    color: "#FFC857",
  },
  {
    title: "Routine 1 chạm",
    desc: "Mỗi ngày có 5 micro-task cân bằng giữa vận động, dinh dưỡng, giấc ngủ, mood và reflection.",
    icon: "touch_app",
    color: "#3A8157",
  },
  {
    title: "Visual Verification",
    desc: "Thay checkbox bằng ảnh hoặc video thật để hành trình tiến bộ có dấu vết trực quan và đáng nhớ.",
    icon: "photo_camera",
    color: "#529CFF",
  },
  {
    title: "Nhịp thở an lành",
    desc: "Khi đứt nhịp, app giúp điều chỉnh lại routine nhẹ hơn thay vì phạt người dùng bằng cảm giác tội lỗi.",
    icon: "spa",
    color: "#8B63F6",
  },
]

const pillars = [
  ["01", "Done-for-you routine", "PENTAVA giảm ma sát bắt đầu bằng lộ trình cá nhân hóa, không bắt người dùng tự nghĩ mọi thứ từ đầu."],
  ["02", "PENTA-CINEMA", "Weekly Capsule và cinematic recap biến nỗ lực hằng ngày thành một thước phim phát triển bản thân."],
  ["03", "Động lực kép", "Kết nối nhóm nhỏ cùng mục tiêu, có high-five và đồng cảm, không có leaderboard hơn thua."],
]

const communityCards = [
  ["#ENERGY30", "Thử thách năng lượng 30 ngày", "Mỗi ngày một hành động nhỏ để tăng mood, giữ routine và tạo cảm giác tiến bộ rõ ràng."],
  ["VISUAL LOG", "Check-in sáng tạo", "Ảnh, video và mood log giúp người dùng nhìn thấy sự ổn định theo thời gian."],
  ["BALANCE", "Kỷ luật không gượng ép", "Tiến bộ theo nhịp riêng nhưng vẫn được cộng đồng tiếp sức đúng lúc."],
]

const faqs = [
  {
    q: "Ảnh check-in của tôi có bị công khai không?",
    a: "Không. Hình ảnh và video mặc định là riêng tư, chỉ chia sẻ khi bạn chủ động bật tính năng đồng hành.",
  },
  {
    q: "Nếu tôi lỡ đứt chuỗi thì sao?",
    a: "PENTAVA không phạt người dùng bằng streak độc hại. Nhịp thở an lành sẽ giúp bạn hạ cường độ và bắt đầu lại nhẹ nhàng.",
  },
  {
    q: "PENTAVA phù hợp với ai?",
    a: "Phù hợp với người trẻ muốn chăm sóc sức khỏe thể chất, tinh thần và thói quen hằng ngày trong một trải nghiệm trực quan hơn.",
  },
]

export default function Home() {
  return (
    <>
      <Header />

      <main className="bg-[#F7FAFF] pt-[76px] text-black">
        <section
          id="hero"
          className="mx-auto grid min-h-[calc(100vh-76px)] max-w-[1220px] grid-cols-1 items-center gap-12 px-6 py-12 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-16"
        >
          <Reveal>
            <div className="space-y-7">
              <span className="inline-flex rounded-full border-2 border-[#FFC857] bg-white px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#3A8157] shadow-[3px_3px_0px_0px_#FFC857]">
                PENTAVA Ecosystem
              </span>

              <h1 className="max-w-4xl font-extrabold tracking-tight text-black">
                <span className="mb-3 block text-[34px] leading-none text-[#3A8157] md:text-[52px]">
                  Hệ sinh thái
                </span>
                <span className="block text-[42px] leading-[1.06] md:text-[66px]">
                  phát triển bản thân toàn diện
                </span>
                <span className="relative mt-4 inline-block text-[58px] leading-none text-black md:text-[92px]">
                  <span className="relative z-10">PENTAVA</span>
                  <span className="absolute bottom-1 left-1 right-1 z-0 h-4 rounded-full bg-[#FFC857] md:bottom-2 md:h-7" />
                </span>
              </h1>

              <p className="max-w-[620px] text-base leading-8 text-[#727272]">
                Một landing page duy nhất giới thiệu rõ sản phẩm: PENTAVA giúp
                người trẻ chăm sóc sức khỏe toàn diện, xây routine cá nhân hóa
                và lưu lại hành trình thay đổi bằng hình ảnh, video và cộng đồng.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#download"
                  className="inline-flex items-center gap-2 rounded-full bg-[#3A8157] px-7 py-4 font-extrabold text-white shadow-[4px_4px_0px_0px_#FFC857] transition-all hover:-translate-y-1"
                >
                  <span className="material-symbols-outlined text-[21px]">download</span>
                  Tải PENTAVA
                </a>

                <a
                  href="#solution"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#529CFF] bg-white px-7 py-4 font-extrabold text-[#529CFF] shadow-[4px_4px_0px_0px_rgba(82,156,255,0.25)] transition-all hover:-translate-y-1"
                >
                  <span className="material-symbols-outlined text-[21px]">auto_awesome</span>
                  Xem giải pháp
                </a>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
                {stats.map(([value, label]) => (
                  <div key={value} className="rounded-lg border border-[#D9D9D9] bg-white p-5 shadow-[0_5px_0px_0px_rgba(0,0,0,0.06)]">
                    <p className="text-2xl font-extrabold text-[#3A8157]">{value}</p>
                    <p className="mt-2 text-xs font-semibold leading-5 text-[#727272]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:justify-self-end">
            <div className="relative mx-auto w-full max-w-[430px]">
              <div className="rounded-[32px] border-[4px] border-[#3A8157] bg-[#FFC857] p-3 shadow-[14px_14px_0px_0px_#529CFF]">
                <div className="aspect-[9/18] overflow-hidden rounded-[24px] border-2 border-white bg-white">
                  <img
                    src="/image/pentava-app-home.png"
                    alt="Giao diện ứng dụng PENTAVA"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="absolute -right-2 -top-5 rotate-6 rounded-lg bg-white p-4 shadow-xl md:-right-8">
                <span className="material-symbols-outlined text-4xl text-[#8B63F6]">
                  auto_awesome
                </span>
              </div>
            </div>
          </Reveal>
        </section>

        <Reveal>
          <section id="solution" className="border-y border-[#D9D9D9] bg-white py-20 scroll-mt-24">
            <div className="mx-auto max-w-[1220px] px-6 md:px-8">
              <div className="mb-12 max-w-3xl">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#F25F5C]">
                  Vấn đề và hướng giải quyết
                </span>
                <h2 className="mt-4 text-[34px] font-extrabold leading-tight md:text-[52px]">
                  Từ áp lực bắt đầu đến một routine có thể duy trì thật sự.
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {problems.map((item) => (
                  <article key={item.title} className="rounded-lg border border-[#D9D9D9] bg-[#F7FAFF] p-7 shadow-[0_5px_0px_0px_rgba(0,0,0,0.05)]">
                    <div className="mb-6 flex h-13 w-13 items-center justify-center rounded-lg text-white" style={{ backgroundColor: item.color }}>
                      <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                    </div>
                    <h3 className="mb-3 text-xl font-extrabold">{item.title}</h3>
                    <p className="text-sm leading-7 text-[#727272]">{item.desc}</p>
                  </article>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
                {pillars.map(([number, title, desc]) => (
                  <article key={title} className="rounded-lg border border-[#D9D9D9] bg-white p-7 shadow-[0_5px_0px_0px_rgba(58,129,87,0.16)]">
                    <p className="mb-4 text-4xl font-extrabold text-[#3A8157]">{number}</p>
                    <h3 className="mb-3 text-xl font-extrabold">{title}</h3>
                    <p className="text-sm leading-7 text-[#727272]">{desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="features" className="mx-auto max-w-[1220px] px-6 py-20 md:px-8 scroll-mt-24">
            <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <span className="inline-flex rounded-full bg-[#FFC857] px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-black">
                  Tính năng cốt lõi
                </span>
                <h2 className="mt-5 text-[34px] font-extrabold leading-tight md:text-[52px]">
                  Một luồng trải nghiệm liền mạch thay cho nhiều trang rời rạc.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-[#727272]">
                Nội dung cũ từ các page tính năng, giải pháp, cộng đồng và hỗ trợ
                được gom lại thành các khối đọc nhanh trên cùng một landing page.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map((item) => (
                <article key={item.title} className="rounded-lg border border-[#D9D9D9] bg-white p-7 shadow-[0_5px_0px_0px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-1">
                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-lg text-white" style={{ backgroundColor: item.color }}>
                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                  </div>
                  <h3 className="mb-4 text-xl font-extrabold">{item.title}</h3>
                  <p className="text-sm leading-7 text-[#727272]">{item.desc}</p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="cinema" className="border-y border-[#D9D9D9] bg-white py-20 scroll-mt-24">
            <div className="mx-auto grid max-w-[1220px] grid-cols-1 items-center gap-12 px-6 md:px-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <span className="inline-flex rounded-full bg-[#8B63F6] px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-[3px_3px_0px_0px_#529CFF]">
                  PENTA-CINEMA
                </span>
                <h2 className="mt-6 max-w-3xl text-[36px] font-extrabold leading-tight md:text-[56px]">
                  Biến hành trình phát triển thành một thước phim đáng nhớ.
                </h2>
                <p className="mt-6 max-w-[620px] text-base leading-8 text-[#727272]">
                  PENTA-CINEMA dùng ảnh Visual Verification, mood log và Weekly
                  Capsule để tạo cinematic recap. Người dùng nhìn lại nỗ lực của
                  mình bằng cảm xúc, không chỉ bằng số liệu.
                </p>
              </div>

              <div className="rounded-lg border border-[#D9D9D9] bg-[#F7FAFF] p-4 shadow-[12px_12px_0px_0px_#FFC857]">
                <div className="aspect-[16/10] overflow-hidden rounded-lg bg-[#3A8157] lg:aspect-[4/3]">
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
          <section id="community" className="mx-auto max-w-[1220px] px-6 py-20 md:px-8 scroll-mt-24">
            <div className="mb-12 max-w-3xl">
              <span className="inline-flex rounded-full bg-[#3A8157] px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-white">
                Community
              </span>
              <h2 className="mt-5 text-[34px] font-extrabold leading-tight md:text-[52px]">
                Kỷ luật tự giác nhưng không cô độc.
              </h2>
              <p className="mt-5 text-base leading-8 text-[#727272]">
                PENTAVA tạo nhóm nhỏ văn minh, nơi mọi người tiếp sức nhau bằng
                high-five, visual log và thử thách nhẹ nhàng thay vì so sánh.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {communityCards.map(([tag, title, desc]) => (
                <article key={tag} className="rounded-lg border border-[#D9D9D9] bg-white p-7 shadow-[0_5px_0px_0px_rgba(82,156,255,0.18)]">
                  <p className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#8B63F6]">{tag}</p>
                  <h3 className="mb-3 text-xl font-extrabold">{title}</h3>
                  <p className="text-sm leading-7 text-[#727272]">{desc}</p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="download" className="bg-[#3A8157] py-20 text-white scroll-mt-24">
            <div className="mx-auto grid max-w-[1220px] grid-cols-1 items-center gap-12 px-6 md:px-8 lg:grid-cols-[1fr_360px]">
              <div>
                <span className="inline-flex rounded-full bg-[#FFC857] px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-black">
                  Download PENTAVA
                </span>
                <h2 className="mt-6 max-w-4xl text-[36px] font-extrabold leading-tight md:text-[58px]">
                  Bắt đầu Routine 1 chạm cho phiên bản tốt hơn của bạn.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/78">
                  Có sẵn trên App Store và Google Play. Trải nghiệm miễn phí các
                  tính năng cốt lõi, sau đó mở rộng hành trình khi bạn sẵn sàng.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a href="#download" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-extrabold text-[#3A8157] shadow-[4px_4px_0px_0px_#FFC857] transition-all hover:-translate-y-1">
                    <span className="material-symbols-outlined text-[21px]">phone_iphone</span>
                    App Store
                  </a>
                  <a href="#download" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#529CFF] px-7 py-4 font-extrabold text-white shadow-[4px_4px_0px_0px_#8B63F6] transition-all hover:-translate-y-1">
                    <span className="material-symbols-outlined text-[21px]">android</span>
                    Google Play
                  </a>
                </div>
              </div>

              <div className="rounded-lg border border-white/20 bg-white p-7 text-black shadow-[12px_12px_0px_0px_#FFC857]">
                <div className="aspect-square rounded-lg border-4 border-[#3A8157] bg-[#F7FAFF] p-7">
                  <div className="grid h-full grid-cols-5 grid-rows-5 gap-3">
                    {Array.from({ length: 25 }).map((_, index) => (
                      <div
                        key={index}
                        className="rounded-sm"
                        style={{
                          backgroundColor:
                            index % 5 === 0
                              ? "#3A8157"
                              : index % 4 === 0
                                ? "#529CFF"
                                : index % 3 === 0
                                  ? "#FFC857"
                                  : "#FFFFFF",
                        }}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-5 text-center text-sm font-extrabold text-[#727272]">
                  QR tải ứng dụng PENTAVA
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="faq" className="mx-auto max-w-[960px] px-6 py-20 md:px-8 scroll-mt-24">
            <div className="mb-10 text-center">
              <span className="inline-flex rounded-full bg-[#529CFF] px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-white">
                FAQ
              </span>
              <h2 className="mt-5 text-[34px] font-extrabold leading-tight md:text-[50px]">
                Câu hỏi thường gặp
              </h2>
            </div>

            <div className="space-y-5">
              {faqs.map((item) => (
                <article key={item.q} className="rounded-lg border border-[#D9D9D9] bg-white p-7 shadow-[0_5px_0px_0px_rgba(0,0,0,0.06)]">
                  <h3 className="text-xl font-extrabold">{item.q}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#727272]">{item.a}</p>
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
