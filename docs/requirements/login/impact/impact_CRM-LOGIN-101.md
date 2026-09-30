# Impact Report — `CRM-LOGIN-101` · Module `LOGIN` · 30-09-2026

> **Nguồn thay đổi:** Ticket `CRM-LOGIN-101` — *Khoá tài khoản khi đăng nhập sai nhiều lần*, PO chốt 28-09-2026, nhận qua chat 30-09-2026.
>
> Tài liệu module: [../REQUIREMENTS_LOGIN_SUMMARY.md](../REQUIREMENTS_LOGIN_SUMMARY.md) · REQ chi tiết: [../web/requirements_login_web.md](../web/requirements_login_web.md) mục 3.7 · Danh mục: [../../README.md](../../README.md)
>
> Workflow kế tiếp: **`/update-testcases-from-impact`** đọc file này.

## Nội dung ticket (nguyên văn)

| Dòng | Nội dung |
|---|---|
| 1 | Đăng nhập sai mật khẩu 5 lần liên tiếp với cùng một email thì tài khoản bị khoá 15 phút. |
| 2 | Khi bị khoá, trang đăng nhập hiển thị: "Your account is locked. Please try again in 15 minutes." |
| 3 | Trong thời gian bị khoá, nhập đúng mật khẩu cũng không đăng nhập được. |
| 4 | Đăng nhập thành công trước khi đủ 5 lần thì bộ đếm lần sai được đặt lại về 0. |
| 5 | Chỉ khoá theo email, không khoá theo IP. |
| 6 | Môi trường dùng chung: TC phải dùng tài khoản Project Manager, KHÔNG dùng tài khoản Admin. |

> ⚠️ **Ticket đảo ngược một quyết định PO trước đó.** `AMB-LOGIN-02` ✅ (18-08-2026) chốt *"không có cơ chế khoá tài khoản"* → `REQ-LOGIN-41`, và `CRM_LOGIN_TC_015` đã PASS theo kết luận đó (20-08-2026). Ticket mới hơn nên thắng; quyết định cũ vẫn giữ trong bảng AMB để lưu dấu.
>
> ⚠️ **Chưa kiểm chứng trên hệ thống.** Lần đo gần nhất (20-08-2026, `run_1787215085`): 6 lần sai liên tiếp **không** khoá. REQ mới để ở ⚪ cho tới khi xác nhận đã deploy (`AMB-LOGIN-27`).

---

## Tóm tắt

| Nhóm | Số lượng | REQ | Ghi chú |
|---|---|---|---|
| 🟢 Thêm mới | 7 | `REQ-LOGIN-45` → `51` | Cả 7 ở trạng thái ⚪ **Chưa implement** — nguồn ticket dòng 1–5 |
| 🟡 Sửa | 1 | `REQ-LOGIN-41` | **Đảo ngược**: "không khoá" → "khoá sau 5 lần sai liên tiếp". Giữ mã — cùng hành vi, đổi ngưỡng. Hệ thống **chưa đạt** |
| 🔴 Bỏ | 0 | — | — |
| ⚪ Chưa build | 7 | `REQ-LOGIN-45` → `51` | Trùng nhóm Thêm mới ở trên — không cộng hai lần |
| ⏸️ Trùng, không tác động | 0 | — | — |
| Không phải REQ | 1 | — | Ticket dòng 6 là **ràng buộc kiểm thử**, không phải hành vi hệ thống → ghi vào metadata module, `RISK-LOGIN-03` và bảng thuộc tính đầu `docs/requirements/README.md` |

**Ánh xạ ticket → REQ** (một dòng ticket có thể tách thành nhiều rule kiểm độc lập — skill mục 4.3.4):

| Dòng ticket | REQ |
|---|---|
| 1 — 5 lần liên tiếp → khoá | `REQ-LOGIN-41` 🟡 |
| 1 — khoá **15 phút** | `REQ-LOGIN-47` |
| 2 — thông báo | `REQ-LOGIN-45` |
| 3 — đúng mật khẩu vẫn không vào | `REQ-LOGIN-46` |
| 4 — đặt lại bộ đếm | `REQ-LOGIN-48` |
| 5 — khoá email A không chặn email B | `REQ-LOGIN-49` |
| 5 — không khoá theo IP, lần sai các email không cộng dồn | `REQ-LOGIN-50` |
| 5 — khoá đi theo email, không theo phiên trình duyệt | `REQ-LOGIN-51` |

