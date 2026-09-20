# Module 15 — Nhân sự & Cấu hình hệ thống

← [Bản đồ hệ thống](../system_map.md) · Trạng thái recon xem [danh mục](../../README.md)

Bao phủ 1 module: **Nhân sự & Cấu hình** (`STAFF`)

> 🚫 **BLOCKED** — không khảo sát được bằng tài khoản hiện có. Xem [AMB-01](../system_map.md#7-điểm-mơ-hồ-ambiguity).

---

## STAFF — Nhân sự & Cấu hình hệ thống

| Mục | Giá trị |
|---|---|
| Route đã thử | `/admin/settings` · `/admin/staff` |
| Kết quả | ⛔ Cả hai **chuyển hướng sang `/admin/access_denied`** |
| Thông báo hiển thị | Toast đỏ **"Access denied"** + nội dung trang **"Something went wrong. Try again"** |
| Vị trí menu | **Không có mục nào trong sidebar** — không có icon Setup / bánh răng |
| Nguồn thông tin | ⚠️ **Suy ra từ route bị chặn** — KHÔNG phải quan sát giao diện thật |

### Đây là module được ghi nhận thế nào

Module này **không được khảo sát**. Nó có mặt trong danh mục vì:

1. Route tồn tại và phản hồi bằng **chuyển hướng có chủ đích** (`access_denied`), không phải `404` — nghĩa là chức năng **có tồn tại**, chỉ là tài khoản hiện tại không được vào
2. Nhiều module khác tham chiếu tới danh mục mà khả năng cao được quản lý ở đây: thuế (`ITEM`), Payment Mode (`PAY`, `EXP`), Expense Category (`EXP`), Contract Type (`CONTR`), Department/Service (`TICKET`), Lead Source/Status (`LEAD`)

> ⚠️ Mọi mô tả bên dưới là **giả định chưa kiểm chứng**, đánh dấu rõ để bước sinh test case không hiểu nhầm là đã khảo sát.

### Nội dung dự kiến — CHƯA KIỂM CHỨNG

| Vùng dự kiến | Vì sao nghi có |
|---|---|
| Quản lý nhân viên | Route `/admin/staff` tồn tại; header có link `/admin/staff/edit_profile`, `/admin/staff/timesheets` — tức nhánh `staff` có thật |
| Vai trò & phân quyền | Mọi module đều có cột `Assigned` / `Members` → phải có nơi định nghĩa quyền |
| Danh mục dùng chung | 6+ module tham chiếu danh mục không rõ nguồn (liệt kê ở trên) |
| Cấu hình hệ thống | Route `/admin/settings` tồn tại |

### Vì sao 🔴 Risk cao

Đây là nơi định nghĩa **ai được làm gì** trên toàn hệ thống. Sai phân quyền là rủi ro nghiêm trọng nhất của một CRM (lộ dữ liệu khách hàng giữa các nhân viên, giữa các khách hàng). Đồng thời nó chặn việc lập ma trận phân quyền cho **mọi** module khác (AMB-02).

### Ước lượng độ lớn

❔ **Không ước lượng được** — chưa nhìn thấy màn hình nào.

### Điều kiện gỡ BLOCKED

Cần **một** trong hai:

1. Tài khoản có quyền truy cập `/admin/settings` và `/admin/staff`, **hoặc**
2. Xác nhận đây là giới hạn cố ý của bản demo → chuyển trạng thái module sang ⏸️ Hoãn và ghi rõ ngoài phạm vi

Người dùng đã chọn phương án: **giữ ở trạng thái ⬜ + mở AMB-01 🔴 chờ account**.

### Evidence

| Tệp | Chứng minh |
|---|---|
| [`settings_access_denied_viewport.png`](../evidence/settings_access_denied_viewport.png) | Thông báo "Access denied" khi vào `/admin/settings`; sidebar **không có** mục Setup nào |

> Ảnh chụp viewport (không full-page) vì trang chỉ có một thông báo lỗi, không có nội dung ngoài khung nhìn.
