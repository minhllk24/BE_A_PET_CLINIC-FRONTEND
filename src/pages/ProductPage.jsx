import CanvasLayout from "../components/layout/CanvasLayout";
import NavBar from "../components/Navbar";
import ProductCard from "../components/product/ProductCard";

import { TEST_AUTHENTICATED } from "../config/devFlags";

const imgSidebarLine = "https://www.figma.com/api/mcp/asset/3bcb8e9a-d93c-44bd-8f2b-0e0e333894d3";
const imgChevronDown = "https://www.figma.com/api/mcp/asset/91eb7cf9-8d2a-4046-b0e8-2df04f354d3d";
const imgCheckboxChecked = "https://www.figma.com/api/mcp/asset/52c8d76e-3fa0-493c-a57b-0d16d2d5752f";
const imgCheckboxEmpty = "https://www.figma.com/api/mcp/asset/c36dd4ac-f3e7-484e-8824-c68a01ee5f98";

const imgCollectionSearchIcon = "https://www.figma.com/api/mcp/asset/d6439062-53c3-4a73-96dc-204790263142";

const imgPaginationDivider = "https://www.figma.com/api/mcp/asset/94d859b0-e47b-4f1e-a72e-10e55d684f49";
const imgButtonChevron = "https://www.figma.com/api/mcp/asset/b4c4c1dc-7aef-4774-bb10-26f7da50d016";

const imgFooterMark = "https://www.figma.com/api/mcp/asset/5c74a7a0-cad0-468f-9ada-569b1671ea7d";
const imgFooterYouTube = "https://www.figma.com/api/mcp/asset/aca21be8-571f-436c-acf4-bb0530b5f071";
const imgFooterFacebook = "https://www.figma.com/api/mcp/asset/7f3e8656-6447-4f03-96c9-067b80639359";
const imgFooterTwitter = "https://www.figma.com/api/mcp/asset/ee3e02ea-bce6-4eec-9e15-977b997993ac";
const imgFooterInstagram1 = "https://www.figma.com/api/mcp/asset/776e59b0-79d7-4227-8ad4-36fedf02b74a";
const imgFooterInstagram2 = "https://www.figma.com/api/mcp/asset/aac7ab4b-93e2-4782-9c80-33660e75eabe";
const imgFooterInstagram3 = "https://www.figma.com/api/mcp/asset/0a3655c2-d494-4c0c-8d5e-69b20b1cff4d";
const imgFooterLinkedIn = "https://www.figma.com/api/mcp/asset/a95ed603-37f9-42ad-8002-5c4fb8d3a445";

