---
name: chuoi-delta-ticket
description: Thứ tự chạy chuỗi delta khi có ticket/PO trả lời mới, và bài học khi hỏi ambiguity — liệt kê đủ mọi AMB, người dùng trả lời theo lô
type: feedback
updated: 11-10-2026
---

# Chuỗi DELTA khi có ticket mới

## Thứ tự đã chạy thật (ticket `CRM-LOGIN-101`, 30-09-2026)
1. `/update-requirements-from-ticket` — `Module: <module>` + `Ticket: <ID> — <tên>` + nội dung PO chốt. Ra `docs/requirements/<module>/impact/impact_<TICKET-ID>.md`.
2. Hỏi AMB → người dùng (đóng vai PO) trả lời → cập nhật REQ, ghi Nhật ký.
3. `/update-testcases-from-impact Mode: PLAN` → người dùng duyệt → `Mode: APPLY`. Ra `docs/testcases/<module>/impact/delta_tc_<TICKET-ID>.md`.
4. REQ mới chưa có TC → `/generate-testcases-from-requirements Module: <module> — BỔ SUNG REQ-<X>-a → REQ-<X>-b`.
5. `/execute-test-cases` với `Phạm vi: những cập nhật và thêm mới từ ngày <DD-MM-YYYY>`.
6. `/create-bug-report` (nền tảng web, **không đẩy Jira**) · `/retest-fixed-bugs Mode: RETEST Bug: <TC_ID>`.
7. Sau cùng: `/update-automation-from-impact` cho script bị ảnh hưởng.

Người dùng trả lời PO qua chat (không có ticket) cũng chạy bước 1 với `Ticket: PO trả lời AMB-… qua chat — "<nguyên văn>"`.

## Hỏi ambiguity
- **Liệt kê ĐỦ mọi AMB mới trong một danh sách đánh số**, không chỉ vài cái "quan trọng". **Why:** 30-09-2026 người dùng hỏi *"tôi thấy có 9 ambiguity mới cần hỏi PO nhưng sao chỉ hiện ra 2?"*.
- Mỗi AMB kèm **giả định tạm** của agent để người dùng có thể trả lời "chốt như ý bạn".
- Người dùng trả lời theo lô `AMB-LOGIN-22: có` … — câu trả lời có thể **khác** giả định tạm; khi khác, ghi rõ "khác giả định tạm" trong tài liệu và tách RISK nếu có hệ quả bảo mật.
- Cuối lượt hỏi: "còn những câu hỏi nào cần tôi quyết?" → luôn sẵn danh sách AMB còn mở.

## Giữ nguyên mã
- Không đánh lại REQ ID / TC ID. TC bị gỡ: tag `@Deprecated` + tiền tố `🗑️ Deprecated (<TICKET-ID>, <ngày>) —` (VD `TC_014`).
- Một biến thể bị loại khỏi phạm vi (VD Customer gửi vào `/admin` của `REQ-LOGIN-52`) → giữ REQ, chuyển biến thể thành ghi chú "Ngoài phạm vi" ở index, ghi Nhật ký.
