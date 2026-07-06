import { useState } from "react";
import React from 'react';
import CouponInput from "../../components/ui/CouponInput";

// You can use standard a/img tags with the local paths or import SVG React components depending on the bundler
// Since this is Vite, we can just use the path as src
import backArrowIcon from "../../assets/icons/back-arrow.svg";
import calendarIcon from "../../assets/icons/calendar-icon.svg";
import petIcon from "../../assets/icons/pet-icon.svg";
import personIcon from "../../assets/icons/person-icon.svg";
import phoneIcon from "../../assets/icons/phone-icon.svg";
import infoIcon from "../../assets/icons/info-icon.svg";

function AppointmentCheckout() {
  const [couponCode, setCouponCode] = useState("");
  const [paymentMode, setPaymentMode] = useState("cod"); // "cod" | "online"

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
  };

  const isCod = paymentMode === "cod";

  return (
    <div className="w-full min-h-screen bg-[#F8F9FB] flex justify-center font-sans">
      {/* Main Container */}
      <div className="w-[1440px] pt-[21px] flex flex-col gap-[14px]">
        {/* Back Button Row */}
        <div className="flex items-center px-[66px] h-[31.68px] gap-[10px]">
          <img src={backArrowIcon} alt="Back" className="w-[12px] h-[12px]" />
          <button className="text-[#00355F] text-[20px] font-medium leading-[1.6em] tracking-[0.0075em]">
            Quay lại
          </button>
        </div>

        {/* Two Columns Layout */}
        <div className="flex justify-between items-stretch px-[64px] pt-[10px] pb-[10px]">
          
          {/* Left Column: Appointment Details */}
          <div className="w-[720px] bg-[#FFFFFF] border border-[#C2C7D1] rounded-[8px] p-[24px] flex flex-col gap-[24.5px]">
            
            {/* Header: Title & Status */}
            <div className="flex justify-between items-start w-full">
              <div className="flex flex-col gap-[8px]">
                <h1 className="text-[24px] font-normal text-[#00355F] leading-[1.334em]">
                  Chi tiết đặt lịch
                </h1>
                <p className="text-[14px] font-normal text-[#42474F] leading-[1.428em]">
                  Mã số: BK-8712-2023
                </p>
              </div>
              <div className="bg-[#FFDBC9] rounded-[4px] py-[8px] px-[12px]">
                <span className="text-[12px] font-normal text-[#321200] leading-[1.66em] tracking-[0.033em]">
                  Đang chờ thanh toán
                </span>
              </div>
            </div>

            <div className="w-full border-b border-[#C2C7D1] pb-[20px]"></div>

            {/* Appointment Info Grid */}
            <div className="flex flex-col pb-[24px] gap-[8.5px]">
              <div className="text-[12px] font-bold text-[#727780] leading-[1.333em] tracking-[0.0416em] uppercase">
                LỊCH HẸN CỦA BẠN
              </div>
              <div className="flex flex-row items-center gap-[12px]">
                <img src={calendarIcon} alt="Calendar" className="w-[15px] h-[16.67px]" />
                <span className="text-[16px] font-normal text-[#191C1E] leading-[1.5em] tracking-[0.0093em]">
                  25 tháng 10, 2023 • 09:30 AM
                </span>
              </div>
            </div>

            {/* Horizontal Grid for Pet, Person, Phone */}
            <div className="flex flex-row flex-wrap w-full">
              <div className="flex flex-col w-[347px] gap-[8.5px] mb-[20px]">
                <div className="text-[12px] font-bold text-[#727780] leading-[1.333em] tracking-[0.0416em] uppercase">
                  THÔNG TIN THÚ CƯNG
                </div>
                <div className="flex flex-row items-center gap-[12px]">
                  <img src={petIcon} alt="Pet" className="w-[21px] h-[22px]" />
                  <span className="text-[16px] font-normal text-[#191C1E] leading-[1.5em] tracking-[0.0093em]">
                    0123456789
                  </span>
                </div>
              </div>

              <div className="flex flex-col w-[347px] gap-[8.5px] mb-[20px]">
                <div className="text-[12px] font-bold text-[#727780] leading-[1.333em] tracking-[0.0416em] uppercase">
                  SỐ ĐIỆN THOẠI LIÊN HỆ
                </div>
                <div className="flex flex-row items-center gap-[12px]">
                  <img src={phoneIcon} alt="Phone" className="w-[18px] h-[18px]" />
                  <span className="text-[16px] font-normal text-[#191C1E] leading-[1.5em] tracking-[0.0093em]">
                    0123456789
                  </span>
                </div>
              </div>

              <div className="flex flex-col w-full gap-[8.5px]">
                <div className="text-[12px] font-bold text-[#727780] leading-[1.333em] tracking-[0.0416em] uppercase">
                  HỌ TÊN KHÁCH HÀNG
                </div>
                <div className="flex flex-row items-center gap-[12px]">
                  <img src={personIcon} alt="Person" className="w-[19px] h-[19px]" />
                  <span className="text-[16px] font-normal text-[#191C1E] leading-[1.5em] tracking-[0.0093em]">
                    Nguyen Van A
                  </span>
                </div>
              </div>
            </div>

            {/* Selected Services */}
            <div className="flex flex-col w-full gap-[16.5px] pb-[8px]">
              <div className="text-[12px] font-bold text-[#727780] leading-[1.333em] tracking-[0.0416em] uppercase">
                DỊCH VỤ ĐÃ CHỌN
              </div>
              <div className="flex flex-col w-full gap-[12px]">
                {/* Service 1 */}
                <div className="flex flex-row justify-between items-center w-full border-b border-[#EDEEF0] py-[12px]">
                  <div className="flex flex-col">
                    <span className="text-[16px] font-normal text-[#191C1E] leading-[1.5em] tracking-[0.0093em]">Cắt lông</span>
                    <span className="text-[14px] font-normal text-[#42474F] leading-[1.429em] tracking-[0.012em]">30’</span>
                  </div>
                  <div className="text-[16px] font-normal text-[#191C1E] leading-[1.5em]">
                    100.000đ
                  </div>
                </div>
                {/* Service 2 */}
                <div className="flex flex-row justify-between items-center w-full border-b border-[#EDEEF0] py-[12px]">
                  <div className="flex flex-col">
                    <span className="text-[16px] font-normal text-[#191C1E] leading-[1.5em] tracking-[0.0093em]">Cắt lông</span>
                    <span className="text-[14px] font-normal text-[#42474F] leading-[1.429em] tracking-[0.012em]">30’</span>
                  </div>
                  <div className="text-[16px] font-normal text-[#191C1E] leading-[1.5em]">
                    100.000đ
                  </div>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="w-full bg-[#F3F4F6] rounded-[4px] p-[16px] flex flex-row items-start gap-[12px]">
              <img src={infoIcon} alt="Info" className="w-[20px] h-[20px] mt-[2px]" />
              <div className="flex-1 pr-[14.8px]">
                <p className="text-[14px] font-normal text-[#42474F] leading-[1.429em] tracking-[0.012em]">
                  Vui lòng kiểm tra lại thông tin lịch hẹn. Bạn có thể thay đổi lịch hẹn trước tối thiểu 24 giờ. Liên hệ bộ phận hỗ trợ nếu cần thêm thông tin.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Payment Section */}
          <div className="w-[480px] flex flex-col">
            <div className="w-full bg-[#FFFFFF] border border-[#C2C7D1] rounded-[8px] px-[24px] py-[23.5px] flex flex-col gap-[24px]">
              
              <h2 className="text-[24px] font-normal text-[#00355F] leading-[1.334em]">
                Phương thức thanh toán
              </h2>

              <div className="flex flex-col w-full gap-[24px]">
                {/* Payment Mode Toggle */}
                <div className="relative w-full bg-[#E7E8EA] rounded-[12px] p-[4px] flex items-center">
                  <div
                    className="absolute top-1 h-8 w-[calc(50%-4px)] rounded-[12px] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-[left] duration-component ease-premium"
                    style={{ left: isCod ? "4px" : "calc(50% + 0px)" }}
                  />
                  <button
                    type="button"
                    onClick={() => setPaymentMode("cod")}
                    className={`flex-1 flex justify-center items-center py-[8px] rounded-[12px] transition-colors duration-micro z-10 ${
                      isCod ? "font-bold text-[#00355F]" : "text-[#727780] hover:text-[#00355F]"
                    }`}
                  >
                    <span className="text-[12px] leading-[1.333em] tracking-[0.0416em]">
                      Tại cửa hàng
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMode("online")}
                    className={`flex-1 flex justify-center items-center py-[8px] rounded-[12px] transition-colors duration-micro z-10 ${
                      !isCod ? "font-bold text-[#00355F]" : "text-[#727780] hover:text-[#00355F]"
                    }`}
                  >
                    <span className="text-[12px] leading-[1.333em] tracking-[0.0416em]">
                      Trực tuyến
                    </span>
                  </button>
                </div>

                {/* Discount Code Section */}
                <div className="w-full border-t border-[#C2C7D1] pt-[16px] flex flex-col gap-[12px]">
                  <h3 className="text-[15px] font-medium text-[#585858] leading-[1.171em]">
                    Thẻ quà tặng / Mã giảm giá
                  </h3>
                  <CouponInput
                    value={couponCode}
                    onChange={setCouponCode}
                    onApply={handleApplyCoupon}
                    error=""
                  />
                </div>

                {/* Summary Section */}
                <div className="w-full border-t border-[#C2C7D1] pt-[24px] flex flex-col gap-[12px]">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-[16px] font-normal text-[#W676PB] leading-[1.5em] text-[#727780]">Tạm tính</span>
                    <span className="text-[16px] font-normal text-[#191C1E] leading-[1.5em]">250.000đ</span>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <span className="text-[16px] font-normal text-[#727780] leading-[1.5em]">Phí dịch vụ</span>
                    <span className="text-[16px] font-normal text-[#191C1E] leading-[1.5em]">0đ</span>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <span className="text-[16px] font-normal text-[#727780] leading-[1.5em]">Giảm giá</span>
                    <span className="text-[16px] font-normal text-[#191C1E] leading-[1.5em]">0đ</span>
                  </div>
                  <div className="w-full flex justify-between items-center pt-[12px]">
                    <span className="text-[20px] font-semibold text-[#00355F] leading-[1.4em]">Tổng cộng</span>
                    <span className="text-[20px] font-bold text-[#00355F] leading-[1.4em]">250.000đ</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  className="w-full h-[48px] bg-[#FDD835] rounded-[4px] shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),_0px_4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-center items-center hover:bg-[#ffe454] active:scale-[0.99] active:shadow-none transition-all duration-micro focus-ring-brand"
                >
                  <span className="text-[20px] font-bold text-[#000000] leading-[1.2em]">
                    Xác nhận đặt lịch
                  </span>
                </button>

                {/* Footer Text */}
                <div className="flex flex-wrap justify-center text-center font-['Roboto'] text-[12px] leading-[15px] text-[#727780]">
                  <span>Bằng cách nhấn xác nhận, bạn đồng ý với </span>
                  <a href="/terms" className="text-[#00355f] underline hover:no-underline mx-1">Điều khoản dịch vụ</a>
                  <span>và </span>
                  <a href="/privacy" className="text-[#00355f] underline hover:no-underline">Chính sách bảo mật</a>
                  <span> của chúng tôi.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentCheckout;
