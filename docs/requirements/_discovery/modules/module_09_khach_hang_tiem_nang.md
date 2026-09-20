# Module 09 — Khách hàng tiềm năng

← [Bản đồ hệ thống](../system_map.md) · Trạng thái recon xem [danh mục](../../README.md)

Bao phủ 1 module: **Khách hàng tiềm năng** (`LEAD`)

---

## LEAD — Khách hàng tiềm năng

| Mục | Giá trị |
|---|---|
| Tên trên UI | Leads |
| Route | `/admin/leads` |
| Loại màn hình | Danh sách (DataTables) — bảng rộng 13 cột |
| Vị trí menu | Sidebar, mục cấp 1 thứ 10 |
| CRUD | ✅ Đầy đủ — `New Lead`, có thao tác hàng loạt (`Confirm`) |
| Status flow | ✅ Có cột `Status` — giá trị chưa đọc được từ dữ liệu hiện tại (AMB-07) |

### Cột bảng danh sách

`-` (checkbox) · `#` · `Name` · `Company` · `Email` · `Phone` · `Value` · `Tags` · `Assigned` · `Status` · `Source` · `Last Contact` · `Created`

### Vai trò trong hệ thống — đầu phễu bán hàng

```
LEAD ──(chuyển đổi)──> CUST ──> PROPO/EST ──> CONTR/PRJ ──> INV ──> PAY
```

`LEAD` là điểm bắt đầu của toàn bộ luồng nghiệp vụ. Module `PROPO` có cột `To` (thay vì `Customer`) chính là để gửi đề xuất cho Lead **trước khi** họ thành khách hàng.

### Điểm đáng chú ý cho kiểm thử

| Điểm | Ý nghĩa |
|---|---|
| **Luồng chuyển đổi Lead → Customer** | Nghiệp vụ quan trọng nhất của module. Cần rõ: dữ liệu nào được mang sang, đề xuất/ghi chú cũ đi đâu, Lead cũ còn tồn tại không |
| Cột `Status` | Pipeline bán hàng — Perfex thường có cả chế độ xem **Kanban** kéo thả để đổi trạng thái. Chưa tìm thấy nút chuyển chế độ xem, cần kiểm lại |
| Cột `Source` | Danh mục nguồn khách — quản lý ở đâu chưa rõ, khả năng trong vùng bị chặn (AMB-01) |
| Cột `Value` | Giá trị cơ hội → ảnh hưởng báo cáo `/admin/reports/leads` |
| Cột `Assigned` | Phân công nhân viên → liên quan phân quyền (AMB-02) |
| Cột `Last Contact` | Có theo dõi lịch sử liên hệ |

### Vì sao 🟡 Risk trung bình

Chưa động tới tiền thật, nhưng mất dữ liệu ở đây là mất cơ hội bán hàng. Luồng chuyển đổi sang `CUST` là điểm dễ mất dữ liệu nhất.

### Ước lượng độ lớn

~18 REQ — bảng rộng, có pipeline trạng thái, có luồng chuyển đổi.

### Vùng chưa xác minh của riêng module này

- Bộ trạng thái đầy đủ của pipeline
- Có chế độ xem Kanban không, và đổi trạng thái bằng kéo thả có được không
- Chi tiết luồng chuyển đổi Lead → Customer
- Danh mục Source, danh mục Status quản lý ở đâu
- Nhập Lead từ web-to-lead form (tính năng chuẩn Perfex) — chưa thấy trên màn hình danh sách
- Quy tắc chống trùng Lead (cùng email/điện thoại)

### Evidence

| Tệp | Chứng minh |
|---|---|
| [`leads_list_default_fullpage.png`](../evidence/leads_list_default_fullpage.png) | Module tồn tại, bảng 13 cột, có Status / Source / Assigned |
