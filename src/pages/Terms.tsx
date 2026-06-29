import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import Reveal from "../components/common/Reveal"

const terms = [
  {
    title: "Quy định về độ tuổi",
    desc: "Ứng dụng dành cho người dùng từ 13 tuổi trở lên.",
    icon: "verified_user",
    color: "#FFC857",
  },
  {
    title: "Quy chuẩn nội dung",
    desc: "Nghiêm cấm tải lên các hình ảnh/video vi phạm pháp luật, đồi trụy, bạo lực hoặc có hành vi công kích, bắt nạt, tạo áp lực tiêu cực lên các thành viên khác trong không gian đồng hành. PENTAVA có quyền khóa tài khoản vi phạm quy chuẩn văn minh mà không cần báo trước để bảo vệ không gian an toàn cho cộng đồng.",
    icon: "gavel",
    color: "#F25F5C",
  },
]

export default function Terms() {
  return (
    <>
      <Header />

      <main className="bg-[#F7FAFF] pt-32 text-black lg:pt-28">
        <Reveal>
          <section className="mx-auto max-w-[1100px] px-6 py-20 md:px-8">
            <div className="mb-14 text-center">
              <span className="inline-block rounded-full bg-[#F25F5C] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-[3px_3px_0px_0px_#FFC857]">
                Terms of Service
              </span>

              <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-[64px]">
                Điều khoản dịch vụ và Quy chuẩn cộng đồng PENTAVA
              </h1>
            </div>

            <div className="space-y-8">
              {terms.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[26px] border border-[#D9D9D9] bg-white p-8 shadow-[0_5px_0px_0px_rgba(0,0,0,0.06)]"
                >
                  <div
                    className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    <span className="material-symbols-outlined text-3xl">
                      {item.icon}
                    </span>
                  </div>

                  <h2 className="mb-4 text-xl font-extrabold">{item.title}</h2>
                  <p className="text-sm leading-7 text-[#727272]">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      </main>

      <Footer />
    </>
  )
}