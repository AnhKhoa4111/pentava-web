import { NavLink } from "react-router-dom"

export default function Header() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[9px] font-bold uppercase tracking-widest md:text-xs ${
      isActive
        ? "border-b-2 border-black text-black"
        : "text-[#4c4546]"
    }`

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#cfc4c5] bg-[#f9f9f9]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-4 md:px-8 md:py-5">
        <div className="flex items-center gap-2 text-xl font-extrabold tracking-tighter text-[#1b1b1b] md:text-2xl">
          <span>PENTAVA</span>
        </div>

        <nav className="flex items-center gap-3 md:gap-8">
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

        <button className="pill-button bg-black px-3 py-2 text-[10px] font-bold text-white hover:bg-[#4c4546] md:px-6 md:py-2.5 md:text-[12px]">
          Tải App
        </button>
      </div>
    </header>
  )
}