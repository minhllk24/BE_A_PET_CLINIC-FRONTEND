import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CanvasLayout from "../components/layout/CanvasLayout";
import Footer from "../components/layout/Footer";
import NavBar from "../components/Navbar";
import ProductCard from "../components/product/ProductCard";

import { productImages } from "../assets/productImages";
import { TEST_AUTHENTICATED } from "../config/devFlags";

/* ============================ MOCK DATA ============================ */

const CATEGORIES = [
  { label: "Thức ăn", slug: "thuc-an", count: 12 },
  { label: "Đồ dùng thiết yếu", slug: "do-dung-thiet-yeu", count: 8 },
  { label: "Chăm sóc sức khỏe", slug: "cham-soc-suc-khoe", count: 15 },
  { label: "Đồ chơi", slug: "do-choi", count: 6 },
  { label: "Phụ kiện", slug: "phu-kien", count: 20 },
  { label: "Vệ sinh", slug: "ve-sinh", count: 4 },
];

const PRICE_RANGES = [
  { label: "$20.00 - $50.00", min: 20, max: 50 },
  { label: "$50.00 - $100.00", min: 50, max: 100 },
  { label: "$100.00 - $200.00", min: 100, max: 200 },
  { label: "$200.00+", min: 200, max: Infinity },
];

const PAGE_SIZE = 20;

/* Mock products: 45 total items, keyed by category index */
const ALL_PRODUCTS = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
  categoryIdx: i % CATEGORIES.length,
  price: 20 + (i * 7) % 180,
  name: `Sản phẩm ${i + 1}`,
}));

/* ============================ SIDEBAR ============================ */

