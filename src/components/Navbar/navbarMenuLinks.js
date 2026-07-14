export const NAV_LINKS = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Dịch vụ",
    href: "/service",
    children: [
      { label: "Khám & Điều trị", href: "/services/kham-dieu-tri" },
      { label: "Grooming & Spa", href: "/services/grooming-spa" },
      // { label: "Đặt lịch khám", href: "/booking" },
    ],
  },
  {
    label: "Mua sắm",
    href: "/petshop",
    children: [
      { label: "Thức ăn", href: "/products?category=thuc-an" },
      { label: "Đồ dùng thiết yếu", href: "/products?category=do-dung-thiet-yeu" },
      { label: "Chăm sóc sức khỏe", href: "/products?category=cham-soc-suc-khoe" },
      { label: "Đồ chơi", href: "/products?category=do-choi" },
      { label: "Phụ kiện", href: "/products?category=phu-kien" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
    children: [
      { label: "Kiến thức thú cưng", href: "/blog/kien-thuc" },
      { label: "Cộng đồng chia sẻ", href: "/blog/cong-dong" },
      { label: "Cẩm nang sơ cứu", href: "/blog/so-cuu" },
    ],
  },
  { label: "Cứu trợ", href: "/rescue" },
  { label: "Về chúng tôi", href: "/about" },
  { label: "Liên hệ", href: "/contact" },
];
