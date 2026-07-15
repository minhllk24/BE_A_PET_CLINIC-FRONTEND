import { Link } from 'react-router-dom'
import { medicalAssets } from '../../data/medicalTreatmentData'

function GroomingBanner({ onOpenPricing }) {
  return (
    <section className="relative flex h-[239px] w-full flex-col items-center justify-center overflow-hidden pb-[25px]">
      <div className="absolute inset-x-0 bottom-[95px] top-0 overflow-hidden">
        <div className="absolute bottom-[-13px] left-1/2 top-[3px] flex w-[910px] -translate-x-1/2 gap-[54px]">
          <div className="relative h-[154px] w-[428px]">
            <button
              type="button"
              onClick={onOpenPricing}
              className="focus-ring-brand absolute inset-x-0 bottom-[17px] top-[74px] flex items-center justify-center rounded-[4px] bg-[#FDD835] px-[22px] py-2 shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FBC02D] hover:shadow-[0_5px_12px_rgba(0,0,0,0.18)] active:translate-y-0 active:scale-[0.99]"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 700,
                fontSize: 32,
                lineHeight: 1.235,
                letterSpacing: '0.25px',
                color: 'rgba(0, 0, 0, 0.87)',
              }}
            >
              BẢNG GIÁ CHI TIẾT
            </button>
            <img
              src={medicalAssets.ctaPrice}
              alt=""
              className="pointer-events-none absolute left-1/2 top-[2px] h-[111px] w-[111px] -translate-x-1/2 scale-x-[-1] object-contain"
              aria-hidden="true"
            />
          </div>

          <div className="relative h-[154px] w-[428px]">
            <Link
              to="/dat-lich"
              className="focus-ring-brand absolute inset-x-0 bottom-[17px] top-[74px] flex items-center justify-center rounded-[4px] bg-[#FDD835] px-[22px] py-2 shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FBC02D] hover:shadow-[0_5px_12px_rgba(0,0,0,0.18)] active:translate-y-0 active:scale-[0.99]"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 700,
                fontSize: 32,
                lineHeight: 1.235,
                letterSpacing: '0.25px',
                color: 'rgba(0, 0, 0, 0.87)',
              }}
            >
              ĐẶT LỊCH NGAY
            </Link>
            <img
              src={medicalAssets.ctaBook}
              alt=""
              className="pointer-events-none absolute left-1/2 top-[13px] h-[74px] w-[122px] -translate-x-1/2 object-contain"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <p
        className="absolute left-[10.97%] right-[10.97%] top-[157px] text-center text-black"
        style={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 500,
          fontSize: 24,
          lineHeight: 1.6,
          letterSpacing: '0.15px',
        }}
      >
        Thưởng cho bé cưng của bạn những giờ phút siêu thư giãn và trở nên xinh
        xắn hơn~
      </p>
    </section>
  )
}

export default GroomingBanner
