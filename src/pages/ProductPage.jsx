import CanvasLayout from "../components/layout/CanvasLayout";
import Footer from "../components/layout/Footer";
import NavBar from "../components/Navbar";
import ProductCard from "../components/product/ProductCard";

import { productImages } from "../assets/productImages";
import { TEST_AUTHENTICATED } from "../config/devFlags";


function SidebarFilter() {
  return (
    <aside className="flex w-[286px] flex-col gap-[32px]">
      <div className="h-[374px] overflow-hidden rounded-[40px] border border-[#90CAF9] bg-white px-[30px] py-[40px]">
        <div className="flex flex-col gap-[24px]">
          <div className="flex items-center gap-[17px]">
            <div className="flex h-[24px] w-0 items-center justify-center">
              <div className="-rotate-90">
                <img src={productImages.sidebarLine} alt="" className="h-0 w-[24px]" />
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
                <img src={productImages.chevronDown} alt="" className="h-5 w-5" />
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
                <img src={productImages.sidebarLine} alt="" className="h-0 w-[24px]" />
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
                        <img src={productImages.checkboxChecked} alt="" className="h-full w-full" />
                      </span>
                    </>
                  ) : (
                    <span className="absolute inset-[37.5%_29.17%_33.33%_29.17%]">
                      <img src={productImages.checkboxEmpty} alt="" className="h-full w-full" />
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
          <img src={productImages.searchIcon} alt="" className="h-[24px] w-[24px] object-contain" />
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
        <Footer />
      </CanvasLayout>
    </div>
  );
}

