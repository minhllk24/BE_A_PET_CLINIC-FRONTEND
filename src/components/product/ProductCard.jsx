import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import ProductRating from "./ProductRating";
import { productCardImages } from "./productCardAssets";
import { formatVnd, getNumericPrice } from "../../utils/currency";

function getFirstValue(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== "");
}

function formatProductPrice(value) {
  if (value === undefined || value === null || value === "") return "";
  if (typeof value === "string" && !/\d/.test(value)) return value;

  return formatVnd(value);
}

function buildProductHref(product, fallbackHref) {
  const slugOrId = getFirstValue(product?.slug, product?.id, product?.productId);
  if (fallbackHref) {
    return slugOrId && fallbackHref === "/product-details"
      ? `${fallbackHref}/${slugOrId}`
      : fallbackHref;
  }
  return slugOrId ? `/product-details/${slugOrId}` : undefined;
}

function ProductCard({
  product,
  variant = "default",
  name,
  price,
  oldPrice,
  tagLabel,
  imageSrc,
  rating,
  className = "",
  href,
  onAddToCart,
}) {
  const { addToCart, openCart } = useCart();
  const productName = getFirstValue(
    name,
    product?.name,
    product?.productName,
    product?.title,
    "Sản phẩm",
  );
  const currentPriceValue = getFirstValue(price, product?.salePrice, product?.currentPrice, product?.price);
  const oldPriceValue = getFirstValue(
    oldPrice,
    product?.oldPrice,
    product?.originalPrice,
    product?.regularPrice,
    product?.compareAtPrice,
    product?.listPrice,
    product?.salePrice || product?.currentPrice ? product?.price : undefined,
  );
  const productPrice = formatProductPrice(currentPriceValue);
  const productOldPrice =
    oldPriceValue !== undefined &&
    oldPriceValue !== null &&
    oldPriceValue !== "" &&
    getNumericPrice(oldPriceValue) > getNumericPrice(currentPriceValue)
      ? formatProductPrice(oldPriceValue)
      : "";
  const productRating = getFirstValue(rating, product?.rating, product?.averageRating, 0);
  const productImage = getFirstValue(
    imageSrc,
    product?.imageSrc,
    product?.image,
    product?.imageUrl,
    product?.thumbnail,
    productCardImages.placeholder,
  );
  const productTagLabel = getFirstValue(
    tagLabel,
    product?.tagLabel,
    product?.discountLabel,
    product?.discountPercent ? `${product.discountPercent}% OFF` : undefined,
  );
  const productHref = buildProductHref(product, href);
  const isTag = variant === "tag" && productTagLabel;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addToCart({
        id: getFirstValue(product?.id, product?.productId, product?.slug, `${productName}:${productPrice}`),
        productId: getFirstValue(product?.productId, product?.id),
        name: productName,
        price: currentPriceValue ?? 0,
        image: productImage,
        type: getFirstValue(product?.type, product?.variantName, ""),
        size: getFirstValue(product?.size, ""),
        qty: 1,
      });
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
          src={productImage}
          alt={productName}
          className="pointer-events-none absolute inset-0 size-full rounded-[19px] object-cover transition-transform duration-component ease-premium group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-auto w-full pb-2 pt-2">
        <p className="product-card-name line-clamp-2 min-h-[40px] font-['Roboto'] text-[16px] font-bold leading-[20px] tracking-[0.15px] text-black transition-colors duration-micro group-hover:text-blue-900">
          {productName}
        </p>

        <div className="product-card-price-row flex h-[28px] flex-col justify-center overflow-hidden">
          <span className="block h-[12px] max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap font-normal text-[11px] leading-3 text-[#8A8F98] line-through">
            {productOldPrice}
          </span>
          <span className="product-card-current-price font-['Roboto'] text-[14px] font-bold leading-none text-black">
            {productPrice}
          </span>
        </div>

        <div className="mt-1 w-full">
          <ProductRating value={productRating} />
        </div>
      </div>

      <button
        type="button"
        className="card-product-cart-btn"
        aria-label={`Thêm ${productName} vào giỏ hàng`}
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
            {productTagLabel}
          </span>
        </div>
      )}
    </>
  );

  if (productHref) {
    return (
      <Link to={productHref} className={`group block ${cardClass}`}>
        {inner}
      </Link>
    );
  }

  return <article className={`group ${cardClass}`}>{inner}</article>;
}

export default ProductCard;
