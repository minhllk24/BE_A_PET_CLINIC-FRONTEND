import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Scissors,
  ShoppingBag,
  Stethoscope,
} from "lucide-react";
import NavBar from "../../components/Navbar";
import {
  aboutDecorations,
  aboutDoctors,
  aboutGallerySlides,
  aboutMilestones,
  aboutServices,
  commitmentBenefits,
} from "../../data/aboutData";
import heroLogo from "../../assets/images/home/hero-logo.png";
import FeedbackSection from "../../components/shop/FeedbackSection";
import Footer from "../../components/Footer/Footer";
import "./AboutPage.css";

const imageUrl = (name) =>
  new URL(`../../assets/images/about/${name}`, import.meta.url).href;

const serviceIcons = {
  medical: Stethoscope,
  grooming: Scissors,
  shop: ShoppingBag,
};

function AboutPage() {
  const [activeSpace, setActiveSpace] = useState(0);
  const [activeSpacePhoto, setActiveSpacePhoto] = useState(0);
  const [doctorSlide, setDoctorSlide] = useState(0);
  const activeGallery = aboutGallerySlides[activeSpace];
  const doctorPage = doctorSlide % 2;
  const visibleDoctors = aboutDoctors.slice(doctorPage * 4, doctorPage * 4 + 4);

  const moveGallery = (direction) => {
    setActiveSpace((current) =>
      (current + direction + aboutGallerySlides.length) %
      aboutGallerySlides.length,
    );
    setActiveSpacePhoto(0);
  };

  const moveDoctorSlide = (direction) => {
    setDoctorSlide((current) => (current + direction + 4) % 4);
  };

  return (
    <div className="about-page">
      <NavBar />

      <main>
        <section className="about-hero">
          <div className="about-hero__content">
            <p className="about-hero__eyebrow">TRUNG TÂM CHĂM SÓC THÚ CƯNG</p>
            <img
              className="about-hero__logo"
              src={heroLogo}
              alt="Dr. Pet's House"
            />
            <p className="about-hero__intro">
              Một nơi mà thú cưng cần thăm quan đúng nghĩa - với dịch vụ chăm
              sóc thú y, làm đẹp chuyên nghiệp, thế giới mua sắm đa dạng và rất
              nhiều tình yêu thương.
            </p>
            <div className="about-hero__actions">
              <Link to="/booking">ĐẶT LỊCH NGAY</Link>
              <a href="#services">DỊCH VỤ NỔI BẬT</a>
            </div>
            <img
              className="about-hero__pets"
              src={imageUrl("hero-pets.png")}
              alt="Ba thú cưng tại Dr. Pet's House"
            />
          </div>

          <div className="about-metrics">
            <div><strong>5+</strong><span>NĂM KINH NGHIỆM</span></div>
            <div><strong>24/7</strong><span>CẤP CỨU MỌI LÚC, HỖ TRỢ TẬN TÂM</span></div>
            <div><strong>10k+</strong><span>KHÁCH HÀNG HÀI LÒNG</span></div>
          </div>
        </section>

        <section className="about-commitment about-container">
          <h2><span>Cam kết</span> của chúng tôi</h2>
          <div className="about-commitment__grid">
            <div className="about-commitment__copy">
              <h3>Đặt sức khỏe của<br />thú cưng lên đầu</h3>
              <p>
                Trong hơn 5 năm, chúng tôi đã nỗ lực để mỗi lần các bé thú cưng
                thăm khám, khỏe mạnh hơn và nhận được nhiều yêu thương hơn. Bởi
                vì chúng tôi không chỉ hiểu rằng, thú cưng không chỉ là người
                bạn, mà còn là gia đình.
              </p>
              <p>Ở Dr.Pet&apos;s House chúng tôi có:</p>
              <div className="about-benefits">
                {commitmentBenefits.map((item) => (
                  <span key={item.label}>
                    <i><img src={item.icon} alt="" /></i>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
            <img
              src={imageUrl("commitment.png")}
              alt="Cam kết chăm sóc thú cưng khỏe mạnh"
            />
          </div>
        </section>

        <section className="about-space about-container">
          <h2>Khám phá <span>không gian bên trong</span> nào!</h2>
          <div
            className={`about-space__card ${
              activeGallery.layout === "grid" ? "about-space__card--branches" : ""
            }`}
          >
            <div className="about-space__gallery">
              {activeGallery.layout === "grid" ? (
                <div className="about-space__branch-grid">
                  {activeGallery.images.map((image, index) => (
                    <img src={image} alt={`Chi nhánh ${index + 1}`} key={image} />
                  ))}
                </div>
              ) : (
                <>
                  <img
                    className="about-space__main"
                    src={activeGallery.images[activeSpacePhoto]}
                    alt={activeGallery.title}
                  />
                  <div className="about-space__thumbs">
                    {activeGallery.images.slice(1).map((image, index) => (
                      <button
                        type="button"
                        key={image}
                        className={activeSpacePhoto === index + 1 ? "is-active" : ""}
                        onClick={() => setActiveSpacePhoto(index + 1)}
                        aria-label={`Xem ảnh ${index + 2} của ${activeGallery.title}`}
                      >
                        <img src={image} alt="" />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="about-space__copy">
              <div className="about-round-controls">
                <button type="button" onClick={() => moveGallery(-1)} aria-label="Không gian trước">
                  <ChevronLeft size={18} />
                </button>
                <button type="button" onClick={() => moveGallery(1)} aria-label="Không gian tiếp theo">
                  <ChevronRight size={18} />
                </button>
              </div>
              <h3>{activeGallery.title}</h3>
              {activeGallery.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <Link to="/booking">DANH SÁCH CHI NHÁNH <ArrowRight size={15} /></Link>
            </div>
          </div>
        </section>

        <section className="about-journey about-container">
          {aboutDecorations.journeyShapes.map((shape, index) => (
            <img
              className={`about-journey__decor about-journey__decor--${index + 1}`}
              src={shape}
              alt=""
              key={shape}
            />
          ))}
          <h2>Hành trình <span>phát triển</span></h2>
          <div className="about-journey__grid">
            {aboutMilestones.map((item) => (
              <article key={item.year}>
                <strong>{item.year}</strong>
                <img
                  className="about-journey__connector"
                  src={aboutDecorations.journeyConnector}
                  alt=""
                />
                <img src={item.image} alt="" />
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-services" id="services">
          <img
            className="about-services__wave about-services__wave--top"
            src={aboutDecorations.servicesWaveTop}
            alt=""
          />
          <img
            className="about-services__wave about-services__wave--bottom"
            src={aboutDecorations.servicesWaveBottom}
            alt=""
          />
          <img
            className="about-services__decor-lines"
            src={aboutDecorations.servicesPaw}
            alt=""
          />
          <div className="about-container about-services__inner">
            <div className="about-services__title">
              <h2><span>Dịch vụ</span><br />chúng tôi cung cấp</h2>
              <img src={aboutDecorations.servicesBone} alt="" />
            </div>

            <div className="about-services__list">
              {aboutServices.map(({ id, title, image, href, copy, points }, index) => {
                const Icon = serviceIcons[id];
                return (
                <article
                  className={`about-service ${index % 2 ? "about-service--reverse" : ""}`}
                  key={title}
                >
                  <div className="about-service__image-wrap">
                    <img src={image} alt="" />
                    <span className="about-service__ring" />
                    {index === 0 && (
                      <span className="about-service__badge">
                        <img src={aboutDecorations.servicesBadgeIcon} alt="" />
                        <span><strong>Bác sĩ chuyên khoa</strong>Sẵn sàng 24/7</span>
                      </span>
                    )}
                  </div>
                  <div className="about-service__copy">
                    <h3><Icon size={28} />{title}</h3>
                    <p>{copy}</p>
                    <ul>
                      {points.map((point) => (
                        <li key={point}>
                          <img src={aboutDecorations.servicesCheckIcon} alt="" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <Link to={href}>
                      TÌM HIỂU THÊM <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="about-team about-container">
          <img className="about-team__shape" src={aboutDecorations.doctorsShape} alt="" />
          <h2>
            Đội ngũ <span>bác sĩ thú y
              <img src={aboutDecorations.doctorsUnderline} alt="" />
            </span>
          </h2>
          <p>
            Đội ngũ bác sĩ tại Dr.Pet&apos;s House luôn đặt sức khỏe và sự an
            toàn của thú cưng lên hàng đầu. Với kiến thức chuyên môn cùng sự tận
            tình trong chăm sóc, chúng tôi mang đến trải nghiệm thăm khám đáng
            tin cậy cho mọi khách hàng.
          </p>
          <Link to="/booking">ĐẶT LỊCH NGAY</Link>
          <div className="about-team__slider">
            <button
              type="button"
              aria-label="Bác sĩ trước"
              onClick={() => moveDoctorSlide(-1)}
            >
              <ChevronLeft />
            </button>
            <div className="about-team__grid">
              {visibleDoctors.map((doctor) => (
                <article key={doctor.name}>
                  <div className="about-team__photo">
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
              aria-label="Bác sĩ tiếp theo"
              onClick={() => moveDoctorSlide(1)}
            >
              <ChevronRight />
            </button>
          </div>
          <div className="about-team__dots" aria-label={`Trạng thái bác sĩ ${doctorSlide + 1}`}>
            {[0, 1, 2, 3].map((page) => (
              <button
                type="button"
                key={page}
                className={page === doctorSlide ? "is-active" : ""}
                onClick={() => setDoctorSlide(page)}
                aria-label={`Xem trang bác sĩ ${page + 1}`}
                aria-current={page === doctorSlide ? "true" : undefined}
              />
            ))}
          </div>
        </section>

        <FeedbackSection layout="flow" />
      </main>
      <Footer />
    </div>
  );
}

export default AboutPage;
