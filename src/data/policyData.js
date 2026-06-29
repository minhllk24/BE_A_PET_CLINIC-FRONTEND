import { policyImages } from "../assets/policyImages";

export const POLICY_DETAIL = {
  title: "Chính sách đổi – trả hàng",
  author: "Admin",
  publishedAt: "24 Tháng 05, 2026",
  readTime: "5 phút đọc",
  supportTitle: "Bạn cần hỗ trợ thêm?",
  supportDescription:
    "Liên hệ với Dr.Pet's qua hotline hoặc để lại lời nhắn, đội ngũ chúng tôi sẵn sàng hỗ trợ bạn.",
  meta: [
    {
      id: "author",
      icon: policyImages.metaAuthor,
      iconClassName: "size-4",
      label: "Admin",
    },
    {
      id: "date",
      icon: policyImages.metaDate,
      iconClassName: "h-5 w-[18px]",
      label: "24 Tháng 05, 2026",
    },
    {
      id: "read-time",
      icon: policyImages.metaReadTime,
      iconClassName: "size-5",
      label: "5 phút đọc",
      italic: true,
    },
  ],
  sections: [
    {
      id: "intro",
      paragraphs: [
        [
          {
            text: "Tụi mình luôn mong bạn và “boss” hài lòng nhất với mỗi đơn hàng tại Dr.Pet's House.",
          },
        ],
        [
          {
            text: "Nếu có bất kỳ vấn đề gì phát sinh, bạn hoàn toàn có thể đổi hoặc trả hàng theo các điều kiện dưới đây:",
          },
        ],
      ],
    },
    {
      id: "free-return",
      heading: "1. Đổi – trả miễn phí (trong 7 ngày)",
      paragraphs: [
        [
          { text: "Bạn được " },
          { text: "đổi hoặc trả hàng hoàn toàn miễn phí", strong: true },
          { text: " trong vòng 7 ngày kể từ khi nhận hàng nếu:" },
        ],
      ],
      bullets: [
        [{ text: "Sản phẩm chưa qua sử dụng, còn nguyên tem mác, bao bì" }],
        [{ text: "Có đầy đủ hóa đơn mua hàng" }],
        [
          {
            text: "Lỗi từ nhà sản xuất hoặc Dr.Pet's giao sai sản phẩm",
          },
        ],
      ],
    },
    {
      id: "paid-return",
      heading: "2. Đổi – trả có tính phí (từ ngày 8 – 15)",
      paragraphs: [
        [
          {
            text: "Sau 7 ngày đầu tiên, nếu bạn vẫn muốn đổi hoặc trả vì nhu cầu cá nhân, Dr.Pet's vẫn hỗ trợ với một khoản phí nhỏ:",
          },
        ],
      ],
      bullets: [
        [
          { text: "Sản phẩm chưa sử dụng:", strong: true },
          { text: " Trả hàng phí 15–20% giá trị sản phẩm" },
        ],
        [
          { text: "Sản phẩm đã mở bao bì (nhưng chưa sử dụng):", strong: true },
          {
            text: " Đổi sản phẩm khác phí 15%, trả hàng phí 20–30%",
          },
        ],
      ],
    },
    {
      id: "notes",
      heading: "3. Một số lưu ý quan trọng",
      bullets: [
        [
          { text: "Thức ăn, bánh thưởng, sản phẩm tiêu dùng:", strong: true },
          {
            text: " Vì yếu tố vệ sinh và sức khỏe cho thú cưng, Dr.Pet's không hỗ trợ đổi – trả nếu đã mở bao bì (trừ trường hợp sản phẩm bị lỗi hỏng do nhà sản xuất)",
          },
        ],
        [
          { text: "Sản phẩm đặt riêng (như bảng tên):", strong: true },
          { text: " Rất tiếc tụi mình không thể hỗ trợ đổi – trả" },
        ],
        [
          { text: "Hóa đơn VAT:", strong: true },
          {
            text: " Nếu bạn đã nhận hóa đơn VAT, vui lòng hỗ trợ thực hiện các thủ tục điều chỉnh/hoàn trả hóa đơn theo quy định",
          },
        ],
      ],
    },
    {
      id: "shipping-fee",
      heading: "4. Chi phí vận chuyển",
      bullets: [
        [
          {
            text: "Nếu sản phẩm lỗi hoặc giao sai: Dr.Pet's chịu 100% phí vận chuyển hai chiều",
          },
        ],
        [
          {
            text: "Nếu bạn muốn đổi/trả theo nhu cầu cá nhân: Bạn vui lòng hỗ trợ phí vận chuyển giúp tụi mình nhé",
          },
        ],
      ],
    },
    {
      id: "support",
      heading: "5. Liên hệ hỗ trợ",
      paragraphs: [
        [
          {
            text: "Đội ngũ CSKH luôn sẵn sàng hướng dẫn bạn chi tiết nhất:",
          },
        ],
        [{ text: "Hotline: 0868.686.868", strong: true }],
        [{ text: "Email: drpetshouse.cskh@gmail.com", strong: true }],
      ],
    },
  ],
};

export const RELATED_POLICIES = [
  { label: "Chính sách thanh toán", href: "/policy" },
  { label: "Chính sách đặt lịch", href: "/policy" },
  { label: "Chính sách đổi/hủy lịch", href: "/policy" },
  { label: "Chính sách bán hàng", href: "/policy" },
  { label: "Chính sách vận chuyển", href: "/policy" },
  { label: "Chính sách đổi trả hàng", href: "/policy", active: true },
  { label: "Chính sách bảo mật", href: "/policy" },
  { label: "Câu hỏi thường gặp", href: "/policy" },
];
