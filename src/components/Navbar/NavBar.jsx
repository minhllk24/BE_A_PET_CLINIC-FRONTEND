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

function NavBar({ avatarSrc, onLogout, isAuthenticated: authenticatedProp }) {
  const { isAuthenticated, logout } = useAuth();
  const resolvedAuthenticated =
    typeof authenticatedProp === "boolean" ? authenticatedProp : isAuthenticated;

  if (resolvedAuthenticated) {
    return (
      <NavBarAuthenticated avatarSrc={avatarSrc} onLogout={onLogout ?? logout} />
    );
  }

  return <NavBarGuest />;
}

export default NavBar;
