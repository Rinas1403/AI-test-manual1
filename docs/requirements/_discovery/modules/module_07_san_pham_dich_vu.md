# Module 07 — Sản phẩm / Dịch vụ

← [Bản đồ hệ thống](../system_map.md) · Trạng thái recon xem [danh mục](../../README.md)

Bao phủ 1 module: **Sản phẩm/Dịch vụ** (`ITEM`)

---

## ITEM — Sản phẩm / Dịch vụ

| Mục | Giá trị |
|---|---|
| Tên trên UI | Items (tiêu đề trang: *Invoice Items*) |
| Route | `/admin/invoice_items` |
| Loại màn hình | Danh sách (DataTables) |
| Vị trí menu | Sidebar → nhóm **Sales** |
| CRUD | ✅ Đầy đủ — `New Item`, có thao tác hàng loạt (`Confirm`) |
| Nhập liệu hàng loạt | ✅ `Import Items` |
| Màn hình phụ | **Groups** — nhóm sản phẩm |
| Status flow | ❌ Không có |

### Cột bảng danh sách

`-` (checkbox) · `Description` · `Long Description` · `Rate` · `Tax 1` · `Tax 2` · `Unit` · `Group Name`

### Vai trò trong hệ thống

Đây là **danh mục dùng chung** cho dòng hàng của `INV`, `EST`, `PROPO`, `CRNOTE`. Không phải chứng từ, không có vòng đời — nhưng thay đổi ở đây ảnh hưởng tới mọi chứng từ tạo sau đó.

### Điểm đáng chú ý cho kiểm thử

| Điểm | Ý nghĩa |
|---|---|
| **Hai cột thuế** (`Tax 1`, `Tax 2`) | Hệ thống hỗ trợ thuế chồng. Đây là vùng tính toán dễ sai nhất khi kết hợp với chiết khấu ở chứng từ |
| `Rate` | Đơn giá — kiểm tra định dạng số, số âm, số thập phân |
| `Group Name` | Có phân nhóm; màn hình quản lý nhóm là `Groups` |
| `Import Items` | Đường vào dữ liệu hàng loạt → cần test tệp sai định dạng, dòng lỗi |

### Vì sao 🟡 Risk trung bình

Không trực tiếp là tiền đã thu, nhưng **sai đơn giá hoặc sai thuế ở đây sẽ lan sang mọi hoá đơn tạo mới**. Rủi ro mang tính lan truyền chứ không tại chỗ.

### Ước lượng độ lớn

~10 REQ.

### Vùng chưa xác minh của riêng module này

- Danh sách thuế khả dụng — cấu hình thuế nằm trong vùng bị chặn (AMB-01)
- Danh mục `Unit` (đơn vị tính) quản lý ở đâu
- Màn hình `Groups`: CRUD nhóm, xoá nhóm đang có sản phẩm thì sao
- Định dạng tệp import và quy tắc báo lỗi từng dòng
- Sửa đơn giá của item đã dùng trong hoá đơn cũ → hoá đơn cũ có bị đổi theo không (**câu hỏi quan trọng nhất của module này**)

### Evidence

| Tệp | Chứng minh |
|---|---|
| [`items_list_default_fullpage.png`](../evidence/items_list_default_fullpage.png) | Module tồn tại, có 2 cột thuế, có Groups và Import Items |
