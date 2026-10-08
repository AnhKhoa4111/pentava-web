const navItems = [
  { label: "Giải pháp", href: "#solution" },
  { label: "Tính năng", href: "#features" },
  { label: "Cinema", href: "#cinema" },
  { label: "Cộng đồng", href: "#community" },
  { label: "FAQ", href: "#faq" },
]

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#D9D9D9] bg-white/92 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1220px] items-center justify-between gap-4 px-4 md:px-8">
        <a
          href="#hero"
          className="flex h-12 w-[150px] shrink-0 items-center overflow-visible"
          aria-label="Về đầu trang PENTAVA"
        >
          <img
            src="/logo/logo.png"
            alt="PENTAVA Logo"
            className="h-10 w-auto origin-left scale-[2.25] object-contain"
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-3 text-[11px] font-extrabold uppercase tracking-widest text-[#727272] transition-all hover:bg-[#F7FAFF] hover:text-[#3A8157]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#download"
          className="inline-flex items-center gap-2 rounded-full bg-[#3A8157] px-5 py-3 text-[11px] font-extrabold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_#FFC857] transition-all hover:-translate-y-1"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          Tải App
        </a>
      </div>
    </header>
  )
}
