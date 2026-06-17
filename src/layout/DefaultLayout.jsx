import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer/Footer";

const DefaultLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
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
