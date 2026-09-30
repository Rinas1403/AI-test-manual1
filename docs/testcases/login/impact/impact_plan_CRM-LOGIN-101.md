# Kế hoạch cập nhật TC — `CRM-LOGIN-101` · Module `LOGIN`

> ✅ **Đã APPLY 30-09-2026** — kết quả ở [`delta_tc_CRM-LOGIN-101.md`](delta_tc_CRM-LOGIN-101.md). Nội dung dưới đây giữ nguyên làm bản kế hoạch đã duyệt.
>
> **Mode PLAN** — kế hoạch, **chưa sửa** dòng TC nào. ✅ **User đã duyệt cả 5 điểm ở mục 8 ngày 30-09-2026.**
>
> 🔁 **Cập nhật cùng ngày sau khi PO trả lời 6 ambiguity** (`AMB-LOGIN-22`, `23`, `25`, `26`, `27`, `30`): `AMB-LOGIN-22` = **có** → thêm 4 TC vào nhóm đổi sang PM (mục 2.4) — áp **đúng quy tắc của điểm 1 đã duyệt**, kế hoạch cũ đã ghi sẵn *"PO trả lời ngược lại → chuyển sang nhóm 2.4"*. Phạm vi BỔ SUNG mở rộng tới `REQ-LOGIN-59`.
>
> 🔁 **Cập nhật lần 2 cùng ngày** — chốt `AMB-LOGIN-24`, `28`, `29`, `31`, `32` theo Giả định tạm: `TC_015` được **chấm** thông báo khoá ở lần sai thứ 5 · dùng PM chung · phạm vi BỔ SUNG tới `REQ-LOGIN-61`. Tài khoản 3 vai trò đã lưu `.env`.
>
> Impact Report nguồn: [`impact_CRM-LOGIN-101.md`](../../../requirements/login/impact/impact_CRM-LOGIN-101.md) (gồm phần *Bổ sung cùng ngày*) · Index TC: [`TEST_CASES_LOGIN_SUMMARY.md`](../TEST_CASES_LOGIN_SUMMARY.md) · File TC: [`web/test_cases_login_web.md`](../web/test_cases_login_web.md)

| Mục | Giá trị |
|---|---|
| Ticket | `CRM-LOGIN-101` — Khoá tài khoản khi đăng nhập sai nhiều lần (PO chốt 28-09-2026) + trả lời `AMB-LOGIN-21`, một phần `AMB-LOGIN-25` (30-09-2026) |
| Ngày lập | 30-09-2026 |
| Nền tảng bị chạm | **Web** — module chưa có mobile / API |
| Độ hạt bộ TC | **GỘP** — giữ nguyên, không đổi độ hạt |
| File sẽ sửa | `web/test_cases_login_web.md` · `TEST_CASES_LOGIN_SUMMARY.md` · `docs/testcases/README.md` |
| Mốc git dự kiến | Cả hai file TC **sạch** (`git status --short` rỗng), commit gần nhất `7682289` — APPLY sẽ kiểm lại ngay trước khi sửa |
| Dải TC ID | Đang dùng `001` → `057` · TC mới trong phạm vi REQ 🟡 cấp từ **`CRM_LOGIN_TC_058`** |

**Nhánh bị chạm:** V2 · Business Rule (`TC_015` viết lại) · V2 · BVA (➕ `TC_058`) · V2 · EP (`TC_013`) · V2 · Required (`TC_011` — chỉ đổi dữ liệu) · V2 · UI Behavior (`TC_043` — chỉ đổi dữ liệu) · V2 · Validation (`TC_017`, `TC_047`, `TC_053` — chỉ đổi dữ liệu) · V2 · Error Guessing (`TC_016` — chỉ đổi dữ liệu) · V3 · Security (`TC_015`, `TC_058`, `TC_025` — chỉ đổi dữ liệu) · V4 · Compatibility (`TC_050` — chỉ đổi dữ liệu) · **V2 · Decision Table** và **V2 · State Transition** chuyển `➖` → `🔴` (ticket kích hoạt hai kỹ thuật này — xem mục 5).
**Nhánh KHÔNG đụng:** toàn bộ **V1** (ticket không thêm/bớt/đổi nhãn thành phần nào trên màn hình — thông báo khoá chỉ hiện **sau** hành động, thuộc V2) · V3 Permission / API / Database / Integration / Logging · V4 Responsive / Accessibility / Performance / Regression / E2E.

