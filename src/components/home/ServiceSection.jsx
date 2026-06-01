import { homeImages } from "../../assets/homeImages";
import SectionTitle from "./SectionTitle";

const SERVICES = [
  {
    image: homeImages.service1,
    title: "Khám & Điều trị",
    description:
      "Đội ngũ bác sĩ chuyên khoa cùng trang thiết bị hiện đại, chẩn đoán chính xác, điều trị tận tâm và hỗ trợ cấp cứu cho bé yêu 24/7.",
  },
  {
    image: homeImages.service2,
    title: "Grooming & Spa",
    description:
      "Dịch vụ tắm sấy, cắt tỉa lông và chăm sóc vệ sinh giúp thú cưng luôn sạch sẽ, khỏe mạnh và thoải mái.",
  },
  {
    image: homeImages.service3,
    title: "Pet Shop",
    description:
      "Cung cấp đa dạng sản phẩm dành cho thú cưng như thức ăn, phụ kiện, đồ chơi và sản phẩm chăm sóc sức khỏe từ nhiều thương hiệu uy tín.",
  },
];

function ServiceCard({ image, title, description }) {
  return (
    <article className="group flex flex-1 flex-col items-center transition-transform duration-component ease-premium hover:-translate-y-1">
      <div className="relative h-[513px] w-full max-w-[338px] overflow-hidden rounded-t-[189px]">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-component ease-premium group-hover:scale-[1.02]"
        />
        <div className="absolute bottom-[30px] left-[33px] h-[244px] w-[272px]">

          {/* Background shape */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 272 244"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              opacity="0.9"
              d="M0 136C0 60.8893 60.8893 0 136 0C211.111 0 272 60.8893 272 136V244H0V136Z"
              fill="white"
            />
          </svg>

          {/* Content */}
          <div className="relative flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
            <h3 className="text-xl font-medium text-black">{title}</h3>
            <p className="text-sm leading-snug tracking-wide text-black">
              {description}
            </p>
            <button
              type="button"
              className="btn-icon mt-2 flex h-12 w-[60px] items-center justify-center bg-secondary text-xl font-bold text-black hover:bg-[#FFEE58]"
              aria-label={`Xem thêm ${title}`}
            >
              →
            </button>
       
          </div>

        </div>
      </div>

    </article>
  );
}

function ServiceSection() {
  return (
    <section
      id="dịch-vụ-thú-y"
      className="relative w-full overflow-hidden py-12 md:py-16"
    >

      {/* Khối background xanh */}
      <svg
        className="absolute bottom-[-11.03px] left-1/2 h-[933px] w-[1440px] -translate-x-1/2"
        viewBox="0 0 1440 922"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M0 878.464V76.4969C0 76.4969 186.895 5.12668e-05 698.348 0C1209.8 -5.12668e-05 1440 76.4969 1440 76.4969V878.464C1440 878.464 1206.61 939.315 698.348 932.462C190.085 925.608 0 878.464 0 878.464Z"
          fill="#E5F6FD"
        />
      </svg>


      <img
        src={homeImages.catDeco}
        alt=""
        className="pointer-events-none absolute right-4 top-2 hidden h-[140px] w-auto lg:block xl:right-[calc((100vw-1440px)/2+80px)]"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-page flex-col items-center gap-14 px-6 md:px-20">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          {/* Vector vàng */}
          <svg
            className="absolute left-1/2 top-[50px] z-0 h-[15px] w-[179px] -translate-x-1/2"
            viewBox="0 0 182 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M0.213867 5.64588C23.7047 3.62998 109.211 -0.290806 179.214 5.6459C142.876 5.6459 106.198 6.7462 75.7139 13"
              stroke="#FDD835"
              strokeWidth="5"
              strokeLinejoin="round"
            />
          </svg>
          <SectionTitle
            subtitle="Dr.Pet's House mang đến hệ sinh thái chăm sóc thú cưng hiện đại với đầy đủ dịch vụ từ khám chữa bệnh, chăm sóc làm đẹp đến mua sắm sản phẩm chất lượng. Chúng tôi luôn hướng đến sự tiện lợi, an toàn và trải nghiệm tốt nhất cho cả thú cưng và chủ nuôi."
            className="relative z-10"
          >
            <>
              <span className="font-bold block">Dịch vụ</span>
              <span className="font-bold block">chúng tôi cung cấp</span>
            </>
          </SectionTitle>
    
    
        </div>
      </div>

        <div className="grid w-full gap-8 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceSection;
