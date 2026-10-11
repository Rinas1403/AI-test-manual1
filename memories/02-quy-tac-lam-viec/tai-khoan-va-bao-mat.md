---
name: tai-khoan-va-bao-mat
description: Tên biến trong .env, 3 vai trò CRM và vai trò nào dùng cho TC nào, quy tắc không lộ bí mật, ai gõ mật khẩu trên site thật
type: feedback
updated: 11-10-2026
---

# Tài khoản test & bảo mật

## `.env` ở gốc repo (đã `.gitignore`, KHÔNG commit)
Chỉ ghi **tên biến**, không bao giờ ghi giá trị vào `memories/` hay `docs/`.

| Biến | Dùng cho |
|---|---|
| `BASE_URL` · `ADMIN_LOGIN_URL` · `CUSTOMER_LOGIN_URL` | URL CRM — Admin/PM ở `/admin/authentication`, Customer ở `/authentication/login` |
| `LOGIN_EMAIL` · `LOGIN_PASSWORD` | Giữ cho `src/config/env.ts` (code cũ đọc tên này) — cùng giá trị với `ADMIN_*` |
| `ADMIN_EMAIL` · `ADMIN_PASSWORD` | Vai trò Admin |
| `EMAIL_PM` · `PASSWORD_PM` | Vai trò Project Manager |
| `CUSTOMER_EMAIL` · `CUSTOMER_PASSWORD` | Vai trò Customer (cổng khách hàng, **không** vào được `/admin`) |

- Người dùng cho phép (30-09-2026): **được thay thế bất kỳ tài khoản nào trong `.env`**, được tự tạo tài khoản staff khi cần. Người dùng tự dán tài khoản vào chat để agent ghi vào `.env`.
- Chưa có tài khoản staff thứ hai → `TC_014` đã bị **bỏ (Deprecated)** theo lệnh người dùng; `REQ-LOGIN-49`, `50` vẫn thiếu tài khoản thứ hai.

## Vai trò nào cho TC nào
- 🔐 **TC gửi mật khẩu sai với tài khoản có thật → chỉ dùng `Project Manager`, KHÔNG dùng `Admin`** (từ ticket `CRM-LOGIN-101`, 30-09-2026; áp mọi module). 5 lần sai liên tiếp khoá tài khoản 15 phút trên môi trường dùng chung → khoá Admin là chặn cả đội.
- Bỏ trống mật khẩu và gửi CSRF sai **cũng tính là lần sai** (`AMB-LOGIN-22`).

## Ai gõ mật khẩu trên site thật
- Agent **không** tự gõ mật khẩu để đăng nhập `crm.anhtester.com` (site thật trên internet, không phải localhost) — kể cả khi `CLAUDE.md` cho đọc `.env`. Người dùng tự nhập trong cửa sổ Playwright headed rồi nhắn "xong". Chi tiết: [[thuc-thi-tc-tren-browser]].
- Automation script (`tests/`) thì đọc `.env` như bình thường.

## Không lộ bí mật
- Không in mật khẩu / token / cookie ra chat, log, report, Slack, `docs/`, `memories/`. Kiểm cookie thì chỉ đọc **tên và độ dài**.
- Ghi **hình thái** thay giá trị (VD `<16 ký tự hex>`).
