import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import Reveal from "../components/common/Reveal"

export default function Community() {
  return (
    <>
      <Header />

      <main className="pb-20 pt-32">
        <Reveal>
          <section className="mx-auto mb-16 max-w-[1200px] px-6">
            <div className="journal-border hand-drawn-shadow relative flex min-h-[400px] flex-col justify-center overflow-hidden rounded-lg bg-white p-12">
              <div className="absolute -right-12 -top-12 opacity-5">
                <svg
                  height="400"
                  viewBox="0 0 200 200"
                  width="400"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M40,60 C40,60 80,20 120,60 C160,100 120,140 80,100 C40,60 80,100 40,140"
                    fill="transparent"
                    stroke="black"
                    strokeLinecap="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <div className="relative z-10 max-w-2xl">
                <h1 className="mb-6 text-[32px] font-bold leading-tight text-[#1b1b1b] md:text-5xl">
                  Nơi kỷ luật trở thành nguồn cảm hứng
                </h1>

                <p className="max-w-xl text-base leading-relaxed text-[#4c4546]">
                  Tại PENTAVA, cộng đồng chia sẻ câu chuyện visual và trải nghiệm để mỗi hành trình sức khỏe không cô độc.
                </p>

                <div className="mt-10 flex items-center space-x-4">
                  <div className="flex -space-x-3">
                    {[
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQfL1OUxM4iJhxpM7HGSmyPTn6RMCOO0-pUtagPqiXFd-80x8xpfdxGTYnBnMFO5YGw3ZJDKeg8gMEAFKKXgPOKpkMB7wD5cxXLGdejPJfYnmoAMOSo76H_wtcRjEAF3L5nZK2NhsvUKMhgtF33-ZBVKCqapn8LGfh76ysLaHnSqOQOcnH_-RqK8vOO_otOb-DMrNwMdt2k5c-LgU_-VedLUJ16OY4-baTH2cHb5EESSqEUdSRpTfIjlv6cE028s3uDJJct5zH1p4",
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuD0ffPTUJrX7MtJWNoWBIfFxeocniBUPEiXGCM90_6tC4mD2DJ6ufVK5eNY23y-0vCDaD66SxdcgYGsG8P8oPSvkSfY8MEd1ImrKVwz3WxmUNbjBqv_71DcXmMWN_Fi6Za2QVGXIG880Lykm7pYWilfZBHMLMIaAyswMW8pWA7HkKEEHaHnWgXz3rLlDLJFChqN_0Ql3T6NanqaWZhKDlCog0tLzwCGIAEuOTYCOQuFHGCxCHY2VXuOviyrupBuL7YY1abMCuUauD4",
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuDWwTy_ABHqRbZ363B0VM_JSFD-pMweWnzvuOQsxZOcgGJ7aXRME-SHn6wSUnq5Jgy2e9v5aiNPMY7sv-CD0x0Kkt8Pi9yz-7r3NLwDpvlqoC2hpPfsXAlmqlEs7K1ywGFyzAeVmiiqFTeGEVmJGl5fGLhuo-2W4Jy_aDsVbfnov3rVUmOo-ms0EGolcI_PxhGyvYIVIkmgNfRNm0zZvhTLcl3PuA92IFCY_iCVYZpaiDZ3DlgQ1zW88XCQFP7r69GzjvGEFNTlFGU",
                    ].map((src) => (
                      <div
                        key={src}
                        className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-slate-200"
                      >
                        <img className="h-full w-full object-cover" src={src} alt="Community member" />
                      </div>
                    ))}

                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-[10px] font-bold text-white">
                      +2k
                    </div>
                  </div>

                  <span className="text-xs text-[#4c4546]">Tham gia cùng 2,000+ thành viên</span>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mx-auto max-w-[1200px] px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="journal-border hand-drawn-shadow group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-lg bg-white p-8 transition-all duration-300 hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center">
                  <span className="material-symbols-outlined text-4xl">bolt</span>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold text-[#1b1b1b]">
                    Hành trình 30 ngày sáng tạo năng lượng
                  </h3>
                  <p className="text-base leading-relaxed text-[#4c4546] opacity-80">
                    Cộng đồng PENTAVA chia sẻ quá trình duy trì routine và nâng cao tâm trạng hàng ngày.
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#cfc4c5]/30 pt-6">
                  <span className="text-xs font-bold text-black">#ENERGY30</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </div>
              </div>

              <div className="journal-border hand-drawn-shadow group relative flex min-h-[320px] flex-col overflow-hidden rounded-lg bg-[#eeeeee] transition-all duration-300 md:col-span-1 md:flex-row lg:col-span-2">
                <div className="flex flex-1 flex-col justify-center p-8">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center">
                    <span className="material-symbols-outlined text-4xl">eco</span>
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-[#1b1b1b]">
                    Chuyển hóa stress thành nguồn cảm hứng
                  </h3>

                  <p className="mb-6 text-base leading-relaxed text-[#4c4546] opacity-80">
                    Các câu chuyện trực quan giúp mọi người thấy được tiến bộ trong sức khỏe tinh thần và thể chất.
                  </p>

                  <button className="w-fit rounded-full border-2 border-black px-8 py-2 font-medium text-black transition-all hover:bg-black hover:text-white">
                    Xem thư viện
                  </button>
                </div>

                <div className="relative hidden w-1/3 border-l border-black md:block">
                  <div
                    className="absolute inset-0 bg-cover bg-center grayscale contrast-125"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAqpsB3ZDe5elJda3tHNTzZuMFF6sy-KbHpOvvHWiqCwx88HqZtRlYETeVtI3UDeNc9-xRGhkOJA8NqMyoxfd2Fj4jaXb7KzYQl-Ja5bs3w1GX27-NsHNVlSnMRuSppjsZ3Pd77kMBhd2jAqAMY43m2gpAD5WBswTqP0IJfrhdj-z5sIQv_3BmaFD6uaw8MjhM5uNosuiT4J3cda6iVeqvwjSi4KcE22ZupJydFODiaqGy4IEf2XVuAnCgxgkGHIGYEVuPlOPZPW5w')",
                    }}
                  />
                </div>
              </div>

              <div className="journal-border hand-drawn-shadow group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-lg bg-white p-8 transition-all duration-300 hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center">
                  <span className="material-symbols-outlined text-4xl">edit_note</span>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold text-[#1b1b1b]">
                    Thói quen sáng tạo cho ngày mới
                  </h3>
                  <p className="text-base leading-relaxed text-[#4c4546] opacity-80">
                    Những buổi sáng đều đặn với video và check-in visual giúp hình thành sự tự tin bền vững.
                  </p>
                </div>

                <div className="mt-6 border-t border-[#cfc4c5]/30 pt-6">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-black" />
                    <span className="text-xs text-[#4c4546]">42 người đang thực hiện</span>
                  </div>
                </div>
              </div>

              <div className="hand-drawn-shadow group relative flex min-h-[320px] flex-col justify-center overflow-hidden rounded-lg bg-black p-8 text-white transition-all duration-300 lg:col-span-2">
                <div className="relative z-10 max-w-lg">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-white">history_edu</span>
                  </div>

                  <h3 className="mb-3 text-xl font-semibold">Kỷ luật thông minh, không gượng ép</h3>

                  <p className="text-base leading-relaxed text-white/80">
                    Câu chuyện thực tế của những người trẻ vượt qua trì hoãn bằng hệ thống PENTAVA.
                    Không áp lực, chỉ có sự thấu hiểu và phát triển từng bước nhỏ.
                  </p>

                  <div className="mt-8 flex gap-4">
                    <span className="rounded-full border border-white/20 px-4 py-1.5 text-xs">Tự do</span>
                    <span className="rounded-full border border-white/20 px-4 py-1.5 text-xs">Kỷ luật</span>
                    <span className="rounded-full border border-white/20 px-4 py-1.5 text-xs">Cân bằng</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mx-auto mt-24 max-w-[1200px] px-6">
            <div className="mb-12 flex flex-col items-end justify-between md:flex-row">
              <div>
                <h2 className="mb-2 text-2xl font-bold text-[#1b1b1b]">Khoảnh khắc thực tế</h2>
                <p className="text-base text-[#4c4546] opacity-70">
                  Visual logs được chia sẻ từ người dùng khắp thế giới.
                </p>
              </div>

              <button className="group mt-6 flex items-center font-medium text-black md:mt-0">
                Xem tất cả feed
                <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-1">
                  chevron_right
                </span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {[
                "https://lh3.googleusercontent.com/aida-public/AB6AXuD-rdb_hDVe8ojoYhdCaijTdAF7WOCITEsXTfAdMl-WjD0wPZwsyLteuTqlYYqeCuLBsIZR3ap5dP7MmuvQMN5DiBxbshTKexx7N2EubOXN4ETCWAUwOI_0S3zgPVwG4Xy04oSTtOBVk65F3XVHJlVpvFcC_YasRfsIFzH7Ly1LGVHCEe9C3fbgpiPQxvOjqxa8Lg46UA6MLfBTseboJXIM4xXG9WbytX80L2KfKLuogvODKOHlndCCfBvZD9xqjECDyJAylQrI86Y",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuA8l19eyDYP1oioTwabQ5bjRN_4zPjzoXnS99O7TnNobCgc5PXm33JedzjU-okQv_4m2i0iTMhg0jAjlDiJZMn4lg_-CssVKx70mXflCo8w0fUPl9_hCL7FfZqpKZGvr2jsRrPKNtQqzUwHAkCO0yO8T-aVGg_nM085UYBE9w-mN45ij_SMwU0u7eeURXk3kZ1Rukv1CdCIl6vOHlsZpE6678HynHWjYQ1k1hk7eVuER6becgSrImbbxZqnohFTubP4eNoLeozkIl0",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBEgyod6xBCIw3N3RRyUpLkx6EdEm8Nns-ROtJBW4B-jxf8GwSVMFsMZQOXUkacX65eoy5aBKBBK4GM6AZTSeyXbU1zrk2jsN_A3tKQ1MLZ7rrQgz32UZLl9_-WwKrWrAhwys9XZa7pZdUXS4AlXly7iQW_WzgnlIz3HfvB7LgGLgxUT06dHDb3WRyRbRKGMjEq52YxUiKhsu4CoxLxL1DM2ZBTwAfgdDWP2nTRFVqM0oXZ2Gm5VJKAzY9Db_yAwWA-ztNUfHWl2_Q",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDO2wMyddCHejWxIbyzTlfGIWVS07ycCStVfgFoUeL59MQClJNS0FxJ8ZQlqrc1iGyjG6zSXuxmMXGMjXHYb1WjRHdJfM3O3axvEzNz8GmfRbdNjwUX8T36-TduCJXT3xsVkvPRvPy-IgAng9W8OuL-4jYOmE_XVSw-Ev9Sj_VTrovi0cUnPPYeTQJRtit4UWNTyJJQFFakfDgnJxCdZvsX9sBBjd3_i0kyeFMhr-_VBTDpaEUUVvpVTkKNxICoy1kqucTFFjG5oI4",
              ].map((src) => (
                <div
                  key={src}
                  className="visual-log-frame hand-drawn-shadow group relative aspect-square bg-slate-100 transition-transform hover:-translate-y-1"
                >
                  <img
                    className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                    src={src}
                    alt="Visual log"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="material-symbols-outlined text-3xl text-white">favorite</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      </main>

      <Footer />
    </>
  )
}