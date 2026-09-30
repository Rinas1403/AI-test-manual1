# Báo Cáo Tiến Độ Kiểm Thử — Perfex CRM · Release 1.0 · Kỳ 2

| | |
|---|---|
| Kỳ báo cáo | 18-09-2026 → 01-10-2026 (10 ngày làm việc) · múi giờ UTC+07:00 |
| Loại kỳ | **Gộp 2 tuần.** Plan v1.3 đặt báo cáo tiến độ **hằng tuần, thứ Sáu**. Báo cáo ngày 25-09-2026 **không được lập**, nên kỳ này nối tiếp thẳng từ kỳ 1 |
| Mốc · Plan | Release 1.0 · [test_plan_release_1.0.md](../test-plans/test_plan_release_1.0.md) v1.3 (🟨 Draft, **chưa duyệt**) |
| Báo cáo kỳ trước | [test_progress_release_1.0_20260917.md](test_progress_release_1.0_20260917.md) — kỳ 1, lập theo lịch của plan v1.1 |
| Người lập | Anh Tester — QA Lead (agent hỗ trợ) |
| Nguồn dữ liệu | 5 execution report · 2 retest report · 6 bug report · 2 bộ TC (`LOGIN`, `CUST`) · 4 báo cáo review TC · danh mục `docs/testcases/README.md` · `docs/bugs/README.md` · `docs/requirements/README.md` · không có `traceability_matrix.md` · không có `reports/` · **chưa đối chiếu Jira** |
| Nội dung | Lập theo nội dung báo cáo tiến độ của ISTQB CTFL v4.0 mục 5.3.2 |

> **Về thời điểm chạy:** epoch trong tên thư mục `run_*` · `retest_*` quy ra giờ UTC+07:00 **sớm hơn 7 giờ** so với giờ ghi trong header report và giờ commit git (VD `run_1790792334` → 30-09-2026 18:18, report ghi 01-10-2026 01:18). Báo cáo dùng ngày trong header report. Lệch này **không** đẩy lần chạy nào ra ngoài kỳ.

---

## 1. Tóm tắt kỳ

> ## 🔴 TRỄ TIẾN ĐỘ
>
> Kỳ này đã có TC cho `CUST` (129 TC, review xong 24-09-2026) và chạy 57 TC `LOGIN` qua 5 lần chạy. Tuy nhiên **mốc duyệt plan (21-09-2026) đã quá hạn 8 ngày làm việc**, và `PRJ` **vẫn 0 TC** khi hạn viết và review TC chỉ còn 1 ngày (02-10-2026). Toàn bộ kết quả chạy trong kỳ đều trên **bản demo dùng chung**, không phải môi trường test của đợt. Có 14/57 TC BLOCKED, trong đó 13 TC do tính năng khoá tài khoản (`CRM-LOGIN-101`) chưa deploy. **Cần quyết trước 06-10-2026:** (1) duyệt plan, (2) hạn mới cho TC `PRJ` hoặc chấp nhận bắt đầu thực thi khi `PRJ` chưa có TC, (3) giữ hay loại tính năng khoá tài khoản khỏi Release 1.0.

---

## 2. Tiến độ so với kế hoạch

| Mốc (plan v1.3, mục 7.1) | Hạn theo plan | Thực tế | Trạng thái | Bằng chứng |
|---|---|---|---|---|
| Duyệt plan | 21-09-2026 | — | 🔴 **Quá hạn 8 ngày làm việc** | Plan v1.3 vẫn ghi `🟨 Draft`, `Ngày hiệu lực — (chưa duyệt)`, còn 12 ô treo. Git: plan không có commit nào sau 24-09-2026 |
| Hoàn tất viết và review TC `CUST` | 02-10-2026 | Viết 19-09 · review 24-09 | ✅ Đúng hạn | Nhật ký [`TEST_CASES_CUSTOMERS_SUMMARY.md`](../testcases/customers/TEST_CASES_CUSTOMERS_SUMMARY.md) (19-09-2026) · [review 24-09-2026](../testcases/customers/review/testcase_review_report_web_20260924.md): 129/129 TC 🟢. ⚠️ Review ở mode REVIEW: 1 khoảng trống bảo mật và 4 lỗi ghi nhãn **chưa sửa** (Nhật ký `CUST` không có dòng nào sau 21-09-2026) |
| Hoàn tất viết và review TC `PRJ` | 02-10-2026 | 0 TC | 🟡 **Có nguy cơ trễ** | `docs/testcases/` không có thư mục `projects/` · danh mục ghi `PRJ` 0/104 REQ. Còn 104 REQ, còn 1 ngày làm việc, tốc độ viết TC `PRJ` kỳ này = 0 REQ/ngày. Tham khảo: `CUST` (84 REQ) mất 1 ngày sinh và 3 ngày làm việc nữa mới review xong |
| Môi trường test sẵn sàng | 05-10-2026 | — | ⏳ Chưa tới hạn | Không có file nào ghi DEV xác nhận. Tiêu chí vào #2, #3, #9 vẫn `❓` (plan 4.1) |
| Smoke xác nhận môi trường | 05-10-2026 | — | ⏳ Chưa tới hạn | Tiêu chí vào #10 `❓` |
| Bắt đầu thực thi | 06-10-2026 | — | 🟡 **Có nguy cơ trễ** | Tiêu chí vào #8 (TC đủ 3 module) mới đạt 2/3, phụ thuộc mốc TC `PRJ` ở trên. Tiêu chí exit chỉ hiệu lực khi plan được duyệt (plan 4.2) |
| Báo cáo tiến độ hằng tuần — 25-09-2026 | 25-09-2026 | Không lập | ⚠️ **Lỡ một kỳ** | Không có file `test_progress_release_1.0_20260925.md`. Báo cáo này gộp 2 tuần |
| Code freeze | 19-11-2026 | — | ⏳ Chưa tới hạn | Xem dự báo dưới bảng |
| Regression · UAT · Báo cáo tổng hợp · Release | 20-11 → 15-12-2026 | — | ⏳ Chưa tới hạn | — |

