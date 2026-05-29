import { groomingImages } from "../../assets/groomingImages";

function GroomingBanner() {
  return (
    <section
      className="relative mx-auto"
      style={{
        maxWidth: 1440,
        height: 239,
        paddingBottom: 25,
      }}
    >
      {/* Top row: button + dog image */}
      <div
        className="absolute"
        style={{
          left: 0,
          top: 0,
          width: 1440,
          height: 144,
        }}
      >
        {/* Yellow CTA button */}
        <div
          className="absolute"
          style={{
            left: 506,
            top: 3,
            width: 428,
            height: 154,
          }}
        >
          <a href="/booking">
            <button
              type="button"
              className="absolute flex items-center justify-center"
              style={{
                left: 0,
                top: 74,
                width: 428,
                height: 63,
                backgroundColor: "#FDD835",
                borderRadius: 4,
                padding: "8px 22px",
                fontFamily: "Roboto, sans-serif",
                fontWeight: 400,
                fontSize: 32,
                lineHeight: "1.235em",
                letterSpacing: "0.0078em",
                color: "rgba(0, 0, 0, 0.87)",
                border: "none",
                cursor: "pointer",
                boxShadow:
                  "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
              }}
            >
              ĐẶT LỊCH NGAY{" "}
            </button>
          </a>

          {/* Dog image */}
          <img
            src={groomingImages.bannerDog}
            alt=""
            className="absolute"
            style={{
              left: 153,
              top: 13,
              width: 122,
              height: 74,
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      {/* Bottom text */}
      <p
        className="absolute"
        style={{
          left: 158,
          top: 157,
          width: 1124,
          height: 55,
          fontFamily: "Roboto, sans-serif",
          fontWeight: 500,
          fontSize: 24,
          lineHeight: "1.6em",
          letterSpacing: "0.006em",
          textAlign: "center",
          color: "#000000",
        }}
      >
        Thưởng cho bé cưng của bạn những giờ phút siêu thư giãn và trở nên xinh
        xắn hơn~{" "}
      </p>
    </section>
  );
}

export default GroomingBanner;
