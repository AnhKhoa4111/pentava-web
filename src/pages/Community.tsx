import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import Reveal from "../components/common/Reveal"

const members = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAQfL1OUxM4iJhxpM7HGSmyPTn6RMCOO0-pUtagPqiXFd-80x8xpfdxGTYnBnMFO5YGw3ZJDKeg8gMEAFKKXgPOKpkMB7wD5cxXLGdejPJfYnmoAMOSo76H_wtcRjEAF3L5nZK2NhsvUKMhgtF33-ZBVKCqapn8LGfh76ysLaHnSqOQOcnH_-RqK8vOO_otOb-DMrNwMdt2k5c-LgU_-VedLUJ16OY4-baTH2cHb5EESSqEUdSRpTfIjlv6cE028s3uDJJct5zH1p4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD0ffPTUJrX7MtJWNoWBIfFxeocniBUPEiXGCM90_6tC4mD2DJ6ufVK5eNY23y-0vCDaD66SxdcgYGsG8P8oPSvkSfY8MEd1ImrKVwz3WxmUNbjBqv_71DcXmMWN_Fi6Za2QVGXIG880Lykm7pYWilfZBHMLMIaAyswMW8pWA7HkKEEHaHnWgXz3rLlDLJFChqN_0Ql3T6NanqaWZhKDlCog0tLzwCGIAEuOTYCOQuFHGCxCHY2VXuOviyrupBuL7YY1abMCuUauD4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDWwTy_ABHqRbZ363B0VM_JSFD-pMweWnzvuOQsxZOcgGJ7aXRME-SHn6wSUnq5Jgy2e9v5aiNPMY7sv-CD0x0Kkt8Pi9yz-7r3NLwDpvlqoC2hpPfsXAlmqlEs7K1ywGFyzAeVmiiqFTeGEVmJGl5fGLhuo-2W4Jy_aDsVbfnov3rVUmOo-ms0EGolcI_PxhGyvYIVIkmgNfRNm0zZvhTLcl3PuA92IFCY_iCVYZpaiDZ3DlgQ1zW88XCQFP7r69GzjvGEFNTlFGU",
]

const visualLogs = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD-rdb_hDVe8ojoYhdCaijTdAF7WOCITEsXTfAdMl-WjD0wPZwsyLteuTqlYYqeCuLBsIZR3ap5dP7MmuvQMN5DiBxbshTKexx7N2EubOXN4ETCWAUwOI_0S3zgPVwG4Xy04oSTtOBVk65F3XVHJlVpvFcC_YasRfsIFzH7Ly1LGVHCEe9C3fbgpiPQxvOjqxa8Lg46UA6MLfBTseboJXIM4xXG9WbytX80L2KfKLuogvODKOHlndCCfBvZD9xqjECDyJAylQrI86Y",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA8l19eyDYP1oioTwabQ5bjRN_4zPjzoXnS99O7TnNobCgc5PXm33JedzjU-okQv_4m2i0iTMhg0jAjlDiJZMn4lg_-CssVKx70mXflCo8w0fUPl9_hCL7FfZqpKZGvr2jsRrPKNtQqzUwHAkCO0yO8T-aVGg_nM085UYBE9w-mN45ij_SMwU0u7eeURXk3kZ1Rukv1CdCIl6vOHlsZpE6678HynHWjYQ1k1hk7eVuER6becgSrImbbxZqnohFTubP4eNoLeozkIl0",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBEgyod6xBCIw3N3RRyUpLkx6EdEm8Nns-ROtJBW4B-jxf8GwSVMFsMZQOXUkacX65eoy5aBKBBK4GM6AZTSeyXbU1zrk2jsN_A3tKQ1MLZ7rrQgz32UZLl9_-WwKrWrAhwys9XZa7pZdUXS4AlXly7iQW_WzgnlIz3HfvB7LgGLgxUT06dHDb3WRyRbRKGMjEq52YxUiKhsu4CoxLxL1DM2ZBTwAfgdDWP2nTRFVqM0oXZ2Gm5VJKAzY9Db_yAwWA-ztNUfHWl2_Q",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDO2wMyddCHejWxIbyzTlfGIWVS07ycCStVfgFoUeL59MQClJNS0FxJ8ZQlqrc1iGyjG6zSXuxmMXGMjXHYb1WjRHdJfM3O3axvEzNz8GmfRbdNjwUX8T36-TduCJXT3xsVkvPRvPy-IgAng9W8OuL-4jYOmE_XVSw-Ev9Sj_VTrovi0cUnPPYeTQJRtit4UWNTyJJQFFakfDgnJxCdZvsX9sBBjd3_i0kyeFMhr-_VBTDpaEUUVvpVTkKNxICoy1kqucTFFjG5oI4",
]

