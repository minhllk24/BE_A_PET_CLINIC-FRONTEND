import { Outlet } from "react-router-dom";
// Import thẳng Navbar đã đăng nhập, bỏ qua bước kiểm tra
import NavBarAuthenticated from "../components/Navbar/NavBarAuthenticated";
import Footer from "../components/layout/Footer";

const DefaultLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Gắn cứng Navbar User vào đây */}
      <NavBarAuthenticated /> 
      
      {/* Nội dung các trang Pet sẽ đổ vào đây */}
      <main className="flex-grow bg-slate-50">
        <Outlet /> 
      </main>

      {/* Footer dùng chung */}
      <Footer />
    </div>
  );
};

export default DefaultLayout;