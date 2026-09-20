# Bản Đồ Hệ Thống — ANHTESTER CRM (vùng Admin)

> **INDEX của tầng khám phá.** Tên file này là bất biến — mọi workflow phía sau đọc theo đúng đường dẫn `docs/requirements/_discovery/system_map.md`.
> Danh mục module + trạng thái recon nằm ở [`../README.md`](../README.md), **không** nhân bản sang đây.
> ⚠️ Tài liệu này **không chứa mã `REQ-XXX-NN`** — tầng khám phá chỉ cấp **prefix**. Mã REQ được cấp ở tầng module.

---

## 1. Bối cảnh khảo sát

| Mục | Giá trị |
|---|---|
| **Mode đã chạy** | **UI** — không có tài liệu đặc tả nào được cung cấp; toàn bộ bản đồ dựng từ khảo sát giao diện thật |
| **Ngày khảo sát** | 2026-09-14 |
| **Hệ thống** | ANHTESTER CRM — bản demo Perfex CRM |
| **Phạm vi** | **Chỉ vùng Admin** (`/admin`). Trang User/Customer dùng URL khác → xem AMB-05 |
| **Trình duyệt khảo sát** | Google Chrome (Playwright MCP), viewport **1600×750**, headed. Mọi kết luận về hiển thị/responsive chỉ đúng với viewport này |
| **Role đã dùng** | 01 tài khoản duy nhất (nhãn hiển thị "Admin Example"). Không có account role khác |
| **Môi trường dùng chung** | ✅ **CÓ** — chỉ đọc trong suốt quá trình khám phá, không tạo/sửa/xoá bản ghi nào |
| **Phạm vi crawl** | Toàn bộ sidebar (14 mục, đã mở hết submenu) · header · link ngoài menu trên Dashboard và trang danh sách · thử trực tiếp URL vùng bị chặn |
| **Tài khoản / URL** | Lưu ở `.env` — **không** ghi vào tài liệu này |

### Vì sao không có mã REQ ở đây

Tầng khám phá chưa mở từng form, chưa trigger validation, chưa đọc từng field. Cấp số REQ ở giai đoạn này chắc chắn phải đánh lại ở bước recon chi tiết — mà REQ ID là lớp truy vết **bất biến**. Vì vậy tầng này chỉ chốt **ranh giới module** và **prefix**.

---

## 2. Sơ đồ điều hướng toàn hệ thống

Cây menu nguyên trạng, chụp từ `ul#side-menu`:

```
Sidebar (14 mục cấp 1)
├── Dashboard ................... /admin/
├── Customers ................... /admin/clients
│   └── [nút] Contacts .......... /admin/clients/all_contacts      ← KHÔNG có trong menu
├── Projects .................... /admin/projects
├── Tasks ....................... /admin/tasks
├── Contracts ................... /admin/contracts
├── Sales ▾ (nhóm, không phải module)
│   ├── Proposals ............... /admin/proposals
│   ├── Estimates ............... /admin/estimates
│   ├── Invoices ................ /admin/invoices
│   ├── Payments ................ /admin/payments
│   ├── Credit Notes ............ /admin/credit_notes
│   └── Items ................... /admin/invoice_items
├── Subscriptions ............... /admin/subscriptions
├── Expenses .................... /admin/expenses
├── Support ..................... /admin/tickets
├── Leads ....................... /admin/leads
├── Estimate Request ............ /admin/estimate_request
├── Knowledge Base .............. /admin/knowledge_base
├── Utilities ▾ (nhóm, không phải module)
│   ├── Media ................... /admin/utilities/media
│   ├── Bulk PDF Export ......... /admin/utilities/bulk_pdf_exporter
│   └── Calendar ................ /admin/utilities/calendar
└── Reports ▾ (nhóm — 6 báo cáo, gom thành 1 module)
    ├── Sales ................... /admin/reports/sales
    ├── Expenses ................ /admin/reports/expenses
    ├── Expenses vs Income ...... /admin/reports/expenses_vs_income
    ├── Leads ................... /admin/reports/leads
    ├── Timesheets overview ..... /admin/staff/timesheets?view=all
    └── KB Articles ............. /admin/reports/knowledge_base_articles

Header
├── My Profile .................. /admin/profile
├── My Timesheets ............... /admin/staff/timesheets
├── Edit Profile ................ /admin/staff/edit_profile
└── Todo items .................. /admin/todo                      ← KHÔNG có trong sidebar

Route ngoài menu (chỉ vào được từ widget / nút trong bảng)
├── Reminders ................... /admin/misc/reminders            ← từ widget Dashboard "View All"
└── Contacts (danh sách chéo) ... /admin/clients/all_contacts      ← từ nút trên trang Customers

Vùng BỊ CHẶN với tài khoản hiện có
├── /admin/settings ............. → chuyển hướng /admin/access_denied
└── /admin/staff ................ → chuyển hướng /admin/access_denied

CHỈ TỒN TẠI KHI CHƯA ĐĂNG NHẬP  ← crawl menu KHÔNG BAO GIỜ thấy được vùng này
├── Đăng nhập ................... /admin/authentication
├── Quên mật khẩu ............... /admin/authentication/forgot_password
├── Đăng xuất ................... /admin/authentication/logout
└── (mọi /admin/* khi chưa đăng nhập → chuyển hướng về /admin/authentication)
```

