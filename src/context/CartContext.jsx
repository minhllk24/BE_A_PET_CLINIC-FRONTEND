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

  /* ---- Cart items state ---- */
  const [cartItems, setCartItems] = useState([]);

  const toggleCartItem = useCallback((id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    );
  }, []);

  const removeCartItem = useCallback((id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  }, []);

  const updateCartQty = useCallback((id, delta) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item,
      ),
    );
  }, []);

  const addToCart = useCallback((product) => {
    setCartItems((items) => {
      const existing = items.find((i) => i.id === product.id);
      if (existing) {
        return items.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + (product.qty || 1) } : i
        );
      }
      return [...items, { ...product, qty: product.qty || 1, selected: true }];
    });
  }, []);

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
      cartItems,
      toggleCartItem,
      removeCartItem,
      updateCartQty,
      addToCart,
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
      cartItems,
      toggleCartItem,
      removeCartItem,
      updateCartQty,
      addToCart,
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
