# Tài liệu Yêu cầu — Module `LOGIN` (Đăng nhập & Phiên làm việc)

← [Danh mục requirements](../README.md) · [Bản đồ hệ thống](../_discovery/system_map.md) · [Hồ sơ khám phá module](../_discovery/modules/module_16_dang_nhap.md)

| Mục | Giá trị |
|---|---|
| **Hệ thống** | ANHTESTER CRM — bản demo Perfex CRM, vùng Admin |
| **Module** | Đăng nhập & Phiên làm việc |
| **Prefix** | `LOGIN` (đã cấp ở tầng khám phá — KHÔNG đặt lại) |
| **Route chính** | `/admin/authentication` |
| **Route liên quan** | `/admin/authentication/forgot_password` · `/admin/authentication/logout` |
| **Nguồn phân tích** | UI Recon — khảo sát trực tiếp trên hệ thống đang chạy |
| **Dải mã đã dùng** | `REQ-LOGIN-01` → `REQ-LOGIN-40` · `AMB-09` → `AMB-25` · `RISK-06` → `RISK-10` (đợt 1: UI recon 01→37 · đợt 2: chốt ambiguity `DEC-LOGIN-01` 38→40) |
| **Mã kế tiếp** | Đợt phân tích sau bắt đầu từ `REQ-LOGIN-41` · `AMB-26` · `RISK-11` — **KHÔNG đánh lại từ 01** |
| **Cập nhật gần nhất** | 2026-09-18 · `DEC-LOGIN-01` — chốt toàn bộ 16 ambiguity `AMB-09` → `AMB-24` (14 ✅ đã trả lời · 2 ⏭️ hoãn), sinh `REQ-LOGIN-38` → `40`, mở `AMB-25` |
| **Trình duyệt khảo sát** | Google Chrome **153.0.0.0** (Playwright MCP), viewport `1600×750`. Mọi AC dựa trên thông báo mặc định của trình duyệt **chỉ đúng với trình duyệt này**; mọi kết luận về hiển thị/ẩn **chỉ đúng với viewport này** |
| **Môi trường** | ⚠️ **Dùng chung** — cấm brute force, cấm thử khoá tài khoản, cấm gửi email đặt lại mật khẩu tới tài khoản thật |
| **Ngày khảo sát** | 2026-09-14 |

---

## 1. Tổng quan

Module `LOGIN` là **cổng vào duy nhất** của vùng Admin. Mọi route `/admin/*` đều được bảo vệ bởi module này; hỏng đăng nhập là 24 module còn lại không test được.

Module **không phải một entity nghiệp vụ** — không có CRUD, không có bản ghi. Nó gồm 4 luồng:

1. **Đăng nhập** — xác thực bằng email + mật khẩu
2. **Ghi nhớ đăng nhập** — giữ phiên qua nhiều lần mở trình duyệt bằng cookie `autologin`
3. **Đăng xuất** — huỷ phiên, huỷ token ghi nhớ
4. **Quên mật khẩu** — yêu cầu đặt lại mật khẩu qua email

### Trong phạm vi

- Form đăng nhập, form quên mật khẩu, luồng đăng xuất
- Bảo vệ route khi chưa đăng nhập
- Vòng đời cookie phiên và cookie ghi nhớ
- Bảo vệ CSRF của hai form trên

### Ngoài phạm vi

| Hạng mục | Vì sao |
|---|---|
| Trang đặt lại mật khẩu qua liên kết trong email | Cần môi trường riêng + hộp thư test — **AMB-18 đã chốt hoãn (⏭️) ngày 2026-09-18**, không có trong đợt này. `REQ-LOGIN-36`, `37` giữ ⚪, TC viết trước và đánh `skip` |
| Khoá tài khoản sau N lần sai · giới hạn tần suất | **AMB-09 và AMB-10 đã chốt ngày 2026-09-18: hệ thống KHÔNG có cả hai cơ chế** → không có hành vi nào để đặc tả. Ràng buộc kiểm thử thay thế: mỗi lần chạy suite **tối đa 5 lần sai** cho cùng một tài khoản (xem mục 8) |
| Hiển thị ở viewport hẹp (điện thoại / thanh điều hướng thu gọn) | **AMB-21 đã chốt ngày 2026-09-18**: đợt này chỉ phủ desktop `1600×750`. Mở phạm vi mobile thì phải recon lại và mở ambiguity mới |
| Trang `/admin/access_denied` | Thuộc module `STAFF` (phân quyền), không thuộc luồng xác thực |
| Đăng nhập của cổng User/Customer | Hệ thống thứ hai — xem `AMB-05` ở tầng khám phá |

### Bản đồ phủ tài liệu

**Không có tài liệu nào được cung cấp cho module này** — toàn bộ 37 REQ sinh từ khảo sát UI thực tế và đọc DOM / cookie / network.

### ⭐ Đối chiếu với automation đã có

Module này là module **duy nhất** đã có automation trong repo (`tests/login.spec.ts`, `tests/navigation.spec.ts` — 7 kịch bản × 3 trình duyệt). Kết quả đối chiếu:

| Nội dung | Bộ test hiện có | Thực tế đo được hôm nay | Xử lý |
|---|---|---|---|
| Thông báo bỏ trống | `Email Address field is required` | **`The Email Address field is required.`** (có `The`, có dấu chấm) | Test vẫn xanh vì dùng `filter({hasText})` — so khớp **chứa**. Ghi nguyên văn vào mục 4 |
| Thứ tự 2 thông báo | Không khẳng định thứ tự | **Password đứng trước Email** | Ghi vào `REQ-LOGIN-09` |
| `Invalid email or password` | `toHaveText` khớp tuyệt đối | Khớp — không có dấu chấm cuối | Giữ nguyên |
| Remember me | Chỉ assert ô được tích + vào được Dashboard | **Chưa kiểm chứng cookie `autologin` có sinh ra và có dùng được không** | `REQ-LOGIN-18`, `REQ-LOGIN-19` là phần bộ test đang thiếu |
| Đăng xuất | Đi qua menu hồ sơ | Đúng, **nhưng** nhánh hộp thoại cảnh báo timer chưa được cover | `REQ-LOGIN-23` là phần đang thiếu |

---

## 2. Yêu cầu Chức năng

> Cột `Nguồn`: `Kiểm chứng thực tế` = đã tương tác và xác nhận trên UI · `Đọc DOM` = đọc bằng `browser_evaluate`, có số liệu trong AC · `Đọc cookie` = đọc kho cookie của trình duyệt · `Quan sát network` = đọc request do UI tự phát sinh.
>
> 🚫 Không REQ nào sinh từ việc gọi API trực tiếp — toàn bộ request đều do thao tác trên UI tạo ra.

### 2.1. Truy cập màn hình đăng nhập & bảo vệ route

| REQ ID | Tên yêu cầu | Mô tả | Acceptance Criteria | Trạng thái | Cập nhật lần cuối | Nguồn |
|---|---|---|---|---|---|---|
| REQ-LOGIN-01 | Hiển thị form đăng nhập cho khách chưa đăng nhập | Khách truy cập `/admin/authentication` thấy form đăng nhập đầy đủ | Trang có tiêu đề hiển thị `Login`; form `method=post`, `action` = `/admin/authentication`; chứa đúng 3 điều khiển nhập (`#email`, `#password`, `#remember`) + nút submit nhãn `Login` + link `Forgot Password?` | 🟢 | — | Kiểm chứng thực tế · Đọc DOM |
| REQ-LOGIN-02 | Chặn truy cập route nghiệp vụ khi chưa đăng nhập | Mọi route `/admin/*` yêu cầu phiên hợp lệ | Xoá sạch cookie → mở `/admin/clients` → trình duyệt dừng ở `/admin/authentication`, tiêu đề trang **chứa** `Login`. Điểm dừng là căn cứ assert; **không** assert mã chuyển hướng (xem AMB-14) | 🟢 | — | Kiểm chứng thực tế · Quan sát network |
| REQ-LOGIN-03 | Không khôi phục URL yêu cầu ban đầu sau khi đăng nhập | Bị chặn ở một route rồi đăng nhập thì hệ thống đưa về Dashboard, không quay lại route cũ | Bị chặn tại `/admin/clients` → đăng nhập đúng → đích đến là Dashboard (`document.title` = `Dashboard`), **không** phải `/admin/clients`. URL chặn không mang tham số truy vấn nào (`searchParams` rỗng) | 🟢 | — | Kiểm chứng thực tế |
| REQ-LOGIN-04 | Người đã đăng nhập mở trang đăng nhập thì vào thẳng Dashboard | Không cho xem lại form đăng nhập khi phiên còn hiệu lực | Đang có phiên hợp lệ → mở `/admin/authentication` → điểm dừng là Dashboard (`document.title` = `Dashboard`) | 🟢 | — | Kiểm chứng thực tế · Quan sát network |

### 2.2. Xác thực thông tin đăng nhập

| REQ ID | Tên yêu cầu | Mô tả | Acceptance Criteria | Trạng thái | Cập nhật lần cuối | Nguồn |
|---|---|---|---|---|---|---|
| REQ-LOGIN-05 | Đăng nhập thành công với email và mật khẩu đúng | Người dùng hợp lệ vào được vùng Admin | Nhập email + mật khẩu đúng → submit → điểm dừng là Dashboard: `document.title` = `Dashboard`, thanh điều hướng trái `#side-menu` hiển thị. ⚠️ Đích đến quan sát được ở **cả hai dạng** `/admin/` và `/admin` — AC dùng **chứa** `/admin`, **cấm** so khớp tuyệt đối dấu `/` cuối | 🟢 | — | Kiểm chứng thực tế |
| REQ-LOGIN-06 | Email không phân biệt chữ hoa chữ thường | Cùng một tài khoản đăng nhập được dù gõ hoa hay thường | Nhập email **viết HOA toàn bộ** + mật khẩu đúng → đăng nhập thành công, không có phần tử `.alert-danger` nào | 🟢 | — | Kiểm chứng thực tế |
| REQ-LOGIN-07 | Sai mật khẩu bị từ chối | Email tồn tại nhưng mật khẩu sai thì không vào được | Email đúng + mật khẩu sai → vẫn ở `/admin/authentication`, hiện đúng **1** phần tử `.alert-danger` nội dung nguyên văn `Invalid email or password` | 🟢 | — | Kiểm chứng thực tế |
| REQ-LOGIN-08 | Email không tồn tại nhận **cùng** thông báo với sai mật khẩu | Không tiết lộ email nào có trong hệ thống — hành vi bảo mật có chủ đích | Email không tồn tại + mật khẩu bất kỳ → hiện đúng **1** `.alert-danger` nội dung nguyên văn `Invalid email or password`, **giống hệt** REQ-LOGIN-07 | 🟢 | — | Kiểm chứng thực tế |

