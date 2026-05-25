import { homeImages } from "../../assets/homeImages";
import YellowButton from "./YellowButton";

function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-6">
      <div className="relative mx-auto w-[95%] max-w-[1300px]">
        
        {/* Background xanh */}
        <div
          className="
            absolute inset-0
            h-[580px]
            rounded-[70px]
            bg-[#E5F6FD]
            shadow-[inset_0_0_20px_rgba(126,128,133,0.25)]
          "
        />

        {/* Content */}
        <div
          className="
            relative z-10
            flex min-h-[560px] flex-col items-center justify-between
            gap-10 px-8
            lg:flex-row lg:px-[100px]
          "
        >
          
          {/* LEFT */}
          <div className="max-w-[500px] self-center">
            <p className="mb-0 text-xl font-bold text-black/80">
              Trung Tâm Chăm Sóc Thú Cưng
            </p>

            <img
              src={homeImages.heroLogo}
              alt="Dr.Pet's House"
              className="mb-5 w-full max-w-[600px]"
            />

            <p className="mb-8 text-xl leading-relaxed text-slate-800">
              Chúng tôi mang đến dịch vụ y tế chuẩn xác, không gian spa thư giãn
              và những sản phẩm chất lượng nhất cho người bạn bốn chân của bạn.
            </p>

            <div className="flex gap-5">
              <div className="group relative">
                <img
                  src={homeImages.paw}
                  alt=""
                  className="
                    pointer-events-none absolute
                    left-[-54px] top-[-43px]
                    h-[70px] w-[60px]
                    -rotate-[25deg]
                    opacity-0 translate-y-2
                    transition-all duration-300
                    group-hover:opacity-100 group-hover:translate-y-0
                  "
                />

                <YellowButton>
                  ĐẶT LỊCH NGAY
                </YellowButton>
              </div>

              <YellowButton variant="light">
                MUA SẮM NGAY
              </YellowButton>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative h-[650px] w-[520px] shrink-0">
            
            {/* Ellipse */}
            <div
              className="
                absolute bottom-[59px] left-1/2
                h-[460px] w-[470px]
                -translate-x-1/2
                rounded-full
                bg-[#90CAF9]
                shadow-[0_4px_20px_rgba(0,0,0,0.25)]
              "
            />

            {/* Shape */}
            <svg
              className="absolute right-[80px] top-[90px] z-20"
              width="60"
              height="72"
              viewBox="0 0 60 72"
              fill="none"
            >
              <path
                d="M13 54C22 45 27 33 30 19"
                stroke="#2B1B1B"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M35 58C43 49 49 36 52 24"
                stroke="#2B1B1B"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>

            {/* Pets */}
            <img
              src={homeImages.heroPets}
              alt="Pets"
              className="
                absolute bottom-[-40px] left-1/2
                z-10
                w-[390px]
                -translate-x-1/2
                object-contain
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
