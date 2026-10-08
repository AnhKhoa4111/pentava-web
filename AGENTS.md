# AGENTS.md — PENTAVA Web Development Context & Guidelines

> **Tài liệu hướng dẫn dành cho AI Agents (Antigravity, Claude Code, Cursor, Copilot) & Đội ngũ phát triển**  
> Mục tiêu: Cung cấp ngữ cảnh cô đọng, quy chuẩn thiết kế, danh mục các module đã xây dựng và **hướng dẫn phòng ngừa / xử lý conflict khi merge code giữa các nhánh**.

---

## 1. Tổng quan dự án (Project Overview)
- **Tên dự án:** PENTAVA Web (`pentava-web`)
- **Mục tiêu:** Hệ sinh thái phát triển bản thân toàn diện cho người trẻ (thói quen, mood, visual log/journal, PENTA-CINEMA, cộng đồng kết nối văn minh).
- **Tech Stack cốt lõi:**
  - **Framework:** React 19 (`react: ^19.2.7`, `react-dom: ^19.2.7`)
  - **Build Tool:** Vite 8 + TypeScript (~6.0)
  - **Path Alias:** Đã cấu hình `@/*` trỏ về `./src/*` (trong cả `vite.config.ts` và `tsconfig.app.json`)
  - **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`, `@import "tailwindcss";`)
  - **UI / Icons / Utility:** 
    - `lucide-react` (icons)
    - `@radix-ui/react-slot` + `class-variance-authority` (shadcn button primitive)
    - `clsx` + `tailwind-merge` (`src/lib/utils.ts` với helper `cn()`)
  - **Animation:** `motion` (`^14.0.0` - Motion for React) & `gsap` (`^3.15.0`)
  - **Routing:** React Router v7 (`react-router-dom: ^7.18.0`)
  - **Linter:** Oxlint (`oxlint: ^1.69.0`)
  - **Font & Icon:** Google Fonts `Be Vietnam Pro` + `Material Symbols Outlined`

---

## 2. Brand Identity & Design System (Ngôn ngữ thiết kế)
PENTAVA sử dụng phong cách **Playful Neo-Brutalist & Artisanal Clean** (vui tươi, kỷ luật tích cực, hiện đại, khối đổ bóng rõ ràng):

### Bảng màu thương hiệu (Brand Colors)
- 🌿 **Health / Chủ đạo:** `#3A8157` (Xanh lá rừng - sức sống, bền bỉ)
- ⚡ **Energy / Năng lượng:** `#FFC857` (Vàng ấm - tươi mới, bắt mắt)
- 🌊 **Calm / Bình yên:** `#529CFF` (Xanh dương - cân bằng, tin cậy)
- 🔮 **Purple / Cảm xúc:** `#8B63F6` (Tím - PENTA-CINEMA, mood)
- 🎯 **Alert / Chú ý:** `#F25F5C` (Đỏ cam nhẹ - pain points, lưu ý)
- 📄 **Backgrounds:** `#F7FAFF` (Nền sáng nhẹ), `#FFFFFF` (Card)
- 🖋️ **Text:** `#000000` (Tiêu đề đậm), `#727272` (Mô tả), `#D9D9D9` (Viền border)

### Quy chuẩn Card & Shadows (Neo-brutalist Offset Shadow)
- Sử dụng **solid offset shadow** dứt khoát, sắc sảo:
  - `shadow-[4px_4px_0px_0px_#FFC857]`
  - `shadow-[4px_4px_0px_0px_#3A8157]`
  - `shadow-[6px_6px_0px_0px_#3A8157]`
  - `shadow-[8px_8px_0px_0px_#FFC857]`
  - `shadow-[10px_10px_0px_0px_#3A8157]`
  - `shadow-[12px_12px_0px_0px_#FFC857]`
- Bo góc: `rounded-2xl` hoặc `rounded-3xl` cho card, `rounded-full` cho pill badge và nút bấm.
- Viền: `border-2 border-black` dứt khoát.

---

## 3. Quy chuẩn Motion & Animation (`motion` v14)
- ✅ **Luôn import:**
  ```tsx
  import { motion, AnimatePresence } from "motion/react"
  ```
  *(KHÔNG import từ `"framer-motion"` vì dự án đã cài package mới `"motion"`)*.
