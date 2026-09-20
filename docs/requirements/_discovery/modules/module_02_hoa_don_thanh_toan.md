# Module 02 — Hoá đơn, Thanh toán & Giấy báo có

← [Bản đồ hệ thống](../system_map.md) · Trạng thái recon xem [danh mục](../../README.md)

Bao phủ 3 module: **Hoá đơn** (`INV`) · **Thanh toán** (`PAY`) · **Giấy báo có** (`CRNOTE`)

> Gộp chung vì cùng một phân hệ tài chính sau bán hàng và **luôn được khảo sát cùng nhau** — `PAY` không tạo được nếu không đi qua `INV`. Gộp file không gộp prefix.

---

## INV — Hoá đơn

| Mục | Giá trị |
|---|---|
| Tên trên UI | Invoices |
| Route | `/admin/invoices` · tạo mới `/admin/invoices/invoice` · lọc `/admin/invoices/list_invoices?status={n}` |
| Loại màn hình | Danh sách (DataTables) + form chứng từ có dòng hàng |
| Vị trí menu | Sidebar → nhóm **Sales** |
| CRUD | ✅ Đầy đủ — `Create New Invoice` |
| Màn hình phụ | **Recurring Invoices** (hoá đơn định kỳ) — nút riêng trên thanh công cụ |

### Cột bảng danh sách

`Invoice #` · `Amount` · `Total Tax` · `Date` · `Customer` · `Project` · `Tags` · `Due Date` · `Status`

### Trạng thái — CHƯA ĐẦY ĐỦ

Quan sát trực tiếp trên dữ liệu hiện có: **Paid**, **Unpaid**.
Từ widget Dashboard đọc thêm được các nhãn lọc: **Draft** (`status=6`), **Not Sent** (`filter=not_sent`), **Unpaid** (`status=1`), **Partially Paid** (`status=3`), **Overdue** (`status=4`), **Paid** (`status=2`).

> ⚠️ Đây là nhãn lấy từ link lọc, **chưa** phải ma trận trạng thái đã kiểm chứng. Xem AMB-07. Khi recon phải mở dropdown lọc để lấy danh sách đầy đủ và xác định chuyển trạng thái nào được phép.

### Vì sao 🔴 Risk cao

Liên quan trực tiếp tới tiền: số tiền, thuế, hạn thanh toán, trạng thái công nợ. Đồng thời là nguồn của `PAY` và `CRNOTE`.

### Ước lượng độ lớn

~22 REQ — nhiều nhất trong nhóm. Form có dòng hàng, thuế, chiết khấu, tiền tệ, hoá đơn định kỳ.

### Vùng chưa xác minh của riêng module này

- Cấu trúc dòng hàng (thêm item từ danh mục `ITEM`, thuế 2 tầng)
- Quy tắc hoá đơn định kỳ: chu kỳ, ngày tái lập, điều kiện dừng
- Luồng gửi hoá đơn cho khách + trạng thái Not Sent
- Quan hệ với `PRJ` (cột Project) và với `EXP` (cột Invoice ở Chi phí)

---

## PAY — Thanh toán

| Mục | Giá trị |
|---|---|
| Tên trên UI | Payments |
| Route | `/admin/payments` · chi tiết `/admin/payments/payment/{id}` · xoá `/admin/payments/delete/{id}` |
| Loại màn hình | Danh sách (DataTables) |
| Vị trí menu | Sidebar → nhóm **Sales** |
| CRUD | ⚠️ **Read / Update / Delete — KHÔNG có Create ở màn hình này** |

### Phát hiện quan trọng — đã kiểm chứng

Thanh công cụ trang Payments **không có nút tạo nào**. Toàn bộ nút khả dụng chỉ gồm: chọn số dòng/trang, `Export`, nút làm mới, ô tìm kiếm.

Hàng dữ liệu chỉ chứa link: xem/sửa `payments/payment/{id}`, xoá `payments/delete/{id}`, link ngược về `invoices/list_invoices/{id}` và `clients/client/{id}`.

→ Kết luận: **Payment được tạo từ bên trong một Invoice**, không tạo độc lập. Điều này đổi hẳn cách viết test case: TC "ghi nhận thanh toán" phải bắt đầu từ màn hình Hoá đơn, không phải từ menu Payments. Cần xác nhận bằng AMB-03.

### Cột bảng danh sách

`Payment #` · `Invoice #` · `Payment Mode` · `Transaction ID` · `Customer` · `Amount` · `Date`

### Vì sao 🔴 Risk cao

Ghi nhận tiền đã thu. Sai hoặc trùng là sai sổ sách.

### Ước lượng độ lớn

~8 REQ — bản thân màn hình đơn giản, nhưng luồng tạo nằm ở `INV`.

### Vùng chưa xác minh của riêng module này

- Đường vào tạo thanh toán trong màn hình Invoice (AMB-03)
- Danh sách Payment Mode khả dụng (màn hình cấu hình nằm trong vùng bị chặn — AMB-01)
- Quy tắc thanh toán một phần → có đẩy Invoice sang `Partially Paid` không

### Evidence

| Tệp | Chứng minh |
|---|---|
| [`payments_list_default_fullpage.png`](../evidence/payments_list_default_fullpage.png) | **Không có nút tạo** trên thanh công cụ — bằng chứng chính của phát hiện trên |

---

## CRNOTE — Giấy báo có

| Mục | Giá trị |
|---|---|
| Tên trên UI | Credit Notes |
| Route | `/admin/credit_notes` · tạo mới `/admin/credit_notes/credit_note` |
| Loại màn hình | Danh sách (DataTables) |
| Vị trí menu | Sidebar → nhóm **Sales** |
| CRUD | ✅ Đầy đủ — `New Credit Note` |

### Cột bảng danh sách

`Credit Note #` · `Credit Note Date` · `Customer` · `Status` · `Project` · `Reference #` · `Amount` · `Remaining Amount`

Có cột `Status` và cột `Remaining Amount` → entity này **có trạng thái** và có khái niệm số dư còn lại (áp được vào hoá đơn khác). Dữ liệu hiện tại chưa đủ để thấy các giá trị trạng thái — xem AMB-07.

### Vì sao 🔴 Risk cao

Là nghiệp vụ hoàn/giảm trừ tiền. Sai số dư còn lại dẫn tới áp nhầm vào hoá đơn khác.

### Ước lượng độ lớn

~12 REQ.

### Vùng chưa xác minh của riêng module này

- Bộ trạng thái đầy đủ
- Luồng áp giấy báo có vào hoá đơn → ảnh hưởng `Remaining Amount` thế nào
- Quan hệ với `INV` khi hoá đơn đã thanh toán một phần

### Evidence chung của nhóm

| Tệp | Chứng minh |
|---|---|
| [`invoices_list_default_fullpage.png`](../evidence/invoices_list_default_fullpage.png) | `INV` tồn tại, có Recurring Invoices |
| [`payments_list_default_fullpage.png`](../evidence/payments_list_default_fullpage.png) | `PAY` không có nút tạo |
| [`credit_notes_list_default_fullpage.png`](../evidence/credit_notes_list_default_fullpage.png) | `CRNOTE` tồn tại, có cột Remaining Amount |
