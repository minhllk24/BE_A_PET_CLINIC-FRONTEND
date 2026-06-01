import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import ProductPage from "../pages/ProductPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import WriteReviewPage from "../pages/WriteReviewPage";
import CartOpenHandler from "../pages/CartOpenHandler";
import GroomingSpaPage from "../pages/GroomingSpaPage";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product-details" element={<ProductDetailsPage />} />
          <Route path="/product-details/write-review" element={<WriteReviewPage />} />
          <Route path="/cart" element={<CartOpenHandler />} />
          <Route path="/services/groomng-spa" element={<GroomingSpaPage />} />
          <Route path="/services/grooming-spa" element={<GroomingSpaPage />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
