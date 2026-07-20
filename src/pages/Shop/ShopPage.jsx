import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { shopImages } from "../../assets/shopImages";
import Footer from "../../components/Footer/Footer";
import CanvasLayout from "../../components/layout/CanvasLayout";
import ScaledCanvasLayout from "../../components/layout/ScaledCanvasLayout";
import NavBar from "../../components/Navbar";
import ShoppingProductCard from "../../components/product/ShoppingProductCard";
import FeedbackSection from "../../components/shop/FeedbackSection";
import ShopHeroSection from "../../components/shop/ShopHeroSection";
import { useAuth } from "../../context/AuthContext";
import { FEATURED_PRODUCTS, PRODUCT_CATEGORIES, SHOP_PRODUCTS, SHOP_PROMOTION_PAGES } from "../../data/shopData";
import { getActiveFlashSale, getBestSellingProducts } from "../../services/productService";

const FLASH_SALE_FALLBACK_MS = 5 * 60 * 60 * 1000;

const SECTION_TITLE_TYPOGRAPHY = {
  fontFamily: '"Baloo Tamma 2", "Baloo 2", cursive',
  fontWeight: 700,
  fontStyle: "normal",
  fontSize: "64px",
  lineHeight: "110%",
  letterSpacing: "0px",
};

function getFallbackFlashSaleEndTime() {
  return new Date(Date.now() + FLASH_SALE_FALLBACK_MS).toISOString();
}

function getFlashSaleCountdownTarget(sale) {
  const endTime = sale?.endTime ? new Date(sale.endTime).getTime() : NaN;
  if (Number.isFinite(endTime) && endTime > Date.now()) return sale.endTime;

  const startTime = sale?.startTime ? new Date(sale.startTime).getTime() : NaN;
  if (Number.isFinite(startTime) && startTime > Date.now()) return sale.startTime;

  return getFallbackFlashSaleEndTime();
}

function getRemainingTimeParts(targetTime) {
  const target = new Date(targetTime).getTime();
  const remainingMs = Number.isFinite(target) ? Math.max(target - Date.now(), 0) : FLASH_SALE_FALLBACK_MS;
  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0"));
}

