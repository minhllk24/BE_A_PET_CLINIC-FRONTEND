import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { footerImages } from "../../assets/footerImages";
import { homeImages } from "../../assets/homeImages";

const PRODUCT_LINKS = [
  ["Trang chủ", "/"],
  ["Dịch vụ", "/services/grooming-spa"],
  ["Mua sắm", "/petshop"],
  ["Đặt lịch", "/booking"],
  ["Blog / Cẩm nang", "#"],
  ["Cộng đồng chia sẻ", "#"],
  ["Thông tin cứu trợ", "#"],
];

const SERVICE_LINKS = [
  ["Khám tổng quát", "/booking"],
  ["Tiêm phòng", "/booking"],
  ["Grooming & Spa", "/services/grooming-spa"],
  ["Mua sắm sản phẩm", "/petshop"],
];

const SUPPORT_LINKS = [
  "Chính sách đặt lịch",
  "Chính sách đổi/hủy lịch",
  "Chính sách thanh toán",
  "Chính sách bán hàng",
  "Chính sách bảo mật",
];

function isBlueBackground(element) {
  let current = element;

  while (current) {
    const color = getComputedStyle(current).backgroundColor;
    const channels = color.match(/\d+(?:\.\d+)?/g)?.map(Number);

    if (channels && channels.length >= 3 && (channels[3] ?? 1) > 0) {
      const [red, green, blue] = channels;
      return blue > red + 12 && blue > green - 18;
    }

    current = current.parentElement;
  }

  return false;
}

function FooterLink({ children, to = "#" }) {
  return (
    <li>
      <Link
        to={to}
        className="inline-flex py-3 text-[16px] leading-[1.4] text-[rgba(0,0,0,0.87)] transition-colors hover:text-[#0D47A1]"
      >
        {children}
      </Link>
    </li>
  );
}

