# Danh Mục Requirements — Hệ thống ANHTESTER CRM (vùng Admin)

> **Điểm vào cấp hệ thống.** Đọc file này đầu tiên trong mọi phiên làm việc đụng tới `docs/`.
> Cần bối cảnh sâu hơn → đọc tiếp [`_discovery/system_map.md`](_discovery/system_map.md).
> Chỉ mở tài liệu module khi thực sự làm việc với module đó.

| | |
|---|---|
| **Hệ thống** | ANHTESTER CRM — bản demo Perfex CRM tại `crm.anhtester.com` |
| **Phạm vi danh mục này** | **Vùng Admin** (`/admin`). Trang User/Customer dùng URL khác → hệ thống thứ hai, xem [AMB-05](_discovery/system_map.md#7-điểm-mơ-hồ-ambiguity) |
| **Tiền tố TC ID** | `CRM_<MODULE>_TC_<nnn>` — ví dụ `CRM_CUST_TC_001` |
| **Môi trường** | ⚠️ **Dùng chung** — chỉ đọc khi khảo sát, KHÔNG tạo/sửa/xoá dữ liệu |
| **URL · tài khoản** | Nằm ở `.env` (đã `.gitignore`). **KHÔNG** ghi vào bất kỳ tệp nào trong `docs/` |
| **Cập nhật lần cuối** | 2026-09-18 |

---

## 1. Bảng danh mục module

| Module | Prefix | Trạng thái recon | Mức phủ tài liệu | Tài liệu | REQ đã dùng | Mã kế tiếp | AMB treo | Cập nhật |
|---|---|---|---|---|---|---|---|---|
| Đăng nhập & Phiên làm việc | `LOGIN` | ✅ Đã có tài liệu | ⬜ Trắng (không có spec — 100% từ UI recon) | [`login/requirements_login.md`](login/requirements_login.md) | `REQ-LOGIN-01` → `REQ-LOGIN-40` | `REQ-LOGIN-41` | **AMB-25** 🟡 (duy nhất còn treo) · AMB-09→24 đã chốt: 14 ✅ · 2 ⏭️ (AMB-18, AMB-24) | 2026-09-18 |
| Khách hàng | `CUST` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-CUST-01` | — | 2026-09-14 |
| Người liên hệ | `CONTACT` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-CONTACT-01` | — | 2026-09-14 |
| Hoá đơn | `INV` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-INV-01` | — | 2026-09-14 |
| Thanh toán | `PAY` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-PAY-01` | AMB-03 | 2026-09-14 |
| Giấy báo có | `CRNOTE` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-CRNOTE-01` | — | 2026-09-14 |
| Hợp đồng | `CONTR` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-CONTR-01` | — | 2026-09-14 |
| Thuê bao | `SUBS` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-SUBS-01` | — | 2026-09-14 |
| Đề xuất | `PROPO` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-PROPO-01` | — | 2026-09-14 |
| Báo giá | `EST` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-EST-01` | — | 2026-09-14 |
| Yêu cầu báo giá | `ESTREQ` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-ESTREQ-01` | — | 2026-09-14 |
| Dự án | `PRJ` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-PRJ-01` | — | 2026-09-14 |
| Công việc | `TASK` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-TASK-01` | — | 2026-09-14 |
| Sản phẩm/Dịch vụ | `ITEM` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-ITEM-01` | — | 2026-09-14 |
| Chi phí | `EXP` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-EXP-01` | — | 2026-09-14 |
| Khách hàng tiềm năng | `LEAD` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-LEAD-01` | — | 2026-09-14 |
| Hỗ trợ khách hàng | `TICKET` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-TICKET-01` | — | 2026-09-14 |
| Cơ sở tri thức | `KB` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-KB-01` | — | 2026-09-14 |
| Thư viện tệp | `MEDIA` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-MEDIA-01` | — | 2026-09-14 |
| Lịch | `CAL` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-CAL-01` | — | 2026-09-14 |
| Xuất PDF hàng loạt | `PDFEXP` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-PDFEXP-01` | — | 2026-09-14 |
| Báo cáo | `REPORT` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-REPORT-01` | — | 2026-09-14 |
| Việc cần làm | `TODO` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-TODO-01` | — | 2026-09-14 |
| Nhắc nhở | `REMIND` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-REMIND-01` | AMB-04 | 2026-09-14 |
| Nhân sự & Cấu hình | `STAFF` | ⬜ Chưa khảo sát | ⬜ Trắng | — | — | `REQ-STAFF-01` | **AMB-01** 🔴 | 2026-09-14 |

**Tổng: 25 module** — ✅ đã có tài liệu: **1** (`LOGIN`) · ⬜ chưa khảo sát: **24**.

> ⭐ Riêng `LOGIN` **đã có sẵn automation** trong repo (`tests/login.spec.ts`, `tests/navigation.spec.ts` — 7 kịch bản × 3 trình duyệt đang pass). Tài liệu requirements của module này đã **đối chiếu** với bộ test đó — xem mục "Đối chiếu với automation đã có" trong [`login/requirements_login.md`](login/requirements_login.md): bộ test hiện thiếu phần cookie ghi nhớ đăng nhập và nhánh hộp thoại cảnh báo timer khi đăng xuất.

### Bảng mã trạng thái recon

| Ký hiệu | Nghĩa | Hành động tiếp theo |
|---|---|---|
| ⬜ | Chưa khảo sát — mới chỉ phát hiện tên | Chạy `/generate-requirements-from-website <module>` |
| 🟨 | Đang khảo sát — recon dở dang | Tiếp tục, nêu rõ đang dở ở đâu |
| ✅ | Đã có tài liệu — `requirements_<module>.md` đã phát hành | Sẵn sàng sinh test case |
| ⏸️ | Hoãn — chốt ngoài phạm vi đợt này | Ghi lý do, giữ prefix |
| ⚪ | Chưa implement — phát hiện qua tài liệu/API, UI chưa có | Viết TC trước, đánh `skip` |

### Danh sách prefix đã chiếm

```
LOGIN · CUST · CONTACT · INV · PAY · CRNOTE · CONTR · SUBS · PROPO · EST
ESTREQ · PRJ · TASK · ITEM · EXP · LEAD · TICKET · KB · MEDIA · CAL
PDFEXP · REPORT · TODO · REMIND · STAFF
```

> Module mới **phải** chọn prefix chưa có trong danh sách này. Prefix đã cấp là **vĩnh viễn**, kể cả khi module đổi tên trên UI.

---

## 2. Trạng thái REQ toàn hệ thống

**40 REQ** — toàn bộ thuộc module `LOGIN`. 24 module còn lại chưa cấp REQ nào (tầng khám phá **không cấp số REQ**, chỉ cấp prefix).

| Trạng thái | Số lượng | Thuộc module |
|---|---|---|
| 🟢 Active | 33 | `LOGIN` |
| 🟡 Changed | 2 | `LOGIN` — REQ-LOGIN-20, 32 (đổi vai trò thành **ghi nhận khiếm khuyết đã xác nhận**; TC gắn nhãn `defect-documented`) |
| 🔴 Deprecated | 0 | — |
| ⚪ Chưa kiểm chứng / chưa implement | 5 | `LOGIN` — REQ-LOGIN-36, 37 (luồng email, AMB-18 ⏭️) · 38, 39 (hai khiếm khuyết bảo mật chờ vá) · 40 (hết phiên ≈ 8 giờ, không kiểm được trong một lần chạy suite) |

**Dải mã đã cấp:** `REQ-LOGIN-01` → `REQ-LOGIN-40` · `AMB-01` → `AMB-25` · `RISK-01` → `RISK-10`
(`AMB-01`→`08`, `RISK-01`→`05` thuộc tầng khám phá · `AMB-09`→`25`, `RISK-06`→`10` thuộc `LOGIN`)

---

## 3. Ambiguity 🔴 High còn treo

| Mã | Câu hỏi | Chặn cái gì |
|---|---|---|
| **AMB-01** | Tài khoản hiện có bị `Access denied` ở `/admin/settings` và `/admin/staff`. Đây là giới hạn cố ý của demo hay cần account quyền cao hơn? | Toàn bộ module `STAFF` — không recon được Nhân sự, Vai trò, Cấu hình hệ thống |
| **AMB-02** | Hệ thống có những role nào? Màn hình cấu hình phân quyền nằm trong vùng bị chặn nên chưa đọc được danh sách role | Ma trận phân quyền của **mọi** module |

> ✅ **Module `LOGIN` không còn ambiguity 🔴 nào** — toàn bộ `AMB-09` → `AMB-24` đã chốt ngày 2026-09-18 qua đợt `DEC-LOGIN-01` (14 ✅ đã trả lời · 2 ⏭️ hoãn). Xem [`login/impact/impact_DEC-LOGIN-01.md`](login/impact/impact_DEC-LOGIN-01.md).

### Hạng mục chốt **hoãn** — không phải ambiguity, nhưng phải ghi vào báo cáo độ phủ

| Mã | Quyết định hoãn | Vùng không có ai kiểm |
|---|---|---|
| **AMB-18** ⏭️ | Chưa có môi trường riêng + hộp thư test | Nửa sau luồng quên mật khẩu — `REQ-LOGIN-36`, `37`, `39` |
| **AMB-24** ⏭️ | Đợt này chỉ có 1 tài khoản | Phân quyền đa vai trò — 5/15 ô ma trận `LOGIN` giữ `❔` |
| **AMB-25** ❓ 🟡 | (mới mở) Lịch sửa 2 khiếm khuyết bảo mật đã xác nhận · nguyên văn thông báo trung lập | TC của `REQ-LOGIN-38`, `39` giữ `skip` |

### 🚨 Hai khiếm khuyết bảo mật đã xác nhận ở `LOGIN` — cần mở bug

| Rủi ro | Nội dung | Hành vi đúng |
|---|---|---|
| RISK-06 | Cookie `autologin` không đặt HttpOnly, sống ≈ 62 ngày, một mình khôi phục được phiên | `REQ-LOGIN-38` |
| RISK-09 | Form quên mật khẩu tiết lộ email nào tồn tại (dò tài khoản) | `REQ-LOGIN-39` |

Chi tiết và các ambiguity mức thấp hơn: [`_discovery/system_map.md` mục 7](_discovery/system_map.md#7-điểm-mơ-hồ-ambiguity) (AMB-01 → 08) · [`login/requirements_login.md` mục 10](login/requirements_login.md#10-điểm-mơ-hồ--rủi-ro) (AMB-09 → 25).

---

## 4. Cấu trúc thư mục chuẩn

```
docs/requirements/
├── README.md                              ← file này — DANH MỤC
├── _discovery/                            ← TẦNG KHÁM PHÁ — cấp hệ thống
│   ├── system_map.md                      ← INDEX — TÊN FILE BẤT BIẾN
│   ├── modules/module_NN_<slug>.md        ← chi tiết từng nhóm module
│   └── evidence/*.png                     ← bằng chứng khảo sát cấp hệ thống
└── <module>/                              ← TẦNG MODULE — tạo khi recon
    ├── requirements_<module>.md           ← INDEX — TÊN FILE BẤT BIẾN
    ├── evidence/*.png
    ├── stories/story_NN_<slug>.md         ← chỉ khi tài liệu bị tách
    ├── analysis/analysis_<TICKET-ID>.md
    └── impact/impact_<TICKET-ID>.md
```

---

## 5. Quy trình sử dụng

| Tình huống | Workflow | Ghi vào đâu |
|---|---|---|
| Chưa biết hệ thống có gì | `/discover-system` | `_discovery/` + file này |
| Recon chi tiết một module | `/generate-requirements-from-website <module>` | `<module>/requirements_<module>.md` |
| Phân tích ticket mới | `/analyze-requirement-document` | `<module>/analysis/` |
| Ticket sửa yêu cầu đã có | `/update-requirements-from-ticket` | `<module>/impact/` + cập nhật index |
| Sinh manual test case | `/generate-testcases-manual-rbt` hoặc `/generate-testcases-from-requirements` | `docs/testcases/<module>/` |
| Phát hiện module bị sót | `/discover-system` (mode ADD) | `_discovery/` + file này |

**Sau mỗi lần recon xong một module, BẮT BUỘC cập nhật:** cột `Trạng thái recon` → ✅, cột `REQ đã dùng`, `Mã kế tiếp`, `AMB treo`, `Cập nhật` ở bảng mục 1.

---

## 6. Nhật ký danh mục

| Ngày | Thay đổi |
|---|---|
| 2026-09-18 | **Chốt toàn bộ ambiguity của module `LOGIN`** qua `/update-requirements-from-ticket`, đợt `DEC-LOGIN-01` — 16 ambiguity `AMB-09` → `AMB-24`: 14 ✅ đã trả lời · 2 ⏭️ hoãn (AMB-18 thiếu môi trường riêng + hộp thư test · AMB-24 chỉ có 1 tài khoản). Sinh `REQ-LOGIN-38` → `40` (đều ⚪), chuyển `REQ-LOGIN-20`, `32` sang 🟡, mở `AMB-25` 🟡. Hệ thống **không còn AMB 🔴 nào ở `LOGIN`**; hai ambiguity 🔴 còn lại (AMB-01, AMB-02) thuộc tầng khám phá. Xác nhận **2 khiếm khuyết bảo mật** (RISK-06, RISK-09) cần mở bug. Impact Report: [`login/impact/impact_DEC-LOGIN-01.md`](login/impact/impact_DEC-LOGIN-01.md) |
| 2026-09-14 | **Recon xong module `LOGIN`** qua `/generate-requirements-from-website` — cấp `REQ-LOGIN-01` → `37` (35 🟢 · 2 ⚪), `AMB-09` → `24`, `RISK-06` → `10`, 7 Story. Module lớn hơn ước lượng của tầng khám phá (~15 REQ → **37 REQ**) vì phát sinh thêm nhóm cookie/phiên và nhóm CSRF. **Đối chiếu danh mục:** glob `docs/requirements/*/requirements_*.md` ra đúng 1 module (`login`), khớp với bảng mục 1; không có prefix trùng, không có dòng mồ côi |
| 2026-09-14 | **Bổ sung module `LOGIN`** qua `/discover-system` mode ADD — người dùng chỉ ra bản đồ bị thiếu chức năng đăng nhập. Tổng module 24 → 25. `LOGIN` xếp đầu thứ tự khảo sát |
| 2026-09-14 | Chốt tiền tố TC ID là `CRM_` (thay cho `ANHTESTER_` đề xuất ban đầu) |
| 2026-09-14 | Khởi tạo danh mục từ `/discover-system` mode UI — 24 module, 24 prefix, chưa cấp REQ nào |
