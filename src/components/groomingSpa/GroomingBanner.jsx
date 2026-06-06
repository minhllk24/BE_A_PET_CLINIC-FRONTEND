import { groomingImages } from "../../assets/groomingImages";

function GroomingBanner() {
  return (
    <section className="relative flex h-[239px] w-full flex-col items-center justify-center overflow-hidden pb-[25px]">
      <div className="absolute inset-x-0 bottom-[95px] top-0 overflow-hidden">
        <div className="absolute bottom-[-13px] left-1/2 top-[3px] w-[428px] -translate-x-1/2">
          <a href="/booking">
            <button
              type="button"
              className="absolute inset-x-0 bottom-[17px] top-[74px] flex items-center justify-center rounded-[4px] bg-[#FDD835] px-[22px] py-2 shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)] transition-all duration-micro hover:bg-[#ffe454]"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 700,
                fontSize: 32,
                lineHeight: 1.235,
                letterSpacing: "0.25px",
                color: "rgba(0, 0, 0, 0.87)",
              }}
            >
              ĐẶT LỊCH NGAY
            </button>
          </a>
          <img
            src={groomingImages.bannerDog}
            alt=""
            className="pointer-events-none absolute left-[153px] top-[13px] h-[74px] w-[122px] object-cover"
            aria-hidden="true"
          />
        </div>
      </div>

      <p
        className="absolute left-[10.97%] right-[10.97%] top-[157px] text-center text-black"
        style={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: 500,
          fontSize: 24,
          lineHeight: 1.6,
          letterSpacing: "0.15px",
        }}
      >
        Thưởng cho bé cưng của bạn những giờ phút siêu thư giãn và trở nên xinh
        xắn hơn~
      </p>
    </section>
  );
}

export default GroomingBanner;
