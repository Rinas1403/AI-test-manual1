# MEMORY.md — Bản đồ bộ nhớ của repo

> Đọc file này **ngay sau `CLAUDE.md`**, trước khi bắt tay vào bất kỳ yêu cầu nào.
> Đây chỉ là **bản đồ**: tra bảng mục 1 để biết phải mở file nhớ nào, rồi đọc **đủ** các file đó. Không cần đọc hết mọi file.
> Bộ nhớ ghi điều **không suy ra được** từ code/`docs/` (quyết định, sở thích, bẫy, việc treo). Số liệu chi tiết (REQ, TC, bug) luôn đọc lại từ danh mục trong `docs/`.

## 1. Khi làm việc X → đọc những file nào

| Yêu cầu của người dùng | Bắt buộc đọc |
|---|---|
| **Mọi yêu cầu** | `00-nguoi-dung/so-thich-giao-tiep.md` · `01-du-an/tong-quan-du-an.md` · `02-quy-tac-lam-viec/git-va-commit.md` |
| Khám phá hệ thống / sinh hoặc cập nhật **requirements** | `04-module-nghiep-vu/<module>.md` tương ứng · `03-quy-trinh-manual/chuoi-delta-ticket.md` (khi có ticket / PO trả lời) |
| Sinh / review / cập nhật **test case** | `04-module-nghiep-vu/<module>.md` · `03-quy-trinh-manual/chuoi-delta-ticket.md` · `06-bao-cao-va-ban-giao/bao-cao-do-phu-module.md` |
| **Thực thi** TC / checklist · retest bug · tạo bug report | `03-quy-trinh-manual/thuc-thi-tc-tren-browser.md` · `02-quy-tac-lam-viec/tai-khoan-va-bao-mat.md` · `04-module-nghiep-vu/<module>.md` · `07-moi-truong-va-cong-cu/moi-truong-playwright-mcp.md` |
| Viết / sửa / chạy **automation** | `05-automation/automation-hien-trang.md` · `02-quy-tac-lam-viec/tai-khoan-va-bao-mat.md` · `04-module-nghiep-vu/<module>.md` · `07-moi-truong-va-cong-cu/moi-truong-playwright-mcp.md` |
| Đụng tới **`.env`**, mật khẩu, tài khoản, vai trò Admin/PM/Customer | `02-quy-tac-lam-viec/tai-khoan-va-bao-mat.md` |
| Module **`LOGIN`** (CRM) | `04-module-nghiep-vu/crm-login.md` |
| Module **`CUST`** (CRM) | `04-module-nghiep-vu/crm-customers.md` |
| Module **`PRJ`** (CRM) | `04-module-nghiep-vu/crm-projects.md` |
| Module CRM **chưa có file nhớ** (`LEAD`, `TASK`…) | `docs/requirements/README.md` → tạo `04-module-nghiep-vu/crm-<slug>.md` khi có quyết định cần nhớ |
| Hệ thống **Book API / Android** (`_book-api`, mã `BK`) | `04-module-nghiep-vu/book-api.md` |
| **Báo cáo kết quả / bàn giao** cuối mỗi task | `06-bao-cao-va-ban-giao/bao-cao-do-phu-module.md` · `06-bao-cao-va-ban-giao/bao-cao-slack-ban-giao.md` (tự gửi Slack, không hỏi lại) |
| Báo cáo tiến độ / tổng hợp / test plan | `01-du-an/tong-quan-du-an.md` (mục trạng thái + việc treo) · `01-du-an/lich-su-phien-lam-viec.md` |
| Người dùng báo lỗi khi tự chạy lệnh trong VS Code | `00-nguoi-dung/so-thich-giao-tiep.md` (mục "Lệnh đưa cho người dùng") |
| Hỏi `.playwright-mcp/`, viewport, `.gitignore`, viewer | `07-moi-truong-va-cong-cu/moi-truong-playwright-mcp.md` |
| Hỏi "vì sao tài liệu/code thế này", lịch sử | `01-du-an/lich-su-phien-lam-viec.md` |

## 2. Mục lục

### 00-nguoi-dung — Người dùng
- [so-thich-giao-tiep](00-nguoi-dung/so-thich-giao-tiep.md) — Luôn Tiếng Việt, ngắn gọn có căn cứ; người dùng chạy lệnh trong VS Code hay đứng sai thư mục; slash command không phải lệnh terminal

### 01-du-an — Dự án
- [tong-quan-du-an](01-du-an/tong-quan-du-an.md) — 3 lớp của repo, 2 hệ thống (CRM + Book API), điểm vào `docs/`, trạng thái nhanh, **việc còn treo**
- [lich-su-phien-lam-viec](01-du-an/lich-su-phien-lam-viec.md) — Nhật ký các phiên 14-08 → 11-10-2026