> `Sales` và `Utilities` là **nhóm menu**, không phải module — chúng không có màn hình riêng (`href="#"`). Mỗi mục con bên trong mới là module thật.

---

## 3. Bảng module tổng

24 module. Cột *File khám phá* trỏ tới nơi chứa chi tiết. **Trạng thái recon không nằm ở đây** — xem [`../README.md`](../README.md).

| Module (tên UI) | Bí danh / tên Việt | Prefix | File khám phá | Loại màn hình | Risk | Ước REQ |
|---|---|---|---|---|---|---|
| Login | Đăng nhập & Phiên làm việc | `LOGIN` | [16](modules/module_16_dang_nhap.md) | Form xác thực (ngoài layout admin) | 🔴 | ~15 |
| Customers | Khách hàng | `CUST` | [01](modules/module_01_khach_hang_lien_he.md) | Danh sách + Import + Filter | 🔴 | ~20 |
| Contacts | Người liên hệ | `CONTACT` | [01](modules/module_01_khach_hang_lien_he.md) | Danh sách chéo + tab trong KH | 🔴 | ~12 |
| Invoices | Hoá đơn | `INV` | [02](modules/module_02_hoa_don_thanh_toan.md) | Danh sách + Recurring | 🔴 | ~22 |
| Payments | Thanh toán | `PAY` | [02](modules/module_02_hoa_don_thanh_toan.md) | Danh sách (không tạo trực tiếp) | 🔴 | ~8 |
| Credit Notes | Giấy báo có | `CRNOTE` | [02](modules/module_02_hoa_don_thanh_toan.md) | Danh sách | 🔴 | ~12 |
| Contracts | Hợp đồng | `CONTR` | [03](modules/module_03_hop_dong.md) | Danh sách + chữ ký | 🔴 | ~15 |
| Subscriptions | Thuê bao | `SUBS` | [04](modules/module_04_thue_bao.md) | Danh sách + chu kỳ billing | 🔴 | ~14 |
| Proposals | Đề xuất | `PROPO` | [05](modules/module_05_bao_gia_de_xuat.md) | Danh sách + status | 🟡 | ~14 |
| Estimates | Báo giá | `EST` | [05](modules/module_05_bao_gia_de_xuat.md) | Danh sách + status | 🟡 | ~14 |
| Estimate Request | Yêu cầu báo giá | `ESTREQ` | [05](modules/module_05_bao_gia_de_xuat.md) | Danh sách + form builder | 🟡 | ~10 |
| Projects | Dự án | `PRJ` | [06](modules/module_06_du_an_cong_viec.md) | Danh sách + chi tiết 12 tab | 🔴 | ~30 |
| Tasks | Công việc | `TASK` | [06](modules/module_06_du_an_cong_viec.md) | Danh sách + status flow | 🟡 | ~18 |
| Items | Sản phẩm/Dịch vụ | `ITEM` | [07](modules/module_07_san_pham_dich_vu.md) | Danh sách + Groups + Import | 🟡 | ~10 |
| Expenses | Chi phí | `EXP` | [08](modules/module_08_chi_phi.md) | Danh sách + Import | 🟡 | ~12 |
| Leads | Khách hàng tiềm năng | `LEAD` | [09](modules/module_09_khach_hang_tiem_nang.md) | Danh sách 13 cột | 🟡 | ~18 |
| Support | Hỗ trợ khách hàng | `TICKET` | [10](modules/module_10_ho_tro_khach_hang.md) | Danh sách + status + priority | 🟡 | ~16 |
| Knowledge Base | Cơ sở tri thức | `KB` | [11](modules/module_11_co_so_tri_thuc.md) | Danh sách + Groups | 🟢 | ~8 |
| Media | Thư viện tệp | `MEDIA` | [12](modules/module_12_tien_ich.md) | File manager (elFinder) | 🟢 | ~8 |
| Calendar | Lịch | `CAL` | [12](modules/module_12_tien_ich.md) | Lịch month/week/day | 🟢 | ~10 |
| Bulk PDF Export | Xuất PDF hàng loạt | `PDFEXP` | [12](modules/module_12_tien_ich.md) | Công cụ xuất | 🟢 | ~5 |
| Reports | Báo cáo | `REPORT` | [13](modules/module_13_bao_cao.md) | 6 báo cáo read-only + biểu đồ | 🟢 | ~12 |
| Todo | Việc cần làm | `TODO` | [14](modules/module_14_cong_viec_ca_nhan.md) | Danh sách cá nhân | 🟢 | ~8 |
| Reminders | Nhắc nhở | `REMIND` | [14](modules/module_14_cong_viec_ca_nhan.md) | Danh sách tổng hợp | 🟢 | ~6 |
| Staff & Settings | Nhân sự & Cấu hình | `STAFF` | [15](modules/module_15_nhan_su_cau_hinh.md) | ⛔ Không truy cập được | 🔴 | ❔ |

