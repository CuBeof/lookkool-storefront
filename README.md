# 🎀 lookkool — cute finds that make you look cool

Storefront thương mại điện tử dropshipping cho thị trường Mỹ, bán **trang sức, đồ
chơi/plushie, đồ trang trí và đồ để bàn nhỏ xinh**. Xây bằng **Next.js (App
Router) + shadcn/ui + Tailwind v4**, thiết kế pastel cute/playful, sẵn sàng cắm
**MedusaJS v2** làm backend.

> Storefront chạy được ngay với **dữ liệu mẫu** — không cần backend. Khi bạn
> deploy Medusa, chỉ cần thêm vài biến môi trường là toàn bộ data tự lấy từ
> Store API thật.

## ✨ Tính năng (MVP)

- **Trang chủ** có branding: hero, value props, showcase danh mục, bestsellers,
  banner khuyến mãi, fresh drops, newsletter.
- **Danh mục & sản phẩm**: listing theo 4 nhóm (jewelry, toys, decor, desk),
  lọc/sắp xếp, trang chi tiết sản phẩm (gallery, chọn biến thể, số lượng,
  accordion thông tin, sản phẩm liên quan).
- **Giỏ hàng & checkout**: cart drawer + trang giỏ đầy đủ, thanh "free shipping",
  lưu localStorage, luồng checkout demo + trang xác nhận đơn.
- **Tài khoản & tìm kiếm**: đăng nhập/đăng ký (mock), trang tài khoản, lịch sử
  đơn hàng, tìm kiếm sản phẩm.

## 🚀 Bắt đầu

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Các lệnh khác: `pnpm build`, `pnpm start`, `pnpm lint`.

## 🔌 Kết nối MedusaJS v2

1. Deploy một backend Medusa v2 (jewelry/toys/decor/desk làm product
   categories với handle tương ứng).
2. Copy `.env.example` → `.env.local` và điền:

   ```env
   NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://api.lookkool.com
   NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_...
   NEXT_PUBLIC_MEDUSA_REGION_ID=reg_...   # vùng US (tuỳ chọn)
   ```

3. Khi `isMedusaConfigured()` = true, lớp data trong
   `src/lib/medusa/index.ts` tự fetch từ Store API và map về cùng kiểu dữ liệu —
   phần còn lại của app không cần đổi gì. Mọi lỗi gọi API sẽ tự fallback về dữ
   liệu mẫu.

## 🗂️ Cấu trúc

```
src/
  app/                    # routes (App Router)
    page.tsx              # trang chủ
    products/             # listing + [handle] (PDP)
    categories/[handle]/  # trang danh mục
    search/  cart/  checkout/  login/  account/
  components/
    ui/                   # shadcn primitives (button, card, sheet, …)
    layout/               # header, footer, cart drawer, logo
    home/                 # hero, category showcase, value props
    product/              # card, grid, gallery, add-to-cart, sort
  lib/
    types.ts              # kiểu domain (gần với Medusa Store API)
    format.ts             # format tiền USD
    cart-context.tsx      # state giỏ hàng (localStorage)
    auth-context.tsx      # auth + order history (mock)
    data/                 # catalog mẫu (categories, products)
    medusa/               # config + data layer (mock ⇄ Medusa)
```

## 🎨 Thiết kế

Theme pastel candy-pink / mint / lavender, bo góc tròn, font **Fredoka**
(display) + **Nunito** (body). Tokens định nghĩa trong `src/app/globals.css`
(hỗ trợ cả light & dark).

> Ảnh sản phẩm hiện dùng placeholder từ picsum.photos — thay bằng ảnh thật từ
> nhà cung cấp dropshipping khi golive.
