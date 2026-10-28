import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import Reveal from "../components/common/Reveal"
import { motion, AnimatePresence } from "motion/react"

const culturePillars = [
  {
    icon: "sentiment_satisfied",
    title: "Không Leaderboard độc hại",
    desc: "PENTAVA nói không với bảng xếp hạng ganh đua thứ hạng. Bạn không cần phải so sánh bản thân với bất kỳ ai khác.",
    color: "#3A8157",
  },
  {
    icon: "handshake",
    title: "High-Five tiếp sức",
    desc: "Thay thế nút like ảo bằng những cái đập tay chân thành để chúc mừng nỗ lực hoàn thành routine của đồng đội.",
    color: "#FFC857",
  },
  {
    icon: "spa",
    title: "Nhịp thở an lành",
    desc: "Lỡ đứt chuỗi streak? Đừng lo lắng. Cộng đồng luôn ở đây để giúp bạn hít thở sâu và quay lại nhịp sống mà không phán xét.",
    color: "#529CFF",
  },
  {
    icon: "verified_user",
    title: "Visual Logs người thật",
    desc: "100% hình ảnh check-in thực tế mỗi ngày từ thói quen sinh hoạt, không filtered, không flex ảo, chân thực và gần gũi.",
    color: "#8B63F6",
  },
]

const feedData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    author: "Thanh Hằng",
    tribe: "Tổ đội Dậy Sớm 5:30",
    time: "20 phút trước",
    caption: "Buổi sáng thứ 14 liên tục thức dậy ngắm bình minh và yoga 20 phút. Tâm trí tĩnh lặng và tập trung hơn rất nhiều! 🌱",
    tag: "#Energy30",
    highFives: 42,
    avatarColor: "#3A8157",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    author: "Minh Quân",
    tribe: "Tổ đội Đọc Sách Sâu",
    time: "1 giờ trước",
    caption: "Hoàn thành 30 trang sách 'Atomic Habits' trước giờ đi ngủ. Tắt điện thoại sớm là quyết định sáng suốt nhất tháng này.",
    tag: "#Mindful",
    highFives: 38,
    avatarColor: "#529CFF",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
    author: "Thảo Vy",
    tribe: "Tổ đội Eat Clean",
    time: "3 giờ trước",
    caption: "Hôm nay tự chuẩn bị salad ức gà và sinh tố xanh cho bữa trưa. Nhỏ thôi nhưng giữ routine này 2 tuần rồi nè!",
    tag: "#HealthyEat",
    highFives: 55,
    avatarColor: "#FFC857",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    author: "Đức Anh",
    tribe: "Tổ đội Deep Work",
    time: "Hôm qua",
    caption: "Khung giờ Pomodoro 90 phút buổi sáng không thông báo MXH. Hoàn thành toàn bộ task tuần sớm hơn dự kiến.",
    tag: "#DeepWork",
    highFives: 29,
    avatarColor: "#8B63F6",
  },
]

const tribeList = [
  {
    name: "Tổ đội Ban Mai 5:30",
    focus: "Thức dậy sớm & Vận động nhẹ",
    members: "5/5 thành viên",
    streak: "18 ngày đồng hành",
    color: "#FFC857",
    icon: "wb_sunny",
  },
  {
    name: "Tổ đội Mindful Readers",
    focus: "Đọc sách 30 phút mỗi tối",
    members: "4/5 thành viên",
    streak: "24 ngày đồng hành",
    color: "#529CFF",
    icon: "menu_book",
  },
  {
    name: "Tổ đội Healthy Kitchen",
    focus: "Tự nấu ăn lành mạnh & Uống đủ nước",
    members: "5/5 thành viên",
    streak: "12 ngày đồng hành",
    color: "#3A8157",
    icon: "eco",
  },
]

