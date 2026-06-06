import ProductCard from "./ProductCard";

function ShoppingProductCard({ className = "", ...props }) {
  const variant =
    props.variant ||
    (props.product?.discountPercent || props.product?.tagLabel || props.product?.discountLabel
      ? "tag"
      : "default");

  return (
    <ProductCard
      {...props}
      variant={variant}
      className={[
        "shopping-product-card",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export default ShoppingProductCard;
