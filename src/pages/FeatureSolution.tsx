import { Link } from "react-router-dom"
import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"

const problems = [
    {
        title: "Quá nhiều app rời rạc",
        desc: "Người trẻ phải dùng nhiều app khác nhau cho habit, mood, journal và sức khỏe.",
        color: "#FFC857",
        icon: "grid_view",
    },
    {
        title: "Không biết bắt đầu từ đâu",
        desc: "Nhiều app bắt người dùng tự tạo mục tiêu từ đầu, dễ gây nản và bỏ cuộc.",
        color: "#529CFF",
        icon: "visibility_off",
    },
    {
        title: "Duy trì không bền vững",
        desc: "Streak và reminder thô thường tạo áp lực thay vì giúp người dùng thật sự thay đổi.",
        color: "#F25F5C",
        icon: "cached",
    },
]

const pillars = [
    {
        title: "Done-for-you Routine & Micro-guidance",
        subtitle: 'Phá vỡ áp lực "Trang giấy trắng" bằng Lộ trình 1 chạm',
        desc: "PENTAVA bắt đầu bằng bài trắc nghiệm ngắn 2 phút, sau đó tự động tạo routine 5 nhiệm vụ tối ưu mỗi ngày, cân bằng cả thể chất lẫn tinh thần.",
        color: "#FFC857",
    },
    {
        title: "Visual Verification & PENTA-CINEMA",
        subtitle: "Điện ảnh hóa hành trình trưởng thành của bạn",
        desc: "PENTAVA thay checkbox bằng ảnh thực tế, Weekly Capsule và video cinematic recap, giúp mỗi tuần nỗ lực trở thành một thước phim đáng nhớ.",
        color: "#529CFF",
    },
    {
        title: "Động lực kép & Cộng đồng chữa lành",
        subtitle: "Kỷ luật tự giác nhưng không cô độc, kết nối nhưng không áp lực",
        desc: "PENTAVA tạo nhóm nhỏ cùng mục tiêu, không leaderboard hơn thua, chỉ có high-five, sự đồng cảm và chế độ Nhịp thở an lành khi bạn cần nghỉ.",
        color: "#3A8157",
    },
]

export default function FeatureSolution() {
    return (
        <>
            <Header />

            <main className="min-h-screen overflow-hidden bg-[#F7FAFF] pt-32 text-black lg:pt-28">
                <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-8">
                    <div className="mb-16 text-center animate-[bookFade_0.8s_ease-out_both]">
                        <span className="inline-block rounded-full border-2 border-[#529CFF] bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#529CFF] shadow-[3px_3px_0px_0px_#8B63F6]">
                            Có thể bạn chưa biết
                        </span>

                        <h1 className="mx-auto mt-6 max-w-5xl text-center font-extrabold tracking-tight text-black">
                            <span className="mb-3 block text-[30px] leading-none text-[#F25F5C] md:text-[42px]">
                                Vấn đề chính
                            </span>

                            <span className="block text-[52px] leading-[0.95] md:text-[76px]">
                                và Giải pháp
                            </span>

                            <span className="mt-5 inline-flex rotate-[-1.5deg] items-center rounded-[24px] border-2 border-[#3A8157] bg-[#FFC857] px-6 py-3 text-[44px] leading-none tracking-[-0.06em] text-black shadow-[6px_6px_0px_0px_#3A8157] md:px-8 md:py-4 md:text-[72px]">
                                PENTAVA
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#727272]">
                            PENTAVA được tạo ra để giảm ma sát khi bắt đầu và biến thay đổi bản thân thành hành trình có cảm hứng.
                        </p>
                    </div>

                    <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
                        {problems.map((item, index) => (
                            <article
                                key={item.title}
                                className="origin-left animate-[bookPage_0.9s_ease-out_both] rounded-[26px] border border-[#D9D9D9] bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-2"
                                style={{ animationDelay: `${index * 160}ms` }}
                            >
                                <div
                                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                                    style={{ backgroundColor: item.color }}
                                >
                                    <span className="material-symbols-outlined text-3xl">
                                        {item.icon}
                                    </span>
                                </div>

                                <h2 className="mb-4 text-xl font-extrabold">{item.title}</h2>
                                <p className="text-sm leading-7 text-[#727272]">{item.desc}</p>
                            </article>
                        ))}
                    </div>

                    <div className="space-y-8">
                        {pillars.map((item, index) => (
                            <article
                                key={item.title}
                                className="grid origin-left animate-[bookPage_0.9s_ease-out_both] grid-cols-1 overflow-hidden rounded-[28px] border border-[#D9D9D9] bg-white shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] lg:grid-cols-[260px_1fr]"
                                style={{ animationDelay: `${500 + index * 180}ms` }}
                            >
                                <div
                                    className="flex items-center justify-center p-10 text-6xl font-extrabold"
                                    style={{ backgroundColor: item.color }}
                                >
                                    0{index + 1}
                                </div>

                                <div className="p-8 md:p-10">
                                    <h3 className="mb-2 text-2xl font-extrabold">
                                        {item.title}
                                    </h3>

                                    <p className="mb-5 font-bold text-[#3A8157]">
                                        {item.subtitle}
                                    </p>

                                    <p className="max-w-3xl text-sm leading-7 text-[#727272]">
                                        {item.desc}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-16 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            to="/feature/core"
                            className="rounded-full border-2 border-[#3A8157] bg-white px-8 py-4 text-center font-bold text-[#3A8157] shadow-[4px_4px_0px_0px_rgba(58,129,87,0.2)] transition-all hover:-translate-y-1"
                        >
                            Xem Nội dung cốt lõi
                        </Link>

                        <Link
                            to="/cinema"
                            className="rounded-full bg-[#8B63F6] px-8 py-4 text-center font-bold text-white shadow-[4px_4px_0px_0px_#529CFF] transition-all hover:-translate-y-1"
                        >
                            Xem PENTA-CINEMA
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}