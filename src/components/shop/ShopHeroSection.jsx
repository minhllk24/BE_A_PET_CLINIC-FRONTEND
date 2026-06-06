import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { shopImages } from "../../assets/shopImages";
import useCarouselKeyboard from "../../hooks/useCarouselKeyboard";

const AUTO_PLAY_MS = 5000;
const SLIDE_COUNT = 3;
const INDICATOR_ACTIVE_WIDTH = 80;
const INDICATOR_INACTIVE_WIDTH = 45;

/** Layout slide 1 (Group 1/3 — 1268:5602) — dùng chung cho cả 3 slide */
const HERO_LAYOUT = {
  background: shopImages.heroBg,
  backgroundImgClass:
    "absolute top-0 h-full w-[121.58%] max-w-none left-[-10.79%]",
  yellowInset: "inset-[10.09%_2.83%_10.23%_47.22%]",
  petFrame: "absolute right-[60px] top-[215.66px] h-[439.17px] w-[648px]",
};

const HERO_SLIDES = shopImages.heroPets.map((petSrc, index) => ({
  ...HERO_LAYOUT,
  id: `slide-${index + 1}`,
  petSrc,
}));

const FLOWER_ICON = shopImages.heroFlower;

function HeroSlideLayer({ slide, isActive }) {
  return (
    <div
      className={`absolute inset-0 size-full transition-opacity duration-[700ms] ease-in-out ${
        isActive ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isActive}
    >
      <div className="absolute inset-x-[30px] inset-y-0 overflow-hidden rounded-[100px]">
        <img
          src={slide.background}
          alt=""
          className={`pointer-events-none ${slide.backgroundImgClass}`}
        />
      </div>

      <div
        className={`absolute rounded-[100px] bg-[#E6D445] ${slide.yellowInset}`}
      />

      <div className={`${slide.petFrame} pointer-events-none`}>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={slide.petSrc}
            alt=""
            className="absolute left-0 top-0 size-full max-w-none object-contain object-bottom"
          />
        </div>
      </div>
    </div>
  );
}

function ShopHeroSection() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  const goToSlide = useCallback((index) => {
    setActiveIndex(index % SLIDE_COUNT);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % SLIDE_COUNT);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  useCarouselKeyboard({ onPrev: goPrev, onNext: goNext, enabled: !isPaused });

  useEffect(() => {
    if (isPaused) {
      return undefined;
    }

    const timer = window.setInterval(goNext, AUTO_PLAY_MS);
    return () => window.clearInterval(timer);
  }, [goNext, isPaused]);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current == null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    if (Math.abs(delta) > 48) {
      if (delta < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="absolute left-0 top-[13px] w-[1440px] px-[30px] pt-0"
      aria-label="Hero"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative mx-auto h-[729.48px] w-[1380px] overflow-hidden rounded-[100px]">
        <div className="absolute left-1/2 top-0 h-[729.48px] w-[1440px] -translate-x-1/2">
          {HERO_SLIDES.map((slide, index) => (
            <HeroSlideLayer
              key={slide.id}
              slide={slide}
              isActive={index === activeIndex}
            />
          ))}
        </div>

        <div className="pointer-events-none relative z-10 h-full w-full">
          <img
            src={FLOWER_ICON}
            alt=""
            className="absolute left-[60px] top-[195px] h-[30px] w-[30px] object-contain"
          />
          <p className="absolute left-[100px] top-[200px] w-[202.34px] font-['Roboto'] text-[20px] font-bold leading-6 text-[#02000F]">
            Thức ăn hữu cơ
          </p>
          <h1 className="absolute left-[60px] top-[250px] w-[562.73px] font-bold font-display text-4xl leading-tight text-[#02000f] md:text-[56px] md:leading-[68px]">
            Sản phẩm tốt nhất
            <br />
            cho thú cưng của bạn
          </h1>
          <p className="absolute left-[60px] top-[382.48px] w-[448.9px] font-['Roboto'] text-[20px] font-normal leading-[35px] text-[#4E4E4E]">
            Các thành phần hữu cơ chất lượng cao nhất, tốt nhất
            để tạo ra dòng sản phẩm vật nuôi 100% tự nhiên
          </p>
          <button
            type="button"
            onClick={() =>
              navigate(`/products?keyword=${encodeURIComponent("Thức ăn hữu cơ")}`)
            }
            className="btn-hero-cta pointer-events-auto absolute left-[60px] top-[510.48px] h-16 w-[203.61px]"
          >
            Khám phá ngay
          </button>
        </div>

        <div
          className="absolute bottom-[83.48px] left-[75px] z-20 flex items-center gap-[12px]"
          role="tablist"
          aria-label="Chọn slide"
        >
          {Array.from({ length: SLIDE_COUNT }, (_, index) => {
            const isActive = index === activeIndex;
            const width = isActive
              ? INDICATOR_ACTIVE_WIDTH
              : INDICATOR_INACTIVE_WIDTH;

            return (
              <button
                key={index}
                type="button"
                role="tab"
                onClick={() => goToSlide(index)}
                className="focus-ring-brand h-[10px] rounded-[20px] transition-all duration-component ease-premium hover:opacity-80"
                style={{
                  width: `${width}px`,
                  backgroundColor: isActive ? "#02000F" : "#999999",
                }}
                aria-label={`Slide ${index + 1}`}
                aria-selected={isActive}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ShopHeroSection;
