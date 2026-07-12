import { Routes, Route } from "react-router-dom";
import LayoutManagePet from "../layout/LayoutManagePet";

import HomePage from "../pages/HomePage/HomePage";
import BookingPage from "../pages/Booking/BookingPage";
import AppointmentHistoryPage from "../pages/Booking/AppointmentHistoryPage";

import ShopPage from "../pages/ShopPage";
import ProductPage from "../pages/ProductPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import WriteReviewPage from "../pages/WriteReviewPage";
import CartOpenHandler from "../pages/CartOpenHandler";
import BlogPage from "../pages/Blog/BlogPage";
import BlogDetailPage from "../pages/Blog/BlogDetailPage";
import CommunityPage from "../pages/Blog/CommunityPage";
import FirstAidPage from "../pages/Blog/FirstAidPage";
import FirstAidDetailPage from "../pages/Blog/FirstAidDetailPage";
import RescuePage from "../pages/Rescue/RescuePage";
import SearchResultsPage from "../pages/SearchResultsPage";

import GroomingSpaPage from "../pages/GroomingSpaPage";
import MedicalTreatmentPage from "../pages/MedicalTreatment/MedicalTreatmentPage";
import CheckoutPage from "../pages/CheckoutPage";

import MyPetPage from "../pages/Pet/MyPetPage";
import PetDetailPage from "../pages/Pet/PetDetailPage";
import PetFormPage from "../pages/Pet/PetFormPage";
import { MyOrdersPage, OrderDetailsPage } from "../pages/Order/OrderPages";
import UserProfilePage from "../pages/User/UserProfilePage";
import AboutPage from "../pages/About/AboutPage";
import ContactPage from "../pages/Contact/ContactPage";
import PolicyPage from "../pages/Policy/PolicyPage";
import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      <Route path="/booking" element={<BookingPage />} />

      <Route path="/petshop" element={<ShopPage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/product-details" element={<ProductDetailsPage />} />
      <Route path="/product-details/:productId" element={<ProductDetailsPage />} />
      <Route path="/product-details/:productId/write-review" element={<WriteReviewPage />} />
      <Route path="/cart" element={<CartOpenHandler />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/kien-thuc" element={<BlogPage />} />
      <Route path="/blog/so-cuu" element={<FirstAidPage />} />
      <Route path="/blog/so-cuu/:postId" element={<FirstAidDetailPage />} />
      <Route path="/blog/cong-dong" element={<CommunityPage />} />
      <Route path="/blog/:postId" element={<BlogDetailPage />} />
      <Route path="/rescue" element={<RescuePage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/policy" element={<PolicyPage />} />
      <Route path="/policies/doi-tra-hang" element={<PolicyPage />} />
      <Route path="/policies/:slug" element={<PolicyPage />} />

      <Route path="/services/grooming-spa" element={<GroomingSpaPage />} />
      <Route path="/services/groomng-spa" element={<GroomingSpaPage />} />
      <Route path="/services/kham-dieu-tri" element={<MedicalTreatmentPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />

      {/* 2. Các trang thuộc nhóm quản lý thú cưng có layout riêng */}
      <Route element={<LayoutManagePet />}>
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/my-pets" element={<MyPetPage />} />
        <Route path="/my-pets/new" element={<PetFormPage />} />
        <Route path="/my-pets/:id" element={<PetDetailPage />} />
        <Route path="/my-pets/:id/edit" element={<PetFormPage />} />
        <Route path="/appointment/history" element={<AppointmentHistoryPage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
        <Route path="/my-orders/:orderId" element={<OrderDetailsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
