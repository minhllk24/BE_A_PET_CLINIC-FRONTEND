import { groomingImages } from "../../assets/groomingImages";

function GroomingHero() {
  return (
    <section
      className="relative w-full bg-white"
      style={{ height: 690 }}
    >
      {/* Background shape - light blue rounded rectangle */}
      <div
        className="absolute"
        style={{
          top: 0,
          left: 66,
          width: 1309,
          height: 647,
          borderRadius: 100,
          backgroundColor: "#E5F6FD",
          boxShadow: "inset 0px 0px 20px 0px rgba(126, 128, 133, 0.25)",
        }}
      />

      {/* Content container */}
      <div
        className="relative z-10 mx-auto flex items-center"
        style={{
          maxWidth: 1440,
          height: "100%",
          gap: 100,
          paddingLeft: 120,
          paddingRight: 87,
        }}
      >
        {/* Left content */}
        <div
          className="flex flex-col justify-center"
          style={{ gap: 43, paddingBottom: 123, flex: "1 1 0" }}
        >
          {/* Title */}
          <h1
            style={{
              fontFamily: '"Baloo Tamma", "Baloo 2", cursive',
              fontWeight: 400,
              fontSize: 70,
              lineHeight: "0.97em",
              color: "#02000F",
            }}
          >
            Dịch vụ
            <br />
            Grooming &amp; Spa
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 400,
              fontSize: 24,
              lineHeight: "1.334em",
              color: "#0F172A",
              textAlign: "justify",
            }}
          >
            Dịch vụ tắm sấy, cắt tỉa lông và chăm sóc vệ sinh giúp thú cưng
            luôn sạch sẽ, khỏe mạnh và thoải mái.
          </p>

          {/* Buttons row */}
          <div className="flex items-center" style={{ gap: 24 }}>
            {/* Paw icon + ĐẶT LỊCH NGAY button */}
            <div className="relative">
              <img
                src={groomingImages.heroPaw}
                alt=""
                className="absolute pointer-events-none"
                style={{
                  left: -54,
                  top: -43,
                  width: 82,
                  height: 85,
                }}
              />
              <a href="/booking">
                <button
                  type="button"
                  className="flex items-center justify-center"
                  style={{
                    width: 181,
                    backgroundColor: "#FDD835",
                    borderRadius: 4,
                    padding: "8px 22px",
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 500,
                    fontSize: 15,
                    lineHeight: "1.733em",
                    letterSpacing: "0.046em",
                    textTransform: "uppercase",
                    color: "rgba(0, 0, 0, 0.87)",
                    boxShadow:
                      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  ĐẶT LỊCH NGAY{" "}
                </button>
              </a>
            </div>

            {/* Bắt đầu thôi button */}
            <a href="#danh-sach-dich-vu">
              <button
                type="button"
                className="flex items-center justify-center"
                style={{
                  width: 179,
                  backgroundColor: "#FFF9C4",
                  borderRadius: 4,
                  padding: "8px 22px",
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 500,
                  fontSize: 15,
                  lineHeight: "1.733em",
                  letterSpacing: "0.046em",
                  textTransform: "uppercase",
                  color: "rgba(0, 0, 0, 0.87)",
                  boxShadow:
                    "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                Bắt đầu thôi
              </button>
            </a>
          </div>
        </div>

        {/* Right content - Pet image */}
        <div className="relative" style={{ flex: "1 1 0", height: 848 }}>
          <img
            src={groomingImages.heroPet}
            alt="Grooming & Spa"
            style={{
              position: "absolute",
              left: -86,
              top: 40,
              width: 636,
              height: 568,
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default GroomingHero;
