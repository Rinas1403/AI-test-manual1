# Impact Report — `DEC-LOGIN-01` · 2026-09-18

← [Tài liệu requirements module LOGIN](../requirements_login.md) · [Danh mục requirements](../../README.md)

| Mục | Giá trị |
|---|---|
| **Nguồn thay đổi** | Quyết định chốt ambiguity của người dùng (không phải ticket) — mã đợt `DEC-LOGIN-01` |
| **Module** | `LOGIN` — Đăng nhập & Phiên làm việc |
| **Nội dung chốt** | `AMB-09` do người dùng chốt trực tiếp · 15 ambiguity còn lại lấy theo giá trị đề xuất, được người dùng xác nhận là câu trả lời chính thức |
| **Dải mã sau cập nhật** | `REQ-LOGIN-01` → `REQ-LOGIN-40` · `AMB-09` → `AMB-25` · `RISK-06` → `RISK-10` |
| **Mã kế tiếp** | `REQ-LOGIN-41` · `AMB-26` · `RISK-11` |

---

## 1. Tóm tắt

| Nhóm | Số lượng | REQ |
|---|---|---|
| 🟢 Thêm mới | 3 | `REQ-LOGIN-38`, `39`, `40` — cả ba ở trạng thái ⚪ |
| 🟡 Sửa | 2 | `REQ-LOGIN-20`, `REQ-LOGIN-32` |
| ✏️ Biên tập (không đổi hành vi) | 7 | `REQ-LOGIN-21`, `28`, `31`, `33`, `34`, `36`, `37` |
| 🔴 Bỏ | 0 | — |
| ⏸️ Không tác động | 28 | Các REQ còn lại |

**Trạng thái REQ sau cập nhật:** 40 REQ — 🟢 33 · 🟡 2 · ⚪ 5 · 🔴 0.

---

## 2. Ba yêu cầu mới (🟢 Thêm → trạng thái ⚪)

| REQ ID | Tên | Sinh từ | Vì sao ở trạng thái ⚪ |
|---|---|---|---|
| `REQ-LOGIN-38` | Cookie `autologin` phải đặt cờ HttpOnly | AMB-12 ✅ | Hệ thống **hiện không đạt** — `REQ-LOGIN-20` ghi nhận `httpOnly === false`. Chờ bản vá |
| `REQ-LOGIN-39` | Form quên mật khẩu không được tiết lộ email có tồn tại hay không | AMB-17 ✅ | Hệ thống **hiện không đạt** — `REQ-LOGIN-32` ghi nhận `Email not found`. Ngoài ra vế "email tồn tại" cần môi trường riêng (ràng buộc AMB-18 ⏭️) |
| `REQ-LOGIN-40` | Phiên hết hiệu lực sau ≈ 8 giờ không thao tác, không có cảnh báo | AMB-11 ✅ | Không kiểm được trong một lần chạy suite thường — cần chờ hết hạn hoặc giả lập thời gian |

---

## 3. Test case cần xử lý

> ⚠️ **Module `LOGIN` chưa có manual test case nào** — `docs/testcases/` chưa tồn tại. Cột "TC ID" dưới đây là **việc phải làm khi sinh TC**, không phải TC đang có bị hỏng.

### 3.1. Manual test cases

| TC ID | REQ liên quan | Hành động | Lý do |
|---|---|---|---|
| — (chưa có) | `REQ-LOGIN-38`, `39`, `40` | ➕ **Viết mới, đánh `skip`** | Yêu cầu đã chốt nhưng hệ thống chưa đạt / chưa kiểm được. Viết trước để độ phủ không báo xanh giả |
| — (chưa có) | `REQ-LOGIN-20`, `REQ-LOGIN-32` | ⚠️ **Viết kèm nhãn `defect-documented`** | Hai REQ này ghi nhận **khiếm khuyết đã xác nhận**, không phải hành vi đúng. TC sẽ **đảo nghĩa** khi dev vá — không viết như TC nghiệp vụ thông thường |
| — (chưa có) | `REQ-LOGIN-36`, `37`, `39` | ⏭️ **Viết khung, đánh `skip`** | AMB-18 hoãn: không có môi trường riêng + hộp thư test trong đợt này |
| — (chưa có) | 33 REQ 🟢 còn lại | ➕ **Viết mới bình thường** | Không bị tác động bởi đợt chốt này |

