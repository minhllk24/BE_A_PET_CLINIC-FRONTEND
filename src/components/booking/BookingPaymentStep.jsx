<<<<<<< HEAD
=======
import CouponInput from "../ui/CouponInput";
import { useState } from "react";
>>>>>>> origin/Fix-ShopPage-Dich-vu
import { bookingImages } from "../../assets/bookingImages";

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
  bankPopupQrPlaceholder,
  bankPopupCopyIcon,
  cardPopupVisa,
  cardPopupMastercard,
  cardPopupJcb,
  cardPopupUnionpay,
  cardPopupAmex,
  cardPopupDiscover,
  cardPopupChevron,
} = bookingImages;

const paymentMethods = [
  { id: "momo", label: "MoMo", icon: onlineMomoLogo },
  { id: "zalopay", label: "ZaloPay", icon: onlineZalopayLogo },
  { id: "vnpay", label: "VNPay", icon: onlineVnpayLogo },
  { id: "bank", label: "Chuyển khoản ngân hàng", icon: onlineBankIcon },
  { id: "atm", label: "Thẻ ATM", icon: onlineCardIcon },
  { id: "card", label: "Thẻ Tín dụng/Ghi nợ", icon: onlineCardIcon },
];

const formatAppointmentDate = (date, slot) => {
  if (!date) {
    return slot ? `Chưa chọn ngày • ${slot}` : "Chưa chọn ngày";
  }

  return `${date.getDate()} tháng ${date.getMonth() + 1}, ${date.getFullYear()}${slot ? ` • ${slot}` : ""}`;
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

function AppointmentDetails({ selectedDate, selectedSlot }) {
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
        <Detail label="THÔNG TIN THÚ CƯNG" value="0123456789" icon={paymentPetIcon} />
        <Detail label="HỌ TÊN KHÁCH HÀNG" value="Nguyen Van A" icon={paymentPersonIcon} />
        <Detail label="SỐ ĐIỆN THOẠI LIÊN HỆ" value="0123456789" icon={paymentPhoneIcon} />
      </div>
      <h2 className="mt-6 text-xs font-bold tracking-wider text-slate-500">DỊCH VỤ ĐÃ CHỌN</h2>
      <div className="mt-4 divide-y divide-slate-200">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex items-center justify-between py-4">
            <div>
              <p className="font-bold text-blue-900">Tên dịch vụ</p>
              <span className="mt-2 inline-flex items-center gap-3 rounded bg-slate-100 px-3 text-sm font-bold">
                <button type="button">-</button> 1 <button type="button">+</button>
              </span>
            </div>
            <div className="text-right">
              <p className="font-bold">giá</p>
              <p className="text-xs text-slate-700">đơn giá x số lượng</p>
            </div>
          </div>
        ))}
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

function PaymentPanel({ paymentMode, setPaymentMode, onConfirm }) {
<<<<<<< HEAD
=======
  const [couponCode, setCouponCode] = useState("");
>>>>>>> origin/Fix-ShopPage-Dich-vu
  const online = paymentMode !== "store";
  const selectedMethod = online && paymentMode !== "online" ? paymentMode : "bank";

  return (
    <Card className="rounded-lg border border-slate-300 p-6 shadow-none">
      <h2 className="mb-5 text-2xl font-bold text-[#00355f]">Phương thức thanh toán</h2>
      <div className="mb-6 grid rounded-xl bg-slate-200 p-1 text-center text-sm font-bold">
        <div className="grid grid-cols-2">
          <button
            type="button"
            onClick={() => setPaymentMode("store")}
            className={`rounded-lg py-2 ${paymentMode === "store" ? "bg-white text-blue-900" : "text-slate-500"}`}
          >
            Tại cửa hàng
          </button>
          <button
            type="button"
            onClick={() => setPaymentMode("bank")}
            className={`rounded-lg py-2 ${online ? "bg-white text-blue-900" : "text-slate-500"}`}
          >
            Trực tuyến
          </button>
        </div>
      </div>

      {online && (
        <div className="mb-5 space-y-2 border-y border-slate-300 py-4">
          <p className="mb-3 text-sm text-slate-700">Phương thức thanh toán trực tuyến</p>
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => setPaymentMode(method.id)}
              className={`flex w-full items-center gap-4 rounded-lg border p-3 text-left ${
                selectedMethod === method.id ? "border-blue-600 bg-blue-50" : "border-slate-200 bg-white"
              }`}
            >
              <img src={method.icon} alt="" className="h-6 w-6 object-contain" />
              <span className="flex-1">{method.label}</span>
              <span>{selectedMethod === method.id ? "●" : "○"}</span>
            </button>
          ))}
        </div>
      )}

      <div className="border-b border-slate-300 pb-5">
        <label className="mb-2 block text-sm text-slate-700">Thẻ quà tặng / Mã giảm giá</label>
