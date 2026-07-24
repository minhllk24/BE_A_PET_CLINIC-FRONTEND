import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import CartDrawer from "../components/cart/CartDrawer";
import BankTransferModal from "../components/checkout/BankTransferModal";
import CheckoutOverlay from "../components/checkout/CheckoutOverlay";
import GuestOrderSuccessOverlay from "../components/checkout/GuestOrderSuccessOverlay";
import OrderSuccessOverlay from "../components/checkout/OrderSuccessOverlay";
import { useAuth } from "./AuthContext";
import {
  addCartItem,
  deleteCartItem,
  getCart,
  updateCartItem,
} from "../services/cartService";

const CartContext = createContext(null);

function buildCartItemKey(product = {}) {
  return `${product.productId || product.product_id || product.id}:${product.variantId || product.variant_id || "default"}:${product.size || "default"}`;
}

function getCartItemOptionKey(item = {}) {
  return `${item.productId || item.product_id || item.productId || item.id}:${item.variantId || item.variant_id || "default"}:${item.size || "default"}`;
}

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [isGuestSuccessOpen, setIsGuestSuccessOpen] = useState(false);
  const [isBankTransferOpen, setIsBankTransferOpen] = useState(false);
  const [paymentMode, setPaymentMode] = useState("cod");
  const [onlineMethod, setOnlineMethod] = useState("bank");
  const [lastOrderResult, setLastOrderResult] = useState(null);
  const [cartSyncError, setCartSyncError] = useState("");
  const [cartLoading, setCartLoading] = useState(false);

  /* ---- Cart items state ---- */
  const [cartItems, setCartItems] = useState([]);

  const reloadCart = useCallback(async () => {
    if (!isAuthenticated) return;
    setCartLoading(true);
    setCartSyncError("");
    try {
      const cart = await getCart();
      setCartItems(cart.items);
    } catch (error) {
      setCartSyncError(error?.message || "Không thể tải giỏ hàng");
    } finally {
      setCartLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      setCartSyncError("");
      setCartLoading(false);
      return;
    }

    reloadCart();
  }, [isAuthenticated, reloadCart]);

  useEffect(() => {
    setIsCartOpen(false);
  }, [location.pathname]);

  const toggleCartItem = useCallback((id) => {
    const currentItem = cartItems.find((item) => item.id === id);
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    );
    if (isAuthenticated && currentItem?.cartItemId) {
      updateCartItem(currentItem.cartItemId, { isSelected: !currentItem.selected })
        .catch((error) => {
          setCartSyncError(error?.message || "Không thể cập nhật giỏ hàng");
          reloadCart();
        });
    }
  }, [cartItems, isAuthenticated, reloadCart]);

  const removeCartItem = useCallback((id) => {
    const currentItem = cartItems.find((item) => item.id === id);
    setCartItems((items) => items.filter((item) => item.id !== id));
    if (isAuthenticated && currentItem?.cartItemId) {
      deleteCartItem(currentItem.cartItemId)
        .catch((error) => {
          setCartSyncError(error?.message || "Không thể xóa sản phẩm");
          reloadCart();
        });
    }
  }, [cartItems, isAuthenticated, reloadCart]);

  const updateCartQty = useCallback((id, delta) => {
    const currentItem = cartItems.find((item) => item.id === id);
    const nextQuantity = Math.max(1, (currentItem?.qty || 1) + delta);
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item,
      ),
    );
    if (isAuthenticated && currentItem?.cartItemId) {
      updateCartItem(currentItem.cartItemId, { quantity: nextQuantity })
        .catch((error) => {
          setCartSyncError(error?.message || "Không thể cập nhật số lượng");
          reloadCart();
        });
    }
  }, [cartItems, isAuthenticated, reloadCart]);

  const updateCartOptions = useCallback((id, updates) => {
    const currentItem = cartItems.find((item) => item.id === id);
    if (!currentItem) return;

    const nextItem = { ...currentItem, ...updates };
    const nextOptionKey = getCartItemOptionKey(nextItem);
    const existingItem = cartItems.find(
      (item) => item.id !== id && getCartItemOptionKey(item) === nextOptionKey,
    );

    setCartItems((items) =>
      existingItem
        ? items
            .filter((item) => item.id !== id)
            .map((item) =>
              item.id === existingItem.id
                ? {
                    ...item,
                    qty: item.qty + currentItem.qty,
                    selected: item.selected || currentItem.selected,
                  }
                : item,
            )
        : items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  ...updates,
                  id: item.cartItemId ? item.id : nextOptionKey,
                }
              : item,
          ),
    );
    if (isAuthenticated && currentItem.cartItemId) {
      const request = existingItem?.cartItemId
        ? Promise.all([
            updateCartItem(existingItem.cartItemId, {
              quantity: existingItem.qty + currentItem.qty,
              isSelected: existingItem.selected || currentItem.selected,
            }),
            deleteCartItem(currentItem.cartItemId),
          ])
        : updateCartItem(currentItem.cartItemId, updates);

      request.catch((error) => {
        setCartSyncError(error?.message || "Không thể cập nhật tùy chọn sản phẩm");
        reloadCart();
      });
    }
  }, [cartItems, isAuthenticated, reloadCart]);

  const addToCart = useCallback((product) => {
    const localId = buildCartItemKey(product);
    setCartItems((items) => {
      const existing = items.find((i) => i.id === localId);
      if (existing) {
        return items.map((i) =>
          i.id === localId ? { ...i, qty: i.qty + (product.qty || 1), selected: true } : i
        );
      }
      return [...items, { ...product, id: localId, qty: product.qty || 1, selected: true }];
    });
    if (isAuthenticated) {
      addCartItem(product)
        .then(() => reloadCart())
        .catch((error) => {
          setCartSyncError(error?.message || "Không thể thêm vào giỏ hàng");
          reloadCart();
        });
    }
  }, [isAuthenticated, reloadCart]);

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

  const showOrderSuccess = useCallback((orderResult = null) => {
    if (orderResult) {
      setLastOrderResult(orderResult);
    }
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

  const confirmOrder = useCallback((orderResult = null) => {
    if (orderResult) {
      setLastOrderResult(orderResult);
    }
    if (paymentMode === "online" && onlineMethod === "bank") {
      setIsBankTransferOpen(true);
      return;
    }
    showOrderSuccess(orderResult);
  }, [paymentMode, onlineMethod, showOrderSuccess]);

  const closeBankTransfer = useCallback(() => setIsBankTransferOpen(false), []);

  const completeBankTransfer = useCallback(() => {
    showOrderSuccess(lastOrderResult);
  }, [lastOrderResult, showOrderSuccess]);

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
      lastOrderResult,
      cartLoading,
      cartSyncError,
      reloadCart,
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
      updateCartOptions,
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
      lastOrderResult,
      cartLoading,
      cartSyncError,
      reloadCart,
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
      updateCartOptions,
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
