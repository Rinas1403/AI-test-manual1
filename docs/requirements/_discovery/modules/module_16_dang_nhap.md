# Module 16 — Đăng nhập & Phiên làm việc

← [Bản đồ hệ thống](../system_map.md) · Trạng thái recon xem [danh mục](../../README.md)

Bao phủ 1 module: **Đăng nhập & Phiên làm việc** (`LOGIN`)

> 📌 Module này được **bổ sung bằng Mode ADD** sau khi người dùng chỉ ra là bản đồ bị thiếu. Đánh số `16` vì là file thêm sau; **không** đánh lại số các file cũ để không gãy link. Về **thứ tự khảo sát** thì module này đứng **đầu tiên** — xem mục 6 của index.

---

## Vì sao lần crawl đầu bỏ sót module này

Ghi lại để lần sau không lặp lại:

| Nguyên nhân | Chi tiết |
|---|---|
| **Crawl trên phiên đã đăng nhập** | Cookie phiên còn hiệu lực nên `/admin/authentication` **chuyển hướng thẳng vào Dashboard**. Màn hình đăng nhập không bao giờ xuất hiện |
| **Không nằm trong menu** | Sidebar và header chỉ tồn tại **sau khi** đã đăng nhập. Crawl menu về nguyên tắc **không thể** phát hiện được màn hình đăng nhập |
| Không có link trỏ tới | Không trang nội bộ nào liên kết tới form đăng nhập |

**Bài học:** crawl điều hướng không bao giờ tìm ra màn hình chỉ tồn tại ở trạng thái **chưa đăng nhập**. Phải chủ động đăng xuất rồi khảo sát lại — đây là bước bắt buộc khi lập bản đồ hệ thống có xác thực.

---

## LOGIN — Đăng nhập & Phiên làm việc

| Mục | Giá trị |
|---|---|
| Tên trên UI | Login |
| Route chính | `/admin/authentication` |
| Route liên quan | `/admin/authentication/forgot_password` · `/admin/authentication/logout` · `/admin/access_denied` |
| Loại màn hình | Form xác thực (không có layout admin, không sidebar) |
| Vị trí menu | ⚠️ **Không nằm trong menu nào** — chỉ thấy khi chưa đăng nhập |
| CRUD | ❌ Không phải entity — là luồng xác thực |

### Các màn hình / luồng thuộc module

| Luồng | Route | Trạng thái khảo sát |
|---|---|---|
| Đăng nhập | `/admin/authentication` | ✅ Đã mở, đã đọc DOM |
| Quên mật khẩu | `/admin/authentication/forgot_password` | ✅ Đã mở, đã đọc DOM |
| Đăng xuất | `/admin/authentication/logout` | ✅ Đã kiểm chứng — chuyển về trang đăng nhập |
| Đặt lại mật khẩu qua email | *(chưa rõ route)* | ❌ Chưa khảo sát — cần truy cập hộp thư |
| Chặn truy cập khi chưa đăng nhập | mọi route `/admin/*` | ✅ Đã kiểm chứng — chuyển hướng về `/admin/authentication` |
| Cảnh báo hết phiên | template `#timers-logout-template-warning` | ⚠️ Phát hiện trong DOM, **chưa kích hoạt được** |

### Cấu trúc form đăng nhập — đã đọc DOM

| Field | `id` | `name` | `type` | Thuộc tính |
|---|---|---|---|---|
| *(ẩn)* | — | `csrf_token_name` | `hidden` | Token CSRF |
| Email Address | `email` | `email` | `email` | `autofocus` |
| Password | `password` | `password` | `password` | — |
| Remember me | `remember` | `remember` | `checkbox` | — |

- `form action` = `https://crm.anhtester.com/admin/authentication` (POST)
- Nút gửi: `button[type=submit]` nhãn **Login**
- Link: **Forgot Password?** → `/admin/authentication/forgot_password`

