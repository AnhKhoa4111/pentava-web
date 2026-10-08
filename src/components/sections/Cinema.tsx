import { motion } from "motion/react"

export default function Cinema() {
  return (
    <section id="cinema" className="border-y-2 border-black/10 bg-white py-24 scroll-mt-24">
      <div className="mx-auto grid max-w-[1220px] grid-cols-1 items-center gap-12 px-6 md:px-8 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex rounded-full bg-[#8B63F6] px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-[3px_3px_0px_0px_#529CFF]">
            PENTA-CINEMA
          </span>
          <h2 className="mt-6 max-w-3xl text-[36px] font-extrabold leading-tight md:text-[56px]">
            Biến hành trình phát triển thành một thước phim đáng nhớ.
          </h2>
          <p className="mt-6 max-w-[620px] text-base leading-8 text-[#727272]">
            PENTA-CINEMA dùng ảnh Visual Verification, mood log và Weekly Capsule để tạo cinematic recap. Bạn sẽ nhìn lại nỗ lực của chính mình bằng sự tự hào và xúc động, thay vì chỉ là những con số khô khan.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-2xl border-2 border-black bg-[#F7FAFF] px-4 py-3 text-xs font-black text-black shadow-[3px_3px_0px_0px_#8B63F6]">
              <span className="material-symbols-outlined text-[18px] text-[#8B63F6]">
                smart_display
              </span>
              Recap tự động hằng tuần
            </div>
            <div className="flex items-center gap-2 rounded-2xl border-2 border-black bg-[#F7FAFF] px-4 py-3 text-xs font-black text-black shadow-[3px_3px_0px_0px_#FFC857]">
              <span className="material-symbols-outlined text-[18px] text-[#FFC857]">
                lock
              </span>
              Hoàn toàn riêng tư
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -5 }}
          className="rounded-3xl border-2 border-black bg-[#F7FAFF] p-4 shadow-[12px_12px_0px_0px_#FFC857] transition-all"
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#3A8157] lg:aspect-[4/3] group border border-black/10">
            <img
              src="/image/pentava-web-cinema.png"
              alt="PENTA-CINEMA preview"
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-black bg-white text-black shadow-lg">
                <span className="material-symbols-outlined text-3xl">play_arrow</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
