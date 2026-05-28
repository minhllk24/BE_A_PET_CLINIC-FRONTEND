import { homeImages } from "../../assets/homeImages";

const VALUE_PROPS = [
  {
    num: "01",
    title: "Sản phẩm chăm sóc chất lượng & an toàn",
    desc: "Sự an toàn và thoải mái của bé cưng luôn là ưu tiên hàng đầu. Chúng tôi cam kết 100% trang thiết bị và dụng cụ sử dụng đều đạt tiêu chuẩn chất lượng cao và an toàn tuyệt đối.",
  },
  {
    num: "02",
    title: "Đội ngũ chuyên viên được đào tạo bài bản",
    desc: "Đội ngũ chuyên viên chuyên nghiệp, sở hữu tình yêu lớn với động vật và nền tảng chuyên môn vững chắc. Bảo đảm sẽ giúp bé cưng của bạn có những phút giây thoải mái.",
  },
  {
    num: "03",
    title: "Bảng giá minh bạch & Chi phí hợp lý",
    desc: "Chúng tôi mang đến giải pháp chăm sóc thú cưng toàn diện với mức giá cạnh tranh nhất thị trường, đi kèm chất lượng dịch vụ vượt trội xuất phát từ tình yêu thương.",
  }
];

function GroomingWhyUs() {
  return (
    <section className="relative w-full bg-white py-16 md:py-24">
      {/* Background decorations if needed (e.g. paw prints) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('/path-to-paw-pattern.png')] bg-repeat" />

      <div className="relative mx-auto flex max-w-page flex-col items-center gap-12 px-6 md:px-12 lg:px-20">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0B0F19]">
            Hãy để chúng tôi giúp bé cưng của bạn
          </h2>
          <p className="text-lg md:text-xl text-[#1C1F27] mt-2">
            Bé cưng của bạn hạnh phúc, chúng tôi tự hào. Hãy để chúng tôi đồng hành cùng bạn!
          </p>
        </div>

        {/* Content Layout */}
        <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start lg:justify-between mt-8">
          
          {/* Left Side: Images */}
          <div className="relative w-full max-w-[500px] shrink-0 self-center lg:self-auto">
            {/* Collage - 3x3 Grid of Dogs (Placeholder implementation) */}
            <div className="grid grid-cols-3 grid-rows-3 gap-0 w-full h-[300px] rounded-tl-3xl rounded-tr-3xl overflow-hidden">
              {[...Array(9)].map((_, i) => (
                <div key={i} className={`w-full h-full ${i % 2 === 0 ? 'bg-blue-100' : 'bg-pink-100'} border border-white`}>
                  {/* Using generic placeholder or specific images if available */}
                  <img src={homeImages.category1} alt="" className="w-full h-full object-cover opacity-80" />
                </div>
              ))}
            </div>
            
            {/* Before / After Image */}
            <div className="w-full h-[250px] bg-yellow-400 rounded-bl-3xl rounded-br-3xl overflow-hidden relative border-t-4 border-white">
               {/* Before/After Placeholder */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-black font-bold text-2xl opacity-50">Before / After</span>
               </div>
            </div>
          </div>

          {/* Right Side: Vertical List */}
          <div className="flex flex-1 flex-col gap-6 w-full lg:max-w-[650px]">
            {VALUE_PROPS.map((prop) => (
              <article 
                key={prop.num}
                className="relative flex flex-col md:flex-row items-start gap-4 rounded-[20px] bg-[#FFF8F0] p-6 pr-16 md:pr-24 transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* Check Icon */}
                <div className="flex-shrink-0 mt-1">
                   <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <circle cx="14" cy="14" r="13" stroke="black" strokeWidth="2"/>
                      <path d="M8 14L12 18L20 10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                </div>
                
                {/* Text Content */}
                <div className="flex flex-col">
                  <h3 className="mb-2 text-xl font-bold text-black">
                    {prop.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-black/80">
                    {prop.desc}
                  </p>
                </div>

                {/* Number Absolute Positioned */}
                <span className="absolute top-6 right-6 font-display text-2xl font-bold text-black">
                  {prop.num}
                </span>
              </article>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default GroomingWhyUs;
