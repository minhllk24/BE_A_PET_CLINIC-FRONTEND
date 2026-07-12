import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer/Footer";

const LayoutManagePet = () => {
  return (
    // THAY ĐỔI QUAN TRỌNG: Thêm 'fixed inset-0' để khóa chặt Layout vừa khít 100% màn hình
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-white w-full h-full">
      
      {/* Header */}
      <div className="flex-shrink-0 z-50 bg-white shadow-sm relative">
        <NavBar />
      </div>

      {/* Phần thân dưới */}
      <div className="flex flex-1 overflow-hidden bg-white w-full h-full">
        
        <Sidebar />

        {/* Khối nội dung chính (Chỉ có duy nhất 1 thanh cuộn nằm ở đây) */}
        <main className="flex-1 overflow-y-auto flex flex-col bg-white relative">
          <div className="ml-auto flex-1 w-full max-w-[1160px] px-4 py-6 sm:px-6 lg:px-8 [&>div]:!mx-0 [&>div]:!w-full [&>div]:!max-w-none">
            <Outlet />
          </div>
        </main>

      </div>
      <Footer variant="account" />
    </div>
  );
};

export default LayoutManagePet;