### 2.3. Kiểm tra dữ liệu nhập của form đăng nhập

| REQ ID | Tên yêu cầu | Mô tả | Acceptance Criteria | Trạng thái | Cập nhật lần cuối | Nguồn |
|---|---|---|---|---|---|---|
| REQ-LOGIN-09 | Bỏ trống cả hai trường sinh 2 thông báo, Password trước Email | Máy chủ kiểm tra và báo lỗi cho từng trường | Submit form rỗng → phát sinh **1 request POST** tới `/admin/authentication` → trang hiện đúng **2** phần tử `.alert-danger`, theo thứ tự trong DOM: (1) `The Password field is required.` (2) `The Email Address field is required.` | 🟢 | — | Kiểm chứng thực tế · Quan sát network |
| REQ-LOGIN-10 | Bỏ trống riêng mật khẩu chỉ báo lỗi mật khẩu | Thông báo đúng trường thiếu, không báo thừa | Nhập email hợp lệ, để trống mật khẩu → submit → hiện đúng **1** `.alert-danger` nội dung `The Password field is required.` | 🟢 | — | Kiểm chứng thực tế |
| REQ-LOGIN-11 | Bỏ trống riêng email chỉ báo lỗi email | Thông báo đúng trường thiếu, không báo thừa | Nhập mật khẩu bất kỳ, để trống email → submit → hiện đúng **1** `.alert-danger` nội dung `The Email Address field is required.` | 🟢 | — | Kiểm chứng thực tế |
| REQ-LOGIN-12 | Email sai định dạng bị trình duyệt chặn trước khi gửi | Ô email là `type="email"` nên trình duyệt tự chặn | Nhập `abc` vào email + mật khẩu bất kỳ → bấm Login → `document.querySelector('#email').checkValidity()` trả `false` và **không phát sinh thêm request POST nào** (số POST không tăng). 🚫 **CẤM assert chuỗi thông báo của trình duyệt** — chuỗi quan sát được trên Chrome 153 là `Please include an '@' in the email address. 'abc' is missing an '@'.`, đổi theo trình duyệt và ngôn ngữ hệ điều hành | 🟢 | — | Kiểm chứng thực tế · Đọc DOM |
| REQ-LOGIN-13 | Máy chủ không trả lại giá trị email đã nhập sau khi đăng nhập lỗi | HTML render lại **không** mang thuộc tính `value` cho ô email | Sau mỗi lần submit lỗi (thiếu trường hoặc sai thông tin), phần tử `#email` **không có thuộc tính** `value` (`hasAttribute('value') === false`). 🚫 **CẤM assert "ô email rỗng trên màn hình"** — trình duyệt có thể tự điền lại bằng autofill, người dùng vẫn thấy chữ | 🟢 | — | Đọc DOM |
| REQ-LOGIN-14 | Toàn bộ kiểm tra dữ liệu nằm ở máy chủ | Không input nào mang thuộc tính HTML `required` | Đọc DOM form đăng nhập: `#email`, `#password`, `#remember` đều có `hasAttribute('required') === false`; form **không** có `novalidate`. Hệ quả: gửi form rỗng **vẫn tạo request**, phải assert thông báo của máy chủ chứ không phải popup của trình duyệt | 🟢 | — | Đọc DOM |

### 2.4. Bảo vệ CSRF

| REQ ID | Tên yêu cầu | Mô tả | Acceptance Criteria | Trạng thái | Cập nhật lần cuối | Nguồn |
|---|---|---|---|---|---|---|
| REQ-LOGIN-15 | Hai form xác thực đều mang token CSRF ẩn | Form đăng nhập và form quên mật khẩu cùng cơ chế | Mỗi form chứa 1 `input[type=hidden][name="csrf_token_name"]`, giá trị có **hình thái 32 ký tự hex**. Cookie đi kèm tên `csrf_cookie_name`, cũng 32 ký tự hex. 🚫 AC **không** được chép giá trị token cụ thể | 🟢 | — | Đọc DOM · Đọc cookie |
| REQ-LOGIN-16 | Token CSRF sai thì từ chối đăng nhập và không tạo phiên | Dù email/mật khẩu đúng, token hỏng vẫn không vào được | Sửa giá trị ô ẩn `csrf_token_name` thành chuỗi bất kỳ rồi submit với thông tin đăng nhập **đúng** → trang kết quả hiển thị nguyên văn `419 Page Expired!` và `Sorry, the page has expired, return to previous page and refresh to continue.`; sau đó mở `/admin/` vẫn bị đưa về trang đăng nhập (không có phiên). ⚠️ **Cấm assert mã HTTP** ở REQ này: header trả `403` trong khi nội dung ghi `419` — xem AMB-15 | 🟢 | — | Kiểm chứng thực tế · Quan sát network |

### 2.5. Ghi nhớ đăng nhập (Remember me)

| REQ ID | Tên yêu cầu | Mô tả | Acceptance Criteria | Trạng thái | Cập nhật lần cuối | Nguồn |
|---|---|---|---|---|---|---|
| REQ-LOGIN-17 | Không tích Remember me thì không sinh cookie ghi nhớ | Trạng thái nền để so sánh | (1) Xoá sạch cookie → (2) xác nhận số cookie = **0** → (3) đăng nhập đúng **không** tích Remember me → (4) danh sách cookie chỉ gồm `csrf_cookie_name` và `sp_session`, **không** có `autologin` | 🟢 | — | Đọc cookie |
| REQ-LOGIN-18 | Tích Remember me sinh cookie `autologin` sống dài ngày | Tác tạo được tạo ra đúng hình thái | (1) Xoá sạch cookie → (2) xác nhận số cookie = **0** → (3) đăng nhập đúng **có** tích Remember me → (4) xuất hiện thêm cookie tên `autologin`: độ dài **110 ký tự**, ký tự an-toàn-URL, `secure = true`, `sameSite = Lax`, hết hạn **≈ 62 ngày** kể từ lúc tạo. AC ghi **hình thái**, cấm chép giá trị | 🟢 | — | Đọc cookie |
| REQ-LOGIN-19 | Cookie `autologin` khôi phục được phiên khi mất cookie phiên | Tác tạo **dùng được** đúng mục đích, không chỉ tồn tại | Đang đăng nhập có ghi nhớ → xoá riêng cookie `sp_session`, giữ `autologin` → mở `/admin/` → vào thẳng Dashboard (`document.title` = `Dashboard`) và hệ thống cấp lại `sp_session` mới. **Phép thử đối chứng bắt buộc:** làm lại đúng các bước trên nhưng xoá cả `autologin` → bị đưa về trang đăng nhập. Thiếu phép đối chứng thì không chứng minh được là nhờ `autologin` | 🟢 | — | Kiểm chứng thực tế · Đọc cookie |
| REQ-LOGIN-20 | Cookie `autologin` **không** đặt cờ HttpOnly | Ghi nhận hiện trạng — JavaScript của trang đọc được cookie này | Đọc thuộc tính cookie `autologin`: `httpOnly === false`. Đối chiếu: `sp_session` và `csrf_cookie_name` đều có `httpOnly === true`. 🔖 **AMB-12 đã chốt 2026-09-18: đây là khiếm khuyết, không phải thiết kế.** REQ này **chỉ còn vai trò ghi nhận hiện trạng**; hành vi đúng nằm ở `REQ-LOGIN-38`. TC của REQ này phải gắn nhãn `defect-documented` và sẽ **đảo nghĩa** khi có bản vá. Xem RISK-06 | 🟡 | 2026-09-18 · DEC-LOGIN-01 | Đọc cookie · Quyết định AMB-12 |
| REQ-LOGIN-21 | Ô Remember me gửi giá trị `estimate` | Giá trị lạ của template — automation phải biết để chọn đúng | Đọc DOM: `#remember` là `input[type=checkbox][name="remember"]`, thuộc tính `value` = `estimate`, mặc định **không** được tích (`checked === false`). **AMB-22 đã chốt 2026-09-18:** giá trị là rác của template, automation **tích ô** chứ không đặt giá trị bằng tay | 🟢 | — | Đọc DOM |
| REQ-LOGIN-38 | Cookie `autologin` phải đặt cờ HttpOnly | Cookie ghi nhớ đăng nhập không được để JavaScript đọc — ngang mức bảo vệ với cookie phiên | Đăng nhập có tích Remember me → cookie `autologin` có `httpOnly === true`, ngang bằng `sp_session` và `csrf_cookie_name`. ⚠️ **Hệ thống hiện KHÔNG đạt** — `REQ-LOGIN-20` ghi nhận hiện trạng `httpOnly === false`. TC viết trước và đánh `skip` cho tới khi có bản vá; chưa có lịch sửa (AMB-25) | ⚪ | 2026-09-18 · DEC-LOGIN-01 | Quyết định AMB-12 |

### 2.6. Đăng xuất & vòng đời phiên

