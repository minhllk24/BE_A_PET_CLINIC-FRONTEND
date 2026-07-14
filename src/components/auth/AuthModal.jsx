import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Phone,
  X,
} from "lucide-react";
import { authImages } from "../../assets/authImages";
import { useAuth } from "../../context/AuthContext";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
  verifyForgotOtp,
  verifyRegisterOtp,
} from "../../services/authService";

const EMPTY_FORMS = {
  login: { phone: "", password: "", remember: false },
  register: {
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  forgot: { account: "" },
  reset: { password: "", confirmPassword: "" },
};

const SIDE_CONTENT = {
  login: {
    image: authImages.loginDog,
    title: "Chào mừng trở lại!",
    text: "Đăng nhập để quản lý hồ sơ thú cưng và đặt lịch hẹn dễ dàng.",
  },
  register: {
    image: authImages.registerDog,
    title: "Chào mừng bạn!",
    text: "Tham gia cùng chúng tôi để nhận dịch vụ chăm sóc tốt nhất cho thú cưng của bạn.",
  },
};

const PHONE_PATTERN = /^(?:\+84|0)(?:3|5|7|8|9)\d{8}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

const VALIDATION_SCHEMAS = {
  login: {
    phone: ["required", "account"],
    password: ["required"],
  },
  register: {
    name: ["required"],
    phone: ["required", "phone"],
    email: ["email"],
    password: ["required", "password"],
    confirmPassword: ["required", "confirmPassword"],
  },
  forgot: {
    account: ["required", "account"],
  },
  reset: {
    password: ["required", "password"],
    confirmPassword: ["required", "confirmPassword"],
  },
};

const VALIDATION_MESSAGES = {
  requiredByField: {
    phone: "Vui lòng nhập số điện thoại hoặc email",
    password: "Vui lòng nhập mật khẩu",
  },
  required: "Vui lòng điền thông tin",
  phone: "Số điện thoại không đúng định dạng",
  email: "Email không đúng định dạng",
  password: "Mật khẩu cần tối thiểu 8 ký tự, gồm 1 chữ hoa và 1 số",
  confirmPassword: "Mật khẩu xác nhận chưa khớp",
  account: "Vui lòng nhập đúng số điện thoại hoặc email",
};

function getFieldError(form, field, rules) {
  const value = String(form[field] ?? "").trim();

  for (const rule of rules) {
    if (rule === "required" && !value) {
      return VALIDATION_MESSAGES.requiredByField[field] ?? VALIDATION_MESSAGES.required;
    }
    if (!value) continue;
    if (rule === "phone" && !PHONE_PATTERN.test(value)) return VALIDATION_MESSAGES.phone;
    if (rule === "email" && !EMAIL_PATTERN.test(value)) return VALIDATION_MESSAGES.email;
    if (rule === "password" && !PASSWORD_PATTERN.test(value)) return VALIDATION_MESSAGES.password;
    if (rule === "confirmPassword" && value !== form.password) return VALIDATION_MESSAGES.confirmPassword;
    if (rule === "account" && !PHONE_PATTERN.test(value) && !EMAIL_PATTERN.test(value)) {
      return VALIDATION_MESSAGES.account;
    }
  }

  return "";
}

function getFormErrors(form, schema) {
  return Object.fromEntries(
    Object.entries(schema).map(([field, rules]) => [field, getFieldError(form, field, rules)]),
  );
}

function submitValidatedForm(event, errors, setValidationAttempted, onValid) {
  event.preventDefault();
  const formElement = event.currentTarget;
  setValidationAttempted(true);
  if (Object.values(errors).some(Boolean)) {
    window.setTimeout(() => {
      formElement.querySelector('[data-auth-error="true"]')?.focus();
    }, 0);
    return;
  }
  onValid();
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  hint,
  placeholder,
  icon: Icon,
  error = "",
  variant = "default",
}) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const invalid = Boolean(error);
  const isSoft = variant === "soft";

  return (
    <label className={`block text-sm ${isSoft ? "font-medium text-[#060B16]" : "font-semibold text-[rgba(0,0,0,0.87)]"}`}>
      <span>
        {label}
        {required && <span className="text-[#c62828]">*</span>}
      </span>
      <span className={`${isSoft ? "mt-[6px]" : "mt-1"} relative block`}>
        {Icon && (
          <Icon
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2"
          />
        )}
        <input
          name={name}
          value={value}
          onChange={onChange}
          type={isPassword && visible ? "text" : type}
          required={required}
          placeholder={placeholder}
          data-auth-error={invalid ? "true" : undefined}
          aria-invalid={invalid || undefined}
          className={[
            isSoft
              ? "h-12 w-full rounded-xl border bg-[#FAFEFF] px-4 text-[16px] font-normal text-[#060B16] outline-none transition placeholder:text-[rgba(6,11,22,0.5)]"
              : "h-[37px] w-full rounded-[6px] border bg-white px-3 text-sm font-normal outline-none transition md:h-[37px]",
            invalid
              ? "border-[#c62828] ring-1 ring-[#c62828]"
              : isSoft
                ? "border-[#C6DCE3] hover:border-[#90caf9] focus:border-[#0d47a1] focus:ring-1 focus:ring-[#0d47a1]"
                : "border-[rgba(0,0,0,0.42)] hover:border-[#90caf9] focus:border-[#0d47a1] focus:ring-1 focus:ring-[#0d47a1]",
            Icon ? "pl-9" : "",
            isPassword ? "pr-10" : "",
          ].join(" ")}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            className="btn-icon-subtle absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500"
            aria-label={visible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        )}
      </span>
      {hint && <span className="mt-1 block text-[11px] font-normal italic text-gray-500">{hint}</span>}
      {invalid && <span className="mt-1 block text-xs font-normal text-[#c62828]">{error}</span>}
    </label>
  );
}

