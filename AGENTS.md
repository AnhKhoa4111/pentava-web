# AGENTS.md — PENTAVA Web Development Context & Guidelines

> **Tài liệu hướng dẫn dành cho AI Agents (Antigravity, Claude Code, Cursor, Copilot)**  
> Mục tiêu: Cung cấp ngữ cảnh cô đọng, quy chuẩn thiết kế, công nghệ và cách tối ưu token, tránh lạc đề khi phát triển dự án `pentava-web`.

---

## 1. Tổng quan dự án (Project Overview)
- **Tên dự án:** PENTAVA Web (`pentava-web`)
- **Mục tiêu:** Hệ sinh thái phát triển bản thân toàn diện cho người trẻ (thói quen, mood, visual log/journal, PENTA-CINEMA, cộng đồng kết nối văn minh).
- **Tech Stack cốt lõi:**
  - **Framework:** React 19 (`react: ^19.2.7`, `react-dom: ^19.2.7`)
  - **Build Tool:** Vite 8 + TypeScript (~6.0)
  - **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`, `@import "tailwindcss";`)
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
  - `shadow-[12px_12px_0px_0px_#FFC857]`
- Bo góc: `rounded-2xl` hoặc `rounded-[20px]` cho card, `rounded-full` cho pill badge và nút bấm.
- Viền: `border border-[#D9D9D9]` hoặc `border-2 border-black/#3A8157`.

---

## 3. Quy chuẩn Motion & Animation (`motion` v14)
**CỰC KỲ QUAN TRỌNG:** Dự án dùng package `motion` (`^14.0.0`).
- ✅ **Luôn import:**
  ```tsx
  import { motion, AnimatePresence } from "motion/react"
  ```
  *(KHÔNG import từ `"framer-motion"` vì dự án đã cài package mới `"motion"`)*.
- **Scroll triggers:** Luôn thêm `viewport={{ once: true, margin: "-60px" }}` để tránh animation giật lag khi người dùng scroll lên xuống.
- **Hover physics:** Dùng spring mượt mà:
  ```tsx
  whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 17 } }}
  whileTap={{ scale: 0.98 }}
  ```
- **Stagger animation:** Áp dụng delay so le `delay: index * 0.08` cho các list card.

---

## 4. Cấu trúc thư mục (Folder Structure)
```
src/
├── assets/           # Ảnh, tài nguyên tĩnh
├── components/
│   ├── common/       # UI dùng chung (Badge, Card, Reveal, ScrollToTop)
│   ├── layouts/      # Header, Footer
│   └── sections/     # Các khối section (nếu tách lẻ)
├── pages/            # Home.tsx, About.tsx, Community.tsx, Cinema.tsx, v.v.
├── App.tsx
├── index.css         # Token CSS, Tailwind v4
└── main.tsx
```

---

## 5. Nguyên tắc làm việc dành cho AI (Giúp tiết kiệm Token & Tránh lạc đề)
1. **Kiểm tra trước khi code:** Luôn tham chiếu đúng file cần sửa, không tự ý viết lại toàn bộ file nếu chỉ cần nâng cấp 1 phần.
2. **Không tự tạo file rác:** Không tạo các file mock không dùng; ưu tiên tận dụng hoặc hoàn thiện file sẵn có.
3. **Giữ nhất quán ngôn ngữ:** Giao diện website dùng tiếng Việt tự nhiên, thân thiện và giàu cảm hứng phát triển bản thân.
4. **Kiểm tra build:** Sau khi sửa đổi code, luôn đảm bảo chạy `npm run build` (tsc + vite) thành công không lỗi type.
5. **Trả lời ngắn gọn:** Trả lời trực tiếp giải pháp, tóm tắt điểm cải tiến, không giải thích lý thuyết dông dài để tiết kiệm context window cho User.
