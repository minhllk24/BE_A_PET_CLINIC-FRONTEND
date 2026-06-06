import { homeImages } from "../../assets/homeImages";
import { FOOTER_COLUMNS, FOOTER_LEGAL_LINKS, FOOTER_SOCIALS } from "../../data/siteData";

function Footer() {
  return (
    <footer className="h-[480px] w-[1440px] overflow-hidden bg-[#E5F6FD]">
      <div className="mx-auto flex h-[484px] w-[1280px] flex-col items-center justify-center gap-6 pb-[50px] pt-20">
        <div className="flex w-full items-start justify-center gap-12 border-b border-[#E2E8F0]">
          <div className="flex min-h-[272px] flex-1 flex-col">
            <a href="/" className="inline-flex items-center">
              <img
                src={homeImages.logo}
                alt="Dr. Pet's House"
                className="h-[72px] w-auto object-contain"
              />
            </a>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="flex min-h-[272px] flex-1 flex-col">
              <h3 className="py-3 text-[20px] font-bold leading-[1.6] tracking-[0.15px] text-[#0D47A1]">
                {col.title}
              </h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link} className="py-3">
                    <a
                      href="#"
                      className="block text-[16px] leading-[1.4] text-[rgba(0,0,0,0.87)]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 flex w-full items-center justify-center gap-12">
          <p className="flex-1 text-[16px] leading-[1.4] text-[#475569]">
            @ 2023 Company Name, Inc. All rights reserved.
          </p>

          <div className="flex items-center justify-end gap-6">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="py-3 text-[16px] leading-[1.4] text-[#475569]"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {FOOTER_SOCIALS.map((item) => (
              <a
                key={item.name}
                href="#"
                className="flex h-6 w-6 items-center justify-center"
                aria-label={item.name}
              >
                <img src={item.icon} alt="" className="h-6 w-6 object-contain" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
