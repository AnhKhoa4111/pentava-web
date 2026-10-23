import { useState } from "react"
import { Link } from "react-router-dom"
import { Heart, MessageCircle, ArrowRight, Sparkles } from "lucide-react"

export default function CommunityPreview() {
  const [likes, setLikes] = useState(124)
  const [hasLiked, setHasLiked] = useState(false)

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1)
      setHasLiked(true)
    } else {
      setLikes((prev) => prev - 1)
      setHasLiked(false)
    }
  }

  return (
    <section id="community" className="relative bg-[#F7FAFF] py-20 md:py-28 scroll-mt-20 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-6 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">

          {/* CỘT TRÁI: Tiêu đề & Thông điệp cộng đồng */}
          <div className="space-y-6">
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-[#1E7444]">
              CỘNG ĐỒNG
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black leading-tight tracking-tight text-gray-900">
              Cùng nhau lan tỏa{" "}
              <span className="text-[#1E7444]">phiên bản tốt hơn.</span>
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-gray-600">
              Chia sẻ hành trình, truyền cảm hứng và nhận động lực từ những người bạn cùng chí hướng. Bởi vì phát triển bản thân sẽ ý nghĩa hơn rất nhiều khi có cộng đồng đồng hành.
            </p>

            <div className="pt-2">
              <Link
                to="/feature/solution"
                className="inline-flex items-center gap-2 rounded-full bg-[#1E7444] px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#165a34] hover:scale-105 active:scale-95 shadow-md"
              >
                <span>Khám phá cộng đồng</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* CỘT PHẢI: Card bài viết cộng đồng & Chú mèo mascot */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px]">

              {/* Thẻ bài viết check-in cộng đồng (Social Feed Card) */}
              <div className="relative z-10 rounded-3xl border border-gray-100 bg-white p-5 shadow-xl transition-all duration-300">
                {/* Người đăng */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                      alt="Kelly Avatar"
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-emerald-500/20"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-bold text-gray-900">Kelly</p>
                        <span className="text-xs">✨</span>
                      </div>
                      <p className="text-[11px] text-gray-400">2 giờ trước</p>
                    </div>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-[#1E7444]">
                    #Energy30
                  </span>
                </div>

                {/* Nội dung status */}
                <p className="mt-3 text-xs sm:text-sm font-medium text-gray-800 leading-relaxed">
                  Buổi sáng hôm nay thật tuyệt! 🌱 5 km run, big changes 💚
                </p>

                {/* Ảnh bài viết thiên nhiên */}
                <div className="mt-3 overflow-hidden rounded-2xl aspect-[16/10] bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
                    alt="Morning Run"
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Tương tác thả tim & bình luận */}
                <div className="mt-4 flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={handleLike}
                      className="flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Heart
                        className={`h-4 w-4 transition-all ${hasLiked
                          ? "fill-rose-500 text-rose-500 scale-110"
                          : "text-gray-400 hover:text-rose-500"
                          }`}
                      />
                      <span className={hasLiked ? "text-rose-600" : "text-gray-600"}>
                        {likes}
                      </span>
                    </button>

                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
                      <MessageCircle className="h-4 w-4 text-gray-400" />
                      <span>32</span>
                    </div>
                  </div>

                  <div className="flex items-center -space-x-1.5">
                    <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-amber-200 text-[10px] font-bold flex items-center justify-center">
                      🌿
                    </span>
                    <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-purple-200 text-[10px] font-bold flex items-center justify-center">
                      💪
                    </span>
                    <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-rose-200 text-[10px] font-bold flex items-center justify-center">
                      🔥
                    </span>
                  </div>
                </div>
              </div>

              {/* Huy hiệu tiếp sức */}
              <div className="absolute -bottom-4 right-4 z-20 hidden sm:flex items-center">
                <div className="rounded-full border border-emerald-200/80 bg-white px-3.5 py-1.5 text-[11px] font-bold text-[#1E7444] shadow-md backdrop-blur-md flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Cùng tiến bộ mỗi ngày! 🌿</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
