---
name: crm-projects
description: Module PRJ (Dự án) của Perfex CRM — có REQ nhưng chưa có TC, 6 AMB đỏ đang chặn, hành vi lạ của hệ thống
type: project
updated: 11-10-2026
---

# CRM · `PRJ` (Dự án)

**Tài liệu:** `docs/requirements/projects/REQUIREMENTS_PROJECTS_SUMMARY.md` (recon 14-08-2026). **Chưa có test case** — báo cáo tiến độ kỳ 2 ghi PRJ 0 TC trước hạn 02-10-2026.

## AMB 🔴 còn treo (cần PO/người dùng trả lời trước khi sinh TC cho Story liên quan)
| Mã | Vấn đề | Chặn |
|---|---|---|
| `AMB-PRJ-01` | Ma trận phân quyền còn 28 ô trống — nay **đã có** tài khoản PM, có thể tự kiểm chứng | STORY phân quyền |
| `AMB-PRJ-02` | Tổng quan đếm 67 dự án `In Progress` nhưng lọc ra 60 | STORY-PRJ-01 · Dashboard |
| `AMB-PRJ-03` | Xoá dự án thành công nhưng chuyển `/admin/not_found` + `Something went wrong` | STORY-PRJ-10 — dễ chấm FAIL nhầm |
| `AMB-PRJ-04` | `Deadline` < `Start Date` vẫn lưu được | STORY-PRJ-04 |
| `AMB-PRJ-06` | Dự án 0 công việc hiện Progress 100% nhưng Open Tasks 0% | STORY-PRJ-07 |
| `AMB-PRJ-14` | `Visible Tabs` + 18 công tắc quyền khách tác động admin hay chỉ cổng khách? | STORY-PRJ-03 (11 REQ) |

## Ngoài khả năng chạy trên môi trường dùng chung
`REQ-PRJ-89`, `91`, `94` (CRUD mốc tiến độ / tệp / thảo luận) · `REQ-PRJ-104` (nội dung file Export — không tải tệp về).
