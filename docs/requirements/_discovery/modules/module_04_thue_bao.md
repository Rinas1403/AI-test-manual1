# Module 04 — Thuê bao

← [Bản đồ hệ thống](../system_map.md) · Trạng thái recon xem [danh mục](../../README.md)

Bao phủ 1 module: **Thuê bao** (`SUBS`)

---

## SUBS — Thuê bao

| Mục | Giá trị |
|---|---|
| Tên trên UI | Subscriptions |
| Route | `/admin/subscriptions` · tạo mới `/admin/subscriptions/create` |
| Loại màn hình | Danh sách (DataTables) |
| Vị trí menu | Sidebar, mục cấp 1 thứ 7 |
| CRUD | ✅ Đầy đủ — `New Subscription` |
| Status flow | ✅ Có cột `Status` — giá trị chưa đọc được từ dữ liệu hiện có (AMB-07) |

### Cột bảng danh sách

`#` · `Subscription Name` · `Customer` · `Project` · `Status` · `Next Billing Cycle` · `Date Subscribed` · `Last Sent`

### Vì sao 🔴 Risk cao — và khác các module tiền khác

Thuê bao là module **tự động sinh tiền theo thời gian**. Ba cột `Next Billing Cycle`, `Date Subscribed`, `Last Sent` cho thấy hệ thống tự chạy chu kỳ và tự gửi.

Hệ quả cho kiểm thử:

| Đặc thù | Ảnh hưởng |
|---|---|
| Có tác vụ nền theo lịch | Lỗi không xuất hiện ngay lúc test mà xuất hiện ở kỳ sau → **không** kiểm chứng được bằng một lần bấm nút |
| Sai một lần, sai lặp lại | Khác hoá đơn đơn lẻ: cấu hình chu kỳ sai sẽ nhân lỗi ra nhiều kỳ |
| Gắn với cổng thanh toán | Thuê bao Perfex thường nối Stripe — vùng này **không test được trên môi trường dùng chung** |

### Ước lượng độ lớn

~14 REQ.

### Vùng chưa xác minh của riêng module này

- Bộ trạng thái đầy đủ (Active / Future / Past due / Canceled …)
- Cấu hình chu kỳ: đơn vị, số kỳ, ngày bắt đầu tính
- Có sinh ra `INV` tự động không, và sinh vào lúc nào
- Cổng thanh toán nào đang bật — màn hình cấu hình nằm trong vùng bị chặn (AMB-01)
- Hành vi khi huỷ giữa kỳ

> ⚠️ Môi trường dùng chung: **không** tạo thuê bao thật khi khảo sát. Mọi kiểm chứng chu kỳ billing phải làm trên môi trường riêng.

### Evidence

| Tệp | Chứng minh |
|---|---|
| [`subscriptions_list_default_fullpage.png`](../evidence/subscriptions_list_default_fullpage.png) | Module tồn tại, có cột Next Billing Cycle và Last Sent — xác nhận cơ chế chạy theo chu kỳ |
