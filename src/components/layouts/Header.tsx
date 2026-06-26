import { NavLink } from "react-router-dom"

export default function Header() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3 py-2 text-[9px] font-bold uppercase tracking-widest transition-all md:px-4 md:text-xs ${
      isActive
        ? "bg-[#FFC857] text-black shadow-[3px_3px_0px_0px_#3A8157]"
        : "text-[#727272] hover:bg-[#F7FAFF] hover:text-[#3A8157]"
    }`

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#D9D9D9] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-4 md:px-8 md:py-5">
        <NavLink
          to="/home"
          className="flex items-center gap-2 text-xl font-extrabold tracking-tighter text-[#3A8157] md:text-2xl"
        >
          PENTAVA
        </NavLink>

        <nav className="flex items-center gap-1 md:gap-3">
          <NavLink to="/home" className={navLinkClass}>
            Trang chủ
          </NavLink>

          <NavLink to="/community" className={navLinkClass}>
            Cộng đồng
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            Về PENTAVA
          </NavLink>
        </nav>

        <button className="pill-button hidden bg-[#3A8157] px-6 py-2.5 text-[12px] font-bold text-white shadow-[3px_3px_0px_0px_#FFC857] transition-all hover:-translate-y-0.5 hover:bg-[#2F6D49] sm:block">
          Tải App
        </button>
      </div>
    </header>
  )
}