**Dự báo thực thi (chỉ để tham khảo, chưa dùng để chấm trạng thái):**

- Tốc độ kỳ này = 57 TC khác nhau đã chạy ÷ 10 ngày làm việc = **5,7 TC/ngày**. Số này đo trên bản demo, do QA Lead chạy cùng agent. Chưa phải tốc độ của đội 4 người theo plan mục 6.
- Phần phải chạy trên môi trường mới = 73 TC `LOGIN` + 129 TC `CUST` = **202 TC**, chưa tính `PRJ` và các vòng retest. Kết quả trên demo không tự áp sang môi trường mới (plan 3.5, R2).
- Cần: 202 TC ÷ 33 ngày làm việc (06-10 → 19-11-2026) ≈ **6,1 TC/ngày** cho **một lượt**. Kỳ 3 sẽ có tốc độ đo trên môi trường thật để chấm mốc code freeze.

**Sai lệch đáng chú ý:** việc viết TC `PRJ` chưa bắt đầu. Kỳ 1 đã hứa Huệ bắt đầu từ 18-09-2026 (mục 6). Trong khi đó, phạm vi hai module kia đã **lớn lên** mà plan chưa cập nhật: `LOGIN` 39 → **57 REQ** trong phạm vi và 50 → **74 TC** (ticket `CRM-LOGIN-101`, 30-09-2026) · `CUST` 79 → **84 REQ** (plan 2.1 vẫn ghi `CUST` 0 TC).

**Công sức** *(plan mục 7.2: E = 19,0 người-ngày)*: — QA Lead chưa có số công sức thực tế, sẽ bổ sung ở kỳ 3.

---

## 3. Chỉ số kiểm thử

### 3.1 Chuẩn bị testware

| Module × nền tảng | TC trong kỳ (mới / sửa) | TC luỹ kế | Đã review | Nguồn |
|---|---|---|---|---|
| `LOGIN` × Web | **24 mới** (`051` · `052`→`057` · `058` · `059`→`074`) / **10 sửa** theo DELTA `CRM-LOGIN-101`, cộng các lượt sửa của review FIX 19-09 và 24-09 · 1 TC 🗑️ Deprecated (`TC_014`, 30-09) | 74 (73 đang dùng) · 73 biến thể | Review FIX 19-09, 23-09, 24-09 phủ tới `TC_057`. **17 TC mới 30-09 (`058`→`074`) chưa qua `/review-testcases`** | [`TEST_CASES_LOGIN_SUMMARY.md`](../testcases/login/TEST_CASES_LOGIN_SUMMARY.md) — Nhật ký · [`delta_tc_CRM-LOGIN-101.md`](../testcases/login/impact/delta_tc_CRM-LOGIN-101.md) · [`docs/testcases/README.md`](../testcases/README.md) |
| `CUST` × Web | **129 mới** (19-09) / 0 sửa sau đó | 129 · 155 biến thể | ✅ 24-09 — 129/129 🟢, điểm TB 11,84/12. Đề xuất sửa chưa áp dụng | [`TEST_CASES_CUSTOMERS_SUMMARY.md`](../testcases/customers/TEST_CASES_CUSTOMERS_SUMMARY.md) · [review 24-09](../testcases/customers/review/testcase_review_report_web_20260924.md) |
| `PRJ` × Web | 0 / 0 | **0** | — | [`docs/testcases/README.md`](../testcases/README.md) mục 2 |

