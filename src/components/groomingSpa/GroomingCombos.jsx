import { groomingImages } from '../../assets/groomingImages'
import { GROOMING_COMBO_STEPS } from '../../data/groomingData'
import { Link } from 'react-router-dom'
import { cssMask } from './groomingMaskUtils'
import { groomingTitleStyles } from './groomingTitleStyles'

function BookButton({ className = '' }) {
  return (
    <Link
      to="/booking"
      className={`focus-ring-brand z-10 flex h-12 shrink-0 items-center justify-center rounded-[50px] bg-[#0D47A1] px-6 text-center font-['Roboto'] text-[16px] leading-4 text-white no-underline shadow-[0_2px_4px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1565C0] hover:shadow-[0_6px_14px_rgba(13,71,161,0.25)] active:translate-y-0 active:scale-[0.98] ${className}`}
    >
      Đặt lịch
    </Link>
  )
}

function MaskedBluePanel({ maskUrl, maskSize, className = '', children }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden rounded-[16px] ${className}`}
      style={cssMask(maskUrl, maskSize)}
    >
      <div className="absolute inset-0 rounded-[39px] bg-[rgba(144,202,249,0.3)]" />
      {children}
    </div>
  )
}

function SmallComboCard({ image, title, price, description, maskUrl }) {
  return (
    <article className="relative h-[220px] w-full overflow-visible">
      <MaskedBluePanel maskUrl={maskUrl} maskSize="100% 100%" />

      <div className="relative grid h-full grid-cols-[132px_1fr] gap-5 px-10 pb-[52px] pt-10">
        <img
          src={image}
          alt=""
          className="h-[140px] w-[132px] rounded-[16px] object-cover"
        />
        <div className="flex min-w-0 flex-col gap-0.5 pr-[170px]">
          <h3 className="line-clamp-2 font-['Roboto'] text-[24px] font-medium italic leading-[30px] text-[#02000F]">
            {title}
          </h3>
          <p className="shrink-0 font-['Roboto'] text-[20px] italic leading-[28px] text-[#02000F]">
            {price}
          </p>
          <p className="line-clamp-2 font-['Roboto'] text-[16px] leading-[22px] text-[#6C6D71]">
            {description}
          </p>
        </div>
      </div>

      <BookButton className="absolute bottom-[-2px] right-[2px] w-[181.77px]" />
    </article>
  )
}

function GroomingCombos() {
  return (
    <section className="relative z-10 h-[785px] w-[1440px] overflow-visible">
      <img
        src={groomingImages.comboSectionBg}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      <img
        src={groomingImages.comboShape117}
        alt=""
        className="pointer-events-none absolute left-[66px] top-[51.98px] h-[57px] w-[76px]"
        aria-hidden="true"
      />
      <img
        src={groomingImages.comboShape112}
        alt=""
        className="pointer-events-none absolute left-[1298px] top-[51.98px] h-[70px] w-[64px]"
        aria-hidden="true"
      />
      <img
        src={groomingImages.comboShape16}
        alt=""
        className="pointer-events-none absolute left-[66px] top-[473.66px] h-[67px] w-[66px]"
        aria-hidden="true"
      />
      <img
        src={groomingImages.comboShape15}
        alt=""
        className="pointer-events-none absolute left-[1297px] top-[466.88px] h-[76px] w-[65px]"
        aria-hidden="true"
      />

      {/* Figma 1384:6083 — mask tránh nền đen PNG che mất icon */}
      <div
        className="pointer-events-none absolute bottom-[12px] right-[48px] z-20 h-[82px] w-[70px]"
        style={{
          ...cssMask(groomingImages.comboHeartsIcon, '70px 82px'),
          backgroundColor: '#0D47A1',
        }}
        aria-hidden="true"
      />

      <h2
        className="absolute left-1/2 top-[98.57px] w-[884px] -translate-x-1/2 -translate-y-1/2"
        style={groomingTitleStyles.primary64}
      >
        Combo siêu tiết kiệm
      </h2>

      <p
        className="absolute left-1/2 top-[168.98px] w-[1293px] -translate-x-1/2 -translate-y-1/2 whitespace-pre-wrap text-center text-[#0F172A]"
        style={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 400,
          fontSize: 24,
          lineHeight: 1.334,
        }}
      >
        {`Ngoài những dịch vụ riêng lẻ, chúng tôi còn thiết kế các combo phù hợp. \nKhông chỉ giúp bạn tiết kiệm hơn, mà bé cưng của bạn cũng vui vẻ hơn.`}
      </p>

      <article className="absolute left-[50px] top-[235px] h-[464px] w-[658px] overflow-visible">
        <MaskedBluePanel
          maskUrl={groomingImages.comboCardMaskLg}
          maskSize="645px 464px"
          className="rounded-[16px]"
        />

        <div className="relative flex h-full">
          <div className="absolute left-[101px] top-[28px] h-[408px] w-[261px] overflow-hidden rounded-[16px]">
            <img
              src={groomingImages.comboBath}
              alt="Combo Tắm 11 bước"
              className="size-full object-cover"
            />
          </div>

          <div className="absolute left-[391px] top-[28px] w-[252px] pb-[56px] pr-[8px]">
            <h3 className="font-['Roboto'] text-[24px] font-medium italic leading-[34px] text-[#02000F]">
              Combo Tắm 11 bước
            </h3>
            <p className="mt-1 font-['Roboto'] text-[20px] italic leading-[35px] text-[#02000F]">
              Từ 150.000đ
            </p>
            <ol className="mt-3 list-decimal pl-6 font-['Roboto'] text-[16px] leading-6 text-[#6C6D71]">
              {GROOMING_COMBO_STEPS.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <BookButton className="absolute bottom-[8px] right-0 w-[188px]" />
      </article>

      <div className="absolute left-[720px] top-[242px] flex w-[670px] flex-col gap-6">
        <SmallComboCard
          image={groomingImages.comboGrooming}
          title="Combo Tắm cơ bản & cắt tỉa lông"
          price="Từ 100.000đ"
          description="Gói Tắm cơ bản, sấy lông & cắt tỉa"
          maskUrl={groomingImages.comboCardMaskSm1}
        />
        <SmallComboCard
          image={groomingImages.comboNail}
          title="Combo Chăm sóc & bảo vệ móng"
          price="Từ 80.000đ"
          description="Cắt móng, cạo da chết đệm thịt, dưỡng ẩm"
          maskUrl={groomingImages.comboCardMaskSm2}
        />
      </div>
    </section>
  )
}

export default GroomingCombos
