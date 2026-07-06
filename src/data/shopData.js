import { homeImages } from "../assets/homeImages";
import { shopImages } from "../assets/shopImages";

export const PRODUCT_CATEGORIES = [
  { label: "Thức ăn", image: homeImages.category1, slug: "thuc-an", count: 12 },
  { label: "Đồ dùng thiết yếu", image: homeImages.category2, slug: "do-dung-thiet-yeu", count: 8 },
  { label: "Chăm sóc sức khỏe", image: homeImages.category3, slug: "cham-soc-suc-khoe", count: 15 },
  { label: "Đồ chơi", image: homeImages.category4, slug: "do-choi", count: 6 },
  { label: "Phụ kiện", image: homeImages.category5, slug: "phu-kien", count: 20 },
];

export const PRODUCT_PRICE_RANGES = [
  { label: "20.000đ - 50.000đ", min: 20, max: 50 },
  { label: "50.000đ - 100.000đ", min: 50, max: 100 },
  { label: "100.000đ - 200.000đ", min: 100, max: 200 },
  { label: "200.000đ trở lên", min: 200, max: Infinity },
];

export const SHOP_PRODUCTS = Array.from({ length: 45 }, (_, index) => {
  const price = 20000 + ((index * 7000) % 180000);
  return {
    id: index + 1,
    categoryIdx: index % PRODUCT_CATEGORIES.length,
    name: `Sản phẩm ${index + 1}`,
    price,
    originalPrice: Math.round(price * 1.6),
    rating: 4.5,
    discountPercent: [0, 1, 2, 4, 11].includes(index) ? 56 : undefined,
  };
});

export const FEATURED_PRODUCTS = SHOP_PRODUCTS.slice(0, 12);

const promotionItems = shopImages.promoBanners.map((image, index) => ({
  image,
  productId: index + 1,
}));
export const SHOP_PROMOTION_PAGES = [
  [promotionItems[0], promotionItems[1]],
  [promotionItems[2], promotionItems[3]],
];
