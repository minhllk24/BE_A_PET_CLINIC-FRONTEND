import { useState } from "react";
import { groomingImages } from "../../assets/groomingImages";
import { GROOMING_FAQS } from "../../data/groomingData";
import { groomingTitleStyles } from "./groomingTitleStyles";

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
        {GROOMING_FAQS.map((faq) => (
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
