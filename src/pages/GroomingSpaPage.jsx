import Footer from "../components/layout/Footer";
import ScaledCanvasLayout from "../components/layout/ScaledCanvasLayout";
import NavBar from "../components/Navbar";
import GroomingBanner from "../components/groomingSpa/GroomingBanner";
import GroomingCombos from "../components/groomingSpa/GroomingCombos";
import GroomingFAQ from "../components/groomingSpa/GroomingFAQ";
import GroomingFeedbackSection from "../components/groomingSpa/GroomingFeedbackSection";
import GroomingHero from "../components/groomingSpa/GroomingHero";
import GroomingServices from "../components/groomingSpa/GroomingServices";
import GroomingWhyUs from "../components/groomingSpa/GroomingWhyUs";
import { TEST_AUTHENTICATED } from "../config/devFlags";

function GroomingCanvas() {
  return (
    <>
      <GroomingHero />
      <GroomingServices />
      <GroomingBanner />
      <GroomingCombos />
      <GroomingWhyUs />
      <GroomingFeedbackSection />
      <GroomingFAQ />
      <Footer />
    </>
  );
}

function GroomingSpaPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <NavBar isAuthenticated={TEST_AUTHENTICATED} />
      <ScaledCanvasLayout className="bg-white">
        <GroomingCanvas />
      </ScaledCanvasLayout>
    </div>
  );
}

export default GroomingSpaPage;
