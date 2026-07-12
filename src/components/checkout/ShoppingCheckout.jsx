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
import { formatVnd, getNumericPrice } from "../../utils/currency";

function formatMoney(value) {
  return formatVnd(value);
}

function CheckoutOrderItem({ item }) {
  return (
    <div className="flex w-full items-center gap-4 rounded-2xl bg-[#f2f4f6] p-4">
      <div className="flex h-full shrink-0 items-center justify-center">
        <div className="h-20 w-20 overflow-hidden rounded-2xl bg-white shadow">
          <img
            src={item.image || item.imageUrl || item.thumbnail || checkoutImages.product}
            alt={item.name}
            className="size-full object-cover"
          />
        </div>
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center gap-2">
        <div className="flex w-full items-start justify-between">
          <p className="line-clamp-2 min-w-0 pr-4 text-base font-bold leading-6 text-blue-900">
            {item.name}
          </p>
          <p className="shrink-0 whitespace-nowrap text-base font-black text-blue-900">
            {formatMoney(item.price * item.qty)}
          </p>
        </div>
        <div className="flex w-full items-center justify-between whitespace-nowrap text-xs font-medium text-slate-700">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <div className="flex items-center gap-1">
              <span>Loại:</span>
              <span>{item.type || "Mặc định"}</span>
            </div>
            <div className="flex items-center gap-1">
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
    <div className="grid rounded-2xl bg-[#f2f4f6] p-1.5 text-center text-sm font-bold">
      <div className="grid grid-cols-2">
        <button
          type="button"
          onClick={() => setPaymentMode("cod")}
          className={`rounded-2xl py-3 transition duration-micro ${
            isCod ? "bg-white text-blue-900 shadow-elevation" : "text-slate-500 hover:text-blue-900"
          }`}
        >
          Khi nhận hàng
        </button>
        <button
          type="button"
          onClick={() => setPaymentMode("online")}
          className={`rounded-2xl py-3 transition duration-micro ${
            !isCod ? "bg-white text-blue-900 shadow-elevation" : "text-slate-500 hover:text-blue-900"
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
    <div className="space-y-3 rounded-2xl bg-[#f2f4f6] p-4">
      <p className="text-sm font-bold text-slate-900">
        Phương thức thanh toán trực tuyến
      </p>
      <div className="space-y-3">
        {ONLINE_PAYMENT_METHODS.map((method) => {
          const selected = onlineMethod === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setOnlineMethod(method.id)}
              className={`flex w-full items-center gap-4 rounded-2xl border-2 p-3 text-left transition duration-micro ${
                selected
                  ? "border-blue-900 bg-[#d5e4f3]"
                  : "border-transparent bg-white hover:border-blue-900"
              }`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow">
                <img
                  src={method.icon}
                  alt=""
                  className="h-6 w-6 object-contain"
                />
              </span>
              <span className="flex-1 text-base font-bold leading-6 text-slate-900">
                {method.label}
              </span>
              {selected && <span className="text-base font-black text-blue-900">✓</span>}
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
              <p className="w-full px-4 pt-1 text-xs font-medium text-red-600" role="alert">
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

      <div className="my-2 flex w-full flex-col gap-3 rounded-2xl bg-[#f2f4f6] p-5 text-sm">
        {[
          { label: "Tạm tính", value: formatMoney(subtotal) },
          {
            label: isGuest ? "Phí dịch vụ" : "Phí vận chuyển",
            value: "0đ",
          },
          { label: "Giảm giá", value: "0đ" },
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between font-medium text-slate-700"
          >
            <span>{row.label}</span>
            <span className="font-bold text-slate-900">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="flex items-start justify-between rounded-2xl bg-[#d5e4f3] p-5">
          <div className="text-blue-900">
            <p className="text-xl font-black leading-7">Tổng cộng</p>
            <p className="text-xs font-medium text-slate-500">
              (Đã bao gồm thuế VAT)
            </p>
          </div>
          <span className="text-2xl font-black leading-7 text-blue-900">
            {formatMoney(subtotal)}
          </span>
      </div>

      <button
        type="button"
        onClick={confirmOrder}
        disabled={items.length === 0}
        className="relative h-12 w-full rounded bg-secondary text-sm font-bold uppercase tracking-[0.46px] shadow-elevation transition-all duration-micro hover:bg-[#ffe454] active:scale-[0.99] active:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isGuest ? "Xác nhận đặt lịch" : "Xác nhận đơn hàng"}
      </button>

      <p className="text-center text-xs leading-[15px] text-slate-500">
        Bằng cách nhấn xác nhận, bạn đồng ý với{" "}
        <a href="/terms" className="text-blue-900 underline hover:no-underline">Điều khoản dịch vụ</a> và{" "}
        <a href="/privacy" className="text-blue-900 underline hover:no-underline">Chính sách bảo mật</a> của
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
    <section className="flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-[0_4px_13px_rgba(144,202,249,0.85)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={checkoutImages.locationPin}
            alt=""
            className="h-5 w-4"
            aria-hidden="true"
          />
          <h2 className="text-xl font-black text-blue-900">
            ĐỊA CHỈ NHẬN HÀNG
          </h2>
        </div>
        <button
          type="button"
          onClick={onChange}
          className="text-sm font-bold text-blue-900 transition-colors duration-micro hover:underline"
        >
          Thay đổi
        </button>
      </div>
      <div className="flex flex-col gap-2 rounded-2xl bg-[#f2f4f6] p-5">
        <p className="text-base font-bold leading-6 text-slate-900">
          {address.name} | {address.phone}
        </p>
        <p className="text-sm font-medium leading-5 text-slate-700">
          {address.address}
        </p>
        {address.isDefault && (
          <span className="inline-flex w-fit rounded-2xl bg-[#d5e4f3] px-3 py-1 text-xs font-bold text-blue-900">
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
    <section className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-[0_4px_13px_rgba(144,202,249,0.85)]">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-black text-blue-900">
          CHI TIẾT ĐƠN HÀNG
        </h2>
        <p className="text-sm font-medium text-slate-600">
          Mã đơn hàng: {ORDER_CODE}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-xl font-black text-blue-900">
          SẢN PHẨM ĐÃ CHỌN
        </p>
        <div className="flex flex-col gap-3">
          {items.length > 0
            ? items.map((item) => <CheckoutOrderItem key={item.id} item={item} />)
            : <p className="py-6 text-sm text-slate-500">Không có sản phẩm nào được chọn.</p>}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-bold text-slate-900">
          GHI CHÚ ĐƠN HÀNG
        </p>
        <input
          type="text"
          className="h-11 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none focus:border-blue-900"
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
      className="pointer-events-auto fixed inset-0 z-[70] overflow-y-auto bg-[#e5f6fd]"
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
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center px-6 py-6">
        <div className="flex w-full flex-col gap-5">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-3 self-start rounded bg-secondary-light px-6 py-3 text-sm font-bold uppercase tracking-[0.46px] shadow-elevation transition hover:bg-secondary"
          >
            <img src={checkoutImages.backArrow} alt="" className="size-3" />
            Quay lại
          </button>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_390px]">
            <div className="flex w-full flex-col gap-7">
              {isGuest && <GuestLoginBanner />}
              {isGuest ? <GuestShippingForm /> : (
                <AuthenticatedAddressCard address={selectedAddress} onChange={() => setShowAddressModal(true)} />
              )}
              <OrderDetailsCard items={orderItems} />
            </div>

            <aside className="w-full">
              <div className="flex flex-col gap-5 rounded-2xl bg-white p-8 shadow-[0_4px_13px_rgba(144,202,249,0.85)]">
                <h2 className="text-xl font-black text-blue-900">
                  PHƯƠNG THỨC THANH TOÁN
                </h2>

                <div className="flex flex-col gap-5">
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