| REQ ID | Tên yêu cầu | Mô tả | Acceptance Criteria | Trạng thái | Cập nhật lần cuối | Nguồn |
|---|---|---|---|---|---|---|
| REQ-LOGIN-22 | Đăng xuất từ menu hồ sơ ở góc phải header | Lối đăng xuất người dùng thật sự dùng được | Bấm `li.header-user-profile > a.dropdown-toggle` → menu mở (thẻ `li` cha nhận class `open`, `ul.dropdown-menu` có `offsetParent !== null`, kích thước `160×170`) → bấm mục `Logout` → kết thúc ở `/admin/authentication`. ⚠️ Menu có **5 mục con trực tiếp** nhưng **32 thẻ `li` lồng bên trong** (submenu Ngôn ngữ) — locator **bắt buộc** dùng dấu `>`: `ul.dropdown-menu > li.header-logout`; dùng `li:last-child` sẽ trỏ nhầm vào một ngôn ngữ | 🟢 | — | Kiểm chứng thực tế · Đọc DOM |
| REQ-LOGIN-23 | Còn bộ đếm giờ công việc đang chạy thì hỏi lại trước khi đăng xuất | Tránh mất giờ công đã bấm | Khi `.started-timers-top li.timer` có ít nhất 1 phần tử, bấm Logout → hiện hộp thoại `#system-popup` chứa nguyên văn `Started tasks timers found!` và `Are you sure you want to logout without stopping the timers?`, kèm 1 nút `Logout` (đỏ) và 1 nút đóng. Chỉ khi bấm nút `Logout` trong hộp thoại mới thực sự đăng xuất. ⚠️ Hộp thoại là `position: fixed` nên `offsetParent === null` — **cấm** dùng `offsetParent` để kết luận nó ẩn; căn cứ đúng là nó phủ kín viewport `1600×750` và chặn thao tác lên phần tử bên dưới | 🟢 | — | Kiểm chứng thực tế · Đọc DOM |
| REQ-LOGIN-24 | Đăng xuất vô hiệu hoá token ghi nhớ ở phía máy chủ | Đăng xuất phải cắt cả phiên dài hạn | Đăng nhập có ghi nhớ → đăng xuất → cookie `autologin` **vẫn còn trong trình duyệt** (độ dài 110 ký tự) nhưng khi xoá `sp_session` rồi mở `/admin/` thì **bị đưa về trang đăng nhập**. Nghĩa là token đã chết ở máy chủ, cookie chỉ còn là rác. Xem AMB-13 | 🟢 | — | Kiểm chứng thực tế · Đọc cookie |
| REQ-LOGIN-25 | Sau khi đăng xuất không truy cập lại được vùng Admin | Phiên bị huỷ thật | Đăng xuất → mở `/admin/` → kết thúc ở `/admin/authentication`, tiêu đề trang **chứa** `Login` | 🟢 | — | Kiểm chứng thực tế |
| REQ-LOGIN-26 | Cookie phiên `sp_session` đặt đủ 3 cờ an toàn | Cookie phiên không đọc được bằng JS, chỉ đi qua HTTPS | Cookie `sp_session`: độ dài **40 ký tự hex**, `httpOnly = true`, `secure = true`, `sameSite = Lax`, hết hạn **≈ 8 giờ**. ⚠️ Cookie này **cũng được cấp cho khách chưa đăng nhập** — sự tồn tại của `sp_session` **không** chứng minh đã đăng nhập, cấm dùng làm căn cứ assert trạng thái đăng nhập | 🟢 | — | Đọc cookie |
| REQ-LOGIN-27 | Cookie `csrf_cookie_name` đặt đủ 3 cờ an toàn | Cặp cookie–token của cơ chế CSRF | Cookie `csrf_cookie_name`: độ dài **32 ký tự hex**, `httpOnly = true`, `secure = true`, `sameSite = Lax`, hết hạn **≈ 1 giờ** | 🟢 | — | Đọc cookie |
| REQ-LOGIN-28 | Lối đăng xuất thứ hai trong thanh điều hướng thu gọn không dùng được ở màn hình rộng | DOM có 2 mục Logout, chỉ 1 mục thao tác được | Ở viewport `1600×750`: đếm được **2** phần tử `li.header-logout`; phần tử nằm trong `.mobile-navbar.collapse` có `offsetParent === null`, kích thước `0×0`, tổ tiên `.mobile-navbar` mang `display: none` → **không thao tác được**. Cả hai mục đều gọi cùng hàm `logout()`, `href="#"` (không phải liên kết trực tiếp). ⚠️ Kết luận này **chỉ đúng với viewport đã đo**. **AMB-21 đã chốt 2026-09-18:** đợt kiểm thử này chỉ phủ desktop `1600×750`; viewport hẹp nằm ngoài phạm vi, không suy diễn thay | 🟢 | 2026-09-18 · DEC-LOGIN-01 (✏️ biên tập, không đổi hành vi) | Đọc DOM |
| REQ-LOGIN-40 | Phiên hết hiệu lực sau ≈ 8 giờ không thao tác, không có cảnh báo trước | Vòng đời tối đa của phiên bằng đúng hạn cookie `sp_session` | Đăng nhập **không** tích Remember me → để yên quá hạn cookie `sp_session` (≈ **8 giờ**) → mở `/admin/` bị đưa về `/admin/authentication`. Trước thời điểm đó **không** có hộp thoại hay bộ đếm ngược cảnh báo nào (đã tìm, không thấy cơ chế đếm giờ phía trình duyệt). ⚠️ **Không kiểm được trong một lần chạy suite thường** — cần chờ hết hạn hoặc giả lập thời gian; TC viết trước và đánh `skip` | ⚪ | 2026-09-18 · DEC-LOGIN-01 | Quyết định AMB-11 |

### 2.7. Quên mật khẩu

| REQ ID | Tên yêu cầu | Mô tả | Acceptance Criteria | Trạng thái | Cập nhật lần cuối | Nguồn |
|---|---|---|---|---|---|---|
| REQ-LOGIN-29 | Link Forgot Password? mở được trang quên mật khẩu | Điểm vào duy nhất của luồng quên mật khẩu | Ở form đăng nhập, bấm link nhãn `Forgot Password?` → điểm dừng là `/admin/authentication/forgot_password`, trang có tiêu đề hiển thị `Forgot Password` | 🟢 | — | Kiểm chứng thực tế |
| REQ-LOGIN-30 | Form quên mật khẩu chỉ hỏi địa chỉ email | Cấu trúc form tối giản | Form `method=post`, `action` = `/admin/authentication/forgot_password`; chứa 1 ô `#email` (`type=email`, nhãn `Email Address`, không có `required`), 1 ô ẩn `csrf_token_name`, 1 nút submit nhãn `Confirm` | 🟢 | — | Đọc DOM |
| REQ-LOGIN-31 | Bỏ trống email ở form quên mật khẩu báo `Email not found` | Không dùng thông báo "trường bắt buộc" như form đăng nhập | Submit form quên mật khẩu khi ô email rỗng → hiện đúng **1** `.alert-danger` nội dung nguyên văn `Email not found` (**không** phải `The Email Address field is required.`). Đây là điểm **không nhất quán** giữa hai form. **AMB-16 đã chốt 2026-09-18:** là hành vi hiện có **được chấp nhận**, không mở bug — TC bám đúng hiện trạng này | 🟢 | 2026-09-18 · DEC-LOGIN-01 (✏️ biên tập) | Kiểm chứng thực tế |
| REQ-LOGIN-32 | Email không tồn tại nhận thông báo `Email not found` | Ghi nhận hiện trạng: thông báo **tiết lộ** email có tồn tại hay không | Nhập email không tồn tại → submit → hiện đúng **1** `.alert-danger` nội dung nguyên văn `Email not found`. Trái ngược chủ đích của `REQ-LOGIN-08` (form đăng nhập cố tình không tiết lộ). 🔖 **AMB-17 đã chốt 2026-09-18: đây là khiếm khuyết bảo mật (dò tài khoản), không phải thiết kế.** REQ này **chỉ còn vai trò ghi nhận hiện trạng**; hành vi đúng nằm ở `REQ-LOGIN-39`. TC gắn nhãn `defect-documented`, sẽ phải viết lại khi có bản vá. Xem RISK-09 | 🟡 | 2026-09-18 · DEC-LOGIN-01 | Kiểm chứng thực tế · Quyết định AMB-17 |
| REQ-LOGIN-33 | Form quên mật khẩu **giữ lại** email đã nhập sau khi lỗi | Trái ngược hành vi của form đăng nhập (`REQ-LOGIN-13`) | Sau khi submit lỗi, phần tử `#email` của trang quên mật khẩu **có** thuộc tính `value` (`hasAttribute('value') === true`) và mang lại chuỗi vừa nhập. **AMB-16 đã chốt 2026-09-18:** khác biệt với `REQ-LOGIN-13` là hành vi được chấp nhận | 🟢 | 2026-09-18 · DEC-LOGIN-01 (✏️ biên tập) | Đọc DOM |
| REQ-LOGIN-34 | Trang quên mật khẩu không có lối quay lại trang đăng nhập | Người dùng phải dùng nút Back của trình duyệt | Đọc DOM trang quên mật khẩu: chỉ có **1** thẻ `a` (logo, trỏ về trang chủ `/`), **không** có liên kết nào trỏ tới `/admin/authentication`. **AMB-19 đã chốt 2026-09-18:** chấp nhận hiện trạng, người dùng dùng nút Back của trình duyệt | 🟢 | 2026-09-18 · DEC-LOGIN-01 (✏️ biên tập) | Đọc DOM |
| REQ-LOGIN-35 | Tiêu đề tài liệu của trang quên mật khẩu giống hệt trang đăng nhập | Không dùng được `document.title` để phân biệt hai màn hình | `document.title` của **cả hai** trang đều là `Perfex CRM \| Anh Tester Demo - Login`. Căn cứ phân biệt đúng: tiêu đề hiển thị trên trang (`Login` vs `Forgot Password`) hoặc đường dẫn | 🟢 | — | Đọc DOM |
| REQ-LOGIN-36 | Gửi yêu cầu đặt lại mật khẩu cho email tồn tại | Hệ thống gửi email chứa liên kết đặt lại | ⚠️ **Chưa kiểm chứng.** 🚫 Không thử trên môi trường dùng chung: gửi thật sẽ đẩy liên kết đặt lại mật khẩu vào hộp thư của tài khoản dùng chung, người khác đổi được mật khẩu là chặn cả lớp. Cần môi trường riêng + hộp thư test. **AMB-18 đã chốt hoãn (⏭️) 2026-09-18** — không có trong đợt này; TC viết trước và đánh `skip` | ⚪ | 2026-09-18 · DEC-LOGIN-01 (✏️ biên tập) | Chưa kiểm chứng |
| REQ-LOGIN-37 | Đặt lại mật khẩu qua liên kết trong email | Trang đặt mật khẩu mới và các rule của nó | ⚠️ **Chưa kiểm chứng** — chưa truy cập được hộp thư nên không biết route, không biết hình thái liên kết, không biết rule mật khẩu mới. **AMB-18 đã chốt hoãn (⏭️) 2026-09-18**; TC viết trước và đánh `skip` | ⚪ | 2026-09-18 · DEC-LOGIN-01 (✏️ biên tập) | Chưa kiểm chứng |
| REQ-LOGIN-39 | Form quên mật khẩu không được tiết lộ email có tồn tại hay không | Thống nhất chủ đích chống dò tài khoản với form đăng nhập (`REQ-LOGIN-08`) | Nhập một email **tồn tại** và một email **không tồn tại** vào form quên mật khẩu → hai lượt trả **cùng một** thông báo, người ngoài không phân biệt được trường hợp nào. ⚠️ **Hệ thống hiện KHÔNG đạt** — `REQ-LOGIN-32` ghi nhận `Email not found` chỉ xuất hiện với email không tồn tại. ⚠️ Nội dung thông báo trung lập **chưa được chốt**, và kiểm chứng vế "email tồn tại" cần môi trường riêng (ràng buộc của AMB-18 đã hoãn) → TC viết trước, đánh `skip` | ⚪ | 2026-09-18 · DEC-LOGIN-01 | Quyết định AMB-17 |

