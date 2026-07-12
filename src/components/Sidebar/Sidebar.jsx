import { useNavigate, useLocation } from "react-router-dom";
import {
  UserOutlined,
  CalendarOutlined,
  ShoppingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import { USER_MENU_LINKS } from "../Navbar/userMenuLinks";

const PawIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
    <path d="M19.0803 15.7199C18.4903 12.1899 15.1003 9.31995 11.5203 9.31995C7.63028 9.31995 4.21028 12.4699 3.88028 16.3499C3.75028 17.8499 4.23028 19.2699 5.22028 20.3399C6.20028 21.4099 7.58028 21.9999 9.08028 21.9999H13.7603C15.4503 21.9999 16.9303 21.3399 17.9403 20.1499C18.9503 18.9599 19.3503 17.3799 19.0803 15.7199Z"/>
    <path d="M10.2796 7.86C11.8978 7.86 13.2096 6.54819 13.2096 4.93C13.2096 3.31181 11.8978 2 10.2796 2C8.66141 2 7.34961 3.31181 7.34961 4.93C7.34961 6.54819 8.66141 7.86 10.2796 7.86Z"/>
    <path d="M16.94 9.03002C18.2876 9.03002 19.38 7.9376 19.38 6.59002C19.38 5.24245 18.2876 4.15002 16.94 4.15002C15.5924 4.15002 14.5 5.24245 14.5 6.59002C14.5 7.9376 15.5924 9.03002 16.94 9.03002Z"/>
    <path d="M20.5496 12.93C21.6266 12.93 22.4996 12.057 22.4996 10.98C22.4996 9.90307 21.6266 9.03003 20.5496 9.03003C19.4727 9.03003 18.5996 9.90307 18.5996 10.98C18.5996 12.057 19.4727 12.93 20.5496 12.93Z"/>
    <path d="M3.94 10.98C5.28757 10.98 6.38 9.88755 6.38 8.53998C6.38 7.1924 5.28757 6.09998 3.94 6.09998C2.59243 6.09998 1.5 7.1924 1.5 8.53998C1.5 9.88755 2.59243 10.98 3.94 10.98Z"/>
  </svg>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuIcons = {
    "Thông tin người dùng": UserOutlined,
    "Quản lý thú cưng": PawIcon,
    "Lịch sử đặt lịch": CalendarOutlined,
    "Đơn hàng của tôi": ShoppingOutlined,
  };

  const menuItems = [
    ...USER_MENU_LINKS.map((item) => ({
      id: item.href,
      label: item.label,
      icon: menuIcons[item.label],
      path: item.href,
    })),
  ];

  // LOGIC ACTIVE MỚI NHẤT
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="w-[342px] flex-shrink-0 bg-[#e5f6fd] border-r border-[#c1c6d5]/30 h-full flex flex-col py-8 px-4 z-10 relative">
      <nav className="flex-1 space-y-2 overflow-y-auto pr-1" style={{ scrollbarWidth: 'none' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <div
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`
                flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer
                transition-all duration-200 ease-in-out
                ${
                  active
                    ? "bg-[#06105a] text-white shadow-sm"
                    : "text-[#2e3340] hover:bg-[#d4effa] hover:text-[#06105a]"
                }
              `}
            >
              <Icon className="text-xl w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-[15px] whitespace-nowrap">
                {item.label}
              </span>
            </div>
          );
        })}
      </nav>

      <div
        onClick={handleLogout}
        className="flex items-center gap-4 px-4 py-3 mt-4 rounded-lg cursor-pointer transition-all duration-200 ease-in-out text-[#414753] hover:bg-[#d4effa] flex-shrink-0"
      >
        <LogoutOutlined className="text-xl w-5 h-5 flex-shrink-0" />
        <span className="font-medium text-[15px] whitespace-nowrap">
          Đăng xuất
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
