import axios from 'axios';

// Base URL of the team's backend Express server
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Crucial for httpOnly refresh_token cookie
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginApi = async (login_id, password) => {
  try {
    const response = await apiClient.post('/login', { login_id, password });
    return response.data; // Structure: { EM, EC, DT: { access_token, user } }
  } catch (error) {
    throw error.response?.data || new Error('Đăng nhập thất bại');
  }
};

export const registerApi = async (fullName, email, password) => {
  try {
    const response = await apiClient.post('/register', {
      full_name: fullName,
      email: email,
      password: password,
    });
    return response.data; // Structure: { EM, EC, DT }
  } catch (error) {
    throw error.response?.data || new Error('Đăng ký thất bại');
  }
};

export const verifyRegisterOtpApi = async (login_id, otp_code) => {
  try {
    const response = await apiClient.post('/verify-register-otp', {
      login_id,
      otp_code,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Mã OTP không chính xác');
  }
};

export const forgotPasswordApi = async (email) => {
  try {
    const response = await apiClient.post('/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Gửi yêu cầu thất bại');
  }
};

export const verifyForgotPasswordOtpApi = async (email, otp_code) => {
  try {
    const response = await apiClient.post('/verify-otp', { email, otp_code });
    return response.data; // Response contains reset_token in DT
  } catch (error) {
    throw error.response?.data || new Error('Mã OTP không chính xác');
  }
};

export const resetPasswordApi = async (reset_token, new_password) => {
  try {
    const response = await apiClient.post('/reset-password', {
      reset_token,
      new_password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Đặt lại mật khẩu thất bại');
  }
};
