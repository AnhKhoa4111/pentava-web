import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import Reveal from "../components/common/Reveal"

export default function Home() {
  return (
    <>
      <div className="noise-overlay" />
      <Header />

      <main className="pt-24">
        <Reveal>
          <section className="relative mx-auto flex min-h-[800px] max-w-[1200px] items-center px-8 py-20">
            <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <div className="z-10 space-y-8">
                <span className="inline-block rounded-full border-2 border-black px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest">
                  PENTAVA ECOSYSTEM
                </span>

                <h1 className="text-[64px] font-extrabold leading-[1.05] tracking-tight">
                  PENTAVA
                </h1>

                <p className="max-w-[480px] text-base leading-6 text-[#4c4546]">
                  Ứng dụng kiểm duyệt thẩm mỹ giúp người trẻ xây dựng thói quen đều đặn,
                  đầy cảm hứng và đáng chia sẻ mỗi ngày qua phong cách doodle nghệ thuật.
                </p>

                <button className="pill-button flex items-center gap-2 bg-black px-8 py-4 font-bold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                  Khám phá PENTAVA
                  <span className="material-symbols-outlined !text-lg">arrow_forward</span>
                </button>

                <div className="grid grid-cols-3 gap-6 pt-12">
                  {[
                    ["Routines 1 chạm", "Tối ưu hóa mọi hành động nhỏ."],
                    ["Kiểm duyệt đẹp", "Thẩm mỹ artisanal là ưu tiên."],
                    ["Trực quan", "Theo dõi tiến độ bằng hình vẽ."],
                  ].map(([title, desc]) => (
                    <div key={title} className="artisanal-card p-5">
                      <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider">
                        {title}
                      </span>
                      <p className="text-xs leading-relaxed text-[#4c4546]">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative hidden h-full lg:block">
                <div className="relative mx-auto w-[400px]">
                  <div className="rounded-[40px] border-[4px] border-black bg-white p-2 shadow-[12px_12px_0px_0px_#000000]">
                    <div className="flex aspect-[9/19] flex-col items-center justify-center overflow-hidden rounded-[32px] border-2 border-black/5 bg-white">
                      <img
                        alt="Pentava Hand-drawn Interface"
                        className="doodle-illustration h-full w-full object-contain"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhjSmmgGcLtREwPLzaqhjtkzSSPZ2MowoKPZIBW7UWQUcceoB5sH-pzctkQ6jHxp_JxBmJwedsmTfjHtIsE4qR5R6x4quEnfFM1bEZCkKQZJTflvP9aVnGvGZStU63PS00R31Hec9-67shyDhlDuP57d_zL2Lqz7WKrYmDhdK9Y_A7q7F0tSJSfNJdppy814VQcTjfoqMrF0BbG4XfA7Q6bJLTXsHGecLadMoNTfJTyJexuLkK_lbP0503MuSoIbX8wgT6o2qmQSc"
                      />
                    </div>
                  </div>

                  <div className="absolute -right-10 -top-10 rotate-12 opacity-20">
                    <span className="material-symbols-outlined text-[100px]">draw</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="border-y border-[#cfc4c5] bg-[#f3f3f3] py-24">
            <div className="mx-auto max-w-[1200px] px-8">
              <div className="mb-16">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                  Vấn đề chính
                </span>
                <h2 className="mt-4 max-w-2xl text-[32px] font-bold leading-[40px]">
                  Những vấn đề người trẻ đang gặp phải trong việc duy trì lối sống.
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                {[
                  ["grid_view", "Hệ sinh thái phân mảnh", "Người dùng bị dắt đi giữa quá nhiều app, không có giải pháp duy nhất để quản lý cả sức khỏe thể chất và tinh thần."],
                  ["visibility_off", "Bức tranh trắng mù mờ", 'App wellness truyền thống thường để người dùng tự tạo mục tiêu từ đầu, gây "blank screen anxiety".'],
                  ["cached", "Vòng xoáy churn và thất bại", 'App chỉ tạo ra cảm giác "phải dùng" chứ không tạo ra thói quen thực sự, dẫn đến việc bỏ cuộc sớm.'],
                ].map(([icon, title, desc]) => (
                  <div key={title} className="artisanal-card p-8">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border-2 border-black">
                      <span className="material-symbols-outlined">{icon}</span>
                    </div>
                    <h3 className="mb-4 text-xl font-bold">{title}</h3>
                    <p className="text-sm leading-relaxed text-[#4c4546]">{desc}</p>
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
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#4c4546]">
                  GIẢI PHÁP PENTAVA
                </span>
                <h2 className="mt-4 text-[32px] font-bold leading-[40px]">
                  Tái định nghĩa thói quen qua thẩm mỹ Doodle
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
                <div className="artisanal-card flex flex-col justify-between p-10 md:col-span-3">
                  <div>
                    <h3 className="mb-4 text-2xl font-bold">Hệ sinh thái All-in-one</h3>
                    <p className="max-w-md text-[#4c4546]">
                      Tích hợp cả sức khỏe thể chất và tinh thần dựa trên khung đánh giá WHO-5
                      trong cùng một nền tảng thủ công nghệ thuật.
                    </p>
                  </div>
                  <div className="mt-12 flex items-center gap-4">
                    <div className="rounded-full border border-black p-3">
                      <span className="material-symbols-outlined">eco</span>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-tight">
                      Giảm ma sát tối đa hàng ngày.
                    </span>
                  </div>
                </div>

                <div className="rounded-[15px] border border-black bg-[#e2e2e2] p-10 shadow-[4px_4px_0px_0px_#000000] md:col-span-2">
                  <h3 className="mb-4 text-2xl font-bold">Onboarding tự động</h3>
                  <p className="mb-8 text-sm text-[#4c4546]">
                    Khảo sát thông minh 2 phút tự động gợi ý chính xác 5 task hàng ngày phù hợp với mục tiêu của bạn.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-black/10 py-2">
                      <span className="material-symbols-outlined">check_circle</span>
                      <span className="text-xs font-bold">Tùy chỉnh cá nhân hóa 100%</span>
                    </div>
                    <div className="flex items-center gap-3 py-2">
                      <span className="material-symbols-outlined">check_circle</span>
                      <span className="text-xs font-bold">Kích hoạt ngay trong 2 phút</span>
                    </div>
                  </div>
                </div>

                <div className="artisanal-card p-10 md:col-span-2">
                  <h3 className="mb-4 text-2xl font-bold">Visual Verification</h3>
                  <p className="text-sm text-[#4c4546]">
                    Thay checkbox khô khan bằng nhật ký ảnh doodle, tự động đóng gói thành PENTA-CINEMA aesthetic để review cuối tuần.
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-[15px] bg-black p-10 text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] md:col-span-3">
                  <div className="relative z-10">
                    <h3 className="mb-4 text-2xl font-bold">Động lực kép (Dual Motivation)</h3>
                    <p className="max-w-md text-white/80">
                      Người dùng có thể chọn theo dõi riêng tư hoặc nhóm mục tiêu tích cực,
                      tránh cạnh tranh độc hại của các leaderboard truyền thống.
                    </p>
                  </div>
                  <div className="absolute -bottom-6 -right-6 opacity-20">
                    <span className="material-symbols-outlined text-[140px]">groups</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="bg-black py-24 text-white">
            <div className="mx-auto max-w-[1200px] px-8">
              <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#e2e2e2]">
                    CHÂN DUNG NGƯỜI DÙNG
                  </span>
                  <h2 className="mb-8 mt-6 text-4xl font-extrabold">
                    Dành cho thế hệ trẻ tìm kiếm sự cân bằng.
                  </h2>

                  <div className="space-y-6">
                    <div className="rounded-[15px] border border-white/20 bg-white/5 p-6">
                      <h4 className="mb-2 font-bold">Đặc điểm hành vi</h4>
                      <p className="text-sm text-white/60">
                        Thích lưu giữ hành trình bằng hình ảnh đẹp và cảm xúc. Ưu tiên trải nghiệm mật,
                        không muốn bị so sánh khốc liệt.
                      </p>
                    </div>

                    <div className="rounded-[15px] border border-white/20 bg-white/5 p-6">
                      <h4 className="mb-2 font-bold">Nhu cầu cốt lõi</h4>
                      <p className="text-sm text-white/60">
                        Muốn UI thẩm mỹ artisanal, trải nghiệm cá nhân hoá và visual-first storytelling.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-square w-full overflow-hidden rounded-[20px] border-[6px] border-white bg-white shadow-[20px_20px_0px_0px_rgba(255,255,255,0.1)]">
                    <img
                      alt="Aspirational Lifestyle"
                      className="doodle-illustration h-full w-full object-cover opacity-90"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhjSmmgGcLtREwPLzaqhjtkzSSPZ2MowoKPZIBW7UWQUcceoB5sH-pzctkQ6jHxp_JxBmJwedsmTfjHtIsE4qR5R6x4quEnfFM1bEZCkKQZJTflvP9aVnGvGZStU63PS00R31Hec9-67shyDhlDuP57d_zL2Lqz7WKrYmDhdK9Y_A7q7F0tSJSfNJdppy814VQcTjfoqMrF0BbG4XfA7Q6bJLTXsHGecLadMoNTfJTyJexuLkK_lbP0503MuSoIbX8wgT6o2qmQSc"
                    />
                  </div>

                  <div className="absolute -bottom-8 -left-8 max-w-xs rounded-[15px] bg-white p-8 text-black shadow-2xl">
                    <p className="text-sm font-medium italic">
                      "PENTAVA biến những thói quen nhàm chán thành một bộ phim ngắn đẹp mắt mà mình thực sự muốn xem lại mỗi tuần."
                    </p>
                    <p className="mt-4 text-[10px] font-bold uppercase tracking-wider">
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
              <h2 className="text-[32px] font-bold leading-[40px]">
                Điểm khác biệt của PENTAVA
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="py-6 text-left text-[10px] font-bold uppercase tracking-widest text-[#4c4546]">
                      CORE USP
                    </th>
                    <th className="py-6 text-left text-[10px] font-bold uppercase tracking-widest text-[#4c4546]">
                      TRADITIONAL TRACKERS
                    </th>
                    <th className="py-6 text-left text-[10px] font-bold uppercase tracking-widest text-black">
                      PENTAVA
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    ["Done-for-you Routine", "Người dùng tự tạo lịch", "Gợi ý 5 task phù hợp"],
                    ["Actionable Guidance", "Nhắc nhở thô", "Popup tips thủ công"],
                    ["Living Visual Diary", "Checkbox khô khan", "Photo log + Doodle review"],
                  ].map(([usp, oldWay, pentava]) => (
                    <tr key={usp} className="border-b border-[#cfc4c5] transition-colors hover:bg-black/5">
                      <td className="py-8 font-bold">{usp}</td>
                      <td className="py-8 text-[#4c4546]">
                        <span className="material-symbols-outlined mr-2 align-middle text-sm">close</span>
                        {oldWay}
                      </td>
                      <td className="py-8 font-bold text-black">
                        <span className="material-symbols-outlined mr-2 align-middle text-sm">check</span>
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
            <div className="relative overflow-hidden rounded-[15px] border-[4px] border-black bg-white p-12 text-center text-black shadow-[16px_16px_0px_0px_#000000] md:p-24">
              <div className="relative z-10">
                <h2 className="mb-8 text-4xl font-extrabold md:text-6xl">
                  Bắt đầu thói quen
                  <br />
                  đẹp mắt ngay hôm nay.
                </h2>

                <p className="mx-auto mb-12 max-w-lg text-[#4c4546]">
                  Tham gia cộng đồng 50,000+ người dùng đang thay đổi lối sống một cách thẩm mỹ cùng PENTAVA.
                </p>

                <div className="flex flex-col justify-center gap-6 sm:flex-row">
                  <button className="pill-button flex items-center justify-center gap-3 bg-black px-10 py-4 font-bold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-1">
                    <span className="material-symbols-outlined">apps</span>
                    App Store
                  </button>

                  <button className="pill-button flex items-center justify-center gap-3 border-2 border-black bg-white px-10 py-4 font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-1">
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