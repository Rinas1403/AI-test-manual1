---
name: crm-login
description: Module LOGIN của Perfex CRM — quyết định PO, quy tắc khoá tài khoản CRM-LOGIN-101 (chưa deploy), phạm vi, TC đặc biệt, bug đang mở
type: project
updated: 11-10-2026
---

# CRM · `LOGIN` (Đăng nhập / Xác thực)

**Tài liệu:** `docs/requirements/login/REQUIREMENTS_LOGIN_SUMMARY.md` (index) → `web/requirements_login_web.md` · TC: `docs/testcases/login/TEST_CASES_LOGIN_SUMMARY.md` → `web/parts/part_0N_*.md` (4 part).
Số liệu (REQ đã dùng, TC kế tiếp, độ phủ) **đọc lại từ index** — đây chỉ là bối cảnh không suy ra được.

## Phạm vi
- 61 REQ, **57 trong phạm vi**. Ngoài phạm vi theo PO 18-08-2026: `REQ-LOGIN-27` (gửi mail quên mật khẩu với email thật), `34`, `35`, `40` (Remember Me không hoạt động — checkbox vẫn hiện và vẫn cấp cookie, `RISK-LOGIN-08`).
- TC độ hạt **GỘP** (biến thể chung một TC). Không đổi độ hạt nữa vì đã có execution/bug trỏ vào.
- `TC_014` **Deprecated** 30-09-2026 (không có tài khoản thứ hai mật khẩu chứa chữ cái — người dùng bảo bỏ).
- Biến thể "email Customer gửi vào `/admin`" của `REQ-LOGIN-52` **ngoài phạm vi** (người dùng: "bỏ luôn REQ khách hàng không nằm trong hệ thống"). `REQ-LOGIN-43` (Customer không vào được `/admin`, `TC_019`, `TC_020`) vẫn trong phạm vi.

## Ticket `CRM-LOGIN-101` — khoá tài khoản (STORY-LOGIN-07, `REQ-LOGIN-45`→`61`)
PO chốt 28-09-2026, người dùng trả lời AMB 30-09-2026:
- Sai mật khẩu **5 lần liên tiếp** cùng email → khoá **15 phút**, thông báo `Your account is locked. Please try again in 15 minutes.`; đang khoá thì đúng mật khẩu cũng không vào. Đăng nhập đúng trước lần 5 → bộ đếm về 0. Khoá theo email, không theo IP.
- Bỏ trống mật khẩu, CSRF sai **cũng tính lần sai** (`AMB-LOGIN-22`).
- Bộ đếm tách theo **đúng chuỗi email** — đổi hoa/thường là lách được (`AMB-LOGIN-23`, `RISK-LOGIN-11`, cần đội bảo mật xác nhận).
- Email **không tồn tại**: không khoá; từ lần sai 5 báo `Email không tồn tại` (tiếng Việt) + chờ 1 phút ở lần 5→9, 15 phút ở lần 10, rồi lặp (`AMB-LOGIN-21`, `30`) → lộ email nào có tài khoản (`RISK-LOGIN-10`, đã chấp nhận).
- **Chưa deploy** (`AMB-LOGIN-27`) → TC viết sẵn, chạy = BLOCKED. Không chạy `CRM_LOGIN_TC_015` bản cũ sau khi deploy.
- Đảo ngược quyết định cũ "không khoá" (`AMB-LOGIN-02`, 18-08-2026) → `REQ-LOGIN-41` 🟡.

## Quyết định khác
- Phiên 1 giờ tính theo **thời gian không hoạt động**, mỗi thao tác gia hạn (`AMB-LOGIN-19`, 19-09-2026; PO nhắc lại 30-09 — trùng, không tác động).
- `http://` **bắt buộc** tự chuyển HTTPS + HSTS (`REQ-LOGIN-44`) — hệ thống chưa đạt → bug `TC039`.
- `REQ-LOGIN-16`, `25` ghi kỳ vọng đúng mà hệ thống chưa đạt → TC thiết kế để FAIL, phải có bug.
- `AMB-LOGIN-14`: popup timer giao cho module `TASK` — nhớ cập nhật ngược `REQ-LOGIN-30`.

## Bug đang mở (chi tiết ở `docs/bugs/README.md`)
`TC039` HTTP không ép HTTPS (Critical) · `TC004` logo · `TC016` email không giữ lại sau login sai (NOT_FIXED 01-10-2026) · `TC028` · `TC029` (NOT_FIXED 24-09-2026). `TC018` đã đóng — không phải lỗi.

## Automation
Chưa có script nào mang TC ID — xem [[automation-hien-trang]].
