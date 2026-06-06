import { homeImages } from "../assets/homeImages";

export const HOME_SERVICES = [
  {
    image: homeImages.service1,
    title: "Khám & Điều trị",
    description: "Đội ngũ bác sĩ chuyên khoa cùng trang thiết bị hiện đại, chẩn đoán chính xác, điều trị tận tâm và hỗ trợ cấp cứu cho bé yêu 24/7.",
    href: "/services/kham-dieu-tri",
  },
  {
    image: homeImages.service2,
    title: "Grooming & Spa",
    description: "Dịch vụ tắm sấy, cắt tỉa lông và chăm sóc vệ sinh giúp thú cưng luôn sạch sẽ, khỏe mạnh và thoải mái.",
    href: "/services/grooming-spa",
  },
  {
    image: homeImages.service3,
    title: "Pet Shop",
    description: "Cung cấp đa dạng sản phẩm dành cho thú cưng như thức ăn, phụ kiện, đồ chơi và sản phẩm chăm sóc sức khỏe từ nhiều thương hiệu uy tín.",
    href: "/petshop",
  },
];

export const HOME_DOCTORS = [
  { image: homeImages.doctor1, name: "BS. Nguyễn Minh Anh" },
  { image: homeImages.doctor2, name: "BS. Trần Quốc Huy" },
  { image: homeImages.doctor3, name: "BS. Lê Khánh Linh" },
  { image: homeImages.doctor4, name: "BS. Phạm Đức Thành" },
];

export const HOME_FEATURES = [
  ["Đặt lịch khám nhanh chóng", "Mua sắm sản phẩm đa dạng"],
  ["Quản lý hồ sơ số hóa", "Tư vấn chăm sóc chuyên sâu"],
  ["Theo dõi bệnh án trọn đời", "Kết nối cứu trợ và Nhận nuôi"],
];

export const HOME_BLOG_POSTS = [
  { author: "John Deo", date: "Aug 23, 2021", highlighted: false },
  { author: "John Doe", date: "Aug 23, 2021", highlighted: true },
  { author: "John Doe", date: "Aug 23, 2021", highlighted: false },
  { author: "John Doe", date: "Aug 23, 2021", highlighted: false },
];

export const HOME_BLOG_POST_TITLE = "8 Figma design systems that you can download for free today.";

export const HOME_FEATURED_BLOG = {
  author: "John Doe",
  date: "May 23, 2022",
  title: "Chăm sóc thú cưng đúng cách để luôn khỏe mạnh và vui vẻ.",
  description: "Tìm hiểu các nguyên tắc dinh dưỡng, vệ sinh và theo dõi sức khỏe giúp thú cưng phát triển toàn diện.",
};
