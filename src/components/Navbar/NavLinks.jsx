import { NAV_LINKS } from "./navbarMenuLinks";

function NavLinks({ className = "" }) {
  return (
    <nav
      className={`hidden flex-1 items-center justify-center gap-[22px] lg:flex ${className}`}
    >
      {NAV_LINKS.map((item) => (
        <div key={item.label} className="group relative">
          <a
            href={item.href}
            className="inline-flex items-center text-base leading-normal tracking-[0.15px] text-black transition hover:text-yellow-600"
          >
            {item.label}
          </a>

          {item.children && (
            <div className="invisible absolute left-1/2 top-full min-w-[260px] -translate-x-1/2 translate-y-3 rounded-2xl border border-gray-100 bg-white p-4 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <ul className="space-y-1">
                {item.children.map((child) => (
                  <li key={child.label}>
                    <a
                      href={child.href}
                      className="block rounded-xl px-4 py-3 text-[15px] text-gray-700 transition hover:bg-yellow-50 hover:text-yellow-600"
                    >
                      {child.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

export default NavLinks;
