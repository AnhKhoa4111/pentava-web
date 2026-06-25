import { NavLink } from "react-router-dom"

export default function Header() {
    return (
        <header className="fixed top-0 z-50 w-full border-b border-[#cfc4c5] bg-[#f9f9f9]/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 py-5">
                <div className="flex items-center gap-2 text-2xl font-extrabold tracking-tighter text-[#1b1b1b]">
                    <span>PENTAVA</span>
                </div>

                <nav className="hidden items-center gap-8 md:flex">
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            `text-xs font-bold uppercase tracking-widest ${isActive
                                ? "border-b-2 border-black text-black"
                                : "text-[#4c4546]"
                            }`
                        }
                    >
                        Trang chủ
                    </NavLink>

                    <NavLink
                        to="/community"
                        className={({ isActive }) =>
                            `text-xs font-bold uppercase tracking-widest ${isActive
                                ? "border-b-2 border-black text-black"
                                : "text-[#4c4546]"
                            }`
                        }
                    >
                        Cộng đồng
                    </NavLink>

                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `text-xs font-bold uppercase tracking-widest ${isActive
                                ? "border-b-2 border-black text-black"
                                : "text-[#4c4546]"
                            }`
                        }
                    >
                        Về PENTAVA
                    </NavLink>
                </nav>

                <button className="pill-button bg-black px-6 py-2.5 text-[12px] font-bold text-white hover:bg-[#4c4546]">
                    Tải App
                </button>
            </div>
        </header>
    )
}