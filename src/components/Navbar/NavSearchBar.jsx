import { navbarImages } from "../../assets/navbarImages";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchSuggestions } from "../../data/searchResultsData";
import SearchSuggestionDropdown from "./SearchSuggestionDropdown";

const SEARCH_DEBOUNCE_MS = 280;

const EMPTY_SUGGESTIONS = {
  suggestions: [],
  products: [],
  total: 0,
};

function NavSearchBar({ className = "" }) {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState(EMPTY_SUGGESTIONS);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [suggestionError, setSuggestionError] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const trimmedTerm = term.trim();
  const shouldShowSuggestions = isSuggestOpen && trimmedTerm.length > 0;
  const suggestionItems = useMemo(() => {
    if (!trimmedTerm) return [];

    return [
      ...searchSuggestions.suggestions.map((suggestion) => ({
        id: suggestion.id,
        type: "suggestion",
        payload: suggestion,
      })),
      ...searchSuggestions.products.map((product) => ({
        id: `product-${product.id}`,
        type: "product",
        payload: product,
      })),
      {
        id: "all-results",
        type: "all-results",
        payload: { query: trimmedTerm },
      },
    ];
  }, [searchSuggestions, trimmedTerm]);

  useEffect(() => {
    if (!trimmedTerm) {
      setSearchSuggestions(EMPTY_SUGGESTIONS);
      setIsLoadingSuggestions(false);
      setSuggestionError("");
      setActiveIndex(-1);
      return undefined;
    }

    setIsLoadingSuggestions(true);
    setSuggestionError("");
    setActiveIndex(-1);

    const timer = window.setTimeout(() => {
      try {
        setSearchSuggestions(getSearchSuggestions(trimmedTerm));
      } catch (error) {
        setSearchSuggestions(EMPTY_SUGGESTIONS);
        setSuggestionError("Không thể tải gợi ý tìm kiếm");
      } finally {
        setIsLoadingSuggestions(false);
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [trimmedTerm]);

  const closeSuggestions = () => {
    setIsSuggestOpen(false);
    setActiveIndex(-1);
  };

  const searchByKeyword = (keyword) => {
    const query = keyword.trim();
    closeSuggestions();
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  };

  const openProduct = (product) => {
    closeSuggestions();
    navigate(product.href);
  };

  const selectSuggestion = (suggestion) => {
    setTerm(suggestion.label);
    searchByKeyword(suggestion.label);
  };

  const openActiveItem = () => {
    const activeItem = suggestionItems[activeIndex];
    if (!activeItem) return false;

    if (activeItem.type === "suggestion") {
      selectSuggestion(activeItem.payload);
      return true;
    }

    if (activeItem.type === "product") {
      openProduct(activeItem.payload);
      return true;
    }

    searchByKeyword(trimmedTerm);
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchByKeyword(term);
  };

  return (
    <form
      className={`group relative h-[37px] w-[200px] shrink-0 ${className}`}
      onSubmit={handleSubmit}
      onBlur={(event) => {
        if (event.currentTarget.contains(event.relatedTarget)) return;
        window.setTimeout(closeSuggestions, 100);
      }}
      onKeyDown={(event) => {
        if (!shouldShowSuggestions) return;

        if (event.key === "ArrowDown") {
          event.preventDefault();
          setActiveIndex((current) => (current + 1) % Math.max(suggestionItems.length, 1));
          return;
        }

        if (event.key === "ArrowUp") {
          event.preventDefault();
          setActiveIndex((current) => (
            current <= 0 ? Math.max(suggestionItems.length - 1, -1) : current - 1
          ));
          return;
        }

        if (event.key === "Enter" && activeIndex >= 0) {
          event.preventDefault();
          openActiveItem();
          return;
        }

        if (event.key === "Escape") {
          closeSuggestions();
        }
      }}
    >
      <div className="absolute inset-0 rounded border border-secondary transition-colors duration-micro group-focus-within:border-[#1976D2]" />
      <img
        src={navbarImages.dogSearch}
        alt=""
        className="pointer-events-none absolute left-0 top-0 h-[37px] w-[39px] object-cover"
        aria-hidden
      />
      <input
        id="site-search-input"
        type="search"
        placeholder="Bạn muốn tìm gì nè?"
        value={term}
        onChange={(event) => {
          setTerm(event.target.value);
          setIsSuggestOpen(event.target.value.trim().length > 0);
        }}
        onFocus={() => setIsSuggestOpen(term.trim().length > 0)}
        className="input-search pl-10 pr-13 text-xs tracking-[0.4px] text-black/87"
        aria-label="Tìm kiếm"
        aria-expanded={shouldShowSuggestions}
        aria-controls="site-search-suggestions"
      />
      {shouldShowSuggestions && (
        <SearchSuggestionDropdown
          query={term}
          suggestions={searchSuggestions.suggestions}
          products={searchSuggestions.products}
          isLoading={isLoadingSuggestions}
          error={suggestionError}
          activeItemId={suggestionItems[activeIndex]?.id}
          onClose={closeSuggestions}
          onSuggestionSelect={selectSuggestion}
          onProductSelect={openProduct}
          onSeeAll={() => searchByKeyword(term)}
          onItemHover={(itemId) => {
            const nextIndex = suggestionItems.findIndex((item) => item.id === itemId);
            setActiveIndex(nextIndex);
          }}
        />
      )}
      {/* <img
        src={navbarImages.searchIcon}
        alt=""
        className="pointer-events-none absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 opacity-70 transition-opacity duration-micro group-focus-within:opacity-100"
        aria-hidden
      /> */}
    </form>
  );
}

export default NavSearchBar;
