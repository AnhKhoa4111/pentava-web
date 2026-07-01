import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import Reveal from "../components/common/Reveal"

const tableOfContents = [
  { label: "Tổng quan", href: "#overview" },
  { label: "Chính sách bảo mật", href: "#privacy" },
  { label: "Dữ liệu thu thập", href: "#data" },
  { label: "Cách xử lý dữ liệu", href: "#process" },
  { label: "Chia sẻ dữ liệu", href: "#sharing" },
  { label: "Cookie & bên thứ ba", href: "#cookies" },
  { label: "Bảo mật & lưu trữ", href: "#security" },
  { label: "Quyền người dùng", href: "#rights" },
  { label: "Điều khoản sử dụng", href: "#terms" },
  { label: "Quy chuẩn cộng đồng", href: "#community" },
  { label: "Cập nhật & liên hệ", href: "#contact" },
]

const sections = [
  {
    id: "privacy",
    label: "01",
    title: "Chính sách bảo mật dữ liệu cá nhân",
    eyebrow: "Privacy Policy",
    paragraphs: [
      "PENTAVA tôn trọng quyền riêng tư và dữ liệu cá nhân của người dùng. Chính sách này giải thích cách PENTAVA có thể thu thập, lưu trữ, sử dụng, bảo vệ hoặc chia sẻ dữ liệu khi bạn truy cập website, sử dụng ứng dụng, tương tác với các tính năng hoặc liên hệ với chúng tôi.",
      "Bằng việc sử dụng PENTAVA, bạn hiểu rằng một số dữ liệu có thể cần được xử lý để hệ thống vận hành ổn định, cá nhân hóa trải nghiệm, hỗ trợ người dùng, bảo vệ an toàn tài khoản và cải thiện chất lượng dịch vụ.",
      "Nếu bạn không đồng ý với chính sách này hoặc các điều khoản sử dụng đi kèm, bạn nên ngừng sử dụng website, ứng dụng hoặc các dịch vụ liên quan của PENTAVA.",
    ],
  },
  {
    id: "data",
    label: "02",
    title: "Những loại dữ liệu PENTAVA có thể thu thập",
    eyebrow: "Data We Collect",
    paragraphs: [
      "PENTAVA có thể thu thập thông tin bạn chủ động cung cấp, bao gồm tên hiển thị, email, thông tin tài khoản, nội dung phản hồi, yêu cầu hỗ trợ, cài đặt cá nhân hoặc các thông tin bạn nhập khi sử dụng dịch vụ.",
      "Đối với các tính năng đặc thù như Visual Verification và PENTA-CINEMA, PENTAVA có thể xử lý hình ảnh, video, nhật ký check-in, trạng thái hoàn thành thói quen hoặc nội dung liên quan đến hành trình phát triển bản thân của bạn.",
      "Ngoài ra, hệ thống có thể tự động ghi nhận một số thông tin kỹ thuật như loại thiết bị, hệ điều hành, trình duyệt, địa chỉ IP, thời gian truy cập, trang đã xem, lỗi hệ thống, hiệu năng ứng dụng và cách bạn tương tác với các tính năng.",
      "Các quyền truy cập trên thiết bị như camera, thông báo hoặc thư viện ảnh chỉ được sử dụng khi bạn cấp quyền. Bạn có thể thay đổi các quyền này trong phần cài đặt của thiết bị bất kỳ lúc nào.",
    ],
  },
  {
    id: "process",
    label: "03",
    title: "Cách PENTAVA xử lý dữ liệu",
    eyebrow: "How We Process Data",
    paragraphs: [
      "PENTAVA xử lý dữ liệu để tạo và quản lý tài khoản, cung cấp các tính năng trong ứng dụng, lưu lại tiến trình cá nhân, hỗ trợ người dùng, gửi thông báo quan trọng, khắc phục lỗi và duy trì độ ổn định của hệ thống.",
      "Dữ liệu cũng có thể được sử dụng để phân tích xu hướng sử dụng, cải thiện thiết kế sản phẩm, cá nhân hóa routine, nâng cao trải nghiệm wellness và giúp các tính năng như Weekly Capsule hoặc PENTA-CINEMA hoạt động đúng mục đích.",
      "Trong một số trường hợp, PENTAVA có thể xử lý dữ liệu để bảo vệ dịch vụ, ngăn chặn gian lận, phát hiện hành vi lạm dụng, thực hiện nghĩa vụ pháp lý hoặc phản hồi yêu cầu từ cơ quan có thẩm quyền.",
      "PENTAVA không sử dụng hình ảnh cá nhân của người dùng cho mục đích quảng cáo bên thứ ba nếu không có sự đồng ý rõ ràng từ người dùng.",
    ],
  },
  {
    id: "sharing",
    label: "04",
    title: "Khi nào dữ liệu có thể được chia sẻ",
    eyebrow: "Sharing Information",
    paragraphs: [
      "PENTAVA không bán dữ liệu cá nhân của người dùng. Dữ liệu chỉ có thể được chia sẻ trong một số trường hợp cần thiết để vận hành dịch vụ, ví dụ như nhà cung cấp hạ tầng đám mây, lưu trữ dữ liệu, phân tích hiệu năng, hỗ trợ kỹ thuật, xác thực tài khoản hoặc xử lý thanh toán nếu có.",
      "Các bên cung cấp dịch vụ chỉ được tiếp cận dữ liệu ở mức cần thiết để thực hiện công việc cho PENTAVA và phải tuân thủ các yêu cầu bảo mật phù hợp.",
      "PENTAVA cũng có thể chia sẻ dữ liệu nếu cần tuân thủ pháp luật, bảo vệ quyền lợi hợp pháp, xử lý tranh chấp, điều tra vi phạm hoặc bảo vệ sự an toàn của người dùng và cộng đồng.",
      "Khi bạn tự nguyện chia sẻ nội dung trong không gian cộng đồng, nhóm đồng hành hoặc các khu vực có tính tương tác, những người dùng khác trong phạm vi hiển thị của tính năng đó có thể xem nội dung bạn đăng.",
    ],
  },
  {
    id: "cookies",
    label: "05",
    title: "Cookie, phân tích và dịch vụ bên thứ ba",
    eyebrow: "Cookies & Third Parties",
    paragraphs: [
      "Website và app PENTAVA có thể sử dụng cookie hoặc công nghệ tương tự để ghi nhớ tùy chọn, duy trì phiên truy cập, phân tích hiệu năng và cải thiện trải nghiệm người dùng.",
      "Một số tính năng có thể liên kết đến nền tảng hoặc dịch vụ bên thứ ba. Khi bạn rời khỏi website hoặc ứng dụng của PENTAVA để truy cập dịch vụ khác, dữ liệu của bạn sẽ chịu sự điều chỉnh bởi chính sách riêng của bên thứ ba đó.",
      "PENTAVA không chịu trách nhiệm đối với nội dung, hệ thống bảo mật hoặc cách xử lý dữ liệu của website, nền tảng hoặc dịch vụ không thuộc quyền kiểm soát của PENTAVA.",
    ],
  },
  {
    id: "security",
    label: "06",
    title: "Bảo mật, lưu trữ và thời gian giữ dữ liệu",
    eyebrow: "Security & Retention",
    paragraphs: [
      "PENTAVA áp dụng các biện pháp kỹ thuật và tổ chức phù hợp để bảo vệ dữ liệu cá nhân, hình ảnh, video và nội dung người dùng khỏi truy cập trái phép, mất mát, lạm dụng hoặc thay đổi ngoài ý muốn.",
      "Dữ liệu hình ảnh và video từ Visual Verification hoặc PENTA-CINEMA được xem là dữ liệu riêng tư và cần được bảo vệ nghiêm túc trong quá trình lưu trữ, xử lý và hiển thị.",
      "Tuy nhiên, không có phương thức truyền tải hoặc lưu trữ điện tử nào có thể đảm bảo an toàn tuyệt đối 100%. Người dùng nên sử dụng mật khẩu mạnh, bảo vệ thiết bị cá nhân và chỉ truy cập PENTAVA trong môi trường an toàn.",
      "PENTAVA chỉ lưu giữ dữ liệu trong thời gian cần thiết để cung cấp dịch vụ, duy trì tài khoản, đáp ứng yêu cầu pháp lý, giải quyết tranh chấp hoặc phục vụ mục đích bảo mật. Khi không còn nhu cầu hợp lý, dữ liệu sẽ được xóa, ẩn danh hoặc cô lập khỏi quá trình xử lý thông thường.",
    ],
  },
  {
    id: "rights",
    label: "07",
    title: "Quyền kiểm soát dữ liệu của người dùng",
    eyebrow: "Your Privacy Rights",
    paragraphs: [
      "Người dùng có quyền yêu cầu truy cập, cập nhật, chỉnh sửa hoặc xóa dữ liệu cá nhân trong phạm vi pháp luật cho phép và theo khả năng kỹ thuật của hệ thống.",
      "Bạn có thể yêu cầu xóa tài khoản, xóa kho lưu trữ hình ảnh, thay đổi thông tin hồ sơ, rút lại sự đồng ý đối với một số quyền truy cập hoặc tắt các quyền như camera, thông báo, vị trí trong phần cài đặt thiết bị.",
      "Việc rút lại sự đồng ý có thể ảnh hưởng đến khả năng sử dụng một số tính năng, đặc biệt là những tính năng cần hình ảnh, video, thông báo hoặc dữ liệu thiết bị để hoạt động.",
      "Nếu bạn có câu hỏi về dữ liệu cá nhân hoặc muốn gửi yêu cầu liên quan đến quyền riêng tư, bạn có thể liên hệ với PENTAVA qua kênh hỗ trợ được công bố trên website hoặc ứng dụng.",
    ],
  },
  {
    id: "terms",
    label: "08",
    title: "Điều khoản sử dụng dịch vụ",
    eyebrow: "Terms of Service",
    paragraphs: [
      "Khi sử dụng PENTAVA, bạn đồng ý tuân thủ các điều khoản sử dụng, chính sách bảo mật và quy chuẩn cộng đồng được công bố trên website hoặc trong ứng dụng.",
      "PENTAVA được thiết kế cho người dùng từ 13 tuổi trở lên. Người dùng nhỏ tuổi cần có sự đồng ý hoặc giám sát phù hợp từ phụ huynh hoặc người giám hộ theo quy định pháp luật hiện hành.",
      "Bạn có trách nhiệm cung cấp thông tin chính xác, bảo vệ tài khoản, không chia sẻ quyền truy cập trái phép và không sử dụng PENTAVA cho mục đích gây hại, lạm dụng, quấy rối hoặc vi phạm pháp luật.",
      "PENTAVA có thể thay đổi, tạm dừng hoặc ngừng một số tính năng để bảo trì, cải thiện sản phẩm, xử lý lỗi, đảm bảo an toàn hoặc tuân thủ yêu cầu pháp lý.",
    ],
  },
  {
    id: "community",
    label: "09",
    title: "Quy chuẩn nội dung và cộng đồng",
    eyebrow: "Community Standards",
    paragraphs: [
      "PENTAVA hướng đến một không gian đồng hành lành mạnh, nơi người dùng có thể phát triển bản thân theo nhịp riêng mà không bị áp lực bởi so sánh, công kích hoặc cạnh tranh độc hại.",
      "Người dùng không được tải lên, chia sẻ hoặc lan truyền hình ảnh, video, bình luận hoặc nội dung vi phạm pháp luật, đồi trụy, bạo lực, thù ghét, xúc phạm, bắt nạt, quấy rối hoặc tạo áp lực tiêu cực lên thành viên khác.",
      "Các nội dung xâm phạm quyền riêng tư, sử dụng hình ảnh của người khác khi chưa được phép, giả mạo danh tính, cổ vũ hành vi nguy hiểm hoặc phá hoại trải nghiệm cộng đồng đều có thể bị hạn chế.",
      "PENTAVA có quyền ẩn nội dung, hạn chế tính năng, tạm khóa hoặc chấm dứt tài khoản vi phạm quy chuẩn nhằm bảo vệ sự an toàn và văn minh của cộng đồng.",
    ],
  },
  {
    id: "contact",
    label: "10",
    title: "Cập nhật chính sách và liên hệ",
    eyebrow: "Updates & Contact",
    paragraphs: [
      "PENTAVA có thể cập nhật chính sách bảo mật và điều khoản sử dụng theo thời gian để phù hợp với thay đổi của sản phẩm, yêu cầu pháp lý hoặc tiêu chuẩn bảo mật mới.",
      "Phiên bản cập nhật sẽ có hiệu lực khi được công bố trên website hoặc ứng dụng. Người dùng nên kiểm tra trang này định kỳ để nắm được các thay đổi mới nhất.",
      "Nếu bạn có câu hỏi về chính sách bảo mật, điều khoản sử dụng, dữ liệu cá nhân hoặc quy chuẩn cộng đồng, vui lòng liên hệ với PENTAVA thông qua trang Hỗ trợ.",
    ],
  },
]