**Tự kiểm chứng:** 2+3+1+1+3+2+1+1+1+1+1+3+1+2+1+1 = **25 module** — khớp với 25 dòng ở bảng danh mục. Mỗi module thuộc đúng 1 file, không mồ côi, không nằm ở 2 file.

## Bản đồ tài liệu

| File | Module bao phủ | Prefix |
|---|---|---|
| [modules/module_16_dang_nhap.md](modules/module_16_dang_nhap.md) | Đăng nhập & Phiên làm việc | `LOGIN` |
| [modules/module_01_khach_hang_lien_he.md](modules/module_01_khach_hang_lien_he.md) | Khách hàng · Người liên hệ | `CUST` · `CONTACT` |
| [modules/module_02_hoa_don_thanh_toan.md](modules/module_02_hoa_don_thanh_toan.md) | Hoá đơn · Thanh toán · Giấy báo có | `INV` · `PAY` · `CRNOTE` |
| [modules/module_03_hop_dong.md](modules/module_03_hop_dong.md) | Hợp đồng | `CONTR` |
| [modules/module_04_thue_bao.md](modules/module_04_thue_bao.md) | Thuê bao | `SUBS` |
| [modules/module_05_bao_gia_de_xuat.md](modules/module_05_bao_gia_de_xuat.md) | Đề xuất · Báo giá · Yêu cầu báo giá | `PROPO` · `EST` · `ESTREQ` |
| [modules/module_06_du_an_cong_viec.md](modules/module_06_du_an_cong_viec.md) | Dự án · Công việc | `PRJ` · `TASK` |
| [modules/module_07_san_pham_dich_vu.md](modules/module_07_san_pham_dich_vu.md) | Sản phẩm/Dịch vụ | `ITEM` |
| [modules/module_08_chi_phi.md](modules/module_08_chi_phi.md) | Chi phí | `EXP` |
| [modules/module_09_khach_hang_tiem_nang.md](modules/module_09_khach_hang_tiem_nang.md) | Khách hàng tiềm năng | `LEAD` |
| [modules/module_10_ho_tro_khach_hang.md](modules/module_10_ho_tro_khach_hang.md) | Hỗ trợ khách hàng | `TICKET` |
| [modules/module_11_co_so_tri_thuc.md](modules/module_11_co_so_tri_thuc.md) | Cơ sở tri thức | `KB` |
| [modules/module_12_tien_ich.md](modules/module_12_tien_ich.md) | Thư viện tệp · Lịch · Xuất PDF hàng loạt | `MEDIA` · `CAL` · `PDFEXP` |
| [modules/module_13_bao_cao.md](modules/module_13_bao_cao.md) | Báo cáo | `REPORT` |
| [modules/module_14_cong_viec_ca_nhan.md](modules/module_14_cong_viec_ca_nhan.md) | Việc cần làm · Nhắc nhở | `TODO` · `REMIND` |
| [modules/module_15_nhan_su_cau_hinh.md](modules/module_15_nhan_su_cau_hinh.md) | Nhân sự & Cấu hình hệ thống | `STAFF` |