**Module sau cập nhật (gồm cả ba phần bổ sung bên dưới):** 61 REQ (24 🟢 · 18 🟡 · 19 ⚪) · 57 trong phạm vi viết TC · 7 Story (thêm **STORY-LOGIN-07**, `REQ-LOGIN-41` chuyển từ STORY-LOGIN-03 sang).

### Bổ sung cùng ngày — trả lời `AMB-LOGIN-21` và một phần `AMB-LOGIN-25` (qua chat 30-09-2026)

| Nhóm | REQ | Nội dung |
|---|---|---|
| 🟢 Thêm (⚪) | `REQ-LOGIN-52` | Email không tồn tại **không khoá**: lần 1–4 `Invalid email or password`, từ lần 5 báo `Email không tồn tại`. Email `Customer` gửi vào `/admin` xử lý y hệt |
| 🟢 Thêm (⚪) | `REQ-LOGIN-53` | Email không tồn tại phải đợi thêm 1 phút sau lần sai thứ 5 — chi tiết chưa đủ để viết kỳ vọng (`AMB-LOGIN-30`) |
| 🟡 Sửa | `REQ-LOGIN-15` | Thông báo giống nhau chỉ còn đảm bảo trong **4 lần sai đầu** — từ lần 5 lộ email nào có tài khoản (`RISK-LOGIN-10`, đã chấp nhận) |
| ✏️ Biên tập | `REQ-LOGIN-45` | Chuỗi `in 15 minutes` cố định cho mọi email, không đếm ngược |

> ⚠️ Trả lời này **khác** Giả định tạm của `AMB-LOGIN-21` (giả định: xử lý giống hệt email có thật). Đề xuất *"thêm biến thể so sánh sau 5 lần sai"* cho `CRM_LOGIN_TC_013` **đã huỷ**.

### Bổ sung lần 2 — trả lời 6 ambiguity (qua chat 30-09-2026)

| AMB | Trả lời | So với Giả định tạm | Tác động REQ |
|---|---|---|---|
| `AMB-LOGIN-27` | **Chưa deploy** | Trùng | REQ `45` → `59` giữ ⚪ |
| `AMB-LOGIN-22` | Bỏ trống mật khẩu và mã CSRF sai **có** tính là lần sai | ⚠️ **Khác** | ➕ `REQ-LOGIN-54`, `55` · **thêm 4 TC phải đổi sang PM** (mục B) |
| `AMB-LOGIN-25` | Mốc 15 phút **tính từ lần sai thứ 5** | Trùng | ✏️ `REQ-LOGIN-47` |
| `AMB-LOGIN-26` | Hết khoá bộ đếm **về 0** | Trùng | ➕ `REQ-LOGIN-57` |
| `AMB-LOGIN-23` | Bộ đếm **không** dùng chung giữa các cách viết email | ⚠️ **Khác** | ➕ `REQ-LOGIN-56` · ➕ `RISK-LOGIN-11` · mở `AMB-LOGIN-32` |
| `AMB-LOGIN-30` | Email không tồn tại: lần 5 → 9 chờ 1 phút mỗi lần · lần 10 chờ 15 phút rồi lặp · gửi trong lúc chờ bị chặn, không tính · chuỗi tiếng Việt đúng | Khác một phần | ✏️ `REQ-LOGIN-52`, `53` · ➕ `REQ-LOGIN-58`, `59` · mở `AMB-LOGIN-31` |

> Module sau lần 2: **59 REQ** (24 🟢 · 18 🟡 · 17 ⚪) · **55** trong phạm vi · STORY-LOGIN-07 có **16 REQ** · ambiguity treo **5** (0 🔴).

### Bổ sung lần 3 — chốt 5 ambiguity còn lại theo Giả định tạm (qua chat 30-09-2026)

| AMB | Kết luận | Tác động REQ |
|---|---|---|
| `AMB-LOGIN-24` | Ngay lần sai mật khẩu thứ 5 đã hiện thông báo khoá | ✏️ `REQ-LOGIN-41` — `TC_015` được chấm thông báo ở lần 5 |
| `AMB-LOGIN-28` | Dùng tài khoản PM **chung**, chạy tuần tự cuối đợt | — · ⚠️ chưa có tài khoản staff thứ hai `TC014_EMAIL` cho `REQ-LOGIN-49`, `50` |
| `AMB-LOGIN-29` | Phiên đang mở không bị chấm dứt khi tài khoản bị khoá | ➕ `REQ-LOGIN-60` |
| `AMB-LOGIN-31` | Gửi trong lúc chờ vẫn hiện `Email không tồn tại` | ✏️ `REQ-LOGIN-53`, `59` — chấm qua hệ quả |
| `AMB-LOGIN-32` | Trạng thái khoá gắn với tài khoản, mọi cách viết email đều bị chặn | ➕ `REQ-LOGIN-61` · `RISK-LOGIN-11` giảm một vế |

