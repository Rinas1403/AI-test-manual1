# Báo Cáo Review Test Cases — `LOGIN` · Web

## Tổng quan

| Mục | Giá trị |
|---|---|
| **Nguồn** | [web/test_cases_login_web.md](../web/test_cases_login_web.md) — 57 TC · index [TEST_CASES_LOGIN_SUMMARY.md](../TEST_CASES_LOGIN_SUMMARY.md) |
| **Requirements đối chiếu** | [REQUIREMENTS_LOGIN_SUMMARY.md](../../../requirements/login/REQUIREMENTS_LOGIN_SUMMARY.md) · [requirements_login_web.md](../../../requirements/login/web/requirements_login_web.md) |
| **Review trước đó** | [testcase_review_report_web_20260919.md](testcase_review_report_web_20260919.md) — 51 TC, 46 🟢/5 🟡, đã sửa Mode FIX. Lần này chấm lại **toàn bộ 57 TC** (51 TC cũ đã sửa + 6 TC mới Nhóm L thêm 21-09-2026, chưa từng được review) |
| **Ngày review** | 23-09-2026 · Mode **REVIEW** |
| **Kết quả** | 🟢 57 tốt · 🟡 0 cần sửa · 🔴 0 viết lại |
| **Điểm trung bình** | **11.75 / 12** |
| **Loại trừ theo requirements** | `REQ-LOGIN-27` (`AMB-LOGIN-04` ⏭️ — không kiểm luồng gửi mail với email có thật) · `REQ-LOGIN-34`, `REQ-LOGIN-35` (`AMB-LOGIN-06`/`07` ⏭️ — không kiểm xoá cookie/`HttpOnly`) · `REQ-LOGIN-40` (`AMB-LOGIN-15` ⏭️ — không kiểm hệ quả Ghi nhớ đăng nhập, chỉ kiểm việc phát hành cookie) · Không viết TC biên cho trường Password (`AMB-LOGIN-09` — không có chính sách mật khẩu) |

> 📌 **Kết luận chính:** 5 TC 🟡 của lượt review trước (`TC_014`, `018`, `034`, `039`, `050`) đã được sửa đúng như đề xuất và nay đạt 🟢. 8 ghi chú `@NeedsVerify` cũ đã được dọn sạch. 6 TC mới (`TC_052`→`TC_057`, Nhóm L) viết đúng chuẩn, không có lỗi rubric. **Không tìm thấy TC nào cần sửa cách viết.** Hai điểm còn mở không thuộc rubric cách viết mà thuộc **độ phủ**: (1) nhánh `V3 · Logging/Audit` vẫn `➖` dù đã có gợi ý tài khoản Super Admin từ 19-09 — xem Coverage Gap #1; (2) mục *"đủ 6/6"* của Email trang Quên mật khẩu ở index hơi rộng hơn thực tế — xem Coverage Gap #2 (rủi ro thấp, có giải thích kỹ thuật).

## Chi tiết từng TC

Tiêu chí: ① Rõ ràng · ② Expected đo được · ③ Độc lập · ④ Test data · ⑤ Truy vết · ⑥ Trọng tâm

### 🟢 12/12 — không cần sửa (47 TC)

TC_001, TC_004, TC_005, TC_006, TC_007, TC_010, TC_011, TC_012, TC_013, TC_014, TC_015, TC_016, TC_017, TC_018, TC_020, TC_021, TC_022, TC_023, TC_025, TC_026, TC_027, TC_028, TC_029, TC_030, TC_031, TC_032, TC_033, TC_034, TC_036, TC_038, TC_039, TC_042, TC_043, TC_044, TC_045, TC_046, TC_047, TC_048, TC_049, TC_050, TC_051, TC_052, TC_053, TC_054, TC_055, TC_056, TC_057

### 🟢 11/12 — nhận xét nhỏ, không bắt buộc sửa