**Bảng mã trạng thái:** 🟢 Active · 🟡 Changed (TC phải review lại) · 🔴 Deprecated (TC phải archive) · ⚪ Chưa kiểm chứng / chưa implement (TC viết trước, đánh `skip`).

**Tổng: 40 REQ** — 🟢 33 · 🟡 2 (REQ-LOGIN-20, 32 — TC phải review lại) · ⚪ 5 (REQ-LOGIN-36, 37, 38, 39, 40 — TC viết trước, đánh `skip`) · 🔴 0.

---

## 3. Đặc tả Trường Dữ liệu

### 3.1. Form đăng nhập — `/admin/authentication`

| Field (Label) | Loại UI | `id` / `name` | Required | Ràng buộc | REQ liên quan | Ghi chú |
|---|---|---|---|---|---|---|
| *(không nhãn)* | `input[type=hidden]` | — / `csrf_token_name` | Máy chủ bắt buộc | Giá trị hình thái **32 ký tự hex**, đổi mỗi lần tải trang | REQ-LOGIN-15, 16 | Thiếu/sai → trang lỗi `419 Page Expired!` |
| Email Address | `input[type=email]` | `email` / `email` | ❌ không có `required` HTML — **máy chủ bắt buộc** | Không `maxlength`, không `pattern`. `autofocus` bật. Trình duyệt tự chặn chuỗi không có `@` | REQ-LOGIN-06, 09, 11, 12, 13, 14 | Không phân biệt hoa thường. Máy chủ **không** trả lại giá trị sau lỗi |
| Password | `input[type=password]` | `password` / `password` | ❌ không có `required` HTML — **máy chủ bắt buộc** | Không `maxlength`, không `minlength`, không `pattern` | REQ-LOGIN-07, 09, 10, 14 | Không có nút hiện/ẩn mật khẩu |
| Remember me | `input[type=checkbox]` | `remember` / `remember` | Không | `value="estimate"`; mặc định **không** tích | REQ-LOGIN-18, 21 | Tích → sinh cookie `autologin` sống ≈ 62 ngày |
| *(nút)* | `button[type=submit]` | — | — | Nhãn `Login` | REQ-LOGIN-05 | Không bị `disabled` ở bất kỳ trạng thái nào quan sát được |
| *(liên kết)* | `a` | — | — | Nhãn `Forgot Password?` → `/admin/authentication/forgot_password` | REQ-LOGIN-29 | — |

### 3.2. Form quên mật khẩu — `/admin/authentication/forgot_password`

| Field (Label) | Loại UI | `id` / `name` | Required | Ràng buộc | REQ liên quan | Ghi chú |
|---|---|---|---|---|---|---|
| *(không nhãn)* | `input[type=hidden]` | — / `csrf_token_name` | Máy chủ bắt buộc | **32 ký tự hex** | REQ-LOGIN-15 | Cùng cơ chế với form đăng nhập |
| Email Address | `input[type=email]` | `email` / `email` | ❌ không có `required` HTML | Không `maxlength`, không `pattern` | REQ-LOGIN-30, 31, 32, 33 | Bỏ trống **cũng** báo `Email not found`. **Giữ lại** giá trị sau lỗi |
| *(nút)* | `button[type=submit]` | — | — | Nhãn `Confirm` | REQ-LOGIN-30 | — |

### 3.3. Cookie do module sinh ra

| Cookie | Hình thái giá trị | HttpOnly | Secure | SameSite | Hạn dùng | Sinh khi nào | REQ |
|---|---|---|---|---|---|---|---|
| `csrf_cookie_name` | 32 ký tự hex | ✅ | ✅ | Lax | ≈ 1 giờ | Mọi lượt tải trang, kể cả khách ẩn danh | REQ-LOGIN-27 |
| `sp_session` | 40 ký tự hex | ✅ | ✅ | Lax | ≈ 8 giờ | Mọi lượt tải trang, **kể cả khi chưa đăng nhập** | REQ-LOGIN-26 |
| `autologin` | 110 ký tự an-toàn-URL | ❌ **không đặt** — đã chốt là **khiếm khuyết** (AMB-12), hành vi đúng ở `REQ-LOGIN-38` | ✅ | Lax | ≈ 62 ngày | **Chỉ khi** tích Remember me lúc đăng nhập | REQ-LOGIN-18, 19, 20, 38 |

🔒 Bảng này ghi **hình thái**, không ghi giá trị — giá trị thật là bí mật phiên, không được đưa vào `docs/`.

---

## 4. Business Rules & Validation Messages

Toàn bộ thông báo ghi **nguyên văn** từ UI, đã đối chiếu bằng ảnh evidence.

| REQ ID | Rule / Trigger | Thông báo nguyên văn | Nơi hiển thị |
|---|---|---|---|
| REQ-LOGIN-09 | Submit form đăng nhập rỗng — lỗi 1 | `The Password field is required.` | `.alert.alert-danger.text-center`, khối thứ nhất |
| REQ-LOGIN-09 | Submit form đăng nhập rỗng — lỗi 2 | `The Email Address field is required.` | `.alert.alert-danger.text-center`, khối thứ hai |
| REQ-LOGIN-10 | Có email, thiếu mật khẩu | `The Password field is required.` | `.alert.alert-danger.text-center` |
| REQ-LOGIN-11 | Có mật khẩu, thiếu email | `The Email Address field is required.` | `.alert.alert-danger.text-center` |
| REQ-LOGIN-07 | Email đúng, mật khẩu sai | `Invalid email or password` | `.text-center.alert.alert-danger` |
| REQ-LOGIN-08 | Email không tồn tại | `Invalid email or password` | `.text-center.alert.alert-danger` |
| REQ-LOGIN-16 | Token CSRF sai | `419 Page Expired!` + `Sorry, the page has expired, return to previous page and refresh to continue.` | Trang lỗi riêng, `document.title` = `Error` |
| REQ-LOGIN-23 | Đăng xuất khi còn timer chạy | `Started tasks timers found!` + `Are you sure you want to logout without stopping the timers?` | `#system-popup` |
| REQ-LOGIN-31 | Form quên mật khẩu, email rỗng | `Email not found` | `.alert.alert-danger.text-center` |
| REQ-LOGIN-32 | Form quên mật khẩu, email không tồn tại | `Email not found` | `.alert.alert-danger.text-center` |

### Chuỗi của trình duyệt — ghi để tham khảo, 🚫 CẤM dùng làm assertion

| Trigger | Chuỗi quan sát được | Điều kiện quan sát |
|---|---|---|
| Nhập `abc` vào ô email rồi submit | `Please include an '@' in the email address. 'abc' is missing an '@'.` | Google Chrome **153.0.0.0**, ngôn ngữ hệ điều hành tiếng Anh |

Chuỗi này do trình duyệt sinh, đổi theo trình duyệt / phiên bản / ngôn ngữ hệ điều hành. AC của `REQ-LOGIN-12` chỉ được assert `checkValidity() === false` và "không phát sinh request".

### Ba điểm không nhất quán giữa hai form — đã kiểm chứng, chưa có lời giải

| Hành vi | Form đăng nhập | Form quên mật khẩu | Theo dõi ở |
|---|---|---|---|
| Bỏ trống email | `The Email Address field is required.` | `Email not found` | AMB-16 ✅ **chấp nhận hiện trạng** |
| Giữ lại email sau lỗi | ❌ Không giữ (`REQ-LOGIN-13`) | ✅ Có giữ (`REQ-LOGIN-33`) | AMB-16 ✅ **chấp nhận hiện trạng** |
| Tiết lộ email có tồn tại | ❌ Cố tình không tiết lộ (`REQ-LOGIN-08`) | ✅ Tiết lộ (`REQ-LOGIN-32`) | AMB-17 ✅ **khiếm khuyết bảo mật** → hành vi đúng ở `REQ-LOGIN-39` · RISK-09 |

