import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { NotificationProvider } from "../context/NotificationContext";
import AppRoutes from "../routes/AppRoutes";
import AuthModal from "../components/auth/AuthModal";
import ScrollToTop from "../components/layout/ScrollToTop";
import { DecisionModalProvider } from "../components/shared/DecisionModal";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NotificationProvider>
          <DecisionModalProvider>
            <ScrollToTop />
            <AppRoutes />
            <AuthModal />
          </DecisionModalProvider>
        </NotificationProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