| TC ID | Ghi chú | Có cần sửa? |
|---|---|---|
| TC_002 | Bảng kiểm 6 mục trong 1 TC (độ hạt GỘP Kiểu B — **hợp lệ**, không vi phạm tiêu chí 6). Điểm trừ duy nhất: khối lượng thông tin lớn trong một ô Expected khiến người mới đọc cần đọc kỹ mới bám đúng thứ tự 6 mục | Không — đây là đánh đổi cố ý của độ hạt GỘP, đã ghi rõ trong "Cách đọc bộ TC" ở index |
| TC_003 | Tương tự TC_002 — Bảng kiểm 3 mục | Không |
| TC_019 | TC dài, 4 bước nối tiếp cùng một cặp thông tin — đúng ý đồ (phải chạy nối tiếp để so sánh), nhưng độ phức tạp khiến tiêu chí ① giảm nhẹ | Không |
| TC_035 | Expected phần "không hộp thoại nào bật lên" phụ thuộc *ngầm* vào tiền đề "không có bộ đếm giờ nào đang chạy" của môi trường dùng chung — nếu người chạy trước để sót 1 timer thì TC báo FAIL sai. Pre-Condition đã nêu rõ yêu cầu này nên **không** tính là lỗi Expected, chỉ là điểm dễ vỡ khi vận hành | Không — đã có Pre-Condition đúng, chỉ là rủi ro vận hành |
| TC_037 | Phần chính chỉ chứng minh được luồng thao tác; mục tiêu thật (cookie còn nhưng vô hiệu) nằm ở 🔧 — có lý do rõ (`ASM-09`) | Không |
| TC_040 | `Partial` automation + phụ thuộc thao tác thủ công ngắt mạng — Expected vẫn đo được, chỉ hạ nhẹ vì thao tác không lặp lại chính xác 100% giữa các lần chạy tay | Không |
| TC_041 | Tương tự — cần DevTools để giả lập mạng chậm, giảm nhẹ tiêu chí ① (người không biết DevTools không tự chạy được) | Không |

### 🟢 10/12 — có lý do kỹ thuật rõ ràng, không cần sửa

| TC ID | Vì sao không đạt 12/12 | Vì sao KHÔNG cần sửa |
|---|---|---|
| TC_008, TC_009 | Phần chính (bước 1–5) chỉ chứng minh đăng nhập thành công — **không** chứng minh được mục tiêu thật của TC (cookie ghi nhớ được phát hành đúng/không đúng), vì hệ quả không nhìn thấy bằng mắt | `ASM-09` đã giải thích rõ trong index: `REQ-LOGIN-40` xác nhận tính năng tự đăng nhập lại **không hoạt động**, nên không có hệ quả nghiệp vụ nào để chấm ở phần chính. Kiểm chứng thật đã tách đúng xuống dòng 🔧, TC gắn `@TechCheck`. Đây là thiết kế đúng, không phải thiếu sót |
| TC_024 | Tương tự — mã CSRF không có biểu hiện nhìn thấy được | Đã giải thích ngay trong Expected: "kiểm chứng thật nằm ở dòng 🔧". `Automation = Partial` khớp thực tế |
| TC_037 | Phần chính chỉ chứng minh luồng thao tác (đăng nhập có tích Remember me → đăng xuất → không tự đăng nhập lại); mục tiêu sâu hơn (cookie `autologin` **còn nguyên giá trị** nhưng vô hiệu) chỉ đo được ở 🔧 | Đã giải thích ngay trong Expected: "đây chính là điểm TC muốn chứng minh". `Automation = Partial` khớp thực tế (phần 🔧 cần API context riêng) |

### Tổng số TC theo mức điểm

| Mức | Số TC | Danh sách |
|---|---|---|
| 12/12 | 47 | Xem mục *🟢 12/12* ở trên |
| 11/12 | 6 | TC_002, TC_003, TC_019, TC_035, TC_040, TC_041 |
| 10/12 | 4 | TC_008, TC_009, TC_024, TC_037 |
| **Tổng** | **57** | 47 + 6 + 4 = 57 ✅ |

**Điểm trung bình:** (47×12 + 6×11 + 4×10) / 57 = (564 + 66 + 40) / 57 = **670 / 57 ≈ 11.75 / 12**

## Đối soát loại kiểm thử (4 vòng)

