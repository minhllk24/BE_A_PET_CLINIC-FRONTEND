import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import CartDrawer from "../components/cart/CartDrawer";
import BankTransferModal from "../components/checkout/BankTransferModal";
import CheckoutOverlay from "../components/checkout/CheckoutOverlay";
import GuestOrderSuccessOverlay from "../components/checkout/GuestOrderSuccessOverlay";
import OrderSuccessOverlay from "../components/checkout/OrderSuccessOverlay";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [isGuestSuccessOpen, setIsGuestSuccessOpen] = useState(false);
  const [isBankTransferOpen, setIsBankTransferOpen] = useState(false);
  const [paymentMode, setPaymentMode] = useState("cod");
  const [onlineMethod, setOnlineMethod] = useState("bank");

  const openCart = useCallback(() => {
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(false);
    setIsGuestSuccessOpen(false);
    setIsBankTransferOpen(false);
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const toggleCart = useCallback(() => setIsCartOpen((open) => !open), []);

  const openCheckout = useCallback(() => {
    setIsCartOpen(false);
    setPaymentMode("cod");
    setOnlineMethod("bank");
    setIsBankTransferOpen(false);
    setIsCheckoutOpen(true);
  }, []);

  const closeCheckout = useCallback(() => setIsCheckoutOpen(false), []);

  const backToCart = useCallback(() => {
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(false);
    setIsGuestSuccessOpen(false);
    setIsBankTransferOpen(false);
    setIsCartOpen(true);
  }, []);

  const showOrderSuccess = useCallback(() => {
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
    setIsBankTransferOpen(false);
    if (isAuthenticated) {
      setIsGuestSuccessOpen(false);
      setIsOrderSuccessOpen(true);
    } else {
      setIsOrderSuccessOpen(false);
      setIsGuestSuccessOpen(true);
    }
  }, [isAuthenticated]);

  const confirmOrder = useCallback(() => {
    if (paymentMode === "online" && onlineMethod === "bank") {
      setIsBankTransferOpen(true);
      return;
    }
    showOrderSuccess();
  }, [paymentMode, onlineMethod, showOrderSuccess]);

  const closeBankTransfer = useCallback(() => setIsBankTransferOpen(false), []);

  const completeBankTransfer = useCallback(() => {
    showOrderSuccess();
  }, [showOrderSuccess]);

  const closeOrderSuccess = useCallback(() => setIsOrderSuccessOpen(false), []);

  const closeGuestSuccess = useCallback(() => setIsGuestSuccessOpen(false), []);

  const value = useMemo(
    () => ({
      isOpen: isCartOpen,
      isCartOpen,
      isCheckoutOpen,
      isOrderSuccessOpen,
      isGuestSuccessOpen,
      isBankTransferOpen,
      paymentMode,
      setPaymentMode,
      onlineMethod,
      setOnlineMethod,
      openCart,
      closeCart,
      toggleCart,
      openCheckout,
      closeCheckout,
      backToCart,
      confirmOrder,
      closeBankTransfer,
      completeBankTransfer,
      closeOrderSuccess,
      closeGuestSuccess,
    }),
    [
      isCartOpen,
      isCheckoutOpen,
      isOrderSuccessOpen,
      isGuestSuccessOpen,
      isBankTransferOpen,
      paymentMode,
      onlineMethod,
      openCart,
      closeCart,
      toggleCart,
      openCheckout,
      closeCheckout,
      backToCart,
      confirmOrder,
      closeBankTransfer,
      completeBankTransfer,
      closeOrderSuccess,
      closeGuestSuccess,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
      <CheckoutOverlay />
      <BankTransferModal />
      <OrderSuccessOverlay />
      <GuestOrderSuccessOverlay />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
