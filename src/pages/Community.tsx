import { useState } from "react"
import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import CommunityPreview from "../components/sections/CommunityPreview"
import { Heart, MessageCircle, Sparkles, Zap, Flame, Shield, ArrowRight } from "lucide-react"

const visualLogs = [
  {
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    author: "Kelly",
    time: "2 giờ trước",
    caption: "Buổi sáng hôm nay thật tuyệt! 🌱 5km run hoàn thành, nạp đầy năng lượng.",
    tag: "#Energy30",
    likes: 128,
  },
  {
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    author: "Minh Quân",
    time: "4 giờ trước",
    caption: "Ngày thứ 21 liên tục đọc sách 30 phút trước khi ngủ. Cảm giác tâm trí nhẹ nhàng hẳn.",
    tag: "#Mindful",
    likes: 95,
  },
  {
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
    author: "Thảo Vy",
    time: "Hôm qua",
    caption: "Bữa sáng dinh dưỡng tự chuẩn bị. Nhỏ thôi nhưng giữ routine này 2 tuần rồi nè!",
    tag: "#HealthyEat",
    likes: 142,
  },
  {
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    author: "Hoàng Long",
    time: "Hôm qua",
    caption: "Tập trung làm việc sâu 90 phút buổi sáng không điện thoại. Hiệu suất tăng gấp đôi.",
    tag: "#DeepWork",
    likes: 86,
  },
]

export default function Community() {
  const [likesState, setLikesState] = useState<Record<number, { count: number; liked: boolean }>>({
    0: { count: visualLogs[0].likes, liked: false },
    1: { count: visualLogs[1].likes, liked: false },
    2: { count: visualLogs[2].likes, liked: false },
    3: { count: visualLogs[3].likes, liked: false },
  })

  const toggleLike = (index: number) => {
    setLikesState((prev) => {
      const current = prev[index]
      if (current.liked) {
        return {
          ...prev,
          [index]: { count: current.count - 1, liked: false },
        }
      } else {
        return {
          ...prev,
          [index]: { count: current.count + 1, liked: true },
        }
      }
    })
  }

  const values = [
    {
      icon: Zap,
      color: "bg-amber-100 text-amber-600",
      tag: "#ENERGY30",
      title: "Thử thách năng lượng 30 ngày",
      desc: "Mỗi ngày một hành động nhỏ để tăng mood, duy trì thói quen và cảm nhận sự tiến bộ rõ rệt.",
    },
    {
      icon: Sparkles,
      color: "bg-purple-100 text-[#8B63F6]",
      tag: "#MINDFULNESS",
      title: "Chuyển stress thành cảm hứng",
      desc: "Những visual logs chia sẻ hành trình phục hồi tinh thần, giúp bạn tìm lại điểm tựa bình yên.",
    },
    {
      icon: Flame,
      color: "bg-rose-100 text-rose-600",
      tag: "#VISUALCHECKIN",
      title: "Check-in sáng tạo mỗi ngày",
      desc: "Hình ảnh và mood log thực tế biến thói quen hằng ngày thành những cột mốc giàu cảm xúc.",
    },
    {
      icon: Shield,
      color: "bg-emerald-100 text-[#1E7444]",
      tag: "#KỶLUẬTTÍCHCỰC",
      title: "Kỷ luật thông minh, không gượng ép",
      desc: "Không ép chạy đua leaderboard. Bạn tiến bộ theo nhịp riêng nhưng luôn có cộng đồng tiếp sức.",
    },
  ]

  return (
    <>
      <Header />

      <main className="bg-white pt-28 text-gray-900">
        <CommunityPreview />

        {/* CÁC TRỤ CỘT CỘNG ĐỒNG */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1240px] px-6 md:px-8">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-wider text-[#1E7444]">
                VĂN HÓA KẾT NỐI
              </span>
              <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                Không gian kỷ luật an lành &amp; truyền cảm hứng
              </h2>
              <p className="mt-3 text-base text-gray-600">
                PENTAVA hướng tới một môi trường văn minh, tôn trọng nhịp điệu riêng của từng thành viên.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <span className="text-[11px] font-bold text-gray-400">{item.tag}</span>
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

        {/* VISUAL COMMUNITY FEED */}
        <section id="feed" className="border-t border-gray-200/60 bg-white py-20 md:py-28">
          <div className="mx-auto max-w-[1240px] px-6 md:px-8">
            <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-[#8B63F6]">
                  Visual Community Feed
                </p>
                <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                  Khoảnh khắc nỗ lực thực tế
                </h2>
                <p className="mt-2 text-base text-gray-600">
                  Visual logs được chia sẻ trực tiếp từ những người dùng đang thay đổi từng ngày.
                </p>
              </div>

              <a
                href="https://play.google.com/store/apps/details?id=com.pentava&hl=vi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#1E7444] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#165a34] hover:scale-105 shadow-sm"
              >
                <span>Xem trên App PENTAVA</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Grid 4 bài feed */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {visualLogs.map((post, index) => {
                const currentLikes = likesState[index] || { count: post.likes, liked: false }

                return (
                  <div
                    key={index}
                    className="flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-[#F7FAFF] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    {/* Header tác giả */}
                    <div className="p-4 flex items-center justify-between border-b border-gray-100/80 bg-white">
                      <div>
                        <p className="text-xs font-bold text-gray-900">{post.author}</p>
                        <p className="text-[10px] text-gray-400">{post.time}</p>
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

                    {/* Nội dung caption */}
                    <div className="flex-1 p-4 flex flex-col justify-between space-y-3 bg-white">
                      <p className="text-xs font-medium text-gray-700 leading-relaxed line-clamp-3">
                        {post.caption}
                      </p>

                      {/* Nút Like & Comment */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => toggleLike(index)}
                          className="flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                        >
                          <Heart
                            className={`h-4 w-4 transition-colors ${
                              currentLikes.liked
                                ? "fill-rose-500 text-rose-500"
                                : "text-gray-400 hover:text-rose-500"
                            }`}
                          />
                          <span className={currentLikes.liked ? "text-rose-600" : "text-gray-600"}>
                            {currentLikes.count}
                          </span>
                        </button>

                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>Chia sẻ</span>
                        </div>
                      </div>
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