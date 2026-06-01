import { navbarImages } from "../../assets/navbarImages";

function NavSearchBar({ className = "" }) {
  return (
    <div className={`group relative h-[37px] w-[204px] shrink-0 ${className}`}>
      <div className="absolute inset-0 rounded border border-secondary transition-colors duration-micro group-focus-within:border-[#1976D2]" />
      <img
        src={navbarImages.dogSearch}
        alt=""
        className="pointer-events-none absolute left-0 top-0 h-[37px] w-[39px] object-cover"
        aria-hidden
      />
      <input
        type="search"
        placeholder="Bạn muốn tìm gì nè?"
        className="input-search pl-10 pr-10 text-xs tracking-[0.4px] text-black/87"
        aria-label="Tìm kiếm"
      />
      <img
        src={navbarImages.searchIcon}
        alt=""
        className="pointer-events-none absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 opacity-70 transition-opacity duration-micro group-focus-within:opacity-100"
        aria-hidden
      />
    </div>
  );
}

export default NavSearchBar;
