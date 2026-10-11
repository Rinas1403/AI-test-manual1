---
name: bao-cao-do-phu-module
description: Mỗi lần báo cáo kết quả workflow đụng tới một module, luôn kèm độ phủ hiện tại của module đó, đếm từ file thật
type: feedback
updated: 11-10-2026
---

# Luôn báo độ phủ module

Kết thúc **mọi** workflow làm thay đổi requirements, test cases, execution hoặc automation của một module (`/update-requirements-from-ticket`, `/update-testcases-from-impact`, sinh TC bổ sung, `/execute-test-cases`, sinh automation…) → phần báo cáo cuối phải có **độ phủ hiện tại của module**, không chỉ liệt kê cái vừa đổi.

**Why:** 30-09-2026 (module `LOGIN`) người dùng dặn *"cập nhật thêm sau này cho tôi biết độ phủ của module"* — họ theo dõi tiến độ theo module và không muốn phải tự chạy `/generate-traceability-matrix`.

**How to apply** — bảng tối thiểu:
- **Requirement Coverage**: REQ trong phạm vi có ≥1 TC còn hiệu lực / tổng REQ trong phạm vi (loại TC `@Deprecated`; TC stale theo Impact Report tách riêng, không tính là phủ đúng).
- Độ phủ theo Story (ít nhất các Story chưa đủ, VD STORY-07 `0/18`).
- **Automation Coverage**: TC có script mang TC ID / tổng TC (suy luận theo nội dung thì ghi ⚠️).
- Nhánh 4 vòng đang 🔴 (nếu có) · số TC BLOCKED do chưa deploy.
- Đếm bằng script/grep trên file thật (bảng TC, bảng REQ, `tests/`), **không ước lượng**. Có thể làm bảng "Hiện tại / Sau APPLY / Sau bổ sung" khi đang ở giữa chuỗi delta.

Dòng độ phủ cũng phải có trong báo cáo Slack — [[bao-cao-slack-ban-giao]].
