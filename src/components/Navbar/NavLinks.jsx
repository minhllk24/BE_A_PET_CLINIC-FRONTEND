import { NavLink, useLocation } from "react-router-dom";
import { NAV_LINKS } from "./navbarMenuLinks";

function NavLinks({ className = "" }) {
  const location = useLocation();

  return (
    <nav
      className={`hidden flex-1 items-center justify-center gap-[22px] lg:flex ${className}`}
      aria-label="Menu chính"
    >
      {NAV_LINKS.map((item) => (
        <div key={item.label} className="group relative">
          <NavLink
            to={item.href}
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-link-active" : ""}`
            }
            end={item.href === "/"}
          >
            {item.label}
          </NavLink>

          {item.children && (
            <div className="invisible absolute left-1/2 top-full z-50 min-w-[260px] -translate-x-1/2 translate-y-3 rounded-2xl border border-gray-100 bg-white p-4 opacity-0 shadow-lg transition-all duration-component ease-premium group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <ul className="space-y-1">
                {item.children.map((child) => {
                  const hideProductCategoryActive =
                    item.label === "Mua sắm" &&
                    ["/products", "/san-pham"].includes(location.pathname);

                  return (
                    <li key={child.label}>
                      <NavLink
                        to={child.href}
                        className={({ isActive }) =>
                          [
                            "block rounded-xl px-4 py-3 text-[15px] transition-colors duration-micro",
                            isActive && !hideProductCategoryActive
                              ? "bg-[#E3F2FD] font-medium text-blue-900"
                              : "text-gray-700 hover:bg-yellow-50 hover:text-blue-900",
                          ].join(" ")
                        }
                      >
                        {child.label}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

export default NavLinks;
