import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FEATURED_PRODUCTS, PRODUCT_CATEGORIES } from "../../data/shopData";
import ProductCard from "../product/ProductCard";
import SectionTitle from "./SectionTitle";
import YellowButton from "./YellowButton";
import { getBestSellingProducts } from "../../services/productService";

function ProductSection() {
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setIsLoadingProducts(true);
        setLoadError("");
        const data = await getBestSellingProducts(12);
        if (isMounted) {
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch {
        if (isMounted) {
          setLoadError("");
          setProducts(FEATURED_PRODUCTS);
        }
      } finally {
        if (isMounted) {
          setIsLoadingProducts(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

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
          {PRODUCT_CATEGORIES.map(({ label, image, slug }) => (
            <Link
              key={label}
              to={`/san-pham?category=${slug}`}
              className="card-category flex flex-col items-center gap-3 border-0 bg-transparent p-0 text-center"
            >
              <img
                src={image}
                alt={label}
                className="h-[110px] w-[106px] object-contain"
              />

              <p className="text-lg font-bold text-black">
                {label}
              </p>
            </Link>
          ))}
          </div>

        {isLoadingProducts ? (
          <div className="flex min-h-[392px] w-full max-w-[1200px] items-center justify-center text-base font-medium text-[#01579B]">
            Đang tải sản phẩm...
          </div>
        ) : loadError ? (
          <div className="flex min-h-[392px] w-full max-w-[1200px] items-center justify-center text-center text-base font-medium text-red-600">
            {loadError}
          </div>
        ) : products.length ? (
          <div className="grid w-full max-w-[1200px] grid-cols-2 justify-items-center gap-x-5 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant={product.discountPercent ? "tag" : "default"}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[392px] w-full max-w-[1200px] items-center justify-center text-base font-medium text-[#01579B]">
            Chưa có sản phẩm để hiển thị.
          </div>
        )}

        <YellowButton
          to="/san-pham"
          className="h-[42px] min-w-[154px]"
        >
          XEM THÊM 
          <span className="text-xl leading-none">›</span>
        </YellowButton>
      </div>
    </section>
  );
}

export default ProductSection;
