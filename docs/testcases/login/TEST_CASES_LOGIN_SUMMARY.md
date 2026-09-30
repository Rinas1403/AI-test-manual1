# Test Cases — Module Đăng nhập / Xác thực (`LOGIN`) — tổng 74 TC (73 đang dùng · 1 `@Deprecated`) · 1 nền tảng · độ hạt GỘP

| Thông tin | Nội dung |
|---|---|
| **Hệ thống** | Perfex CRM — Anh Tester Demo (`https://crm.anhtester.com`) |
| **Module** | Đăng nhập / Xác thực · prefix `LOGIN` |
| **Nguồn requirement** | [REQUIREMENTS_LOGIN_SUMMARY.md](../../requirements/login/REQUIREMENTS_LOGIN_SUMMARY.md) — 61 REQ, **57 trong phạm vi** |
| **Mode sinh** | QUICK (`/generate-testcases-from-requirements`) · **độ hạt GỘP**<br>Bổ sung 11-09-2026: 9 TC theo **Bản Đồ Loại Kiểm Thử — 4 Vòng** (`/generate-testcases-manual-rbt`)<br>Bổ sung 21-09-2026: 6 TC do **rà lại độ phủ** — ô tích `Remember me`, phiên đa tab, biên ô Email trang Quên mật khẩu<br>Bổ sung 30-09-2026: 16 TC nhánh **BỔ SUNG** cho `REQ-LOGIN-45` → `61` (khoá tài khoản — `CRM-LOGIN-101`) |
| **Ngày sinh** | 20-08-2026 · cập nhật ngôn ngữ kiểm chứng 20-08-2026 · bổ sung 4 vòng 11-09-2026 · **DELTA `adhoc_2026-09-19` + chuyển tầng nền tảng 19-09-2026** · **rà độ phủ + bổ sung Nhóm L 21-09-2026** · **DELTA `CRM-LOGIN-101` 30-09-2026** · **BỔ SUNG khoá tài khoản + tách `parts/` 30-09-2026** |
| **Dải TC ID** | `CRM_LOGIN_TC_001` → `CRM_LOGIN_TC_074` — `001`→`041` gốc, `042`→`050` bổ sung 4 vòng, `051` bổ sung theo `AMB-LOGIN-19`, `052`→`057` bổ sung rà độ phủ 21-09-2026, `058` DELTA `CRM-LOGIN-101`, `059`→`074` BỔ SUNG khoá tài khoản 30-09-2026 |
| **Mã kế tiếp** | `CRM_LOGIN_TC_075` — **KHÔNG đánh lại từ 001** |
| **Môi trường** | ⚠️ **Dùng chung** — mọi TC chỉ đọc hoặc hoàn tác được; không có TC nào phá huỷ dữ liệu nghiệp vụ |
| **Trình duyệt chuẩn** | Google Chrome, viewport desktop `1600×750` |
| **Tài khoản** | 🔒 Lấy từ `.env` (`ADMIN_*`, `PM_*`, `CUSTOMER_*`) — **KHÔNG** ghi mật khẩu thật vào tài liệu<br>🔐 **Từ `CRM-LOGIN-101` (30-09-2026):** gửi mật khẩu sai / bỏ trống mật khẩu / mã CSRF sai với tài khoản có thật **chỉ** dùng `PM_*`, **không bao giờ** `admin@example.com` — 5 lần sai liên tiếp khoá tài khoản 15 phút trên môi trường dùng chung. Mở đầu TC bằng một lần đăng nhập đúng PM để bộ đếm = 0 |

## Cách đọc bộ TC này

### 1. Độ hạt GỘP

TC ở đây được viết theo **độ hạt GỘP**: các biến thể của **cùng một trường** cho **cùng loại phản hồi** nằm chung một TC, liệt kê trong **Bảng biến thể** ở cột `Test Data` (hoặc **Bảng kiểm** ở cột `Expected Result` với TC kiểm tra tĩnh).

- Mỗi biến thể có mã riêng `a`, `b`, `c`… → báo cáo FAIL **bắt buộc** ghi rõ biến thể: `CRM_LOGIN_TC_012-c FAIL`
- Chạy một TC nghĩa là chạy **hết** biến thể của nó, không được bỏ dòng nào
- Sang automation, TC gộp map thành **test data-driven** (`@DataProvider` · `test.each` · `parametrize`), mỗi biến thể một bộ dữ liệu

> Cần mỗi biến thể là một TC riêng (khách hàng tính công theo số TC, hoặc cần pass-rate từng biến thể) → sinh lại bằng `/generate-testcases-from-requirements <đường dẫn> TÁCH`.

### 2. Dòng `🔧 Ghi chú kỹ thuật` — đọc kỹ trước khi chạy

Mọi bước và mọi kết quả kỳ vọng ở phần chính đều **quan sát được bằng mắt trên màn hình**. Tester chạy được toàn bộ bộ TC này mà **không cần mở DevTools**.

Một số yêu cầu — cookie ghi nhớ, mã chống CSRF, header bảo mật, mã trạng thái HTTP — **không có biểu hiện nhìn thấy được**. Phần kiểm chứng cấp kỹ thuật của chúng nằm ở dòng riêng mở đầu bằng:

```
🔧 Ghi chú kỹ thuật (cần DevTools): ...
```

| | |
|---|---|
| **Ai chạy phần chính** | Tester nghiệp vụ — chỉ dùng trình duyệt |
| **Ai chạy dòng 🔧** | Tester có kỹ năng DevTools, hoặc để dành cho automation |
| **TC có dòng 🔧** | Gắn tag **`@TechCheck`** — xem bộ chạy riêng ở cuối tài liệu |
| **Bỏ qua dòng 🔧 được không** | ✅ Được. TC vẫn chấm PASS/FAIL bình thường ở phần chính. Khi bỏ qua thì ghi `— (bỏ phần 🔧)` vào báo cáo |

🔒 Dòng 🔧 chỉ ghi **hình thái** giá trị bí mật (`<16 ký tự hex>`), **KHÔNG** chép giá trị thật vào báo cáo.

---

## Bản đồ tài liệu

> File này là **index** — không chứa dòng TC. TC chi tiết nằm ở `web/parts/`. Tách 30-09-2026 theo quyết định user (74 TC vượt ngưỡng 50 của độ hạt GỘP), cắt tại ranh giới nhóm, nội dung TC cũ chuyển **nguyên văn**.

| Nền tảng | File | Nhóm chức năng | Số TC | TC ID | REQ bao phủ |
|---|---|---|---|---|---|
| Web | [web/parts/part_01_web_dang_nhap.md](web/parts/part_01_web_dang_nhap.md) | A Giao diện · B Đăng nhập thành công · C Dữ liệu đầu vào & đăng nhập thất bại | 21 (`014` `@Deprecated`) | 001–020, 058 | REQ-01 → 16, 36 → 38, 41, 43 |
| Web | [web/parts/part_02_web_phien_quen_mat_khau_dang_xuat.md](web/parts/part_02_web_phien_quen_mat_khau_dang_xuat.md) | D Phiên & CSRF · E Quên mật khẩu · F Đăng xuất | 18 | 021–037, 051 | REQ-17 → 33, 39, 42 |
| Web | [web/parts/part_03_web_phi_chuc_nang_bo_sung.md](web/parts/part_03_web_phi_chuc_nang_bo_sung.md) | G Phi chức năng · H Hành vi ô nhập · I Giá trị biên · K Tương thích · L Ô tích Ghi nhớ, đa tab, biên Quên mật khẩu · 🐞 TC nhiều khả năng FAIL | 19 | 038–050, 052–057 | REQ-02, 06, 09, 13, 14, 23, 26, 32, 33, 44 |
| Web | [web/parts/part_04_web_khoa_tai_khoan.md](web/parts/part_04_web_khoa_tai_khoan.md) | **M Khoá tài khoản khi đăng nhập sai nhiều lần** (`CRM-LOGIN-101`) — kèm Bảng quyết định + Bảng chuyển trạng thái | 16 | 059–074 | REQ-45 → 61 |
| **Web — tổng** | 4 part · `web/test_cases_login_web.md` giữ lại làm **trang chuyển hướng** (không chứa TC) để link cũ từ execution report / bug không gãy | | **74** — 73 đang dùng + 1 `@Deprecated` (`TC_014`) | 001–074 | **57/57 REQ trong phạm vi** |
| Mobile | — | Chưa có | 0 | — | — |
| API | — | Chưa có | 0 | — | — |

---

## Assumptions đã áp dụng