**Ràng buộc bắt buộc áp cho toàn bộ TC sắp sinh** (mục 8 của tài liệu requirements):

| Ràng buộc | Nguồn |
|---|---|
| Tối đa **5 lần đăng nhập sai** cho cùng một tài khoản trong một lần chạy suite | AMB-09 |
| Chỉ phủ viewport desktop `1600×750`; **không** suy diễn sang viewport hẹp | AMB-21 |
| **Cấm assert mã HTTP** — mã chuyển hướng (AMB-14) và mã lỗi CSRF (AMB-15). Chỉ assert điểm dừng cuối cùng và chuỗi hiển thị | AMB-14, AMB-15 |
| Ô Remember me: **tích ô**, cấm đặt `value` bằng tay | AMB-22 |
| Chứng minh đăng xuất bằng "không truy cập được", **cấm** assert "cookie `autologin` biến mất" | AMB-13 |
| **Không** viết TC cho rule cắt khoảng trắng của email ở tầng UI | AMB-23 |
| **Không** viết TC phân quyền đa vai trò cho module này | AMB-24 |

### 3.2. Automation script hiện có

Repo có 7 kịch bản: `tests/login.spec.ts` (4) · `tests/navigation.spec.ts` (3).

| Script | REQ đang phủ | Tác động của đợt này |
|---|---|---|
| `login.spec.ts` — 4 kịch bản | `REQ-LOGIN-05`, `07`, `08`, `09` | ✅ **Không tác động** — bốn REQ này không đổi |
| `navigation.spec.ts` — 3 kịch bản | `REQ-LOGIN-29`, `18`/`21` (một phần), `22`/`25` | ✅ **Không tác động** — không script nào chạm `REQ-LOGIN-20` hay `REQ-LOGIN-32` |

**Kết luận: không script nào phải sửa trong đợt này.** Phần automation đang **thiếu** vẫn như ghi nhận ở tài liệu requirements: cookie ghi nhớ đăng nhập (`REQ-LOGIN-18`, `19`) và nhánh hộp thoại cảnh báo timer khi đăng xuất (`REQ-LOGIN-23`) — nay thêm `REQ-LOGIN-38`, `40` (đánh `skip`).

---

## 4. Ambiguity

| Mã | Chuyển trạng thái | Kết luận |
|---|---|---|
| AMB-09 | ❓ → ✅ | **Người dùng chốt trực tiếp:** không có cơ chế khoá tài khoản; trần **5 lần sai/tài khoản/lần chạy suite**. Trùng Assumption tạm → REQ không đổi |
| AMB-10 | ❓ → ✅ | Không có giới hạn tần suất. Trùng Assumption tạm → REQ không đổi |
| AMB-11 | ❓ → ✅ | Phiên hết hiệu lực ≈ 8 giờ, không cảnh báo → sinh `REQ-LOGIN-40` |
| AMB-12 | ❓ → ✅ | `autologin` thiếu HttpOnly là **khiếm khuyết** → sinh `REQ-LOGIN-38`, `REQ-LOGIN-20` chuyển 🟡, **mở bug** |
| AMB-13 | ❓ → ✅ | Cookie còn, token chết ở máy chủ — chấp nhận. TC cấm assert "cookie biến mất" |
| AMB-14 | ❓ → ✅ | Mã chuyển hướng là chi tiết cấu hình máy chủ → cấm assert mã HTTP |
| AMB-15 | ❓ → ✅ | Lỗi CSRF: assert chuỗi `419 Page Expired!` + không tạo được phiên, cấm assert mã HTTP |
| AMB-16 | ❓ → ✅ | Khác biệt giữa hai form là hành vi được chấp nhận → **không mở bug** |
| AMB-17 | ❓ → ✅ | Tiết lộ email tồn tại là **khiếm khuyết bảo mật** → sinh `REQ-LOGIN-39`, `REQ-LOGIN-32` chuyển 🟡, **mở bug** |
| AMB-18 | ❓ → ⏭️ | **Hoãn** — không có môi trường riêng + hộp thư test. `REQ-LOGIN-36`, `37` giữ ⚪ |
| AMB-19 | ❓ → ✅ | Thiếu link quay lại — chấp nhận hiện trạng |
| AMB-20 | ❓ → ✅ | Luôn về Dashboard, không khôi phục URL — là hành vi đúng |
| AMB-21 | ❓ → ✅ | **Chốt phạm vi:** chỉ phủ desktop `1600×750`; viewport hẹp ngoài phạm vi |
| AMB-22 | ❓ → ✅ | `value="estimate"` là rác template → automation tích ô |
| AMB-23 | ❓ → ✅ | Không kiểm được ở tầng UI → **không cấp REQ, không viết TC** |
| AMB-24 | ❓ → ⏭️ | **Hoãn** — chỉ có 1 tài khoản; 5 ô `❔` của ma trận phân quyền giữ nguyên |
| **AMB-25** | (mới) ❓ 🟡 | Hai khiếm khuyết đã xác nhận sẽ sửa ở bản nào? Thông báo trung lập của form quên mật khẩu dùng nguyên văn gì? |