---

## 1. Ánh xạ REQ → TC

### ✅ Chắc chắn — theo cột `REQ ID`

| REQ | Delta | TC | Hành động |
|---|---|---|---|
| `REQ-LOGIN-41` 🟡 | **Đảo ngược**: "không khoá" → "khoá sau 5 lần sai liên tiếp với cùng email" | `CRM_LOGIN_TC_015` (`a`, `b`) | ⚠️ **Viết lại** — kỳ vọng ngược hoàn toàn. Biến thể `b` (không khoá theo IP) **tách ra**, xem mục 2 |
| `REQ-LOGIN-41` 🟡 | Có ngưỡng mới → phát sinh biên 4 / 5 lần | — | ➕ **`CRM_LOGIN_TC_058`** mới (V2 · BVA) — TC biên trong phạm vi REQ 🟡, được phép sinh trong DELTA |
| `REQ-LOGIN-15` 🟡 | Thu hẹp: thông báo giống nhau chỉ đảm bảo trong **4 lần sai đầu**; AC đổi email có thật từ `Admin` sang `Project Manager` | `CRM_LOGIN_TC_013` (bước 5) | ⚠️ Sửa dữ liệu biến thể `a` + ghi rõ phạm vi 4 lần |
| `REQ-LOGIN-15` 🟡 | nt | `CRM_LOGIN_TC_019` (bước 4) | ✅ **Không sửa** — TC chỉ gửi **1** lần với email `Customer`; phần REQ-15 nó kiểm vẫn đúng |

### ⚠️ Lan toả — không map theo REQ, map theo **dữ liệu** của TC (ràng buộc ticket dòng 6)

Các TC dưới **không** trỏ tới REQ nào vừa đổi. Chúng bị chạm vì **cột `Test Data` gửi mật khẩu sai với `admin@example.com`**, trái ràng buộc *"TC phải dùng tài khoản Project Manager, KHÔNG dùng tài khoản Admin"*. Việc dò ra là chắc chắn (đọc thẳng cột dữ liệu), nhưng **quyết định sửa** là suy từ ràng buộc môi trường chứ không từ REQ → **cần user xác nhận** (mục 8, câu 1).

| TC | REQ | Lần sai với `Admin` | Vì sao phải sửa |
|---|---|---|---|
| `CRM_LOGIN_TC_016` | REQ-16 | 1 | Chạy liền `TC_013` + `016` + `017` + `047` = **5 lần sai** không xen lần đăng nhập đúng nào → **khoá `Admin` 15 phút** cho cả đội khi tính năng deploy |
| `CRM_LOGIN_TC_017` | REQ-14 | 1 (biến thể `b`) | nt |
| `CRM_LOGIN_TC_047` | REQ-14 | 2 (`a`, `b`) | nt |
| `CRM_LOGIN_TC_050` | REQ-02, 06, 14 | 3 (mỗi trình duyệt 1 lần, **sau** một lần đăng nhập đúng) | Rủi ro thấp — lần đúng trước đó đặt lại bộ đếm — nhưng vẫn vi phạm ràng buộc ticket |
| `CRM_LOGIN_TC_053` | REQ-02, 09 | 1 (biến thể `a`) + 1 bỏ trống (`b`) | nt. Biến thể `b`: `AMB-LOGIN-22` ✅ — bỏ trống cũng là lần sai |
| `CRM_LOGIN_TC_011` | REQ-10, 11, 12 | 1 bỏ trống mật khẩu (`c`) | `AMB-LOGIN-22` ✅: bỏ trống mật khẩu là lần sai *(thêm 30-09-2026)* |
| `CRM_LOGIN_TC_025` | REQ-22 | 2 lần CSRF sai (`a`, `b`) | `AMB-LOGIN-22` ✅: CSRF sai là lần sai *(thêm 30-09-2026)* |
| `CRM_LOGIN_TC_043` | REQ-02, 10 | 1 bỏ trống mật khẩu (`b`) | `AMB-LOGIN-22` ✅ *(thêm 30-09-2026)* |

