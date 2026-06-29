import { NavLink } from "react-router-dom"

const mainLinks = [
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

const legalLinks = [
  { label: "Bảo mật", to: "/privacy" },
  { label: "Điều khoản", to: "/terms" },
]

export default function Header() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `shrink-0 rounded-full px-3 py-2 text-[9px] font-bold uppercase tracking-widest transition-all md:px-4 md:text-[11px] ${
      isActive
        ? "bg-[#FFC857] text-black shadow-[3px_3px_0px_0px_#3A8157]"
        : "text-[#727272] hover:bg-[#F7FAFF] hover:text-[#3A8157]"
    }`

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#D9D9D9] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-[80px] max-w-[1200px] items-center px-4 md:px-8">
        <NavLink
          to="/home"
          className="flex h-12 w-[150px] shrink-0 items-center overflow-visible"
        >
          <img
            src="/logo/logo.png"
            alt="PENTAVA Logo"
            className="h-10 w-auto origin-left scale-[2.5] object-contain"
          />
        </NavLink>

        <nav className="ml-80 flex gap-2 overflow-x-auto pb-1 lg:justify-center lg:overflow-visible lg:pb-0">
          {mainLinks.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}

          <span className="hidden h-8 w-px shrink-0 bg-[#D9D9D9] lg:block" />

          {companyLinks.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}

          <span className="hidden h-8 w-px shrink-0 bg-[#D9D9D9] lg:block" />

          {legalLinks.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}