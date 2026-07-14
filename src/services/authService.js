import apiClient from "./apiClient";

function assertSuccess(response) {
  if (response?.EC !== undefined && response.EC !== 0) {
    throw new Error(response.EM || "Yeu cau khong thanh cong");
  }
  return response?.DT ?? response;
}

export async function login({ loginId, password, remember = false }) {
  const response = await apiClient.post("/login", {
    login_id: loginId,
    password,
    remember_me: remember,
  });
  return assertSuccess(response);
}

export async function register({ fullName, phone, email, password }) {
  const response = await apiClient.post("/register", {
    full_name: fullName,
    phone: phone || undefined,
    email: email || undefined,
    password,
  });
  return assertSuccess(response);
}

export async function verifyRegisterOtp({ loginId, otpCode }) {
  const response = await apiClient.post("/verify-register-otp", {
    login_id: loginId,
    otp_code: otpCode,
  });
  return assertSuccess(response);
}

export async function forgotPassword(email) {
  const response = await apiClient.post("/forgot-password", { email });
  return assertSuccess(response);
}

export async function verifyForgotOtp({ email, otpCode }) {
  const response = await apiClient.post("/verify-otp", {
    email,
    otp_code: otpCode,
  });
  return assertSuccess(response);
}

export async function resetPassword({ resetToken, newPassword }) {
  const response = await apiClient.post("/reset-password", {
    reset_token: resetToken,
    new_password: newPassword,
  });
  return assertSuccess(response);
}

export async function changePassword({ oldPassword, newPassword }) {
  const response = await apiClient.post("/change-password", {
    old_password: oldPassword,
    new_password: newPassword,
  });
  return assertSuccess(response);
}

export async function logout() {
  const response = await apiClient.post("/logout");
  return assertSuccess(response);
}