### ❓ Chưa có TC — ngoài phạm vi DELTA

`REQ-LOGIN-45` → `53` (9 REQ ⚪ mới). Xem mục 7.

---

## 2. Kế hoạch sửa từng TC

Mọi dòng đều ở `web/test_cases_login_web.md`. Chỉ chạm đúng các ô liệt kê; TC ID giữ nguyên.

### 2.1. `CRM_LOGIN_TC_015` — dòng 51 · V2 · Business Rule (+ V3 · Security) · ⚠️ VIẾT LẠI

| Ô | Hiện tại | Sau khi sửa |
|---|---|---|
| `Test Scenario` | Đăng nhập sai nhiều lần liên tiếp không làm khoá tài khoản và không chặn theo IP | Sai mật khẩu **5 lần liên tiếp** với cùng một email thì tài khoản bị khoá — đăng nhập đúng ngay sau đó bị từ chối |
| `Pre-Condition` | Đã xác nhận hệ thống không có cơ chế khoá nên an toàn trên môi trường dùng chung | Chưa đăng nhập. **Trạng thái sạch:** đăng nhập đúng bằng `PM_EMAIL` / `PM_PASSWORD` trong `.env` rồi đăng xuất (bộ đếm = 0). ⚠️ TC **khoá tài khoản PM 15 phút** — chạy **cuối đợt, tuần tự**, báo đội trước. **KHÔNG** dùng `Admin` |
| `Test Steps` | 5 bước, gửi sai với `admin@example.com` | 1. Nhập ô Email `PM_EMAIL`, ô Password `SaiMatKhau_20260930`, bấm `Login`<br>2. Lặp bước 1 cho đủ **5 lần** liên tiếp, lần nào cũng đọc dải báo lỗi<br>3. Nhập `PM_EMAIL` + giá trị `PM_PASSWORD` **đúng**, bấm `Login`<br>4. Đọc URL và nội dung trang<br>5. Mở `https://crm.anhtester.com/admin/` |
| `Test Data` | Bảng biến thể `a` (6 lần, Admin) · `b` (5 email khác nhau) | **Một** bộ dữ liệu, bỏ Bảng biến thể: Email `PM_EMAIL` · mật khẩu sai `SaiMatKhau_20260930` · mật khẩu đúng `PM_PASSWORD` |
| `Expected Result` | Mọi lần `Invalid email or password`, không từ khoá khoá, đăng nhập đúng thành công | 2. Lần **1–4**: đúng 1 dải `Invalid email or password`. Lần **5**: trang chứa `Your account is locked. Please try again in 15 minutes.` (`AMB-LOGIN-24` ✅)<br>4. **Không** vào được Dashboard, vẫn ở `https://crm.anhtester.com/admin/authentication`<br>5. Bị đưa về `https://crm.anhtester.com/admin/authentication`<br><br>📌 Bước 2 lần 5 chạm nội dung của `REQ-LOGIN-45` — dùng làm dấu hiệu đã tới ngưỡng; TC chuyên trách cho `REQ-45` sinh ở lượt BỔ SUNG<br>⚠️ Chưa có evidence: tính năng chưa deploy (`AMB-LOGIN-27`) |
| `Automation` | `Yes` | `Partial` — tiêu chí trục 4 của `automation_criteria.md`: *khoá tài khoản dùng chung* — PO chốt dùng PM chung (`AMB-LOGIN-28` ✅) nên giữ `Partial`: script phải chạy riêng, tuần tự. Ghi thêm **⏸️ Hoãn** ở mục Đối soát cột Automation tới khi deploy |
| `Tags` | `@Regression, @Security, @TechCheck, @Login` | `@Regression, @Security, @NeedsVerify, @Login` — bỏ `@TechCheck` (dòng 🔧 "không trả `429`" không còn nghĩa khi hệ thống **có** khoá) |

