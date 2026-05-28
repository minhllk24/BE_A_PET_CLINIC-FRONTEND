import { homeImages } from "../../assets/homeImages";

function GroomingBanner() {
  return (
    <section className="relative w-full bg-white py-12 md:py-16">
      <div className="mx-auto flex w-[95%] max-w-[800px] flex-col items-center justify-center text-center">
        
        {/* Dog Icon sticking out */}
        <div className="relative -mb-2 z-10">
          <img
            src={homeImages.heroPets} // Replace with correct dog icon if available
            alt="Dog icon"
            className="h-16 w-16 object-contain"
          />
        </div>

        {/* Yellow Button */}
        <a href="/booking" className="w-full max-w-[320px] relative z-20">
          <div className="flex h-[50px] w-full items-center justify-center bg-[#FDD835] text-lg font-bold text-black shadow-sm transition hover:bg-[#FBC02D]">
            ĐẶT LỊCH NGAY
          </div>
        </a>

        {/* Text */}
        <p className="mt-4 text-base font-medium text-black">
          Thưởng cho bé cưng của bạn những giờ phút siêu thư giãn và trở nên xinh xắn hơn~
        </p>

      </div>
    </section>
  );
}

export default GroomingBanner;
