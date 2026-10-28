import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import Reveal from "../components/common/Reveal"
import ContactSection from "../components/sections/ContactSection"

const contactChannels = [
  {
    icon: "mail",
    title: "Email hỗ trợ",
    desc: "Gửi thư đến đội ngũ chăm sóc khách hàng",
    value: "pentava.official@gmail.com",
    href: "mailto:pentava.official@gmail.com",
    badge: "Phản hồi < 24h",
    color: "#3A8157",
    shadow: "#FFC857",
  },
  {
    icon: "share_location",
    title: "Trụ sở hoạt động",
    desc: "Khu Công nghệ Cao, TP. Thủ Đức, TP. Hồ Chí Minh",
    value: "Đại học FPT TP.HCM",
    href: "https://maps.google.com/?q=Dai+hoc+FPT+TP.HCM",
    badge: "TP. Hồ Chí Minh",
    color: "#529CFF",
    shadow: "#3A8157",
  },
  {
    icon: "public",
    title: "Kênh cộng đồng",
    desc: "Theo dõi tin tức, cập nhật và chia sẻ câu chuyện",
    value: "Facebook Page PENTAVA",
    href: "https://www.facebook.com/profile.php?id=61595034024501",
    badge: "Mạng xã hội",
    color: "#8B63F6",
    shadow: "#FFC857",
  },
]

export default function Contact() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F7FAFF] pt-32 text-black lg:pt-28">
        {/* Banner tiêu đề */}
        <Reveal>
          <section className="mx-auto max-w-[1200px] px-6 py-16 text-center md:px-8 md:py-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D9D9D9] bg-white px-4 py-2 ">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3A8157] text-white">
                <span className="material-symbols-outlined text-[16px]">
                  contact_support
                </span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#3A8157]">
                KẾT NỐI VỚI PENTAVA
              </span>
            </div>

            <h1 className="mx-auto mt-8 max-w-4xl font-extrabold tracking-tight text-black">
              <span className="mb-4 block text-[34px] leading-none text-[#3A8157] md:text-[48px]">
                Liên hệ &amp; Đồng hành
              </span>

              <span className="flex flex-wrap items-baseline justify-center gap-3 text-[38px] leading-[1.12] md:text-[58px]">
                <span>cùng hệ sinh thái</span>

                <span className="relative inline-block text-[44px] leading-none tracking-[-0.05em] text-black md:text-[68px]">
                  <span className="relative z-10">PENTAVA</span>
                  <span className="absolute bottom-1 left-1 right-1 z-0 h-3 rounded-full bg-[#FFC857]/60 md:bottom-2 md:h-5" />
                </span>
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[#727272] md:text-base">
              Chúng tôi luôn sẵn lòng lắng nghe mọi phản hồi, ý kiến đóng góp, thắc mắc tính năng hoặc các cơ hội hợp tác cùng phát triển lối sống lành mạnh cho người trẻ.
            </p>
          </section>
        </Reveal>

        {/* 3 Thẻ Kênh liên hệ trực tiếp */}
        <Reveal>
          <section className="mx-auto max-w-[1200px] px-6 pb-12 md:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {contactChannels.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group relative flex flex-col justify-between rounded-[26px] border-2 border-black bg-white p-7 transition-all duration-200 hover:-translate-y-1.5"
                >
                  <div>
                    <div className="mb-5 flex items-center justify-between">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-sm"
                        style={{ backgroundColor: item.color }}
                      >
                        <span className="material-symbols-outlined text-2xl">
                          {item.icon}
                        </span>
                      </div>

                      <span className="rounded-full border border-black/10 bg-[#F7FAFF] px-3 py-1 text-[11px] font-bold text-gray-700">
                        {item.badge}
                      </span>
                    </div>

                    <h2 className="text-xl font-black text-gray-900 group-hover:text-[#1E7444] transition-colors">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-xs leading-relaxed text-[#727272]">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-dashed border-gray-200 pt-4">
                    <p className="text-sm font-extrabold text-gray-900 break-all flex items-center justify-between">
                      <span>{item.value}</span>
                      <span className="material-symbols-outlined text-[18px] text-gray-400 group-hover:text-[#1E7444] transition-transform group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Form gửi liên hệ thực tế */}
        <Reveal>
          <ContactSection
            id="contact-form"
            title="Gửi thông điệp trực tiếp"
            subtitle="Điền form bên dưới để gửi tin nhắn đến ban quản trị PENTAVA. Chúng tôi sẽ phản hồi qua email sớm nhất!"
          />
        </Reveal>
      </main>

      <Footer />
    </>
  )
}
