---
name: git-va-commit
description: Tự commit ngay khi xong việc, chỉ stage file mình sửa, không đổi nhánh, không push; lệnh git bị cấm
type: feedback
updated: 11-10-2026
---

# Git & commit

## Tự commit, không hỏi lại
Xong một lượt làm việc có sửa file → **agent tự commit ngay**, không in lệnh `git add` / `git commit` cho người dùng chạy, không xin phép lại.

**Why:** 30-09-2026 người dùng nói *"bạn tự commit thẳng không cần phải hỏi lại"*. Khi tự chạy trong VS Code họ hay đứng sai thư mục con nên đường dẫn tương đối hỏng; các workflow DELTA / BỔ SUNG cần mốc git sạch giữa các lượt (mốc hash ghi vào Nhật ký).

**How to apply:**
- Chỉ `git add` **đúng các file đã sửa trong lượt** (VD `docs/testcases/login`, `docs/testcases/README.md`). **Không** `git add -A` / `git add .` — working tree luôn có nhiều thứ không liên quan (`.playwright-mcp/`, `.claude/`, `prompts/`, `scripts/` chưa theo dõi; `CLAUDE.md` có thể đang có sửa đổi riêng của người dùng).
- File có sẵn sửa đổi của người dùng mà mình cũng sửa → chỉ commit phần của mình (dựng bản index bằng `git hash-object -w` + `git update-index --cacheinfo`), hoặc để lại và báo.
- Commit thẳng trên nhánh hiện tại (`main`). Message dạng `<MODULE>: <việc> — <kết quả>` bằng Tiếng Việt (VD `LOGIN: thực thi CRM_LOGIN_TC_005 (đăng nhập Admin) — 1 PASS`).
- **Không push** trừ khi người dùng yêu cầu riêng.

## Lệnh bị cấm (CLAUDE.md "Git Pull Restriction Rule")
- ❌ `git pull` · `git checkout` · `git merge` · `git rebase` · `git reset` — code local có thể mới hơn server.
- ✅ Được: `git status` · `git diff` · `git log` · `git show` (đọc), và `add` / `commit` như trên.
- Bản cũ của tài liệu tra bằng `git log -- <đường dẫn>` / `git show <hash>:<file>` — `docs/` **không** có thư mục `archive/`.
