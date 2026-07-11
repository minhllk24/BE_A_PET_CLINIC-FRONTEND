import { policyImages } from "../assets/policyImages";

const SUPPORT_TITLE = "Bạn cần hỗ trợ thêm?";
const SUPPORT_DESCRIPTION =
  "Liên hệ với Dr.Pet's qua hotline hoặc để lại lời nhắn, đội ngũ chúng tôi sẵn sàng hỗ trợ bạn.";

const part = (text, options = {}) => ({ text, ...options });
const paragraph = (...parts) => parts.map((item) => (typeof item === "string" ? part(item) : item));

const createMeta = (readTime = "5 phút đọc") => [
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
    label: readTime,
    italic: true,
  },
];

const basePolicy = {
  author: "Admin",
  publishedAt: "24 Tháng 05, 2026",
  readTime: "5 phút đọc",
  supportTitle: SUPPORT_TITLE,
  supportDescription: SUPPORT_DESCRIPTION,
  meta: createMeta(),
};

export const DEFAULT_POLICY_SLUG = "doi-tra-hang";

export const POLICY_ORDER = [
  "phuong-thuc-thanh-toan",
  "dat-lich-doi-huy-lich",
  "huong-dan-mua-hang",
  "van-chuyen",
  "doi-tra-hang",
  "bao-mat",
  "cau-hoi-thuong-gap",
];

