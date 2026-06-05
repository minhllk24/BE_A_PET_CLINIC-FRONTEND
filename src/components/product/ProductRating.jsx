import { productCardImages } from "./productCardAssets";

function ProductRating() {
  return (
    <div className="flex items-center">
      {/* full */}
      <img
        src={productCardImages.starFull}
        alt=""
        className="w-6 h-6"
      />

      <img
        src={productCardImages.starFull}
        alt=""
        className="w-6 h-6"
      />

      {/* half */}
      <div className="relative w-6 h-6">
        {/* star empty */}
        <img
          src={productCardImages.starEmpty}
          alt=""
          className="absolute inset-0 w-6 h-6"
        />

        {/* half filled */}
        <div className="absolute inset-0 overflow-hidden w-1/2">
          <img
            src={productCardImages.starFull}
            alt=""
            className="w-6 h-6 max-w-none"
          />
        </div>
      </div>

      {/* empty */}
      <img
        src={productCardImages.starEmpty}
        alt=""
        className="w-6 h-6"
      />

      <img
        src={productCardImages.starEmpty}
        alt=""
        className="w-6 h-6"
      />
    </div>
  );
}

export default ProductRating;
