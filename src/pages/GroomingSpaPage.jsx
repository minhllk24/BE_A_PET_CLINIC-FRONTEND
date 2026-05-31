import NavBar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import GroomingHero from "../components/groomingSpa/GroomingHero";
import GroomingServices from "../components/groomingSpa/GroomingServices";
import GroomingBanner from "../components/groomingSpa/GroomingBanner";
import GroomingCombos from "../components/groomingSpa/GroomingCombos";
import GroomingWhyUs from "../components/groomingSpa/GroomingWhyUs";
import GroomingFeedback from "../components/groomingSpa/GroomingFeedback";
import GroomingFAQ from "../components/groomingSpa/GroomingFAQ";

/** TEST navbar: true = đã đăng nhập, false = chưa đăng nhập */
const TEST_AUTHENTICATED_NAVBAR = true;

function GroomingSpaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header / NavBar */}
      <NavBar isAuthenticated={TEST_AUTHENTICATED_NAVBAR} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <GroomingHero />

        {/* Individual Services Section */}
        <GroomingServices />

        {/* Promo CTA Banner */}
        <GroomingBanner />

        {/* Combo Packages Section */}
        <GroomingCombos />

        {/* Why Choose Us Section */}
        <GroomingWhyUs />

        {/* Customer Feedback */}
        <GroomingFeedback />

        {/* FAQ Section */}
        <GroomingFAQ />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default GroomingSpaPage;
