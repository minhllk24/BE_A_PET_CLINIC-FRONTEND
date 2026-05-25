import { homeImages } from "../../assets/homeImages";
import YellowButton from "./YellowButton";

const FEATURES = [
  ["Đặt lịch khám nhanh chóng", "Mua sắm sản phẩm đa dạng"],
  ["Quản lý hồ sơ số hóa", "Tư vấn chăm sóc chuyên sâu"],
  ["Theo dõi bệnh án trọn đời", "Kết nối cứu trợ và Nhận nuôi"],
];

function CheckIcon() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 border-secondary bg-secondary/20 text-secondary">
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
        <path
          d="M1 5L5 9L13 1"
          stroke="#FDD835"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function AboutSection() {
  return (
    <section
      id="về-chúng-tôi"
      className="w-full bg-white py-12 md:py-[50px]"
    >
      <div className="mx-auto flex max-w-page flex-col items-center gap-10 px-6 lg:flex-row lg:items-center lg:gap-[42px] lg:px-[120px]">
        <div className="relative w-full max-w-[584px] shrink-0">
          <img
            src={homeImages.aboutTeam}
            alt="Đội ngũ Dr. Pet's House"
            className="h-auto w-full object-contain"
          />
        </div>
      {/* right content */}
        <div
          className="flex max-w-[523px] flex-col gap-4"
          style={{
            background: "radial-gradient(50% 50% at 50% 50%, var(--primary-main, #E3F2FD) 0%, #FFF 100%)",
          }}
        >
          <div className="flex flex-col items-center gap-2">
     
            <div className="h-px w-full max-w-[223px] border-t border-dashed border-amber-400" />
            <p className="flex items-center gap-2 text-base font-bold text-amber-400">
              <img src={homeImages.bone_icon} alt="" className="h-6 w-6 mr-1 inline-block align-middle" aria-hidden />
         
              Câu chuyện của chúng tôi
            </p>
            <div className="h-px w-full max-w-[223px] border-t border-dashed border-amber-600" />
          </div>

          <div className="relative flex items-center justify-center">
            {/* Vector vàng*/}
            <svg
              className="
                pointer-events-none absolute
                bottom-[8px] left-1/2
                h-[20px] w-[179px]
                -translate-x-1/2
                z-0
              "
              viewBox="0 0 182 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M0.213867 5.64588C23.7047 3.62998 109.211 -0.290806 179.214 5.6459C142.876 5.6459 106.198 6.7462 75.7139 13"
                stroke="#FDD835"
                strokeWidth="4"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="relative z-10 font-bold text-center font-display text-4xl leading-tight text-[#02000f] md:text-[56px] md:leading-[68px]">
              Chăm Sóc Thú Cưng Toàn Diện
            </h2>
          </div>
    

          <p className="text-justify text-lg leading-[31.5px] text-[#6c6d71]">
            Dr.Pet&apos;s House ra đời với sứ mệnh mang đến một hệ sinh thái chăm
            sóc thú cưng thông minh và tin cậy.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {FEATURES.map(([left, right]) => (
              <div key={left} className="contents">
                <div className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-base leading-7 text-[#4e4e4e]">{left}</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-base leading-7 text-[#4e4e4e]">{right}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <YellowButton className="h-[52px] min-w-[240px]">
              TÌM HIỂU THÊM →
            </YellowButton>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary">
                <span className="text-xl" aria-hidden>
                  <img src={homeImages.phone} alt="Phone" className="h-6 w-6" />
                </span>
              </div>
              <div>
                <p className="text-2xl font-medium text-[#02000f]">Liên hệ:</p>
                <p className="text-lg text-[#02000f]">086 8686868</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
