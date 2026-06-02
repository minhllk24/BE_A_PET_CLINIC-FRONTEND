import NavBar from "../../components/Navbar";
import Footer from "../../components/layout/Footer";

/** TEST navbar đã đăng nhập: đổi `true` / `false` rồi lưu file */
const TEST_AUTHENTICATED_NAVBAR = true;
import HeroSection from "../../components/home/HeroSection";
import AboutSection from "../../components/home/AboutSection";
import ServiceSection from "../../components/home/ServiceSection";
import ProductSection from "../../components/home/ProductSection";
import DoctorSection from "../../components/home/DoctorSection";
import BlogSection from "../../components/home/BlogSection";

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar isAuthenticated={TEST_AUTHENTICATED_NAVBAR} />
      <main>
        <HeroSection />
        <AboutSection />
        <ServiceSection />
        <ProductSection />
        <DoctorSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
