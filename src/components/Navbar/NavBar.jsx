/**
 * Navbar chính — chọn state theo đăng nhập.
 * - Chưa đăng nhập: NavBarGuest (ĐẶT LỊCH + ĐĂNG NHẬP)
 * - Đã đăng nhập: NavBarAuthenticated (Figma NavBar_state)
 *
 * Khi có Redux userSlice, truyền isAuthenticated từ access_token hoặc dùng useSelector tại đây.
 */
import NavBarAuthenticated from "./NavBarAuthenticated";
import NavBarGuest from "./NavBarGuest";
import MobileNavBar from "./MobileNavBar";
import { useAuth } from "../../context/AuthContext";

function NavBar({ avatarSrc, onLogout }) {
  const { isAuthenticated, logout } = useAuth();

  if (isAuthenticated) {
    return (
      <>
        <MobileNavBar isAuthenticated avatarSrc={avatarSrc} />
        <NavBarAuthenticated avatarSrc={avatarSrc} onLogout={onLogout ?? logout} />
      </>
    );
  }

  return (
    <>
      <MobileNavBar isAuthenticated={false} avatarSrc={avatarSrc} />
      <NavBarGuest />
    </>
  );
}

export default NavBar;
