import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import ScaledCanvasLayout from "../../components/layout/ScaledCanvasLayout";
import NavBar from "../../components/Navbar";
import GroomingBanner from "../../components/groomingSpa/GroomingBanner";
import GroomingCombos from "../../components/groomingSpa/GroomingCombos";
import GroomingFAQ from "../../components/groomingSpa/GroomingFAQ";
import GroomingFeedbackSection from "../../components/groomingSpa/GroomingFeedbackSection";
import GroomingHero from "../../components/groomingSpa/GroomingHero";
import ServicePricingModal from "../../components/groomingSpa/ServicePricingModal";
import GroomingServices from "../../components/groomingSpa/GroomingServices";
import GroomingWhyUs from "../../components/groomingSpa/GroomingWhyUs";
import { useAuth } from "../../context/AuthContext";

function GroomingCanvas({ onOpenPricing }) {
  return (
    <>
      <GroomingHero />
      <GroomingServices />
      <GroomingBanner onOpenPricing={onOpenPricing} />
      <GroomingCombos />
      <GroomingWhyUs />
      <GroomingFeedbackSection />
      <GroomingFAQ />
      <Footer />
    </>
  );
}

function GroomingSpaPage() {
  const { isAuthenticated } = useAuth();
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <NavBar isAuthenticated={isAuthenticated} />
      <ScaledCanvasLayout className="bg-white">
        <GroomingCanvas onOpenPricing={() => setIsPricingOpen(true)} />
      </ScaledCanvasLayout>
      <ServicePricingModal
        open={isPricingOpen}
        defaultFilter="grooming"
        onClose={() => setIsPricingOpen(false)}
      />
    </div>
  );
}

export default GroomingSpaPage;