> 🔁 **Biến thể `b` cũ đi đâu:** 5 lần sai với 5 email khác nhau → không khoá theo IP. Hành vi này nay thuộc **`REQ-LOGIN-50`** (⚪ mới), không thuộc `REQ-41`. Giữ nó trong `TC_015` là vi phạm luật *CẤM gộp khác loại phản hồi* (biến thể `a` bị từ chối, biến thể `b` đăng nhập được). **Case không mất**: ghi vào mục 7 để lượt sinh TC cho `REQ-LOGIN-50` dùng lại. Kết quả chạy cũ `TC_015-b` ở `run_1787215085` vẫn đúng với thời điểm đó — không sửa execution report.

### 2.2. ➕ `CRM_LOGIN_TC_058` — TC mới, cuối Nhóm C · V2 · BVA (+ V3 · Security)

| Cột | Nội dung |
|---|---|
| `REQ ID` | REQ-LOGIN-41 |
| `Risk Level` · `Priority` | High · High |
| `Test Scenario` | Sai mật khẩu **4 lần** liên tiếp chưa khoá tài khoản — lần thứ 5 nhập đúng vẫn đăng nhập được |
| `Pre-Condition` | Chưa đăng nhập. Trạng thái sạch như `TC_015`. Không khoá tài khoản nên chạy được ở vị trí bất kỳ, nhưng **không** chạy song song với TC khác dùng PM |
| `Test Steps` | 1. Nhập `PM_EMAIL` + `SaiMatKhau_20260930`, bấm `Login`<br>2. Lặp bước 1 cho đủ **4 lần**<br>3. Nhập `PM_EMAIL` + `PM_PASSWORD` đúng, bấm `Login`<br>4. Đọc URL |
| `Expected Result` | 2. Mỗi lần đúng 1 dải `Invalid email or password`<br>4. Vào `https://crm.anhtester.com/admin/`, thanh tiêu đề trình duyệt có chữ `Dashboard` |
| `Automation` · `Auto Type` | `Yes` · UI |
| `Tags` | `@Regression, @Boundary, @Security, @Login` |

> 📌 TC này **PASS được ngay trên bản hiện tại** (chưa có khoá) — nó chỉ thành phép thử biên thật **sau khi deploy**, khi cùng `TC_015` kẹp ngưỡng giữa 4 và 5. Vì kỳ vọng đúng ở cả hai thời điểm nên **không** gắn `@NeedsVerify`.
>
> Phép thử 6b: `TC_058` chỉ mang 1 REQ → không vi phạm.

### 2.3. `CRM_LOGIN_TC_013` — dòng 49 · V2 · EP (+ V3 · Security) · ⚠️ SỬA DỮ LIỆU

| Ô | Sửa |
|---|---|
| `Pre-Condition` | Thêm: *"Trạng thái sạch: đăng nhập đúng bằng `PM_EMAIL` rồi đăng xuất"* |
| `Test Data` biến thể `a` | `admin@example.com` / `SaiMatKhau_20260820` → **`PM_EMAIL`** / `SaiMatKhau_20260820` |
| `Expected Result` | Thêm sau bước 5: *"📌 REQ-LOGIN-15 chỉ đảm bảo trong **4 lần sai đầu** — mỗi biến thể chỉ gửi 1 lần nên luôn nằm trong phạm vi. Từ lần 5 hai loại email báo khác nhau là **chấp nhận có ý thức** (`RISK-LOGIN-10`), TC không kiểm"* |

