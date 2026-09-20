# Module 01 — Khách hàng & Người liên hệ

← [Bản đồ hệ thống](../system_map.md) · Trạng thái recon xem [danh mục](../../README.md)

Bao phủ 2 module: **Khách hàng** (`CUST`) · **Người liên hệ** (`CONTACT`)

> Gộp chung một file vì quan hệ cha–con chặt: Người liên hệ không tồn tại độc lập ngoài Khách hàng. **Gộp file không gộp prefix** — hai module này vẫn sinh ra hai thư mục `docs/requirements/customers/` và `docs/requirements/contacts/` riêng ở tầng module.

---

## CUST — Khách hàng

| Mục | Giá trị |
|---|---|
| Tên trên UI | Customers |
| Route | `/admin/clients` · chi tiết `/admin/clients/client/{id}` |
| Loại màn hình | Danh sách (DataTables) + form chi tiết nhiều tab |
| Vị trí menu | Sidebar, mục cấp 1 thứ 2 |
| CRUD | ✅ Đầy đủ — `New Customer`, sửa/xoá trong chi tiết |
| Nhập liệu hàng loạt | ✅ `Import Customers` |
| Status flow | ❌ Không có trạng thái vòng đời; chỉ có cờ **Active** (bật/tắt) |

### Cột bảng danh sách (đọc từ `thead`)

`-` (checkbox chọn hàng) · `#` · `Company` · `Primary Contact` · `Primary Email` · `Phone` · `Active` · `Groups` · `Date Created`

### Bộ lọc quan sát được

Lọc theo: phone · active state · invoice · estimates · proposals · projects · contracts type · city. Có cơ chế **New Filter / Clear Filter** (lưu bộ lọc). Có thao tác hàng loạt: chuyển nhóm (`move_to_groups_customers_bulk[]`), lọc theo `tax`.

### Vì sao 🔴 Risk cao

- Là **gốc phụ thuộc** của gần như mọi module khác (hợp đồng, hoá đơn, dự án, ticket… đều trỏ về Customer)
- Chứa dữ liệu định danh khách hàng
- Có Import hàng loạt — đường vào dễ sinh dữ liệu hỏng nhất

### Ước lượng độ lớn

~20 REQ. Form chi tiết nhiều tab (Profile, Contacts, Invoices, Estimates, Projects…) — **chưa đếm chính xác số tab**, cần xác minh khi recon.

### Vùng chưa xác minh của riêng module này

- Số tab thật của màn hình chi tiết khách hàng
- Danh sách field bắt buộc của form tạo mới
- Quy tắc của Groups (nhóm khách hàng) — màn hình quản lý nhóm nằm ở đâu
- Luồng Import: định dạng tệp, quy tắc validate dòng lỗi

### Evidence

| Tệp | Chứng minh |
|---|---|
| [`customers_list_default_fullpage.png`](../evidence/customers_list_default_fullpage.png) | Module tồn tại, dạng danh sách, có New Customer / Import Customers / Contacts |

---

## CONTACT — Người liên hệ

| Mục | Giá trị |
|---|---|
| Tên trên UI | Contacts |
| Route | `/admin/clients/all_contacts` (danh sách chéo) · `/admin/clients/client/{id}?group=contacts` (trong 1 khách hàng) |
| Loại màn hình | Danh sách (DataTables) |
| Vị trí menu | ⚠️ **KHÔNG có trong sidebar** — chỉ vào được bằng nút `Contacts` trên trang Customers |
| CRUD | ✅ — tạo/sửa trong phạm vi một khách hàng |
| Status flow | ❌ Không có; có cờ Active |

### Vì sao tách riêng khỏi `CUST`

Đã chốt với người dùng ở checkpoint. Căn cứ:

1. Có **danh sách chéo riêng** (`all_contacts`) tổng hợp người liên hệ của mọi khách hàng — không chỉ là một tab
2. Có **vòng đời riêng**: bật/tắt hoạt động, phân quyền riêng, nhận thông báo riêng
3. Là **entity đăng nhập** vào trang Customer portal (URL khác, xem AMB-05) → sau này là cầu nối giữa hai hệ thống

> ⚠️ `/admin/contacts` trả **404** — đường dẫn đúng là `/admin/clients/all_contacts`. Đây là bẫy dễ đoán sai.

### Vì sao 🔴 Risk cao

Nắm thông tin đăng nhập và quyền truy cập của phía khách hàng. Sai phân quyền ở đây là lộ dữ liệu giữa các khách hàng khác nhau.

### Ước lượng độ lớn

~12 REQ.

### Vùng chưa xác minh của riêng module này

- Cột của bảng `all_contacts` — chưa mở trang này (mới chỉ đọc được href của nút)
- Ma trận quyền của Contact (mục nào của portal được xem)
- Quy tắc contact chính (Primary Contact) — một khách hàng có bắt buộc đúng một primary không
- Luồng gửi lời mời / đặt mật khẩu cho contact

### Evidence

| Tệp | Chứng minh |
|---|---|
| [`customers_list_default_fullpage.png`](../evidence/customers_list_default_fullpage.png) | Nút `Contacts` tồn tại trên trang Customers (đường vào duy nhất tới danh sách chéo) |

> ⚠️ Chưa có ảnh riêng của màn hình `all_contacts` — cần bổ sung khi recon module này.
