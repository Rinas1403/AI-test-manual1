# Báo Cáo Review Test Cases — `LOGIN` · Web

## Tổng quan

| Mục | Giá trị |
|---|---|
| **Nguồn** | [web/test_cases_login_web.md](../web/test_cases_login_web.md) — 57 TC · index [TEST_CASES_LOGIN_SUMMARY.md](../TEST_CASES_LOGIN_SUMMARY.md) |
| **Requirements đối chiếu** | [REQUIREMENTS_LOGIN_SUMMARY.md](../../../requirements/login/REQUIREMENTS_LOGIN_SUMMARY.md) · [requirements_login_web.md](../../../requirements/login/web/requirements_login_web.md) |
| **Review trước đó** | [testcase_review_report_web_20260923.md](testcase_review_report_web_20260923.md) — 57 🟢, TB 11.75/12. **Nội dung file TC không đổi gì** kể từ đó (bất động từ 21-09-2026) — lượt này chấm lại độc lập toàn bộ 57 TC theo đúng quy trình, không copy kết luận cũ |
| **Ngày review** | 24-09-2026 · Mode **REVIEW** |
| **Kết quả** | 🟢 55 tốt · 🟡 2 cần sửa · 🔴 0 viết lại |
| **Điểm trung bình** | **11.65 / 12** |
| **Loại trừ theo requirements** | `REQ-LOGIN-27` (`AMB-LOGIN-04` ⏭️) · `REQ-LOGIN-34`, `REQ-LOGIN-35` (`AMB-LOGIN-06`/`07` ⏭️) · `REQ-LOGIN-40` (`AMB-LOGIN-15` ⏭️) · Không viết TC biên cho trường Password (`AMB-LOGIN-09`) |

> 📌 **Kết luận chính:** Cách viết của 57 TC vẫn đúng chuẩn như lượt 23-09 — không phát hiện lỗi rubric mới. **Phát hiện mới của lượt này** không nằm ở cách viết, mà ở một **lượt chạy thật vừa thực hiện hôm nay** (`run_1790182902`, 24-09-2026): nó tái xác nhận `CRM_LOGIN_TC_004` vẫn FAIL đúng như bug đã mở từ 20-08-2026, nhưng TC này **không** mang nhãn `🐞`/"Hiện trạng: FAIL" như ba TC anh em (`TC_016`, `TC_028`, `TC_039`), và cũng vắng mặt khỏi bảng "🐞 Ba TC nhiều khả năng FAIL" ở cuối file TC. Soát lại thấy `CRM_LOGIN_TC_029` cũng ở tình trạng y hệt (bug mở từ 20-08, chưa từng được flag, chưa từng retest). Đây là hai TC bị hạ điểm ở lượt review này — xem mục *Chi tiết từng TC* và *Phát hiện mới*.

## Chi tiết từng TC

Tiêu chí: ① Rõ ràng · ② Expected đo được · ③ Độc lập · ④ Test data · ⑤ Truy vết · ⑥ Trọng tâm

### 🟢 12/12 — không cần sửa (45 TC)

TC_001, TC_005, TC_006, TC_007, TC_010, TC_011, TC_012, TC_013, TC_014, TC_015, TC_016, TC_017, TC_018, TC_020, TC_021, TC_022, TC_023, TC_025, TC_026, TC_027, TC_028, TC_030, TC_031, TC_032, TC_033, TC_034, TC_036, TC_038, TC_039, TC_042, TC_043, TC_044, TC_045, TC_046, TC_047, TC_048, TC_049, TC_050, TC_051, TC_052, TC_053, TC_054, TC_055, TC_056, TC_057

### 🟡 9/12 — cần bổ sung nhãn known-bug, không phải viết lại (2 TC — MỚI phát hiện lượt này)