### 2.4. Nhóm lan toả — đổi `admin@example.com` sang `PM_EMAIL` ở lượt gửi mật khẩu sai

Áp **một** quy tắc cho cả **8** TC để dễ review: *email có thật trong lượt gửi mật khẩu sai, bỏ trống mật khẩu hoặc mã CSRF sai = `PM_EMAIL`* + thêm Pre-Condition *"Trạng thái sạch: đăng nhập đúng bằng `PM_EMAIL` rồi đăng xuất"*. Kỳ vọng **không đổi**.

| TC · dòng | Vòng · Nhánh | Ô sửa |
|---|---|---|
| `TC_016` · 52 | V2 · Error Guessing | `Pre-Condition` · `Test Steps` bước 2 · `Test Data` · `Expected` bước 5 (*"Ô Email phải còn hiển thị giá trị `PM_EMAIL`"*) · dòng 🔧 (`value="<PM_EMAIL>"`). ⚠️ Bug `TC016` đang mở ghi bước tái hiện bằng `Admin` — khi retest (`/retest-fixed-bugs`) dùng PM; **không** sửa bug report cũ |
| `TC_017` · 53 | V2 · Validation · V3 · Security | `Pre-Condition` · `Test Data` biến thể `b` |
| `TC_047` · 136 | V2 · BVA · V3 · Security | `Pre-Condition` · `Test Steps` bước 1 · `Test Data` |
| `TC_050` · 148 | V4 · Compatibility | `Test Steps` bước 3, 5 · `Test Data` — đổi **cả** lượt đăng nhập đúng sang `PM_EMAIL` / `PM_PASSWORD`, để lượt đúng ở bước 3 đặt lại bộ đếm của chính tài khoản bị gửi sai ở bước 5 |
| `TC_053` · 165 | V2 · Validation (Checkbox) | `Pre-Condition` · `Test Data` biến thể `a` **và** `b` — bỏ trống mật khẩu cũng là lần sai (`AMB-LOGIN-22` ✅) |
| `TC_011` · 47 | V2 · Required | `Pre-Condition` · `Test Data` biến thể `c` *(thêm 30-09-2026)* |
| `TC_025` · 72 | V3 · Security | `Pre-Condition` · `Test Steps` bước 2 · `Test Data` → `PM_EMAIL` + `PM_PASSWORD`. Hai biến thể = 2 lần sai *(thêm 30-09-2026)* |
| `TC_043` · 121 | V2 · UI Behavior | `Pre-Condition` · `Test Data` biến thể `b` *(thêm 30-09-2026)* |

### 2.5. Ghi chú đầu Nhóm C — dòng 41 · ⚠️ SỬA

Thay dòng *"🔓 Thử sai mật khẩu lặp lại là an toàn — `REQ-LOGIN-41` đã chốt hệ thống không có cơ chế khoá tài khoản…"* bằng:

> 🔐 **Gửi mật khẩu sai KHÔNG còn an toàn** (`CRM-LOGIN-101`): 5 lần sai liên tiếp cùng email → khoá 15 phút. Lượt gửi mật khẩu sai với tài khoản có thật **chỉ** dùng `PM_EMAIL`, **không bao giờ** `admin@example.com`; mở đầu TC bằng một lần đăng nhập đúng PM để bộ đếm = 0. Chỉ cần thông báo lỗi thì dùng email không tồn tại. `TC_015` khoá tài khoản PM — chạy cuối đợt, tuần tự.

### 2.6. Theo dõi — KHÔNG sửa lúc này