function ShopCanvas() {
  const navigate = useNavigate();

  /* ---- FlashSale: horizontal carousel, slide 1 card at a time ---- */
  const CARD_WIDTH = 170;
  const CARD_GAP = 20;
  const VISIBLE_COUNT = 6;
  const [flashOffset, setFlashOffset] = useState(0);
  const [flashProducts, setFlashProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productError, setProductError] = useState("");
  const [flashSaleEndsAt, setFlashSaleEndsAt] = useState(getFallbackFlashSaleEndTime);
  const [flashSaleCountdown, setFlashSaleCountdown] = useState(() => getRemainingTimeParts(flashSaleEndsAt));
  const discountedBestSellers = bestSellerProducts.filter((product) => product.discountPercent);
  const flashDisplayProducts = flashProducts.length
    ? flashProducts
    : (discountedBestSellers.length ? discountedBestSellers : bestSellerProducts).slice(0, 12);

  const canGoPrev = flashOffset > 0;
  const canGoNext = flashOffset < Math.max(flashDisplayProducts.length - VISIBLE_COUNT, 0);

  useEffect(() => {
    let isMounted = true;

    async function loadSectionProducts() {
      try {
        setIsLoadingProducts(true);
        setProductError("");
        const [activeFlashSale, bestSellingProducts] = await Promise.all([
          getActiveFlashSale(12),
          getBestSellingProducts(12),
        ]);

        if (isMounted) {
          const activeFlashSaleProducts = activeFlashSale?.products ?? [];
          setFlashProducts(Array.isArray(activeFlashSaleProducts) ? activeFlashSaleProducts : []);
          setFlashSaleEndsAt(getFlashSaleCountdownTarget(activeFlashSale?.sale));
          setBestSellerProducts(Array.isArray(bestSellingProducts) ? bestSellingProducts : []);
        }
      } catch {
        if (isMounted) {
          setProductError("");
          setFlashProducts(FEATURED_PRODUCTS.filter((product) => product.discountPercent).slice(0, 12));
          setFlashSaleEndsAt(getFallbackFlashSaleEndTime());
          setBestSellerProducts(SHOP_PRODUCTS.slice(0, 12));
        }
      } finally {
        if (isMounted) {
          setIsLoadingProducts(false);
        }
      }
    }

    loadSectionProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setFlashSaleCountdown(getRemainingTimeParts(flashSaleEndsAt));
    const timer = window.setInterval(() => {
      setFlashSaleCountdown(getRemainingTimeParts(flashSaleEndsAt));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [flashSaleEndsAt]);

  useEffect(() => {
    setFlashOffset(0);
  }, [flashDisplayProducts.length]);

  const goPrevFlash = () => {
    if (!canGoPrev) return;
    setFlashOffset((prev) => prev - 1);
  };

  const goNextFlash = () => {
    if (!canGoNext) return;
    setFlashOffset((prev) => prev + 1);
  };

  /* ---- Promotion carousel ---- */
  const [promotionPageIndex, setPromotionPageIndex] = useState(0);
  const [promoDirection, setPromoDirection] = useState(0);
  const promoTimerRef = useRef(null);
  const currentPromoPage = SHOP_PROMOTION_PAGES[promotionPageIndex];
  const [leftPromotion, rightPromotion] = currentPromoPage;

  const advancePromo = useCallback(() => {
    setPromoDirection(1);
    setPromotionPageIndex((prev) => (prev + 1) % SHOP_PROMOTION_PAGES.length);
  }, []);

  useEffect(() => {
    promoTimerRef.current = setInterval(advancePromo, 5000);
    return () => clearInterval(promoTimerRef.current);
  }, [advancePromo]);

  const goPromoPage = (idx) => {
    if (idx === promotionPageIndex) return;
    clearInterval(promoTimerRef.current);
    const forward = idx > promotionPageIndex
      ? idx - promotionPageIndex
      : idx + SHOP_PROMOTION_PAGES.length - promotionPageIndex;
    setPromoDirection(forward <= SHOP_PROMOTION_PAGES.length / 2 ? 1 : -1);
    setPromotionPageIndex(idx);
    promoTimerRef.current = setInterval(advancePromo, 5000);
  };

  const goPrevPromotion = () => {
    clearInterval(promoTimerRef.current);
    const next = (promotionPageIndex - 1 + SHOP_PROMOTION_PAGES.length) % SHOP_PROMOTION_PAGES.length;
    goPromoPage(next);
  };

  const goNextPromotion = () => {
    clearInterval(promoTimerRef.current);
    goPromoPage((promotionPageIndex + 1) % SHOP_PROMOTION_PAGES.length);
  };

  const pausePromo = useCallback(() => {
    clearInterval(promoTimerRef.current);
  }, []);

  const resumePromo = useCallback(() => {
    clearInterval(promoTimerRef.current);
    promoTimerRef.current = setInterval(advancePromo, 5000);
  }, [advancePromo]);

  const promoSlideClass =
    promoDirection === 0 ? "translate-x-0" : promoDirection > 0 ? "animate-feedback-in-next" : "animate-feedback-in-prev";

  /* ---- Promotion Banner: dịch lên 1cm = top[calc(2218px+0.5cm)] ---- */

  return (
    <main className="relative h-[calc(3346px+0.5cm)] w-[1440px] bg-white">
      <ShopHeroSection />

      <section className="absolute left-0 top-[calc(755px+0.5cm)] h-[287px] w-[1440px] bg-white pt-[6px]">
        <div className="h-[68px] px-[124px] pb-0 pt-[10px]">
          <h2
            className="text-center text-[#02000F]"
            style={{ ...SECTION_TITLE_TYPOGRAPHY }}
          >
            Danh mục sản phẩm
          </h2>
        </div>
        <div className="mx-auto mt-0 w-[992px] px-0 py-[10px]">
          <div className="grid grid-cols-5">
            {PRODUCT_CATEGORIES.map((item) => (
              <button
                key={item.label}
                type="button"
                className="card-category w-full border-0 bg-transparent p-0"
                onClick={() => navigate(`/products?category=${item.slug}`)}
              >
                <img
                  src={item.image}
                  alt={item.label}
                  className="mx-auto h-[110px] w-[106px] object-contain"
                />
                <p className="mt-0 font-['Roboto'] text-[18px] font-normal leading-[1.6] text-black">
                  {item.label}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="absolute left-0 top-[calc(1055px+0.5cm)] w-[1440px] px-[83px] py-[10px]">
        <div className="rounded-[40px] bg-[#FFF9C4] px-[10px] pb-[27px] pt-[20px] shadow-[inset_0_0_10px_rgba(0,0,0,0.25)]">
          <h2
            className="text-center text-[#01579B]"
            style={{ ...SECTION_TITLE_TYPOGRAPHY }}
          >
            FLASH SALE
          </h2>
          <div className="mt-1 flex justify-center">
            {["Giờ", "Phút", "Giây"].map((label, index) => (
              <div key={label} className="w-[88px] text-center">
                <div className="mx-auto flex h-[50px] w-[58px] items-center justify-center rounded-[30px] bg-[#FDD835] font-['Fredoka'] text-[32px] font-semibold leading-[67.98px] text-[rgba(0,0,0,0.87)]">
                  {flashSaleCountdown[index]}
                </div>
                <p className="mt-1 font-['Roboto'] text-[20px] font-medium leading-[1.6] tracking-[0.15px] text-[#02000F]">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-center gap-5">
            <button
              type="button"
              className="btn-carousel disabled:opacity-30"
              aria-label="Xem sản phẩm trước"
              onClick={goPrevFlash}
              disabled={!canGoPrev}
            >
              ‹
            </button>
            <div
              className="overflow-hidden pt-3 pb-3"
              style={{ width: CARD_WIDTH * VISIBLE_COUNT + CARD_GAP * (VISIBLE_COUNT - 1) }}
            >
              {isLoadingProducts ? (
                <div className="flex h-[230px] items-center justify-center font-['Roboto'] text-[16px] font-medium text-[#01579B]">
                  Đang tải sản phẩm...
                </div>
              ) : flashDisplayProducts.length ? (
                <div
                  className="flex gap-5 transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${flashOffset * (CARD_WIDTH + CARD_GAP)}px)` }}
                >
                  {flashDisplayProducts.map((p, idx) => (
                    <div
                      key={p.id}
                      className="shrink-0"
                      style={{ width: CARD_WIDTH }}
                    >
                      <ShoppingProductCard
                        id={p.id}
                        product={p}
                        variant={idx < 2 || p.discountPercent ? "tag" : "default"}
                        href="/product-details"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-[230px] items-center justify-center text-center font-['Roboto'] text-[16px] font-medium text-[#01579B]">
                  {productError || "Chưa có sản phẩm flash sale."}
                </div>
              )}
            </div>
            <button
              type="button"
              className="btn-carousel disabled:opacity-30"
              aria-label="Xem sản phẩm tiếp"
              onClick={goNextFlash}
              disabled={!canGoNext}
            >
              ›
            </button>
          </div>
        </div>
      </section>

      <section className="absolute left-0 top-[calc(1538px+0.5cm)] h-[767px] w-[1440px] bg-[radial-gradient(50%_50%_at_50%_50%,#E3F2FD_25.48%,#FFFFFF_100%)] py-[50px]">
        <div className="relative mx-auto h-[70px] w-[900px]">
          <img src={shopImages.bestSellerStroke} alt="" className="absolute left-[479px] top-[50px] h-[7px] w-[243px]" />
          <h2
            className="text-center text-[#0F172A]"
            style={{ ...SECTION_TITLE_TYPOGRAPHY }}
          >
            Sản phẩm bán chạy
          </h2>
          <img src={shopImages.bestSellerSpark} alt="" className="absolute left-[717px] top-[-12px] h-[42px] w-[43px]" />
        </div>
        <div className="mx-auto mt-5 grid w-[1200px] grid-cols-6 justify-items-center gap-x-5 gap-y-[10px]">
          {isLoadingProducts ? (
            <div className="col-span-6 flex h-[260px] items-center justify-center font-['Roboto'] text-[16px] font-medium text-[#01579B]">
              Đang tải sản phẩm...
            </div>
          ) : bestSellerProducts.length ? (
            bestSellerProducts.map((p) => (
              <ShoppingProductCard
                key={`best-${p.id}`}
                id={p.id}
                product={p}
                href="/product-details"
              />
            ))
          ) : (
            <div className="col-span-6 flex h-[260px] items-center justify-center text-center font-['Roboto'] text-[16px] font-medium text-[#01579B]">
              {productError || "Chưa có sản phẩm bán chạy."}
            </div>
          )}
        </div>
        <div className="mt-5 pt-5 flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="btn-yellow flex h-[42px] items-center gap-2 px-4 text-[15px] tracking-[0.46px]"
          >
            XEM THÊM
            <span className="text-xl leading-none">›</span>
          </button>
        </div>
      </section>

      <section className="absolute left-0 top-[calc(2308px)] w-[1440px] bg-white py-4"
        onMouseEnter={pausePromo}
        onMouseLeave={resumePromo}
      >
        <div className="mx-auto flex h-[269px] w-[1274px] items-center justify-between">
          <button
            type="button"
            onClick={goPrevPromotion}
            className="btn-carousel h-[56px] w-[56px] text-[32px]"
            aria-label="Khuyến mãi trước"
          >
            ‹
          </button>
          <div className="flex w-[1158px] items-center justify-between">
            <div
              key={promotionPageIndex}
              className={`relative h-[269px] w-[570px] ${promoSlideClass}`}
            >
              <img src={leftPromotion.image} alt="Promotion banner left" className="h-[269px] w-[570px] rounded-[30px] object-cover" />
              <button
                type="button"
                onClick={() => navigate(`/product-details/${leftPromotion.productId}`)}
                className="absolute left-[40px] top-[173px] h-[54px] w-[152.27px] rounded-[50px] bg-transparent"
                aria-label="Mua ngay banner trái"
              />
            </div>
            <div
              key={promotionPageIndex + "_r"}
              className={`relative h-[269px] w-[570px] ${promoSlideClass}`}
            >
              <img src={rightPromotion.image} alt="Promotion banner right" className="h-[269px] w-[570px] rounded-[30px] object-cover" />
              <button
                type="button"
                onClick={() => navigate(`/product-details/${rightPromotion.productId}`)}
                className="absolute left-[40px] top-[173px] h-[54px] w-[152.27px] rounded-[50px] bg-transparent"
                aria-label="Mua ngay banner phải"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={goNextPromotion}
            className="btn-carousel h-[56px] w-[56px] text-[32px]"
            aria-label="Khuyến mãi tiếp"
          >
            ›
          </button>
        </div>
        <div className="mt-[10px] flex items-center justify-center gap-[7px]">
          {SHOP_PROMOTION_PAGES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goPromoPage(idx)}
              className={`focus-ring-brand transition-all duration-component ease-premium ${
                idx === promotionPageIndex
                  ? "h-[8px] w-[24px] rounded-[20px] bg-[#F4E11B]"
                  : "h-[8px] w-[8px] rounded-full bg-[#D9D9D9] hover:bg-[#E6D445]"
              }`}
              aria-label={`Khuyến mãi ${idx + 1}`}
              aria-current={idx === promotionPageIndex ? "true" : undefined}
            />
          ))}
        </div>
      </section>

      <FeedbackSection
        onMouseEnter={pausePromo}
        onMouseLeave={resumePromo}
      />
    </main>
  );
}

function ShopPage() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <NavBar isAuthenticated={isAuthenticated} />
      <ScaledCanvasLayout className="bg-white">
        <ShopCanvas />
        <Footer />
      </ScaledCanvasLayout>
    </div>
  );
}

export default ShopPage;
