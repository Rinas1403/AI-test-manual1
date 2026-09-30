# Test Cases — `LOGIN` · Web — ĐÃ TÁCH THÀNH `parts/` (30-09-2026)

> File này **không còn chứa dòng TC**. Ngày 30-09-2026 bộ TC web vượt ngưỡng 50 TC của độ hạt GỘP và được tách theo quyết định user. File được giữ lại để các execution report, báo cáo review và bug report cũ trỏ vào đây **không bị gãy link**.
>
> Bản trước khi tách (58 TC): `git show ff0d6dd:docs/testcases/login/web/test_cases_login_web.md`

| Part | Nhóm | TC ID |
|---|---|---|
| [parts/part_01_web_dang_nhap.md](parts/part_01_web_dang_nhap.md) | A Giao diện · B Đăng nhập thành công · C Dữ liệu đầu vào & đăng nhập thất bại | `001`–`020`, `058` |
| [parts/part_02_web_phien_quen_mat_khau_dang_xuat.md](parts/part_02_web_phien_quen_mat_khau_dang_xuat.md) | D Phiên & CSRF · E Quên mật khẩu · F Đăng xuất | `021`–`037`, `051` |
| [parts/part_03_web_phi_chuc_nang_bo_sung.md](parts/part_03_web_phi_chuc_nang_bo_sung.md) | G Phi chức năng · H Hành vi ô nhập · I Giá trị biên · K Tương thích · L Ô tích Ghi nhớ, đa tab · 🐞 TC nhiều khả năng FAIL | `038`–`050`, `052`–`057` |
| [parts/part_04_web_khoa_tai_khoan.md](parts/part_04_web_khoa_tai_khoan.md) | M Khoá tài khoản khi đăng nhập sai nhiều lần (`CRM-LOGIN-101`) | `059`–`074` |

Index module: [../TEST_CASES_LOGIN_SUMMARY.md](../TEST_CASES_LOGIN_SUMMARY.md)
