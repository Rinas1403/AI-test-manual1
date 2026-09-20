# Master Test Plan — ANHTESTER CRM (vùng Admin) · Release 1.0

## Kiểm soát tài liệu

### Thông tin tài liệu

| | |
|---|---|
| Mã tài liệu | `test_plan_release_1.0` |
| Phiên bản tài liệu | v1.0 |
| Trạng thái | 🟨 Draft — còn **14** ô chờ thông tin |
| Mức phân loại | ❓ Chờ QA Lead chọn (công khai · nội bộ · mật) |
| Ngày lập | 18-09-2026 |
| Ngày hiệu lực | — (chưa duyệt) |
| Người lập | Anh Tester — Trưởng nhóm QA (suy từ mục 6 Nhân lực; ô `Người lập` của phiếu để trống) |
| Người review | ❓ Chờ QA Lead chỉ định |
| Người phê duyệt | Anh Tester — QA Lead · ❓ Product Owner (chưa có tên) — chữ ký ở mục 11 |
| Hệ thống · Build | ANHTESTER CRM — bản demo Perfex CRM, vùng Admin (`/admin`) · **v1.0.0** |
| Phiếu đầu vào | `docs/test-plans/test_plan_release_1.0.input.yaml` (bản lưu của `plans/master-test-plan/test_plan.config.yaml` ngày 18-09-2026) |
| Cấu trúc tài liệu | Biên soạn **theo cấu trúc** ISO/IEC/IEEE 29119-3 — Test Plan · phủ đủ nội dung điển hình của ISTQB CTFL v4.0 mục 5.1.1 · ánh xạ ở mục 12 |

> **Trạng thái hợp lệ:** 🟨 Draft (đang soạn / còn ô treo) → 🟦 Chờ duyệt (đã review, không còn ô treo chặn) → 🟩 Đã duyệt (đủ chữ ký mục 11) → ⬛ Hết hiệu lực (có bản mới thay thế). Sửa nội dung bản 🟩 → quay về 🟨, tăng phiên bản.

> **Ô còn treo (14):**
>
> *Cần **Anh Tester — QA Lead** trả lời:*
> - **1.** Người review plan và mức phân loại tài liệu (Kiểm soát tài liệu)
> - **2.** Duyệt 3 mục tiêu kiểm thử do agent đề xuất (mục 1.1)
> - **3.** Bốn loại phi chức năng còn để trống trong phiếu — Tương thích · Khả năng truy cập · Khả dụng · Độ tin cậy & phục hồi: làm hay không làm (mục 3.2.1)
> - **4.** Toàn bộ mục `Chiến lược tự động hoá` của phiếu để trống — mục tiêu · phạm vi tự động / không tự động · tầng kiểm thử · tiêu chí chọn TC · kích hoạt chạy (mục 3.7)
> - **5.** Quản lý lỗi: có dùng quy trình trạng thái và thang Severity/Priority mặc định của repo không · ai phân loại lỗi · họp phân loại bao lâu một lần (mục 9.1 – 9.4)
> - **6.** Thời hạn phản hồi / sửa xong theo Severity — **không có mặc định**, agent không đặt số (mục 9.4)
> - **7.** Tên người giữ vai trò Product Owner / BA (mục 2.4 · 11)
>
> *Cần **Đội DEV** trả lời:*
> - **8.** Dữ liệu kiểm thử trên môi trường riêng: dữ liệu nền gồm gì · nguồn dữ liệu · có dữ liệu thật của khách hàng không · ai dọn · làm mới khi nào (mục 5.2)
> - **9.** Môi trường riêng có kèm **hộp thư test** không — điều kiện để đưa lại `REQ-LOGIN-36`, `37`, `39` vào phạm vi (mục 2.1)
> - **10.** Ngày Allure report và pipeline CI sẵn sàng dùng được (mục 3.7 · 4.1 · 5.3)
>
> *Chờ trả lời từ trước, đã treo trong `docs/requirements/`:*
> - **11.** **AMB-01** 🔴 — `/admin/settings` và `/admin/staff` trả `Access denied`: giới hạn cố ý của bản demo hay cần tài khoản quyền cao hơn
> - **12.** **AMB-02** 🔴 — hệ thống có những vai trò nào; chặn ma trận phân quyền của **mọi** module trong phạm vi
> - **13.** **AMB-25** 🟡 — lịch sửa 2 khiếm khuyết bảo mật đã xác nhận ở `LOGIN` (`REQ-LOGIN-38`, `39`)
>
> *Việc của người có bản chuẩn:*
> - **14.** Đối chiếu lại tên mục ISO/IEC/IEEE 29119-3 ở bảng 12.1 trước khi đem plan đi audit — agent không có bản chuẩn để tra

### Lịch sử thay đổi

| Phiên bản | Ngày | Người sửa | Mục thay đổi | Nội dung | Người duyệt |
|---|---|---|---|---|---|
| v1.0 | 18-09-2026 | Anh Tester (qua `/generate-master-test-plan`) | Toàn bộ | Lập mới từ phiếu `test_plan.config.yaml` | ❓ |

---

## 1. Mục tiêu & Cơ sở kiểm thử

### 1.1 Mục tiêu kiểm thử

