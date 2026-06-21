import { useState } from "react";
import "./PetCareFaqSection.css";

function PetCareFaqSection({
  faqs,
  assets,
  listTop = 186,
  renderAnswer,
}) {
  const [openId, setOpenId] = useState(faqs[0]?.id ?? 1);

  return (
    <section className="pet-care-faq">
      <h2>Câu hỏi thường gặp</h2>
      <div className="pet-care-faq__icon">
        <img src={assets.icon} alt="" aria-hidden="true" />
      </div>

      <div className="pet-care-faq__list" style={{ top: listTop }}>
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <article
              className={`pet-care-faq__item ${isOpen ? "is-open" : ""}`}
              key={faq.id}
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                aria-expanded={isOpen}
              >
                <span>{faq.id}.</span>
                <strong>{faq.question}</strong>
                <b aria-hidden="true">{isOpen ? "−" : "+"}</b>
              </button>
              <div className="pet-care-faq__answer">
                <div>
                  {renderAnswer ? (
                    renderAnswer(faq)
                  ) : (
                    <p>{Array.isArray(faq.answer) ? faq.answer.join(" ") : faq.answer}</p>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="pet-care-faq__gallery">
        <img src={assets.topLeft} alt="" />
        <img src={assets.topRight} alt="" />
        <img src={assets.main} alt="" />
      </div>
      <img className="pet-care-faq__ornament" src={assets.ornament} alt="" />
    </section>
  );
}

export default PetCareFaqSection;
