# Module 11 — Cơ sở tri thức

← [Bản đồ hệ thống](../system_map.md) · Trạng thái recon xem [danh mục](../../README.md)

Bao phủ 1 module: **Cơ sở tri thức** (`KB`)

---

## KB — Cơ sở tri thức

| Mục | Giá trị |
|---|---|
| Tên trên UI | Knowledge Base |
| Route | `/admin/knowledge_base` · tạo mới `/admin/knowledge_base/article` |
| Loại màn hình | Danh sách |
| Vị trí menu | Sidebar, mục cấp 1 thứ 12 |
| CRUD | ✅ Đầy đủ — `New Article` |
| Màn hình phụ | **Groups** — nhóm bài viết |
| Báo cáo liên quan | `/admin/reports/knowledge_base_articles` (thuộc module `REPORT`) |
| Status flow | ❌ Không thấy cột trạng thái trên danh sách; thường chỉ có cờ Active/Published |

### Điểm đáng chú ý cho kiểm thử

| Điểm | Ý nghĩa |
|---|---|
| **Nội dung hướng ra ngoài** | Bài viết KB hiển thị cho khách hàng ở portal (URL khác — AMB-05). Vùng Admin chỉ là nơi soạn |
| **Trình soạn thảo rich text** | Ứng viên test: chèn ảnh, HTML, nội dung rất dài, ký tự đặc biệt, XSS |
| **Groups** | Phân nhóm bài viết; xoá nhóm đang có bài thì sao |
| **Có báo cáo riêng** | Báo cáo lượt xem/hữu ích → có thu thập phản hồi từ phía khách |

### Vì sao 🟢 Risk thấp

Không động tới tiền, không động tới dữ liệu giao dịch. Sai sót ở đây ảnh hưởng nội dung hiển thị, sửa lại được ngay. Ngoại lệ cần lưu ý: trình soạn thảo rich text là **đường vào XSS** — điểm này nên test kỹ dù module risk thấp.

### Ước lượng độ lớn

~8 REQ.

### Vùng chưa xác minh của riêng module này

- Cột của bảng danh sách (chưa đọc `thead` — trang dùng bố cục khác các module DataTables thường)
- Cơ chế publish / ẩn bài viết
- Màn hình `Groups`
- Bài viết có phân quyền theo nhóm khách hàng không
- Cách bài viết hiển thị ở portal

### Evidence

| Tệp | Chứng minh |
|---|---|
| [`knowledge_base_list_default_fullpage.png`](../evidence/knowledge_base_list_default_fullpage.png) | Module tồn tại, có New Article và Groups |
