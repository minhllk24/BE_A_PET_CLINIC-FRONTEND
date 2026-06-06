import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CanvasLayout from "../components/layout/CanvasLayout";
import Breadcrumb from "../components/layout/Breadcrumb";
import Footer from "../components/layout/Footer";
import NavBar from "../components/Navbar";
import ShoppingProductCard from "../components/product/ShoppingProductCard";
import { productImages } from "../assets/productImages";
import { TEST_AUTHENTICATED } from "../config/devFlags";
import {
  PRODUCT_CATEGORIES as CATEGORIES,
  PRODUCT_PRICE_RANGES as PRICE_RANGES,
  SHOP_PRODUCTS as ALL_PRODUCTS,
} from "../data/shopData";

const PAGE_SIZE = 20;

function FilterHeading({ children }) {
  return (
    <div className="flex items-center gap-[17px]">
      <span className="h-[24px] w-[3px] bg-[#1976D2]" />
      <h3 className="text-[22px] font-bold leading-none text-[#0D47A1]">{children}</h3>
    </div>
  );
}

function FilterSidebar({
  selectedCategory,
  selectedPrice,
  onCategoryChange,
  onPriceChange,
  onClear,
}) {
  return (
    <aside className="w-[240px] shrink-0 pt-[75px]">
      <div className="flex h-[33px] items-center gap-[10px]">
        <svg className="h-[33px] w-[33px]" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5h16l-6.2 7.2V19l-3.6-2v-4.8L4 5Z" fill="currentColor" />
        </svg>
        <h2 className="whitespace-nowrap text-[24px] font-bold leading-[32px] text-black">
          Bộ lọc tìm kiếm
        </h2>
      </div>

      <div className="mt-[24px] rounded-[40px] border border-[rgba(25,118,210,0.5)] bg-white px-[30px] py-[40px]">
        <FilterHeading>Danh mục</FilterHeading>
        <div className="mt-[24px] flex flex-col gap-[16px]">
          {CATEGORIES.map((category, index) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => onCategoryChange(selectedCategory === index ? null : index)}
              className={`flex w-[196px] items-center justify-between text-left text-[16px] leading-[27px] transition-colors ${
                selectedCategory === index ? "font-medium text-[#0D47A1]" : "text-[#414141] hover:text-[#0D47A1]"
              }`}
            >
              <span>{category.label} ({category.count})</span>
              <img
                src={productImages.chevronDown}
                alt=""
                className={`h-5 w-5 transition-transform ${selectedCategory === index ? "rotate-180" : ""}`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-[24px] rounded-[30px] border border-[rgba(25,118,210,0.5)] bg-white px-[30px] py-[40px]">
        <FilterHeading>Khoảng giá</FilterHeading>
        <div className="mt-[24px] flex flex-col gap-[16px]">
          {PRICE_RANGES.map((range, index) => (
            <label
              key={range.label}
              className="flex cursor-pointer items-center gap-[20px] text-[16px] leading-[24px] text-[#414141]"
            >
              <input
                type="checkbox"
                checked={selectedPrice === index}
                onChange={() => onPriceChange(selectedPrice === index ? null : index)}
                className="sr-only"
              />
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border ${
                  selectedPrice === index
                    ? "border-blue-900 bg-blue-900"
                    : "border-[#D9D9D9] bg-white"
                }`}
              >
                {selectedPrice === index && (
                  <span className="text-[14px] leading-none text-white">✓</span>
                )}
              </span>
              <span className="whitespace-nowrap">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-[24px] flex justify-center">
        <button
          type="button"
          onClick={onClear}
          className="h-[42px] rounded-[4px] bg-[#FFF176] px-[22px] text-[15px] font-medium uppercase tracking-[0.46px] text-black shadow-elevation transition-colors hover:bg-[#FDD835]"
        >
          Xóa bộ lọc
        </button>
      </div>
    </aside>
  );
}

function SearchAndSort({ search, onSearchChange, sortOrder, onSortChange }) {
  return (
    <div className="flex gap-[10px]">
      <label className="flex h-[56px] w-[749px] items-center justify-between rounded-[42px] border border-[rgba(25,118,210,0.5)] bg-white/80 py-2 pl-5 pr-2 backdrop-blur-[11px]">
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Bạn đang tìm kiếm gì?"
          className="min-w-0 flex-1 bg-transparent text-[16px] text-[#5F5F5F] outline-none placeholder:text-[#5F5F5F]"
        />
        <span className="flex h-10 w-10 items-center justify-center rounded-full">
          <img src={productImages.searchIcon} alt="" className="h-6 w-6" />
        </span>
      </label>

      <label className="flex h-[56px] w-[187px] cursor-pointer items-center gap-[14px] rounded-[42px] border border-[rgba(25,118,210,0.5)] bg-white px-[17px]">
        <svg className="h-4 w-[18px] shrink-0 text-[#414141]" viewBox="0 0 18 12" aria-hidden="true">
          <path d="M1 1h16M1 6h10M1 11h5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <select
          value={sortOrder}
          onChange={(event) => onSortChange(event.target.value)}
          className="w-full cursor-pointer appearance-none bg-transparent text-center text-[16px] font-medium tracking-[0.5px] text-[rgba(0,0,0,0.87)] outline-none"
          aria-label="Sắp xếp giá"
        >
          <option value="default">Sắp xếp giá</option>
          <option value="asc">Giá tăng dần</option>
          <option value="desc">Giá giảm dần</option>
        </select>
      </label>
    </div>
  );
}

function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <div className="flex h-[532px] items-center justify-center text-[18px] text-[#414141]">
        Không tìm thấy sản phẩm phù hợp.
      </div>
    );
  }

  return (
    <div className="grid w-[946px] grid-cols-5 gap-x-[24px] gap-y-[64px]">
      {products.map((product) => (
        <ShoppingProductCard
          key={product.id}
          product={product}
          href="/product-details"
        />
      ))}
    </div>
  );
}

function LoadMore({ shown, total, hasMore, isLoading, onLoadMore }) {
  return (
    <div className="mx-auto mt-[32px] flex h-[202px] w-[498px] flex-col items-center gap-[26px] py-[24px]">
      <p className="text-[16px] leading-[27px] text-[#414141]">
        Hiển thị 1–{shown} trong {total} sản phẩm
      </p>
      <div className="relative h-px w-full bg-[#90CAF9]">
        <span
          className="absolute inset-y-0 left-0 bg-[#1976D2]"
          style={{ width: `${Math.min(100, (shown / Math.max(total, 1)) * 100)}%` }}
        />
      </div>
      {hasMore && (
        <button
          type="button"
          onClick={onLoadMore}
          disabled={isLoading}
          className="flex h-[42px] items-center gap-1 rounded-[4px] bg-[#FDD835] px-[22px] text-[15px] font-medium uppercase tracking-[0.46px] text-black shadow-elevation transition-colors hover:bg-[#FDD835] disabled:opacity-60"
        >
          {isLoading ? "Đang tải..." : "Xem thêm"}
          {!isLoading && <img src={productImages.buttonChevron} alt="" className="h-[12px] w-[10px]" />}
        </button>
      )}
    </div>
  );
}

export default function ProductPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const categorySlug = searchParams.get("category");
    const keyword = searchParams.get("keyword");
    const categoryIndex = CATEGORIES.findIndex((category) => category.slug === categorySlug);
    if (categoryIndex >= 0) setSelectedCategory(categoryIndex);
    setSearch(keyword ?? "");
    setDisplayCount(PAGE_SIZE);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("vi");
    const products = ALL_PRODUCTS.filter((product) => {
      if (selectedCategory !== null && product.categoryIdx !== selectedCategory) return false;
      if (selectedPrice !== null) {
        const range = PRICE_RANGES[selectedPrice];
        if (product.price < range.min || product.price > range.max) return false;
      }
      return !normalizedSearch || product.name.toLocaleLowerCase("vi").includes(normalizedSearch);
    });

    if (sortOrder === "asc") return [...products].sort((a, b) => a.price - b.price);
    if (sortOrder === "desc") return [...products].sort((a, b) => b.price - a.price);
    return products;
  }, [search, selectedCategory, selectedPrice, sortOrder]);

  const displayedProducts = filteredProducts.slice(0, displayCount);

  const resetDisplayCount = useCallback((setter, value) => {
    setter(value);
    setDisplayCount(PAGE_SIZE);
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategory(null);
    setSelectedPrice(null);
    setDisplayCount(PAGE_SIZE);
  }, []);

  const loadMore = useCallback(() => {
    setIsLoading(true);
    window.setTimeout(() => {
      setDisplayCount((count) => count + PAGE_SIZE);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <CanvasLayout>
        <NavBar isAuthenticated={TEST_AUTHENTICATED} />

        <Breadcrumb
          items={[
            { label: "Mua sắm", to: "/petshop" },
            { label: "Danh mục sản phẩm" },
          ]}
        />

        <main className="min-h-[1607px] bg-[linear-gradient(180deg,#FFFFFF_0%,#E5F6FD_100%)] px-[120px] pt-[24px]">
          <div className="flex gap-[24px]">
            <FilterSidebar
              selectedCategory={selectedCategory}
              selectedPrice={selectedPrice}
              onCategoryChange={(value) => resetDisplayCount(setSelectedCategory, value)}
              onPriceChange={(value) => resetDisplayCount(setSelectedPrice, value)}
              onClear={clearFilters}
            />

            <section className="w-[950px]">
              <h1 className="text-[36px] font-bold leading-[42px] text-[#3D3D3D]">
                Danh mục sản phẩm của chúng tôi
              </h1>
              <div className="mt-[32px]">
                <SearchAndSort
                  search={search}
                  onSearchChange={(value) => resetDisplayCount(setSearch, value)}
                  sortOrder={sortOrder}
                  onSortChange={(value) => resetDisplayCount(setSortOrder, value)}
                />
              </div>
              <p className="mt-[27px] text-[16px] leading-[27px] text-[#414141]">
                Kết quả tìm kiếm cho {search ? `"${search}"` : "..."}
              </p>
              <div className="mt-[32px]">
                <ProductGrid products={displayedProducts} />
              </div>
              <LoadMore
                shown={displayedProducts.length}
                total={filteredProducts.length}
                hasMore={displayedProducts.length < filteredProducts.length}
                isLoading={isLoading}
                onLoadMore={loadMore}
              />
            </section>
          </div>
        </main>

        <Footer />
      </CanvasLayout>
    </div>
  );
}
