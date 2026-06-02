import { groomingImages } from "../../assets/groomingImages";
import { groomingTitleStyles } from "./groomingTitleStyles";

const SERVICES = [
  {
    id: 1,
    title: "Tắm & Sấy khô",
    description:
      "Sử dụng các dòng sữa tắm cao cấp, phù hợp với từng loại da và màu lông của bé.",
    price: "Từ 50.000 đ",
    image: groomingImages.serviceBath,
    mask: groomingImages.serviceCardMask,
  },
  {
    id: 2,
    title: "Massage chuyên sâu",
    description:
      "Kỹ thuật massage nhẹ nhàng giúp pet giải tỏa áp lực, tăng cường sự gắn kết",
    price: "Từ 50.000 đ",
    image: groomingImages.serviceMassage,
    mask: groomingImages.serviceCardMask,
  },
  {
    id: 3,
    title: "Vệ sinh răng miệng",
    description:
      "Đánh răng loại bỏ mảng bám và xịt thơm miệng khử mùi hôi.",
    price: "Từ 30.000 đ",
    image: groomingImages.serviceTeeth,
    mask: groomingImages.serviceCardMask,
  },
  {
    id: 4,
    title: "Cắt & mài móng",
    description:
      "Cắt ngắn móng tránh đâm vào thịt và dùng máy mài mịn các góc sắc nhọn",
    price: "Từ 30.000 đ",
    image: groomingImages.serviceNail,
    mask: groomingImages.serviceCardMaskAlt,
  },
  {
    id: 5,
    title: "Chăm sóc bàn chân",
    description:
      "Cạo vệ sinh kẽ móng, chăm sóc bảo vệ phần đệm thịt",
    price: "Từ 30.000 đ",
    image: groomingImages.servicePawCare,
    mask: groomingImages.serviceCardMask,
  },
  {
    id: 6,
    title: "Điều trị ký sinh trùng",
    description:
      "Tiêu diệt ký sinh trùng và làm sạch môi trường sống để ngăn ngừa tái nhiễm",
    price: "Từ 80.000 đ",
    image: groomingImages.serviceParasite,
    mask: groomingImages.serviceCardMask,
  },
  {
    id: 7,
    title: "Cắt tỉa tạo kiểu",
    description:
      "Cắt tỉa lông theo yêu cầu hoặc theo form chuẩn của từng giống loài",
    price: "Từ 50.000 đ",
    image: groomingImages.serviceGrooming,
    mask: groomingImages.serviceCardMask,
  },
  {
    id: 8,
    title: "Nhuộm lông thời trang",
    description:
      "Sử dụng thuốc nhuộm organic 100% an toàn cho thú cưng, tạo điểm nhấn đặc biệt",
    price: "Từ 80.000 đ",
    image: groomingImages.serviceDye,
    mask: groomingImages.serviceCardMask,
  },
  {
    id: 9,
    title: "Vắt tuyến hôi",
    description:
      "Giúp thú cưng không bị ngứa ngáy hậu môn, hạn chế mùi hôi đặc trưng cơ thể",
    price: "Từ 50.000 đ",
    image: groomingImages.serviceScent,
    mask: groomingImages.serviceCardMask,
  },
];

const POSITIONS = [
  { id: 1, x: 167, y: 0 },
  { id: 2, x: 537, y: 0 },
  { id: 3, x: 907, y: 0 },
  { id: 4, x: 167, y: 454 },
  { id: 5, x: 537, y: 454 },
  { id: 6, x: 907, y: 454 },
  { id: 7, x: 167, y: 908 },
  { id: 8, x: 537, y: 908 },
  { id: 9, x: 907, y: 908 },
];

function maskStyle(maskUrl) {
  return {
    WebkitMaskImage: `url(${maskUrl})`,
    maskImage: `url(${maskUrl})`,
    WebkitMaskSize: "355px 422px",
    maskSize: "355px 422px",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "0 0",
    maskPosition: "0 0",
  };
}

function ServiceCard({ service }) {
  const mask = maskStyle(service.mask);

  return (
    <div className="relative h-[422px] w-[355px] shrink-0">
      <div className="absolute inset-0 h-[422px] w-[355px]" style={mask}>
        <img
          src={service.image}
          alt={service.title}
          className="size-full object-cover"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-[rgba(2,0,15,0)] to-[rgba(2,0,15,0.7)]"
        style={mask}
      />

      <div
        className="absolute flex items-center justify-center"
        style={{
          right: 0,
          top: 8,
          width: 79,
          height: 59,
          transform: "rotate(-36.71deg) skewX(16.58deg)",
        }}
      >
        <div className="flex size-full items-center justify-center rounded-[28px] border border-[#A1A4B1] px-[7px] py-1">
          <span
            className="rotate-45 text-center text-[#A1A4B1]"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 400,
              fontSize: 24,
              lineHeight: 1.334,
            }}
          >
            {service.id}
          </span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[124px] text-white">
        <p
          className="absolute left-[28px] top-0"
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
            fontSize: 24,
            lineHeight: "34.01px",
          }}
        >
          {service.title}
        </p>
        <p
          className="absolute right-[20px] top-[32px] text-right italic"
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: 300,
            fontSize: 16,
            lineHeight: "28px",
          }}
        >
          {service.price}
        </p>
        <p
          className="absolute left-[28px] top-[62px] w-[291px]"
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "28px",
          }}
        >
          {service.description}
        </p>
      </div>
    </div>
  );
}

function GroomingServices() {
  return (
    <section
      id="danh-sach-dich-vu"
      className="flex w-full flex-col items-center gap-6 border-t border-[rgba(0,0,0,0.1)] pt-[28px]"
      style={{ height: 1651 }}
    >
      <div className="relative h-[162px] w-[1440px] shrink-0">
        <h2
          className="absolute left-1/2 top-[89.5px] w-[1440px] -translate-x-1/2 -translate-y-1/2"
          style={groomingTitleStyles.primary64}
        >
          Dịch vụ
          <br />
          chúng tôi cung cấp
        </h2>
        <img
          src={groomingImages.serviceBgShape}
          alt=""
          className="pointer-events-none absolute left-[990px] top-[3px] h-[87px] w-[105px]"
          aria-hidden="true"
        />
      </div>

      <div className="relative h-[62px] w-[550px] shrink-0">
        <div className="absolute inset-0 rounded-[30px] border-2 border-[#FDD835] bg-[#F5F5F5]" />
        <img
          src={groomingImages.searchIcon}
          alt=""
          className="absolute right-[14px] top-1/2 size-6 -translate-y-1/2"
          aria-hidden="true"
        />
      </div>

      <div className="relative h-[1572px] w-full shrink-0">
        <img
          src={groomingImages.servicesDecor}
          alt=""
          className="pointer-events-none absolute left-[calc(50%+702.61px)] top-[59.86%] h-[129px] w-[129px] -translate-x-1/2 -rotate-[20deg] object-cover"
          aria-hidden="true"
        />

        {SERVICES.map((service) => {
          const pos = POSITIONS.find((p) => p.id === service.id);
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
    </section>
  );
}

export default GroomingServices;