#### 🔎 Phát hiện đáng chú ý — không field nào có `required`

Không input nào mang thuộc tính HTML `required`. Nghĩa là **toàn bộ validation nằm ở server**, trình duyệt không chặn gì khi gửi form rỗng.

Hệ quả cho kiểm thử:
- Gửi form rỗng **vẫn tạo request** → phải assert thông báo lỗi từ server, **không** assert thông báo mặc định của trình duyệt
- Không được viết AC dựa trên `checkValidity()` hay popup validation của Chrome — xem luật "chuỗi do trình duyệt sinh không phải hành vi ứng dụng"

### Cấu trúc form quên mật khẩu

| Field | `id` | `name` | `type` |
|---|---|---|---|
| *(ẩn)* | — | `csrf_token_name` | `hidden` |
| Email Address | `email` | `email` | `email` |

- Tiêu đề trang: **Forgot Password**
- Nút gửi: nhãn **Confirm**
- ⚠️ `document.title` của trang này **vẫn là** `Perfex CRM | Anh Tester Demo - Login` — không đổi theo màn hình. Không được dùng tiêu đề trang để phân biệt hai màn hình này

### Vì sao 🔴 Risk cao

| Lý do | Chi tiết |
|---|---|
| **Cổng vào duy nhất** | Hỏng đăng nhập là **toàn bộ 24 module còn lại** không test được. Đây là module có bán kính ảnh hưởng lớn nhất hệ thống |
| **Bề mặt bảo mật** | Là nơi chịu thử tấn công: brute force, SQL injection, XSS, vét email hợp lệ qua thông báo lỗi |
| **Giữ phiên** | Remember me sinh cookie sống lâu — sai là lộ phiên |

### Ước lượng độ lớn

~15 REQ (đăng nhập, quên mật khẩu, đăng xuất, chặn truy cập, giữ phiên).

### ⭐ Module DUY NHẤT đã có automation

Khác 24 module còn lại, module này **đã có bộ automation chạy được** trong chính repo này:

| Tệp | Nội dung |
|---|---|
| `src/pages/LoginPage.ts` | Page Object — locator đã kiểm chứng với DOM thật |
| `src/pages/ForgotPasswordPage.ts` | Page Object màn hình quên mật khẩu |
| `src/pages/DashboardPage.ts` | Page Object sau đăng nhập, có `logout()` |
| `tests/login.spec.ts` | 4 kịch bản: đăng nhập thành công · sai mật khẩu · email không tồn tại · để trống |
| `tests/navigation.spec.ts` | 3 kịch bản: điều hướng quên mật khẩu · remember me · đăng xuất |

**21 test (7 kịch bản × 3 trình duyệt) đang pass.** Khi recon module này, phải **đối chiếu** requirements sinh ra với bộ test đã có — không viết lại từ đầu như thể chưa có gì.

### Thông báo lỗi đã biết (từ bộ test hiện có, cần xác minh lại khi recon)

| Tình huống | Thông báo |
|---|---|
| Sai mật khẩu | `Invalid email or password` |
| Email không tồn tại | `Invalid email or password` |
| Để trống cả hai | `Email Address field is required` + `Password field is required` (2 thông báo `.alert-danger`) |

> ⚠️ Thông báo **giống nhau** cho "sai mật khẩu" và "email không tồn tại" — đây là hành vi **đúng về bảo mật** (không tiết lộ email nào tồn tại). Cần ghi nhận như một yêu cầu có chủ đích, không phải lỗi thiếu chi tiết.

### Vùng chưa xác minh của riêng module này

- Luồng đặt lại mật khẩu qua email — cần truy cập hộp thư của tài khoản test
- Cảnh báo hết phiên: sau bao lâu, thao tác nào gia hạn. Template `#timers-logout-template-warning` nằm sẵn trong DOM ở trạng thái `display:none`
- Cookie của **Remember me**: tên, thời hạn, có thực sự giữ phiên qua lần đóng trình duyệt không
- Có khoá tài khoản sau N lần sai không (**không test trên môi trường dùng chung** — sẽ khoá tài khoản của người khác)
- Có giới hạn tần suất (rate limit) không
- Hành vi khi CSRF token hết hạn / bị sửa

