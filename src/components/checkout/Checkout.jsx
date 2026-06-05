import { useState } from "react";
import BookingPaymentStep, {
  BankTransferModal,
  CreditCardModal,
} from "../booking/BookingPaymentStep";
import BookingSuccessModal from "../booking/BookingSuccessModal";
import ShoppingCheckout from "./ShoppingCheckout";

/**
 * Checkout chung — chọn luồng theo mode (giống NavBar guest/authenticated).
 * - appointment: đặt lịch (/checkout)
 * - shopping: mua hàng (overlay từ giỏ)
 */
function Checkout({ mode = "shopping", isOpen = true, onBack }) {
  const [paymentMode, setPaymentMode] = useState("store");
  const [activeModal, setActiveModal] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleAppointmentConfirm = () => {
    if (paymentMode === "bank") {
      setActiveModal("bank");
      return;
    }

    if (paymentMode === "card") {
      setActiveModal("card");
      return;
    }

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
        {activeModal === "bank" && (
          <BankTransferModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "card" && (
          <CreditCardModal onClose={() => setActiveModal(null)} />
        )}
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
