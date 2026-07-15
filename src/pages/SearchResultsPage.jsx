import { Filter, Heart, MessageCircle, Share2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import BlogCard from "../components/blog/BlogCard";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/Navbar";
import ShoppingProductCard from "../components/product/ShoppingProductCard";
import {
  SEARCH_DEMAND_TYPES,
  SEARCH_EMPTY_STATE,
  SEARCH_FILTER_GROUPS,
  SEARCH_SORT_OPTIONS,
  mockSearchApi,
} from "../data/searchResultsData";
import { searchAll } from "../services/searchService";
import { formatVnd } from "../utils/currency";

const TYPE_IDS = SEARCH_DEMAND_TYPES.map((item) => item.id);
const SORT_OPTIONS = Object.values(SEARCH_SORT_OPTIONS);

const EMPTY_SEARCH_RESPONSE = {
  query: "",
  type: "all",
  sort: "relevant",
  total: 0,
  counts: { service: 0, shopping: 0, firstAid: 0, knowledge: 0, community: 0 },
  facets: SEARCH_FILTER_GROUPS,
  results: {
    services: [],
    otherServices: [],
    products: [],
    suggestedProducts: [],
    firstAid: [],
    knowledge: [],
    community: [],
  },
  emptyState: SEARCH_EMPTY_STATE,
};

function buildFacets(facetCounts = {}) {
  return SEARCH_FILTER_GROUPS.map((group) => {
    if (group.id === "productCategories") {
      const counts = facetCounts.productCategories || {};
      const total = Object.values(counts).reduce((sum, count) => sum + Number(count || 0), 0);
      return {
        ...group,
        options: group.options.map((option, index) => ({
          ...option,
          count: option.id === "all-categories" ? total : Number(counts[String(index)] || counts[String(index + 1)] || 0),
        })),
      };
    }

    if (group.id === "serviceGroups") {
      const counts = facetCounts.serviceCategories || {};
      const total = Object.values(counts).reduce((sum, count) => sum + Number(count || 0), 0);
      return {
        ...group,
        options: group.options.map((option, index) => ({
          ...option,
          count: option.id === "all-services" ? total : Number(counts[String(index)] || counts[String(index + 1)] || 0),
        })),
      };
    }

    return group;
  });
}

function formatServicePrice(value) {
  return `Từ ${formatVnd(value)}`;
}

function parseServicePrice(price) {
  const numeric = String(price).replace(/[^\d]/g, "");
  return Number(numeric) || 0;
}

function SectionHeading({ children }) {
  return (
    <div className="flex w-full items-center gap-4">
      <h2 className="shrink-0 text-[24px] font-semibold uppercase leading-8 text-[#0D47A1]">
        {children}
      </h2>
      <div className="h-1 flex-1 rounded-full bg-[#FDD835]" />
    </div>
  );
}

function SortButton({ option, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-[42px] rounded-full border px-[17px] text-[16px] font-semibold leading-6 shadow-[0_1px_1px_rgba(0,0,0,0.05)] transition-colors",
        active
          ? "border-[#0D47A1] bg-[#0D47A1] text-white"
          : "border-[#C2C6D4] bg-white text-black/60 hover:border-[#0D47A1] hover:text-[#0D47A1]",
      ].join(" ")}
    >
      {option.label}
    </button>
  );
}

