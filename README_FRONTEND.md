# HƯỚNG DẪN KIỂM THỬ GIAO DIỆN AUTH & OTP (FRONTEND)
## Dự án: Quản lý Phòng Khám Thú Y & Thương Mại Điện Tử (Dr. Pet's House)
### Người thực hiện: Thái (Đăng nhập/đăng ký/OTP/Quên MK + Thái)

Tài liệu này hướng dẫn cách chạy thử nghiệm giao diện Đăng nhập, Đăng ký, Xác thực OTP và Khôi phục mật khẩu của Thái đã được tích hợp thành công vào dự án Frontend chính thức của team (`BE_A_PET_CLINIC-FRONTEND`).

---

## 📁 1. Cấu Trúc Các Trang Đã Tích Hợp

Các trang giao diện và cấu hình kết nối API của Thái đã được tổ chức khoa học trong mã nguồn:

```
be-a-pet-clinic-frontend/
├── src/
│   ├── assets/images/        # Chứa toàn bộ tài nguyên ảnh (chú chó dễ thương pet-hero.png...)
│   │
│   ├── components/           # Các UI Components dùng cho Auth:
│   │   ├── AuthFields.jsx    # Các trường nhập liệu (TextInput, PasswordInput, Buttons, Divider)
│   │   ├── AuthShell.jsx     # Khung bao bọc giao diện auth kèm hiệu ứng framer-motion
│   │   ├── BackLink.jsx      # Nút quay lại trang trước
│   │   └── PetHero.jsx       # Ảnh chú chó dễ thương
│   │
│   ├── pages/Auth/           # Thư mục chứa 5 trang Auth chính:
│   │   ├── Login.jsx         # Trang Đăng nhập hệ thống
│   │   ├── Register.jsx      # Trang Đăng ký tài khoản mới
│   │   ├── Otp.jsx           # Trang Xác thực mã số OTP Gmail (cho cả Đăng ký & Quên MK)
│   │   ├── ForgotPassword.jsx# Trang yêu cầu gửi mã OTP khôi phục mật khẩu
│   │   └── ResetPassword.jsx # Trang đặt lại mật khẩu mới
│   │
│   ├── services/
│   │   └── authService.js    # Cầu nối gọi các API Backend thực tế qua Axios
│   │
│   └── views/
│       └── App.jsx           # Định nghĩa tuyến đường Router (react-router-dom v6) của cả dự án
```

---

## 🔒 2. Các Nâng Cấp Bảo Mật Đã Áp Dụng (.gitignore)

Tệp tin [`.gitignore`](file:///C:/Users/thain/.gemini/antigravity/scratch/be-a-pet-clinic-frontend/.gitignore) ở thư mục gốc đã được cập nhật để bảo vệ an toàn thông tin nhạy cảm của bạn và team:
- `node_modules/` (Thư viện cục bộ).
- `dist/` (Tệp tin compiled khi deploy).
- `.env` (Tệp chứa các biến môi trường kết nối API nhạy cảm).

---

## 🚀 3. Hướng Dẫn Khởi Chạy Local & Test (Vite + React Router)

Để chạy thử nghiệm giao diện kết nối trực tiếp với backend, teammate chỉ cần làm theo 3 bước cực kỳ đơn giản sau:

### Bước 1: Khởi động Backend của Team
Hãy chắc chắn là server API Backend của team đang được bật tại cổng **8080** (qua lệnh `npm start` trong thư mục `PET_CLINIC_BACKEND`).

### Bước 2: Cài đặt thư viện Frontend
Mở Terminal tại thư mục gốc của frontend này và chạy lệnh:
```bash
npm install
```
*Lệnh này sẽ tự động tải các gói thư viện chuẩn cùng với `framer-motion` (hiệu ứng mượt mà) và `lucide-react` (icons).*

### Bước 3: Khởi chạy Giao diện Frontend
Gõ câu lệnh sau trong Terminal để khởi động Vite Development Server:
```bash
npm run dev
```
*Vite sẽ khởi chạy giao diện thành công (mặc định tại địa chỉ [http://localhost:3000](http://localhost:3000) hoặc [http://localhost:5173](http://localhost:5173)).*

---

## 🔗 4. Hướng Dẫn Test Quy Trình Trên Giao Diện

Khi mở trang chủ trên trình duyệt, bạn sẽ thấy 2 nút bấm điều hướng nổi bật:
1.  **Đăng nhập hệ thống**: Trỏ trực tiếp đến trang Đăng nhập của bạn Thái.
2.  **Tạo tài khoản mới**: Trỏ trực tiếp đến trang Đăng ký của bạn Thái.

### Kịch bản Test 1: Đăng ký tài khoản và nhận OTP thực tế
- Bạn vào **Đăng ký** -> Nhập Họ tên, Email thật của bạn, Mật khẩu -> Bấm **Đăng ký**.
- Hệ thống sẽ gọi API Backend và thực tế gửi một Email chứa mã OTP 6 số đến hòm thư của bạn.
- Giao diện của Thái sẽ tự động chuyển sang trang **Xác nhận OTP** cực kỳ mượt mà.
- Bạn mở Gmail, lấy mã OTP 6 số nhập vào giao diện và bấm **Xác nhận**. Tài khoản của bạn sẽ được kích hoạt thành công trên MySQL Database!

### Kịch bản Test 2: Đăng nhập test phân quyền
Bạn có thể đăng nhập trực tiếp bằng các tài khoản mẫu sau (mật khẩu chung `12345678`):
- Admin: `admin@petclinic.com`
- Doctor: `doctor1@petclinic.com`
- Customer: `customer1@petclinic.com`

---
*Developed by Thái (Đăng nhập/đăng ký/OTP/Quên MK).*
