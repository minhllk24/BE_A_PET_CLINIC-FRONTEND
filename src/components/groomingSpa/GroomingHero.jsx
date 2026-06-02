import { groomingImages } from "../../assets/groomingImages";
import { groomingTitleStyles } from "./groomingTitleStyles";

function GroomingHero() {
  return (
    <section className="relative h-[690px] w-[1440px] overflow-hidden bg-white">
      <img
        src={groomingImages.heroBg}
        alt=""
        className="pointer-events-none absolute bottom-[43px] left-1/2 w-[1309px] max-w-none -translate-x-1/2"
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full w-full items-center gap-[100px] pl-[120px] pr-[87px]">
        <div className="flex max-w-[600px] flex-[1_0_0] flex-col items-start justify-center gap-[43px] pb-[123px]">
          <h1 style={groomingTitleStyles.hero}>
            Dịch vụ
            <br />
            Grooming &amp; Spa
          </h1>

          <p
            className="w-full text-justify text-[#0F172A]"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 400,
              fontSize: 24,
              lineHeight: 1.334,
            }}
          >
            Dịch vụ tắm sấy, cắt tỉa lông và chăm sóc vệ sinh giúp thú cưng luôn
            sạch sẽ, khỏe mạnh và thoải mái.
          </p>

          <div className="relative flex items-start gap-[24px]">
            <img
              src={groomingImages.heroPaw}
              alt=""
              className="pointer-events-none absolute -left-[54px] -top-[43px] h-[65.801px] w-[59.964px] -rotate-[25deg]"
              aria-hidden="true"
            />
            <a href="/booking">
              <button
                type="button"
                className="flex w-[181px] items-center justify-center rounded-[4px] bg-[#FDD835] px-[22px] py-2 shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)]"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  lineHeight: "26px",
                  letterSpacing: "0.46px",
                  textTransform: "uppercase",
                  color: "rgba(0, 0, 0, 0.87)",
                }}
              >
                ĐẶT LỊCH NGAY
              </button>
            </a>
            <a href="#danh-sach-dich-vu">
              <button
                type="button"
                className="flex w-[179px] items-center justify-center rounded-[4px] bg-[#FFF9C4] px-[22px] py-2 shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)]"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  lineHeight: "26px",
                  letterSpacing: "0.46px",
                  textTransform: "uppercase",
                  color: "rgba(0, 0, 0, 0.87)",
                }}
              >
                Bắt đầu thôi
              </button>
            </a>
          </div>
        </div>

        {/* Figma: ảnh chó + nền vàng — căn giữa cột phải, cách nền trắng 87px trên/dưới */}
        <div className="flex flex-[1_0_0] max-w-[636px] items-center justify-center self-stretch py-[87px]">
          <img
            src={groomingImages.heroPetComposite}
            alt="Grooming & Spa"
            className="h-full w-full max-h-[516px] object-contain object-center"
          />
        </div>
      </div>
    </section>
  );
}

export default GroomingHero;