**Không còn ambiguity 🔴 High nào chờ trả lời ở module `LOGIN`.**

---

## 5. Rủi ro — thay đổi mức độ

| Mã | Thay đổi | Hệ quả |
|---|---|---|
| **RISK-06** | ⬆️ Nâng mức | AMB-12 chốt là khiếm khuyết → **bắt buộc mở bug** (`/create-bug-report`), không dừng ở "báo phát hiện" |
| **RISK-07** | 🔄 Đổi bản chất | Từ *"vùng mù chưa kiểm được"* thành *"điểm yếu bảo mật đã xác nhận"* — hệ thống **không có** khoá tài khoản lẫn giới hạn tần suất. Báo cáo độ phủ phải ghi **"đã chốt không tồn tại"**, không ghi "chưa kiểm" |
| **RISK-09** | ⬆️ Nâng mức | AMB-17 chốt là khiếm khuyết bảo mật → **bắt buộc mở bug**. Kết hợp RISK-07 (không giới hạn tần suất) làm mức khai thác cao hơn hẳn |
| RISK-08, RISK-10 | Không đổi | — |

---

## 6. Cảnh báo

- 🚨 **Hai bug bảo mật phải được mở trước khi bàn giao bộ TC** — `RISK-06` (cookie `autologin` thiếu HttpOnly) và `RISK-09` (dò tài khoản qua form quên mật khẩu). Cả hai đã được chốt là khiếm khuyết, không còn là câu hỏi ngỏ. Chạy `/create-bug-report`.
- ⚠️ **`AMB-25` treo thì `REQ-LOGIN-39` chưa assert được nguyên văn** — TC chỉ viết được phần khung "hai lượt trả cùng một thông báo".
- ⚠️ **Vùng không có ai kiểm, phải ghi vào báo cáo độ phủ:** nửa sau luồng quên mật khẩu (`REQ-LOGIN-36`, `37`, `39` — AMB-18 ⏭️) · phân quyền đa vai trò, 5/15 ô ma trận (AMB-24 ⏭️) · hết phiên sau 8 giờ (`REQ-LOGIN-40`). Đây là **quyết định phạm vi**, không được làm tròn thành "đã kiểm".
- ⚠️ **`REQ-LOGIN-20` và `REQ-LOGIN-32` là TC ghi nhận khiếm khuyết** — khi dev vá, hai TC này **đảo nghĩa hoàn toàn** chứ không chỉ sửa assertion. Gắn nhãn `defect-documented` ngay từ lúc viết để lần sau tìm được.

---

## 7. Bước kế tiếp

| Việc | Workflow |
|---|---|
| Sinh manual TC cho module `LOGIN` (chưa có TC nào) | `/generate-testcases-manual-rbt` — đọc Impact Report này để áp đúng 7 ràng buộc ở mục 3.1 |
| Mở bug cho 2 khiếm khuyết bảo mật đã xác nhận | `/create-bug-report` |
| Bổ sung automation còn thiếu (`REQ-LOGIN-18`, `19`, `23`) | `/generate-automation-from-testcases` — sau khi có TC |

> Module chưa có TC nên **không chạy** `/update-testcases-from-impact` (workflow đó dùng để sửa TC đã có). Đúng đường là sinh mới bằng `/generate-testcases-manual-rbt`.
