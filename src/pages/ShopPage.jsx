import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { homeImages } from "../assets/homeImages";
import { shopImages } from "../assets/shopImages";
import Footer from "../components/layout/Footer";
import CanvasLayout from "../components/layout/CanvasLayout";
import ScaledCanvasLayout from "../components/layout/ScaledCanvasLayout";
import NavBar from "../components/Navbar";
import ProductCard from "../components/product/ProductCard";
import FeedbackSection from "../components/shop/FeedbackSection";
import ShopHeroSection from "../components/shop/ShopHeroSection";

import { TEST_AUTHENTICATED } from "../config/devFlags";

const CATEGORIES = [
  { label: "Thức ăn", image: homeImages.category1, slug: "thuc-an" },
  { label: "Đồ dùng thiết yếu", image: homeImages.category2, slug: "do-dung-thiet-yeu" },
  { label: "Chăm sóc sức khỏe", image: homeImages.category3, slug: "cham-soc-suc-khoe" },
  { label: "Đồ chơi", image: homeImages.category4, slug: "do-choi" },
  { label: "Phụ kiện", image: homeImages.category5, slug: "phu-kien" },
];

const PRODUCTS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: "ten sp",
  oldPrice: "$23.00",
  price: "$13.00",
}));

const SECTION_TITLE_TYPOGRAPHY = {
  fontFamily: '"Baloo Tamma 2", "Baloo 2", cursive',
  fontWeight: 700,
  fontStyle: "normal",
  fontSize: "64px",
  lineHeight: "110%",
  letterSpacing: "0px",
};

const PROMOTION_ITEMS = shopImages.promoBanners.map((image) => ({ image }));

const PROMOTION_PAGES = [
  [PROMOTION_ITEMS[0], PROMOTION_ITEMS[1]],
  [PROMOTION_ITEMS[2], PROMOTION_ITEMS[3]],
];

function ShopCanvas() {
  const navigate = useNavigate();

  /* ---- FlashSale: horizontal carousel, slide 1 card at a time ---- */
  const CARD_WIDTH = 170; // approx card width + gap
  const VISIBLE_COUNT = 6;
  const [flashOffset, setFlashOffset] = useState(0);
  const [flashAnimKey, setFlashAnimKey] = useState(0);

  const canGoPrev = flashOffset > 0;
  const canGoNext = flashOffset < PRODUCTS.length - VISIBLE_COUNT;

  const goPrevFlash = () => {
    if (!canGoPrev) return;
    setFlashOffset((prev) => prev - 1);
    setFlashAnimKey((k) => k + 1);
  };

  const goNextFlash = () => {
    if (!canGoNext) return;
    setFlashOffset((prev) => prev + 1);
    setFlashAnimKey((k) => k + 1);
  };

  const visibleProducts = PRODUCTS.slice(flashOffset, flashOffset + VISIBLE_COUNT);

  /* ---- Promotion carousel ---- */
  const [promotionPageIndex, setPromotionPageIndex] = useState(0);
  const [promoDirection, setPromoDirection] = useState(0);
  const promoTimerRef = useRef(null);
  const currentPromoPage = PROMOTION_PAGES[promotionPageIndex];
  const [leftPromotion, rightPromotion] = currentPromoPage;

  const advancePromo = useCallback(() => {
    setPromoDirection(1);
    setPromotionPageIndex((prev) => (prev + 1) % PROMOTION_PAGES.length);
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
      : idx + PROMOTION_PAGES.length - promotionPageIndex;
    setPromoDirection(forward <= PROMOTION_PAGES.length / 2 ? 1 : -1);
    setPromotionPageIndex(idx);
    promoTimerRef.current = setInterval(advancePromo, 5000);
  };

  const goPrevPromotion = () => {
    clearInterval(promoTimerRef.current);
    const next = (promotionPageIndex - 1 + PROMOTION_PAGES.length) % PROMOTION_PAGES.length;
    goPromoPage(next);
  };

  const goNextPromotion = () => {
    clearInterval(promoTimerRef.current);
    goPromoPage((promotionPageIndex + 1) % PROMOTION_PAGES.length);
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
            {CATEGORIES.map((item) => (
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
            {["Giờ", "Phút", "Giây"].map((label) => (
              <div key={label} className="w-[88px] text-center">
                <div className="mx-auto flex h-[50px] w-[58px] items-center justify-center rounded-[30px] bg-[#FDD835] font-['Fredoka'] text-[32px] font-semibold leading-[67.98px] text-[rgba(0,0,0,0.87)]">
                  17
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
              key={flashAnimKey}
              className="flex gap-5 overflow-hidden"
              style={{ width: CARD_WIDTH * VISIBLE_COUNT + 5 * (VISIBLE_COUNT - 1) }}
            >
              {visibleProducts.map((p, idx) => (
                <div
                  key={p.id}
                  className="flash-card-animate shrink-0"
                  style={{ width: CARD_WIDTH }}
                >
                  <ProductCard
                    id={p.id}
                    variant={idx < 2 ? "tag" : "default"}
                    name={p.name}
                    price={p.price}
                    oldPrice={p.oldPrice}
                    href="/product-details"
                  />
                </div>
              ))}
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
        <div className="mx-auto mt-5 grid w-[1200px] grid-cols-6 justify-items-center gap-y-[10px]">
          {PRODUCTS.map((p) => (
            <ProductCard key={`best-${p.id}`} id={p.id} name={p.name} price={p.price} oldPrice={p.oldPrice} href="/product-details" />
          ))}
        </div>
        <div className="mt-5 flex justify-center">
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
          {PROMOTION_PAGES.map((_, idx) => (
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
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <NavBar isAuthenticated={TEST_AUTHENTICATED} />
      <ScaledCanvasLayout className="bg-white">
        <ShopCanvas />
        <Footer />
      </ScaledCanvasLayout>
    </div>
  );
}

export default ShopPage;
