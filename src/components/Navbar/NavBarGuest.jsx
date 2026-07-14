/**
 * Navbar state khách / chưa đăng nhập.
 */
import { homeImages } from '../../assets/homeImages'
import cartIcon from '../../assets/images/cart_icon.svg'
import YellowButton from '../home/YellowButton'
import NavLinks from './NavLinks'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import NavSearchBar from './NavSearchBar'
import MobileNavBar from './MobileNavBar'

function NavBarGuest() {
  const { openCart } = useCart()
  const { openAuth } = useAuth()

  return (
    <>
      <MobileNavBar />
      <header className="fixed inset-x-0 top-0 z-[70] hidden w-full bg-white lg:block">
        <div className="mx-auto flex max-w-page items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 md:px-20">
          <a href="/" className="shrink-0">
            <img
              src={homeImages.logo}
              alt="Dr. Pet's House"
              className="h-[52px] w-auto object-contain sm:h-[59px]"
            />
          </a>

          <NavLinks />

          <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
            <NavSearchBar className="hidden lg:block" />

            <a href="/booking">
              <YellowButton className="h-[35px] min-w-[82px] px-3 py-2 text-[13px] tracking-[0.1px] sm:min-w-[109px] sm:px-[22px] sm:text-base sm:tracking-[0.15px]">
                ĐẶT LỊCH
              </YellowButton>
            </a>

            <YellowButton
              variant="outline"
              onClick={() => openAuth('login')}
              className="h-[35px] min-w-[82px] px-3 py-2 text-[13px] tracking-[0.1px] sm:min-w-[109px] sm:px-[22px] sm:text-base sm:tracking-[0.15px]"
            >
              ĐĂNG NHẬP
            </YellowButton>

            <button
              type="button"
              onClick={openCart}
              className="hidden shrink-0 cursor-pointer border-0 bg-transparent p-0 min-[520px]:block"
              aria-label="Giỏ hàng"
            >
              <img src={cartIcon} alt="" className="h-9 w-9" />
            </button>
          </div>
        </div>
      </header>
      <div className="hidden h-[88px] shrink-0 lg:block" aria-hidden="true" />
    </>
  )
}

export default NavBarGuest
