/**
 * Navbar chính — chọn state theo đăng nhập.
 * - Chưa đăng nhập: NavBarGuest (ĐẶT LỊCH + ĐĂNG NHẬP)
 * - Đã đăng nhập: NavBarAuthenticated (Figma NavBar_state)
 *
 * Khi có Redux userSlice, truyền isAuthenticated từ access_token hoặc dùng useSelector tại đây.
 */
import NavBarAuthenticated from "./NavBarAuthenticated";
import NavBarGuest from "./NavBarGuest";
import { useAuth } from "../../context/AuthContext";

function NavBar({ avatarSrc, onLogout }) {
  const { isAuthenticated, logout } = useAuth();

  if (isAuthenticated) {
    return (
      <NavBarAuthenticated avatarSrc={avatarSrc} onLogout={onLogout ?? logout} />
    );
  }

  return <NavBarGuest />;
}

export default NavBar;
