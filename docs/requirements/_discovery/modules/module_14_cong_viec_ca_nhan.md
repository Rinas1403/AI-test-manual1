# Module 14 — Việc cần làm & Nhắc nhở

← [Bản đồ hệ thống](../system_map.md) · Trạng thái recon xem [danh mục](../../README.md)

Bao phủ 2 module: **Việc cần làm** (`TODO`) · **Nhắc nhở** (`REMIND`)

> Gộp chung vì cùng loại: hai module nhỏ phục vụ công việc cá nhân của nhân viên, mỗi module một màn hình. Gộp file không gộp prefix.

---

## TODO — Việc cần làm

| Mục | Giá trị |
|---|---|
| Tên trên UI | Todo items (tiêu đề trang: *My To Do Items*) |
| Route | `/admin/todo` |
| Loại màn hình | Danh sách cá nhân |
| Vị trí menu | ⚠️ **KHÔNG có trong sidebar** — chỉ vào được từ icon trên header |
| CRUD | ✅ Đầy đủ — `New To Do` |

### Đặc điểm

Đây là **danh sách riêng của từng nhân viên** ("My To Do Items"), khác hẳn `TASK` (công việc chung, có phân công, gắn dự án).

| So sánh | `TODO` | `TASK` |
|---|---|---|
| Phạm vi | Cá nhân người đăng nhập | Toàn hệ thống, có phân công |
| Gắn dự án | ❌ | ✅ |
| Status flow | Đơn giản (xong/chưa) | 5 trạng thái |
| Vị trí | Header icon | Sidebar cấp 1 |

→ Hai module khác nhau rõ ràng, không gộp prefix.

### Ước lượng độ lớn

~8 REQ.

### Vùng chưa xác minh

- Cấu trúc danh sách: có cột kéo thả sắp xếp không, có phân nhóm xong/chưa xong không
- Todo của người này người khác có thấy không (liên quan AMB-02)

---

## REMIND — Nhắc nhở

| Mục | Giá trị |
|---|---|
| Tên trên UI | Reminders |
| Route | `/admin/misc/reminders` |
| Loại màn hình | Danh sách tổng hợp |
| Vị trí menu | ⚠️ **KHÔNG có trong menu nào** — chỉ vào được từ nút `View All` của widget trên Dashboard |
| CRUD | ⚠️ **Không có nút tạo ở màn hình này** |

### Cột bảng danh sách

`Related to` · `Description` · `Date` · `Remind` · `Is notified?`

### Phát hiện — đã kiểm chứng

Thanh công cụ **không có nút tạo nào**; cột đầu tiên là **`Related to`**.

→ Kết luận: `REMIND` là **tính năng cắt ngang** — nhắc nhở được tạo từ bên trong entity khác (khách hàng, lead, hoá đơn, hợp đồng…), còn màn hình này chỉ là nơi xem tổng hợp. Cần xác nhận danh sách entity tạo được nhắc nhở — xem **AMB-04**.

Hệ quả cho test case: TC tạo nhắc nhở phải bắt đầu từ màn hình entity liên quan, **không** từ `/admin/misc/reminders`.

### Điểm đáng chú ý

| Điểm | Ý nghĩa |
|---|---|
| Cột `Is notified?` | Có cơ chế gửi thông báo (email/in-app) chạy nền → khó kiểm chứng ngay, giống vấn đề của `SUBS` |
| Cột `Remind` | Nhắc ai — có thể nhắc người khác, không chỉ bản thân |
| Route nằm dưới `/misc/` | Gợi ý đây là nhóm tính năng phụ trợ; có thể còn route `/misc/*` khác chưa phát hiện |

### Ước lượng độ lớn

~6 REQ.

### Vùng chưa xác minh

- Danh sách entity tạo được nhắc nhở (AMB-04)
- Cơ chế gửi thông báo: kênh nào, đúng giờ không
- Còn route `/admin/misc/*` nào khác không (liên quan AMB-08)

---

## Evidence chung của nhóm

| Tệp | Chứng minh |
|---|---|
| [`todo_list_default_fullpage.png`](../evidence/todo_list_default_fullpage.png) | `TODO` tồn tại, có nút `New To Do` |
| [`reminders_list_default_fullpage.png`](../evidence/reminders_list_default_fullpage.png) | `REMIND` **không có nút tạo**, có cột `Related to` — bằng chứng đây là tính năng cắt ngang |
