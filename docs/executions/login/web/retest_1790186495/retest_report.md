# Retest Report — LOGIN · Web · Không đối chiếu được build (hệ thống demo)

| Thông tin | Nội dung |
|---|---|
| Retest ID | retest_1790186495 |
| Mode | **RETEST** (chỉ verify bug — bug Severity 🟢 Trivial, không đủ điều kiện Mode FULL) |
| Bug retest | [BUG_login_1787226517_TC029](../../../bugs/login/web/BUG_login_1787226517_TC029.md) |
| Build lúc log bug → Build retest | *(không đối chiếu được)* — bug gốc ghi "hệ thống không có trang hiển thị version công khai"; coi ngày chạy làm mốc thay cho mã build |
| Môi trường | `https://crm.anhtester.com/admin/authentication/forgot_password` — môi trường dùng chung |
| Tài khoản | Không cần tài khoản — lỗi tái hiện ở trạng thái chưa đăng nhập |
| Người thực hiện | Claude Code (agent) qua Playwright MCP |
| Thời gian | 24-09-2026 (2 lượt: 1 lượt trong `run_1790185822` lúc chạy `/execute-test-cases`, 1 lượt retest riêng vừa thực hiện) |
| Môi trường dùng chung? | Có — auto-skip TC phá huỷ đang BẬT (không áp dụng, không có thao tác phá huỷ) |

## 1. Kết quả verify bug

| | |
|---|---|
| Bug | [BUG_login_1787226517_TC029](../../../bugs/login/web/BUG_login_1787226517_TC029.md) — Ô Email ở trang Quên mật khẩu không tự reset sau khi submit email không tồn tại |
| Severity gốc | 🟢 Trivial |
| TC / REQ liên quan | `CRM_LOGIN_TC_029` · `REQ-LOGIN-26` |
| **Kết quả** | ❌ **NOT_FIXED** |
| Expected (theo bug gốc) | Sau khi dải báo lỗi `Email not found` hiển thị, ô Email trở về **rỗng** |
| Actual lần này | Ô Email **vẫn giữ nguyên** giá trị `notexist_20260820@auto.test` — y hệt Actual đã ghi trong bug gốc |
| Số lần lặp | 2/2 đều NOT_FIXED — lần 1 trong [run_1790185822](../run_1790185822/execution_report.md) (`TC_029` FAIL #1), lần 2 vừa chạy riêng cho retest này |
| Evidence | Lần 1: [TC_029_email_not_cleared.png](../run_1790185822/evidence/TC_029_email_not_cleared.png) · Lần 2: [BUG_login_1787226517_TC029_retest_not_fixed.png](evidence/BUG_login_1787226517_TC029_retest_not_fixed.png) |

**Steps to Reproduce đã chạy (nguyên văn từ bug gốc):**
1. Mở `https://crm.anhtester.com/admin/authentication/forgot_password`
2. Nhập ô Email: `notexist_20260820@auto.test` (email không tồn tại trong hệ thống)
3. Bấm nút `Confirm`
4. Sau khi dải báo lỗi `Email not found` hiển thị, quan sát lại ô Email

Không rút gọn, không đi đường khác so với bug gốc.

## 2. Regression quanh vùng fix

Bỏ qua — Mode **RETEST** (bug Severity Trivial, fix cô lập ở đúng ô Email trang Quên mật khẩu, không đụng logic dùng chung).

## 3. Regression phát sinh do fix

Không áp dụng — bug **chưa được fix**, không có gì để kiểm regression.

## 4. Dữ liệu đã tạo & dọn dẹp

Không tạo dữ liệu nghiệp vụ nào — chỉ submit email không tồn tại ở form Quên mật khẩu, không sinh bản ghi nào trong hệ thống.

## 5. Kết luận & đề xuất

| Bug | Trạng thái đề xuất | Lý do |
|---|---|---|
| BUG_login_1787226517_TC029 | 🔴 **Giữ mở** — NOT_FIXED | Lỗi gốc vẫn tái hiện nhất quán 2/2 lần, đúng Steps to Reproduce gốc, sau hơn 5 tuần kể từ lần phát hiện đầu (20-08-2026) |

- Đây là **lần retest đầu tiên** của bug này kể từ khi mở — trước đó `Lịch sử retest` trống suốt 5 tuần.
- ⚠️ **Không đối chiếu được build** vì hệ thống demo không có trang version công khai — nếu dev xác nhận đã fix ở một thời điểm cụ thể, nên retest lại ngay sau mốc đó thay vì dựa vào ngày chạy suông.
- Bug vẫn để ngỏ câu hỏi gốc: *"giữ lại email sau lỗi có phải hành vi cố ý (thuận tiện hơn cho người dùng) hay là thiếu sót"* — chưa có xác nhận từ PO. Đề nghị hỏi PO trước khi ưu tiên fix, vì Severity chỉ ở mức Trivial.
- Không phát sinh bug mới, không cần chạy Mode FULL.
