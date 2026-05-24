import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthShell } from '../../components/Auth/AuthShell';
import { Field, TextInput, PrimaryButton } from '../../components/Auth/AuthFields';
import { BackLink } from '../../components/Auth/BackLink';
import { forgotPasswordApi } from '../../services/authService';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await forgotPasswordApi(email);
      if (data.EC === 0) {
        toast.success(data.EM || 'Mã OTP khôi phục mật khẩu đã được gửi đến email của bạn!');
        navigate('/auth/otp', { state: { email, from: 'forgot-password' } });
      } else {
        toast.error(data.EM || 'Gửi yêu cầu thất bại. Vui lòng thử lại.');
      }
    } catch (error) {
      toast.error(error.EM || 'Gửi yêu cầu thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="space-y-5 sm:space-y-6">
        <div className="text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Quên mật khẩu?</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Nhập email đã đăng ký để nhận mã xác nhận OTP</p>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
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
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Đang gửi mã...' : 'Gửi mã xác nhận'}
          </PrimaryButton>
        </form>
        
        <BackLink />
      </div>
    </AuthShell>
  );
}
