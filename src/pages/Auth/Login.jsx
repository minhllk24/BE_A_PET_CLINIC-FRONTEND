import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthShell } from '../../components/AuthShell';
import { Field, TextInput, PasswordInput, PrimaryButton, SocialButton, Divider } from '../../components/AuthFields';
import { loginApi } from '../../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginApi(loginId, password);
      if (data.EC === 0) {
        toast.success('Đăng nhập thành công!');
        // Save access token to local storage or state
        localStorage.setItem('access_token', data.DT.access_token);
        localStorage.setItem('user', JSON.stringify(data.DT.user));
        
        // Navigate to home or dashboard
        navigate('/');
      } else {
        toast.error(data.EM || 'Đăng nhập thất bại. Vui lòng kiểm tra lại.');
      }
    } catch (error) {
      toast.error(error.EM || 'Đăng nhập thất bại. Vui lòng kiểm tra lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="space-y-4 sm:space-y-5">
        <div className="text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Chào mừng trở lại</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Đăng nhập vào tài khoản Dr. Pet's House</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Field label="Email hoặc Số điện thoại">
            <TextInput
              type="text"
              placeholder="name@example.com hoặc 0987..."
              required
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              disabled={loading}
            />
          </Field>
          <Field
            label="Mật khẩu"
            right={
              <button
                type="button"
                onClick={() => navigate('/auth/forgot-password')}
                className="text-xs text-slate-400 hover:text-slate-800"
                disabled={loading}
              >
                Quên mật khẩu?
              </button>
            }
          >
            <PasswordInput
              placeholder="Nhập mật khẩu"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </Field>
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </PrimaryButton>
        </form>

        <Divider label="hoặc" />

        <div className="space-y-2.5">
          <SocialButton icon={<GoogleIcon />}>Tiếp tục với Google</SocialButton>
          <SocialButton icon={<FacebookIcon />}>Tiếp tục với Facebook</SocialButton>
        </div>

        <p className="text-center text-sm text-slate-500">
          Chưa có tài khoản?{' '}
          <button
            onClick={() => navigate('/auth/register')}
            className="text-slate-800 font-semibold hover:underline"
            disabled={loading}
          >
            Đăng ký
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