> Gộp file **không** gộp prefix. Ba module chung một file khám phá vẫn sẽ sinh ra **ba** thư mục `docs/requirements/<module>/` và **ba** file `requirements_<module>.md` riêng ở tầng module.

---

## 4. Bản đồ entity & phụ thuộc

### Hai trục phụ thuộc chính

```
KHÁCH HÀNG là gốc — gần như mọi entity đều tham chiếu tới Customer
    CUST ─┬─> CONTACT      (người liên hệ thuộc khách hàng · đăng nhập portal)
          ├─> CONTR, PROPO, EST, INV, PAY, CRNOTE, SUBS, EXP, TICKET, PRJ
          └─> LEAD ──(chuyển đổi)──> CUST

DỰ ÁN là hub — màn hình chi tiết gom 8 module khác dưới dạng tab
    PRJ ──> TASK · Milestones · Timesheets · Discussions · Notes · Files · Gantt   (entity con, không tách prefix)
        └─> TICKET · CONTR · PROPO · EST · INV · SUBS · EXP · CRNOTE               (view lọc theo dự án)
```

### Quan hệ đặc biệt — đã kiểm chứng

| Quan hệ | Bằng chứng quan sát được |
|---|---|
| `PAY` được tạo **từ trong** `INV`, không tạo từ danh sách Payments | Trang `/admin/payments` không có nút tạo nào; hàng dữ liệu chỉ có link xem/sửa/xoá và link ngược về `invoices/list_invoices/{id}` |
| `REMIND` được tạo **từ trong** entity liên quan | Trang `/admin/misc/reminders` không có nút tạo; bảng có cột **"Related to"** |
| `LEAD` chuyển đổi thành `CUST` | Chức năng chuyển đổi chuẩn của Perfex — **chưa mở form để xác minh**, xem AMB-07 |
| `ESTREQ` sinh ra `EST` | Tên module và nút "New Form" gợi ý luồng này — **chưa xác minh** |
| `CONTACT` là entity đăng nhập trang Customer portal | Suy ra từ vai trò nghiệp vụ của Contact — **chưa xác minh vì portal ngoài phạm vi**, xem AMB-05 |

### Tầng network

Chưa khảo sát sâu — xem **AMB-06**. Hệ thống dùng DataTables gọi POST server-side, request chỉ phát sinh khi thao tác thật trên bảng. Ở tầng khám phá việc này chưa cần thiết vì ranh giới entity đã đọc được rõ từ URL và cấu trúc menu; nhưng **bắt buộc** bật `browser_network_requests` khi recon chi tiết từng module, đặc biệt lúc submit form, để bắt validation server-side và enum trạng thái ẩn.

---

## 5. Ma trận phân quyền sơ bộ (cấp module)

Hệ thống **chỉ có 01 tài khoản** để khảo sát, và màn hình cấu hình phân quyền nằm trong vùng bị chặn → **không lập được ma trận role × chức năng**.

| Vùng | Tài khoản hiện có ("Admin Example") | Mức bằng chứng |
|---|---|---|
| `LOGIN` — đăng nhập, quên mật khẩu, đăng xuất | ✅ Truy cập được (không cần quyền) | Đã kiểm chứng — mở ở trạng thái đã đăng xuất |
| 23 module nghiệp vụ (CUST … REMIND) | ✅ Truy cập được | Đã kiểm chứng — mở từng trang |
| `/admin/settings` — Cấu hình hệ thống | ❌ Access denied | Đã kiểm chứng — thử URL trực tiếp |
| `/admin/staff` — Nhân sự | ❌ Access denied | Đã kiểm chứng — thử URL trực tiếp |
| Các role khác của hệ thống | ❔ Chưa có căn cứ | Không có account, không đọc được màn hình cấu hình role |

