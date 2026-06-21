const medicalAsset = (name) =>
  new URL(`../assets/images/medical/${name}`, import.meta.url).href;

export const medicalAssets = {
  heroBg: medicalAsset("hero-bg.svg"),
  heroMain: medicalAsset("hero-main.png"),
  heroPaw: medicalAsset("hero-paw.png"),
  servicesTitleShape: medicalAsset("services-title-shape.png"),
  servicesDecor: medicalAsset("service-decor.png"),
  serviceCardMask: medicalAsset("service-card-mask.png"),
  ctaPrice: medicalAsset("cta-price.png"),
  ctaBook: medicalAsset("cta-book.png"),
  statsBg: medicalAsset("stats-bg.svg"),
  whyMain: medicalAsset("why-main.png"),
  whyPaw: medicalAsset("why-paw.svg"),
  whyGroupLeft: medicalAsset("why-group-left.svg"),
  whyGroupRight: medicalAsset("why-group-right.svg"),
  whyVector: medicalAsset("why-vector.svg"),
  whyVector1: medicalAsset("why-vector-1.svg"),
  whyVector2: medicalAsset("why-vector-2.svg"),
  whyVector3: medicalAsset("why-vector-3.svg"),
  whyVector4: medicalAsset("why-vector-4.svg"),
  whyImage88: medicalAsset("why-image-88.png"),
  doctorsBg: medicalAsset("doctors-bg.svg"),
  doctorsShape: medicalAsset("doctors-shape.png"),
  doctorsUnderline: medicalAsset("doctors-underline.svg"),
  faqMain: medicalAsset("faq-main.png"),
  faqTopLeft: medicalAsset("faq-top-left.png"),
  faqTopRight: medicalAsset("faq-top-right.png"),
  faqIcon: medicalAsset("faq-icon.png"),
  faqOrnament: medicalAsset("faq-ornament.svg"),
};

export const medicalServices = [
  {
    title: "Khám & Điều trị",
    price: "Từ 30.000 đ",
    description:
      "Chẩn đoán và điều trị hệ hô hấp, hệ tiêu hóa, hệ tuần hoàn, lông da, mắt và tai.",
    image: medicalAsset("service-treatment.png"),
  },
  {
    title: "Xét nghiệm",
    price: "Từ 50.000 đ",
    description: "Xét nghiệm máu, virus, nước tiểu, da, kháng sinh,...",
    image: medicalAsset("service-test.png"),
  },
  {
    title: "Siêu âm",
    price: "Từ 100.000 đ",
    description:
      "Các phương pháp chẩn đoán hình ảnh hoặc làm xét nghiệm: Siêu âm, X-Quang.",
    image: medicalAsset("service-ultrasound.png"),
  },
  {
    title: "Tiêm phòng",
    price: "Từ 100.000 đ",
    description:
      "Thú cưng cần được tiêm phòng và tái chủng định kì theo hướng dẫn của bác sĩ.",
    image: medicalAsset("service-vaccine.png"),
  },
  {
    title: "Phẫu thuật",
    price: "Từ 200.000 đ",
    description:
      "Theo yêu cầu hoặc điều trị: triệt sản, cắt đuôi và nối xương, sỏi niệu, mổ bướu...",
    image: medicalAsset("service-surgery.png"),
  },
  {
    title: "Cấp cứu 24/7",
    price: "Từ 150.000 đ",
    description:
      "Dịch vụ cấp cứu 24/7, kể cả ngày lễ. Cả 2 hình thức: tại cửa hàng và tại nhà.",
    image: medicalAsset("service-emergency.png"),
  },
];

export const medicalStats = [
  ["5+", "Năm kinh nghiệm"],
  ["10.000+", "Ca khám và những bé thú cưng khỏe mạnh"],
  ["15+", "Y bác sĩ giàu kinh nghiệm"],
  ["98%", "Khách hàng hài lòng"],
];

export const medicalWhyItems = [
  {
    title: "Cấp cứu 24/7",
    description: "Sẵn sàng tiếp nhận và xử lý các ca cấp cứu bất cứ lúc nào",
    icon: medicalAsset("why-icon-emergency.svg"),
    tone: "blue",
  },
  {
    title: "Bác sĩ chuyên môn cao",
    description: "Đội ngũ bác sĩ được đào tạo bài bản, giàu kinh nghiệm",
    icon: medicalAsset("why-icon-doctor.svg"),
    tone: "green",
  },
  {
    title: "Chăm sóc tận tâm",
    description:
      "Đội ngũ tận tâm đảm bảo mỗi thú cưng đều nhận được tình yêu thương và sự quan tâm xứng đáng",
    icon: medicalAsset("why-icon-care.svg"),
    tone: "red",
  },
  {
    title: "Trang thiết bị hiện đại",
    description: "Máy siêu âm, X-quang, xét nghiệm máu tiên tiến nhất",
    icon: medicalAsset("why-icon-modern.png"),
    tone: "purple",
  },
  {
    title: "Chi phí minh bạch",
    description: "Sẵn sàng tiếp nhận và xử lý các ca cấp cứu bất cứ lúc nào",
    icon: medicalAsset("why-icon-cost.png"),
    tone: "blue",
  },
  {
    title: "Dịch vụ đa dạng, toàn diện",
    description:
      "Cung cấp giải pháp chăm sóc sức khỏe trọn gói từ tiêm phòng, triệt sản, điều trị bệnh lý đến phẫu thuật ngoại khoa",
    icon: medicalAsset("why-icon-service.png"),
    tone: "green",
  },
  {
    title: "Quy trình chuẩn, an toàn tuyệt đối",
    description:
      "Tuân thủ nghiêm ngặt quy trình vệ sinh, khử khuẩn, hạn chế tối đa tình trạng lây nhiễm chéo giữa các thú cưng",
    icon: medicalAsset("why-icon-safe.png"),
    tone: "red",
  },
  {
    title: "Hồ sơ bệnh án điện tử",
    description:
      "Toàn bộ lịch sử tiêm phòng, kết quả xét nghiệm, đơn thuốc của bé được lưu trữ trực tuyến",
    icon: medicalAsset("why-icon-record.png"),
    tone: "purple",
  },
];

