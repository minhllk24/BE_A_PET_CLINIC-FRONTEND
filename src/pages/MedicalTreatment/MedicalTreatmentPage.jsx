import { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import GroomingFeedbackSection from '../../components/groomingSpa/GroomingFeedbackSection'
import ServicePricingModal from '../../components/groomingSpa/ServicePricingModal'
import ScaledCanvasLayout from '../../components/layout/ScaledCanvasLayout'
import NavBar from '../../components/Navbar'
import PetCareFaqSection from '../../components/shared/PetCareFaqSection'
import { useAuth } from '../../context/AuthContext'
import { getServices } from '../../services/bookingService'
import {
  medicalAssets,
  medicalDoctorPages,
  medicalFaqs,
  medicalServices,
  medicalStats,
  medicalWhyItems,
} from '../../data/medicalTreatmentData'

function formatServicePrice(value) {
  const price = Number(value)
  if (!Number.isFinite(price) || price <= 0) return 'Liên hệ'
  return `Từ ${price.toLocaleString('vi-VN')} đ`
}

function getMedicalServiceFallback(service = {}) {
  const serviceName = `${service.name || ''} ${service.desc || ''}`.toLocaleLowerCase('vi')

  return (
    medicalServices.find((item) =>
      serviceName.includes(item.title.toLocaleLowerCase('vi')),
    ) ||
    medicalServices.find((item) => /khám|điều trị/.test(serviceName) && item.title === 'Khám & Điều trị') ||
    medicalServices.find((item) => /xét nghiệm/.test(serviceName) && item.title === 'Xét nghiệm') ||
    medicalServices.find((item) => /siêu âm|x-quang/.test(serviceName) && item.title === 'Siêu âm') ||
    medicalServices.find((item) => /tiêm|vaccine|phòng/.test(serviceName) && item.title === 'Tiêm phòng') ||
    medicalServices.find((item) => /phẫu thuật|triệt sản/.test(serviceName) && item.title === 'Phẫu thuật') ||
    medicalServices.find((item) => /cấp cứu/.test(serviceName) && item.title === 'Cấp cứu 24/7') ||
    medicalServices[0]
  )
}

function normalizeMedicalServiceCard(service) {
  const fallback = getMedicalServiceFallback(service)

  return {
    title: service.name || fallback.title,
    price: formatServicePrice(service.price),
    description: service.desc || fallback.description,
    image: fallback.image,
  }
}

function MedicalHero() {
  return (
    <section className="medical-hero">
      <div className="medical-hero__bg" aria-hidden="true">
        <img src={medicalAssets.heroBg} alt="" />
      </div>
      <div className="medical-hero__copy">
        <h1>
          Dịch vụ
          <br />
          Khám &amp; Điều trị
        </h1>
        <p>
          Đội ngũ bác sĩ giàu kinh nghiệm, trang thiết bị hiện đại, chăm sóc tận
          tâm cho sức khỏe thú cưng của bạn
        </p>
        <div className="medical-hero__actions">
          <div className="medical-hero__booking">
            <img src={medicalAssets.heroPaw} alt="" aria-hidden="true" />
            <Link
              className="medical-button medical-button--yellow"
              to="/booking"
            >
              ĐẶT LỊCH NGAY
            </Link>
          </div>
          <Link className="medical-button medical-button--light" to="/contact">
            TƯ VẤN MIỄN PHÍ
          </Link>
        </div>
      </div>
      <div className="medical-hero__visual">
        <img src={medicalAssets.heroMain} alt="Bác sĩ thú y ôm mèo" />
      </div>
    </section>
  )
}

function MedicalServices({ services }) {
  return (
    <section className="medical-services">
      <div className="medical-section-title medical-services__title">
        <h2>
          Dịch vụ
          <br />
          chúng tôi cung cấp
        </h2>
        <img src={medicalAssets.servicesTitleShape} alt="" />
      </div>
      <div className="medical-services__decor">
        <img src={medicalAssets.servicesDecor} alt="" />
      </div>
      <div className="medical-services__grid">
        {services.map((service, index) => (
          <article className="medical-service-card" key={service.title}>
            <div
              className="medical-service-card__media"
              style={{
                WebkitMaskImage: `url(${medicalAssets.serviceCardMask})`,
                maskImage: `url(${medicalAssets.serviceCardMask})`,
              }}
            >
              <img src={service.image} alt="" />
              <div className="medical-service-card__shade" />
            </div>
            <div className="medical-service-card__number" aria-hidden="true">
              <div>
                <span>{index + 1}</span>
              </div>
            </div>
            <div className="medical-service-card__copy">
              <h3>{service.title}</h3>
              <em>{service.price}</em>
              <p>{service.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function MedicalCta({ onOpenPricing }) {
  return (
    <section className="medical-cta">
      <div className="medical-cta__actions">
        <button
          type="button"
          className="medical-cta__item"
          onClick={onOpenPricing}
          style={{
            border: 0,
            background: 'transparent',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <img src={medicalAssets.ctaPrice} alt="" />
          <span>BẢNG GIÁ CHI TIẾT</span>
        </button>
        <Link to="/booking" className="medical-cta__item">
          <img src={medicalAssets.ctaBook} alt="" />
          <span>ĐẶT LỊCH NGAY</span>
        </Link>
      </div>
      <p>
        Hành động ngay giúp bé cưng của bạn luôn khỏe mạnh, năng động và phát
        triển toàn diện!
      </p>
    </section>
  )
}

function MedicalStats() {
  return (
    <section className="medical-stats">
      <img src={medicalAssets.statsBg} alt="" />
      <h2>
        Hiểu chúng tôi hơn qua <span>những con số</span>
      </h2>
      <div className="medical-stats__grid">
        {medicalStats.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <p>{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function WhyItem({ item, align }) {
  return (
    <article className={`medical-why__item medical-why__item--${align}`}>
      <div className={`medical-why__icon medical-why__icon--${item.tone}`}>
        <img src={item.icon} alt="" />
      </div>
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </article>
  )
}

function MedicalWhy() {
  return (
    <section className="medical-why">
      <h2>Vì sao nên chọn Dr. Pet&apos;s House?</h2>
      <div className="medical-why__layout">
        <div className="medical-why__column">
          {medicalWhyItems.slice(0, 4).map((item) => (
            <WhyItem key={item.title} item={item} align="left" />
          ))}
        </div>
        <div className="medical-why__main">
          <div className="medical-why__main-bg" />
          <div className="medical-why__main-photo">
            <img
              src={medicalAssets.whyMain}
              alt="Đội ngũ bác sĩ chăm sóc thú cưng"
            />
          </div>
        </div>
        <div className="medical-why__column">
          {medicalWhyItems.slice(4).map((item) => (
            <WhyItem key={item.title} item={item} align="right" />
          ))}
        </div>
      </div>
      <img
        className="medical-why__decor medical-why__decor--paw"
        src={medicalAssets.whyPaw}
        alt=""
      />
      <img
        className="medical-why__decor medical-why__decor--group-left"
        src={medicalAssets.whyGroupLeft}
        alt=""
      />
      <img
        className="medical-why__decor medical-why__decor--group-right"
        src={medicalAssets.whyGroupRight}
        alt=""
      />
      <img
        className="medical-why__decor medical-why__decor--vector"
        src={medicalAssets.whyVector}
        alt=""
      />
      <img
        className="medical-why__decor medical-why__decor--vector-1"
        src={medicalAssets.whyVector1}
        alt=""
      />
      <img
        className="medical-why__decor medical-why__decor--vector-2"
        src={medicalAssets.whyVector2}
        alt=""
      />
      <img
        className="medical-why__decor medical-why__decor--vector-3"
        src={medicalAssets.whyVector3}
        alt=""
      />
      <img
        className="medical-why__decor medical-why__decor--vector-4"
        src={medicalAssets.whyVector4}
        alt=""
      />
      <div className="medical-why__decor medical-why__decor--image-88">
        <img src={medicalAssets.whyImage88} alt="" />
      </div>
    </section>
  )
}

function MedicalDoctors() {
  const [page, setPage] = useState(0)
  const move = useCallback(
    (amount) =>
      setPage(
        (current) =>
          (current + amount + medicalDoctorPages.length) %
          medicalDoctorPages.length,
      ),
    [],
  )

  return (
    <section className="medical-doctors" aria-label="Đội ngũ bác sĩ thú y">
      <img
        className="medical-doctors__bg"
        src={medicalAssets.doctorsBg}
        alt=""
        aria-hidden="true"
      />
      <img
        className="medical-doctors__shape"
        src={medicalAssets.doctorsShape}
        alt=""
        aria-hidden="true"
      />
      <header>
        <h2>
          Đội ngũ{' '}
          <span>
            bác sĩ thú y<img src={medicalAssets.doctorsUnderline} alt="" />
          </span>
        </h2>
        <p>
          Đội ngũ bác sĩ tại Dr.Pet&apos;s House luôn đặt sức khỏe và sự an toàn
          của thú cưng lên hàng đầu. Với kiến thức chuyên môn cùng sự tận tình
          trong chăm sóc, chúng tôi mang đến trải nghiệm thăm khám đáng tin cậy
          cho mọi khách hàng.
        </p>
        <Link className="medical-button medical-button--yellow" to="/booking">
          ĐẶT LỊCH NGAY
        </Link>
      </header>
      <button
        type="button"
        className="medical-doctors__arrow medical-doctors__arrow--left"
        onClick={() => move(-1)}
        aria-label="Trang bác sĩ trước"
      >
        ‹
      </button>
      <div className="medical-doctors__grid" key={page}>
        {medicalDoctorPages[page].map((doctor) => (
          <article className="medical-doctor-card" key={doctor.name}>
            <div className="medical-doctor-card__photo">
              <img src={doctor.image} alt={doctor.name} />
            </div>
            <h3>{doctor.name}</h3>
            <strong>{doctor.role}</strong>
            <p>{doctor.school}</p>
          </article>
        ))}
      </div>
      <button
        type="button"
        className="medical-doctors__arrow medical-doctors__arrow--right"
        onClick={() => move(1)}
        aria-label="Trang bác sĩ tiếp"
      >
        ›
      </button>
      <div
        className="medical-doctors__dots"
        role="tablist"
        aria-label="Chọn trang bác sĩ"
      >
        {medicalDoctorPages.map((_, index) => (
          <button
            type="button"
            key={index}
            className={page === index ? 'is-active' : ''}
            onClick={() => setPage(index)}
            aria-label={`Trang bác sĩ ${index + 1}`}
            aria-selected={page === index}
            role="tab"
          />
        ))}
      </div>
    </section>
  )
}

function MedicalFaq() {
  return (
    <PetCareFaqSection
      faqs={medicalFaqs}
      assets={{
        icon: medicalAssets.faqIcon,
        topLeft: medicalAssets.faqTopLeft,
        topRight: medicalAssets.faqTopRight,
        main: medicalAssets.faqMain,
        ornament: medicalAssets.faqOrnament,
      }}
    />
  )
}

function MedicalCanvas({ onOpenPricing }) {
  const [services, setServices] = useState(medicalServices)

  useEffect(() => {
    let active = true

    getServices()
      .then((apiServices) => {
        if (!active || !apiServices.length) return
        const medicalApiServices = apiServices
          .filter((service) => service.serviceTypeId === 'clinic')
          .map(normalizeMedicalServiceCard)

        if (medicalApiServices.length) {
          setServices(medicalApiServices)
        }
      })
      .catch(() => {
        setServices(medicalServices)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <MedicalHero />
      <MedicalServices services={services} />
      <MedicalCta onOpenPricing={onOpenPricing} />
      <MedicalStats />
      <MedicalWhy />
      <MedicalDoctors />
      <GroomingFeedbackSection />
      <MedicalFaq />
      <Footer variant="blue" />
    </>
  )
}

function MedicalTreatmentPage() {
  const { isAuthenticated } = useAuth()
  const [isPricingOpen, setIsPricingOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <NavBar isAuthenticated={isAuthenticated} />
      <ScaledCanvasLayout className="bg-white">
        <MedicalCanvas onOpenPricing={() => setIsPricingOpen(true)} />
      </ScaledCanvasLayout>
      <ServicePricingModal
        open={isPricingOpen}
        defaultFilter="medical"
        onClose={() => setIsPricingOpen(false)}
      />
    </div>
  )
}

export default MedicalTreatmentPage