function PrimaryButton({ children, disabled = false }) {
  return (
    <button type="submit" disabled={disabled} className="btn-yellow h-[43px] w-full disabled:opacity-50">
      {children}
    </button>
  );
}

function GoogleButton() {
  return (
    <button
      type="button"
      className="focus-ring-brand flex h-[39px] w-full items-center justify-center gap-2 rounded-md border border-black bg-white text-sm font-medium"
    >
      {/* <span className="text-lg font-bold text-[#4285f4]">G</span> */}
      <span className="text-lg font-bold text-[#4285f4]">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M18.8 10.2084C18.8 9.55837 18.7417 8.93337 18.6333 8.33337H10V11.8834H14.9333C14.725 13.025 14.075 14.0084 13.1167 14.65V16.95H16.0833C17.8167 15.35 18.8 13 18.8 10.2084Z" fill="#4285F4"/>
          <path d="M10.0002 19.1667C12.4752 19.1667 14.5502 18.3501 16.0836 16.9501L13.1169 14.6501C12.2919 15.2084 11.2336 15.5501 10.0002 15.5501C7.61688 15.5501 5.60021 13.9417 4.87521 11.7667H1.81689V14.1417C3.33356 17.1501 6.41688 19.1667 10.0002 19.1667Z" fill="#34A853"/>
          <path d="M4.87514 11.7666C4.6918 11.2166 4.58347 10.625 4.58347 9.99997C4.58347 9.37497 4.6918 8.7833 4.87514 8.2333V5.85828H1.81682C1.20015 7.09161 0.833496 8.49997 0.833496 9.99997C0.833496 11.5 1.20015 12.9083 1.81682 14.1416L4.87514 11.7666Z" fill="#FBBC05"/>
          <path d="M10.0002 4.45004C11.3502 4.45004 12.5586 4.91671 13.5086 5.82504L16.1586 3.17504C14.5419 1.67504 12.4752 0.833374 10.0002 0.833374C6.41688 0.833374 3.33356 2.85004 1.81689 5.85835L4.87521 8.23337C5.60021 6.05837 7.61688 4.45004 10.0002 4.45004Z" fill="#EA4335"/>
        </svg>        
      </span>

      Tiếp tục với Google
    </button>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="h-px flex-1 bg-black/60" />
      <span>Hoặc tiếp tục với</span>
      <span className="h-px flex-1 bg-black/60" />
    </div>
  );
}

