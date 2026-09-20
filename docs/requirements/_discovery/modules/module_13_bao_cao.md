# Module 13 — Báo cáo

← [Bản đồ hệ thống](../system_map.md) · Trạng thái recon xem [danh mục](../../README.md)

Bao phủ 1 module: **Báo cáo** (`REPORT`)

---

## REPORT — Báo cáo

| Mục | Giá trị |
|---|---|
| Tên trên UI | Reports |
| Loại màn hình | 6 màn hình báo cáo — biểu đồ (`canvas`) + bảng |
| Vị trí menu | Sidebar → nhóm **Reports** |
| CRUD | ❌ **Read-only** — không có nút tạo/sửa/xoá nào |

### 6 báo cáo con

| Báo cáo | Route | Nguồn dữ liệu |
|---|---|---|
| Sales | `/admin/reports/sales` | `INV` · `EST` · `PROPO` · `CRNOTE` · `ITEM` |
| Expenses | `/admin/reports/expenses` | `EXP` |
| Expenses vs Income | `/admin/reports/expenses_vs_income` | `EXP` + `INV`/`PAY` |
| Leads | `/admin/reports/leads` | `LEAD` |
| Timesheets overview | `/admin/staff/timesheets?view=all` | Timesheets của `TASK`/`PRJ` |
| KB Articles | `/admin/reports/knowledge_base_articles` | `KB` |

### Vì sao gom 6 màn hình thành 1 module

Không màn hình nào có entity riêng hay vòng đời riêng — tất cả đều là **view tổng hợp dữ liệu của module khác**. Tách thành 6 prefix sẽ đẻ ra 6 mã truy vết cho 6 màn hình chỉ-đọc, đúng thứ mà quy tắc ranh giới module khuyến cáo tránh.

### Lưu ý đặc biệt — thứ tự khảo sát

`REPORT` xếp gần cuối (vị trí 13/15) **không phải vì ít quan trọng**, mà vì nó **phụ thuộc dữ liệu của mọi module phía trên**. Viết test case báo cáo trước khi nắm quy tắc tính của `INV`/`EXP`/`LEAD` thì không biết con số nào mới là đúng.

### Điểm đáng chú ý cho kiểm thử

| Điểm | Ý nghĩa |
|---|---|
| **Bộ lọc thời gian** | Quan sát thấy lựa chọn `2026`, `All Time` và nhiều dropdown `All` → nhiều chiều lọc kết hợp. Đây là ứng viên cho ma trận kết hợp (`/generate-cross-module-test-plan`) |
| **Có biểu đồ (`canvas`)** | ⚠️ Biểu đồ vẽ trên canvas → **không đọc được bằng locator DOM**. Chỉ assert được số liệu ở bảng, không assert được nội dung biểu đồ |
| **Read-only** | Không có TC tạo/sửa/xoá; trọng tâm là **tính đúng số** và lọc đúng |
| Môi trường dùng chung | ⚠️ Số liệu báo cáo **thay đổi liên tục** do tester khác tạo dữ liệu → không assert giá trị tuyệt đối (xem RISK-01, RISK-04) |

### Vì sao 🟢 Risk thấp

Không sửa dữ liệu, không sinh giao dịch. Nhưng lưu ý: báo cáo sai vẫn dẫn tới **quyết định kinh doanh sai** — rủi ro gián tiếp chứ không phải không có.

### Ước lượng độ lớn

~12 REQ (khoảng 2 REQ mỗi báo cáo).

### Vùng chưa xác minh của riêng module này

- Các chiều lọc của từng báo cáo (mới đọc được của Sales Reports)
- Quy tắc tính từng chỉ số
- Có xuất Excel/PDF không
- 5 báo cáo còn lại chưa mở — mới có evidence của Sales Reports

### Evidence

| Tệp | Chứng minh |
|---|---|
| [`reports_sales_default_fullpage.png`](../evidence/reports_sales_default_fullpage.png) | Module tồn tại, có biểu đồ + bảng, không có nút tạo, có bộ lọc thời gian |

> ⚠️ Chỉ có evidence của **1/6** báo cáo. 5 báo cáo còn lại cần chụp bổ sung khi recon module này.
