import { FeatureCarousel, type CarouselImage } from "@/components/ui/feature-carousel"

const featureImages: CarouselImage[] = [
  {
    src: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    alt: "Routine 1 chạm tinh gọn",
    tag: "01 · CÂN BẰNG",
    title: "Routine 1 chạm mỗi ngày",
    desc: "5 micro-task gợi ý cân bằng vận động, dinh dưỡng, giấc ngủ & tâm trạng",
  },
  {
    src: "/image/pentava-app-home.png",
    alt: "Giao diện ứng dụng PENTAVA",
    tag: "02 · CÁ NHÂN HÓA",
    title: "Onboarding thông minh 2 phút",
    desc: "Thuật toán thấu hiểu nhịp sinh học và tạo lộ trình khởi đầu phù hợp",
  },
  {
    src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
    alt: "Visual Verification chân thật",
    tag: "03 · TRỰC QUAN",
    title: "Visual Verification sống động",
    desc: "Thay checkbox khô khan bằng ảnh thật để hành trình có dấu vết đáng nhớ",
  },
  {
    src: "/image/pentava-web-cinema.png",
    alt: "PENTA-CINEMA Weekly Recap",
    tag: "04 · ĐIỆN ẢNH",
    title: "PENTA-CINEMA Weekly Recap",
    desc: "Tự động biên tập nỗ lực mỗi tuần thành một thước phim điện ảnh cảm xúc",
  },
  {
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    alt: "Nhịp thở an lành phục hồi",
    tag: "05 · TỬ TẾ",
    title: "Nhịp thở an lành phục hồi",
    desc: "Hạ 40% cường độ khi mệt mỏi, tuyệt đối không trừng phạt bằng chuỗi streak",
  },
]

export default function Features() {
  const title = (
    <>
      Trải nghiệm{" "}
      <span className="relative inline-block text-[#3A8157]">
        Đa góc nhìn
        <span className="absolute -bottom-1 left-0 right-0 h-3 rounded-full bg-[#FFC857]/60 -z-10" />
      </span>{" "}
      cùng PENTAVA
    </>
  )

  return (
    <section id="features" className="scroll-mt-24">
      <FeatureCarousel
        eyebrow="TÍNH NĂNG CỐT LÕI"
        title={title}
        subtitle="Khám phá các góc nhìn thực tế về hệ sinh thái PENTAVA qua không gian 3D tương tác. Tự động chuyển đổi hoặc điều hướng bằng nút mũi tên."
        images={featureImages}
      />
    </section>
  )
}