| Vòng | Nhánh | Trạng thái | Ghi chú |
|---|---|---|---|
| 1 | UI cơ bản · Open form · Display · Input valid · Save · Verify data | ✅ | Không đổi so với lượt review 19-09 |
| 2 | UI Behavior | ✅ | TC_042–044 |
| 2 | Required | ✅ | TC_011 (4 biến thể), TC_028 |
| 2 | Validation | ✅ | Email (Đăng nhập) 8/8 · Password 4/4 · **Checkbox `Remember me` 2/2 mục áp dụng** (mặc định `TC_002-3`, Check/Uncheck `TC_052`; `Required validation` và `Nhóm radio` không áp dụng — ô tuỳ chọn, không có nhóm radio) · Email (Quên mật khẩu) — xem Coverage Gap #2, chưa đủ 6/6 như index ghi |
| 2 | Equivalence Partitioning · Boundary Value Analysis | ✅ | Mở rộng đúng sang biểu mẫu Quên mật khẩu (`TC_056`, `TC_057`) |
| 2 | Business Rule · Dependency · Use Case | ✅ | Không đổi |
| 2 | Decision Table · State Transition · Save/Edit/Delete | ➖ | Không đủ điều kiện kỹ thuật — không đổi |
| 2 | Error Guessing | ✅ | Đã lấp mục "mở 2 tab cùng lúc" (`TC_054`) và "gửi trùng ở biểu mẫu thứ hai" (`TC_055`) |
| 3 | Permission | ✅ | Không đổi |
| 3 | Security | ✅ | Thêm `TC_054` (phiên đa tab) |
| 3 | API · Database · Integration | ➖ | QA không có quyền — đội Dev xác minh (chốt 11-09-2026), không đổi |
| 3 | Logging / Audit | ➖ | **Vẫn treo** — xem Coverage Gap #1 |
| 4 | Compatibility · Responsive · Accessibility · Performance | ✅ | Không đổi |
| 4 | Regression | ➖ | Chưa bug nào **được fix** (chỉ có 1 bug đóng vì *không phải lỗi*) — không đổi |
| 4 | E2E | ➖ | Ngoài phạm vi module |

## Đối soát bảng loại field

| Field | Loại | Mục đã phủ | Mục thiếu |
|---|---|---|---|
| Email (Đăng nhập) | Email | Bắt buộc · khoảng trắng · hoa/thường · định dạng (5 biến thể `TC_012`, gồm SQLi) · biên độ dài (`TC_045`/`046`) · dán chuỗi dài · email không tồn tại | — |
| Password (Đăng nhập) | Password | Bắt buộc · che ký tự · dán được · không nút hiện/ẩn · hoa/thường · rất dài · đa ngôn ngữ · ký tự tấn công | — (min/max theo policy: ➖ không áp dụng — `AMB-LOGIN-09` không có chính sách mật khẩu) |
| Remember me | Checkbox | Mặc định rỗng · Check/Uncheck cả hai chiều (`TC_052`) · giữ trạng thái sau gửi lỗi (`TC_053`, mở rộng ngoài 4 mục chuẩn) | — |
| Email (Quên mật khẩu) | Email | Bắt buộc-nhưng-không-chặn (`TC_028`, hành vi lỗi đã biết) · 1 biến thể định dạng sai `abc` (`TC_030`) · không tồn tại (`TC_029`) · biên độ dài máy chủ (`TC_056`/`057`) | **"Thiếu domain", "nhiều `@`", "ký tự đặc biệt/SQLi trước `@`"** chưa có biến thể riêng trên form này — xem Coverage Gap #2 |

## Coverage Gaps

