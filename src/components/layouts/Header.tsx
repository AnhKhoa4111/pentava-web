const navItems = [
  { label: "Giải pháp", href: "#solution" },
  { label: "Tính năng", href: "#features" },
  { label: "Cinema", href: "#cinema" },
  { label: "Cộng đồng", href: "#community" },
  { label: "FAQ", href: "#faq" },
]

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full transition-all">
      <div className="mx-auto mt-3 max-w-[1220px] px-4 md:px-8">
        <div className="flex h-[68px] items-center justify-between rounded-full border border-emerald-100/70 bg-white/90 px-6 shadow-sm backdrop-blur-md">
          <a
            href="/"
            className="flex h-10 w-[140px] shrink-0 items-center overflow-visible"
            aria-label="Về đầu trang PENTAVA"
          >
            <img
              src="/logo/logo.png"
              alt="PENTAVA Logo"
              className="h-9 w-auto origin-left scale-[2] object-contain"
            />
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-emerald-50 hover:text-[#1E7444]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="https://play.google.com/store/apps/details?id=com.pentava&hl=vi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#1E7444] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#165a34] hover:scale-105 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            Tải App
          </a>
        </div>
      </div>
    </header>
  )
}
