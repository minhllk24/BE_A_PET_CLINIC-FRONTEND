import { homeImages } from "../../assets/homeImages";
import cartIcon from "../../assets/images/cart_icon.svg";
import YellowButton from "../home/YellowButton";

const NAV_LINKS = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Dịch vụ thú y",
    href: "/services",
    children: [
      { label: "Khám & Điều trị", href: "/services/kham-dieu-tri" },
      { label: "Grooming & Spa", href: "/services/groomng-spa" },
    ],
  },
  {
    label: "Mua sắm",
    href: "/petshop",
    children: [
      { label: "Thực ăn", href: "/petshop/thuc-an" },
      { label: "Đồ dùng thiết yếu", href: "/petshop/do-dung-thiet-yeu" },
      { label: "Chăm sóc sức khỏe", href: "/petshop/cham-soc-suc-khoe" },
      { label: "Đồ chơi", href: "/petshop/do-choi" },
      { label: "Phụ kiện", href: "/petshop/phu-kien" },
    ],
  },
  {
    label: "Cứu trợ",
    href: "/rescue",
    children: [
      { label: "Thông tin cứu trợ", href: "/rescue/info" },
      { label: "Nhận nuôi", href: "/rescue/adoption" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
    children: [
      { label: "Chia sẻ kiến thức", href: "/blog/kien-thuc" },
      { label: "Cẩm nang sơ cứu", href: "/blog/so-cuu" },
    ],
  },
  { label: "Về chúng tôi", href: "/about" },
  { label: "Liên hệ", href: "/contact" },
];

function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="mx-auto flex max-w-page items-center justify-between gap-6 px-6 py-3 md:px-20">
        <a href="/" className="shrink-0">
          <img
            src={homeImages.logo}
            alt="Dr. Pet's House"
            className="h-[59px] w-auto object-contain"
          />
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-[22px] lg:flex">
          {NAV_LINKS.map((item) => (
            <div key={item.label} className="group relative">
              <a
                href={item.href}
                className="inline-flex items-center py-3 text-base tracking-[0.15px] text-black transition hover:text-yellow-600"
              >
                {item.label}
              </a>

              {item.children && (
                <div className="invisible absolute left-1/2 top-full min-w-[260px] -translate-x-1/2 translate-y-3 rounded-2xl border border-gray-100 bg-white p-4 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <ul className="space-y-1">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a
                          href={child.href}
                          className="block rounded-xl px-4 py-3 text-[15px] text-gray-700 transition hover:bg-yellow-50 hover:text-yellow-600"
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-6">
          <a href="/booking">
            <YellowButton className="hidden h-10 w-[150px] sm:inline-flex">
              ĐẶT LỊCH
            </YellowButton>
          </a>

          <a href="/sign-in">
            <YellowButton
              variant="outline"
              className="hidden h-10 w-[150px] sm:inline-flex"
            >
              ĐĂNG NHẬP
            </YellowButton>
          </a>

          <a href="/cart" className="shrink-0" aria-label="Giỏ hàng">
            <img src={cartIcon} alt="" className="h-9 w-9" />
          </a>
        </div>
      </div>
    </header>
  );
}

export default NavBar;