function SidebarAccordion({ title, children, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-[40px] border border-[#90CAF9] bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-[17px] px-[30px] py-[40px] text-left transition-colors duration-micro hover:bg-[#f5f9ff] focus-ring-brand"
      >
        <div className="-rotate-90">
          <img src={productImages.sidebarLine} alt="" className="h-0 w-[24px]" />
        </div>
        <span className="flex-1 font-['Roboto'] text-[22px] text-[#2D2D2D]">{title}</span>
        <img
          src={productImages.chevronDown}
          alt=""
          className={`h-5 w-5 text-[#414141] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-[30px] pb-[40px]">{children}</div>
      </div>
    </div>
  );
}

function Sidebar({ selectedCategory, onCategoryChange, selectedPrice, onPriceChange }) {
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [pricesOpen, setPricesOpen] = useState(true);

  return (
    <aside className="sticky top-0 flex w-[286px] shrink-0 flex-col gap-[32px]">
      <SidebarAccordion
        title="Categories"
        isOpen={categoriesOpen}
        onToggle={() => setCategoriesOpen((v) => !v)}
      >
        <div className="flex flex-col gap-[4px]">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.label}
              type="button"
              onClick={() => onCategoryChange(selectedCategory === i ? null : i)}
              className={`group flex w-full items-center justify-between rounded-[8px] py-2 px-2 text-left transition-all duration-micro focus-ring-brand ${
                selectedCategory === i ? "bg-[#E3F2FD]" : "hover:bg-[#F5F5F5]"
              }`}
            >
              <span
                className={`font-['Roboto'] text-[16px] transition-colors duration-micro ${
                  selectedCategory === i
                    ? "font-medium text-[#0D47A1]"
                    : "text-[#414141] group-hover:text-[#0D47A1]"
                }`}
                style={{ lineHeight: "27.28px" }}
              >
                {cat.label} ({cat.count})
              </span>
              {selectedCategory === i && (
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#0D47A1] text-[10px] text-white">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </SidebarAccordion>

      <SidebarAccordion
        title="Price Range"
        isOpen={pricesOpen}
        onToggle={() => setPricesOpen((v) => !v)}
      >
        <div className="flex flex-col gap-[4px]">
          {PRICE_RANGES.map((range, i) => (
            <button
              key={range.label}
              type="button"
              onClick={() => onPriceChange(selectedPrice === i ? null : i)}
              className={`group flex items-center gap-[12px] rounded-[8px] py-1.5 px-2 text-left transition-all duration-micro focus-ring-brand ${
                selectedPrice === i ? "bg-[#E3F2FD]" : "hover:bg-[#F5F5F5]"
              }`}
            >
              <span className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
                {selectedPrice === i ? (
                  <img src={productImages.checkboxChecked} alt="" className="h-full w-full object-contain" />
                ) : (
                  <img
                    src={productImages.checkboxEmpty}
                    alt=""
                    className="h-full w-full object-contain opacity-60 transition-opacity duration-micro group-hover:opacity-100"
                  />
                )}
              </span>
              <span
                className={`font-['Roboto'] text-[16px] transition-colors duration-micro ${
                  selectedPrice === i ? "font-medium text-[#0D47A1]" : "text-[#414141] group-hover:text-[#0D47A1]"
                }`}
                style={{ lineHeight: "27.28px" }}
              >
                {range.label}
              </span>
            </button>
          ))}
        </div>
      </SidebarAccordion>

      {(selectedCategory !== null || selectedPrice !== null) && (
        <button
          type="button"
          onClick={() => {
            onCategoryChange(null);
            onPriceChange(null);
          }}
          className="flex items-center justify-center rounded-[12px] border border-[#90CAF9] bg-white py-2.5 text-[14px] font-medium text-[#0D47A1] transition-all duration-micro hover:bg-[#E3F2FD] focus-ring-brand"
        >
          ✕ Xóa bộ lọc
        </button>
      )}
    </aside>
  );
}

/* ============================ SEARCH BAR ============================ */

function SearchBar({ value, onChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`flex h-[56px] w-[946px] items-center justify-between rounded-[42px] border bg-white/80 pl-[20px] pr-[8px] backdrop-blur-[11px] transition-all duration-micro ${
        focused ? "border-[#1976D2] shadow-[0_0_0_1px_#1976D2]" : "border-[rgba(25,118,210,0.3)]"
      }`}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search An Item"
        className="flex-1 bg-transparent font-['Roboto'] text-[16px] text-[#5F5F5F] outline-none placeholder:text-[#5F5F5F]"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="mr-1 flex h-7 w-7 items-center justify-center rounded-full text-[#949494] transition-colors hover:bg-[#f0f0f0] hover:text-[#414141] focus-ring-brand"
          aria-label="Xóa tìm kiếm"
        >
          ✕
        </button>
      )}
      <div className="flex h-[40px] w-[40px] items-start rounded-[24px] p-[11px]">
        <img src={productImages.searchIcon} alt="" className="h-[24px] w-[24px] object-contain" />
      </div>
    </div>
  );
}

/* ============================ COLLECTION HEADER ============================ */

function CollectionHeader({ searchValue, onSearchChange, totalCount }) {
  const pageCount = PAGE_SIZE;

  return (
    <div className="relative h-[219px] w-[946px]">
      <h1 className="absolute left-0 top-0 font-['Roboto'] text-[36px] font-bold text-[#3D3D3D]">
        Our Collection Of Products
      </h1>

      <div className="absolute left-0 top-[77px]">
        <SearchBar value={searchValue} onChange={onSearchChange} />
      </div>

      <div className="absolute left-0 top-[165px] h-[54px] w-[946px]">
        <div className="ml-[12px] h-[54px] w-[922px]">
          <p
            className="font-['Roboto'] text-[16px] text-[#414141]"
            style={{ lineHeight: "27.28px" }}
          >
            Hiện thị 1–{Math.min(pageCount, totalCount)} trong {totalCount} sản phẩm
          </p>
          <p
            className="font-['Roboto'] text-[16px] text-[#949494]"
            style={{ lineHeight: "27.28px" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================ PRODUCT GRID ============================ */

function ProductRow({ products }) {
  return (
    <div className="flex gap-[24px]">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          name={p.name}
          price={`$${p.price}.00`}
          oldPrice={`$${(p.price * 1.6).toFixed(2)}`}
          href="/product-details"
        />
      ))}
    </div>
  );
}

function ProductGrid({ products, hasMore }) {
  if (products.length === 0) {
    return (
      <div className="mt-[64px] flex flex-col items-center justify-center gap-4 py-[80px]">
        <div className="text-[48px]">🔍</div>
        <p className="font-['Roboto'] text-[20px] text-[#414141]">Không tìm thấy sản phẩm</p>
        <p className="font-['Roboto'] text-[16px] text-[#949494]">
          Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
        </p>
      </div>
    );
  }

  const rows = [];
  for (let i = 0; i < products.length; i += 5) {
    rows.push(products.slice(i, i + 5));
  }

  return (
    <div className="mt-[32px] flex flex-col gap-[64px]">
      {rows.map((row, idx) => (
        <ProductRow key={idx} products={row} />
      ))}
    </div>
  );
}

/* ============================ PAGINATION ============================ */

function Pagination({ hasMore, onLoadMore, isLoading }) {
  if (!hasMore) return null;

  return (
    <div className="relative flex h-[202px] w-[498px] flex-col items-center gap-[26px] py-[24px]">
      {/* Progress bar */}
      <div className="relative h-px w-[498.004px]">
        <div className="absolute left-0 top-0 h-px w-[498.004px] bg-[#90CAF9]" />
        <div className="absolute left-0 top-0 h-px w-[286.002px] bg-[#1976D2]" />
      </div>

      {/* Load more button */}
      <div className="flex h-[74px] w-[202px] items-center justify-center px-[24px] py-[16px]">
        <button
          type="button"
          onClick={onLoadMore}
          disabled={isLoading}
          className="flex h-[42px] w-[154px] items-center justify-center gap-[8px] rounded-[4px] bg-[#FFF176] px-[22px] py-[8px] shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)] transition-all duration-micro hover:bg-[#ffe454] hover:shadow-[0_4px_12px_rgba(253,216,53,0.4)] active:scale-[0.98] focus-ring-brand disabled:pointer-events-none disabled:opacity-60"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#3D3D3D] border-t-transparent" />
              <span className="whitespace-nowrap font-['Roboto'] text-[15px] font-medium uppercase tracking-[0.46px] text-black">
                Đang tải...
              </span>
            </span>
          ) : (
            <>
              <span className="whitespace-nowrap font-['Roboto'] text-[15px] font-medium uppercase tracking-[0.46px] text-black">
                Xem thêm
              </span>
              <span className="inline-flex h-[22px] w-[22px] items-center justify-center text-[22px] leading-none text-black">
                ›
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ============================ PAGE ============================ */

export default function ProductPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);

  /* Read category from URL query param */
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      const idx = CATEGORIES.findIndex((c) => c.slug === cat);
      if (idx !== -1) setSelectedCategory(idx);
    }
  }, [searchParams]);

  /* Filter + paginate */
  const filtered = useMemo(() => {
    return ALL_PRODUCTS.filter((p) => {
      if (selectedCategory !== null && p.categoryIdx !== selectedCategory) return false;
      if (selectedPrice !== null) {
        const r = PRICE_RANGES[selectedPrice];
        if (p.price < r.min || p.price > r.max) return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        if (!p.name.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [search, selectedCategory, selectedPrice]);

  const displayed = filtered.slice(0, displayCount);
  const hasMore = filtered.length > displayCount;

  const handleLoadMore = useCallback(() => {
    setIsLoading(true);
    /* Simulate backend fetch — replace with real API call */
    setTimeout(() => {
      setDisplayCount((prev) => prev + PAGE_SIZE);
      setIsLoading(false);
    }, 800);
  }, []);

  /* Reset display count when filters change */
  const handleSearch = useCallback((val) => {
    setSearch(val);
    setDisplayCount(PAGE_SIZE);
  }, []);

  const handleCategory = useCallback((idx) => {
    setSelectedCategory(idx);
    setDisplayCount(PAGE_SIZE);
  }, []);

  const handlePrice = useCallback((idx) => {
    setSelectedPrice(idx);
    setDisplayCount(PAGE_SIZE);
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#FFFFFF_0%,#E5F6FD_100%)]">
      <CanvasLayout>
        <NavBar isAuthenticated={TEST_AUTHENTICATED} />

        <div className="flex w-[1440px] gap-[32px] bg-[linear-gradient(180deg,#FFFFFF_0%,#E5F6FD_100%)] pl-[100px] pt-[32px]">
          <Sidebar
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategory}
            selectedPrice={selectedPrice}
            onPriceChange={handlePrice}
          />

          <section className="flex w-[946px] flex-col pb-[24px]">
            <CollectionHeader
              searchValue={search}
              onSearchChange={handleSearch}
              totalCount={filtered.length}
            />
            <ProductGrid products={displayed} hasMore={hasMore} />
            <div className="flex justify-center pt-[32px]">
              <Pagination
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
                isLoading={isLoading}
              />
            </div>
          </section>
        </div>

        <Footer />
      </CanvasLayout>
    </div>
  );
}