```
Tổng 5 nhóm ô = Đã kiểm chứng 4 · Suy diễn 0 · Chưa rõ 1
Ô "Chưa rõ" là [mọi hành động × mọi role ngoài tài khoản hiện có] — chưa có account nào khác (AMB-01, AMB-02)
```

> Ô ❔ **không được** làm tròn thành ❌. "Chưa kiểm chứng" khác hẳn "không có quyền".
> Người dùng đã xác nhận: **trang này chỉ dùng cho Admin**; người dùng cuối/khách hàng đi qua URL khác. Việc đó thu hẹp phạm vi role của vùng Admin nhưng **không** trả lời được hệ thống có bao nhiêu role nội bộ.

---

## 6. Thứ tự khảo sát đã chốt

Nguyên tắc đã chốt với người dùng: **phụ thuộc trước, rủi ro tiền sau**. Customer là gốc phụ thuộc của gần như mọi module nên phải đi đầu.

| Thứ tự | Module | Lý do |
|---|---|---|
| **1** | **`LOGIN`** | **Cổng vào duy nhất** — hỏng là 24 module còn lại không test được. Đồng thời là module duy nhất đã có sẵn automation trong repo, nên recon ở đây là *đối chiếu* chứ không phải làm từ đầu |
| 2 | `CUST` → `CONTACT` | Gốc phụ thuộc của toàn hệ thống. Không nắm Customer thì mọi module sau đều phải đoán |
| 3 | `INV` → `PAY` → `CRNOTE` | Rủi ro tiền cao nhất. `PAY` phải đi ngay sau `INV` vì không tạo được độc lập |
| 4 | `CONTR` | Rủi ro pháp lý, có chữ ký điện tử |
| 5 | `SUBS` | Billing định kỳ — sai là sai lặp lại nhiều kỳ |
| 6 | `PROPO` → `EST` → `ESTREQ` | Bộ chứng từ tiền bán hàng, dùng chung cấu trúc dòng hàng với `INV` |
| 7 | `PRJ` → `TASK` | Khối lượng lớn nhất (12 tab). Nên làm sau khi đã nắm các entity mà nó gom vào |
| 8 | `ITEM` | Danh mục dùng chung cho `INV`/`EST`/`PROPO` |
| 9 | `EXP` | |
| 10 | `LEAD` | Đầu phễu, chuyển đổi sang `CUST` |
| 11 | `TICKET` | |
| 12 | `KB` | |
| 13 | `MEDIA` · `CAL` · `PDFEXP` | Tiện ích, rủi ro thấp |
| 14 | `REPORT` | Read-only, phụ thuộc dữ liệu của mọi module trên |
| 15 | `TODO` · `REMIND` | Rủi ro thấp nhất |
| 16 | `STAFF` | 🚫 **BLOCKED bởi AMB-01** — chưa có quyền truy cập |

### Module đang BLOCKED

| Module | Bị chặn bởi | Gỡ bằng cách nào |
|---|---|---|
| `STAFF` | **AMB-01** | Cần account có quyền vào `/admin/settings` và `/admin/staff`, hoặc xác nhận đây là giới hạn cố ý của bản demo |

---

## 7. Điểm mơ hồ (Ambiguity)

