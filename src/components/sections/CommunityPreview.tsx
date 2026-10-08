import { useState } from "react"
import { motion } from "motion/react"
import ScrambleText from "../common/ScrambleText"
import { NumberTicker, ActivityTicker } from "../common/Ticker"

const liveActivities = [
  "🔥 Tuấn vừa hoàn thành ngày 21 thử thách #ENERGY30",
  "🙌 Nhóm 'Nhịp Sống Xanh' vừa gửi 5 High-fives cho nhau",
  "📸 Mai vừa check-in visual log: 15p thiền sáng",
  "🌿 98% thành viên giữ vững routine hôm nay",
  "🎉 Hoàng vừa tạo Weekly Capsule thành công",
  "✨ An gửi lời động viên: 'Cùng cố gắng nhé cả nhà!'",
]

interface CommunityCardData {
  tag: string
  badge: string
  title: string
  desc: string
  statValue: number
  statLabel: string
  reactionInitial: number
  reactionIcon: string
  color: string
  shadowColor: string
}

const communityCards: CommunityCardData[] = [
  {
    tag: "#ENERGY30",
    badge: "Thử thách nổi bật",
    title: "Thử thách năng lượng 30 ngày",
    desc: "Mỗi ngày một hành động nhỏ để tăng mood, giữ vững routine và nhìn thấy sự tiến bộ rõ nét của bản thân.",
    statValue: 1240,
    statLabel: "bạn trẻ đang tham gia",
    reactionInitial: 482,
    reactionIcon: "local_fire_department",
    color: "#FFC857",
    shadowColor: "#FFC857",
  },
  {
    tag: "VISUAL LOG",
    badge: "Check-in sáng tạo",
    title: "Nhật ký hành trình bằng ảnh & video",
    desc: "Ảnh thật và mood log giúp bạn nhìn thấy sự kiên trì của chính mình theo thời gian thay vì các con số vô cảm.",
    statValue: 4850,
    statLabel: "khoảnh khắc đã lưu giữ",
    reactionInitial: 890,
    reactionIcon: "photo_camera",
    color: "#529CFF",
    shadowColor: "#529CFF",
  },
  {
    tag: "BALANCE",
    badge: "Đồng hành tử tế",
    title: "Kỷ luật không gượng ép",
    desc: "Tiến bộ theo nhịp sinh học riêng nhưng luôn được nhóm nhỏ tiếp sức đúng lúc bằng những cái đập tay chân thành.",
    statValue: 98,
    statLabel: "% giữ nhịp không bỏ cuộc",
    reactionInitial: 620,
    reactionIcon: "spa",
    color: "#3A8157",
    shadowColor: "#3A8157",
  },
]

export default function CommunityPreview() {
  const [reactions, setReactions] = useState<{ [key: string]: number }>({
    "#ENERGY30": 482,
    "VISUAL LOG": 890,
    BALANCE: 620,
  })

  const [hasInteracted, setHasInteracted] = useState<{ [key: string]: boolean }>({})

  const handleClap = (tag: string) => {
    setReactions((prev) => ({
      ...prev,
      [tag]: prev[tag] + 1,
    }))
    setHasInteracted((prev) => ({
      ...prev,
      [tag]: true,
    }))
  }

  return (
    <section id="community" className="mx-auto max-w-[1240px] px-6 py-24 md:py-32 md:px-8 scroll-mt-24">
      {/* Header section với ScrambleText */}
      <div className="mb-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#E8F3EC] px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#3A8157] shadow-[3px_3px_0px_0px_#FFC857]">
          <span className="h-2 w-2 rounded-full bg-[#3A8157] animate-pulse" />
          <ScrambleText text="PENTAVA COMMUNITY" scrambleSpeed={30} />
        </div>

        <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-black md:text-5xl">
          Kỷ luật tự giác nhưng{" "}
          <span className="relative inline-block text-[#3A8157]">
            không bao giờ cô độc.
            <span className="absolute -bottom-1 left-0 right-0 h-3 rounded-full bg-[#FFC857]/50 -z-10" />
          </span>
        </h2>

        <p className="mt-4 text-base leading-relaxed text-[#727272]">
          PENTAVA kiến tạo không gian nhóm nhỏ văn minh, nơi mọi người tiếp sức cho nhau bằng high-five, visual log truyền cảm hứng và thử thách nhẹ nhàng thay vì so kè thứ hạng.
        </p>
      </div>

      {/* THE TICKER: Dòng hoạt động cộng đồng trực tiếp */}
      <div className="mb-12 rounded-2xl border-2 border-black bg-[#F7FAFF] p-3 shadow-[4px_4px_0px_0px_#3A8157]">
        <div className="flex items-center gap-3 px-3">
          <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#3A8157] shrink-0">
            <span className="material-symbols-outlined text-base animate-pulse">sensors</span>
            Trực tiếp:
          </span>
          <ActivityTicker items={liveActivities} speed={28} className="flex-1" />
        </div>
      </div>

      {/* Grid 3 Thẻ Cộng Đồng Tương Tác */}
      <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
        {communityCards.map((card) => (
          <article
            key={card.tag}
            className="group relative flex flex-col justify-between rounded-3xl border-2 border-black bg-white p-7 md:p-8 shadow-[6px_6px_0px_0px_#3A8157] transition-all"
          >
            <div>
              {/* Header thẻ: ScrambleText Tag + Category Badge */}
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-full bg-[#8B63F6]/10 border border-[#8B63F6]/30 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#8B63F6]">
                  <ScrambleText text={card.tag} scrambleSpeed={40} />
                </span>
                <span className="rounded-full border border-black/10 bg-[#F7FAFF] px-2.5 py-0.5 text-[10px] font-bold text-[#727272]">
                  {card.badge}
                </span>
              </div>

              {/* Tiêu đề & mô tả */}
              <h3 className="text-xl md:text-2xl font-black text-black group-hover:text-[#3A8157] transition-colors">
                {card.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#727272]">
                {card.desc}
              </p>

              {/* Number Ticker: Chỉ số cộng đồng trực quan */}
              <div className="mt-6 rounded-2xl border border-black/10 bg-[#F7FAFF] p-4">
                <p className="text-2xl font-black text-[#3A8157]">
                  <NumberTicker
                    value={card.statValue}
                    suffix={card.tag === "BALANCE" ? "%" : "+"}
                  />
                </p>
                <p className="text-xs font-semibold text-[#727272] mt-0.5">
                  {card.statLabel}
                </p>
              </div>
            </div>

            {/* Footer thẻ: Nút High-five tương tác với animation */}
            <div className="mt-7 flex items-center justify-between border-t border-black/10 pt-5">
              <span className="text-xs font-bold text-[#727272]">
                Đồng hành tích cực
              </span>

              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleClap(card.tag)}
                className={`flex items-center gap-1.5 rounded-full border-2 border-black px-4 py-2 text-xs font-black transition-colors cursor-pointer ${
                  hasInteracted[card.tag]
                    ? "bg-[#3A8157] text-white shadow-[2px_2px_0px_0px_#FFC857]"
                    : "bg-[#FFC857] text-black shadow-[2px_2px_0px_0px_#3A8157] hover:bg-[#ffe082]"
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {hasInteracted[card.tag] ? "favorite" : "volunteer_activism"}
                </span>
                <span>High-five ({reactions[card.tag]})</span>
              </motion.button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
