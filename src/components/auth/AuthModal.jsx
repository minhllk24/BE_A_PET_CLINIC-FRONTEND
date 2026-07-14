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
    phone: ["required", "phone"],
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
    phone: "Vui lòng nhập số điện thoại",
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
}) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const invalid = Boolean(error);

  return (
    <label className="block text-sm font-semibold text-[rgba(0,0,0,0.87)]">
      <span>
        {label}
        {required && <span className="text-[#c62828]">*</span>}
      </span>
      <span className="relative mt-1 block">
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
            "h-[38px] w-full rounded border bg-white px-3 text-sm font-normal outline-none transition",
            invalid
              ? "border-[#c62828] ring-1 ring-[#c62828]"
              : "border-[rgba(0,0,0,0.23)] hover:border-[#90caf9] focus:border-[#0d47a1] focus:ring-1 focus:ring-[#0d47a1]",
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
    <button type="submit" disabled={disabled} className="btn-yellow h-[43px] w-full">
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
    <aside className="relative hidden w-[48%] shrink-0 flex-col items-center justify-center overflow-hidden bg-[#90CAF9] px-8 text-center md:flex">
      <AuthBackgroundBlob className="-left-[235px] -top-[105px] h-[817.884px] w-[910.149px]" />
      <img
        src={authImages.logo}
        alt="Dr. Pet's House"
        className="absolute left-5 top-5 z-10 h-[78px] w-auto object-contain"
      />
      <img
        src={content.image}
        alt=""
        className="relative z-10 h-64 w-64 rounded-full border-4 border-white bg-white object-cover shadow-lg"
      />
      <h2 className="relative z-10 mt-7 text-2xl font-bold">{content.title}</h2>
      <p className="relative z-10 mt-2 max-w-[330px] leading-6">{content.text}</p>
    </aside>
  );
}

function LoginForm({ form, setForm, changeScreen, completeLogin }) {
  const [validationAttempted, setValidationAttempted] = useState(false);
  const update = ({ target }) =>
    setForm((current) => ({ ...current, [target.name]: target.type === "checkbox" ? target.checked : target.value }));
  const errors = getFormErrors(form, VALIDATION_SCHEMAS.login);

  return (
    <form noValidate className="flex flex-col gap-5" onSubmit={(event) => submitValidatedForm(event, errors, setValidationAttempted, () => completeLogin({ phone: form.phone }))}>
      <Field label="Số điện thoại" name="phone" value={form.phone} onChange={update} icon={Phone} required error={validationAttempted ? errors.phone : ""} />
      <Field label="Mật khẩu" name="password" value={form.password} onChange={update} icon={LockKeyhole} type="password" required error={validationAttempted ? errors.password : ""} />
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input name="remember" type="checkbox" checked={form.remember} onChange={update} className="size-4" />
          Ghi nhớ đăng nhập
        </label>
        <button type="button" onClick={() => changeScreen("forgot")} className="font-semibold text-blue-900">
          Quên mật khẩu?
        </button>
      </div>
      <PrimaryButton>ĐĂNG NHẬP</PrimaryButton>
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
  const update = ({ target }) => setForm((current) => ({ ...current, [target.name]: target.value }));
  const errors = getFormErrors(form, VALIDATION_SCHEMAS.register);

  return (
    <form
      noValidate
      className="flex flex-col gap-4"
      onSubmit={(event) => submitValidatedForm(event, errors, setValidationAttempted, () => {
        updateUserProfile({
          fullName: form.name,
          phone: form.phone,
          email: form.email,
        });
        changeScreen("registerOtp");
      })}
    >
      <Field label="Họ và Tên" name="name" value={form.name} onChange={update} required error={validationAttempted ? errors.name : ""} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Số điện thoại" name="phone" value={form.phone} onChange={update} type="tel" required error={validationAttempted ? errors.phone : ""} />
        <Field label="Email" name="email" value={form.email} onChange={update} type="email" error={validationAttempted ? errors.email : ""} />
      </div>
      <Field label="Mật khẩu" name="password" value={form.password} onChange={update} type="password" required hint="Tối thiểu 8 ký tự, 1 chữ hoa, 1 số" error={validationAttempted ? errors.password : ""} />
      <Field label="Xác nhận mật khẩu" name="confirmPassword" value={form.confirmPassword} onChange={update} type="password" required error={validationAttempted ? errors.confirmPassword : ""} />
      <PrimaryButton>ĐĂNG KÝ NGAY</PrimaryButton>
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

function OtpForm({ changeScreen, nextScreen, previousScreen }) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const refs = useRef([]);
  const complete = otp.join("").length === 6;

  const updateOtp = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setOtp((current) => current.map((item, position) => (position === index ? digit : item)));
    if (digit) refs.current[index + 1]?.focus();
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={(event) => { event.preventDefault(); if (complete) changeScreen(nextScreen); }}>
      <div className="flex justify-between gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(node) => { refs.current[index] = node; }}
            value={digit}
            onChange={(event) => updateOtp(index, event.target.value)}
            onKeyDown={(event) => { if (event.key === "Backspace" && !digit) refs.current[index - 1]?.focus(); }}
            inputMode="numeric"
            aria-label={`Số OTP thứ ${index + 1}`}
            className="input-brand h-14 min-w-0 flex-1 rounded-xl text-center text-xl font-bold"
          />
        ))}
      </div>
      <PrimaryButton disabled={!complete}>XÁC NHẬN</PrimaryButton>
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
  const update = (key) => ({ target }) =>
    setForms((current) => ({ ...current, [key]: { ...current[key], [target.name]: target.value } }));

  const forgotErrors = getFormErrors(forms.forgot, VALIDATION_SCHEMAS.forgot);
  const resetErrors = getFormErrors(forms.reset, VALIDATION_SCHEMAS.reset);
  const otpRecipient = screen === "registerOtp"
    ? forms.register.email.trim() || forms.register.phone.trim()
    : forms.forgot.account.trim();

  const content = {
    forgot: ["Quên mật khẩu?", "Nhập SĐT hoặc email đã đăng ký để nhận mã xác nhận"],
    resetOtp: ["Xác nhận mã OTP", `Chúng tôi đã gửi mã 6 số đến ${otpRecipient}`],
    registerOtp: ["Xác nhận mã OTP", `Chúng tôi đã gửi mã 6 số đến ${otpRecipient}`],
    reset: ["Tạo mật khẩu mới", "Nhập mật khẩu mới cho tài khoản của bạn"],
  }[screen];

  return (
    <div className="relative flex min-h-[520px] w-full items-center overflow-hidden rounded-xl bg-[#90CAF9] p-6 shadow-2xl md:min-h-[637px] md:p-12">
      <AuthBackgroundBlob className="-left-[3px] top-[23px] h-[817.884px] w-[950.149px]" />
      <img src={authImages.logo} alt="Dr. Pet's House" className="absolute left-5 top-5 z-10 h-[78px] w-auto" />
      <div className="relative z-10 hidden w-1/2 justify-center md:flex pr-7 pt-10">
        <img src={authImages.searchDog} alt="" className="h-[350px] w-[380px] rounded-full bg-white object-cover shadow-lg" />
      </div>
      <section className="relative z-10 mx-auto w-full max-w-[420px] pt-10">
        <h1 className="text-[30px] font-extrabold tracking-[-0.75px] text-[#060b16]">{content[0]}</h1>
        <p className="mb-6 mt-2 text-[#4f5359]">{content[1]}</p>
        {screen === "forgot" && (
          <form noValidate className="flex flex-col gap-6" onSubmit={(event) => submitValidatedForm(event, forgotErrors, setForgotValidationAttempted, () => changeScreen("resetOtp"))}>
            <Field label="Số điện thoại / Email" name="account" value={forms.forgot.account} onChange={update("forgot")} required error={forgotValidationAttempted ? forgotErrors.account : ""} />
            <PrimaryButton>GỬI MÃ XÁC NHẬN</PrimaryButton>
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
          />
        )}
        {screen === "reset" && (
          <form noValidate className="flex flex-col gap-4" onSubmit={(event) => submitValidatedForm(event, resetErrors, setResetValidationAttempted, () => changeScreen("login"))}>
            <Field label="Mật khẩu mới" name="password" value={forms.reset.password} onChange={update("reset")} type="password" placeholder="Tối thiểu 8 ký tự" required error={resetValidationAttempted ? resetErrors.password : ""} />
            <Field label="Xác nhận mật khẩu" name="confirmPassword" value={forms.reset.confirmPassword} onChange={update("reset")} type="password" placeholder="Nhập lại mật khẩu mới" required error={resetValidationAttempted ? resetErrors.confirmPassword : ""} />
            <PrimaryButton>ĐỔI MẬT KHẨU</PrimaryButton>
          </form>
        )}
      </section>
    </div>
  );
}

