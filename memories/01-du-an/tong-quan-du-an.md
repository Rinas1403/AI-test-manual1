---
name: tong-quan-du-an
description: Repo chứa gì, 2 hệ thống được kiểm thử, điểm vào từng nhánh docs/, trạng thái tổng và việc còn treo
type: project
updated: 11-10-2026
---

# Tổng quan dự án `AI-test-manual1`

Remote: `https://github.com/Rinas1403/AI-test-manual1.git` · nhánh `main` · làm việc trực tiếp trên `main` (không tạo nhánh — xem [[git-va-commit]]).

## Repo gồm 3 lớp
| Lớp | Ở đâu | Ghi chú |
|---|---|---|
| **Bộ khung AI QA** (dùng lại được cho dự án khác) | `CLAUDE.md` · `.claude/` (rules, skills, commands) · `prompts/` · `scripts/` (3 viewer HTML) · `AI_FULL_FLOW_MANUAL.md` · `AI_FULL_FLOW_AUTOMATION.md` | ⚠️ `.claude/`, `prompts/`, `scripts/` hiện **chưa được git theo dõi** (`??` trong `git status`) — không tự ý add, hỏi người dùng |
| **Tài liệu kiểm thử** | `docs/` | Cấu trúc bắt buộc: `CLAUDE.md` mục 6b |
| **Automation Playwright TS** | `src/` · `tests/` | Xem [[automation-hien-trang]] |

## Hai hệ thống trong `docs/`
| Hệ thống | Namespace | Tiền tố | Môi trường dùng chung | Bộ nhớ chi tiết |
|---|---|---|---|---|
| **Perfex CRM — Anh Tester Demo** `https://crm.anhtester.com` (mặc định) | `docs/<nhánh>/<module>/` | REQ `REQ-<MODULE>-nn` · TC `CRM_<MODULE>_TC_nnn` | **CÓ** — cấm phá huỷ, dọn dữ liệu test | [[crm-login]] · [[crm-customers]] · [[crm-projects]] |
| **AnhTester Book Management** (API + Android) `https://book.anhtester.com` | `docs/<nhánh>/_book-api/` | REQ `REQ-BK-<MODULE>-nn` · TC `BK_<MODULE>_TC_nnn` | **KHÔNG** | [[book-api]] |

## Điểm vào — đọc file nào trước (đừng glob cả `docs/`)
| Việc | File danh mục |
|---|---|
| Requirements CRM | `docs/requirements/README.md` → `docs/requirements/_discovery/system_map.md` |
| Test case CRM | `docs/testcases/README.md` |
| Bug | `docs/bugs/README.md` |
| Kế hoạch đợt | `docs/test-plans/test_plan_release_1.0.md` (mốc `release_1.0`) |
| Book API | `docs/requirements/_book-api/README.md` · `docs/testcases/_book-api/README.md` |

## Trạng thái nhanh (chụp 11-10-2026 — số liệu thật luôn đếm lại từ file)
- CRM: 23 module đã cấp prefix (khám phá 14-08-2026), **3 module có tài liệu**: `LOGIN` 61 REQ · `CUST` 84 REQ · `PRJ` 104 REQ. 20 module chưa recon.
- TC: `LOGIN` 74 TC (`001`→`074`, 1 Deprecated) · `CUST` 129 TC · `PRJ` **chưa có TC**.
- Bug: 5 đang mở, toàn bộ ở `LOGIN` (web).
- Master Test Plan `release_1.0` lập 17-09-2026, **chưa duyệt**. Báo cáo tiến độ kỳ 2 (01-10-2026) kết luận 🔴 trễ tiến độ — file báo cáo đó sau này đã bị xoá khỏi working tree (tra `git show cb095f7`).

## Việc còn treo
- `LOGIN` STORY-07 (khoá tài khoản, `CRM-LOGIN-101`): TC đã viết, **chờ deploy** mới chạy được.
- `PRJ`: 6 AMB 🔴 treo (`AMB-PRJ-01→04, 06, 14`), chưa sinh TC.
- 2 test trong `tests/login.spec.ts` sẽ gây khoá Admin khi `CRM-LOGIN-101` deploy — chờ người dùng quyết sửa ngay hay để `/update-automation-from-impact` ([[automation-hien-trang]]).
- Dọn cấu hình: [[moi-truong-playwright-mcp]] (`.gitignore` thiếu `.playwright-mcp/`, `reports/`; viewport `.mcp.json` lệch CLAUDE.md).
- `AMB-LOGIN-14`: khi recon module `TASK` phải cập nhật ngược `REQ-LOGIN-30` (popup cảnh báo timer).
