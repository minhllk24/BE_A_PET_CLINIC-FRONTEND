import CouponInput from "../ui/CouponInput";
import { useState } from "react";
import { bookingImages } from "../../assets/bookingImages";
import { BOOKING_PAYMENT_METHODS } from "../../data/bookingData";

const {
  paymentCalendarIcon,
  paymentPersonIcon,
  paymentPetIcon,
  paymentPhoneIcon,
  onlineMomoLogo,
  onlineZalopayLogo,
  onlineVnpayLogo,
  onlineBankIcon,
  onlineCardIcon,
  onlineCreditCardIcon,
} = bookingImages;

const formatAppointmentDate = (date, slot) => {
  if (!date) {
    return slot ? `Chưa chọn ngày • ${slot}` : "Chưa chọn ngày";
  }

  return `${date.getDate()} tháng ${date.getMonth() + 1}, ${date.getFullYear()}${slot ? ` • ${slot}` : ""}`;
};

const formatMoney = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

function Card({ children, className = "" }) {
  return (
    <section
      className={`rounded-2xl bg-white shadow-[0_4px_13px_rgba(144,202,249,0.85)] ${className}`}
    >
      {children}
    </section>
  );
}

function AppointmentDetails({ selectedDate, selectedSlot, selectedPet, ownerInfo, selectedServices, quantities, onQuantityChange }) {
  return (
    <Card className="rounded-lg border border-slate-300 p-6 shadow-none">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#00355f]">Chi tiết đặt lịch</h1>
          <p className="mt-2 text-sm text-slate-700">Mã số: BK-8712-2023</p>
        </div>
        <span className="rounded bg-[#ffdbc9] px-3 py-2 text-xs text-[#321200]">Đang chờ thanh toán</span>
      </div>
      <div className="grid gap-5 border-b border-slate-300 pb-5 md:grid-cols-2">
        <Detail label="LỊCH HẸN CỦA BẠN" value={formatAppointmentDate(selectedDate, selectedSlot)} icon={paymentCalendarIcon} />
        <Detail label="THÔNG TIN THÚ CƯNG" value={selectedPet?.name || "Thú cưng khác"} icon={paymentPetIcon} />
        <Detail label="HỌ TÊN KHÁCH HÀNG" value={ownerInfo?.name || "Chưa cung cấp"} icon={paymentPersonIcon} />
        <Detail label="SỐ ĐIỆN THOẠI LIÊN HỆ" value={ownerInfo?.phone || "Chưa cung cấp"} icon={paymentPhoneIcon} />
      </div>
      <h2 className="mt-6 text-xs font-bold tracking-wider text-slate-500">DỊCH VỤ ĐÃ CHỌN</h2>
      <div className="mt-4 divide-y divide-slate-200">
        {selectedServices.map((service) => (
          <div key={service.id} className="flex items-center justify-between py-4">
            <div>
              <p className="font-bold text-blue-900">{service.name}</p>
              <p className="mt-1 text-xs text-slate-600">{service.desc}</p>
              <span className="mt-2 inline-flex items-center gap-3 rounded bg-slate-100 px-3 text-sm font-bold">
                <button type="button" onClick={() => onQuantityChange(service.id, -1)}>-</button>
                {quantities[service.id] || 1}
                <button type="button" onClick={() => onQuantityChange(service.id, 1)}>+</button>
              </span>
            </div>
            <div className="text-right">
              <p className="font-bold">{formatMoney(service.price * (quantities[service.id] || 1))}</p>
              <p className="text-xs text-slate-700">{formatMoney(service.price)} x {quantities[service.id] || 1}</p>
            </div>
          </div>
        ))}
        {selectedServices.length === 0 && <p className="py-4 text-sm text-slate-500">Chưa chọn dịch vụ.</p>}
      </div>
      <div className="mt-5 rounded bg-slate-100 p-5 text-sm text-slate-700">
        ⓘ Vui lòng kiểm tra lại thông tin lịch hẹn. Bạn có thể thay đổi lịch hẹn trước tối thiểu 24 giờ. Liên hệ bộ phận hỗ trợ nếu cần thêm thông tin.
      </div>
    </Card>
  );
}

function Detail({ label, value, icon }) {
  return (
    <div>
      <p className="text-xs font-bold tracking-wider text-slate-500">{label}</p>
      <p className="mt-2 flex items-center gap-3 text-base text-slate-900">
        <img src={icon} alt="" className="h-5 w-5" />
        {value}
      </p>
    </div>
  );
}