| TC | Vì sao chạm | Vì sao chưa sửa |
|---|---|---|
| `TC_014` | 1 lần sai với tài khoản staff `TC014_EMAIL` | Không phải `Admin`, không vi phạm ràng buộc |
| `TC_019` | Email `Customer` gửi vào `/admin` | `AMB-LOGIN-21` ✅: xử lý như email không tồn tại, không khoá; TC chỉ gửi 1 lần |
| `TC_010` · `TC_040` · `TC_041` | Dùng `Admin` với mật khẩu **đúng** | Lần đăng nhập đúng đặt lại bộ đếm, không gây khoá |
| `TC_012`-`e` | Email `admin@example.com' OR '1'='1` | Trình duyệt chặn vì sai định dạng — không có request nào tới máy chủ |

---

## 3. Cập nhật index `TEST_CASES_LOGIN_SUMMARY.md` (Mode APPLY)

| Mục | Thay đổi |
|---|---|
| Tiêu đề · bảng thông tin | 57 → **58** TC · dải `001`→`058` · mã kế tiếp `059` · nguồn requirement **61 REQ, 57 trong phạm vi** · dòng *Tài khoản* thêm ràng buộc gửi mật khẩu sai chỉ bằng PM |
| Bản đồ tài liệu | Web 58 TC · `001`–`058` · REQ bao phủ ghi rõ *"40/57 REQ trong phạm vi — 17 REQ ⚪ chờ sinh TC"* |
| Assumptions | **Không thêm ASM nào** — mọi ambiguity của đợt đã có kết luận 30-09-2026 |
| Bảng Đối Soát Coverage | `REQ-LOGIN-41`: đổi mô tả → *"Khoá sau 5 lần sai liên tiếp"*, TC `TC_015`, **`TC_058`** · `REQ-LOGIN-15`: ghi *"chỉ đảm bảo 4 lần sai đầu"* · ➕ 17 dòng `REQ-LOGIN-45` → `61`: *⚪ chưa có TC — ngoài phạm vi DELTA*, kèm command · Kết luận: **40/57** REQ trong phạm vi có TC |
| Bảng Đối Soát Evidence · Vùng chưa có evidence | ➕ dòng *"Trang đăng nhập — tài khoản đang bị khoá"* → `TC_015`: **không có ảnh**, tính năng chưa deploy |
| Đối soát cột Automation | `Yes` 46 → 46 (`TC_015` rời, `TC_058` vào) · `Partial` 8 → **9** (+ `TC_015`, điều kiện *tài khoản PM riêng*) · ➕ dòng **⏸️ Hoãn**: `TC_015` tới khi `AMB-LOGIN-27` xác nhận deploy |
| Bảng 4 vòng | Xem mục 5 |
| ISO 25010 | *Security*: thêm `TC_015`, `TC_058` (chống dò mật khẩu một tài khoản) |
| Bộ chạy đề xuất | ➕ bộ **"Khoá tài khoản — chạy cuối đợt, tuần tự"**: `TC_015` (sau khi deploy). Regression 55 → **56** (+`TC_058`). `@NeedsVerify` 3 → **4** (+`TC_015`) |
| Nhật ký thay đổi | 1 dòng mỗi TC bị sửa + mốc git `web/test_cases_login_web.md @ <hash>` |
| `docs/testcases/README.md` | Số TC `LOGIN` 57 → 58 · REQ bao phủ 40/57 · ngày 30-09-2026 |

---

## 4. File `delta_tc_CRM-LOGIN-101.md` sẽ ghi ở APPLY

Dự kiến **11** dòng TC, cùng nền tảng `web`: `TC_015` ✏️ · `TC_058` ➕ · `TC_013` ✏️ · `TC_016` ✏️ · `TC_017` ✏️ · `TC_047` ✏️ · `TC_050` ✏️ · `TC_053` ✏️ · `TC_011` ✏️ · `TC_025` ✏️ · `TC_043` ✏️ · ghi chú Nhóm C (không phải TC — ghi ở phần chú thích). Hiện **chưa có script automation** nào mang `CRM_LOGIN_TC_` trong repo → `/update-automation-from-impact` sẽ không có gì để sửa; ghi rõ trong file.

