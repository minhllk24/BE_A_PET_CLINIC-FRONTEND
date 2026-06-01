/**
 * Navbar state sau đăng nhập (Figma: NavBar_state — node 1078:1202).
 * Hiển thị: tìm kiếm, ĐẶT LỊCH, thông báo, giỏ hàng, avatar người dùng.
 */
import { homeImages } from "../../assets/homeImages";
import { useCart } from "../../context/CartContext";
import { navbarImages } from "../../assets/navbarImages";
import YellowButton from "../home/YellowButton";
import NavLinks from "./NavLinks";
import NavSearchBar from "./NavSearchBar";
import NavUserMenu from "./NavUserMenu";

function NavBarAuthenticated({ avatarSrc, onLogout }) {
  const { openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="mx-auto flex max-w-page items-center gap-2.5 px-10 py-3">
        <a href="/" className="shrink-0">
          <img
            src={homeImages.logo}
            alt="Dr. Pet's House"
            className="h-[59px] w-[136px] object-contain"
          />
        </a>

        <NavLinks />

        <div className="ml-auto flex items-center gap-6">
          <NavSearchBar className="hidden lg:block" />

          <a href="/booking" className="shrink-0">
            <YellowButton className="h-[35px] min-w-[109px] px-[22px] py-2 text-base tracking-[0.15px]">
              ĐẶT LỊCH
            </YellowButton>
          </a>

          <button
            type="button"
            className="btn-icon shrink-0 p-1"
            aria-label="Thông báo"
          >
            <img
              src={navbarImages.notificationIcon}
              alt=""
              className="h-[36px] w-[32px]"
            />
          </button>

          <button
            type="button"
            onClick={openCart}
            className="btn-icon shrink-0 p-1"
            aria-label="Giỏ hàng"
          >
            <img
              src={navbarImages.cartYellow}
              alt=""
              className="h-9 w-9"
            />
          </button>

          <NavUserMenu avatarSrc={avatarSrc} onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
}

export default NavBarAuthenticated;