> Module sau lần 3: **61 REQ** (24 🟢 · 18 🟡 · 19 ⚪) · **57** trong phạm vi · STORY-LOGIN-07 có **18 REQ** · **0 ambiguity treo**.

> 🚫 **30-09-2026 — quyết định user 30-09-2026:** biến thể *email tài khoản `Customer` gửi vào `/admin`* của `REQ-LOGIN-52` ra **ngoài phạm vi kiểm thử**. Lượt BỔ SUNG **không** sinh TC/biến thể cho nó. Không TC hiện có nào bị ảnh hưởng.

---

## Test case cần xử lý

Nguồn rà soát: cột `REQ ID` và cột `Test Data` của [`test_cases_login_web.md`](../../../testcases/login/web/test_cases_login_web.md). **Không** có script automation nào map vào các TC dưới (đã tìm `CRM_LOGIN_TC_015` trong mã nguồn — không thấy).

### A. Bắt buộc sửa

| TC ID | REQ liên quan | Hành động | Lý do |
|---|---|---|---|
| CRM_LOGIN_TC_015 | REQ-LOGIN-41 → 41, 50 | ⚠️ **Viết lại** | Kỳ vọng **đảo ngược**: bản hiện tại assert *không* khoá sau 6 lần sai. Viết lại theo `REQ-LOGIN-41` (4 lần chưa khoá · 5 lần khoá), **đổi sang tài khoản PM**. Biến thể `b` (5 email khác nhau, không khoá theo IP) chuyển truy vết sang `REQ-LOGIN-50`. 🚨 **Không chạy bản hiện tại** sau khi deploy: nó gửi 6 lần sai với `admin@example.com` → khoá `Admin` 15 phút trên môi trường dùng chung |
| Ghi chú đầu **Nhóm C** | REQ-LOGIN-41 | ⚠️ Sửa | Dòng *"🔓 Thử sai mật khẩu lặp lại là an toàn — REQ-LOGIN-41 đã chốt không có cơ chế khoá"* nay **sai**. Thay bằng ràng buộc mới: gửi mật khẩu sai với tài khoản thật chỉ dùng PM, mở đầu bằng một lần đăng nhập đúng để đặt lại bộ đếm |

### B. Review — đổi email `Admin` ở biến thể mật khẩu sai (ràng buộc ticket dòng 6)

Các TC này **không đổi kỳ vọng**, nhưng đang gửi mật khẩu sai với `admin@example.com`. Chạy liền `TC_013` + `016` + `017` + `047` là đủ **5 lần sai** không xen lần đăng nhập đúng nào → **một lượt regression khoá `Admin`** khi tính năng đã deploy (`RISK-LOGIN-03`).

