# 🎯 Hướng Dẫn Hoàn Chỉnh: User Import & Email System

## 📋 Tóm Tắt Dự Án

Dự án **NNPTUD-C2** là hệ thống import người dùng từ file Excel với các tính năng:

✅ Đọc dữ liệu người dùng từ file `user.xlsx`  
✅ Sinh mật khẩu ngẫu nhiên 16 ký tự cho mỗi người dùng  
✅ Gán vai trò `user` cho tất cả  
✅ Gửi email thông tin đăng nhập qua **Mailtrap SMTP**  
✅ Lưu kết quả import (thành công/thất bại)  
✅ Kiểm soát bằng Git  

---

## 🚀 Quy Trình Thực Hiện

### Bước 1️⃣: Cấu Hình Môi Trường

#### 1.1 Tạo Tài Khoản Mailtrap
- Truy cập: https://mailtrap.io
- Đăng ký tài khoản miễn phí
- Tạo Inbox mới: `NNPTUD-C2`
- Lấy SMTP credentials:
  - Inbox Settings → Integration
  - Copy `Username` và `Password`

#### 1.2 Cập Nhật .env File

Mở file `.env` trong thư mục gốc dự án:

```env
MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_username_here
MAILTRAP_PASS=your_password_here
EMAIL_FROM=noreply@nnptud.com
```

**Lưu ý:** File `.env` không được commit (đã trong `.gitignore`)

---

### Bước 2️⃣: Chuẩn Bị Dữ Liệu

#### 2.1 Tạo File user.xlsx

Tạo file Excel với cấu trúc:

```
Row 1 (Header):
| A        | B               |
|----------|-----------------|
| username | email           |

Row 2-101 (Data - 100 users from screenshot):
| user01   | user01@haha.com |
| user02   | user02@haha.com |
| ...      | ...             |
| user100  | user100@haha.com|
```

**Vị trí lưu:** Gốc dự án hoặc thư mục `data/`

---

### Bước 3️⃣: Chạy Hệ Thống

#### 3.1 Cài Đặt Dependencies

```bash
npm install
```

#### 3.2 Kiểm Tra User Model

```bash
node src/test.js
```

**Print Output:**
```
============================================================
📋 User Model Demo
============================================================

✅ Sample Users Generated:

1. Username: user01
   Email: user01@haha.com
   Password: aR4kL9xM2qP8nT1 (16 chars)
   Role: user
   Created: 2024-03-23T10:30:00.000Z

...

✨ All users have role: "user"
✨ All passwords are unique and random
```

#### 3.3 Import Users & Gửi Email

```bash
npm run import
```

**Print Output:**
```
🚀 Starting user import process...

📊 Successfully read 100 users from Excel file

📧 Sending emails with passwords...

Processing: user01 (user01@haha.com)
✅ Email sent to user01@haha.com - Message ID: ...

Processing: user02 (user02@haha.com)
✅ Email sent to user02@haha.com - Message ID: ...

...

============================================================
📋 IMPORT SUMMARY
============================================================
Total Processed: 100
✅ Successful: 100
❌ Failed: 0
============================================================

📁 Results saved to: import-results.json

✨ Import process completed!
```

---

### Bước 4️⃣: Kiểm Tra Email trên Mailtrap

1. Đăng nhập vào Mailtrap.io
2. Chọn Inbox: `NNPTUD-C2`
3. Xem danh sách emails đã nhận (từ 100 users)
4. Nhấp vào một email để xem nội dung:
   - Thông tin người dùng
   - Mật khẩu tạm
   - Hướng dẫn đổi mật khẩu

#### Nội Dung Email Template:

```
Chào mừng, user01!
Tài khoản của bạn đã được tạo thành công trong hệ thống.

Thông tin đăng nhập:
- Tên đăng nhập: user01
- Email: user01@haha.com
- Mật khẩu tạm: aR4kL9xM2qP8nT1
- Vai trò: user

⚠️ Vui lòng đổi mật khẩu này ngay khi lần đầu tiên đăng nhập...
```

---

### Bước 5️⃣: Git Commits

#### 5.1 Xem Lịch Sử Commits

```bash
git log --oneline --graph
```

**Output:**
```
* a4d31a5 (HEAD -> main) docs: add Mailtrap setup guide and usage examples
* cbd1e5f feat: initial setup - user import system with Mailtrap email notification
* 0a17c40 (origin/main, origin/HEAD) Initial commit
```

#### 5.2 Xem Chi Tiết Commit

```bash
git show a4d31a5
```

---

## 📁 Cấu Trúc File

```
NNPTUD-C2/
├── .env                      ← Cấu hình (GHI CHÚ: Không commit)
├── .env.example              ← Template .env
├── .gitignore
├── package.json
├── README.md
├── MAILTRAP_SETUP.md         ← Hướng dẫn cấu hình Mailtrap
├── EXAMPLES.md               ← Ví dụ sử dụng
├── GUIDE.md                  ← File này
│
├── config/
│   └── email.js              ← Cấu hình SMTP
│
├── models/
│   └── User.js               ← User model (sinh password, role)
│
├── utils/
│   ├── emailService.js       ← Service gửi email
│   └── excelReader.js        ← Service đọc Excel
│
├── src/
│   ├── index.js              ← Entry point
│   ├── importUsers.js        ← Script import chính
│   └── test.js               ← Test demo
│
└── data/
    └── user.xlsx             ← File Excel (nếu có)
```

