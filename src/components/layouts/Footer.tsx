const footerLinks = [
  { label: "Giải pháp", href: "#solution" },
  { label: "Tính năng", href: "#features" },
  { label: "PENTA-CINEMA", href: "#cinema" },
  { label: "Cộng đồng", href: "#community" },
  { label: "Hỗ trợ", href: "#faq" },
]

export default function Footer() {
  return (
    <footer className="bg-[#1F2621] text-white">
      <div className="mx-auto grid max-w-[1220px] grid-cols-1 gap-10 px-6 py-12 md:px-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <a
            href="#hero"
            className="mb-6 flex h-12 w-[150px] shrink-0 items-center overflow-visible"
            aria-label="Về đầu trang PENTAVA"
          >
            <img
              src="/logo/logo.png"
              alt="PENTAVA Logo"
              className="h-10 w-auto origin-left scale-[2.2] object-contain brightness-0 invert"
            />
          </a>

          <p className="max-w-md text-sm leading-7 text-white/65">
            PENTAVA giúp người trẻ bắt đầu, duy trì và nhìn lại hành trình phát
            triển bản thân bằng routine cá nhân hóa, visual check-in và cộng
            đồng đồng hành lành mạnh.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-[1fr_auto]">
          <div>
            <h4 className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#FFC857]">
              Landing page
            </h4>

            <ul className="space-y-3 text-sm font-semibold text-white/65">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <a
                    className="inline-block transition-all hover:translate-x-1 hover:text-[#FFC857]"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#529CFF]">
              Liên hệ
            </h4>

            <a
              href="mailto:hello@pentava.vn"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/65 transition-all hover:text-[#529CFF]"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
              hello@pentava.vn
            </a>

            <div className="mt-6 flex flex-wrap gap-3">
              {['Facebook', 'Instagram', 'LinkedIn'].map((item) => (
                <a
                  key={item}
                  href="#community"
                  className="rounded-full border border-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white/55 transition-all hover:-translate-y-1 hover:border-[#FFC857] hover:bg-[#FFC857] hover:text-black"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-[11px] font-bold uppercase tracking-widest text-white/45">
        © 2026 PENTAVA. All rights reserved.
      </div>
    </footer>
  )
}