### 3.2 Thực thi manual

> **Chưa bắt đầu (đọc trước các tỷ lệ bên dưới):**
> - `PRJ` × Web: chưa có TC, chưa có lần chạy nào.
> - `CUST` × Web: có 129 TC nhưng **chưa chạy lần nào** (không có `docs/executions/customers/`).
> - **Chưa có lần chạy nào trên môi trường test riêng của đợt.** Cả 5 lần chạy trong kỳ đều trên bản demo `crm.anhtester.com`, dùng chung.

| Module × nền tảng | Chạy trong kỳ | Chưa chạy trong kỳ | ✅ PASS | ❌ FAIL | ⚠️ BLOCKED | ⏭️ SKIP | Pass rate | Nguồn |
|---|---|---|---|---|---|---|---|---|
| `LOGIN` × Web — **trong kỳ** | 57 TC khác nhau (5 lần chạy) | 16 | 38 | 5 | 14 | 0 | **66,7%** (38/57) | [`run_1789759574`](login/web/run_1789759574/execution_report.md) · [`run_1790182902`](login/web/run_1790182902/execution_report.md) · [`run_1790185822`](login/web/run_1790185822/execution_report.md) · [`run_1790782248`](login/web/run_1790782248/execution_report.md) · [`run_1790792334`](login/web/run_1790792334/execution_report.md) |
| `LOGIN` × Web — *luỹ kế (73 TC đang dùng)* | — | 0 TC chưa từng chạy | 52 | 7 | 14 | 0 | 71,2% (52/73) | 57 TC lấy kết quả kỳ này + 16 TC lấy từ [`run_1787215085`](login/web/run_1787215085/execution_report.md) (20-08-2026) |
| `CUST` × Web | 0 | 129 | — | — | — | — | — | — |
| `PRJ` × Web | 0 | toàn bộ (chưa có TC) | — | — | — | — | — | — |

> Pass rate = PASS / (PASS + FAIL + BLOCKED). Mỗi TC lấy lần chạy **mới nhất trong kỳ**. Riêng `TC_026` và `TC_051` lấy kết quả PASS ngày 19-09, vì lần 01-10 chỉ ghi SKIPPED (không chạy lại). `TC_014` đã Deprecated nên không tính.
>
> - **FAIL (5):** `TC_004` · `TC_016` · `TC_029` · `TC_039` tái hiện 4 bug đang mở. `TC_015` FAIL vì tính năng khoá tài khoản **chưa deploy**, không phải bug (`AMB-LOGIN-27`).
> - **BLOCKED (14):** 13 TC khoá tài khoản (`059`→`061` · `063`→`068` · `070` · `071` · `073` · `074`) chờ deploy. `TC_050` chỉ có Chromium, thiếu Edge và Firefox.
> - Nếu bỏ BLOCKED khỏi mẫu số thì pass rate là 88,4% (38/43). Con số này chỉ để tham khảo, **không** dùng cho tiêu chí exit.
> - **PASS không có ảnh evidence:** `TC_014` · `TC_026` · `TC_044` · `TC_051` do người dùng tự chạy tay (`run_1789759574`).
> - **16 TC chưa chạy trong kỳ:** `012` · `018` · `019` · `020` · `027` · `028` · `030`→`033` · `035`→`038` · `040` · `041`.

### 3.3 Automation *(báo riêng, không cộng vào 3.2)*

| Suite | Số lần chạy trong kỳ | Lần gần nhất: PASS / FAIL | Nguồn |
|---|---|---|---|
| — | 0 | Không có dữ liệu. Repo chưa có project automation (R5) | Không có thư mục `reports/` |

### 3.4 Lỗi

| Severity | Mới trong kỳ | Fix & verify trong kỳ | Đang mở (luỹ kế) | Thay đổi so với kỳ trước |
|---|---|---|---|---|
| 🔴 Critical | 0 | 0 | 1 (`TC039`) | 0 |
| 🟠 Major | 0 | 0 | 0 | 0 |
| 🟡 Minor | 0 | 0 | 3 (`TC004` · `TC016` · `TC028`) | 0 |
| 🟢 Trivial | 0 | 0 | 1 (`TC029`) | **−1**: `TC018` đóng ngày 19-09-2026, lý do *không phải lỗi* (ranh giới RFC 5321) |

Nguồn: [`docs/bugs/README.md`](../bugs/README.md) mục 1 · Lịch sử retest trong `BUG_login_*.md`. **Chưa đối chiếu Jira** — plan 5.3 chọn Jira làm nguồn chính cho trạng thái bug.