| Mã | Điểm chưa rõ | Giả định đã dùng | TC / biến thể bị ảnh hưởng |
|---|---|---|---|
| ASM-01 | ✅ **Đã giải quyết 19-09-2026** — `AMB-LOGIN-19`: phiên 1 giờ tính theo **thời gian không hoạt động** hay **tổng thời gian từ lúc đăng nhập**? | Tạm hiểu là **thời gian không hoạt động**. PO chốt **trùng giả định** — mỗi thao tác gia hạn lại | `TC_026` — gỡ `@AssumptionBased` · thêm `TC_051` cho vế gia hạn |
| ASM-02 | ✅ **Đã giải quyết 19-09-2026** — chạy thật đầu-cuối ở `run_1789759574`. `REQ-LOGIN-30` mới có bằng chứng đọc mã nguồn `logout()`, chưa chạy thật đầu-cuối (`AMB-LOGIN-14` ⏭️ chuyển module `TASK`) | Viết TC theo đúng mã nguồn đã đọc, chấp nhận bằng chứng mức mã nguồn | `TC_034` — gỡ `@AssumptionBased` + `@NeedsVerify`, thêm bước tự dựng dữ liệu, `Automation = Yes` |
| ASM-03 | ✅ **Đã giải quyết** — recon thật ở `run_1787215085`. `REQ-LOGIN-29` nhánh mobile chưa có lượt recon nào — nguồn duy nhất là quyết định PO (`AMB-LOGIN-16`) | Viết TC theo quyết định PO; kỳ vọng ở TC_033 **chưa được đo** | `TC_033` — gỡ `@NeedsVerify` |
| ASM-04 | ✅ **Đã giải quyết** — `run_1787215085` xác nhận **trùng giả định**. Hệ thống xử lý chuỗi toàn khoảng trắng ở trường bắt buộc thế nào? | Giả định **cắt khoảng trắng trước khi kiểm trường bắt buộc**, nhất quán với `REQ-LOGIN-38` | `TC_011-d` — gỡ `@NeedsVerify` |
| ASM-05 | ✅ **Đã giải quyết 19-09-2026** — đo bằng 3 lần nạp trang cùng phiên và 2 phiên riêng: mã CSRF **cố định trong phiên**, phiên mới mới đổi. **Khác giả định** nhưng khớp đúng `REQ-LOGIN-21` ("đổi theo phiên") → không phải lỗi, không mở AMB · *Ban đầu:* `REQ-LOGIN-21` ghi mã CSRF "đổi theo phiên" — không rõ có sinh lại ở mỗi lần nạp trang không | Giả định **sinh lại ở mỗi lần nạp trang** — đã huỷ | `TC_024` mục 🔧`2` — sửa kỳ vọng, gỡ `@NeedsVerify` |
| ASM-06 | ✅ **Đã giải quyết 19-09-2026** — dùng tài khoản staff test riêng (`TC014_EMAIL` / `TC014_PASSWORD` trong `.env`). 🗑️ **30-09-2026:** tài khoản này chưa bao giờ được cấp → `TC_014` Deprecated theo quyết định user. Mật khẩu tài khoản demo là **6 ký tự số** (`RISK-LOGIN-07`) nên không có chữ cái để thử đảo hoa/thường | TC chỉ chạy được khi tài khoản test có mật khẩu chứa chữ cái | `TC_014` — gỡ `@NeedsVerify`, đổi tài khoản |
| ASM-07 | ✅ **Đã giải quyết 19-09-2026** — PO chốt bắt buộc ép HTTPS (`AMB-LOGIN-20` → `REQ-LOGIN-44`), trùng giả định · *Ban đầu:* `run_1787215085`: không chuyển hướng, bug `TC039` đang mở. Requirements mục 9 ghi "toàn bộ qua HTTPS" nhưng **không** khẳng định có chuyển hướng ép buộc từ HTTP | Viết TC theo **chuẩn bảo mật** (phải chuyển sang HTTPS + có HSTS), đối chiếu với bug report cũ | `TC_039` — `@KnownBug`, gỡ `@NeedsVerify` |
| ASM-08 | ✅ **Đã giải quyết** — `run_1787215085` xác nhận **trùng giả định**. Mã CSRF gửi rỗng có bị chặn như mã bị sửa không (chưa có evidence) | Giả định **bị chặn giống nhau** — cùng trang lỗi `419 Page Expired!` | `TC_025-b` — gỡ `@NeedsVerify` |
| ASM-10 | `REQ-LOGIN-49`, `50` chỉ định tài khoản staff thứ hai `TC014_EMAIL` và ghi *"không dùng Admin"*, nhưng `.env` **chưa có** tài khoản này (`AMB-LOGIN-28`) | **Quyết định user 30-09-2026:** dùng `admin@example.com` làm tài khoản thứ hai. `TC_068` chỉ đăng nhập đúng bằng Admin — không trái ticket dòng 6. `TC_069` gửi **đúng 1** lần sai bằng Admin, kẹp giữa hai lần đăng nhập đúng — **ngoại lệ có chủ ý** với ticket dòng 6, bộ đếm Admin tối đa 1. ⚠️ Tài liệu requirements (AC của REQ-49, 50) vẫn ghi `TC014_EMAIL` — đề nghị cập nhật bằng `/update-requirements-from-ticket` | `TC_068`, `TC_069` |
| ASM-09 | `REQ-LOGIN-08` (phát hành cookie ghi nhớ) không có hệ quả nghiệp vụ nào kiểm được bằng mắt, vì `REQ-LOGIN-40` ghi nhận tính năng tự đăng nhập lại **không hoạt động** (`AMB-LOGIN-15` ⏭️) | Phần chính của `TC_008`/`TC_009` chỉ chấm tới bước đăng nhập thành công; kiểm chứng cookie đặt ở dòng 🔧 và TC gắn `@TechCheck` | `TC_008`, `TC_009` — `@TechCheck` |

> ✅ **Không phát hiện xung đột nào giữa tài liệu và evidence.** Cả 9 ảnh đều xác nhận đúng mô tả trong `REQUIREMENTS_LOGIN_SUMMARY.md`.

---

## Bảng Đối Soát Coverage (57/57 REQ trong phạm vi)

| REQ ID | Mô tả ngắn | Số TC | TC IDs (kèm biến thể) | Đủ Positive/Negative/Boundary? |
|---|---|---|---|---|
| REQ-LOGIN-01 | Truy cập trang đăng nhập | 1 | TC_001 | ✅ |
| REQ-LOGIN-02 | Thành phần biểu mẫu đăng nhập | 10 | TC_002 (6 mục), TC_038, TC_042, TC_043, TC_044, TC_048, TC_049, TC_050, **TC_052**, **TC_053** | ✅ |
| REQ-LOGIN-03 | Tự đặt con trỏ vào ô Email | 1 | TC_002-`2` | ✅ |
| REQ-LOGIN-04 | Logo dẫn về trang chủ | 1 | TC_004 | ✅ |
| REQ-LOGIN-05 | Không có CAPTCHA | 1 | TC_003-`1` | ✅ (kiểm sự vắng mặt) |
| REQ-LOGIN-06 | Đăng nhập bằng thông tin hợp lệ | 5 | TC_005, TC_006, TC_010, TC_041, TC_050 | ✅ |
| REQ-LOGIN-07 | Email không phân biệt hoa thường | 1 | TC_007-`a`,`b` | ✅ |
| REQ-LOGIN-08 | Ghi nhớ đăng nhập sinh cookie ghi nhớ | 1 | TC_008 | ✅ (cặp với TC_009) |
| REQ-LOGIN-09 | Không tích thì không phát hành cookie | 2 | TC_009, **TC_053** | ✅ (nhánh phủ định của REQ-08) |
| REQ-LOGIN-10 | Bỏ trống cả hai trường | 2 | TC_011-`a`,`d`, TC_043-`a` | ✅ |
| REQ-LOGIN-11 | Bỏ trống riêng Email | 1 | TC_011-`b` | ✅ |
| REQ-LOGIN-12 | Bỏ trống riêng Mật khẩu | 1 | TC_011-`c` | ✅ |
| REQ-LOGIN-13 | Chặn email sai định dạng tại trình duyệt | 3 | TC_012-`a`→`e`, TC_045-`a`,`b`, TC_046-`a`→`c` | ✅ (client: TC_012 · máy chủ: TC_045/046) |
| REQ-LOGIN-14 | Thông báo khi sai thông tin đăng nhập | 7 | TC_013, TC_017, TC_018, TC_040, TC_045, TC_047, TC_050 | ✅ — `TC_014` (mật khẩu phân biệt hoa/thường) 🗑️ Deprecated 30-09-2026, không đếm. ⏭️ Khía cạnh *hoa/thường ở mật khẩu* **không còn TC** — quyết định user 30-09-2026, rà lại khi có tài khoản mật khẩu chứa chữ cái |
| REQ-LOGIN-15 | Thông báo không tiết lộ email nào có thật — **chỉ đảm bảo trong 4 lần sai đầu** (🟡 `CRM-LOGIN-101`) | 2 | TC_013 (bước 5), TC_019 (bước 4) | ✅ — mỗi biến thể gửi 1 lần, luôn nằm trong phạm vi 4 lần. Từ lần 5 lộ email là rủi ro đã chấp nhận (`RISK-LOGIN-10`), không kiểm |
| REQ-LOGIN-16 | 🐞 Ô Email phải giữ lại email sau lỗi | 1 | TC_016 | ✅ (TC sẽ FAIL — đúng thiết kế) |
| REQ-LOGIN-17 | Chặn URL nội bộ khi chưa đăng nhập | 1 | TC_021-`a`,`b` | ✅ |
| REQ-LOGIN-18 | Không ghi nhớ URL đích sau chuyển hướng | 1 | TC_022 | ✅ |
| REQ-LOGIN-19 | Đã đăng nhập không vào lại trang đăng nhập | 1 | TC_023-`a`,`c` | ✅ (2 vai trò) |
| REQ-LOGIN-20 | Đã đăng nhập không vào trang Quên mật khẩu | 1 | TC_023-`b`,`d` | ✅ (2 vai trò) |
| REQ-LOGIN-21 | Biểu mẫu mang mã chống CSRF | 1 | TC_024 (🔧 3 mục) | ✅ |
| REQ-LOGIN-22 | Từ chối yêu cầu có mã CSRF sai | 1 | TC_025-`a`,`b` | ✅ |
| REQ-LOGIN-23 | Truy cập trang Quên mật khẩu | 2 | TC_027-`1`,`2`, **TC_057** | ✅ |
| REQ-LOGIN-24 | Không có lối quay lại đăng nhập | 1 | TC_027-`3` | ✅ (kiểm sự vắng mặt) |
| REQ-LOGIN-25 | 🐞 Bỏ trống email phải báo trường bắt buộc | 1 | TC_028 | ✅ (TC sẽ FAIL — đúng thiết kế) |
| REQ-LOGIN-26 | Email không tồn tại ở Quên mật khẩu | 5 | TC_029, TC_030, **TC_055**, **TC_056**, **TC_057** | ✅ — biên bổ sung 21-09-2026 |
| REQ-LOGIN-28 | Liên kết đặt lại mật khẩu sai/hết hạn | 1 | TC_031-`a`,`b` | ✅ |
| REQ-LOGIN-29 | Mỗi viewport có một lối đăng xuất dùng được | 2 | TC_032, TC_033 | ✅ |
| REQ-LOGIN-30 | Cảnh báo khi còn bộ đếm giờ đang chạy | 1 | TC_034 | ✅ — chạy thật đầu-cuối 19-09-2026 |
| REQ-LOGIN-31 | Đăng xuất ngay khi không có bộ đếm giờ | 1 | TC_035 | ✅ (nhánh phủ định của REQ-30) |
| REQ-LOGIN-32 | Kết thúc phiên và về trang đăng nhập | 2 | TC_036-`a`,`b`, **TC_054** | ✅ |
| REQ-LOGIN-33 | URL nội bộ bị chặn sau khi đăng xuất | 2 | TC_036 bước 4–5, **TC_054** (tab thứ hai của cùng phiên) | ✅ |
| REQ-LOGIN-36 | Không có đăng nhập mạng xã hội | 1 | TC_003-`2` | ✅ (kiểm sự vắng mặt) |
| REQ-LOGIN-37 | Trang không nạp tệp JavaScript nào | 1 | TC_003-`3` | ✅ (kiểm sự vắng mặt) |
| REQ-LOGIN-38 | Email bỏ qua khoảng trắng thừa | 1 | TC_007-`c`,`d` | ✅ |
| REQ-LOGIN-39 | Cookie không tự đăng nhập lại sau đăng xuất | 1 | TC_037 | ✅ |
| REQ-LOGIN-41 | Khoá tài khoản sau **5** lần sai mật khẩu liên tiếp cùng email (🟡 **đảo ngược** theo `CRM-LOGIN-101`) | 2 | TC_015 (5 lần → khoá), **TC_058** (4 lần → chưa khoá) | ✅ Positive + Negative + biên 4/5. `TC_015` `@NeedsVerify` — chưa deploy (`AMB-LOGIN-27` ✅) |
| REQ-LOGIN-42 | Phiên hết hạn sau 1 giờ không hoạt động, thao tác thì gia hạn | 2 | TC_026 (AC1 — để yên thì hết phiên), TC_051 (AC2 — thao tác thì gia hạn) | ✅ |
| REQ-LOGIN-43 | Customer không đăng nhập được vào `/admin` | 2 | TC_019, TC_020 | ✅ |
| REQ-LOGIN-44 | Ép truy cập qua HTTPS (chuyển hướng + HSTS) | 1 | TC_039 🐞 — chuyển từ `REQ-LOGIN-01` sang 19-09-2026 | ✅ |
| REQ-LOGIN-45 | ⚪ Thông báo khi đang bị khoá — chuỗi `15 minutes` cố định | 1 | TC_059 | ✅ gửi lại ở +3 và +6 phút · ⏸️ chờ deploy |
| REQ-LOGIN-46 | ⚪ Đang khoá thì mật khẩu đúng cũng bị từ chối | 1 | TC_060 | ✅ gồm mở thẳng trang nội bộ · ⏸️ |
| REQ-LOGIN-47 | ⚪ Tự mở khoá sau 15 phút, thử lại không dời mốc | 1 | TC_061-`a`,`b` | ✅ · ⏸️ · `@Slow` |
| REQ-LOGIN-48 | ⚪ Đăng nhập thành công đặt lại bộ đếm | 1 | TC_062 | ✅ 2 đợt × 4 lần sai |
| REQ-LOGIN-49 | ⚪ Khoá email A không chặn email B | 1 | TC_068 | ✅ · ⏸️ · tài khoản thứ hai = Admin, chỉ đăng nhập đúng (`ASM-10`) |
| REQ-LOGIN-50 | ⚪ Không khoá theo IP | 1 | TC_069 | ✅ 4 lần sai PM + 1 lần sai Admin (`ASM-10`) |
| REQ-LOGIN-51 | ⚪ Khoá đi theo email, không theo phiên trình duyệt | 1 | TC_070 | ✅ · ⏸️ |
| REQ-LOGIN-52 | ⚪ Email không tồn tại không bị khoá — lần 5 báo `Email không tồn tại` | 1 | TC_065 | ✅ lần 1–4 · lần 5 · ⏸️ |
| REQ-LOGIN-53 | ⚪ Email không tồn tại: chờ 1 phút lần 5 → 9 | 2 | TC_066, TC_067 | ✅ chấm qua hệ quả (`AMB-LOGIN-31`) · ⏸️ · `@Slow` |
| REQ-LOGIN-54 | ⚪ Bỏ trống mật khẩu tính là lần sai | 1 | TC_063 | ✅ · ⏸️ |
| REQ-LOGIN-55 | ⚪ Mã CSRF sai tính là lần sai | 1 | TC_071 | ✅ · ⏸️ · `@TechCheck` |
| REQ-LOGIN-56 | ⚪ Bộ đếm tính theo đúng chuỗi email | 1 | TC_072-`a`,`b` | ✅ |
| REQ-LOGIN-57 | ⚪ Hết khoá thì bộ đếm về 0 | 1 | TC_064 | ✅ · ⏸️ · `@Slow` |
| REQ-LOGIN-58 | ⚪ Email không tồn tại: lần 10 chờ 15 phút, rồi lặp vòng | 1 | TC_066 | ✅ · ⏸️ · `@Slow` |
| REQ-LOGIN-59 | ⚪ Email không tồn tại: gửi trong lúc chờ không tính, không kéo dài chờ | 1 | TC_067 | ✅ · ⏸️ · `@Slow` |
| REQ-LOGIN-60 | ⚪ Khoá không chấm dứt phiên đang mở | 1 | TC_074 | ✅ · ⏸️ |
| REQ-LOGIN-61 | ⚪ Khoá gắn tài khoản — mọi cách viết email bị chặn | 1 | TC_073-`a`,`b` | ✅ · ⏸️ |

