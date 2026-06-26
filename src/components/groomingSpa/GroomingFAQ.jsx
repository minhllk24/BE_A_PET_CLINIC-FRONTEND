import { groomingImages } from '../../assets/groomingImages'
import { GROOMING_FAQS } from '../../data/groomingData'
import PetCareFaqSection from '../shared/PetCareFaqSection'

function GroomingFAQ() {
  return (
    <PetCareFaqSection
      faqs={GROOMING_FAQS}
      assets={{
        icon: groomingImages.faqIcon,
        topLeft: groomingImages.faqImg1,
        topRight: groomingImages.faqImg3,
        main: groomingImages.faqImg2,
        ornament: groomingImages.faqOrnament,
      }}
      renderAnswer={(faq) =>
        faq.id === 1 ? (
          <ul>
            {faq.answer.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : (
          <p>{faq.answer.join(' ')}</p>
        )
      }
    />
  )
}

export default GroomingFAQ