export const POLICIES = {
  "phuong-thuc-thanh-toan": {
    ...basePolicy,
    title: "Phương thức thanh toán",
    sections: [
      {
        id: "intro",
        paragraphs: [
          paragraph(
            "Dr.Pet’s House hỗ trợ đa dạng hình thức thanh toán để bạn có thể mua sắm cho “boss” một cách thuận tiện nhất 🐾",
          ),
        ],
      },
      {
        id: "cod",
        heading: "1. Thanh toán khi nhận hàng (COD)",
        paragraphs: [
          paragraph(
            "Đây là hình thức phổ biến nhất. Bạn sẽ thanh toán trực tiếp bằng tiền mặt cho nhân viên giao hàng sau khi đã kiểm tra kiện hàng.",
          ),
        ],
      },
      {
        id: "bank-transfer",
        heading: "2. Chuyển khoản ngân hàng (Internet Banking)",
        paragraphs: [
          paragraph(
            "Bạn có thể chuyển khoản trực tiếp vào tài khoản công ty của Dr.Pet’s House theo thông tin sau:",
          ),
        ],
        bullets: [
          paragraph(part("Ngân hàng:", { strong: true }), " Techcombank (TMCP Kỹ Thương Việt Nam)"),
          paragraph(part("Chi nhánh:", { strong: true }), " Phú Mỹ Hưng, TP. Hồ Chí Minh"),
          paragraph(part("Số tài khoản:", { strong: true }), " 19036499523012"),
          paragraph(part("Chủ tài khoản:", { strong: true }), " Công Ty TNHH TM VA DV DR. PETS HOUSE"),
          paragraph(part("Nội dung chuyển khoản:", { strong: true }), " [Số điện thoại] - [Mã đơn hàng]"),
        ],
        paragraphsAfter: [
          paragraph(
            part(
              "Sau khi chuyển khoản, bạn vui lòng chụp lại biên nhận để Paddy xác nhận đơn hàng nhanh hơn nhé.",
              { italic: true },
            ),
          ),
        ],
      },
      {
        id: "ewallet",
        heading: "3. Thanh toán qua ví điện tử (MoMo, ShopeePay, VNPay...)",
        paragraphs: [
          paragraph(
            "Dr.Pet’s House hỗ trợ thanh toán qua các ví điện tử phổ biến tại Việt Nam thông qua cổng thanh toán MoMo, ZaloPay hoặc VNPay.",
          ),
          paragraph("Bạn chỉ cần quét mã QR để hoàn tất giao dịch một cách an toàn và nhanh chóng."),
        ],
      },
      {
        id: "card",
        heading: "4. Thẻ tín dụng, thẻ ghi nợ (Visa, Mastercard, JCB)",
        paragraphs: [
          paragraph(
            "Bạn có thể sử dụng các loại thẻ quốc tế hoặc thẻ ATM nội địa có đăng ký Internet Banking để thanh toán trực tuyến.",
          ),
          paragraph("Mọi giao dịch đều được bảo mật tuyệt đối qua các cổng thanh toán uy tín."),
        ],
      },
      {
        id: "store",
        heading: "5. Thanh toán tại cửa hàng",
        paragraphs: [
          paragraph(
            "Nếu mua hàng trực tiếp tại các chi nhánh của Dr.Pet’s House, bạn có thể thanh toán bằng: Tiền mặt, Quẹt thẻ (POS) hoặc Chuyển khoản.",
          ),
          paragraph(
            "Mọi thắc mắc về thanh toán, bạn vui lòng liên hệ Hotline: 0867 677 891 để được hỗ trợ nhanh nhất.",
          ),
        ],
      },
      {
        id: "support",
        heading: "6. Liên hệ hỗ trợ",
        paragraphs: [
          paragraph("Đội ngũ CSKH luôn sẵn sàng hướng dẫn bạn chi tiết nhất."),
          paragraph(
            "Mọi thắc mắc về thanh toán, bạn vui lòng liên hệ Hotline: 0867 677 891 để được hỗ trợ nhanh nhất.",
          ),
          paragraph(part("Hotline: 0868.686.868", { strong: true })),
          paragraph(part("Email: drpetshouse.cskh@gmail.com", { strong: true })),
        ],
      },
    ],
  },

  "dat-lich-doi-huy-lich": {
    ...basePolicy,
    title: "Chính sách đặt lịch, đổi lịch & hủy lịch",
    sections: [
      {
        id: "intro",
        paragraphs: [
          paragraph(
            "Tụi mình luôn mong bạn và “boss” có trải nghiệm ấn tượng, dịch vụ cao cấp tại Dr.Pet's House 🐾",
          ),
        ],
      },
      {
        id: "booking",
        heading: "1. Đặt lịch hẹn",
        paragraphs: [
          paragraph("Đặt lịch qua website, hotline 0332 986 116, hoặc đến trực tiếp phòng khám."),
          paragraph("Lịch hẹn được xác nhận qua điện thoại hoặc tin nhắn trong vòng 30 phút."),
          paragraph("Vui lòng đặt lịch trước ít nhất 3 giờ so với thời gian check-in."),
        ],
      },
      {
        id: "reschedule",
        heading: "2. Đổi lịch",
        bullets: [
          paragraph("Bạn có thể đổi lịch trước giờ hẹn tối thiểu 2 giờ để Dr.Pet’s House kịp sắp xếp lại bác sĩ và phòng dịch vụ."),
          paragraph("Liên hệ hotline hoặc nhắn tin qua Zalo/Facebook để đổi lịch."),
          paragraph("Mỗi lịch hẹn được đổi lịch tối đa 2 lần."),
          paragraph(
            part("Sau khi chuyển khoản, bạn vui lòng chụp lại biên nhận để Paddy xác nhận đơn hàng nhanh hơn nhé.", {
              italic: true,
            }),
          ),
        ],
      },
      {
        id: "cancel",
        heading: "3. Hủy lịch",
        bullets: [
          paragraph("Bạn vui lòng báo hủy càng sớm càng tốt nếu không thể đến đúng lịch hẹn."),
          paragraph("Lịch hẹn đã thanh toán trước sẽ được hỗ trợ hoàn/giữ cọc theo từng trường hợp cụ thể."),
          paragraph("Dr.Pet’s House có quyền hủy lịch nếu không thể liên hệ xác nhận với khách hàng."),
        ],
      },
      {
        id: "emergency",
        heading: "4. Trường hợp khẩn cấp",
        bullets: [
          paragraph("Các ca cấp cứu sẽ được ưu tiên tiếp nhận trước lịch hẹn thông thường."),
          paragraph("Nếu lịch của bạn bị ảnh hưởng, đội ngũ CSKH sẽ chủ động thông báo và hỗ trợ đổi sang khung giờ phù hợp."),
        ],
      },
      {
        id: "waiting",
        heading: "5. Thời gian chờ",
        paragraphs: [
          paragraph(
            "Dr.Pet's House luôn ưu tiên lịch hẹn trước, chúng mình luôn cố gắng phục vụ đúng giờ hẹn.",
          ),
          paragraph(
            "Trong trường hợp có ca cấp cứu hoặc quá tải, thời gian chờ có thể lên đến 15–30 phút. Chúng tôi sẽ thông báo nếu có thay đổi.",
          ),
        ],
      },
      {
        id: "support",
        heading: "6. Liên hệ hỗ trợ",
        paragraphs: [
          paragraph("Đội ngũ CSKH luôn sẵn sàng hướng dẫn bạn chi tiết nhất."),
          paragraph(
            "Mọi thắc mắc về thanh toán, bạn vui lòng liên hệ Hotline: 0867 677 891 để được hỗ trợ nhanh nhất.",
          ),
          paragraph(part("Hotline: 0868.686.868", { strong: true })),
          paragraph(part("Email: drpetshouse.cskh@gmail.com", { strong: true })),
        ],
      },
    ],
  },

  "huong-dan-mua-hang": {
    ...basePolicy,
    title: "Hướng dẫn mua hàng",
    sections: [
      {
        id: "intro",
        paragraphs: [
          paragraph(
            "Mua sắm tại Dr.Pet’s House cực kỳ đơn giản và nhanh chóng. Bạn có thể đặt hàng theo các bước sau:",
          ),
        ],
      },
      {
        id: "step-1",
        heading: "Bước 1: Tìm kiếm sản phẩm",
        paragraphs: [
          paragraph(
            "Sử dụng thanh tìm kiếm hoặc duyệt theo danh mục (Cho Chó, Cho Mèo) để tìm sản phẩm cần mua. Bạn có thể lọc theo thương hiệu, giá hoặc loại sản phẩm để tìm nhanh hơn.",
          ),
        ],
      },
      {
        id: "step-2",
        heading: "Bước 2: Chọn sản phẩm và thêm vào giỏ hàng",
        paragraphs: [
          paragraph(
            'Chọn phân loại (kích cỡ, trọng lượng, hương vị) nếu có, sau đó nhấn "Thêm vào giỏ hàng". Bạn có thể tiếp tục mua sắm hoặc nhấn vào biểu tượng giỏ hàng để kiểm tra.',
          ),
        ],
      },
      {
        id: "step-3",
        heading: "Bước 3: Kiểm tra giỏ hàng",
        bullets: [paragraph("Kiểm tra sản phẩm, số lượng, phân loại và tổng tiền trước khi tiến hành thanh toán.")],
      },
      {
        id: "step-4",
        heading: "Bước 4: Điền thông tin giao hàng",
        bullets: [
          paragraph("Nhập đầy đủ họ tên, số điện thoại, địa chỉ nhận hàng và ghi chú giao hàng nếu có."),
          paragraph("Thông tin càng chính xác thì đơn hàng càng được xử lý nhanh hơn."),
        ],
      },
      {
        id: "step-5",
        heading: "Bước 5: Chọn phương thức vận chuyển và thanh toán",
        paragraphs: [
          paragraph(
            "Chọn đơn vị vận chuyển phù hợp và hình thức thanh toán tiện lợi nhất cho bạn (COD, Chuyển khoản, Ví điện tử hoặc Thẻ).",
          ),
        ],
      },
      {
        id: "step-6",
        heading: "Bước 6. Nhập mã giảm giá (nếu có)",
        bullets: [paragraph("Nhập mã khuyến mãi vào ô mã giảm giá trước khi xác nhận đơn hàng.")],
      },
      {
        id: "step-7",
        heading: "Bước 7: Xác nhận và đặt hàng",
        paragraphs: [
          paragraph(
            'Kiểm tra lại toàn bộ thông tin lần cuối và nhấn "Đặt hàng". Hệ thống sẽ gửi xác nhận đơn hàng cho bạn qua SMS hoặc Email ngay lập tức.',
          ),
        ],
      },
      {
        id: "quick-support",
        heading: "Hỗ trợ đặt hàng nhanh",
        paragraphs: [
          paragraph(
            "Nếu gặp khó khăn khi đặt hàng, bạn có thể liên hệ chúng tôi, chúng tôi luôn sẵn sàng hỗ trợ bạn:",
          ),
          paragraph(part("Hotline: 0868.686.868", { strong: true })),
          paragraph(part("Email: drpetshouse.cskh@gmail.com", { strong: true })),
        ],
      },
    ],
  },

  "van-chuyen": {
    ...basePolicy,
    title: "Chính sách vận chuyển",
    sections: [
      {
        id: "intro",
        paragraphs: [
          paragraph("Tụi mình luôn cố gắng giao hàng nhanh nhất để bạn và “boss” không phải chờ lâu"),
        ],
      },
      {
        id: "methods",
        heading: "1. Phương thức giao hàng",
        paragraphs: [paragraph("Bạn có thể chọn:")],
        bullets: [
          paragraph("Giao hàng tận nơi thông qua đối tác vận chuyển."),
          paragraph("Nhận hàng trực tiếp tại cửa hàng/chi nhánh của Dr.Pet’s House."),
        ],
      },
      {
        id: "time",
        heading: "2. Thời gian giao hàng",
        paragraphs: [paragraph(part("Nội thành TP.HCM:", { strong: true }))],
        bullets: [
          paragraph("Đơn hàng đặt trước 15:00: giao trong ngày hoặc ngày làm việc tiếp theo."),
          paragraph("Đơn hàng đặt sau 15:00: giao trong 1–2 ngày làm việc."),
          paragraph("Một số khu vực có thể được hỗ trợ giao nhanh trong ngày tùy tình trạng đơn hàng."),
        ],
        paragraphsAfter: [
          paragraph(part("Ngoại thành TP.HCM:", { strong: true }), " 1–2 ngày làm việc"),
          paragraph(part("Các tỉnh/thành khác:", { strong: true }), " 2–5 ngày làm việc, tùy khu vực"),
          paragraph(
            part(
              "Lưu ý: Thời gian giao hàng có thể thay đổi trong các dịp lễ, Tết hoặc do yếu tố thời tiết, thiên tai.",
              { italic: true },
            ),
          ),
        ],
      },
      {
        id: "fee",
        heading: "3. Phí vận chuyển",
        bullets: [
          paragraph("Phí vận chuyển được tính theo khu vực nhận hàng, khối lượng sản phẩm và chính sách của đơn vị vận chuyển."),
          paragraph("Một số chương trình ưu đãi có thể miễn phí hoặc giảm phí vận chuyển theo điều kiện từng thời điểm."),
        ],
      },
      {
        id: "tracking",
        heading: "4. Theo dõi đơn hàng",
        bullets: [
          paragraph("Sau khi đơn hàng được xác nhận, bạn sẽ nhận được thông tin theo dõi qua SMS, Email hoặc tài khoản mua hàng."),
          paragraph("Bạn cũng có thể liên hệ CSKH để được kiểm tra tình trạng đơn hàng."),
        ],
      },
      {
        id: "receive",
        heading: "5. Lưu ý khi nhận hàng",
        paragraphs: [paragraph("Khi nhận hàng, bạn vui lòng:")],
        bullets: [
          paragraph("Kiểm tra tình trạng bao bì, số lượng và sản phẩm trước khi thanh toán/nhận hàng."),
          paragraph("Quay/chụp lại tình trạng kiện hàng nếu phát hiện dấu hiệu móp méo, rách, ướt hoặc thiếu sản phẩm."),
          paragraph("Thông báo ngay cho Dr.Pet’s House để được hỗ trợ xử lý kịp thời."),
        ],
      },
      {
        id: "failed",
        heading: "6. Trường hợp giao hàng không thành công",
        bullets: [
          paragraph("Đơn vị vận chuyển sẽ liên hệ lại để sắp xếp giao hàng lần tiếp theo."),
          paragraph("Nếu không thể liên hệ hoặc giao hàng nhiều lần không thành công, đơn hàng có thể được hoàn về Dr.Pet’s House."),
          paragraph("Các chi phí phát sinh sẽ được xử lý theo chính sách của đơn vị vận chuyển và tình trạng đơn hàng."),
        ],
      },
      {
        id: "support",
        heading: "7. Liên hệ hỗ trợ",
        paragraphs: [
          paragraph("Đội ngũ CSKH luôn sẵn sàng hướng dẫn bạn chi tiết nhất:"),
          paragraph(part("Hotline: 0868.686.868", { strong: true })),
          paragraph(part("Email: drpetshouse.cskh@gmail.com", { strong: true })),
        ],
      },
    ],
  },

  "doi-tra-hang": {
    ...basePolicy,
    title: "Chính sách đổi – trả hàng",
    sections: [
      {
        id: "intro",
        paragraphs: [
          paragraph("Tụi mình luôn mong bạn và “boss” hài lòng nhất với mỗi đơn hàng tại Dr.Pet's House."),
          paragraph("Nếu có bất kỳ vấn đề gì phát sinh, bạn hoàn toàn có thể đổi hoặc trả hàng theo các điều kiện dưới đây:"),
        ],
      },
      {
        id: "free-return",
        heading: "1. Đổi – trả miễn phí (trong 7 ngày)",
        paragraphs: [
          paragraph(
            "Bạn được ",
            part("đổi hoặc trả hàng hoàn toàn miễn phí", { strong: true }),
            " trong vòng 7 ngày kể từ khi nhận hàng nếu:",
          ),
        ],
        bullets: [
          paragraph("Sản phẩm chưa qua sử dụng, còn nguyên tem mác, bao bì"),
          paragraph("Có đầy đủ hóa đơn mua hàng"),
          paragraph("Lỗi từ nhà sản xuất hoặc Dr.Pet's giao sai sản phẩm"),
        ],
      },
      {
        id: "paid-return",
        heading: "2. Đổi – trả có tính phí (từ ngày 8 – 15)",
        paragraphs: [
          paragraph(
            "Sau 7 ngày đầu tiên, nếu bạn vẫn muốn đổi hoặc trả vì nhu cầu cá nhân, Dr.Pet's vẫn hỗ trợ với một khoản phí nhỏ:",
          ),
        ],
        bullets: [
          paragraph(part("Sản phẩm chưa sử dụng:", { strong: true }), " Trả hàng phí 15–20% giá trị sản phẩm"),
          paragraph(
            part("Sản phẩm đã mở bao bì (nhưng chưa sử dụng):", { strong: true }),
            " Đổi sản phẩm khác phí 15%, trả hàng phí 20–30%",
          ),
        ],
      },
      {
        id: "notes",
        heading: "3. Một số lưu ý quan trọng",
        bullets: [
          paragraph(
            part("Thức ăn, bánh thưởng, sản phẩm tiêu dùng:", { strong: true }),
            " Vì yếu tố vệ sinh và sức khỏe cho thú cưng, Dr.Pet's không hỗ trợ đổi – trả nếu đã mở bao bì (trừ trường hợp sản phẩm bị lỗi hỏng do nhà sản xuất)",
          ),
          paragraph(
            part("Sản phẩm đặt riêng (như bảng tên):", { strong: true }),
            " Rất tiếc tụi mình không thể hỗ trợ đổi – trả",
          ),
          paragraph(
            part("Hóa đơn VAT:", { strong: true }),
            " Nếu bạn đã nhận hóa đơn VAT, vui lòng hỗ trợ thực hiện các thủ tục điều chỉnh/hoàn trả hóa đơn theo quy định",
          ),
        ],
      },
      {
        id: "shipping-fee",
        heading: "4. Chi phí vận chuyển",
        bullets: [
          paragraph("Nếu sản phẩm lỗi hoặc giao sai: Dr.Pet's chịu 100% phí vận chuyển hai chiều"),
          paragraph("Nếu bạn muốn đổi/trả theo nhu cầu cá nhân: Bạn vui lòng hỗ trợ phí vận chuyển giúp tụi mình nhé"),
        ],
      },
      {
        id: "support",
        heading: "5. Liên hệ hỗ trợ",
        paragraphs: [
          paragraph("Đội ngũ CSKH luôn sẵn sàng hướng dẫn bạn chi tiết nhất:"),
          paragraph(part("Hotline: 0868.686.868", { strong: true })),
          paragraph(part("Email: drpetshouse.cskh@gmail.com", { strong: true })),
        ],
      },
    ],
  },

  "bao-mat": {
    ...basePolicy,
    title: "Chính sách bảo mật",
    sections: [
      {
        id: "intro",
        paragraphs: [
          paragraph(
            "Paddy.vn cam kết bảo mật tuyệt đối thông tin cá nhân của khách hàng khi mua sắm và sử dụng dịch vụ tại Dr.Pet’s House.",
          ),
        ],
      },
      {
        id: "purpose",
        heading: "1. Mục đích thu thập thông tin",
        paragraphs: [paragraph("Việc thu thập dữ liệu giúp Paddy hỗ trợ bạn tốt nhất trong quá trình mua sắm:")],
        bullets: [
          paragraph("Xử lý và giao đơn hàng đến tận tay bạn"),
          paragraph("Xác nhận đơn hàng qua điện thoại hoặc email"),
          paragraph("Giải quyết các thắc mắc, yêu cầu hỗ trợ nhanh nhất"),
          paragraph("Cập nhật các chương trình khuyến mãi, ưu đãi dành riêng cho khách hàng"),
          paragraph("Cải thiện trải nghiệm mua sắm trên website Paddy.vn"),
        ],
      },
      {
        id: "scope",
        heading: "2. Phạm vi thu thập thông tin",
        paragraphs: [
          paragraph(
            "Thông tin bạn cung cấp khi đăng ký tài khoản hoặc đặt hàng có thể bao gồm: họ tên, số điện thoại, email, địa chỉ nhận hàng và thông tin thanh toán.",
          ),
          paragraph(
            "Ngoài ra, hệ thống có thể thu thập thông tin về trình duyệt, thiết bị, lịch sử truy cập để tối ưu trải nghiệm sử dụng website.",
          ),
        ],
      },
      {
        id: "storage",
        heading: "3. Thời gian lưu trữ thông tin",
        paragraphs: [
          paragraph(
            "Dữ liệu cá nhân của bạn sẽ được lưu trữ an toàn trong thời gian cần thiết để hoàn thành mục đích thu thập hoặc theo quy định pháp luật hiện hành.",
          ),
        ],
      },
      {
        id: "commitment",
        heading: "4. Cam kết bảo mật",
        paragraphs: [
          paragraph(
            "Paddy cam kết không bán, không chia sẻ thông tin cá nhân của khách hàng cho bên thứ ba nếu không có sự đồng ý của bạn, trừ trường hợp pháp luật yêu cầu.",
          ),
        ],
        bullets: [
          paragraph("Áp dụng các biện pháp kỹ thuật phù hợp để bảo vệ dữ liệu cá nhân."),
          paragraph("Chỉ nhân sự có thẩm quyền mới được truy cập thông tin khách hàng."),
          paragraph("Thường xuyên rà soát và cải thiện hệ thống bảo mật."),
        ],
      },
      {
        id: "rights",
        heading: "5. Quyền của khách hàng",
        paragraphs: [
          paragraph(
            "Bạn có toàn quyền kiểm tra, cập nhật hoặc điều chỉnh thông tin cá nhân của mình bằng cách đăng nhập tài khoản hoặc liên hệ đội ngũ CSKH.",
          ),
        ],
      },
      {
        id: "cookie",
        heading: "6. Sử dụng Cookie",
        bullets: [
          paragraph("Cookie giúp Paddy ghi nhớ giỏ hàng và các tùy chọn của bạn để trải nghiệm mua sắm thuận tiện hơn."),
          paragraph(
            "Bạn có thể chọn từ chối cookie trong cài đặt trình duyệt, tuy nhiên một số tính năng trên website có thể hoạt động chưa đầy đủ.",
          ),
        ],
      },
      {
        id: "support",
        heading: "7. Liên hệ hỗ trợ",
        paragraphs: [
          paragraph("Đội ngũ CSKH luôn sẵn sàng hướng dẫn bạn chi tiết nhất:"),
          paragraph(part("Hotline: 0868.686.868", { strong: true })),
          paragraph(part("Email: drpetshouse.cskh@gmail.com", { strong: true })),
        ],
      },
    ],
  },

  "cau-hoi-thuong-gap": {
    ...basePolicy,
    title: "Câu hỏi thường gặp",
    sections: [
      {
        id: "intro",
        paragraphs: [
          paragraph(
            "Tổng hợp các câu hỏi thường gặp khi mua sắm, đặt lịch và sử dụng dịch vụ tại Dr.Pet’s House.",
          ),
        ],
      },
      {
        id: "faq-booking",
        heading: "1. Tôi có cần đặt lịch trước khi đến không?",
        paragraphs: [
          paragraph(
            "Bạn nên đặt lịch trước để Dr.Pet’s House chuẩn bị bác sĩ, phòng dịch vụ và giảm thời gian chờ cho “boss”.",
          ),
        ],
      },
      {
        id: "faq-order",
        heading: "2. Làm sao để kiểm tra tình trạng đơn hàng?",
        paragraphs: [
          paragraph(
            "Bạn có thể kiểm tra trong tài khoản mua hàng hoặc liên hệ CSKH qua hotline để được hỗ trợ tra cứu nhanh.",
          ),
        ],
      },
      {
        id: "faq-payment",
        heading: "3. Dr.Pet’s House hỗ trợ những hình thức thanh toán nào?",
        paragraphs: [
          paragraph(
            "Hiện tại bạn có thể thanh toán COD, chuyển khoản ngân hàng, ví điện tử, thẻ hoặc thanh toán trực tiếp tại cửa hàng.",
          ),
        ],
      },
      {
        id: "faq-return",
        heading: "4. Sản phẩm đã mở bao bì có đổi trả được không?",
        paragraphs: [
          paragraph(
            "Một số sản phẩm tiêu dùng như thức ăn, bánh thưởng sẽ không hỗ trợ đổi trả nếu đã mở bao bì, trừ trường hợp lỗi từ nhà sản xuất.",
          ),
        ],
      },
      {
        id: "faq-support",
        heading: "5. Tôi cần hỗ trợ thêm thì liên hệ ở đâu?",
        paragraphs: [
          paragraph("Đội ngũ CSKH luôn sẵn sàng hướng dẫn bạn chi tiết nhất:"),
          paragraph(part("Hotline: 0868.686.868", { strong: true })),
          paragraph(part("Email: drpetshouse.cskh@gmail.com", { strong: true })),
        ],
      },
    ],
  },
};

