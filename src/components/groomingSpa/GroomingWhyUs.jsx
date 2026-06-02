import { groomingImages } from "../../assets/groomingImages";
import { cssMask } from "./groomingMaskUtils";
import { groomingTitleStyles } from "./groomingTitleStyles";

const VALUE_PROPS = [
  {
    num: "01",
    title: "Sản phẩm chăm sóc chất lượng & an toàn",
    desc: "Sự an toàn và thoải mái của bé cưng luôn là ưu tiên hàng đầu. Chúng tôi cam kết 100% trang thiết bị và dụng cụ sử dụng đều đạt tiêu chuẩn chất lượng cao và an toàn tuyệt đối.",
    top: 226,
  },
  {
    num: "02",
    title: "Đội ngũ chuyên viên được đào tạo bài bản",
    desc: "Đội ngũ chuyên viên chuyên nghiệp, sở hữu tình yêu lớn với động vật và nền tảng chuyên môn vững chắc. Bảo đảm sẽ giúp bé cưng của bạn có những phút giây thoải mái.",
    top: 425,
  },
  {
    num: "03",
    title: "Bảng giá minh bạch & Chi phí hợp lý",
    desc: "Chúng tôi mang đến giải pháp chăm sóc thú cưng toàn diện với mức giá cạnh tranh nhất thị trường, đi kèm chất lượng dịch vụ vượt trội xuất phát từ tình yêu thương.",
    top: 624,
  },
];

function ValuePropCard({ prop }) {
  return (
    <article
      className="absolute left-[658px] h-[171px] w-[645px]"
      style={{ top: prop.top }}
    >
      <div
        className="absolute inset-0"
        style={cssMask(groomingImages.whyusCardMask, "645px 171px")}
      >
        <div className="absolute inset-x-0 top-[13px] h-[148px] rounded-[10px] bg-[#FBF6EA]" />
      </div>

      <div className="relative flex h-full gap-[18px] pl-[46px] pr-[52px] pt-[26px]">
        <img
          src={groomingImages.checkmark}
          alt=""
          className="mt-1 size-[33px] shrink-0"
          aria-hidden="true"
        />

        <div className="min-w-0 flex-1">
          <h3
            className="line-clamp-2 pr-2 text-black"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 700,
              fontSize: 24,
              lineHeight: 1.25,
            }}
          >
            {prop.title}
          </h3>
          <p
            className="mt-1 line-clamp-3 text-black"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: 1.43,
              letterSpacing: "0.17px",
            }}
          >
            {prop.desc}
          </p>
        </div>

        <span
          className="absolute right-[8px] top-[12px] text-[#02000F]"
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: 500,
            fontSize: 32,
            lineHeight: "26px",
          }}
        >
          {prop.num}
        </span>
      </div>
    </article>
  );
}

function GroomingWhyUs() {
  return (
    <section
      className="relative h-[897px] w-[1440px] overflow-hidden bg-white"
      style={{
        backgroundImage: `url(${groomingImages.whyusBgFull}), linear-gradient(90deg, #fff 0%, #fff 100%)`,
        backgroundSize: "1440px 774px, auto",
        backgroundRepeat: "no-repeat, repeat",
        backgroundPosition: "top left, 0 0",
      }}
    >
      <img
        src={groomingImages.whyusOrnament}
        alt=""
        className="pointer-events-none absolute left-[67px] top-[24px] h-[55px] w-[202px] rotate-[145.99deg]"
        aria-hidden="true"
      />
      <img
        src={groomingImages.whyusPawPrint}
        alt=""
        className="pointer-events-none absolute left-[1245px] top-[94px] h-[96px] w-[103px] -rotate-[19.75deg]"
        aria-hidden="true"
      />

      <h2
        className="absolute left-[160px] top-[72px] w-[1106px]"
        style={groomingTitleStyles.dark56Center}
      >
        Hãy để chúng tôi giúp bé cưng của bạn
      </h2>

      <p
        className="absolute left-[174px] top-[147px] w-[1077px] text-center text-[#0F172A]"
        style={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: 400,
          fontSize: 24,
          lineHeight: 1.334,
        }}
      >
        Bé cưng của bạn hạnh phúc, chúng tôi tự hào. Hãy để chúng tôi đồng hành
        cùng bạn!
      </p>

      <div className="absolute left-[160px] top-[237px] size-[316px] overflow-hidden rounded-[44px] bg-white">
        <img
          src={groomingImages.whyusMain}
          alt=""
          className="size-full object-cover"
        />
      </div>

      <div className="absolute left-[299px] top-[469px] h-[315px] w-[318px] overflow-hidden rounded-[46px] bg-white">
        <img
          src={groomingImages.whyusSecondary}
          alt=""
          className="size-full rounded-[50px] object-cover"
        />
      </div>

      {VALUE_PROPS.map((prop) => (
        <ValuePropCard key={prop.num} prop={prop} />
      ))}
    </section>
  );
}

export default GroomingWhyUs;