**Kết luận (30-09-2026, sau BỔ SUNG):** **57/57** REQ trong phạm vi có ≥1 TC. **Không có dòng 🔴.** 17 REQ ⚪ `45` → `61` có TC ở `part_04` — ⏸️ chạy khi tính năng deploy (`AMB-LOGIN-27`). Phép thử 6b cho lượt BỔ SUNG: 14/16 TC mới mang đúng 1 REQ · `TC_066` (REQ-53, 58) và `TC_067` (REQ-53, 59) mỗi TC có đúng **1** REQ chỉ dựa vào nó (58 / 59), REQ-53 có 2 TC chống lưng → hợp lệ. Script 6b chỉ báo lại 4 TC cũ đã có quyết định giữ nguyên ở mục ngay dưới.<br>*Kết luận sau DELTA `CRM-LOGIN-101`:* 40/57 REQ trong phạm vi có ≥1 TC — cả 40 REQ đã có TC trước đó vẫn đủ, 17 REQ ⚪ mới chờ BỔ SUNG. Phép thử 6b cho phần vừa sửa: `TC_015`, `TC_058` mỗi TC 1 REQ · `TC_013` (REQ-14, 15) — cả hai REQ đều có TC khác chống lưng → không vi phạm.<br>*Kết luận 21-09-2026:* 40/40 REQ trong phạm vi có ≥1 TC. **Không có dòng 🔴.** Lượt rà 21-09-2026 **không phát hiện REQ nào thiếu TC** — sáu TC bổ sung (`TC_052`→`TC_057`) lấp lỗ hở ở tầng **mục của bảng Field-Level và nhánh 4 vòng**, thứ mà bảng coverage đếm-theo-REQ không bắt được.<br>**Phép thử chiều ngược (6b) đã chạy:** không TC nào trong `TC_052`→`TC_057` là TC **duy nhất** của từ hai REQ trở lên — `TC_053` (REQ-02, REQ-09), `TC_054` (REQ-32, REQ-33) và `TC_057` (REQ-26, REQ-23) đều có TC khác chống lưng cho mọi REQ chúng chạm.** Tổng số **case** kiểm không đổi so với bản trước lần cập nhật ngôn ngữ — chỉ đổi cách phát biểu kỳ vọng.

### ⚠️ Phát hiện 21-09-2026 — 9 REQ chưa có TC **chuyên trách** (Gate #6b)

Phép thử chiều ngược phát hiện **4 TC cũ** mà trong đó có từ 2 REQ trở lên **không còn TC nào khác** chống lưng:

| TC | REQ nằm trong TC | REQ chỉ có mỗi TC này |
|---|---|---|
| `TC_003` | REQ-05, 36, 37 | **cả 3** — REQ-05 (không CAPTCHA) · REQ-36 (không đăng nhập mạng xã hội) · REQ-37 (không nạp JavaScript) |
| `TC_007` | REQ-07, 38 | **cả 2** — REQ-07 (không phân biệt hoa thường) · REQ-38 (bỏ qua khoảng trắng) |
| `TC_011` | REQ-10, 11, 12 | REQ-11 (bỏ trống riêng Email) · REQ-12 (bỏ trống riêng Mật khẩu) |
| `TC_023` | REQ-19, 20 | **cả 2** — REQ-19 (đã đăng nhập, mở trang Đăng nhập) · REQ-20 (đã đăng nhập, mở Quên mật khẩu) |

**Quyết định: GIỮ NGUYÊN, không tách.** Căn cứ:

- Tác hại mà Gate #6b sinh ra để chống là *"FAIL không biết REQ nào hỏng"*. Ở bộ TC này tác hại đó **đã được khử sẵn**: cả 4 TC đều theo Bảng kiểm / Bảng biến thể có **mã riêng cho từng mục** và **ghi kèm REQ ngay tại dòng đó** (`` `2` (REQ-36) … ``). Báo cáo `TC_003-2 FAIL` quy về **đúng một** REQ, không mơ hồ
- Tách sẽ phải **sửa 4 TC nằm trong nhóm `001`→`051`** — nhóm đang được 2 execution report và 6 bug report tham chiếu, và là nhóm user yêu cầu giữ nguyên ở lượt rà 21-09-2026
- Chi phí: ~9 TC mới cho phần lợi ích chẩn đoán gần như bằng không

**Điều kiện rà lại:** nếu một trong 4 TC trên bị chuyển sang độ hạt TÁCH, bị bỏ mã biến thể, hoặc REQ liên quan được nâng mức rủi ro — thì tách ngay, TC mới cấp số nối tiếp dải.

**Bắt buộc khi chạy:** báo cáo FAIL của `TC_003`, `TC_007`, `TC_011`, `TC_023` **phải ghi kèm mã mục/biến thể**. Ghi trống mã là lúc vi phạm này trở thành thật.

### REQ cố ý KHÔNG có TC (ngoài phạm vi theo quyết định PO 18-08-2026)

| REQ ID | Lý do | Ambiguity |
|---|---|---|
| REQ-LOGIN-27 | Không kiểm chứng luồng gửi mail đặt lại với email có thật | `AMB-LOGIN-04` ⏭️ |
| REQ-LOGIN-34 | Cookie ghi nhớ không bị xoá khi đăng xuất — chỉ ghi nhận hiện trạng | `AMB-LOGIN-06` ⏭️ |
| REQ-LOGIN-35 | Cookie ghi nhớ thiếu cờ `HttpOnly` — chỉ ghi nhận hiện trạng cho `RISK-LOGIN-02` | `AMB-LOGIN-07` ⏭️ |
| REQ-LOGIN-40 | Ghi nhớ đăng nhập khi phiên hết hạn tự nhiên — PO xác nhận tính năng **không hoạt động** | `AMB-LOGIN-15` ⏭️ |

---

## Bảng Đối Soát Evidence

