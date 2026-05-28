import { useState } from "react";
import { homeImages } from "../../assets/homeImages";

const FAQS = [
  {
    id: 1,
    question: "Bao lâu thì nên tắm cho thú cưng?",
    answer: (
      <ul className="list-disc pl-5 space-y-2 text-[#4A5568] text-sm md:text-base leading-relaxed">
        <li>
          <strong>Với Chó:</strong> Tắm 1 lần/tháng là tần suất lý tưởng nhất. Tránh tắm quá 1 lần/tuần trừ khi có chỉ định từ bác sĩ, vì lạm dụng sẽ làm khô da và mất đi độ bóng của lông.
        </li>
        <li>
          <strong>Với Mèo:</strong> Mèo là loài tự làm sạch cơ thể rất giỏi. Bạn chỉ nên tắm cho chúng khi thực sự cần thiết (dính bẩn, ve rận hoặc mèo lông dài).
        </li>
      </ul>
    )
  },
  {
    id: 2,
    question: "Thú cưng chưa tiêm phòng đầy đủ có được làm spa không?",
    answer: "Để đảm bảo sức khoẻ cho bé và các thú cưng khác, chúng tôi khuyến khích bé nên được tiêm phòng đầy đủ trước khi sử dụng dịch vụ."
  },
  {
    id: 3,
    question: "Bao lâu thì nên cắt móng cho thú cưng?",
    answer: "Nên cắt móng cho bé mỗi 2-4 tuần một lần tuỳ thuộc vào mức độ phát triển của móng để tránh tình trạng móng mọc đâm vào đệm chân gây đau đớn."
  },
  {
    id: 4,
    question: "Chủ nuôi có được ở lại xem trực tiếp quá trình làm spa không?",
    answer: "Bạn hoàn toàn có thể quan sát quá trình làm spa từ bên ngoài qua vách kính trong suốt để đảm bảo an tâm nhưng không làm bé bị kích động."
  },
  {
    id: 5,
    question: "Thú cưng bị nhát, hung dữ hoặc sợ nước thì spa có nhận không?",
    answer: "Đội ngũ nhân viên giàu kinh nghiệm của chúng tôi luôn có những biện pháp nghiệp vụ nhẹ nhàng để trấn an các bé. Tuy nhiên, nếu bé quá hoảng loạn, chúng tôi sẽ trao đổi thêm với bạn."
  }
];

function GroomingFAQ() {
  const [openId, setOpenId] = useState(1);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative w-full overflow-hidden bg-white py-16">
      <div className="mx-auto flex w-[95%] max-w-[1200px] flex-col gap-12 lg:flex-row lg:items-start lg:justify-between px-4 md:px-12">
        
        {/* Left Side: FAQs */}
        <div className="flex-1 w-full lg:max-w-[600px]">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-display text-4xl font-bold text-[#0B0F19]">
              Câu hỏi thường gặp
            </h2>
            {/* Question Mark Icons placeholder */}
            <div className="flex font-bold text-2xl -mt-4">
               <span className="text-yellow-400">?</span>
               <span className="text-blue-400">?</span>
               <span className="text-green-400">?</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className={`rounded-lg overflow-hidden transition-all duration-300 ${isOpen ? 'bg-[#EBF8FF]' : 'bg-[#F4F9FB]'}`}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-blue-50/50"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-lg w-6">{faq.id}</span>
                      <span className="font-bold text-black text-base">{faq.question}</span>
                    </div>
                    <span className="font-bold text-2xl leading-none w-6 text-center">
                      {isOpen ? '-' : '+'}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="p-5 pt-0 pl-[52px]">
                      {typeof faq.answer === 'string' ? (
                        <p className="text-[#4A5568] text-sm md:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      ) : (
                        faq.answer
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Images */}
        <div className="flex-1 w-full lg:max-w-[500px]">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Top Left Image */}
            <div className="rounded-[40px] overflow-hidden bg-pink-100 aspect-square">
              <img src={homeImages.category2} alt="" className="w-full h-full object-cover opacity-80" />
            </div>
            {/* Top Right Image */}
            <div className="rounded-[40px] overflow-hidden bg-teal-100 aspect-square">
              <img src={homeImages.category3} alt="" className="w-full h-full object-cover opacity-80" />
            </div>
          </div>
          {/* Bottom Image */}
          <div className="rounded-[40px] overflow-hidden bg-red-100 w-full h-[250px]">
            <img src={homeImages.category4} alt="" className="w-full h-full object-cover opacity-80" />
          </div>
        </div>

      </div>

      {/* Blue squiggle decoration at bottom */}
      <div className="w-full flex justify-center mt-16 opacity-80">
        <svg width="200" height="24" viewBox="0 0 200 24" fill="none" stroke="#003366" strokeWidth="3" strokeLinecap="round">
          <path d="M2 12 C20 -4, 30 28, 50 12 C70 -4, 80 28, 100 12 C120 -4, 130 28, 150 12 C170 -4, 180 28, 198 12" />
        </svg>
      </div>

    </section>
  );
}

export default GroomingFAQ;