| # | Kịch bản thiếu | Vòng / Nhánh | Priority đề xuất | Ghi chú |
|---|---|---|---|---|
| 1 | Đăng nhập thành công/thất bại có được ghi vào `Activity Log` không — vẫn chặn bởi quyền tài khoản demo | V3 · Logging/Audit | Low | **Carry-forward từ review 19-09-2026** (Gap #2 cũ) — báo cáo đó đã ghi *"người dùng đã có tài khoản super admin — có thể rà lại"*, nhưng 4 ngày sau bảng 4 vòng của index **vẫn** ghi `➖` với lý do quyền hạn cũ, chưa thấy cập nhật. Đề nghị xác nhận với user: đã thử recon bằng tài khoản Super Admin chưa, nếu có kết quả thì thêm TC, nếu chưa thì giữ `➖` nhưng nên nêu rõ "chưa thử lại" thay vì lặp lại lý do đã lỗi thời |
| 2 | Ô Email trang Quên mật khẩu — 3 kiểu định dạng sai chưa từng thử trên **chính form này**: thiếu domain (`abc@`), nhiều `@` (`a@b@example.com`), ký tự tấn công trước `@` (SQLi/XSS) | V2 · Validation (Email — Quên mật khẩu) | Low | Mục `4.2` của requirements xác nhận ô Email form này **không có `pattern`/`maxlength` riêng** — chỉ dùng `type=email` giống hệt cơ chế của form Đăng nhập. Vì cùng một cơ chế chặn ở trình duyệt (không phải business rule riêng của form), rủi ro thực tế **thấp**: `TC_030` đã chứng minh trình duyệt chặn định dạng sai trên form này bằng đúng cơ chế đã thấy ở `TC_012`. Khác với mốc 64 ký tự (server-side, đã đúng khi tách riêng vì `TC_056`/`057` phát hiện đây **là** business rule riêng theo route) — đây không phải rule riêng nên **không bắt buộc** nhân bản 5 biến thể của `TC_012` sang form này. Đề xuất nhẹ: nếu muốn khép kín 6/6 như index đang ghi, thêm **1** biến thể gộp vào `TC_030` (ví dụ chuỗi SQLi `admin@example.com' OR '1'='1`) để có bằng chứng thật thay vì suy luận. **Không bắt buộc trước khi bàn giao** |
| 3 | *(đã giải quyết)* — khoảng trắng đầu/cuối mật khẩu (Gap #1 cũ, 19-09) | V2 · Validation (Password) | — | Đã đóng bằng quyết định phạm vi: banner Nhóm C của `test_cases_login_web.md` ghi rõ **"KHÔNG viết TC biên cho trường Password"** — `AMB-LOGIN-09` chốt hệ thống không quy định chính sách mật khẩu nào. Đây chính là câu trả lời PO mà Gap #1 cũ yêu cầu — không còn là gap |

### Sai lệch nhỏ cần đồng bộ ở index (không phải lỗi TC)

- Mục *"Đối soát loại kiểm thử (4 vòng)"* ở [TEST_CASES_LOGIN_SUMMARY.md](../TEST_CASES_LOGIN_SUMMARY.md) dòng `V2 · Validation` ghi **"Ô Email — biểu mẫu Quên mật khẩu: đủ 6/6 mục áp dụng"** — theo đối soát ở trên (Coverage Gap #2), con số thực tế sát hơn với **4/6** nếu tính đúng-đủ-biến-thể-riêng cho từng mục định dạng. Đề nghị sửa dòng đó thành *"4/6 mục áp dụng — 2 mục (thiếu domain, nhiều `@`) dùng chung cơ chế `type=email` đã chứng minh ở `TC_012`/`TC_030`, không nhân bản biến thể"* để tránh người đọc sau tưởng đã có TC riêng cho từng mục.

## TC trùng lặp — đề xuất merge

- Không phát hiện TC trùng lặp mới. `TC_018-a` ≈ `TC_046-c` đã được xử lý ở lượt review 19-09-2026 (bỏ `TC_018-a`).

## Đối chiếu kết quả chạy (evidence)

- `run_1787215085` (20-08-2026) và `run_1789759574` (19-09-2026) — đã đối chiếu ở lượt review trước, không có ghi chú cũ nào còn sai lệch.
- **6 TC mới `TC_052`→`TC_057` (Nhóm L, thêm 21-09-2026) chưa có lượt chạy nào** — khớp đúng với 3 tag `@NeedsVerify` còn treo trên `TC_053`, `TC_056`, `TC_057` trong bảng "Vùng chưa có evidence" của index. Đây **không phải lỗi review** — TC được viết đúng, chỉ chưa được đo trên hệ thống thật. Khuyến nghị chạy 6 TC này qua `/execute-test-cases` trước khi đưa vào automation, đúng như ghi chú index đã có sẵn.

## Kết luận & Khuyến nghị

1. **Không có TC nào cần sửa cách viết** — 5 TC 🟡 của lượt trước đã sửa đúng, 6 TC mới viết đạt chuẩn ngay từ đầu.
2. **Chạy 6 TC Nhóm L (`TC_052`→`TC_057`) qua `/execute-test-cases`** để gỡ 3 tag `@NeedsVerify` còn treo — đây là việc quan trọng nhất còn lại, không phải sửa TC mà là **thực thi**.
3. **Gap #1 (Logging/Audit):** xác nhận với user đã thử tài khoản Super Admin recon `Activity Log` chưa; nếu có kết quả thì bổ sung TC, nếu chưa thì cập nhật lý do `➖` cho khớp thực tế thay vì lặp lại lý do quyền hạn cũ.
4. **Gap #2 (Email Quên mật khẩu):** không bắt buộc, nhưng nếu muốn số liệu index chính xác thì hoặc (a) thêm 1 biến thể SQLi/XSS gộp vào `TC_030`, hoặc (b) sửa lại dòng "6/6" thành "4/6 + 2 mục dùng chung cơ chế đã chứng minh".
5. Bộ TC đã đủ điều kiện đưa vào automation cho 46 TC `Yes` sẵn có; 6 TC mới có thể automate ngay sau khi chạy tay xác nhận Expected (5 `Yes`, 1 `Partial` — đã ghi rõ trong mục *Đối soát cột Automation* của index).