**Retest trong kỳ (2 lần, cả hai `NOT_FIXED`):**

| Bug | Ngày | Kết quả | Nguồn |
|---|---|---|---|
| `BUG_login_1787226517_TC029` 🟢 | 24-09-2026 | ❌ NOT_FIXED 2/2 | [`retest_1790186495`](login/web/retest_1790186495/retest_report.md) |
| `BUG_login_1787226514_TC016` 🟡 | 01-10-2026 | ❌ NOT_FIXED 2/2 — user báo dev đã deploy bản fix, nhưng lỗi vẫn còn | [`retest_1790849000`](login/web/retest_1790849000/retest_report.md) |

Ngoài ra `TC004` (24-09) và `TC039` (01-10) tái hiện khi chạy TC. Đây không phải lượt retest chính thức nên Lịch sử retest của hai bug này **không** có dòng mới.

**Regression phát sinh trong kỳ:** 0. Không có bản fix nào đạt FIXED.

**Bug quá thời hạn xử lý (plan 9.4):** — Thời hạn theo Severity chưa chốt (ô treo 11).

> `CUST` có 2 REQ 🟡 ghi kỳ vọng mà hệ thống chưa đạt (`REQ-CUST-42` · `43`). Hai TC `TC_040` · `TC_041` được thiết kế để FAIL, sẽ thành bug khi `CUST` chạy lần đầu. Kỳ này chưa tính vì chưa chạy.

### 3.5 Độ phủ

| Chỉ số | Kỳ này | Kỳ trước | Nguồn |
|---|---|---|---|
| REQ trong phạm vi có ≥ 1 TC | `LOGIN` 57/57 · `CUST` 84/84 · `PRJ` 0/104 → **141/245 (57,6%)** | 39/217 (18,0%) | [`docs/testcases/README.md`](../testcases/README.md) mục 2 |
| REQ Critical có TC PASS | — Không có dữ liệu | — | Chưa có `traceability_matrix.md` |

> Mẫu số đổi từ 217 lên 245 vì phạm vi lớn lên (mục 2): `LOGIN` +18 REQ theo `CRM-LOGIN-101` · `CUST` 78 → 84 REQ · `PRJ` tính đủ 104 REQ, gồm 4 REQ được đưa lại (plan v1.2). Plan 2.1 **chưa** phản ánh các con số này.
>
> `LOGIN`: 17 REQ ⚪ (`REQ-LOGIN-45` → `61`) **đã có TC nhưng chưa chạy được**.

### 3.6 Ảnh chụp tiêu chí exit — xu hướng giữa đợt

> ⚠️ **Chưa phải đánh giá kết thúc.** Bảng chỉ cho thấy khoảng cách còn lại tới ngưỡng. Kết luận release thuộc `/generate-test-summary-report` cuối đợt.
>
> ⚠️ Cột *Hiện tại* lấy số **luỹ kế** của `LOGIN` (73 TC), **toàn bộ trên bản demo**. `CUST` và `PRJ` chưa có kết quả. Plan chưa duyệt nên bộ tiêu chí này **chưa có hiệu lực** (plan 4.2).

| # | Tiêu chí (theo plan 4.2) | Ngưỡng | Hiện tại | Khoảng cách | Xu hướng so với kỳ trước |
|---|---|---|---|---|---|
| 1 | Bug **Critical** đang mở | 0 | 1 (`TC039`) | Còn 1 | → Không đổi (1 → 1) |
| 2 | Bug **Major** đang mở | 0 | 0 | Đạt ngưỡng | → Không đổi |
| 3 | Pass rate TC **Priority High** | ≥ 95% | Chỉ `High`: 17/28 = **60,7%** · gộp `Critical` + `High`: 27/38 = 71,1% | Thiếu 34,3 điểm (chỉ `High`) · thiếu 23,9 điểm (gộp) | ↓ Giảm (75,0% → 60,7% · 84,6% → 71,1%) |
| 4 | Pass rate toàn bộ TC đã chạy | ≥ 90% | 71,2% (52/73) | Thiếu 18,8 điểm | ↓ Giảm (80,0% → 71,2%) |
| 5 | Tỷ lệ **BLOCKED** | ≤ 5% | **19,2%** (14/73) | Vượt 14,2 điểm | ↑ Xấu đi (5,0% → 19,2%) |
| 6 | REQ Critical có ≥ 1 TC PASS | 100% | — Không có RTM | — | — |
| 7 | Cặp module × nền tảng đã có TC **và** đã chạy | 100% | 1/3 (33,3%). Đã có TC 2/3, nhưng `CUST` chưa chạy | Còn 2 cặp | → Không đổi (1/3 → 1/3) |

