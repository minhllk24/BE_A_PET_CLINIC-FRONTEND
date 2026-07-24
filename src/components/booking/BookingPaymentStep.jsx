import { useEffect, useMemo, useState } from "react";
import { bookingImages } from "../../assets/bookingImages";
import { BOOKING_PAYMENT_METHODS } from "../../data/bookingData";
import { previewAppointmentPricing } from "../../services/bookingService";
import { formatVnd } from "../../utils/currency";

const {
  paymentCalendarIcon,
  paymentPersonIcon,
  paymentPetIcon,
  paymentPhoneIcon,
} = bookingImages;

const formatAppointmentDate = (date, slot) => {
  if (!date) {
    return slot ? `Chưa chọn ngày • ${slot}` : "Chưa chọn ngày";
  }

  return `${date.getDate()} tháng ${date.getMonth() + 1}, ${date.getFullYear()}${slot ? ` • ${slot}` : ""}`;
};

const formatMoney = (value) => formatVnd(value);

const getWeightValue = (weight) => {
  const normalizedWeight = String(weight ?? "").replace(",", ".");
  const value = Number.parseFloat(normalizedWeight);

  return Number.isFinite(value) ? value : 0;
};

const getPetWeight = (...pets) => {
  for (const pet of pets) {
    const weight = pet?.weight ?? pet?.weightKg ?? pet?.weight_kg ?? pet?.raw?.weight_kg;
    if (weight !== undefined && weight !== null && String(weight).trim() !== "") {
      return weight;
    }
  }

  return "";
};

const getWeightSurcharge = (service, petWeight) => {
  if (!service.isWeightSurchargeApplied) return 0;
  
  const weight = Number(petWeight) || 0;
  if (weight <= 5) return 0;
  
  const extraWeight = weight - 5;
  return Math.ceil(extraWeight) * 10000;
};

function Card({ children, className = "" }) {
  return (
    <section
      className={`rounded-2xl bg-white shadow-[0_4px_13px_rgba(144,202,249,0.85)] ${className}`}
    >
      {children}
    </section>
  );
}