| TC ID | REQ liên quan | Số lần sai với Admin | Hành động đề xuất |
|---|---|---|---|
| CRM_LOGIN_TC_013 | REQ-LOGIN-14, 15 | 1 (biến thể `a`) | ⚠️ Đổi email có thật sang PM. `REQ-LOGIN-15` 🟡 thu hẹp còn **4 lần sai đầu** (`AMB-LOGIN-21` ✅) — **không** thêm biến thể so sánh sau 5 lần |
| CRM_LOGIN_TC_016 | REQ-LOGIN-16 | 1 | ⚠️ Đổi sang email không tồn tại (TC chỉ cần kiểm ô Email có giữ giá trị) hoặc PM |
| CRM_LOGIN_TC_017 | REQ-LOGIN-14 | 1 (biến thể `b` — tiêm SQL) | ⚠️ Đổi sang PM (biến thể cần email có thật) |
| CRM_LOGIN_TC_047 | REQ-LOGIN-14 | 2 (biến thể `a`, `b`) | ⚠️ Đổi sang email không tồn tại hoặc PM |
| CRM_LOGIN_TC_050 | REQ-LOGIN-02, 06, 14 | 3 (mỗi trình duyệt 1 lần, **sau** một lần đăng nhập đúng) | ⚠️ Rủi ro thấp (lần đúng trước đó đặt lại bộ đếm) nhưng vẫn vi phạm ràng buộc ticket → đổi bước 5 sang PM hoặc email không tồn tại |
| CRM_LOGIN_TC_053 | REQ-LOGIN-02, 09 | 1 (biến thể `a`) + 1 bỏ trống (biến thể `b`) | ⚠️ Đổi **cả hai** biến thể sang PM — bỏ trống mật khẩu cũng là lần sai (`AMB-LOGIN-22` ✅) |
| CRM_LOGIN_TC_011 | REQ-LOGIN-10, 11, 12 | 1 bỏ trống mật khẩu (biến thể `c`) | ⚠️ Đổi biến thể `c` sang PM — `AMB-LOGIN-22` ✅ *(bổ sung lần 2)* |
| CRM_LOGIN_TC_025 | REQ-LOGIN-22 | 2 lần CSRF sai (`a`, `b`) | ⚠️ Đổi sang PM — `AMB-LOGIN-22` ✅ *(bổ sung lần 2)* |
| CRM_LOGIN_TC_043 | REQ-LOGIN-02, 10 | 1 bỏ trống mật khẩu (biến thể `b`) | ⚠️ Đổi biến thể `b` sang PM — `AMB-LOGIN-22` ✅ *(bổ sung lần 2)* |

### C. Theo dõi — không sửa lúc này

| TC ID | REQ liên quan | Hành động | Lý do |
|---|---|---|---|
| CRM_LOGIN_TC_014 | REQ-LOGIN-14 | ℹ️ Theo dõi | 1 lần sai với tài khoản staff `TC014_EMAIL`, không phải `Admin` — không vi phạm ràng buộc. Tài khoản này nay còn dùng cho `REQ-LOGIN-49`, `50` (`AMB-LOGIN-28`) |
| CRM_LOGIN_TC_019 | REQ-LOGIN-43, 15 | ℹ️ Không sửa | Chỉ 1 lần gửi. `AMB-LOGIN-21` ✅: email `Customer` ở `/admin` xử lý như email không tồn tại (`REQ-LOGIN-52`) — không khoá |

### D. Viết mới

| TC ID | REQ liên quan | Hành động | Ghi chú |
|---|---|---|---|
| — | REQ-LOGIN-45 → 61 | ➕ Viết mới (17 REQ) | Gắn **skip** — PO xác nhận chưa deploy (`AMB-LOGIN-27` ✅). Dùng tài khoản PM chung (`AMB-LOGIN-28` ✅); `REQ-LOGIN-49`, `50` cần tài khoản staff thứ hai — **chưa có**. Mở đầu mỗi TC bằng một lần đăng nhập đúng (trạng thái sạch). `REQ-LOGIN-47`, `57`, `58` chạy trên 15 phút — tách khỏi smoke. STORY-LOGIN-07 chạy **tuần tự**, **cuối đợt**. `REQ-LOGIN-53`, `58`, `59` chấm qua hệ quả (`AMB-LOGIN-31` ✅) |
| — | `TEST_CASES_LOGIN_SUMMARY.md` | ⚠️ Cập nhật | Dòng độ phủ `REQ-LOGIN-41` ("Không khoá tài khoản sau nhiều lần sai") đổi tên; thêm 7 dòng REQ mới |

---

## Ambiguity

