import { groomingImages } from "../../assets/groomingImages";
import { groomingTitleStyles } from "./groomingTitleStyles";

const REVIEWS = [
  {
    id: 1,
    lines: [
      "These are the perfect size for our small",
      "dog. The design is cute and the rubber on",
      "the bottom is great because it makes them",
      "more durable. They've held up to being...",
    ],
    author: "Mary Douglas",
    company: "Pet Shop Inc.",
  },
  {
    id: 2,
    lines: [
      "These are the perfect size for our small",
      "dog. The design is cute and the rubber on",
      "the bottom is great because it makes them",
      "more durable. They've held up to being...",
    ],
    author: "Mary Douglas",
    company: "Pet Shop Inc.",
  },
  {
    id: 3,
    lines: [
      "These are the perfect size for our small",
      "dog. The design is cute and the rubber on",
      "the bottom is great because it makes them",
      "more durable. They've held up to being...",
    ],
    author: "Mary Douglas",
    company: "Pet Shop Inc.",
  },
];

function ReviewCard({ review }) {
  return (
    <article className="flex flex-[1_0_0] flex-col justify-center gap-[10px] rounded-[24px] bg-white p-10">
      <div className="flex items-center gap-2 text-[15px] leading-[15px] text-[#FF9D00]">
        {"★★★★★".split("").map((star, index) => (
          <span key={`${review.id}-star-${index}`}>{star}</span>
        ))}
      </div>

      <div
        className="h-[118px] text-justify text-[#333]"
        style={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: 400,
          fontSize: 16,
          lineHeight: 1.75,
          letterSpacing: "0.15px",
        }}
      >
        {review.lines.map((line, index) => (
          <p key={`${review.id}-line-${index}`} className="mb-0">
            {index === 0 ? `"${line}` : line}
            {index === review.lines.length - 1 ? '"' : ""}
          </p>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <img
          src={groomingImages.feedbackAvatar}
          alt=""
          className="size-[44px] rounded-full object-cover"
        />
        <div className="flex w-[149.936px] flex-col gap-[2px]">
          <span
            className="text-[#02000F]"
            style={{
              fontFamily: "Fredoka, sans-serif",
              fontWeight: 500,
              fontSize: 24,
              lineHeight: "24px",
            }}
          >
            {review.author}
          </span>
          <span
            className="text-[#6C6D71]"
            style={{
              fontFamily: "Onest, sans-serif",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "28px",
            }}
          >
            {review.company}
          </span>
        </div>
      </div>
    </article>
  );
}

function GroomingFeedback() {
  return (
    <section className="relative flex h-[683px] w-full items-center justify-center overflow-hidden px-[120px]">
      <img
        src={groomingImages.feedbackBg}
        alt=""
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-full w-[1440px] max-w-none object-cover"
        aria-hidden="true"
      />

      <div className="relative flex h-[603px] flex-col items-end px-3 py-[34px]">
        <div className="flex w-[1416px] flex-col items-center gap-[58px]">
          <h2
            className="h-[58px] w-[942px]"
            style={groomingTitleStyles.dark64}
          >
            Phản hồi của khách hàng
          </h2>

          <div className="flex w-[1200px] items-center justify-center gap-[10px]">
            {REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          <div className="flex w-full items-center justify-center gap-[21px]">
            <img
              src={groomingImages.feedbackCarouselLeft}
              alt=""
              className="h-[10px] w-[271px]"
              aria-hidden="true"
            />
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className={`size-[22px] rounded-[9px] ${
                  index === 1
                    ? "border-[3px] border-[#02000F] bg-[#F4E11B]"
                    : "bg-white"
                }`}
              />
            ))}
            <img
              src={groomingImages.feedbackCarouselRight}
              alt=""
              className="h-[10px] w-[271px]"
              aria-hidden="true"
            />
          </div>
        </div>

        <img
          src={groomingImages.feedbackShape154}
          alt=""
          className="pointer-events-none absolute size-[87px]"
          aria-hidden="true"
        />
        <img
          src={groomingImages.feedbackShape150}
          alt=""
          className="pointer-events-none absolute left-[278px] top-[103px] size-[60px]"
          aria-hidden="true"
        />
        <img
          src={groomingImages.feedbackShape150}
          alt=""
          className="pointer-events-none absolute left-[1085px] top-[90px] size-[60px]"
          aria-hidden="true"
        />
        <img
          src={groomingImages.feedbackShape152}
          alt=""
          className="pointer-events-none absolute left-[1145px] top-[102px] h-[48px] w-[49px]"
          aria-hidden="true"
        />
        <img
          src={groomingImages.feedbackShape152}
          alt=""
          className="pointer-events-none absolute left-[158.39px] top-[512.17px] h-[48px] w-[49px]"
          aria-hidden="true"
        />
        <img
          src={groomingImages.feedbackShape153}
          alt=""
          className="pointer-events-none absolute left-[158.39px] top-[526.17px] size-[34px]"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

export default GroomingFeedback;
