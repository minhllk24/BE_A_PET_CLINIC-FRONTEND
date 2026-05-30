import { homeImages } from "../../assets/homeImages";

const FOOTER_COLUMNS = [
  {
    title: "DỊCH VỤ",
    links: ["Khám & Điều trị", "Grooming & Spa", "Pet Shop", "Cứu trợ", "Đặt lịch"],
  },
  {
    title: "HỖ TRỢ",
    links: ["Trung tâm trợ giúp", "Blog", "Câu hỏi thường gặp", "Liên hệ"],
  },
  {
    title: "TÀI NGUYÊN",
    links: ["Hướng dẫn chăm sóc", "Tin tức", "Chính sách"],
  },
  {
    title: "CÔNG TY",
    links: ["Về chúng tôi", "Tuyển dụng", "Đối tác", "Sự kiện"],
  },
];

const SOCIAL = ["YouTube", "Facebook", "Twitter", "Instagram", "LinkedIn"];

function Footer() {
  return (
    <footer className="w-full bg-[#e5f6fd]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 pb-12 pt-16 md:px-[120px] md:pt-20">
        <div className="grid gap-10 border-b border-slate-200 pb-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <a href="/" className="inline-block">
              <img
                src={homeImages.logo}
                alt="Dr. Pet's House"
                className="h-30 w-auto object-contain"
              />
            </a>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-2 py-3 text-xl font-bold text-blue-900">
                {col.title}
              </h3>
              <ul className="space-y-1">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="block py-3 text-base text-black/87 hover:text-blue-900"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-base text-slate-600">
            © 2026 Dr. Pet&apos;s House. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            {["Terms", "Privacy", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-base text-slate-600 hover:text-blue-900"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            {SOCIAL.map((name) => (
              <a
                key={name}
                href="#"
                className="flex h-6 w-6 items-center justify-center text-blue-900 hover:opacity-70"
                aria-label={name}
              >
                <span className="sr-only">{name}</span>
                <span className="text-sm font-bold" aria-hidden>
                  {name[0]}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
