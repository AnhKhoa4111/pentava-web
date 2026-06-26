import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import Reveal from "../components/common/Reveal"

const values = [
  ["01", "Tiết kiệm", 'Hệ sinh thái all-in-one thay thế "app salad" nhiều subscription.'],
  ["02", "Sáng tạo", "PENTA-CINEMA AI, palette thẩm mỹ biến routine thành câu chuyện."],
  ["03", "Thân thiện", '"Done-for-you" routine tự động, micro-guidance tinh tế.'],
  ["04", "Cộng đồng", '"Social healing" cùng nhóm mục tiêu chung, tránh toxic.'],
  ["05", "Bền vững", "Ưu tiên sức khỏe dài hạn dựa trên khoa học hành vi."],
]

const valueColors = ["#FFC857", "#8B63F6", "#529CFF", "#3A8157", "#F25F5C"]

export default function About() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-[1200px] space-y-20 bg-white px-8 pb-20 pt-36 text-black">
        <Reveal>
          <section className="space-y-8 text-center">
            <div className="inline-block rounded-full border-2 border-[#FFC857] bg-[#FFC857] px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
              TẦM NHÌN & SỨ MỆNH
            </div>

            <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-[1.1] md:text-[64px]">
              Định nghĩa lại{" "}
              <span className="italic underline decoration-[#529CFF] decoration-4 underline-offset-8">
                wellness
              </span>{" "}
              cho thế hệ trẻ.
            </h1>

            <div className="mt-16 grid gap-8 md:grid-cols-2">
              <div className="space-y-6 rounded-[18px] border border-[#D9D9D9] bg-white p-10 text-left shadow-[0_5px_0px_0px_rgba(255,200,87,0.8)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#529CFF]">
                  <span className="material-symbols-outlined text-3xl text-white">visibility</span>
                </div>
                <h3 className="text-2xl font-bold">Tầm nhìn</h3>
                <p className="leading-relaxed text-[#727272]">
                  Trở thành nền tảng wellness số định nghĩa lại cho thế hệ trẻ, nơi sức khỏe thể chất,
                  tinh thần và chuyển hóa bản thân được xây dựng tinh tế qua những bước tiến đều đặn
                  và có chủ đích.
                </p>
              </div>

              <div className="space-y-6 rounded-[18px] border border-[#D9D9D9] bg-white p-10 text-left shadow-[0_5px_0px_0px_rgba(58,129,87,0.45)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#3A8157]">
                  <span className="material-symbols-outlined text-3xl text-white">auto_fix_high</span>
                </div>
                <h3 className="text-2xl font-bold">Sứ mệnh</h3>
                <p className="leading-relaxed text-[#727272]">
                  Giúp người trẻ xây dựng thói quen bền vững mà không bị áp lực. Hỗ trợ mỗi cá nhân
                  vượt qua sự hỗn loạn của thay đổi lối sống bằng hành trình có hướng dẫn, nhẹ nhàng
                  và không tạo thêm căng thẳng.
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="space-y-12">
            <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
              <div className="max-w-xl space-y-6">
                <div className="inline-block rounded-full border-2 border-[#8B63F6] bg-white px-4 py-1 text-[10px] font-bold uppercase text-[#8B63F6]">
                  CÂU CHUYỆN THIẾT KẾ
                </div>
                <h2 className="text-[32px] font-bold">Từ Quarter-life Crisis đến routine vững chắc.</h2>
                <p className="text-lg text-[#727272]">
                  PENTAVA xây dựng dựa trên khung đánh giá WHO-5 để giúp người dùng tập trung vào sức
                  khỏe toàn diện thay vì chỉ các chỉ số cơ thể khô khan.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center gap-3 rounded-full bg-[#FFC857] px-6 py-3 shadow-[4px_4px_0px_0px_#3A8157]">
                  <span className="material-symbols-outlined">draw</span>
                  <span className="text-xs font-bold uppercase">WHO-5 Certified</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              <div className="relative col-span-12 h-[500px] overflow-hidden rounded-[18px] border border-[#D9D9D9] bg-[#F7FAFF] shadow-[0_5px_0px_0px_rgba(82,156,255,0.45)] md:col-span-7">
                <img
                  alt="Doodle character"
                  className="h-full w-full object-contain p-12"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhjSmmgGcLtREwPLzaqhjtkzSSPZ2MowoKPZIBW7UWQUcceoB5sH-pzctkQ6jHxp_JxBmJwedsmTfjHtIsE4qR5R6x4quEnfFM1bEZCkKQZJTflvP9aVnGvGZStU63PS00R31Hec9-67shyDhlDuP57d_zL2Lqz7WKrYmDhdK9Y_A7q7F0tSJSfNJdppy814VQcTjfoqMrF0BbG4XfA7Q6bJLTXsHGecLadMoNTfJTyJexuLkK_lbP0503MuSoIbX8wgT6o2qmQSc"
                />
                <div className="absolute bottom-8 left-8 right-8 rounded-[15px] border-t-4 border-[#529CFF] bg-white p-8">
                  <p className="text-xl font-semibold italic">
                    "Biến một thói quen thành một kỷ niệm đầy chất nghệ."
                  </p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-[#727272]">
                    — Visual Verification System
                  </p>
                </div>
              </div>

              <div className="col-span-12 flex flex-col justify-between rounded-[18px] bg-[#3A8157] p-12 text-white shadow-[8px_8px_0px_0px_#FFC857] md:col-span-5">
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFC857]">
                  <span className="material-symbols-outlined text-4xl text-black">neurology</span>
                </div>
                <div className="space-y-6">
                  <h4 className="text-2xl font-bold">Tâm lý học hành vi</h4>
                  <p className="text-lg leading-relaxed text-white/80">
                    Chúng tôi không chỉ nhắc nhở, chúng tôi đồng hành cùng bạn qua những giai đoạn
                    'blank page' để khơi gợi cảm hứng hành động mỗi ngày.
                  </p>
                  <div className="inline-flex cursor-pointer items-center gap-2 border-b border-white/40 pb-1 text-sm font-medium">
                    Khám phá phương pháp
                    <span className="material-symbols-outlined text-sm text-white">arrow_forward</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="space-y-12">
            <div className="space-y-4 text-center">
              <div className="inline-block rounded-full bg-[#529CFF] px-4 py-1 text-[10px] font-bold uppercase text-white">
                GIÁ TRỊ CỐT LÕI
              </div>
              <h2 className="text-[32px] font-bold">5 giá trị dẫn dắt mọi trải nghiệm.</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
              {values.map(([number, title, desc], index) => (
                <div
                  key={number}
                  className="group rounded-[18px] border border-[#D9D9D9] bg-white p-8 transition-all hover:-translate-y-1 hover:bg-[#F7FAFF]"
                  style={{ boxShadow: `0 5px 0px 0px ${valueColors[index]}` }}
                >
                  <span
                    className="mb-4 block text-[32px] font-bold"
                    style={{ color: valueColors[index] }}
                  >
                    {number}
                  </span>

                  <h5 className="mb-2 text-lg font-bold text-black">
                    {title}
                  </h5>

                  <p className="text-sm text-[#727272]">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="space-y-12">
            <div className="space-y-4">
              <div className="inline-block rounded-full border-2 border-[#3A8157] px-4 py-1 text-[10px] font-bold uppercase text-[#3A8157]">
                MÔ HÌNH DOANH THU
              </div>
              <h2 className="text-[32px] font-bold">Minh bạch & Giá trị.</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-[18px] border border-[#D9D9D9] bg-white p-1 shadow-[0_5px_0px_0px_rgba(255,200,87,0.8)]">
                <div className="h-full space-y-8 rounded-[14px] bg-white p-10">
                  <div className="flex items-start justify-between">
                    <span className="material-symbols-outlined text-4xl text-[#FFC857]">token</span>
                    <span className="rounded-full bg-[#FFC857] px-3 py-1 text-[10px] font-bold uppercase text-black">
                      Phổ biến
                    </span>
                  </div>
                  <div>
                    <h4 className="mb-2 text-xs font-bold uppercase text-[#727272]">PRO SUBSCRIPTION</h4>
                    <p className="text-5xl font-extrabold">
                      59k <span className="text-lg font-normal">/th</span>
                    </p>
                  </div>
                  <ul className="space-y-4 border-t border-[#D9D9D9] pt-4 text-sm">
                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#3A8157]">check</span>Routines không giới hạn</li>
                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#3A8157]">check</span>Streak Freeze tokens</li>
                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#3A8157]">check</span>Phân tích hành vi nâng cao</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-[18px] border border-[#D9D9D9] bg-white p-1 shadow-[0_5px_0px_0px_rgba(139,99,246,0.55)]">
                <div className="h-full space-y-8 rounded-[14px] bg-white p-10">
                  <span className="material-symbols-outlined text-4xl text-[#8B63F6]">brush</span>
                  <div>
                    <h4 className="mb-2 text-xs font-bold uppercase text-[#727272]">COSMETIC IAP</h4>
                    <p className="text-2xl font-bold leading-tight">Microtransactions Mỹ Thuật</p>
                  </div>
                  <p className="text-sm leading-relaxed text-[#727272]">
                    Dành cho những người dùng yêu cái đẹp, tùy biến không gian cá nhân của mình.
                  </p>
                  <ul className="space-y-4 border-t border-[#D9D9D9] pt-4 text-sm">
                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#529CFF]">add</span>UI PENTA-CINEMA độc quyền</li>
                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#529CFF]">add</span>Bộ nhạc và filter visual</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-[18px] bg-[#3A8157] p-1 shadow-[0_5px_0px_0px_rgba(82,156,255,0.8)]">
                <div className="h-full space-y-8 rounded-[14px] bg-[#3A8157] p-10 text-white">
                  <span className="material-symbols-outlined text-4xl text-[#FFC857]">handshake</span>
                  <div>
                    <h4 className="mb-2 text-xs font-bold uppercase opacity-60">B2B & AI COACH</h4>
                    <p className="text-2xl font-bold leading-tight">Kênh mở rộng tương lai</p>
                  </div>
                  <ul className="space-y-4 border-t border-white/20 pt-4 text-sm opacity-80">
                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#FFC857]">rocket_launch</span>AI Coach PRO+</li>
                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#FFC857]">domain</span>Wellness doanh nghiệp</li>
                    <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#FFC857]">workspace_premium</span>Challenges thương hiệu</li>
                  </ul>
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