# Module 10 — Hỗ trợ khách hàng

← [Bản đồ hệ thống](../system_map.md) · Trạng thái recon xem [danh mục](../../README.md)

Bao phủ 1 module: **Hỗ trợ khách hàng** (`TICKET`)

---

## TICKET — Phiếu hỗ trợ

| Mục | Giá trị |
|---|---|
| Tên trên UI | Support (tiêu đề trang: *Support Tickets*) |
| Route | `/admin/tickets` · tạo mới `/admin/tickets/add` |
| Loại màn hình | Danh sách (DataTables) |
| Vị trí menu | Sidebar, mục cấp 1 thứ 9 |
| CRUD | ✅ Đầy đủ — `New Ticket`, có thao tác hàng loạt (`Confirm`) |
| Status flow | ✅ Có cột `Status` + cột `Priority` riêng |

### Cột bảng danh sách

`-` (checkbox) · `#` · `Subject` · `Tags` · `Department` · `Service` · `Contact` · `Status` · `Priority` · `Last Reply` · `Created`

### Điểm đáng chú ý cho kiểm thử

| Điểm | Ý nghĩa |
|---|---|
| Cột **`Contact`** (không phải `Customer`) | Ticket gắn với **người liên hệ** cụ thể, không phải công ty → phụ thuộc module `CONTACT` |
| Cột **`Department`** | Có phân luồng theo phòng ban; danh mục quản lý ở đâu chưa rõ (khả năng trong vùng bị chặn — AMB-01) |
| Cột **`Service`** | Phân loại dịch vụ — danh mục riêng |
| **Hai trục** `Status` + `Priority` | Hai chiều độc lập → ma trận test phải phủ cả hai, không gộp làm một |
| Cột **`Last Reply`** | Có luồng hội thoại nhiều lượt trả lời |
| **Hai mặt** | Ticket thường do khách tạo từ portal (URL khác — AMB-05) và nhân viên trả lời ở vùng Admin. Đầu vào thật **ngoài phạm vi** đợt này |

### Vì sao 🟡 Risk trung bình

Không động tới tiền, nhưng là kênh giao tiếp trực tiếp với khách hàng — sai phân luồng hoặc mất phản hồi ảnh hưởng trải nghiệm. Rủi ro lộ dữ liệu nếu ticket hiện sai cho contact khác (liên quan AMB-02).

### Ước lượng độ lớn

~16 REQ.

### Vùng chưa xác minh của riêng module này

- Bộ trạng thái đầy đủ (Open / In Progress / Answered / On Hold / Closed …)
- Các mức Priority
- Danh mục Department, Service quản lý ở đâu
- Luồng trả lời: đính kèm tệp, ghi chú nội bộ (không hiện cho khách), template trả lời
- Tự động gán ticket theo phòng ban
- Quan hệ với tab Tickets trong màn hình Dự án

### Evidence

| Tệp | Chứng minh |
|---|---|
| [`support_tickets_list_default_fullpage.png`](../evidence/support_tickets_list_default_fullpage.png) | Module tồn tại, có cột Status, Priority, Department, Service, Contact |
