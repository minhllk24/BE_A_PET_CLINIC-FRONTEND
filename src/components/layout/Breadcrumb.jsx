import { Link } from "react-router-dom";
import { productImages } from "../../assets/productImages";

function Breadcrumb({ items, className = "" }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex h-[56px] items-end bg-white px-[120px] text-[16px] leading-[24px] ${className}`}
    >
      <ol className="flex min-w-0 items-center gap-2">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-2">
              {index > 0 && (
                <img
                  src={productImages.chevronRight}
                  alt=""
                  className="h-2 w-2 shrink-0"
                />
              )}
              {item.to && !isCurrent ? (
                <Link
                  to={item.to}
                  className="whitespace-nowrap text-[#0D47A1] transition-colors hover:text-[#1976D2] hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`truncate ${isCurrent ? "text-[#414141]" : "text-[#0D47A1]"}`}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
