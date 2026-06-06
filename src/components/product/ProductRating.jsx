import { productCardImages } from "./productCardAssets";

function HalfStar() {
  return (
    <div className="relative size-6 shrink-0">
      <div
        className="absolute bottom-0 left-0 top-0 w-3 bg-[#FFB400]"
        style={{
          maskImage: `url('${productCardImages.starHalfMask}')`,
          maskSize: "24px 24px",
          maskRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute bottom-0 right-0 top-0 w-3 bg-[rgba(0,0,0,0.23)]"
        style={{
          maskImage: `url('${productCardImages.starHalfMask}')`,
          maskSize: "24px 24px",
          maskRepeat: "no-repeat",
          maskPosition: "-12px 0px",
        }}
      />
    </div>
  );
}

function ProductRating({ value = 0, max = 5 }) {
  const rating = Math.min(Math.max(Number(value) || 0, 0), max);

  return (
    <div className="flex shrink-0 items-center" aria-label={`${rating} sao`}>
      {Array.from({ length: max }).map((_, index) => {
        const starValue = rating - index;

        if (starValue >= 0.75) {
          return (
            <img
              key={index}
              src={productCardImages.starFull}
              alt=""
              className="size-6 shrink-0"
            />
          );
        }

        if (starValue >= 0.25) {
          return <HalfStar key={index} />;
        }

        return (
          <img
            key={index}
            src={productCardImages.starEmpty}
            alt=""
            className="size-6 shrink-0"
          />
        );
      })}
    </div>
  );
}

export default ProductRating;
