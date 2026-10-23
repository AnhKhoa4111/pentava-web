export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] w-full overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 flex items-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0) 80%, rgba(247, 250, 255, 0.6) 100%), url('/image/nature-lake-bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center 20%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto max-w-[1240px] px-6 md:px-8 w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">

          {/* CỘT TRÁI: Tiêu đề & Kêu gọi hành động */}
          <div className="space-y-6 md:space-y-7 z-10">
            {/* Overline Subtitle */}
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-[#1E7444]">
              PENTAVA ECOSYSTEM
            </p>

            {/* Tiêu đề chính */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.12] text-gray-900">
              <span className="block text-gray-950">Hệ sinh thái</span>
              <span className="block text-gray-950">phát triển bản thân</span>
              <span className="block">
                toàn diện <span className="text-[#1E7444]">PENTAVA</span>
              </span>
            </h1>

            {/* Mô tả phụ */}
            <p className="max-w-[540px] text-base sm:text-lg leading-relaxed text-gray-700">
              PENTAVA giúp người trẻ chăm sóc sức khỏe toàn diện, xây dựng routine cá nhân hóa 1 chạm và lưu lại hành trình tiến bộ bằng hình ảnh, video sinh động cùng cộng đồng tích cực.
            </p>

            {/* Nút chợ ứng dụng chính hãng chuẩn như hình mẫu */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {/* App Store */}
              <button
                type="button"
                onClick={() => alert("Ứng dụng PENTAVA trên iOS App Store hiện đang hoàn thiện bản duyệt. Bạn vui lòng quay lại sau ít ngày nhé!")}
                className="inline-flex items-center gap-2.5 rounded-xl border border-black bg-white px-4 py-2 text-black shadow-sm transition-all hover:bg-gray-50 hover:shadow cursor-pointer"
                aria-label="Download on the App Store"
              >
                <svg className="h-6 w-6 fill-black shrink-0" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-0.91.04-1.99.61-2.63 1.36-.57.65-.98 1.71-.85 2.73 1.01.08 2.01-.52 2.56-1.22z" />
                </svg>
                <div className="text-left leading-none">
                  <p className="text-[10px] font-medium tracking-tight text-gray-800">
                    Download on the
                  </p>
                  <p className="text-[15px] font-bold tracking-tight text-black mt-0.5">
                    App Store
                  </p>
                </div>
              </button>

              {/* Google Play */}
              <a
                href="https://play.google.com/store/apps/details?id=com.pentava&hl=vi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl border border-black bg-white px-4 py-2 text-black shadow-sm transition-all hover:bg-gray-50 hover:shadow"
                aria-label="Download on the Google Play"
              >
                <svg className="h-5 w-5 fill-current text-black shrink-0" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a1.597 1.597 0 0 1-.61-.917c-.074-.356-.074-.75-.074-1.18V3.911c0-.43.001-.824.075-1.18.1-.475.32-.82.608-.917zM15.207 13.414l2.874 2.874-12.78 7.375 9.906-10.25zM15.207 10.586L5.301.337l12.78 7.375-2.874 2.874zM16.621 12l3.49-2.015c.983-.568 1.58-.225 1.58.91v2.21c0 1.135-.597 1.478-1.58.91L16.621 12z" />
                </svg>
                <div className="text-left leading-none">
                  <p className="text-[10px] font-medium tracking-tight text-gray-800">
                    Download on the
                  </p>
                  <p className="text-[15px] font-bold tracking-tight text-black mt-0.5">
                    Google Play
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* CỘT PHẢI: Mockup điện thoại đặt dọc thẳng đứng */}
          <div className="relative flex items-center justify-center">
            <div className="relative flex items-center justify-center">

              {/* Khung điện thoại thông minh đặt dọc thẳng đứng chuẩn (Vertical Phone Mockup) */}
              <div
                className="relative z-10 w-[260px] sm:w-[285px] md:w-[300px] lg:w-[315px] h-[520px] sm:h-[570px] md:h-[600px] lg:h-[630px] rounded-[48px] sm:rounded-[54px] border-[8px] sm:border-[10px] border-white bg-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col transition-transform duration-300"
              >
                {/* Loa thoại / Dynamic Island tai thỏ */}

                {/* Màn hình app thực tế PENTAVA */}
                <div className="relative h-full w-full overflow-hidden bg-white">
                  <img
                    src="/image/pentava-app-home.png"
                    alt="PENTAVA App Home Screen"
                    className="h-full w-full object-cover object-top select-none pointer-events-none"
                    loading="eager"
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
