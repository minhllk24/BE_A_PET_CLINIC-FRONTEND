import { checkoutImages } from "./checkoutAssets";
import { useAuth } from "../../context/AuthContext";

function FieldLabel({ children, required = false }) {
  return (
    <label className="font-['Roboto'] text-[14px] leading-[1.43] tracking-[0.17px] text-[#3d3d3d]">
      {children}
      {required && <span className="text-[#c62828]">*</span>}
    </label>
  );
}

function PillInput({ id, type = "text", className = "", ...props }) {
  return (
    <input
      id={id}
      type={type}
      className={`h-[43px] rounded-[16px] border border-solid border-[#e0e0e0] bg-white px-4 font-['Roboto'] text-[14px] leading-[1.43] tracking-[0.17px] text-[rgba(0,0,0,0.87)] outline-none focus:border-[#0d47a1] ${className}`}
      {...props}
    />
  );
}

export function GuestLoginBanner() {
  const { openAuth } = useAuth();

  return (
    <section className="flex h-[73px] items-center justify-between gap-4 rounded-[8px] border border-solid border-[#c2c7d1] bg-white p-[25px]">
      <p
        className="min-w-0 flex-1 font-['Roboto'] text-[14px] font-medium leading-[24px] tracking-[0.17px] text-[#42474f]"
        style={{ lineHeight: "24px" }}
      >
        Đăng nhập tài khoản để mua hàng và theo dõi đơn hàng thuận tiện hơn
      </p>
      <button
        type="button"
        onClick={() => openAuth("login")}
        className="btn-brand-yellow-sm shrink-0 w-[125px] text-center"
      >
        Đăng nhập
      </button>
    </section>
  );
}

export function GuestShippingForm() {
  return (
    <section className="flex flex-col gap-4 rounded-[8px] border border-solid border-[#c2c7d1] bg-white p-[25px]">
      <div className="flex items-center gap-2">
        <img
          src={checkoutImages.locationPin}
          alt=""
          className="h-5 w-4 shrink-0"
          aria-hidden="true"
        />
        <h2 className="font-['Roboto'] text-[24px] font-bold leading-[1.334] text-[#00355f]">
          Địa chỉ nhận hàng
        </h2>
      </div>

      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-[46px]">
          <div className="flex w-[307px] flex-col gap-[10px]">
            <FieldLabel required>
              Họ tên
            </FieldLabel>
            <PillInput id="guest-full-name" name="fullName" autoComplete="name" />
          </div>
          <div className="flex w-[307px] flex-col gap-[10px]">
            <FieldLabel required>
              Số điện thoại
            </FieldLabel>
            <PillInput
              id="guest-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
            />
          </div>
        </div>

        <div className="flex gap-[46px]">
          <div className="flex w-[307px] flex-col gap-[10px]">
            <FieldLabel>Email</FieldLabel>
            <PillInput
              id="guest-email"
              name="email"
              type="email"
              autoComplete="email"
            />
          </div>
          <div className="flex w-[307px] flex-col gap-[10px]">
            <FieldLabel required>
              Quốc gia
            </FieldLabel>
            <PillInput id="guest-country" name="country" defaultValue="Việt Nam" />
          </div>
        </div>

        <div className="flex w-full max-w-[660px] flex-col gap-[10px]">
          <FieldLabel required>
            Địa chỉ cụ thể
          </FieldLabel>
          <PillInput id="guest-address" name="address" autoComplete="street-address" />
        </div>

        <div className="flex w-full max-w-[660px] flex-col gap-[10px]">
          <FieldLabel required>
            Tỉnh/Thành phố
          </FieldLabel>
          <PillInput id="guest-city" name="city" autoComplete="address-level1" />
        </div>
      </div>
    </section>
  );
}
