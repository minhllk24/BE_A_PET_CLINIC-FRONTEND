import { groomingImages } from "../../assets/groomingImages";

const SERVICES = [
  {
    id: 1,
    title: "Tắm & Sấy khô",
    description:
      "Sử dụng các dòng sữa tắm cao cấp, phù hợp với từng loại da và màu lông của bé.",
    price: "Từ 50.000 đ",
    image: groomingImages.serviceBath,
  },
  {
    id: 2,
    title: "Massage chuyên sâu",
    description:
      "Kỹ thuật massage nhẹ nhàng giúp pet giải tỏa áp lực, tăng cường sự gắn kết",
    price: "Từ 50.000 đ",
    image: groomingImages.serviceMassage,
  },
  {
    id: 3,
    title: "Vệ sinh răng miệng",
    description:
      "Đánh răng loại bỏ mảng bám và xịt thơm miệng khử mùi hôi.",
    price: "Từ 30.000 đ",
    image: groomingImages.serviceTeeth,
  },
  {
    id: 4,
    title: "Cắt & mài móng",
    description:
      "Cắt ngắn móng tránh đâm vào thịt và dùng máy mài mịn các góc sắc nhọn",
    price: "Từ 30.000 đ",
    image: groomingImages.serviceNail,
  },
  {
    id: 5,
    title: "Chăm sóc bàn chân",
    description:
      "Cạo vệ sinh kẽ móng, chăm sóc bảo vệ phần đệm thịt",
    price: "Từ 30.000 đ",
    image: groomingImages.servicePawCare,
  },
  {
    id: 6,
    title: "Điều trị ký sinh trùng",
    description:
      "Tiêu diệt ký sinh trùng và làm sạch môi trường sống để ngăn ngừa tái nhiễm",
    price: "Từ 80.000 đ",
    image: groomingImages.serviceParasite,
  },
  {
    id: 7,
    title: "Cắt tỉa tạo kiểu",
    description:
      "Cắt tỉa lông theo yêu cầu hoặc theo form chuẩn của từng giống loài",
    price: "Từ 50.000 đ",
    image: groomingImages.serviceGrooming,
  },
  {
    id: 8,
    title: "Nhuộm lông thời trang",
    description:
      "Sử dụng thuốc nhuộm organic 100% an toàn cho thú cưng, tạo điểm nhấn đặc biệt",
    price: "Từ 80.000 đ",
    image: groomingImages.serviceDye,
  },
  {
    id: 9,
    title: "Vắt tuyến hôi",
    description:
      "Giúp thú cưng không bị ngứa ngáy hậu môn, hạn chế mùi hôi đặc trưng cơ thể",
    price: "Từ 50.000 đ",
    image: groomingImages.serviceScent,
  },
];

/* ──────────────────────────────────────────
   ServiceCard: a 355×421 card with image,
   gradient overlay, title/price/desc text
   and a number badge
   ────────────────────────────────────────── */
function ServiceCard({ service }) {
  return (
    <div
      className="relative overflow-hidden flex-shrink-0"
      style={{ width: 355, height: 421, borderRadius: 0 }}
    >
      {/* Background image */}
      <img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(2, 0, 15, 0) 0%, rgba(2, 0, 15, 0.7) 80%)",
        }}
      />

      {/* Number badge */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          right: 0,
          top: 8,
          width: 79,
          height: 59,
          borderRadius: 28,
          border: "1px solid #A1A4B1",
        }}
      >
        <span
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
            fontSize: 24,
            lineHeight: "1.334em",
            color: "#A1A4B1",
            textAlign: "center",
          }}
        >
          {service.id}
        </span>
      </div>

      {/* Text content at bottom */}
      <div
        className="absolute"
        style={{
          bottom: 0,
          left: 0,
          width: 355,
          height: 124,
        }}
      >
        {/* Service title */}
        <span
          className="absolute"
          style={{
            left: 28,
            top: 0,
            fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
            fontSize: 24,
            lineHeight: "1.417em",
            color: "#FFFFFF",
          }}
        >
          {service.title}
        </span>

        {/* Price */}
        <span
          className="absolute"
          style={{
            right: 20,
            top: 32,
            fontFamily: "Roboto, sans-serif",
            fontWeight: 300,
            fontSize: 16,
            lineHeight: "1.75em",
            color: "#FFFFFF",
            textAlign: "right",
          }}
        >
          {service.price}
        </span>

        {/* Description */}
        <span
          className="absolute"
          style={{
            left: 28,
            top: 62,
            width: 291,
            fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "1.75em",
            color: "#FFFFFF",
          }}
        >
          {service.description}
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   Main Services Section
   ────────────────────────────────────────── */
function GroomingServices() {
  // Layout: 3 columns × 3 rows, positioned absolutely per Figma
  // Column positions: 167, 537, 907
  // Row positions: 0, 454, 908
  const positions = [
    // Row 1
    { id: 1, x: 167, y: 0 },   // Container 1 – Tắm & Sấy khô
    { id: 2, x: 537, y: 0 },   // Container 2 – Massage chuyên sâu
    { id: 3, x: 907, y: 0 },   // Container 3 – Vệ sinh răng miệng
    // Row 2
    { id: 4, x: 167, y: 454 }, // Container 4 – Cắt & mài móng
    { id: 5, x: 537, y: 454 }, // Container 5 – Chăm sóc bàn chân
    { id: 6, x: 907, y: 454 }, // Container 6 – Điều trị ký sinh trùng
    // Row 3
    { id: 7, x: 167, y: 908 }, // Container 7 – Cắt tỉa tạo kiểu
    { id: 8, x: 537, y: 908 }, // Container 8 – Nhuộm lông thời trang
    { id: 9, x: 907, y: 908 }, // Container 9 – Vắt tuyến hôi
  ];

  return (
    <section
      id="danh-sach-dich-vu"
      className="relative w-full"
      style={{ borderTop: "1px solid rgba(0, 0, 0, 0.1)" }}
    >
      {/* Top header area */}
      <div
        className="relative mx-auto"
        style={{
          maxWidth: 1440,
          paddingTop: 28,
        }}
      >
        {/* Title block */}
        <div className="relative" style={{ width: 1440, height: 162 }}>
          <h2
            className="absolute"
            style={{
              left: 0,
              top: 17,
              width: 1440,
              fontFamily: '"Baloo Tamma", "Baloo 2", cursive',
              fontWeight: 400,
              fontSize: 64,
              lineHeight: "1.1em",
              textAlign: "center",
              color: "rgba(0, 0, 0, 0.87)",
            }}
          >
            Dịch vụ{" "}
            <br />
            chúng tôi cung cấp
          </h2>

          {/* Decorative shape next to title */}
          <img
            src={groomingImages.serviceBgShape}
            alt=""
            className="absolute pointer-events-none"
            style={{
              left: 990,
              top: 3,
              width: 105,
              height: 87,
            }}
          />
        </div>

        {/* Tabpanel - services grid */}
        <div
          className="relative mx-auto"
          style={{
            width: 1440,
            height: 1572,
          }}
        >
          {/* Service cards */}
          {SERVICES.map((service) => {
            const pos = positions.find((p) => p.id === service.id);
            return (
              <div
                key={service.id}
                className="absolute"
                style={{ left: pos.x, top: pos.y }}
              >
                <ServiceCard service={service} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default GroomingServices;