| Ảnh evidence | Màn hình / trạng thái | TC dựa vào | Đầy đủ? |
|---|---|---|---|
| `login_form_default_fullpage.png` | Đăng nhập — mặc định, hai ô rỗng | TC_001, TC_002, TC_003, TC_004, TC_027, TC_038 | ✅ full-page, thấy trọn khối biểu mẫu tới liên kết `Forgot Password?` |
| `login_form_filled_remember_checked_fullpage.png` | Đăng nhập — đã nhập đủ, **Remember me đang tích** | TC_002-`6`, TC_008, TC_024 | ✅ full-page, thấy rõ dấu tích ✔ trên ô tích |
| `login_form_empty_submit_error_fullpage.png` | Đăng nhập — gửi biểu mẫu rỗng, 2 dải báo lỗi | TC_011-`a`,`b`,`c` · chuỗi `The Password field is required.` dùng ở TC_063 | ✅ full-page, xác nhận **thứ tự** dải: `The Password field is required.` **trên**, `The Email Address field is required.` **dưới** |
| `login_form_wrong_credentials_fullpage.png` | Đăng nhập — sai thông tin, dải `Invalid email or password` | TC_013, TC_016, TC_017, TC_019 · chuỗi `Invalid email or password` dùng ở TC_058, TC_062, TC_065, TC_069, TC_072 | ✅ full-page. ⚠️ Ô Email nền xanh nhạt = **trình duyệt tự điền**, KHÔNG phải hệ thống trả về — đây chính là bẫy mà TC_016 phải tránh bằng cửa sổ ẩn danh |
| `login_csrf_invalid_403_fullpage.png` | Đăng nhập — mã CSRF bị sửa, trang lỗi | TC_025-`a`, TC_010, TC_071 | ✅ full-page, xác nhận nguyên văn `419 Page Expired!` và `Sorry, the page has expired, return to previous page and refresh to continue.` |
| `login_success_dashboard_viewport.png` | Dashboard — ngay sau khi đăng nhập, menu ảnh đại diện đóng | TC_005, TC_006, TC_022, TC_023 | ✅ viewport (cố ý — tránh chụp dữ liệu khách hàng thật). Đếm được **14** mục menu trái của Admin, đối chiếu 9 mục của PM ở TC_006 |
| `logout_menu_open_viewport.png` | Dashboard — menu ảnh đại diện **đang mở** | TC_032 · lối `Logout` dùng ở TC_062, TC_069, TC_072 | ✅ viewport, xác nhận 5 mục theo thứ tự `My Profile` → `My Timesheets` → `Edit Profile` → `Language ▸` → `Logout`, và thanh đầu trang **không** có lối Logout thứ hai |
| `forgot_password_form_default_fullpage.png` | Quên mật khẩu — mặc định | TC_027, TC_030 | ✅ full-page, xác nhận đúng 1 ô `Email Address` + nút `Confirm`, không liên kết quay lại đăng nhập |
| `forgot_password_empty_submit_error_fullpage.png` | Quên mật khẩu — gửi khi bỏ trống, dải `Email not found` | TC_028, TC_029 | ✅ full-page, xác nhận **hiện trạng lỗi** mà TC_028 sẽ bắt được |
| `login_form_375x700_fullpage.png` | Đăng nhập — màn hình điện thoại `375×700` | TC_049-`e` | ✅ full-page, xác nhận không cuộn ngang, đủ 7 thành phần, khung rộng 311 px. **Chụp 11-09-2026** |

### Vùng chưa có evidence — TC / biến thể gắn `@NeedsVerify`

| Vùng / trạng thái | TC · biến thể | Đề xuất recon bổ sung |
|---|---|---|
| Biểu mẫu Đăng nhập — **đã tích** `Remember me` rồi gửi thất bại | `TC_053`-`a`,`b` | Chụp lại trạng thái ô tích **sau** khi trang nạp lại. Hai ảnh hiện có đều chụp lượt gửi **không tích trước**, nên không trả lời được câu hỏi của TC |
| Biểu mẫu **Quên mật khẩu** — ô Email ở mốc 64 / 65 / 100 ký tự | `TC_056`-`a`,`b` · `TC_057`-`a`,`b` | Đo mốc độ dài **trên chính biểu mẫu này**. Mốc 64 ký tự hiện chỉ đo ở trang Đăng nhập (`TC_045`/`TC_046`); mục 4.2 requirements cho thấy hai biểu mẫu **không** cùng bộ ràng buộc |
| Trang đăng nhập — tài khoản **đang bị khoá** (thông báo `Your account is locked…`) và email không tồn tại từ lần 5 (`Email không tồn tại`) | `TC_015` · `TC_059`, `TC_060`, `TC_061`, `TC_063`, `TC_064`, `TC_065`, `TC_066`, `TC_067`, `TC_068`, `TC_070`, `TC_071`, `TC_073`, `TC_074` | Tính năng **chưa deploy** (`AMB-LOGIN-27` ✅) nên chưa chụp được. Khi deploy: chụp trang sau lần sai thứ 5 (khung hiển thị + nguyên văn thông báo khoá), rồi cập nhật `REQ-LOGIN-41`, `45` bằng `/update-requirements-from-ticket` |
| *(đã giải quyết)* | — | `TC_024` mục 🔧`2` đã đo 19-09-2026 — xem `ASM-05` |

> ✅ **Đã giải quyết** (gỡ `@NeedsVerify` ngày 19-09-2026 theo `/review-testcases`): `TC_011-d`, `TC_025-b`, `TC_031-b`, `TC_033`, `TC_039`, `TC_040`, `TC_041` — bằng chứng ở `run_1787215085` · `TC_014`, `TC_034`, `TC_049-a/c/d`, `TC_050` — bằng chứng ở `run_1789759574`.

---

## Đối soát cột Automation

> Mục này bổ sung 21-09-2026 — trước đó index **chưa có**, dù cột `Automation` đã được chấm cho mọi TC (tiêu chí 5 của Self-Quality Gate).

| Giá trị | Số TC | Ý nghĩa |
|---|---|---|
| `Yes` | 49 | Tự động hoá được trọn vẹn bằng Playwright/Selenium ở tầng UI — 30-09-2026: `TC_015` rời nhóm, `TC_058` vào nhóm · BỔ SUNG thêm `TC_062`, `TC_065`, `TC_069`, `TC_072` · `TC_014` 🗑️ Deprecated 30-09-2026 — không đếm |
| `Partial` | 21 | Phần chính tự động được; **một phần phải làm tay hoặc cần điều kiện đặc biệt** |
| `No` | 3 | Không làm automation |

### TC `Partial` — điều kiện kèm theo