---

## 5. Ma trận Phân quyền

Hệ thống có nhiều vai trò nhưng **chỉ được cung cấp 1 account** — ma trận dùng thang 3 mức bằng chứng.

| Hành động | Khách chưa đăng nhập | Tài khoản đang dùng (staff, `user-id-2`) | Vai trò khác (chưa rõ) |
|---|---|---|---|
| Mở form đăng nhập `/admin/authentication` | ✅ | — | ❔ |
| Đăng nhập vào vùng `/admin` bằng thông tin hợp lệ | ✅ | ✅ | ❔ |
| Mở route nghiệp vụ `/admin/*` | ❌ (bị đưa về trang đăng nhập) | ✅ | ❔ |
| Dùng luồng Quên mật khẩu | ✅ | ✅ | ❔ |
| Đăng xuất | — | ✅ | ❔ |

```
Tổng 15 ô = Đã kiểm chứng 8 · Suy diễn 0 · Chưa rõ 5 · Không áp dụng 2

Ô "không áp dụng":
  [Mở form đăng nhập × Tài khoản đang đăng nhập] — không tồn tại: hệ thống đưa thẳng vào Dashboard (REQ-LOGIN-04)
  [Đăng xuất        × Khách chưa đăng nhập]      — không tồn tại: không có phiên để huỷ

Cột "Vai trò khác" chưa có account — **AMB-24 đã chốt hoãn (⏭️) 2026-09-18**: đợt này chỉ có 1 tài khoản,
kiểm thử phân quyền đa vai trò nằm NGOÀI phạm vi module LOGIN. 5 ô `❔` giữ nguyên, KHÔNG làm tròn thành ❌.
Danh sách vai trò của hệ thống vẫn chưa biết (AMB-02 ở tầng khám phá, còn treo)
```

**Ký hiệu:** `✅`/`❌` đã kiểm chứng bằng thao tác thật · `⚠️✅`/`⚠️❌` suy từ màn hình cấu hình (không có ô nào ở đây) · `❔` chưa có căn cứ · `—` không áp dụng.

⚠️ Ô `❔` **không** được đọc thành "không có quyền".

---

## 6. Ma trận Trạng thái — vòng đời phiên làm việc

`LOGIN` không phải entity nghiệp vụ nên không có status flow của bản ghi. Thay vào đó, **phiên làm việc** có 4 trạng thái quan sát được:

| Trạng thái hiện tại | Dấu hiệu nhận biết | Hành động cho phép | Trạng thái kế tiếp | REQ |
|---|---|---|---|---|
| **Ẩn danh** | Có `csrf_cookie_name` + `sp_session` nhưng mở `/admin/` bị đưa về trang đăng nhập | Đăng nhập · Quên mật khẩu | Đã đăng nhập / Đã đăng nhập có ghi nhớ | REQ-LOGIN-01, 02, 26 |
| **Đã đăng nhập** | Mở `/admin/` ra Dashboard; **không** có cookie `autologin` | Dùng mọi module · Đăng xuất | Đã đăng xuất | REQ-LOGIN-05, 17 |
| **Đã đăng nhập có ghi nhớ** | Như trên, **có thêm** cookie `autologin` (≈ 62 ngày) | Dùng mọi module · Đăng xuất · Khôi phục phiên khi mất `sp_session` | Đã đăng xuất | REQ-LOGIN-18, 19 |
| **Đã đăng xuất** | Cookie `autologin` có thể **vẫn còn** trong trình duyệt nhưng đã chết ở máy chủ | Đăng nhập lại · Quên mật khẩu | Đã đăng nhập / Đã đăng nhập có ghi nhớ | REQ-LOGIN-24, 25 |

⚠️ **Bẫy lớn nhất của ma trận này:** sự tồn tại của cookie **không** phản ánh trạng thái. `sp_session` có cả ở trạng thái Ẩn danh; `autologin` có cả ở trạng thái Đã đăng xuất. Căn cứ duy nhất đáng tin là **mở `/admin/` rồi xem điểm dừng**.

---

## 7. Luồng xử lý chính

### 7.1. Đăng nhập

```
Khách mở route /admin/* bất kỳ
  → bị đưa về /admin/authentication
  → nhập Email Address + Password (tuỳ chọn tích Remember me)
  → bấm Login
      ├─ Email sai định dạng      → trình duyệt chặn tại chỗ, KHÔNG gửi request
      ├─ Thiếu trường             → máy chủ trả "The <Tên trường> field is required."
      ├─ Sai email hoặc mật khẩu  → máy chủ trả "Invalid email or password"
      ├─ Token CSRF hỏng          → trang lỗi "419 Page Expired!"
      └─ Hợp lệ                   → vào Dashboard (KHÔNG quay lại route đã bị chặn)
```

### 7.2. Đăng xuất

```
Đang ở vùng Admin
  → bấm avatar góc phải header  → menu hồ sơ mở (5 mục)
  → bấm Logout
      ├─ Còn timer công việc đang chạy → hộp thoại "Started tasks timers found!"
      │                                  → bấm Logout trong hộp thoại → đăng xuất
      └─ Không có timer                → đăng xuất ngay
  → về /admin/authentication; token ghi nhớ bị vô hiệu ở máy chủ
```

### 7.3. Quên mật khẩu

```
Form đăng nhập → bấm "Forgot Password?"
  → /admin/authentication/forgot_password
  → nhập Email Address → bấm Confirm
      ├─ Bỏ trống / email không tồn tại → "Email not found"
      └─ Email tồn tại                  → ⚪ CHƯA KIỂM CHỨNG (AMB-18)
  ⚠️ Trang này KHÔNG có lối quay lại trang đăng nhập
```

---

## 8. Yêu cầu phi chức năng quan sát được

| Hạng mục | Ghi nhận | Căn cứ |
|---|---|---|
| Kênh truyền | Toàn bộ chạy trên HTTPS; cả 3 cookie đều đặt cờ `Secure` | Đọc cookie |
| Chống CSRF | Có token ẩn + cookie đối chiếu ở cả 2 form | REQ-LOGIN-15, 16 |
| Chống dò tài khoản | ✅ Đạt ở form đăng nhập · ❌ **Không đạt** ở form quên mật khẩu — **đã chốt là khiếm khuyết** (AMB-17), hành vi đúng ở `REQ-LOGIN-39` | REQ-LOGIN-08 vs 32 · 39 |
| Bảo vệ cookie khỏi JavaScript | ✅ `sp_session`, `csrf_cookie_name` · ❌ **Không** với `autologin` — **đã chốt là khiếm khuyết** (AMB-12), hành vi đúng ở `REQ-LOGIN-38` | REQ-LOGIN-20 · 38 |
| Chống thử mật khẩu hàng loạt | ❌ **Không có** khoá tài khoản, **không có** giới hạn tần suất — đã chốt ngày 2026-09-18 (AMB-09, AMB-10). Xem RISK-07 | Quyết định `DEC-LOGIN-01` |
| Vòng đời phiên khi không thao tác | Hết hiệu lực theo hạn cookie `sp_session` ≈ **8 giờ**, **không** có cảnh báo trước | REQ-LOGIN-40 (AMB-11) |
| Ngôn ngữ giao diện | Màn hình xác thực hiển thị **tiếng Anh**; trang đăng nhập **không** có nút đổi ngôn ngữ (menu đổi ngôn ngữ chỉ có **sau khi** đăng nhập) | Đọc DOM |
| Lỗi console | Không ghi nhận lỗi console nào ở trang đăng nhập và trang quên mật khẩu | Console log của phiên recon |

### Ràng buộc kiểm thử đã chốt (không phải yêu cầu của hệ thống)

| Ràng buộc | Nội dung | Nguồn |
|---|---|---|
| **Trần số lần đăng nhập sai** | Mỗi lần chạy suite **tối đa 5 lần sai cho cùng một tài khoản**. Áp cho cả manual lẫn automation; TC nào cần nhiều hơn phải tách sang tài khoản khác hoặc sang lần chạy khác | AMB-09 ✅ 2026-09-18 |
| **Phạm vi viewport** | Chỉ phủ desktop `1600×750`. Mọi kết luận về hiển thị/ẩn **không** được suy diễn sang viewport hẹp | AMB-21 ✅ 2026-09-18 |
| **Không assert mã HTTP** | Cấm assert mã chuyển hướng (AMB-14) và mã lỗi CSRF (AMB-15) ở **mọi** TC — chỉ assert điểm dừng cuối cùng và chuỗi hiển thị | AMB-14, AMB-15 ✅ 2026-09-18 |
| **Cách thao tác ô Remember me** | Automation **tích ô** (`check()`), **cấm** đặt thuộc tính `value` bằng tay | AMB-22 ✅ 2026-09-18 |
| **Cấm assert "cookie biến mất" sau đăng xuất** | Chứng minh đăng xuất bằng "không truy cập được vùng Admin", không bằng sự biến mất của `autologin` | AMB-13 ✅ 2026-09-18 |

---

## 9. Phân rã Epic / Story (Backlog View)

37 REQ ≥ 25 → bắt buộc có mục này.

