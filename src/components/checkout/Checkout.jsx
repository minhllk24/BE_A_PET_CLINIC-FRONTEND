import AppointmentCheckout from "./AppointmentCheckout";
import ShoppingCheckout from "./ShoppingCheckout";

/**
 * Checkout chung — chọn luồng theo mode (giống NavBar guest/authenticated).
 * - appointment: đặt lịch (/checkout)
 * - shopping: mua hàng (overlay từ giỏ)
 */
function Checkout({ mode = "shopping", isOpen = true, onBack }) {
  if (mode === "appointment") {
    return <AppointmentCheckout />;
  }

  if (!isOpen) {
    return null;
  }

  return <ShoppingCheckout onBack={onBack} />;
}

export default Checkout;
