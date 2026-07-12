import { Link } from "react-router-dom";
import { navbarImages } from "../../assets/navbarImages";
import { USER_MENU_LINKS, USER_MENU_LOGOUT } from "./userMenuLinks";
import { useAuth } from "../../context/AuthContext";

const linkClass =
  "block rounded-xl px-4 py-3 text-[15px] text-gray-700 transition hover:bg-yellow-50 hover:text-yellow-600";

function NavUserMenu({ avatarSrc, onLogout }) {
  const { logout } = useAuth();
  const avatar = avatarSrc ?? navbarImages.avatarPlaceholder;

  const handleLogout = (e) => {
    e.preventDefault();
    (onLogout ?? logout)();
  };

  return (
    <div className="group relative shrink-0">
      <button
        type="button"
        className="overflow-hidden rounded-full border border-black transition hover:opacity-90"
        aria-label="Menu tài khoản"
        aria-haspopup="true"
      >
        <img src={avatar} alt="" className="h-9 w-9 object-cover" />
      </button>

      {/* pt-2: vùng đệm để di chuột từ avatar xuống menu không bị mất hover */}
      <div className="invisible absolute right-0 top-full z-50 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
        <div className="min-w-[260px] rounded-2xl border border-gray-100 bg-white p-3 shadow-lg">
          <ul className="space-y-0.5">
            {USER_MENU_LINKS.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <div className="group/sub relative">
                    <Link to={item.href} className={`${linkClass} pr-8 font-medium`}>
                      {item.label}
                      <span
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        aria-hidden
                      >
                        ›
                      </span>
                    </Link>
                    <ul className="invisible absolute right-full top-0 z-10 mr-1 min-w-[220px] rounded-2xl border border-gray-100 bg-white p-3 opacity-0 shadow-lg transition-all duration-200 group-hover/sub:visible group-hover/sub:opacity-100">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link to={child.href} className={linkClass}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link to={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-2 border-t border-gray-100 pt-2">
            <a
              href={USER_MENU_LOGOUT.href}
              className={`${linkClass} font-medium text-red-600 hover:bg-red-50 hover:text-red-700`}
              onClick={handleLogout}
            >
              {USER_MENU_LOGOUT.label}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavUserMenu;
