export default function Footer() {
  return (
    <footer className="w-full border-t border-[#D9D9D9] bg-[#F7FAFF] py-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 px-8 md:flex-row">
        <div className="max-w-xs">
          <div className="mb-4 text-2xl font-extrabold tracking-tighter text-[#3A8157]">
            PENTAVA
          </div>

          <p className="text-sm leading-relaxed text-[#727272]">
            Nâng tầm phong cách sống thông qua những thói quen nhỏ nhất,
            đẹp nhất và bền vững nhất bằng ngôn ngữ đồ họa artisanal.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 md:grid-cols-3 md:gap-16">
          <div>
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-widest text-[#3A8157]">
              Sản phẩm
            </h4>
            <ul className="space-y-3 text-sm font-medium text-[#727272]">
              <li>
                <a className="transition-colors hover:text-[#3A8157]" href="#">
                  Tính năng
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-[#3A8157]" href="#">
                  PENTA-CINEMA
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-[#3A8157]" href="#">
                  Tải app
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-widest text-[#529CFF]">
              Công ty
            </h4>
            <ul className="space-y-3 text-sm font-medium text-[#727272]">
              <li>
                <a className="transition-colors hover:text-[#529CFF]" href="#">
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-[#529CFF]" href="#">
                  Cộng đồng
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-[#529CFF]" href="#">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-widest text-[#8B63F6]">
              Pháp lý
            </h4>
            <ul className="space-y-3 text-sm font-medium text-[#727272]">
              <li>
                <a className="transition-colors hover:text-[#8B63F6]" href="#">
                  Bảo mật
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-[#8B63F6]" href="#">
                  Điều khoản
                </a>
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