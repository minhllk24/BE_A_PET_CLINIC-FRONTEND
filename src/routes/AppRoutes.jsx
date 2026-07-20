import { Routes, Route } from "react-router-dom";
import LayoutManagePet from "../layout/LayoutManagePet";
import ProtectedRoute from "./ProtectedRoute";

import HomePage from "../pages/HomePage/HomePage";
import BookingPage from "../pages/Booking/BookingPage";
import AppointmentHistoryPage from "../pages/Booking/AppointmentHistoryPage";

import ShopPage from "../pages/Shop/ShopPage";
import ProductPage from "../pages/Product/ProductPage";
import ProductDetailsPage from "../pages/Product/ProductDetailsPage";
import WriteReviewPage from "../pages/Product/WriteReviewPage";
import CartOpenHandler from "../pages/Shop/CartOpenHandler";
import BlogPage from "../pages/Blog/BlogPage";
import BlogDetailPage from "../pages/Blog/BlogDetailPage";
import CommunityPage from "../pages/Blog/CommunityPage";
import FirstAidPage from "../pages/Blog/FirstAidPage";
import FirstAidDetailPage from "../pages/Blog/FirstAidDetailPage";
import RescuePage from "../pages/Rescue/RescuePage";
import SearchResultsPage from "../pages/Search/SearchResultsPage";

import GroomingSpaPage from "../pages/Services/GroomingSpaPage";
import MedicalTreatmentPage from "../pages/Services/MedicalTreatmentPage";
import CheckoutPage from "../pages/Checkout/CheckoutPage";

import MyPetPage from "../pages/Pet/MyPetPage";
import PetDetailPage from "../pages/Pet/PetDetailPage";
import PetFormPage from "../pages/Pet/PetFormPage";
import { MyOrdersPage, OrderDetailsPage } from "../pages/Order/OrderPages";
import UserProfilePage from "../pages/User/UserProfilePage";
import AboutPage from "../pages/About/AboutPage";
import ContactPage from "../pages/Contact/ContactPage";
import PolicyPage from "../pages/Policy/PolicyPage";
import NotFoundPage from "../pages/Error/NotFoundPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      <Route path="/dat-lich" element={<BookingPage />} />
      <Route path="/booking" element={<BookingPage />} />

      <Route path="/petshop" element={<ShopPage />} />
      <Route path="/cua-hang" element={<ShopPage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/san-pham" element={<ProductPage />} />
      <Route path="/product-details" element={<ProductDetailsPage />} />
      <Route path="/product-details/:productId" element={<ProductDetailsPage />} />
      <Route path="/product-details/:productId/write-review" element={<ProtectedRoute><WriteReviewPage /></ProtectedRoute>} />
      <Route path="/cart" element={<CartOpenHandler />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/bai-viet" element={<BlogPage />} />
      <Route path="/blog/kien-thuc" element={<BlogPage />} />
      <Route path="/bai-viet/kien-thuc" element={<BlogPage />} />
      <Route path="/blog/so-cuu" element={<FirstAidPage />} />
      <Route path="/bai-viet/so-cuu" element={<FirstAidPage />} />
      <Route path="/blog/so-cuu/:postId" element={<FirstAidDetailPage />} />
      <Route path="/bai-viet/so-cuu/:postId" element={<FirstAidDetailPage />} />
      <Route path="/blog/cong-dong" element={<CommunityPage />} />
      <Route path="/bai-viet/cong-dong" element={<CommunityPage />} />
      <Route path="/blog/:postId" element={<BlogDetailPage />} />
      <Route path="/bai-viet/:postId" element={<BlogDetailPage />} />
      <Route path="/rescue" element={<RescuePage />} />
      <Route path="/cuu-tro" element={<RescuePage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/ve-chung-toi" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/lien-he" element={<ContactPage />} />
      <Route path="/policy" element={<PolicyPage />} />
      <Route path="/policies/doi-tra-hang" element={<PolicyPage />} />
      <Route path="/policies/:slug" element={<PolicyPage />} />

      <Route path="/services/grooming-spa" element={<GroomingSpaPage />} />
      <Route path="/services/groomng-spa" element={<GroomingSpaPage />} />
      <Route path="/services/kham-dieu-tri" element={<MedicalTreatmentPage />} />
      <Route path="/dich-vu" element={<MedicalTreatmentPage />} />
      <Route path="/dich-vu/grooming-spa" element={<GroomingSpaPage />} />
      <Route path="/dich-vu/kham-dieu-tri" element={<MedicalTreatmentPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />

      {/* 2. Các trang thuộc nhóm quản lý thú cưng có layout riêng */}
      <Route element={<ProtectedRoute><LayoutManagePet /></ProtectedRoute>}>
        <Route path="/thong-tin-nguoi-dung" element={<UserProfilePage />} />
        <Route path="/thu-cung-cua-toi" element={<MyPetPage />} />
        <Route path="/thu-cung-cua-toi/them-moi" element={<PetFormPage />} />
        <Route path="/thu-cung-cua-toi/:id" element={<PetDetailPage />} />
        <Route path="/thu-cung-cua-toi/:id/chinh-sua" element={<PetFormPage />} />
        <Route path="/lich-su-dat-lich" element={<AppointmentHistoryPage />} />
        <Route path="/don-hang-cua-toi" element={<MyOrdersPage />} />
        <Route path="/don-hang-cua-toi/:orderId" element={<OrderDetailsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