function SidebarFilter() {
  return (
    <aside className="flex w-[286px] flex-col gap-[32px]">
      <div className="h-[374px] overflow-hidden rounded-[40px] border border-[#90CAF9] bg-white px-[30px] py-[40px]">
        <div className="flex flex-col gap-[24px]">
          <div className="flex items-center gap-[17px]">
            <div className="flex h-[24px] w-0 items-center justify-center">
              <div className="-rotate-90">
                <img src={imgSidebarLine} alt="" className="h-0 w-[24px]" />
              </div>
            </div>
            <div className="font-['Oxygen'] text-[22px] leading-[normal] text-[#2D2D2D]">Categories</div>
          </div>
          <div className="flex flex-col gap-[16px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex w-[226px] items-center justify-between">
                <div className="font-['Oxygen'] text-[16px] leading-[27.28px] text-[#414141]">
                  Lorem ipsum (3)
                </div>
                <img src={imgChevronDown} alt="" className="h-5 w-5" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[276px] overflow-hidden rounded-[30px] border border-[#90CAF9] bg-white px-[30px] py-[40px]">
        <div className="flex flex-col gap-[24px]">
          <div className="flex items-center gap-[17px]">
            <div className="flex h-[24px] w-0 items-center justify-center">
              <div className="-rotate-90">
                <img src={imgSidebarLine} alt="" className="h-0 w-[24px]" />
              </div>
            </div>
            <div className="font-['Oxygen'] text-[22px] leading-[normal] text-[#2D2D2D]">Price Range</div>
          </div>
          <div className="flex flex-col gap-[16px]">
            {Array.from({ length: 4 }).map((_, i) => (
              <label key={i} className="flex w-[226px] items-center gap-[20px]">
                <span className="relative h-5 w-5 overflow-hidden">
                  <span className="absolute inset-[12.5%] rounded-[2px] border border-[#3D3D3D]" />
                  {i === 0 ? (
                    <>
                      <span className="absolute inset-[12.5%] rounded-[2px] bg-[#3D3D3D]" />
                      <span className="absolute inset-[37.5%_29.17%_33.33%_29.17%]">
                        <img src={imgCheckboxChecked} alt="" className="h-full w-full" />
                      </span>
                    </>
                  ) : (
                    <span className="absolute inset-[37.5%_29.17%_33.33%_29.17%]">
                      <img src={imgCheckboxEmpty} alt="" className="h-full w-full" />
                    </span>
                  )}
                </span>
                <span className="font-['Oxygen'] text-[16px] leading-[27.28px] text-[#414141]">
                  $20.00 - $ 50.00
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function CollectionHeader() {
  return (
    <div className="relative h-[219px] w-[946px]">
      <div className="absolute left-0 top-0 h-[45px] w-[457px] font-['Oxygen'] text-[36px] font-bold leading-[normal] text-[#3D3D3D]">
        Our Collection Of Products
      </div>

      <div className="absolute left-0 top-[77px] flex h-[56px] w-[946px] items-center justify-between rounded-[42px] border border-[rgba(25,118,210,0.3)] pl-[20px] pr-[8px] backdrop-blur-[11px]">
        <div className="font-['Oxygen'] text-[16px] leading-[normal] text-[#5F5F5F]">
          Search An Item
        </div>
        <div className="flex h-10 w-10 items-start rounded-[24px] p-[11px]">
          <img src={imgCollectionSearchIcon} alt="" className="h-[24px] w-[24px] object-contain" />
        </div>
      </div>

      <div className="absolute left-0 top-[165px] h-[54px] w-[946px]">
        <div className="ml-[12px] h-[54px] w-[922px] font-['Oxygen'] text-[16px] leading-[27.28px]">
          <div className="h-[27px] text-[#414141]">Hiện thị 1–20 trong 40 sản phẩm</div>
          <div className="h-[27px] text-[#949494]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductGrid() {
  const row = [
    "default",
    "hover",
    "tag",
    "default",
    "tag",
  ];
  return (
    <div className="mt-[32px] flex w-[946px] flex-col gap-[64px]">
      {Array.from({ length: 4 }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex gap-[24px]">
          {row.map((variant, idx) => (
            <ProductCard
              key={`${rowIdx}-${idx}`}
              variant={variant}
              href={variant !== "hover" ? "/product-details" : undefined}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function PaginationBlock() {
  return (
    <div className="relative z-20 flex h-[202px] w-[498px] flex-col items-center gap-[26px] py-[24px]">
      <div className="font-['Oxygen'] text-[16px] leading-[27.28px] text-[#414141]">
        Hiện thị 1–20 trong 40 sản phẩm
      </div>
      <div className="relative h-px w-[498.004px]">
        <div className="absolute left-0 top-0 h-px w-[498.004px] bg-[#90CAF9]" />
        <div className="absolute left-0 top-0 h-px w-[286.002px] bg-[#1976D2]" />
      </div>
      <div className="flex h-[74px] w-[202px] items-center justify-center px-[24px] py-[16px]">
        <button className="flex h-[42px] w-[154px] items-center justify-center gap-[8px] rounded-[4px] bg-[#FFF176] px-[22px] py-[8px] shadow-elevation">
          <span className="whitespace-nowrap font-['Roboto'] text-[15px] font-medium uppercase tracking-[0.46px] text-black">
            Xem thêm
          </span>
          <span className="inline-flex h-[22px] w-[22px] items-center justify-center text-[22px] leading-none text-black">
            ›
          </span>
        </button>
      </div>
    </div>
  );
}

function FooterExact() {
  return (
    <footer className="h-[484px] w-[1440px] bg-[#E5F6FD] px-[120px] pb-[50px] pt-[80px]">
      <div className="flex w-[1280px] items-start justify-center gap-[48px] border-b border-[#E2E8F0]">
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-[8px]">
            <img src={imgFooterMark} alt="" className="h-[32px] w-[21px]" />
            <div className="font-['Roboto'] text-[24px] font-bold leading-[1.1] text-[rgba(0,0,0,0.87)]">WAVES</div>
          </div>
        </div>
        {[
          { title: "PRODUCT", items: ["Pricing", "Overview", "Browse", "Accessibility", "Five"] },
          { title: "Solutions", items: ["Brainstorming", "Ideation", "Wireframing", "Research"] },
          { title: "Resources", items: ["Help Center", "Blog", "Tutorials"] },
          { title: "Company", items: ["About", "Press", "Events", "Careers"] },
        ].map((col) => (
          <div key={col.title} className="flex flex-1 flex-col">
            <div className="py-[12px] font-['Roboto'] text-[20px] font-bold leading-[1.6] tracking-[0.15px] text-[#0D47A1]">
              {col.title}
            </div>
            {col.items.map((item) => (
              <div key={item} className="py-[12px] font-['Roboto'] text-[16px] leading-[1.4] text-[rgba(0,0,0,0.87)]">
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-[24px] flex w-[1280px] items-center justify-center gap-[48px]">
        <div className="flex-1 font-['Roboto'] text-[16px] leading-[1.4] text-[#475569]">
          @ 2023 Company Name, Inc. All rights reserved.
        </div>
        <div className="flex items-center justify-end gap-[24px]">
          {["Terms", "Privacy", "Contact"].map((item) => (
            <div key={item} className="py-[12px] font-['Roboto'] text-[16px] leading-[1.4] text-[#475569]">
              {item}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-[16px]">
          <img src={imgFooterYouTube} alt="YouTube" className="h-6 w-6 object-contain" />
          <img src={imgFooterFacebook} alt="Facebook" className="h-6 w-6 object-contain" />
          <img src={imgFooterTwitter} alt="Twitter" className="h-6 w-6 object-contain" />
          <div className="relative h-6 w-6">
            <img src={imgFooterInstagram1} alt="Instagram" className="absolute inset-0 h-6 w-6 object-contain" />
            <img src={imgFooterInstagram2} alt="" className="absolute inset-0 h-6 w-6 object-contain" />
            <img src={imgFooterInstagram3} alt="" className="absolute inset-0 h-6 w-6 object-contain" />
          </div>
          <img src={imgFooterLinkedIn} alt="LinkedIn" className="h-6 w-6 object-contain" />
        </div>
      </div>
    </footer>
  );
}

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#FFFFFF_0%,#E5F6FD_100%)]">
      <CanvasLayout>
        <NavBar isAuthenticated={TEST_AUTHENTICATED} />
        <div className="min-h-[1645px] w-[1440px] bg-[linear-gradient(180deg,#FFFFFF_0%,#E5F6FD_100%)] pb-[24px]">
          <div className="flex flex-col gap-8 px-6 pt-8 lg:flex-row lg:gap-[32px] lg:pl-[100px] lg:pt-[32px]">
            <SidebarFilter />
            <section className="w-full max-w-[946px] lg:w-[946px]">
              <CollectionHeader />
              <ProductGrid />
              <div className="flex justify-center pb-[8px] pt-[32px]">
                <PaginationBlock />
              </div>
            </section>
          </div>
        </div>
        <FooterExact />
      </CanvasLayout>
    </div>
  );
}

