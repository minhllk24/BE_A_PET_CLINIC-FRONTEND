import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import {
  checkoutImages,
  GUEST_ORDER_ITEMS,
  GUEST_ORDER_TOTAL,
  ONLINE_PAYMENT_METHODS,
  ORDER_CODE,
} from "./checkoutAssets";
import {
  GuestLoginBanner,
  GuestShippingForm,
} from "./GuestCheckoutSections";

function CheckoutOrderItem({ item }) {
  return (
    <div className="flex h-[100px] w-full max-w-[670px] items-center gap-[10px] border-b border-solid border-[#e0e0e0] py-[10px]">
      <div className="flex h-full shrink-0 items-center justify-center">
        <div className="h-full w-[80px]">
          <img
            src={checkoutImages.product}
            alt=""
            className="size-full object-cover"
          />
        </div>
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center gap-[10px]">
        <div className="flex w-full items-start justify-between">
          <p className="w-[278px] font-['Roboto'] text-[16px] font-bold leading-[1.5] tracking-[0.15px] text-[#0d47a1]">
            {item.name}
          </p>
          <p className="shrink-0 whitespace-nowrap font-['Roboto'] text-[16px] font-bold leading-[1.5] tracking-[0.15px] text-[#353535]">
            {item.price}
          </p>
        </div>
        <div className="flex w-full items-center justify-between whitespace-nowrap font-['Roboto'] text-[12px] leading-[1.66] tracking-[0.4px] text-[#353535]">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-[5px]">
              <span>Loại:</span>
              <span>{item.type}</span>
            </div>
            <div className="flex items-center gap-[5px]">
              <span>Kích cỡ:</span>
              <span>{item.size}</span>
            </div>
          </div>
          <div className="flex items-center gap-[5px]">
            <span>x</span>
            <span>{item.qty}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentModeToggle() {
  const { paymentMode, setPaymentMode } = useCart();
  const isCod = paymentMode === "cod";

  return (
    <div className="relative h-10 w-full rounded-[12px] bg-[#e7e8ea] p-1">
      <div
        className="absolute top-1 h-8 w-[calc(50%-4px)] rounded-[12px] bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-[left] duration-component ease-premium"
        style={{ left: isCod ? "4px" : "calc(50% + 0px)" }}
      />
      <div className="relative grid h-full grid-cols-2">
        <button
          type="button"
          onClick={() => setPaymentMode("cod")}
          className={`focus-ring-brand z-10 flex items-center justify-center rounded-[12px] px-4 py-2 font-['Roboto'] text-[12px] font-bold leading-4 tracking-[0.5px] transition-colors duration-micro ${
            isCod ? "text-[#00355f]" : "text-[#727780] hover:text-[#00355f]"
          }`}
        >
          Khi nhận hàng
        </button>
        <button
          type="button"
          onClick={() => setPaymentMode("online")}
          className={`focus-ring-brand z-10 flex items-center justify-center rounded-[12px] px-4 py-2 font-['Roboto'] text-[12px] font-bold leading-4 tracking-[0.5px] transition-colors duration-micro ${
            !isCod ? "text-[#00355f]" : "text-[#727780] hover:text-[#00355f]"
          }`}
        >
          Trực tuyến
        </button>
      </div>
    </div>
  );
}

function OnlinePaymentMethods() {
  const { onlineMethod, setOnlineMethod } = useCart();

  return (
    <div className="flex w-full flex-col gap-3 border-t border-solid border-[#c2c7d1] pt-[17px]">
      <p className="font-['Roboto'] text-[15px] font-medium leading-normal text-[#585858]">
        Phương thức thanh toán trực tuyến
      </p>
      <div className="flex w-full min-w-[350px] flex-col gap-[6px]">
        {ONLINE_PAYMENT_METHODS.map((method) => {
          const selected = onlineMethod === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setOnlineMethod(method.id)}
              className={`select-card flex h-[60px] w-full items-center gap-[26px] rounded-[8px] border px-[9px] text-left ${
                selected
                  ? "select-card-active"
                  : "border border-[rgba(0,0,0,0.12)]"
              }`}
            >
              <img
                src={
                  selected
                    ? checkoutImages.radioChecked
                    : checkoutImages.radioUnchecked
                }
                alt=""
                className="size-6 shrink-0"
              />
              <div className="flex min-w-0 flex-1 items-center gap-5">
                <img
                  src={method.icon}
                  alt=""
                  className={`shrink-0 object-contain ${method.iconClass}`}
                />
                <span className="font-['Roboto'] text-[16px] leading-6 tracking-[0.1501px] text-[rgba(0,0,0,0.87)]">
                  {method.label}
                </span>
              </div>
              {selected && method.checkIcon && (
                <img
                  src={method.checkIcon}
                  alt=""
                  className="size-6 shrink-0"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CouponAndSummary({ isGuest }) {
  const { confirmOrder } = useCart();

  return (
    <>
      <div className="flex w-full flex-col gap-3 border-t border-solid border-[#c2c7d1] pt-[17px]">
        <p className="whitespace-nowrap font-['Roboto'] text-[15px] font-medium leading-normal text-[#585858]">
          Thẻ quà tặng / Mã giảm giá
        </p>
        <div className="relative h-[52px] w-full">
          <input
            type="text"
            defaultValue="DCFV"
            readOnly
            className="input-brand absolute left-0 top-0 h-[37px] w-[calc(100%-28.19%)] px-[14px] font-['Roboto'] text-[14px] uppercase leading-[2.66] tracking-[1px] text-[#4f4b4b]"
            aria-invalid="true"
            aria-describedby="coupon-error"
          />
          <button
            type="button"
            className="btn-brand-yellow-sm absolute right-0 top-0 h-[38px]"
          >
            <span className="whitespace-nowrap font-['Roboto'] text-[16px] leading-[1.5] tracking-[0.15px] text-black">
              Áp dụng
            </span>
          </button>
        </div>
        <p
          id="coupon-error"
          className="px-[14px] font-['Roboto'] text-[10px] leading-[1.66] tracking-[0.4px] text-[rgba(255,0,0,0.6)]"
          role="alert"
        >
          Mã không tồn tại
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 border-t border-solid border-[#c2c7d1] pt-[25px]">
        {[
          { label: "Tạm tính", value: GUEST_ORDER_TOTAL },
          {
            label: isGuest ? "Phí dịch vụ" : "Phí vận chuyển",
            value: "0 đ",
          },
          { label: "Giảm giá", value: "0 đ" },
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between font-['Roboto'] text-[16px] leading-6 text-[#727780]"
          >
            <span>{row.label}</span>
            <span className="text-[#191c1e]">{row.value}</span>
          </div>
        ))}
        <div className="flex items-start justify-between pt-3">
          <div className="font-['Roboto'] text-[#00355f]">
            <p className="text-[20px] font-semibold leading-7">Tổng cộng</p>
            <p className="text-[14px] leading-[1.43] tracking-[0.17px] text-[rgba(0,0,0,0.38)]">
              (Đã bao gồm thuế VAT)
            </p>
          </div>
          <span className="font-['Roboto'] text-[20px] font-bold leading-7 text-[#00355f]">
            {GUEST_ORDER_TOTAL}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={confirmOrder}
        className="btn-brand-yellow relative h-12 w-full rounded-[4px] text-[20px] font-bold shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
      >
        <span className="font-['Roboto'] text-[20px] font-bold leading-6 text-black">
          {isGuest ? "Xác nhận đặt lịch" : "Xác nhận đơn hàng"}
        </span>
      </button>

      <p className="text-center font-['Roboto'] text-[12px] leading-[15px] text-[#727780]">
        Bằng cách nhấn xác nhận, bạn đồng ý với{" "}
        <span className="text-[#00355f] underline">Điều khoản dịch vụ</span> và{" "}
        <span className="text-[#00355f] underline">Chính sách bảo mật</span> của
        chúng tôi.
      </p>
    </>
  );
}

function AuthenticatedAddressCard() {
  return (
    <section className="flex flex-col gap-4 rounded-[8px] border border-solid border-[#c2c7d1] bg-white p-[25px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={checkoutImages.locationPin}
            alt=""
            className="h-5 w-4"
            aria-hidden="true"
          />
          <h2 className="font-['Roboto'] text-[24px] font-bold leading-[1.334] text-[#00355f]">
            Địa chỉ nhận hàng
          </h2>
        </div>
        <button
          type="button"
          className="font-['Roboto'] text-[12px] leading-[1.66] tracking-[0.4px] text-[#00355f]"
        >
          Thay đổi
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-['Roboto'] text-[16px] leading-[1.5] tracking-[0.15px] text-[#191c1e]">
          Nguyễn Văn A | 090 123 4567
        </p>
        <p className="font-['Roboto'] text-[14px] leading-[1.43] tracking-[0.17px] text-[#42474f]">
          123 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh
        </p>
        <span className="inline-flex w-fit rounded-[2px] bg-[#d2e4ff] px-2 py-1 font-['Roboto'] text-[12px] leading-[1.66] tracking-[0.4px] text-[#001c37]">
          Mặc định
        </span>
      </div>
    </section>
  );
}

function OrderDetailsCard({ items }) {
  return (
    <section className="flex flex-col gap-[24.5px] rounded-[8px] border border-solid border-[#c2c7d1] bg-white p-[25px]">
      <div className="flex flex-col gap-2">
        <h2 className="font-['Roboto'] text-[24px] font-bold leading-[1.334] text-[#00355f]">
          Chi tiết đơn hàng
        </h2>
        <p className="font-['Roboto'] text-[14px] leading-[1.43] tracking-[0.17px] text-[#42474f]">
          Mã đơn hàng: {ORDER_CODE}
        </p>
      </div>

      <div className="flex flex-col gap-4 pb-2">
        <p className="font-['Roboto'] text-[12px] font-bold leading-4 tracking-[0.5px] text-[#727780]">
          SẢN PHẨM ĐÃ CHỌN
        </p>
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <CheckoutOrderItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[16.5px] pb-2">
        <p className="font-['Roboto'] text-[12px] font-bold leading-4 tracking-[0.5px] text-[#727780]">
          GHI CHÚ ĐƠN HÀNG
        </p>
        <input
          type="text"
          className="input-brand h-[46px] w-full max-w-[669px] rounded-[16px] px-[14px] font-['Roboto'] text-[14px] text-[rgba(0,0,0,0.87)]"
          aria-label="Ghi chú đơn hàng"
        />
      </div>
    </section>
  );
}

function CheckoutOverlay() {
  const { isAuthenticated } = useAuth();
  const { isCheckoutOpen, backToCart, paymentMode } = useCart();
  const isGuest = !isAuthenticated;
  const orderItems = GUEST_ORDER_ITEMS;

  if (!isCheckoutOpen) {
    return null;
  }

  return (
    <div
      className="pointer-events-auto fixed inset-0 z-[70] overflow-y-auto bg-[#f8f9fb]"
      role="dialog"
      aria-label="Thanh toán"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 py-[22px]">
        <div className="flex w-full max-w-[1392px] flex-col gap-[14px]">
          <button
            type="button"
            onClick={backToCart}
            className="btn-icon-subtle flex items-center gap-[10px] self-start rounded-lg px-10 py-2"
          >
            <img src={checkoutImages.backArrow} alt="" className="size-3" />
            <span className="font-['Roboto'] text-[20px] font-medium leading-[1.6] tracking-[0.15px] text-[#00355f]">
              Quay lại
            </span>
          </button>

          <div className="flex flex-col gap-7 px-4 lg:flex-row lg:items-start lg:justify-center lg:gap-8 lg:px-16">
            <div className="flex w-full max-w-[720px] flex-col gap-7">
              {isGuest && <GuestLoginBanner />}
              {isGuest ? <GuestShippingForm /> : <AuthenticatedAddressCard />}
              <OrderDetailsCard items={orderItems} />
            </div>

            <aside className="w-full min-w-[390px] max-w-[480px] shrink-0">
              <div className="flex flex-col gap-[13px] rounded-[8px] border border-solid border-[#c2c7d1] bg-white px-[25px] py-[24.5px]">
                <h2 className="font-['Roboto'] text-[24px] font-bold leading-[1.334] text-[#00355f]">
                  Phương thức thanh toán
                </h2>

                <div className="flex flex-col gap-[22px]">
                  <PaymentModeToggle />
                  {paymentMode === "online" && <OnlinePaymentMethods />}
                  <CouponAndSummary isGuest={isGuest} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutOverlay;
