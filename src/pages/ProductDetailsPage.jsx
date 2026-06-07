import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CanvasLayout from "../components/layout/CanvasLayout";
import Breadcrumb from "../components/layout/Breadcrumb";
import NavBar from "../components/Navbar";
import ShoppingProductCard from "../components/product/ShoppingProductCard";
import WriteReviewForm from "../components/product/WriteReviewForm";
import Footer from "../components/layout/Footer";
import ProductRating from "../components/product/ProductRating";

import { productImages } from "../assets/productImages";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import {
  createProductReview,
  getProductDetails,
  getProductReviews,
  getSimilarProducts,
  likeProductReview,
} from "../services/productService";

const REVIEW_PAGE_SIZE = 2;

function formatPrice(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function formatReviewTime(createdAt) {
  if (!createdAt) return "";
  return new Intl.RelativeTimeFormat("vi", { numeric: "auto" }).format(
    Math.round((new Date(createdAt).getTime() - Date.now()) / 60000),
    "minute",
  );
}

export default function ProductDetailsPage({ showWriteReview = false }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { productId } = useParams();
  const { addToCart, openCart } = useCart();
  const descriptionRef = useRef(null);
  const [product, setProduct] = useState(null);
  const [reviewsData, setReviewsData] = useState({ items: [], totalPages: 1, totalItems: 0, averageRating: 0, ratingBreakdown: {} });
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  /* ---- Image gallery ---- */
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [thumbHovered, setThumbHovered] = useState(null);
  const thumbnails = product?.images?.length ? product.images : [productImages.detailImage];
  const selectedImage = thumbnails[selectedImageIdx] || thumbnails[0];

  /* ---- Type / variant selection ---- */
  const [selectedTypeIdx, setSelectedTypeIdx] = useState(0);

  /* ---- Dropdown (100ml) ---- */
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");
  const dropdownRef = useRef(null);

  /* ---- Quantity ---- */
  const [quantity, setQuantity] = useState(1);

  /* ---- Review pagination ---- */
  const [reviewPage, setReviewPage] = useState(1);
  const totalReviewPages = reviewsData.totalPages || 1;

  /* ---- Review likes ---- */
  const [likedReviews, setLikedReviews] = useState({});

  const handleLike = async (reviewId) => {
    if (!productId) return;
    try {
      await likeProductReview(productId, reviewId);
    } catch {
      return;
    }
    setLikedReviews((prev) => {
      const isLiked = !!prev[`_${reviewId}`];
      return {
        ...prev,
        [reviewId]: isLiked ? prev[reviewId] - 1 : (prev[reviewId] || 0) + 1,
        [`_${reviewId}`]: !isLiked,
      };
    });
  };

  /* ---- Tab ---- */
  const [isReviewTab, setIsReviewTab] = useState(showWriteReview);
  const [tabTransitioning, setTabTransitioning] = useState(false);

  /* ---- Scroll to tab ---- */
  const tabSectionRef = useRef(null);

  useEffect(() => {
    if (!productId) {
      setLoadError("Thiếu mã sản phẩm.");
      setIsLoading(false);
      return;
    }

    let active = true;
    setIsLoading(true);
    setLoadError("");

    Promise.all([
      getProductDetails(productId),
      getSimilarProducts(productId),
    ])
      .then(([detail, similar]) => {
        setProduct(detail);
        setSimilarProducts(similar?.items ?? similar ?? []);
        const firstSize = detail?.variants?.[0]?.sizes?.[0] ?? "";
        setDropdownValue(firstSize);
      })
      .catch(() => {
        if (active) setLoadError("Không thể tải thông tin sản phẩm.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [productId]);

  useEffect(() => {
    if (!productId) return;
    let active = true;
    getProductReviews(productId, reviewPage, REVIEW_PAGE_SIZE)
      .then((data) => {
        if (active) setReviewsData(data);
      })
      .catch(() => {
        if (active) setReviewsData((current) => ({ ...current, items: [] }));
      });
    return () => {
      active = false;
    };
  }, [productId, reviewPage]);

  useEffect(() => {
    setSelectedImageIdx(0);
  }, [productId]);

  const scrollToTabSection = useCallback(() => {
    tabSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  /* ---- Switch tab with smooth transition ---- */
  const handleTabMota = useCallback(() => {
    if (isReviewTab) {
      setTabTransitioning(true);
      setTimeout(() => {
        setIsReviewTab(false);
        scrollToTabSection();
        setTimeout(() => setTabTransitioning(false), 50);
      }, 150);
    } else {
      scrollToTabSection();
    }
  }, [isReviewTab, scrollToTabSection]);

  const handleTabDanhGia = useCallback(() => {
    if (!isReviewTab) {
      setTabTransitioning(true);
      setTimeout(() => {
        setIsReviewTab(true);
        scrollToTabSection();
        setTimeout(() => setTabTransitioning(false), 50);
      }, 150);
    } else {
      scrollToTabSection();
    }
  }, [isReviewTab, scrollToTabSection]);

  /* ---- Scroll to description on "Đọc thêm" ---- */
  const handleReadMore = () => {
    descriptionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ---- Dropdown outside click + Escape key ---- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* ---- Quantity handlers ---- */
  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrement = () => setQuantity((q) => q + 1);

  /* ---- Add to cart with feedback ---- */
  const [cartAdded, setCartAdded] = useState(false);
  const handleAddToCart = () => {
    const variant = product?.variants?.[selectedTypeIdx];
    addToCart({
      id: `${product.id}:${variant?.id ?? "default"}:${dropdownValue || "default"}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: selectedImage,
      type: variant?.name,
      size: dropdownValue,
      qty: quantity,
    });
    openCart();
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 1800);
  };

  /* ---- Buy now ---- */
  const handleBuyNow = () => {
    navigate("/checkout");
  };

  /* ---- Review pagination ---- */
  const handleReviewPage = (page) => {
    setReviewPage(page);
    tabSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ---- Similar products carousel ---- */
  const SIM_CARD_WIDTH = 170;
  const SIM_CARD_GAP = 20;
  const SIM_VISIBLE_COUNT = 6;
  const [simOffset, setSimOffset] = useState(0);
  const canGoSimPrev = simOffset > 0;
  const canGoSimNext = simOffset < similarProducts.length - SIM_VISIBLE_COUNT;

  const handleSimPrev = () => {
    if (!canGoSimPrev) return;
    setSimOffset((offset) => offset - 1);
  };

  const handleSimNext = () => {
    if (!canGoSimNext) return;
    setSimOffset((offset) => offset + 1);
  };

  /* ---- Review pages for pagination display ---- */
  const getPageNumbers = () => {
    const pages = [];
    const total = totalReviewPages;
    const current = reviewPage;
    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, 4, "...", total);
      } else if (current >= total - 2) {
        pages.push(1, "...", total - 3, total - 2, total - 1, total);
      } else {
        pages.push(1, "...", current - 1, current, current + 1, "...", total);
      }
    }
    return pages;
  };

  const handleReviewSubmit = async ({ rating, review }) => {
    await createProductReview(productId, { rating, content: review });
    const updated = await getProductReviews(productId, 1, REVIEW_PAGE_SIZE);
    setReviewPage(1);
    setReviewsData(updated);
  };

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center text-[#0D47A1]">Đang tải sản phẩm...</div>;
  }

  if (loadError || !product) {
    return <div className="flex min-h-screen items-center justify-center text-[#D32F2F]">{loadError || "Không tìm thấy sản phẩm."}</div>;
  }

  const selectedVariant = product.variants?.[selectedTypeIdx];
  const dropdownOptions = selectedVariant?.sizes ?? [];

  return (
    <div className="min-h-screen bg-white">
      <CanvasLayout>
        <NavBar isAuthenticated={isAuthenticated} />
        <Breadcrumb
          items={[
            { label: "Mua sắm", to: "/petshop" },
            { label: "Danh mục sản phẩm", to: "/products" },
            { label: product?.name || (isLoading ? "Đang tải..." : "Chi tiết sản phẩm") },
          ]}
        />

        {/* ---- Product detail section ---- */}
        <section className="relative h-[778px] w-[1440px]">
          {/* Breadcrumb */}
          <nav className="absolute left-[120px] top-[32px] flex items-center gap-[4px] text-[16px]" aria-label="Breadcrumb">
            <Link
              to="/"
              className="text-[#0D47A1] underline-offset-2 hover:underline focus-ring-brand transition-all duration-micro"
            >
              Product Listing
            </Link>
            <img src={productImages.chevronRight} alt="" className="h-5 w-5 pointer-events-none opacity-50" aria-hidden="true" />
            <span className="text-[rgba(0,0,0,0.87)] cursor-default">{product.name}</span>
          </nav>

          {/* Product layout */}
          <div className="absolute left-[120px] top-[76px] flex h-[622px] w-[1200px] items-start overflow-visible">
            <div className="ml-[-18px] flex h-[644px] w-[1218px] items-start gap-[71px]">
              {/* Left: image gallery */}
              <div className="flex w-[626px] gap-[24px] pl-[15px] pt-[8.5px]">
                {/* Thumbnails */}
                <div className="flex h-[626px] flex-col justify-between rounded-[16px]">
                  {thumbnails.map((thumb, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedImageIdx(i)}
                      onMouseEnter={() => setThumbHovered(i)}
                      onMouseLeave={() => setThumbHovered(null)}
                      className={`group relative rounded-[4px] object-cover transition-all duration-micro focus-ring-brand focus-visible:ring-2 focus-visible:ring-[#0D47A1] ${
                        i === selectedImageIdx
                          ? "border-2 border-[#90CAF9] shadow-[0_0_0_1px_#90CAF9]"
                          : thumbHovered === i
                            ? "border border-[#90CAF9] shadow-sm"
                            : "border border-transparent"
                      }`}
                      aria-label={`Xem ảnh ${i + 1}`}
                      aria-current={i === selectedImageIdx ? "true" : undefined}
                    >
                      <img
                        src={thumb}
                        alt=""
                        className={`h-[194px] w-[141px] object-cover transition-opacity duration-micro ${
                          i !== selectedImageIdx && thumbHovered !== i ? "opacity-60 group-hover:opacity-80" : ""
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {/* Main image */}
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="h-[627px] w-[460px] rounded-[4px] object-cover"
                />
              </div>

              {/* Right: product info */}
              <div className="flex h-[644px] w-[511px] flex-col justify-between">
                <div className="flex w-[489px] flex-col gap-[42px]">
                  <div className="flex flex-col gap-[24px]">
                    {/* Title + stars */}
                    <div className="flex flex-col gap-[12px]">
                      <h1 className="w-[494px] font-['Roboto'] text-[32px] font-bold leading-[1.235] tracking-[0.25px] text-[#0D47A1]">
                        {product.name}
                      </h1>
                      <div className="flex items-center gap-[10px]">
                        <ProductRating value={product.rating} />
                        <span className="font-['Oxygen'] text-[14px] leading-[23.87px] text-[#414141]">( {product.reviewCount || 0} review )</span>
                      </div>
                      <div className="flex items-center gap-[10px]">
                        <span className="font-['Roboto'] text-[32px] font-normal leading-[39.52px] tracking-[0.25px] text-[#D32F2F]">{formatPrice(product.price)}</span>
                        {product.originalPrice > product.price && (
                          <>
                            <span className="font-['Roboto'] text-[24px] font-normal leading-[32.02px] text-[rgba(0,0,0,0.38)] line-through">{formatPrice(product.originalPrice)}</span>
                            <span className="inline-flex h-[21px] w-[50px] items-center justify-center rounded-[40px] bg-[#D32F2F] font-['Roboto'] text-[12px] font-bold leading-[19.92px] tracking-[0.4px] text-white">
                              -{product.discountPercent || Math.round((1 - product.price / product.originalPrice) * 100)}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="h-px w-[494px] bg-[#D7D7D7]" />

                    {/* Description + "Đọc thêm" scroll */}
                    <div ref={descriptionRef} className="w-[494px] text-[16px] leading-[1.5] tracking-[0.15px] text-[#414141]">
                      <p className="mb-0">
                        {product.shortDescription || product.description}
                      </p>
                      <br />
                      <button
                        type="button"
                        onClick={handleReadMore}
                        className="text-[#0D47A1] underline underline-offset-2 hover:no-underline hover:text-[#1565C0] focus-ring-brand transition-all duration-micro"
                      >
                        Đọc thêm...
                      </button>
                    </div>

                    <div className="h-px w-[494px] bg-[#D7D7D7]" />

                    {/* Type selection */}
                    <div className="flex items-center gap-[24px]">
                      <span className="font-['Roboto'] text-[20px] font-medium leading-[32px] tracking-[0.15px] text-[#1D2939]">Loại</span>
                      <div className="flex gap-[24px]">
                        {(product.variants ?? []).map((variant, i) => (
                          <button
                            key={variant.id ?? variant.name}
                            type="button"
                            onClick={() => {
                              setSelectedTypeIdx(i);
                              setDropdownValue(variant.sizes?.[0] ?? "");
                            }}
                            className={`group h-[78px] w-[83px] rounded-[12px] transition-all duration-micro focus-ring-brand active:scale-95 ${
                              i === selectedTypeIdx
                                ? "border-2 border-[#90CAF9] bg-[#F2F4F7] shadow-[0_0_0_1px_#90CAF9]"
                                : "border border-transparent bg-[#F2F4F7] hover:border-[#90CAF9] hover:shadow-sm"
                            }`}
                            aria-pressed={i === selectedTypeIdx}
                          >
                            <span className="font-['Roboto'] text-[14px] font-medium leading-[32px] tracking-[0.15px] text-[#1D2939]">
                              {variant.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex w-[494px] flex-col gap-[15px]">
                  <div className="flex h-[49px] gap-[15px]">
                    {/* Dropdown: 100ml */}
                    {dropdownOptions.length > 0 && <div ref={dropdownRef} className="relative">
                      <button
                        type="button"
                        onClick={() => setDropdownOpen((o) => !o)}
                        className={`flex h-[49px] items-center gap-[11px] rounded-[4px] border bg-white px-[20px] py-[10px] transition-all duration-micro focus-ring-brand ${
                          dropdownOpen
                            ? "border-[#0D47A1] shadow-[0_0_0_1px_#0D47A1]"
                            : "border-[#D7D7D7] hover:border-[#90CAF9]"
                        }`}
                        aria-haspopup="listbox"
                        aria-expanded={dropdownOpen}
                      >
                        <span className="font-['Roboto'] text-[16px] font-bold leading-[24px] tracking-[0.15px] text-[#1D2939]">{dropdownValue}</span>
                        <img
                          src={productImages.chevronDownSmall}
                          alt=""
                          className={`h-2 w-3 transition-transform duration-micro ${dropdownOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {dropdownOpen && (
                        <ul
                          className="animate-dropdown-in absolute left-0 top-full z-10 mt-1 w-full overflow-hidden rounded-[4px] border border-[#D7D7D7] bg-white shadow-lg"
                          role="listbox"
                        >
                          {dropdownOptions.map((opt) => (
                            <li key={opt}>
                              <button
                                type="button"
                                onClick={() => {
                                  setDropdownValue(opt);
                                  setDropdownOpen(false);
                                }}
                                className={`flex w-full px-[20px] py-[10px] font-['Roboto'] text-[16px] leading-[24px] tracking-[0.15px] transition-colors duration-micro focus:bg-[#F2F4F7] focus-ring-brand ${
                                  opt === dropdownValue ? "bg-[#E3F2FD] text-[#0D47A1]" : "text-[#1D2939] hover:bg-[#F2F4F7]"
                                }`}
                                role="option"
                                aria-selected={opt === dropdownValue}
                              >
                                {opt}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>}

                    {/* Quantity stepper */}
                    <div className="flex h-[49px] w-[94px] items-center justify-between rounded-[4px] border border-[#D7D7D7] bg-white px-[14px] py-[10px]">
                      <button
                        type="button"
                        onClick={handleDecrement}
                        className="flex h-6 w-6 cursor-pointer items-center justify-center text-[20px] leading-6 text-[#414141] transition-colors duration-micro hover:text-[#0D47A1] focus-ring-brand active:scale-90"
                        aria-label="Giảm số lượng"
                      >
                        <img src={productImages.remove} alt="" className="h-6 w-6" />
                      </button>
                      <span className="font-['Oxygen'] text-[18px] font-bold leading-normal text-[#414141]">{quantity}</span>
                      <button
                        type="button"
                        onClick={handleIncrement}
                        className="flex h-6 w-6 cursor-pointer items-center justify-center text-[20px] leading-6 text-[#414141] transition-colors duration-micro hover:text-[#0D47A1] focus-ring-brand active:scale-90"
                        aria-label="Tăng số lượng"
                      >
                        <img src={productImages.add} alt="" className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Add to cart */}
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className={`relative h-[43px] flex-1 rounded-[4px] px-[22px] py-[8px] font-['Roboto'] text-[15px] font-bold uppercase tracking-[0.46px] shadow-elevation transition-all duration-micro focus-ring-brand active:scale-[0.98] ${
                        cartAdded
                          ? "bg-[#4CAF50] text-white"
                          : "bg-[#FFF176] text-black hover:bg-[#ffe454]"
                      }`}
                    >
                      <span className={`transition-all duration-200 ${cartAdded ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}>
                        THÊM VÀO GIỎ HÀNG
                      </span>
                      {cartAdded && (
                        <span className="absolute inset-0 flex items-center justify-center text-[13px]">
                          ✓ Đã thêm
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Buy now */}
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="h-[43px] w-[494px] rounded-[4px] border border-[#FDD835] px-[22px] py-[8px] font-['Roboto'] text-[15px] font-medium uppercase tracking-[0.46px] text-[#FDD835] transition-all duration-micro hover:border-[#e6c233] hover:text-[#e6c233] focus-ring-brand active:scale-[0.98]"
                  >
                    MUA NGAY
                  </button>
                </div>

                {/* Shipping info */}
                <div className="w-[350px] space-y-[16px] pb-[2px] font-['Oxygen'] text-[14px] leading-[normal] text-[#424242]">
                  <div className="flex items-center gap-[20px]">
                    <img src={productImages.truck} alt="" className="h-6 w-[26px]" />
                    {product.shipping?.freeShippingThreshold
                      ? `Miễn phí vận chuyển cho đơn từ ${formatPrice(product.shipping.freeShippingThreshold)}`
                      : "Chính sách miễn phí vận chuyển đang cập nhật"}
                  </div>
                  <div className="flex items-center gap-[20px] whitespace-nowrap">
                    <img src={productImages.rotate3d} alt="" className="h-[26px] w-[26px]" />
                    Giao hàng trong: {product.shipping?.deliveryEstimate || "Đang cập nhật"}{" "}
                    <button
                      type="button"
                      onClick={handleReadMore}
                      className="underline underline-offset-2 hover:no-underline hover:text-[#0D47A1] transition-colors duration-micro"
                    >
                      Shipping & Return
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Description / Review tabs ---- */}
        <section
          ref={tabSectionRef}
          className={`w-[1440px] bg-[#E5F6FD] px-[120px] ${
            showWriteReview
              ? "pb-[80px] pt-[80px]"
              : isReviewTab
                ? "pb-[52px] pt-[80px]"
                : "py-[80px]"
          }`}
        >
          <div className={`flex w-full flex-col gap-[40px] transition-opacity duration-150 ${tabTransitioning ? "opacity-0" : "opacity-100"}`}>
            {/* Tab bar */}
            <div className="flex w-full items-start gap-[20px]">
              <button
                type="button"
                onClick={handleTabMota}
                className={`font-['Roboto'] text-[32px] leading-[39.52px] tracking-[0.25px] transition-all duration-micro ${
                  !isReviewTab
                    ? "font-bold text-[#0D47A1]"
                    : "font-normal text-[rgba(0,0,0,0.38)] hover:text-[#0D47A1] hover:font-medium"
                }`}
              >
                Mô tả
              </button>
              <div className="h-[33px] w-0">
                <img
                  src={isReviewTab ? productImages.reviewDivider : productImages.verticalDivider}
                  alt=""
                  className="h-[33px]"
                />
              </div>
              <button
                type="button"
                onClick={handleTabDanhGia}
                className={`font-['Roboto'] text-[32px] leading-[39.52px] tracking-[0.25px] transition-all duration-micro ${
                  isReviewTab
                    ? "font-bold text-[#0D47A1]"
                    : "font-normal text-[rgba(0,0,0,0.38)] hover:text-[#0D47A1] hover:font-medium"
                }`}
              >
                Đánh giá
              </button>
            </div>

            {!isReviewTab ? (
              /* ---- Description content ---- */
              <div className="w-full font-['Roboto'] text-[16px] font-normal leading-[24px] tracking-[0.15px] text-[#575757]">
                <p className="mb-0">
                  {product.description}
                </p>
              </div>
            ) : (
              /* ---- Review content ---- */
              <div className="flex w-full flex-col gap-[40px]">
                {/* Summary */}
                <div className="flex h-[139px] w-[1198px] items-start justify-center gap-[51px] self-center">
                  <div className="w-[198px]">
                    <div className="font-['Roboto'] text-[32px] font-medium leading-[32px] tracking-[0.15px] text-black">{reviewsData.totalItems || 0} Đánh giá</div>
                    <div className="mt-[16px] h-[87px] rounded-[14px] bg-white px-[22px] py-[11px]">
                      <div className="font-['Roboto'] text-[40px] font-bold leading-[40px] tracking-[0.25px] text-black">{reviewsData.averageRating || 0}</div>
                      <ProductRating value={reviewsData.averageRating} />
                    </div>
                  </div>

                  {/* Rating breakdown */}
                  <div className="mt-px flex h-[138px] w-[263px] flex-col gap-[5px]">
                    {[5, 4, 3, 2, 1].map((value) => (
                      <div key={value} className="flex h-6 items-center gap-px">
                        <div className="flex items-center">
                          <span className="font-['Roboto'] text-[16px] leading-[24px] tracking-[0.15px] text-[rgba(0,0,0,0.7)]">{value}</span>
                          <img src={productImages.reviewStarSmall} alt="" className="h-4 w-4" />
                        </div>
                        <div className="relative h-[22px] w-[200px]">
                          <div className="absolute left-4 right-4 top-[9px] h-[6px] rounded-[3px] bg-[rgba(120,120,120,0.2)]" />
                          <div
                            className="absolute left-4 top-[9px] h-[6px] rounded-[3px] bg-[#FFB70A]"
                            style={{ width: `${Math.min(100, reviewsData.ratingBreakdown?.[value] || 0) * 1.68}px` }}
                          />
                        </div>
                        <span className="font-['Roboto'] text-[14px] leading-[20px] tracking-[0.17px] text-[rgba(0,0,0,0.7)]">{reviewsData.ratingBreakdown?.[value] || 0}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review items */}
                {reviewsData.items.map((review) => (
                  <div
                    key={review.id}
                    className="group w-full rounded-[14px] border border-[#90CAF9] bg-white px-4 py-[15px] transition-shadow duration-micro hover:shadow-[0_2px_12px_rgba(144,202,249,0.4)]"
                  >
                    <div className="flex gap-5">
                      <img src={review.authorAvatar || productImages.reviewAvatarBlock} alt="" className="h-[52px] w-[52px] shrink-0 rounded-full object-cover" />
                      <div className="flex min-w-0 flex-1 flex-col gap-5">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <span className="font-['Oxygen'] text-[16px] leading-[normal] text-[#3D3D3D]">{review.authorName}</span>
                            <ProductRating value={review.rating} />
                          </div>
                          <p className="font-['Oxygen'] text-[16px] leading-[1.705] text-[#949494]">
                            {review.content}
                          </p>
                        </div>
                        {/* Actions: Like + time */}
                        <div className="flex items-center gap-[15px] font-['Oxygen'] text-[16px] leading-[1.705] text-[#949494]">
                          <button
                            type="button"
                            onClick={() => handleLike(review.id)}
                            className="flex items-center gap-[6px] focus-ring-brand transition-colors duration-micro active:scale-90"
                            aria-label="Thích đánh giá này"
                            aria-pressed={!!likedReviews[`_${review.id}`]}
                          >
                            {likedReviews[`_${review.id}`] ? (
                              <svg className="h-4 w-4 shrink-0 text-[#D32F2F]" viewBox="0 0 16 16" fill="#D32F2F" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 14C8 14 2 9.5 2 5C2 3.34315 3.34315 2 5 2C6.10457 2 7.07843 2.55414 7.625 3.4C7.95386 3.99269 8.47193 4.47328 9.10862 4.77682C9.7453 5.08035 10.4686 5.19269 11.1796 5.09882C11.8905 5.00494 12.5539 4.7087 13.0799 4.24981C13.6058 3.79092 13.9677 3.19041 14.115 2.53277C14.2624 1.87514 14.1879 1.19261 13.9021 0.581797C13.6163 -0.0290182 13.1346 -0.507642 12.5 0.5L8 14Z"/>
                              </svg>
                            ) : (
                              <svg className="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 14C8 14 2 9.5 2 5C2 3.34315 3.34315 2 5 2C6.10457 2 7.07843 2.55414 7.625 3.4C7.95386 3.99269 8.47193 4.47328 9.10862 4.77682C9.7453 5.08035 10.4686 5.19269 11.1796 5.09882C11.8905 5.00494 12.5539 4.7087 13.0799 4.24981C13.6058 3.79092 13.9677 3.19041 14.115 2.53277C14.2624 1.87514 14.1879 1.19261 13.9021 0.581797C13.6163 -0.0290182 13.1346 -0.507642 12.5 0.5L8 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                              </svg>
                            )}
                            <span className={likedReviews[`_${review.id}`] ? "text-[#D32F2F]" : ""}>
                              {likedReviews[`_${review.id}`] ? "Đã thích" : "Thích"}
                            </span>
                            <span>({(review.likeCount || 0) + (likedReviews[review.id] || 0)})</span>
                          </button>
                          <span>{formatReviewTime(review.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                <div className="flex w-full items-center justify-center gap-[28.3px]">
                  <button
                    type="button"
                    onClick={() => handleReviewPage(Math.max(1, reviewPage - 1))}
                    disabled={reviewPage === 1}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[4px] border border-transparent p-2 transition-all duration-micro disabled:cursor-not-allowed disabled:opacity-30 hover:border-[#90CAF9] hover:bg-[#E3F2FD] focus-ring-brand"
                    aria-label="Trang trước"
                  >
                    <img src={productImages.paginationPrev} alt="" className="h-6 w-6" />
                  </button>
                  <div className="flex items-center">
                    {getPageNumbers().map((page, i) =>
                      page === "..." ? (
                        <span key={`ellipsis-${i}`} className="px-3 font-['Inter'] text-[18px] font-medium leading-[28px] text-[#7D858D]">
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          type="button"
                          onClick={() => handleReviewPage(page)}
                          className={`mx-[3px] flex h-10 w-10 cursor-pointer items-center justify-center rounded-[4px] font-['Inter'] text-[18px] font-medium leading-[28px] transition-all duration-micro focus-ring-brand ${
                            page === reviewPage
                              ? "bg-[#0D47A1] text-white shadow-md"
                              : "text-[#7D858D] hover:bg-[#E3F2FD] hover:text-[#0D47A1]"
                          }`}
                          aria-label={`Trang ${page}`}
                          aria-current={page === reviewPage ? "page" : undefined}
                        >
                          {page}
                        </button>
                      ),
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleReviewPage(Math.min(totalReviewPages, reviewPage + 1))}
                    disabled={reviewPage === totalReviewPages}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[4px] border border-transparent p-2 transition-all duration-micro disabled:cursor-not-allowed disabled:opacity-30 hover:border-[#90CAF9] hover:bg-[#E3F2FD] focus-ring-brand"
                    aria-label="Trang sau"
                  >
                    <img src={productImages.paginationNext} alt="" className="h-6 w-6" />
                  </button>
                </div>

                {showWriteReview && (
                  <div className="mt-[50px] w-full">
                    <WriteReviewForm targetId={product.id} targetName={product.name} onSubmit={handleReviewSubmit} />
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ---- Similar Products ---- */}
        <section className="flex h-auto w-[1440px] flex-col items-center justify-center gap-[36px] px-[80px] py-[60px]">
          <div className="w-full">
            <h3 className="text-[32px] font-bold leading-[1.235] tracking-[0.25px] text-[#0D47A1]">Sản phẩm tương tự</h3>
          </div>

          <div className="relative flex w-full items-center gap-5">
            {/* Prev button */}
            <button
              type="button"
              onClick={handleSimPrev}
              disabled={!canGoSimPrev}
              className="btn-carousel disabled:opacity-30"
              aria-label="Sản phẩm trước"
            >
              ‹
            </button>

            {/* Cards */}
            <div
              className="overflow-hidden py-3"
              style={{ width: SIM_CARD_WIDTH * SIM_VISIBLE_COUNT + SIM_CARD_GAP * (SIM_VISIBLE_COUNT - 1) }}
            >
              <div
                className="flex gap-5 transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${simOffset * (SIM_CARD_WIDTH + SIM_CARD_GAP)}px)` }}
              >
                {similarProducts.map((product) => (
                  <div
                  key={product.id}
                    className="shrink-0"
                    style={{ width: SIM_CARD_WIDTH }}
                  >
                    <ShoppingProductCard
                      product={product}
                      href="/product-details"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Next button */}
            <button
              type="button"
              onClick={handleSimNext}
              disabled={!canGoSimNext}
              className="btn-carousel disabled:opacity-30"
              aria-label="Sản phẩm tiếp"
            >
              ›
            </button>
          </div>
        </section>

        <Footer />
      </CanvasLayout>
    </div>
  );
}