| TC ID | Vấn đề | Đề xuất sửa cụ thể |
|---|---|---|
| `TC_004` | Test Scenario và Expected viết như một kịch bản **sẽ PASS** ("Bấm logo trên trang đăng nhập thì về trang chủ công khai" / "Trang chuyển sang trang chủ công khai"), nhưng có bug mở từ 20-08-2026 ([BUG_login_1787226513_TC004](../../../bugs/login/web/BUG_login_1787226513_TC004.md)) tái hiện **luôn luôn**, và hôm nay `run_1790182902` vừa chạy lại vẫn FAIL y hệt (dừng ở `/authentication/login`, không phải `/`). TC không cảnh báo trước điều này — người chạy sau (kể cả automation) sẽ đọc TC, thấy FAIL, và tưởng đây là **regression mới** thay vì một vấn đề đã biết, đã có bug, đang chờ PO trả lời (chính bug report cũng ghi "đề xuất xác nhận lại với PO"). Tiêu chí ① (Rõ ràng) giảm vì thiếu bối cảnh quan trọng; tiêu chí ⑤ gián tiếp yếu vì không link tới bug đang treo | Thêm dòng cảnh báo giống `TC_039`: đổi Test Scenario thành `🐞 Bấm logo trên trang đăng nhập thì về trang chủ công khai`, thêm vào Expected: *"🐞 **Hiện trạng: FAIL** — thanh địa chỉ dừng ở `https://crm.anhtester.com/authentication/login` (cổng đăng nhập khách hàng), không phải trang chủ công khai. Xem [BUG_login_1787226513_TC004](../../../bugs/login/web/BUG_login_1787226513_TC004.md), mở từ 20-08-2026, **chưa retest**. FAIL là kết quả đúng → KHÔNG sửa TC theo hiện trạng"*. Đồng thời thêm dòng vào bảng "🐞 Ba TC nhiều khả năng FAIL" cuối file (đổi tiêu đề bảng cho khớp số lượng mới) |
| `TC_029` | Cùng tình trạng với `TC_004`: bug mở từ 20-08-2026 ([BUG_login_1787226517_TC029](../../../bugs/login/web/BUG_login_1787226517_TC029.md)) ghi nhận ô Email **không** trở về rỗng sau khi submit lỗi, ngược với Expected hiện tại của TC (*"ô Email trở về rỗng"*). Lượt review 19-09-2026 trước đây **đã** liệt TC này là đang FAIL (xem ghi chú *"TC_004 (logo) và TC_029 (ô Email Quên mật khẩu không reset) đang FAIL, bug mở"* trong [testcase_review_report_web_20260919.md](testcase_review_report_web_20260919.md) dòng cuối), nhưng TC chưa từng được cập nhật nhãn `🐞`, và **chưa có lượt chạy nào retest** kể từ `run_1787215085` (20-08-2026) — 5 tuần không xác nhận lại | Trước khi thêm nhãn `🐞` cố định, **chạy lại TC_029 một lần** để xác nhận bug còn tái hiện (khác `TC_004` vừa được xác nhận lại hôm nay). Nếu vẫn FAIL: thêm nhãn tương tự `TC_004`, dẫn tới bug report, đưa vào bảng known-bug. Nếu đã PASS (hệ thống đã sửa âm thầm): đóng bug với trạng thái *fixed*, giữ nguyên TC không cần sửa |

### 🟢 10/12 — có lý do kỹ thuật rõ ràng, không cần sửa (4 TC)

| TC ID | Vì sao không đạt 12/12 | Vì sao KHÔNG cần sửa |
|---|---|---|
| TC_008, TC_009 | Phần chính chỉ chứng minh đăng nhập thành công, không chứng minh được mục tiêu thật (cookie ghi nhớ) vì không có biểu hiện nhìn thấy bằng mắt | `ASM-09` giải thích rõ trong index: `REQ-LOGIN-40` xác nhận tính năng tự đăng nhập lại không hoạt động. Kiểm chứng thật đã tách đúng xuống dòng 🔧, TC gắn `@TechCheck` — thiết kế đúng |
| TC_024 | Mã CSRF không có biểu hiện nhìn thấy được | Đã giải thích ngay trong Expected: "kiểm chứng thật nằm ở dòng 🔧" |
| TC_037 | Phần chính chỉ chứng minh luồng thao tác; mục tiêu sâu hơn (cookie còn nhưng vô hiệu) chỉ đo được ở 🔧 | Đã giải thích ngay trong Expected — đúng thiết kế |

### 🟢 11/12 — nhận xét nhỏ, không bắt buộc sửa (6 TC)