> Priority lấy từ cột `Priority` của 4 part trong [`login/web/parts/`](../testcases/login/web/parts/). TC Priority `High` chưa PASS gồm 5 FAIL (`015` · `016` · `028` · `029` · `039`) và 6 BLOCKED (`059` · `060` · `061` · `068` · `070` · `073`). **Xu hướng giảm chủ yếu do phạm vi mở rộng:** 17 TC khoá tài khoản mới vào bộ nhưng chưa chạy được. Không có TC nào đang PASS chuyển sang FAIL. 10/10 TC Priority `Critical` đều PASS.

---

## 4. Trở ngại & Cách xử lý

QA Lead xác nhận ngày 01-10-2026: ngoài những gì thấy trong file, kỳ này **không có** trở ngại nào khác.

| Trở ngại | Từ ngày | Thời lượng | Ảnh hưởng | Cách xử lý / workaround | Trạng thái |
|---|---|---|---|---|---|
| Chưa có môi trường test riêng. DEV cam kết 05-10-2026 (plan v1.2 dời từ 27-09-2026) | 17-09-2026 | 10 ngày làm việc trong kỳ · dự kiến tới 05-10-2026 | Mọi kết quả chạy trong kỳ nằm trên bản demo, không tính cho đợt (R2). Chưa retest bug trên môi trường mới được (R8) | Chạy trước trên demo để phát hiện TC hỏng và bug còn tái hiện | 🟡 Đang chờ, **theo kế hoạch** |
| Tính năng khoá tài khoản `CRM-LOGIN-101` chưa deploy | 30-09-2026 | 1 ngày làm việc · chưa có ngày deploy | 13 TC BLOCKED + `TC_015` FAIL. Tỷ lệ BLOCKED luỹ kế lên 19,2% | Chạy trước 4 TC không phụ thuộc deploy (`058` · `062` · `069` · `072` PASS). Chờ PO báo deploy rồi chạy nhóm M tuần tự | 🔴 Đang mở |
| Plan chưa duyệt | 21-09-2026 (hạn duyệt) | 8 ngày làm việc | Tiêu chí exit chưa có hiệu lực. Phạm vi mở rộng chưa được ghi nhận | Đề xuất ở mục 7 | 🔴 Đang mở |
| Công cụ chạy tay chỉ có Chromium | 30-09-2026 | — | `TC_050` BLOCKED, thiếu Edge và Firefox. Ngày 19-09 `TC_050` chạy được đủ 3 trình duyệt | Chạy lại bằng trình duyệt cài trên máy, hoặc bằng automation | 🟡 Đang mở |
| Không có tài khoản có mật khẩu chứa chữ cái | 19-09-2026 | — | `TC_014` không kiểm được phân biệt hoa/thường, đã Deprecated ngày 30-09-2026 | Quyết định user: gỡ TC, giữ TC ID | 🟢 Đã xử lý (bỏ kiểm) |
| `.env` thiếu tài khoản Project Manager | 24-09-2026 | Trong buổi chạy (~18 phút cả buổi) | `TC_006` BLOCKED tạm thời | User bổ sung `PM_EMAIL` · `PM_PASSWORD`, chạy lại PASS | 🟢 Đã xử lý |
| Công cụ Playwright MCP: menu ảnh đại diện không mở được tự động · điều hướng thẳng tới trang đăng xuất làm kẹt lần gửi form kế tiếp · trình duyệt khởi động lại giữa buổi | 30-09 · 01-10-2026 | Trong buổi chạy | Bước `Logout` bằng menu chưa kiểm ở `TC_050` · `TC_062` · `TC_069`. `TC_022` · `TC_024` phải chạy lại | Mỗi lượt đăng nhập chạy trong ngữ cảnh trình duyệt mới. Chạy lại từ bước 1 | 🟡 Có workaround |
| `TC_026` · `TC_051` (`@PersonalOnly`, 65–70 phút) chỉ QA tự chạy được | 01-10-2026 | — | SKIPPED ở `run_1790792334`. Kết quả PASS gần nhất là 19-09 | QA tự chạy trên môi trường mới | 🟡 Đang mở |

---

## 5. Rủi ro mới & Thay đổi trong kỳ

> Register theo plan v1.3 mục 8.1. Kỳ 1 dùng register của plan v1.1 (R1–R10), nên R11–R13 có cột kỳ trước là `—`.

