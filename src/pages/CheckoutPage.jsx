import Checkout from "../components/checkout/Checkout";
import NavBar from "../components/Navbar";

function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <Checkout mode="appointment" />
    </div>
  );
}

export default CheckoutPage;
