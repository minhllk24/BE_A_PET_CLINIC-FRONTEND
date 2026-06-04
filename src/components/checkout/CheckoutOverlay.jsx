import { useCart } from "../../context/CartContext";
import Checkout from "./Checkout";

function CheckoutOverlay() {
  const { isCheckoutOpen, backToCart } = useCart();

  return <Checkout mode="shopping" isOpen={isCheckoutOpen} onBack={backToCart} />;
}

export default CheckoutOverlay;
