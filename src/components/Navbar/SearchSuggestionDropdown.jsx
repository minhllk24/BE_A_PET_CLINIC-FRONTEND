import { searchSuggestionImages } from "../../assets/searchSuggestionImages";
import { formatVnd } from "../../utils/currency";
import { highlightKeywordParts } from "../../utils/searchSuggestionUtils";

function HighlightedText({ text, keyword }) {
  return highlightKeywordParts(text, keyword).map((part, index) => (
    <span
      key={`${part.value}-${index}`}
      className={part.match ? "font-bold text-inherit" : undefined}
    >
      {part.value}
    </span>
  ));
}

function TextSuggestionItem({ suggestion, query, active = false, onSelect, onHover }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(suggestion)}
      onMouseEnter={onHover}
      className={[
        "flex w-full items-center gap-3 rounded-[8px] border-b border-[#E0E0E0] p-2 text-left transition-colors",
        active ? "bg-[#FFF59D]" : "hover:bg-[#FFF9C4]",
      ].join(" ")}
    >
      <img
        src={active ? searchSuggestionImages.searchActive : searchSuggestionImages.searchDefault}
        alt=""
        className="size-[18px] shrink-0"
      />
      <span
        className={[
          "min-w-0 truncate font-['Roboto'] text-[14px] italic leading-6",
          active ? "text-[#0D47A1]" : "text-black/87",
        ].join(" ")}
      >
        <HighlightedText text={suggestion.label} keyword={query} />
      </span>
    </button>
  );
}

function ProductSuggestionCard({ product, query, active = false, onSelect, onHover }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(product)}
      onMouseEnter={onHover}
      className={[
        "flex min-w-0 flex-1 items-center gap-3 rounded-[8px] p-2 text-left transition-colors",
        active ? "bg-[#FFF59D]" : "bg-[#FFF9C4] hover:bg-[#FFF59D]",
      ].join(" ")}
    >
      <img
        src={product.image || searchSuggestionImages.productThumb}
        alt={product.name}
        className="size-12 shrink-0 rounded-[8px] object-cover"
      />
      <span className="flex min-w-0 flex-1 flex-col items-start">
        <span className="w-full truncate font-['Roboto'] text-[13px] font-normal leading-[19.5px] text-black/87">
          <HighlightedText text={product.name} keyword={query} />
        </span>
        <span className="w-full truncate font-['Roboto'] text-[12px] font-normal leading-[18px] text-[#0D47A1]">
          {formatVnd(product.price)}
        </span>
      </span>
    </button>
  );
}

function SearchSuggestionStatus({ children }) {
  return (
    <div className="flex min-h-[64px] w-full items-center justify-center rounded-[8px] border-b border-[#E0E0E0] px-4 text-center font-['Roboto'] text-[14px] leading-6 text-black/60">
      {children}
    </div>
  );
}

function SearchSuggestionDropdown({
  query,
  suggestions,
  products,
  isLoading = false,
  error = "",
  activeItemId,
  onClose,
  onSuggestionSelect,
  onProductSelect,
  onSeeAll,
  onItemHover,
}) {
  const hasResults = suggestions.length > 0 || products.length > 0;
  const shouldUseFigmaListHeight = !isLoading && !error && suggestions.length >= 4;

  return (
    <>
      <button
        type="button"
        className="fixed inset-x-0 bottom-0 top-[88px] z-[60] cursor-default bg-transparent"
        onClick={onClose}
        aria-label="Đóng gợi ý tìm kiếm"
      />
      <aside
        id="site-search-suggestions"
        className="panel-slide-in absolute right-0 top-[41px] z-[80] flex w-[466px] flex-col items-start overflow-hidden rounded-[4px] pt-5 shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)]"
        role="dialog"
        aria-label="Gợi ý tìm kiếm"
      >
        <img
          src={searchSuggestionImages.triangleRight}
          alt=""
          className="absolute right-[-2px] top-0 size-6"
          aria-hidden
        />
        <div className="flex w-[466px] flex-col bg-[#FFFDE7] pt-1">
          <section className="flex w-full flex-col gap-3 px-4 py-[10px]">
            <h3 className="font-['Roboto'] text-[16px] font-bold leading-6 tracking-[0.15px] text-[#353535]">
              Gợi ý phù hợp
            </h3>
            <div
              className={[
                "flex w-full flex-col items-start",
                shouldUseFigmaListHeight ? "h-[172px] justify-between" : "gap-2",
              ].join(" ")}
            >
              {isLoading && <SearchSuggestionStatus>Đang tải gợi ý...</SearchSuggestionStatus>}
              {!isLoading && error && <SearchSuggestionStatus>{error}</SearchSuggestionStatus>}
              {!isLoading && !error && !hasResults && (
                <SearchSuggestionStatus>Không tìm thấy kết quả phù hợp</SearchSuggestionStatus>
              )}
              {!isLoading && !error && suggestions.map((suggestion) => (
                  <TextSuggestionItem
                    key={suggestion.id}
                    suggestion={suggestion}
                    query={query}
                    active={activeItemId === suggestion.id}
                    onSelect={onSuggestionSelect}
                    onHover={() => onItemHover(suggestion.id)}
                  />
                ))}
            </div>
          </section>

          {!isLoading && !error && products.length > 0 && (
            <section className="flex w-full flex-col gap-3 px-4 py-[10px]">
              <h3 className="font-['Roboto'] text-[16px] font-bold leading-6 tracking-[0.15px] text-[#353535]">
                Sản phẩm liên quan
              </h3>
              <div className="flex w-full items-start justify-center gap-3">
                {products.map((product, index) => (
                  <ProductSuggestionCard
                    key={product.id}
                    product={product}
                    query={query}
                    active={activeItemId === `product-${product.id}`}
                    onSelect={onProductSelect}
                    onHover={() => onItemHover(`product-${product.id}`)}
                  />
                ))}
              </div>
            </section>
          )}

          <div className="flex w-full flex-col items-center px-4 py-[10px]">
            <button
              type="button"
              onClick={onSeeAll}
              onMouseEnter={() => onItemHover("all-results")}
              className={[
                "flex h-[35px] w-full items-center justify-center rounded-[4px] px-6 text-center font-['Roboto'] text-[14px] font-semibold leading-5 tracking-[0.28px] text-[#0D47A1] transition-colors",
                activeItemId === "all-results" ? "bg-[#FFF59D]" : "bg-[#F5F5F5] hover:bg-[#EEEEEE]",
              ].join(" ")}
            >
              {`Xem tất cả kết quả cho "${query.trim()}"`}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default SearchSuggestionDropdown;
