---
name: book-api
description: Hệ thống thứ hai trong repo — AnhTester Book Management (API + Android), namespace _book-api, mã BK, không dùng chung môi trường
type: project
updated: 11-10-2026
---

# Hệ thống `BK` — AnhTester Book Management (API + Android)

**Tách biệt hoàn toàn với Perfex CRM**: không dùng chung prefix, dải REQ, TC ID, AMB.

- Danh mục: `docs/requirements/_book-api/README.md` · `docs/testcases/_book-api/README.md` · bản đồ `_discovery/api_map.md` (API) + `_discovery/system_map.md` (Android).
- Mã: REQ `REQ-BK-<MODULE>-nn` · TC `BK_<MODULE>_TC_nnn` · AMB `AMB-BK-nn`.
- Base URL `https://book.anhtester.com` — Production, 1 server. Android: app Hybrid Capacitor (thêm 19-09-2026). Web ngoài phạm vi, iOS chưa khảo sát.
- **Môi trường KHÔNG dùng chung** (người dùng chốt 14-08-2026) — được thao tác phá huỷ, nhưng vẫn chỉ ghi/xoá bản ghi **do chính phiên tạo**. Test BOLA/IDOR phải tự tạo 2 tài khoản.
- Năng lực QA: **gọi API ✅** (19-09-2026) · **CSDL ❌** (*"Không cho QA đụng Database"*, 20-09-2026) — dữ liệu kiểm gián tiếp qua API đọc.
- Tiến độ: 9 module, chỉ `AUTH` có REQ + TC (108 TC: Mobile 58 · API 50). `USER`, `BOOK`, `CAT`, `PROMO`, `FILE`, `ADDR`, `SYS`, `DASH` mới lập bản đồ.
- Liên quan: repo anh em `C:\playwright-typescript-framework` có automation cho Book Web/API và CRM login (bộ nhớ riêng ở `memories/` của repo đó).
