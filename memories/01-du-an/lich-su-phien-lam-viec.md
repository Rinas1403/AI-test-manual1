---
name: lich-su-phien-lam-viec
description: Nhật ký các phiên làm việc quan trọng 14-08 → 11-10-2026 — dùng khi cần biết "vì sao tài liệu/code thành thế này"
type: project
updated: 11-10-2026
---

# Lịch sử phiên làm việc

> Mỗi phiên có thay đổi đáng kể → thêm **1 dòng** ở cuối. Chi tiết nằm trong Nhật ký thay đổi của từng tài liệu module và `git log`.

| Ngày | Việc chính | Kết quả / quyết định cần nhớ |
|---|---|---|
| 14-08-2026 | `/discover-system` Mode UI cho Perfex CRM · khởi tạo hệ thống Book API | 23 module, cấp prefix; Book API parse spec + 20 request thật |
| 18-08-2026 | Rà soát `LOGIN`, PO chốt quyết định | Có đủ 3 tài khoản Admin / PM / Customer (gỡ `AMB-LOGIN-01`); 4 REQ ra ngoài phạm vi |
| 20-08-2026 | Thực thi `LOGIN` lần đầu (`run_1787215085`) | Mở 5 bug `TC004`, `TC016`, `TC018`, `TC028`, `TC029` |
| 26-08-2026 | Dựng framework Playwright TS cho CRM login | Commit `b81f167`, `2249df7` — `src/pages/*`, `tests/*` |
| 14-09 → 23-09-2026 | Làm ở **bản repo cũ** (`C:\manual\ai-test-manual`, `C:\source-AI- manual1\...` — nay đã xoá) | SRS `LOGIN`, sinh TC GỘP, `/review-testcases` mode FIX, thực thi TC 01–10, bug + retest `TC_029` |
| 17-09-2026 | Master Test Plan `release_1.0` | Chưa duyệt; ô treo chờ PO |
| 19-09-2026 | PO trả lời AMB `CUST` + `AMB-LOGIN-19/20` · thêm mặt Android cho Book API | `CUST` hết AMB treo; HTTPS bắt buộc (`REQ-LOGIN-44`) |
| 24-09-2026 | Đưa bộ TC `LOGIN` web (57 TC) vào repo này | Commit `fc08480` |
| 30-09-2026 | Chuỗi DELTA ticket `CRM-LOGIN-101` (khoá tài khoản) | Xem [[crm-login]] · [[chuoi-delta-ticket]]. Người dùng dặn: tự commit ([[git-va-commit]]), luôn báo độ phủ ([[bao-cao-do-phu-module]]), bỏ `TC_014`, bỏ biến thể Customer của `REQ-LOGIN-52` |
| 30-09 → 01-10-2026 | Thực thi 27 TC mới/cập nhật · STORY-LOGIN-04 · retest bug `TC016` · báo cáo tiến độ kỳ 2 | 11 PASS · 2 FAIL · 14 BLOCKED; `TC016` NOT_FIXED; tiến độ 🔴 |
| 10/11-10-2026 | Kết nối Slack · chạy `CRM_LOGIN_TC_005` (1 PASS, `run_1791662983`) | Chốt mẫu báo cáo Slack ([[bao-cao-slack-ban-giao]]) |
| 11-10-2026 | Gom toàn bộ bộ nhớ máy vào `memories/` của repo | Bộ nhớ cục bộ chỉ còn con trỏ về đây |
| 11-10-2026 | Người dùng cập nhật bộ skill mới | Chuẩn TC 13 cột + 4 vòng — [[chuan-test-case]] |
