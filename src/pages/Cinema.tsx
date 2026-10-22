import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import { Play, ShieldCheck, Film, Calendar, Camera } from "lucide-react"

export default function Cinema() {
  const highlights = [
    {
      icon: Camera,
      color: "bg-purple-100 text-[#8B63F6]",
      title: "Visual Verification",
      desc: "Mỗi hành động hoàn thành routine được xác thực qua hình ảnh thực tế, lưu giữ từng khoảnh khắc nỗ lực mỗi ngày.",
    },
    {
      icon: Calendar,
      color: "bg-amber-100 text-amber-600",
      title: "Weekly Capsule",
      desc: "Tổng hợp nỗ lực trong 7 ngày thành một thước phim ngắn gọn, giúp bạn nhìn thấy sự thay đổi rõ rệt qua từng tuần.",
    },
    {
      icon: Film,
      color: "bg-emerald-100 text-[#1E7444]",
      title: "Cinematic Recap 4K",
      desc: "Trí tuệ nhân tạo tự động cắt ghép, đồng bộ âm nhạc và hiệu ứng điện ảnh biến hành trình của bạn thành tác phẩm nghệ thuật.",
    },
    {
      icon: ShieldCheck,
      color: "bg-sky-100 text-sky-600",
      title: "Bảo mật & Riêng tư",
      desc: "Toàn bộ hình ảnh và video cá nhân được mã hóa an toàn, bạn hoàn toàn chủ động quyết định chia sẻ hay giữ riêng cho mình.",
    },
  ]

  return (
    <>
      <Header />

      <main className="bg-[#F7FAFF] pt-28 text-gray-900">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="mx-auto max-w-[1240px] px-6 md:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Cột trái: Giới thiệu */}
              <div className="space-y-6">
                <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-[#8B63F6]">
                  PENTA-CINEMA
                </p>

                <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  Bộ phim điện ảnh về{" "}
                  <span className="text-[#1E7444]">hành trình tiến bộ</span>{" "}
                  của bạn.
                </h1>

                <p className="max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
                  Tính năng độc quyền biến những hình ảnh check-in hằng ngày và thước phim Weekly Capsule thành cuốn phim tua nhanh Cinematic Recap đầy cảm xúc. Bạn chính là nhân vật chính trong câu chuyện phát triển của cuộc đời mình.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.pentava&hl=vi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#1E7444] px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#165a34] hover:scale-105 active:scale-95 shadow-md"
                  >
                    <Play className="h-4 w-4 fill-white" />
                    <span>Trải nghiệm ngay</span>
                  </a>
                  <a
                    href="#details"
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Tìm hiểu thêm
                  </a>
                </div>
              </div>

              {/* Cột phải: Khung xem trước Cinema */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[340px] rounded-[36px] border border-gray-200 bg-white p-4 shadow-xl">
                  <div className="relative aspect-[9/14] overflow-hidden rounded-[28px] bg-gradient-to-b from-gray-900 to-gray-800">
                    <img
                      src="/image/pentava-web-cinema.png"
                      alt="PENTA-CINEMA preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        // Fallback nếu ảnh không tồn tại
                        e.currentTarget.style.display = "none"
                      }}
                    />

                    {/* Overlay info */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 text-white">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-purple-500/80 px-2.5 py-0.5 text-[10px] font-bold uppercase backdrop-blur-sm">
                          Ep 12 • Tháng 10
                        </span>
                        <span className="text-xs text-white/80">3:24 min</span>
                      </div>
                      <p className="mt-2 text-sm font-bold">Thói quen kỷ luật &amp; Chạy bộ ban mai</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILS SECTION */}
        <section id="details" className="border-t border-gray-200/60 bg-white py-20 md:py-28">
          <div className="mx-auto max-w-[1240px] px-6 md:px-8">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-wider text-[#8B63F6]">
                GIÁ TRỊ CỐT LÕI
              </span>
              <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                Tại sao bạn sẽ yêu thích PENTA-CINEMA?
              </h2>
              <p className="mt-4 text-base text-gray-600">
                Thay vì những bảng thống kê khô khan, PENTAVA mang lại trải nghiệm thị giác sống động, tiếp thêm động lực mỗi ngày.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {highlights.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-between rounded-3xl border border-gray-100 bg-[#F7FAFF] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div>
                      <div className={`mb-6 flex h-13 w-13 items-center justify-center rounded-2xl ${item.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-gray-900">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}