### 02-quy-tac-lam-viec — Quy tắc làm việc (bổ sung cho `CLAUDE.md`)
- [git-va-commit](02-quy-tac-lam-viec/git-va-commit.md) — Tự commit ngay khi xong, chỉ stage file mình sửa, không push, lệnh git bị cấm
- [tai-khoan-va-bao-mat](02-quy-tac-lam-viec/tai-khoan-va-bao-mat.md) — Tên biến `.env`, sai mật khẩu chỉ dùng PM (không Admin), người dùng tự gõ mật khẩu site thật, không lộ bí mật

### 03-quy-trinh-manual — Quy trình kiểm thử manual
- [thuc-thi-tc-tren-browser](03-quy-trinh-manual/thuc-thi-tc-tren-browser.md) — Phân vai đăng nhập + "xong", không bấm cùng lúc người dùng, evidence, môi trường dùng chung
- [chuoi-delta-ticket](03-quy-trinh-manual/chuoi-delta-ticket.md) — Thứ tự 7 bước khi có ticket; liệt kê **đủ** AMB, người dùng trả lời theo lô

### 04-module-nghiep-vu — Module nghiệp vụ
- [crm-login](04-module-nghiep-vu/crm-login.md) — Phạm vi 57/61, quy tắc khoá tài khoản `CRM-LOGIN-101` (**chưa deploy**), `TC_014` Deprecated, bug đang mở
- [crm-customers](04-module-nghiep-vu/crm-customers.md) — PM được xoá khách hàng (cố ý), `REQ-CUST-42/43` TC thiết kế để FAIL, chưa thực thi
- [crm-projects](04-module-nghiep-vu/crm-projects.md) — Chưa có TC, 6 AMB 🔴 đang chặn
- [book-api](04-module-nghiep-vu/book-api.md) — Hệ thống thứ hai `BK`, namespace `_book-api`, không dùng chung môi trường, không đụng CSDL

### 05-automation — Automation
- [automation-hien-trang](05-automation/automation-hien-trang.md) — Code `src/`+`tests/` chưa đạt DoD, thiếu `package.json`/config, 2 test vướng `CRM-LOGIN-101`

### 06-bao-cao-va-ban-giao — Báo cáo & bàn giao
- [bao-cao-do-phu-module](06-bao-cao-va-ban-giao/bao-cao-do-phu-module.md) — Mọi báo cáo cuối workflow phải kèm độ phủ module, đếm từ file thật
- [bao-cao-slack-ban-giao](06-bao-cao-va-ban-giao/bao-cao-slack-ban-giao.md) — Mỗi task tự gửi `#project-crm` theo mẫu bắt buộc

### 07-moi-truong-va-cong-cu — Môi trường & công cụ
- [moi-truong-playwright-mcp](07-moi-truong-va-cong-cu/moi-truong-playwright-mcp.md) — `.mcp.json` viewport lệch CLAUDE.md, `.playwright-mcp/`, `.gitignore` còn thiếu, viewer offline, Jira chưa dùng

## 3. Quy tắc giữ bộ nhớ gọn và đúng

- **Một file = một chủ đề.** File nào vượt ~120 dòng → tách theo chủ đề con, cập nhật bản đồ mục 1 + 2.
- **Cập nhật thay vì tạo trùng:** trước khi thêm, tìm file cùng chủ đề. Thông tin sai/cũ → sửa hoặc xoá, đổi `updated:`.
- **Ghi vào đâu:**
  - Người dùng sửa cách làm / dặn "từ nay…" → file `type: feedback` phù hợp, kèm **Why** + **How to apply**.
  - PO/người dùng chốt quyết định nghiệp vụ, phạm vi module → `04-module-nghiep-vu/<module>.md` (đồng thời vẫn ghi Nhật ký trong `docs/` theo `CLAUDE.md`).
  - Module mới có quyết định cần nhớ → tạo `04-module-nghiep-vu/crm-<slug>.md` (hoặc `bk-<slug>.md` cho Book API) + thêm dòng ở mục 1 và 2.
  - Xong phiên có thay đổi đáng kể → 1 dòng ở `01-du-an/lich-su-phien-lam-viec.md`; việc treo → `01-du-an/tong-quan-du-an.md`.
- **Không ghi:** mật khẩu, token, giá trị `.env`; những gì đã rõ trong `CLAUDE.md`, `.claude/rules/`, danh mục `docs/` (chỉ trỏ tới).
- Ngày tuyệt đối `DD-MM-YYYY`, không viết "hôm qua", "tuần trước".
- File mới có frontmatter: `name`, `description` (1 dòng), `type` (`user` | `feedback` | `project` | `reference`), `updated`. Liên kết chéo bằng `[[name]]`.
- Bộ nhớ phản ánh thời điểm ghi — tên file/hàm/flag/số liệu được nhắc phải **kiểm lại** trong repo trước khi dựa vào.
- Bộ nhớ cục bộ của Claude Code trên máy (`~/.claude/projects/C--AI-test-manual1/memory/`) **chỉ giữ con trỏ** về thư mục này — không ghi kiến thức dự án vào đó.
