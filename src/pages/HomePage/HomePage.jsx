import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../context/AuthContext";
import HeroSection from "../../components/home/HeroSection";
import AboutSection from "../../components/home/AboutSection";
import ServiceSection from "../../components/home/ServiceSection";
import ProductSection from "../../components/home/ProductSection";
import DoctorSection from "../../components/home/DoctorSection";
import BlogSection from "../../components/home/BlogSection";

function HomePage() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen bg-white">
      <NavBar isAuthenticated={isAuthenticated} />
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