function AuthBackgroundBlob({ className = "" }) {
  return (
    <img
      src={authImages.backgroundBlob}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute max-w-none select-none ${className}`}
    />
  );
}

function SplitSide({ variant }) {
  const content = SIDE_CONTENT[variant];
  return (
    <aside className="relative flex h-[242px] w-full shrink-0 flex-col items-center justify-center overflow-hidden bg-[#90CAF9] px-5 text-center md:h-auto md:w-1/2 md:self-stretch md:px-8 lg:w-[48%]">
      <AuthBackgroundBlob className="-left-[124px] top-[48px] h-[624px] w-[561px] md:-left-[235px] md:-top-[105px] md:h-[817.884px] md:w-[910.149px]" />
      <img
        src={authImages.logo}
        alt="Dr. Pet's House"
        className="absolute left-[13px] top-[3px] z-10 h-[56px] w-[101px] object-contain md:left-5 md:top-5 md:h-[78px] md:w-auto"
      />
      <img
        src={content.image}
        alt=""
        className="relative z-10 h-[116px] w-[118px] rounded-full border-4 border-white bg-white object-cover shadow-lg md:h-[183px] md:w-[180px] lg:h-64 lg:w-64"
      />
      <h2 className="relative z-10 mt-1 text-[16px] font-semibold leading-8 text-[#191C1E] md:mt-6 md:text-2xl">{content.title}</h2>
      <p className="relative z-10 max-w-[320px] text-center text-[12px] leading-[1.3] md:mt-2 md:text-[16px] md:leading-6">{content.text}</p>
    </aside>
  );
}

function LoginForm({ form, setForm, changeScreen, completeLogin }) {
  const [validationAttempted, setValidationAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const update = ({ target }) =>
    setForm((current) => ({ ...current, [target.name]: target.type === "checkbox" ? target.checked : target.value }));
  const errors = getFormErrors(form, VALIDATION_SCHEMAS.login);
  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const data = await login({
        loginId: form.phone.trim(),
        password: form.password,
        remember: form.remember,
      });
      completeLogin(
        { phone: form.phone.trim() },
        {
          remember: form.remember,
          accessToken: data?.access_token,
          user: data?.user,
        },
      );
    } catch (error) {
      setSubmitError(error?.message || "Dang nhap khong thanh cong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form noValidate className="flex flex-col gap-5" onSubmit={(event) => submitValidatedForm(event, errors, setValidationAttempted, handleSubmit)}>
      <Field label="Số điện thoại / Email" name="phone" value={form.phone} onChange={update} icon={Phone} required error={validationAttempted ? errors.phone : ""} />
      <Field label="Mật khẩu" name="password" value={form.password} onChange={update} icon={LockKeyhole} type="password" required error={validationAttempted ? errors.password : ""} />
      {submitError && <p className="rounded bg-red-50 px-3 py-2 text-sm text-[#c62828]">{submitError}</p>}
      <div className="flex items-center justify-between pb-2 text-sm">
        <label className="flex items-center gap-2">
          <input name="remember" type="checkbox" checked={form.remember} onChange={update} className="size-4" />
          Ghi nhớ đăng nhập
        </label>
        <button type="button" onClick={() => changeScreen("forgot")} className="font-semibold text-blue-900">
          Quên mật khẩu?
        </button>
      </div>
      <PrimaryButton disabled={submitting}>{submitting ? "ĐANG ĐĂNG NHẬP..." : "ĐĂNG NHẬP"}</PrimaryButton>
      <Divider />
      <GoogleButton />
      <p className="text-center text-sm">
        Chưa có tài khoản?{" "}
        <button type="button" onClick={() => changeScreen("register")} className="font-semibold text-blue-900">
          Đăng ký ngay
        </button>
      </p>
    </form>
  );
}

function RegisterForm({ form, setForm, changeScreen, updateUserProfile }) {
  const [validationAttempted, setValidationAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const update = ({ target }) => setForm((current) => ({ ...current, [target.name]: target.value }));
  const errors = getFormErrors(form, VALIDATION_SCHEMAS.register);
  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      await register({
        fullName: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      updateUserProfile({
        fullName: form.name,
        phone: form.phone,
        email: form.email,
      });
      changeScreen("registerOtp");
    } catch (error) {
      setSubmitError(error?.message || "Dang ky khong thanh cong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      noValidate
      className="flex flex-col gap-4"
      onSubmit={(event) => submitValidatedForm(event, errors, setValidationAttempted, handleSubmit)}
    >
      <Field label="Họ và Tên" name="name" value={form.name} onChange={update} required error={validationAttempted ? errors.name : ""} />
      <div className="grid grid-cols-2 gap-[9px] md:gap-4">
        <Field label="Số điện thoại" name="phone" value={form.phone} onChange={update} type="tel" required error={validationAttempted ? errors.phone : ""} />
        <Field label="Email" name="email" value={form.email} onChange={update} type="email" error={validationAttempted ? errors.email : ""} />
      </div>
      <Field label="Mật khẩu" name="password" value={form.password} onChange={update} type="password" required hint="Tối thiểu 8 ký tự, 1 chữ hoa, 1 số" error={validationAttempted ? errors.password : ""} />
      <Field label="Xác nhận mật khẩu" name="confirmPassword" value={form.confirmPassword} onChange={update} type="password" required error={validationAttempted ? errors.confirmPassword : ""} />
      {submitError && <p className="rounded bg-red-50 px-3 py-2 text-sm text-[#c62828]">{submitError}</p>}
      <PrimaryButton disabled={submitting}>{submitting ? "ĐANG GỬI OTP..." : "ĐĂNG KÝ NGAY"}</PrimaryButton>
      <Divider />
      <GoogleButton />
      <p className="text-center text-sm">
        Đã có tài khoản?{" "}
        <button type="button" onClick={() => changeScreen("login")} className="font-semibold text-blue-900">
          Đăng nhập ngay
        </button>
      </p>
    </form>
  );
}

function OtpForm({ changeScreen, nextScreen, previousScreen, onSubmitOtp, submitError = "", submitting = false }) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const refs = useRef([]);
  const complete = otp.join("").length === 6;

  const updateOtp = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setOtp((current) => current.map((item, position) => (position === index ? digit : item)));
    if (digit) refs.current[index + 1]?.focus();
  };

  return (
    <form className="flex flex-col gap-[23.5px]" onSubmit={(event) => { event.preventDefault(); if (complete) onSubmitOtp ? onSubmitOtp(otp.join("")) : changeScreen(nextScreen); }}>
      <div className="flex h-14 justify-between gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(node) => { refs.current[index] = node; }}
            value={digit}
            onChange={(event) => updateOtp(index, event.target.value)}
            onKeyDown={(event) => { if (event.key === "Backspace" && !digit) refs.current[index - 1]?.focus(); }}
            inputMode="numeric"
            aria-label={`Số OTP thứ ${index + 1}`}
            className="h-14 min-w-0 max-w-14 flex-1 rounded-xl border border-[#C6DCE3] bg-[#FAFEFF] text-center text-xl font-bold outline-none transition focus:border-[#0D47A1] focus:ring-1 focus:ring-[#0D47A1]"
          />
        ))}
      </div>
      {submitError && <p className="rounded bg-red-50 px-3 py-2 text-sm text-[#c62828]">{submitError}</p>}
      <PrimaryButton disabled={!complete || submitting}>{submitting ? "ĐANG XÁC NHẬN..." : "XÁC NHẬN"}</PrimaryButton>
      <p className="text-center text-sm text-[#4f5359]">Không nhận được mã? <button type="button" className="text-blue-900">Gửi lại mã</button></p>
      <button type="button" onClick={() => changeScreen(previousScreen)} className="flex items-center justify-center gap-2 text-sm text-[#7e8085]">
        <ArrowLeft className="size-4" /> Quay lại
      </button>
    </form>
  );
}

function RecoveryPanel({ screen, forms, setForms, changeScreen }) {
  const [forgotValidationAttempted, setForgotValidationAttempted] = useState(false);
  const [resetValidationAttempted, setResetValidationAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [resetToken, setResetToken] = useState("");
  const update = (key) => ({ target }) =>
    setForms((current) => ({ ...current, [key]: { ...current[key], [target.name]: target.value } }));

  const forgotErrors = getFormErrors(forms.forgot, VALIDATION_SCHEMAS.forgot);
  const resetErrors = getFormErrors(forms.reset, VALIDATION_SCHEMAS.reset);
  const otpRecipient = screen === "registerOtp"
    ? forms.register.email.trim() || forms.register.phone.trim()
    : forms.forgot.account.trim();
  const handleForgotSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const account = forms.forgot.account.trim();
      if (!EMAIL_PATTERN.test(account)) {
        throw new Error("Backend hien chi ho tro quen mat khau bang email");
      }
      await forgotPassword(account);
      changeScreen("resetOtp");
    } catch (error) {
      setSubmitError(error?.message || "Khong the gui OTP");
    } finally {
      setSubmitting(false);
    }
  };
  const handleOtpSubmit = async (otpCode) => {
    setSubmitting(true);
    setSubmitError("");
    try {
      if (screen === "registerOtp") {
        await verifyRegisterOtp({
          loginId: forms.register.email.trim() || forms.register.phone.trim(),
          otpCode,
        });
        changeScreen("success");
        return;
      }
      const data = await verifyForgotOtp({
        email: forms.forgot.account.trim(),
        otpCode,
      });
      setResetToken(data?.reset_token || "");
      changeScreen("reset");
    } catch (error) {
      setSubmitError(error?.message || "OTP khong hop le");
    } finally {
      setSubmitting(false);
    }
  };
  const handleResetSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      await resetPassword({
        resetToken,
        newPassword: forms.reset.password,
      });
      changeScreen("login");
    } catch (error) {
      setSubmitError(error?.message || "Khong the doi mat khau");
    } finally {
      setSubmitting(false);
    }
  };

  const content = {
    forgot: ["Quên mật khẩu?", "Nhập SĐT hoặc email đã đăng ký để nhận mã xác nhận"],
    resetOtp: ["Xác nhận mã OTP", `Chúng tôi đã gửi mã 6 số đến ${otpRecipient}`],
    registerOtp: ["Xác nhận mã OTP", `Chúng tôi đã gửi mã 6 số đến ${otpRecipient}`],
    reset: ["Tạo mật khẩu mới", "Nhập mật khẩu mới cho tài khoản của bạn"],
  }[screen];

  return (
    <div className="relative flex w-full flex-col items-center overflow-hidden rounded-xl bg-[#90CAF9] px-5 pb-[15px] pt-14 shadow-2xl md:min-h-[637px] md:flex-row md:p-12">
      <AuthBackgroundBlob className="absolute -left-[142px] top-[-1px] h-[865px] w-[802px] max-w-none md:-left-[3px] md:top-[23px] md:h-[817.884px] md:w-[950.149px]" />
      <img src={authImages.logo} alt="Dr. Pet's House" className="absolute left-[13px] top-[3px] z-10 h-[56px] w-[101px] object-contain md:left-5 md:top-5 md:h-[78px] md:w-auto" />
      <div className="relative z-10 flex h-[244px] w-[232px] shrink-0 items-center justify-center md:w-1/2 md:pr-7 md:pt-10">
        <img src={authImages.searchDog} alt="" className="h-[206px] w-[232px] rounded-full bg-white object-cover shadow-lg md:h-[350px] md:w-[380px]" />
      </div>
      <section className="relative z-10 mx-auto w-full max-w-[420px] pb-[15px]">
        <h1 className="mb-[-8px] text-[20px] font-extrabold leading-9 tracking-[-0.75px] text-[#060b16] md:mb-0 md:text-[30px]">{content[0]}</h1>
        <p className="mb-[23.5px] text-[12px] leading-[26px] text-[#4f5359] md:mb-6 md:mt-2 md:text-[16px]">{content[1]}</p>
        {screen === "forgot" && (
          <form noValidate className="flex flex-col gap-[23.5px]" onSubmit={(event) => submitValidatedForm(event, forgotErrors, setForgotValidationAttempted, handleForgotSubmit)}>
            <Field label="Số điện thoại / Email" name="account" value={forms.forgot.account} onChange={update("forgot")} variant="soft" required error={forgotValidationAttempted ? forgotErrors.account : ""} />
            {submitError && <p className="rounded bg-red-50 px-3 py-2 text-sm text-[#c62828]">{submitError}</p>}
            <PrimaryButton disabled={submitting}>{submitting ? "ĐANG GỬI..." : "GỬI MÃ XÁC NHẬN"}</PrimaryButton>
            <button type="button" onClick={() => changeScreen("login")} className="flex items-center justify-center gap-2 text-sm text-[#7e8085]">
              <ArrowLeft className="size-4" /> Quay lại đăng nhập
            </button>
          </form>
        )}
        {(screen === "resetOtp" || screen === "registerOtp") && (
          <OtpForm
            changeScreen={changeScreen}
            nextScreen={screen === "registerOtp" ? "success" : "reset"}
            previousScreen={screen === "registerOtp" ? "register" : "forgot"}
            onSubmitOtp={handleOtpSubmit}
            submitError={submitError}
            submitting={submitting}
          />
        )}
        {screen === "reset" && (
          <form noValidate className="flex flex-col gap-[23.5px]" onSubmit={(event) => submitValidatedForm(event, resetErrors, setResetValidationAttempted, handleResetSubmit)}>
            <div className="flex flex-col gap-4">
              <Field label="Mật khẩu mới" name="password" value={forms.reset.password} onChange={update("reset")} type="password" placeholder="Tối thiểu 8 ký tự" variant="soft" required error={resetValidationAttempted ? resetErrors.password : ""} />
              <Field label="Xác nhận mật khẩu" name="confirmPassword" value={forms.reset.confirmPassword} onChange={update("reset")} type="password" placeholder="Nhập lại mật khẩu mới" variant="soft" required error={resetValidationAttempted ? resetErrors.confirmPassword : ""} />
            </div>
            {submitError && <p className="rounded bg-red-50 px-3 py-2 text-sm text-[#c62828]">{submitError}</p>}
            <PrimaryButton disabled={submitting}>{submitting ? "ĐANG ĐỔI..." : "ĐỔI MẬT KHẨU"}</PrimaryButton>
          </form>
        )}
      </section>
    </div>
  );
}

function SuccessPanel({ changeScreen }) {
  return (
    <div className="relative flex min-h-[646px] w-full flex-col items-center overflow-hidden rounded-xl rounded-bl-none bg-white pb-[15px] pt-[67px] shadow-2xl md:min-h-[560px] md:flex-row md:justify-center md:gap-10 md:rounded-bl-xl md:p-10">
      <img src={authImages.logo} alt="Dr. Pet's House" className="absolute left-[13px] top-[3px] h-[56px] w-[101px] object-contain md:left-6 md:top-5 md:h-[78px] md:w-auto" />
      <div className="border-[1.903px] border-dashed border-secondary p-[6.344px] md:border-[3px] md:p-2">
        <img src={authImages.successDog} alt="" className="h-[222.689px] w-[197.311px] rounded-[7.613px] bg-[#E5F6FD] object-cover md:h-[300px] md:w-[270px]" />
      </div>
      <div className="flex w-full max-w-[425px] flex-col items-center px-5 pt-3 text-center md:px-0">
        <span className="flex size-[74px] items-center justify-center rounded-full bg-[#2e7d32] text-white"><Check className="size-12" /></span>
        <h1 className="mt-5 text-[20px] font-bold leading-10 md:text-3xl">Đăng ký thành công!</h1>
        <p className="mt-3 text-[16px] leading-[29.25px] md:text-lg">Chào mừng bạn đến với <strong>Dr. Pet&apos;s House</strong></p>
        <button type="button" onClick={() => changeScreen("login")} className="btn-yellow mt-6">
          ĐĂNG NHẬP NGAY <ArrowRight className="size-5" />
        </button>
        <p className="mt-6 w-full border-t border-[rgba(206,198,178,0.3)] pt-4 text-sm">Cần hỗ trợ? <a href="tel:0900000000" className="font-semibold text-blue-900">Liên hệ đội ngũ chăm sóc</a></p>
      </div>
    </div>
  );
}

function AuthModal() {
  const { authModal, closeAuth, openAuth, completeLogin, updateUserProfile } = useAuth();
  const [forms, setForms] = useState(EMPTY_FORMS);

  useEffect(() => {
    if (!authModal) return undefined;
    const closeOnEscape = (event) => { if (event.key === "Escape") closeAuth(); };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [authModal, closeAuth]);

  if (!authModal) return null;
  const isSplit = authModal === "login" || authModal === "register";

  return (
    <div className="overlay-fade-in fixed inset-0 z-[200] flex items-center justify-center bg-[#06105a40] p-3 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) closeAuth(); }}>
      <div role="dialog" aria-modal="true" aria-label="Tài khoản" className="relative max-h-[calc(100vh-24px)] w-full max-w-[360px] overflow-y-auto rounded-xl md:max-w-[744px] lg:max-w-[930px]">
        <button type="button" onClick={closeAuth} className="btn-icon-subtle absolute right-[13px] top-[13px] z-20 p-0 text-gray-500 md:right-[17px] md:top-8" aria-label="Đóng">
          <X className="size-[14px] md:size-5" />
        </button>
        {isSplit ? (
          <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-2xl md:min-h-[637px] md:flex-row">
            <SplitSide variant={authModal} />
            <section className="flex flex-1 flex-col justify-center bg-white px-5 pb-[15px] md:h-[637px] md:px-[30px] md:py-12 lg:px-12">
              <div className={authModal === "login" ? "pb-8 pt-4" : "pb-[19px] pt-4"}>
                <h1 className="text-[20px] font-bold leading-[1.5] md:text-[32px] md:leading-10">{authModal === "login" ? "Đăng Nhập" : "Đăng Ký Tài Khoản"}</h1>
                {authModal === "login" && <p className="mt-2 text-[12px] leading-6 md:text-[16px]">Vui lòng nhập thông tin của bạn.</p>}
              </div>
              {authModal === "login" ? (
                <LoginForm form={forms.login} setForm={(updater) => setForms((current) => ({ ...current, login: updater(current.login) }))} changeScreen={openAuth} completeLogin={completeLogin} />
              ) : (
                <RegisterForm form={forms.register} setForm={(updater) => setForms((current) => ({ ...current, register: updater(current.register) }))} changeScreen={openAuth} updateUserProfile={updateUserProfile} />
              )}
            </section>
          </div>
        ) : authModal === "success" ? (
          <SuccessPanel changeScreen={openAuth} />
        ) : (
          <RecoveryPanel screen={authModal} forms={forms} setForms={setForms} changeScreen={openAuth} />
        )}
      </div>
    </div>
  );
}

export default AuthModal;