function FooterColumn({ title, children, className = "" }) {
  return (
    <section className={className}>
      <h2 className="mb-1 whitespace-nowrap text-[20px] font-bold leading-[1.6] tracking-[0.15px] text-[#0D47A1]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Footer({ variant = "auto" }) {
  const footerRef = useRef(null);
  const [autoVariant, setAutoVariant] = useState("blue");
  const resolvedVariant = variant === "auto" ? autoVariant : variant;
  const isBlue = resolvedVariant === "blue";

  useLayoutEffect(() => {
    if (variant !== "auto" || !footerRef.current) return undefined;

    const footer = footerRef.current;
    const updateVariant = () => {
      setAutoVariant(isBlueBackground(footer.previousElementSibling) ? "white" : "blue");
    };

    updateVariant();
    const observer = new MutationObserver(updateVariant);
    observer.observe(document.body, { attributes: true, subtree: true });
    return () => observer.disconnect();
  }, [variant]);

  return (
    <footer
      ref={footerRef}
      className={`relative w-full overflow-hidden font-sans ${
        isBlue ? "bg-[#E5F6FD]" : "bg-white"
      }`}
      data-footer-variant={resolvedVariant}
    >
      <svg
        aria-hidden="true"
        className="absolute left-0 top-0 h-[48px] w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 48"
      >
        <path
          d="M0 0H1440V44C1325 0 1200 4 1080 18C920 37 760 48 604 32C603 9 597 0 589 0C578 0 566 14 557 33C540 31 523 31 506 33C492 13 477 0 470 0C460 0 456 13 458 33C278 5 111 2 0 43V0Z"
          fill={isBlue ? "#FFFFFF" : "#E5F6FD"}
        />
      </svg>

      <div className="relative mx-auto grid min-h-[530px] max-w-[1270px] grid-cols-[220px_144px_155px_210px_172px] items-start justify-between gap-8 px-6 pb-[62px] pt-[76px]">
        <section className="flex flex-col items-start gap-4">
          <Link to="/" aria-label="Dr. Pet's House - Trang chủ">
            <img
              src={homeImages.logo}
              alt="Dr. Pet's House"
              className="h-[72px] w-[165px] object-contain object-left"
            />
          </Link>
          <h2 className="text-[20px] font-bold leading-[1.6] tracking-[0.15px] text-[#0D47A1]">
            TRUNG TÂM CHĂM SÓC THÚ CƯNG
          </h2>
          <p className="w-[245px] text-[16px] leading-[1.4] text-[#475569]">
            Cung cấp dịch vụ khám bệnh, làm đẹp, và mua sắm sản phẩm cho thú cưng
            của bạn.
          </p>
          <div className="flex items-center gap-4 text-[#475569]">
            {/* <a href="#" aria-label="Facebook" className="transition-colors hover:text-[#0D47A1]">
              <img src={footerImages.facebook} alt="" className="size-5 object-contain" />
            </a> */}
            <a aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="5" fill="white"/>
                <path d="M9.04623 5.865V8.613H7.03223V11.973H9.04623V21.959H13.1802V11.974H15.9552C15.9552 11.974 16.2152 10.363 16.3412 8.601H13.1972V6.303C13.1972 5.96 13.6472 5.498 14.0932 5.498H16.3472V2H13.2832C8.94323 2 9.04623 5.363 9.04623 5.865Z" fill="#475569"/>
              </svg>
            </a>
            <a aria-label="Zalo">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="5" fill="white"/>
                <path d="M12.4083 10.0629V9.68891H13.5308V14.9435H12.8892C12.7622 14.9437 12.6402 14.8937 12.5501 14.8044C12.46 14.7152 12.409 14.5939 12.4083 14.4672C11.9399 14.8095 11.374 14.9944 10.7933 14.9934C10.0678 14.9934 9.37198 14.706 8.85881 14.1945C8.34563 13.683 8.05711 12.9891 8.05667 12.2655C8.05711 11.5419 8.34563 10.848 8.85881 10.3365C9.37198 9.82498 10.0678 9.53764 10.7933 9.53764C11.3737 9.53681 11.9401 9.72085 12.4083 10.0629ZM7.76583 8V8.17039C7.76583 8.48789 7.72333 8.74721 7.51583 9.05141L7.49083 9.07967C7.42177 9.15705 7.35453 9.23604 7.28917 9.31655L3.68667 13.8264H7.76583V14.4647C7.76583 14.5277 7.75339 14.59 7.72922 14.6481C7.70504 14.7063 7.66961 14.7591 7.62495 14.8036C7.58029 14.848 7.52728 14.8833 7.46894 14.9073C7.41061 14.9313 7.3481 14.9436 7.285 14.9435H2V14.6426C2 14.2744 2.09167 14.1098 2.20833 13.9386L6.04833 9.19686H2.16V8H7.76583ZM14.8917 14.9435C14.7856 14.9435 14.6838 14.9014 14.6088 14.8266C14.5338 14.7518 14.4917 14.6503 14.4917 14.5445V8H15.6925V14.9435H14.8917ZM19.2442 9.50439C19.606 9.50428 19.9642 9.57525 20.2985 9.71324C20.6328 9.85123 20.9366 10.0535 21.1925 10.3086C21.4484 10.5637 21.6514 10.8666 21.79 11.1999C21.9285 11.5332 21.9999 11.8905 22 12.2514C22.0001 12.6122 21.929 12.9695 21.7906 13.303C21.6523 13.6364 21.4494 13.9394 21.1937 14.1946C20.9379 14.4498 20.6343 14.6523 20.3001 14.7905C19.9659 14.9287 19.6076 14.9999 19.2458 15C18.5152 15.0002 17.8143 14.7109 17.2975 14.1958C16.7807 13.6806 16.4902 12.9818 16.49 12.253C16.4898 11.5243 16.7798 10.8253 17.2963 10.3098C17.8128 9.79432 18.5135 9.50461 19.2442 9.50439ZM10.7942 13.8705C11.0086 13.8753 11.2219 13.8374 11.4214 13.7589C11.621 13.6804 11.8028 13.5629 11.9562 13.4134C12.1096 13.2638 12.2315 13.0852 12.3147 12.888C12.3979 12.6908 12.4408 12.479 12.4408 12.2651C12.4408 12.0511 12.3979 11.8393 12.3147 11.6421C12.2315 11.4449 12.1096 11.2663 11.9562 11.1168C11.8028 10.9672 11.621 10.8497 11.4214 10.7712C11.2219 10.6928 11.0086 10.6548 10.7942 10.6597C10.3736 10.6692 9.97352 10.8426 9.67947 11.1426C9.38543 11.4426 9.22079 11.8455 9.22079 12.2651C9.22079 12.6846 9.38543 13.0875 9.67947 13.3876C9.97352 13.6876 10.3736 13.8609 10.7942 13.8705ZM19.2442 13.868C19.674 13.868 20.0863 13.6976 20.3903 13.3945C20.6942 13.0913 20.865 12.6801 20.865 12.2514C20.865 11.8226 20.6942 11.4114 20.3903 11.1083C20.0863 10.8051 19.674 10.6348 19.2442 10.6348C18.8143 10.6348 18.402 10.8051 18.0981 11.1083C17.7941 11.4114 17.6233 11.8226 17.6233 12.2514C17.6233 12.6801 17.7941 13.0913 18.0981 13.3945C18.402 13.6976 18.8143 13.868 19.2442 13.868Z" fill="#455A64"/>
              </svg>
            </a>
            <a aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="5" fill="white"/>
                <path d="M16.017 2H7.947C6.37015 2.00185 4.85844 2.62914 3.74353 3.74424C2.62862 4.85933 2.00159 6.37115 2 7.948L2 16.018C2.00185 17.5948 2.62914 19.1066 3.74424 20.2215C4.85933 21.3364 6.37115 21.9634 7.948 21.965H16.018C17.5948 21.9631 19.1066 21.3359 20.2215 20.2208C21.3364 19.1057 21.9634 17.5938 21.965 16.017V7.947C21.9631 6.37015 21.3359 4.85844 20.2208 3.74353C19.1057 2.62862 17.5938 2.00159 16.017 2V2ZM19.957 16.017C19.957 16.5344 19.8551 17.0468 19.6571 17.5248C19.4591 18.0028 19.1689 18.4371 18.803 18.803C18.4371 19.1689 18.0028 19.4591 17.5248 19.6571C17.0468 19.8551 16.5344 19.957 16.017 19.957H7.947C6.90222 19.9567 5.90032 19.5415 5.16165 18.8026C4.42297 18.0638 4.008 17.0618 4.008 16.017V7.947C4.00827 6.90222 4.42349 5.90032 5.16235 5.16165C5.90122 4.42297 6.90322 4.008 7.948 4.008H16.018C17.0628 4.00827 18.0647 4.42349 18.8034 5.16235C19.542 5.90122 19.957 6.90322 19.957 7.948V16.018V16.017Z" fill="#475569"/>
                <path d="M11.9818 6.81885C10.6133 6.82096 9.30136 7.36563 8.33372 8.33345C7.36609 9.30127 6.82168 10.6133 6.81982 11.9818C6.82141 13.3508 7.36585 14.6632 8.33372 15.6312C9.3016 16.5993 10.6139 17.144 11.9828 17.1458C13.3519 17.1443 14.6645 16.5997 15.6326 15.6316C16.6007 14.6635 17.1452 13.3509 17.1468 11.9818C17.1447 10.6129 16.5998 9.30073 15.6315 8.33304C14.6633 7.36535 13.3507 6.82117 11.9818 6.81985V6.81885ZM11.9818 15.1378C11.1451 15.1378 10.3426 14.8054 9.7509 14.2138C9.15922 13.6221 8.82682 12.8196 8.82682 11.9828C8.82682 11.1461 9.15922 10.3436 9.7509 9.75193C10.3426 9.16025 11.1451 8.82785 11.9818 8.82785C12.8186 8.82785 13.6211 9.16025 14.2127 9.75193C14.8044 10.3436 15.1368 11.1461 15.1368 11.9828C15.1368 12.8196 14.8044 13.6221 14.2127 14.2138C13.6211 14.8054 12.8186 15.1378 11.9818 15.1378Z" fill="#475569"/>
                <path d="M17.1559 8.09509C17.8391 8.09509 18.3929 7.54127 18.3929 6.85809C18.3929 6.17492 17.8391 5.62109 17.1559 5.62109C16.4728 5.62109 15.9189 6.17492 15.9189 6.85809C15.9189 7.54127 16.4728 8.09509 17.1559 8.09509Z" fill="#475569"/>
              </svg>
            </a>
            <a href="#" aria-label="TikTok" className="transition-colors hover:text-[#0D47A1]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_2498_10299)">
                  <rect width="24" height="24" rx="5" fill="white"/>
                  <path d="M13.5 0H16.47C16.686 1.0725 17.28 2.4255 18.3225 3.768C19.3425 5.0835 20.6955 6 22.5 6V9C19.8705 9 17.895 7.779 16.5 6.2565V16.5C16.5 17.9834 16.0601 19.4334 15.236 20.6668C14.4119 21.9001 13.2406 22.8614 11.8701 23.4291C10.4997 23.9968 8.99168 24.1453 7.53683 23.8559C6.08197 23.5665 4.7456 22.8522 3.6967 21.8033C2.64781 20.7544 1.9335 19.418 1.64411 17.9632C1.35472 16.5083 1.50325 15.0003 2.07091 13.6299C2.63856 12.2594 3.59986 11.0881 4.83323 10.264C6.0666 9.43987 7.51664 9 9 9V12C8.10999 12 7.23996 12.2639 6.49994 12.7584C5.75992 13.2529 5.18314 13.9557 4.84255 14.7779C4.50195 15.6002 4.41284 16.505 4.58647 17.3779C4.7601 18.2508 5.18869 19.0526 5.81802 19.682C6.44736 20.3113 7.24918 20.7399 8.1221 20.9135C8.99501 21.0872 9.89981 20.9981 10.7221 20.6575C11.5443 20.3169 12.2472 19.7401 12.7416 19.0001C13.2361 18.26 13.5 17.39 13.5 16.5V0Z" fill="#475569"/>
                </g>
                <defs>
                  <clipPath id="clip0_2498_10299">
                    <rect width="24" height="24" rx="5" fill="white"/>
                  </clipPath>
                </defs>
              </svg>         
            </a>
          </div>
        </section>

        <FooterColumn title="PRODUCT">
          <ul>{PRODUCT_LINKS.map(([label, to]) => <FooterLink key={label} to={to}>{label}</FooterLink>)}</ul>
        </FooterColumn>

        <FooterColumn title="Dịch vụ nổi bật">
          <ul>{SERVICE_LINKS.map(([label, to]) => <FooterLink key={label} to={to}>{label}</FooterLink>)}</ul>
        </FooterColumn>

        <FooterColumn title="Thông tin Trung tâm">
          <ul>
            <FooterLink>Về chúng tôi</FooterLink>
            <FooterLink>Liên hệ</FooterLink>
            <FooterLink>
              <span className="flex items-center gap-2">
                Danh sách chi nhánh <span aria-hidden="true">→</span>
              </span>
            </FooterLink>
          </ul>
          {!isBlue && (
            <p className="py-2 text-[16px] leading-[1.4]">
              <strong>Hotline:</strong> 086 8686868
            </p>
          )}
          <p className="py-2 text-[16px] leading-[1.4]">
            <strong>Giờ làm việc:</strong>
            <br />
            Thứ 2 - Chủ nhật: 8:00 - 20:00
            <br />
            Cấp cứu 24/7
          </p>
        </FooterColumn>

        <FooterColumn title="Hỗ trợ khách hàng">
          <ul>{SUPPORT_LINKS.map((label) => <FooterLink key={label}>{label}</FooterLink>)}</ul>
        </FooterColumn>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex h-[40px] items-center justify-center bg-[#B3E5FC]">
        <p className="text-[16px] leading-[1.4] text-[rgba(0,0,0,0.6)]">
          © 2026 Dr.Pet's House. Bản quyền thuộc về Dr.Pet's House.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