| Story ID | Tên Story | REQ bao phủ | Số REQ | AMB / RISK liên quan | Ghi chú phạm vi |
|---|---|---|---|---|---|
| STORY-LOGIN-01 | Truy cập màn hình đăng nhập & bảo vệ route | REQ-LOGIN-01 → 04 | 4 | AMB-14 ✅, AMB-20 ✅ | Nền tảng cho mọi module khác. Cấm assert mã chuyển hướng |
| STORY-LOGIN-02 | Xác thực thông tin đăng nhập | REQ-LOGIN-05 → 08 | 4 | AMB-09 ✅, AMB-10 ✅, RISK-07 | Luồng nghiệp vụ chính. Trần 5 lần sai/tài khoản/lần chạy suite |
| STORY-LOGIN-03 | Kiểm tra dữ liệu nhập của form đăng nhập | REQ-LOGIN-09 → 14 | 6 | AMB-23 ✅, RISK-10 | Toàn bộ validation nằm ở máy chủ. AMB-23 chốt **không** viết TC cắt khoảng trắng ở tầng UI |
| STORY-LOGIN-04 | Bảo vệ CSRF | REQ-LOGIN-15 → 16 | 2 | AMB-15 ✅ | AMB-15 đã chốt: **vĩnh viễn** không assert mã HTTP, assert chuỗi hiển thị. Story hết ràng buộc |
| STORY-LOGIN-05 | Ghi nhớ đăng nhập | REQ-LOGIN-17 → 21, **38** | 6 | AMB-12 ✅, AMB-22 ✅, AMB-25 ❓, RISK-06 | Phần bộ automation hiện có đang thiếu. Thêm `REQ-LOGIN-38` ⚪ (HttpOnly — hệ thống chưa đạt, TC `skip`) |
| STORY-LOGIN-06 | Đăng xuất & vòng đời phiên | REQ-LOGIN-22 → 28, **40** | 8 | AMB-11 ✅, AMB-13 ✅, AMB-21 ✅ | Nhánh hộp thoại timer chưa có test nào. Thêm `REQ-LOGIN-40` ⚪ (hết phiên ≈ 8 giờ — TC `skip`) |
| STORY-LOGIN-07 | Quên mật khẩu | REQ-LOGIN-29 → 37, **39** | 10 | AMB-16 ✅, AMB-17 ✅, AMB-18 ⏭️, AMB-19 ✅, AMB-25 ❓, RISK-09 | 7/10 REQ làm được ngay; `REQ-LOGIN-36`, `37`, `39` ⚪ — hoãn theo AMB-18 |

**Dòng tổng kiểm chứng:** Tổng **7 Story / 40 REQ** — mọi REQ thuộc đúng một Story, không mồ côi, không trùng: `4+4+6+2+6+8+10 = 40 ✔`

### Bảng đối chiếu AMB / RISK

| Nhóm | Mã | Nằm ở đâu |
|---|---|---|
| AMB thuộc Story | AMB-09 … AMB-23 (15 mã) | Phân bổ ở bảng Story bên trên — **toàn bộ đã ✅ / ⏭️** sau đợt `DEC-LOGIN-01` |
| AMB cấp Epic | AMB-24 ⏭️, AMB-25 ❓ | AMB-24: Ma trận Phân quyền (mục 5). AMB-25: cắt ngang STORY-05 và STORY-07 (lịch sửa 2 khiếm khuyết) — xem Hạng mục cấp Epic |
| RISK thuộc Story | RISK-06, 07, 09, 10 | Phân bổ ở bảng Story bên trên |
| RISK cấp Epic | RISK-08 | Rủi ro mức module — môi trường dùng chung, ảnh hưởng mọi Story |

### Hạng mục cấp Epic (cố ý không gán vào Story nào)

| Hạng mục | Lý do |
|---|---|
| Ma trận Phân quyền (mục 5) | Cắt ngang cả 7 Story; phụ thuộc AMB-24 và AMB-02 (tầng khám phá) |
| Ma trận Trạng thái phiên (mục 6) | Mô tả vòng đời phiên chung, Story 02 · 05 · 06 cùng dùng |
| Yêu cầu phi chức năng (mục 8) | Quan sát cấp module, không gắn với một chức năng đơn lẻ |
| RISK-08 (môi trường dùng chung) | Xử lý ở mức chiến lược kiểm thử, không sửa được trong một Story |
| AMB-25 (lịch sửa 2 khiếm khuyết đã xác nhận) | Chạm cả STORY-LOGIN-05 (`REQ-LOGIN-38`) và STORY-LOGIN-07 (`REQ-LOGIN-39`); phụ thuộc lịch phát hành của dev, không giải quyết được trong một Story |
| Ràng buộc kiểm thử đã chốt (mục 8) | Trần 5 lần sai · phạm vi viewport · cấm assert mã HTTP — áp cho **mọi** Story |

### Thứ tự triển khai đề xuất

| # | Story | Vì sao xếp ở đây | Trạng thái |
|---|---|---|---|
| 1 | STORY-LOGIN-02 | Không đăng nhập được thì không Story nào chạy được, và 24 module còn lại đều chờ | Sẵn sàng |
| 2 | STORY-LOGIN-01 | Cơ chế bảo vệ route — cần trước khi viết TC cho module khác | Sẵn sàng |
| 3 | STORY-LOGIN-03 | Nhiều TC, rủi ro thấp, làm nhanh được | Sẵn sàng |
| 4 | STORY-LOGIN-06 | Đăng xuất là điều kiện dọn dẹp của mọi TC khác; nhánh timer cần dữ liệu đặc biệt | Sẵn sàng |
| 5 | STORY-LOGIN-05 | Cần thao tác cookie ở tầng trình duyệt — kỹ thuật cao hơn | Sẵn sàng |
| 6 | STORY-LOGIN-04 | Chỉ 2 REQ; AMB-15 đã chốt nên hết ràng buộc | ✅ Sẵn sàng |
| 7 | STORY-LOGIN-07 | 7/10 REQ làm được ngay; `REQ-LOGIN-36`, `37`, `39` hoãn theo AMB-18 ⏭️ | ⏭️ **Hoãn một phần** — không còn BLOCKED chờ trả lời, đã là quyết định phạm vi |

---

## 10. Điểm Mơ Hồ & Rủi Ro

### Ambiguities

> Đánh số nối tiếp tầng khám phá (`AMB-01` → `AMB-08` đã dùng ở [`system_map.md`](../_discovery/system_map.md)).
>
> **Sau đợt `DEC-LOGIN-01` (2026-09-18):** 14 ✅ đã trả lời · 2 ⏭️ hoãn (AMB-18, AMB-24) · 1 ❓ mới mở (AMB-25 🟡). **Không còn ambiguity 🔴 nào chờ trả lời.**
> AMB đã ✅ / ⏭️ **không được xoá** khỏi bảng — giữ lại để biết quyết định đến từ đâu.

