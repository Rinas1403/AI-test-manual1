---
name: moi-truong-playwright-mcp
description: Playwright MCP của repo (.mcp.json, viewport, .playwright-mcp/), lệch cấu hình với CLAUDE.md, .gitignore còn thiếu, 3 viewer offline
type: reference
updated: 11-10-2026
---

# Môi trường & công cụ

## Playwright MCP
- Khai trong **`.mcp.json` ở gốc repo** (tạo sau 30-09-2026; trước đó dùng cấu hình global `%APPDATA%\Claude\claude_desktop_config.json`): `npx -y @playwright/mcp --viewport-size=1600,780 --config .claude/playwright-mcp-config.json`. Config phụ đặt `--window-position=-3,0`.
- ⚠️ **Lệch:** `CLAUDE.md` ghi viewport headed `1600×770`, `.mcp.json` đang `1600,780`. Nghi trang bị cắt → đo `innerWidth/innerHeight` vs `outerWidth/outerHeight` trước khi sửa. Sửa `.mcp.json` phải **khởi động lại Claude Code**.
- Không gọi `browser_resize` phóng vượt cửa sổ.

## Thư mục `.playwright-mcp/`
- Do Playwright MCP sinh ra ở cwd: `page-<thời điểm>.yml` (snapshot accessibility mỗi lần navigate/snapshot), `console-<thời điểm>.log`, `page-*.png` (khi chụp không chỉ định đường dẫn). Người dùng từng hỏi "từ đâu mà có" (30-09-2026).
- Có thể chứa dữ liệu khách hàng → **không commit**. Là thứ được xoá khi chuyển dự án. Evidence thật phải lưu thẳng vào `docs/executions/.../evidence/`, không để lại ở đây.

## `.gitignore` còn thiếu (chưa sửa — đã đề xuất, chờ người dùng đồng ý)
- `.playwright-mcp/` → vì vậy `git status` luôn báo `??`.
- `reports/` và `.allure/` (bắt buộc theo `reporting_rules.md`) · `.claude/settings.local.json`.

## Viewer offline (double-click, không cài gì)
`scripts/testcases-viewer/bundle.html` (test case) · `scripts/execution-viewer/bundle.html` (execution/retest/RTM) · `scripts/bugs-viewer/bundle.html` (bug). Chi tiết: `CLAUDE.md` mục "Xem kết quả bằng web viewer".

## Kết nối khác
- Slack connector → [[bao-cao-slack-ban-giao]].
- Jira/Xray: **chưa dùng** — mọi `/create-bug-report` chạy với "Không đẩy Jira".
- Appium MCP có sẵn — dùng cho mặt Android của Book API ([[book-api]]).
