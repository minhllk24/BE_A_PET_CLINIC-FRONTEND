import { homeImages } from "../../assets/homeImages";
import YellowButton from "../home/YellowButton";

function GroomingHero() {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-6 pb-12">
      <div className="relative mx-auto w-[95%] max-w-[1300px]">
        {/* Background xanh */}
        <div
          className="
            absolute inset-0
            h-[580px]
            rounded-[70px]
            bg-[#E5F6FD]
            shadow-[inset_0_0_20px_rgba(126,128,133,0.15)]
          "
        />

        {/* Content */}
        <div
          className="
            relative z-10
            flex min-h-[560px] flex-col items-center justify-between
            gap-10 px-8 py-12
            lg:flex-row lg:px-[100px] lg:py-0
          "
        >
          {/* LEFT */}
          <div className="max-w-[550px] self-center">
            <h1 className="mb-4 font-display text-5xl md:text-[64px] font-bold leading-tight text-[#0B0F19]">
              Dịch vụ <br />
              Grooming & Spa
            </h1>

            <div className="mb-6 flex justify-start">
              <span className="text-gray-400 tracking-widest text-lg">...</span>
            </div>

            <p className="mb-8 text-lg md:text-xl leading-relaxed text-[#1C1F27]">
              Dịch vụ tắm sấy, cắt tỉa lông và chăm sóc vệ sinh giúp thú cưng luôn sạch sẽ, khỏe mạnh và thoải mái.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="group relative">
                <img
                  src={homeImages.paw}
                  alt=""
                  className="
                    pointer-events-none absolute
                    left-[-35px] top-[-30px]
                    h-[60px] w-[50px]
                    -rotate-[25deg]
                    opacity-100
                    z-20
                  "
                />
                <a href="/booking" className="relative z-10 block">
                  <YellowButton>
                    ĐẶT LỊCH NGAY
                  </YellowButton>
                </a>
              </div>

              <a href="#danh-sach-dich-vu" className="relative z-10 block">
                <YellowButton variant="light">
                  BẮT ĐẦU THÔI
                </YellowButton>
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex shrink-0 items-center justify-center self-center lg:h-[580px] lg:w-[550px]">
            {/* Main Pet Image for Grooming */}
            <img
              src={homeImages.service2}
              alt="Grooming and Spa"
              className="
                w-full max-w-[450px] md:max-w-[550px]
                object-contain
                transition-transform duration-500 hover:scale-105
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default GroomingHero;