export default function Community() {
  return (
    <>
      <Header />

      <main className="bg-white pb-20 pt-32 text-black">
        <Reveal>
          <section className="mx-auto mb-16 max-w-[1200px] px-6">
            <div className="relative flex min-h-[420px] flex-col justify-center overflow-hidden rounded-[28px] border border-[#D9D9D9] bg-[#FFC857] p-12 shadow-[12px_12px_0px_0px_#3A8157]">
              <div className="absolute -right-12 -top-12 opacity-20">
                <svg
                  height="400"
                  viewBox="0 0 200 200"
                  width="400"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M40,60 C40,60 80,20 120,60 C160,100 120,140 80,100 C40,60 80,100 40,140"
                    fill="transparent"
                    stroke="#3A8157"
                    strokeLinecap="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <div className="absolute -right-12 -top-12 opacity-30">
                <span className="material-symbols-outlined text-[180px] text-[#529CFF]">
                  diversity_3
                </span>

              </div>

              <div className="relative z-10 max-w-2xl">
                <span className="mb-6 inline-block rounded-full bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#3A8157]">
                  PENTAVA COMMUNITY
                </span>

                <h1 className="mb-6 text-[40px] font-extrabold leading-tight text-black md:text-6xl">
                  Cùng nhau giữ nhịp thay đổi
                </h1>

                <p className="max-w-xl text-base leading-relaxed text-black/70">
                  Xây dựng cộng đồng PENTAVA để trở thành nơi kết nối những "Kẻ mộng mơ thực tế" –
                  những người trẻ đang trên hành trình tự hoàn thiện bản thân nhưng không cô độc.
                </p>


              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mx-auto max-w-[1200px] px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[22px] border border-[#D9D9D9] bg-white p-8 shadow-[0_4px_0px_0px_rgba(255,200,87,0.7)] transition-all duration-300 hover:-translate-y-1">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFC857]">
                  <span className="material-symbols-outlined text-4xl text-black">bolt</span>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-bold text-black">
                    Thử thách năng lượng 30 ngày
                  </h3>
                  <p className="text-base leading-relaxed text-[#727272]">
                    Mỗi ngày một hành động nhỏ để tăng mood, giữ routine và tạo cảm giác tiến bộ rõ ràng.
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#D9D9D9] pt-6">
                  <span className="text-xs font-bold text-[#FFC857]">#ENERGY30</span>
                </div>
              </div>

              <div className="group relative flex min-h-[320px] flex-col overflow-hidden rounded-[22px] border border-[#D9D9D9] bg-[#F7FAFF] shadow-[0_4px_0px_0px_rgba(82,156,255,0.35)] transition-all duration-300 md:col-span-1 md:flex-row lg:col-span-2">
                <div className="flex flex-1 flex-col justify-center p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#529CFF]">
                    <span className="material-symbols-outlined text-4xl text-white">eco</span>
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-black">
                    Chuyển stress thành cảm hứng
                  </h3>

                  <p className="mb-6 text-base leading-relaxed text-[#727272]">
                    Những câu chuyện visual giúp người dùng nhìn thấy sự ổn định tinh thần và thể chất theo thời gian.
                  </p>
                </div>

                {/* Đã bỏ class `grayscale` và `contrast-125` để ảnh hiển thị màu sắc tươi sáng */}
                <div className="relative hidden w-1/3 border-l border-[#D9D9D9] md:block">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80')",
                    }}
                  />
                </div>
              </div>

              <div className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[22px] border border-[#D9D9D9] bg-white p-8 shadow-[0_4px_0px_0px_rgba(58,129,87,0.25)] transition-all duration-300 hover:-translate-y-1">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3A8157]">
                  <span className="material-symbols-outlined text-4xl text-white">edit_note</span>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-bold text-black">
                    Check-in sáng tạo mỗi ngày
                  </h3>
                  <p className="text-base leading-relaxed text-[#727272]">
                    Video, ảnh và mood log giúp người dùng biến routine thành hành trình có cảm xúc.
                  </p>
                </div>

                <div className="mt-6 border-t border-[#D9D9D9] pt-6">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-[#3A8157]" />
                    <span className="text-xs text-[#727272]">42 người đang thực hiện</span>
                  </div>
                </div>
              </div>

              <div className="group relative flex min-h-[320px] flex-col justify-center overflow-hidden rounded-[22px] bg-[#3A8157] p-8 text-white shadow-[8px_8px_0px_0px_#FFC857] transition-all duration-300 lg:col-span-2">
                <div className="relative z-10 max-w-lg">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFC857]">
                    <span className="material-symbols-outlined text-4xl text-black">history_edu</span>
                  </div>

                  <h3 className="mb-3 text-xl font-bold">Kỷ luật thông minh, không gượng ép</h3>

                  <p className="text-base leading-relaxed text-white/85">
                    Không ép người dùng chạy theo leaderboard. PENTAVA tạo không gian để mọi người
                    tiến bộ theo nhịp riêng nhưng vẫn được cộng đồng tiếp sức.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <span className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs">Tự do</span>
                    <span className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs">Kỷ luật</span>
                    <span className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs">Cân bằng</span>
                  </div>
                </div>

                <div className="absolute -bottom-8 -right-8 opacity-25">
                  <span className="material-symbols-outlined text-[150px] text-[#FFC857]">groups</span>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mx-auto mt-24 max-w-[1200px] px-6">
            <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
              <div>
                <span className="mb-3 inline-block rounded-full bg-[#8B63F6] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
                  Visual Community Feed
                </span>
                <h2 className="mb-2 text-3xl font-extrabold text-black">Khoảnh khắc thực tế</h2>
                <p className="text-base text-[#727272]">
                  Visual logs được chia sẻ từ người dùng đang thay đổi từng ngày.
                </p>
              </div>

              <button className="group flex items-center rounded-full bg-[#3A8157] px-6 py-3 font-bold text-white shadow-[4px_4px_0px_0px_#FFC857] transition-all hover:-translate-y-1">
                Xem tất cả feed
                <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-1">
                  chevron_right
                </span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {visualLogs.map((src, index) => {
                const shadows = ["#FFC857", "#529CFF", "#8B63F6", "#F25F5C"]

                return (
                  <div
                    key={src}
                    className="group relative aspect-square overflow-hidden rounded-[22px] border border-[#D9D9D9] bg-slate-100 transition-transform hover:-translate-y-1"
                    style={{
                      boxShadow: `0 6px 0px 0px ${shadows[index]}`,
                    }}
                  >
                    <img
                      className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                      src={src}
                      alt="Visual log"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-[#3A8157]/70 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="material-symbols-outlined text-4xl text-white">favorite</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </Reveal>
      </main>

      <Footer />
    </>
  )
}