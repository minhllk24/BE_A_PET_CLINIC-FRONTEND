import { groomingImages } from "../../assets/groomingImages";

function GroomingCombos() {
  return (
    <section
      className="relative mx-auto"
      style={{
        maxWidth: 1440,
        height: 785,
      }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "#E5F6FD" }}
      />

      {/* Heading */}
      <h2
        className="absolute"
        style={{
          left: 272,
          top: 65,
          width: 884,
          fontFamily: '"Baloo Tamma", "Baloo 2", cursive',
          fontWeight: 400,
          fontSize: 64,
          lineHeight: "1.1em",
          textAlign: "center",
          color: "rgba(0, 0, 0, 0.87)",
        }}
      >
        Combo siêu tiết kiệm
      </h2>

      {/* Subtitle */}
      <p
        className="absolute"
        style={{
          left: 79,
          top: 132,
          width: 1293,
          fontFamily: "Roboto, sans-serif",
          fontWeight: 400,
          fontSize: 24,
          lineHeight: "1.334em",
          textAlign: "center",
          color: "#0F172A",
        }}
      >
        Ngoài những dịch vụ riêng lẻ, chúng tôi còn thiết kế các combo phù hợp.{" "}
        <br />
        Không chỉ giúp bạn tiết kiệm hơn, mà bé cưng của bạn cũng vui vẻ hơn.
      </p>

      {/* ═══════════════════════════════════════
         Combo 1: Combo Tắm 11 bước (LEFT LARGE)
         658×464 at position (50, 235)
         ═══════════════════════════════════════ */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: 50,
          top: 235,
          width: 658,
          height: 464,
          borderRadius: 16,
        }}
      >
        {/* Background image mask */}
        <div
          className="absolute"
          style={{
            left: 13,
            top: 0,
            width: 645,
            height: 464,
            overflow: "hidden",
          }}
        >
          <div
            className="absolute"
            style={{
              left: 74,
              top: 0,
              width: 584,
              height: 464,
              borderRadius: 45,
              backgroundColor: "rgba(144, 202, 249, 0.3)",
            }}
          />
        </div>

        {/* Combo image */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: 101,
            top: 28,
            width: 261,
            height: 408,
            borderRadius: 16,
          }}
        >
          <img
            src={groomingImages.comboBath}
            alt="Combo Tắm 11 bước"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <h3
          className="absolute"
          style={{
            left: 391,
            top: 28,
            fontFamily: "Roboto, sans-serif",
            fontWeight: 500,
            fontSize: 24,
            lineHeight: "1.417em",
            color: "#02000F",
          }}
        >
          Combo Tắm 11 bước
        </h3>

        {/* Price */}
        <span
          className="absolute"
          style={{
            left: 393,
            top: 66,
            fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
            fontSize: 20,
            lineHeight: "1.75em",
            color: "#02000F",
          }}
        >
          Từ 150.000 đ
        </span>

        {/* Steps list */}
        <div
          className="absolute"
          style={{
            left: 395,
            top: 108,
            width: 252,
            fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "1.5em",
            color: "#6C6D71",
          }}
        >
          Kiểm tra lông, da
          <br />
          Cạo lông bàn chân
          <br />
          Cạo lông bụng
          <br />
          Cạo lông hậu môn
          <br />
          Vắt tuyến hôi
          <br />
          Vệ sinh tai
          <br />
          Cắt, mài móng
          <br />
          Tắm xả chuyên sâu 2 lần
          <br />
          Massage làm sạch
          <br />
          Sấy chải tạo độ phồng lông
          <br />
          Xịt thơm dưỡng bóng lông
        </div>

        {/* Đặt lịch button */}
        <a
          href="/booking"
          className="absolute flex items-center justify-center"
          style={{
            left: 471,
            top: 408,
            width: 188,
            height: 48,
            backgroundColor: "#0D47A1",
            borderRadius: 50,
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "1em",
              color: "#FFFFFF",
              textAlign: "center",
            }}
          >
            Đặt lịch
          </span>
        </a>
      </div>

      {/* ═══════════════════════════════════════
         Right column: two smaller combo cards
         stacked at (720, 242) - each 587×220
         ═══════════════════════════════════════ */}

      {/* Combo 2: Combo Tắm cơ bản & cắt tỉa lông */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: 732,
          top: 242,
          width: 587,
          height: 220,
          borderRadius: 16,
        }}
      >
        {/* Background */}
        <div
          className="absolute"
          style={{
            left: 0,
            top: 0,
            width: 587,
            height: 220,
            backgroundColor: "rgba(144, 202, 249, 0.3)",
            borderRadius: 39,
          }}
        />

        {/* Combo image */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: 40,
            top: 40,
            width: 132,
            height: 140,
            borderRadius: 16,
          }}
        >
          <img
            src={groomingImages.comboGrooming}
            alt="Combo Tắm cơ bản & cắt tỉa lông"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <h3
          className="absolute"
          style={{
            left: 192,
            top: 50,
            fontFamily: "Roboto, sans-serif",
            fontWeight: 500,
            fontSize: 24,
            lineHeight: "1.417em",
            color: "#02000F",
          }}
        >
          Combo Tắm cơ bản & cắt tỉa lông
        </h3>

        {/* Price */}
        <span
          className="absolute"
          style={{
            left: 192,
            top: 82,
            fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
            fontSize: 20,
            lineHeight: "1.75em",
            color: "#02000F",
          }}
        >
          Từ 100.000 đ
        </span>

        {/* Description */}
        <span
          className="absolute"
          style={{
            left: 192,
            top: 110,
            width: 394,
            fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "1.6em",
            color: "#6C6D71",
          }}
        >
          Gói Tắm cơ bản, sấy lông & cắt tỉa
        </span>

        {/* Đặt lịch button */}
        <a
          href="/booking"
          className="absolute flex items-center justify-center"
          style={{
            left: 403,
            top: 176,
            width: 182,
            height: 48,
            backgroundColor: "#0D47A1",
            borderRadius: 50,
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "1em",
              color: "#FFFFFF",
              textAlign: "center",
            }}
          >
            Đặt lịch
          </span>
        </a>
      </div>

      {/* Combo 3: Combo Chăm sóc & bảo vệ móng */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: 732,
          top: 486,
          width: 587,
          height: 220,
          borderRadius: 16,
        }}
      >
        {/* Background */}
        <div
          className="absolute"
          style={{
            left: 0,
            top: 0,
            width: 587,
            height: 220,
            backgroundColor: "rgba(144, 202, 249, 0.3)",
            borderRadius: 39,
          }}
        />

        {/* Combo image */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: 40,
            top: 40,
            width: 132,
            height: 140,
            borderRadius: 16,
          }}
        >
          <img
            src={groomingImages.comboNail}
            alt="Combo Chăm sóc & bảo vệ móng"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <h3
          className="absolute"
          style={{
            left: 192,
            top: 50,
            fontFamily: "Roboto, sans-serif",
            fontWeight: 500,
            fontSize: 24,
            lineHeight: "1.417em",
            color: "#02000F",
          }}
        >
          Combo Chăm sóc & bảo vệ móng
        </h3>

        {/* Price */}
        <span
          className="absolute"
          style={{
            left: 192,
            top: 82,
            fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
            fontSize: 20,
            lineHeight: "1.75em",
            color: "#02000F",
          }}
        >
          Từ 80.000 đ
        </span>

        {/* Description */}
        <span
          className="absolute"
          style={{
            left: 192,
            top: 110,
            width: 407,
            fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "1.6em",
            color: "#6C6D71",
          }}
        >
          Cắt móng, cạo da chết đệm thịt, dưỡng ẩm
        </span>

        {/* Đặt lịch button */}
        <a
          href="/booking"
          className="absolute flex items-center justify-center"
          style={{
            left: 403,
            top: 176,
            width: 182,
            height: 48,
            backgroundColor: "#0D47A1",
            borderRadius: 50,
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "1em",
              color: "#FFFFFF",
              textAlign: "center",
            }}
          >
            Đặt lịch
          </span>
        </a>
      </div>
    </section>
  );
}

export default GroomingCombos;
