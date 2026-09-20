# Module 12 — Tiện ích: Thư viện tệp, Lịch & Xuất PDF hàng loạt

← [Bản đồ hệ thống](../system_map.md) · Trạng thái recon xem [danh mục](../../README.md)

Bao phủ 3 module: **Thư viện tệp** (`MEDIA`) · **Lịch** (`CAL`) · **Xuất PDF hàng loạt** (`PDFEXP`)

> Gộp chung vì cùng nằm dưới nhóm menu **Utilities**, mỗi module chỉ 1–2 màn hình và rủi ro đều thấp. Gộp file không gộp prefix.

---

## MEDIA — Thư viện tệp

| Mục | Giá trị |
|---|---|
| Tên trên UI | Media (tiêu đề trang: *Files*) |
| Route | `/admin/utilities/media` |
| Loại màn hình | **File manager (elFinder)** — không phải bảng DataTables |
| CRUD | ✅ — upload / tạo thư mục / đổi tên / xoá, thao tác trong giao diện elFinder |

### Đặc thù kỹ thuật quan trọng

Đây là **thư viện bên thứ ba (elFinder)**, không dùng chung mẫu giao diện với các module khác. Hệ quả cho automation:

| Điểm | Ảnh hưởng |
|---|---|
| DOM hoàn toàn khác | Page Object của module này **không tái sử dụng** được gì từ các module DataTables |
| URL đổi thành hash (`#elf_l1_Lw`) và tiêu đề trang đổi thành `admin-example:Files` sau khi khởi tạo | Không đợi đúng tín hiệu sẽ thao tác vào trang chưa sẵn sàng |
| **Ghi nhận 1 lỗi console** lúc tải trang | Xem RISK-05 — cần xác minh có ảnh hưởng thao tác không |
| Thao tác chuột (kéo thả, chuột phải) | Khó tự động hoá hơn hẳn form thường |

### Risk 🟢 — nhưng chi phí automation cao

Nghiệp vụ đơn giản, nhưng đây là module **tốn công viết automation nhất** trong nhóm rủi ro thấp.

### Ước lượng độ lớn

~8 REQ.

### Vùng chưa xác minh

- Lỗi console là gì, có chặn thao tác không
- Giới hạn dung lượng / định dạng tệp
- Phân quyền thư mục giữa các nhân viên

---

## CAL — Lịch

| Mục | Giá trị |
|---|---|
| Tên trên UI | Calendar |
| Route | `/admin/utilities/calendar` · tạo nhanh `?new_event=true&date={dd-mm-yyyy}` |
| Loại màn hình | Lịch (FullCalendar) |
| CRUD | ✅ — tạo/sửa/xoá sự kiện |
| Chế độ xem | **month · week · day** + nút `today` + bộ lọc (`filter by`) |

### Đặc điểm

`CAL` có entity riêng (**Event**) với vòng đời riêng → đủ tiêu chuẩn cấp prefix riêng, không phải chỉ là màn hình hiển thị.

Lịch **tổng hợp dữ liệu từ module khác** (deadline dự án, hạn công việc, hạn hoá đơn, nhắc nhở) chứ không chỉ hiện sự kiện tự tạo — do đó có bộ lọc. Đây là điểm khiến module tưởng đơn giản nhưng phụ thuộc nhiều nguồn.

### Ước lượng độ lớn

~10 REQ.

### Vùng chưa xác minh

- Bộ lọc gồm những nguồn dữ liệu nào
- Tạo sự kiện: field bắt buộc, sự kiện cả ngày, lặp lại
- Kéo thả đổi ngày có được không
- Sự kiện công khai vs riêng tư

---

## PDFEXP — Xuất PDF hàng loạt

| Mục | Giá trị |
|---|---|
| Tên trên UI | Bulk PDF Export |
| Route | `/admin/utilities/bulk_pdf_exporter` |
| Loại màn hình | **Biểu mẫu công cụ** — không phải danh sách entity |
| CRUD | ⚠️ **Không có CRUD** — chỉ chọn tham số rồi bấm `Export` |

### Vì sao vẫn cấp prefix riêng dù không phải entity

Module không có vòng đời dữ liệu, nhưng là **một chức năng độc lập có thể hỏng độc lập** (chọn sai loại chứng từ, xuất thiếu bản ghi, tệp lỗi). Nó cần test case riêng nên cần mã truy vết riêng.

Giao diện quan sát được: 2 dropdown ở trạng thái `Nothing selected` + nút `Export`.

### Ước lượng độ lớn

~5 REQ — nhỏ nhất hệ thống.

### Vùng chưa xác minh

- Hai dropdown chọn gì (loại chứng từ? khoảng thời gian?)
- Xuất được những loại chứng từ nào
- Hành vi khi không chọn gì mà bấm Export
- Hành vi khi kết quả rỗng hoặc quá nhiều bản ghi

> ⚠️ Test module này sinh ra **tệp tải về** — cần cơ chế dọn tệp sau khi chạy automation.

---

## Evidence chung của nhóm

| Tệp | Chứng minh |
|---|---|
| [`media_file_manager_fullpage.png`](../evidence/media_file_manager_fullpage.png) | `MEDIA` là file manager elFinder, khác hẳn mẫu giao diện chung |
| [`calendar_month_view_fullpage.png`](../evidence/calendar_month_view_fullpage.png) | `CAL` có 3 chế độ xem month/week/day |
| [`bulk_pdf_export_form_fullpage.png`](../evidence/bulk_pdf_export_form_fullpage.png) | `PDFEXP` là công cụ xuất, không phải danh sách entity |