---

## 5. Bảng 4 vòng — thay đổi dự kiến (chỉ nhánh bị chạm)

| Vòng | Nhánh | Hiện tại | Sau APPLY |
|---|---|---|---|
| 2 | Business Rule | ✅ TC_013, TC_015, TC_019 | ✅ không đổi TC ID — `TC_015` nay kiểm quy tắc **khoá** thay vì **không khoá** |
| 2 | Boundary Value Analysis | ✅ 6 TC · 12 biến thể | ✅ **7 TC · 12 biến thể** (+ `TC_058` — biên 4/5 lần sai, một bộ dữ liệu, không có Bảng biến thể) |
| 2 | **Decision Table** | ➖ *"không có tổ hợp từ 3 điều kiện trở lên"* | 🔴 **Thiếu** — ticket tạo đúng tổ hợp 3 điều kiện: *email có tồn tại* × *đã đủ 5 lần sai* × *mật khẩu lần này đúng* → 4 kết quả (`Dashboard` · `Invalid email or password` · `Your account is locked…` · `Email không tồn tại`). Sau trả lời 30-09-2026 còn thêm 2 điều kiện ảnh hưởng: *loại lần sai* (sai mật khẩu / bỏ trống / CSRF sai — `REQ-54`, `55`) và *cách viết email* (`REQ-56`). Các ô bảng thuộc `REQ-LOGIN-45`, `46`, `52`, `54`, `55`, `56`, `61` → lấp ở lượt BỔ SUNG |
| 2 | **State Transition** | ➖ *"chỉ có 2 trạng thái"* | 🔴 **Thiếu một phần** — nay có 3 trạng thái (chưa đăng nhập · đã đăng nhập · **bị khoá**). `TC_015` phủ *chưa đăng nhập → bị khoá*, `TC_058` phủ *không chuyển ở lần 4*. Chuyển *bị khoá → mở khoá* (`REQ-47`, `57`), *bị khoá + mật khẩu đúng* (`REQ-46`) và chuỗi trạng thái riêng của email không tồn tại — *chờ 1 phút* (lần 5 → 9) → *chờ 15 phút* (lần 10) → *vòng mới* (`REQ-53`, `58`, `59`) → lượt BỔ SUNG |
| 2 | EP · Validation · Error Guessing | ✅ | ✅ không đổi TC ID / số biến thể — chỉ đổi dữ liệu |
| 3 | Security | ✅ 10 TC | ✅ **12 TC** (+ `TC_015`, `TC_058`) |
| 4 | Compatibility | ✅ TC_050 | ✅ không đổi — chỉ đổi tài khoản |

> ⚠️ Hai dòng 🔴 **không lấp được trong DELTA** vì TC của chúng thuộc REQ ⚪ mới (ngoài phạm vi). APPLY sẽ kết thúc ở trạng thái **⚠️ CÒN VIỆC NGOÀI PHẠM VI**, và lượt BỔ SUNG phải lập Bảng quyết định + bảng chuyển trạng thái (skill: *Quy Tắc Bắt Buộc Áp Dụng Kỹ Thuật*).
>
> Tổng dự kiến sau APPLY: **58 TC · 67 biến thể** — `TC_015` mất 2 biến thể (`a`, `b` → một bộ dữ liệu), `TC_058` không có Bảng biến thể: 69 − 2 = 67. ⚠️ **Số biến thể giảm 2 không phải rụng case:** `b` chuyển sang `REQ-LOGIN-50` (mục 7), `a` viết lại thành TC một bộ dữ liệu. Con số chính xác sẽ **đếm lại bằng script** ở APPLY.

---

## 6. Tác động lan toả — 5 câu hỏi của skill