function SuccessPanel({ changeScreen }) {
  return (
    <div className="relative flex min-h-[560px] w-full items-center justify-center gap-10 overflow-hidden rounded-xl bg-white p-10 shadow-2xl">
      <img src={authImages.logo} alt="Dr. Pet's House" className="absolute left-6 top-5 h-[78px] w-auto" />
      <div className="hidden border-[3px] border-dashed border-secondary p-2 md:block">
        <img src={authImages.successDog} alt="" className="h-[300px] w-[270px] object-cover bg-[#E5F6FD]" />
      </div>
      <div className="flex max-w-[425px] flex-col items-center text-center">
        <span className="flex size-[74px] items-center justify-center rounded-full bg-[#2e7d32] text-white"><Check className="size-12" /></span>
        <h1 className="mt-5 text-3xl font-bold">Đăng ký thành công!</h1>
        <p className="mt-3 text-lg">Chào mừng bạn đến với <strong>Dr. Pet&apos;s House</strong></p>
        <button type="button" onClick={() => changeScreen("login")} className="btn-yellow mt-7">
          ĐĂNG NHẬP NGAY <ArrowRight className="size-5" />
        </button>
        <p className="mt-6 w-full border-t pt-4 text-sm">Cần hỗ trợ? <a href="tel:0900000000" className="font-semibold text-blue-900">Liên hệ đội ngũ chăm sóc</a></p>
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
      <div role="dialog" aria-modal="true" aria-label="Tài khoản" className="relative max-h-[calc(100vh-24px)] w-full max-w-[930px] overflow-y-auto rounded-xl">
        <button type="button" onClick={closeAuth} className="btn-icon-subtle absolute right-5 top-5 z-20 p-1 text-gray-500" aria-label="Đóng">
          <X className="size-5" />
        </button>
        {isSplit ? (
          <div className="flex min-h-[637px] overflow-hidden rounded-xl bg-white shadow-2xl">
            <SplitSide variant={authModal} />
            <section className="flex flex-1 flex-col justify-center p-7 md:p-12">
              <h1 className="mb-2 text-[32px] font-bold leading-10">{authModal === "login" ? "Đăng Nhập" : "Đăng Ký Tài Khoản"}</h1>
              {authModal === "login" && <p className="mb-8">Vui lòng nhập thông tin của bạn.</p>}
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
