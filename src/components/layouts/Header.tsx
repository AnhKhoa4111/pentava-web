import { Link, NavLink, useLocation } from "react-router-dom"

const featureLinks = [
  { label: "Tính năng", to: "/feature", icon: "auto_awesome" },
  { label: "PENTA-CINEMA", to: "/cinema", icon: "movie" },
  { label: "Tải App", to: "/download", icon: "download" },
  { label: "Hỗ trợ", to: "/support", icon: "support_agent" },
]

const aboutLinks = [
  { label: "Về PENTAVA", to: "/about", icon: "history_edu" },
  { label: "Cộng đồng", to: "/community", icon: "diversity_3" },
  { label: "Blog", to: "/blog", icon: "auto_stories" },
]

const legalLinks = [
  {
    label: "Bảo mật & Điều khoản",
    to: "/privacy",
    icon: "shield_lock",
  },
]

export default function Header() {
  const location = useLocation()

  const isFeatureActive = featureLinks.some((item) =>
    location.pathname.startsWith(item.to),
  )

  const isAboutActive = aboutLinks.some((item) =>
    location.pathname.startsWith(item.to),
  )

  const isLegalActive =
    location.pathname.startsWith("/privacy") ||
    location.pathname.startsWith("/terms")

  const triggerClass = (active: boolean) =>
    `group inline-flex items-center gap-2 rounded-full px-5 py-3 text-[11px] font-extrabold uppercase tracking-widest transition-all ${
      active
        ? "bg-[#FFC857] text-black shadow-[3px_3px_0px_0px_#3A8157]"
        : "text-[#727272] hover:bg-[#F7FAFF] hover:text-[#3A8157]"
    }`

  const dropdownClass =
    "invisible absolute left-1/2 top-full z-50 mt-4 min-w-[240px] -translate-x-1/2 translate-y-3 rounded-[24px] border border-[#D9D9D9] bg-white p-3 opacity-0 shadow-[8px_8px_0px_0px_rgba(58,129,87,0.16)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"

  const dropdownItemClass =
    "flex items-center gap-3 rounded-[18px] px-4 py-3 text-sm font-bold text-[#727272] transition-all hover:scale-[1.04] hover:bg-[#FFC857] hover:text-black hover:shadow-[3px_3px_0px_0px_#3A8157]"

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#D9D9D9] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-[80px] max-w-[1300px] items-center justify-start gap-150 px-4 md:px-8">
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

        <nav className="hidden items-center gap-7 lg:flex">
          <div className="group relative">
            <button className={triggerClass(isFeatureActive)} type="button">
              Tính năng
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:rotate-180">
                expand_more
              </span>
            </button>

            <div className={dropdownClass}>
              {featureLinks.map((item) => (
                <Link key={item.to} to={item.to} className={dropdownItemClass}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F7FAFF] text-[#3A8157]">
                    <span className="material-symbols-outlined text-[20px]">
                      {item.icon}
                    </span>
                  </span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="group relative">
            <button className={triggerClass(isAboutActive)} type="button">
              Về PENTAVA
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:rotate-180">
                expand_more
              </span>
            </button>

            <div className={dropdownClass}>
              {aboutLinks.map((item) => (
                <Link key={item.to} to={item.to} className={dropdownItemClass}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F7FAFF] text-[#3A8157]">
                    <span className="material-symbols-outlined text-[20px]">
                      {item.icon}
                    </span>
                  </span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="group relative">
            <button
              className={`inline-flex h-12 w-12 items-center justify-center rounded-full transition-all ${
                isLegalActive
                  ? "bg-[#FFC857] text-black shadow-[3px_3px_0px_0px_#3A8157]"
                  : "bg-[#F7FAFF] text-[#727272] hover:bg-[#FFC857] hover:text-black hover:shadow-[3px_3px_0px_0px_#3A8157]"
              }`}
              type="button"
              aria-label="Bảo mật và điều khoản"
            >
              <span className="material-symbols-outlined text-[23px]">
                shield_lock
              </span>
            </button>

            <div className="invisible absolute right-0 top-full z-50 mt-4 min-w-[260px] translate-y-3 rounded-[24px] border border-[#D9D9D9] bg-white p-3 opacity-0 shadow-[8px_8px_0px_0px_rgba(58,129,87,0.16)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {legalLinks.map((item) => (
                <Link key={item.to} to={item.to} className={dropdownItemClass}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F7FAFF] text-[#3A8157]">
                    <span className="material-symbols-outlined text-[20px]">
                      {item.icon}
                    </span>
                  </span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <nav className="flex max-w-[68vw] gap-2 overflow-x-auto pb-1 lg:hidden">
          <NavLink
            to="/feature"
            className={({ isActive }) =>
              `shrink-0 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest ${
                isActive
                  ? "bg-[#FFC857] text-black shadow-[3px_3px_0px_0px_#3A8157]"
                  : "text-[#727272]"
              }`
            }
          >
            Tính năng
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `shrink-0 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest ${
                isActive
                  ? "bg-[#FFC857] text-black shadow-[3px_3px_0px_0px_#3A8157]"
                  : "text-[#727272]"
              }`
            }
          >
            Về PENTAVA
          </NavLink>

          <NavLink
            to="/privacy"
            className={({ isActive }) =>
              `flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                isActive
                  ? "bg-[#FFC857] text-black shadow-[3px_3px_0px_0px_#3A8157]"
                  : "bg-[#F7FAFF] text-[#727272]"
              }`
            }
          >
            <span className="material-symbols-outlined text-[19px]">
              shield_lock
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}