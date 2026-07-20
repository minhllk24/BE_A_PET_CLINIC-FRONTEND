export const NAV_LINKS = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Dịch vụ",
    href: "/dich-vu",
    children: [
      { label: "Khám & Điều trị", href: "/dich-vu/kham-dieu-tri" },
      { label: "Grooming & Spa", href: "/dich-vu/grooming-spa" },
      // { label: "Đặt lịch khám", href: "/dat-lich" },
    ],
  },
  {
    label: "Mua sắm",
    href: "/cua-hang",
    children: [
      { label: "Thức ăn", href: "/san-pham?category=thuc-an" },
      { label: "Đồ dùng thiết yếu", href: "/san-pham?category=do-dung-thiet-yeu" },
      { label: "Chăm sóc sức khỏe", href: "/san-pham?category=cham-soc-suc-khoe" },
      { label: "Đồ chơi", href: "/san-pham?category=do-choi" },
      { label: "Phụ kiện", href: "/san-pham?category=phu-kien" },
    ],
  },
  {
    label: "Blog",
    href: "/bai-viet",
    children: [
      { label: "Kiến thức thú cưng", href: "/bai-viet/kien-thuc" },
      { label: "Cộng đồng chia sẻ", href: "/bai-viet/cong-dong" },
      { label: "Cẩm nang sơ cứu", href: "/bai-viet/so-cuu" },
    ],
  },
  { label: "Cứu trợ", href: "/cuu-tro" },
  { label: "Về chúng tôi", href: "/ve-chung-toi" },
  { label: "Liên hệ", href: "/lien-he" },
];