const POLICY_ALIASES = {
  "dat-lich": "dat-lich-doi-huy-lich",
  "doi-huy-lich": "dat-lich-doi-huy-lich",
  "thanh-toan": "phuong-thuc-thanh-toan",
  "ban-hang": "huong-dan-mua-hang",
  "doi-tra": "doi-tra-hang",
  privacy: "bao-mat",
};

export const POLICY_NAV_ITEMS = [
  { label: "Phương thức thanh toán", slug: "phuong-thuc-thanh-toan" },
  { label: "Chính sách đặt lịch", slug: "dat-lich-doi-huy-lich" },
  { label: "Hướng dẫn mua hàng", slug: "huong-dan-mua-hang" },
  { label: "Chính sách vận chuyển", slug: "van-chuyen" },
  { label: "Chính sách đổi - trả hàng", slug: "doi-tra-hang" },
  { label: "Chính sách bảo mật", slug: "bao-mat" },
  { label: "Câu hỏi thường gặp", slug: "cau-hoi-thuong-gap" },
];

export function normalizePolicySlug(slug) {
  return POLICY_ALIASES[slug] || slug || DEFAULT_POLICY_SLUG;
}

export function getPolicyDetail(slug) {
  return POLICIES[normalizePolicySlug(slug)] || POLICIES[DEFAULT_POLICY_SLUG];
}

export function getRelatedPolicies(activeSlug) {
  const normalizedActiveSlug = normalizePolicySlug(activeSlug);

  return POLICY_NAV_ITEMS.map((item) => {
    const normalizedItemSlug = normalizePolicySlug(item.slug);

    return {
      label: item.label,
      href: `/policies/${item.slug}`,
      active: normalizedItemSlug === normalizedActiveSlug,
    };
  });
}
