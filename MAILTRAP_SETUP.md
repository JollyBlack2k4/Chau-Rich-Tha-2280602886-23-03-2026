# 📧 Hướng Dẫn Cấu Hình Mailtrap

## Bước 1: Đăng Ký Tài Khoản Mailtrap

1. Truy cập: https://mailtrap.io
2. Nhấp **Sign Up** để tạo tài khoản miễn phí
3. Xác nhận email

## Bước 2: Tạo Inbox Mới

1. Đăng nhập vào Mailtrap
2. Chọn **Create New Inbox**
3. Đặt tên: `NNPTUD-C2`
4. Nhấp **Create**

## Bước 3: Lấy SMTP Credentials

1. Chọn Inbox vừa tạo
2. Nhấp vào tab **SMTP Settings**
3. Lấy thông tin:
   - **Host**: `smtp.mailtrap.io`
   - **Port**: `2525`
   - **Username**: (copy từ Integration Settings)
   - **Password**: (copy từ Integration Settings)

## Bước 4: Cập Nhật .env File

Sửa file `.env` trong thư mục gốc dự án:

```env
MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_username_here
MAILTRAP_PASS=your_password_here
EMAIL_FROM=noreply@nnptud.com
```

## Bước 5: Chạy Import

```bash
npm install
npm run import
```

## Bước 6: Kiểm Tra Email

1. Đăng nhập Mailtrap
2. Chọn Inbox **NNPTUD-C2**
3. Xem danh sách email đã nhận
4. Nhấp vào email để xem nội dung:
   - Thông tin người dùng
   - Mật khẩu tạm
   - Hướng dẫn đổi mật khẩu

## 📸 Screenshots Cần Lấy

### Screenshot 1: SMTP Settings
- Vị trí: Mailtrap > Inbox > SMTP Settings
- Nội dung: Hiển thị SMTP credentials

### Screenshot 2: Inbox Emails
- Vị trí: Mailtrap > Inbox > Email List
- Nội dung: Danh sách emails đã gửi

### Screenshot 3: Email Content
- Vị trí: Mailtrap > Inbox > Email Detail
- Nội dung: Nội dung email chứa thông tin đăng nhập

### Screenshot 4: Git Commits
- Vị trị: Terminal
- Lệnh: `git log --oneline`
- Nội dung: Hiển thị commits

## 🔍 Lệnh Git Cần Chạy

```bash
# Xem log commits
git log --oneline

# Xem chi tiết commit
git log -1 --stat

# Xem nội dung file thay đổi
git show
```

## 📝 Ghi Chú Quan Trọng

- ⚠️ Không commit file `.env` (có trong `.gitignore`)
- ✅ Luôn sử dụng `.env.example` làm template
- 🔐 Mật khẩu Mailtrap là độc quyền, không share
- 📧 Mailtrap là dịch vụ nhận email giả lập, không gửi email thực
- Kiểm tra thường xuyên **Spam** folder nếu email không hiển thị

## 🚀 Deployment

Khi deploy lên production:
1. Thay đổi SMTP settings thành real email service (SendGrid, AWS SES, etc.)
2. Cập nhật `.env` hoặc environment variables trên server
3. Đảm bảo `EMAIL_FROM` là địa chỉ email thực hợp lệ
