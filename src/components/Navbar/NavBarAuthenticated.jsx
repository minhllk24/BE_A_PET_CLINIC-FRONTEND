/**
 * Navbar state sau đăng nhập (Figma: NavBar_state — node 1078:1202).
 * Hiển thị: tìm kiếm, ĐẶT LỊCH, thông báo, giỏ hàng, avatar người dùng.
 */
import { homeImages } from '../../assets/homeImages'
import { useCart } from '../../context/CartContext'
import { navbarImages } from '../../assets/navbarImages'
import YellowButton from '../home/YellowButton'
import NotificationBell from '../Notifications/NotificationBell'
import NavLinks from './NavLinks'
import NavSearchBar from './NavSearchBar'
import NavUserMenu from './NavUserMenu'
import MobileNavBar from './MobileNavBar'

function NavBarAuthenticated({ avatarSrc, onLogout }) {
  const { openCart } = useCart()

  return (
    <>
      <MobileNavBar isAuthenticated avatarSrc={avatarSrc} />
      <header className="fixed inset-x-0 top-0 z-[70] hidden w-full bg-white lg:block">
        <div className="mx-auto flex max-w-page items-center gap-2 px-3 py-3 sm:gap-2.5 sm:px-6 lg:px-10">
          <a href="/" className="shrink-0">
            <img
              src={homeImages.logo}
              alt="Dr. Pet's House"
              className="h-[52px] w-[112px] object-contain sm:h-[59px] sm:w-[136px]"
            />
          </a>

          <NavLinks />

          <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-4 lg:gap-6">
            <NavSearchBar className="hidden lg:block" />

            <a href="/booking" className="shrink-0">
              <YellowButton className="h-[35px] min-w-[82px] px-3 py-2 text-[13px] tracking-[0.1px] sm:min-w-[109px] sm:px-[22px] sm:text-base sm:tracking-[0.15px]">
                ĐẶT LỊCH
              </YellowButton>
            </a>

            <NotificationBell />

            <button
              type="button"
              onClick={openCart}
              className="btn-icon hidden shrink-0 p-1 min-[520px]:block"
              aria-label="Giỏ hàng"
            >
              <img src={navbarImages.cartYellow} alt="" className="h-9 w-9" />
            </button>

            <NavUserMenu avatarSrc={avatarSrc} onLogout={onLogout} />
          </div>
        </div>
      </header>
      <div className="hidden h-[88px] shrink-0 lg:block" aria-hidden="true" />
    </>
  )
}

export default NavBarAuthenticated
