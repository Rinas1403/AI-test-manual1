# Module 03 — Hợp đồng

← [Bản đồ hệ thống](../system_map.md) · Trạng thái recon xem [danh mục](../../README.md)

Bao phủ 1 module: **Hợp đồng** (`CONTR`)

---

## CONTR — Hợp đồng

| Mục | Giá trị |
|---|---|
| Tên trên UI | Contracts |
| Route | `/admin/contracts` · chi tiết/tạo `/admin/contracts/contract/{id}` |
| Loại màn hình | Danh sách (DataTables) + form hợp đồng có nội dung soạn thảo |
| Vị trí menu | Sidebar, mục cấp 1 thứ 5 |
| CRUD | ✅ Đầy đủ — `New Contract` |
| Status flow | ⚠️ Không có cột Status; có nhãn **Trash** trên thanh lọc → cơ chế thùng rác riêng |

### Cột bảng danh sách

`#` · `Subject` · `Customer` · `Contract Type` · `Contract Value` · `Start Date` · `End Date` · `Project` · `Signature`

### Đặc điểm đáng chú ý

| Điểm | Ý nghĩa cho kiểm thử |
|---|---|
| Cột **Signature** | Có ký điện tử — luồng ký nằm ở phía khách hàng (portal, URL khác, AMB-05). Phần admin chỉ thấy trạng thái đã ký hay chưa |
| Cột **Contract Value** | Có giá trị tiền → rủi ro tài chính |
| Cột **Contract Type** | Có danh mục loại hợp đồng — màn hình quản lý loại nằm ở đâu chưa rõ, khả năng nằm trong vùng `/admin/settings` bị chặn (AMB-01) |
| Nhãn **Trash** | Xoá mềm — cần test cả khôi phục và xoá vĩnh viễn |
| Cột **Start Date / End Date** | Có ràng buộc ngày → ứng viên cho test biên. Quan sát thấy dữ liệu demo có bản ghi ngày kết thúc **trước** ngày bắt đầu (`14-05-2026` → `14-06-2024` ở module Dự án), nên rất đáng nghi ngờ hệ thống không validate chặt |

### Vì sao 🔴 Risk cao

Ràng buộc pháp lý + giá trị tiền + chữ ký điện tử. Đây là loại chứng từ mà lỗi hiển thị sai giá trị hoặc sai hiệu lực ngày tháng có hậu quả ngoài phạm vi phần mềm.

### Ước lượng độ lớn

~15 REQ.

### Vùng chưa xác minh của riêng module này

- Bộ trạng thái thật (nếu có) và cơ chế Trash
- Ràng buộc ngày bắt đầu / kết thúc — có validate không
- Danh mục Contract Type quản lý ở đâu
- Luồng ký: gửi cho khách, nhắc ký, hết hạn ký
- Quan hệ với `PRJ` (cột Project) và tab Contracts trong màn hình Dự án

### Evidence

| Tệp | Chứng minh |
|---|---|
| [`contracts_list_default_fullpage.png`](../evidence/contracts_list_default_fullpage.png) | Module tồn tại, có cột Signature và Contract Value, có nhãn Trash |
