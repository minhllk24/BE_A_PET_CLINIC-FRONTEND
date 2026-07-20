import { useCart } from "../../context/CartContext";
import MyCartPanel from "./MyCartPanel";

function CartDrawer() {
  const { isCartOpen, closeCart } = useCart();

  if (!isCartOpen) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] lg:z-[60]" role="presentation">
      <button
        type="button"
        className="pointer-events-auto absolute inset-0 top-[88px] hidden bg-transparent lg:block"
        onClick={closeCart}
        aria-label="Đóng giỏ hàng"
      />
      <div className="pointer-events-none absolute inset-0 lg:inset-x-0 lg:top-[88px] lg:mx-auto lg:max-w-page">
        <MyCartPanel onClose={closeCart} />
      </div>
    </div>
  );
}

export default CartDrawer;
