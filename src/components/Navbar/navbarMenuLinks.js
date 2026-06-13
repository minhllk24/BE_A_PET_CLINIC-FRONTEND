export const NAV_LINKS = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Dịch vụ",
    href: "/services",
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
    label: "Cứu trợ",
    href: "/rescue",
    // children: [
    //   { label: "Thông tin cứu trợ", href: "/rescue/info" },
    //   { label: "Nhận nuôi", href: "/rescue/adoption" },
    // ],
  },
  {
    label: "Blog",
    href: "/blog",
    children: [
      { label: "Chia sẻ kiến thức", href: "/blog/kien-thuc" },
      { label: "Cẩm nang sơ cứu", href: "/blog/so-cuu" },
    ],
  },
  { label: "Về chúng tôi", href: "/about" },
  { label: "Liên hệ", href: "/contact" },
];
