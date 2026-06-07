/**
 * Navbar state khách / chưa đăng nhập.
 */
import { homeImages } from "../../assets/homeImages";
import cartIcon from "../../assets/images/cart_icon.svg";
import YellowButton from "../home/YellowButton";
import NavLinks from "./NavLinks";
import { useCart } from "../../context/CartContext";

function NavBarGuest() {
  const { openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="mx-auto flex max-w-page items-center justify-between gap-6 px-6 py-3 md:px-20">
        <a href="/" className="shrink-0">
          <img
            src={homeImages.logo}
            alt="Dr. Pet's House"
            className="h-[59px] w-auto object-contain"
          />
        </a>

        <NavLinks />

        <div className="flex shrink-0 items-center gap-6">
          <a href="/booking">
            <YellowButton className="hidden h-10 w-[150px] sm:inline-flex">
              ĐẶT LỊCH
            </YellowButton>
          </a>

          <a href="/sign-in">
            <YellowButton
              variant="outline"
              className="hidden h-10 w-[150px] sm:inline-flex"
            >
              ĐĂNG NHẬP
            </YellowButton>
          </a>

          <button
            type="button"
            onClick={openCart}
            className="shrink-0 cursor-pointer bg-transparent p-0 border-0"
            aria-label="Giỏ hàng"
          >
            <img src={cartIcon} alt="" className="h-9 w-9" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavBarGuest;
