import { homeImages } from "../../assets/homeImages";
import SectionTitle from "./SectionTitle";
import YellowButton from "./YellowButton";

const CATEGORIES = [
  { label: "Thức ăn", image: homeImages.category1 },
  { label: "Đồ dùng thiết yếu", image: homeImages.category2 },
  { label: "Chăm sóc sức khỏe", image: homeImages.category3 },
  { label: "Đồ chơi", image: homeImages.category4 },
  { label: "Phụ kiện", image: homeImages.category5 },
];

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="3.5 sao">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={i <= 3 ? "text-secondary" : "text-gray-300"}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ProductCard() {
  return (
    <article className="relative flex w-[170px] flex-col rounded-[30px] bg-white p-2.5 shadow-md">
      <img
        src={homeImages.productPlaceholder}
        alt="Sản phẩm"
        className="mb-2 h-[110px] w-full rounded-[20px] object-cover"
      />
      <p className="text-sm text-black">ten sp</p>
      <div className="mt-1 flex items-center justify-between">
        <p className="text-sm font-medium text-black">$13.00</p>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-lg"
          aria-label="Thêm vào giỏ"
        >
          <img
            src={homeImages.cart_black}
            alt="Thêm vào giỏ"
            className="h-6 w-6"
          />
    
        </button>
      </div>
      <div className="mt-2">
        <StarRating />
      </div>
    </article>
  );
}

function ProductSection() {
  const products = Array.from({ length: 12 }, (_, i) => i);

  return (
    <section
      id="mua-sắm"
      className="w-full py-12 md:py-[50px]"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, var(--primary-main, #E3F2FD) 25.48%, var(--background-default, #FFF) 100%)",
      }}
    >
      <div className="relative font-bold mx-auto flex max-w-page flex-col items-center gap-10 px-6 md:px-20">
        <svg
          className="absolute top-[50px] h-[15px] w-[179px]"
          viewBox="0 0 182 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M0.213867 5.64588C23.7047 3.62998 109.211 -0.290806 179.214 5.6459C142.876 5.6459 106.198 6.7462 75.7139 13"
            stroke="#FDD835"
            strokeWidth="5"
            strokeLinejoin="round"
          />
        </svg>
        <SectionTitle>Pet shop</SectionTitle>

        <div className="grid w-full max-w-[992px] grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {CATEGORIES.map(({ label, image }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 text-center"
            >
              <img
                src={image}
                alt={label}
                className="h-[110px] w-[106px] object-contain transition duration-300 hover:scale-105"
              />

              <p className="text-lg font-bold text-black">
                {label}
              </p>
            </div>
          ))}
          </div>

          <div className="w-full max-w-[1200px] space-y-2.5">
            <div className="flex flex-wrap justify-center gap-5 rounded-lg p-2.5">
              {products.slice(0, 6).map((id) => (
                <ProductCard key={id} />
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-5 rounded-lg p-2.5">
              {products.slice(6, 12).map((id) => (
                <ProductCard key={id} />
              ))}
          </div>
        </div>
   

        <YellowButton className="h-[42px] min-w-[154px]">XEM THÊM →</YellowButton>
      </div>
    </section>
  );
}

export default ProductSection;