export default function Community() {
  const [activeTag, setActiveTag] = useState("ALL")
  const [claps, setClaps] = useState<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  })
  const [floatingClaps, setFloatingClaps] = useState<Array<{ id: number; postId: number }>>([])

  const handleClap = (id: number) => {
    setClaps((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }))

    const particleId = Date.now() + Math.random()
    setFloatingClaps((prev) => [...prev, { id: particleId, postId: id }])

    setTimeout(() => {
      setFloatingClaps((prev) => prev.filter((p) => p.id !== particleId))
    }, 900)
  }

  const filteredFeed =
    activeTag === "ALL"
      ? feedData
      : feedData.filter((item) => item.tag === activeTag)

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F7FAFF] pt-32 text-black lg:pt-28">
        {/* HERO SECTION CHUẨN PENTAVA */}
        <Reveal>
          <section className="mx-auto max-w-[1240px] px-6 py-16 text-center md:px-8 md:py-24">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D9D9D9] bg-white px-4 py-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3A8157] text-white">
                <span className="material-symbols-outlined text-[16px]">
                  groups
                </span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#3A8157]">
                PENTAVA COMMUNITY &amp; TRIBE
              </span>
            </div>

            <h1 className="mx-auto mt-8 max-w-5xl font-extrabold tracking-tight text-black">
              <span className="mb-4 block text-[32px] leading-none text-[#727272] md:text-[44px]">
                Kỷ luật tự giác nhưng
              </span>

              <span className="relative inline-block rotate-[-1deg] rounded-[24px] bg-[#FFC857] px-6 py-3 text-[42px] leading-none tracking-[-0.05em] text-black md:px-8 md:py-4 md:text-[76px]">
                không hề cô độc
              </span>

              <span className="mt-7 block text-[32px] leading-[1.12] text-[#3A8157] md:text-[50px]">
                Đồng hành tử tế – Tiếp sức bằng cảm hứng
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#727272] md:text-lg">
              PENTAVA xây dựng cộng đồng nhóm nhỏ văn minh. Không có bảng xếp hạng ganh đua, không áp lực streak độc hại. Chúng ta tiếp sức cho nhau bằng những cái đập tay chân thật.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/download"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#3A8157] px-8 py-4 font-bold text-white transition-all hover:-translate-y-1 hover:bg-[#2f6a47]"
              >
                <span className="material-symbols-outlined text-[20px]">
                  group_add
                </span>
                <span>Tham gia Tổ Đội trên App</span>
              </Link>

              <a
                href="#feed"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#D9D9D9] bg-white px-7 py-4 font-bold text-gray-700 transition-all hover:border-[#3A8157] hover:text-[#3A8157]"
              >
                <span>Xem Visual Logs hôm nay</span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_downward
                </span>
              </a>
            </div>
          </section>
        </Reveal>

        {/* 4 TRỤ CỘT VĂN HÓA CỘNG ĐỒNG */}
        <Reveal>
          <section className="border-t border-[#D9D9D9] bg-white py-20 md:py-28">
            <div className="mx-auto max-w-[1240px] px-6 md:px-8">
              <div className="mx-auto mb-16 max-w-2xl text-center">
                <span className="inline-block rounded-full bg-[#3A8157]/10 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#3A8157]">
                  VĂN HÓA TIẾP SỨC
                </span>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl text-black">
                  4 Nguyên tắc xây dựng không gian an lành
                </h2>
                <p className="mt-3 text-sm text-[#727272] md:text-base">
                  Mỗi người có một nhịp sinh học và quỹ đạo sống riêng. PENTAVA tôn trọng sự tiến bộ của bạn theo cách nhẹ nhàng nhất.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {culturePillars.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col justify-between rounded-[26px] border border-[#D9D9D9] bg-[#F7FAFF] p-7 transition-all hover:-translate-y-2"
                  >
                    <div>
                      <div
                        className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                        style={{ backgroundColor: item.color }}
                      >
                        <span className="material-symbols-outlined text-2xl">
                          {item.icon}
                        </span>
                      </div>
                      <h3 className="mb-2 text-lg font-black text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-6 text-[#727272]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* MÔ HÌNH TỔ ĐỘI MICRO-TRIBE (3 - 5 NGƯỜI) */}
        <Reveal>
          <section className="mx-auto max-w-[1240px] px-6 py-20 md:py-28 md:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <span className="inline-block rounded-full bg-[#529CFF]/15 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#529CFF]">
                  MICRO-TRIBE EXPERIENCE
                </span>

                <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl text-black">
                  Tổ đội 3 - 5 người: <br />
                  <span className="text-[#3A8157]">Nhỏ gọn, thân thiết, không phán xét</span>
                </h2>

                <p className="text-base leading-relaxed text-[#727272]">
                  Nghiên cứu khoa học chỉ ra rằng con người duy trì thói quen tốt nhất khi có từ 3 đến 5 người bạn cùng chí hướng. Trong PENTAVA Tribe:
                </p>

                <div className="space-y-3.5">
                  <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#3A8157] text-white">
                      ✓
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Check-in cùng một mục tiêu</h4>
                      <p className="text-xs text-[#727272]">Mỗi thành viên đăng ảnh xác thực routine mỗi sáng/tối.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#FFC857] text-black">
                      ✋
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Đập tay High-Five tiếp sức</h4>
                      <p className="text-xs text-[#727272]">Chỉ 1 chạm để gửi lời động viên cho bạn cùng nhóm khi họ hoàn thành nhiệm vụ.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#8B63F6] text-white">
                      🎬
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Weekly Tribe Capsule</h4>
                      <p className="text-xs text-[#727272]">Cuối tuần, cả nhóm nhận được thước phim ghép chung ghi dấu hành trình của cả team.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cột phải: Thẻ demo Tổ đội */}
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Tổ đội đang hoạt động tích cực:
                </p>

                {tribeList.map((tribe) => (
                  <div
                    key={tribe.name}
                    className="flex items-center justify-between rounded-[24px] border-2 border-black bg-white p-6 transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl text-black"
                        style={{ backgroundColor: tribe.color }}
                      >
                        <span className="material-symbols-outlined text-2xl">
                          {tribe.icon}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-base font-black text-gray-900">
                          {tribe.name}
                        </h3>
                        <p className="text-xs text-[#727272]">{tribe.focus}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-[#1E7444]">
                        {tribe.streak}
                      </span>
                      <p className="mt-1 text-[11px] text-gray-400">{tribe.members}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* VISUAL COMMUNITY FEED */}
        <Reveal>
          <section id="feed" className="border-t border-[#D9D9D9] bg-white py-20 md:py-28">
            <div className="mx-auto max-w-[1240px] px-6 md:px-8">
              <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#8B63F6]">
                    VISUAL COMMUNITY FEED
                  </span>
                  <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl text-black">
                    Khoảnh khắc nỗ lực thật mỗi ngày
                  </h2>
                  <p className="mt-2 text-sm text-[#727272]">
                    Hình ảnh check-in thật từ những người trẻ đang nỗ lực chuyển biến lối sống từng ngày.
                  </p>
                </div>

                {/* Filter tags */}
                <div className="flex flex-wrap gap-2">
                  {["ALL", "#Energy30", "#Mindful", "#HealthyEat", "#DeepWork"].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setActiveTag(tag)}
                      className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${activeTag === tag
                        ? "bg-[#3A8157] text-white"
                        : "border border-gray-200 bg-white text-gray-700 hover:border-[#3A8157]"
                        }`}
                    >
                      {tag === "ALL" ? "Tất cả bài viết" : tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid Feed Cards */}
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
                {filteredFeed.map((post) => {
                  const currentClaps = claps[post.id] || 0
                  return (
                    <motion.div
                      key={post.id}
                      whileHover={{ y: -6 }}
                      className="flex flex-col justify-between overflow-hidden rounded-[26px] border border-[#D9D9D9] bg-[#F7FAFF] transition-all hover:border-[#3A8157]"
                    >
                      <div>
                        {/* Header bài đăng */}
                        <div className="p-4 flex items-center justify-between border-b border-gray-200 bg-white">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="flex h-8 w-8 items-center justify-center rounded-full text-white text-xs font-black"
                              style={{ backgroundColor: post.avatarColor }}
                            >
                              {post.author.charAt(0)}
                            </div>
                            <div>
                              <p className="text-xs font-extrabold text-gray-900 leading-none">
                                {post.author}
                              </p>
                              <p className="text-[10px] text-gray-400 mt-0.5">{post.tribe}</p>
                            </div>
                          </div>
                          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-[#1E7444]">
                            {post.tag}
                          </span>
                        </div>

                        {/* Ảnh bài viết */}
                        <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                          <img
                            src={post.image}
                            alt={post.caption}
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>

                        {/* Caption */}
                        <div className="p-4">
                          <p className="text-xs font-medium text-gray-700 leading-relaxed line-clamp-3">
                            {post.caption}
                          </p>
                        </div>
                      </div>

                      {/* Footer đập tay tiếp sức */}
                      <div className="p-4 pt-0">
                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <span className="text-[11px] text-gray-400">{post.time}</span>

                          {/* Nút đập tay + hiệu ứng +1 bay lên */}
                          <div className="relative inline-flex items-center">
                            <AnimatePresence>
                              {floatingClaps
                                .filter((item) => item.postId === post.id)
                                .map((item) => (
                                  <motion.span
                                    key={item.id}
                                    initial={{ opacity: 0, y: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, y: -28, scale: 3.15 }}
                                    exit={{ opacity: 0, y: -42, scale: 0.8 }}
                                    transition={{ duration: 0.65, ease: "easeOut" }}
                                    className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 z-20 flex select-none items-center gap-1 px-2 py-0.5 text-[11px] font-black text-white"
                                  >
                                    <span>✋</span>
                                  </motion.span>
                                ))}
                            </AnimatePresence>

                            <motion.button
                              whileTap={{ scale: 0.92 }}
                              whileHover={{ scale: 1.04 }}
                              type="button"
                              onClick={() => handleClap(post.id)}
                              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black transition-all cursor-pointer ${currentClaps > 0
                                ? "bg-[#3A8157] text-white"
                                : "bg-[#FFC857] text-black hover:bg-[#ffe082]"
                                }`}
                            >
                              <span className="material-symbols-outlined text-[15px]">
                                {currentClaps > 0 ? "volunteer_activism" : "pan_tool"}
                              </span>
                              <span>{currentClaps} đập tay</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </section>
        </Reveal>

        {/* CTA SECTION */}
        <Reveal>
          <section className="mx-auto max-w-[1240px] px-6 py-20 md:py-24 md:px-8">
            <div className="relative overflow-hidden rounded-[32px] border-2 border-black bg-[#3A8157] p-8 md:p-14 text-white">
              <div className="relative z-10 max-w-2xl space-y-6">
                <span className="inline-block rounded-full bg-white/20 backdrop-blur-md px-4 py-1 text-xs font-black uppercase tracking-wider">
                  THỬ THÁCH 30 NGÀY NĂNG LƯỢNG
                </span>
                <h2 className="text-3xl font-black md:text-5xl leading-tight">
                  Cùng nhau bắt đầu hành trình chuyển hóa bản thân ngay hôm nay!
                </h2>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  Gia nhập một tổ đội 3-5 người trên ứng dụng PENTAVA để được đồng hành, nhắc nhở và chúc mừng mỗi khi bạn hoàn thành routine.
                </p>
                <div className="pt-2">
                  <Link
                    to="/download"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#FFC857] px-8 py-4 font-black text-black transition-all hover:bg-white"
                  >
                    <span>Tải App &amp; Tham Gia Tổ Đội</span>
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