import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import NavBar from "../../components/Navbar";
import ScaledCanvasLayout from "../../components/layout/ScaledCanvasLayout";
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

const imageUrl = (name) =>
  new URL(`../../assets/images/about/${name}`, import.meta.url).href;
const figmaImageUrl = (name) =>
  new URL(`../../assets/images/about/figma/${name}`, import.meta.url).href;

const cx = (...classes) => classes.filter(Boolean).join(" ");

const containerClass = "mx-auto w-[min(1200px,calc(100%-48px))] max-[620px]:w-[min(calc(100%-28px),1180px)]";
const sectionTitleClass =
  "m-0 text-center font-['Baloo_Tamma'] text-[64px] font-normal leading-[1.1] max-[900px]:text-[34px]";
const primaryButtonClass =
  "inline-flex min-h-[44px] items-center justify-center gap-[7px] border border-secondary bg-secondary px-[22px] py-2 text-[15px] font-bold text-[#222] no-underline transition-[background-color,border-color,color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[#fbc02d] hover:bg-[#fbc02d] hover:shadow-[0_5px_12px_rgba(13,71,161,0.18)] active:translate-y-0 active:scale-[0.98] active:shadow-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(13,71,161,0.45)]";
const roundControlClass =
  "grid size-10 place-items-center rounded-full border-0 bg-secondary text-[#0f172a] transition-[background-color,color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-blue-900 hover:text-white hover:shadow-[0_5px_12px_rgba(13,71,161,0.28)] active:scale-[0.94] active:shadow-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(13,71,161,0.45)]";

const serviceShapes = [
  {
    image: "rounded-[303px_112px_309px_196px]",
    ring:
      "rounded-[322px_118px_330px_207px] bg-[rgba(255,215,0,0.2)] rotate-[2.9deg]",
  },
  {
    image: "rounded-[152px_196px_354px_309px]",
    ring:
      "rounded-[161px_207px_376px_330px] bg-[rgba(239,108,0,0.3)] -rotate-[2.5deg]",
  },
  {
    image: "rounded-[303px_152px_309px_196px]",
    ring:
      "rounded-[322px_118px_330px_207px] bg-[rgba(255,215,0,0.2)] rotate-[2.9deg]",
  },
];