| # | Rủi ro | Kỳ trước | Kỳ này | Diễn biến | Biện pháp |
|---|---|---|---|---|---|
| R1 (plan 8.1) | Không kịp viết và review TC `CUST`/`PRJ` trước 02-10-2026 | 🟡 Theo dõi | 🟡 **Theo dõi — mức cao nhất** | `CUST` đã xong. `PRJ` 0/104 REQ, còn 1 ngày làm việc. Sẽ thành 🔴 nếu tới hết 02-10-2026 `PRJ` chưa có TC đã review | Đề xuất 1 ở mục 7 |
| R2 (plan 8.1) | Requirements khảo sát trên demo, còn đợt này chạy trên môi trường mới | 🟡 Theo dõi | 🟡 Theo dõi | Toàn bộ 5 lần chạy vẫn trên demo. Chưa có môi trường mới để so | Smoke ngày 05-10-2026 |
| R3 (plan 8.1) | AMB 🔴 của `CUST`/`PRJ` chưa trả lời | 🟡 Theo dõi | 🟢 **Giảm một phần** | 10 → **6** 🔴: `CUST` hết AMB treo ngày 19-09-2026. `PRJ` còn 6: `AMB-PRJ-01`→`04` · `06` · `14`. Ma trận phân quyền `PRJ` còn 28 ô `❔`. ⚠️ Danh sách AMB `PRJ` ở plan 2.3 (`01` · `29` · `30` · `31` · `33` · `41`) **khác** danh mục requirements | Chạy lại ma trận phân quyền `PRJ` bằng tài khoản PM **trước** khi sinh TC Vòng 3. Gửi 6 AMB cho PO. Sửa danh sách ở plan 2.3 |
| R4 (plan 8.1) | Bug Critical `TC039` đang mở | 🟡 Theo dõi | 🟡 Theo dõi | Vẫn tái hiện ngày 01-10-2026 trên demo: HTTP trả `200`, không redirect, không HSTS | Retest trên môi trường mới ngay khi có |
| R5 (plan 8.1) | Chưa có project automation, QA Lead kiêm nhiệm | 🟡 Theo dõi | 🟡 Theo dõi | Vẫn 0 script, không có `reports/`. Chiến lược tự động hoá còn trống (ô treo 10) | Theo plan: xem lại ở báo cáo thứ Sáu đầu tiên sau 06-10-2026 |
| R6 (plan 8.1) | Jira và markdown lệch nhau | 🟡 Theo dõi | 🟡 Theo dõi | Đã chốt nguồn chính (plan v1.2), nhưng báo cáo này **chưa đối chiếu Jira** | Đối chiếu trạng thái 5 bug đang mở trên Jira ở kỳ 3 |
| R7 (plan 8.1) | Môi trường sẵn sàng 05-10-2026, sát ngày bắt đầu 06-10-2026 | 🟡 Theo dõi | 🟡 Theo dõi | Không có xác nhận mới từ DEV. QA Lead chưa rõ lịch có đổi không | DEV xác nhận mốc, tài khoản 3 vai trò và dữ liệu nền trước 05-10-2026 |
| R8 (plan 8.1) | 6 bug xác nhận trên demo, `TC018` có thể không phải lỗi | 🟡 Theo dõi | 🟢 **Giảm một phần** | `TC018` đã đóng (*không phải lỗi*) ngày 19-09-2026. 5 bug còn lại chưa retest trên môi trường mới | Retest 5 bug trên môi trường mới |
| R9 (plan 8.1) | Tester `LOGIN` chưa chắc có kỹ năng DevTools | 🟡 Theo dõi | 🟡 Theo dõi | Chưa xác nhận (ô treo 7). Kỳ này phần 🔧 do QA Lead cùng agent chạy | Xác nhận trước 06-10-2026 |
| R10 (plan v1.1) | Chưa có ngày code freeze, release, ước lượng | 🔴 Đã xảy ra | 🟢 **Đã đóng** | Plan v1.2 (17-09-2026) đã có đủ lịch 7.1 và ước lượng 7.2 | — |
| R11 (plan 8.1) | 5 REQ được đưa lại vẫn ⚪, chưa kiểm chứng | — | 🟢 **Giảm một phần** | `REQ-CUST-79` không còn ⚪: PO cho nhập CSV thật trên demo ngày 19-09-2026, và `CUST` đã có TC. 4 REQ `PRJ` (`89` · `91` · `94` · `104`) vẫn ⚪ | Khảo sát bổ sung trên môi trường mới. TC của 4 REQ này được phép xong sau 02-10-2026 |
| R12 (plan 8.1) | Ước lượng 19,0 người-ngày thấp và chưa gồm automation | — | 🟡 Theo dõi | Chưa có công sức thực tế để so. Khối lượng đã tăng: +24 TC `LOGIN` · `CUST` 129 TC | Nhập công sức thực tế ở kỳ 3. Rà lại 7.2 cùng lúc cập nhật phạm vi |
| R13 (plan 8.1) | Automation chỉ đặt được ở tầng UI | — | 🟡 Theo dõi | Không đổi | — |
| R-mới-1 | **Phạm vi tăng mà plan chưa ghi nhận**: `LOGIN` 39 → 57 REQ, 50 → 74 TC · `CUST` 79 → 84 REQ | — | 🔴 **Đã xảy ra** | Ticket `CRM-LOGIN-101` (30-09-2026) và quyết định PO `PO-2026-09-19`. Plan 2.1 · 7.2 vẫn là số cũ. Plan 2.1 quy định đổi phạm vi thì tăng phiên bản plan | Đề xuất 3 ở mục 7 |
| R-mới-2 | **Tính năng khoá tài khoản chưa có ngày deploy** | — | 🟡 Mới phát hiện | 14 TC không có kết luận. Khi deploy, TC khoá PM 15 phút trên tài khoản dùng chung sẽ gây FAIL giả cho bộ TC khác (`docs/requirements/README.md` — ràng buộc cấp hệ thống). Còn thiếu tài khoản staff thứ hai (`AMB-LOGIN-28`) | Đề xuất 4 ở mục 7 · xin tài khoản PM riêng cho TC khoá |
| R-mới-3 | **Nghi vấn lỗ hổng CSRF chưa loại trừ** | — | 🟡 Mới phát hiện | `TC_025-a` lần 1 vào thẳng Dashboard dù mã CSRF đã sửa thành toàn số 0. Lần đó chưa có bộ theo dõi request nên chưa chứng minh được, 2 lần sau đều ra `419` đúng. Ngoài ra lần gửi form đầu của `TC_005` có hiện tượng `303 → /` bất thường | Chạy lại `TC_025` trên môi trường mới, có theo dõi request. Lặp lại kèm bằng chứng thì báo bug 🔴 ngay |

