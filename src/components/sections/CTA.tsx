export default function CTA() {
  return (
    <section id="download" className="relative bg-[#EFF6F0] py-16 md:py-24 scroll-mt-20 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-6 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          
          {/* CỘT TRÁI: Nội dung giới thiệu & Nút tải */}
          <div className="space-y-6">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#B3D6BF] bg-white/80 px-3.5 py-1 text-xs font-bold text-[#1E7444] shadow-sm backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1E7444]" />
              <span>TẢI PENTAVA NGAY</span>
            </div>

            {/* Tiêu đề chính */}
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black leading-[1.2] tracking-tight text-gray-900">
              Bắt đầu Routine 1 chạm{" "}
              <span className="text-[#1E7444]">
                cho phiên bản tốt hơn
              </span>{" "}
              của chính bạn.
            </h2>

            {/* Đoạn mô tả */}
            <p className="max-w-xl text-sm sm:text-base leading-relaxed text-gray-600">
              Trải nghiệm miễn phí các tính năng cốt lõi ngay hôm nay. Không quảng cáo độc hại, không áp lực streak vô nghĩa, đồng hành cùng bạn trên từng bước tiến bộ nhỏ nhất.
            </p>

            {/* Thẻ cam kết trải nghiệm lành mạnh */}
            <div className="rounded-xl border border-[#D5E7DA] bg-white/80 px-4 py-3 text-xs leading-relaxed text-gray-700 shadow-sm max-w-xl">
              <span className="font-bold text-[#1E7444] mr-1.5">✓</span>
              <span className="font-bold text-gray-900">
                Trải nghiệm phát triển bản thân lành mạnh
              </span>{" "}
              <span className="text-gray-600">
                Cá nhân hóa theo nhịp sinh học • Không quảng cáo • Tôn trọng tiến trình riêng
              </span>
            </div>

            {/* Bộ nút chợ ứng dụng chuẩn chính hãng */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              {/* Nút App Store chuẩn chính hãng như hình mẫu */}
              <button
                type="button"
                onClick={() => {
                  alert("Ứng dụng PENTAVA trên iOS App Store hiện đang hoàn thiện bản duyệt. Bạn vui lòng quay lại sau ít ngày nhé!")
                }}
                className="inline-flex items-center gap-2.5 rounded-xl border border-black bg-white px-4 py-2 text-black shadow-sm transition-all hover:bg-gray-50 hover:shadow cursor-pointer"
                aria-label="Download on the App Store"
              >
                {/* Apple Logo SVG */}
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

              {/* Nút Google Play đồng bộ chuẩn */}
              <a
                href="https://play.google.com/store/apps/details?id=com.pentava&hl=vi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl border border-black bg-white px-4 py-2 text-black shadow-sm transition-all hover:bg-gray-50 hover:shadow"
                aria-label="Get it on Google Play"
              >
                {/* Google Play Logo SVG */}
                <svg className="h-5 w-5 fill-current text-black shrink-0" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a1.597 1.597 0 0 1-.61-.917c-.074-.356-.074-.75-.074-1.18V3.911c0-.43.001-.824.075-1.18.1-.475.32-.82.608-.917zM15.207 13.414l2.874 2.874-12.78 7.375 9.906-10.25zM15.207 10.586L5.301.337l12.78 7.375-2.874 2.874zM16.621 12l3.49-2.015c.983-.568 1.58-.225 1.58.91v2.21c0 1.135-.597 1.478-1.58.91L16.621 12z" />
                </svg>
                <div className="text-left leading-none">
                  <p className="text-[10px] font-medium tracking-tight text-gray-800 uppercase">
                    Get it on
                  </p>
                  <p className="text-[15px] font-bold tracking-tight text-black mt-0.5">
                    Google Play
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* CỘT PHẢI: Khung thẻ QR Code tối giản */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[320px] rounded-3xl border border-[#E0EBE2] bg-white p-7 text-center shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
              {/* Tiêu đề thẻ QR */}
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E7444] mb-5">
                MÃ QR CÀI ĐẶT
              </h4>

              {/* Khung QR Code */}
              <div className="relative mx-auto aspect-square w-full max-w-[230px] rounded-2xl border border-gray-200 bg-white p-3.5 flex items-center justify-center">
                <img
                  src="/image/pentava_google_play_qr.png"
                  alt="Quét mã để tải nhanh PENTAVA"
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Chú thích dưới QR Code */}
              <div className="mt-5 space-y-1">
                <p className="text-xs font-bold text-gray-800">
                  Quét mã để tải nhanh PENTAVA
                </p>
                <p className="text-[11px] text-gray-400">
                  Tương thích với Android 12+
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
