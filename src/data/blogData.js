import { blogImages } from "../assets/blogImages";

export const BLOG_CATEGORIES = [
  { id: "all", label: "Tất cả" },
  { id: "health", label: "Sức khỏe" },
  { id: "nutrition", label: "Dinh dưỡng" },
  { id: "psychology", label: "Tâm lý" },
  { id: "grooming", label: "Vệ sinh & Làm đẹp" },
];

export const FEATURED_BLOG_POST = {
  id: "vaccine-5-in-1",
  category: "health",
  categoryLabel: "Sức khỏe",
  title: "Lịch tiêm phòng 5-trong-1 cần thiết cho chó con từ 2 tháng tuổi",
  excerpt:
    "Bảo vệ cún cưng khỏi các bệnh nguy hiểm bằng lịch tiêm phòng chuẩn y khoa. Cùng tìm hiểu chi tiết các mũi tiêm và lưu ý quan trọng.",
  image: blogImages.featuredVaccine,
  author: "BS. Minh Anh",
  authorImage: blogImages.authorMinhAnh,
  publishedAt: "4 Tháng 6, 2024",
  intro:
    "Việc tiêm phòng đầy đủ cho chó con không chỉ là trách nhiệm mà còn là cách thể hiện tình yêu thương đúng đắn của chủ nuôi dành cho thú cưng của mình.",
  description:
    "Tiêm phòng 5 trong 1 là loại vắc-xin tổng hợp giúp bảo vệ chó con khỏi 5 căn bệnh nguy hiểm thường gặp nhất: Care (Distemper), Parvo, Viêm gan (Hepatitis), Ho cũi chó (Parainfluenza) và Leptospirosis.",
  highlightTitle: "Vì sao cần tiêm từ 2 tháng tuổi?",
  highlightText:
    'Ở độ tuổi này, kháng thể từ sữa mẹ bắt đầu giảm dần, khiến chó con trở nên dễ bị tổn thương trước các tác nhân gây bệnh từ môi trường bên ngoài. Việc tiêm mũi đầu tiên vào tuần thứ 6-8 là thời điểm "vàng" để xây dựng hệ miễn dịch chủ động.',
  schedule: [
    "Mũi 1 (6-8 tuần tuổi): Bắt đầu vắc-xin 5 trong 1 hoặc 7 trong 1. Kiểm tra sức khỏe tổng quát trước khi tiêm.",
    "Mũi 2 (9-11 tuần tuổi): Nhắc lại vắc-xin tổng hợp để củng cố miễn dịch.",
    "Mũi 3 (12-14 tuần tuổi): Mũi nhắc cuối cùng của chu kỳ chó con và tiêm phòng Dại (Rabies).",
  ],
  tags: ["#SucKhoeThuCung", "#TiemPhongCho", "#ChamSocChoCon", "#Vaccine"],
};

export const QUICK_READ_POSTS = [
  ["quick-cold", "Chó mèo bị cảm lạnh: Dấu hiệu và cách chăm sóc", "12 Tháng 5, 2024"],
  ["quick-winter", "Tips Giữ Ấm Cho Thú Cưng Trong Mùa Đông", "08 Tháng 5, 2024"],
  ["quick-puppy", "Những Bệnh Nguy Hiểm Trên Chó Con Cần Lưu Ý", "01 Tháng 5, 2024"],
].map(([id, title, publishedAt]) => ({
  id,
  title,
  publishedAt,
  image: blogImages.postPlaceholder,
}));

export const TRENDING_BLOG_POSTS = [
  ["nutrition", "DINH DƯỠNG", "Chế độ dinh dưỡng cho mèo con: Nên chọn hạt nào?"],
  ["care", "CHĂM SÓC", "Cách chăm sóc mèo sơ sinh bị bỏ rơi: Cẩm nang cần biết"],
  ["grooming", "VỆ SINH", "5 cách khử mùi khay vệ sinh mèo hiệu quả nhất"],
  ["nutrition", "DINH DƯỠNG", "Top 5 loại pate dinh dưỡng giúp mèo tăng cân"],
  ["health", "SỨC KHỎE", "Dấu hiệu thú cưng cần được bác sĩ kiểm tra"],
].map(([category, categoryLabel, title], index) => ({
  id: `trending-${index + 1}`,
  category,
  categoryLabel,
  title,
  image: blogImages.trendingPlaceholder,
}));

const RECENT_POST_CONTENT = [
  ["health", "Sức khỏe", "Lịch chăm sóc sức khỏe định kỳ cho thú cưng"],
  ["nutrition", "Dinh dưỡng", "Chọn khẩu phần phù hợp theo độ tuổi của mèo"],
  ["psychology", "Tâm lý", "Giúp thú cưng làm quen với môi trường mới"],
  ["grooming", "Vệ sinh & Làm đẹp", "Hướng dẫn vệ sinh tai an toàn tại nhà"],
  ["nutrition", "Dinh dưỡng", "Những thực phẩm cần tránh trong khẩu phần của chó"],
  ["grooming", "Vệ sinh & Làm đẹp", "Tần suất tắm phù hợp cho từng giống thú cưng"],
  ["psychology", "Tâm lý", "Vì sao mèo thường trốn khi nhà có khách?"],
  ["health", "Sức khỏe", "Các dấu hiệu mất nước thường gặp ở thú cưng"],
  ["care", "Chăm sóc", "Chuẩn bị không gian nghỉ ngơi thoải mái cho thú cưng"],
  ["health", "Sức khỏe", "Cách theo dõi cân nặng của thú cưng tại nhà"],
  ["nutrition", "Dinh dưỡng", "Bổ sung vitamin cho thú cưng đúng cách"],
  ["grooming", "Vệ sinh & Làm đẹp", "Chăm sóc móng giúp thú cưng vận động tốt hơn"],
];

export const RECENT_BLOG_POSTS = RECENT_POST_CONTENT.map(
  ([category, categoryLabel, title], index) => ({
    id: `recent-${index + 1}`,
    category,
    categoryLabel,
    title,
    excerpt:
      "Thông tin hữu ích từ chuyên gia giúp bạn chăm sóc thú cưng khỏe mạnh mỗi ngày.",
    publishedAt: "3 Tháng 6, 2024",
    image: blogImages.postPlaceholder,
  }),
);
