import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import Reveal from "../components/common/Reveal"
import { motion } from "motion/react"

const cinemaSteps = [
  {
    step: "01",
    title: "Visual Check-in 1 chạm",
    desc: "Chụp 1 bức ảnh hoặc video ngắn 3 giây khi bạn hoàn thành routine (chạy bộ, đọc sách, ăn sáng lành mạnh). Không còn là những ô checkbox khô khan.",
    icon: "photo_camera",
    color: "#FFC857",
  },
  {
    step: "02",
    title: "AI Curation & Sound Sync",
    desc: "Thuật toán AI tự động chọn lọc góc máy đẹp, đồng bộ nhịp điệu với bản nhạc nền cảm xúc (Lo-fi, Acoustic hoặc Cinematic Ambient).",
    icon: "auto_fix_high",
    color: "#8B63F6",
  },
  {
    step: "03",
    title: "Weekly Capsule & 4K Recap",
    desc: "Vào mỗi tối Chủ Nhật, PENTAVA gửi tặng bạn một thước phim tua nhanh gói gọn 7 ngày nỗ lực – sẵn sàng lưu lại hoặc chia sẻ lên Story.",
    icon: "movie_creation",
    color: "#3A8157",
  },
]

const sampleFilms = [
  {
    id: 1,
    title: "Bình minh 5:30 & Chạy bộ 5km",
    category: "Thể chất & Năng lượng",
    tag: "#MorningRun",
    duration: "45s",
    ep: "Tuần 04 • Tháng 10",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80",
    bgAccent: "#3A8157",
    soundtrack: "Lo-fi Morning Vibes",
  },
  {
    id: 2,
    title: "30 Phút Đọc Sách & Viết Journal",
    category: "Nuôi dưỡng tâm trí",
    tag: "#Mindful",
    duration: "30s",
    ep: "Tuần 03 • Tháng 10",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    bgAccent: "#8B63F6",
    soundtrack: "Deep Focus Ambient",
  },
  {
    id: 3,
    title: "Eat Clean & Meal Prep Lành Mạnh",
    category: "Dinh dưỡng bền vững",
    tag: "#HealthyEat",
    duration: "40s",
    ep: "Tuần 02 • Tháng 10",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
    bgAccent: "#FFC857",
    soundtrack: "Acoustic Warmth",
  },
]

const comparisonData = [
  {
    criteria: "Hình thức ghi nhận",
    traditional: "Tích dấu checkbox ✔️ đơn điệu, dễ quên lãng",
    pentava: "Ảnh thật & video ngắn ghi dấu sự thay đổi sống động",
    win: true,
  },
  {
    criteria: "Cảm xúc mang lại",
    traditional: "Áp lực số ngày liên tục (streak) gây kiệt sức",
    pentava: "Tự hào khi xem lại cuốn phim biến đổi của chính mình",
    win: true,
  },
  {
    criteria: "Nhìn lại hành trình",
    traditional: "Bảng biểu số liệu vô hồn sau 30 ngày",
    pentava: "Weekly Capsule 4K tóm tắt đầy nghệ thuật & cảm hứng",
    win: true,
  },
  {
    criteria: "Quyền riêng tư",
    traditional: "Công khai cưỡng ép trên bảng xếp hạng (ranking)",
    pentava: "Mã hóa 100%, bạn toàn quyền quyết định chia sẻ hay giữ riêng",
    win: true,
  },
]