**Trạng thái rủi ro:** 🟡 Theo dõi · 🔴 Đã xảy ra · 🟢 Đã giảm/đóng

---

## 6. Kế hoạch kỳ tới

> Kỳ 3: **02-10-2026 → 09-10-2026** (thứ Sáu). Lịch bám plan v1.3. QA Lead **chưa có xác nhận** từ DEV/PO rằng các mốc 02-10, 05-10, 06-10 có đổi hay không.

| Việc | Module × nền tảng | Người | Hạn | Căn cứ |
|---|---|---|---|---|
| Chạy lại ma trận phân quyền `PRJ` bằng tài khoản PM, rồi sinh và review TC | `PRJ` × Web | Huệ | 02-10-2026 theo plan · hạn mới chờ quyết định (mục 7) | Plan 6 · 7.1 · R1 · R3 |
| Gửi 6 AMB 🔴 `PRJ` cho PO | `PRJ` | Anh Tester | Trước khi Huệ sinh TC vùng đó | R3 |
| Áp đề xuất review 24-09 bằng `/review-testcases` mode FIX: 1 khoảng trống bảo mật · 4 lỗi ghi nhãn · `TC_094`/`TC_095` tách thành `130`/`131` | `CUST` × Web | Lan | Trước 06-10-2026 | Mục 3.1 |
| Review 17 TC mới `058`→`074` | `LOGIN` × Web | Anh Tester | Trước 06-10-2026 | Mục 3.1 · tiêu chí vào #8 |
| Duyệt plan và tăng phiên bản v1.4 theo phạm vi mới | Cả 3 | Anh Tester + PO | Trước 06-10-2026 | Mục 2 · R-mới-1 |
| Bàn giao môi trường, tài khoản 3 vai trò, dữ liệu nền, tài khoản PM riêng cho TC khoá | Web | Đội DEV | 05-10-2026 | Tiêu chí vào #2 · #3 · #9 · R7 · R-mới-2 |
| Smoke `LOGIN` trên môi trường mới | `LOGIN` × Web | Hồng | 05-10-2026 | Tiêu chí vào #10 · R2 |
| Bắt đầu thực thi: retest 5 bug đang mở, chạy `TC_025` có theo dõi request, chạy `CUST` theo thứ tự plan 3.2 | `LOGIN` · `CUST` × Web | Hồng · Lan | Từ 06-10-2026 | Plan 3.5 · 7.1 · R4 · R8 · R-mới-3 |
| Nhập công sức thực tế kỳ 2 và kỳ 3 | — | Anh Tester | Báo cáo kỳ 3 | Mục 2 · R12 |
| Lập báo cáo tiến độ kỳ 3 | — | Anh Tester | 09-10-2026 | Plan 7.1 |

