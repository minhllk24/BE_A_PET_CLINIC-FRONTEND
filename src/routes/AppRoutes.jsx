import { Routes, Route } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import LayoutManagePet from "../layout/LayoutManagePet";

import HomePage from "../pages/HomePage";
import MyPetPage from "../pages/Pet/MyPetPage";
import PetDetailPage from "../pages/Pet/PetDetailPage";
import PetFormPage from "../pages/Pet/PetFormPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. Trang chủ đứng riêng lẻ (Giữ nguyên như cũ, không có Navbar/Footer chung) */}
      <Route path="/" element={<HomePage />} />

      {/* 2. Nhóm trang User Account dùng LayoutManagePet (Có Navbar, Sidebar, Footer) */}
      <Route element={<LayoutManagePet />}>
        {/* Pet Management Pages */}
<Route path="/my-pets" element={<MyPetPage />} />
<Route path="/my-pets/new" element={<PetFormPage />} /> 
<Route path="/my-pets/:id" element={<PetDetailPage />} />
<Route path="/my-pets/:id/edit" element={<PetFormPage />} />

        {/* TODO: Add other account pages */}
        {/* <Route path="/profile" element={<ProfilePage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/orders" element={<OrdersPage />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;