> ⚠️ Ô `Mục tiêu` của phiếu để trống → ba mục tiêu dưới đây là **đề xuất của agent, chờ QA Lead duyệt** (ô treo #2).

| # | Mục tiêu | Đo bằng |
|---|---|---|
| O1 | Xác nhận cổng vào hệ thống (`LOGIN`) hoạt động đúng đặc tả đã chốt — 40 REQ, gồm cả tầng cookie/phiên và CSRF — trên trình duyệt desktop | Tiêu chí exit #3, #4, #6 |
| O2 | Phủ kiểm thử lần đầu cho hai module nghiệp vụ gốc `CUST` và `PRJ`: có tài liệu requirements, có test case, đã chạy ít nhất một vòng | Tiêu chí exit #7 · chỉ số độ phủ mục 3.6 |
| O3 | Không còn bug Critical đang mở ở cả ba module trong phạm vi trước ngày phát hành 15-12-2026 | Tiêu chí exit #1, #2 |

### 1.2 Cơ sở kiểm thử (Test basis)

| Tài liệu | Phiên bản / ngày cập nhật | Module | Ghi chú |
|---|---|---|---|
| [`docs/requirements/login/requirements_login.md`](../requirements/login/requirements_login.md) | Nhật ký thay đổi **18-09-2026** · đợt `DEC-LOGIN-01` | `LOGIN` | 40 REQ (🟢 33 · 🟡 2 · ⚪ 5) · **0 AMB 🔴**, còn `AMB-25` 🟡 |
| [`docs/requirements/_discovery/system_map.md`](../requirements/_discovery/system_map.md) | Khảo sát **14-09-2026** | Cấp hệ thống | Chỉ cấp prefix, **không** cấp REQ. Ước `CUST` ~20 REQ · `PRJ` ~30 REQ |
| [`docs/requirements/_discovery/modules/module_01_khach_hang_lien_he.md`](../requirements/_discovery/modules/module_01_khach_hang_lien_he.md) | 14-09-2026 | `CUST` | Hồ sơ khám phá — **chưa** phải requirements |
| [`docs/requirements/_discovery/modules/module_06_du_an_cong_viec.md`](../requirements/_discovery/modules/module_06_du_an_cong_viec.md) | 14-09-2026 | `PRJ` | Hồ sơ khám phá — **chưa** phải requirements |
| — | — | `CUST` · `PRJ` | ⚠️ **Chưa có tài liệu requirements**. Phải chạy `/generate-requirements-from-website` trước khi viết TC — xem rủi ro R1 mục 8.1 |

> Cơ sở kiểm thử **đổi giữa đợt** (ticket sửa yêu cầu) → cập nhật bằng `/update-requirements-from-ticket` rồi tăng phiên bản plan — TC viết theo cơ sở cũ là TC sai.

## 2. Phạm vi

### 2.1 Trong phạm vi

> Mỗi dòng là **một module × một nền tảng** — đơn vị báo cáo tiến độ theo dõi và báo cáo tổng hợp chấm tiêu chí exit #7.

| Module | Prefix | Nền tảng | Số REQ | Số TC hiện có | Đã từng chạy? | Ghi chú |
|---|---|---|---|---|---|---|
| Đăng nhập & Phiên làm việc | `LOGIN` | web | **40** (`REQ-LOGIN-01` → `40`) | **0** — `docs/testcases/` trống | ❌ Chưa có `run_*` nào trong `docs/executions/` | Đã recon xong 18-09-2026. Có sẵn **7 kịch bản automation** (`tests/login.spec.ts`, `tests/navigation.spec.ts`) — thiếu phần cookie ghi nhớ đăng nhập và nhánh hộp thoại cảnh báo timer khi đăng xuất |
| Khách hàng | `CUST` | web | **0** — ⬜ chưa khảo sát | 0 | ❌ | Gốc phụ thuộc của toàn hệ thống. **Phải recon trước** khi viết TC |
| Dự án | `PRJ` | web | **0** — ⬜ chưa khảo sát | 0 | ❌ | Hub gom 8 module qua 12 tab (RISK-02). **Phải recon trước** khi viết TC |

**Tổng: 3 cặp module × nền tảng.** Toàn bộ trên nền tảng **web**; mobile và API nằm ngoài phạm vi (mục 2.2).

**REQ cần quyết định lại** — phiếu khai `Đưa lại REQ bị loại vì môi trường: có`, và đợt này dùng **môi trường riêng** thay vì môi trường dùng chung lúc khảo sát:

| REQ | Nội dung | Lý do bị loại trước đây | Quyết định theo phiếu |
|---|---|---|---|
| `REQ-LOGIN-36` | Gửi yêu cầu đặt lại mật khẩu cho email tồn tại | ⏭️ AMB-18 — không thử được trên môi trường dùng chung, cần **môi trường riêng + hộp thư test** | ✅ **Đưa lại vào phạm vi**, với điều kiện môi trường riêng có hộp thư test (ô treo #9). Chưa có hộp thư → giữ ⚪ và TC `skip` |
| `REQ-LOGIN-37` | Đặt lại mật khẩu qua liên kết trong email | ⏭️ AMB-18 — như trên; chưa biết route, hình thái liên kết, rule mật khẩu mới | ✅ **Đưa lại**, cùng điều kiện. Cần recon bổ sung luồng này trước khi viết TC |
| `REQ-LOGIN-39` | Form quên mật khẩu không được tiết lộ email có tồn tại | ⏭️ AMB-18 (một phần) **+** hệ thống hiện KHÔNG đạt — chờ bản vá | ⚠️ **Chỉ đưa lại được phần kiểm chứng**; hành vi đúng vẫn phụ thuộc bản vá (AMB-25, ô treo #13). TC giữ `skip` cho tới khi có bản vá |
| `REQ-LOGIN-38` | Cookie `autologin` phải đặt cờ HttpOnly | **Không** phải lý do môi trường — hệ thống chưa đạt, chờ bản vá | ❌ **Giữ nguyên ⚪**, TC `skip`. Không tự đưa lại |
| `REQ-LOGIN-40` | Phiên hết hiệu lực sau ≈ 8 giờ không thao tác | **Không** phải lý do môi trường — không kiểm được trong một lần chạy suite | ❌ **Giữ nguyên ⚪**, TC `skip` |

### 2.2 NGOÀI phạm vi (out of scope)

| Không kiểm thử | Lý do | Ai chịu trách nhiệm | Nguồn quyết định |
|---|---|---|---|
| 20 module CRM còn lại (`CONTACT` · `LEAD` · `TASK` · `EST` · `PROPO` · `INV` · `PAY` · `CRNOTE` · `SUBS` · `CONTR` · `EXP` · `ITEM` · `TICKET` · `ESTREQ` · `KB` · `REPORT` · `TODO` · `REMIND` · `MEDIA` · `CAL` · `PDFEXP`) | Không thuộc Release 1.0 | Đợt sau | Phiếu — Anh Tester (QA Lead), 17-09-2026 |
| Hệ thống Book API (namespace `_book-api/`) | Không thuộc Release 1.0 | Đợt sau | Phiếu — Anh Tester (QA Lead), 17-09-2026 |
| Cổng khách hàng (khu front-end ngoài `/admin`) | Loại khỏi phạm vi Release 1.0 | **Chưa xếp đợt — chờ PO chốt phạm vi cổng khách hàng** | Phiếu — Anh Tester (QA Lead), 17-09-2026 · trùng với `AMB-05` ở `system_map.md` |
| Module `STAFF` — Nhân sự, Vai trò, Cấu hình hệ thống (`/admin/staff`, `/admin/settings`) | 🚫 **BLOCKED** — tài khoản hiện có nhận `Access denied`, chưa recon được | Chờ trả lời **AMB-01** (ô treo #11) | `system_map.md` mục 6 — Module đang BLOCKED |
| Ma trận phân quyền đa vai trò của mọi module trong phạm vi | Đợt khảo sát chỉ có **01 tài khoản**; màn hình cấu hình vai trò nằm trong vùng bị chặn | Chờ trả lời **AMB-02** (ô treo #12) · `AMB-24` ⏭️ | `requirements_login.md` — AMB-24 chốt hoãn 18-09-2026 · `system_map.md` mục 5 |
| Nền tảng **mobile** — toàn bộ 3 module | Phiếu: `Cách chạy mobile: ngoài phạm vi` | Đợt sau | Phiếu |
| Nền tảng **API** — toàn bộ 3 module | Phiếu: `Cách chạy API: ngoài phạm vi` | Đợt sau | Phiếu |
| **Kiểm thử hiệu năng** | Phiếu: `Hiệu năng: không` | — (không ai kiểm trong đợt này) | Phiếu |
| **Kiểm thử bảo mật chuyên sâu** (pentest, quét lỗ hổng) | Phiếu: `Bảo mật chuyên sâu: không`. ⚠️ Hai khiếm khuyết bảo mật **đã biết** ở `LOGIN` vẫn được theo dõi bằng REQ + bug, xem 8.2 | — | Phiếu |
| Hiển thị ở viewport hẹp / điện thoại của `LOGIN` | `AMB-21` chốt 18-09-2026: đợt này chỉ phủ desktop `1600×750`. Mở phạm vi mobile phải recon lại | Đợt sau | `requirements_login.md` mục 1 |
| Khoá tài khoản sau N lần sai · giới hạn tần suất đăng nhập | `AMB-09`, `AMB-10` chốt 18-09-2026: hệ thống **KHÔNG có** cả hai cơ chế → không có hành vi nào để kiểm. ⚠️ Đây là **điểm yếu đã xác nhận** (RISK-07), không phải vùng chưa kiểm | Đội DEV — khi đưa lên môi trường thật | `requirements_login.md` mục 10 |
| Cắt khoảng trắng ở tầng UI của form đăng nhập | `AMB-23` chốt 18-09-2026: không viết TC cho hành vi này | — | `requirements_login.md` mục 8 |
| Trang `/admin/access_denied` | Thuộc module `STAFF`, không thuộc luồng xác thực | Cùng `STAFF` | `requirements_login.md` mục 1 |

> Mục này đã được thống nhất với **Anh Tester — QA Lead** ngày **17-09-2026** (phần khai trong phiếu) và bổ sung từ quyết định đã ghi trong `docs/requirements/`. Thay đổi phạm vi phải cập nhật tài liệu, tăng phiên bản và thông báo lại.

### 2.3 Giả định & Ràng buộc

| Loại | Nội dung | Ảnh hưởng tới kiểm thử | Nguồn |
|---|---|---|---|
| **Ràng buộc** ⚠️ | **Môi trường đợt này KHÁC môi trường đã khảo sát.** Toàn bộ 40 REQ của `LOGIN` được lập trên môi trường **dùng chung** (`crm.anhtester.com`); đợt này chạy trên **môi trường test riêng** do đội DEV dựng | Mọi kết luận về hiển thị, thông báo, dữ liệu nền **phải kiểm chứng lại** trên môi trường mới trước khi chấm TC FAIL. Rủi ro lệch tài liệu: xem R2 mục 8.1 | Phiếu `Môi trường` vs `docs/requirements/README.md` |
| Ràng buộc | Kết luận về hiển thị/ẩn chỉ đúng với **Google Chrome 153, viewport `1600×750`** | TC hiển thị không được suy diễn sang trình duyệt hoặc viewport khác. Firefox nằm trong phiếu nhưng hiện chưa được bật trong `playwright.config.ts` | `requirements_login.md` — metadata |
| Ràng buộc | Trần **5 lần đăng nhập sai / tài khoản / lần chạy suite** — áp cho cả manual lẫn automation | TC cần nhiều hơn phải tách tài khoản hoặc tách lần chạy | `AMB-09` ✅ 18-09-2026 |
| Ràng buộc | **Cấm assert mã HTTP** (mã chuyển hướng, mã lỗi CSRF) ở mọi TC — chỉ assert điểm dừng cuối và chuỗi hiển thị | Ảnh hưởng cách viết TC và script của `LOGIN` | `AMB-14`, `AMB-15` ✅ 18-09-2026 |
| Ràng buộc | Automation **tích ô** Remember me bằng `check()`; **cấm** đặt `value` bằng tay. **Cấm** assert "cookie biến mất" sau đăng xuất | Ảnh hưởng script `LOGIN` | `AMB-22`, `AMB-13` ✅ 18-09-2026 |
| Giả định | `CUST` và `PRJ` recon xong kịp trước mốc hoàn tất viết TC (02-10-2026) | Trượt mốc này là trượt toàn bộ lịch thực thi — xem R1 mục 8.1 | Suy từ lịch 7.1 + trạng thái recon |
| Giả định | Nhân sự ở mục 6 dành **toàn thời gian** cho đợt này | Chưa có thông tin phân bổ % — ảnh hưởng đối chiếu năng lực ở 7.2 | Agent giả định, chưa xác nhận |
| Giả định | Không tính công sức PO/BA làm UAT · không tính thời gian Dev sửa bug | Ước lượng 7.2 chỉ phủ phần việc của đội QA | Phiếu `Ước lượng → Giả định` |

### 2.4 Các bên liên quan & Giao tiếp

| Bên | Vai trò trong đợt | Liên quan tới kiểm thử | Nhận gì | Tần suất | Kênh |
|---|---|---|---|---|---|
| **Anh Tester** | QA Lead — duyệt plan · điều phối đợt · làm tự động hoá | Chủ trì toàn bộ hoạt động kiểm thử | Kế hoạch · báo cáo tiến độ · báo cáo tổng hợp | Hằng tuần **thứ Sáu** · cuối đợt | Jira · repo |
| ❓ *(chưa có tên)* | Product Owner / BA — duyệt plan · thực hiện UAT | Chủ trì nghiệm thu, chốt chấp nhận bug Major có workaround | Kế hoạch · báo cáo tiến độ · báo cáo tổng hợp | Hằng tuần **thứ Sáu** · cuối đợt | Email · Jira |
| **Đội DEV** | Sửa bug · dựng và duy trì môi trường test riêng | Cung cấp build, môi trường, dữ liệu nền; sửa bug được báo | Báo cáo lỗi | Khi phát sinh | Jira |
| Hồng · Lan · Huệ | Kiểm thử viên | Viết và chạy TC theo phân công mục 6 | Kế hoạch · báo cáo tiến độ | Hằng tuần thứ Sáu | Repo · Jira |

**Mẫu tài liệu dùng trong đợt** — phiếu khai `Dùng mẫu có sẵn của repo: có`:

| Tài liệu | Mẫu | Workflow sinh |
|---|---|---|
| Requirements | Mẫu của `skills-requirements-analyzer` | `/generate-requirements-from-website` |
| Test case | Mẫu của `skills-rbt-manual-testing` | `/generate-testcases-manual-rbt` |
| Execution report | Mẫu của `skills-manual-test-executor` | `/execute-test-cases` |
| Bug report | Mẫu của `skills-bug-reporter` | `/create-bug-report` |
| Báo cáo tiến độ | Mẫu của `skills-test-progress-reporter` | `/generate-test-progress-report` |
| Báo cáo tổng hợp | Mẫu của `skills-test-summary-reporter` | `/generate-test-summary-report` |

## 3. Chiến lược kiểm thử (Test approach)

### 3.1 Cấp độ kiểm thử

| Cấp độ | Trong đợt? | Ai thực hiện | Tiêu chí vào/ra |
|---|---|---|---|
| Component (unit) | ❌ ngoài phạm vi QA | Đội Dev | Theo quy trình Dev |
| Component integration | ❌ | Đội Dev | Theo quy trình Dev |
| System | ✅ | QA | Bộ chung mục 4 |
| System integration | ✅ | QA | Bộ chung mục 4 |
| Acceptance (UAT) | ✅ | PO/BA nội bộ (QA hỗ trợ) | Bộ chung mục 4 — phiếu không khai tiêu chí riêng |

> ISTQB v4 khuyến nghị tiêu chí vào/ra **theo từng cấp độ**. Cấp độ dùng bộ chung thì ghi "Bộ chung mục 4" — **không** để trống cột.

### 3.2 Loại kiểm thử

| Loại test | Nền tảng | Có làm? | Cách làm | Ghi chú |
|---|---|---|---|---|
| Kiểm thử chức năng | Web | ✅ | Manual theo TC — `/execute-test-cases` | Toàn bộ TC của 3 module chạy tay |
| Kiểm thử chức năng | Mobile | ❌ | — | Ngoài phạm vi (2.2) |
| Kiểm thử chức năng | API | ❌ | — | Ngoài phạm vi (2.2) |
| Hồi quy | Web | ✅ | Bộ regression 20-11 → 25-11-2026 · ưu tiên automation | Sau code freeze |
| Kiểm thử lại lỗi (retest) | Web | ✅ | `/retest-fixed-bugs` | Critical/Major chạy **mode FULL**; Minor/Trivial mode RETEST |
| Tích hợp liên module | Web | ✅ | `/generate-cross-module-test-plan` | Trọng tâm `CUST → PRJ` (dự án tham chiếu khách hàng) và `LOGIN → mọi module` |
| Automation | Web | ✅ | `/generate-automation-web` trên framework Playwright sẵn có | Chi tiết ở 3.7 |
| Nghiệm thu (UAT) | Web | ✅ | PO/BA nội bộ thực hiện 30-11 → 04-12-2026, QA hỗ trợ | |
| Vòng 3 — kiểm thử kỹ thuật (đọc cookie, network, CSDL) | Web | ⚠️ Một phần | Đọc cookie và network **đã làm được** khi recon `LOGIN` qua Playwright MCP | ❓ **Năng lực kiểm thử của QA chưa được ghi** ở `docs/requirements/README.md` — chưa rõ QA có quyền truy vấn CSDL và xem nhật ký hoạt động không. Không phải vùng trắng, nhưng chưa xác nhận |
| Hiệu năng | Web | ❌ | — | Phiếu: không (2.2) |
| Bảo mật chuyên sâu | Web | ❌ | — | Phiếu: không. Hai khiếm khuyết bảo mật đã biết vẫn theo dõi qua REQ + bug (8.2) |

**Tỷ trọng manual/automation:** chạy **manual toàn bộ TC** trên web · **automate bộ Smoke và regression** của `LOGIN`, `CUST`, `PRJ` bằng Playwright — chi tiết ở 3.7.

**Thứ tự ưu tiên thực thi:** theo rủi ro sản phẩm (8.2) — `LOGIN` chạy trước (cổng vào duy nhất, hỏng là hai module còn lại không test được), rồi `CUST` (gốc phụ thuộc), cuối cùng `PRJ` (hub gom 8 module, phụ thuộc `CUST`).

#### 3.2.1 Kiểm thử phi chức năng

| Loại | Có làm? | Mục tiêu đo | Ngưỡng chấp nhận | Cách làm · công cụ | Môi trường | Ai thực hiện | TC đã có |
|---|---|---|---|---|---|---|---|
| Hiệu năng | ❌ | — | — | — | — | — (xem 2.2) | 0 |
| Bảo mật | ❌ *(chuyên sâu)* | — | — | Không pentest / quét lỗ hổng. Riêng 2 khiếm khuyết đã xác nhận theo dõi bằng `REQ-LOGIN-38`, `39` + bug | Môi trường test riêng | QA (chỉ phần REQ đã đặc tả) | 0 |
| Tương thích | ❓ **Chờ QA Lead quyết** (ô treo #3) | Nếu làm: hiển thị và luồng đăng nhập trên Chrome và Firefox | ❓ | ❓ | ❓ | ❓ | 0 |
| Khả năng truy cập | ❓ **Chờ QA Lead quyết** (ô treo #3) | ❓ | ❓ | ❓ | ❓ | ❓ | 0 |
| Khả dụng | ❓ **Chờ QA Lead quyết** (ô treo #3) | ❓ | ❓ | ❓ | ❓ | ❓ | 0 |
| Độ tin cậy & phục hồi | ❓ **Chờ QA Lead quyết** (ô treo #3) | ❓ | ❓ | ❓ | ❓ | ❓ | 0 |

> Cột *TC đã có* = 0 ở mọi dòng vì `docs/testcases/` hiện **chưa có tài liệu test case nào**.
>
> Ngưỡng của loại `có` là ứng viên cho **bảng tiêu chí ra bổ sung** (4.2) — gợi ý cho người duyệt, **không** tự thêm.

### 3.3 Kỹ thuật thiết kế test

> Chỉ liệt kê kỹ thuật **bộ TC trong phạm vi thực sự đã dùng** — đọc từ tài liệu test case.

| Kỹ thuật | Áp dụng ở đâu |
|---|---|
| — | **Chưa xác định được** — `docs/testcases/` chưa có tài liệu TC nào cho cả 3 module. Kỹ thuật sẽ được chốt khi chạy `/generate-testcases-manual-rbt`, và plan cập nhật lại ở phiên bản sau |

### 3.4 Mức độc lập của kiểm thử

| | |
|---|---|
| Mức độ | **Đội QA riêng trong tổ chức** |
| Thể hiện ở đâu | Đội QA (Anh Tester · Hồng · Lan · Huệ) tách khỏi đội DEV — DEV chỉ sửa bug và dựng môi trường, không tự kiểm thử phần mình viết |
| Giới hạn | UAT do PO/BA nội bộ thực hiện — độc lập với đội DEV nhưng **trong cùng tổ chức**, không phải bên thứ ba. Một người (Anh Tester) kiêm cả QA Lead lẫn tự động hoá → tự review script của chính mình, xem R5 mục 8.1 |

### 3.5 Retest & Regression

- Bug đã fix → `/retest-fixed-bugs`: Critical/Major chạy **mode FULL** (verify + regression quanh vùng fix), Minor/Trivial chạy mode RETEST
- Mỗi build mới → chạy bộ Smoke trước khi thực thi tiếp
- Regression trước release → **20-11 → 25-11-2026**, dùng bộ regression automation của `LOGIN`, `CUST`, `PRJ` (3.7) + TC Priority High chạy tay
- ⚠️ RISK-02: sửa bất kỳ module con nào đều có thể gây hồi quy ở tab tương ứng trong màn hình chi tiết `PRJ` → sau mỗi lần sửa `CUST`, chạy lại bộ TC của `PRJ`

### 3.6 Chỉ số theo dõi

> Nhóm theo ISTQB CTFL v4.0 mục 5.3.1. `/generate-test-progress-report` báo cáo **đúng các chỉ số này** mỗi kỳ (thứ Sáu hằng tuần).

| Nhóm | Chỉ số | Nguồn | Dùng để |
|---|---|---|---|
| Tiến độ kiểm thử | TC đã viết / đã review · TC đã chạy / chưa chạy · PASS · FAIL · BLOCKED | `docs/testcases/` · `execution_report.md` | Báo cáo tiến độ · tiêu chí exit #3, #4, #5, #7 |
| Tiến độ dự án | Công sức thực tế so với ước lượng 7.2 · tiến độ recon `CUST`/`PRJ` so với mốc 02-10 | Báo cáo tiến độ | Phát hiện trễ sớm |
| Lỗi | Bug mới / đã fix / đang mở theo Severity · regression phát sinh | `docs/bugs/` · Jira | Tiêu chí exit #1, #2 |
| Độ phủ | REQ có TC · REQ Critical có TC PASS | `traceability_matrix.md` (`/generate-traceability-matrix`) | Tiêu chí exit #6 |
| Rủi ro | Trạng thái từng rủi ro ở 8.1 | Báo cáo tiến độ | Kiểm soát rủi ro |

### 3.7 Chiến lược tự động hoá

> ⚠️ Toàn bộ mục `Chiến lược tự động hoá` của phiếu **để trống** (ô treo #4). Phần dưới gồm: hiện trạng **đọc từ repo** (chắc chắn), tỷ trọng lấy từ ô `Tỷ trọng thủ công / tự động`, còn lại `❓`.

| | |
|---|---|
| Mục tiêu | ❓ Chờ QA Lead |
| Hiện trạng *(đọc từ repo 18-09-2026)* | ✅ **Đã có** project automation: Playwright + TypeScript, POM (`src/pages/` — `BasePage`, `LoginPage`, `ForgotPasswordPage`, `DashboardPage`), **7 kịch bản** (`tests/login.spec.ts` 4 · `tests/navigation.spec.ts` 3), chỉ module `LOGIN`.<br>❌ **Chưa có Allure** — `package.json` chỉ có `@playwright/test`; report hiện là Playwright HTML.<br>❌ **Chưa có pipeline CI** — không có `.github/workflows/`, `.gitlab-ci.yml` hay `Jenkinsfile`.<br>❌ **Chưa có thư mục `reports/`**; `.gitignore` chưa chặn `reports/` (đang chặn `test-results/`, `playwright-report/`).<br>⚠️ `playwright.config.ts` hiện **chỉ bật `chromium`** — `firefox` và `webkit` đang bị chú thích, trong khi phiếu khai kiểm trên Chrome **và Firefox**. |
| Tầng kiểm thử (kim tự tháp) | ❓ Chờ QA Lead — hiện 100% ở tầng UI. ISTQB CTFL v4.0 mục 5.1.6: càng lên tầng UI, test càng ít, chậm và dễ vỡ |
| Tiêu chí chọn TC để tự động | ❓ Chờ QA Lead |
| Framework · report | Playwright + TypeScript *(đã có)* · **Allure report — phải dựng trong đợt** · output gom vào `reports/` theo `reporting_rules.md` |
| Hệ thống CI | **GitLab Actions CI — phải dựng trong đợt** (ô treo #10). ⚠️ Tên trong phiếu ghi "GitLab Actions" — cần chốt là GitLab CI hay GitHub Actions trước khi dựng |
| Người bảo trì | **Anh Tester** — suy từ mục 6 Nhân lực (vai trò `tự động hoá`, phụ trách cả 3 cặp). Phiếu không khai trực tiếp |

**Phạm vi:**

| Tự động | Không tự động | Lý do không tự động |
|---|---|---|
| Bộ **Smoke** và bộ **regression** của `LOGIN` · `CUST` · `PRJ` × web *(theo ô `Tỷ trọng thủ công / tự động`)* | ❓ Chờ QA Lead khai rõ (ô treo #4) | ❓ |
| | *Gợi ý agent, chờ duyệt:* TC của `REQ-LOGIN-36`, `37` (cần hộp thư test) · `REQ-LOGIN-38`, `39`, `40` (⚪ đang `skip`) | Chưa có hành vi đúng để assert, hoặc không kiểm được trong một lần chạy suite |

**Kích hoạt chạy:**

| Bộ chạy | Khi nào | Môi trường | Ai xem kết quả | Fail thì |
|---|---|---|---|---|
| Smoke | ❓ Chờ QA Lead *(gợi ý: mỗi build lên môi trường test)* | Môi trường test riêng | Anh Tester | Chặn thực thi manual — tiêu chí tạm dừng 4.3 |
| Regression | ❓ Chờ QA Lead *(gợi ý: trước phát hành, trong cửa sổ 20-11 → 25-11)* | Môi trường test riêng | Anh Tester | Phân loại bằng `/run-and-fix-tests` — **không** sửa test để né bug |

**Nguyên tắc:**
- Script chỉ tính là xong khi đạt Definition of Done của `CLAUDE.md` — PASS ổn định ≥ 2 lần liên tiếp, đủ Allure metadata và screenshot
- Kết quả automation **báo riêng**, không cộng vào pass rate manual của tiêu chí exit #3, #4
- Test chập chờn → `/analyze-flaky-tests`, **không** chạy lại tới khi xanh · UI đổi → `/heal-locators` · yêu cầu đổi → `/update-automation-from-impact`
- ⚠️ RISK-03: nhiều module dùng chung mẫu DataTables → locator của `CUST` và `PRJ` phải scope theo vùng module, cấm selector chung chung kiểu `a.btn-primary`

## 4. Tiêu chí Vào / Ra

### 4.1 Tiêu chí VÀO (Entry) — chưa đủ thì CHƯA bắt đầu test

> Nhóm theo ISTQB CTFL v4.0 mục 5.1.3: nguồn lực · testware · chất lượng ban đầu của đối tượng kiểm thử. Trạng thái tại ngày lập plan **18-09-2026**.

| # | Nhóm | Điều kiện | Trạng thái |
|---|---|---|---|
| 1 | Nguồn lực | Nhân lực ở mục 6 đã được phân công, đủ người cho cả 3 cặp module × nền tảng | ✅ Đạt — Hồng (`LOGIN`), Lan (`CUST`), Huệ (`PRJ`) |
| 2 | Nguồn lực | Môi trường test riêng sẵn sàng, có dữ liệu nền | ❓ Dự kiến **05-10-2026** — đội DEV dựng. Dữ liệu nền chưa khai (ô treo #8) |
| 3 | Nguồn lực | Tài khoản test đủ mọi vai trò trong phạm vi | ⚠️ **Chưa đạt** — hiện chỉ có 01 tài khoản (AMB-02, AMB-24). Ma trận phân quyền đã được đưa ra ngoài phạm vi (2.2) |
| 4 | Nguồn lực | Công cụ sẵn sàng: quản lý bug (Jira) · quản lý kết quả · automation | ⚠️ **Một phần** — Jira và framework Playwright đã có; **Allure và CI chưa có**, phải dựng (ô treo #10) |
| 5 | Nguồn lực | Ngân sách đã duyệt | ➖ Không áp dụng — không có ngân sách riêng (7.3) |
| 6 | Testware | Tài liệu requirements của mọi module × nền tảng trong phạm vi đã có | ❌ **Chưa đạt** — chỉ `LOGIN` có tài liệu. `CUST` và `PRJ` ⬜ chưa khảo sát → **rủi ro R1 mục 8.1** |
| 7 | Testware | AMB 🔴 đã được giải đáp hoặc người duyệt chấp nhận treo | ⚠️ `LOGIN` **không còn** AMB 🔴. Còn **AMB-01**, **AMB-02** ở tầng khám phá (ô treo #11, #12) — cần người duyệt chấp nhận treo |
| 8 | Testware | Test case đã viết và đã review — đủ từng nền tảng | ❌ **Chưa đạt** — `docs/testcases/` trống. Mốc hoàn tất: **02-10-2026** |
| 9 | Chất lượng ban đầu | Build v1.0.0 đã deploy lên môi trường riêng và truy cập được | ❓ Chờ đội DEV — gắn với mốc 05-10-2026 |
| 10 | Chất lượng ban đầu | Smoke test đã pass trên build v1.0.0 | ❓ Chưa chạy được (chưa có môi trường, chưa có bộ Smoke) |
| 11 | Chất lượng ban đầu | *(mobile)* — | ➖ Không áp dụng — mobile ngoài phạm vi |
| 12 | Chất lượng ban đầu | *(API)* — | ➖ Không áp dụng — API ngoài phạm vi |

> ⚠️ Bắt đầu test khi chưa đạt tiêu chí vào là nguyên nhân số một khiến kết quả kiểm thử không dùng được — BLOCKED tràn lan, phải chạy lại từ đầu.
>
> 🔴 **Tại ngày lập plan, tiêu chí #6 và #8 chưa đạt và là đường găng của cả đợt** — xem R1 mục 8.1.

### 4.2 Tiêu chí RA (Exit)

> Phiếu khai `Bộ tiêu chí ra: mặc định`. Bảng dưới lấy **nguyên văn** từ `skills-test-summary-reporter`. `/generate-test-summary-report` chấm lại **cả bảng mặc định lẫn bảng bổ sung**.

| # | Tiêu chí | Ngưỡng |
|---|---|---|
| 1 | Bug **Critical** đang mở | **0** |
| 2 | Bug **Major** đang mở | 0, hoặc có workaround được PM chấp nhận bằng văn bản |
| 3 | Pass rate TC **Priority High** | **≥ 95%** |
| 4 | Pass rate toàn bộ TC đã chạy | ≥ 90% |
| 5 | Tỷ lệ **BLOCKED** | ≤ 5% |
| 6 | REQ mức Critical có ít nhất 1 TC **PASS** | 100% |
| 7 | Module trong phạm vi release đã có TC và đã chạy — tính trên **từng cặp module × nền tảng** trong phạm vi | 100% |

**Tiêu chí bổ sung của dự án:** *không có* — phiếu để trống ô `Tiêu chí ra bổ sung`.

> Gợi ý ISTQB CTFL v4.0 mục 5.1.3 cho bảng bổ sung: mật độ lỗi · đã thực hiện kiểm thử tĩnh (review requirements/TC) · mọi lỗi tìm thấy đã được báo cáo · toàn bộ regression đã được automate.

☑ Bộ mặc định  ☐ Bộ mặc định + bổ sung  ☐ Bộ tiêu chí riêng của dự án

> ⚠️ **Dừng kiểm thử khi hết thời gian hoặc ngân sách** (ISTQB CTFL v4.0 mục 5.1.3): được coi là hợp lệ **chỉ khi** **Product Owner cùng Anh Tester — QA Lead** đã xem xét và **chấp nhận bằng văn bản** rủi ro phát hành mà chưa đạt đủ tiêu chí. Báo cáo tổng hợp khi đó ghi rõ tiêu chí nào chưa đạt và ai chấp nhận — **không** chấm lại thành "Đạt".

### 4.3 Tiêu chí TẠM DỪNG (Suspension) & tiếp tục

**Tạm dừng kiểm thử khi:** môi trường sập > 4 giờ · build lỗi không đăng nhập được · > 30% TC BLOCKED cùng một nguyên nhân · phát hiện bug Critical chặn luồng chính.

**Tiếp tục khi:** nguyên nhân đã xử lý, có build mới, và đã chạy lại smoke.

> Phiếu khai `Dùng ngưỡng tạm dừng đề xuất: có` → các ngưỡng trên **đã được xác nhận**.
>
> 📌 Riêng `LOGIN` là cổng vào duy nhất: hỏng đăng nhập thì `CUST` và `PRJ` **không test được** → luôn rơi vào nhánh "bug Critical chặn luồng chính".

## 5. Môi trường, Dữ liệu & Công cụ

### 5.1 Môi trường kiểm thử

| | |
|---|---|
| Môi trường | **Môi trường test riêng cho Release 1.0** — URL lưu ở `.env`, **không** ghi vào tài liệu này |
| Dùng chung với đội khác? | **Không** — riêng cho đợt này |
| Khác môi trường đã khảo sát? | ⚠️ **Có.** Toàn bộ requirements của `LOGIN` lập trên môi trường **dùng chung** `crm.anhtester.com`. Hệ quả: ràng buộc "cấm thao tác phá huỷ / cấm gửi email thật" **không còn áp dụng**, nhưng mọi kết luận về dữ liệu và thông báo phải kiểm chứng lại → rủi ro R2 mục 8.1 |
| Web — trình duyệt | **Google Chrome (chính)** · **Firefox**. ⚠️ Requirements `LOGIN` chỉ khảo sát trên Chrome 153, viewport `1600×750`; `playwright.config.ts` hiện chỉ bật `chromium` |
| Người dựng · ngày sẵn sàng | **Đội DEV** · dự kiến **05-10-2026** |

### 5.2 Quản lý dữ liệu kiểm thử

| | |
|---|---|
| Dữ liệu nền | ❓ Chờ đội DEV (ô treo #8) |
| Nguồn dữ liệu | ❓ Chờ đội DEV (ô treo #8) |
| Tài khoản test | ⚠️ Hiện **01 tài khoản** vai trò quản trị (nhãn "Admin Example"). Vai trò khác chưa có — AMB-02, AMB-24. **Chỉ** ghi tên vai trò ở đây; mật khẩu ở `.env` |
| Hộp thư test | ❓ **Chưa rõ có hay không** (ô treo #9) — quyết định `REQ-LOGIN-36`, `37` có kiểm được trong đợt hay không |
| Dữ liệu thật của khách hàng | ❓ Chờ đội DEV (ô treo #8) — nếu có, phải khai cách che trước khi chụp evidence |
| Quy tắc sinh dữ liệu | Random + traceable theo `CLAUDE.md` mục 7 — nhìn bản ghi biết test nào tạo. Bắt buộc với `CUST` và `PRJ` (có CRUD) |
| Dọn dữ liệu sau khi chạy | ❓ Chờ đội DEV (ô treo #8) |
| Làm mới dữ liệu nền | ❓ Chờ đội DEV (ô treo #8) |
| Người cung cấp | ❓ Chờ đội DEV (ô treo #8) |

> 🔒 Dữ liệu thật của khách hàng lọt vào evidence (ảnh chụp, bug report) là rủi ro lộ dữ liệu — ô `Có dữ liệu thật của khách hàng` còn trống nên **chưa loại trừ được**; xem rủi ro R6 mục 8.1.

### 5.3 Công cụ

| Mục đích | Công cụ | Ghi chú |
|---|---|---|
| Quản lý lỗi | **Jira** · file markdown trong repo (`docs/bugs/`) | **Nguồn chính khi lệch:** Jira cho **trạng thái bug** |
| Quản lý kết quả kiểm thử | **Jira** · file markdown trong repo (`docs/executions/`) | **Nguồn chính khi lệch:** repo cho **execution report** |
| Tự động hoá | Playwright + TypeScript *(đã có)* · **Allure report — chưa có, phải dựng** | Chi tiết ở 3.7 · output gom vào `reports/`, `.gitignore` phải thêm `reports/` |
| CI | **GitLab Actions CI — chưa có, phải dựng** | Repo hiện không có file pipeline nào (ô treo #10) |
| Recon & thực thi manual | Playwright MCP (headed, viewport `1600×750`) | Theo `CLAUDE.md` — Browser Rules |

## 6. Nhân lực & Phân công

| Vai trò | Người | Module × nền tảng phụ trách | Ghi chú |
|---|---|---|---|
| Trưởng nhóm QA | **Anh Tester** | Toàn bộ | Kiêm luôn vai trò tự động hoá — xem R5 mục 8.1 |
| Kiểm thử viên | **Hồng** | `LOGIN` × web | Module đã có 40 REQ sẵn |
| Kiểm thử viên | **Lan** | `CUST` × web | **Phải recon trước** — chưa có requirements |
| Kiểm thử viên | **Huệ** | `PRJ` × web | **Phải recon trước** — module lớn nhất (12 tab) |
| Tự động hoá | **Anh Tester** | `LOGIN` × web · `CUST` × web · `PRJ` × web | Đồng thời là người bảo trì framework và pipeline |

**Nhu cầu đào tạo:** không khai trong phiếu — không có nhu cầu nào được nêu.

**Nhu cầu tuyển thêm:** **Không** — phiếu khai `Cần tuyển thêm người: không`.

## 7. Lịch trình, Ước lượng & Ngân sách

### 7.1 Lịch trình & Mốc

| Mốc | Ngày | Điều kiện hoàn thành |
|---|---|---|
| Duyệt plan | **21-09-2026** (Thứ Hai) | Mục 11 có chữ ký |
| Hoàn tất viết & review TC | **02-10-2026** (Thứ Sáu) | Đủ cả 3 cặp module × web. ⚠️ Bao gồm cả **recon `CUST` và `PRJ`** — xem R1 |
| Môi trường sẵn sàng | **05-10-2026** (Thứ Hai) | Tiêu chí vào #2, #3, #9 |
| Bắt đầu thực thi | **06-10-2026** (Thứ Ba) | Đạt toàn bộ tiêu chí vào 4.1 |
| Báo cáo tiến độ | **Hằng tuần — thứ Sáu** | `/generate-test-progress-report` — slug `release_1.0` |
| Đóng băng mã nguồn (code freeze) | **19-11-2026** (Thứ Năm) | |
| Hồi quy | **20-11 → 25-11-2026** (Thứ Sáu → Thứ Tư) | Bộ regression chạy xong, không còn Critical mở |
| Nghiệm thu (UAT) | **30-11 → 04-12-2026** (Thứ Hai → Thứ Sáu) | PO/BA nội bộ ký nhận |
| Báo cáo tổng hợp | **10-12-2026** (Thứ Năm) | `/generate-test-summary-report` — slug `release_1.0` |
| Phát hành | **15-12-2026** (Thứ Ba) | Đạt tiêu chí ra 4.2, hoặc có văn bản chấp nhận rủi ro |

> Không mốc nào rơi vào cuối tuần. Có 2 quãng đệm: **26-11 → 29-11** (giữa hồi quy và UAT) và **05-12 → 09-12** (giữa UAT và báo cáo tổng hợp) — dùng làm vùng hấp thụ trễ.

### 7.2 Ước lượng công sức

| | |
|---|---|
| Kỹ thuật (ISTQB CTFL v4.0 mục 5.1.4) | **Three-point estimation** (ước lượng ba điểm) |
| Giả định của ước lượng | *(nguyên văn phiếu)* LOGIN đã có 50 TC nên chủ yếu viết mới cho CUST (79 REQ) và PRJ (104 REQ) · không tính công sức PO/BA làm UAT · không tính thời gian Dev sửa bug |
| ⚠️ Đối chiếu với repo | Giả định trên **lệch với `docs/` tại ngày lập plan**; theo quyết định của QA Lead thì **giữ nguyên văn**. Thực tế: `docs/testcases/` hiện **0 TC** (không phải 50) · `CUST` và `PRJ` **chưa recon, 0 REQ** (bản đồ hệ thống mới chỉ *ước* ~20 và ~30, không phải 79 và 104). Hệ quả: ước lượng dưới đây **dựa trên khối lượng chưa được khảo sát xác nhận** — rủi ro R3 mục 8.1 |

Công thức: **E = (a + 4m + b) / 6** · **SD = (b − a) / 6** — đơn vị **người-ngày**, làm tròn 1 chữ số thập phân.

| Hạng mục | a (lạc quan) | m (khả năng nhất) | b (bi quan) | E = (a+4m+b)/6 | SD = (b−a)/6 |
|---|---|---|---|---|---|
| Viết & review TC cho `LOGIN` · `CUST` · `PRJ` × web | 7 | 8 | 9 | **8.0** | ±0.3 |
| Thực thi manual trên Web | 5 | 6 | 7 | **6.0** | ±0.3 |
| Retest bug và regression | 2 | 3 | 4 | **3.0** | ±0.3 |
| Hỗ trợ UAT, lập báo cáo và quản lý đợt | 1 | 2 | 3 | **2.0** | ±0.3 |
| **Tổng** | 15 | 19 | 23 | **19.0 người-ngày** | **±1.3** |

> SD tổng tính bằng cách **cộng SD của từng hạng mục** (0.3 × 4 ≈ 1.3) — cách cộng **thận trọng**, giả định các hạng mục trễ cùng chiều. Cộng theo căn bậc hai của tổng bình phương sẽ cho ±0.7, lạc quan hơn.

**Đối chiếu năng lực:** 4 người (1 QA Lead + 3 kiểm thử viên) × **33 ngày làm việc** (06-10-2026 → 19-11-2026, trừ thứ Bảy và Chủ nhật, **chưa** trừ ngày nghỉ lễ) = **132 người-ngày danh nghĩa** → **dư rất nhiều** so với 19.0 người-ngày ước lượng.

> ⚠️ Con số 132 giả định nhân sự dành **toàn thời gian** cho đợt này — phiếu không khai % phân bổ (mục 2.3). Khoảng cách quá lớn giữa 19 và 132 cho thấy **một trong hai số không phản ánh thực tế**: hoặc nhân sự chỉ dành một phần thời gian, hoặc ước lượng bỏ sót công sức **recon `CUST` và `PRJ`** (hai module chưa khảo sát, không có hạng mục riêng trong bảng trên). Đề nghị người duyệt xem lại — rủi ro R3 mục 8.1.

### 7.3 Ngân sách

| Hạng mục | Số tiền | Ghi chú |
|---|---|---|
| **Tổng** | — | **Không có ngân sách riêng cho kiểm thử** — chi phí nằm trong ngân sách dự án (phiếu: `Có ngân sách riêng: không`) |

## 8. Rủi ro

### 8.1 Rủi ro DỰ ÁN & biện pháp

> Rủi ro **của việc kiểm thử** — nhóm theo ISTQB CTFL v4.0 mục 5.2.2. Khả năng / Ảnh hưởng là **đề xuất của agent** — người duyệt xác nhận. `/generate-test-progress-report` theo dõi trạng thái từng dòng.

| # | Nhóm | Rủi ro | Khả năng | Ảnh hưởng | Biện pháp | Nguồn phát hiện |
|---|---|---|---|---|---|---|
| **R1** | Tổ chức | **`CUST` và `PRJ` chưa recon** (0 REQ) nhưng mốc hoàn tất viết TC là **02-10-2026** — chỉ ~11 ngày để vừa recon vừa viết TC cho 2 module, trong đó `PRJ` là module lớn nhất hệ thống (12 tab, ước ~30 REQ) | 🔴 Cao | 🔴 Cao — trượt mốc này là trượt toàn bộ lịch thực thi | Chạy `/generate-requirements-from-website` cho `CUST` rồi `PRJ` **ngay tuần 22-09**; `CUST` trước vì `PRJ` phụ thuộc. Chấp nhận thu hẹp độ sâu recon `PRJ` ở vòng đầu (phủ tab chính trước) | Đối chiếu phiếu với `docs/requirements/README.md` |
| **R2** | Kỹ thuật | **Môi trường đợt này khác môi trường đã khảo sát** — 40 REQ của `LOGIN` lập trên môi trường dùng chung; thông báo, dữ liệu nền, cấu hình cookie có thể khác trên môi trường riêng | 🟠 Trung bình | 🟠 Trung bình — TC đỏ giả, tốn công phân định bug thật / lệch môi trường | Chạy toàn bộ bộ `LOGIN` một vòng ngay khi môi trường sẵn sàng (05-10) để dò lệch, **trước** khi bắt đầu chấm chính thức 06-10 | Phiếu vs `requirements_login.md` |
| **R3** | Tổ chức | **Ước lượng dựa trên khối lượng chưa xác nhận** — giả định 79 REQ (`CUST`) và 104 REQ (`PRJ`), 50 TC sẵn của `LOGIN`; thực tế repo có 0 REQ, 0 TC. Bảng ước lượng cũng **không có hạng mục cho công sức recon** | 🟠 Trung bình | 🟠 Trung bình — 19 người-ngày có thể thiếu hụt đáng kể | Sau khi recon xong `CUST`/`PRJ`, ước lượng lại và cập nhật plan lên v1.1. Theo dõi công sức thực tế ở báo cáo tiến độ hằng tuần | Đối chiếu phiếu với repo |
| **R4** | Kỹ thuật | **Chưa có Allure report và chưa có pipeline CI** tại ngày lập plan; `reports/` chưa tồn tại và `.gitignore` chưa chặn `reports/` | 🟠 Trung bình | 🟡 Thấp–Trung bình — không chặn manual, nhưng chặn mục tiêu tự động hoá và làm report không đạt `reporting_rules.md` | Dựng Allure + pipeline **trước mốc bắt đầu thực thi 06-10**; chốt rõ là GitLab CI hay GitHub Actions (ô treo #10) | Đọc `package.json`, `playwright.config.ts`, thư mục CI |
| **R5** | Con người | **Một người kiêm QA Lead và tự động hoá** (Anh Tester) — tự viết script rồi tự review, và là điểm nghẽn duy nhất cho toàn bộ automation của 3 module | 🟠 Trung bình | 🟠 Trung bình | Dùng `/review-automation-code` làm lớp review độc lập; ưu tiên automation cho `LOGIN` (đã có nền) trước, `CUST`/`PRJ` làm sau khi TC ổn định | Mục 6 Nhân lực |
| **R6** | Kỹ thuật | **Chưa biết môi trường riêng có dữ liệu thật của khách hàng không** — nếu có mà chưa che, evidence và bug report commit lên repo sẽ mang dữ liệu thật | 🟡 Thấp | 🔴 Cao nếu xảy ra — lộ dữ liệu, không xoá được bằng cách sửa file (lịch sử git) | Chốt ô treo #8 **trước** khi chụp evidence đầu tiên; áp quy tắc chụp đúng phạm vi đối tượng của `CLAUDE.md` | Phiếu `Dữ liệu kiểm thử` để trống |
| **R7** | Tổ chức | **Hai ambiguity 🔴 cấp hệ thống còn treo** (AMB-01, AMB-02) — không lập được ma trận phân quyền cho bất kỳ module nào trong phạm vi | 🟠 Trung bình | 🟡 Thấp trong đợt này *(phân quyền đã đưa ra ngoài phạm vi)* — nhưng để lại vùng mù cho đợt sau | Xin tài khoản vai trò khác hoặc xác nhận giới hạn của bản demo trước mốc duyệt plan 21-09; không được thì người duyệt **chấp nhận treo bằng văn bản** | `docs/requirements/README.md` mục 3 |
| **R8** | Kỹ thuật | **Firefox nằm trong phạm vi trình duyệt nhưng chưa được bật** trong `playwright.config.ts` (chỉ `chromium`), và requirements chỉ khảo sát trên Chrome 153 | 🟡 Thấp | 🟡 Thấp | Bật `firefox` trong config và chạy thử bộ `LOGIN` trước 06-10; TC nào phụ thuộc thông báo mặc định của trình duyệt phải kiểm lại trên Firefox | Đọc `playwright.config.ts` vs phiếu |
| **R9** | Kỹ thuật | **Hai khiếm khuyết bảo mật đã xác nhận ở `LOGIN` chưa được mở bug** (RISK-06, RISK-09) và chưa có lịch sửa (AMB-25) | 🟠 Trung bình | 🟠 Trung bình — phát hành mà chưa xử lý thì là rủi ro tồn dư phải ghi vào báo cáo tổng hợp | Mở bug bằng `/create-bug-report` ngay trong tuần đầu; theo dõi lịch sửa qua AMB-25 (ô treo #13) | `requirements_login.md` mục 10 |

### 8.2 Rủi ro SẢN PHẨM — tóm tắt

> **Nguồn chính** vẫn là tài liệu requirements (`RISK-xx`) và tài liệu test case của từng module — bảng này chỉ **tóm tắt các rủi ro cao nhất** để người duyệt plan thấy ngay. Sửa rủi ro ở tài liệu nguồn, **không** sửa ở đây.

| Module | Rủi ro | Mức | Kiểm soát bằng | Nguồn |
|---|---|---|---|---|
| `LOGIN` | **RISK-06** — cookie ghi nhớ `autologin` không có cờ HttpOnly, sống ≈ 62 ngày và **một mình** khôi phục được phiên; bất kỳ XSS nào cũng lấy được phiên dài hạn | 🔴 Cao | Mở bug báo dev · theo dõi hành vi đúng ở `REQ-LOGIN-38` (TC `skip` tới khi vá) | [`requirements_login.md` mục 10](../requirements/login/requirements_login.md#10-điểm-mơ-hồ--rủi-ro) |
| `LOGIN` | **RISK-09** — form quên mật khẩu trả `Email not found`, cho biết chính xác email nào tồn tại (dò tài khoản). Kết hợp RISK-07 thì mức khai thác **cao hơn hẳn** | 🔴 Cao | Mở bug báo dev · hành vi đúng ở `REQ-LOGIN-39` · `REQ-LOGIN-32` giữ nhãn `defect-documented` | như trên |
| `LOGIN` | **RISK-07** — **không có** khoá tài khoản, **không có** giới hạn tần suất đăng nhập (đã xác nhận, không phải vùng chưa kiểm) | 🔴 Cao | Ghi rõ trong báo cáo độ phủ là *đã chốt không tồn tại*; báo dev trước khi lên môi trường thật; giữ trần 5 lần sai/tài khoản/lần chạy | như trên |
| `LOGIN` | **RISK-10** — thông báo lỗi phụ thuộc ngôn ngữ của tài khoản; người khác đổi ngôn ngữ là assertion nguyên văn đỏ hàng loạt | 🟡 Trung bình | TC ghi điều kiện tiên quyết "giao diện đang ở tiếng Anh". Môi trường riêng làm rủi ro này giảm hẳn | như trên |
| `PRJ` | **RISK-02** — `PRJ` là hub gom 8 module qua 12 tab: thay đổi ở `INV`/`EST`/`CONTR`/`TICKET`… đều có thể gây hồi quy trong màn hình Dự án | 🔴 Cao | Chạy lại bộ TC `PRJ` sau mỗi lần sửa module con; ghi phụ thuộc vào RTM | [`system_map.md` — mục Rủi ro](../requirements/_discovery/system_map.md#rủi-ro-risk) |
| `CUST` · `PRJ` | **RISK-03** — nhiều module dùng chung mẫu DataTables, locator dễ trùng và dễ copy nhầm giữa Page Object | 🟡 Trung bình | Locator scope theo vùng module; cấm selector chung chung kiểu `a.btn-primary` | như trên |
| `CUST` · `PRJ` | **RISK-01** (biến thể) — khảo sát gốc thực hiện trên môi trường dùng chung nhiều dữ liệu rác; TC **không được** bám vào bản ghi cụ thể có sẵn | 🟡 Trung bình | Test data random + traceable theo `CLAUDE.md` mục 7 | như trên |
| Cấp hệ thống | **RISK-04** · **RISK-05** — dữ liệu demo có thể biến mất · trang `MEDIA` có lỗi console khi tải | 🟢 Thấp | Ngoài phạm vi đợt này (`MEDIA` không trong phạm vi); evidence chỉ chứng minh màn hình tồn tại | như trên |

## 9. Quản lý lỗi

> Nội dung theo ISTQB CTFL v4.0 mục 5.5. Mục này là **phần mở rộng** so với khung 29119-3 — xem 12.1.
>
> ⚠️ Toàn bộ nhóm `Quản lý lỗi` của phiếu **để trống** (ô treo #5, #6). Phần 9.1 – 9.3 dưới đây là **mặc định của repo, chưa được xác nhận cho đợt này**.

### 9.1 Quy trình trạng thái lỗi — ❓ chưa xác nhận

```text
TC FAIL ──/create-bug-report──→ 🔴 Đang mở ──Dev sửa──→ 🟡 Đã fix — chờ retest
                                    ▲                           │
                                    │                   /retest-fixed-bugs
                                    │                           │
                     NOT_FIXED ─────┤           ┌───────────────┼────────────────┐
                     PARTIAL   ─────┘         FIXED                      CANNOT_VERIFY
                                                │                   (giữ trạng thái, ghi lý do)
                                                ▼
                                            ⬛ Đóng
```

| Trạng thái | Ai chuyển | Điều kiện |
|---|---|---|
| 🔴 Đang mở | Tester | Bug report đủ Build/Version · TC ID · REQ ID · evidence |
| 🟡 Đã fix — chờ retest | Dev | Có build chứa bản sửa |
| ⬛ Đóng | Tester | Retest `FIXED` — lặp ≥ 2 lần theo Steps gốc |
| 🔴 Mở lại | Tester | Retest `NOT_FIXED` hoặc `PARTIAL` — **không** tạo bug trùng |

> ⚠️ Đội dùng **Jira** làm nguồn chính cho trạng thái bug (5.3) — workflow Jira thực tế có thể có thêm *Từ chối* · *Trùng* · *Hoãn*. Cần chốt (ô treo #5). Bug *Hoãn* vẫn tính là **đang mở** khi chấm tiêu chí exit #1, #2 — trừ khi người có quyền ở 4.2 chấp nhận bằng văn bản.

### 9.2 Thang Severity — ❓ chưa xác nhận (mặc định)

> Chép **nguyên văn** `skills-bug-reporter` — *Severity & Priority Guide*. Tiêu chí exit #1, #2 đếm theo thang này.

| Severity | Định nghĩa | Ví dụ |
|---|---|---|
| 🔴 **Critical** | Chặn luồng chính, mất data, crash, security | Không login được, thanh toán sai tiền |
| 🟠 **Major** | Chức năng chính sai nhưng có workaround | Filter sai kết quả, export thiếu cột |
| 🟡 **Minor** | Chức năng phụ sai, UI lệch ảnh hưởng sử dụng | Validation message sai, sort không đúng |
| 🟢 **Trivial** | Lỗi hiển thị nhỏ, không ảnh hưởng chức năng | Sai chính tả, lệch margin |

### 9.3 Thang Priority — ❓ chưa xác nhận (mặc định)

| Priority | Định nghĩa |
|---|---|
| **P1** | Fix ngay trong sprint hiện tại / hotfix |
| **P2** | Fix trong sprint kế tiếp |
| **P3** | Fix khi có thời gian (backlog) |

> Severity đánh giá theo **mức ảnh hưởng kỹ thuật**; Priority theo **mức khẩn cấp business**. Hai giá trị độc lập nhau. Tester đề xuất Severity; **Priority do người phân loại lỗi chốt**.

### 9.4 Phân loại lỗi & thời hạn xử lý

| | |
|---|---|
| Người phân loại lỗi (triage) | ❓ Chờ QA Lead / Dev Lead (ô treo #5) |
| Họp phân loại lỗi | ❓ Chờ QA Lead / Dev Lead (ô treo #5) |
| Bug đang mở tại ngày lập | **0** — `docs/bugs/` chưa tồn tại, chưa có bug nào được mở. ⚠️ Nhưng **2 khiếm khuyết bảo mật đã xác nhận** (RISK-06, RISK-09) **cần mở bug ngay** — xem R9 mục 8.1 |

| Severity | Thời hạn phản hồi | Thời hạn sửa xong |
|---|---|---|
| Critical | ❓ | ❓ |
| Major | ❓ | ❓ |
| Minor | ❓ | ❓ |
| Trivial | ❓ | ❓ |

> Thời hạn **không có mặc định** — phiếu để trống (ô treo #6). Bug quá hạn là dữ liệu cho mục *trở ngại* của báo cáo tiến độ.

## 10. Sản phẩm bàn giao

| Sản phẩm | Nơi lưu | Workflow sinh ra |
|---|---|---|
| Master Test Plan + bản lưu phiếu | `docs/test-plans/test_plan_release_1.0.md` · `test_plan_release_1.0.input.yaml` | `/generate-master-test-plan` |
| Tài liệu requirements | `docs/requirements/<module>/` — tầng `web/` | `/generate-requirements-from-website` |
| Test cases | `docs/testcases/<module>/web/` | `/generate-testcases-manual-rbt` |
| Execution report | `docs/executions/<module>/web/run_*/` | `/execute-test-cases` |
| Retest report | `docs/executions/<module>/web/retest_*/` | `/retest-fixed-bugs` |
| Bug report | `docs/bugs/<module>/web/` | `/create-bug-report` |
| Automation script + report | `tests/` · `src/pages/` · `reports/` | `/generate-automation-web` |
| Ma trận truy vết | `traceability_matrix.md` | `/generate-traceability-matrix` |
| **Báo cáo tiến độ** | `docs/executions/test_progress_release_1.0_<YYYYMMDD>.md` | `/generate-test-progress-report` |
| **Báo cáo tổng hợp** | `docs/executions/test_summary_release_1.0_*.md` | `/generate-test-summary-report` |

## 11. Phê duyệt

| Vai trò | Tên | Phiên bản duyệt | Ngày | Ý kiến |
|---|---|---|---|---|
| QA Lead | Anh Tester | ❓ | ❓ | |
| Product Owner | ❓ *(chưa có tên — ô treo #7)* | ❓ | ❓ | |

## 12. Ánh xạ chuẩn tài liệu

### 12.1 Đối chiếu mục

> Tài liệu này biên soạn **theo cấu trúc** ISO/IEC/IEEE 29119-3 — Test Plan và phủ đủ nội dung điển hình của test plan theo **ISTQB CTFL v4.0 mục 5.1.1**. Cột IEEE 829 theo **khung Test Plan bản 1998**. Bảng dưới để người duyệt đối chiếu; **không** phải tuyên bố đã được đánh giá tuân thủ.

| Mục | ISO/IEC/IEEE 29119-3 — Test Plan | ISTQB CTFL v4.0 — 5.1.1 | IEEE 829-1998 — Test Plan |
|---|---|---|---|
| Kiểm soát tài liệu | Document-specific information — Unique identification · Issuing organization · Approval authority · Change history | — | Test plan identifier |
| 1.1 | Introduction — Scope · Context of the testing — Project/test sub-process | Context of testing — test objectives | Introduction |
| 1.2 | Context of the testing — Test item(s) | Context of testing — test basis | Introduction |
| 2.1 | Context of the testing — Test item(s) · Test scope | Context of testing — scope | Test items · Features to be tested |
| 2.2 | Context of the testing — Test scope (phần loại trừ) | Context of testing — scope | Features not to be tested |
| 2.3 | Context of the testing — Assumptions and constraints | Assumptions and constraints of the test project · Context of testing — constraints | — |
| 2.4 | Context of the testing — Stakeholders · Testing communication | Stakeholders — roles, relevance to testing · Communication — forms and frequency of communication, documentation templates | — |
| 3.1 | Test strategy — Test sub-processes | Test approach — test levels | Approach |
| 3.2 | Test strategy — Test sub-processes | Test approach — test types | Approach |
| 3.2.1 | Test strategy — Test sub-processes · Test design techniques | Test approach — test types | Approach |
| 3.3 | Test strategy — Test design techniques | Test approach — test techniques | Approach |
| 3.4 | Staffing — Roles, activities, and responsibilities | Test approach — independence of testing | Responsibilities |
| 3.5 | Test strategy — Retesting and regression testing | Test approach — test types | Approach |
| 3.6 | Test strategy — Metrics to be collected | Test approach — metrics to be collected | — |
| 3.7 | Test strategy — Test sub-processes | Test approach — test types *(kim tự tháp kiểm thử: CTFL v4.0 mục 5.1.6)* | Approach |
| 4.1 | Test strategy | Test approach — entry criteria | — |
| 4.2 | Test strategy — Test completion criteria | Test approach — exit criteria | Item pass/fail criteria |
| 4.3 | Test strategy — Suspension and resumption criteria | — | Suspension criteria and resumption requirements |
| 5.1 | Test strategy — Test environment requirements | Test approach — test environment requirements | Environmental needs |
| 5.2 | Test strategy — Test data requirements | Test approach — test data requirements | Environmental needs |
| 5.3 | Test strategy — Test environment requirements | — *(công cụ: CTFL v4.0 chương 6)* | Environmental needs |
| 6 | Staffing — Roles, activities, and responsibilities · Hiring needs · Training needs | Stakeholders — responsibilities, hiring and training needs | Responsibilities · Staffing and training needs |
| 7.1 | Schedule | Budget and schedule | Schedule |
| 7.2 | Testing activities and estimates | Budget and schedule | Testing tasks |
| 7.3 | Testing activities and estimates | Budget and schedule | — |
| 8.1 | Risk register — Project risks | Risk register — project risks | Risks and contingencies |
| 8.2 | Risk register — Product risks | Risk register — product risks | Risks and contingencies |
| 9 | — *(không có mục riêng trong Test Plan; báo cáo sự cố là tài liệu riêng — Incident Report)* | — *(quản lý lỗi: CTFL v4.0 mục 5.5)* | — *(Test incident report là tài liệu riêng)* |
| 10 | Test strategy — Test deliverables | Test approach — test deliverables | Test deliverables |
| 11 | Document-specific information — Approval authority | — | Approvals |
| 12.2 | Test strategy — Deviations from the Organizational Test Strategy | Test approach — deviations from the organizational test policy and test strategy | — |

**Rủi ro sản phẩm:** plan chỉ tóm tắt ở 8.2 — nguồn chính là tài liệu requirements và test case của từng module.

**Phần mở rộng ngoài khung chuẩn:** 3.7 Chiến lược tự động hoá · 9 Quản lý lỗi.

> ⚠️ Tên mục 29119-3 ở cột 2 **chưa được đối chiếu với bản chuẩn** — agent không có bản chuẩn để tra. Trước khi đem plan đi audit, người có bản chuẩn phải rà lại cột này (ô treo #14). Cột ISTQB đã đối chiếu nguyên văn giáo trình v4.0 (phát hành 21-04-2023); bản sửa lỗi v4.0.1 chưa đối chiếu.

### 12.2 Điểm làm khác chính sách & chiến lược kiểm thử chung (Deviations)

**Không áp dụng — tổ chức chưa có Test Policy và Test Strategy** (phiếu: `Có chính sách kiểm thử (Test Policy): không` · `Có chiến lược kiểm thử (Test Strategy): không`).

Chuẩn nội bộ duy nhất đang áp dụng là bộ quy tắc của repo (`CLAUDE.md` và `.claude/rules/`) — plan này tuân theo, không có điểm làm khác.