| Mã | Câu hỏi | Nguy cơ nếu không giải quyết | Mức | Assumption tạm | Trạng thái |
|---|---|---|---|---|---|
| **AMB-01** | `/admin/settings` và `/admin/staff` trả `Access denied` với tài khoản hiện có. Giới hạn cố ý của demo hay cần account quyền cao hơn? | Module `STAFF` không recon được; không biết hệ thống cấu hình được những gì | 🔴 | Coi là giới hạn cố ý của bản demo; `STAFF` nằm ngoài phạm vi cho tới khi có account | ❓ Chờ trả lời |
| **AMB-02** | Hệ thống có những role nào (ngoài tài khoản đang dùng)? | Không lập được ma trận phân quyền cho **bất kỳ** module nào | 🔴 | Giả định mọi test chạy dưới đúng tài khoản hiện có; không viết TC phân quyền | ❓ Chờ trả lời |
| **AMB-03** | `PAY` có thực sự chỉ tạo được từ trong `INV`, hay còn đường khác? | TC tạo thanh toán viết sai điểm vào → fail mà tưởng lỗi app | 🟡 | Chỉ tạo được từ trong Invoice | ❓ Chờ trả lời |
| **AMB-04** | `REMIND` tạo từ những entity nào? Cột "Related to" chấp nhận những loại nào? | Không biết cần test nhắc nhở ở bao nhiêu điểm vào | 🟡 | Tạo được từ Customer, Lead, Invoice, Estimate, Proposal, Contract (mẫu chuẩn Perfex) | ❓ Chờ trả lời |
| **AMB-05** | Trang User/Customer nằm ở URL nào, tài khoản nào? Có thuộc phạm vi kiểm thử không? | Nếu có trong phạm vi thì thiếu hẳn một hệ thống; `CONTACT` là cầu nối giữa hai bên | 🟡 | Ngoài phạm vi đợt này. Khi cần → tạo namespace `docs/requirements/_portal/` với danh mục và dải mã riêng | ❓ Chờ trả lời |
| **AMB-06** | Tầng network chưa khảo sát (DataTables POST server-side) | Bỏ sót validation server-side và enum trạng thái không hiện trên UI | 🟡 | Sẽ khảo sát ở tầng module, không phải tầng khám phá | ⏭️ Chuyển xuống tầng module |
| **AMB-07** | Danh sách trạng thái **đầy đủ** của `PRJ`, `INV`, `EST`, `PROPO`, `SUBS`, `TICKET`, `LEAD` là gì? Mới chỉ thấy các trạng thái tình cờ có trong dữ liệu hiện tại | Ma trận trạng thái thiếu nhánh → TC bỏ sót chuyển trạng thái | 🟡 | Dùng bộ trạng thái chuẩn của Perfex, **phải** xác minh lại bằng dropdown lọc ở tầng module | ⏭️ Chuyển xuống tầng module |
| **AMB-08** | Còn module nào bị ẩn khỏi menu hoặc cần quyền cao hơn mà khảo sát chưa thấy? | Bản đồ thiếu module → độ phủ báo cáo sai | 🟡 | Coi 24 module là đủ cho tới khi có phản hồi | ❓ Chờ trả lời — đã hỏi ở checkpoint, chưa có câu trả lời |

> AMB đã trả lời hoặc bỏ qua **không được xoá** khỏi bảng — giữ lại để biết quyết định đến từ đâu.

## Rủi ro (Risk)

| Mã | Rủi ro | Mô tả | Giảm thiểu |
|---|---|---|---|
| **RISK-01** | Môi trường dùng chung, dữ liệu rác nặng | Quan sát thấy hàng trăm bản ghi rác từ tester khác: `AUTO_POM_ADD_PROJECT_*`, `New Project 3008` (11 bản), `Edited Contract 2026...`. Người khác có thể sửa/xoá dữ liệu giữa lúc test | Test data phải random + traceable; **cấm** TC bám vào bản ghi cụ thể có sẵn; cấm thao tác phá huỷ |
| **RISK-02** | `PRJ` là hub gom 8 module | Thay đổi ở `INV`/`EST`/`CONTR`/`TICKET`… đều có thể gây hồi quy ở tab tương ứng trong màn hình Dự án | Sau khi sửa module con, chạy lại bộ TC của `PRJ`; ghi phụ thuộc này vào RTM |
| **RISK-03** | Nhiều module dùng chung mẫu DataTables | Cấu trúc bảng/nút/filter gần như giống hệt nhau giữa các module → locator dễ trùng, dễ copy nhầm giữa Page Object | Locator phải scope theo vùng module, không dùng selector chung chung như `a.btn-primary` |
| **RISK-04** | Dữ liệu demo có thể biến mất | Bản ghi dùng làm evidence hôm nay có thể bị tester khác xoá | Evidence chỉ dùng để chứng minh **màn hình tồn tại**, không dùng để khẳng định dữ liệu cụ thể |
| **RISK-05** | `MEDIA` phát sinh lỗi console khi tải | Trang `/admin/utilities/media` (elFinder) ghi nhận 1 lỗi console lúc khởi tạo | Kiểm lại khi recon `MEDIA`; nếu lỗi ảnh hưởng thao tác thì mở bug, không phải sửa test |

---

## 8. Vùng chưa xác minh

Liệt kê thật, **không** làm tròn thành "đã khảo sát xong":

