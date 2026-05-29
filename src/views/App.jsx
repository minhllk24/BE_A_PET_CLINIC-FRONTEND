import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import GroomingSpaPage from "../pages/GroomingSpaPage";
import CheckoutPage from "../pages/CheckoutPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Cả 2 route để phòng ngừa lỗi gõ sai chữ 'n' trong link Navbar Figma */}
      <Route path="/services/groomng-spa" element={<GroomingSpaPage />} />
      <Route path="/services/grooming-spa" element={<GroomingSpaPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}

export default App;
