import { homeImages } from "../../assets/homeImages";
import SectionTitle from "./SectionTitle";
import YellowButton from "./YellowButton";

const DOCTORS = [
  { image: homeImages.doctor1, name: "BS. Nguyễn Minh Anh" },
  { image: homeImages.doctor2, name: "BS. Trần Quốc Huy" },
  { image: homeImages.doctor3, name: "BS. Lê Khánh Linh" },
  { image: homeImages.doctor4, name: "BS. Phạm Đức Thành" },
];

function DoctorCard({ image, name }) {
  return (
    <article className="relative flex h-[330px] w-full items-end justify-center">
      <div className="relative h-[312px] w-[312px]">
        {/* Ellipse vàng 1 */}
        <svg
          className="absolute left-[26px] top-[88px] z-0 h-[148px] w-[223px]"
          viewBox="0 0 223 148"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <ellipse
            cx="122.679"
            cy="52.1324"
            rx="122.679"
            ry="52.1324"
            transform="matrix(0.890114 -0.455738 0.390902 0.920433 -18.4736 81.604)"
            fill="#FDD835"
          />
        </svg>

        {/* Ellipse vàng 2 */}
        <svg
          className="absolute left-[62px] top-[126px] z-0 h-[147px] w-[223px]"
          viewBox="0 0 223 147"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <ellipse
            cx="122.679"
            cy="51.5191"
            rx="122.679"
            ry="51.5191"
            transform="matrix(0.890114 -0.455738 0.390902 0.920433 -18.2778 81.8022)"
            fill="#FDD835"
          />
        </svg>
        {/* Bác sĩ */}
        <img
          src={image}
          alt={name}
          className="relative z-10 -translate-y-14 h-[312.42px] w-[312.42px] object-contain object-bottom"
        />

        {/* Nền xanh tên bác sĩ */}
        <div className="absolute bottom-[0px] left-1/2 z-20 h-[131px] w-[318px] -translate-x-1/2">
          <img
            src={homeImages.doctorNameBg}
            alt=""
            className="h-full w-full object-contain"
            aria-hidden
          />

          <p className="absolute left-1/2 top-1/2 flex h-[27px] w-[204px] -translate-x-1/2 -translate-y-1/2 rotate-[-13.69deg] items-center justify-center text-center font-roboto text-[20px] font-medium leading-[160%] tracking-[0.15px] text-secondary">
            {name}
          </p>
        </div>
      </div>
    </article>
  );
}

function DoctorSection() {
  return (
    <section className="relative w-full overflow-hidden py-12 md:py-16">
      <img
        src={homeImages.doctorBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />

      <div className="relative flex flex-col items-center gap-6">
        <svg
          className="absolute top-[50px] h-[15px] w-[500px]"
          viewBox="0 0 182 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M0.213867 5.64588C23.7047 3.62998 109.211 -0.290806 179.214 5.6459C142.876 5.6459 106.198 6.7462 75.7139 13"
            stroke="#FDD835"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
        <SectionTitle subtitle="Đội ngũ bác sĩ tại Dr.Pet's House luôn đặt sức khỏe và sự an toàn của thú cưng lên hàng đầu. Với kiến thức chuyên môn cùng sự tận tình trong chăm sóc, chúng tôi mang đến trải nghiệm thăm khám đáng tin cậy cho mọi khách hàng.">
          <span className="font-bold">Đội ngũ bác sĩ thú y</span>
     
        </SectionTitle>
        <div className="flex flex-wrap items-center justify-center gap-4">
     

          <div className="flex flex-wrap items-center justify-center gap-4">
            <YellowButton className="h-12 px-4 text-xl">ĐẶT LỊCH NGAY</YellowButton>
            <YellowButton variant="outline" className="h-12 px-4">
              ĐĂNG KÝ TÀI KHOẢN →
            </YellowButton>
            <button
              type="button"
              className="px-2 py-3 text-base font-medium text-blue-900 hover:underline"
            >
              TÌM HIỂU THÊM →
            </button>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">
          {DOCTORS.map((doctor) => (
            <DoctorCard key={doctor.name} {...doctor} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DoctorSection;
