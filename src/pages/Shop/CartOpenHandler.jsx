import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

/** Mở overlay giỏ hàng rồi quay lại trang trước (giữ nội dung phía sau). */
function CartOpenHandler() {
  const { openCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    openCart();
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  }, [openCart, navigate]);

  return null;
}

export default CartOpenHandler;