| Vùng | Vì sao chưa xác minh | Liên quan |
|---|---|---|
| Nhân sự, Vai trò, Cấu hình hệ thống | Access denied | AMB-01 |
| Ma trận phân quyền của mọi module | Chỉ có 1 account, màn hình cấu hình role bị chặn | AMB-02 |
| Trang User/Customer portal | URL khác, chưa được cung cấp | AMB-05 |
| Validation server-side, enum trạng thái ẩn | Chưa đọc tầng network | AMB-06 |
| Bộ trạng thái đầy đủ của 7 module có status flow | Mới thấy trạng thái tình cờ có trong dữ liệu | AMB-07 |
| Chi tiết field của **mọi** module | Ngoài phạm vi tầng khám phá — đây là việc của `/generate-requirements-from-website` | — |
| Luồng chuyển đổi `LEAD → CUST`, `ESTREQ → EST` | Chưa mở form (môi trường dùng chung, chỉ đọc) | — |

---

## 9. Danh mục Evidence

Ảnh lưu ở [`evidence/`](evidence/). Mỗi ảnh chụp ở viewport **1600×750**, ngày 2026-09-14.

| Tệp | Màn hình | Trạng thái | Chứng minh điều gì |
|---|---|---|---|
| `login_form_default_fullpage.png` | Đăng nhập | Đã đăng xuất, form trống | Form có Email Address · Password · Remember me · nút Login · link Forgot Password? |
| `forgot_password_form_fullpage.png` | Quên mật khẩu | Đã đăng xuất, form trống | Tiêu đề "Forgot Password", 1 field email, nút Confirm |
| `customers_list_default_fullpage.png` | Customers | Mặc định | Module tồn tại, dạng danh sách, có nút New Customer / Import / Contacts |
| `projects_list_default_fullpage.png` | Projects | Mặc định | Module tồn tại, có cột Status |
| `project_detail_tabs_viewport.png` | Chi tiết Project | Thanh tab, chưa mở dropdown | **12 tab hiển thị**, `Sales` là dropdown — xem ghi chú bên dưới |
| `tasks_list_default_fullpage.png` | Tasks | Mặc định | Có 5 trạng thái công việc trên dữ liệu thật |
| `contracts_list_default_fullpage.png` | Contracts | Mặc định | Có cột Signature, Contract Value |
| `proposals_list_default_fullpage.png` | Proposals | Mặc định | Có cột Status |
| `estimates_list_default_fullpage.png` | Estimates | Mặc định | Có cột Status, Expiry Date |
| `estimate_request_list_default_fullpage.png` | Estimate Request | Mặc định | Nút "New Form" — là form builder, khác các module CRUD thường |
| `invoices_list_default_fullpage.png` | Invoices | Mặc định | Có Recurring Invoices |
| `payments_list_default_fullpage.png` | Payments | Mặc định | **Không có nút tạo** trên thanh công cụ |
| `credit_notes_list_default_fullpage.png` | Credit Notes | Mặc định | Có cột Remaining Amount |
| `items_list_default_fullpage.png` | Items | Mặc định | Có Groups, Import Items |
| `subscriptions_list_default_fullpage.png` | Subscriptions | Mặc định | Có cột Next Billing Cycle |
| `expenses_list_default_fullpage.png` | Expenses | Mặc định | Có Import Expenses, cột Receipt |
| `support_tickets_list_default_fullpage.png` | Support Tickets | Mặc định | Có cột Status, Priority, Department |
| `leads_list_default_fullpage.png` | Leads | Mặc định | Bảng 13 cột, có Status và Source |
| `knowledge_base_list_default_fullpage.png` | Knowledge Base | Mặc định | Có New Article, Groups |
| `media_file_manager_fullpage.png` | Media | Mặc định | Là file manager elFinder, không phải bảng thường |
| `calendar_month_view_fullpage.png` | Calendar | Xem theo tháng | Có 3 chế độ xem month/week/day |
| `bulk_pdf_export_form_fullpage.png` | Bulk PDF Export | Mặc định | Là công cụ xuất, không phải danh sách entity |
| `reports_sales_default_fullpage.png` | Sales Reports | Mặc định | Có biểu đồ + bảng, không có nút tạo |
| `todo_list_default_fullpage.png` | Todo | Mặc định | Có nút New To Do |
| `reminders_list_default_fullpage.png` | Reminders | Mặc định | **Không có nút tạo**; có cột "Related to" |
| `settings_access_denied_viewport.png` | `/admin/settings` | Sau khi bị chặn | Thông báo "Access denied"; sidebar không có mục Setup nào |

