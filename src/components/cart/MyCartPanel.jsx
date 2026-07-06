import { useState } from "react";
import { cartImages } from "../../assets/cartImages";
import { useCart } from "../../context/CartContext";
import { formatVnd, getNumericPrice } from "../../utils/currency";

function formatPrice(value) {
  return formatVnd(value);
}

function CartItemRow({ item }) {
  const { toggleCartItem, removeCartItem, updateCartQty } = useCart();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => removeCartItem(item.id), 250);
  };

  return (
    <div
      className={`relative flex h-[100px] w-[503px] shrink-0 items-center gap-[10px] border-b border-solid border-[#e0e0e0] py-[10px] transition-all duration-200 ${
        deleting ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
      }`}
    >
      {/* Checkbox */}
      <button
        type="button"
        onClick={() => toggleCartItem(item.id)}
        className="flex h-[40px] w-6 shrink-0 cursor-pointer items-center justify-center transition-transform duration-micro hover:scale-110 focus-ring-brand"
        aria-label={item.selected ? "Bỏ chọn sản phẩm" : "Chọn sản phẩm"}
        aria-pressed={item.selected}
      >
        {item.selected ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="3" fill="#0D47A1"/>
            <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="#0D47A1" strokeWidth="1.5" fill="white"/>
          </svg>
        )}
      </button>

      {/* Product image */}
      <div className="flex h-full shrink-0 items-center justify-center">
        <div className="h-full w-[80px]">
          <img
            src={item.image || item.imageUrl || item.thumbnail || cartImages.productThumb}
            alt={item.name}
            className="size-full object-cover"
          />
        </div>
      </div>

      {/* Product info */}
      <div className="flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-[10px]">
        <div className="flex w-full items-start justify-between">
          <p className="w-[278px] break-words font-['Roboto'] text-[14px] font-bold leading-[1.43] tracking-[0.17px] text-[#0d47a1]">
            {item.name}
          </p>
          <button
            type="button"
            onClick={handleDelete}
            className="group relative h-5 w-[17px] shrink-0 transition-all duration-micro hover:scale-110 focus-ring-brand"
            aria-label="Xóa sản phẩm"
          >
            <img
              src={cartImages.iconBin}
              alt=""
              className="size-full transition-colors duration-micro group-hover:brightness-0 group-hover:invert-[0.2] group-hover:sepia-[0.3] group-hover:saturate-[5] group-hover:hue-rotate-[-30deg]"
            />
          </button>
        </div>

        <div className="flex w-full items-center justify-between text-[#353535]">
          <p className="shrink-0 whitespace-nowrap font-['Roboto'] text-[14px] font-bold leading-[1.43] tracking-[0.17px]">
            {formatPrice(item.price)}
          </p>
          {/* Quantity stepper */}
          <div className="flex h-[27px] w-[78px] shrink-0 items-center justify-between rounded border border-solid border-[#353535] px-[16px] py-[5px] font-['Josefin_Sans'] text-[20px] font-medium leading-normal">
            <button
              type="button"
              onClick={() => updateCartQty(item.id, -1)}
              className="flex h-6 w-6 shrink-0 items-center justify-center text-[20px] leading-5 text-[#353535] transition-colors duration-micro hover:text-[#0d47a1] active:scale-90 focus-ring-brand"
              aria-label="Giảm số lượng"
            >
              −
            </button>
            <span className="shrink-0 text-[20px] leading-5 text-[#353535]">{item.qty}</span>
            <button
              type="button"
              onClick={() => updateCartQty(item.id, 1)}
              className="flex h-6 w-6 shrink-0 items-center justify-center text-[20px] leading-5 text-[#353535] transition-colors duration-micro hover:text-[#0d47a1] active:scale-90 focus-ring-brand"
              aria-label="Tăng số lượng"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex w-full items-center gap-10 whitespace-nowrap font-['Roboto'] text-[12px] leading-[1.66] tracking-[0.4px] text-[#353535]">
          <div className="flex items-center gap-[10px]">
            <span>Loại:</span>
            <span>{item.type || "Mặc định"}</span>
          </div>
          <div className="flex items-center gap-[10px]">
            <span>Size:</span>
            <span>{item.size || "Mặc định"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyCartPanel({ onClose }) {
  const { openCheckout, cartItems } = useCart();
  const itemCount = cartItems.length;
  const selectedCount = cartItems.filter((i) => i.selected).length;
  const hasItems = itemCount > 0;
  const subtotal = cartItems
    .filter((item) => item.selected)
    .reduce((total, item) => total + getNumericPrice(item.price) * item.qty, 0);

  return (
    <aside
      className="panel-slide-in absolute right-[94px] top-0 flex h-[638px] max-h-[calc(100vh-104px)] w-[551px] flex-col items-center gap-[10px] overflow-hidden rounded bg-[#fffde7] px-5 py-[10px] shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
      data-name="my cart"
      role="dialog"
      aria-label="Giỏ hàng"
    >
      {/* Header */}
      <div className="flex w-[503px] shrink-0 items-center justify-between">
        <p className="whitespace-nowrap tracking-[0.15px] text-[#353535]">
          <span className="font-['Roboto'] text-[16px] font-bold leading-[1.5]">
            Giỏ hàng{" "}
          </span>
          <span className="font-['Roboto'] text-[16px] font-bold leading-[1.5] text-[#f45757]">
            ({itemCount})
          </span>
        </p>
        <button
          type="button"
          onClick={onClose}
          className="btn-icon-subtle relative size-[30px] shrink-0 p-1 transition-transform duration-micro hover:scale-110 active:scale-95"
          aria-label="Đóng giỏ hàng"
        >
          <img src={cartImages.iconClose} alt="" className="size-full" />
        </button>
      </div>

      {/* Item list */}
      <div className="flex min-h-0 w-full flex-1 flex-col items-start overflow-x-clip overflow-y-auto">
        {hasItems ? (
          cartItems.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-3 py-16">
            {/* Empty cart SVG */}
            <svg className="text-[#ccc]" width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18C5.9 18 5 18.9 5 20C5 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1Z" fill="currentColor"/>
            </svg>
            <p className="font-['Roboto'] text-[16px] font-medium leading-[1.5] text-[#999]">
              Giỏ hàng trống
            </p>
            <p className="font-['Roboto'] text-[13px] leading-[1.5] text-[#bbb] text-center">
              Thêm sản phẩm để bắt đầu mua sắm
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex h-[60px] w-full shrink-0 items-center justify-center gap-6 rounded bg-[#f5f5f5] p-6">
        <div className="flex h-5 min-w-0 flex-1 items-center gap-5 font-['Roboto'] text-[16px] font-bold leading-[1.5] tracking-[0.15px]">
          <p className="shrink-0 whitespace-nowrap text-[rgba(0,0,0,0.87)]">
            Tạm tính:{" "}
          </p>
          <p className="min-w-0 flex-1 text-[#f45757]">{formatPrice(subtotal)}</p>
        </div>
        <button
          type="button"
          onClick={openCheckout}
          disabled={selectedCount === 0}
          className={`btn-brand-cart shrink-0 transition-all duration-micro ${
            selectedCount > 0
              ? "opacity-100 hover:bg-[#ffe454] active:scale-[0.98]"
              : "opacity-50 cursor-not-allowed"
          }`}
        >
          <span className="whitespace-nowrap font-['Roboto'] text-[13px] font-medium uppercase leading-[22px] tracking-[0.46px] text-black">
            Đặt hàng
          </span>
        </button>
      </div>
    </aside>
  );
}

export default MyCartPanel;
