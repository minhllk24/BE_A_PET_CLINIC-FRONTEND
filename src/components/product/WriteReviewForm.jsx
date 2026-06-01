import { useState } from "react";

const imgCommenterAvatar =
  "https://www.figma.com/api/mcp/asset/6af6ab21-b98f-45b9-b5d0-61917d2047dc";
const imgIconStar =
  "https://www.figma.com/api/mcp/asset/4cc1209e-7852-4306-b55e-4b9e7992fee3";
const imgSubmitChevron =
  "https://www.figma.com/api/mcp/asset/f5b9b5c6-f596-4331-9829-0ac94ccb180b";

function StarRating({ value, onChange }) {
  return (
    <div className="flex h-6 items-center gap-[2px]" role="radiogroup" aria-label="Đánh giá sao">
      {Array.from({ length: 5 }, (_, index) => {
        const star = index + 1;
        const filled = star <= value;
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={filled}
            aria-label={`${star} sao`}
            onClick={() => onChange(star)}
            className="focus-ring-brand h-[16.101px] w-[16.101px] shrink-0"
          >
            <img
              src={imgIconStar}
              alt=""
              className={`size-full ${filled ? "opacity-100" : "opacity-25"}`}
            />
          </button>
        );
      })}
    </div>
  );
}

function WriteReviewForm() {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");

  return (
    <div className="flex w-full gap-5 rounded-[14px] border border-solid border-[#d3d3d3] bg-white py-[34px] pl-4 pr-[31px]">
      <img
        src={imgCommenterAvatar}
        alt=""
        className="size-[52px] shrink-0 rounded-full object-cover"
        aria-hidden="true"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-[30px]">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="flex w-full max-w-[500px] flex-col gap-[10px]">
            <label
              htmlFor="reviewer-name"
              className="font-['Roboto'] text-[16px] leading-[1.705] text-[#3d3d3d]"
            >
              Tên của bạn:
            </label>
            <input
              id="reviewer-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-14 w-full rounded-[16px] border border-solid border-[rgba(0,0,0,0.15)] bg-white px-5 font-['Roboto'] text-[16px] leading-[1.705] text-[#3d3d3d] outline-none backdrop-blur-[11px] focus:border-[#0d47a1]"
            />
          </div>

          <div className="flex flex-col gap-[15px]">
            <span className="font-['Roboto'] text-[16px] leading-[1.705] text-[#3d3d3d]">
              Đánh giá của bạn:
            </span>
            <StarRating value={rating} onChange={setRating} />
          </div>
        </div>

        <div className="w-full">
          <textarea
            id="review-text"
            value={review}
            onChange={(event) => setReview(event.target.value)}
            placeholder="Viết đánh giá của bạn..."
            rows={4}
            className="h-[136px] w-full resize-none rounded-[16px] border border-solid border-[rgba(0,0,0,0.15)] bg-white px-5 pb-2 pt-[18px] font-['Roboto'] text-[16px] leading-[1.705] text-[#3d3d3d] placeholder:text-[#949494] outline-none backdrop-blur-[11px] focus:border-[#0d47a1]"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className="btn-brand-yellow flex h-[42px] items-center justify-center gap-2 rounded-[4px] px-[22px] py-2 shadow-elevation"
          >
            <span className="font-['Roboto'] text-[15px] font-bold uppercase leading-[26px] tracking-[0.46px] text-black">
              Gửi đánh giá
            </span>
            <img src={imgSubmitChevron} alt="" className="size-[22px]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WriteReviewForm;
