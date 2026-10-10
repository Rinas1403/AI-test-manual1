# Execution Report — LOGIN · Đăng nhập Admin thành công (smoke 1 TC)

| Thông tin | Nội dung |
|---|---|
| Run ID | run_1791662983 |
| Nền tảng | `web` |
| Loại nguồn | Bộ TC |
| Nguồn TC | [part_01_web_dang_nhap.md](../../../../testcases/login/web/parts/part_01_web_dang_nhap.md) (Nhóm B) |
| Phạm vi | 1 TC — `CRM_LOGIN_TC_005` (REQ-LOGIN-06) · theo yêu cầu user *"chạy 1 test case login thành công"* |
| Môi trường | `https://crm.anhtester.com` — môi trường demo |
| Build / Version | Không được cung cấp |
| Tài khoản | `Admin` — giá trị trong `.env`, **không** ghi vào report |
| Người thực hiện | QA (agent hỗ trợ) — agent **không** tự nhập mật khẩu; bước 1–4 do QA gõ trên cửa sổ Chrome của Playwright, agent mở trang, chấm kết quả và thu evidence |
| Trình duyệt | Google Chrome (Playwright MCP, headed). Số đo `inner 1600×750` > `outer 1554×886` → viewport rộng hơn cửa sổ, trang bị cắt ~46px bên phải trong mắt tester (ảnh chụp vẫn đủ). **Không** resize ở lượt này — không ảnh hưởng tới phần cần chấm |
| Bắt đầu → Kết thúc | 11-10-2026 03:07 → 03:15 (gồm thời gian chờ QA đăng nhập) |
| Môi trường dùng chung? | Có — auto-skip TC phá huỷ đang BẬT (TC này không phá huỷ) |

> 📌 URL user đưa (`/login`) là **cổng khách hàng**. Tài khoản Admin đăng nhập ở `/admin/authentication` — chạy theo đúng Pre-condition của `TC_005`.

## 1. Tổng kết

| Trạng thái | Số lượng | Tỷ lệ |
|---|---|---|
| ✅ PASS | 1 | 100% |
| ❌ FAIL | 0 | 0% |
| ⚠️ BLOCKED | 0 | 0% |
| ⏭️ SKIPPED | 0 | 0% |
| **Tổng** | **1** | 100% |

## 2. Kết quả từng TC

| TC ID | Test Scenario | Kết quả | Bước fail | Ghi chú |
|---|---|---|---|---|
| CRM_LOGIN_TC_005 | Đăng nhập bằng tài khoản Admin hợp lệ thì vào được Dashboard | ✅ PASS | — | 4. Không có dải báo lỗi đỏ (`.alert-danger` = 0) · 5. Không quay lại trang đăng nhập · 6. URL `https://crm.anhtester.com/admin/` · tab `Dashboard` · có menu điều hướng trái và ảnh đại diện góc phải trên. 🔧 `body` mang đủ `app`, `admin`, `dashboard`, `user-id-2` · trang `/admin/` đến sau **1** lần chuyển hướng, trả `200`. Mã `303` + header `location` của `POST` **không** đọc được — QA bấm `Login` trước khi agent gắn theo dõi request, danh sách request đã bị xoá khi trang chuyển; `redirectCount = 1` là bằng chứng gián tiếp. Evidence: [CRM_LOGIN_TC_005_step6_vao_dashboard.png](evidence/CRM_LOGIN_TC_005_step6_vao_dashboard.png) (viewport) |

## 3. Chi tiết TC FAIL

Không có TC FAIL.

## 4. TC BLOCKED

Không có TC BLOCKED.

## 5. Dữ liệu đã tạo & dọn dẹp

| Dữ liệu | ID | Nơi tạo | Đã xoá? |
|---|---|---|---|
| Không tạo bản ghi nghiệp vụ nào | — | — | — |
| Phiên đăng nhập Admin (không tích `Remember me` → không có cookie `autologin`) | — | Trình duyệt Playwright | ➖ Giữ lại để QA dùng tiếp; hết khi đóng trình duyệt |

## 6. Đề xuất bước tiếp theo

- Muốn chấm đủ dòng 🔧 (`303` + `location`): chạy lại với bộ theo dõi request gắn **trước** khi QA bấm `Login`.
- Automation hiện **chưa có script nào mang TC ID** (`tests/login.spec.ts` dùng tên tiếng Anh, không có `allure.label('testId', …)`) → `TC_005` là ứng viên đầu tiên cho `/generate-automation-web` (đã chấm `Automation = Yes`).