function AppointmentDetails({
  selectedDate,
  selectedSlot,
  selectedPet,
  selectedPets = [],
  petInfo,
  petInfos = [],
  ownerInfo,
  selectedServices,
  quantities,
  pricingByServiceId,
  onQuantityChange,
}) {
  const petList = petInfos.length > 0 ? petInfos : selectedPets;
  const petNames = petList
    .map((pet) => pet?.name)
    .filter(Boolean);
  const petName =
    petNames.length > 1
      ? `${petNames[0]} +${petNames.length - 1} bé khác`
      : petNames[0] || petInfo?.name || selectedPet?.name || "Thú cưng khác";
  const petWeight = getPetWeight(petInfo, selectedPet, selectedPets[0], petInfos[0]);
  const petWeightValue = getWeightValue(petWeight);

  return (
    <Card className="p-5 md:p-8">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-blue-900 md:text-2xl lg:text-xl">CHI TIẾT ĐẶT LỊCH</h1>
          <p className="mt-2 text-sm font-medium text-slate-600">Mã số: BK-8712-2023</p>
        </div>
        <span className="rounded-2xl bg-[#FFF9C4] px-3 py-2 text-center text-xs font-bold text-slate-900 shadow-elevation md:px-4">
          Đang chờ thanh toán
        </span>
      </div>
      <div className="grid gap-3 border-b border-slate-200 pb-6 md:grid-cols-2 md:gap-4">
        <Detail label="LỊCH HẸN CỦA BẠN" value={formatAppointmentDate(selectedDate, selectedSlot)} icon={paymentCalendarIcon} />
        <Detail
          label="THÔNG TIN THÚ CƯNG"
          value={petName}
          subValue={petWeight ? `Cân nặng: ${petWeight}` : ""}
          icon={paymentPetIcon}
        />
        <Detail label="HỌ TÊN KHÁCH HÀNG" value={ownerInfo?.name || "Chưa cung cấp"} icon={paymentPersonIcon} />
        <Detail label="SỐ ĐIỆN THOẠI LIÊN HỆ" value={ownerInfo?.phone || "Chưa cung cấp"} icon={paymentPhoneIcon} />
      </div>
      <h2 className="mt-6 text-xl font-black text-blue-900">DỊCH VỤ ĐÃ CHỌN</h2>
      <div className="mt-5 space-y-3 md:space-y-4">
        {selectedServices.map((service) => {
          const quantity = quantities[service.id] || 1;
          const pricingLine = pricingByServiceId?.[String(service.serviceId || service.id)];
          const weightSurcharge = pricingLine
            ? Number(pricingLine.surcharge || 0) * quantity
            : getWeightSurcharge(service, petWeightValue) * quantity;
          const serviceTotal = pricingLine
            ? Number(pricingLine.total || 0)
            : service.price * quantity + weightSurcharge;

          return (
            <div key={service.id} className="flex items-start justify-between gap-3 rounded-2xl bg-[#f2f4f6] p-4 md:items-center md:p-5">
              <div className="min-w-0">
                <p className="font-bold text-blue-900">{service.name}</p>
                <p className="mt-1 text-sm text-slate-700">{service.desc}</p>
                <span className="mt-3 inline-flex h-9 items-center overflow-hidden rounded-full border border-blue-900 bg-white text-sm font-bold text-blue-900">
                  <button type="button" onClick={() => onQuantityChange(service.id, -1)} className="h-full px-3 hover:bg-blue-50">-</button>
                  <span className="min-w-8 px-2 text-center">{quantity}</span>
                  <button type="button" onClick={() => onQuantityChange(service.id, 1)} className="h-full px-3 hover:bg-blue-50">+</button>
                </span>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-base font-black text-blue-900 md:text-lg">{formatMoney(serviceTotal)}</p>
                <p className="text-xs text-slate-700">{formatMoney(service.price)} x {quantity}</p>
                {weightSurcharge > 0 && (
                  <p className="mt-1 text-xs text-slate-500">
                    Phụ thu cân nặng: +{formatMoney(weightSurcharge)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
        {selectedServices.length === 0 && <p className="py-4 text-sm text-slate-500">Chưa chọn dịch vụ.</p>}
      </div>
      <div className="mt-5 rounded-2xl bg-[#d5e4f3] p-5 text-sm font-medium text-slate-700">
        ⓘ Vui lòng kiểm tra lại thông tin lịch hẹn. Bạn có thể thay đổi lịch hẹn trước tối thiểu 24 giờ. Liên hệ bộ phận hỗ trợ nếu cần thêm thông tin.
      </div>
    </Card>
  );
}

function Detail({ label, value, subValue, icon }) {
  return (
    <div className="rounded-2xl bg-[#f2f4f6] p-4">
      <p className="text-xs font-bold tracking-wider text-slate-500">{label}</p>
      <p className="mt-2 flex items-center gap-3 text-sm font-bold text-slate-900 md:text-base">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow">
          <img src={icon} alt="" className="h-5 w-5" />
        </span>
        <span>{value}</span>
      </p>
      {subValue && <p className="ml-12 mt-1 text-xs font-medium text-slate-500">{subValue}</p>}
    </div>
  );
}

function PaymentPanel({
  paymentMode,
  setPaymentMode,
  onConfirm,
  subtotal,
  surchargeTotal,
  discountTotal,
  total,
  pricingLoading,
  pricingError,
}) {
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const online = paymentMode !== "store";
  const selectedMethod = online && paymentMode !== "online" ? paymentMode : "";

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError("Vui lòng nhập mã giảm giá");
      return;
    }

    setCouponError("Mã không tồn tại");
  };

  const selectPaymentMode = (mode) => {
    setPaymentMode(mode);
    setPaymentError("");
  };

  const handleConfirm = () => {
    if (online && !selectedMethod) {
      setPaymentError("Vui lòng chọn phương thức thanh toán trực tuyến");
      return;
    }

    onConfirm();
  };

  return (
    <Card className="p-5 md:p-8">
      <h2 className="mb-5 text-xl font-black text-blue-900">
        PHƯƠNG THỨC THANH TOÁN
      </h2>

      <div className="mb-6 grid rounded-2xl bg-[#f2f4f6] p-1.5 text-center text-sm font-bold">
        <div className="grid grid-cols-2">
          <button
            type="button"
            onClick={() => selectPaymentMode("store")}
            className={`rounded-2xl px-2 py-3 transition ${
              paymentMode === "store" ? "bg-white text-blue-900 shadow-elevation" : "text-slate-500 hover:text-blue-900"
            }`}
          >
            Tại phòng khám
          </button>

          <button
            type="button"
            onClick={() => selectPaymentMode("online")}
            className={`rounded-2xl px-2 py-3 transition ${
              online ? "bg-white text-blue-900 shadow-elevation" : "text-slate-500 hover:text-blue-900"
            }`}
          >
            Trực tuyến
          </button>
        </div>
      </div>

      {online && (
        <div
          className={`mb-5 space-y-3 rounded-2xl bg-[#f2f4f6] p-4 ${
            paymentError ? "ring-2 ring-red-500 ring-offset-2" : ""
          }`}
          data-booking-error={paymentError ? "true" : undefined}
          tabIndex={paymentError ? -1 : undefined}
        >
          <p className="text-sm font-bold text-slate-900">
            Phương thức thanh toán trực tuyến <span className="text-red-500">*</span>
          </p>

          {BOOKING_PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => selectPaymentMode(method.id)}
              className={`flex w-full items-center gap-4 rounded-2xl border-2 p-3 text-left transition ${
                selectedMethod === method.id
                  ? "border-blue-900 bg-[#d5e4f3]"
                  : "border-transparent bg-white hover:border-blue-900"
              }`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow">
                <img src={method.icon} alt="" className="h-6 w-6 object-contain" />
              </span>
              <span className="flex-1 font-bold text-slate-900">{method.label}</span>
              {selectedMethod === method.id && <span className="text-base font-black text-blue-900">✓</span>}
            </button>
          ))}
          {paymentError && <p className="pt-1 text-sm font-medium text-red-600">{paymentError}</p>}
        </div>
      )}

      <div className="flex w-full flex-col gap-3 border-t border-solid border-slate-200 pt-5">
        <p className="whitespace-nowrap text-sm font-bold text-slate-900">
          Thẻ quà tặng / Mã giảm giá
        </p>

        <div className="flex flex-row items-start gap-3">
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex h-10 w-full items-center rounded-2xl border border-slate-300 bg-white px-4 focus-within:border-blue-900">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value.toUpperCase());
                  setCouponError("");
                }}
                placeholder="Nhập mã"
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>

            {couponError && (
              <p
                className="w-full px-4 pt-1 text-xs font-medium text-red-600"
                role="alert"
              >
                {couponError}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleApplyCoupon}
            className="flex h-10 w-[104px] items-center justify-center rounded bg-secondary text-sm font-bold uppercase tracking-[0.46px] shadow-elevation transition-all duration-micro hover:bg-[#ffe454] active:scale-[0.98]"
          >
            Áp dụng
          </button>
        </div>
      </div>

      <div className="my-5 space-y-3 rounded-2xl bg-[#f2f4f6] p-5 text-sm">
        <PriceRow label="Tạm tính" value={formatMoney(subtotal)} />
        <PriceRow label="Phụ thu" value={formatMoney(surchargeTotal)} />
        <PriceRow label="Giảm giá" value={formatMoney(discountTotal)} />
        {pricingLoading && (
          <p className="text-xs font-medium text-blue-900">Đang cập nhật phụ thu cân nặng...</p>
        )}
        {pricingError && (
          <p className="text-xs font-medium text-amber-700">{pricingError}</p>
        )}
      </div>

      <div className="mb-5 flex items-end justify-between gap-3 rounded-2xl bg-[#d5e4f3] p-5">
        <div>
          <p className="text-xl font-black text-blue-900">Tổng cộng</p>
          <p className="text-xs text-slate-500">(Đã bao gồm thuế VAT)</p>
        </div>

        <p className="text-xl font-black text-blue-900 md:text-2xl">
          {formatMoney(total)}
        </p>
      </div>

      <button
        type="button"
        onClick={handleConfirm}
        className="w-full rounded bg-secondary py-3 text-sm font-bold uppercase tracking-[0.46px] shadow-elevation transition-all duration-micro hover:bg-[#ffe454] active:bg-[#F9A825]"
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
    <div className="flex justify-between font-medium text-slate-700">
      <span>{label}</span>
      <span className="font-bold text-slate-900">{value}</span>
    </div>
  );
}

function BookingPaymentStep({
  selectedDate,
  selectedSlot,
  selectedPet,
  selectedPets = [],
  petInfo,
  petInfos = [],
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
  const [pricingPreview, setPricingPreview] = useState(null);
  const [pricingLoading, setPricingLoading] = useState(false);
  const [pricingError, setPricingError] = useState("");

  useEffect(() => {
    setQuantities((current) => {
      const next = { ...current };
      selectedServices.forEach((service) => {
        if (!next[service.id]) next[service.id] = 1;
      });

      Object.keys(next).forEach((serviceId) => {
        if (!selectedServices.some((service) => service.id === serviceId)) {
          delete next[serviceId];
        }
      });

      return next;
    });
  }, [selectedServices]);

  const petWeightValue = getWeightValue(getPetWeight(petInfo, selectedPet, selectedPets[0], petInfos[0]));
  const fallbackSubtotal = selectedServices.reduce((total, service) => {
    const quantity = quantities[service.id] || 1;

    return total + service.price * quantity;
  }, 0);
  const fallbackSurchargeTotal = selectedServices.reduce((total, service) => {
    const quantity = quantities[service.id] || 1;

    return total + getWeightSurcharge(service, petWeightValue) * quantity;
  }, 0);
  const subtotal = Number(pricingPreview?.subtotal ?? fallbackSubtotal);
  const surchargeTotal = Number(pricingPreview?.surcharge_amount ?? fallbackSurchargeTotal);
  const discountTotal = Number(pricingPreview?.discount_amount ?? 0);
  const total = Number(pricingPreview?.total ?? (fallbackSubtotal + fallbackSurchargeTotal));
  const pricingByServiceId = useMemo(() => {
    if (!Array.isArray(pricingPreview?.services)) return {};
    return pricingPreview.services.reduce((result, item) => ({
      ...result,
      [String(item.service_id)]: item,
    }), {});
  }, [pricingPreview]);

  useEffect(() => {
    if (!selectedServices.length) {
      setPricingPreview(null);
      setPricingError("");
      return undefined;
    }

    let active = true;
    setPricingLoading(true);
    setPricingError("");

    previewAppointmentPricing({
      pet_id: selectedPet?.pet_id || selectedPet?.id || undefined,
      pet_data: {
        weight_kg: petWeightValue || undefined,
      },
      service_ids: selectedServices.map((service) => ({
        service_id: service.serviceId || service.id,
        quantity: quantities[service.id] || 1,
      })),
    })
      .then((data) => {
        if (!active) return;
        setPricingPreview(data);
        setPricingError(data?.voucher_error || "");
      })
      .catch((error) => {
        if (!active) return;
        setPricingPreview(null);
        setPricingError(error?.message || "Không thể lấy phụ thu từ server, đang dùng giá tạm tính.");
      })
      .finally(() => {
        if (active) setPricingLoading(false);
      });

    return () => {
      active = false;
    };
  }, [petWeightValue, quantities, selectedServices]);

  const handleQuantityChange = (serviceId, delta) => {
    setQuantities((current) => ({
      ...current,
      [serviceId]: Math.max(1, (current[serviceId] || 1) + delta),
    }));
  };
  const handleConfirm = () => {
    onConfirm?.({ quantities });
  };

  return (
    <>
      <div className="grid gap-5 md:gap-8 lg:grid-cols-[minmax(0,2fr)_390px]">
        <AppointmentDetails
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          selectedPet={selectedPet}
          selectedPets={selectedPets}
          petInfo={petInfo}
          petInfos={petInfos}
          ownerInfo={ownerInfo}
          selectedServices={selectedServices}
          quantities={quantities}
          pricingByServiceId={pricingByServiceId}
          onQuantityChange={handleQuantityChange}
        />
        <PaymentPanel
          paymentMode={paymentMode}
          setPaymentMode={setPaymentMode}
          onConfirm={handleConfirm}
          subtotal={subtotal}
          surchargeTotal={surchargeTotal}
          discountTotal={discountTotal}
          total={total}
          pricingLoading={pricingLoading}
          pricingError={pricingError}
        />
      </div>
      <div className="mt-5 md:mt-6">
        <button
          type="button"
          onClick={onBack}
          className="rounded bg-secondary-light px-5 py-2 text-sm font-bold uppercase tracking-[0.46px] shadow-elevation md:px-6 md:py-3"
        >
          ‹ Quay lại
        </button>
      </div>
    </>
  );
}

export default BookingPaymentStep;
