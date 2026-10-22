export default function Cinema() {
  return (
    <section
      id="cinema"
      className="relative py-20 md:py-28 scroll-mt-20 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.3) 100%), url('/image/hero-bg-meadow.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto max-w-[1240px] px-6 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">

          {/* CỘT TRÁI: Nội dung giới thiệu PENTA-CINEMA */}
          <div className="space-y-6 z-10">
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-[#8B63F6]">
              PENTA-CINEMA
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black leading-tight tracking-tight text-gray-900">
              Biến hành trình phát triển thành một{" "}
              <span className="text-[#1E7444]">thước phim đáng nhớ.</span>
            </h2>

            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-gray-700">
              PENTA-CINEMA dùng ảnh Visual Verification, mood log và Weekly Capsule để tạo cinematic recap. Bạn sẽ nhìn lại nỗ lực của chính mình bằng sự tự hào và xúc động, thay vì chỉ là những con số khô khan.
            </p>
          </div>

          {/* CỘT PHẢI: Mockup điện thoại PENTA-CINEMA tinh tế & cân đối */}
          <div className="relative flex items-center justify-center">
            <div className="relative">

              {/* Khung điện thoại thông minh PENTA-CINEMA */}
              <div className="relative z-10 w-[250px] sm:w-[275px] md:w-[295px] h-[500px] sm:h-[530px] md:h-[560px] rounded-[44px] border-[7px] sm:border-[8px] border-[#1C2C24] bg-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col">
                {/* Màn hình app PENTA-CINEMA */}
                <div className="relative h-full w-full overflow-hidden bg-white">
                  <img
                    src="/image/pentava-web-cinema.png"
                    alt="PENTA-CINEMA App Screen"
                    className="h-full w-full object-contain object-top select-none pointer-events-none"
                    loading="lazy"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