**Đối chiếu kế hoạch kỳ này đã hứa** *(mục 6 của báo cáo kỳ 1)*: **2/7 việc hoàn thành · 4/7 xong một phần · 1/7 chưa làm**

| Việc đã hứa | Kết quả |
|---|---|
| Sinh TC `CUST`, review theo batch — Lan | ✅ 129 TC ngày 19-09, review xong 24-09 |
| Sinh TC `PRJ`, review theo batch — Huệ | ❌ Chưa bắt đầu — 0 TC |
| Gửi 10 AMB 🔴 cho PO | ◐ 4 AMB `CUST` đã có câu trả lời ngày 19-09 · 6 AMB `PRJ` chưa có bằng chứng đã gửi |
| Duyệt plan, chốt ô treo 8 · 9 · 12 · 14 | ◐ Plan v1.2 (17-09) đã chốt lịch, ước lượng, nguồn chính, người chấp nhận dừng · **chưa duyệt** |
| Quyết định 5 REQ ⚪ | ◐ Đã đưa lại vào phạm vi (plan v1.2) · `REQ-CUST-79` đã kiểm chứng · 4 REQ `PRJ` chưa khảo sát bổ sung |
| DEV xác nhận mốc môi trường, tài khoản, dữ liệu nền | ◐ Mốc đổi thành 05-10-2026 theo phiếu plan · tài khoản và dữ liệu nền vẫn `❓` |
| Chỉ định người phụ trách automation | ✅ Anh Tester kiêm nhiệm (plan v1.2) |

> Kế hoạch kỳ tới là **đề xuất** từ lịch plan và phần việc còn lại. QA Lead xác nhận.

---

## 7. Đề xuất điều chỉnh

| Đề xuất | Lý do (dẫn số liệu) | Ai quyết định | Cần sửa plan? |
|---|---|---|---|
| **1.** Chốt hạn mới cho TC `PRJ`, **hoặc** chấp nhận bắt đầu thực thi 06-10-2026 với `LOGIN` + `CUST` trước, `PRJ` vào sau (thứ tự `CUST` → `PRJ` đã có ở plan 3.2) | `PRJ` 0/104 REQ, còn 1 ngày làm việc (mục 2 · R1). Tiêu chí vào #8 mới đạt 2/3 | Anh Tester + PO | **Có** → `/generate-master-test-plan` cập nhật 7.1 và 4.1 #8 |
| **2.** Duyệt plan trước 06-10-2026 | Mốc 21-09 quá hạn 8 ngày làm việc. Tiêu chí exit chỉ hiệu lực khi plan được duyệt (mục 2 · mục 4) | Anh Tester + PO | **Có** → mục 11 (chữ ký) |
| **3.** Cập nhật phạm vi và ước lượng theo số hiện tại: `LOGIN` 57 REQ / 74 TC · `CUST` 84 REQ / 129 TC · sửa danh sách AMB `PRJ` ở 2.3 | Plan 2.1 · 2.3 · 7.2 còn số cũ (R-mới-1 · R3 · R12) | Anh Tester | **Có** → mục 2.1 · 2.3 · 7.2, tăng lên v1.4 |
| **4.** Quyết định về tính năng khoá tài khoản: chốt ngày deploy **trước code freeze 19-11-2026**, hoặc loại `STORY-LOGIN-07` khỏi Release 1.0 | 14 TC không có kết luận. BLOCKED luỹ kế 19,2%, trong khi ngưỡng exit #5 là ≤ 5% (mục 3.6 · R-mới-2) | PO | **Có** nếu loại → mục 2.1 · 2.2 |
| **5.** Làm rõ tiêu chí exit #3 có tính TC Priority `Critical` hay không. Đề xuất này mang từ kỳ 1 sang, chưa xử lý | Hai cách tính cho ra 60,7% và 71,1% (mục 3.6) | Anh Tester | **Có** → mục 4.2 |
| **6.** Tách riêng kết quả chạy trên demo trong mọi báo cáo sau, không gộp vào số của môi trường mới | 100% lần chạy kỳ này trên demo. Plan 3.5 và R2 đã nêu không tự áp sang | Anh Tester | Không — đã có ở plan 3.5 |
| **7.** Giữ lịch báo cáo thứ Sáu: kỳ 3 lập ngày 09-10-2026 | Kỳ 25-09 bị lỡ, báo cáo này phải gộp 2 tuần (mục 2) | Anh Tester | Không |

> Đề xuất nào đụng phạm vi · lịch · nhân lực · tiêu chí → **phải** cập nhật plan bằng `/generate-master-test-plan`, không sửa ngầm trong báo cáo tiến độ.
