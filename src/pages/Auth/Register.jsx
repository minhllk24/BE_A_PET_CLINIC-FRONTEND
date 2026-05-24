import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthShell } from '../../components/Auth/AuthShell';
import { Field, TextInput, PasswordInput, PrimaryButton, SocialButton, Divider } from '../../components/Auth/AuthFields';
import { registerApi } from '../../services/authService';

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Xác nhận mật khẩu không khớp!');
      return;
    }
    setLoading(true);
    try {
      const data = await registerApi(fullName, email, password);
      if (data.EC === 0) {
        toast.success(data.EM || 'Mã OTP đăng ký đã được gửi đến email của bạn!');
        navigate('/auth/otp', { state: { email, from: 'register' } });
      } else {
        toast.error(data.EM || 'Đăng ký thất bại. Vui lòng thử lại.');
      }
    } catch (error) {
      toast.error(error.EM || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="space-y-3 sm:space-y-4 py-2 sm:py-4">
        <div className="text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Tạo tài khoản</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Bắt đầu hành trình chăm sóc thú cưng cùng Dr. Pet's House</p>
        </div>

        <form className="space-y-3.5" onSubmit={handleSubmit}>
          <Field label="Họ và tên">
            <TextInput
              type="text"
              placeholder="Nguyễn Văn A"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={loading}
            />
          </Field>
          <Field label="Email">
            <TextInput
              type="email"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </Field>
          <Field label="Mật khẩu">
            <PasswordInput
              placeholder="Tối thiểu 8 ký tự, gồm chữ hoa & số"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </Field>
          <Field label="Xác nhận mật khẩu">
            <PasswordInput
              placeholder="Nhập lại mật khẩu"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </Field>

          <label className="flex items-start gap-2 text-xs text-slate-500 cursor-pointer">
            <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-slate-300" disabled={loading} />
            <span>
              Tôi đồng ý với <a className="underline text-slate-800 font-medium">Điều khoản dịch vụ</a> và{' '}
              <a className="underline text-slate-800 font-medium">Chính sách bảo mật</a>
            </span>
          </label>

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Đăng ký'}
          </PrimaryButton>
        </form>

        <Divider label="hoặc" />

        <div className="space-y-2.5">
          <SocialButton icon={<GoogleIcon />}>Tiếp tục với Google</SocialButton>
          <SocialButton icon={<FacebookIcon />}>Tiếp tục với Facebook</SocialButton>
        </div>

        <p className="text-center text-sm text-slate-500">
          Đã có tài khoản?{' '}
          <button
            onClick={() => navigate('/auth/login')}
            className="text-slate-800 font-semibold hover:underline"
            disabled={loading}
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </AuthShell>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.22-4.74 3.22-8.3z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.99.66-2.25 1.06-3.71 1.06-2.85 0-5.27-1.92-6.13-4.5H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.87 14.15a6.6 6.6 0 0 1 0-4.3V7.02H2.18a11 11 0 0 0 0 9.96l3.69-2.83z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.2 1.65l3.15-3.15C17.45 2.1 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.02l3.69 2.83C6.73 7.3 9.15 5.38 12 5.38z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#1877F2" d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}
