import { Star } from "lucide-react";

function RatingStar({ fillPercent, size, fillColor, emptyColor }) {
  return (
    <span
      className="relative inline-flex shrink-0"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Star
        size={size}
        strokeWidth={2}
        className="absolute inset-0"
        color={emptyColor}
        fill="transparent"
      />
      <span
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${fillPercent}%` }}
      >
        <Star
          size={size}
          strokeWidth={2}
          color={fillColor}
          fill={fillColor}
          style={{ minWidth: size }}
        />
      </span>
    </span>
  );
}

function ProductRating({
  value = 0,
  max = 5,
  size = 20,
  gap = 5,
  fillColor = "#FFB400",
  emptyColor = "rgba(0,0,0,0.23)",
  className = "",
}) {
  const rating = Math.min(Math.max(Number(value) || 0, 0), max);

  return (
    <div
      className={`flex shrink-0 items-center ${className}`}
      style={{ gap }}
      aria-label={`${rating} sao`}
    >
      {Array.from({ length: max }).map((_, index) => {
        const fillPercent = Math.min(Math.max(rating - index, 0), 1) * 100;

        return (
          <RatingStar
            key={index}
            fillPercent={fillPercent}
            size={size}
            fillColor={fillColor}
            emptyColor={emptyColor}
          />
        );
      })}
    </div>
  );
}

export default ProductRating;