### ⚠️ Ghi chú về `project_detail_tabs_viewport.png` — bài học đếm DOM

Lần đọc DOM đầu tiên trả về **18** phần tử `a` trong `ul.project-tabs` và suýt được ghi vào tài liệu là "18 tab". Mở lại ảnh thì thực tế chỉ có **12 tab hiển thị**; 6 mục còn lại nằm **bên trong dropdown `Sales`**, người dùng không thấy cho tới khi bấm mở.

Con số đã xác minh lại bằng `ul.project-tabs > li` (con trực tiếp):

```
directTabCount            = 12   ← số tab người dùng nhìn thấy
totalAnchorsIncludingNested = 18   ← đếm gộp cả mục lồng trong dropdown
Tất cả 12 li: offsetParent ≠ null, width/height > 0, tại viewport 1600×750
Sales ▾ chứa: Proposals · Estimates · Invoices · Subscriptions · Expenses · Credit Notes
```

Khi recon `PRJ` ở tầng module, locator tab phải dùng dấu `>` (con trực tiếp), không dùng selector hậu duệ.

### Ảnh chụp viewport thay vì full-page — có lý do

| Tệp | Vì sao không full-page |
|---|---|
| `project_detail_tabs_viewport.png` | Đối tượng cần chứng minh là thanh tab, nằm trọn trong viewport. Chụp full-page trang chi tiết dự án sẽ kéo theo tên khách hàng, giá trị hợp đồng, nhật ký hoạt động — dữ liệu nghiệp vụ không liên quan tới điều cần chứng minh, mà tệp này sẽ được commit |
| `settings_access_denied_viewport.png` | Trang chỉ có một thông báo lỗi, không có nội dung ngoài viewport |

> 🔒 Các ảnh full-page danh sách **có chứa dữ liệu nghiệp vụ của bản demo** (tên công ty, số tiền, email). Đây là dữ liệu demo công khai, không phải dữ liệu khách hàng thật — nhưng nếu về sau áp quy trình này lên hệ thống production thì **phải** rà lại toàn bộ evidence trước khi commit.

---

## 10. Nhật ký khám phá

| Ngày | Mode | Phạm vi | Kết quả |
|---|---|---|---|
| 2026-09-14 | **Lệch so với bản đồ** (ghi nhận sau khi recon `LOGIN`) | Module `LOGIN` | **3 chỗ bản đồ ghi sai/thiếu, đã đính chính tại [`modules/module_16_dang_nhap.md`](modules/module_16_dang_nhap.md#-đính-chính-sau-khi-recon-chi-tiết-2026-09-14):** (1) `#timers-logout-template-warning` **không phải** cảnh báo hết phiên mà là hộp xác nhận "còn bộ đếm giờ công việc đang chạy" — suy từ tên id là sai; (2) thông báo lỗi bỏ trống thật sự có `The` đầu câu và dấu chấm cuối, Password hiển thị **trước** Email; (3) độ lớn thật **37 REQ** thay vì ~15 — thiếu hẳn tầng cookie/phiên và nhóm CSRF. Ngoài ra `AMB-06` (tầng network) và phần cookie đã được xử lý xong ở tầng module |
| 2026-09-14 | **ADD** | `/admin/authentication` và các route liên quan | **Bổ sung module `LOGIN`** — người dùng chỉ ra bản đồ bị thiếu. `Nguồn: user bổ sung, đã xác minh UI`. Nguyên nhân sót: crawl chạy trên phiên **đã đăng nhập** nên màn hình đăng nhập không bao giờ xuất hiện; crawl menu về nguyên tắc không thể thấy vùng chưa-đăng-nhập. Tổng module: 24 → **25**. `LOGIN` được xếp **đầu** thứ tự khảo sát |
| 2026-09-14 | **UI** | Toàn bộ vùng Admin `crm.anhtester.com/admin` | Phát hiện 24 module, cấp 24 prefix, 0 mã REQ. 2 route ngoài menu (`/misc/reminders`, `/clients/all_contacts`). 1 vùng bị chặn quyền (`/settings`, `/staff`). Mở 8 ambiguity, 5 risk |