- **Scroll triggers:** Luôn thêm `viewport={{ once: true, margin: "-60px" }}` để tránh animation giật lag khi người dùng scroll lên xuống.
- **Spring physics:** Dùng spring mượt mà `whileHover={{ scale: 1.02 }}` và `whileTap={{ scale: 0.98 }}`.
- **Không tự ý thêm vertical jump (`y: -...`) trên carousel:** Giữ các card cố định trục Y khi lướt ngang để tránh giật giao diện.

---

## 4. Cấu trúc thư mục hiện tại (Folder Structure)
```
src/
├── assets/                  # Ảnh, logo, favicon, tài nguyên tĩnh
├── components/
│   ├── common/              # UI dùng chung:
│   │   ├── ScrambleText.tsx # Hiệu ứng chữ giải mã ngẫu nhiên
│   │   ├── Ticker.tsx       # NumberTicker & ActivityTicker (tin tức chạy)
│   │   ├── Reveal.tsx       # Wrapper reveal
│   │   └── ScrollToTop.tsx  # Nút cuộn lên đầu trang
│   ├── layouts/             # Header.tsx, Footer.tsx (hiệu ứng viền xé giấy torn-paper)
│   ├── sections/            # Các section landing page modular:
│   │   ├── Hero.tsx         # Hero banner, stats cards Neo-brutalist, mockup app
│   │   ├── Solution.tsx     # ScrollReelTestimonials 3D reel + 3 Trụ cột chuyển hóa
│   │   ├── Features.tsx     # 3D Perspective Feature Carousel
│   │   ├── Cinema.tsx       # PENTA-CINEMA preview với shadow tím #8B63F6
│   │   ├── CommunityPreview.tsx # Gợi ý routine ticker, High-Five counter thực tế
│   │   ├── CTA.tsx          # Download banner giá trị thật, QR card Neo-brutalist
│   │   ├── FAQ.tsx          # Animated accordion với cầu nối mượt dẫn xuống Contact
│   │   └── ContactSection.tsx # Form gửi liên hệ, hỗ trợ API backend & admin
│   └── ui/                  # Component chuẩn shadcn:
│       ├── button.tsx       # Button chuẩn shadcn với cva & Radix Slot
│       ├── feature-carousel.tsx # 3D perspective carousel engine
│       └── scroll-reel-testimonials.tsx # 3D counter-rotating reel + per-char text rise
├── lib/
│   └── utils.ts             # Helper cn() (clsx + tailwind-merge)
├── pages/
│   ├── Home.tsx             # Trang chủ rút gọn (~30 dòng, ghép các section độc lập)
│   ├── About.tsx, Cinema.tsx, Community.tsx, Privacy.tsx, Support.tsx
│   ├── Login.tsx, Admin.tsx (Quản trị danh bạ, liên hệ, người dùng)
├── App.tsx                  # BrowserRouter routing + ProtectedAdminRoute
├── index.css                # Token CSS, Tailwind v4, Scroll Reel keyframes
└── main.tsx
```

---

