import SectionTitle from "../home/SectionTitle";

const SERVICES_LIST = [
  {
    id: 1,
    title: "Tắm & Sấy khô",
    description: "Sử dụng các dòng sữa tắm cao cấp, phù hợp với từng loại da và màu lông của bé.",
    price: "Từ 50.000 đ",
    icon: (
      <svg className="h-8 w-8 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Massage chuyên sâu",
    description: "Kỹ thuật massage nhẹ nhàng giúp pet giải tỏa áp lực, tăng cường sự gắn kết.",
    price: "Từ 50.000 đ",
    icon: (
      <svg className="h-8 w-8 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Vệ sinh răng miệng",
    description: "Đánh răng loại bỏ mảng bám và xịt thơm miệng khử mùi hôi.",
    price: "Từ 30.000 đ",
    icon: (
      <svg className="h-8 w-8 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Cắt & mài móng",
    description: "Cắt ngắn móng tránh đâm vào thịt và dùng máy mài mịn các góc sắc nhọn.",
    price: "Từ 30.000 đ",
    icon: (
      <svg className="h-8 w-8 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 11-4.243 4.243 3 3 0 014.243-4.243zm0-5.758a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243z" />
      </svg>
    )
  },
  {
    id: 5,
    title: "Chăm sóc bàn chân",
    description: "Cạo vệ sinh kẽ móng, chăm sóc bảo vệ phần đệm thịt.",
    price: "Từ 30.000 đ",
    icon: (
      <svg className="h-8 w-8 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    )
  },
  {
    id: 6,
    title: "Điều trị ký sinh trùng",
    description: "Tiêu diệt ký sinh trùng và làm sạch môi trường sống để ngăn ngừa tái nhiễm.",
    price: "Từ 80.000 đ",
    icon: (
      <svg className="h-8 w-8 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    id: 7,
    title: "Cắt tỉa tạo kiểu",
    description: "Cắt tỉa lông theo yêu cầu hoặc theo form chuẩn của từng giống loài.",
    price: "Từ 50.000 đ",
    icon: (
      <svg className="h-8 w-8 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 8,
    title: "Nhuộm lông thời trang",
    description: "Sử dụng thuốc nhuộm organic 100% an toàn cho thú cưng, tạo điểm nhấn đặc biệt.",
    price: "Từ 80.000 đ",
    icon: (
      <svg className="h-8 w-8 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  },
  {
    id: 9,
    title: "Vắt tuyến hôi",
    description: "Giúp thú cưng không bị ngứa ngáy hậu môn, hạn chế mùi hôi đặc trưng cơ thể.",
    price: "Từ 50.000 đ",
    icon: (
      <svg className="h-8 w-8 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547" />
      </svg>
    )
  }
];

function GroomingServices() {
  return (
    <section id="danh-sach-dich-vu" className="relative w-full bg-white py-16 md:py-24 border-t border-slate-100">
      <div className="relative mx-auto flex max-w-page flex-col items-center gap-16 px-6 md:px-20">
        
        {/* Title Section */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            {/* Vector vàng trang trí tiêu đề */}
            <svg
              className="absolute left-1/2 top-[55px] z-0 h-[15px] w-[179px] -translate-x-1/2"
              viewBox="0 0 182 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M0.213867 5.64588C23.7047 3.62998 109.211 -0.290806 179.214 5.6459C142.876 5.6459 106.198 6.7462 75.7139 13"
                stroke="#FDD835"
                strokeWidth="5"
                strokeLinejoin="round"
              />
            </svg>
            <SectionTitle
              subtitle="Dr.Pet's House cung cấp trọn gói các dịch vụ chăm sóc và làm đẹp chuyên sâu tốt nhất cho thú cưng của bạn. Từng quy trình đều được thực hiện chu đáo bởi các chuyên viên giàu kinh nghiệm."
              className="relative z-10 text-center"
            >
              <>
                <span className="font-bold block">Dịch vụ</span>
                <span className="font-bold block">chúng tôi cung cấp</span>
              </>
            </SectionTitle>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES_LIST.map((service) => (
            <article 
              key={service.id} 
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#F5FBFD]/60 p-8 border border-blue-50/50 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-lg hover:border-blue-100/80"
            >
              {/* Number and Icon Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm border border-blue-50 transition-colors duration-300 group-hover:bg-[#E5F6FD]">
                  {service.icon}
                </div>
                <span className="font-display text-4xl font-extrabold text-blue-100 transition-colors duration-300 group-hover:text-blue-200">
                  {String(service.id).padStart(2, "0")}
                </span>
              </div>

              {/* Text content */}
              <div>
                <h3 className="mb-3 text-xl font-bold text-black transition-colors duration-300 group-hover:text-blue-900">
                  {service.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </div>

              {/* Price footer */}
              <div className="flex items-center justify-between pt-4 border-t border-dashed border-blue-50">
                <span className="text-sm font-medium text-slate-400">Giá dịch vụ</span>
                <span className="font-display text-lg font-bold text-blue-900 bg-[#E5F6FD] px-4 py-1.5 rounded-xl transition-all duration-300 group-hover:bg-secondary group-hover:text-black">
                  {service.price}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GroomingServices;
