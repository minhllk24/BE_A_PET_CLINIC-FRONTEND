import { useState } from "react";
import { groomingImages } from "../../assets/groomingImages";
import { groomingTitleStyles } from "./groomingTitleStyles";

const FAQS = [
  {
    id: 1,
    question: "Bao lâu thì nên tắm cho thú cưng?",
    answer: [
      "Với Chó: Tắm 1 lần/tháng là tần suất lý tưởng nhất. Tránh tắm quá 1 lần/tuần trừ khi có chỉ định từ bác sĩ, vì lạm dụng sẽ làm khô da và mất đi độ bóng của lông.",
      "Với Mèo: Mèo là loài tự làm sạch cơ thể rất giỏi. Bạn chỉ nên tắm cho chúng khi thực sự cần thiết (dính bẩn, ve rận hoặc mèo lông dài).",
    ],
  },
  {
    id: 2,
    question: "Thú cưng chưa tiêm phòng đầy đủ có được làm spa không?",
    answer: [
      "Các spa thường từ chối nhận thú cưng chưa tiêm đủ mũi vắc-xin cốt lõi.",
      "Để bảo vệ sức khỏe cho chính thú cưng của bạn và tránh lây nhiễm chéo cho các bé khác tại cửa hàng.",
      "Bạn có thể đặt lịch và sử dụng dịch vụ tiêm phòng của chúng tôi.",
    ],
  },
  {
    id: 3,
    question: "Bao lâu thì nên cắt móng cho thú cưng?",
    answer: [
      "Bạn nên cắt móng cho chó và mèo định kỳ 2 đến 4 tuần/lần. Tần suất này có thể thay đổi tùy thuộc vào mức độ hoạt động và độ mài mòn tự nhiên của móng. [1, 2]",
    ],
  },
  {
    id: 4,
    question: "Chủ nuôi có được ở lại xem trực tiếp quá trình làm spa không?",
    answer: [
      "Thường là không nên vì thú cưng thấy chủ sẽ dễ phấn khích, bồn chồn và không đứng yên.",
      "Bạn có thể quan sát qua phòng kính cách âm hoặc xem camera giám sát tại phòng chờ của cửa hàng.",
    ],
  },
  {
    id: 5,
    question: "Thú cưng bị nhát, hung dữ hoặc sợ nước thì spa có nhận không?",
    answer: [
      "Spa vẫn nhận nhưng bạn cần thông báo trước với nhân viên để có biện pháp xử lý phù hợp.",
      "Nhân viên sẽ dùng kỹ thuật trấn an, dùng loa che mắt hoặc đeo rọ mõm vải mềm để đảm bảo an toàn cho cả hai bên.",
    ],
  },
];

const questionTextStyle = {
  fontFamily: "Roboto, sans-serif",
  fontWeight: 500,
  fontSize: 18,
  lineHeight: "26px",
  color: "#02000F",
};

const answerTextStyle = {
  fontFamily: "Roboto, sans-serif",
  fontWeight: 400,
  fontSize: 16,
  lineHeight: "28px",
  color: "#6C6D71",
};

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-[8px] bg-[#E5F4FC]">
      <button
        type="button"
        onClick={onToggle}
        className="relative flex min-h-[65px] w-full items-center gap-0 border-0 bg-transparent px-0 py-0 text-left"
      >
        <span
          className="flex w-[59px] shrink-0 items-center justify-start pl-[39px]"
          style={questionTextStyle}
        >
          {faq.id}.
        </span>
        <span className="min-w-0 flex-1 pr-10" style={questionTextStyle}>
          {faq.question}
        </span>
        <span
          className="absolute right-[24px] top-1/2 flex w-4 -translate-y-1/2 items-center justify-center text-[18px] leading-[18px] text-black"
          aria-hidden="true"
        >
          {isOpen ? "_" : "+"}
        </span>
      </button>

      {isOpen && (
        <div className="px-[63px] pb-6 pt-0">
          {faq.id === 1 ? (
            <ul className="list-disc space-y-0 pl-6" style={answerTextStyle}>
              {faq.answer.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : (
            <div className="space-y-0" style={answerTextStyle}>
              {faq.answer.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function GroomingFAQ() {
  const [openId, setOpenId] = useState(1);

  return (
    <section className="relative h-[908px] w-[1440px] overflow-hidden bg-white">
      <h2
        className="absolute left-[63px] top-[128px] w-[661px] -translate-y-1/2"
        style={groomingTitleStyles.dark56}
      >
        Câu hỏi thường gặp
      </h2>

      <div className="absolute left-[529px] top-[36px] flex size-[80px] items-center justify-center">
        <img
          src={groomingImages.faqIcon}
          alt=""
          className="size-[57px] rotate-[39deg] object-cover"
          aria-hidden="true"
        />
      </div>

      <div className="absolute left-[72px] top-[186px] flex w-[639px] flex-col gap-6">
        {FAQS.map((faq) => (
          <FaqItem
            key={faq.id}
            faq={faq}
            isOpen={openId === faq.id}
            onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
          />
        ))}
      </div>

      <div className="absolute left-[757px] top-[88px] h-[700px] w-[685px] overflow-hidden rounded-[32px]">
        <div className="absolute left-[31px] top-[51px] h-[266px] w-[283px] overflow-hidden rounded-[52px]">
          <img
            src={groomingImages.faqImg1}
            alt=""
            className="size-full object-cover"
          />
        </div>
        <div className="absolute left-[332px] top-[51px] h-[266px] w-[283px] overflow-hidden rounded-[52px]">
          <img
            src={groomingImages.faqImg3}
            alt=""
            className="size-full object-cover"
          />
        </div>
        <div className="absolute left-[31px] top-[342px] h-[356px] w-[584px] overflow-hidden rounded-[55px]">
          <img
            src={groomingImages.faqImg2}
            alt=""
            className="size-full object-cover"
          />
        </div>
      </div>

      <img
        src={groomingImages.faqOrnament}
        alt=""
        className="pointer-events-none absolute left-[679px] top-[835px] h-[28.5px] w-[290px]"
        aria-hidden="true"
      />
    </section>
  );
}

export default GroomingFAQ;
