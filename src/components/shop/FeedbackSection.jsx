import { useCallback, useRef, useState } from "react";
import { shopImages } from "../../assets/shopImages";
import { FEEDBACK_PAGE_COUNT, FEEDBACK_PAGES } from "./feedbackData";

const SECTION_TITLE_TYPOGRAPHY = {
  fontFamily: '"Baloo Tamma 2", "Baloo 2", cursive',
  fontWeight: 700,
  fontStyle: "normal",
  fontSize: "64px",
  lineHeight: "110%",
  letterSpacing: "0px",
};

/** Figma: vùng nội dung card — chiều cao cố định từng khối */
const FEEDBACK_QUOTE_LINES = 4;
const FEEDBACK_QUOTE_LINE_HEIGHT = 28; // leading-7
const FEEDBACK_QUOTE_HEIGHT = FEEDBACK_QUOTE_LINES * FEEDBACK_QUOTE_LINE_HEIGHT;
const FEEDBACK_AUTHOR_HEIGHT = 68;

function FeedbackCard({ review }) {
  return (
    <article className="flex h-[280px] min-h-[280px] w-full min-w-0 flex-col rounded-3xl bg-white p-10 transition-[transform,box-shadow] duration-component ease-premium hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
      <p className="h-6 shrink-0 text-[#FF9D00] leading-6" aria-label="5 sao">
        ★★★★★
      </p>
      <p
        className="mt-2 shrink-0 overflow-hidden text-[16px] leading-7 text-[#333] line-clamp-4"
        style={{ height: FEEDBACK_QUOTE_HEIGHT }}
      >
        &ldquo;{review.text}&rdquo;
      </p>
      <div
        className="mt-3 flex shrink-0 items-center gap-4"
        style={{ height: FEEDBACK_AUTHOR_HEIGHT }}
      >
        <img
          src={review.avatar}
          alt=""
          className="h-11 w-11 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[24px] font-medium leading-6 text-[#02000F]">
            {review.name}
          </p>
          <p className="truncate text-[16px] leading-7 text-[#6C6D71]">
            {review.company}
          </p>
        </div>
      </div>
    </article>
  );
}

function FeedbackDot({ isActive, onClick, pageIndex, totalPages }) {
  return (
    <button
      type="button"
      role="tab"
      onClick={onClick}
      aria-label={`Trang phản hồi ${pageIndex + 1} / ${totalPages}`}
      aria-selected={isActive}
      className={[
        "focus-ring-brand shrink-0 transition-all duration-component ease-premium",
        isActive
          ? "h-[22px] w-[22px] rounded-[9px] border-[3px] border-[#02000F] bg-[#F4E11B] scale-110"
          : "h-[22px] w-[22px] rounded-[9px] bg-white hover:bg-[#FFFDE7] hover:scale-105 active:scale-95",
      ].join(" ")}
    />
  );
}

function FeedbackSection() {
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef(null);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setPageIndex((prev) => (prev - 1 + FEEDBACK_PAGE_COUNT) % FEEDBACK_PAGE_COUNT);
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setPageIndex((prev) => (prev + 1) % FEEDBACK_PAGE_COUNT);
  }, []);

  const goToPage = useCallback(
    (index) => {
      setPageIndex((prev) => {
        if (index === prev) return prev;
        const forward =
          index > prev
            ? index - prev
            : index + FEEDBACK_PAGE_COUNT - prev;
        setDirection(forward <= FEEDBACK_PAGE_COUNT / 2 ? 1 : -1);
        return index;
      });
    },
    [],
  );

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "Home") {
      event.preventDefault();
      setDirection(-1);
      setPageIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setDirection(1);
      setPageIndex(FEEDBACK_PAGE_COUNT - 1);
    }
  };

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

  const slideOffset =
    direction === 0 ? "translate-x-0" : direction > 0 ? "animate-feedback-in-next" : "animate-feedback-in-prev";

  return (
    <section
      className="absolute left-0 top-[calc(2637px+0.5cm)] h-[683px] w-[1440px] overflow-hidden"
      aria-label="Phản hồi của khách hàng"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img
        src={shopImages.feedbackBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 px-[120px] pt-10">
        <h2
          className="text-center text-[#02000F]"
          style={{ ...SECTION_TITLE_TYPOGRAPHY }}
        >
          Phản hồi của khách hàng
        </h2>

        <div className="relative mt-[58px] h-[280px] overflow-hidden">
          <div
            key={pageIndex}
            className={`grid h-full grid-cols-3 items-stretch gap-[10px] ${slideOffset}`}
            role="tabpanel"
            aria-live="polite"
            aria-label={`Trang ${pageIndex + 1} / ${FEEDBACK_PAGE_COUNT}`}
          >
            {FEEDBACK_PAGES[pageIndex].map((review) => (
              <FeedbackCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        <div
          className="mt-[58px] flex items-center justify-center gap-[21px]"
          role="tablist"
          aria-label="Chọn trang phản hồi"
        >
          <button
            type="button"
            onClick={goPrev}
            className="btn-icon-subtle flex shrink-0 items-center justify-center rounded-lg p-1 opacity-80 transition-opacity hover:opacity-100 disabled:opacity-30"
            aria-label="Trang phản hồi trước"
          >
            <img
              src={shopImages.feedbackCarouselLeft}
              alt=""
              className="h-[10px] w-[271px] object-contain"
            />
          </button>

          <div className="flex items-center gap-[21px]">
            {Array.from({ length: FEEDBACK_PAGE_COUNT }, (_, idx) => (
              <FeedbackDot
                key={idx}
                pageIndex={idx}
                totalPages={FEEDBACK_PAGE_COUNT}
                isActive={idx === pageIndex}
                onClick={() => goToPage(idx)}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="btn-icon-subtle flex shrink-0 items-center justify-center rounded-lg p-1 opacity-80 transition-opacity hover:opacity-100 disabled:opacity-30"
            aria-label="Trang phản hồi tiếp"
          >
            <img
              src={shopImages.feedbackCarouselRight}
              alt=""
              className="h-[10px] w-[271px] object-contain"
            />
          </button>
        </div>
      </div>

      <img
        src={shopImages.feedbackPawSmall}
        alt=""
        className="pointer-events-none absolute left-[278px] top-[103px] h-[60px] w-[60px]"
      />
      <img
        src={shopImages.feedbackPawSmall}
        alt=""
        className="pointer-events-none absolute left-[1085px] top-[90px] h-[60px] w-[60px]"
      />
      <img
        src={shopImages.feedbackPawBlue}
        alt=""
        className="pointer-events-none absolute left-[1145px] top-[102px] h-[48px] w-[49px]"
      />
      <img
        src={shopImages.feedbackPawBlue}
        alt=""
        className="pointer-events-none absolute left-[158.39px] top-[512.17px] h-[48px] w-[49px]"
      />
      <img
        src={shopImages.feedbackPawBlueSmall}
        alt=""
        className="pointer-events-none absolute left-[158.39px] top-[526.17px] h-[34px] w-[34px]"
      />
      <img
        src={shopImages.feedbackPawDark}
        alt=""
        className="pointer-events-none absolute bottom-0 right-[12px] h-[87px] w-[87px]"
      />
    </section>
  );
}

export default FeedbackSection;
