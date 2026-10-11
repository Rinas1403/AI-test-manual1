---
name: bao-cao-slack-ban-giao
description: Mỗi task xong phải báo bàn giao lên Slack #project-crm theo mẫu bắt buộc — tiêu đề Bàn giao, bảng TC, Tổng, Stack/POM/Report, Known issues, Bước tiếp theo
type: feedback
updated: 11-10-2026
---

# Báo cáo bàn giao lên Slack `#project-crm`

- Kênh: `#project-crm` (channel ID `C0C8E9GNGTE`, workspace `tester-knm4166`). Slack kết nối qua connector, kết nối lần đầu 11-10-2026.
- **Mỗi task xong đều báo** (người dùng hỏi lại 10-10-2026: *"bạn đã nắm rule tôi yêu cầu thông báo kết quả sang slack cho mỗi task hay chưa"*). Rule gốc nằm trong `CLAUDE.md` của repo anh em `C:\ai-test-automation`; repo này áp dụng theo bộ nhớ này.
- **Gửi ngay khi bàn giao xong, không hỏi "có muốn gửi không"** — 11-10-2026 người dùng phàn nàn *"sao không báo bên slack"* khi agent chỉ hỏi. Nếu người dùng vừa bảo "xem trước" cho lần đó thì gửi nháp trong chat trước.
- Bàn giao thay đổi cấu hình chạy (đa trình duyệt, workers…) cũng tính là bàn giao.

**Why:** người dùng đọc Slack để nắm toàn cảnh mà không mở repo. Bản rút gọn 6 gạch đầu dòng (gửi 11-10-2026) bị chê *chưa rõ ràng*; người dùng đưa ảnh mẫu và yêu cầu *"rõ ràng như thế này, cho mỗi lần gửi slack sau này"*.

## Mẫu bắt buộc
Tiếng Việt, ngày `DD-MM-YYYY`, markdown Slack. **Bỏ hẳn mục không có nội dung**, không để mục rỗng.

```
📋 **Bàn giao: <việc đã làm> (<DD-MM-YYYY>)**
**Hệ thống:** <tên hệ thống + version nếu biết> — `<host>` (<namespace/module, ngữ cảnh>)

✅ **Kết quả <automation | thực thi manual>**
| TC ID | Tên test | Severity | Headed | Headless |        ← manual: thay 2 cột cuối bằng 1 cột `Kết quả` (kèm bước fail)
|---|---|---|---|---|
| `CRM_LOGIN_TC_005` | <tên Tiếng Việt> | blocker | PASS (3.0s) | PASS (2.1s) |

**Tổng: X PASS · Y FAIL · Z BLOCKED · W SKIP**
• **Stack / Cách chạy:** <framework, thư mục, lệnh npm …> (manual: Playwright MCP headed, người dùng tự nhập mật khẩu)
• **POM:** `<PageClass>` · `<fixture>` — locator verify trên DOM thật      ← chỉ khi có code
• **Report:** metadata · step Arrange/Act/Assert · ảnh cuối test · không stdout — hoặc đường dẫn `execution_report.md`
• **Credentials** nằm ở `.env` (không commit)

🗺️ **<Hạng mục phụ: khám phá hệ thống / độ phủ module …>** — <trạng thái>
• Độ phủ <MODULE>: REQ a/b · Automation c/d          ← luôn có, theo [[bao-cao-do-phu-module]]

⚠️ **Known issues / cần lưu ý**
• <bug, rủi ro, việc treo, lỗi môi trường đã xử lý — kèm đường dẫn/route trong `code`>

▶️ **Bước tiếp theo**
<1–2 câu: việc kế tiếp + slash command>
```

- Cột Headed / Headless: thời gian lấy từ output thật; chế độ chưa chạy ghi `—`, không bịa. Chạy nhiều trình duyệt thì tách cột theo trình duyệt.
- **Không** ghi mật khẩu, token, dữ liệu khách hàng.
- Gửi bằng tool `slack_send_message` (nạp schema qua ToolSearch trước), rồi đưa link tin nhắn cho người dùng.
