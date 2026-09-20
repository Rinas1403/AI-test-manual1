# Module 05 — Đề xuất, Báo giá & Yêu cầu báo giá

← [Bản đồ hệ thống](../system_map.md) · Trạng thái recon xem [danh mục](../../README.md)

Bao phủ 3 module: **Đề xuất** (`PROPO`) · **Báo giá** (`EST`) · **Yêu cầu báo giá** (`ESTREQ`)

> Gộp chung vì cùng phân hệ chứng từ **trước** bán hàng, dùng chung cấu trúc dòng hàng và cùng dẫn tới `INV`. Gộp file không gộp prefix.

---

## PROPO — Đề xuất

| Mục | Giá trị |
|---|---|
| Tên trên UI | Proposals |
| Route | `/admin/proposals` · tạo mới `/admin/proposals/proposal` · lọc `/admin/proposals/list_proposals?status={n}` |
| Loại màn hình | Danh sách (DataTables) + form chứng từ |
| Vị trí menu | Sidebar → nhóm **Sales** |
| CRUD | ✅ Đầy đủ — `New Proposal` |

### Cột bảng danh sách

`Proposal #` · `Subject` · `To` · `Total` · `Date` · `Open Till` · `Project` · `Tags` · `Date Created` · `Status`

### Trạng thái — CHƯA ĐẦY ĐỦ

Quan sát trực tiếp: **Sent**, **Open**.
Nhãn đọc thêm từ link lọc ở Dashboard: **Draft** (`status=6`), **Sent** (`status=4`), **Open** (`status=1`), **Revised** (`status=5`), **Declined** (`status=2`), **Accepted** (`status=3`).

> ⚠️ Đây là nhãn từ link lọc, chưa phải ma trận chuyển trạng thái. Xem AMB-07.

Điểm đáng chú ý: `To` (không phải `Customer`) → Đề xuất gửi được cho **cả Lead lẫn Customer**. Đây là khác biệt nghiệp vụ quan trọng so với Báo giá.

---

## EST — Báo giá

| Mục | Giá trị |
|---|---|
| Tên trên UI | Estimates |
| Route | `/admin/estimates` · tạo mới `/admin/estimates/estimate` · lọc `/admin/estimates/list_estimates?status={n}` |
| Loại màn hình | Danh sách (DataTables) + form chứng từ |
| Vị trí menu | Sidebar → nhóm **Sales** |
| CRUD | ✅ Đầy đủ — `Create New Estimate` |

### Cột bảng danh sách

`Estimate #` · `Amount` · `Total Tax` · `Customer` · `Project` · `Tags` · `Date` · `Expiry Date` · `Reference #` · `Status`

### Trạng thái — CHƯA ĐẦY ĐỦ

Quan sát trực tiếp: **Expired**.
Nhãn từ link lọc: **Draft** (`status=1`), **Not Sent** (`not_sent=1`), **Sent** (`status=2`), **Expired** (`status=5`), **Declined** (`status=3`), **Accepted** (`status=4`).

Khác `PROPO`: gắn thẳng vào `Customer`, có `Total Tax` và `Expiry Date` riêng.

---

## ESTREQ — Yêu cầu báo giá

| Mục | Giá trị |
|---|---|
| Tên trên UI | Estimate Request |
| Route | `/admin/estimate_request` |
| Loại màn hình | Danh sách (DataTables) + **trình tạo biểu mẫu** |
| Vị trí menu | Sidebar, mục cấp 1 thứ 11 |
| CRUD | ✅ — nhưng nút chính là **`New Form`**, không phải "New Request" |

### Cột bảng danh sách

`#` · `Email` · `Tags` · `Assigned` · `Status` · `Created`

### Vì sao module này khác hẳn hai module trên

Nút chính là `New Form` → đây là **form builder**: admin thiết kế biểu mẫu, khách hàng bên ngoài điền, hệ thống sinh ra yêu cầu báo giá. Nghĩa là module có **hai mặt**:

| Mặt | Ai dùng | Test ở đâu |
|---|---|---|
| Thiết kế biểu mẫu | Admin | Vùng Admin — trong phạm vi |
| Điền và gửi biểu mẫu | Khách hàng ngoài | ⚠️ **Trang công khai / portal — ngoài phạm vi**, xem AMB-05 |

Đây là điểm cần chốt phạm vi trước khi viết test case: nếu chỉ test vùng Admin thì **không** kiểm chứng được đầu vào thật của module này.

Cột `Status` và `Assigned` cho thấy yêu cầu có vòng đời xử lý và được phân công cho nhân viên.

---

## Đánh giá chung nhóm

| Module | Risk | Ước REQ | Lý do risk |
|---|---|---|---|
| `PROPO` | 🟡 | ~14 | Có giá trị tiền nhưng chưa phải chứng từ ràng buộc; sai thì sửa lại được |
| `EST` | 🟡 | ~14 | Như trên, thêm thuế và hạn hiệu lực |
| `ESTREQ` | 🟡 | ~10 | Đầu vào từ bên ngoài → rủi ro dữ liệu bẩn, nhưng chưa động tới tiền |

### Vùng chưa xác minh của cả nhóm

- Ma trận chuyển trạng thái thật của `PROPO` và `EST` (mới có danh sách nhãn, chưa biết chuyển từ đâu sang đâu được)
- Luồng `EST` → `INV` (chuyển báo giá thành hoá đơn)
- Luồng `ESTREQ` → `EST`
- Cấu trúc dòng hàng dùng chung với `INV` — có thật sự dùng chung danh mục `ITEM` không
- `PROPO` gửi cho Lead: khi Lead chuyển thành Customer thì đề xuất đi theo thế nào

### Evidence

| Tệp | Chứng minh |
|---|---|
| [`proposals_list_default_fullpage.png`](../evidence/proposals_list_default_fullpage.png) | `PROPO` tồn tại, có cột `To` và `Status` |
| [`estimates_list_default_fullpage.png`](../evidence/estimates_list_default_fullpage.png) | `EST` tồn tại, có `Total Tax`, `Expiry Date` |
| [`estimate_request_list_default_fullpage.png`](../evidence/estimate_request_list_default_fullpage.png) | `ESTREQ` tồn tại, nút chính là `New Form` — bằng chứng đây là form builder |