export default function Cinema() {
  const [activeFilm, setActiveFilm] = useState(sampleFilms[0])

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F7FAFF] pt-32 text-black lg:pt-28">
        {/* HERO SECTION CHUẨN PENTAVA */}
        <Reveal>
          <section className="mx-auto max-w-[1240px] px-6 py-16 md:px-8 md:py-24">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Cột trái: Headline & Kêu gọi */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D9D9D9] bg-white px-4 py-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8B63F6] text-white">
                    <span className="material-symbols-outlined text-[16px]">
                      movie
                    </span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B63F6]">
                    TÍNH NĂNG ĐỘC BẢN PENTAVA
                  </span>
                </div>

                <h1 className="max-w-3xl font-extrabold tracking-tight text-black">
                  <span className="mb-3 block text-[32px] leading-tight text-[#8B63F6] md:text-[46px]">
                    PENTA-CINEMA
                  </span>

                  <span className="flex flex-wrap items-baseline gap-3 text-[38px] leading-[1.12] md:text-[56px]">
                    <span>Bộ phim điện ảnh về</span>
                    <span className="relative inline-block text-[40px] leading-none tracking-tight text-black md:text-[62px]">
                      <span className="relative z-10 text-[#3A8157]">chính bạn</span>
                      <span className="absolute bottom-1 left-0 right-0 z-0 h-3 rounded-full bg-[#FFC857]/60 md:bottom-2 md:h-5" />
                    </span>
                  </span>
                </h1>

                <p className="max-w-xl text-base leading-relaxed text-[#727272] md:text-lg">
                  Mỗi ngày thức dậy hoàn thành routine không chỉ là nhiệm vụ, mà là một cảnh quay quý giá. PENTAVA tự động biên tập những nỗ lực thầm lặng của bạn thành thước phim Weekly Capsule đậm chất điện ảnh.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <Link
                    to="/download"
                    className="inline-flex items-center gap-2.5 rounded-full bg-[#3A8157] px-8 py-4 font-bold text-white transition-all hover:-translate-y-1 hover:bg-[#2f6a47]"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      play_circle
                    </span>
                    <span>Tạo phim của bạn ngay</span>
                  </Link>

                  <a
                    href="#how-it-works"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-[#D9D9D9] bg-white px-6 py-4 font-bold text-gray-700 transition-all hover:border-[#8B63F6] hover:text-[#8B63F6]"
                  >
                    <span>Khám phá quy trình</span>
                    <span className="material-symbols-outlined text-[18px]">
                      arrow_downward
                    </span>
                  </a>
                </div>
              </div>

              {/* Cột phải: Cinema Mockup Player */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[360px] rounded-[36px] border-2 border-black bg-white p-4">
                  {/* Khung mô phỏng màn hình phát phim dọc */}
                  <div className="relative aspect-[9/15] overflow-hidden rounded-[26px] bg-gray-900 border border-black/20">
                    <img
                      src={activeFilm.image}
                      alt={activeFilm.title}
                      className="h-full w-full object-cover transition-all duration-700 hover:scale-105"
                    />

                    {/* Gradient Overlay & Controls */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 p-5 flex flex-col justify-between text-white">
                      {/* Top Bar */}
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[10px] font-black tracking-wider uppercase">
                          {activeFilm.ep}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-bold text-white/90">
                          <span className="material-symbols-outlined text-[16px] text-[#FFC857]">
                            music_note
                          </span>
                          {activeFilm.duration}
                        </span>
                      </div>

                      {/* Center Play Indicator */}
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/30 backdrop-blur-md border border-white/40">
                        <span className="material-symbols-outlined text-4xl text-white ml-1">
                          play_arrow
                        </span>
                      </div>

                      {/* Bottom Details */}
                      <div>
                        <span className="rounded-full bg-[#8B63F6] px-2.5 py-0.5 text-[10px] font-bold uppercase">
                          {activeFilm.category}
                        </span>
                        <h2 className="mt-2 text-base font-extrabold leading-snug">
                          {activeFilm.title}
                        </h2>
                        <div className="mt-2 flex items-center justify-between text-xs text-white/70">
                          <span>Nhạc nền: {activeFilm.soundtrack}</span>
                          <span className="font-bold text-[#FFC857]">{activeFilm.tag}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-center text-xs font-bold text-[#727272]">
                    🎬 Xem thử Weekly Capsule 4K tạo tự động từ Routine
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* SECTION: 3 BƯỚC BIẾN ROUTINE THÀNH PHIM */}
        <Reveal>
          <section id="how-it-works" className="border-t border-[#D9D9D9] bg-white py-20 md:py-28">
            <div className="mx-auto max-w-[1240px] px-6 md:px-8">
              <div className="mx-auto mb-16 max-w-2xl text-center">
                <span className="inline-block rounded-full bg-[#8B63F6]/10 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#8B63F6]">
                  QUY TRÌNH SẢN XUẤT PHIM TỰ ĐỘNG
                </span>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl text-black">
                  Biến 7 ngày nỗ lực thành tác phẩm nghệ thuật
                </h2>
                <p className="mt-3 text-sm text-[#727272] md:text-base">
                  Bạn chỉ cần tập trung làm tốt thói quen của mình mỗi ngày. Khâu hậu kỳ, âm nhạc và dựng phim – hãy để AI PENTAVA lo trọn gói.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {cinemaSteps.map((item) => (
                  <div
                    key={item.step}
                    className="relative flex flex-col justify-between rounded-[26px] border border-[#D9D9D9] bg-[#F7FAFF] p-8 transition-all hover:-translate-y-2"
                  >
                    <div>
                      <div className="mb-6 flex items-center justify-between">
                        <span
                          className="flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                          style={{ backgroundColor: item.color }}
                        >
                          <span className="material-symbols-outlined text-2xl">
                            {item.icon}
                          </span>
                        </span>
                        <span className="text-3xl font-black text-gray-300">
                          {item.step}
                        </span>
                      </div>

                      <h3 className="mb-3 text-xl font-black text-gray-900">
                        {item.title}
                      </h3>

                      <p className="text-sm leading-7 text-[#727272]">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-8 border-t border-dashed border-gray-300 pt-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#3A8157]">
                        ✨ Hoàn toàn tự động
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* SECTION: PHÒNG CHIẾU PHIM CHỦ ĐỀ (SHOWCASE REEL) */}
        <Reveal>
          <section className="mx-auto max-w-[1240px] px-6 py-20 md:py-28 md:px-8">
            <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#3A8157]">
                  CINEMA SHOWCASE
                </span>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl text-black">
                  Các chủ đề phim Capsule yêu thích
                </h2>
                <p className="mt-2 text-sm text-[#727272]">
                  Chọn một chủ đề bên dưới để xem thước phim mẫu được AI dựng sẵn.
                </p>
              </div>

              {/* Nút bấm chọn tab phim */}
              <div className="flex flex-wrap gap-2">
                {sampleFilms.map((film) => (
                  <button
                    key={film.id}
                    type="button"
                    onClick={() => setActiveFilm(film)}
                    className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                      activeFilm.id === film.id
                        ? "bg-[#8B63F6] text-white"
                        : "border border-gray-200 bg-white text-gray-700 hover:border-[#8B63F6]"
                    }`}
                  >
                    {film.tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid 3 Phim Mẫu */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {sampleFilms.map((film) => {
                const isSelected = activeFilm.id === film.id
                return (
                  <motion.div
                    key={film.id}
                    whileHover={{ y: -6 }}
                    onClick={() => setActiveFilm(film)}
                    className={`cursor-pointer overflow-hidden rounded-[26px] border-2 bg-white transition-all ${
                      isSelected
                        ? "border-[#8B63F6]"
                        : "border-[#D9D9D9] hover:border-[#8B63F6]"
                    }`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
                      <img
                        src={film.image}
                        alt={film.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                        {film.duration}
                      </div>
                      <div className="absolute bottom-3 left-3 rounded-full bg-[#8B63F6] px-3 py-1 text-[10px] font-black uppercase text-white">
                        {film.ep}
                      </div>
                    </div>

                    <div className="p-6">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#3A8157]">
                        {film.category}
                      </span>
                      <h3 className="mt-1 text-lg font-black text-gray-900 line-clamp-1">
                        {film.title}
                      </h3>
                      <p className="mt-2 text-xs text-[#727272]">
                        Âm thanh: <span className="font-semibold text-gray-800">{film.soundtrack}</span>
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </section>
        </Reveal>

        {/* SECTION: TẠI SAO PENTA-CINEMA KHÁC BIỆT (BẢNG SO SÁNH) */}
        <Reveal>
          <section className="border-t border-[#D9D9D9] bg-white py-20 md:py-28">
            <div className="mx-auto max-w-[1100px] px-6 md:px-8">
              <div className="mx-auto mb-14 text-center max-w-2xl">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#8B63F6]">
                  SỰ ĐỘT PHÁ
                </span>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl text-black">
                  Tạm biệt những ô checkbox áp lực
                </h2>
                <p className="mt-3 text-sm text-[#727272]">
                  PENTAVA tin rằng sự thay đổi chỉ bền vững khi bạn cảm nhận được niềm vui và cái đẹp trong từng hành động nhỏ.
                </p>
              </div>

              <div className="overflow-hidden rounded-[26px] border-2 border-black bg-white">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1.2fr] border-b-2 border-black bg-[#F7FAFF] p-4 md:p-6 text-sm font-black uppercase tracking-wider">
                  <div className="text-gray-500">Tiêu chí</div>
                  <div className="text-[#727272] hidden md:block">Ứng dụng Habit cũ</div>
                  <div className="text-[#3A8157]">PENTAVA Cinematic</div>
                </div>

                <div className="divide-y divide-gray-200">
                  {comparisonData.map((row) => (
                    <div
                      key={row.criteria}
                      className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1.2fr] items-center p-4 md:p-6 gap-2 md:gap-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-extrabold text-gray-900 text-sm">
                        {row.criteria}
                      </div>
                      <div className="text-xs text-gray-500 md:text-sm">
                        <span className="md:hidden font-bold text-gray-400">Cách cũ: </span>
                        {row.traditional}
                      </div>
                      <div className="text-xs font-bold text-[#1E7444] md:text-sm flex items-center gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3A8157] text-white text-[12px]">
                          ✓
                        </span>
                        <span>{row.pentava}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* CTA SECTION */}
        <Reveal>
          <section className="mx-auto max-w-[1240px] px-6 py-20 md:py-24 md:px-8">
            <div className="relative overflow-hidden rounded-[32px] border-2 border-black bg-[#8B63F6] p-8 md:p-14 text-white">
              <div className="relative z-10 max-w-2xl space-y-6">
                <span className="inline-block rounded-full bg-white/20 backdrop-blur-md px-4 py-1 text-xs font-black uppercase tracking-wider">
                  BẮT ĐẦU TUẦN MỚI
                </span>
                <h2 className="text-3xl font-black md:text-5xl leading-tight">
                  Sẵn sàng trở thành nhân vật chính trong bộ phim của mình?
                </h2>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  Tải ngay ứng dụng PENTAVA trên iOS và Android để bắt đầu ghi lại từng thước phim quý giá về hành trình hoàn thiện bản thân.
                </p>
                <div className="pt-2">
                  <Link
                    to="/download"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#FFC857] px-8 py-4 font-black text-black transition-all hover:bg-white"
                  >
                    <span>Tải App &amp; Trải Nghiệm Cinema</span>
                    <span className="material-symbols-outlined text-[18px]">
                      arrow_forward
                    </span>
                  </Link>
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