---

## 🔐 Quy Trình Sinh Mật Khẩu

```javascript
// Độ dài: 16 ký tự
// Ký tự sử dụng: A-Z, a-z, 0-9, !@#$%^&*

generatePassword() {
  const length = 16;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Ví dụ mật khẩu sinh được:
// aR4kL9xM2qP8nT1!
// $bC7vD2eF9gH1jK5
// 3mN6oP0qRsT8uVwX
```

---

## 📊 Kết Quả Import

File `import-results.json` tự động tạo sau import:

```json
{
  "successful": [
    {
      "username": "user01",
      "email": "user01@haha.com",
      "password": "aR4kL9xM2qP8nT1",
      "messageId": "<message-id@mailtrap.io>"
    },
    {
      "username": "user02",
      "email": "user02@haha.com",
      "password": "$bC7vD2eF9gH1jK5",
      "messageId": "<message-id@mailtrap.io>"
    }
  ],
  "failed": [],
  "totalProcessed": 100
}
```

---

## 🐛 Troubleshooting

### ❌ Email không gửi được

**Kiểm tra:**
1. Verify Mailtrap credentials trong `.env`
2. Kiểm tra kết nối mạng: `ping smtp.mailtrap.io`
3. Kiểm tra logs trong console
4. Xem Mailtrap Inbox → Demo inbox để test SMTP

### ❌ Excel file không tìm được

**Giải pháp:**
1. Đảm bảo file tên `user.xlsx` (phải trùng đúng tên)
2. Đặt trong folder gốc hoặc thư mục `data/`
3. Kiểm tra path trong `importUsers.js`

### ❌ Dependencies không install

```bash
npm install axios dotenv express nodemailer xlsx
npm install --save-dev nodemon
```

### ❌ Git commits không xuất hiện

```bash
# Kiểm tra git config
git config user.email
git config user.name

# Nếu chưa setup:
git config user.email "your@email.com"
git config user.name "Your Name"
```

---

## 📸 Screenshots Cần Lấy

### Screenshot 1: Mailtrap SMTP Settings
```
Mục: Mailtrap → Inbox NNPTUD-C2 → Integration → SMTP
Nội dung: Hiển thị Host, Port, Username, Password
```

### Screenshot 2: Mailtrap Inbox - Email List
```
Mục: Mailtrap → Inbox NNPTUD-C2 → Inbox
Nội dung: Danh sách 100 emails đã nhận
Hiển thị: From, To, Subject, Date của mỗi email
```

### Screenshot 3: Email Content Detail
```
Mục: Mailtrap → Click vào 1 email
Nội dung: Hiển thị full email:
- Username
- Email
- Mật khẩu 16 ký tự
- Role: user
- Hướng dẫn đổi mật khẩu
```

### Screenshot 4: Terminal - Git Log
```bash
git log --oneline --graph
```
Output hiển thị:
- 2 commits do bạn tạo
- Initial commit gốc

### Screenshot 5: Terminal - npm run import
```bash
npm run import
```
Output hiển thị:
- "✅ Email sent to user01@haha.com"
- Lặp lại cho 100 users
- IMPORT SUMMARY: 100 successful
- "✨ Import process completed!"

### Screenshot 6: import-results.json
```
Nội dung: File JSON chứa:
{
  "successful": [100 records],
  "failed": [],
  "totalProcessed": 100
}
```

---

## 📝 Lệnh Tổng Hợp

```bash
# Setup ban đầu
npm install

# Kiểm tra User model
node src/test.js

# Chạy import users + gửi email
npm run import

# Xem git commits
git log --oneline

# Xem chi tiết file đã thay đổi
git log --stat

# Kiểm tra file .env (không commit)
git status

# Xem package.json để hiểu dependencies
cat package.json
```

---

## ✨ Tóm Tắt Tính Năng

| Tính Năng | Mô Tả |
|-----------|-------|
| **Excel Import** | Đọc username, email từ user.xlsx |
| **Password Gen** | Sinh ngẫu nhiên 16 ký tự (a-zA-Z0-9!@#$%^&*) |
| **Email Sending** | Gửi qua Mailtrap SMTP |
| **Role Assignment** | Mọi user có role = 'user' |
| **Result Tracking** | Lưu import-results.json |
| **Error Handling** | Ghi lại user failed |
| **Email Template** | HTML format chuyên nghiệp |

---

## 🎓 Học Tập Từ Dự Án

Các khái niệm được áp dụng:

1. **Node.js Basics**: require, module.exports, async/await
2. **File Handling**: fs, path modules
3. **Excel Processing**: xlsx library
4. **Email Service**: Nodemailer + Mailtrap
5. **Environment Variables**: dotenv
6. **Git**: commit, add, log
7. **OOP**: User class model
8. **Error Handling**: try-catch blocks
9. **JSON Data**: Structured results
10. **CLI Output**: Console formatting

---

## 🔗 Tài Nguyên Hữu Ích

- Mailtrap Docs: https://mailtrap.io/blog/
- Nodemailer: https://nodemailer.com/
- XLSX Library: https://github.com/SheetJS/sheetjs
- Node.js Docs: https://nodejs.org/docs/
- Git Guide: https://git-scm.com/book

---

**Tạo bởi:** NNPTUD-C2 Team  
**Ngày:** March 23, 2026  
**Phiên bản:** 1.0.0