<<<<<<< HEAD
        <div className="flex gap-3">
          <div className="flex-1">
            <input defaultValue="DCFV" className="h-10 w-full rounded border border-slate-300 px-3 outline-none focus:border-blue-900" />
            <p className="mt-1 text-xs text-red-500">Mã không tồn tại</p>
          </div>
          <button type="button" className="h-10 rounded-lg bg-secondary px-6 font-bold shadow-elevation">Áp dụng</button>
        </div>
=======
        <CouponInput
          value={couponCode}
          onChange={setCouponCode}
          onApply={() => {}}
          error=""
        />
>>>>>>> origin/Fix-ShopPage-Dich-vu
      </div>

      <div className="space-y-3 py-5 text-sm">
        <PriceRow label="Tạm tính" value="200.000 đ" />
        <PriceRow label="Phí dịch vụ" value="0 đ" />
        <PriceRow label="Giảm giá" value="0 đ" />
      </div>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xl font-bold text-[#00355f]">Tổng cộng</p>
          <p className="text-xs text-slate-500">(Đã bao gồm thuế VAT)</p>
        </div>
        <p className="text-xl font-bold text-[#00355f]">200.000 đ</p>
      </div>
<<<<<<< HEAD
      <button type="button" onClick={onConfirm} className="w-full rounded bg-secondary py-3 text-lg font-bold shadow-elevation">
=======
      <button type="button" onClick={onConfirm} className="w-full rounded bg-[#FDD835] py-3 text-lg font-bold shadow-elevation hover:bg-[#ffe454] active:bg-[#F9A825] transition-all duration-micro">
>>>>>>> origin/Fix-ShopPage-Dich-vu
        Xác nhận đặt lịch
      </button>
      <p className="mt-5 text-center text-xs text-slate-500">
        Bằng cách nhấn xác nhận, bạn đồng ý với <a className="text-blue-900 underline">Điều khoản dịch vụ</a> và <a className="text-blue-900 underline">Chính sách bảo mật</a> của chúng tôi.
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

function PaymentModal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#06105a33] p-4 backdrop-blur-md" onClick={onClose}>
      <div onClick={(event) => event.stopPropagation()}>{children}</div>
    </div>
  );
}

