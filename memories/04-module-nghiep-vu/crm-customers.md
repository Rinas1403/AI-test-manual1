---
name: crm-customers
description: Module CUST (Khách hàng) của Perfex CRM — quyết định PO 19-09-2026, TC thiết kế để FAIL, REQ chưa implement
type: project
updated: 11-10-2026
---

# CRM · `CUST` (Khách hàng)

**Tài liệu:** `docs/requirements/customers/REQUIREMENTS_CUSTOMERS_SUMMARY.md` · TC: `docs/testcases/customers/TEST_CASES_CUSTOMERS_SUMMARY.md` (5 part, độ hạt GỘP).
Số liệu luôn đọc lại từ index; dưới đây là bối cảnh.

- Hết AMB treo từ 19-09-2026 (`PO-2026-09-19`).
- Ma trận phân quyền dựng bằng tài khoản PM: **PM được xoá khách hàng / `Mass Delete` như Admin — là cấu hình cố ý** (`AMB-CUST-14`, `RISK-CUST-08` đã chấp nhận). PM **không** xem mục Vault mức "chỉ quản trị viên".
- `REQ-CUST-42` (lưu lỗi phải tự chuyển về tab chứa lỗi) và `REQ-CUST-43` (Company toàn khoảng trắng vẫn lưu được là **lỗi**) → TC **thiết kế để FAIL**, cần mở bug khi chạy.
- `REQ-CUST-81` (Inactive bị loại khỏi mọi dropdown — chưa rà 11 module) · `REQ-CUST-82` (chặn xoá khách có dữ liệu liên quan — cần môi trường riêng) → ⚪, TC gắn `@AssumptionBased`.
- **Chưa thực thi** lượt nào trên `CUST` (chưa có `docs/executions/customers/`). Môi trường dùng chung → TC tạo khách hàng phải dọn dữ liệu, không xoá khách hàng có sẵn.
