import { useState } from "react";
import CanvasLayout from "../components/layout/CanvasLayout";
import NavBar from "../components/Navbar";
import ProductCard from "../components/product/ProductCard";
import WriteReviewForm from "../components/product/WriteReviewForm";
import Footer from "../components/layout/Footer";

import { productImages } from "../assets/productImages";
import { TEST_AUTHENTICATED } from "../config/devFlags";

export default function ProductDetailsPage({ showWriteReview = false }) {
  const [isReviewTab, setIsReviewTab] = useState(showWriteReview);

  return (
    <div className="min-h-screen bg-white">
      <CanvasLayout>
        <NavBar isAuthenticated={TEST_AUTHENTICATED} />

        <section className="relative h-[778px] w-[1440px]">
          <div className="absolute left-[120px] top-[32px] flex items-center gap-[4px] text-[16px]">
            <span className="text-[#0D47A1]">Product Listing</span>
            <img src={productImages.chevronRight} alt="" className="h-5 w-5" />
            <span className="text-[rgba(0,0,0,0.87)]">Dummy Product Page</span>
          </div>

          <div className="absolute left-[120px] top-[76px] flex h-[622px] w-[1200px] items-start overflow-visible">
            <div className="ml-[-18px] flex h-[644px] w-[1218px] items-start gap-[71px]">
              <div className="flex w-[626px] gap-[24px] pl-[15px] pt-[8.5px]">
                <div className="flex h-[626px] flex-col justify-between rounded-[16px]">
                  <img src={productImages.detailImage} alt="" className="h-[194px] w-[141px] rounded-[4px] object-cover opacity-20" />
                  <img src={productImages.detailImage} alt="" className="h-[194px] w-[141px] rounded-[4px] border border-[#90CAF9] object-cover" />
                  <img src={productImages.detailImage} alt="" className="h-[194px] w-[141px] rounded-[4px] object-cover" />
                </div>
                <img src={productImages.detailImage} alt="" className="h-[627px] w-[460px] rounded-[4px] object-cover opacity-20" />
              </div>

              <div className="flex h-[644px] w-[511px] flex-col justify-between">
                <div className="flex w-[489px] flex-col gap-[42px]">
                  <div className="flex flex-col gap-[24px]">
                    <div className="flex flex-col gap-[12px]">
                      <h1 className="w-[494px] font-['Roboto'] text-[32px] font-bold leading-[1.235] tracking-[0.25px] text-[#0D47A1]">
                        Double Bed & Side Tables
                      </h1>
                      <div className="flex items-center gap-[10px]">
                        <div className="flex items-center gap-[2px]">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <img key={i} src={productImages.starIcon} alt="" className="h-[16.101px] w-[16.101px]" />
                          ))}
                        </div>
                        <span className="font-['Oxygen'] text-[14px] leading-[23.87px] text-[#414141]">( 32 review )</span>
                      </div>
                      <div className="flex items-center gap-[10px]">
                        <span className="font-['Roboto'] text-[32px] font-normal leading-[39.52px] tracking-[0.25px] text-[#D32F2F]">$54.98</span>
                        <span className="font-['Roboto'] text-[24px] font-normal leading-[32.02px] text-[rgba(0,0,0,0.38)] line-through">$54.98</span>
                        <span className="inline-flex h-[21px] w-[50px] items-center justify-center rounded-[40px] bg-[#D32F2F] font-['Roboto'] text-[12px] font-bold leading-[19.92px] tracking-[0.4px] text-white">
                          -18%
                        </span>
                      </div>
                    </div>
                    <div className="h-px w-[494px] bg-[#D7D7D7]" />
                    <p className="w-[494px] text-[16px] leading-[1.5] tracking-[0.15px] text-[#414141]">
                      Lorem ipsum dolor sit amet, consectetuer adipi scing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                      magn.
                      <br />
                      <span className="text-[#0D47A1] underline">Đọc thêm...</span>
                    </p>
                    <div className="h-px w-[494px] bg-[#D7D7D7]" />
                    <div className="flex items-center gap-[24px]">
                      <span className="font-['Roboto'] text-[20px] font-medium leading-[32px] tracking-[0.15px] text-[#1D2939]">Loại</span>
                      <div className="flex gap-[24px]">
                        <div className="h-[78px] w-[83.636px] rounded-[12px] border border-[#90CAF9] bg-[#F2F4F7]" />
                        <div className="h-[78px] w-[83px] rounded-[12px] bg-[#F2F4F7]" />
                        <div className="h-[78px] w-[83px] rounded-[12px] bg-[#F2F4F7]" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-[494px] flex-col gap-[15px]">
                  <div className="flex h-[49px] gap-[15px]">
                    <button className="flex h-[49px] items-center gap-[11px] rounded-[4px] bg-[#F2F4F7] px-[20px] py-[10px]">
                      <span className="font-['Roboto'] text-[16px] font-bold leading-[24px] tracking-[0.15px] text-[#1D2939]">100ml</span>
                      <img src={productImages.chevronDownSmall} alt="" className="h-6 w-6" />
                    </button>
                    <button className="flex h-[49px] w-[94px] items-center justify-center gap-[10px] rounded-[4px] border border-[#D7D7D7] bg-white px-[24px] py-[16px]">
                      <img src={productImages.remove} alt="" className="h-6 w-6" />
                      <span className="font-['Oxygen'] text-[18px] font-bold leading-[normal] text-[#414141]">1</span>
                      <img src={productImages.add} alt="" className="h-6 w-6" />
                    </button>
                    <button className="h-[43px] flex-1 rounded-[4px] bg-[#FFF176] px-[22px] py-[8px] font-['Roboto'] text-[15px] font-bold leading-[26px] uppercase tracking-[0.46px] text-black shadow-elevation">
                      THÊM VÀO GIỎ HÀNG
                    </button>
                  </div>
                  <button className="h-[43px] w-[494px] rounded-[4px] border border-[#FDD835] px-[22px] py-[8px] font-['Roboto'] text-[15px] font-medium leading-[26px] uppercase tracking-[0.46px] text-[#FDD835]">
                    MUA NGAY
                  </button>
                </div>
                <div className="w-[350px] space-y-[16px] pb-[2px] font-['Oxygen'] text-[14px] leading-[normal] text-[#424242]">
                  <div className="flex items-center gap-[20px]">
                    <img src={productImages.truck} alt="" className="h-6 w-[26px]" />
                    Free worldwide shipping on all orders over $100
                  </div>
                  <div className="flex items-center gap-[20px] whitespace-nowrap">
                    <img src={productImages.rotate3d} alt="" className="h-[26px] w-[26px]" />
                    Delivers in: 3-7 Working Days <span className="underline">Shipping & Return</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`w-[1440px] bg-[#E5F6FD] px-[120px] ${
            showWriteReview
              ? "pb-[80px] pt-[80px]"
              : isReviewTab
                ? "pb-[52px] pt-[80px]"
                : "py-[80px]"
          }`}
        >
          {!isReviewTab ? (
            <div className="flex w-full flex-col gap-[40px]">
              <div className="flex w-full items-start gap-[20px]">
                <button
                  type="button"
                  onClick={() => setIsReviewTab(false)}
                  className="font-['Roboto'] text-[32px] font-bold leading-[39.52px] tracking-[0.25px] text-[#0D47A1]"
                >
                  Mô tả
                </button>
                <div className="h-[33px] w-0">
                  <img src={productImages.verticalDivider} alt="" className="h-[33px]" />
                </div>
                <button
                  type="button"
                  onClick={() => setIsReviewTab(true)}
                  className="font-['Roboto'] text-[32px] font-normal leading-[39.52px] tracking-[0.25px] text-[rgba(0,0,0,0.38)]"
                >
                  Đánh giá
                </button>
              </div>

              <div className="w-full font-['Roboto'] text-[16px] font-normal leading-[24px] tracking-[0.15px] text-[#575757]">
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum
                  dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="mb-0 h-[24px]" />
                <ul className="list-disc">
                  <li className="ml-[24px]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </li>
                  <li className="ml-[24px]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </li>
                  <li className="ml-[24px]">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
                  <li className="ml-[24px]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex w-full flex-col gap-[40px]">
              <div className="flex w-full items-start gap-[20px]">
                <button
                  type="button"
                  onClick={() => setIsReviewTab(false)}
                  className="font-['Roboto'] text-[32px] font-normal leading-[39.52px] tracking-[0.25px] text-[rgba(0,0,0,0.38)]"
                >
                  Mô tả
                </button>
                <div className="h-[33px] w-0">
                  <img src={productImages.reviewDivider} alt="" className="h-[33px]" />
                </div>
                <button
                  type="button"
                  onClick={() => setIsReviewTab(true)}
                  className="font-['Roboto'] text-[32px] font-bold leading-[39.52px] tracking-[0.25px] text-[#0D47A1]"
                >
                  Đánh giá
                </button>
              </div>

              <div className="flex h-[139px] w-[1198px] items-start justify-center gap-[51px] self-center">
                <div className="w-[198px]">
                  <div className="font-['Roboto'] text-[32px] font-medium leading-[32px] tracking-[0.15px] text-black">126 Đánh giá</div>
                  <div className="mt-[16px] h-[87px] rounded-[14px] bg-white px-[22px] py-[11px]">
                    <div className="font-['Roboto'] text-[40px] font-bold leading-[40px] tracking-[0.25px] text-black">4.6</div>
                    <img src={productImages.reviewStars} alt="" className="mt-0 h-6 w-[114px]" />
                  </div>
                </div>

                <div className="mt-px flex h-[138px] w-[263px] flex-col gap-[5px]">
                  {[5, 4, 3, 2, 1].map((value) => (
                    <div key={value} className="flex h-6 items-center gap-px">
                      <div className="flex items-center">
                        <span className="font-['Roboto'] text-[16px] leading-[24px] tracking-[0.15px] text-[rgba(0,0,0,0.7)]">{value}</span>
                        <img src={productImages.reviewStarSmall} alt="" className="h-4 w-4" />
                      </div>
                      <div className="relative h-[22px] w-[200px]">
                        <div className="absolute left-4 right-4 top-[9px] h-[6px] rounded-[3px] bg-[rgba(120,120,120,0.2)]" />
                        <div className="absolute left-4 right-[31.62%] top-[9px] h-[6px] rounded-[3px] bg-[#FFB70A]" />
                      </div>
                      <span className="font-['Roboto'] text-[14px] leading-[20px] tracking-[0.17px] text-[rgba(0,0,0,0.7)]">70%</span>
                    </div>
                  ))}
                </div>
              </div>

              {[1, 2].map((item) => (
                <div key={item} className="flex w-full gap-5 rounded-[14px] border border-[#90CAF9] bg-white px-4 py-[15px]">
                  <img src={productImages.reviewAvatarBlock} alt="" className="h-[52px] w-[52px]" />
                  <div className="flex min-w-0 flex-1 flex-col gap-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-['Oxygen'] text-[16px] leading-[normal] text-[#3D3D3D]">Mike Johnson</span>
                        <img src={productImages.reviewStars} alt="" className="h-6 w-[114px]" />
                      </div>
                      <p className="font-['Oxygen'] text-[16px] leading-[1.705] text-[#949494]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam nisi, cras neque, lorem vel vulputate vitae aliquam.
                        Pretium tristique nisi, ut commodo fames. Porttitor et sagittis egestas vitae metus, odio tristique amet, duis. Nunc
                        tortor elit aliquet quis in mauris.
                      </p>
                    </div>
                    <div className="flex gap-[15px] font-['Oxygen'] text-[16px] leading-[1.705] text-[#3D3D3D]">
                      <span>Like</span>
                      <span>Reply</span>
                      <span>5m</span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex w-full items-center justify-center gap-[28.3px]">
                <button type="button" className="p-2">
                  <img src={productImages.paginationPrev} alt="" className="h-6 w-6" />
                </button>
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-[#0D47A1] pb-[6.5px] pt-[5.5px] font-['Inter'] text-[18px] font-medium leading-[28px] text-white">
                    1
                  </div>
                  <div className="pl-6 font-['Inter'] text-[18px] font-medium leading-[28px] text-[#7D858D]">2</div>
                  <div className="pl-6 font-['Inter'] text-[18px] font-medium leading-[28px] text-[#7D858D]">3</div>
                  <div className="pl-6 font-['Inter'] text-[18px] font-medium leading-[28px] text-[#7D858D]">4</div>
                  <div className="pl-6 font-['Inter'] text-[18px] font-medium leading-[28px] text-[#7D858D]">5</div>
                  <div className="pl-6 font-['Inter'] text-[18px] font-medium leading-[28px] text-[#7D858D]">...</div>
                </div>
                <button type="button" className="p-2">
                  <img src={productImages.paginationNext} alt="" className="h-6 w-6" />
                </button>
              </div>

              {showWriteReview && (
                <div className="mt-[50px] w-full">
                  <WriteReviewForm />
                </div>
              )}
            </div>
          )}
        </section>

        <section className="flex h-[407px] w-[1440px] flex-col items-center justify-center gap-[36px]">
          <div className="w-full px-[120px] py-[2px]">
            <h3 className="w-[259px] text-[32px] font-bold leading-[1.235] tracking-[0.25px] text-[#0D47A1]">Similar Products</h3>
          </div>
          <div className="flex items-center gap-[28px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCard key={i} href="/product-details" />
            ))}
          </div>
        </section>

        <Footer />
      </CanvasLayout>
    </div>
  );
}