function AboutPage() {
  const [activeSpace, setActiveSpace] = useState(0);
  const [doctorSlide, setDoctorSlide] = useState(0);
  const [previewImageIndex, setPreviewImageIndex] = useState(null);
  const activeGallery = aboutGallerySlides[activeSpace];
  const previewImage =
    previewImageIndex === null
      ? null
      : {
          src: activeGallery.images[previewImageIndex],
          alt: `${activeGallery.title} - ảnh ${previewImageIndex + 1}`,
        };
  const doctorPage = doctorSlide % 2;
  const visibleDoctors = aboutDoctors.slice(doctorPage * 4, doctorPage * 4 + 4);

  const moveGallery = (direction) => {
    setActiveSpace((current) =>
      (current + direction + aboutGallerySlides.length) %
      aboutGallerySlides.length,
    );
  };

  const openSpacePreview = (index) => {
    setPreviewImageIndex(index);
  };

  const closeSpacePreview = () => {
    setPreviewImageIndex(null);
  };

  const movePreviewImage = (direction) => {
    setPreviewImageIndex((current) => {
      if (current === null) return current;

      return (
        (current + direction + activeGallery.images.length) %
        activeGallery.images.length
      );
    });
  };

  const moveDoctorSlide = (direction) => {
    setDoctorSlide((current) => (current + direction + 4) % 4);
  };

  useEffect(() => {
    if (previewImageIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeSpacePreview();
      if (event.key === "ArrowLeft") movePreviewImage(-1);
      if (event.key === "ArrowRight") movePreviewImage(1);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeGallery.images.length, previewImageIndex]);

  return (
    <div className="overflow-hidden bg-white font-sans text-[#0f172a]">
      <NavBar />

      <ScaledCanvasLayout className="bg-white">
        <main>
          <section className="relative mt-0 min-h-[846px] overflow-visible bg-white max-[620px]:min-h-[645px] max-[620px]:rounded-b-[60px]">
            <img
              className="pointer-events-none absolute left-0 top-[-1px] z-0 h-[747px] w-[1440px] object-fill"
              src={figmaImageUrl("hero-vector-2.svg")}
              alt=""
              aria-hidden="true"
            />
            <div className="relative z-[2] mx-auto h-[759px] w-[min(1200px,calc(100%-48px))] pt-[72px] text-center max-[620px]:w-[calc(100%-28px)] max-[620px]:pt-[45px]">
              <p className="relative z-[2] mb-2 mt-0 font-['Baloo_Tamma'] text-[56px] font-normal leading-[1.1] text-blue-900 max-[900px]:text-[28px] max-[620px]:text-[20px]">
                TRUNG TÂM CHĂM SÓC THÚ CƯNG
              </p>
              <img
                className="relative z-[2] mx-auto mb-[9px] block w-[482px] object-contain max-[900px]:w-[min(482px,70vw)] max-[620px]:w-[min(360px,88vw)]"
                src={heroLogo}
                alt="Dr. Pet's House"
              />
              <p className="relative z-[2] mx-auto mb-0 mt-0 w-[900px] max-w-full font-['Inter'] text-[20px] leading-7 text-[#4a5565] max-[620px]:text-[13px]">
                Một nơi mà thú cưng cần thăm quan đúng nghĩa - với dịch vụ chăm
                sóc thú y, làm đẹp chuyên nghiệp, thế giới mua sắm đa dạng và
                rất nhiều tình yêu thương.
              </p>
              <div className="relative z-[3] mt-[22px] flex justify-center gap-3.5">
                <Link className={primaryButtonClass} to="/booking">
                  ĐẶT LỊCH NGAY
                </Link>
                <a
                  className={cx(
                    primaryButtonClass,
                    "border-[#233247] bg-white hover:border-blue-900 hover:bg-secondary-light hover:text-blue-900",
                  )}
                  href="#services"
                >
                  DỊCH VỤ NỔI BẬT
                </a>
              </div>
              <img
                className="absolute left-1/2 top-[291px] z-0 h-[594px] w-[970px] -translate-x-1/2 object-cover object-top opacity-100 max-[620px]:w-[480px]"
                src={imageUrl("hero-pets.png")}
                alt="Ba thú cưng tại Dr. Pet's House"
              />
            </div>

            <div className="absolute bottom-[-54px] left-1/2 z-[5] grid min-h-[143px] w-[min(1200px,calc(100%-80px))] -translate-x-1/2 grid-cols-3 gap-[30px] drop-shadow-[0_8px_12px_rgba(23,61,91,0.18)] max-[620px]:bottom-[-92px] max-[620px]:min-h-[150px] max-[620px]:w-[calc(100%-28px)]">
              {[
                ["5+", "NĂM KINH NGHIỆM"],
                ["24/7", "CẤP CỨU MỌI LÚC, HỖ TRỢ TẬN TÂM"],
                ["10k+", "KHÁCH HÀNG HÀI LÒNG"],
              ].map(([value, label]) => (
                <div
                  className="flex flex-col items-center justify-center rounded-[14px] border border-[rgba(18,73,122,0.13)] bg-[#fff7ca]"
                  key={label}
                >
                  <strong className="font-['Plus_Jakarta_Sans'] text-[44px] font-bold leading-none text-blue-900 max-[620px]:text-[23px]">
                    {value}
                  </strong>
                  <span className="mt-1 text-[14px] font-bold max-[620px]:px-1.5 max-[620px]:text-center max-[620px]:text-[8px]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className={cx(containerClass, "pb-[54px] pt-[100px] max-[620px]:pt-[165px]")}>
            <h2 className={cx(sectionTitleClass, "mb-5")}>
              <span className="text-[#fbc02d]">Cam kết</span> của chúng tôi
            </h2>
            <div className="grid grid-cols-[0.95fr_1.05fr] items-center gap-[70px] max-[900px]:grid-cols-1">
              <div>
                <h3 className="mb-[22px] mt-0 font-['Plus_Jakarta_Sans'] text-[40px] leading-[1.35]">
                  Đặt sức khỏe của
                  <br />
                  thú cưng lên đầu
                </h3>
                <p className="mt-0 text-[18px] leading-[1.75] text-[#4e5868]">
                  Trong hơn 5 năm, chúng tôi đã nỗ lực để mỗi lần các bé thú
                  cưng thăm khám, khỏe mạnh hơn và nhận được nhiều yêu thương
                  hơn. Bởi vì chúng tôi không chỉ hiểu rằng, thú cưng không chỉ
                  là người bạn, mà còn là gia đình.
                </p>
                <p className="mt-0 text-[18px] leading-[1.75] text-[#4e5868]">
                  Ở Dr.Pet&apos;s House chúng tôi có:
                </p>
                <div className="grid grid-cols-2 gap-x-[17px] gap-y-[13px] max-[620px]:grid-cols-1">
                  {commitmentBenefits.map((item) => (
                    <span className="flex min-h-[45px] items-center gap-3 text-[16px]" key={item.label}>
                      <i className="grid size-[41px] shrink-0 place-items-center overflow-hidden rounded-[7px] bg-secondary not-italic">
                        <img className="size-[31px] object-contain" src={item.icon} alt="" />
                      </i>
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
              <img
                className="w-full"
                src={imageUrl("commitment.png")}
                alt="Cam kết chăm sóc thú cưng khỏe mạnh"
              />
            </div>
          </section>

          <section className={cx(containerClass, "pb-[62px] pt-[18px]")}>
            <h2 className={cx(sectionTitleClass, "mb-2.5")}>
              Khám phá <span className="text-[#fbc02d]">không gian bên trong</span> nào!
            </h2>
            <div
              className={cx(
                "grid min-h-[727px] grid-cols-[645px_minmax(0,1fr)] gap-6 rounded-3xl bg-white px-8 py-6 shadow-[0_0_20px_rgba(0,0,0,0.25)] max-[900px]:grid-cols-1 max-[620px]:p-4",
                activeGallery.layout === "grid" &&
                  "relative left-1/2 min-h-[781px] w-[min(1240px,calc(100vw-48px))] -translate-x-1/2",
              )}
            >
              <div className="flex min-w-0 flex-col gap-[18px]">
                {activeGallery.layout === "grid" ? (
                  <div className="grid h-[693px] grid-cols-[repeat(3,199px)] grid-rows-[repeat(3,215px)] gap-6">
                    {activeGallery.images.map((image, index) => (
                      <button
                        type="button"
                        className="h-[215px] w-[199px] cursor-zoom-in overflow-hidden rounded-3xl border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(13,71,161,0.45)]"
                        key={image}
                        onClick={() => openSpacePreview(index)}
                      >
                        <img
                          className="h-[215px] w-[199px] object-cover transition-transform duration-200 hover:scale-[1.04]"
                          src={image}
                          alt={`Chi nhánh ${index + 1}`}
                        />
                      </button>
                    ))}
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      className="block h-[440px] w-full cursor-zoom-in overflow-hidden rounded-3xl border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(13,71,161,0.45)] max-[620px]:h-[280px]"
                      onClick={() => openSpacePreview(0)}
                    >
                      <img
                        className="size-full object-cover transition-transform duration-200 hover:scale-[1.025]"
                        src={activeGallery.images[0]}
                        alt={activeGallery.title}
                      />
                    </button>
                    <div className="grid grid-cols-3 gap-6">
                      {activeGallery.images.slice(1).map((image, index) => (
                        <button
                          type="button"
                          key={image}
                          className="h-[215px] cursor-pointer overflow-hidden rounded-3xl border-[3px] border-transparent bg-transparent p-0 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[#fff176] hover:shadow-[0_6px_14px_rgba(13,71,161,0.16)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(13,71,161,0.45)] max-[620px]:h-[90px]"
                          onClick={() => openSpacePreview(index + 1)}
                          aria-label={`Phóng to ảnh ${index + 2} của ${activeGallery.title}`}
                        >
                          <img className="size-full object-cover" src={image} alt="" />
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="flex min-w-0 flex-col items-start p-0 max-[900px]:px-2.5 max-[900px]:pb-2.5 max-[900px]:pt-[35px]">
                <div className="mb-[35px] ml-[15px] flex gap-[9px]">
                  <button type="button" className={roundControlClass} onClick={() => moveGallery(-1)} aria-label="Không gian trước">
                    <ChevronLeft size={18} />
                  </button>
                  <button type="button" className={roundControlClass} onClick={() => moveGallery(1)} aria-label="Không gian tiếp theo">
                    <ChevronRight size={18} />
                  </button>
                </div>
                <h3 className="mb-[19px] mt-0 font-sans text-[40px] font-bold leading-[56px] text-blue-900">
                  {activeGallery.title}
                </h3>
                {activeGallery.paragraphs.map((paragraph) => (
                  <p className="mb-6 mt-0 w-full text-justify text-[24px] leading-[1.334] text-[#1b1b1b]" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
                <Link
                  className={cx(
                    primaryButtonClass,
                    "mt-auto min-h-[42px] bg-secondary-light text-[13px] font-medium tracking-[0.46px] shadow-elevation",
                  )}
                  to="/contact"
                >
                  DANH SÁCH CHI NHÁNH <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </section>

          <section className="relative min-h-[743px] w-full px-[60px] pb-20 pt-5">
            {aboutDecorations.journeyShapes.map((shape, index) => (
              <img
                className={cx(
                  "absolute z-[1] object-contain",
                  index === 0 && "bottom-0 right-3 w-[55px]",
                  index === 1 && "left-2.5 top-[185px] w-[76px]",
                  index === 2 && "bottom-0 left-[258px] w-[65px]",
                  index === 3 && "left-[351px] top-[13px] w-[66px]",
                )}
                src={shape}
                alt=""
                key={shape}
              />
            ))}
            <h2 className={cx(sectionTitleClass, "relative z-[2] mb-[33px]")}>
              Hành trình <span className="text-[#fbc02d]">phát triển</span>
            </h2>
            <div className="relative z-[2] mx-auto grid w-[min(1320px,100%)] grid-cols-4 gap-6 max-[900px]:grid-cols-2 max-[620px]:grid-cols-1">
              {aboutMilestones.map((item) => (
                <article className="flex flex-col items-center" key={item.year}>
                  <strong className="grid h-[60px] min-w-[100px] place-items-center rounded-[48px] border border-[#a1a4b1] text-[24px] font-semibold text-[#02000f]">
                    {item.year}
                  </strong>
                  <img className="my-5 h-[69px] w-[190px] rounded-none object-contain" src={aboutDecorations.journeyConnector} alt="" />
                  <img className="h-[180px] w-full rounded-2xl object-cover" src={item.image} alt="" />
                  <p className="mx-[26px] mb-0 mt-5 text-center text-[16px] leading-7 text-[#6c6d71]">
                    {item.copy}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="relative mb-0 min-h-[1952px] overflow-hidden bg-[#e3f2fd]" id="services">
            <img className="pointer-events-none absolute left-0 top-0 z-[1] h-[145px] w-full" src={aboutDecorations.servicesWaveTop} alt="" />
            <img className="pointer-events-none absolute bottom-0 left-0 z-[1] h-[215px] w-full" src={aboutDecorations.servicesWaveBottom} alt="" />
            <img className="pointer-events-none absolute right-[-46px] top-8 z-[1] h-[154px] w-[312px] object-contain" src={aboutDecorations.servicesPaw} alt="" />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1 bg-white" />
            <div className="relative z-[2] mx-auto w-[min(1280px,calc(100%-48px))] py-[83px] pb-28">
              <div className="relative mb-5 ml-10 inline-block w-[610px] text-left">
                <h2 className="m-0 text-left font-['Baloo_Tamma'] text-[64px] font-normal leading-[1.1] text-[rgba(0,0,0,0.87)]">
                  <span className="text-[#fbc02d]">Dịch vụ</span>
                  <br />
                  chúng tôi cung cấp
                </h2>
                <img className="absolute left-[1178px] top-[67px] h-[72px] w-[76px] object-contain max-[620px]:hidden" src={aboutDecorations.servicesBone} alt="" />
              </div>

              <div className="mx-auto flex w-[1192px] max-w-full flex-col gap-14">
                {aboutServices.map(({ title, image, href, copy, points }, index) => {
                  const shape = serviceShapes[index];

                  return (
                    <article className="grid min-h-[500px] grid-cols-[568px_560px] items-center gap-16 max-[900px]:grid-cols-1 max-[620px]:gap-[30px]" key={title}>
                      <div className={cx("relative h-[450px] w-[568px]", index % 2 && "order-2 max-[900px]:order-none")}>
                        <img
                          className={cx("relative z-[2] size-full object-cover shadow-[0_14px_26px_rgba(21,70,113,0.2)]", shape.image)}
                          src={image}
                          alt=""
                        />
                        <span className={cx("absolute inset-[-28px] z-[1]", shape.ring)} />
                        {index === 0 && (
                          <span className="absolute bottom-[-24px] right-[-24px] z-[3] flex items-center gap-3 rounded-2xl border border-[#e9e8e7] bg-[#fbf9f8] p-[17px] text-[12px] shadow-[0_7px_16px_rgba(0,0,0,0.15)]">
                            <img className="size-9" src={aboutDecorations.servicesBadgeIcon} alt="" />
                            <span className="flex flex-col leading-4">
                              <strong className="text-[14px] text-[#1b1c1c]">Bác sĩ chuyên khoa</strong>
                              Sẵn sàng 24/7
                            </span>
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="mb-[18px] mt-0 flex items-center font-['Plus_Jakarta_Sans'] text-[32px] leading-[41.6px] text-blue-900">
                          {title}
                        </h3>
                        <p className="mt-0 text-justify font-sans text-[18px] leading-[28.8px] text-black">
                          {copy}
                        </p>
                        <ul className="my-[18px] list-none p-0">
                          {points.map((point) => (
                            <li className="my-3 flex items-center gap-3 font-sans text-[16px] leading-6" key={point}>
                              <img className="size-5 shrink-0" src={aboutDecorations.servicesCheckIcon} alt="" />
                              {point}
                            </li>
                          ))}
                        </ul>
                        <Link className={cx(primaryButtonClass, "min-h-[42px] text-[15px] font-medium")} to={href}>
                          TÌM HIỂU THÊM <ArrowRight size={14} />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="relative mt-0 min-h-[821px] w-full bg-white px-0 pb-[58px] pt-[46px] text-center">
            <img className="absolute right-[70px] top-[177px] z-[1] h-[46px] w-[58px] object-contain" src={aboutDecorations.doctorsShape} alt="" />
            <h2 className={cx(sectionTitleClass, "relative z-[2] mb-[18px]")}>
              Đội ngũ{" "}
              <span className="relative inline-block text-[#0f172a]">
                bác sĩ thú y
                <img className="absolute bottom-[5px] right-[-4px] z-[-1] h-3 w-[327px]" src={aboutDecorations.doctorsUnderline} alt="" />
              </span>
            </h2>
            <p className="mx-auto mb-[25px] mt-0 w-[1200px] max-w-full text-[18px] leading-[1.6] text-[#0f172a]">
              Đội ngũ bác sĩ tại Dr.Pet&apos;s House luôn đặt sức khỏe và sự an
              toàn của thú cưng lên hàng đầu. Với kiến thức chuyên môn cùng sự
              tận tình trong chăm sóc, chúng tôi mang đến trải nghiệm thăm khám
              đáng tin cậy cho mọi khách hàng.
            </p>
            <Link className={cx(primaryButtonClass, "mb-[38px] min-h-14 px-8 py-4 text-[20px] tracking-[0.5px] shadow-elevation")} to="/booking">
              ĐẶT LỊCH NGAY
            </Link>
            <div className="relative mx-auto mt-[37px] h-[376px] w-[1440px]">
              <button className="absolute left-[19px] top-[150px] z-[3] grid size-14 place-items-center rounded-full border-0 bg-secondary text-[#0f172a] transition-[background-color,color,box-shadow,transform] duration-200 hover:scale-[1.08] hover:bg-blue-900 hover:text-white hover:shadow-[0_6px_16px_rgba(13,71,161,0.28)] active:scale-[0.94] active:shadow-none max-[900px]:hidden" type="button" aria-label="Bác sĩ trước" onClick={() => moveDoctorSlide(-1)}>
                <ChevronLeft />
              </button>
              <div className="absolute left-[111px] top-0 grid w-[1229px] grid-cols-[repeat(4,277px)] gap-10 max-[900px]:grid-cols-2 max-[620px]:grid-cols-1">
                {visibleDoctors.map((doctor) => (
                  <article className="h-[376px] min-w-0 overflow-hidden rounded-lg border-0 bg-white text-left shadow-[0_5px_15px_rgba(35,56,81,0.08)]" key={doctor.name}>
                    <div className="h-[228px] overflow-hidden bg-[#dce7ef] max-[620px]:h-[340px]">
                      <img className="size-full object-cover object-center" src={doctor.image} alt={doctor.name} />
                    </div>
                    <h3 className="mx-4 mb-[7px] mt-4 font-sans text-[20px] text-blue-900">{doctor.name}</h3>
                    <strong className="mx-4 block text-[17px] font-normal text-[#555]">{doctor.role}</strong>
                    <p className="mx-4 mb-[18px] mt-3 block text-[15px] leading-[1.45] text-[#777]">{doctor.school}</p>
                  </article>
                ))}
              </div>
              <button className="absolute right-[19px] top-[150px] z-[3] grid size-14 place-items-center rounded-full border-0 bg-secondary text-[#0f172a] transition-[background-color,color,box-shadow,transform] duration-200 hover:scale-[1.08] hover:bg-blue-900 hover:text-white hover:shadow-[0_6px_16px_rgba(13,71,161,0.28)] active:scale-[0.94] active:shadow-none max-[900px]:hidden" type="button" aria-label="Bác sĩ tiếp theo" onClick={() => moveDoctorSlide(1)}>
                <ChevronRight />
              </button>
            </div>
            <div className="mt-[34px] flex justify-center gap-[5px]" aria-label={`Trạng thái bác sĩ ${doctorSlide + 1}`}>
              {[0, 1, 2, 3].map((page) => (
                <button
                  type="button"
                  key={page}
                  className={cx(
                    "h-[5px] rounded-full border-0 bg-[#d5d8df] p-0 transition-[width,background-color,box-shadow,transform] duration-200 hover:scale-125 hover:bg-[#fff176] hover:shadow-[0_0_0_3px_rgba(253,216,53,0.22)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(13,71,161,0.45)]",
                    page === doctorSlide ? "w-[15px] bg-secondary" : "w-[5px]",
                  )}
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
      </ScaledCanvasLayout>
      {previewImage && (
        <div
          className="fixed inset-0 z-[120] grid cursor-zoom-out place-items-center bg-[rgba(2,0,15,0.72)] px-24 py-[52px] max-[620px]:px-[18px] max-[620px]:pb-9 max-[620px]:pt-[72px]"
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh không gian"
          onClick={closeSpacePreview}
        >
          <button
            type="button"
            className="fixed right-[34px] top-[26px] grid size-11 place-items-center rounded-full border-0 bg-[#fbc02d] text-[32px] leading-none text-[#02000f] transition-[background-color,color,box-shadow] duration-200 hover:bg-blue-900 hover:text-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.26)] max-[620px]:right-[18px] max-[620px]:top-[18px] max-[620px]:size-10"
            onClick={closeSpacePreview}
            aria-label="Đóng ảnh"
          >
            ×
          </button>
          <button
            type="button"
            className="fixed left-[34px] top-1/2 z-[2] grid size-14 -translate-y-1/2 place-items-center rounded-full border-0 bg-[#fbc02d] text-[#02000f] transition-[background-color,color,box-shadow,transform] duration-200 hover:-translate-y-1/2 hover:scale-[1.06] hover:bg-blue-900 hover:text-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.26)] active:-translate-y-1/2 active:scale-95 max-[620px]:left-3.5 max-[620px]:size-11"
            onClick={(event) => {
              event.stopPropagation();
              movePreviewImage(-1);
            }}
            aria-label="Ảnh trước"
          >
            <ChevronLeft size={30} />
          </button>
          <figure
            className="relative m-0 grid w-[min(1100px,84vw)] cursor-default place-items-center max-[620px]:w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              className="block max-h-[86vh] max-w-full rounded-3xl object-contain shadow-[0_24px_70px_rgba(0,0,0,0.38)]"
              src={previewImage.src}
              alt={previewImage.alt}
            />
            <figcaption className="absolute bottom-[18px] right-[18px] min-w-14 rounded-full bg-[rgba(2,0,15,0.72)] px-3 py-[7px] text-center text-[15px] font-bold leading-none text-white">
              {previewImageIndex + 1}/{activeGallery.images.length}
            </figcaption>
          </figure>
          <button
            type="button"
            className="fixed right-[34px] top-1/2 z-[2] grid size-14 -translate-y-1/2 place-items-center rounded-full border-0 bg-[#fbc02d] text-[#02000f] transition-[background-color,color,box-shadow,transform] duration-200 hover:-translate-y-1/2 hover:scale-[1.06] hover:bg-blue-900 hover:text-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.26)] active:-translate-y-1/2 active:scale-95 max-[620px]:right-3.5 max-[620px]:size-11"
            onClick={(event) => {
              event.stopPropagation();
              movePreviewImage(1);
            }}
            aria-label="Ảnh tiếp theo"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      )}
    </div>
  );
}

export default AboutPage;