export default function Privacy() {
  return (
    <>
      <Header />

      <main className="bg-[#F7FAFF] pt-32 text-black lg:pt-28">
        <Reveal>
          <section
            id="overview"
            className="mx-auto max-w-[1180px] px-6 py-20 md:px-8"
          >
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D9D9D9] bg-white px-4 py-2 shadow-[3px_3px_0px_0px_rgba(58,129,87,0.22)]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3A8157] text-white">
                  <span className="material-symbols-outlined text-[18px]">
                    shield_lock
                  </span>
                </span>

                <span className="text-[10px] font-bold uppercase tracking-widest text-[#3A8157]">
                  Legal Center
                </span>
              </div>

              <h1 className="mx-auto mt-8 max-w-5xl font-extrabold tracking-tight text-black">
                <span className="mb-4 block text-[34px] leading-none text-[#3A8157] md:text-[48px]">
                  Chính sách bảo mật
                </span>

                <span className="block text-[38px] leading-[1.1] md:text-[58px]">
                  & Điều khoản sử dụng
                </span>

                <span className="relative mt-5 inline-block text-[48px] leading-none tracking-[-0.06em] text-black md:text-[78px]">
                  <span className="relative z-10">PENTAVA</span>
                  <span className="absolute bottom-1 left-1 right-1 z-0 h-4 rounded-full bg-[#FFC857] md:bottom-2 md:h-6" />
                </span>
              </h1>

              <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-[#727272]">
                Trang này giải thích cách PENTAVA thu thập, xử lý, bảo vệ dữ
                liệu cá nhân và các quy định khi sử dụng website, ứng dụng hoặc
                các tính năng trong hệ sinh thái PENTAVA.
              </p>

              <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#727272]">
                Cập nhật lần cuối: 2026
              </p>
            </div>
          </section>
        </Reveal>

        <section className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-6 pb-24 md:px-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-[28px] border border-[#D9D9D9] bg-white p-5 shadow-[0_5px_0px_0px_rgba(58,129,87,0.16)]">
              <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#3A8157]">
                Mục lục
              </p>

              <nav className="space-y-1">
                {tableOfContents.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block rounded-[16px] px-4 py-3 text-sm font-bold text-[#727272] transition-all hover:translate-x-1 hover:bg-[#F7FAFF] hover:text-[#3A8157]"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="rounded-[32px] border border-[#D9D9D9] bg-white px-6 py-8 shadow-[0_8px_0px_0px_rgba(0,0,0,0.04)] md:px-10 md:py-12">
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className={`scroll-mt-28 ${index !== 0 ? "border-t border-[#D9D9D9] pt-12" : ""
                  } ${index !== sections.length - 1 ? "pb-12" : ""}`}
              >
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F7FAFF] text-sm font-extrabold text-[#3A8157] shadow-[3px_3px_0px_0px_#FFC857]">
                    {section.label}
                  </span>

                  <div>
                    <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#727272]">
                      {section.eyebrow}
                    </p>

                    <h2 className="text-3xl font-extrabold leading-tight text-black md:text-[42px]">
                      {section.title}
                    </h2>
                  </div>
                </div>

                <div className="space-y-5 text-[15px] leading-8 text-[#727272]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

            <div className="mt-8 rounded-[28px] bg-[#3A8157] p-8 text-white shadow-[6px_6px_0px_0px_#FFC857]">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <h3 className="text-2xl font-extrabold">
                    Cần hỗ trợ về dữ liệu hoặc điều khoản?
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75">
                    Gửi yêu cầu cho PENTAVA nếu bạn cần hỗ trợ về tài khoản,
                    dữ liệu cá nhân, quyền riêng tư hoặc quy chuẩn cộng đồng.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
                  <a
                    href="/support"
                    className="w-fit rounded-full bg-white px-7 py-3 text-sm font-extrabold text-[#3A8157] shadow-[4px_4px_0px_0px_#FFC857] transition-all hover:-translate-y-1"
                  >
                    Liên hệ hỗ trợ
                  </a>

                  <a
                    href="https://drive.google.com/drive/folders/1Y_QUnHTtUT8YFWHxWz9zch2Ie-ffSxlj?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-white bg-transparent px-7 py-3 text-sm font-extrabold text-white shadow-[4px_4px_0px_0px_rgba(255,200,87,0.55)] transition-all hover:-translate-y-1 hover:bg-[#FFC857] hover:text-black"
                  >
                    Xem bản đầy đủ

                    <span className="material-symbols-outlined text-[18px]">
                      open_in_new
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>

      <Footer />
    </>
  )
}