| # | Câu hỏi | Kết quả |
|---|---|---|
| 1 | Ticket đụng thành phần nhìn thấy trên màn hình? | **Không** — không thêm/bớt field, không đổi nhãn, vị trí hay giá trị mặc định. Thông báo mới chỉ xuất hiện **sau** hành động → V2. `V1 · UI cơ bản` không đổi là **đúng**, không phải bỏ sót |
| 2 | Field đổi thành bắt buộc → TC khác fail ở bước phụ? | Không có field nào đổi. Nhưng có dạng lan toả tương đương: **bộ đếm lần sai** là trạng thái dùng chung giữa các TC → 5 TC ở mục 2.4 |
| 3 | TC vừa Deprecated → TC nào lấy làm precondition? | Không có TC nào Deprecated. Không TC nào lấy `TC_015` làm precondition |
| 4 | Field mới → đối soát bảng 15 loại? | Không có field mới |
| 5 | Vượt ngưỡng tách `parts/`? | File đang **57 TC > 50** (ngưỡng độ hạt GỘP), đã có quyết định user 19-09-2026 giữ 1 file. APPLY lên **58**. ⚠️ Lượt BỔ SUNG ~15–18 TC cho `REQ-45`→`61` sẽ đưa lên **~73–76** → **đề nghị tách `parts/` ở lượt BỔ SUNG**, cắt tại ranh giới nhóm (VD Nhóm C + nhóm khoá tài khoản mới thành một part) |

---

## 7. Ngoài phạm vi DELTA

| REQ | Việc còn lại | Command |
|---|---|---|
| `REQ-LOGIN-45` → `61` (17 REQ ⚪) | Chưa có TC. Gắn skip — PO xác nhận **chưa deploy**. Lập **Bảng quyết định** + **bảng chuyển trạng thái** (kể cả chuỗi chờ 1 phút / 15 phút của email không tồn tại). `REQ-LOGIN-50` dùng lại nội dung biến thể `b` cũ của `TC_015`. `REQ-53`, `58`, `59` chấm qua hệ quả (`AMB-LOGIN-31` ✅). `REQ-52` **không** sinh biến thể email `Customer` (ngoài phạm vi — quyết định user 30-09-2026). `REQ-49`, `50` cần tài khoản staff thứ hai — **chưa có** | `/generate-testcases-from-requirements` — rẽ nhánh **BỔ SUNG**, TC ID nối tiếp từ `059` |
| Thực thi `TC_015` | Chưa chạy được | Chờ deploy (`AMB-LOGIN-27` ✅: chưa deploy). Dùng PM chung (`AMB-LOGIN-28` ✅) — chạy tuần tự, cuối đợt |

---

## 8. Cần quyết trước khi APPLY

| # | Câu hỏi | Đề xuất |
|---|---|---|
| 1 | Đổi `admin@example.com` → `PM_EMAIL` ở lượt gửi mật khẩu sai của **5 TC lan toả** (`016`, `017`, `047`, `050`, `053`)? Ràng buộc ticket dòng 6 nói về "TC" nói chung, không chỉ TC khoá tài khoản | ✅ Đồng ý — không đổi thì một lượt regression đủ khoá `Admin` |
| 2 | Tách biến thể `b` (không khoá theo IP) khỏi `TC_015`, chuyển sang lượt sinh TC cho `REQ-LOGIN-50`? | ✅ Đồng ý — giữ lại là gộp hai loại phản hồi |
| 3 | Thêm `TC_058` (biên 4 lần) ngay trong DELTA? | ✅ Đồng ý — TC biên thuộc REQ 🟡, nằm trong phạm vi |
| 4 | `TC_015` gắn `@NeedsVerify` + `Automation = Partial` + ⏸️ Hoãn tới khi deploy? | ✅ Đồng ý |
| 5 | Chấp nhận APPLY kết thúc ở **⚠️ CÒN VIỆC NGOÀI PHẠM VI** với 2 nhánh 🔴 (Decision Table, State Transition) chờ lượt BỔ SUNG? | ✅ Đồng ý, và chạy BỔ SUNG ngay sau |
