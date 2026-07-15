import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { NotificationProvider } from "../context/NotificationContext";
import AppRoutes from "../routes/AppRoutes";
import AuthModal from "../components/auth/AuthModal";
import ScrollToTop from "../components/layout/ScrollToTop";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NotificationProvider>
          <ScrollToTop />
          <AppRoutes />
          <AuthModal />
        </NotificationProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
