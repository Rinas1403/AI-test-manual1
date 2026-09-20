# Module 06 — Dự án & Công việc

← [Bản đồ hệ thống](../system_map.md) · Trạng thái recon xem [danh mục](../../README.md)

Bao phủ 2 module: **Dự án** (`PRJ`) · **Công việc** (`TASK`)

> Gộp chung vì quan hệ cha–con chặt và luôn được khảo sát cùng nhau. Gộp file không gộp prefix.

---

## PRJ — Dự án

| Mục | Giá trị |
|---|---|
| Tên trên UI | Projects |
| Route | `/admin/projects` · chi tiết `/admin/projects/view/{id}` · tạo mới `/admin/projects/project` |
| Loại màn hình | Danh sách (DataTables) + **màn hình chi tiết 12 tab** |
| Vị trí menu | Sidebar, mục cấp 1 thứ 3 |
| CRUD | ✅ Đầy đủ — `New Project` |
| Status flow | ✅ Có cột `Status` — quan sát được **On Hold**, **In Progress** (chưa đủ, xem AMB-07) |

### Cột bảng danh sách

`#` · `Project Name` · `Customer` · `Tags` · `Start Date` · `Deadline` · `Members` · `Status`

### Màn hình chi tiết — 12 tab (ĐÃ KIỂM CHỨNG KỸ)

```
Overview · Tasks · Timesheets · Milestones · Files · Discussions
Gantt · Tickets · Contracts · Sales ▾ · Notes · Activity
```

Tab `Sales` là **dropdown**, mở ra 6 mục con:

```
Proposals · Estimates · Invoices · Subscriptions · Expenses · Credit Notes
```

#### ⚠️ Cảnh báo locator — đọc trước khi viết Page Object

Đếm bằng selector hậu duệ sẽ ra **18** và **sai**:

| Cách đếm | Kết quả | Đúng/Sai |
|---|---|---|
| `ul.project-tabs a` (hậu duệ) | 18 | ❌ Gộp cả 6 mục nằm trong dropdown, người dùng không nhìn thấy |
| `ul.project-tabs > li` (con trực tiếp) | **12** | ✅ Đúng số tab hiển thị |

Đã xác minh tại viewport **1600×750**: cả 12 `li` đều có `offsetParent ≠ null` và `width/height > 0`.

Sai lầm này đã suýt được ghi vào tài liệu ở lần khảo sát đầu; chỉ phát hiện ra khi **mở lại ảnh chụp** để đối chiếu. Locator của tab **bắt buộc** dùng dấu `>`.

### Vì sao 🔴 Risk cao

`PRJ` là **hub của toàn hệ thống**. Màn hình chi tiết gom 8 module khác thành tab:

```
Tickets · Contracts · Proposals · Estimates · Invoices · Subscriptions · Expenses · Credit Notes
```

Hệ quả: bất kỳ thay đổi nào ở 8 module đó đều có thể gây **hồi quy** ở màn hình Dự án. Đây là lý do RISK-02 tồn tại.

### Entity con — KHÔNG cấp prefix riêng

| Entity con | Vì sao không tách |
|---|---|
| Milestones | Không tồn tại ngoài một dự án |
| Discussions | Như trên |
| Notes | Như trên |
| Timesheets | Gắn với Task trong dự án |
| Files | Tệp đính kèm của dự án |
| Gantt | Là **cách hiển thị** của Tasks, không phải entity |

> Các tab `Tickets`/`Contracts`/`Sales ▾` là **view lọc theo dự án** của module khác, không phải entity của `PRJ` → cũng không cấp prefix.

### Ước lượng độ lớn

~30 REQ — lớn nhất hệ thống. Khi recon chi tiết, module này gần như chắc chắn vượt ngưỡng và **phải tách file theo Story**.

### Vùng chưa xác minh của riêng module này

- Bộ trạng thái đầy đủ của dự án
- Ràng buộc `Start Date` ↔ `Deadline`. Dữ liệu demo có bản ghi **Deadline trước Start Date** (`14-05-2026` → `14-06-2024`) và cả bản ghi tên "Test Date Validation" với `15-05-2026` → `14-05-2026` → rất đáng nghi hệ thống **không** validate. Đây là ứng viên bug, cần xác minh sớm
- Cơ chế phân công Members và ảnh hưởng tới quyền xem
- Nội dung thật của từng tab trong 12 tab

---

## TASK — Công việc

| Mục | Giá trị |
|---|---|
| Tên trên UI | Tasks |
| Route | `/admin/tasks` · chi tiết `/admin/tasks/view/{id}` · xoá `/admin/tasks/delete_task/{id}` · `/admin/tasks/list_tasks` |
| Loại màn hình | Danh sách (DataTables) |
| Vị trí menu | Sidebar, mục cấp 1 thứ 4 |
| CRUD | ✅ Đầy đủ — `New Task`, có thao tác hàng loạt (`Confirm`) |
| Màn hình phụ | **Tasks Overview** |

### Cột bảng danh sách

`-` (checkbox) · `#` · `Name` · `Status` · `Start Date` · `Due Date` · `Assigned to` · `Tags` · `Priority`

### Status flow — ĐÃ ĐỌC ĐƯỢC ĐẦY ĐỦ

Đây là module duy nhất mà menu đổi trạng thái lộ ra **toàn bộ** các nhánh chuyển ngay trên danh sách:

| Trạng thái hiện tại | Chuyển được sang |
|---|---|
| **Not Started** | In Progress · Testing · Awaiting Feedback · Complete |
| **In Progress** | Not Started · Testing · Awaiting Feedback · Complete |
| **Testing** | *(quan sát gián tiếp — có trong mọi menu chuyển)* |
| **Awaiting Feedback** | Not Started · In Progress · Testing · Complete |
| **Complete** | Not Started · In Progress · Testing · Awaiting Feedback |

→ 5 trạng thái: **Not Started · In Progress · Testing · Awaiting Feedback · Complete**, và các chuyển đổi quan sát được đều **tự do hai chiều** (không có nhánh bị khoá).

> ⚠️ Hàng "Testing" chưa có bản ghi thật trong dữ liệu hiện tại nên chưa đọc trực tiếp được menu của nó. Cần xác nhận khi recon.

Ngoài ra có nhãn **Recurring Task** → công việc lặp lại theo chu kỳ.

### Ước lượng độ lớn

~18 REQ.

### Vùng chưa xác minh của riêng module này

- Menu chuyển trạng thái của chính trạng thái **Testing**
- Quy tắc Recurring Task (chu kỳ, điều kiện dừng)
- `Priority` có những mức nào
- Task tồn tại độc lập không gắn dự án được không
- Quan hệ với Timesheets (bấm giờ) — thanh header có nút **Stop Timer**, tức có tính năng đếm giờ đang chạy

### Evidence

| Tệp | Chứng minh |
|---|---|
| [`projects_list_default_fullpage.png`](../evidence/projects_list_default_fullpage.png) | `PRJ` tồn tại, có cột Status và Members |
| [`project_detail_tabs_viewport.png`](../evidence/project_detail_tabs_viewport.png) | **12 tab hiển thị**, `Sales` là dropdown — bằng chứng cho cảnh báo locator ở trên |
| [`tasks_list_default_fullpage.png`](../evidence/tasks_list_default_fullpage.png) | `TASK` tồn tại, thấy 4/5 trạng thái trên dữ liệu thật |
