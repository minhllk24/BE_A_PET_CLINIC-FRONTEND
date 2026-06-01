import { useCart } from "../../context/CartContext";
import MyCartPanel from "./MyCartPanel";

function CartDrawer() {
  const { isCartOpen, closeCart } = useCart();

  if (!isCartOpen) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]" role="presentation">
      <button
        type="button"
        className="overlay-fade-in pointer-events-auto absolute inset-0 top-[88px] bg-black/10"
        onClick={closeCart}
        aria-label="Đóng giỏ hàng"
      />
      <div className="pointer-events-auto absolute inset-x-0 top-[88px] mx-auto max-w-page">
        <MyCartPanel onClose={closeCart} />
      </div>
    </div>
  );
}

export default CartDrawer;
