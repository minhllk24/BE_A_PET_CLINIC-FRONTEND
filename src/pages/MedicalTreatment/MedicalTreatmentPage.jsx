import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import GroomingFeedbackSection from '../../components/groomingSpa/GroomingFeedbackSection'
import ScaledCanvasLayout from '../../components/layout/ScaledCanvasLayout'
import NavBar from '../../components/Navbar'
import PetCareFaqSection from '../../components/shared/PetCareFaqSection'
import { useAuth } from '../../context/AuthContext'
import {
  medicalAssets,
  medicalDoctorPages,
  medicalFaqs,
  medicalServices,
  medicalStats,
  medicalWhyItems,
} from '../../data/medicalTreatmentData'

function MedicalHero() {
  return (
    <section className="medical-hero">
      <div className="medical-hero__panel" aria-hidden="true" />
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

function MedicalServices() {
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
        {medicalServices.map((service, index) => (
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

function MedicalCta() {
  return (
    <section className="medical-cta">
      <div className="medical-cta__actions">
        <Link to="/contact" className="medical-cta__item">
          <img src={medicalAssets.ctaPrice} alt="" />
          <span>BẢNG GIÁ CHI TIẾT</span>
        </Link>
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

const MEDICAL_PRICE_ROWS = [
  ['Khám tổng quát', '30.000đ', '50.000đ', '80.000đ'],
  ['Xét nghiệm', '50.000đ', '80.000đ', '120.000đ'],
  ['Siêu âm', '100.000đ', '150.000đ', '200.000đ'],
  ['Tiêm phòng', '100.000đ', '150.000đ', '250.000đ'],
  ['Phẫu thuật', '200.000đ', '500.000đ', 'Liên hệ'],
  ['Cấp cứu 24/7', '150.000đ', '250.000đ', '350.000đ'],
]

function MobileMedicalServiceCard({ service, index }) {
  return (
    <article className="relative h-[258px] w-[218px] overflow-hidden text-white">
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          WebkitMaskImage: `url(${medicalAssets.serviceCardMask})`,
          maskImage: `url(${medicalAssets.serviceCardMask})`,
          WebkitMaskSize: '248px 285px',
          maskSize: '248px 285px',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      >
        <img
          src={service.image}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: index === 2 ? '70% center' : 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/80" />
      </div>
      <div className="absolute right-0 top-[5px] flex h-[36px] w-[48px] rotate-[-36deg] skew-x-[16deg] items-center justify-center rounded-[24px] border border-[#A1A4B1]">
        <span className="rotate-[45deg] text-[15px] leading-none text-[#A1A4B1]">
          {index + 1}
        </span>
      </div>
      <div className="absolute bottom-[17px] left-[16px] w-[188px]">
        <div className="flex items-start justify-between gap-[8px]">
          <h3 className="m-0 max-w-[118px] font-['Roboto'] text-[14px] font-bold leading-[14px]">
            {service.title}
          </h3>
          <em className="mt-0 whitespace-nowrap text-right font-['Roboto'] text-[10px] font-light italic leading-[10px]">
            {service.price}
          </em>
        </div>
        <p className="mt-[14px] line-clamp-2 h-[34px] font-['Roboto'] text-[12px] font-normal leading-[16px]">
          {service.description}
        </p>
      </div>
    </article>
  )
}

function MobileMedicalPricingTable({ onClose }) {
  return (
    <section className="mx-auto h-[202px] w-[360px] bg-white px-[20px] pt-[7px]">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-[18px] font-normal leading-[20px] text-[#0D47A1]">
          Bảng giá khám
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="font-['Roboto'] text-[11px] font-bold text-[#0D47A1] underline"
        >
          Thu gọn
        </button>
      </div>
      <div className="mt-[8px] overflow-hidden rounded-[8px] border border-[#BBDEFB] font-['Roboto'] text-[9px] leading-[14px]">
        <div className="grid grid-cols-[1.35fr_0.75fr_0.75fr_0.8fr] bg-[#FFF59D] font-bold text-[#0D47A1]">
          {['Dịch vụ', '< 5kg', '5-15kg', '> 15kg'].map((cell) => (
            <div key={cell} className="border-r border-[#BBDEFB] px-[6px] py-[4px] last:border-r-0">
              {cell}
            </div>
          ))}
        </div>
        {MEDICAL_PRICE_ROWS.map((row) => (
          <div
            key={row[0]}
            className="grid grid-cols-[1.35fr_0.75fr_0.75fr_0.8fr] border-t border-[#BBDEFB] bg-[#FFFDE7]"
          >
            {row.map((cell) => (
              <div
                key={`${row[0]}-${cell}`}
                className="border-r border-[#BBDEFB] px-[6px] py-[3px] last:border-r-0"
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

function MobileMedicalServices({ showPricing, onShowPricing, onHidePricing }) {
  const [index, setIndex] = useState(0)
  const service = medicalServices[index]
  const move = (amount) =>
    setIndex((current) =>
      (current + amount + medicalServices.length) % medicalServices.length,
    )

  return (
    <>
      <section className="relative mx-auto h-[384px] w-[360px] overflow-hidden bg-white pt-[12px]">
        <h2 className="text-center font-display text-[25px] font-normal leading-[27.5px] text-[rgba(0,0,0,0.87)]">
          Dịch vụ
          <br />
          chúng tôi cung cấp
        </h2>
        <img
          src={medicalAssets.servicesTitleShape}
          alt=""
          className="absolute left-[291px] top-[3px] h-[9px] w-[11px] object-contain"
        />
        <img
          src={medicalAssets.servicesDecor}
          alt=""
          className="absolute left-[2px] top-[81px] h-[40px] w-[58px] rotate-[3deg] object-contain"
        />
        <button
          type="button"
          onClick={() => move(-1)}
          className="absolute left-[18px] top-[214px] z-30 flex size-[30px] items-center justify-center rounded-full bg-white/90 shadow-[0_2px_8px_rgba(13,71,161,0.18)] transition hover:scale-110 active:scale-95"
          aria-label="Dịch vụ trước"
        >
          <img
            src={medicalAssets.mobileArrowLeft}
            alt=""
            className="size-full object-contain"
          />
        </button>
        <div className="absolute left-[56px] top-[95px]">
          <MobileMedicalServiceCard
            service={service}
            index={index}
          />
        </div>
        <button
          type="button"
          onClick={() => move(1)}
          className="absolute left-[312px] top-[214px] z-30 flex size-[30px] items-center justify-center rounded-full bg-white/90 shadow-[0_2px_8px_rgba(13,71,161,0.18)] transition hover:scale-110 active:scale-95"
          aria-label="Dịch vụ tiếp"
        >
          <img
            src={medicalAssets.mobileArrowRight}
            alt=""
            className="size-full object-contain"
          />
        </button>
        <img
          src={medicalAssets.mobileImage71}
          alt=""
          className="absolute left-[324px] top-[333px] size-[39px] -rotate-[20deg] object-cover"
        />
        <div className="absolute bottom-0 left-[147px] flex h-[5px] w-[65px] items-center gap-[5px]">
          {medicalServices.map((item, dotIndex) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setIndex(dotIndex)}
              className={`h-[5px] rounded-full transition-all ${
                dotIndex === index ? 'w-[15px] bg-[#0D47A1]' : 'w-[5px] bg-[#B0BEC5]'
              }`}
              aria-label={`Xem dịch vụ ${dotIndex + 1}`}
            />
          ))}
        </div>
      </section>
      <section className="relative mx-auto h-[120px] w-[360px] overflow-hidden bg-white px-[20px] pb-[7px] pt-[11px]">
        <div className="grid grid-cols-2 gap-[10px]">
          <button
            type="button"
            onClick={onShowPricing}
            className="relative flex h-[70px] items-center justify-center"
          >
            <img
              src={medicalAssets.ctaPrice}
              alt=""
              className="absolute left-[72px] top-[8px] size-[34px] scale-x-[-1] object-contain"
            />
            <span className="mt-[19px] flex h-[25px] w-[142px] items-center justify-center rounded bg-[#FDD835] font-['Roboto'] text-[12px] font-medium uppercase leading-[26px] tracking-[0.46px] shadow-elevation transition-colors hover:bg-[#0D47A1] hover:text-white">
              Bảng giá chi tiết
            </span>
          </button>
          <Link
            to="/booking"
            className="relative flex h-[70px] items-center justify-center"
          >
            <img
              src={medicalAssets.ctaBook}
              alt=""
              className="absolute left-1/2 top-[8px] h-[30px] w-[49px] -translate-x-1/2 object-contain"
            />
            <span className="mt-[19px] flex h-[25px] w-[142px] items-center justify-center rounded bg-[#FDD835] font-['Roboto'] text-[12px] font-medium uppercase leading-[26px] tracking-[0.46px] shadow-elevation transition-colors hover:bg-[#0D47A1] hover:text-white">
              Đặt lịch ngay
            </span>
          </Link>
        </div>
        <p className="mx-auto mt-[10px] w-[320px] text-center font-['Roboto'] text-[14px] font-medium leading-[16.8px] text-[#02000F]">
          Hành động ngay giúp bé cưng của bạn luôn khỏe mạnh, năng động và phát triển toàn diện!
        </p>
      </section>
      {showPricing ? <MobileMedicalPricingTable onClose={onHidePricing} /> : null}
    </>
  )
}

function MobileMedicalStats() {
  return (
    <section className="relative mx-auto h-[209px] w-[360px] overflow-hidden bg-[#E5F6FD]">
      <img
        src={medicalAssets.statsBg}
        alt=""
        className="absolute left-0 top-0 h-[209px] w-[374px] object-fill"
      />
      <h2 className="absolute left-[20px] top-[22px] h-[50px] w-[320px] text-center font-display text-[25px] font-normal leading-[25px] text-[rgba(0,0,0,0.87)]">
        Hiểu chúng tôi hơn qua những con số
      </h2>
      <div className="absolute left-[20px] top-[81px] grid h-[97px] w-[320px] grid-cols-2 gap-y-[10px]">
        {medicalStats.map(([value, label]) => (
          <div key={label} className="text-center">
            <strong className="block h-[19px] font-display text-[25px] font-normal leading-[25px] text-[#0D47A1]">
              {value}
            </strong>
            <p className="mx-auto mt-[2px] max-w-[160px] font-['Roboto'] text-[12px] font-bold leading-[14px] text-[#33363F]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function MobileWhyFeature({ item, reverse = false, tall = false }) {
  return (
    <article
      className={`flex w-[281px] items-start ${
        reverse ? 'gap-[8px]' : 'justify-between'
      } ${tall ? 'min-h-[87px]' : 'min-h-[59px]'}`}
    >
      {reverse ? (
        <div className={`medical-why__icon medical-why__icon--${item.tone} !m-0 !size-[37px] shrink-0`}>
          <img src={item.icon} alt="" className="!size-[28px]" />
        </div>
      ) : null}
      <div className={reverse ? 'w-[233px]' : 'w-[233px]'}>
        <h3 className="m-0 pt-[7px] font-['Roboto'] text-[14px] font-bold leading-[18.68px] text-[#01579B]">
          {item.title}
        </h3>
        <p
          className={`m-0 mt-[5px] font-['Roboto'] text-[12px] font-normal leading-[14.4px] text-[#4A5565] ${
            reverse ? (tall ? 'line-clamp-4' : 'line-clamp-3') : 'line-clamp-2 text-right'
          }`}
        >
          {item.description}
        </p>
      </div>
      {!reverse ? (
        <div className={`medical-why__icon medical-why__icon--${item.tone} !m-0 !size-[37px] shrink-0`}>
          <img src={item.icon} alt="" className="!size-[28px]" />
        </div>
      ) : null}
    </article>
  )
}

function MobileMedicalWhy() {
  const topItems = medicalWhyItems.slice(0, 4)
  const bottomItems = medicalWhyItems.slice(4)

  return (
    <section className="relative mx-auto h-[995px] w-[360px] overflow-hidden bg-white pt-[10px]">
      <h2 className="mx-auto h-[70px] w-[340px] text-center font-display text-[25px] font-normal leading-[25px] text-[rgba(0,0,0,0.87)]">
        Vì sao nên chọn Dr. Pet&apos;s House?
      </h2>
      <div className="mx-auto flex h-[266px] w-[340px] flex-col gap-[10px]">
        {topItems.map((item) => (
          <div key={item.title} className="ml-[30px] h-[59px] w-[281px]">
            <MobileWhyFeature item={item} />
          </div>
        ))}
      </div>
      <div className="relative mx-auto mt-[5px] h-[288px] w-[340px]">
        <div className="absolute left-[79px] top-[5px] h-[278px] w-[182px] rounded-bl-[46px] rounded-tr-[46px] bg-[#0D47A1]" />
        <div className="absolute left-[85px] top-[5px] h-[278px] w-[171px] overflow-hidden rounded-bl-[46px] rounded-tr-[46px]">
          <img
            src={medicalAssets.whyMain}
            alt="Đội ngũ bác sĩ chăm sóc thú cưng"
            className="h-full w-full object-cover"
            style={{ objectPosition: '49% center' }}
          />
        </div>
      </div>
      <div className="mx-auto mt-[5px] flex h-[336px] w-[340px] flex-col">
        {bottomItems.map((item, itemIndex) => (
          <div
            key={item.title}
            className={`ml-[30px] w-[280px] ${
              itemIndex === 3 ? 'h-[87px]' : 'h-[73px]'
            } ${itemIndex > 0 ? 'mt-[10px]' : ''}`}
          >
            <MobileWhyFeature
              item={item}
              reverse
              tall={itemIndex === 3}
            />
          </div>
        ))}
      </div>
      <img
        src={medicalAssets.whyPaw}
        alt=""
        className="absolute left-[-15px] top-[150px] h-[26px] w-[31px]"
      />
      <img
        src={medicalAssets.whyGroupLeft}
        alt=""
        className="absolute left-[22px] top-[379px] h-[23px] w-[30px]"
      />
      <img
        src={medicalAssets.mobileShape152}
        alt=""
        className="absolute left-[27px] top-[557px] h-[26px] w-[39px] object-contain"
      />
      <img
        src={medicalAssets.whyGroupRight}
        alt=""
        className="absolute left-[337px] top-[753px] h-[14px] w-[28px]"
      />
      <img
        src={medicalAssets.whyImage88}
        alt=""
        className="absolute left-[247px] top-[598px] h-[48px] w-[44px] object-cover"
      />
    </section>
  )
}

function MobileMedicalDoctors() {
  const [page, setPage] = useState(0)
  const mobileDoctorPages = Array.from({ length: 6 }, (_, index) =>
    medicalDoctorPages.flat().slice(index * 2, index * 2 + 2),
  )
  const doctors = mobileDoctorPages[page]
  const move = (amount) =>
    setPage((current) => (current + amount + mobileDoctorPages.length) % mobileDoctorPages.length)

  return (
    <section className="relative mx-auto h-[509px] w-[360px] overflow-hidden bg-white">
      <img
        src={medicalAssets.mobileVector75}
        alt=""
        className="absolute left-0 top-[-15px] h-[516px] w-[360px] object-fill"
      />
      <header className="absolute left-[10px] top-[27px] h-[160px] w-[340px] text-center">
        <img
          src={medicalAssets.doctorsUnderline}
          alt=""
          className="absolute left-[181px] top-[-6px] h-[12px] w-[95px] object-fill"
        />
        <h2 className="font-display text-[25px] font-normal leading-[25px] text-[#0D47A1]">
          Đội ngũ bác sĩ thú y
        </h2>
        <p className="mx-auto mt-[17px] h-[76px] w-[340px] text-center font-['Roboto'] text-[12px] font-normal leading-[19.2px] text-[#334155]">
          Đội ngũ bác sĩ tại Dr.Pet&apos;s House luôn đặt sức khỏe và sự an toàn
          của thú cưng lên hàng đầu. Với kiến thức chuyên môn cùng sự tận tình
          trong chăm sóc, chúng tôi mang đến trải nghiệm thăm khám đáng tin cậy
          cho mọi khách hàng.
        </p>
        <Link
          to="/booking"
          className="mx-auto mt-[17px] flex h-[25px] w-[142px] items-center justify-center rounded bg-[#FDD835] font-['Roboto'] text-[12px] font-medium uppercase leading-[26px] tracking-[0.46px] text-[rgba(0,0,0,0.87)] shadow-elevation transition-colors hover:bg-[#0D47A1] hover:text-white"
        >
          Đặt lịch ngay!
        </Link>
      </header>
      <div className="absolute left-[10px] top-[207px] grid h-[249px] w-[340px] grid-cols-[148.5px_148.5px] gap-[15px] pl-[14px]">
        {doctors.map((doctor) => (
          <article key={doctor.name} className="h-[249px] w-[148.5px] text-left">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="h-[139px] w-[148.5px] object-contain object-bottom"
            />
            <h3 className="mt-[10px] px-[10px] font-['Roboto'] text-[15px] font-bold leading-none text-[#0D47A1]">
              {doctor.name}
            </h3>
            <p className="mt-[10px] px-[10px] font-['Roboto'] text-[12px] leading-none text-[#475569]">
              {doctor.role}
            </p>
            <p className="mt-[8px] px-[10px] font-['Roboto'] text-[10px] leading-[11px] text-[#475569]">
              {doctor.school}
            </p>
          </article>
        ))}
      </div>
      <img
        src={medicalAssets.mobileShape152}
        alt=""
        className="absolute left-[11px] top-[190px] h-[29px] w-[30px] object-contain"
      />
      <button
        type="button"
        onClick={() => move(-1)}
        className="absolute left-[20px] top-[315px] z-10 flex size-[30px] items-center justify-center rounded-full bg-white/90 shadow-[0_2px_8px_rgba(13,71,161,0.18)] transition hover:scale-110 active:scale-95"
        aria-label="Bác sĩ trước"
      >
        <img src={medicalAssets.mobileArrowLeft} alt="" className="size-full object-contain" />
      </button>
      <button
        type="button"
        onClick={() => move(1)}
        className="absolute left-[310px] top-[315px] z-10 flex size-[30px] items-center justify-center rounded-full bg-white/90 shadow-[0_2px_8px_rgba(13,71,161,0.18)] transition hover:scale-110 active:scale-95"
        aria-label="Bác sĩ tiếp"
      >
        <img src={medicalAssets.mobileArrowRight} alt="" className="size-full object-contain" />
      </button>
      <div className="absolute left-[147px] top-[476px] flex h-[5px] w-[65px] items-center gap-[5px]">
        {mobileDoctorPages.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setPage(index)}
            className={`h-[5px] rounded-full transition-all ${
              index === page ? 'w-[15px] bg-[#0D47A1]' : 'w-[5px] bg-[#B0BEC5]'
            }`}
            aria-label={`Trang bác sĩ ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

const MOBILE_FEEDBACKS = [
  {
    quote:
      '“Bác sĩ tư vấn kỹ, chăm sóc bé rất nhẹ nhàng. Mình yên tâm khi đưa thú cưng tới Dr.Pet’s House.”',
    name: 'Huyền Nguyễn',
    pet: 'Bé Đậu Nành',
  },
  {
    quote:
      '“Dịch vụ nhanh, sạch sẽ và đội ngũ rất tận tâm. Bé nhà mình đỡ căng thẳng hơn hẳn khi đi khám.”',
    name: 'Minh Anh',
    pet: 'Bé Miso',
  },
  {
    quote:
      '“Không gian thân thiện, bảng giá rõ ràng. Bác sĩ giải thích tình trạng của bé rất dễ hiểu.”',
    name: 'Hoàng Nam',
    pet: 'Bé Bông',
  },
  {
    quote:
      '“Mình thích cách phòng khám lưu hồ sơ và nhắc lịch. Rất tiện cho những bé cần tái khám định kỳ.”',
    name: 'Thanh Trúc',
    pet: 'Bé Kem',
  },
  {
    quote:
      '“Bé mèo nhà mình được xử lý cấp cứu kịp thời. Cảm ơn đội ngũ Dr.Pet’s House rất nhiều.”',
    name: 'Gia Hân',
    pet: 'Bé Sữa',
  },
  {
    quote:
      '“Tư vấn nhiệt tình, thao tác nhẹ nhàng và có dặn dò chăm sóc sau khám rất kỹ.”',
    name: 'Quang Huy',
    pet: 'Bé Max',
  },
]

function MobileMedicalFeedback() {
  const [slide, setSlide] = useState(0)
  const feedback = MOBILE_FEEDBACKS[slide]
  const move = (amount) =>
    setSlide((current) => (current + amount + MOBILE_FEEDBACKS.length) % MOBILE_FEEDBACKS.length)

  return (
    <section className="relative mx-auto h-[404px] w-[360px] overflow-hidden bg-[#E5F6FD]">
      <img
        src={medicalAssets.mobileFeedbackBg}
        alt=""
        className="absolute left-0 top-0 h-[399px] w-[360px] object-cover"
      />
      <div className="absolute left-[10px] top-[29px] h-[326px] w-[340px]">
        <h2 className="h-[37px] w-[340px] text-center font-display text-[25px] font-normal leading-[25px] text-[#0D47A1]">
          Phản hồi của khách hàng
        </h2>
        <article className="absolute left-[37.5px] top-[50px] h-[242px] w-[265px] rounded-[18px] bg-white px-[20px] pt-[16px] shadow-[0_8px_24px_rgba(13,71,161,0.14)]">
          <div className="flex h-[18px] w-[130px] items-center justify-between text-[18px] leading-[18px] text-[#FDD835]">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} className="drop-shadow-[0_1px_1px_rgba(13,71,161,0.16)]">
                ★
              </span>
            ))}
          </div>
          <p className="mt-[13px] h-[118px] w-[225px] whitespace-pre-line font-['Roboto'] text-[12px] font-normal leading-[15.6px] text-[#475569]">
            {feedback.quote}
          </p>
          <div className="mt-[13px] flex h-[52px] w-[225px] items-center gap-[12px]">
            <div className="size-[42px] rounded-full bg-[#BBDEFB]" />
            <div>
              <strong className="block font-['Roboto'] text-[13px] font-bold leading-[18px] text-[#0D47A1]">
                {feedback.name}
              </strong>
              <span className="font-['Roboto'] text-[11px] leading-[16px] text-[#475569]">
                {feedback.pet}
              </span>
            </div>
          </div>
        </article>
        <div className="absolute left-[87.5px] top-[305px] flex h-[21px] w-[165px] items-center justify-between px-[5px]">
          {MOBILE_FEEDBACKS.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setSlide(index)}
              className={`size-[10px] rounded-full transition-colors ${
                index === slide ? 'bg-[#0D47A1]' : 'bg-[#D9D9D9]'
              }`}
              aria-label={`Phản hồi ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <img
        src={medicalAssets.mobileShape150}
        alt=""
        className="absolute left-[293px] top-[63px] size-[34px] object-contain"
      />
      <img
        src={medicalAssets.mobileShape152}
        alt=""
        className="absolute left-[15px] top-[285px] h-[32px] w-[33px] object-contain"
      />
      <img
        src={medicalAssets.mobileShape153}
        alt=""
        className="absolute left-[15px] top-[299px] size-[18px] object-contain"
      />
      <button
        type="button"
        onClick={() => move(-1)}
        className="absolute left-[20px] top-[168.5px] z-10 flex size-[30px] items-center justify-center rounded-full bg-white/90 shadow-[0_2px_8px_rgba(13,71,161,0.18)] transition hover:scale-110 active:scale-95"
        aria-label="Phản hồi trước"
      >
        <img src={medicalAssets.mobileArrowLeft} alt="" className="size-full object-contain" />
      </button>
      <button
        type="button"
        onClick={() => move(1)}
        className="absolute left-[310px] top-[168.5px] z-10 flex size-[30px] items-center justify-center rounded-full bg-white/90 shadow-[0_2px_8px_rgba(13,71,161,0.18)] transition hover:scale-110 active:scale-95"
        aria-label="Phản hồi tiếp"
      >
        <img src={medicalAssets.mobileArrowRight} alt="" className="size-full object-contain" />
      </button>
    </section>
  )
}

function MobileMedicalFaq() {
  const [open, setOpen] = useState(medicalFaqs[0]?.id)

  return (
    <section className="relative mx-auto h-[716px] w-[360px] overflow-hidden bg-white px-[15px] pt-[7px]">
      <h2 className="h-[46px] w-[330px] text-center font-display text-[25px] font-normal leading-[25px] text-[#0D47A1]">
        Câu hỏi thường gặp
      </h2>
      <img
        src={medicalAssets.mobileFaqCorner}
        alt=""
        className="absolute left-[296px] top-[8px] h-[30px] w-[27px] -rotate-[12deg] object-cover"
      />
      <div className="mt-0 flex w-[330px] flex-col gap-[7px]">
        {medicalFaqs.map((faq) => {
          const expanded = open === faq.id
          return (
            <article key={faq.id} className="overflow-hidden rounded-[8px] bg-[#E5F4FC]">
              <button
                type="button"
                onClick={() => setOpen((current) => (current === faq.id ? null : faq.id))}
                className="flex h-[36px] w-full items-center justify-between gap-[8px] px-[5px] pt-[5px] text-left font-['Roboto'] text-[12px] font-medium leading-[14.4px] text-[#02000F]"
              >
                <span className="w-[22px] shrink-0 text-[15px] leading-[26px]">
                  {faq.id}.
                </span>
                <span className="min-w-0 flex-1">{faq.question}</span>
                <span className="w-[16px] shrink-0 text-center text-[18px] font-black">
                  {expanded ? '−' : '+'}
                </span>
              </button>
              <div
                className="overflow-hidden px-[32px] transition-all duration-300"
                style={{ maxHeight: expanded ? 98 : 0 }}
              >
                <p className="pb-[9px] font-['Roboto'] text-[12px] leading-[16px] text-[#475569]">
                  {faq.answer}
                </p>
              </div>
            </article>
          )
        })}
      </div>
      <div className="absolute left-[15px] top-[321px] h-[342px] w-[330px] overflow-hidden rounded-[32px]">
        <div className="absolute left-[15px] top-[167px] h-[174px] w-[281px] overflow-hidden rounded-[55px]">
          <img src={medicalAssets.faqMain} alt="" className="size-full object-cover" />
        </div>
        <div className="absolute left-[15px] top-[25px] h-[130px] w-[136px] overflow-hidden rounded-[52px]">
          <img src={medicalAssets.faqTopLeft} alt="" className="size-full object-cover" />
        </div>
        <div className="absolute left-[160px] top-[25px] h-[130px] w-[136px] overflow-hidden rounded-[52px]">
          <img src={medicalAssets.faqTopRight} alt="" className="size-full object-cover" />
        </div>
      </div>
    </section>
  )
}

function MobileMedicalCanvas() {
  const [showPricing, setShowPricing] = useState(false)

  return (
    <main className="bg-white lg:hidden">
      <section className="relative mx-auto h-[215px] w-[360px] overflow-hidden bg-[#E5F6FD]">
        <img
          src={medicalAssets.heroBg}
          alt=""
          className="absolute left-[-38px] top-[-18px] h-[259px] w-[651px] scale-x-[-1] object-fill"
        />
        <div className="absolute left-[14px] top-[28px] w-[209px]">
          <h1 className="font-display text-[25px] font-normal leading-[25px] text-[#02000F]">
            Dịch vụ
            <br />
            Khám &amp; Điều trị
          </h1>
          <p className="mt-[5px] w-[209px] text-justify font-['Roboto'] text-[12px] font-normal leading-[16px] text-[#0F172A]">
            Đội ngũ bác sĩ giàu kinh nghiệm, trang thiết bị hiện đại, chăm sóc tận
            tâm cho sức khỏe thú cưng của bạn
          </p>
        </div>
        <div className="absolute left-[51px] top-[127px] flex w-[142px] flex-col gap-[10px]">
          <img
            src={medicalAssets.heroPaw}
            alt=""
            className="absolute left-[-49px] top-[-22px] h-[34px] w-[31px] -rotate-[25deg] object-cover"
          />
          <Link
            to="/booking"
            className="flex h-[25px] w-[142px] items-center justify-center rounded bg-[#FDD835] font-['Roboto'] text-[12px] font-medium uppercase leading-[26px] tracking-[0.46px] text-[rgba(0,0,0,0.87)] shadow-elevation transition-colors hover:bg-[#0D47A1] hover:text-white"
          >
            Đặt lịch ngay
          </Link>
          <Link
            to="/contact"
            className="flex h-[25px] w-[142px] items-center justify-center rounded bg-[#FFF9C4] font-['Roboto'] text-[12px] font-medium uppercase leading-[26px] tracking-[0.46px] text-[rgba(0,0,0,0.87)] shadow-elevation transition-colors hover:bg-[#0D47A1] hover:text-white"
          >
            Tư vấn miễn phí
          </Link>
        </div>
        <div className="absolute left-[243px] top-[55px] h-[105px] w-[107px] overflow-hidden">
          <img
            src={medicalAssets.heroMain}
            alt="Bác sĩ thú y ôm mèo"
            className="absolute left-0 top-[-21px] h-[130px] w-[127px] max-w-none object-cover"
          />
        </div>
      </section>
      <MobileMedicalServices
        showPricing={showPricing}
        onShowPricing={() => setShowPricing(true)}
        onHidePricing={() => setShowPricing(false)}
      />
      <MobileMedicalStats />
      <MobileMedicalWhy />
      <MobileMedicalDoctors />
      <MobileMedicalFeedback />
      <MobileMedicalFaq />
      <Footer variant="blue" />
    </main>
  )
}

function MedicalCanvas() {
  return (
    <>
      <MedicalHero />
      <MedicalServices />
      <MedicalCta />
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
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <NavBar isAuthenticated={isAuthenticated} />
      <div className="hidden lg:block">
        <ScaledCanvasLayout className="bg-white">
          <MedicalCanvas />
        </ScaledCanvasLayout>
      </div>
      <MobileMedicalCanvas />
    </div>
  )
}

export default MedicalTreatmentPage