> 🚫 **Cấm test brute force và khoá tài khoản trên môi trường này.** Tài khoản dùng chung với tester khác; khoá là chặn cả lớp học. Những kịch bản đó chỉ chạy trên môi trường riêng.

### Evidence

| Tệp | Chứng minh |
|---|---|
| [`login_form_default_fullpage.png`](../evidence/login_form_default_fullpage.png) | Form đăng nhập: Email Address · Password · Remember me · nút Login · link Forgot Password? |
| [`forgot_password_form_fullpage.png`](../evidence/forgot_password_form_fullpage.png) | Form quên mật khẩu: tiêu đề "Forgot Password", 1 field email, nút Confirm |
| [`settings_access_denied_viewport.png`](../evidence/settings_access_denied_viewport.png) | Trang `access_denied` — đích đến khi không đủ quyền (dùng chung với module `STAFF`) |

---

## 🔁 Đính chính sau khi recon chi tiết (2026-09-14)

Tài liệu module đã phát hành: [`../../login/requirements_login.md`](../../login/requirements_login.md) — **37 REQ**, 7 Story.

Ba điểm hồ sơ khám phá này ghi **sai hoặc thiếu**, giữ lại nguyên văn ở trên để thấy sai ở đâu:

| Chỗ ghi sai | Hồ sơ khám phá ghi | Thực tế đo được | Vì sao sai |
|---|---|---|---|
| `#timers-logout-template-warning` | "Cảnh báo hết phiên · phát hiện trong DOM, chưa kích hoạt được" | **Không liên quan gì tới hết phiên.** Đây là hộp xác nhận `Started tasks timers found! Are you sure you want to logout without stopping the timers?` — hiện khi bấm Logout mà còn bộ đếm giờ công việc đang chạy. Đã kích hoạt được và chụp ảnh | Suy từ **tên** phần tử (`timers-logout`) thay vì đọc nội dung bên trong. Bài học: tên id không phải mô tả chức năng |
| Thông báo lỗi bỏ trống | `Email Address field is required` · `Password field is required` | **`The Email Address field is required.`** · **`The Password field is required.`** — có `The` đứng đầu, có dấu chấm cuối. Thứ tự hiển thị: **Password trước, Email sau** | Chép lại từ bộ automation cũ (vốn dùng so khớp **chứa** nên vẫn xanh) thay vì đọc nguyên văn từ UI |
| Ước lượng độ lớn | ~15 REQ | **37 REQ** | Chưa tính tầng cookie/phiên (11 REQ) và nhóm CSRF (2 REQ) — hai vùng chỉ lộ ra khi đọc kho cookie và thử token hỏng |

Hai vùng chưa xác minh của hồ sơ này **đã được xác minh**:

- **Cookie Remember me:** tên `autologin`, 110 ký tự, hết hạn ≈ 62 ngày, **không** có cờ HttpOnly; một mình nó khôi phục được phiên khi mất `sp_session`, và bị vô hiệu ở máy chủ sau khi đăng xuất → `REQ-LOGIN-18` → `20`, `REQ-LOGIN-24`
- **CSRF token hết hạn / bị sửa:** trang lỗi `419 Page Expired!` (header trả `403`), không tạo được phiên → `REQ-LOGIN-16`, `AMB-15`

Vẫn **chưa** xác minh (chuyển thành AMB ở tầng module): luồng đặt lại mật khẩu qua email (`AMB-18`), thời điểm hết phiên thực tế (`AMB-11`), khoá tài khoản và giới hạn tần suất (`AMB-09`, `AMB-10` — 🚫 cấm thử trên môi trường dùng chung).