const doctorRows = [
  ["Bs. Trần Văn Nhân", "Kinh nghiệm 20 năm", "Tốt nghiệp Trường Đại Học Nông Lâm, ĐHQG TPHCM"],
  ["Bs. Võ Công Nam", "Kinh nghiệm 14 năm", "Tốt nghiệp Trường Đại Học Nông Lâm, ĐHQG TPHCM"],
  ["Bs. Nguyễn Thu Hồng", "Kinh nghiệm 5 năm", "Tốt nghiệp Trường Đại học Công Nghệ TPHCM"],
  ["Bs. Trần Phương Trâm", "Kinh nghiệm 7 năm", "Tốt nghiệp Trường Đại Học Nông Lâm, ĐHQG TPHCM"],
  ["Bs. Nguyễn Quang Huy", "Kinh nghiệm 14 năm", "Tốt nghiệp Trường Đại Học Nông Lâm, ĐHQG TPHCM"],
  ["Bs. Hoàng Khánh Yên", "Kinh nghiệm 7 năm", "Tốt nghiệp Trường Đại Học Nông Lâm, ĐHQG TPHCM"],
  ["Bs. Nguyễn Thanh Ngân", "Kinh nghiệm 5 năm", "Tốt nghiệp Trường Đại Học Nông Lâm, ĐHQG TPHCM"],
  ["Bs. Trần Song Thư", "Kinh nghiệm 7 năm", "Tốt nghiệp Trường Đại Học Nông Lâm, ĐHQG TPHCM"],
  ["Bs. Đỗ Nhất Tâm", "Kinh nghiệm 7 năm", "Tốt nghiệp Trường Đại Học Nông Lâm, ĐHQG TPHCM"],
  ["Bs. Huỳnh Gia Khánh", "Kinh nghiệm 7 năm", "Tốt nghiệp Trường đại học Công Nghệ TPHCM"],
  ["Bs. Nguyễn Phương Nhi", "Kinh nghiệm 5 năm", "Tốt nghiệp Trường đại học Công Nghệ TPHCM"],
  ["Bs. Nguyễn Minh Anh", "Kinh nghiệm 10 năm", "Tốt nghiệp Trường Đại Học Nông Lâm, ĐHQG TPHCM"],
];

export const medicalDoctorPages = Array.from({ length: 3 }, (_, page) =>
  doctorRows.slice(page * 4, page * 4 + 4).map(([name, role, school], index) => ({
    name,
    role,
    school,
    image: medicalAsset(
      `doctor-${String(page * 4 + index + 1).padStart(2, "0")}.png`,
    ),
  })),
);

export const medicalFaqs = [
  {
    id: 1,
    question: "Bao lâu nên khám tổng quát cho chó mèo một lần?",
    answer:
      "1–2 lần/năm với thú cưng trưởng thành, thường xuyên hơn với thú cưng già hoặc có bệnh nền.",
  },
  {
    id: 2,
    question: "Khám tổng quát có bao gồm tiêm phòng không?",
    answer:
      "Tiêm phòng là dịch vụ riêng. Bác sĩ sẽ kiểm tra sức khỏe và tư vấn lịch tiêm phù hợp cho từng bé.",
  },
  {
    id: 3,
    question: "Khám tổng quát có phát hiện bệnh tiềm ẩn không?",
    answer:
      "Có. Khám lâm sàng kết hợp xét nghiệm và chẩn đoán hình ảnh giúp phát hiện sớm nhiều bệnh lý tiềm ẩn.",
  },
  {
    id: 4,
    question: "Bao lâu thì cần tiêm phòng và tẩy giun một lần?",
    answer:
      "Lịch tiêm và tẩy giun phụ thuộc độ tuổi, cân nặng và tiền sử sức khỏe. Bác sĩ sẽ lập lịch riêng cho thú cưng.",
  },
  {
    id: 5,
    question: "Khi nào nên triệt sản cho chó mèo là tốt nhất?",
    answer:
      "Thời điểm phù hợp thường từ 6 tháng tuổi, nhưng cần được bác sĩ đánh giá thể trạng trước khi thực hiện.",
  },
];
