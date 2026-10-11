---
name: chuan-test-case
description: Chuẩn test case hiện hành (bộ skill mới) — bảng 13 cột, sinh tuần tự 4 vòng Smoke → Functional → Technical → Non-functional, độ sâu theo rủi ro, bảng đối soát 4 trạng thái
type: feedback
updated: 11-10-2026
---

# Chuẩn test case — 13 cột · 4 vòng

Người dùng đã cập nhật bộ skill (11-10-2026): **mọi TC theo bảng 13 cột và sinh qua 4 vòng**. Nguồn gốc nằm ở `.claude/skills/skills-rbt-manual-testing/SKILL.md` (mục "Bảng Output Standard", "Bản Đồ Loại Kiểm Thử — 4 Vòng", "Độ sâu theo rủi ro") — **đọc skill khi sinh TC**. File này chỉ giữ phần cốt lõi để không lệch chuẩn.

**Why:** người dùng nhắc lại sau khi đổi skill, để agent không dùng định dạng cũ (bản tách 82 TC, bảng thiếu cột) hay sinh TC nhảy cóc vòng.

## Bảng 13 cột
```
| TC ID | REQ ID | Module | Risk Level | Test Scenario | Pre-Condition | Test Steps | Test Data | Expected Result | Priority | Automation | Auto Type | Tags |
```
- Đây là thứ tự của mode QUICK và là thứ tự **file `LOGIN` và `CUST` đang dùng** (kiểm 11-10-2026). Mode FULL RBT trong skill ghi `Test Title` và đặt `Test Data` sau `Priority` → khi **thêm vào module đã có file**, giữ đúng thứ tự cột của file đó; không trộn hai kiểu trong một module.
- `REQ ID` bắt buộc mỗi dòng (nhiều REQ phân cách `,`). `Risk Level`: `High` / `Medium` / `Low` (tiếng Anh — viewer sort theo cột này, **không được bỏ**).
- `Automation`: `Yes` / `No` / `Partial` — chấm theo `references/automation_criteria.md`, không gắn `Yes` mặc định. `Auto Type`: `UI` / `API` / `Unit` / `N/A`.
- `Test Steps` đánh số, mỗi bước một hành động; `Expected Result` khớp 1-1; xuống dòng bằng `<br>`. Test Data cụ thể (`Nhập email: test_…@domain.com`), không viết "dữ liệu hợp lệ".
- Không có cột trạng thái. TC bị gỡ: tag `@Deprecated` **và** tiền tố `🗑️ Deprecated (<TICKET-ID>, <DD-MM-YYYY>) —` ở `Test Scenario`. `@PersonalOnly` là tag duy nhất làm `/execute-test-cases` bỏ qua TC. Module ≥2 nền tảng → tag `@Web` / `@Android` / `@iOS` / `@API`.

## 4 vòng — sinh tuần tự, không nhảy cóc, mỗi batch nằm trọn một vòng
| Vòng | Nhánh |
|---|---|
| **V1 Smoke** | UI cơ bản (luôn) · Open form · Display · Input valid data · Save · Verify data |
| **V2 Functional** (~60–70% số TC) | UI Behavior · Required · Validation · EP · BVA · Business Rule · Decision Table · State Transition · Dependency · Use Case · Save/Edit/Delete · Error Guessing (luôn) |
| **V3 Technical** (thường `@TechCheck`) | Permission · Security · API · Database · Integration · Logging/Audit |
| **V4 Non-functional & Regression** | Compatibility · Responsive · Accessibility · Performance · Regression · E2E |

- **Chấm Risk Level + lập kế hoạch 4 vòng TRƯỚC dòng TC đầu tiên.** Độ sâu: Cao (đủ mọi nhánh, ~40–60 TC cỡ Login) · Trung bình · Thấp (chỉ khi đủ cả 4 dấu hiệu "chỉ hiển thị"). V1 **không bao giờ rút**.
- **V3 của CRM:** QA không gọi API, không truy vấn CSDL, không kiểm tích hợp, không xem được Activity Log → các nhánh đó `➖`/giao **đội Dev** (lấy nguyên lý do từ `docs/requirements/README.md`, không hỏi lại). DevTools có → `@TechCheck`. Book API thì gọi API được ([[book-api]]).
- **Bảng Đối soát loại kiểm thử 4 vòng** đặt cuối tài liệu TC, trước bảng ISO/IEC 25010. Bốn trạng thái: `✅` (kèm TC ID) · `➖` không áp dụng (lý do kỹ thuật) · `⏭️` cố ý bỏ (lý do + **ai quyết** + điều kiện rà lại) · `🔴` thiếu. Không dùng lẫn `➖` và `⏭️`; không sinh TC chỉ để lấp ô.
- Self-Quality Gate 11 tiêu chí (0–10), trong đó #10 là đối soát 4 vòng — áp QUICK · FULL RBT · DELTA, **không** áp CHECKLIST (checklist chỉ lấy mục theo vòng).
- DELTA: chỉ cập nhật **nhánh ticket chạm tới** trong bảng 4 vòng, giữ nguyên phần còn lại ([[chuoi-delta-ticket]]).
