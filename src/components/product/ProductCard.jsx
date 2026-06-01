import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import ProductRating from "./ProductRating";
import { productCardImages } from "./productCardAssets";

/**
 * Figma: Product_cart_1 (1261:2673 default, 1268:2743 hover, 1261:2675 tag)
 * 170×234px — cart badge absolute left 117px top 136.5px (40×40)
 */
function ProductCard({
  variant = "default",
  name = "ten sp",
  oldPrice = "$23.00",
  price = "$13.00",
  tagLabel = "56% OFF",
  imageSrc = productCardImages.placeholder,
  className = "",
  href,
  onAddToCart,
}) {
  const { openCart } = useCart();
  const isTag = variant === "tag";

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart();
    } else {
      openCart();
    }
  };
  const forceHoverStyle = variant === "hover";

  const cardClass = [
    forceHoverStyle ? "card-product" : "card-product-interactive",
    forceHoverStyle
      ? "shadow-[0px_0px_15px_0px_#90CAF9,5px_4px_4px_0px_rgba(0,0,0,0.25)]"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <div className="relative h-[110px] w-full shrink-0 overflow-hidden rounded-[19px]">
        <img
          src={imageSrc}
          alt=""
          className="pointer-events-none absolute inset-0 size-full rounded-[19px] object-cover transition-transform duration-component ease-premium group-hover:scale-[1.03]"
        />
      </div>

      <p className="min-h-0 w-full shrink-0 font-['Roboto'] text-[16px] leading-[1.5] tracking-[0.15px] text-black transition-colors duration-micro group-hover:text-blue-900">
        {name}
      </p>

      <div className="flex w-full shrink-0 items-start uppercase tracking-[1px]">
        <div className="flex h-[22px] w-[48px] shrink-0 items-center text-[#404040]">
          <span className="font-['Roboto'] text-[12px] leading-[2.66] line-through">
            {oldPrice}
          </span>
        </div>
        <div className="flex h-[22px] w-[43px] shrink-0 items-center text-black">
          <span className="font-['Roboto'] text-[12px] font-bold leading-[2.66]">
            {price}
          </span>
        </div>
      </div>

      <div className="min-h-0 w-full shrink-0">
        <ProductRating />
      </div>

      <button
        type="button"
        className="card-product-cart-btn"
        aria-label={`Thêm ${name} vào giỏ hàng`}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          handleAddToCart();
        }}
      >
        <img
          src={productCardImages.cartBadge}
          alt=""
          className="size-full"
        />
      </button>

      {isTag && (
        <div className="absolute right-[-1px] top-[-1px] flex items-center justify-center rounded-bl-[16px] rounded-tr-[30px] bg-[#0D47A1] pb-[10px] pl-[7px] pr-[9px] pt-[11px]">
          <span className="w-[30px] text-center font-['Roboto'] text-[12px] leading-[1.66] tracking-[0.4px] text-white">
            {tagLabel}
          </span>
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link to={href} className={`group block ${cardClass}`}>
        {inner}
      </Link>
    );
  }

  return <article className={`group ${cardClass}`}>{inner}</article>;
}

export default ProductCard;