function DemandTabs({ activeType, onChange }) {
  return (
    <div className="flex w-full items-start justify-center gap-1 rounded-full bg-[rgba(25,118,210,0.08)] p-1">
      {SEARCH_DEMAND_TYPES.map((type) => (
        <button
          key={type.id}
          type="button"
          onClick={() => onChange(type.id)}
          className={[
            "h-9 w-16 rounded-full text-[13px] font-semibold leading-5 tracking-[0.28px] text-[#0D47A1] transition",
            activeType === type.id ? "bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]" : "hover:bg-white/60",
          ].join(" ")}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
}

function FilterGroup({ group, selectedValues, onToggle }) {
  return (
    <section className="w-full overflow-hidden rounded-[40px] border border-[rgba(25,118,210,0.5)] bg-white px-[30px] py-10">
      <div className="flex items-center gap-[17px]">
        <div className="h-6 w-[3px] rounded-full bg-[#0D47A1]" />
        <h3 className="flex-1 text-[22px] font-bold leading-none text-[#0D47A1]">{group.title}</h3>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {group.options.map((option) => {
          const checked = selectedValues.includes(option.id);
          const label = option.count === null ? option.label : `${option.label} (${option.count})`;

          return (
            <label key={option.id} className="flex cursor-pointer items-center gap-5 text-[#414141]">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(group.id, option.id)}
                className="size-5 accent-[#0D47A1]"
              />
              <span className="text-[16px] leading-[27px]">{label}</span>
            </label>
          );
        })}
      </div>
    </section>
  );
}

function SearchSidebar({ activeType, facets, selectedFilters, onFilterToggle, onClear, onTypeChange }) {
  const groups = facets.filter((group) => group.appliesTo.includes(activeType));

  return (
    <aside className="w-[283px] shrink-0">
      <div className="flex items-start gap-2.5">
        <Filter className="mt-0.5 size-[33px] fill-black text-black" />
        <h2 className="h-[33px] text-[24px] font-bold leading-[32px] text-black">Bộ lọc tìm kiếm</h2>
      </div>

      <div className="mt-6">
        <p className="mb-[17px] text-[14px] font-semibold leading-5 tracking-[0.28px] text-[#121C2A]">
          Loại nhu cầu
        </p>
        <DemandTabs activeType={activeType} onChange={onTypeChange} />
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {groups.map((group) => (
          <FilterGroup
            key={group.id}
            group={group}
            selectedValues={selectedFilters[group.id] || []}
            onToggle={onFilterToggle}
          />
        ))}
        <div className="flex justify-center">
          <button type="button" onClick={onClear} className="h-[42px] rounded-[4px] bg-[#FFF176] px-[22px] text-[15px] font-medium uppercase tracking-[0.46px] text-black shadow-elevation transition-colors hover:bg-[#FDD835]">
            Xóa bộ lọc
          </button>
        </div>
      </div>
    </aside>
  );
}

function ResultsHeader({ query, activeType, activeSort, counts, total, emptyState, onSortChange, isEmpty = false }) {
  const sortOptions = SORT_OPTIONS.filter((option) => option.appliesTo.includes(activeType));

  return (
    <header className="flex w-full flex-col items-start gap-2">
      <h1 className="w-full text-[32px] font-semibold leading-10 text-black/87">
        Kết quả tìm kiếm cho <span className="text-[#0D47A1]">"{query}"</span>
      </h1>
      <p className="text-[16px] leading-6 text-black/60">
        {isEmpty
          ? emptyState.summary
          : `Tìm thấy ${total} kết quả phù hợp: ${counts.service} dịch vụ, ${counts.shopping} sản phẩm, ${counts.firstAid} cẩm nang, ${counts.knowledge} kiến thức`}
      </p>
      {!isEmpty && (
        <div className="flex flex-wrap items-center gap-3 pt-4">
          {sortOptions.map((option) => (
            <SortButton
              key={option.id}
              option={option}
              active={activeSort === option.id}
              onClick={() => onSortChange(option.id)}
            />
          ))}
        </div>
      )}
    </header>
  );
}

function ServiceCard({ service }) {
  const steps = service.steps || (service.title.toLowerCase().includes("combo") ? [
    "Kiểm tra lông, da",
    "Cạo lông bàn chân",
    "Cạo lông bụng",
  ] : null);

  return (
    <article className="flex h-[192px] w-full overflow-hidden rounded-[48px] border border-[rgba(127,118,98,0.1)] bg-white p-px shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="h-full w-[192px] shrink-0 overflow-hidden">
        <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="text-[18px] font-bold leading-7 text-black/87">{service.title}</h3>
          {steps ? (
            <ol className="mt-1 list-decimal pl-6 text-[16px] leading-6 text-[#6C6D71]">
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          ) : (
            <p className="mt-1 text-[16px] leading-7 text-black/60">{service.description}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[18px] font-bold leading-7 text-[#0D47A1]">
            {formatServicePrice(service.priceValue ?? parseServicePrice(service.price))}
          </p>
          <Link to="/dat-lich" className="btn-yellow h-[35px] rounded-full px-[22px] text-[16px]">
            Đặt lịch ngay
          </Link>
        </div>
      </div>
    </article>
  );
}

function ServicesSection({ results, allMode = false }) {
  return (
    <section className="flex w-full flex-col gap-8">
      <SectionHeading>{allMode ? "Dịch vụ liên quan" : "Dịch vụ liên quan"}</SectionHeading>
      <div className="flex flex-col gap-8">
        {results.services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      {!allMode && (
        <>
          <SectionHeading>Dịch vụ khác</SectionHeading>
          <div className="flex flex-col gap-4">
            {results.otherServices.map((service) => (
              <ServiceCard key={`other-${service.id}`} service={service} />
            ))}
          </div>
          <div className="flex justify-center">
            <Link to="/services/grooming-spa" className="btn-yellow-main h-[42px] px-[22px] text-[15px] font-medium">
              Xem tất cả dịch vụ
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

function ProductsGrid({ products }) {
  return (
    <div className="grid w-full grid-cols-5 gap-x-[10.75px] gap-y-8">
      {products.map((product, index) => (
        <ShoppingProductCard
          key={product.id}
          product={product}
          variant={product.discountPercent ? "tag" : index === 1 ? "hover" : "default"}
          href="/product-details"
        />
      ))}
    </div>
  );
}

function ProductsSection({ results, allMode = false }) {
  return (
    <section className="flex w-full flex-col gap-8">
      <SectionHeading>Sản phẩm liên quan</SectionHeading>
      <ProductsGrid products={results.products} />
      {!allMode && (
        <>
          <SectionHeading>Có thể bạn cũng cần</SectionHeading>
          <ProductsGrid products={results.suggestedProducts} />
          <div className="flex justify-center">
            <Link to="/products" className="btn-yellow-main h-[42px] px-[22px] text-[15px] font-medium">
              Xem tất cả sản phẩm
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

function FirstAidCard({ post, featured = false }) {
  return (
    <article className="flex h-[438px] w-[441px] flex-col rounded-[24px] bg-white p-[41px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      {featured && post.image ? (
        <img src={post.image} alt="" className="mb-2 h-40 w-full rounded-[12px] object-cover" />
      ) : (
        <div className="h-12" />
      )}
      <div className="mt-auto flex flex-col gap-4">
        <p className="text-[14px] font-semibold uppercase leading-5 tracking-[0.28px] text-[#0D47A1]">
          {post.categoryLabel}
        </p>
        <h3 className="text-[24px] font-semibold leading-8 text-black/87">{post.title}</h3>
        <p className="text-[16px] leading-6 text-black/87">{post.description}</p>
        <Link to={`/blog/so-cuu/${post.id}`} className="font-['Roboto'] text-[16px] font-bold leading-6 text-[#0D47A1]">
          Đọc ngay →
        </Link>
      </div>
    </article>
  );
}

function CommunityPostCard({ post }) {
  return (
    <article className="w-full rounded-[24px] border border-[#EEE] bg-white p-[25px] shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
      {post.image && <img src={post.image} alt="" className="-mx-6 -mt-6 mb-6 h-64 w-[calc(100%+48px)] rounded-t-[24px] object-cover" />}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-[#D7E2FF] text-[16px] font-semibold text-[#3E5E95]">
            {post.initials}
          </div>
          <div>
            <p className="text-[16px] font-semibold leading-6 text-[#1A1C1C]">{post.author}</p>
            <p className="text-[12px] leading-4 text-[#414753]">{post.time}</p>
          </div>
        </div>
        {post.type && (
          <span className="rounded-full bg-[#F3E8EE] px-3 py-1 text-[12px] font-semibold leading-4 text-[#672950]">
            {post.type}
          </span>
        )}
      </div>
      {post.title && <h3 className="mt-3 pt-1 text-[16px] font-bold leading-6 text-black/87">{post.title}</h3>}
      <p className="mt-3 text-[16px] leading-6 text-[#1A1C1C]">{post.content}</p>
      {post.tags?.length > 0 && (
        <div className="mt-3 flex gap-2 pb-3 pt-1">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-lg bg-[rgba(214,227,255,0.5)] px-2 py-0.5 text-[10px] font-semibold uppercase leading-[15px] text-[#005AB4]">
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="mt-3 flex items-center justify-between border-t border-[#F3F3F3] px-6 pt-[17px] text-[14px] leading-5 text-[#414753]">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><Heart className="size-4" />{post.likes}</span>
          <span className="flex items-center gap-2"><MessageCircle className="size-4" />{post.comments}</span>
        </div>
        <Share2 className="size-4" />
      </div>
    </article>
  );
}

function ArticlesSection({ results, allMode = false }) {
  return (
    <section className="flex w-full flex-col gap-8">
      <SectionHeading>{allMode ? "Cẩm nang sơ cứu liên quan" : "Cẩm nang sơ cứu"}</SectionHeading>
      <div className="grid grid-cols-2 gap-x-[10.75px] gap-y-8">
        {results.firstAid.map((post, index) => (
          <FirstAidCard key={post.id} post={post} featured={index === 0} />
        ))}
      </div>

      <SectionHeading>{allMode ? "Bài viết kiến thức thú cưng liên quan" : "Kiến thức thú cưng"}</SectionHeading>
      <div className="grid grid-cols-3 gap-x-[10.75px] gap-y-8">
        {results.knowledge.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      <SectionHeading>{allMode ? "Bài đăng cộng đồng liên quan" : "Cộng đồng chia sẻ"}</SectionHeading>
      <div className="flex flex-col gap-8">
        {results.community.map((post) => (
          <CommunityPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

function SearchResultsContent({ activeType, results }) {
  if (activeType === "service") return <ServicesSection results={results} />;
  if (activeType === "shopping") return <ProductsSection results={results} />;
  if (activeType === "article") return <ArticlesSection results={results} />;

  return (
    <div className="flex w-full flex-col gap-8">
      <ServicesSection results={results} allMode />
      <ProductsSection results={results} allMode />
      <ArticlesSection results={results} allMode />
    </div>
  );
}

function EmptyResultsContent({ emptyState, onRetry }) {
  return (
    <section className="flex w-full flex-col items-center justify-center px-4 pb-20 pt-12 text-center">
      <div className="flex w-full flex-col items-center gap-3">
        <h2 className="pt-3 text-center text-[36px] font-semibold leading-8 text-black/87">
          {emptyState.title}
        </h2>
        <p className="w-[576px] max-w-full pt-3 text-center text-[18px] leading-6 text-black/60">
          {emptyState.description}
        </p>
        <div className="flex items-center justify-center gap-4 pb-9 pt-5">
          <button
            type="button"
            onClick={onRetry}
            className="rounded-full border border-[#0D47A1] px-[33px] py-[13px] text-[14px] font-semibold leading-5 tracking-[0.28px] text-[#0D47A1] transition-colors hover:bg-[rgba(25,118,210,0.08)]"
          >
            {emptyState.retryLabel}
          </button>
          <Link
            to={emptyState.homeHref}
            className="rounded-full bg-[#0D47A1] px-8 py-3 text-[14px] font-semibold leading-5 tracking-[0.28px] text-white shadow-[0_1px_1px_rgba(0,0,0,0.05)] transition-colors hover:bg-[#083572]"
          >
            {emptyState.homeLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() || "tắm";
  const urlType = searchParams.get("type") || "all";
  const activeType = TYPE_IDS.includes(urlType) ? urlType : "all";
  const defaultSort = activeType === "article" ? "relevant" : "relevant";
  const urlSort = searchParams.get("sort") || defaultSort;
  const activeSort = SORT_OPTIONS.some((option) => option.id === urlSort && option.appliesTo.includes(activeType))
    ? urlSort
    : "relevant";
  const [selectedFilters, setSelectedFilters] = useState({});
  const [searchResponse, setSearchResponse] = useState(EMPTY_SEARCH_RESPONSE);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setLoadError("");

    searchAll({ query, type: activeType, sort: activeSort })
      .then((data) => {
        if (!active) return;
        setSearchResponse({
          ...EMPTY_SEARCH_RESPONSE,
          ...data,
          facets: buildFacets(data.facetCounts),
          emptyState: SEARCH_EMPTY_STATE,
        });
      })
      .catch(() => {
        if (!active) return;
        const fallback = mockSearchApi({ query, type: activeType, sort: activeSort });
        setSearchResponse({
          ...EMPTY_SEARCH_RESPONSE,
          ...fallback,
          emptyState: SEARCH_EMPTY_STATE,
        });
        setLoadError("");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [activeSort, activeType, query]);

  const hasResults = searchResponse.total > 0;

  const updateParams = (patch) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([key, value]) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });
    setSearchParams(next);
  };

  const handleTypeChange = (type) => {
    const nextSort = SORT_OPTIONS.some((option) => option.id === activeSort && option.appliesTo.includes(type))
      ? activeSort
      : "relevant";
    updateParams({ type, sort: nextSort });
  };

  const handleSortChange = (sort) => updateParams({ sort });

  const handleRetrySearch = () => {
    setSelectedFilters({});
    const searchInput = document.getElementById("site-search-input");
    searchInput?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => {
      searchInput?.focus();
      searchInput?.select();
    }, 250);
  };

  const handleFilterToggle = (groupId, optionId) => {
    setSelectedFilters((current) => {
      const values = current[groupId] || [];
      const nextValues = values.includes(optionId)
        ? values.filter((value) => value !== optionId)
        : [...values, optionId];
      return { ...current, [groupId]: nextValues };
    });
  };

  const pageMinHeight = useMemo(() => {
    if (!hasResults) return "2285px";
    if (activeType === "service") return "1543px";
    if (activeType === "shopping") return "1314px";
    if (activeType === "article") return "3079px";
    return "4359px";
  }, [activeType, hasResults]);

  return (
    <div className="min-h-screen bg-white font-['Roboto']">
      <NavBar />
      <main
        className="bg-gradient-to-b from-white to-[#E5F6FD] px-[120px] pt-6"
        style={{ minHeight: pageMinHeight }}
      >
        <div className="mx-auto flex w-full max-w-[1200px] items-start gap-6">
          <SearchSidebar
            activeType={activeType}
            facets={searchResponse.facets}
            selectedFilters={selectedFilters}
            onFilterToggle={handleFilterToggle}
            onClear={() => setSelectedFilters({})}
            onTypeChange={handleTypeChange}
          />
          <section className="flex w-[893px] shrink-0 flex-col gap-8 pb-[75px]">
            <ResultsHeader
              query={query}
              activeType={activeType}
              activeSort={activeSort}
              counts={searchResponse.counts}
              total={searchResponse.total}
              emptyState={searchResponse.emptyState}
              onSortChange={handleSortChange}
              isEmpty={!hasResults}
            />
            {isLoading ? (
              <div className="py-20 text-center text-[18px] font-semibold text-[#0D47A1]">
                Đang tải kết quả tìm kiếm...
              </div>
            ) : loadError ? (
              <div className="py-20 text-center text-[18px] font-semibold text-[#D32F2F]">
                {loadError}
              </div>
            ) : hasResults ? (
              <SearchResultsContent activeType={activeType} results={searchResponse.results} />
            ) : (
              <EmptyResultsContent emptyState={searchResponse.emptyState} onRetry={handleRetrySearch} />
            )}
          </section>
        </div>
      </main>
      <Footer variant="white"/>
    </div>
  );
}
