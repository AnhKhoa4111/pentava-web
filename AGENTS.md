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
PENTAVA sử dụng phong cách **Playful Neo-Brutalist & Artisanal Clean** (vừa vui tươi, kỷ luật tích cực, vừa hiện đại, rõ khối):

### Bảng màu thương hiệu (Brand Colors)
- 🌿 **Health / Chủ đạo:** `#3A8157` (Xanh lá rừng - sức sống, bền bỉ)
- ⚡ **Energy / Năng lượng:** `#FFC857` (Vàng ấm - tươi mới, bắt mắt)
- 🌊 **Calm / Bình yên:** `#529CFF` (Xanh dương - cân bằng, tin cậy)
- 🔮 **Purple / Cảm xúc:** `#8B63F6` (Tím - PENTA-CINEMA, mood)
- 🎯 **Alert / Chú ý:** `#F25F5C` (Đỏ cam nhẹ - pain points, lưu ý)
- 📄 **Backgrounds:** `#F7FAFF` (Nền sáng nhẹ), `#FFFFFF` (Card)
- 🖋️ **Text:** `#000000` (Tiêu đề đậm), `#727272` (Mô tả), `#D9D9D9` (Viền border)

### Quy chuẩn Card & Shadows (Neo-brutalist Offset Shadow)
- Không dùng shadow mờ mịt thông thường, ưu tiên **solid offset shadow**:
  - `shadow-[4px_4px_0px_0px_#FFC857]`
  - `shadow-[6px_6px_0px_0px_#3A8157]`
  - `shadow-[8px_8px_0px_0px_#3A8157]`
  - `shadow-[12px_12px_0px_0px_#FFC857]`
- Bo góc: `rounded-2xl` hoặc `rounded-3xl` cho card, `rounded-full` cho pill badge và nút bấm.
- Viền: `border-2 border-black` hoặc `border border-[#D9D9D9]`.

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
│   │   ├── Ticker.tsx       # NumberTicker (nhảy số) & ActivityTicker (tin tức chạy)
│   │   ├── Reveal.tsx       # Wrapper reveal cũ
│   │   └── ScrollToTop.tsx  # Nút cuộn lên đầu trang
│   ├── layouts/             # Header.tsx, Footer.tsx
│   ├── sections/            # Các section landing page đã được modular hóa:
│   │   ├── Hero.tsx         # Hero banner, stats cards, mockup app
│   │   ├── Solution.tsx     # Problem vs Solution với useScroll timeline progress
│   │   ├── Features.tsx     # 3D Perspective Feature Carousel
│   │   ├── Cinema.tsx       # PENTA-CINEMA preview & recap cards
│   │   ├── CommunityPreview.tsx # Live Ticker, ScrambleText, High-Five counter
│   │   ├── CTA.tsx          # Download banner, Live NumberTicker, QR card
│   │   └── FAQ.tsx          # Animated accordion với Category filters
│   └── ui/                  # Component chuẩn shadcn:
│       ├── button.tsx       # Button chuẩn shadcn với cva & Radix Slot
│       └── feature-carousel.tsx # 3D perspective carousel engine
├── lib/
│   └── utils.ts             # Helper cn() (clsx + tailwind-merge)
├── pages/
│   ├── Home.tsx             # Trang chủ rút gọn (~27 dòng, chỉ ghép các section)
│   ├── About.tsx, Cinema.tsx, Community.tsx, v.v.
├── App.tsx
├── index.css                # Token CSS, Tailwind v4
└── main.tsx
```

---

## 5. Danh mục các Module đã hoàn thiện trên nhánh `feature/thanhhai`
1. **Trang chủ [Home.tsx](file:///d:/FPT7/EXE101/pentava-web/src/pages/Home.tsx):** Đã phân rã từ file nguyên khối 400+ dòng thành các component section độc lập trong `src/components/sections/`.
2. **[Solution.tsx](file:///d:/FPT7/EXE101/pentava-web/src/components/sections/Solution.tsx):** Thiết kế dạng Sticky Timeline 2 cột, kết hợp `useScroll` + `useSpring` làm thanh tiến trình chạy dọc theo nhịp cuộn trang.
3. **[Features.tsx](file:///d:/FPT7/EXE101/pentava-web/src/components/sections/Features.tsx):** Tích hợp **3D Perspective Feature Carousel** (`rotateY`, `scale`, `[perspective:1000px]`, nút Prev / Next và chỉ báo phân trang).
4. **[CommunityPreview.tsx](file:///d:/FPT7/EXE101/pentava-web/src/components/sections/CommunityPreview.tsx):** Tích hợp `ScrambleText`, `ActivityTicker` (tin trực tiếp), `NumberTicker` và nút bấm tương tác High-Five đập tay.
5. **[CTA.tsx](file:///d:/FPT7/EXE101/pentava-web/src/components/sections/CTA.tsx):** Thêm bộ đếm lượt tải `NumberTicker` và thẻ QR quét mã Neo-brutalist.
6. **[FAQ.tsx](file:///d:/FPT7/EXE101/pentava-web/src/components/sections/FAQ.tsx):** Bộ lọc chủ đề (Category pills) + Accordion động `<AnimatePresence>` + Hộp hỗ trợ.

---

## 6. HƯỚNG DẪN PHÒNG NGỪA & XỬ LÝ CONFLICT KHI MERGE CODE (QUAN TRỌNG)

### A. Những vị trí DỄ XẢY RA CONFLICT nhất:
1. **`src/pages/Home.tsx`:**
   - **Thực trạng:** Nhánh này (`feature/thanhhai`) đã tách `Home.tsx` thành `<Hero />`, `<Solution />`, `<Features />`, v.v.
   - **Xử lý:** Nếu nhánh của bạn bạn vẫn giữ `Home.tsx` nguyên khối cũ nhưng có sửa đổi nội dung: **Ưu tiên giữ cấu trúc modular mới của `Home.tsx`**, sau đó chuyển các thay đổi nội dung của bạn vào đúng file component tương ứng trong `src/components/sections/`.
2. **`package.json` & `package-lock.json`:**
   - **Thực trạng:** Nhánh này đã cài thêm `lucide-react`, `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `tailwind-merge`.
   - **Xử lý:** Giữ **CẢ HAI** bên dependencies (không xóa dependencies của nhánh nào). Sau khi merge xong `package.json`, luôn chạy `npm install` để cập nhật lại `package-lock.json`.
3. **`vite.config.ts` & `tsconfig.app.json`:**
   - **Thực trạng:** Đã thêm alias `@/*` trỏ tới `./src/*`.
   - **Xử lý:** Giữ lại cấu hình alias `@/*` để tránh lỗi import `Cannot find module '@/...'`.

### B. Quy trình Merge an toàn từng bước:
```bash
# Bước 1: Đảm bảo nhánh hiện tại đã commit sạch sẽ
git status

# Bước 2: Chuyển sang nhánh của bạn bạn (hoặc nhánh target cần merge)
git checkout <ten-nhanh-cua-ban>
git pull origin <ten-nhanh-cua-ban>

# Bước 3: Tạo 1 nhánh backup đề phòng (khuyên dùng)
git branch backup-truoc-khi-merge

# Bước 4: Thực hiện merge nhánh feature/thanhhai vào
git merge feature/thanhhai

# Bước 5: Nếu có conflict (CONFLICT in ...):
# - Mở VS Code / IDE để xem các file bị conflict
# - Với package.json: Giữ cả 2 danh sách package
# - Với Home.tsx: Giữ phiên bản import modular các sections
# - Với các file sections mới trong src/components/sections/: Giữ code mới
# Sau khi resolve xong:
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
