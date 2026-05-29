import { groomingImages } from "../../assets/groomingImages";

const VALUE_PROPS = [
  {
    num: "01",
    title: "Sản phẩm chăm sóc chất lượng & an toàn",
    desc: "Sự an toàn và thoải mái của bé cưng luôn là ưu tiên hàng đầu. Chúng tôi cam kết 100% trang thiết bị và dụng cụ sử dụng đều đạt tiêu chuẩn chất lượng cao và an toàn tuyệt đối.",
    y: 226,
  },
  {
    num: "02",
    title: "Đội ngũ chuyên viên được đào tạo bài bản",
    desc: "Đội ngũ chuyên viên chuyên nghiệp, sở hữu tình yêu lớn với động vật và nền tảng chuyên môn vững chắc. Bảo đảm sẽ giúp bé cưng của bạn có những phút giây thoải mái.",
    y: 425,
  },
  {
    num: "03",
    title: "Bảng giá minh bạch & Chi phí hợp lý",
    desc: "Chúng tôi mang đến giải pháp chăm sóc thú cưng toàn diện với mức giá cạnh tranh nhất thị trường, đi kèm chất lượng dịch vụ vượt trội xuất phát từ tình yêu thương.",
    y: 624,
  },
];

function GroomingWhyUs() {
  return (
    <section
      className="relative mx-auto"
      style={{
        maxWidth: 1440,
        height: 897,
        backgroundColor: "#FFFFFF",
        backgroundImage: `url(${groomingImages.whyusBg})`,
        backgroundRepeat: "repeat",
        backgroundSize: "calc(1920px * 0.75) calc(1032px * 0.75)",
      }}
    >
      {/* Heading */}
      <h2
        className="absolute"
        style={{
          left: 160,
          top: 72,
          width: 1106,
          fontFamily: '"Baloo Tamma", "Baloo 2", cursive',
          fontWeight: 400,
          fontSize: 56,
          lineHeight: "1.214em",
          textAlign: "center",
          color: "#02000F",
        }}
      >
        Hãy để chúng tôi giúp bé cưng của bạn
      </h2>

      {/* Subtitle */}
      <p
        className="absolute"
        style={{
          left: 174,
          top: 147,
          width: 1077,
          fontFamily: "Roboto, sans-serif",
          fontWeight: 400,
          fontSize: 24,
          lineHeight: "1.334em",
          textAlign: "center",
          color: "#0F172A",
        }}
      >
        Bé cưng của bạn hạnh phúc, chúng tôi tự hào. Hãy để chúng tôi đồng
        hành cùng bạn!
      </p>

      {/* Left images */}
      {/* Main image (circle) */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: 160,
          top: 237,
          width: 316,
          height: 316,
          borderRadius: 44,
          backgroundColor: "#FFFFFF",
        }}
      >
        <img
          src={groomingImages.whyusMain}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Secondary image */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: 299,
          top: 469,
          width: 318,
          height: 315,
          borderRadius: 46,
          backgroundColor: "#FFFFFF",
        }}
      >
        <img
          src={groomingImages.whyusSecondary}
          alt=""
          className="w-full h-full object-cover"
          style={{ borderRadius: 50 }}
        />
      </div>

      {/* Value proposition cards on the right */}
      {VALUE_PROPS.map((prop) => (
        <div
          key={prop.num}
          className="absolute"
          style={{
            left: 658,
            top: prop.y,
            width: 645,
            height: 171,
          }}
        >
          {/* Card backgrounds (two stacked for depth effect) */}
          <div
            className="absolute"
            style={{
              left: 0,
              top: 0,
              width: 645,
              height: 171,
              overflow: "hidden",
            }}
          >
            <div
              className="absolute"
              style={{
                left: 0,
                top: 13,
                width: 645,
                height: 148,
                borderRadius: 10,
                backgroundColor: "#FBF6EA",
              }}
            />
          </div>
          <div
            className="absolute"
            style={{
              left: 0,
              top: 0,
              width: 645,
              height: 171,
              overflow: "hidden",
            }}
          >
            <div
              className="absolute"
              style={{
                left: 0,
                top: 13,
                width: 645,
                height: 148,
                borderRadius: 10,
                backgroundColor: "#FBF6EA",
              }}
            />
          </div>

          {/* Checkmark icon */}
          <div
            className="absolute"
            style={{
              left: 46,
              top: 38,
              width: 51,
              height: 50,
            }}
          >
            <img
              src={groomingImages.checkmark}
              alt=""
              style={{ width: 33, height: 33 }}
            />
          </div>

          {/* Title */}
          <h3
            className="absolute"
            style={{
              left: 97,
              top: 30,
              width: 477,
              fontFamily: "Roboto, sans-serif",
              fontWeight: 700,
              fontSize: 24,
              lineHeight: "1.6em",
              color: "#000000",
            }}
          >
            {prop.title}
          </h3>

          {/* Number */}
          <span
            className="absolute"
            style={{
              left: 596,
              top: 12,
              width: 49,
              fontFamily: "Roboto, sans-serif",
              fontWeight: 500,
              fontSize: 32,
              lineHeight: "0.8125em",
              color: "#02000F",
            }}
          >
            {prop.num}
          </span>

          {/* Description */}
          <p
            className="absolute"
            style={{
              left: 98,
              top: 76,
              width: 469,
              fontFamily: "Roboto, sans-serif",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "1.43em",
              letterSpacing: "0.012em",
              color: "#000000",
            }}
          >
            {prop.desc}
          </p>
        </div>
      ))}
    </section>
  );
}

export default GroomingWhyUs;
