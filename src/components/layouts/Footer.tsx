export default function Footer() {
    return (
        <footer className="w-full border-t border-[#cfc4c5] bg-[#f3f3f3] py-8">
            <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 px-8 md:flex-row">
                <div className="max-w-xs">
                    <div className="mb-4 text-2xl font-extrabold tracking-tighter text-[#1b1b1b]">
                        PENTAVA
                    </div>

                    <p className="text-sm leading-relaxed text-[#4c4546]">
                        Nâng tầm phong cách sống thông qua những thói quen nhỏ nhất,
                        đẹp nhất và bền vững nhất bằng ngôn ngữ đồ họa artisanal.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-16 md:grid-cols-3">
                    <div>
                        <h4 className="mb-6 text-[10px] font-bold uppercase tracking-widest">
                            Sản phẩm
                        </h4>
                        <ul className="space-y-3 text-sm font-medium text-[#4c4546]">
                            <li>
                                <a className="transition-colors hover:text-black" href="#">
                                    Tính năng
                                </a>
                            </li>
                            <li>
                                <a className="transition-colors hover:text-black" href="#">
                                    PENTA-CINEMA
                                </a>
                            </li>
                            <li>
                                <a className="transition-colors hover:text-black" href="#">
                                    Tải app
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 text-[10px] font-bold uppercase tracking-widest">
                            Công ty
                        </h4>
                        <ul className="space-y-4 text-sm font-medium text-[#4c4546]">
                            <li>
                                <a className="transition-colors hover:text-black" href="#">
                                    Về chúng tôi
                                </a>
                            </li>
                            <li>
                                <a className="transition-colors hover:text-black" href="#">
                                    Cộng đồng
                                </a>
                            </li>
                            <li>
                                <a className="transition-colors hover:text-black" href="#">
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 text-[10px] font-bold uppercase tracking-widest">
                            Pháp lý
                        </h4>
                        <ul className="space-y-4 text-sm font-medium text-[#4c4546]">
                            <li>
                                <a className="transition-colors hover:text-black" href="#">
                                    Bảo mật
                                </a>
                            </li>
                            <li>
                                <a className="transition-colors hover:text-black" href="#">
                                    Điều khoản
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-12 flex max-w-[1200px] flex-col items-center justify-between gap-4 border-t border-black/5 px-8 pt-6 text-[10px] font-bold uppercase tracking-widest text-[#4c4546]/60 md:flex-row">
                <p>© 2024 PENTAVA. All rights reserved.</p>

                <div className="flex gap-8">
                    <a className="hover:text-black" href="#">
                        Facebook
                    </a>
                    <a className="hover:text-black" href="#">
                        Instagram
                    </a>
                    <a className="hover:text-black" href="#">
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    )
}