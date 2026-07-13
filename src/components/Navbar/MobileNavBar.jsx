import { useEffect, useMemo, useState } from "react";
import { ChevronRight, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { homeImages } from "../../assets/homeImages";
import cartIcon from "../../assets/images/cart_icon.svg";
import { navbarImages } from "../../assets/navbarImages";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { getSearchSuggestions } from "../../data/searchResultsData";
import { formatVnd } from "../../utils/currency";
import { NAV_LINKS } from "./navbarMenuLinks";
import NotificationBell from "../Notifications/NotificationBell";

const SEARCH_DEBOUNCE_MS = 280;
const EMPTY_SUGGESTIONS = { suggestions: [], products: [], total: 0 };

function SearchAssetIcon({ className = "size-[18px]" }) {
  return (
    <img src={navbarImages.searchIcon} alt="" className={className} aria-hidden="true" />
  );
}

function FigmaMenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="17"
      viewBox="0 0 20 17"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18.4209 14.25C18.766 14.2502 19.0955 14.3766 19.3418 14.5996C19.5877 14.8224 19.732 15.1238 19.748 15.4404C19.7641 15.7569 19.6511 16.0692 19.4297 16.3125C19.2086 16.5553 18.8955 16.7107 18.5537 16.7432L18.4092 16.75H1.5791C1.23404 16.7498 0.904496 16.6234 0.658203 16.4004C0.412304 16.1776 0.268017 15.8762 0.251953 15.5596C0.235926 15.2431 0.348909 14.9308 0.570312 14.6875C0.791167 14.4449 1.10382 14.2885 1.44531 14.2559L1.59082 14.25H18.4209ZM1.5791 7.25H18.4209C18.7772 7.25 19.1169 7.38435 19.3652 7.62012C19.6132 7.85564 19.75 8.17274 19.75 8.5C19.75 8.82726 19.6132 9.14436 19.3652 9.37988C19.1169 9.61565 18.7772 9.75 18.4209 9.75H1.5791C1.22276 9.75 0.883097 9.61565 0.634766 9.37988C0.386844 9.14436 0.25 8.82726 0.25 8.5C0.25 8.17274 0.386844 7.85564 0.634766 7.62012C0.883097 7.38435 1.22276 7.25 1.5791 7.25ZM1.5791 0.25H18.4209C18.7772 0.25 19.1169 0.384352 19.3652 0.620117C19.6132 0.855643 19.75 1.17274 19.75 1.5C19.75 1.82726 19.6132 2.14436 19.3652 2.37988C19.1169 2.61565 18.7772 2.75 18.4209 2.75H1.5791C1.22276 2.75 0.883097 2.61565 0.634766 2.37988C0.386844 2.14436 0.25 1.82726 0.25 1.5C0.25 1.17274 0.386844 0.855643 0.634766 0.620117C0.883097 0.384352 1.22277 0.25 1.5791 0.25Z"
        fill="#FDD835"
        stroke="black"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function MobileSearchPanel({ open, onClose }) {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const [suggestions, setSuggestions] = useState(EMPTY_SUGGESTIONS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const query = term.trim();

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  useEffect(() => {
    if (!query) {
      setSuggestions(EMPTY_SUGGESTIONS);
      setIsLoading(false);
      setError("");
      return undefined;
    }

    setIsLoading(true);
    setError("");
    const timer = window.setTimeout(() => {
      try {
        setSuggestions(getSearchSuggestions(query));
      } catch {
        setSuggestions(EMPTY_SUGGESTIONS);
        setError("Không thể tải gợi ý tìm kiếm");
      } finally {
        setIsLoading(false);
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [query]);

  const searchByKeyword = (keyword) => {
    const nextQuery = keyword.trim();
    onClose();
    navigate(nextQuery ? `/search?q=${encodeURIComponent(nextQuery)}` : "/search");
  };

  if (!open) return null;

  const visibleSuggestions = query ? suggestions.suggestions : getSearchSuggestions("tắm").suggestions;
  const visibleProducts = query ? suggestions.products : getSearchSuggestions("tắm").products;
  const displayQuery = query || "tắm";

  return (
    <div className="fixed inset-0 z-[95] bg-[rgba(6,16,90,0.2)] backdrop-blur-[6px] lg:hidden" role="dialog" aria-label="Tìm kiếm">
      <div className="mobile-panel-enter h-full w-full bg-white">
        <div className="flex h-12 w-full items-center justify-center bg-white px-[15px]">
          <form
            className="flex h-[26px] min-w-0 flex-1 items-center justify-between gap-[13px]"
            onSubmit={(event) => {
              event.preventDefault();
              searchByKeyword(term);
            }}
          >
            <label className="relative h-[26px] min-w-0 flex-1">
              <span className="absolute inset-0 rounded border border-[#FDD835]" />
              <img src={navbarImages.dogSearch} alt="" className="absolute -left-0.5 top-px h-[25px] w-[27px] object-cover" />
              <input
                autoFocus
                type="search"
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder="Bạn muốn tìm gì nè?"
                className="absolute inset-0 rounded bg-transparent pl-[42px] pr-9 font-['Roboto'] text-[12px] leading-[20px] tracking-[0.4px] text-black/87 outline-none placeholder:text-black/40"
                aria-label="Tìm kiếm"
              />
              <button type="submit" className="absolute right-[10px] top-1/2 -translate-y-1/2" aria-label="Tìm kiếm">
                <SearchAssetIcon />
              </button>
            </label>
            <button type="button" onClick={onClose} className="flex h-[26px] w-[18px] items-center justify-center" aria-label="Đóng tìm kiếm">
              <X aria-hidden="true" className="size-[18px] text-[#0D47A1]" strokeWidth={2.5} />
            </button>
          </form>
        </div>

        <div className="h-[calc(100vh-48px)] overflow-y-auto bg-[#FFFDE7] pt-1">
          <section className="flex w-full flex-col gap-3 px-4 py-[10px]">
            <h2 className="font-['Roboto'] text-[16px] font-bold leading-6 tracking-[0.15px] text-[#353535]">Gợi ý phù hợp</h2>
            <div className="flex min-h-[172px] flex-col justify-between">
              {isLoading ? (
                <p className="rounded-[8px] border-b border-[#E0E0E0] p-2 font-['Roboto'] text-[14px] leading-6 text-black/60">Đang tải gợi ý...</p>
              ) : error ? (
                <p className="rounded-[8px] border-b border-[#E0E0E0] p-2 font-['Roboto'] text-[14px] leading-6 text-black/60">{error}</p>
              ) : (
                visibleSuggestions.slice(0, 4).map((suggestion, index) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    onClick={() => searchByKeyword(suggestion.label)}
                    className={[
                      "flex w-full items-center gap-3 rounded-[8px] border-b border-[#E0E0E0] p-2 text-left font-['Roboto'] text-[14px] italic leading-6",
                      index === 0 ? "bg-[#FFF59D] text-[#0D47A1]" : "text-black/87",
                    ].join(" ")}
                  >
                    <SearchAssetIcon />
                    <span className="min-w-0 truncate">{suggestion.label}</span>
                  </button>
                ))
              )}
            </div>
          </section>

          {visibleProducts.length > 0 && (
            <section className="flex w-full flex-col gap-3 px-4 py-[10px]">
              <h2 className="font-['Roboto'] text-[16px] font-bold leading-6 tracking-[0.15px] text-[#353535]">Sản phẩm liên quan</h2>
              <div className="grid grid-cols-2 gap-3">
                {visibleProducts.slice(0, 2).map((product, index) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate(product.href);
                    }}
                    className={`flex min-w-0 items-center gap-3 rounded-[8px] p-2 text-left ${index === 0 ? "bg-[#FFF9C4]" : "bg-[#FFF59D]"}`}
                  >
                    <img src={product.image} alt={product.name} className="size-12 shrink-0 rounded-[8px] object-cover" />
                    <span className="min-w-0">
                      <span className="block truncate font-['Roboto'] text-[13px] leading-[19.5px] text-black/87">{product.name}</span>
                      <span className="block truncate font-['Roboto'] text-[12px] leading-[18px] text-[#0D47A1]">{formatVnd(product.price)}</span>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

          <div className="px-4 py-[10px]">
            <button
              type="button"
              onClick={() => searchByKeyword(displayQuery)}
              className="flex h-[35px] w-full items-center justify-center rounded bg-[#F5F5F5] px-6 text-center font-['Roboto'] text-[14px] font-semibold leading-5 tracking-[0.28px] text-[#0D47A1]"
            >
              {`Xem tất cả kết quả cho "${displayQuery}"`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenuPanel({ open, onClose }) {
  const [expanded, setExpanded] = useState(() => new Set(["Dịch vụ"]));

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  const toggleSection = (label) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[95] bg-[rgba(6,16,90,0.2)] backdrop-blur-[6px] lg:hidden" role="dialog" aria-label="Menu chính">
      <div className="mobile-panel-enter flex h-full w-full flex-col bg-[#FFFDE7]">
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-[#ECEFF1] bg-white pr-[10px]">
          <Link to="/" onClick={onClose} className="flex h-12 min-w-[120px] items-center">
            <img src={homeImages.logo} alt="Dr. Pet's House" className="h-9 w-[82px] object-contain" />
          </Link>
          <button type="button" onClick={onClose} className="flex h-[30px] w-[30px] items-center justify-center" aria-label="Đóng menu">
            <X aria-hidden="true" className="size-[18px] text-[#0D47A1]" strokeWidth={2.5} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 pb-5 pt-[5px]" aria-label="Menu mobile">
          <ul className="flex flex-col gap-[5px]">
            {NAV_LINKS.map((item) => {
              const isExpanded = expanded.has(item.label);
              return (
                <li key={item.label}>
                  <div className="flex h-[35px] items-center justify-between border-b-[0.5px] border-[#0D47A1]">
                    <NavLink
                      to={item.href}
                      onClick={() => {
                        if (!item.children) onClose();
                      }}
                      className={({ isActive }) => [
                        "min-w-0 flex-1 font-['Roboto'] text-[12px] font-bold leading-[18px] tracking-[0.15px] text-[#0D47A1]",
                        isActive ? "underline decoration-[#FDD835] decoration-[1.5px] underline-offset-[3px]" : "",
                      ].join(" ")}
                      end={item.href === "/"}
                    >
                      {item.label}
                    </NavLink>
                    {item.children ? (
                      <button
                        type="button"
                        onClick={() => toggleSection(item.label)}
                        className="flex size-[18px] items-center justify-center text-[#0D47A1]"
                        aria-label={`${isExpanded ? "Thu gọn" : "Mở rộng"} ${item.label}`}
                        aria-expanded={isExpanded}
                      >
                        <ChevronRight aria-hidden="true" className={`size-[18px] transition-transform ${isExpanded ? "rotate-90" : ""}`} strokeWidth={1.8} />
                      </button>
                    ) : (
                      <ChevronRight className="size-[18px] text-[#0D47A1]" aria-hidden="true" strokeWidth={1.8} />
                    )}
                  </div>
                  {item.children && isExpanded && (
                    <ul className="flex flex-col gap-[5px] pl-5">
                      {item.children.map((child) => (
                        <li key={child.label} className="flex h-[35px] items-center border-b-[0.5px] border-[#1565C0] pr-5">
                          <NavLink
                            to={child.href}
                            onClick={onClose}
                            className="min-w-0 flex-1 truncate font-['Roboto'] text-[11px] font-normal leading-[16.5px] tracking-[0.15px] text-[#1565C0]"
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

function MobileNavBar({ isAuthenticated, avatarSrc }) {
  const [activePanel, setActivePanel] = useState(null);
  const { openCart } = useCart();
  const { openAuth } = useAuth();
  const avatar = avatarSrc ?? navbarImages.avatarPlaceholder;

  const closePanel = () => setActivePanel(null);
  const openMobileCart = () => {
    closePanel();
    openCart();
  };

  const rightGroupClass = useMemo(
    () => isAuthenticated
      ? "flex flex-1 items-center justify-between pl-[35px]"
      : "flex flex-1 items-center justify-end gap-[10.75px] pl-[35px]",
    [isAuthenticated],
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[70] h-12 border-b border-[#ECEFF1] bg-white pr-[10px] lg:hidden">
        <div className="flex h-full w-full items-center justify-between">
          <Link to="/" className="flex h-12 min-w-[100px] items-center">
            <img src={homeImages.logo} alt="Dr. Pet's House" className="h-9 w-[82px] object-contain" />
          </Link>

          <div className={`${rightGroupClass} max-w-[250px] min-w-[120px]`}>
            <button type="button" onClick={() => setActivePanel("search")} className="flex size-[22px] items-center justify-center" aria-label="Tìm kiếm">
              <SearchAssetIcon />
            </button>

            {isAuthenticated && (
              <NotificationBell
                className="inline-flex"
                buttonClassName="p-0"
                iconClassName="h-[22px] w-[22px]"
                badgeClassName="hidden"
              />
            )}

            <button type="button" onClick={openMobileCart} className="relative flex size-[22px] items-center justify-center" aria-label="Giỏ hàng">
              <img src={isAuthenticated ? navbarImages.cartYellow : cartIcon} alt="" className="size-[18px]" />
            </button>

            {isAuthenticated ? (
              <Link to="/thong-tin-nguoi-dung" className="flex size-[18px] items-center justify-center overflow-hidden rounded-full border border-black/80" aria-label="Tài khoản">
                <img src={avatar} alt="" className="size-full object-cover" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => openAuth("login")}
                className="flex h-[22px] w-[76px] items-center justify-center rounded bg-[#FDD835] px-[22px] py-2 shadow-elevation"
              >
                <span className="whitespace-nowrap font-['Roboto'] text-[9px] font-bold leading-[14.94px] tracking-[0.4px] text-black/87">ĐĂNG NHẬP</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setActivePanel("menu")}
              className="flex h-[22px] w-[21px] items-center justify-center"
              aria-label="Mở menu"
            >
              <FigmaMenuIcon />
            </button>
          </div>
        </div>
      </header>
      <div className="h-12 shrink-0 lg:hidden" aria-hidden="true" />

      <MobileSearchPanel open={activePanel === "search"} onClose={closePanel} />
      <MobileMenuPanel open={activePanel === "menu"} onClose={closePanel} />
    </>
  );
}

export default MobileNavBar;
