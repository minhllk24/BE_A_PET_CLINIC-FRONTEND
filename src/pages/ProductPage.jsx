import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ScaledCanvasLayout from "../components/layout/ScaledCanvasLayout";
import Breadcrumb from "../components/layout/Breadcrumb";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/Navbar";
import ShoppingProductCard from "../components/product/ShoppingProductCard";
import { productImages } from "../assets/productImages";
import { useAuth } from "../context/AuthContext";
import {
  PRODUCT_CATEGORIES as CATEGORIES,
  PRODUCT_PRICE_RANGES as PRICE_RANGES,
  SHOP_PRODUCTS as ALL_PRODUCTS,
} from "../data/shopData";

const PAGE_SIZE = 20;

function isPriceInRange(price, range) {
  if (!range) return false;
  if (range.max === Infinity) return price >= range.min;
  return price >= range.min && price < range.max;
}

function FilterHeading({ children }) {
  return (
    <div className="flex items-center gap-[17px]">
      <span className="h-[24px] w-[3px] rounded-full bg-[#0D47A1]" />
      <h3 className="text-[22px] font-bold leading-none text-[#0D47A1]">{children}</h3>
    </div>
  );
}

function FilterSidebar({
  categoryOptions,
  selectedCategories,
  selectedPrices,
  onCategoryChange,
  onPriceChange,
  onClear,
}) {
  return (
    <aside className="w-[283px] shrink-0 pt-[75px]">
      <div className="flex h-[33px] items-center gap-[10px]">
        <svg className="h-[33px] w-[33px]" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5h16l-6.2 7.2V19l-3.6-2v-4.8L4 5Z" fill="currentColor" />
        </svg>
        <h2 className="whitespace-nowrap text-[24px] font-bold leading-[32px] text-black">
          Bộ lọc tìm kiếm
        </h2>
      </div>

      <div className="mt-[24px] overflow-hidden rounded-[40px] border border-[rgba(25,118,210,0.5)] bg-white px-[30px] py-[40px]">
        <FilterHeading>Danh mục</FilterHeading>
        <div className="mt-[24px] flex flex-col gap-[16px]">
          {categoryOptions.map((category) => (
            <label
              key={category.id}
              className="flex cursor-pointer items-center gap-[20px] text-[#414141]"
            >
              <input
                type="checkbox"
                checked={
                  category.index === null
                    ? selectedCategories.length === 0
                    : selectedCategories.includes(category.index)
                }
                onChange={() => onCategoryChange(category.index)}
                className="size-5 accent-[#0D47A1]"
              />
              <span className="whitespace-nowrap text-[15px] leading-[27px]">
                {category.label} ({category.count})
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-[24px] overflow-hidden rounded-[40px] border border-[rgba(25,118,210,0.5)] bg-white px-[30px] py-[40px]">
        <FilterHeading>Khoảng giá</FilterHeading>
        <div className="mt-[24px] flex flex-col gap-[16px]">
          {PRICE_RANGES.map((range, index) => (
            <label
              key={range.label}
              className="flex cursor-pointer items-center gap-[20px] text-[#414141]"
            >
              <input
                type="checkbox"
                checked={selectedPrices.includes(index)}
                onChange={() => onPriceChange(index)}
                className="size-5 accent-[#0D47A1]"
              />
              <span className="whitespace-nowrap text-[15px] leading-[27px]">{range.label}</span>
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

function SearchAndSort({ search, onSearchChange, onSearch, onClearSearch, sortOrder, onSortChange }) {
  const inputRef = useRef(null);

  const selectSearchText = () => {
    if (search) {
      window.requestAnimationFrame(() => inputRef.current?.select());
    }
  };

  return (
    <form
      className="flex w-full gap-[10px]"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
    >
      <label className="flex h-[56px] min-w-0 flex-1 items-center justify-between rounded-[42px] border border-[rgba(25,118,210,0.5)] bg-white/80 py-2 pl-5 pr-2 backdrop-blur-[11px]">
        <input
          ref={inputRef}
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          onFocus={selectSearchText}
          placeholder="Bạn đang tìm kiếm gì?"
          className="min-w-0 flex-1 bg-transparent text-[16px] text-[#5F5F5F] outline-none placeholder:text-[#5F5F5F]"
        />
        {search && (
          <button
            type="button"
            onClick={() => {
              onClearSearch();
              inputRef.current?.focus();
            }}
            className="mr-1 flex h-8 w-8 items-center justify-center rounded-full text-[24px] leading-none text-[#5F5F5F] transition-colors hover:bg-[#E3F2FD] hover:text-[#0D47A1]"
            aria-label="Xóa tìm kiếm"
          >
            ×
          </button>
        )}
        <button
          type="submit"
          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[#FFF176]"
          aria-label="Tìm kiếm sản phẩm"
        >
          <img src={productImages.searchIcon} alt="" className="h-6 w-6" />
        </button>
      </label>

      <label className="flex h-[56px] w-[187px] shrink-0 cursor-pointer items-center gap-[14px] rounded-[42px] border border-[rgba(25,118,210,0.5)] bg-white px-[17px]">
        <svg className="h-4 w-[18px] shrink-0 text-[#414141]" viewBox="0 0 18 12" aria-hidden="true">
          <path d="M1 1h16M1 6h10M1 11h5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <select
          value={sortOrder}
          onChange={(event) => onSortChange(event.target.value)}
          className="w-full cursor-pointer appearance-none bg-transparent text-center text-[16px] font-medium tracking-[0.5px] text-[rgba(0,0,0,0.87)] outline-none"
          aria-label="Sắp xếp giá"
        >
          <option value="" disabled hidden>
            Sắp xếp giá
          </option>
          <option value="asc">Giá tăng dần</option>
          <option value="desc">Giá giảm dần</option>
        </select>
      </label>
    </form>
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
    <div className="grid w-full grid-cols-5 gap-x-[10.75px] gap-y-[64px]">
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
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const categorySlug = searchParams.get("category");
    const keyword = searchParams.get("keyword");
    const categoryIndex = CATEGORIES.findIndex((category) => category.slug === categorySlug);
    setSelectedCategories(categoryIndex >= 0 ? [categoryIndex] : []);
    setSearch(keyword ?? "");
    setSearchQuery(keyword ?? "");
    setDisplayCount(PAGE_SIZE);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLocaleLowerCase("vi");
    const products = ALL_PRODUCTS.filter((product) => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.categoryIdx)) return false;
      if (selectedPrices.length > 0) {
        const matchesSelectedPrice = selectedPrices.some((priceIndex) => {
          const range = PRICE_RANGES[priceIndex];
          return isPriceInRange(product.price, range);
        });
        if (!matchesSelectedPrice) return false;
      }
      return !normalizedSearch || product.name.toLocaleLowerCase("vi").includes(normalizedSearch);
    });

    if (sortOrder === "asc") return [...products].sort((a, b) => a.price - b.price);
    if (sortOrder === "desc") return [...products].sort((a, b) => b.price - a.price);
    return products;
  }, [searchQuery, selectedCategories, selectedPrices, sortOrder]);

  const categoryOptions = useMemo(() => {
    const categoryCounts = ALL_PRODUCTS.reduce((counts, product) => {
      const category = CATEGORIES[product.categoryIdx];
      if (!category) return counts;
      return {
        ...counts,
        [category.slug]: (counts[category.slug] || 0) + 1,
      };
    }, {});

    return [
      {
        id: "all-categories",
        label: "Tất cả danh mục",
        count: ALL_PRODUCTS.length,
        index: null,
      },
      ...CATEGORIES.map((category, index) => ({
        id: category.slug,
        label: category.label,
        count: categoryCounts[category.slug] || 0,
        index,
      })),
    ];
  }, []);

  const displayedProducts = filteredProducts.slice(0, displayCount);

  const resetDisplayCount = useCallback((setter, value) => {
    setter(value);
    setDisplayCount(PAGE_SIZE);
  }, []);

  const toggleCategory = useCallback((categoryIndex) => {
    setSelectedCategories((current) => {
      if (categoryIndex === null) return [];
      return current.includes(categoryIndex)
        ? current.filter((index) => index !== categoryIndex)
        : [...current, categoryIndex];
    });
    setDisplayCount(PAGE_SIZE);
  }, []);

  const togglePrice = useCallback((priceIndex) => {
    setSelectedPrices((current) =>
      current.includes(priceIndex)
        ? current.filter((index) => index !== priceIndex)
        : [...current, priceIndex],
    );
    setDisplayCount(PAGE_SIZE);
  }, []);

  const clearSearch = useCallback(() => {
    setSearch("");
    setSearchQuery("");
    setDisplayCount(PAGE_SIZE);
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedPrices([]);
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
    <div className="min-h-screen bg-[#f5f5f5]">
      <NavBar isAuthenticated={isAuthenticated} />
      <ScaledCanvasLayout className="bg-white">
        <Breadcrumb
          items={[
            { label: "Mua sắm", to: "/petshop" },
            { label: "Danh mục sản phẩm" },
          ]}
        />

        <main className="min-h-[1607px] bg-[linear-gradient(180deg,#FFFFFF_0%,#E5F6FD_100%)] px-[120px] pt-[24px]">
          <div className="flex gap-[24px]">
            <FilterSidebar
              categoryOptions={categoryOptions}
              selectedCategories={selectedCategories}
              selectedPrices={selectedPrices}
              onCategoryChange={toggleCategory}
              onPriceChange={togglePrice}
              onClear={clearFilters}
            />

            <section className="w-[893px] shrink-0">
              <h1 className="text-[36px] font-bold leading-[42px] text-[#3D3D3D]">
                Danh mục sản phẩm của chúng tôi
              </h1>
              <div className="mt-[32px]">
                <SearchAndSort
                  search={search}
                  onSearchChange={setSearch}
                  onSearch={() => resetDisplayCount(setSearchQuery, search.trim())}
                  onClearSearch={clearSearch}
                  sortOrder={sortOrder}
                  onSortChange={(value) => resetDisplayCount(setSortOrder, value)}
                />
              </div>
              {searchQuery && (
                <p className="mt-[27px] text-[16px] leading-[27px] text-[#414141]">
                  Kết quả tìm kiếm cho &quot;{searchQuery}&quot;
                </p>
              )}
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

        <Footer variant="white" />
      </ScaledCanvasLayout>
    </div>
  );
}