| Mã | Câu hỏi | Nguy cơ nếu không giải quyết | Mức | Assumption tạm | Trạng thái | Kết luận |
|---|---|---|---|---|---|---|
| **AMB-09** | Hệ thống có khoá tài khoản sau N lần đăng nhập sai không? N bằng bao nhiêu? | Không biết có cần TC cho luồng khoá tài khoản; cũng không biết bao nhiêu lần thử là an toàn khi chạy suite | 🟡 | Giả định **không có** cơ chế khoá; giới hạn mỗi lần chạy suite tối đa 5 lần sai cho cùng tài khoản | ✅ Đã trả lời 2026-09-18 | **Trùng Assumption tạm.** Hệ thống **không có** cơ chế khoá tài khoản → không có hành vi nào để đặc tả, giữ ngoài phạm vi. Ràng buộc kiểm thử chính thức: **tối đa 5 lần sai cho cùng một tài khoản trong một lần chạy suite** (ghi ở mục 8). REQ không đổi |
| **AMB-10** | Có giới hạn tần suất (rate limit) trên endpoint đăng nhập không? | Chạy suite song song nhiều luồng có thể bị chặn, TC đỏ mà tưởng lỗi ứng dụng | 🟡 | Giả định **không có**; thấy lỗi lạ khi chạy song song thì nghi ngờ mục này trước | ✅ Đã trả lời 2026-09-18 | **Trùng Assumption tạm.** Không có giới hạn tần suất → suite chạy song song không cần giãn nhịp. Trần 5 lần sai của AMB-09 **vẫn giữ** như biện pháp tự vệ trên môi trường dùng chung. REQ không đổi |
| **AMB-11** | Phiên hết hạn sau bao lâu khi người dùng không thao tác? Có cảnh báo trước không? | Không viết được TC cho hết phiên; TC dài có thể đứt giữa chừng mà không rõ nguyên nhân | 🟡 | Lấy hạn cookie `sp_session` ≈ **8 giờ** làm giới hạn trên; **không** có cảnh báo phía trình duyệt | ✅ Đã trả lời 2026-09-18 | **Trùng Assumption tạm, và được nâng thành yêu cầu chính thức** → sinh `REQ-LOGIN-40` (⚪ — không kiểm được trong một lần chạy suite thường) |
| **AMB-12** | Cookie `autologin` **không** đặt cờ HttpOnly — cố ý hay thiếu sót? | Nếu là thiếu sót thì đây là lỗ hổng thật, phải mở bug chứ không phải viết TC bám theo hiện trạng | 🔴 | Coi là **thiếu sót của bản demo**; ghi nhận hiện trạng ở REQ-LOGIN-20, không coi là yêu cầu đúng | ✅ Đã trả lời 2026-09-18 | **Xác nhận là khiếm khuyết**, không phải thiết kế. Hành vi đúng sinh thành `REQ-LOGIN-38` (⚪). `REQ-LOGIN-20` chuyển 🟡 — chỉ còn vai trò ghi nhận hiện trạng, TC gắn nhãn `defect-documented`. **Phải mở bug báo dev** (RISK-06) |
| **AMB-13** | Vì sao đăng xuất không xoá cookie `autologin` khỏi trình duyệt (chỉ vô hiệu ở máy chủ)? | TC có thể assert nhầm "cookie phải biến mất" và đỏ oan | 🟡 | Coi là hành vi hiện có: **cookie còn, token chết**. TC assert bằng "không truy cập được", không assert bằng "cookie biến mất" | ✅ Đã trả lời 2026-09-18 | **Trùng Assumption tạm.** Chốt: cookie còn trong trình duyệt, token chết ở máy chủ là hành vi được chấp nhận. TC **cấm** assert "cookie biến mất". `REQ-LOGIN-24` giữ 🟢 |
| **AMB-14** | Chuyển hướng bảo vệ route trả **307** trong khi đăng nhập thành công trả **303** — cố ý hay hệ quả cấu hình máy chủ? | `307` giữ nguyên method và body, khác hẳn `302/303`; nếu là cấu hình sai thì hành vi đổi sau khi vá | 🟡 | Không assert mã chuyển hướng ở bất kỳ TC nào; chỉ assert **điểm dừng cuối cùng** | ✅ Đã trả lời 2026-09-18 | **Trùng Assumption tạm.** Mã chuyển hướng coi là **chi tiết cấu hình máy chủ, không phải yêu cầu** → mọi TC chỉ assert điểm dừng cuối cùng. `REQ-LOGIN-02` giữ 🟢 |
| **AMB-15** | Token CSRF sai: header trả **403** nhưng nội dung trang ghi **419 Page Expired!** — mã nào là đúng? | Không biết assert mã nào; nếu công cụ đo ghi nhận sai thì cả hai đều không đáng tin | 🟡 | Không assert mã HTTP; chỉ assert **chuỗi hiển thị** và **không tạo được phiên** | ✅ Đã trả lời 2026-09-18 | **Trùng Assumption tạm.** Chốt: TC **cấm assert mã HTTP** cho lỗi CSRF; assert chuỗi `419 Page Expired!` + chứng minh không tạo được phiên. `REQ-LOGIN-16` giữ 🟢, STORY-LOGIN-04 hết ràng buộc |
| **AMB-16** | Form quên mật khẩu bỏ trống email lại báo `Email not found` thay vì "trường bắt buộc", và **giữ lại** email sau lỗi trong khi form đăng nhập thì không — cố ý hay không nhất quán? | TC viết theo mẫu của form đăng nhập sẽ đỏ; hoặc bug thật bị bỏ qua vì tưởng là thiết kế | 🟡 | Ghi nhận đúng hiện trạng ở REQ-LOGIN-31 và REQ-LOGIN-33; chưa mở bug | ✅ Đã trả lời 2026-09-18 | **Trùng Assumption tạm.** Khác biệt giữa hai form là **hành vi hiện có được chấp nhận** (khác biệt trải nghiệm, không phải lỗi chức năng) → **không mở bug**. `REQ-LOGIN-31`, `33` giữ 🟢, TC bám đúng hiện trạng |
| **AMB-17** | Form quên mật khẩu tiết lộ email có tồn tại hay không, ngược hẳn chủ đích của form đăng nhập — chấp nhận được không? | Đây là lỗ hổng dò tài khoản. Nếu là bug thì hành vi sẽ đổi và TC của REQ-LOGIN-32 phải viết lại | 🔴 | Coi là **khiếm khuyết**, ghi nhận hiện trạng + mở RISK-09; chờ chủ sản phẩm quyết | ✅ Đã trả lời 2026-09-18 | **Xác nhận là khiếm khuyết bảo mật** (dò tài khoản), không chấp nhận được. Hành vi đúng sinh thành `REQ-LOGIN-39` (⚪). `REQ-LOGIN-32` chuyển 🟡 — TC gắn nhãn `defect-documented`, sẽ viết lại khi có bản vá. **Phải mở bug báo dev** (RISK-09) |
| **AMB-18** | Luồng gửi email đặt lại mật khẩu và trang đặt mật khẩu mới hoạt động ra sao? Route nào, liên kết sống bao lâu, rule mật khẩu mới là gì? | **Chặn 2 REQ** (36, 37) và nửa sau của STORY-LOGIN-07 | 🔴 | Chưa test; 2 REQ để trạng thái ⚪. Cần **môi trường riêng + hộp thư test** — không thử trên môi trường dùng chung | ⏭️ Bỏ qua 2026-09-18 | **Hoãn sang đợt sau** — đợt này không có môi trường riêng lẫn hộp thư test, và gửi email thật trên môi trường dùng chung là hành vi bị cấm. `REQ-LOGIN-36`, `37` giữ ⚪; TC viết trước và đánh `skip`. Rủi ro chấp nhận: **nửa sau luồng quên mật khẩu không có ai kiểm** — ghi vào báo cáo độ phủ. Ràng buộc này cũng chặn việc kiểm chứng `REQ-LOGIN-39` |
| **AMB-19** | Trang quên mật khẩu không có liên kết quay lại trang đăng nhập — cố ý hay thiếu? | Nhỏ, nhưng nếu là thiếu thì sẽ được bổ sung và TC của REQ-LOGIN-34 phải sửa | 🟢 | Ghi nhận đúng hiện trạng | ✅ Đã trả lời 2026-09-18 | **Trùng Assumption tạm.** Chấp nhận hiện trạng, người dùng dùng nút Back của trình duyệt. `REQ-LOGIN-34` giữ 🟢 |
| **AMB-20** | Vì sao không khôi phục URL người dùng yêu cầu ban đầu sau khi đăng nhập? | Nếu sau này bổ sung thì REQ-LOGIN-03 đảo nghĩa hoàn toàn | 🟡 | Ghi nhận đúng hiện trạng: luôn về Dashboard | ✅ Đã trả lời 2026-09-18 | **Trùng Assumption tạm.** Chốt là hành vi đúng của hệ thống: luôn về Dashboard, **không** khôi phục URL. `REQ-LOGIN-03` giữ 🟢 |
| **AMB-21** | Ở viewport hẹp, mục Logout trong thanh điều hướng thu gọn có dùng được không? | Không kết luận được thay cho viewport chưa đo; TC responsive sẽ dựa trên suy diễn | 🟡 | Kết luận của REQ-LOGIN-28 **chỉ áp cho `1600×750`**; cần một lượt recon riêng ở viewport hẹp | ✅ Đã trả lời 2026-09-18 | **Chốt phạm vi thay vì chốt hành vi:** đợt kiểm thử này **chỉ phủ desktop `1600×750`**; viewport hẹp đưa vào mục "Ngoài phạm vi". `REQ-LOGIN-28` giữ 🟢 với phạm vi ghi rõ. Mở phạm vi mobile về sau thì **recon lại và mở ambiguity mới**, không suy diễn từ kết luận desktop |
| **AMB-22** | Ô Remember me mang `value="estimate"` — giá trị này có ý nghĩa gì, hay chỉ là rác của template? | Nếu máy chủ kiểm giá trị thì automation đặt giá trị khác sẽ hỏng âm thầm | 🟢 | Coi là rác của template; automation **tích ô** chứ không đặt giá trị bằng tay | ✅ Đã trả lời 2026-09-18 | **Trùng Assumption tạm.** Là rác của template, máy chủ chỉ quan tâm ô có được tích hay không. Luật cho automation: **tích ô (`check()`), cấm đặt `value` bằng tay**. `REQ-LOGIN-21` giữ 🟢 |
| **AMB-23** | Máy chủ có cắt khoảng trắng đầu/cuối của email không? | Không kiểm chứng được qua UI nên không viết được TC cho rule này | 🟢 | **Không kiểm chứng được bằng UI**: ô `type=email` khiến **trình duyệt tự cắt** khoảng trắng trước khi gửi | ✅ Đã trả lời 2026-09-18 | **Chốt là không kiểm được ở tầng UI** → **không cấp REQ, không viết TC** cho rule này. Ô `type=email` cắt khoảng trắng trước khi request rời trình duyệt nên mọi TC UI đều chỉ chứng minh hành vi của trình duyệt. Để lại cho tầng API khi module API được đưa vào phạm vi |
| **AMB-24** | Ngoài tài khoản đang có, những vai trò nào đăng nhập được vào vùng `/admin`? Xin account của từng vai trò để kiểm chứng **5 ô** đang `❔` ở ma trận mục 5 | Ma trận phân quyền của chính module cổng vào chỉ tin được 8/15 ô | 🔴 | Giả định mọi TC chạy dưới đúng tài khoản hiện có; **không** viết TC phân quyền cho module này | ⏭️ Bỏ qua 2026-09-18 | **Hoãn sang đợt sau** — đợt này chỉ có 1 tài khoản. Kiểm thử phân quyền đa vai trò nằm **ngoài phạm vi** module LOGIN; 5 ô `❔` giữ nguyên, **không** làm tròn thành ❌. Rủi ro chấp nhận: ma trận mục 5 chỉ tin được 8/15 ô — ghi vào báo cáo độ phủ. Vẫn nối tiếp `AMB-02` ở tầng khám phá (còn treo) |
| **AMB-25** | Hai khiếm khuyết đã xác nhận (`REQ-LOGIN-38` HttpOnly, `REQ-LOGIN-39` chống dò tài khoản) sẽ được sửa ở phiên bản nào? Thông báo trung lập của form quên mật khẩu dùng nguyên văn gì? | Không biết khi nào TC của 2 REQ này bỏ `skip`; không biết nguyên văn để assert nên TC chỉ viết được phần khung | 🟡 | Chưa có lịch sửa → TC của `REQ-LOGIN-38`, `39` giữ `skip`; assert của `REQ-LOGIN-39` chỉ kiểm **hai lượt trả cùng một thông báo**, **không** chép nguyên văn | ❓ Chờ trả lời | — |

### Rủi ro (Risk)

> Đánh số nối tiếp tầng khám phá (`RISK-01` → `RISK-05` đã dùng ở [`system_map.md`](../_discovery/system_map.md)).

