import { useState } from "react";
import BookingPaymentStep from "../booking/BookingPaymentStep";
import BookingSuccessModal from "../booking/BookingSuccessModal";
import ShoppingCheckout from "./ShoppingCheckout";

/**
 * Checkout chung — chọn luồng theo mode (giống NavBar guest/authenticated).
 * - appointment: đặt lịch (/checkout)
 * - shopping: mua hàng (overlay từ giỏ)
 */
function Checkout({ mode = "shopping", isOpen = true, onBack }) {
  const [paymentMode, setPaymentMode] = useState("store");
  const [success, setSuccess] = useState(false);

  const handleAppointmentConfirm = () => {
    setSuccess(true);
  };

  if (mode === "appointment") {
    return (
      <>
        <BookingPaymentStep
          selectedDate={null}
          selectedSlot="09:30 AM"
          paymentMode={paymentMode}
          setPaymentMode={setPaymentMode}
          onBack={onBack}
          onConfirm={handleAppointmentConfirm}
        />
        {success && <BookingSuccessModal />}
      </>
    );
  }

  if (!isOpen) {
    return null;
  }

  return <ShoppingCheckout onBack={onBack} />;
}

export default Checkout;
