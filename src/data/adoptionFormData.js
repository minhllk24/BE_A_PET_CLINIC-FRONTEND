export const ADOPTION_STEPS = [
  {
    id: "contact",
    label: "Thông tin liên hệ",
    title: "THÔNG TIN LIÊN HỆ CƠ BẢN",
  },
  {
    id: "living",
    label: "Điều kiện sống",
    title: "KHẢO SÁT ĐIỀU KIỆN SỐNG",
  },
  {
    id: "commitment",
    label: "Cam kết",
    title: "KHẢO SÁT MỨC ĐỘ CAM KẾT",
  },
];

export const CONTACT_FIELDS = [
  {
    name: "fullName",
    label: "Họ và tên",
    type: "text",
    required: true,
    placeholder: "Nguyễn Văn A",
  },
  {
    name: "phone",
    label: "Số điện thoại",
    type: "tel",
    required: true,
    placeholder: "0868686868",
  },
  {
    name: "gender",
    label: "Giới tính",
    type: "select",
    placeholder: "Chọn",
    options: ["Nam", "Nữ", "Khác"],
  },
  {
    name: "birthYear",
    label: "Năm sinh",
    type: "select",
    required: true,
    placeholder: "yyyy",
    options: Array.from({ length: 59 }, (_, index) => String(2008 - index)),
  },
  {
    name: "address",
    label: "Địa chỉ hiện tại",
    type: "text",
    required: true,
    placeholder: "Số 123, Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    fullWidth: true,
  },
];

export const LIVING_CONDITION_QUESTIONS = [
  {
    name: "housingType",
    label: "Loại hình nhà ở hiện tại của bạn:",
    required: true,
    columns: 2,
    options: [
      "Nhà riêng (Có sân vườn)",
      "Nhà riêng (Không sân vườn)",
      "Căn hộ / Chung cư",
      "Nhà thuê / Phòng trọ",
    ],
  },
  {
    name: "familyConsent",
    label: "Mọi người trong nhà có đồng ý việc nuôi thú cưng không?",
    required: true,
    options: [
      "Tất cả đều đồng ý và ủng hộ",
      "Chưa hỏi ý kiến / Đang thuyết phục",
      "Có người phản đối / Có người bị dị ứng lông",
    ],
  },
  {
    name: "currentPets",
    label: "Hiện tại bạn có đang nuôi thú cưng nào khác không?",
    required: true,
    options: ["Không nuôi bé nào", "Có nuôi các bé khác"],
  },
];

export const COMMITMENT_QUESTIONS = [
  {
    name: "aloneTime",
    label: "Thời gian trung bình bé phải ở nhà một mình trong ngày là bao lâu?",
    required: true,
    compact: true,
    options: ["Dưới 4 tiếng", "Từ 4 - 8 tiếng", "Trên 8 tiếng"],
  },
  {
    name: "adoptionReason",
    label: "Lý do bạn muốn nhận nuôi bé thú cưng cụ thể này là gì?",
    type: "textarea",
    required: true,
    placeholder: "Chia sẻ ngắn gọn lý do của bạn...",
  },
  {
    name: "futurePlan",
    label:
      "Bạn sẽ làm gì nếu sau này gia đình thay đổi chỗ ở, có em bé, hoặc bé thú cưng bị bệnh nặng?",
    type: "textarea",
    required: true,
    placeholder: "Chia sẻ cách bạn sẽ đối mặt với các tình huống này...",
  },
];

export const ADOPTION_COMMITMENT_NOTE =
  "Mỗi thú cưng đều xứng đáng có một mái ấm lâu dài. Vui lòng chỉ gửi đơn khi bạn đã cân nhắc kỹ và sẵn sàng đồng hành cùng các bé nhé!";

export const ADOPTION_SUCCESS = {
  title: "Gửi đơn đăng ký thành công!",
  description:
    "Đội ngũ Dr. Pet's House sẽ xem xét hồ sơ của bạn trong vòng 7 ngày làm việc.\nChúng tôi sẽ liên hệ với bạn qua số điện thoại hoặc email đã cung cấp để trao đổi thêm.",
  hotline: "0868 686 868",
};
