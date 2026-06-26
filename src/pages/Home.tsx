import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import Reveal from "../components/common/Reveal"

const heroCards = [
  ["Routines 1 chạm", "Bắt đầu nhanh với các task nhỏ.", "#FFC857"],
  ["Sức khỏe ổn định", "Theo dõi thể chất và tinh thần.", "#3A8157"],
  ["Cảm giác bình tĩnh", "Ghi lại mood, ngủ và journal.", "#529CFF"],
]

const problems = [
  [
    "grid_view",
    "Quá nhiều app rời rạc",
    "Người trẻ phải dùng nhiều app khác nhau cho habit, mood, journal và sức khỏe.",
    "#FFC857",
  ],
  [
    "visibility_off",
    "Không biết bắt đầu từ đâu",
    "Nhiều app bắt người dùng tự tạo mục tiêu từ đầu, dễ gây nản và bỏ cuộc.",
    "#529CFF",
  ],
  [
    "cached",
    "Duy trì không bền vững",
    "Streak và reminder thô thường tạo áp lực thay vì giúp người dùng thật sự thay đổi.",
    "#F25F5C",
  ],
]

const comparisons = [
  ["Done-for-you Routine", "Người dùng tự tạo lịch", "Gợi ý task phù hợp"],
  ["Actionable Guidance", "Nhắc nhở thô", "Hướng dẫn nhỏ mỗi ngày"],
  ["Living Visual Diary", "Checkbox khô khan", "Photo log + Weekly capsule"],
]

