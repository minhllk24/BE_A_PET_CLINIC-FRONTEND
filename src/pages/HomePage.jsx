import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import ServiceSection from "../components/home/ServiceSection";
import ProductSection from "../components/home/ProductSection";
import DoctorSection from "../components/home/DoctorSection";
import BlogSection from "../components/home/BlogSection";

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
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
