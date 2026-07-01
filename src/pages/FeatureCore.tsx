import { Link } from "react-router-dom"
import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"

const coreFeatures = [
    {
        title: "Onboarding Tự Động",
        desc: 'Khảo sát thông minh dựa trên khoa học hành vi, tự động thiết lập lộ trình routine cá nhân hóa ngay từ ngày đầu tiên. Nói "không" với việc bắt đầu từ một trang giấy trắng khô khan.',
        icon: "psychology",
        color: "#FFC857",
        page: "01",
    },
    {
        title: "Visual Verification",
        desc: "Thay thế những ô checkbox nhàm chán bằng việc lưu giữ khoảnh khắc thực tế qua hình ảnh hoặc video. Mỗi thói quen hoàn thành là một mảnh ghép thị giác sống động.",
        icon: "photo_camera",
        color: "#529CFF",
        page: "02",
    },
    {
        title: "Động lực kép",
        desc: "Không gian đồng hành nhóm văn minh. Thúc đẩy nhau cùng tiến bộ thông qua sự đồng cảm, loại bỏ hoàn toàn áp lực từ các bảng xếp hạng độc hại.",
        icon: "diversity_3",
        color: "#3A8157",
        page: "03",
    },
]

export default function FeatureCore() {
    return (
        <>
            <Header />

            <main className="min-h-screen overflow-hidden bg-[#F7FAFF] pt-32 text-black lg:pt-28">
                <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-8">
                    <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
                        <div className="max-w-3xl animate-[bookFade_0.8s_ease-out_both]">
                            <span className="inline-block rounded-full border-2 border-[#FFC857] bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#3A8157] shadow-[3px_3px_0px_0px_#FFC857]">
                                Nội dung cốt lõi
                            </span>

                            <h1 className="mt-6 max-w-5xl font-extrabold tracking-tight text-black">
                                <span className="mb-4 block text-[28px] leading-none text-[#727272] md:text-[36px]">
                                    Ba trải nghiệm chính
                                </span>

                                <span className="flex flex-wrap items-center gap-3 text-[40px] leading-[1.05] md:text-[58px]">
                                    <span className="rounded-[22px] bg-[#FFC857] px-4 py-2 text-black shadow-[4px_4px_0px_0px_#3A8157]">
                                        bắt đầu dễ hơn
                                    </span>

                                    <span className="text-[#3A8157]">+</span>

                                    <span className="rounded-[22px] bg-white px-4 py-2 text-[#3A8157] shadow-[4px_4px_0px_0px_#529CFF]">
                                        duy trì
                                    </span>

                                    <span className="rounded-[22px] bg-[#3A8157] px-4 py-2 text-white shadow-[4px_4px_0px_0px_#FFC857]">
                                        bền vững hơn
                                    </span>
                                </span>
                            </h1>
                        </div>

                        <Link
                            to="/feature"
                            className="w-fit rounded-full border-2 border-[#D9D9D9] bg-white px-6 py-3 text-sm font-bold text-[#727272] transition-all hover:-translate-y-1 hover:text-[#3A8157]"
                        >
                            Quay lại Ecosystem
                        </Link>
                    </div>

                    <div className="relative">
                        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#D9D9D9] lg:block" />

                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            {coreFeatures.map((item, index) => (
                                <article
                                    key={item.title}
                                    className="group relative min-h-[430px] origin-left animate-[bookPage_0.9s_ease-out_both] rounded-[28px] border border-[#D9D9D9] bg-white p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-2"
                                    style={{
                                        animationDelay: `${index * 180}ms`,
                                    }}
                                >
                                    <div
                                        className="absolute right-6 top-6 rounded-full px-3 py-1 text-[10px] font-extrabold text-black"
                                        style={{ backgroundColor: item.color }}
                                    >
                                        PAGE {item.page}
                                    </div>

                                    <div
                                        className="mb-10 flex h-16 w-16 items-center justify-center rounded-3xl text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.08)]"
                                        style={{ backgroundColor: item.color }}
                                    >
                                        <span className="material-symbols-outlined text-4xl">
                                            {item.icon}
                                        </span>
                                    </div>

                                    <h2 className="mb-5 text-2xl font-extrabold">{item.title}</h2>

                                    <p className="text-sm leading-8 text-[#727272]">
                                        {item.desc}
                                    </p>

                                    <div
                                        className="absolute bottom-0 left-0 h-2 w-full rounded-b-[28px]"
                                        style={{ backgroundColor: item.color }}
                                    />
                                </article>
                            ))}
                        </div>
                    </div>

                    <div className="mt-16 flex justify-center">
                        <Link
                            to="/feature/solution"
                            className="rounded-full bg-[#8B63F6] px-8 py-4 font-bold text-white shadow-[4px_4px_0px_0px_#529CFF] transition-all hover:-translate-y-1"
                        >
                            Tiếp tục xem Giải pháp PENTAVA
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}