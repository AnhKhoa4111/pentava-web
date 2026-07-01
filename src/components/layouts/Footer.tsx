import { NavLink } from "react-router-dom"

const productLinks = [
  { label: "Tính năng", to: "/feature" },
  { label: "PENTA-CINEMA", to: "/cinema" },
  { label: "Tải App", to: "/download" },
  { label: "Hỗ trợ", to: "/support" },
]

const companyLinks = [
  { label: "Về PENTAVA", to: "/about" },
  { label: "Cộng đồng", to: "/community" },
  { label: "Blog", to: "/blog" },
]

const socialLinks = ["Facebook", "Instagram", "LinkedIn"]

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#1F2621] text-white">
      <div className="relative h-16 w-full bg-[#FFC857] overflow-hidden">
        {/* Lớp 1: sợi giấy tưa - màu be nhạt gần giống bóng đổ của giấy, nằm ngay trên viền tối */}
        <div
          className="absolute bottom-0 left-0 w-full bg-[#0F1410]"
          style={{
            height: '46px',
            clipPath: `polygon(
        0% 10%, 1% 4%, 1.8% 9%, 2.6% 2%, 3.5% 12%, 4.3% 5%,
        5.2% 11%, 6% 3%, 6.9% 15%, 7.7% 6%, 8.6% 10%, 9.4% 2%,
        10.3% 13%, 11.1% 4%, 12% 17%, 12.8% 6%, 13.7% 9%, 14.5% 3%,
        15.4% 14%, 16.2% 5%, 17.1% 20%, 17.9% 7%, 18.8% 11%, 19.6% 2%,
        20.5% 16%, 21.3% 4%, 22.2% 24%, 23% 8%, 23.9% 12%, 24.7% 3%,
        25.6% 18%, 26.4% 5%, 27.3% 9%, 28.1% 2%, 29% 21%, 29.8% 6%,
        30.7% 13%, 31.5% 3%, 32.4% 17%, 33.2% 7%, 34.1% 10%, 34.9% 2%,
        35.8% 23%, 36.6% 5%, 37.5% 9%, 38.3% 3%, 39.2% 14%, 40% 6%,
        40.9% 19%, 41.7% 4%, 42.6% 11%, 43.4% 2%, 44.3% 15%, 45.1% 6%,
        46% 9%, 46.8% 3%, 47.7% 26%, 48.5% 5%, 49.4% 12%, 50.2% 2%,
        51.1% 17%, 51.9% 6%, 52.8% 10%, 53.6% 3%, 54.5% 20%, 55.3% 5%,
        56.2% 14%, 57% 4%, 57.9% 9%, 58.7% 2%, 59.6% 22%, 60.4% 6%,
        61.3% 11%, 62.1% 3%, 63% 16%, 63.8% 5%, 64.7% 9%, 65.5% 2%,
        66.4% 25%, 67.2% 6%, 68.1% 12%, 68.9% 4%, 69.8% 10%, 70.6% 2%,
        71.5% 18%, 72.3% 5%, 73.2% 9%, 74% 3%, 74.9% 15%, 75.7% 6%,
        76.6% 21%, 77.4% 4%, 78.3% 11%, 79.1% 2%, 80% 27%, 80.8% 6%,
        81.7% 13%, 82.5% 3%, 83.4% 9%, 84.2% 5%, 85.1% 19%, 85.9% 4%,
        86.8% 10%, 87.6% 2%, 88.5% 16%, 89.3% 6%, 90.2% 9%, 91% 3%,
        91.9% 23%, 92.7% 5%, 93.6% 12%, 94.4% 4%, 95.3% 9%, 96.1% 2%,
        97% 17%, 97.8% 6%, 98.7% 10%, 100% 5%,
        100% 100%, 0% 100%
      )`,
            opacity: 0.35,
            filter: 'blur(0.5px)',
          }}
        />

        {/* Lớp 2: viền xé chính - chi tiết dày, biên độ nhỏ, xen kẽ vài đoạn xé sâu bất quy tắc */}
        <div
          className="absolute bottom-0 left-0 w-full bg-[#1F2621]"
          style={{
            height: '42px',
            clipPath: `polygon(
        0% 12%, 1% 5%, 1.8% 15%, 2.6% 3%, 3.5% 10%, 4.3% 18%,
        5.2% 4%, 6% 13%, 6.9% 6%, 7.7% 22%, 8.6% 3%, 9.4% 11%,
        10.3% 8%, 11.1% 17%, 12% 2%, 12.8% 14%, 13.7% 6%, 14.5% 9%,
        15.4% 25%, 16.2% 4%, 17.1% 12%, 17.9% 7%, 18.8% 19%, 19.6% 3%,
        20.5% 10%, 21.3% 15%, 22.2% 5%, 23% 30%, 23.9% 2%, 24.7% 13%,
        25.6% 8%, 26.4% 21%, 27.3% 4%, 28.1% 9%, 29% 16%, 29.8% 6%,
        30.7% 11%, 31.5% 27%, 32.4% 3%, 33.2% 14%, 34.1% 7%, 34.9% 18%,
        35.8% 5%, 36.6% 10%, 37.5% 23%, 38.3% 2%, 39.2% 12%, 40% 8%,
        40.9% 16%, 41.7% 4%, 42.6% 20%, 43.4% 6%, 44.3% 9%, 45.1% 29%,
        46% 3%, 46.8% 13%, 47.7% 7%, 48.5% 17%, 49.4% 5%, 50.2% 10%,
        51.1% 24%, 51.9% 2%, 52.8% 15%, 53.6% 8%, 54.5% 19%, 55.3% 4%,
        56.2% 11%, 57% 32%, 57.9% 3%, 58.7% 12%, 59.6% 6%, 60.4% 21%,
        61.3% 5%, 62.1% 9%, 63% 16%, 63.8% 7%, 64.7% 26%, 65.5% 2%,
        66.4% 13%, 67.2% 8%, 68.1% 18%, 68.9% 4%, 69.8% 10%, 70.6% 23%,
        71.5% 3%, 72.3% 14%, 73.2% 6%, 74% 20%, 74.9% 5%, 75.7% 9%,
        76.6% 28%, 77.4% 2%, 78.3% 12%, 79.1% 7%, 80% 17%, 80.8% 4%,
        81.7% 11%, 82.5% 22%, 83.4% 3%, 84.2% 15%, 85.1% 6%, 85.9% 9%,
        86.8% 25%, 87.6% 2%, 88.5% 13%, 89.3% 8%, 90.2% 19%, 91% 4%,
        91.9% 10%, 92.7% 30%, 93.6% 3%, 94.4% 14%, 95.3% 6%, 96.1% 9%,
        97% 21%, 97.8% 5%, 98.7% 12%, 100% 7%,
        100% 100%, 0% 100%
      )`,
            filter: 'drop-shadow(0 -2px 3px rgba(0,0,0,0.15))',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-8 pb-5 pt-9">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_2fr]">
          <div className="max-w-sm">
            <NavLink
              to="/home"
              className="mb-6 flex h-12 w-[150px] shrink-0 items-center overflow-visible"
            >
              <img
                src="/logo/logo.png"
                alt="PENTAVA Logo"
                className="h-10 w-auto origin-left scale-[2.2] object-contain brightness-0 invert"
              />
            </NavLink>

            <p className="max-w-xs text-sm leading-7 text-white/65">
              Nâng tầm phong cách sống thông qua những thói quen nhỏ nhất.
            </p>

            <div className="mt-6 inline-flex rounded-full bg-[#FFC857] px-5 py-2 text-[10px] font-extrabold uppercase tracking-widest text-black shadow-[4px_4px_0px_0px_#3A8157]">
              PENTAVA Ecosystem
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#FFC857]">
                Sản phẩm
              </h4>

              <ul className="space-y-3 text-sm font-semibold text-white/65">
                {productLinks.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      className="inline-block transition-all hover:translate-x-1 hover:scale-[1.04] hover:text-[#FFC857]"
                      to={item.to}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#529CFF]">
                Công ty
              </h4>

              <ul className="space-y-3 text-sm font-semibold text-white/65">
                {companyLinks.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      className="inline-block transition-all hover:translate-x-1 hover:scale-[1.04] hover:text-[#529CFF]"
                      to={item.to}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#8B63F6]">
                Pháp lý
              </h4>

              <NavLink
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/65 transition-all hover:translate-x-1 hover:scale-[1.04] hover:text-[#8B63F6]"
                to="/legal"
              >
                <span className="material-symbols-outlined text-[18px]">
                  shield_lock
                </span>
                Bảo mật & Điều khoản
              </NavLink>

              <button className="mt-7 rounded-full bg-white px-6 py-3 text-sm font-extrabold text-[#1F2621] shadow-[4px_4px_0px_0px_#FFC857] transition-all hover:-translate-y-1">
                Liên hệ
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-white/10 pt-6 md:flex-row md:items-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/45">
            © 2024 PENTAVA. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-4">
            {socialLinks.map((item) => (
              <a
                key={item}
                className="rounded-full border border-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white/55 transition-all hover:-translate-y-1 hover:border-[#FFC857] hover:bg-[#FFC857] hover:text-black"
                href="#"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}