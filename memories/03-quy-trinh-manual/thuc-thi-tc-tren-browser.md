---
name: thuc-thi-tc-tren-browser
description: Cách chạy /execute-test-cases và /retest-fixed-bugs trên CRM thật — người dùng tự đăng nhập, phối hợp "xong", không bấm cùng lúc, evidence, môi trường dùng chung
type: feedback
updated: 11-10-2026
---

# Thực thi TC trên browser (Playwright MCP, headed)

## Phân vai khi cần đăng nhập
1. Agent mở trang bằng Playwright MCP (headed), snapshot, chuẩn bị các bước không phải bí mật.
2. Tới bước nhập mật khẩu → **dừng**, hướng dẫn người dùng từng ô: Email · Password (lấy từ `.env`, nêu **tên biến**, không nêu giá trị) · ô `Remember me` tích hay không · bấm `Login`.
3. Người dùng làm trong cửa sổ Chrome Playwright và nhắn **"xong"** — không cần dán mật khẩu vào chat.
4. Agent chấm Expected, chụp evidence, ghi report.

**Why:** đăng nhập site thật bằng mật khẩu là việc agent không tự làm ([[tai-khoan-va-bao-mat]]); 30-09 và 11-10-2026 đã chạy trơn theo cách này.

## Bẫy đã gặp
- **Không thao tác trang khi người dùng đang thao tác.** 30-09-2026 (TC_024) agent và người dùng cùng bấm ô `Remember me` → bị đảo hai lần, kết quả sai. Đã giao bước cho người dùng thì **đừng chạm** trang tới khi nhận "xong"; đo trạng thái bằng `browser_evaluate` chỉ-đọc trước khi chấm.
- Link người dùng đưa có thể sai cổng: `admin@example.com`-loại tài khoản phải vào `/admin/authentication`, **không** phải `/login` (cổng khách hàng). Tự chỉnh và nói rõ lý do.
- `crm.anhtester.com` qua `http://` sinh lỗi CORS font trong console — không phải bug của TC đang chạy (bug HTTPS là `TC039`).

## Môi trường dùng chung (CRM)
- Chỉ thao tác đọc hoặc hoàn tác được; dọn dữ liệu test sau khi chạy.
- TC gửi mật khẩu sai → tài khoản PM. TC thuộc STORY-LOGIN-07 (khoá tài khoản) → **BLOCKED** tới khi PO báo deploy.

## Kết quả & evidence
- Report: `docs/executions/<module>/<nền-tảng>/run_<epoch>/execution_report.md`, ảnh trong `evidence/` cùng thư mục, tên `CRM_<MODULE>_TC_<nnn>_step<k>_<mô_tả>.png`.
- Retest bug: `retest_<epoch>/retest_report.md`, ghi thêm dòng Lịch sử retest trong file bug.
- Chụp đúng phạm vi cần chứng minh (viewport, không full-page dữ liệu khách), **mở lại ảnh** xác nhận trước khi ghi danh mục evidence.
- Xong lượt chạy → commit ([[git-va-commit]]) → báo cáo kèm độ phủ ([[bao-cao-do-phu-module]]) → Slack ([[bao-cao-slack-ban-giao]]).
