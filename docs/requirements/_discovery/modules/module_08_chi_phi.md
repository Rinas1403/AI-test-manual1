# Module 08 — Chi phí

← [Bản đồ hệ thống](../system_map.md) · Trạng thái recon xem [danh mục](../../README.md)

Bao phủ 1 module: **Chi phí** (`EXP`)

---

## EXP — Chi phí

| Mục | Giá trị |
|---|---|
| Tên trên UI | Expenses |
| Route | `/admin/expenses` · tạo mới `/admin/expenses/expense` |
| Loại màn hình | Danh sách (DataTables) |
| Vị trí menu | Sidebar, mục cấp 1 thứ 8 |
| CRUD | ✅ Đầy đủ — nút là **`Record Expense`** (không phải "New") |
| Nhập liệu hàng loạt | ✅ `Import Expenses` |
| Status flow | ❌ Không có cột trạng thái |

### Cột bảng danh sách

`-` (checkbox) · `Category` · `Amount` · `Name` · `Receipt` · `Date` · `Project` · `Customer` · `Invoice` · `Reference #` · `Payment Mode`

### Điểm đáng chú ý cho kiểm thử

| Điểm | Ý nghĩa |
|---|---|
| Cột **`Invoice`** | Chi phí có thể **tính lại cho khách** (billable) → sinh ra dòng trên hoá đơn. Đây là luồng nối `EXP` → `INV`, cần test riêng |
| Cột **`Receipt`** | Có đính kèm tệp chứng từ → test upload, định dạng, dung lượng |
| Cột **`Category`** | Danh mục loại chi phí — màn hình quản lý khả năng nằm trong vùng bị chặn (AMB-01) |
| Cột **`Payment Mode`** | Dùng chung danh mục với `PAY` |
| Vừa gắn `Project` vừa gắn `Customer` | Hai chiều quy kết chi phí — cần rõ quy tắc khi chỉ có một trong hai |
| `Import Expenses` | Đường vào hàng loạt |

### Vì sao 🟡 Risk trung bình

Có giá trị tiền và ảnh hưởng báo cáo lãi/lỗ (`/admin/reports/expenses_vs_income`), nhưng là tiền **chi ra nội bộ** — sai sót không tác động trực tiếp tới khách hàng như hoá đơn. Nâng lên 🔴 nếu xác nhận luồng billable → hoá đơn khách hoạt động.

### Ước lượng độ lớn

~12 REQ.

### Vùng chưa xác minh của riêng module này

- Luồng chi phí billable: đánh dấu ở đâu, xuất hiện trên hoá đơn thế nào
- Danh mục Category quản lý ở đâu
- Chi phí lặp lại (recurring expense) — Perfex có tính năng này, chưa thấy trên danh sách
- Quy tắc upload Receipt
- Quan hệ với tab Expenses trong màn hình Dự án

### Evidence

| Tệp | Chứng minh |
|---|---|
| [`expenses_list_default_fullpage.png`](../evidence/expenses_list_default_fullpage.png) | Module tồn tại, có cột Invoice và Receipt, có Import Expenses |
