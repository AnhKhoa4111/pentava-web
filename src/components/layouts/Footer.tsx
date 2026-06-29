import { NavLink } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#D9D9D9] bg-[#F7FAFF] py-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 px-8 md:flex-row">
        <div className="max-w-xs">
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

          <p className="text-sm leading-relaxed text-[#727272]">
            Nâng tầm phong cách sống thông qua những thói quen nhỏ nhất.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 md:grid-cols-3 md:gap-16">
          <div>
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-widest text-[#3A8157]">
              Sản phẩm
            </h4>
            <ul className="space-y-3 text-sm font-medium text-[#727272]">
              <li>
                <NavLink className="transition-colors hover:text-[#3A8157]" to="/feature">
                  Tính năng
                </NavLink>
              </li>
              <li>
                <NavLink className="transition-colors hover:text-[#3A8157]" to="/cinema">
                  PENTA-CINEMA
                </NavLink>
              </li>
              <li>
                <NavLink className="transition-colors hover:text-[#3A8157]" to="/download">
                  Tải App
                </NavLink>
              </li>
              <li>
                <NavLink className="transition-colors hover:text-[#3A8157]" to="/support">
                  Hỗ trợ
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-widest text-[#529CFF]">
              Công ty
            </h4>
            <ul className="space-y-3 text-sm font-medium text-[#727272]">
              <li>
                <NavLink className="transition-colors hover:text-[#529CFF]" to="/about">
                  Về PENTAVA
                </NavLink>
              </li>
              <li>
                <NavLink className="transition-colors hover:text-[#529CFF]" to="/community">
                  Cộng đồng
                </NavLink>
              </li>
              <li>
                <NavLink className="transition-colors hover:text-[#529CFF]" to="/blog">
                  Blog
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-widest text-[#8B63F6]">
              Pháp lý
            </h4>
            <ul className="space-y-3 text-sm font-medium text-[#727272]">
              <li>
                <NavLink className="transition-colors hover:text-[#8B63F6]" to="/privacy">
                  Bảo mật
                </NavLink>
              </li>
              <li>
                <NavLink className="transition-colors hover:text-[#8B63F6]" to="/terms">
                  Điều khoản
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1200px] flex-col items-center justify-between gap-4 border-t border-[#D9D9D9] px-8 pt-6 text-[10px] font-bold uppercase tracking-widest text-[#727272] md:flex-row">
        <p>© 2024 PENTAVA. All rights reserved.</p>

        <div className="flex gap-8">
          <a className="text-[#3A8157] hover:text-[#2F6D49]" href="#">
            Facebook
          </a>
          <a className="text-[#529CFF] hover:text-[#2F6D49]" href="#">
            Instagram
          </a>
          <a className="text-[#8B63F6] hover:text-[#2F6D49]" href="#">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}