function PaymentPanel({ paymentMode, setPaymentMode, onConfirm, subtotal }) {
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  const online = paymentMode !== "store";
  const selectedMethod = online && paymentMode !== "online" ? paymentMode : "bank";

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError("Vui lòng nhập mã giảm giá");
      return;
    }

    setCouponError("Mã không tồn tại");
  };

  return (
    <Card className="rounded-lg border border-slate-300 p-6 shadow-none">
      <h2 className="mb-5 text-2xl font-bold text-[#00355f]">
        Phương thức thanh toán
      </h2>

      <div className="mb-6 grid rounded-xl bg-slate-200 p-1 text-center text-sm font-bold">
        <div className="grid grid-cols-2">
          <button
            type="button"
            onClick={() => setPaymentMode("store")}
            className={`rounded-lg py-2 ${
              paymentMode === "store" ? "bg-white text-blue-900" : "text-slate-500"
            }`}
          >
            Tại phòng khám
          </button>

          <button
            type="button"
            onClick={() => setPaymentMode("bank")}
            className={`rounded-lg py-2 ${
              online ? "bg-white text-blue-900" : "text-slate-500"
            }`}
          >
            Trực tuyến
          </button>
        </div>
      </div>

      {online && (
        <div className="mb-5 space-y-2 border-y border-slate-300 py-4">
          <p className="mb-3 text-sm text-slate-700">
            Phương thức thanh toán trực tuyến
          </p>

          {BOOKING_PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => setPaymentMode(method.id)}
              className={`flex w-full items-center gap-4 rounded-lg border p-3 text-left ${
                selectedMethod === method.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <img src={method.icon} alt="" className="h-6 w-6 object-contain" />
              <span className="flex-1">{method.label}</span>
            </button>
          ))}
        </div>
      )}

      <div className="flex w-full flex-col gap-3 border-t border-solid border-[#c2c7d1] pt-[17px]">
        <p className="whitespace-nowrap font-['Roboto'] text-[15px] font-medium leading-normal text-[#585858]">
          Thẻ quà tặng / Mã giảm giá
        </p>

        <div className="flex flex-row items-start gap-[26px]">
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex h-[37px] w-full items-center rounded-[4px] border border-[rgba(0,0,0,0.23)] bg-white px-[14px]">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value.toUpperCase());
                  setCouponError("");
                }}
                placeholder="Nhập mã"
                className="w-full bg-transparent text-[14px] font-normal text-[#4F4B4B] outline-none placeholder:text-[#999]"
              />
            </div>

            {couponError && (
              <p
                className="w-full px-[14px] pt-[3px] font-['Roboto'] text-[10px] font-normal leading-[1.66em] tracking-[0.04em] text-[rgba(255,0,0,0.6)]"
                role="alert"
              >
                {couponError}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleApplyCoupon}
            className="flex h-[37px] w-[104px] items-center justify-center rounded-[4px] bg-[#FFF176] shadow-elevation drop-shadow-[0px_3px_0.5px_rgba(0,0,0,0.2),0px_2px_1px_rgba(0,0,0,0.14),0px_1px_2.5px_rgba(0,0,0,0.12)] transition-all duration-micro hover:bg-[#ffe454] active:scale-[0.98]"
          >
            <span className="whitespace-nowrap font-['Roboto'] text-[16px] font-normal leading-[1.5] tracking-[0.15px] text-black">
              Áp dụng
            </span>
          </button>
        </div>
      </div>

      <div className="space-y-3 py-5 text-sm">
        <PriceRow label="Tạm tính" value={formatMoney(subtotal)} />
        <PriceRow label="Phí dịch vụ" value="0 đ" />
        <PriceRow label="Giảm giá" value="0 đ" />
      </div>

      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xl font-bold text-[#00355f]">Tổng cộng</p>
          <p className="text-xs text-slate-500">(Đã bao gồm thuế VAT)</p>
        </div>

        <p className="text-xl font-bold text-[#00355f]">
          {formatMoney(subtotal)}
        </p>
      </div>

      <button
        type="button"
        onClick={onConfirm}
        className="w-full rounded bg-[#FDD835] py-3 text-lg font-bold shadow-elevation transition-all duration-micro hover:bg-[#ffe454] active:bg-[#F9A825]"
      >
        Xác nhận đặt lịch
      </button>

      <p className="mt-5 text-center text-xs text-slate-500">
        Bằng cách nhấn xác nhận, bạn đồng ý với{" "}
        <a className="text-blue-900 underline">Điều khoản dịch vụ</a> và{" "}
        <a className="text-blue-900 underline">Chính sách bảo mật</a> của chúng tôi.
      </p>
    </Card>
  );
}

function PriceRow({ label, value }) {
  return (
    <div className="flex justify-between text-slate-700">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function BookingPaymentStep({
  selectedDate,
  selectedSlot,
  selectedPet,
  ownerInfo,
  selectedServices = [],
  paymentMode,
  setPaymentMode,
  onBack,
  onConfirm,
}) {
  const [quantities, setQuantities] = useState(() =>
    Object.fromEntries(selectedServices.map((service) => [service.id, 1])),
  );
  const subtotal = selectedServices.reduce(
    (total, service) => total + service.price * (quantities[service.id] || 1),
    0,
  );
  const handleQuantityChange = (serviceId, delta) => {
    setQuantities((current) => ({
      ...current,
      [serviceId]: Math.max(1, (current[serviceId] || 1) + delta),
    }));
  };

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[minmax(390px,720px)_390px] lg:justify-center">
        <AppointmentDetails
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          selectedPet={selectedPet}
          ownerInfo={ownerInfo}
          selectedServices={selectedServices}
          quantities={quantities}
          onQuantityChange={handleQuantityChange}
        />
        <PaymentPanel paymentMode={paymentMode} setPaymentMode={setPaymentMode} onConfirm={onConfirm} subtotal={subtotal} />
      </div>
      <div className="mt-6">
        <button
          type="button"
          onClick={onBack}
          className="rounded bg-secondary-light px-6 py-3 text-sm font-bold uppercase tracking-[0.46px] shadow-elevation"
        >
          ‹ Quay lại
        </button>
      </div>
    </>
  );
}

export default BookingPaymentStep;