function InfoLine({ label, value, strong, icon }) {
  return (
    <div className="mb-3 flex items-center justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span className={`flex items-center gap-2 ${strong ? "font-bold text-[#9a4600]" : "text-slate-900"}`}>
        {value}
        {icon && <img src={icon} alt="" className="h-4 w-4" />}
      </span>
    </div>
  );
}

export function BankTransferModal({ onClose }) {
  return (
    <PaymentModal onClose={onClose}>
      <div className="w-full max-w-sm rounded border border-slate-300 bg-white p-5">
        <div className="mb-5 flex justify-center">
          <div className="rounded-md border border-slate-300 bg-white p-1">
            <img src={bankPopupQrPlaceholder} alt="QR thanh toán" className="h-32 w-32 object-contain" />
          </div>
        </div>
        <InfoLine label="Ngân hàng" value="Vietcombank" />
        <InfoLine label="Số tài khoản" value="123456789" icon={bankPopupCopyIcon} />
        <InfoLine label="Chủ tài khoản" value="AZURE AMBER" />
        <InfoLine label="Số tiền" value="250.000 đ" strong />
        <p className="mt-4 text-center text-xs text-red-600">Vui lòng ghi mã đơn BK-8712-2023 trong phần nội dung chuyển khoản.</p>
      </div>
    </PaymentModal>
  );
}

function CardBrandIcons({ compact = false }) {
  const brands = [
    { src: cardPopupVisa, alt: "Visa" },
    { src: cardPopupMastercard, alt: "Mastercard" },
    { src: cardPopupJcb, alt: "JCB" },
    { src: cardPopupUnionpay, alt: "UnionPay" },
    { src: cardPopupAmex, alt: "AMEX" },
    { src: cardPopupDiscover, alt: "Discover" },
  ];

  return (
    <div className={`flex items-center ${compact ? "gap-1" : "gap-2"}`}>
      {brands.map((brand) => (
        <img key={brand.alt} src={brand.src} alt={brand.alt} className="h-4 w-6 object-contain" />
      ))}
    </div>
  );
}

function CardInput({ label, placeholder, rightSlot }) {
  return (
    <label className="mb-3 block">
      <span className="mb-1 block text-xs font-bold text-[#4f5b76]">{label}</span>
      <span className="relative block">
        <input
          placeholder={placeholder}
          className={`h-[43px] w-full rounded-md border-2 border-[#e0e0e0] px-3 text-sm shadow-[0_2px_4px_rgba(0,0,0,0.07)] outline-none placeholder:text-[#a5acb8] focus:border-blue-900 ${
            rightSlot ? "pr-28" : ""
          }`}
        />
        {rightSlot && <span className="absolute right-4 top-1/2 -translate-y-1/2">{rightSlot}</span>}
      </span>
    </label>
  );
}

export function CreditCardModal({ onClose }) {
  return (
    <PaymentModal onClose={onClose}>
      <div className="w-full max-w-[430px]">
        <div className="mb-2 rounded-lg border border-slate-300 bg-secondary-light px-5 py-4 text-sm font-medium text-[#585858]">
          Dr. Pet’s House không trực tiếp lưu thẻ của bạn. Thông tin thẻ của bạn được bảo mật toàn diện bởi MasterCard.
        </div>
        <div className="rounded-lg border border-slate-300 bg-white px-5 py-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-medium text-[#585858]">Nhập thông tin thẻ</h3>
            <CardBrandIcons compact />
          </div>
          <CardInput label="Số thẻ" placeholder="1234 1234 1234 1234" />
          <CardInput label="Họ và tên chủ thẻ" placeholder="Nguyen Van A" rightSlot={<CardBrandIcons compact />} />
          <div className="grid grid-cols-2 gap-3">
            <CardInput label="Ngày hết hạn" placeholder="MM / YY" />
            <CardInput label="CVC" placeholder="CVC" />
          </div>
          <div className="mt-4 border-t border-slate-300 pt-3">
            <h4 className="mb-3 font-medium text-[#585858]">Địa chỉ đăng ký thẻ Tín dụng/Ghi nợ</h4>
            <div className="grid grid-cols-2 gap-3">
              <CardInput label="Quốc gia" placeholder="Việt Nam" rightSlot={<img src={cardPopupChevron} alt="" className="h-3 w-3" />} />
              <CardInput label="Mã bưu chính" placeholder="90210" />
            </div>
          </div>
        </div>
      </div>
    </PaymentModal>
  );
}

function BookingPaymentStep({ selectedDate, selectedSlot, paymentMode, setPaymentMode, onBack, onConfirm }) {
  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[minmax(390px,720px)_390px] lg:justify-center">
        <AppointmentDetails selectedDate={selectedDate} selectedSlot={selectedSlot} />
        <PaymentPanel paymentMode={paymentMode} setPaymentMode={setPaymentMode} onConfirm={onConfirm} />
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
