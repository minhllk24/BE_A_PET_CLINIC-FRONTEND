import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import AppRoutes from "../routes/AppRoutes";
import AuthModal from "../components/auth/AuthModal";
import ScrollToTop from "../components/layout/ScrollToTop";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ScrollToTop />
        <AppRoutes />
        <AuthModal />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
