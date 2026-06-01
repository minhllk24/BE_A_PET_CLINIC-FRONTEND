import { productCardImages } from "./productCardAssets";

function ProductRating() {
  return (
    <div className="flex shrink-0 items-center" aria-label="2.5 sao">
      <img
        src={productCardImages.starFull}
        alt=""
        className="size-6 shrink-0"
      />
      <img
        src={productCardImages.starFull}
        alt=""
        className="size-6 shrink-0"
      />
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
      <img
        src={productCardImages.starEmpty}
        alt=""
        className="size-6 shrink-0"
      />
      <img
        src={productCardImages.starEmpty}
        alt=""
        className="size-6 shrink-0"
      />
    </div>
  );
}

export default ProductRating;
