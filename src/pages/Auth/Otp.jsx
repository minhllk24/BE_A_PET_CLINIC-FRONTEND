import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthShell } from '../../components/Auth/AuthShell';
import { PrimaryButton } from '../../components/Auth/AuthFields';
import { BackLink } from '../../components/Auth/BackLink';
import { verifyRegisterOtpApi, verifyForgotPasswordOtpApi, forgotPasswordApi } from '../../services/authService';

function maskEmail(email) {
  const [local, domain] = email.split('@');
  if (!domain) return email;
  const visible = Math.min(3, local.length);
  return local.slice(0, visible) + '•••@' + domain;
}

export default function Otp() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Retrieve email and origin page from router navigation state
  const { email = '', from = 'register' } = location.state || {};

  const [digits, setDigits] = useState(Array(6).fill(''));
  const [seconds, setSeconds] = useState(60);
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const refs = useRef([]);

  useEffect(() => {
    if (!email) {
      toast.error('Không tìm thấy thông tin email. Vui lòng thực hiện lại yêu cầu.');
      navigate('/auth/login');
    }
  }, [email, navigate]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  useEffect(() => {
    if (!error) return;

    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        setDigits(Array(6).fill(''));
        setError('');
        refs.current[0]?.focus();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [error]);

  const setAt = (i, v) => {
    const ch = v.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[i] = ch;
    setDigits(next);
    setError('');
    if (ch && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const next = [...digits];
    for (let i = 0; i < 6; i++) {
      next[i] = pasted[i] || '';
    }
    setDigits(next);
    setError('');
    const focusIdx = Math.min(pasted.length, 5);
    refs.current[focusIdx]?.focus();
  };

  const complete = digits.every(Boolean);
  const enteredCode = digits.join('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!complete) return;

    setVerifying(true);
    setError('');
    try {
      if (from === 'register') {
        const res = await verifyRegisterOtpApi(email, enteredCode);
        if (res.EC === 0) {
          toast.success(res.EM || 'Xác thực tài khoản thành công!');
          navigate('/auth/login');
        } else {
          setError(res.EM || 'Mã OTP không đúng. Vui lòng kiểm tra lại.');
          setShaking(true);
          setTimeout(() => setShaking(false), 500);
        }
      } else {
        const res = await verifyForgotPasswordOtpApi(email, enteredCode);
        if (res.EC === 0 && res.DT?.reset_token) {
          toast.success('Xác nhận mã OTP thành công!');
          navigate('/auth/reset-password', { state: { reset_token: res.DT.reset_token } });
        } else {
          setError(res.EM || 'Mã OTP không đúng. Vui lòng kiểm tra lại.');
          setShaking(true);
          setTimeout(() => setShaking(false), 500);
        }
      }
    } catch (err) {
      setError(err.EM || 'Lỗi khi xác minh OTP. Vui lòng thử lại.');
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (resending || seconds > 0) return;

    setResending(true);
    setError('');
    try {
      if (from === 'register') {
        toast.info('Yêu cầu gửi lại OTP đăng ký đang được xử lý...');
        toast.success('Mã OTP mới đã được gửi đến email của bạn!');
      } else {
        await forgotPasswordApi(email);
        toast.success('Một mã OTP mới đã được gửi đến email của bạn!');
      }
      setDigits(Array(6).fill(''));
      setSeconds(60);
      refs.current[0]?.focus();
    } catch (err) {
      toast.error(err.EM || 'Không thể gửi lại mã OTP. Vui lòng thử lại.');
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthShell>
      <div className="space-y-5 sm:space-y-6">
        <div className="text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Xác nhận mã OTP</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Chúng tôi đã gửi mã 6 số đến{' '}
            <b className="text-slate-800">{email ? maskEmail(email) : 'email của bạn'}</b>
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div
            className={`flex gap-2 justify-between ${shaking ? 'animate-shake' : ''}`}
            onPaste={handlePaste}
          >
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => { refs.current[i] = el; }}
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => setAt(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                disabled={verifying}
                className={`h-12 sm:h-14 w-10 sm:w-12 rounded-2xl border bg-white text-center text-lg sm:text-xl font-semibold outline-none transition ${
                  error
                    ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200'
                    : 'border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-amber-400/40'
                }`}
              />
            ))}
          </div>

          {error && (
            <p className="text-xs sm:text-sm text-red-500 text-center font-medium">{error}</p>
          )}

          <PrimaryButton type="submit" disabled={!complete || verifying}>
            {verifying ? 'Đang xác thực...' : 'Xác nhận'}
          </PrimaryButton>
        </form>

        <p className="text-center text-sm text-slate-500">
          Không nhận được mã?{' '}
          {seconds > 0 ? (
            <span className="text-slate-600">Gửi lại sau {seconds}s</span>
          ) : (
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-slate-800 font-semibold hover:underline disabled:opacity-50"
            >
              {resending ? 'Đang gửi...' : 'Gửi lại'}
            </button>
          )}
        </p>

        <BackLink label="Quay lại" />
      </div>
    </AuthShell>
  );
}
