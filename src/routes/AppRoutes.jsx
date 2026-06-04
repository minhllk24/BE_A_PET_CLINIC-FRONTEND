import { Routes, Route } from "react-router-dom";
import LayoutManagePet from "../layout/LayoutManagePet";

import HomePage from "../pages/HomePage/HomePage";
import BookingPage from "../pages/Booking/BookingPage";
import MyPetPage from "../pages/Pet/MyPetPage";
import PetDetailPage from "../pages/Pet/PetDetailPage";
import PetFormPage from "../pages/Pet/PetFormPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. Trang chủ (HomePage không dùng layout bọc chung */}
      <Route path="/" element={<HomePage />} />
      <Route path="/booking" element={<BookingPage />} />

      {/* 2. Các trang thuộc nhóm quản lý thú cưng có layout riêng */}
      <Route element={<LayoutManagePet />}>
        <Route path="/my-pets" element={<MyPetPage />} />
        <Route path="/my-pets/new" element={<PetFormPage />} />
        <Route path="/my-pets/:id" element={<PetDetailPage />} />
        <Route path="/my-pets/:id/edit" element={<PetFormPage />} />
        {/* Các route khác liên quan user account có thể thêm tại đây */}
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
        {/* <Route path="/appointments" element={<AppointmentsPage />} /> */}
        {/* <Route path="/orders" element={<OrdersPage />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
