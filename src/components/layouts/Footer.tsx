export default function Footer() {
  const scrollToContact = (e: React.MouseEvent) => {
    const el = document.getElementById("contact")
    if (el) {
      e.preventDefault()
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="w-full bg-[#EFF6F0] border-t border-[#DCE8DF] text-gray-800">
      <div className="mx-auto max-w-[1240px] px-6 md:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          {/* CỘT 1: Logo & Slogan */}
          <div className="space-y-4">
            <a
              href="/"
              className="flex h-10 w-[140px] shrink-0 items-center overflow-visible"
              aria-label="Về đầu trang PENTAVA"
            >
              <img
                src="/logo/logo.png"
                alt="PENTAVA Logo"
                className="h-9 w-auto origin-left scale-[1.9] object-contain"
              />
            </a>

            <p className="max-w-[280px] text-sm leading-relaxed text-[#55635A]">
              Nâng tầm phong cách sống thông qua những thói quen nhỏ nhất.
            </p>

            <p className="pt-2 text-xs font-black tracking-widest text-[#24633B] uppercase">
              PENTAVA ECOSYSTEM
            </p>
          </div>

          {/* CỘT 2: Sản phẩm */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#24633B] mb-4">
              Sản phẩm
            </h4>
            <ul className="space-y-2.5 text-sm text-[#4E5B53]">
              <li>
                <a href="#features" className="transition-colors hover:text-[#1E7444]">
                  Tính năng
                </a>
              </li>
              <li>
                <a href="#cinema" className="transition-colors hover:text-[#1E7444]">
                  PENTA-CINEMA
                </a>
              </li>
              <li>
                <a href="#download" className="transition-colors hover:text-[#1E7444]">
                  Tải App
                </a>
              </li>
              <li>
                <a href="#contact" onClick={scrollToContact} className="transition-colors hover:text-[#1E7444]">
                  Hỗ trợ
                </a>
              </li>
            </ul>
          </div>

          {/* CỘT 3: Công ty */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#24633B] mb-4">
              Công ty
            </h4>
            <ul className="space-y-2.5 text-sm text-[#4E5B53]">
              <li>
                <a href="#solution" className="transition-colors hover:text-[#1E7444]">
                  Về PENTAVA
                </a>
              </li>
              <li>
                <a href="#community" className="transition-colors hover:text-[#1E7444]">
                  Cộng đồng
                </a>
              </li>
              <li>
                <a href="/blog" className="transition-colors hover:text-[#1E7444]">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* CỘT 4: Pháp lý */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#24633B] mb-4">
              Pháp lý
            </h4>
            <ul className="space-y-2.5 text-sm text-[#4E5B53]">
              <li>
                <a href="/privacy" className="transition-colors hover:text-[#1E7444]">
                  Bảo mật & Điều khoản
                </a>
              </li>
              <li>
                <a href="#contact" onClick={scrollToContact} className="transition-colors hover:text-[#1E7444]">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Đường phân cách mảnh */}
        <div className="mt-12 pt-6 border-t border-[#D6E4DA] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6F7F74] font-medium tracking-wide">
            © 2026 PENTAVA. ALL RIGHTS RESERVED.
          </p>

          <a
            href="https://www.facebook.com/profile.php?id=61595034024501"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold uppercase tracking-wider text-[#55635A] hover:text-[#1E7444] inline-flex items-center gap-1 transition-colors"
          >
            FACEBOOK <span className="text-sm leading-none">↗</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
