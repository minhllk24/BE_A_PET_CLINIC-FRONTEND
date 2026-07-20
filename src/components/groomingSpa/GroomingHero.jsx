import { groomingImages } from '../../assets/groomingImages'
import { Link } from 'react-router-dom'
import { groomingTitleStyles } from './groomingTitleStyles'

function GroomingHero() {
  return (
    <section className="relative h-[690px] w-[1440px] overflow-hidden bg-white">
      <svg
        className="pointer-events-none absolute left-0 top-0 z-0 h-[615px] w-[1440px]"
        xmlns="http://www.w3.org/2000/svg"
        width="1440"
        height="615"
        viewBox="0 0 1440 615"
        fill="none"
        aria-hidden="true"
      >
        <path d="M10.4924 836.766C18.707 838.606 27.2609 838.252 35.2958 835.742L1022.57 527.257C1026.38 526.069 1030.31 525.359 1034.29 525.143L1240.64 513.961C1251.26 513.385 1261.4 509.292 1269.45 502.327L1296.28 479.104C1304.53 471.964 1314.97 467.848 1325.88 467.435L1341.54 466.841C1361.66 466.079 1379.16 452.846 1385.38 433.699L1441.03 262.329C1443.01 256.221 1443.75 249.777 1443.19 243.378L1403.21 -219.912C1400.58 -250.371 1370.53 -270.644 1341.3 -261.671L85.568 123.852C67.324 129.453 54.1313 145.33 51.9655 164.291L-10.6115 712.143C-11.2518 717.748 -12.8754 723.197 -15.4077 728.239L-34.1895 765.634C-48.207 793.543 -32.2604 827.194 -1.78368 834.018L10.4924 836.766Z" fill="#E5F6FD"/>
      </svg>

      <div className="relative z-10 flex h-full w-full items-center gap-[100px] pl-[120px] pr-[87px]">
        <div className="flex max-w-[600px] flex-[1_0_0] flex-col items-start justify-center gap-[43px] pb-[123px]">
          <h1 style={groomingTitleStyles.hero}>
            Dịch vụ
            <br />
            Grooming &amp; Spa
          </h1>

          <p
            className="w-full text-justify text-[#0F172A]"
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 400,
              fontSize: 24,
              lineHeight: 1.334,
            }}
          >
            Dịch vụ tắm sấy, cắt tỉa lông và chăm sóc vệ sinh giúp thú cưng luôn
            sạch sẽ, khỏe mạnh và thoải mái.
          </p>

          <div className="flex items-start gap-[24px]">
            <Link
              to="/dat-lich"
              className="focus-ring-brand group relative rounded-[4px]"
            >
              <img
                src={groomingImages.heroPaw}
                alt=""
                className="pointer-events-none absolute -left-[54px] -top-[43px] h-[65.801px] w-[59.964px] -rotate-[25deg] translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                aria-hidden="true"
              />
              <span
                className="flex w-[181px] items-center justify-center rounded-[4px] bg-[#FDD835] px-[22px] py-2 shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FBC02D] hover:shadow-[0_5px_12px_rgba(0,0,0,0.18)] active:translate-y-0 active:scale-[0.98]"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 700,
                  fontSize: 15,
                  lineHeight: '26px',
                  letterSpacing: '0.46px',
                  textTransform: 'uppercase',
                  color: 'rgba(0, 0, 0, 0.87)',
                }}
              >
                ĐẶT LỊCH NGAY
              </span>
            </Link>
            <a
              href="#danh-sach-dich-vu"
              className="focus-ring-brand flex w-[179px] items-center justify-center rounded-[4px] bg-[#FFF9C4] px-[22px] py-2 shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FFF59D] hover:shadow-[0_5px_12px_rgba(0,0,0,0.18)] active:translate-y-0 active:scale-[0.98]"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 700,
                fontSize: 15,
                lineHeight: '26px',
                letterSpacing: '0.46px',
                textTransform: 'uppercase',
                color: 'rgba(0, 0, 0, 0.87)',
              }}
            >
              Bắt đầu thôi
            </a>
          </div>
        </div>

        {/* Figma: ảnh chó + nền vàng — căn giữa cột phải, cách nền trắng 87px trên/dưới */}
        <div className="flex flex-[1_0_0] max-w-[636px] items-center justify-center self-stretch py-[87px]">
          <img
            src={groomingImages.heroPetComposite}
            alt="Grooming & Spa"
            className="h-full w-full max-h-[516px] object-contain object-center"
          />
        </div>
      </div>
    </section>
  )
}

export default GroomingHero
