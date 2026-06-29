import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import Reveal from "../components/common/Reveal"

const privacyItems = [
  {
    title: "Cam kết bảo mật hình ảnh",
    desc: "Toàn bộ dữ liệu hình ảnh, video tải lên từ tính năng Visual Verification và PENTA-CINEMA được mã hóa đầu cuối trên hệ thống đám mây bảo mật cao.",
    icon: "encrypted",
    color: "#3A8157",
  },
  {
    title: "Quyền kiểm soát dữ liệu",
    desc: "Chúng tôi cam kết không bán, không sử dụng hình ảnh cá nhân của người dùng cho bên thứ ba hoặc mục đích quảng cáo. Người dùng có quyền xóa vĩnh viễn tài khoản và toàn bộ kho lưu trữ hình ảnh bất kỳ lúc nào.",
    icon: "admin_panel_settings",
    color: "#529CFF",
  },
]

export default function Privacy() {
  return (
    <>
      <Header />

      <main className="bg-[#F7FAFF] pt-32 text-black lg:pt-28">
        <Reveal>
          <section className="mx-auto max-w-[1100px] px-6 py-20 md:px-8">
            <div className="mb-14 text-center">
              <span className="inline-block rounded-full bg-[#3A8157] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-[3px_3px_0px_0px_#FFC857]">
                Privacy Policy
              </span>

              <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-[64px]">
                Chính sách bảo mật dữ liệu cá nhân PENTAVA
              </h1>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {privacyItems.map((item) => (
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