| Mã | Rủi ro | Mô tả | Giảm thiểu |
|---|---|---|---|
| **RISK-06** | Cookie ghi nhớ đăng nhập đọc được bằng JavaScript | `autologin` không có cờ HttpOnly, sống ≈ 62 ngày, và **một mình nó** khôi phục được phiên (REQ-LOGIN-19). Bất kỳ lỗ hổng XSS nào cũng lấy được phiên dài hạn | ⬆️ **Đã nâng mức 2026-09-18:** AMB-12 chốt đây là **khiếm khuyết**, không phải thiết kế → **bắt buộc mở bug** báo dev (`/create-bug-report`), không chỉ "báo phát hiện". Hành vi đúng theo dõi ở `REQ-LOGIN-38`; lịch sửa theo dõi ở AMB-25. Vẫn ưu tiên cao cho TC bảo mật quanh XSS |
| **RISK-07** | Cổng đăng nhập **không có** cơ chế chống thử mật khẩu hàng loạt | 🔄 **Đổi bản chất 2026-09-18:** AMB-09 và AMB-10 chốt là hệ thống **không có** khoá tài khoản lẫn giới hạn tần suất. Đây không còn là "vùng mù chưa kiểm" mà là **điểm yếu bảo mật đã xác nhận** của bản demo | Không viết TC cho luồng khoá tài khoản (không có hành vi để kiểm) — ghi rõ trong báo cáo độ phủ là **đã chốt không tồn tại**, không phải "chưa kiểm". Báo dev khi đưa lên môi trường thật. Vẫn giữ trần **5 lần sai/tài khoản/lần chạy suite** để không gây tải bất thường trên môi trường dùng chung |
| **RISK-08** | Môi trường dùng chung, nhiều người dùng cùng một tài khoản | Tester khác đăng xuất hoặc đổi ngôn ngữ giữa lúc TC chạy → phiên đứt, thông báo đổi ngôn ngữ, TC đỏ giả. Đã quan sát thấy **timer công việc của người khác đang chạy** ngay trong phiên khảo sát này | Mỗi TC tự đăng nhập ở bước Arrange, không dựa vào phiên có sẵn; TC đỏ phải kiểm lại thủ công trước khi mở bug |
| **RISK-09** | Dò tài khoản qua form quên mật khẩu | `Email not found` cho biết chính xác email nào có trong hệ thống — kẻ tấn công lập được danh sách tài khoản hợp lệ rồi mới tấn công mật khẩu. ⚠️ Kết hợp với RISK-07 (không có giới hạn tần suất) thì mức độ khai thác **cao hơn hẳn**: dò được danh sách rồi thử mật khẩu không giới hạn | ⬆️ **Đã nâng mức 2026-09-18:** AMB-17 chốt là **khiếm khuyết bảo mật** → **bắt buộc mở bug**. Hành vi đúng theo dõi ở `REQ-LOGIN-39`; `REQ-LOGIN-32` giữ lại ghi nhận hiện trạng với nhãn `defect-documented` và **sẽ phải viết lại** khi có bản vá |
| **RISK-10** | Thông báo lỗi phụ thuộc ngôn ngữ của tài khoản | Menu hồ sơ có submenu đổi ngôn ngữ. Người khác đổi ngôn ngữ của tài khoản dùng chung là toàn bộ assertion theo nguyên văn tiếng Anh đỏ hàng loạt | TC ghi rõ điều kiện tiên quyết "giao diện đang ở tiếng Anh"; nếu hiện tượng lặp lại thì cân nhắc assert theo vị trí/số lượng thay vì chỉ nguyên văn |

---

## 11. Danh mục Evidence

Toàn bộ ảnh nằm ở [`evidence/`](evidence/), đã **mở lại kiểm tra từng ảnh** đúng trạng thái khai báo.

| Tệp | Màn hình | Trạng thái thể hiện | REQ được chứng minh |
|---|---|---|---|
| [`login_form_default_fullpage.png`](evidence/login_form_default_fullpage.png) | Đăng nhập | Mặc định, chưa nhập gì | REQ-LOGIN-01, 29 |
| [`login_empty_submit_errors_fullpage.png`](evidence/login_empty_submit_errors_fullpage.png) | Đăng nhập | Sau khi submit form rỗng — thấy đủ 2 thông báo, Password ở trên | REQ-LOGIN-09 |
| [`login_invalid_credentials_error_fullpage.png`](evidence/login_invalid_credentials_error_fullpage.png) | Đăng nhập | Sau khi sai mật khẩu — 1 thông báo `Invalid email or password` | REQ-LOGIN-07, 08 |
| [`login_remember_me_checked_element.png`](evidence/login_remember_me_checked_element.png) | Đăng nhập | Ô Remember me **đã tích**, form sẵn sàng gửi | REQ-LOGIN-21 |
| [`login_invalid_csrf_419_page_fullpage.png`](evidence/login_invalid_csrf_419_page_fullpage.png) | Trang lỗi | Token CSRF sai — `419 Page Expired!` | REQ-LOGIN-16 |
| [`login_success_sidebar_element.png`](evidence/login_success_sidebar_element.png) | Dashboard | Thanh điều hướng trái sau khi đăng nhập thành công | REQ-LOGIN-05 |
| [`dashboard_profile_menu_open_element.png`](evidence/dashboard_profile_menu_open_element.png) | Dashboard | Menu hồ sơ **đang mở**, thấy đủ 5 mục và mục `Logout` | REQ-LOGIN-22 |
| [`logout_timer_warning_popup_element.png`](evidence/logout_timer_warning_popup_element.png) | Dashboard | Hộp thoại cảnh báo còn timer đang chạy khi bấm Logout | REQ-LOGIN-23 |
| [`forgot_password_form_default_fullpage.png`](evidence/forgot_password_form_default_fullpage.png) | Quên mật khẩu | Mặc định — 1 ô email, nút `Confirm`, không có link quay lại | REQ-LOGIN-29, 30, 34 |
| [`forgot_password_email_not_found_fullpage.png`](evidence/forgot_password_email_not_found_fullpage.png) | Quên mật khẩu | Sau khi nhập email không tồn tại — `Email not found`, **email được giữ lại trong ô** | REQ-LOGIN-32, 33 |

### Ghi chú về phạm vi chụp

| Quyết định | Lý do |
|---|---|
| 3 ảnh chụp theo **element** (`_element.png`) thay vì full-page | Đối tượng cần chứng minh (menu hồ sơ, hộp thoại, thanh điều hướng) nằm trên nền Dashboard **chứa dữ liệu khách hàng thật** — tên khách, số tiền, nhật ký hoạt động. Ảnh trong `docs/` sẽ được commit nên chỉ chụp đúng phạm vi đối tượng |
| Ảnh full-page chỉ dùng cho màn hình xác thực | Hai màn hình này **không** hiển thị dữ liệu nghiệp vụ nào |

### REQ không có ảnh chống lưng — căn cứ là số liệu DOM/cookie trong AC

`REQ-LOGIN-02, 03, 04, 06, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 24, 25, 26, 27, 28, 31, 35` — mỗi REQ đều ghi **số liệu đọc được** trong Acceptance Criteria (tên cookie, độ dài, cờ, `hasAttribute`, `offsetParent`, số phần tử, điểm dừng). Đây là loại dữ kiện **ảnh không thể hiện được**.

`REQ-LOGIN-36, 37` ở trạng thái ⚪ — **không** có ảnh và **không** khai là đã kiểm chứng.

---

## 12. Nhật ký Thay đổi

| Ngày | Nguồn | REQ ảnh hưởng | Loại | Tóm tắt thay đổi | TC cần xử lý |
|---|---|---|---|---|---|
| 2026-09-18 | DEC-LOGIN-01 | REQ-LOGIN-38, 39, 40 | 🟢 Thêm | Ba yêu cầu chốt từ kết luận ambiguity: `38` cookie `autologin` phải đặt HttpOnly (AMB-12) · `39` form quên mật khẩu không được tiết lộ email tồn tại (AMB-17) · `40` phiên hết hiệu lực sau ≈ 8 giờ không thao tác, không cảnh báo (AMB-11). **Cả ba ở trạng thái ⚪** — hệ thống chưa đạt (38, 39) hoặc không kiểm được trong một lần chạy suite (40) | ➕ Viết TC mới, đánh `skip` |
| 2026-09-18 | DEC-LOGIN-01 | REQ-LOGIN-20, 32 | 🟡 Sửa | Hai REQ đổi **vai trò** chứ không đổi hành vi quan sát được: từ "ghi nhận hiện trạng trung lập" thành "ghi nhận **khiếm khuyết đã xác nhận**". TC phải gắn nhãn `defect-documented` và sẽ đảo nghĩa khi có bản vá | ⚠️ Review & sửa |
| 2026-09-18 | DEC-LOGIN-01 | REQ-LOGIN-21, 28, 31, 33, 34, 36, 37 | ✏️ Biên tập | Ghi kết luận AMB tương ứng vào Acceptance Criteria (AMB-22, 21, 16, 16, 19, 18, 18). **Không đổi hành vi, không đổi điều kiện kiểm** | — Không tác động |
| 2026-09-18 | DEC-LOGIN-01 | — | 📌 Chốt ambiguity | Giải quyết toàn bộ 16 ambiguity `AMB-09` → `AMB-24`: **14 ✅ đã trả lời · 2 ⏭️ hoãn** (AMB-18 thiếu môi trường riêng + hộp thư test · AMB-24 chỉ có 1 tài khoản). Mở `AMB-25` 🟡 (lịch sửa 2 khiếm khuyết). RISK-06 và RISK-09 **nâng mức** → bắt buộc mở bug; RISK-07 **đổi bản chất** từ "vùng mù chưa kiểm" thành "điểm yếu đã xác nhận". Bổ sung mục Ràng buộc kiểm thử đã chốt (mục 8) | ⚠️ Xem Impact Report `impact/impact_DEC-LOGIN-01.md` |
| 2026-09-14 | UI recon | REQ-LOGIN-01 → 37 | 🟢 Thêm | Khởi tạo tài liệu từ khảo sát UI thực tế trên Chrome 153, viewport `1600×750`. Mở AMB-09 → AMB-24, RISK-06 → RISK-10. 2 REQ ở trạng thái ⚪ do bị chặn bởi AMB-18 | — (viết TC mới) |
