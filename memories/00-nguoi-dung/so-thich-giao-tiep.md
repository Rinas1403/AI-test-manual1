---
name: so-thich-giao-tiep
description: Cách nói chuyện với người dùng — luôn Tiếng Việt, ngắn gọn có căn cứ, ngày DD-MM-YYYY, lệnh viết cho người hay chạy trong VS Code
type: user
updated: 11-10-2026
---

# Sở thích giao tiếp của người dùng

**Người dùng:** QA (GitHub `Rinas1403`) xây bộ khung QA manual + automation bằng AI trong repo này, kiểm thử hệ thống Perfex CRM demo của Anh Tester. Tự đóng vai PO khi trả lời ambiguity.

## Ngôn ngữ
- **Luôn trả lời bằng Tiếng Việt**, kể cả giải thích kỹ thuật và tóm tắt cuối. Tên file, mã, lệnh giữ nguyên.
  - **Why:** 02-10-2026 người dùng nhắc "hãy dùng tiếng việt" khi agent lỡ trả lời tiếng Anh.
- Ngắn gọn, rõ ràng, có căn cứ (số đếm từ file thật, không ước lượng). Xưng "mình / bạn".
- Ngày trong nội dung viết `DD-MM-YYYY` (quy tắc của `CLAUDE.md`).

## Cách người dùng ra lệnh (để hiểu đúng ý)
- Hay gõ tắt, không dấu chuẩn: "tui", "ko dc", "visuacode" = VS Code, "stack" = Slack.
- Trả lời ambiguity theo lô, mỗi dòng `AMB-<MODULE>-<nn>: <câu trả lời>`. "chốt cả 5 như ý bạn" = chấp nhận toàn bộ đề xuất tạm của agent.
- Khi đang thao tác tay trên browser, người dùng nhắn **"xong"** sau mỗi bước — xem [[thuc-thi-tc-tren-browser]].

## Lệnh đưa cho người dùng
- Người dùng chạy lệnh trong **terminal PowerShell của VS Code** và **hay đứng sai thư mục con** (VD `docs\requirements\login\web`) → đường dẫn tương đối hỏng.
  - Ưu tiên **tự chạy** lệnh thay vì đưa lệnh (xem [[git-va-commit]]).
  - Bắt buộc đưa lệnh thì: mỗi lệnh một block, kèm `cd C:\AI-test-manual1` trước; với git có thể dùng tiền tố `:/` (`git add :/docs/...`) để chạy ở thư mục nào cũng đúng.
- **Slash command (`/update-testcases-from-impact` …) KHÔNG phải lệnh terminal.** Đừng đặt nó trong block `bash` — người dùng sẽ dán vào PowerShell và nhận `CommandNotFoundException` (đã xảy ra 30-09-2026). Ghi rõ: gõ trong ô chat Claude Code, hoặc mời người dùng nói "chạy …" để agent làm luôn trong phiên.
