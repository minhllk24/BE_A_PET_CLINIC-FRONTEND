import { checkoutImages } from "./checkoutAssets";
import { useAuth } from "../../context/AuthContext";

function FieldLabel({ children, required = false }) {
  return (
    <label className="text-sm font-medium text-slate-900">
      {children}
      {required && <span className="text-red-600">*</span>}
    </label>
  );
}

function PillInput({ id, type = "text", className = "", ...props }) {
  return (
    <input
      id={id}
      type={type}
      className={`h-10 rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none focus:border-blue-900 ${className}`}
      {...props}
    />
  );
}

export function GuestLoginBanner() {
  const { openAuth } = useAuth();

  return (
    <section className="flex min-h-[73px] items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-[0_4px_13px_rgba(144,202,249,0.85)]">
      <p
        className="min-w-0 flex-1 text-sm font-medium leading-6 text-slate-700"
        style={{ lineHeight: "24px" }}
      >
        Đăng nhập tài khoản để mua hàng và theo dõi đơn hàng thuận tiện hơn
      </p>
      <button
        type="button"
        onClick={() => openAuth("login")}
        className="shrink-0 rounded bg-secondary px-6 py-3 text-sm font-bold uppercase tracking-[0.46px] shadow-elevation transition hover:bg-[#ffe454]"
      >
        Đăng nhập
      </button>
    </section>
  );
}

export function GuestShippingForm({ value, onChange }) {
  const update = (field) => (event) => {
    onChange?.({ ...value, [field]: event.target.value });
  };

  return (
    <section className="flex flex-col gap-5 rounded-2xl bg-white p-8 shadow-[0_4px_13px_rgba(144,202,249,0.85)]">
      <div className="flex items-center gap-2">
        <img
          src={checkoutImages.locationPin}
          alt=""
          className="h-5 w-4 shrink-0"
          aria-hidden="true"
        />
        <h2 className="text-xl font-black text-blue-900">
          ĐỊA CHỈ NHẬN HÀNG
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
            <FieldLabel required>
              Họ tên
            </FieldLabel>
            <PillInput id="guest-full-name" name="fullName" autoComplete="name" value={value?.fullName || ""} onChange={update("fullName")} />
        </div>
        <div className="flex flex-col gap-2">
            <FieldLabel required>
              Số điện thoại
            </FieldLabel>
            <PillInput
              id="guest-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={value?.phone || ""}
              onChange={update("phone")}
            />
        </div>

        <div className="flex flex-col gap-2">
            <FieldLabel>Email</FieldLabel>
            <PillInput
              id="guest-email"
              name="email"
              type="email"
              autoComplete="email"
              value={value?.email || ""}
              onChange={update("email")}
            />
        </div>
        <div className="flex flex-col gap-2">
            <FieldLabel required>
              Quốc gia
            </FieldLabel>
            <PillInput id="guest-country" name="country" value={value?.country || "Việt Nam"} onChange={update("country")} />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <FieldLabel required>
            Địa chỉ cụ thể
          </FieldLabel>
          <PillInput id="guest-address" name="address" autoComplete="street-address" value={value?.address || ""} onChange={update("address")} />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <FieldLabel required>
            Tỉnh/Thành phố
          </FieldLabel>
          <PillInput id="guest-city" name="city" autoComplete="address-level1" value={value?.city || ""} onChange={update("city")} />
        </div>
      </div>
    </section>
  );
}
