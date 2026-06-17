import { Link } from "react-router-dom";
import { productImages } from "../../assets/productImages";

function Breadcrumb({
  items,
  className = "",
  listClassName = "",
  linkClassName = "",
  currentClassName = "",
  separatorClassName = "",
  variant = "default",
}) {
  const isBlog = variant === "blog";

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex ${
        isBlog
          ? "h-7 items-center bg-transparent text-[12px] font-medium leading-4"
          : "h-[56px] items-end bg-white px-[120px] text-[16px] leading-[24px]"
      } ${className}`}
    >
      <ol className={`flex min-w-0 items-center gap-2 ${isBlog ? "w-full" : ""} ${listClassName}`}>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className={`flex items-center gap-2 ${
                isBlog ? (isCurrent ? "min-w-0 flex-1" : "shrink-0") : "min-w-0"
              }`}
            >
              {index > 0 && (
                <img
                  src={productImages.chevronRight}
                  alt=""
                  className={`shrink-0 ${isBlog ? "h-[6px] w-[4px]" : "h-2 w-2"} ${separatorClassName}`}
                />
              )}
              {item.to && !isCurrent ? (
                <Link
                  to={item.to}
                  className={`whitespace-nowrap transition-colors hover:text-[#1976D2] hover:underline ${
                    linkClassName || (isBlog ? "text-[#414753] hover:no-underline" : "text-[#0D47A1]")
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`${isCurrent ? "min-w-0" : "whitespace-nowrap"} ${
                    isCurrent
                      ? currentClassName || (isBlog ? "font-semibold text-[#005AB4]" : "truncate text-[#414141]")
                      : linkClassName || (isBlog ? "text-[#414753]" : "text-[#0D47A1]")
                  }`}
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