## 5. Danh mục các Module đã hoàn thiện
1. **Trang chủ [Home.tsx](file:///d:/FPT7/EXE101/pentava-web/src/pages/Home.tsx):** Phân rã hoàn toàn thành các component section độc lập, sạch sẽ, tải trang mượt mà.
2. **[Hero.tsx](file:///d:/FPT7/EXE101/pentava-web/src/components/sections/Hero.tsx):** Bộ 3 thẻ thống kê Neo-brutalist solid shadow với màu sắc thương hiệu.
3. **[Solution.tsx](file:///d:/FPT7/EXE101/pentava-web/src/components/sections/Solution.tsx):** Tích hợp `ScrollReelTestimonials` (guồng cuộn ảnh 3 cột counter-rotating, hiệu ứng chữ trồi từng ký tự) kết hợp 3 Trụ cột chuyển hóa cốt lõi.
4. **[Features.tsx](file:///d:/FPT7/EXE101/pentava-web/src/components/sections/Features.tsx):** Tích hợp **3D Perspective Feature Carousel** (`rotateY`, `scale`, `[perspective:1000px]`, nút Prev / Next và chỉ báo phân trang).
5. **[Cinema.tsx](file:///d:/FPT7/EXE101/pentava-web/src/components/sections/Cinema.tsx):** Khung xem trước video PENTA-CINEMA với màu tím `#8B63F6` và nút play nổi bật.
6. **[CommunityPreview.tsx](file:///d:/FPT7/EXE101/pentava-web/src/components/sections/CommunityPreview.tsx):** Loại bỏ toàn bộ số liệu ảo, thay bằng thẻ giá trị tính năng, ticker gợi ý tích cực và nút *"Đập tay tiếp sức"* tăng đếm thực tế.
7. **[CTA.tsx](file:///d:/FPT7/EXE101/pentava-web/src/components/sections/CTA.tsx):** Thay thế số liệu ảo bằng cam kết giá trị phát triển bản thân lành mạnh và thẻ mã QR Neo-brutalist.
8. **[FAQ.tsx](file:///d:/FPT7/EXE101/pentava-web/src/components/sections/FAQ.tsx) & [ContactSection.tsx](file:///d:/FPT7/EXE101/pentava-web/src/components/sections/ContactSection.tsx):** Cầu nối điều hướng trực tiếp xuống form liên hệ `#contact`, chuẩn hóa viền `border-2 border-black` và đổ bóng khối.
9. **UI Components (`/components/ui/`):**
   - `scroll-reel-testimonials.tsx`: Guồng cuộn ảnh 3 cột đối xứng, vệt sáng chéo và hiệu ứng chữ động trồi từng ký tự.
   - `feature-carousel.tsx`: Carousel 3D perspective lướt tính năng siêu mượt.
   - `button.tsx`: Button nguyên bản shadcn chuẩn hoá biến thể.

---

## 6. HƯỚNG DẪN PHÒNG NGỪA & XỬ LÝ CONFLICT KHI MERGE CODE (QUAN TRỌNG)

### A. Những vị trí DỄ XẢY RA CONFLICT nhất:
1. **`src/pages/Home.tsx`:**
   - **Thực trạng:** `Home.tsx` luôn giữ cấu trúc modular (`<Hero />`, `<Solution />`, `<Features />`, `<Cinema />`, `<CommunityPreview />`, `<CTA />`, `<FAQ />`, `<ContactSection id="contact" />`).
   - **Xử lý:** Ưu tiên giữ cấu trúc modular, chuyển các chỉnh sửa nội dung vào đúng file section tương ứng trong `src/components/sections/`.
2. **`package.json` & `package-lock.json`:**
   - **Xử lý:** Giữ cả 2 bên dependencies, sau đó chạy `npm install` để cập nhật lại lockfile.
3. **`vite.config.ts` & `tsconfig.app.json`:**
   - **Xử lý:** Giữ đồng thời cấu hình server proxy `/api` và alias `@/*` trỏ về `./src/*`.

### B. Quy trình Merge an toàn từng bước:
```bash
# Bước 1: Đảm bảo working tree sạch sẽ
git status

# Bước 2: Chuyển sang nhánh target cần merge và pull mới nhất
git checkout <ten-nhanh>
git pull origin <ten-nhanh>

# Bước 3: Tạo nhánh backup đề phòng
git branch backup-truoc-khi-merge

# Bước 4: Thực hiện merge
git merge feature/thanhhai

# Bước 5: Giải quyết conflict nếu có và commit
git add .
git commit -m "Merge feature/thanhhai and resolve conflicts"

# Bước 6: Kiểm tra tính toàn vẹn của ứng dụng
npm install
npm run build
npx oxlint
```

---

## 7. Nguyên tắc vàng dành cho AI Agent khi hỗ trợ Merge:
1. **Không ghi đè mù quáng (Never blindly overwrite):** Luôn so sánh cả 2 bên (Current Change vs Incoming Change) trước khi chấp nhận thay đổi.
2. **Bảo toàn cấu trúc modular:** Không hoàn tác việc chia tách component section về lại file nguyên khối.
3. **Kiểm tra build ngay sau merge:** Luôn chạy `npm run build` (tsc + vite) và `npx oxlint` để xác nhận 0 lỗi trước khi bàn giao cho người dùng.
