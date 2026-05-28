import SectionTitle from "../home/SectionTitle";

const COMBOS = [
  {
    title: "Combo Chăm sóc & bảo vệ móng",
    price: "Từ 80.000 đ",
    description: "Cắt móng, cạo da chết đệm thịt và massage dưỡng ẩm chuyên sâu.",
    steps: [
      "Kiểm tra tình trạng móng & đệm chân",
      "Cắt ngắn móng an toàn",
      "Mài mịn góc móng sắc nhọn bằng máy",
      "Cạo sạch lông da thừa kẽ móng",
      "Massage dưỡng ẩm đệm thịt"
    ],
    highlight: false,
  },
  {
    title: "Combo Tắm 11 bước",
    price: "Từ 150.000 đ",
    description: "Quy trình chăm sóc toàn diện 11 bước giúp pet thư giãn và sạch bóng hoàn hảo.",
    steps: [
      "Kiểm tra da và lông chuyên sâu",
      "Cạo sạch lông đệm bàn chân",
      "Cạo vệ sinh lông bụng sạch sẽ",
      "Cạo sạch lông hậu môn ngăn bẩn",
      "Vắt sạch tuyến hôi cơ thể",
      "Vệ sinh tai bằng dung dịch chuyên dụng",
      "Cắt & mài móng mịn màng",
      "Tắm xả dưỡng lông sâu 2 lần",
      "Massage thư giãn làm sạch sâu",
      "Sấy chải phồng lông tạo độ bồng bềnh",
      "Xịt nước hoa dưỡng bóng lông organic"
    ],
    highlight: true, // Make this card stand out
  },
  {
    title: "Combo Tắm cơ bản & cắt tỉa lông",
    price: "Từ 100.000 đ",
    description: "Gói tắm cơ bản kết hợp sấy lông và cắt tỉa lông tạo kiểu chuẩn đẹp.",
    steps: [
      "Tắm xả dịu nhẹ làm sạch bụi bẩn",
      "Sấy khô & chải gỡ rối lông",
      "Vệ sinh tai & cắt móng cơ bản",
      "Cắt tỉa lông tạo kiểu theo form chuẩn",
      "Xịt dưỡng tạo độ bóng mượt cho lông"
    ],
    highlight: false,
  }
];

function GroomingCombos() {
  return (
    <section className="relative w-full overflow-hidden bg-[#E5F6FD]/40 py-16 md:py-24">
      
      {/* Background decoration */}
      <div className="absolute left-[-100px] top-1/4 h-[300px] w-[300px] rounded-full bg-blue-100/30 blur-3xl" />
      <div className="absolute right-[-100px] bottom-1/4 h-[300px] w-[300px] rounded-full bg-yellow-100/30 blur-3xl" />

      <div className="relative mx-auto flex max-w-page flex-col items-center gap-16 px-6 md:px-20">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionTitle
            subtitle="Ngoài những dịch vụ riêng lẻ, chúng tôi còn thiết kế các combo phù hợp giúp bạn tiết kiệm chi phí tối đa, đồng thời đem lại trải nghiệm chăm sóc trọn vẹn nhất cho bé yêu."
            className="text-center"
          >
            <>
              <span className="font-bold block">Combo</span>
              <span className="font-bold block">siêu tiết kiệm</span>
            </>
          </SectionTitle>
        </div>

        {/* Combos Grid */}
        <div className="grid w-full gap-8 lg:grid-cols-3 items-stretch">
          {COMBOS.map((combo) => (
            <article 
              key={combo.title}
              className={`
                relative flex flex-col justify-between rounded-[32px] p-8 md:p-10 border transition-all duration-300 hover:-translate-y-2
                ${combo.highlight 
                  ? "bg-white border-blue-200 shadow-xl lg:scale-105 z-10" 
                  : "bg-white/80 border-slate-100 shadow-md hover:bg-white hover:border-blue-100 hover:shadow-lg"
                }
              `}
            >
              {/* Highlight badge */}
              {combo.highlight && (
                <span className="absolute top-4 right-6 rounded-full bg-blue-900 px-3.5 py-1 text-xs font-bold text-white uppercase tracking-wider shadow-sm">
                  YÊU THÍCH NHẤT
                </span>
              )}

              {/* Header Info */}
              <div>
                <h3 className={`font-display text-2xl font-bold leading-snug mb-3 ${combo.highlight ? "text-blue-900" : "text-black"}`}>
                  {combo.title}
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                  {combo.description}
                </p>

                {/* Steps list */}
                <div className="space-y-3.5 mb-8">
                  {combo.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className={`
                        flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold
                        ${combo.highlight 
                          ? "bg-blue-900/10 text-blue-900" 
                          : "bg-secondary-light text-black/75"
                        }
                      `}>
                        ✓
                      </span>
                      <span className="text-sm font-medium text-slate-700 leading-tight">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & CTA Button */}
              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-baseline justify-between mb-6">
                  <span className="text-sm font-semibold text-slate-400">Trọn gói từ</span>
                  <span className="font-display text-2xl font-extrabold text-blue-900">
                    {combo.price}
                  </span>
                </div>
                
                <a href="/booking">
                  <button 
                    type="button"
                    className={`
                      w-full h-12 rounded-2xl font-bold text-sm tracking-wide uppercase transition-all duration-300 shadow-sm
                      ${combo.highlight 
                        ? "bg-secondary text-black hover:opacity-95 hover:shadow-md" 
                        : "bg-[#E5F6FD] text-blue-900 hover:bg-secondary hover:text-black hover:shadow-md"
                      }
                    `}
                  >
                    Đặt lịch ngay
                  </button>
                </a>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default GroomingCombos;
