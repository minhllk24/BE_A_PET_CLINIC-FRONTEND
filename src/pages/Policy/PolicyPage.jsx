import { Link } from "react-router-dom";
import Breadcrumb from "../../components/layout/Breadcrumb";
import CanvasLayout from "../../components/layout/CanvasLayout";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { policyImages } from "../../assets/policyImages";
import { POLICY_DETAIL, RELATED_POLICIES } from "../../data/policyData";
import "./PolicyPage.css";

function RichText({ parts, className = "" }) {
  return (
    <p className={className}>
      {parts.map((part, index) => (
        <span key={`${part.text}-${index}`} className={part.strong ? "font-bold" : undefined}>
          {part.text}
        </span>
      ))}
    </p>
  );
}

function PolicySection({ section }) {
  return (
    <section className="policy-article__section">
      {section.heading ? (
        <h2 className="policy-article__section-title">{section.heading}</h2>
      ) : null}

      {section.paragraphs?.map((paragraph, index) => (
        <RichText
          key={`${section.id}-paragraph-${index}`}
          parts={paragraph}
          className="policy-article__paragraph"
        />
      ))}

      {section.bullets ? (
        <div className="policy-article__list">
          {section.bullets.map((bullet, index) => (
            <ul key={`${section.id}-bullet-${index}`}>
              <li>
                {bullet.map((part, partIndex) => (
                  <span
                    key={`${part.text}-${partIndex}`}
                    className={part.strong ? "font-bold" : undefined}
                  >
                    {part.text}
                  </span>
                ))}
              </li>
            </ul>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function PolicyArticle() {
  return (
    <article
      className="policy-article h-[1214px] w-[813px] shrink-0 rounded-[12px] bg-white px-8 pb-8 pt-6"
      data-node-id="3102:10676"
    >
      <h1 className="w-full text-[32px] font-bold leading-[40px] text-[#0D47A1]">
        {POLICY_DETAIL.title}
      </h1>

      <div className="mt-4 flex h-[54px] w-full items-center gap-6 border-y border-[#C1C6D5] py-[17px] text-[14px] font-semibold leading-5 tracking-[0.14px] text-[#414753]">
        {POLICY_DETAIL.meta.map((item) => (
          <span key={item.id} className="flex items-center gap-2">
            <img src={item.icon} alt="" className={item.iconClassName} />
            <span
              className={
                item.italic
                  ? "font-['Public_Sans'] italic tracking-normal text-[#434653]"
                  : ""
              }
            >
              {item.label}
            </span>
          </span>
        ))}
      </div>

      <div className="policy-article__body">
        {POLICY_DETAIL.sections.map((section) => (
          <PolicySection key={section.id} section={section} />
        ))}
      </div>
    </article>
  );
}

function PolicyRelatedSidebar() {
  return (
    <aside
      className="h-[630px] w-[330px] shrink-0 rounded-[12px] bg-white px-6 pt-6"
      data-node-id="3102:10766"
    >
      <div className="policy-related__heading flex h-7 w-[282px] items-center justify-center gap-4">
        <h2 className="whitespace-nowrap text-[20px] font-semibold uppercase leading-7 text-[#002D62]">
          CÓ LIÊN QUAN
        </h2>
      </div>

      <nav className="mt-6 flex w-[282px] flex-col gap-6" aria-label="Chính sách liên quan">
        {RELATED_POLICIES.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`flex h-[46px] items-center justify-center rounded-[8px] text-center text-[14px] font-semibold leading-5 text-[#1e293b] transition-colors hover:bg-[#FFF9C4] hover:text-[#005AB4] ${
              item.active ? "bg-[#FFF9C4] text-[#005AB4]" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

function PolicySupportCta() {
  return (
    <section
      className="flex h-[158px] w-[813px] items-start rounded-[8px] bg-white"
      data-node-id="3102:11381"
    >
      <div className="ml-[33px] mt-[33px] w-[371px]">
        <h2 className="text-[20px] font-bold leading-7 text-[#C62828]">
          {POLICY_DETAIL.supportTitle}
        </h2>
        <p className="mt-2 w-[371px] text-[14px] leading-5 text-[#64748B]">
          {POLICY_DETAIL.supportDescription}
        </p>
      </div>

      <div className="ml-[35px] mt-14 flex h-[46px] w-[341px] items-start gap-3">
        <a
          href="tel:0868686868"
          className="flex h-[46px] w-[153px] items-center justify-center gap-1 rounded-[6px] bg-[#FDD835] p-4 text-[16px] font-bold leading-6 text-black drop-shadow-[0px_1px_2.5px_rgba(0,0,0,0.12),0px_2px_1px_rgba(0,0,0,0.14),0px_3px_0.5px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#FBC02D]"
        >
          <img src={policyImages.ctaPhone} alt="" className="size-4" />
          Gọi ngay
        </a>
        <Link
          to="/contact"
          className="flex h-[46px] w-[176px] items-center justify-center gap-2 rounded-[8px] border border-[#CED0D3] bg-white px-[25px] py-[11px] text-[16px] font-bold leading-6 text-[#1E293B] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-colors hover:border-[#0D47A1] hover:text-[#0D47A1]"
        >
          <img src={policyImages.ctaMessage} alt="" className="size-4" />
          <span className="whitespace-nowrap">Để lại lời nhắn</span>
        </Link>
      </div>
    </section>
  );
}

function PolicyPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <CanvasLayout>
        <NavBar isAuthenticated={isAuthenticated} />
        <main className="policy-page flex h-[1539px] flex-col items-center pt-[43px]">
          <Breadcrumb
            items={[
              { label: "Trang chủ", to: "/" },
              { label: "Hỗ trợ khách hàng" },
              { label: POLICY_DETAIL.title },
            ]}
            variant="blog"
            className="w-[1200px]"
          />

          <div className="mt-6 flex h-[1420px] w-[1200px] flex-col items-start gap-12">
            <div className="flex h-[1214px] w-full items-start gap-12">
              <PolicyArticle />
              <PolicyRelatedSidebar />
            </div>
            <PolicySupportCta />
          </div>
        </main>
        <Footer variant="white" />
      </CanvasLayout>
    </div>
  );
}

export default PolicyPage;