| TC ID | Ghi chú |
|---|---|
| TC_002 | Bảng kiểm 6 mục trong 1 TC (độ hạt GỘP Kiểu B — hợp lệ). Khối lượng thông tin lớn trong một ô Expected khiến người mới đọc cần đọc kỹ mới bám đúng thứ tự |
| TC_003 | Tương tự TC_002 — Bảng kiểm 3 mục |
| TC_019 | TC dài, 4 bước nối tiếp cùng một cặp thông tin — đúng ý đồ, nhưng độ phức tạp khiến tiêu chí ① giảm nhẹ |
| TC_035 | Expected phụ thuộc ngầm vào tiền đề môi trường dùng chung ("không có timer nào đang chạy") — Pre-Condition đã nêu nên không tính lỗi, chỉ là điểm dễ vỡ khi vận hành |
| TC_040 | `Partial` automation + thao tác thủ công ngắt mạng — Expected vẫn đo được, chỉ hạ nhẹ vì thao tác không lặp lại chính xác 100% giữa các lần chạy tay |
| TC_041 | Cần DevTools để giả lập mạng chậm — người không biết DevTools không tự chạy được phần đầu |

### Tổng số TC theo mức điểm

| Mức | Số TC | Danh sách |
|---|---|---|
| 12/12 | 45 | Xem mục *🟢 12/12* |
| 11/12 | 6 | TC_002, TC_003, TC_019, TC_035, TC_040, TC_041 |
| 10/12 | 4 | TC_008, TC_009, TC_024, TC_037 |
| 9/12 | 2 | TC_004, TC_029 |
| **Tổng** | **57** | 45+6+4+2 = 57 ✅ |

**Điểm trung bình:** (45×12 + 6×11 + 4×10 + 2×9) / 57 = (540 + 66 + 40 + 18) / 57 = **664 / 57 ≈ 11.65 / 12**

## Đối soát loại kiểm thử (4 vòng)

Không đổi so với lượt 23-09-2026 — nội dung TC bất động, và phát hiện mới của lượt này (nhãn known-bug thiếu) không dịch chuyển TC nào giữa các nhánh.

| Vòng | Nhánh | Trạng thái | Ghi chú |
|---|---|---|---|
| 1 | UI cơ bản · Open form · Display · Input valid · Save · Verify data | ✅ | Không đổi |
| 2 | UI Behavior · Required · Validation · EP · BVA · Business Rule · Dependency · Use Case | ✅ | Không đổi |
| 2 | Decision Table · State Transition · Save/Edit/Delete | ➖ | Không đủ điều kiện kỹ thuật |
| 2 | Error Guessing | ✅ | TC_010, TC_016, TC_018, TC_036, TC_040, TC_054, TC_055 |
| 3 | Permission · Security | ✅ | Không đổi |
| 3 | API · Database · Integration | ➖ | QA không có quyền — đội Dev xác minh |
| 3 | Logging / Audit | ➖ | **Vẫn treo** — xem Coverage Gap #1 (carry-forward) |
| 4 | Compatibility · Responsive · Accessibility · Performance | ✅ | Không đổi |
| 4 | Regression | ➖ | Chưa bug nào **được fix** — vẫn đúng; **cả 2 bug mới bị hạ điểm ở lượt này (`TC_004`, `TC_029`) đều chưa fix, không đổi kết luận của nhánh này** |
| 4 | E2E | ➖ | Ngoài phạm vi module |

## Đối soát bảng loại field

Không đổi so với lượt 23-09-2026 (xem báo cáo đó để biết chi tiết từng mục) — phát hiện mới của lượt này không thuộc phạm vi bảng field-level.

## Phát hiện mới 24-09-2026 — Nhãn known-bug chưa đồng bộ với thực tế chạy (2 TC)

Đây là phát hiện có được nhờ đối chiếu với **execution report vừa sinh cùng ngày** (`run_1790182902`, phạm vi `TC_001`→`TC_010`), việc mà lượt review 23-09-2026 chưa có cơ hội làm vì run đó chưa tồn tại lúc đó.

| # | Phát hiện | Bằng chứng | Mức độ |
|---|---|---|---|
| 1 | `CRM_LOGIN_TC_004` FAIL **tái hiện hôm nay**, khớp 100% với bug mở từ 20-08-2026, nhưng TC không có nhãn `🐞` cảnh báo trước | `run_1790182902` → mục "FAIL #1", đối chiếu [BUG_login_1787226513_TC004](../../../bugs/login/web/BUG_login_1787226513_TC004.md) | Trung bình — rủi ro thao tác (người chạy tưởng nhầm là bug mới), không phải rủi ro chức năng |
| 2 | `CRM_LOGIN_TC_029` có bug mở từ 20-08-2026, đã được lượt review 19-09-2026 ghi nhận là FAIL, nhưng **chưa từng được gắn nhãn** trong TC và **chưa từng retest** suốt 5 tuần | So [testcase_review_report_web_20260919.md](testcase_review_report_web_20260919.md) (dòng cuối) với nội dung `TC_029` hiện tại — không có thay đổi nào được áp dụng | Thấp/Trung bình — cần retest trước khi kết luận chắc, vì bug đã 5 tuần không xác nhận lại |