| Mã | Chuyển trạng thái | Mức | Ghi chú |
|---|---|---|---|
| AMB-LOGIN-02 | ✅ giữ nguyên · 🔁 kết luận bị đảo ngược | — | Kết luận "không khoá" bị ticket thay. **Khác** Assumption cũ → mọi TC dựa trên kết luận cũ phải sửa (`TC_015` + ghi chú Nhóm C) |
| AMB-LOGIN-21 | (mới) ❓ → ✅ 30-09-2026 | 🔴 | **Khác** Giả định tạm: không khoá email không tồn tại, từ lần 5 báo `Email không tồn tại` + đợi 1 phút → `REQ-LOGIN-52`, `53`; `REQ-LOGIN-15` thu hẹp |
| AMB-LOGIN-22 | (mới) ❓ → ✅ 30-09-2026 | 🟡 | **Khác** giả định: bỏ trống mật khẩu và CSRF sai **có** tính → `REQ-LOGIN-54`, `55` |
| AMB-LOGIN-23 | (mới) ❓ → ✅ 30-09-2026 | 🟡 | **Khác** giả định: bộ đếm tách theo đúng chuỗi email → `REQ-LOGIN-56`, `RISK-LOGIN-11` |
| AMB-LOGIN-24 | (mới) ❓ → ✅ 30-09-2026 (chốt theo Giả định tạm) | 🟡 | Ngay lần sai thứ 5 đã hiện thông báo khoá → `REQ-LOGIN-41` |
| AMB-LOGIN-25 | (mới) ❓ → ✅ 30-09-2026 | 🟡 | Chuỗi `15 minutes` cố định · mốc tính từ lần sai thứ 5 → `REQ-LOGIN-45`, `47` |
| AMB-LOGIN-26 | (mới) ❓ → ✅ 30-09-2026 | 🟡 | Hết khoá bộ đếm về 0 → `REQ-LOGIN-57` |
| AMB-LOGIN-27 | (mới) ❓ → ✅ 30-09-2026 | 🔴 | **Chưa deploy** — REQ mới giữ ⚪ |
| AMB-LOGIN-28 | (mới) ❓ → ✅ 30-09-2026 (chốt theo Giả định tạm) | 🟡 | Dùng PM chung · ⚠️ chưa có `TC014_EMAIL` |
| AMB-LOGIN-29 | (mới) ❓ → ✅ 30-09-2026 (chốt theo Giả định tạm) | 🟢 | Phiên đang mở giữ nguyên → `REQ-LOGIN-60` |
| AMB-LOGIN-30 | (mới) ❓ → ✅ 30-09-2026 | 🟡 | Nhịp chờ 1 phút (lần 5 → 9) · 15 phút (lần 10) rồi lặp · gửi trong lúc chờ không tính · chuỗi tiếng Việt đúng → `REQ-LOGIN-53`, `58`, `59` |
| AMB-LOGIN-31 | (mới) ❓ → ✅ 30-09-2026 (chốt theo Giả định tạm) | 🟡 | Gửi trong lúc chờ vẫn hiện `Email không tồn tại` → chấm qua hệ quả |
| AMB-LOGIN-32 | (mới) ❓ → ✅ 30-09-2026 (chốt theo Giả định tạm) | 🟡 | Khoá gắn tài khoản, mọi cách viết đều bị chặn → `REQ-LOGIN-61` |

## Risk

| Mã | Thay đổi | Ghi chú |
|---|---|---|
| RISK-LOGIN-01 | Xác nhận → **giảm một phần** | Khoá theo email chặn dò một tài khoản, nhưng không khoá IP + không CAPTCHA → password spraying vẫn không bị chặn |
| RISK-LOGIN-03 | Đóng → 🔁 **mở lại** | TC gửi mật khẩu sai có thể khoá tài khoản cả đội trên môi trường dùng chung |
| RISK-LOGIN-09 | (mới) | Khoá theo email cho phép cố ý khoá tài khoản người khác, kể cả `Admin` |
| RISK-LOGIN-10 | (mới) · đã chấp nhận | Từ lần sai thứ 5, email có thật và email không tồn tại báo khác nhau → lộ email nào có tài khoản. Cần PO + đội bảo mật xác nhận |
| RISK-LOGIN-11 | (mới) · đã chấp nhận · giảm một vế | Bộ đếm tách theo chuỗi email → dò 4 lần cho mỗi cách viết thì khoá không bao giờ kích hoạt. Vế *lách khoá đã kích hoạt* đã loại nhờ `REQ-LOGIN-61`. Cần PO + đội bảo mật xác nhận |

## Cảnh báo

- 🚨 **Không chạy `CRM_LOGIN_TC_015` bản hiện tại** kể từ khi tính năng deploy — khoá `Admin` 15 phút cho cả đội.
- ⚠️ `REQ-LOGIN-41` 🟡 và 7 REQ ⚪ **chưa có bằng chứng** trên hệ thống. Khi `AMB-LOGIN-27` được trả lời là đã deploy → recon lại trên UI (khung hiển thị thông báo, nội dung lần sai thứ 5) và cập nhật `REQ-LOGIN-45`, `41` bằng `/update-requirements-from-ticket`.
- ⚠️ Hành vi khoá với vai trò `Admin` **sẽ không được kiểm chứng** — hệ quả được chấp nhận của ràng buộc ticket dòng 6.
- ℹ️ Ràng buộc "không gửi mật khẩu sai bằng `Admin`" áp cho **mọi module** — đã ghi vào bảng thuộc tính đầu `docs/requirements/README.md`.
