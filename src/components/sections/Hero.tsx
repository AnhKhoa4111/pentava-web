import { motion } from "motion/react"

const stats = [
  { value: "05", label: "Nhiệm vụ gợi ý mỗi ngày", tag: "Cân bằng", icon: "checklist", color: "#3A8157", shadow: "#3A8157" },
  { value: "02 phút", label: "Để tạo routine cá nhân đầu tiên", tag: "Nhanh gọn", icon: "timer", color: "#FFC857", shadow: "#FFC857" },
  { value: "01 app", label: "Cho habit, mood, journal & cộng đồng", tag: "Tất cả trong 1", icon: "all_inclusive", color: "#529CFF", shadow: "#529CFF" },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto grid min-h-[calc(100vh-76px)] max-w-[1220px] grid-cols-1 items-center gap-12 px-6 py-12 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-16"
    >
      {/* Cột nội dung trái */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-7"
      >
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#3A8157] shadow-[3px_3px_0px_0px_#FFC857] cursor-default"
        >
          <span className="h-2 w-2 rounded-full bg-[#3A8157] animate-pulse" />
          PENTAVA Ecosystem
        </motion.span>

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
          PENTAVA giúp người trẻ chăm sóc sức khỏe toàn diện, xây dựng routine cá nhân hóa 1 chạm và lưu lại hành trình tiến bộ bằng hình ảnh, video sinh động cùng cộng đồng tích cực.
        </p>

        {/* Nút hành động */}
        <div className="flex flex-wrap gap-4 pt-1">
          <motion.a
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            href="#download"
            className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#3A8157] px-7 py-4 font-extrabold text-white shadow-[4px_4px_0px_0px_#FFC857] hover:shadow-[6px_6px_0px_0px_#FFC857] transition-all"
          >
            <span className="material-symbols-outlined text-[21px]">download</span>
            Tải PENTAVA
          </motion.a>

          <motion.a
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            href="#solution"
            className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-7 py-4 font-extrabold text-[#529CFF] shadow-[4px_4px_0px_0px_#529CFF] hover:shadow-[6px_6px_0px_0px_#529CFF] transition-all"
          >
            <span className="material-symbols-outlined text-[21px]">auto_awesome</span>
            Xem giải pháp
          </motion.a>
        </div>

        {/* Thống kê nổi bật (Neo-brutalist Stats Cards) */}
        <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
          {stats.map((item, index) => (
            <motion.div
              key={item.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#3A8157] hover:shadow-[6px_6px_0px_0px_#FFC857] transition-all"
            >
              <div className="flex items-center justify-between">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 text-white shadow-sm"
                  style={{ backgroundColor: item.color }}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {item.icon}
                  </span>
                </span>
                <span className="rounded-full border border-black/10 bg-[#F7FAFF] px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#727272]">
                  {item.tag}
                </span>
              </div>
              <p className="mt-3 text-3xl font-black text-black group-hover:text-[#3A8157] transition-colors">
                {item.value}
              </p>
              <p className="mt-1 text-xs font-bold leading-5 text-[#727272]">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Cột hiển thị Mockup ứng dụng */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="lg:justify-self-end w-full"
      >
        <div className="relative mx-auto w-full max-w-[430px]">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-[36px] border-[4px] border-[#3A8157] bg-[#FFC857] p-3 shadow-[14px_14px_0px_0px_#529CFF]"
          >
            <div className="aspect-[1284/2121] w-full overflow-hidden rounded-[26px] border-2 border-white bg-white shadow-inner">
              <img
                src="/image/pentava-app-home.png"
                alt="Giao diện ứng dụng PENTAVA"
                className="h-full w-full object-contain"
              />
            </div>
          </motion.div>

          <motion.div
            animate={{ rotate: [6, 12, 6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-2 -top-5 rounded-2xl border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#8B63F6] md:-right-8 cursor-pointer"
          >
            <span className="material-symbols-outlined text-4xl text-[#8B63F6]">
              auto_awesome
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