**Vì sao Mode REVIEW của các lượt trước không bắt được:** rubric 6 tiêu chí chấm cách viết tại một thời điểm tĩnh; việc một TC "viết đúng nhưng không cảnh báo trước kết quả FAIL đã biết" chỉ lộ ra khi **đối chiếu với execution report mới** — đúng mục đích của bước "Đối chiếu kết quả chạy" trong quy trình review. Lượt 23-09-2026 đã làm bước này nhưng với dữ liệu execution cũ hơn (không có `run_1790182902` vì run đó sinh sau, cùng ngày 24-09 với lượt review này).

## Coverage Gaps (carry-forward từ 23-09-2026, chưa xử lý)

| # | Kịch bản thiếu | Vòng / Nhánh | Priority đề xuất | Trạng thái |
|---|---|---|---|---|
| 1 | Đăng nhập thành công/thất bại có được ghi vào `Activity Log` không — vẫn chặn bởi quyền tài khoản demo | V3 · Logging/Audit | Low | Không đổi từ 23-09-2026 — vẫn cần tài khoản Super Admin để rà lại |
| 2 | Ô Email trang Quên mật khẩu — 3 kiểu định dạng sai chưa từng thử trên chính form này (thiếu domain, nhiều `@`, ký tự tấn công trước `@`) | V2 · Validation (Email — Quên mật khẩu) | Low | Không đổi — rủi ro thấp, có giải thích kỹ thuật ở báo cáo 23-09 |

## TC trùng lặp — đề xuất merge

- Không phát hiện TC trùng lặp mới.

## Đối chiếu kết quả chạy (evidence)

- `run_1787215085` (20-08-2026), `run_1789759574` (19-09-2026) — không có ghi chú cũ nào còn sai lệch, như báo cáo 23-09 đã xác nhận.
- **`run_1790182902` (24-09-2026, mới sinh hôm nay)** — phạm vi `TC_001`→`TC_010`, 9/10 PASS, 1 FAIL (`TC_004`, bug đã biết — xem mục *Phát hiện mới* ở trên). Không phát hiện sai lệch nào khác so với Expected của 9 TC PASS.
- **6 TC Nhóm L (`TC_052`→`TC_057`) vẫn chưa có lượt chạy nào** — `run_1790182902` không chạm tới nhóm này. 3 tag `@NeedsVerify` (`TC_053`, `TC_056`, `TC_057`) vẫn treo, không đổi so với 23-09-2026.

## Kết luận & Khuyến nghị

1. **2 TC cần bổ sung nhãn known-bug** (`TC_004`, `TC_029`) — không phải viết lại, chỉ thêm dòng `🐞`/"Hiện trạng: FAIL" + link bug, đúng khuôn mẫu đã dùng cho `TC_016`/`TC_028`/`TC_039`. Đề xuất chạy `/review-testcases` Mode FIX cho riêng 2 TC này sau khi user xác nhận — lưu ý thư mục `docs/testcases/login/` **chưa được git theo dõi** (`git status` = `??`), nên trước khi sửa cần hỏi user thay vì dựa vào mốc git.
2. **`TC_029` nên được retest trước khi gắn nhãn cố định** — bug của nó chưa được xác nhận lại từ 20-08-2026 (khác `TC_004` vừa xác nhận lại hôm nay qua `run_1790182902`).
3. **Chạy 6 TC Nhóm L (`TC_052`→`TC_057`) qua `/execute-test-cases`** để gỡ 3 tag `@NeedsVerify` còn treo — vẫn là việc quan trọng nhất chưa làm, không đổi từ khuyến nghị 23-09-2026.
4. Gap #1 (Logging/Audit) và Gap #2 (Email Quên mật khẩu) — không bắt buộc, xem chi tiết ở báo cáo 23-09-2026, chưa có gì mới để cập nhật.
5. Đề nghị **commit `docs/testcases/login/` vào git** trước khi làm bất kỳ Mode FIX nào tiếp theo — hiện không có mốc git để đối chiếu bản cũ nếu sửa đè.