export default function Home() {
  return (
    <>
      <div className="noise-overlay" />
      <Header />

      <main className="bg-white pt-24 text-black">
        <Reveal>
          <section className="relative mx-auto flex min-h-[800px] max-w-[1200px] items-center px-8 py-20">
            <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <div className="z-10 space-y-8">
                <span className="inline-block rounded-full border-2 border-[#FFC857] bg-[#FFF7DF] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-black">
                  PENTAVA ECOSYSTEM
                </span>

                <h1 className="max-w-xl text-[64px] font-extrabold leading-[1.05] tracking-tight text-black">
                  Build better habits with energy.
                </h1>

                <p className="max-w-[500px] text-base leading-7 text-[#727272]">
                  PENTAVA giúp người trẻ xây dựng thói quen, chăm sóc sức khỏe tinh thần
                  và lưu lại hành trình thay đổi bản thân theo cách trực quan, tích cực và đầy động lực.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button className="pill-button flex items-center gap-2 bg-[#3A8157] px-8 py-4 font-bold text-white shadow-[4px_4px_0px_0px_#FFC857] transition-all hover:-translate-y-1 hover:bg-[#2f6d49]">
                    Khám phá PENTAVA
                    <span className="material-symbols-outlined !text-lg">arrow_forward</span>
                  </button>

                  <button className="pill-button flex items-center gap-2 border-2 border-[#529CFF] bg-white px-8 py-4 font-bold text-[#529CFF] shadow-[4px_4px_0px_0px_rgba(82,156,255,0.25)] transition-all hover:-translate-y-1">
                    Xem hành trình
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6 pt-10 sm:grid-cols-3">
                  {heroCards.map(([title, desc, color]) => (
                    <div
                      key={title}
                      className="rounded-[18px] border border-[#D9D9D9] bg-white p-5 shadow-[0_4px_0px_0px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1"
                    >
                      <div
                        className="mb-4 h-3 w-12 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-black">
                        {title}
                      </span>
                      <p className="text-xs leading-relaxed text-[#727272]">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative hidden h-full lg:block">
                <div className="relative mx-auto w-[400px]">
                  <div className="rounded-[40px] border-[4px] border-[#3A8157] bg-[#FFC857] p-2 shadow-[14px_14px_0px_0px_#529CFF]">
                    <div className="flex aspect-[9/19] flex-col items-center justify-center overflow-hidden rounded-[32px] border-2 border-white bg-white">
                      <img
                        alt="Pentava Hand-drawn Interface"
                        className="doodle-illustration h-full w-full object-contain"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhjSmmgGcLtREwPLzaqhjtkzSSPZ2MowoKPZIBW7UWQUcceoB5sH-pzctkQ6jHxp_JxBmJwedsmTfjHtIsE4qR5R6x4quEnfFM1bEZCkKQZJTflvP9aVnGvGZStU63PS00R31Hec9-67shyDhlDuP57d_zL2Lqz7WKrYmDhdK9Y_A7q7F0tSJSfNJdppy814VQcTjfoqMrF0BbG4XfA7Q6bJLTXsHGecLadMoNTfJTyJexuLkK_lbP0503MuSoIbX8wgT6o2qmQSc"
                      />
                    </div>
                  </div>

                  <div className="absolute -right-10 -top-10 rotate-12 opacity-80">
                    <span className="material-symbols-outlined text-[100px] text-[#8B63F6]">
                      auto_awesome
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="border-y border-[#D9D9D9] bg-[#F7FAFF] py-24">
            <div className="mx-auto max-w-[1200px] px-8">
              <div className="mb-16">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#529CFF]">
                  Vấn đề chính
                </span>
                <h2 className="mt-4 max-w-2xl text-[32px] font-bold leading-[40px]">
                  Những rào cản khiến người trẻ khó duy trì lối sống tốt hơn.
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                {problems.map(([icon, title, desc, color]) => (
                  <div
                    key={title}
                    className="rounded-[18px] border border-[#D9D9D9] bg-white p-8 shadow-[0_4px_0px_0px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1"
                  >
                    <div
                      className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl text-white"
                      style={{ backgroundColor: color }}
                    >
                      <span className="material-symbols-outlined">{icon}</span>
                    </div>
                    <h3 className="mb-4 text-xl font-bold">{title}</h3>
                    <p className="text-sm leading-relaxed text-[#727272]">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="py-24">
            <div className="mx-auto max-w-[1200px] px-8">
              <div className="mb-20 text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#3A8157]">
                  GIẢI PHÁP PENTAVA
                </span>
                <h2 className="mt-4 text-[32px] font-bold leading-[40px]">
                  Biến thay đổi bản thân thành một hành trình có cảm hứng.
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
                <div className="flex flex-col justify-between rounded-[18px] border border-[#D9D9D9] bg-white p-10 shadow-[0_4px_0px_0px_rgba(58,129,87,0.2)] md:col-span-3">
                  <div>
                    <h3 className="mb-4 text-2xl font-bold text-[#3A8157]">
                      Hệ sinh thái All-in-one
                    </h3>
                    <p className="max-w-md text-[#727272]">
                      Tích hợp routine, mood, journal, visual log và community trong cùng một nền tảng.
                    </p>
                  </div>
                  <div className="mt-12 flex items-center gap-4">
                    <div className="rounded-full bg-[#3A8157] p-3 text-white">
                      <span className="material-symbols-outlined">eco</span>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-tight text-[#3A8157]">
                      Giảm ma sát, tăng động lực mỗi ngày.
                    </span>
                  </div>
                </div>

                <div className="rounded-[18px] bg-[#FFC857] p-10 shadow-[4px_4px_0px_0px_#3A8157] md:col-span-2">
                  <h3 className="mb-4 text-2xl font-bold">Onboarding tự động</h3>
                  <p className="mb-8 text-sm text-black/70">
                    Khảo sát thông minh giúp người dùng có ngay routine phù hợp mà không cần tự bắt đầu từ trang trắng.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-black/10 py-2">
                      <span className="material-symbols-outlined text-[#3A8157]">check_circle</span>
                      <span className="text-xs font-bold">Gợi ý task cá nhân hóa</span>
                    </div>
                    <div className="flex items-center gap-3 py-2">
                      <span className="material-symbols-outlined text-[#3A8157]">check_circle</span>
                      <span className="text-xs font-bold">Kích hoạt nhanh trong vài phút</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-[18px] bg-[#529CFF] p-10 text-white shadow-[4px_4px_0px_0px_#8B63F6] md:col-span-2">
                  <h3 className="mb-4 text-2xl font-bold">Visual Verification</h3>
                  <p className="text-sm text-white/85">
                    Thay checkbox khô khan bằng nhật ký ảnh, mood check-in và Weekly Capsule.
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-[18px] bg-[#3A8157] p-10 text-white shadow-[8px_8px_0px_0px_#FFC857] md:col-span-3">
                  <div className="relative z-10">
                    <h3 className="mb-4 text-2xl font-bold">Động lực kép</h3>
                    <p className="max-w-md text-white/85">
                      Người dùng có thể phát triển riêng tư hoặc tham gia nhóm mục tiêu tích cực,
                      tránh leaderboard độc hại.
                    </p>
                  </div>
                  <div className="absolute -bottom-6 -right-6 opacity-25">
                    <span className="material-symbols-outlined text-[140px] text-[#FFC857]">groups</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="bg-[#3A8157] py-24 text-white">
            <div className="mx-auto max-w-[1200px] px-8">
              <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFC857]">
                    CHÂN DUNG NGƯỜI DÙNG
                  </span>
                  <h2 className="mb-8 mt-6 text-4xl font-extrabold">
                    Dành cho thế hệ trẻ muốn thay đổi nhưng cần một hệ thống dễ bắt đầu.
                  </h2>

                  <div className="space-y-6">
                    <div className="rounded-[15px] border border-white/20 bg-white/10 p-6">
                      <h4 className="mb-2 font-bold">Có động lực nhưng dễ mất nhịp</h4>
                      <p className="text-sm text-white/75">
                        Cần một app giúp bắt đầu nhỏ, duy trì đều và không tạo cảm giác bị phán xét.
                      </p>
                    </div>

                    <div className="rounded-[15px] border border-white/20 bg-white/10 p-6">
                      <h4 className="mb-2 font-bold">Thích trải nghiệm visual-first</h4>
                      <p className="text-sm text-white/75">
                        Muốn nhìn thấy hành trình của mình bằng màu sắc, ảnh, capsule và cảm xúc.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-square w-full overflow-hidden rounded-[20px] border-[6px] border-[#FFC857] bg-white shadow-[20px_20px_0px_0px_rgba(255,200,87,0.25)]">
                    <img
                      alt="Aspirational Lifestyle"
                      className="doodle-illustration h-full w-full object-cover opacity-90"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhjSmmgGcLtREwPLzaqhjtkzSSPZ2MowoKPZIBW7UWQUcceoB5sH-pzctkQ6jHxp_JxBmJwedsmTfjHtIsE4qR5R6x4quEnfFM1bEZCkKQZJTflvP9aVnGvGZStU63PS00R31Hec9-67shyDhlDuP57d_zL2Lqz7WKrYmDhdK9Y_A7q7F0tSJSfNJdppy814VQcTjfoqMrF0BbG4XfA7Q6bJLTXsHGecLadMoNTfJTyJexuLkK_lbP0503MuSoIbX8wgT6o2qmQSc"
                    />
                  </div>

                  <div className="absolute -bottom-8 -left-8 max-w-xs rounded-[15px] bg-[#FFC857] p-8 text-black shadow-2xl">
                    <p className="text-sm font-medium italic">
                      "PENTAVA giúp mình biến thay đổi bản thân thành điều dễ nhìn thấy và đáng muốn tiếp tục."
                    </p>
                    <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-[#3A8157]">
                      — Nguyễn Minh Anh, Content Creator
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mx-auto max-w-[1200px] px-8 py-24">
            <div className="mb-16 text-center">
              <h2 className="text-[32px] font-bold leading-[40px] text-[#3A8157]">
                Điểm khác biệt của PENTAVA
              </h2>
            </div>

            <div className="overflow-x-auto rounded-[18px] border border-[#D9D9D9] bg-white p-6 shadow-[0_4px_0px_0px_rgba(58,129,87,0.2)]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#3A8157]">
                    <th className="py-6 text-left text-[10px] font-bold uppercase tracking-widest text-[#727272]">
                      CORE USP
                    </th>
                    <th className="py-6 text-left text-[10px] font-bold uppercase tracking-widest text-[#727272]">
                      TRADITIONAL TRACKERS
                    </th>
                    <th className="py-6 text-left text-[10px] font-bold uppercase tracking-widest text-[#3A8157]">
                      PENTAVA
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {comparisons.map(([usp, oldWay, pentava]) => (
                    <tr key={usp} className="border-b border-[#D9D9D9] transition-colors hover:bg-[#F7FAFF]">
                      <td className="py-8 font-bold">{usp}</td>
                      <td className="py-8 text-[#727272]">
                        <span className="material-symbols-outlined mr-2 align-middle text-sm text-[#F25F5C]">
                          close
                        </span>
                        {oldWay}
                      </td>
                      <td className="py-8 font-bold text-[#3A8157]">
                        <span className="material-symbols-outlined mr-2 align-middle text-sm text-[#3A8157]">
                          check
                        </span>
                        {pentava}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mx-auto max-w-[1200px] px-8 pb-24">
            <div className="relative overflow-hidden rounded-[24px] bg-[#FFC857] p-12 text-center text-black shadow-[16px_16px_0px_0px_#3A8157] md:p-24">
              <div className="relative z-10">
                <h2 className="mb-8 text-4xl font-extrabold md:text-6xl">
                  Bắt đầu thay đổi
                  <br />
                  từ một thói quen nhỏ.
                </h2>

                <p className="mx-auto mb-12 max-w-lg text-black/70">
                  Tham gia cộng đồng người trẻ đang xây dựng lối sống tích cực hơn cùng PENTAVA.
                </p>

                <div className="flex flex-col justify-center gap-6 sm:flex-row">
                  <button className="pill-button flex items-center justify-center gap-3 bg-[#3A8157] px-10 py-4 font-bold text-white shadow-[4px_4px_0px_0px_#529CFF] transition-all hover:-translate-y-1">
                    <span className="material-symbols-outlined">apps</span>
                    App Store
                  </button>

                  <button className="pill-button flex items-center justify-center gap-3 bg-[#529CFF] px-10 py-4 font-bold text-white shadow-[4px_4px_0px_0px_#8B63F6] transition-all hover:-translate-y-1">
                    <span className="material-symbols-outlined">play_arrow</span>
                    Google Play
                  </button>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </main>

      <Footer />
    </>
  )
}