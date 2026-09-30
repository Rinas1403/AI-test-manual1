## Impact Report — PO-2026-09-30-AMB19 · 30-09-2026

| Mục | Giá trị |
|---|---|
| **Module** | Đăng nhập / Xác thực (`LOGIN`) — [REQUIREMENTS_LOGIN_SUMMARY.md](../REQUIREMENTS_LOGIN_SUMMARY.md) |
| **Nguồn** | PO trả lời qua chat 30-09-2026 — không có ticket. Nguyên văn: *"1 giờ tính theo thời gian không hoạt động, mỗi thao tác gia hạn lại"* |
| **AMB được nhắc tới** | `AMB-LOGIN-19` — đã ✅ từ **19-09-2026** với **cùng kết luận** |
| **Kết luận** | ⏸️ **TRÙNG — không tác động.** Không REQ nào đổi, không cấp mã mới, không TC nào phải xử lý |
| **Mốc git trước khi sửa** | `cea7f09` |

### Tóm tắt

| Nhóm | Số lượng | REQ |
|---|---|---|
| 🟢 Thêm mới | 0 | — |
| 🟡 Sửa | 0 | — |
| 🔴 Bỏ | 0 | — |
| ⚪ Chưa build | 0 | — |
| ⏸️ Trùng, không tác động | 1 | `REQ-LOGIN-42` |

**Căn cứ xếp ⏸️ Trùng** — đối chiếu từng vế câu trả lời với tài liệu hiện có:

| Vế câu trả lời | Đã có ở đâu | Khớp? |
|---|---|---|
| "1 giờ tính theo thời gian không hoạt động" | `REQ-LOGIN-42` · AC1 — *không thao tác gì quá 1 giờ → bị chuyển về `/admin/authentication`* ([web/requirements_login_web.md](../web/requirements_login_web.md)) | ✅ |
| "mỗi thao tác gia hạn lại" | `REQ-LOGIN-42` · AC2 — *đang dùng liên tục (mỗi lần cách nhau dưới 1 giờ) thì không bị đăng xuất, kể cả khi tổng thời gian đã quá 1 giờ* | ✅ |
| Trạng thái AMB | Bảng AMB của index: `AMB-LOGIN-19` ✅ *Đã trả lời 19-09-2026* — kết luận trùng nguyên văn | ✅ |

`REQ-LOGIN-42` giữ 🟡 với `Cập nhật lần cuối` = `19-09-2026 · AMB-LOGIN-19 ✅` — lần xác nhận này không đổi nội dung nên **không** đổi mốc.

### Test case cần xử lý

| TC ID | REQ liên quan | Hành động | Lý do |
|---|---|---|---|
| `CRM_LOGIN_TC_026` | `REQ-LOGIN-42` (AC1) | ⏸️ Không đổi | Đã sửa theo kết luận này ở DELTA `adhoc_2026-09-19`: gỡ `@AssumptionBased`, để yên 65 phút rồi kiểm |
| `CRM_LOGIN_TC_051` | `REQ-LOGIN-42` (AC2) | ⏸️ Không đổi | Đã thêm ở DELTA `adhoc_2026-09-19` cho vế gia hạn — thao tác ở T0+30, T0+55, kiểm ở T0+70 |

Nguồn rà: cột `REQ ID` trong [docs/testcases/login/](../../../testcases/login/TEST_CASES_LOGIN_SUMMARY.md) (`web/parts/part_02_web_phien_quen_mat_khau_dang_xuat.md`) + dòng `REQ-LOGIN-42` ở Bảng Đối Soát Coverage (2 TC, ✅).

### Ambiguity

| Mã | Chuyển trạng thái | Ghi chú |
|---|---|---|
| `AMB-LOGIN-19` | ✅ → ✅ (không đổi) | PO nhắc lại nguyên văn kết luận 19-09-2026 — thêm ghi chú vào cột Kết luận |
| — | Không mở AMB mới | Câu trả lời không phát sinh câu hỏi mới |

### Cảnh báo

- ⚠️ **Tài liệu ngoài chuỗi requirements → testcases còn stale:** [docs/user-guides/login/user_guide_login.md](../../../user-guides/login/user_guide_login.md) dòng 171 vẫn ghi `AMB-LOGIN-19` *"🟡 còn treo"*, FAQ mục 4 nói chung chung "kéo dài 1 giờ". Cần cập nhật bằng `/generate-user-guide` — workflow này không sửa user guide.
- `CRM_LOGIN_TC_026`, `051` là `@PersonalOnly` · `Automation = No` — QA tự chạy (65–70 phút), không qua `/execute-test-cases`.

### Bước tiếp theo

Không cần chạy `/update-testcases-from-impact` — Impact Report này **không có TC nào phải xử lý**.
