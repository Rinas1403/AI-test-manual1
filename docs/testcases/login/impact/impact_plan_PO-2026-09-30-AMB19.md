# Kế hoạch cập nhật TC — PO-2026-09-30-AMB19 · module `login`

| Mục | Giá trị |
|---|---|
| Mode | **PLAN** — chưa sửa file TC nào |
| Ngày lập | 01-10-2026 |
| Impact Report nguồn | [`impact_PO-2026-09-30-AMB19.md`](../../../requirements/login/impact/impact_PO-2026-09-30-AMB19.md) |
| Nội dung delta | PO nhắc lại kết luận `AMB-LOGIN-19` qua chat 30-09-2026: *"1 giờ tính theo thời gian không hoạt động, mỗi thao tác gia hạn lại"* — **trùng nguyên văn** quyết định đã áp ngày 19-09-2026 |
| Mốc git hiện tại | `web/parts/part_02_web_phien_quen_mat_khau_dang_xuat.md` · `TEST_CASES_LOGIN_SUMMARY.md` @ `713b93b` — thư mục `docs/testcases/login/` sạch |
| **Kết luận** | ⏸️ **KHÔNG CÓ TC NÀO PHẢI SỬA** — không cần chạy Mode APPLY, không ghi `delta_tc_` |

## 1. Delta từ Impact Report

| REQ | Nhóm | Đổi cái gì |
|---|---|---|
| `REQ-LOGIN-42` | ⏸️ Trùng | Không đổi. Nội dung hiện hành (🟡 từ 19-09-2026): AC1 — không thao tác gì quá 1 giờ thì bị đưa về `/admin/authentication` · AC2 — thao tác liên tục (mỗi lần cách nhau dưới 1 giờ) thì không bị đăng xuất dù tổng thời gian đã quá 1 giờ |

Nhóm `⚠️ Review & sửa` · `🗑️ Deprecated` · `➕ Viết mới` của Impact Report: **rỗng**.

## 2. Ánh xạ REQ → TC

| REQ | TC | Vị trí | Cách map | Độ tin cậy |
|---|---|---|---|---|
| `REQ-LOGIN-42` | `CRM_LOGIN_TC_026` | `web/parts/part_02_web_phien_quen_mat_khau_dang_xuat.md:29` | Cột `REQ ID` · Bảng Đối Soát Coverage `TEST_CASES_LOGIN_SUMMARY.md:125` | ✅ Chắc chắn |
| `REQ-LOGIN-42` | `CRM_LOGIN_TC_051` | `web/parts/part_02_web_phien_quen_mat_khau_dang_xuat.md:30` | nt | ✅ Chắc chắn |

⚠️ Mapping suy luận: **không có** · ❓ REQ chưa có TC: **không có**.

## 3. Đối chiếu nội dung TC với REQ hiện hành

| TC | Vòng · Nhánh | Kiểm vế nào | Đối chiếu | Hành động |
|---|---|---|---|---|
| `CRM_LOGIN_TC_026` | V3 · Security | AC1 — để yên 65 phút (mốc 1 giờ + 5 phút) rồi mở `/admin/clients` → về trang đăng nhập | ✅ Khớp. Không còn `@AssumptionBased`, không còn cảnh báo `AMB-LOGIN-19` treo (đã gỡ ở DELTA `adhoc_2026-09-19`) | ⏸️ Giữ nguyên |
| `CRM_LOGIN_TC_051` | V3 · Security | AC2 — thao tác ở T0+30, T0+55, kiểm ở T0+70 → vẫn ở `/admin/clients` | ✅ Khớp. Expected ghi rõ: tính 1 giờ từ lúc đăng nhập thì bước 5 FAIL — đúng ranh giới PO vừa nhắc lại | ⏸️ Giữ nguyên |

Không mục nào cần mở evidence — delta không chạm nhãn, bố cục, thứ tự field, giá trị mặc định hay định dạng hiển thị.

## 4. Nhánh 4 vòng bị chạm

```
Nhánh bị chạm: không có
Nhánh KHÔNG đụng: toàn bộ V1 → V4 — giữ nguyên
(V3 · Security vẫn dẫn TC_026, TC_051 — đúng, không cần sửa)
```

## 5. Tác động lan toả

| Câu hỏi | Kết quả |
|---|---|
| Đụng thứ nhìn thấy trên màn hình (V1)? | Không |
| TC khác dùng hành vi phiên ở bước phụ? | Không có TC nào phụ thuộc mốc 1 giờ. `TC_054` (phiên đa tab) và `TC_036` (Back sau đăng xuất) không phụ thuộc thời gian hết phiên |
| TC lấy TC bị gỡ làm precondition? | Không có TC nào bị gỡ |
| Vượt ngưỡng tách `parts/`? | Không thêm TC |
| Index — Assumptions · Đối soát Automation · ISO 25010 · bộ chạy | Đều đã theo kết luận: `ASM-01` ✅ (`:69`) · `TC_026`, `TC_051` `No` + `@PersonalOnly` (`:237`) · Reliability dẫn cả hai TC (`:343`) · bộ QA tự chạy (`:358`) |

## 6. Ngoài phạm vi & tài liệu còn stale

| Mục | Việc còn lại | Command |
|---|---|---|
| REQ 🟢 mới | Không có | — |
| Automation | `TC_026`, `TC_051` là `Automation = No` — không có script, không cần `/update-automation-from-impact` | — |
| User guide | [`user_guide_login.md`](../../../user-guides/login/user_guide_login.md) dòng 171 vẫn ghi `AMB-LOGIN-19` "🟡 còn treo" — ngoài chuỗi requirements → testcases | `/generate-user-guide` (mode DOC) |

## 7. Bước tiếp theo

**Không cần chạy Mode APPLY.** Chạy APPLY cũng chỉ ghi ra một `delta_tc_` rỗng. `/update-automation-from-impact` không có gì để đọc.
