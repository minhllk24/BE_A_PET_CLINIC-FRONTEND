import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cartImages } from "../../assets/cartImages";
import { useDecisionModal } from "../shared/DecisionModal";
import { useCart } from "../../context/CartContext";
import { getProductDetails } from "../../services/productService";
import { formatVnd, getNumericPrice } from "../../utils/currency";

function formatPrice(value) {
  return formatVnd(value);
}

function normalizeVariantOption(variant) {
  return {
    ...variant,
    id: variant.id ?? variant.variant_id,
    name: variant.name ?? variant.variant_name ?? "Mặc định",
    price: variant.price ?? 0,
    sizes: Array.isArray(variant.sizes) ? variant.sizes : [],
  };
}

function CartItemRow({ item }) {
  const { toggleCartItem, removeCartItem, updateCartQty, updateCartOptions } = useCart();
  const { confirmDelete, showSuccessModal } = useDecisionModal();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [loadedVariants, setLoadedVariants] = useState([]);
  const variantOptions = (Array.isArray(item.variants) && item.variants.length ? item.variants : loadedVariants).map(normalizeVariantOption);
  const selectedVariant =
    variantOptions.find((variant) => String(variant.id) === String(item.variantId)) ||
    variantOptions.find((variant) => variant.name === item.type) ||
    variantOptions[0];
  const sizeOptions = selectedVariant?.sizes?.length ? selectedVariant.sizes : item.size ? [item.size] : [];

  const handleDelete = () => {
    confirmDelete({
      message: `Bạn chắc chắn muốn xóa "${item.name}" khỏi giỏ hàng?\nHành động này không thể hoàn tác`,
      confirmLabel: "Xóa",
      onConfirm: () => {
        setDeleting(true);
        setTimeout(() => {
          removeCartItem(item.id);
          showSuccessModal({
            message: "Đã xóa sản phẩm khỏi giỏ hàng.\nBạn có thể tiếp tục mua sắm hoặc quay về trang chủ",
          });
        }, 250);
      },
    });
  };

  useEffect(() => {
    if ((Array.isArray(item.variants) && item.variants.length) || !item.productId) return;
    let active = true;
    getProductDetails(item.productId)
      .then((product) => {
        if (active) setLoadedVariants(product.variants || []);
      })
      .catch(() => {
        if (active) setLoadedVariants([]);
      });
    return () => {
      active = false;
    };
  }, [item.productId, item.variants]);

  const handleVariantChange = (event) => {
    const nextVariant = variantOptions.find((variant) => String(variant.id) === event.target.value);
    if (!nextVariant) return;
    const nextSize = nextVariant.sizes?.includes(item.size) ? item.size : nextVariant.sizes?.[0] || "";
    updateCartOptions(item.id, {
      variantId: nextVariant.id,
      type: nextVariant.name,
      size: nextSize,
      price: nextVariant.price || item.price,
    });
  };

  const handleSizeChange = (event) => {
    updateCartOptions(item.id, { size: event.target.value });
  };

  const handleOpenProduct = () => {
    if (!item.productId) return;
    navigate(`/product-details/${item.productId}`);
  };

  const handleOpenProductByKeyboard = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpenProduct();
    }
  };

  const stopCardNavigation = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      className={`relative flex min-h-[118px] w-full shrink-0 items-center gap-[10px] border-b border-solid border-[#e0e0e0] px-[6px] py-[10px] transition-all duration-200 lg:my-[10px] lg:min-h-[132px] lg:w-full lg:px-[10px] lg:py-[14px] ${
        deleting ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
      }`}
      role={item.productId ? "link" : undefined}
      tabIndex={item.productId ? 0 : undefined}
      onClick={handleOpenProduct}
      onKeyDown={handleOpenProductByKeyboard}
      aria-label={item.productId ? `Xem chi tiết ${item.name}` : undefined}
    >
      {/* Checkbox */}
      <button
        type="button"
        onClick={(event) => {
          stopCardNavigation(event);
          toggleCartItem(item.id);
        }}
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
        <div className="h-[64px] w-[64px] lg:h-[92px] lg:w-[92px]">
          <img
            src={item.image || item.imageUrl || item.thumbnail || cartImages.productThumb}
            alt={item.name}
            className="size-full object-cover"
          />
        </div>
      </div>

      {/* Product info */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-[8px] lg:gap-[12px]">
        <div className="flex w-full items-start justify-between">
          <p className="line-clamp-2 min-w-0 pr-3 font-['Roboto'] text-[12px] font-bold leading-[1.43] tracking-[0.17px] text-[#0d47a1] lg:text-[14px]">
            {item.name}
          </p>
          <button
            type="button"
            onClick={(event) => {
              stopCardNavigation(event);
              handleDelete();
            }}
            className="group relative h-[15px] w-[14px] shrink-0 transition-all duration-micro hover:scale-110 focus-ring-brand lg:h-5 lg:w-[17px]"
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
          <p className="shrink-0 whitespace-nowrap font-['Roboto'] text-[12px] font-bold leading-[1.43] tracking-[0.17px] lg:text-[14px]">
            {formatPrice(item.price)}
          </p>
          {/* Quantity stepper */}
          <div className="flex h-5 w-14 shrink-0 items-center justify-between rounded border border-solid border-[#353535] px-2 font-['Josefin_Sans'] text-[20px] font-medium leading-normal lg:h-[27px] lg:w-[78px] lg:px-[16px] lg:py-[5px]">
            <button
              type="button"
              onClick={(event) => {
                stopCardNavigation(event);
                updateCartQty(item.id, -1);
              }}
              className="flex h-5 w-3 shrink-0 items-center justify-center text-[20px] leading-5 text-[#353535] transition-colors duration-micro hover:text-[#0d47a1] active:scale-90 focus-ring-brand lg:h-6 lg:w-6"
              aria-label="Giảm số lượng"
            >
              −
            </button>
            <span className="shrink-0 text-[13px] leading-5 text-[#353535] lg:text-[20px]">{item.qty}</span>
            <button
              type="button"
              onClick={(event) => {
                stopCardNavigation(event);
                updateCartQty(item.id, 1);
              }}
              className="flex h-5 w-3 shrink-0 items-center justify-center text-[20px] leading-5 text-[#353535] transition-colors duration-micro hover:text-[#0d47a1] active:scale-90 focus-ring-brand lg:h-6 lg:w-6"
              aria-label="Tăng số lượng"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex w-full flex-wrap items-center gap-x-4 gap-y-2 font-['Roboto'] text-[10px] leading-[1.66] tracking-[0.4px] text-[#353535] lg:gap-x-6 lg:text-[12px]">
          <div className="flex items-center gap-[5px] lg:gap-[8px]">
            <span>Loại:</span>
            {variantOptions.length > 1 ? (
              <select
                value={String(selectedVariant?.id ?? item.variantId ?? "")}
                onChange={handleVariantChange}
                onClick={stopCardNavigation}
                className="h-[22px] max-w-[86px] rounded border border-[#c7c7c7] bg-white px-1 text-[10px] text-[#353535] outline-none transition-colors focus:border-[#0d47a1] lg:max-w-[112px] lg:text-[12px]"
                aria-label="Chọn loại sản phẩm"
              >
                {variantOptions.map((variant) => (
                  <option key={variant.id ?? variant.name} value={String(variant.id ?? "")}>
                    {variant.name}
                  </option>
                ))}
              </select>
            ) : (
              <span>{item.type || selectedVariant?.name || "Mặc định"}</span>
            )}
          </div>
          <div className="flex items-center gap-[5px] lg:gap-[8px]">
            <span>Kích cỡ:</span>
            {sizeOptions.length > 1 ? (
              <select
                value={item.size || ""}
                onChange={handleSizeChange}
                onClick={stopCardNavigation}
                className="h-[22px] max-w-[86px] rounded border border-[#c7c7c7] bg-white px-1 text-[10px] text-[#353535] outline-none transition-colors focus:border-[#0d47a1] lg:max-w-[112px] lg:text-[12px]"
                aria-label="Chọn kích cỡ sản phẩm"
              >
                {sizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size || "Mặc định"}
                  </option>
                ))}
              </select>
            ) : (
              <span>{item.size || sizeOptions[0] || "Mặc định"}</span>
            )}
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
      className="cart-panel-motion pointer-events-auto absolute inset-0 flex h-screen w-full flex-col items-center gap-[10px] overflow-hidden bg-[#fffde7] px-[10px] py-0 lg:inset-auto lg:right-[94px] lg:top-0 lg:h-[638px] lg:max-h-[calc(100vh-104px)] lg:w-[551px] lg:rounded lg:px-5 lg:py-[10px] lg:shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
      data-name="my cart"
      role="dialog"
      aria-label="Giỏ hàng"
    >
      {/* Header */}
      <div className="flex h-12 w-full shrink-0 items-center justify-between bg-white pr-[10px] lg:h-auto lg:w-[503px] lg:bg-transparent lg:pr-0">
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
      <div className="flex min-h-0 w-full max-w-[340px] flex-1 flex-col items-start overflow-x-clip overflow-y-auto lg:max-w-none">
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
