import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthShell } from '../../components/AuthShell';
import { Field, PasswordInput, PrimaryButton } from '../../components/AuthFields';
import { BackLink } from '../../components/BackLink';
import { resetPasswordApi } from '../../services/authService';

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Retrieve reset_token from router navigation state
  const { reset_token = '' } = location.state || {};

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!reset_token) {
      toast.error('Token đặt lại mật khẩu không hợp lệ. Vui lòng thực hiện lại yêu cầu.');
      navigate('/auth/forgot-password');
    }
  }, [reset_token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Xác nhận mật khẩu không khớp!');
      return;
    }
    setLoading(true);
    try {
      const data = await resetPasswordApi(reset_token, password);
      if (data.EC === 0) {
        toast.success(data.EM || 'Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.');
        navigate('/auth/login');
      } else {
        toast.error(data.EM || 'Đặt lại mật khẩu thất bại. Vui lòng thử lại.');
      }
    } catch (error) {
      toast.error(error.EM || 'Đặt lại mật khẩu thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="space-y-5 sm:space-y-6">
        <div className="text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Đặt lại mật khẩu</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Vui lòng tạo một mật khẩu mới bảo mật hơn</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Field label="Mật khẩu mới">
            <PasswordInput
              placeholder="Tối thiểu 8 ký tự"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </Field>
          <Field label="Xác nhận mật khẩu mới">
            <PasswordInput
              placeholder="Nhập lại mật khẩu mới"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </Field>
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
          </PrimaryButton>
        </form>

        <BackLink label="Quay lại đăng nhập" />
      </div>
    </AuthShell>
  );
}
