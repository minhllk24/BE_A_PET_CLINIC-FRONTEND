/**
 * Navbar state khách / chưa đăng nhập.
 */
import { homeImages } from "../../assets/homeImages";
import cartIcon from "../../assets/images/cart_icon.svg";
import YellowButton from "../home/YellowButton";
import NavLinks from "./NavLinks";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import NavSearchBar from "./NavSearchBar";

function NavBarGuest() {
  const { openCart } = useCart();
  const { openAuth } = useAuth();

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-[70] w-full bg-white">
      <div className="mx-auto flex max-w-page items-center justify-between gap-6 px-6 py-3 md:px-20">
        <a href="/" className="shrink-0">
          <img
            src={homeImages.logo}
            alt="Dr. Pet's House"
            className="h-[59px] w-auto object-contain"
          />
        </a>

        <NavLinks />

        <div className="flex shrink-0 items-center gap-3">
          <NavSearchBar className="hidden lg:block" />

          <a href="/booking">
            <YellowButton className="h-[35px] min-w-[109px] px-[22px] py-2 text-base tracking-[0.15px]">
              ĐẶT LỊCH
            </YellowButton>
          </a>

          <YellowButton
            variant="outline"
            onClick={() => openAuth("login")}
            className="h-[35px] min-w-[109px] px-[22px] py-2 text-base tracking-[0.15px]"
          >
            ĐĂNG NHẬP
          </YellowButton>

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
    <div className="h-[88px] shrink-0" aria-hidden="true" />
    </>
  );
}

export default NavBarGuest;
