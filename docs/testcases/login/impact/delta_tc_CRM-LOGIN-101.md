# Delta TC List — `CRM-LOGIN-101` · module `LOGIN`

| Mục | Giá trị |
|---|---|
| Ticket | `CRM-LOGIN-101` — Khoá tài khoản khi đăng nhập sai nhiều lần (PO chốt 28-09-2026) + trả lời `AMB-LOGIN-21` → `32` (30-09-2026) |
| Ngày áp | 30-09-2026 |
| Impact Report nguồn | [`impact_CRM-LOGIN-101.md`](../../../requirements/login/impact/impact_CRM-LOGIN-101.md) |
| Kế hoạch đã duyệt | [`impact_plan_CRM-LOGIN-101.md`](impact_plan_CRM-LOGIN-101.md) — user duyệt đủ 5 điểm ở mục 8 ngày 30-09-2026 |
| Mốc git trước khi sửa | web → `web/test_cases_login_web.md` @ `7682289` · index → `TEST_CASES_LOGIN_SUMMARY.md` @ `7682289` |
| Nền tảng bị chạm | **web** — module chưa có mobile / API |
| Automation hiện có | **Chưa có** script nào mang `CRM_LOGIN_TC_` trong repo (đã tìm trong `*.ts` · `*.js` · `*.java` · `*.py` ngày 30-09-2026) → `/update-automation-from-impact` chưa có gì để sửa. Khi sinh automation cho module, dùng bản TC **sau** mốc này |
| Trạng thái | ✅ **ĐÃ ĐỒNG BỘ** (30-09-2026) — phần ngoài phạm vi đã được lượt BỔ SUNG xử lý, xem Nhật ký |

Xem đúng ô đã đổi: `git diff 7682289 -- docs/testcases/login/web/test_cases_login_web.md`

## TC đã xử lý

| TC ID | Nền tảng | Vòng · Nhánh | Hành động đã làm | Đổi cái gì (cho automation) |
|---|---|---|---|---|
| CRM_LOGIN_TC_015 | web | V2 · Business Rule (+ V3 · Security) | ✏️ Đã sửa — **viết lại** | Kỳ vọng **đảo ngược**: 5 lần sai mật khẩu liên tiếp với `PM_EMAIL` → lần 1–4 `Invalid email or password`, lần 5 trang chứa `Your account is locked. Please try again in 15 minutes.`; mật khẩu đúng sau đó vẫn bị từ chối. Bỏ data-driven (2 biến thể → 1 bộ dữ liệu). `Automation` Yes → **Partial**, ⏸️ Hoãn tới khi deploy. Test phải chạy riêng, tuần tự, **cuối cùng**, không song song với test nào dùng PM |
| CRM_LOGIN_TC_058 | web | V2 · BVA (+ V3 · Security) | ➕ Mới (trong REQ 🟡) | TC mới: 4 lần sai với `PM_EMAIL` → mỗi lần `Invalid email or password`, lần 5 mật khẩu đúng → vào `/admin/`. Cần viết script mới. PASS được ngay trên bản chưa deploy |
| CRM_LOGIN_TC_013 | web | V2 · EP (+ V3 · Security) | ✏️ Đã sửa | Biến thể `a`: email `admin@example.com` → `PM_EMAIL`. Thêm tiền đề đăng nhập đúng PM rồi đăng xuất. Assertion không đổi |
| CRM_LOGIN_TC_011 | web | V2 · Required | ✏️ Đã sửa | Biến thể `c`: email → `PM_EMAIL` + tiền đề trạng thái sạch. Assertion không đổi |
| CRM_LOGIN_TC_016 | web | V2 · Error Guessing | ✏️ Đã sửa | Email → `PM_EMAIL`; assertion bước 5 đổi giá trị mong đợi của ô Email sang `PM_EMAIL`. Vẫn là TC 🐞 known-bug |
| CRM_LOGIN_TC_017 | web | V2 · Validation · V3 · Security | ✏️ Đã sửa | Biến thể `b` (tiêm SQL): email → `PM_EMAIL` + tiền đề. Assertion không đổi |
| CRM_LOGIN_TC_025 | web | V3 · Security | ✏️ Đã sửa | Cặp đăng nhập → `PM_EMAIL` / `PM_PASSWORD` + tiền đề. Assertion không đổi |
| CRM_LOGIN_TC_043 | web | V2 · UI Behavior | ✏️ Đã sửa | Biến thể `b`: email → `PM_EMAIL` + tiền đề. Assertion không đổi |
| CRM_LOGIN_TC_047 | web | V2 · BVA · V3 · Security | ✏️ Đã sửa | Email mọi biến thể → `PM_EMAIL` + tiền đề. Assertion không đổi |
| CRM_LOGIN_TC_050 | web | V4 · Compatibility | ✏️ Đã sửa | Bước 3 (đăng nhập đúng) và bước 5 (mật khẩu sai) → tài khoản PM. Assertion không đổi |
| CRM_LOGIN_TC_053 | web | V2 · Validation (Checkbox) | ✏️ Đã sửa | Biến thể `a`, `b`: email → `PM_EMAIL` + tiền đề. Vẫn `@NeedsVerify` như trước |

> Ghi chú đầu **Nhóm C** (không phải TC) đã thay: bỏ câu *"thử sai mật khẩu lặp lại là an toàn"*, thay bằng ràng buộc gửi sai chỉ bằng PM. **Fixture automation** sau này phải tuân: mọi test gửi mật khẩu sai / bỏ trống / CSRF sai với tài khoản có thật dùng `PM_*` và đăng nhập đúng một lần ở đầu test.

## Ngoài phạm vi

| REQ | Việc còn lại | Command |
|---|---|---|
| `REQ-LOGIN-45` → `61` (17 REQ ⚪) | Chưa có TC. Lập **Bảng quyết định** + **bảng chuyển trạng thái** (lấp 2 nhánh 🔴). `REQ-LOGIN-50` nhận lại ca *không khoá theo IP* (biến thể b cũ của `TC_015`). `REQ-52` **không** sinh biến thể email `Customer`. `REQ-49`, `50` cần tài khoản staff thứ hai — chưa có | `/generate-testcases-from-requirements docs/requirements/login/web/requirements_login_web.md` — nhánh **BỔ SUNG**, từ `CRM_LOGIN_TC_059`, tách `parts/` |
| Thực thi `TC_015` | Chưa chạy được | Chờ deploy (`AMB-LOGIN-27`) |

## Nhật ký

| Ngày | Thay đổi |
|---|---|
| 30-09-2026 | Áp lần đầu theo `impact_plan_CRM-LOGIN-101.md` đã duyệt — 10 TC ✏️ · 1 TC ➕ · 0 TC 🗑️ · 0 TC ⏸️ |
| 30-09-2026 | Phần *Ngoài phạm vi* đã xử lý bằng lượt **BỔ SUNG**: `CRM_LOGIN_TC_059` → `074` cho `REQ-LOGIN-45` → `61`, hai nhánh 🔴 (Decision Table, State Transition) đã lấp. TC mới **không** thuộc Delta TC List (không phải TC bị sửa) — automation sinh mới bằng `/generate-automation-from-testcases`. Bộ TC web đã tách `parts/`: dòng TC của file này nay nằm ở `web/parts/part_01_web_dang_nhap.md` (`011`, `013`, `015`, `016`, `017`, `058`), `part_02_…` (`025`), `part_03_…` (`043`, `047`, `050`, `053`) — nội dung không đổi |
