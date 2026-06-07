import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import {
  checkoutImages,
  ONLINE_PAYMENT_METHODS,
  ORDER_CODE,
} from "./checkoutAssets";
import {
  GuestLoginBanner,
  GuestShippingForm,
} from "./GuestCheckoutSections";
import AddressFormModal from "../address/AddressFormModal";

function getNumericPrice(value) {
  if (typeof value === "number") return value;
  return Number(String(value ?? "").replace(/[^\d.-]/g, "")) || 0;
}

function formatMoney(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(getNumericPrice(value));
}

function CheckoutOrderItem({ item }) {
  return (
    <div className="flex h-[100px] w-full max-w-[670px] items-center gap-[10px] border-b border-solid border-[#e0e0e0] py-[10px]">
      <div className="flex h-full shrink-0 items-center justify-center">
        <div className="h-full w-[80px]">
          <img
            src={item.image || item.imageUrl || item.thumbnail || checkoutImages.product}
            alt={item.name}
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
            {formatMoney(item.price * item.qty)}
          </p>
        </div>
        <div className="flex w-full items-center justify-between whitespace-nowrap font-['Roboto'] text-[12px] leading-[1.66] tracking-[0.4px] text-[#353535]">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-[5px]">
              <span>Loại:</span>
              <span>{item.type || "Mặc định"}</span>
            </div>
            <div className="flex items-center gap-[5px]">
              <span>Kích cỡ:</span>
              <span>{item.size || "Mặc định"}</span>
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
    <div className="grid rounded-xl bg-slate-200 p-1 text-center text-sm font-bold">
      <div className="grid grid-cols-2">
        <button
          type="button"
          onClick={() => setPaymentMode("cod")}
          className={`rounded-lg py-2 transition-colors duration-micro ${
            isCod ? "bg-white text-blue-900" : "text-slate-500"
          }`}
        >
          Khi nhận hàng
        </button>
        <button
          type="button"
          onClick={() => setPaymentMode("online")}
          className={`rounded-lg py-2 transition-colors duration-micro ${
            !isCod ? "bg-white text-blue-900" : "text-slate-500"
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
    <div className="space-y-2 border-y border-slate-300 py-4">
      <p className="mb-3 text-sm text-slate-700">
        Phương thức thanh toán trực tuyến
      </p>
      <div className="space-y-2">
        {ONLINE_PAYMENT_METHODS.map((method) => {
          const selected = onlineMethod === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setOnlineMethod(method.id)}
              className={`flex w-full items-center gap-4 rounded-lg border p-3 text-left transition-colors duration-micro ${
                selected
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <img
                src={method.icon}
                alt=""
                className="h-6 w-6 shrink-0 object-contain"
              />
              <span className="flex-1 text-[16px] leading-6 text-[rgba(0,0,0,0.87)]">
                {method.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CouponAndSummary({ isGuest, items }) {
  const { confirmOrder } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const subtotal = items.reduce(
    (total, item) => total + getNumericPrice(item.price) * item.qty,
    0,
  );

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError("Vui lòng nhập mã giảm giá");
      return;
    }
    setCouponError("Mã không tồn tại");
  };

  return (
    <>
      <div className="flex w-full flex-col gap-3 border-t border-solid border-[#c2c7d1] pt-[17px]">
        <p className="whitespace-nowrap font-['Roboto'] text-[15px] font-medium leading-normal text-[#585858]">
          Thẻ quà tặng / Mã giảm giá
        </p>
        <div className="flex flex-row items-start gap-[26px]">
          <div className="flex flex-col flex-1 min-w-0">
            <div className="w-full h-[37px] border border-[rgba(0,0,0,0.23)] rounded-[4px] px-[14px] flex items-center bg-[#FFFFFF]">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value.toUpperCase());
                  setCouponError("");
                }}
                placeholder="Nhập mã"
                className="w-full bg-transparent outline-none text-[14px] font-normal text-[#4F4B4B] placeholder:text-[#999]"
              />
            </div>
            {couponError && (
              <p className="w-full px-[14px] pt-[3px] font-['Roboto'] text-[10px] font-normal leading-[1.66em] tracking-[0.04em] text-[rgba(255,0,0,0.6)]" role="alert">
                {couponError}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="h-[37px] w-[104px] flex items-center justify-center bg-[#FFF176] rounded-[4px] shadow-elevation drop-shadow-[0px_3px_0.5px_rgba(0,0,0,0.2),0px_2px_1px_rgba(0,0,0,0.14),0px_1px_2.5px_rgba(0,0,0,0.12)] hover:bg-[#ffe454] active:scale-[0.98] focus-ring-brand transition-all duration-micro"
          >
            <span className="whitespace-nowrap font-['Roboto'] text-[16px] font-normal leading-[1.5] tracking-[0.15px] text-black">
              Áp dụng
            </span>
          </button>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 border-t border-solid border-[#c2c7d1] pt-[25px]">
        {[
          { label: "Tạm tính", value: formatMoney(subtotal) },
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
            {formatMoney(subtotal)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={confirmOrder}
        disabled={items.length === 0}
        className="btn-brand-yellow relative h-12 w-full rounded-[4px] text-[20px] font-bold shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] hover:bg-[#ffe454] active:scale-[0.99] active:shadow-none transition-all duration-micro focus-ring-brand disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="font-['Roboto'] text-[20px] font-bold leading-6 text-black">
          {isGuest ? "Xác nhận đặt lịch" : "Xác nhận đơn hàng"}
        </span>
      </button>

      <p className="text-center font-['Roboto'] text-[12px] leading-[15px] text-[#727780]">
        Bằng cách nhấn xác nhận, bạn đồng ý với{" "}
        <a href="/terms" className="text-[#00355f] underline hover:no-underline">Điều khoản dịch vụ</a> và{" "}
        <a href="/privacy" className="text-[#00355f] underline hover:no-underline">Chính sách bảo mật</a> của
        chúng tôi.
      </p>
    </>
  );
}

const INITIAL_ADDRESSES = [
  { id: 1, name: "Nguyễn Văn A", phone: "090 123 4567", email: "nguyenvana@example.com", country: "Việt Nam", address: "123 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh", city: "TP. Hồ Chí Minh", isDefault: true },
  { id: 2, name: "Nguyễn Văn A", phone: "090 123 4567", email: "", country: "Việt Nam", address: "456 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh", city: "TP. Hồ Chí Minh", isDefault: false },
  { id: 3, name: "Nguyễn Văn A", phone: "090 123 4567", email: "", country: "Việt Nam", address: "789 Đường Võ Văn Tần, Phường 6, Quận 3, TP. Hồ Chí Minh", city: "TP. Hồ Chí Minh", isDefault: false },
];

function AuthenticatedAddressCard({ onChange, address }) {
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
          onClick={onChange}
          className="font-['Roboto'] text-[12px] leading-[1.66] tracking-[0.4px] text-[#00355f] hover:underline focus-ring-brand transition-colors duration-micro"
        >
          Thay đổi
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-['Roboto'] text-[16px] leading-[1.5] tracking-[0.15px] text-[#191c1e]">
          {address.name} | {address.phone}
        </p>
        <p className="font-['Roboto'] text-[14px] leading-[1.43] tracking-[0.17px] text-[#42474f]">
          {address.address}
        </p>
        {address.isDefault && (
          <span className="inline-flex w-fit rounded-[2px] bg-[#d2e4ff] px-2 py-1 font-['Roboto'] text-[12px] leading-[1.66] tracking-[0.4px] text-[#001c37]">
            Mặc định
          </span>
        )}
      </div>
    </section>
  );
}

function AddressList({ addresses, onEdit, onSelect }) {
  return (
    <div className="flex flex-col gap-[16px]">
      {addresses.map((address) => (
        <div key={address.id} className="flex w-full items-start gap-[5px] rounded-[4px] bg-[rgba(25,118,210,0.04)] p-[10px]">
          <button type="button" onClick={() => onSelect(address)} className="flex min-w-0 flex-1 flex-col gap-[5px] text-left">
            <span className="text-[16px] leading-[24px] tracking-[0.15px] text-[#191C1E]">{address.name} | {address.phone}</span>
            <span className="text-[14px] leading-[20px] tracking-[0.17px] text-[#42474F]">{address.address}</span>
            {address.isDefault && <span className="w-fit rounded-[2px] bg-[#D2E4FF] px-2 py-1 text-[12px] leading-[20px] tracking-[0.4px] text-[#001C37]">Mặc định</span>}
          </button>
          <button type="button" onClick={() => onEdit(address)} className="shrink-0 px-1 text-[12px] leading-[20px] tracking-[0.4px] text-[#00355F] hover:underline">Thay đổi</button>
        </div>
      ))}
    </div>
  );
}

function AddressChangeModal({ addresses, onClose, onSave, onSelect }) {
  const [mode, setMode] = useState("list");
  const [editingAddress, setEditingAddress] = useState(null);

  const openForm = (address) => {
    setEditingAddress(address ?? null);
    setMode(address ? "edit" : "add");
  };

  if (mode !== "list") {
    return (
      <AddressFormModal
        mode={mode}
        address={editingAddress}
        onClose={() => setMode("list")}
        onSave={(address) => {
          onSave(address);
          setMode("list");
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(6,16,90,0.2)] p-6 backdrop-blur-[2px]" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="flex max-h-[calc(100vh-48px)] w-[737px] flex-col items-center gap-[10px] overflow-y-auto bg-white p-[24px]">
        <section className="flex w-full flex-col gap-[16px] rounded-[8px] bg-white p-[10px]">
          <div className="flex h-[37px] items-center gap-2">
            <img src={checkoutImages.locationPin} alt="" className="h-5 w-4 shrink-0" />
            <h3 className="flex-1 text-[20px] font-bold leading-[32px] tracking-[0.15px] text-[#00355F]">Danh sách địa chỉ</h3>
            <button type="button" onClick={onClose} aria-label="Đóng" className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-[24px] font-light leading-none text-[#727780] hover:bg-slate-100 hover:text-[#00355F]">×</button>
          </div>
          <AddressList addresses={addresses} onEdit={openForm} onSelect={onSelect} />
        </section>

        <button type="button" onClick={() => openForm(null)} className="h-[42px] rounded-[4px] bg-[#FFF176] px-[22px] text-[15px] font-medium uppercase leading-[26px] tracking-[0.46px] text-[rgba(0,0,0,0.87)] shadow-elevation hover:bg-[#FDD835]">+ Thêm mới</button>
      </div>
    </div>
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
          {items.length > 0
            ? items.map((item) => <CheckoutOrderItem key={item.id} item={item} />)
            : <p className="py-6 text-sm text-slate-500">Không có sản phẩm nào được chọn.</p>}
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

function ShoppingCheckout({ onBack }) {
  const { isAuthenticated } = useAuth();
  const { cartItems, paymentMode } = useCart();
  const isGuest = !isAuthenticated;
  const orderItems = cartItems.filter((item) => item.selected);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState(1);
  const selectedAddress = addresses.find((address) => address.id === selectedAddressId) || addresses[0];

  const saveAddress = (address) => {
    if (address.id) {
      setAddresses((current) =>
        current.map((item) => (item.id === address.id ? { ...item, ...address } : item)),
      );
      setSelectedAddressId(address.id);
      return;
    }
    const newAddress = { ...address, id: Date.now(), isDefault: false };
    setAddresses((current) => [...current, newAddress]);
    setSelectedAddressId(newAddress.id);
  };

  return (
    <div
      className="pointer-events-auto fixed inset-0 z-[70] overflow-y-auto bg-[#f8f9fb]"
      role="dialog"
      aria-label="Thanh toán"
    >
      {showAddressModal && (
        <AddressChangeModal
          addresses={addresses}
          onClose={() => setShowAddressModal(false)}
          onSave={saveAddress}
          onSelect={(address) => {
            setSelectedAddressId(address.id);
            setShowAddressModal(false);
          }}
        />
      )}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 py-[22px]">
        <div className="flex w-full max-w-[1392px] flex-col gap-[14px]">
          <button
            type="button"
            onClick={onBack}
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
              {isGuest ? <GuestShippingForm /> : (
                <AuthenticatedAddressCard address={selectedAddress} onChange={() => setShowAddressModal(true)} />
              )}
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
                  <CouponAndSummary isGuest={isGuest} items={orderItems} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