| TC | Phần tự động được | Phần vướng |
|---|---|---|
| `TC_008`, `TC_009`, `TC_024`, `TC_037` | Toàn bộ thao tác UI | Dòng 🔧 đọc/đối chiếu cookie và mã chống CSRF — làm được bằng API context của Playwright, nhưng phải viết riêng, không nằm trong luồng thao tác UI |
| `TC_010` | Điền biểu mẫu, chấm kết quả | Bấm **hai lần trong dưới 1 giây** — phụ thuộc thời điểm, dễ flaky; cần gửi hai request song song thay vì mô phỏng hai cú bấm |
| `TC_040` | Điền biểu mẫu, chấm kết quả | **Ngắt mạng thật** — thay bằng chặn route ở tầng trình duyệt thì không còn đúng kịch bản gốc |
| `TC_041` | Điền biểu mẫu, chấm kết quả | **Giả lập mạng chậm** — cần CDP throttling, chỉ Chromium hỗ trợ |
| `TC_055` *(mới 21-09-2026)* | Điền email, chấm dải báo lỗi | Cùng lý do `TC_010` — bấm `Confirm` hai lần liên tiếp phụ thuộc thời điểm |
| `TC_015` *(`CRM-LOGIN-101`, 30-09-2026)* | Toàn bộ thao tác và kết quả | **Khoá tài khoản PM dùng chung 15 phút** — script phải chạy riêng, tuần tự, cuối đợt, không song song với test nào dùng PM (`AMB-LOGIN-28` ✅) |
| `TC_059`, `TC_060`, `TC_063`, `TC_070`, `TC_071`, `TC_073`, `TC_074` *(BỔ SUNG 30-09-2026)* | Toàn bộ thao tác và kết quả | Trục 2 · **khoá tài khoản PM dùng chung** — cùng điều kiện `TC_015` (điều kiện #4). `TC_071` sửa mã CSRF bằng script được, không cần người |
| `TC_061`, `TC_064` *(BỔ SUNG)* | Toàn bộ thao tác và kết quả | Khoá PM **và** chờ **16 phút thời gian thật phía máy chủ** — `page.clock` không tua được. Điều kiện #4 + #6 |
| `TC_066`, `TC_067` *(BỔ SUNG)* | Toàn bộ thao tác và kết quả | Chờ **24–31 phút thời gian thật phía máy chủ** (nhịp 1 phút + mức 15 phút). Không khoá PM. Điều kiện #6 |
| `TC_068` *(BỔ SUNG)* | Toàn bộ thao tác và kết quả | Khoá PM — điều kiện #4. Tài khoản thứ hai là Admin (`ASM-10`) |

### TC `No` — lý do

| TC | Lý do |
|---|---|
| `TC_026`, `TC_051` | Chạy **65–70 phút** chờ phiên hết hạn / gia hạn. Giữ một phiên automation sống suốt thời gian đó là lãng phí và rất dễ đứt vì lý do ngoài phạm vi test. `@PersonalOnly` — **QA tự chạy và tự theo dõi** |
| `TC_044` | Kiểm **hộp thoại lưu mật khẩu của chính trình duyệt** — nằm ngoài trang web, automation không chạm tới được |

### ⏸️ Hoãn

| TC | Hoãn tới khi | Lý do |
|---|---|---|
| `TC_015` | `AMB-LOGIN-27` xác nhận **đã deploy** | Tính năng khoá chưa có trên hệ thống — viết script bây giờ là viết theo kỳ vọng chưa đo. Cột `Automation` giữ `Partial`, không hạ |
| `TC_059`, `TC_060`, `TC_061`, `TC_063`, `TC_064`, `TC_065`, `TC_066`, `TC_067`, `TC_068`, `TC_070`, `TC_071`, `TC_073`, `TC_074` *(BỔ SUNG 30-09-2026 — 13 TC `@NeedsVerify`)* | `AMB-LOGIN-27` xác nhận **đã deploy** + recon chụp màn hình khoá | Cùng lý do `TC_015`. `TC_065` là `Yes · ⏸️ Hoãn` — cột giữ `Yes` |

### Điều kiện cần chuẩn bị để nâng `Partial` → `Yes`

1. **Bộ trợ giúp đọc cookie / token** dùng chung cho `TC_008`, `TC_009`, `TC_024`, `TC_037` — viết một lần, dùng lại cho cả bốn
2. **Bộ gửi request song song** cho `TC_010`, `TC_055` — thay hai cú bấm bằng hai request cùng lúc, khử hẳn phụ thuộc thời điểm
3. **Chốt chạy trên Chromium** cho `TC_041` (throttling) và `TC_040` (chặn mạng ở tầng context)
4. **Tài khoản PM riêng cho automation** cho `TC_015`, `TC_059`–`TC_061`, `TC_063`, `TC_064`, `TC_068`, `TC_070`, `TC_071`, `TC_073`, `TC_074` — không dùng chung với người chạy tay, khoá tài khoản không chặn cả đội
5. ~~Tài khoản staff có mật khẩu chứa chữ cái cho `TC_014`~~ — **không còn cần**: `TC_014` 🗑️ Deprecated 30-09-2026 theo quyết định user. Admin **không** thay được: mật khẩu Admin chỉ gồm chữ số, không đảo hoa/thường được (`RISK-LOGIN-07`). `TC_068`, `TC_069` đã chuyển sang Admin (`ASM-10`)
6. **Thời hạn khoá / chờ rút ngắn trên môi trường test** (VD 15 phút → 1 phút, 1 phút → 5 giây) cho `TC_061`, `TC_064`, `TC_066`, `TC_067` — ⏳ cần Dev cấu hình. Không có thì automation vẫn chạy được nhưng mỗi lượt mất 17–31 phút

> Sáu TC mới `TC_052`→`TC_057`: năm TC `Yes` (thao tác UI thuần), một TC `Partial` (`TC_055`). Ba TC mang `@NeedsVerify` (`TC_053`, `TC_056`, `TC_057`) — **chạy tay trước để chốt kỳ vọng thật**, rồi mới đưa vào automation; viết script theo kỳ vọng chưa đo là cách nhanh nhất để có một test xanh khẳng định điều sai.

---

## Đối soát loại kiểm thử (4 vòng)

> Bảng này bổ sung ngày 11-09-2026 theo **Bản Đồ Loại Kiểm Thử — 4 Vòng** của skill `skills-rbt-manual-testing`. Nó trả lời câu hỏi mà **Bảng Đối Soát Coverage không trả lời được**: coverage đếm theo REQ, nên bộ TC có thể phủ 39/39 REQ mà vẫn thiếu hẳn một *loại* kiểm thử.
>
> Đúng như vậy: lần chấm đầu tiên phát hiện **6 nhánh trống hoặc nông** trong khi coverage vẫn xanh toàn bộ. Chín TC `TC_042`→`TC_050` sinh ra để lấp đúng các nhánh đó.

| Vòng | Nhánh | Trạng thái | TC ID / Lý do |
|---|---|---|---|
| 1 | UI cơ bản | ✅ | TC_002, TC_003 (2 TC · 9 mục bảng kiểm) |
| 1 | Open form | ✅ | TC_001, TC_027 (2 TC) |
| 1 | Display | ✅ | TC_002-`2`, TC_005, TC_006 — module không hiển thị dữ liệu nghiệp vụ nên không có định dạng tiền/ngày/badge để kiểm |
| 1 | Input valid data | ✅ | TC_005, TC_006 (2 TC · 2 vai trò) |
| 1 | Save | ✅ | TC_005 — "lưu" của module này là **tạo phiên đăng nhập** |
| 1 | Verify data | ✅ | TC_005, TC_006, TC_008, TC_009 (4 TC — phiên và cookie ghi nhớ giữ đúng) |
| 2 | **UI Behavior** | ✅ **bổ sung 11-09-2026** | TC_042, TC_043, TC_044 (3 TC · 3 biến thể) — *trước đó nhánh này TRỐNG* |
| 2 | Required | ✅ | TC_011 (1 TC · 4 biến thể) |
| 2 | Validation | ✅ **mở rộng 21-09-2026** | TC_007, TC_012, TC_017, TC_018, TC_045, TC_046, TC_047, TC_048, **TC_052**, **TC_053**, **TC_056**, **TC_057** (12 TC · 29 biến thể)<br>• **Ô Email — biểu mẫu Đăng nhập: đủ 8/8 mục áp dụng** — mục *"email đã tồn tại"* không áp dụng: màn đăng nhập không tạo tài khoản<br>• **Ô Email — biểu mẫu Quên mật khẩu: đủ 6/6 mục áp dụng** *(bổ sung 21-09-2026)* — sai định dạng `TC_030` · độ dài biên `TC_056`/`TC_057` · không tồn tại `TC_029` · bỏ trống `TC_028` 🐞. Hai mục không áp dụng: *email đã tồn tại* (không tạo tài khoản) và *phân biệt hoa thường* (chỉ có nghĩa khi đăng nhập được, form này không tạo phiên).<br>  ⚠️ **Trước 21-09-2026 biểu mẫu này chỉ có 1 biến thể** (`abc` ở `TC_030`) mà dòng đối soát vẫn ghi "đủ 8/8" — vì mọi dẫn chứng đều lấy từ biểu mẫu Đăng nhập. Hai biểu mẫu có ô Email **riêng, ràng buộc khác nhau** (mục 4.2 requirements), phải đối soát **tách bạch**<br>• ⏭️ **30-09-2026:** `TC_014` (mật khẩu phân biệt hoa/thường) 🗑️ Deprecated — **cố ý bỏ**, quyết định user; lý do: mọi tài khoản sẵn có đều có mật khẩu toàn chữ số, không có tài khoản nào để đảo hoa/thường. Rà lại khi có tài khoản mật khẩu chứa chữ cái<br>• **Ô Password: đủ 4/4 mục áp dụng** — 3 mục không áp dụng, có lý do: *nút hiện/ẩn* không tồn tại (TC_042 xác nhận) · *ô xác nhận mật khẩu* không có trên màn này · *rule độ mạnh* (độ dài tối thiểu, ký tự đặc biệt, chữ hoa, chữ số) thuộc màn **Đăng ký / Đổi mật khẩu**, màn Đăng nhập chỉ xác thực chứ không áp rule<br>• **Ô tích `Remember me` (loại Checkbox): đủ 3/3 mục áp dụng** *(bổ sung 21-09-2026)* — trạng thái mặc định `TC_002-3` · bật/tắt `TC_052` · giữ trạng thái sau khi gửi lỗi `TC_053`. Hai mục không áp dụng: *required validation* (ô này tuỳ chọn) và *nhóm radio* (không có nhóm).<br>  ⚠️ **Trước 21-09-2026 loại field này KHÔNG có dòng đối soát nào**, dù mục 4.1 requirements liệt kê đây là field thứ ba của biểu mẫu. Bộ TC cũ chỉ kiểm chiều **tích vào**, chưa bao giờ kiểm chiều **bỏ tích ra** |
| 2 | Equivalence Partitioning | ✅ | TC_012, TC_013, TC_045, TC_046, **TC_065** (email có thật vs không tồn tại từ lần 5), **TC_072** (cách viết email) |
| 2 | **Boundary Value Analysis** | ✅ **mở rộng 21-09-2026** | TC_045, TC_046, TC_047, TC_048 (biểu mẫu Đăng nhập) + **TC_056**, **TC_057** (biểu mẫu Quên mật khẩu) + **TC_058** (biên 4/5 lần sai của `REQ-LOGIN-41`, một bộ dữ liệu — thêm 30-09-2026) — 7 TC · 12 biến thể. Mốc 64 ký tự (RFC 5321) đo trên trang đăng nhập ngày 11-09-2026; **trang Quên mật khẩu chưa đo** → `TC_056`/`TC_057` mang `@NeedsVerify` |
| 2 | Business Rule | ✅ | TC_013, TC_015, TC_019, **TC_059**, **TC_062**, **TC_063**, **TC_065** (7 TC) — 30-09-2026: `TC_015` nay kiểm quy tắc **khoá** thay vì **không khoá**; BỔ SUNG thêm chuỗi thông báo khoá cố định, đặt lại bộ đếm, bỏ trống tính là lần sai, email không tồn tại không bị khoá (`CRM-LOGIN-101`) |
| 2 | Decision Table | ✅ **từ 30-09-2026** | Bảng quyết định 7 rule ở đầu Nhóm M (`part_04`) — *email có tài khoản* × *bộ đếm trước lần bấm* × *mật khẩu lần này đúng* → 4 kết quả. Mỗi rule có TC: R1 `TC_058`, `062` · R2 `TC_013`, `058` · R3 `TC_015` · R4 `TC_060`, `070`, `073` · R5 `TC_059` · R6–R7 `TC_065`, `066`, `067`. Điều kiện phụ *loại lần sai* `TC_063`, `071` · *cách viết email* `TC_072`, `073`. *Trước 30-09-2026:* ➖ không có tổ hợp từ 3 điều kiện |
| 2 | State Transition | ✅ **từ 30-09-2026** | Hai bảng chuyển trạng thái ở đầu Nhóm M (`part_04`). **Tài khoản có thật** (chưa đăng nhập · đã đăng nhập · bị khoá): chuyển hợp lệ `TC_015`, `058`, `059`, `061`, `062`, `063`, `064`, `071`, `074` · chuyển **bị chặn** (bị khoá → đăng nhập bằng mật khẩu đúng) `TC_060`, `070`, `073`. **Email không tồn tại** (tự do · chờ 1 phút · chờ 15 phút): `TC_065`, `066`, `067`. 15 TC · 4 biến thể. *Trước 30-09-2026:* ➖ chỉ có 2 trạng thái |
| 2 | Dependency | ✅ | TC_034 (bộ đếm giờ đang chạy chặn đăng xuất thẳng — chạy thật 19-09-2026), TC_037 (cookie ghi nhớ sau khi đăng xuất) |
| 2 | Use Case / Scenario | ✅ | Chuỗi TC_005 → TC_036 (đăng nhập → dùng → đăng xuất) |
| 2 | Save / Edit / Delete | ➖ | Module xác thực không có bản ghi nghiệp vụ để tạo/sửa/xoá |
| 2 | Error Guessing | ✅ **mở rộng 21-09-2026** | TC_010, TC_016, TC_018, TC_036, TC_040, **TC_054**, **TC_055** (7 TC)<br>Đối soát theo danh mục của skill: bấm gửi hai lần liên tiếp `TC_010` (Đăng nhập) + **`TC_055`** (Quên mật khẩu) · dán dữ liệu lạ `TC_017`/`TC_018` · bấm Back sau khi lưu `TC_036` bước 5 · **mở 2 tab cùng lúc `TC_054`** *(trước 21-09-2026 mục này TRỐNG)* · nạp lại trang giữa chừng ➖ — biểu mẫu chỉ có 2 ô, nạp lại là trở về trạng thái rỗng, không có dữ liệu dở dang nào để mất |
| 3 | Permission | ✅ | TC_006, TC_019, TC_020, TC_021, TC_022, TC_023 (6 TC · 3 vai trò Admin/PM/Khách hàng × truy cập URL trực tiếp) |
| 3 | Security | ✅ | TC_015, TC_017, TC_024, TC_025, TC_026, TC_036, TC_037, TC_039, TC_047, TC_051, **TC_054**, **TC_058**, **TC_068** → **TC_074** (19 TC) — `TC_051` bổ sung 19-09-2026 · `TC_054` (phiên đa tab) bổ sung 21-09-2026 · `TC_015` đưa vào, `TC_058` thêm mới 30-09-2026 (chống dò mật khẩu một tài khoản) · BỔ SUNG `TC_068`→`TC_074`: khoá không lan sang tài khoản khác, không khoá theo IP, không thoát khoá bằng phiên mới / cách viết email khác, CSRF sai tính lần sai, phiên đang mở không bị đá ra |
| 3 | API | ➖ | QA **không có quyền** gọi API — **đội Dev xác minh**. Chốt với PO ngày 11-09-2026 |
| 3 | Database | ➖ | QA **không có quyền** truy cập cơ sở dữ liệu — **đội Dev xác minh**. Chốt với PO ngày 11-09-2026 |
| 3 | Integration | ➖ | QA không có quyền kiểm tầng tích hợp — **đội Dev xác minh**. TC_003 đã xác nhận trang đăng nhập **không** dùng đăng nhập bên thứ ba nào, nên bề mặt tích hợp của module này bằng không |
| 3 | Logging / Audit | ➖ | **Tài khoản demo bị chặn quyền.** Đo ngày 11-09-2026: mở `Utilities → Activity Log` trả về trang **Từ chối truy cập**. Cần tài khoản Super Admin để kiểm đăng nhập thành công/thất bại có được ghi vết không — **đề nghị PO hoặc đội Dev cấp**, rà lại ở đợt sau |
| 4 | Compatibility | ✅ **bổ sung 11-09-2026** | TC_050 (1 TC · 3 trình duyệt) — *trước đó nhánh này TRỐNG*. Danh sách **đã chốt 19-09-2026**: Chrome, Edge, Firefox |
| 4 | Responsive / UI Stability | ✅ **bổ sung 11-09-2026** | TC_049 (1 TC · 5 kích thước), TC_033 — *trước đó chỉ có TC_033 cho màn hình hẹp, không có TC nào cho chính trang đăng nhập* |
| 4 | Accessibility | ✅ | TC_038 (điều hướng bàn phím đầy đủ, viền tiêu điểm). Rà WCAG đầy đủ cần công cụ chuyên dụng → ngoài phạm vi, **đội Dev / chuyên gia a11y** |
| 4 | Performance | ✅ mức thô | TC_041 (đường truyền chậm). Đo tải thật và ngưỡng thời gian phản hồi ➖ — **đội Hạ tầng**, chưa có công cụ tải |
| 4 | Regression | ➖ | Module có **5 bug đang mở**, **chưa bug nào được fix** (`BUG_login_1787226515_TC018` đóng 19-09-2026 vì *không phải lỗi*, không phải fix) nên chưa có lỗi cũ để chống tái phát. Rà lại nhánh này ngay khi bug đầu tiên được fix — nguồn: `docs/bugs/login/` |
| 4 | E2E | ➖ | Module xác thực nằm trọn trong một màn hình. Luồng xuyên module thuộc phạm vi `/generate-cross-module-test-plan` |

**Tổng: 74 TC · 73 biến thể** — đếm lại bằng script ngày 30-09-2026 sau BỔ SUNG (+16 TC · +6 biến thể: `TC_061`, `TC_072`, `TC_073` mỗi TC 2 biến thể).<br>*Sau DELTA `CRM-LOGIN-101`:* 58 TC · 67 biến thể. Giảm 2 biến thể **không phải rụng case**: `TC_015` bỏ Bảng biến thể — `a` viết lại thành một bộ dữ liệu theo kỳ vọng mới, `b` (không khoá theo IP) chuyển sang `REQ-LOGIN-50` cho lượt BỔ SUNG · `TC_058` không có Bảng biến thể.<br>*21-09-2026:* 57 TC · 69 biến thể.

### Cách đếm "biến thể" (chốt 21-09-2026)

Một **biến thể** = một ca được chạy và chấm **riêng** bên trong một TC, báo cáo được dưới dạng `CRM_LOGIN_TC_012-c FAIL`. Gồm đúng hai dạng:

| Dạng | Ký hiệu | Ở đâu | Số lượng |
|---|---|---|---|
| Bảng biến thể (Gộp Kiểu A) | `a` `b` `c` … | cột `Test Data` | **61** |
| Bảng kiểm (Gộp Kiểu B) | `1` `2` `3` … | cột `Expected Result` — `TC_002` (6) · `TC_003` (3) · `TC_027` (3) | **12** |

**KHÔNG** tính vào con số này: đánh số mục trong dòng `🔧 Ghi chú kỹ thuật` (`TC_024` có 3 mục) · số hiển thị trên giao diện (`TC_034` huy hiệu `1`) · dữ liệu dạng *"ký tự `a` lặp 300 lần"* (`TC_048`) · câu văn nhắc tới biến thể **đã bị bỏ** (`TC_018`).

> ⚠️ **Sửa sai số ngày 21-09-2026.** Con số cũ ghi `69 biến thể` cho 51 TC là **sai** — đếm lại đúng luật trên cho ra **61**. Sai số đến từ việc đếm nhầm 4 nhóm ký hiệu kể trên. Lần bổ sung 21-09-2026 thêm **8** biến thể thật (`TC_052`, `TC_053`, `TC_056`, `TC_057` mỗi TC 2 biến thể; `TC_054`, `TC_055` không có), nên tổng đúng hiện nay là **61 + 8 = 69**.
>
> 📌 Con số này **phải đếm bằng script**, không đếm tay — đó chính là lý do nó sai suốt từ 11-09-2026. Lệnh đếm lưu ở cuối mục này.

```bash
# Đếm lại biến thể — chạy từ gốc project
python -c "
import re,io
import glob
rows=[l for f in glob.glob('docs/testcases/login/web/parts/*.md') for l in io.open(f,encoding='utf-8') if l.startswith('| CRM_LOGIN_TC_')]
skip={'CRM_LOGIN_TC_018','CRM_LOGIN_TC_048'}          # nhac toi bien the da bo / du lieu 'a lap 300 lan'
kieuB={'CRM_LOGIN_TC_002','CRM_LOGIN_TC_003','CRM_LOGIN_TC_027'}  # chi 3 TC nay dung Bang kiem
a=b=0
for l in rows:
    t=l.split(' | ')[0][2:].strip()
    if t not in skip: a+=len(set(re.findall(r'\`([a-f])\`',l)))
    if t in kieuB:    b+=len(set(re.findall(r'\`([1-9])\`',l)))
print('bien the chu cai:',a,'| muc bang kiem:',b,'| TONG:',a+b)
"
```

---

## Rà soát đặc tính chất lượng (ISO/IEC 25010:2023)

| Đặc tính | Trạng thái | TC ID / Lý do |
|---|---|---|
| Functional Suitability | ✅ Có TC | TC_001 → TC_048, TC_052 → TC_074 — phần thân của bộ TC |
| Performance Efficiency | ✅ một phần | TC_041 (đường truyền chậm). Đo tải và ngưỡng thời gian phản hồi ➖ — **đội Hạ tầng**, đợt sau |
| Compatibility | ✅ Có TC | TC_049 (5 kích thước màn hình), TC_050 (3 trình duyệt — Chrome, Edge, Firefox, đã chốt 19-09-2026) |
| Interaction Capability | ✅ Có TC | TC_011, TC_013 (thông báo lỗi dễ hiểu, không tiết lộ thừa), TC_038 (bàn phím), TC_042, TC_043, TC_044 (hành vi ô nhập và nút), **TC_052**, **TC_053** (ô tích bật/tắt được và giữ trạng thái ra sao) |
| Reliability | ✅ Có TC | TC_026 (hết hạn phiên), TC_051 (gia hạn phiên), TC_040 (mất mạng giữa chừng), TC_047 (dữ liệu bất thường không làm sập), **TC_054** (phiên nhất quán giữa nhiều tab), **TC_055** (gửi trùng không sinh trang lỗi) |
| Security | ✅ Có TC | TC_015, TC_017, TC_019 → TC_025, TC_036, TC_037, TC_039, **TC_054**, **TC_058** — phân quyền 3 vai trò, chống CSRF, vòng đời phiên (gồm phiên mở trên nhiều tab), khoá tài khoản chống dò mật khẩu và các lối lách khoá (`CRM-LOGIN-101` — TC_015, TC_058 → TC_074). Pentest và quét lỗ hổng ➖ — **đội bảo mật / đối tác đánh giá độc lập** |
| Maintainability | ➖ Không áp dụng | Đặc tính của mã nguồn, không kiểm được bằng manual TC — **đội Dev**, qua code review và phân tích tĩnh |
| Flexibility | ✅ một phần | TC_049 (bố cục đáp ứng trên 5 kích thước). Đổi ngôn ngữ ➖ — mục `Language` nằm **sau** khi đăng nhập (thấy ở TC_032), thuộc module Hồ sơ người dùng chứ không thuộc module này |
| Safety | ➖ Không áp dụng | Ứng dụng nghiệp vụ; lỗi ở màn đăng nhập không gây thiệt hại vật lý hay tổn hại sức khoẻ |

---

## Bộ chạy đề xuất

| Bộ | TC | Số lượng | Thời gian ước tính |
|---|---|---|---|
| **Smoke** (`@Smoke`) | TC_001, TC_002, TC_005, TC_011-`a`, TC_013-`a`, TC_021-`a`, TC_032, TC_035, TC_036-`a` | 9 | ~12 phút |
| **Regression đầy đủ** | Toàn bộ trừ `@Slow` của `TC_026`/`TC_051` và trừ bộ **Khoá tài khoản** dưới · không tính `TC_014` `@Deprecated` | 54 | ~4 giờ 05 phút |
| **Khoá tài khoản — chạy cuối đợt, tuần tự** | TC_015 + toàn bộ Nhóm M `TC_059` → `TC_074` — ⏸️ chỉ chạy **sau khi deploy** (`AMB-LOGIN-27`). 11 TC khoá PM 15 phút: chạy nối tiếp, TC sau chờ khoá của TC trước hết hạn; báo đội trước. `TC_065`, `066`, `067` (email không tồn tại) chạy song song được | 17 | ~4 giờ nếu chạy tay tuần tự |
| **QA tự chạy — KHÔNG qua `/execute-test-cases`, KHÔNG automation** (`@Slow` + `@PersonalOnly`) | TC_026, TC_051 | 2 | ~65 + ~70 phút — chạy song song được nếu mở 2 cửa sổ trình duyệt riêng |
| **Cần DevTools** (`@TechCheck`) — phần 🔧 của các TC dưới đây | TC_001, TC_002, TC_003, TC_005, TC_006, TC_008, TC_009, TC_012, TC_016, TC_017, TC_018, TC_019, TC_023, TC_024, TC_025, TC_027, TC_030, TC_032, TC_036, TC_037, TC_039, TC_041, TC_047, TC_048, TC_071 | 25 | ~55 phút (chỉ phần 🔧) |
| **Chờ recon bổ sung** (`@NeedsVerify`) | TC_053, TC_056, TC_057 — chạy được ngay, nhưng **kỳ vọng chưa đo trên hệ thống thật**: kết quả khác thì sửa Expected + ghi Nhật ký, **không** mở bug trước khi hỏi PO · TC_015 và 13 TC Nhóm M (`TC_059`, `TC_060`, `TC_061`, `TC_063`, `TC_064`, `TC_065`, `TC_066`, `TC_067`, `TC_068`, `TC_070`, `TC_071`, `TC_073`, `TC_074`) — **chưa chạy được** tới khi deploy | 17 | ~12 phút (không tính 14 TC chờ deploy) |

> 🔝 **Thứ tự chạy:** Nhóm B (đăng nhập thành công) chạy **đầu tiên** trong mọi bộ — `RISK-LOGIN-06` chỉ ra module này là cổng vào của 23 module còn lại, hỏng ở đây là chặn toàn bộ đợt kiểm thử.
>
> 🧑‍💻 **Bộ `@TechCheck` giao cho ai:** tester có kỹ năng DevTools, hoặc để automation phủ. Tester nghiệp vụ chạy **phần chính** của các TC đó bình thường và ghi `— (bỏ phần 🔧)` vào báo cáo. **Hai TC bắt buộc có người biết DevTools mới chạy được từ đầu:** `TC_025` (phải sửa mã ẩn) và `TC_041` (phải giả lập mạng chậm).
>
> ⚠️ **Báo cáo FAIL phải ghi rõ biến thể**, ví dụ `CRM_LOGIN_TC_012-c FAIL`. Ghi mỗi `TC_012 FAIL` là mất truy vết về case cụ thể.

---

## Nhật ký thay đổi

| Ngày | Nguồn | Thay đổi | TC ảnh hưởng |
|---|---|---|---|
| 30-09-2026 | Quyết định user (`adhoc_2026-09-30`) | **`TC_014` 🗑️ Deprecated** — gắn tag `@Deprecated` + tiền tố ở `Test Scenario`, **giữ nguyên dòng và TC ID**. Lý do: TC cần tài khoản có mật khẩu chứa chữ cái để đảo hoa/thường; cả 4 mật khẩu trong `.env` (Admin, PM, Customer, LOGIN) chỉ gồm chữ số, dùng chúng sẽ FAIL giả; user quyết định bỏ thay vì cấp tài khoản mới. Độ phủ `REQ-LOGIN-14` còn 7 TC — khía cạnh *mật khẩu phân biệt hoa/thường* ⏭️ không còn TC. `Yes` 50 → 49 · Regression 55 → 54 · điều kiện #5 bỏ.<br>**Mốc git trước khi sửa:** `web/parts/part_01_web_dang_nhap.md` @ `057ea6d` · `TEST_CASES_LOGIN_SUMMARY.md` @ `f628233` | 🗑️ `CRM_LOGIN_TC_014` — TC ID giữ nguyên |
| 30-09-2026 | `/generate-testcases-from-requirements` — nhánh **BỔ SUNG** cho `REQ-LOGIN-45` → `61` (`CRM-LOGIN-101`), chạy sau DELTA theo quyết định user | **+16 TC `TC_059`→`TC_074`** (Nhóm M, `part_04`), độ hạt GỘP giữ nguyên · 6 biến thể mới. V2 (9 TC): Business Rule · State Transition · EP. V3 · Security (7 TC). Lập **Bảng quyết định** 7 rule và **2 bảng chuyển trạng thái** → hai nhánh 🔴 của DELTA chuyển ✅. Coverage **57/57**. Ca *không khoá theo IP* (biến thể b cũ của `TC_015`) nay là `TC_069` với 2 tài khoản thật. 13 TC `@NeedsVerify` + ⏸️ Hoãn tới khi deploy; `TC_068`, `069` chờ tài khoản staff thứ hai. **Không** sinh biến thể email `Customer` cho REQ-52 (quyết định user).<br>**Tách `parts/`** theo quyết định user (74 TC > ngưỡng 50): `web/test_cases_login_web.md` → 3 part theo ranh giới nhóm (A–C · D–F · G–L), nội dung **nguyên văn**, chỉ sửa đường dẫn tương đối; file cũ giữ làm trang chuyển hướng để link từ execution report / bug không gãy. Đã mở lại 10/10 ảnh evidence — không xung đột tài liệu ↔ ảnh, không thêm ASM.<br>**Mốc git trước khi sửa:** `web/test_cases_login_web.md` @ `ff0d6dd` · `TEST_CASES_LOGIN_SUMMARY.md` @ `ff0d6dd`<br>**Chỉnh cùng ngày theo quyết định user (`ASM-10`):** `TC_068`, `TC_069` dùng `admin@example.com` làm tài khoản thứ hai thay `TC014_EMAIL` chưa có; `TC_069` là ngoại lệ 1 lần sai bằng Admin, `Automation` Partial → Yes | ➕ `CRM_LOGIN_TC_059` → `CRM_LOGIN_TC_074` · `001`→`058` **giữ nguyên nội dung**, chỉ đổi file chứa |
| 30-09-2026 | `/update-testcases-from-impact` APPLY — ticket `CRM-LOGIN-101` · [Impact Report](../../requirements/login/impact/impact_CRM-LOGIN-101.md) · [kế hoạch đã duyệt](impact/impact_plan_CRM-LOGIN-101.md) · [Delta TC List](impact/delta_tc_CRM-LOGIN-101.md) | **V2 · Business Rule** — `TC_015` **viết lại**: kỳ vọng đảo ngược từ "không khoá" sang "5 lần sai liên tiếp → khoá, đúng mật khẩu vẫn bị từ chối"; đổi sang tài khoản PM; bỏ Bảng biến thể (`b` không khoá theo IP chuyển sang `REQ-LOGIN-50`); `Automation` Yes → Partial + ⏸️ Hoãn; tag `@TechCheck` → `@NeedsVerify`.<br>**V2 · BVA** — ➕ `TC_058` biên 4 lần chưa khoá.<br>**V2 · EP** — `TC_013` biến thể `a` đổi sang PM, ghi phạm vi 4 lần sai đầu của `REQ-LOGIN-15` 🟡.<br>**Đổi dữ liệu sang PM, kỳ vọng không đổi** (ràng buộc ticket dòng 6 + `AMB-LOGIN-22` ✅): `TC_011`-`c` (V2 · Required) · `TC_016` (V2 · Error Guessing) · `TC_017`-`b` · `TC_047` · `TC_053`-`a`,`b` (V2 · Validation / BVA) · `TC_025` (V3 · Security) · `TC_043`-`b` (V2 · UI Behavior) · `TC_050` (V4 · Compatibility). Ghi chú đầu Nhóm C thay bằng ràng buộc mới.<br>Index: coverage REQ-15, 41 + 17 REQ ⚪ chờ BỔ SUNG · Decision Table, State Transition ➖ → 🔴 (lấp ở BỔ SUNG) · vùng chưa có evidence · Automation · ISO · bộ chạy.<br>**Mốc git trước khi sửa:** `web/test_cases_login_web.md` @ `7682289` · `TEST_CASES_LOGIN_SUMMARY.md` @ `7682289` | ✏️ `CRM_LOGIN_TC_011`, `013`, `015`, `016`, `017`, `025`, `043`, `047`, `050`, `053` · ➕ `CRM_LOGIN_TC_058` — TC ID giữ nguyên |
| 24-09-2026 | `/review-testcases` mode FIX — [báo cáo review](review/testcase_review_report_web_20260924.md) · sửa **tại chỗ** theo quyết định user (không sinh file `_improved`) | Đối chiếu với lượt chạy thật mới `run_1790182902` (24-09-2026) phát hiện `TC_004` và `TC_029` có bug mở từ 20-08-2026 nhưng **chưa từng được gắn nhãn** `🐞`/"Hiện trạng: FAIL" như các TC known-bug khác, dù lượt review 19-09-2026 đã từng ghi nhận cả hai đang FAIL. **`TC_004`:** thêm tiền tố 🐞, thêm dòng Hiện trạng FAIL dẫn [BUG_login_1787226513_TC004](../../bugs/login/web/BUG_login_1787226513_TC004.md) — vừa được tái xác nhận hôm nay. **`TC_029`:** thêm tiền tố 🐞, thêm dòng Hiện trạng FAIL dẫn [BUG_login_1787226517_TC029](../../bugs/login/web/BUG_login_1787226517_TC029.md), kèm cảnh báo bằng chứng đã 5 tuần chưa retest — nếu chạy lại mà PASS thì coi là bug đã sửa, không phải bất thường. Cả hai thêm tag `@KnownBug`. Đổi tên bảng cuối file `web/test_cases_login_web.md` từ "Ba TC nhiều khả năng FAIL" → "Năm TC nhiều khả năng FAIL", thêm 2 dòng. Không đổi Expected phần kết quả chính, không đổi REQ coverage, không đổi số TC.<br>**Mốc git trước khi sửa:** `docs/testcases/login/` lần đầu được commit ở `fc08480` (thư mục trước đó chưa từng qua git) — xem bản trước bằng `git show fc08480:docs/testcases/login/web/test_cases_login_web.md` | ✏️ `CRM_LOGIN_TC_004`, `CRM_LOGIN_TC_029` — TC ID giữ nguyên |
| 21-09-2026 | `/generate-testcases-from-requirements` — **rà lại độ phủ**, KHÔNG sinh lại bộ TC | Module đã có 51 TC đang được **2 execution report** và **6 bug report** tham chiếu → **không** chạy Mode QUICK sinh mới (vi phạm Anti-Pattern của skill). Theo quyết định user: chỉ rà độ phủ và **bổ sung TC còn thiếu, cấp số nối tiếp**.<br>**Rà soát phát hiện 3 lỗ hở mà cả Bảng Đối Soát Coverage lẫn Bảng 4 vòng đều không bắt được:**<br>`1` **Loại field Checkbox chưa từng có dòng đối soát** — dòng `V2 · Validation` chỉ ghi *"Bảng Email 8/8, Bảng Password 4/4"*, bỏ hẳn ô `Remember me` (field thứ 3 theo mục 4.1 requirements). Bộ TC cũ chỉ kiểm chiều **tích vào**, chưa kiểm chiều **bỏ tích ra** → `TC_052`, `TC_053`<br>`2` **Mục *"mở 2 tab cùng lúc"* của nhánh `V2 · Error Guessing` trống** — `TC_036` chỉ kiểm nút Back trong một tab → `TC_054`<br>`3` **Biểu mẫu Quên mật khẩu chỉ có 1 biến thể ô Email** (`abc` ở `TC_030`) trong khi dòng đối soát ghi "đủ 8/8" — mọi dẫn chứng đều lấy từ biểu mẫu **Đăng nhập**. Hai biểu mẫu có ô Email riêng, ràng buộc khác nhau (mục 4.2) → `TC_055`, `TC_056`, `TC_057`<br>**Bổ sung 6 TC (`TC_052`→`TC_057`) thành Nhóm L, độ hạt GỘP giữ nguyên. KHÔNG đụng `TC_001`→`TC_051`** — execution report `run_1787215085`, `run_1789759574` và 6 bug đang mở vẫn truy vết đúng.<br>Đồng bộ index: bản đồ tài liệu · coverage (REQ-02, 09, 23, 26, 32, 33) · bảng 4 vòng (3 nhánh mở rộng, đối soát Checkbox và ô Email form 2 **tách bạch**) · ISO 25010 · bộ chạy · vùng chưa có evidence.<br>⚠️ **3 TC mang `@NeedsVerify`** (`TC_053`, `TC_056`, `TC_057`) — chạy được ngay nhưng kỳ vọng **suy từ REQ, chưa đo trên hệ thống thật**. Kết quả khác thì sửa Expected và ghi Nhật ký, **không** mở bug trước khi hỏi PO.<br>**Mốc git:** thư mục `docs/testcases/login/` **chưa được commit lần nào** (`git status` = `??`) → không có hash đối chiếu. Đề nghị commit bộ TC trước lần sửa tiếp theo để mọi lần sửa sau đều có mốc. | ➕ `CRM_LOGIN_TC_052` → `CRM_LOGIN_TC_057` — `001`→`051` **giữ nguyên hoàn toàn** |
| 21-09-2026 | Quy ước đặt tên | Đổi tên file index `test_cases_login.md` → `TEST_CASES_LOGIN_SUMMARY.md` — quy ước mới: index IN HOA để khác hẳn file nền tảng. Nội dung, mã REQ/TC không đổi; mọi link trỏ tới đã sửa | — |
| 19-09-2026 | Quyết định PO `AMB-LOGIN-20` → `REQ-LOGIN-44` | **`TC_039`:** cột REQ `REQ-LOGIN-01` → `REQ-LOGIN-44` (REQ cũ không nói gì về HTTPS — truy vết nhầm). Gỡ ghi chú "chưa được xác nhận là yêu cầu đã chốt". Thêm tiền đề **tắt HTTPS-Upgrades của Chrome** — Chrome tự nâng `http://` lên `https://` nên chấm bằng thanh địa chỉ sẽ PASS giả. Đo lại bằng `curl -I`: vẫn `200`, không HSTS → vẫn FAIL, bug giữ mở. `ASM-07` ✅. Độ phủ **40/40 REQ**, số TC không đổi.<br>**Mốc git trước khi sửa:** `5d10845` | `CRM_LOGIN_TC_039` ✏️ — TC ID giữ nguyên |
| 19-09-2026 | Recon bổ sung vùng chưa có evidence | **`TC_024` mục 🔧`2`:** đổi kỳ vọng từ "sau F5 mã **khác**" sang "mã **giữ nguyên** trong phiên, phiên mới mới đổi" theo kết quả đo (cùng phiên 3 lần nạp → cùng mã; 2 phiên → 2 mã khác). Gỡ `@NeedsVerify`, `ASM-05` ✅. Module **hết vùng chưa có evidence**. Không đổi TC ID, không đổi số TC | (chưa commit) |
| 19-09-2026 | `/review-testcases` mode FIX — [báo cáo review](review/testcase_review_report_web_20260919.md) · sửa **tại chỗ** theo quyết định user (không sinh file `_improved`) | **5 TC 🟡:** `TC_014` đổi sang tài khoản staff test riêng (`TC014_EMAIL`/`TC014_PASSWORD`) · `TC_018` **bỏ biến thể `a`** (email 260 ký tự) — Expected cũ `Invalid email or password` sai với mốc RFC 5321 đã chốt và trùng `TC_046-c`; đổi Test Scenario sang mật khẩu đa ngôn ngữ · `TC_034` thêm bước 0 dựng task + bật timer và bước 6 dọn dẹp, Expected đổi "hộp thoại" → "lớp xác nhận che toàn màn hình", `Automation` No → Yes · `TC_039` thay ghi chú bug cũ bằng hiện trạng FAIL đã xác nhận · `TC_050` ghi danh sách trình duyệt đã chốt, `Automation` Partial → Yes.<br>**Dọn ghi chú đã cũ ở 8 TC:** gỡ `@NeedsVerify` / `⚠️ chưa có evidence` ở `TC_011`, `025`, `031`, `033` (`Automation` Partial → Yes), `040`, `041`, `049`; `TC_046` gỡ `@KnownBug` (bug đã đóng). `TC_020` bỏ phụ thuộc `TC_019` — tự đăng nhập cổng khách hàng.<br>Đồng bộ index: Assumptions `ASM-02/03/04/06/07/08` ✅ · bảng *Vùng chưa có evidence* còn 1 dòng (`TC_024` 🔧`2`) · 4 vòng, ISO, bộ chạy. Độ phủ REQ không đổi.<br>**Mốc git trước khi sửa:** `web/test_cases_login_web.md` @ `4550fd6` | ✏️ `CRM_LOGIN_TC_011`, `014`, `018`, `020`, `025`, `031`, `033`, `034`, `039`, `040`, `041`, `046`, `049`, `050` — TC ID giữ nguyên |
| 19-09-2026 | Kết quả chạy [run_1789759574](../../executions/login/web/run_1789759574/execution_report.md) + quyết định user | **`TC_048`: bỏ biến thể `b` (ô `Password` 300 ký tự).** Bước `Ctrl+A` → `Ctrl+C` → đếm **không làm được** trên ô mật khẩu — mọi trình duyệt chặn sao chép nội dung ra khỏi ô mật khẩu, tester chạy tay cũng không copy được. TC giờ chỉ kiểm ô `Email`; đổi Test Scenario thành *"Ô Email không tự cắt bớt ký tự…"*. Phần độ dài ô `Password` giữ ở dòng 🔧 (đo bằng DevTools), chuỗi mật khẩu dài vẫn do `TC_047` phủ. Độ phủ REQ không đổi.<br>**Mốc git trước khi sửa:** `web/test_cases_login_web.md` @ `4550fd6` | `CRM_LOGIN_TC_048` ✏️ — TC ID giữ nguyên |
| 19-09-2026 | `/update-testcases-from-impact` APPLY — `adhoc_2026-09-19` (quyết định PO `AMB-LOGIN-19`) | **Chuyển bộ TC sang tầng nền tảng**: 51 TC chuyển nguyên văn sang [web/test_cases_login_web.md](web/test_cases_login_web.md), file này thành index (thêm `## Bản đồ tài liệu`). Giữ 1 file dù vượt ngưỡng 50 — quyết định user.<br>`TC_026`: gỡ `@AssumptionBased` và cảnh báo `AMB-LOGIN-19` còn treo. `ASM-01` → ✅. Thêm `TC_051` (V3 · Security) cho vế **gia hạn khi thao tác** của `REQ-LOGIN-42`.<br>`TC_026`, `TC_051` → `Automation = No` (không automation) + `@PersonalOnly` (`/execute-test-cases` bỏ qua) — **QA tự chạy và theo dõi** (quyết định user).<br>Đổi mã AMB/RISK sang dạng có prefix module (`AMB-19` → `AMB-LOGIN-19`…). Bỏ thư mục `archive/` — bản cũ tra bằng git.<br>**Mốc git trước khi sửa:** `TEST_CASES_LOGIN_SUMMARY.md` @ `05efd17` | `CRM_LOGIN_TC_026` ✏️ · `CRM_LOGIN_TC_051` ➕ — TC ID `001`→`050` giữ nguyên |
| 11-09-2026 | `/generate-testcases-manual-rbt` — chấm **Bản Đồ Loại Kiểm Thử 4 Vòng** lên bộ TC đang có | **Bổ sung 9 TC (`TC_042`→`TC_050`), KHÔNG đụng TC_001→TC_041.** Chấm bảng 4 vòng phát hiện 6 nhánh trống hoặc nông trong khi Bảng Đối Soát Coverage vẫn xanh 39/39 REQ: `V2 · UI Behavior` (trống) · `V2 · BVA` (trống) · `V2 · Validation` bảng Password/Email chưa đối soát đủ mục · `V3 · Logging` (chưa chấm) · `V4 · Compatibility` (trống) · `V4 · Responsive` (chỉ có TC_033).<br>**Recon thật ngày 11-09-2026 chốt được:** mốc độ dài phần trước `@` là **64 ký tự** (RFC 5321) — 64 cho `Invalid email or password`, 65 đổi sang `The Email Address field must contain a valid email address.`; ô nhập **không** giới hạn số ký tự; ô mật khẩu **không** chặn dán và **không** có nút hiện/ẩn; nút `Login` **không** khoá theo trạng thái biểu mẫu; `Utilities → Activity Log` trả **Từ chối truy cập** trên tài khoản demo.<br>⚠️ **Ảnh hưởng tới bug đang mở:** phát hiện của TC_046 cho thấy ca của [BUG_login_1787226515_TC018](../../bugs/login/web/BUG_login_1787226515_TC018.md) là **ranh giới chuẩn RFC, không phải lỗi** — đề nghị xem lại và nhiều khả năng đóng với trạng thái *không phải lỗi*.<br>Bổ sung **Bảng Đối soát loại kiểm thử (4 vòng)** và **Bảng rà soát đặc tính chất lượng ISO/IEC 25010:2023** (trước đó bộ TC chưa có bảng ISO vì sinh trước khi skill có tiêu chí 9). Thêm 1 ảnh evidence `login_form_375x700_fullpage.png`. Bản trước lưu ở `archive/test_cases_login_v3_truoc_bo_sung_4vong_20260911.md` (thư mục `archive/` đã bỏ 19-09-2026 — tra bằng `git log -- docs/testcases/login/`) | Thêm mới `CRM_LOGIN_TC_042` → `CRM_LOGIN_TC_050`<br>TC_001→TC_041 **giữ nguyên hoàn toàn** — execution report `run_1787215085` và 6 bug đang mở vẫn truy vết đúng |
| 20-08-2026 | Phản hồi người dùng — TC chứa quá nhiều kiểm chứng thuộc tính HTML | **Viết lại toàn bộ Test Steps và Expected Result theo ngôn ngữ người dùng nhìn thấy.** Mọi `document.title`, `body.className`, `checkValidity()`, `offsetParent`, `querySelector`, selector CSS, mã HTTP và tab Network được gỡ khỏi phần chính; nội dung cấp kỹ thuật tách xuống dòng `🔧 Ghi chú kỹ thuật (cần DevTools)` và TC gắn thêm tag `@TechCheck` (23 TC).<br>**TC ID giữ nguyên `001`→`041`** — không đánh lại, không cắt case nào, độ phủ vẫn 39/39 REQ. Bổ sung `ASM-09` giải thích vì sao `TC_008`/`TC_009` không có kỳ vọng nhìn thấy được. `TC_016` đổi cách chạy sang **cửa sổ ẩn danh + tắt tự điền** để tester bắt được lỗi mà không cần View Source. Bổ sung bộ chạy `@TechCheck` và mục "Cách đọc" phần 2.<br>Luật gốc đã đưa vào `.claude/skills/skills-rbt-manual-testing/SKILL.md` mục **Quy Tắc Ngôn Ngữ Kiểm Chứng** (+ tiêu chí 8 của Self-Quality Gate) nên lần sinh sau không lặp lại. Bản trước lưu ở `archive/test_cases_login_v2_GOP_domdanguage_20260820.md` (thư mục `archive/` đã bỏ 19-09-2026 — tra bằng `git log -- docs/testcases/login/`) | Toàn bộ `CRM_LOGIN_TC_001` → `CRM_LOGIN_TC_041` |
| 20-08-2026 | Yêu cầu người dùng — gộp TC nhỏ lẻ | **Sinh lại toàn bộ ở độ hạt GỘP: 82 TC → 41 TC.** Độ phủ REQ **không đổi** (39/39) và **không case nào bị bỏ**. TC ID đánh lại từ `001` — chấp nhận được vì bộ TC 82 chưa có script / execution report / RTM nào trỏ vào | Toàn bộ `CRM_LOGIN_TC_001` → `CRM_LOGIN_TC_041` |
| 20-08-2026 | `/generate-testcases-from-requirements` Mode QUICK | Khởi tạo bộ TC từ `REQUIREMENTS_LOGIN_SUMMARY.md` ở **độ hạt TÁCH** — 82 TC, 3 part. Mở 9/9 ảnh evidence, không phát hiện xung đột tài liệu ↔ ảnh | (bản đầu tiên) |
