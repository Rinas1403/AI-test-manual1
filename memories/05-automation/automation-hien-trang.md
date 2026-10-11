---
name: automation-hien-trang
description: Hiện trạng code Playwright TS trong src/ và tests/ — chưa đạt Definition of Done, thiếu package.json/config, 2 test sẽ khoá Admin khi CRM-LOGIN-101 deploy
type: project
updated: 11-10-2026
---

# Hiện trạng automation trong repo

Dựng 26-08-2026 (commit `b81f167`) — **trước** khi bộ quy tắc `.claude/rules/` hoàn chỉnh, nên còn lệch chuẩn.

| Thành phần | Hiện trạng (kiểm 11-10-2026) |
|---|---|
| `src/config/env.ts` | Đọc `BASE_URL`, `LOGIN_EMAIL`, `LOGIN_PASSWORD` — **có giá trị fallback mật khẩu hardcode** trong code |
| `src/pages/` | `BasePage` · `LoginPage` · `DashboardPage` · `ForgotPasswordPage` |
| `tests/login.spec.ts` | 4 test, tên tiếng Anh, **không** TC ID / Allure metadata / step Arrange-Act-Assert |
| `tests/navigation.spec.ts` | 3 test (quên mật khẩu, remember me, logout) |
| `package.json` · `playwright.config.ts` · `.env.example` | **Không có trên đĩa / không được git theo dõi** dù README nhắc tới → hiện không chạy được `npm test` |
| `test-results/` | Nằm ở gốc repo — trái `reporting_rules.md` (phải gom vào `reports/`) |

## Cần nhớ khi đụng vào automation
- **Automation coverage theo TC ID = 0/57** (`LOGIN`). Số "~6/57 theo nội dung" chỉ là suy luận, ghi rõ ⚠️ nếu báo.
- 🔴 Có **2 test** trong `tests/login.spec.ts` vướng `CRM-LOGIN-101` khi deploy: `invalid password` gửi mật khẩu sai bằng **Admin** (góp phần khoá Admin trên môi trường dùng chung) và `non-existent email` assert `Invalid email or password` (từ lần sai 5 thông báo đổi → tự đỏ). Người dùng **chưa quyết**: sửa ngay hay để `/update-automation-from-impact`. Hỏi lại khi làm automation `LOGIN`.
- Muốn đưa code về chuẩn: `/review-automation-code` (mode FIX) hoặc sinh lại theo TC bằng `/generate-automation-web`. Locator cũ **phải verify lại** trên DOM thật.
- Repo anh em `C:\playwright-typescript-framework` đã có framework đạt chuẩn (Allure, đa trình duyệt) cho CRM login — tham khảo được, không copy locator mù.
