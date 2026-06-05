import { useMemo, useState } from "react";
import NavBarAuthenticated from "../../components/Navbar/NavBarAuthenticated";
import Footer from "../../components/Footer/Footer";
import BookingPaymentStep, {
  BankTransferModal,
  CreditCardModal,
} from "../../components/booking/BookingPaymentStep";
import BookingSuccessModal from "../../components/booking/BookingSuccessModal";
import { MOCK_PETS } from "../../data/mockPets";
import { bookingImages } from "../../assets/bookingImages";

import buddyImg from "../../assets/images/pets/buddy.jpg";

const {
  serviceSpaGroomingIcon,
  serviceVeterinaryClinicIcon,
  serviceListIcon,
  serviceInputSearchIcon,
  serviceSelectedCheck,
  informationStepCheck,
  informationSelectedPetPhoto,
  petPickerMaxPhoto,
  petPickerLunaPhoto,
  petPickerCloseIcon,
  paymentCalendarIcon,
  paymentPersonIcon,
  paymentPetIcon,
  paymentPhoneIcon,
  onlineMomoLogo,
  onlineZalopayLogo,
  onlineVnpayLogo,
  onlineBankIcon,
  onlineCardIcon,
  bankPopupQrPlaceholder,
  bankPopupCopyIcon,
  cardPopupVisa,
  cardPopupMastercard,
  cardPopupJcb,
  cardPopupUnionpay,
  cardPopupAmex,
  cardPopupDiscover,
  cardPopupChevron,
  successPanelBackground,
  successCheckGroup,
} = bookingImages;

const petImages = {
  Buddy: buddyImg,
  Luna: petPickerLunaPhoto,
  Max: petPickerMaxPhoto,
  Snow: informationSelectedPetPhoto,
};

const services = [
  {
    id: "bath",
    name: "Tắm sấy khử mùi",
    desc: "Vệ sinh sạch sẽ, sấy khô và xịt nước hoa cao cấp",
    price: 150000,
  },
  {
    id: "trim",
    name: "Cắt tỉa lông tạo kiểu",
    desc: "Tạo kiểu theo yêu cầu, tỉa gọn chân và bụng",
    price: 250000,
  },
  {
    id: "nails",
    name: "Cắt móng & Mài dũa",
    desc: "Cắt tỉa móng gọn gàng, tránh trầy xước",
    price: 60000,
  },
];

const paymentMethods = [
  { id: "momo", label: "MoMo", icon: onlineMomoLogo },
  { id: "zalopay", label: "ZaloPay", icon: onlineZalopayLogo },
  { id: "vnpay", label: "VNPay", icon: onlineVnpayLogo },
  { id: "bank", label: "Chuyển khoản ngân hàng", icon: onlineBankIcon },
  { id: "atm", label: "Thẻ ATM", icon: onlineCardIcon },
  { id: "card", label: "Thẻ Tín dụng/Ghi nợ", icon: onlineCardIcon },
];

const formatMoney = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

const getDateKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const formatAppointmentDate = (date, slot) => {
  if (!date) {
    return slot ? `Chưa chọn ngày • ${slot}` : "Chưa chọn ngày";
  }

  return `${date.getDate()} tháng ${date.getMonth() + 1}, ${date.getFullYear()}${slot ? ` • ${slot}` : ""}`;
};

function AssetIcon({ src, alt = "", className = "h-5 w-5" }) {
  return <img src={src} alt={alt} className={className} />;
}

function Stepper({ step }) {
  const steps = ["Lựa chọn dịch vụ", "Điền thông tin", "Thanh toán"];

  return (
    <div className="mx-auto flex w-full max-w-xl items-start justify-center px-4 py-5">
      {steps.map((label, index) => {
        const current = index + 1;
        const complete = current < step;
        const active = current === step;

        return (
          <div key={label} className="flex items-start">
            <div className="flex min-w-[104px] flex-col items-center">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-bold ${
                  complete
                    ? "border-blue-900 bg-blue-900 text-white"
                    : active
                      ? "border-blue-900 bg-white text-blue-900"
                      : "border-slate-300 bg-white text-slate-400"
                }`}
              >
                {complete ? <AssetIcon src={informationStepCheck} className="h-4 w-4" /> : ""}
              </span>
              <span
                className={`mt-2 text-center text-xs font-bold ${
                  active || complete ? "text-blue-900" : "text-slate-500"
                }`}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <span
                className={`mt-3 h-0.5 w-28 ${
                  current < step ? "bg-blue-900" : "bg-[#e5e1f0]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <section
      className={`rounded-2xl bg-white shadow-[0_4px_13px_rgba(144,202,249,0.85)] ${className}`}
    >
      {children}
    </section>
  );
}

function BookingCalendar({ selectedDate, onSelect }) {
  const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const [viewedMonth, setViewedMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const calendarCells = useMemo(() => {
    const year = viewedMonth.getFullYear();
    const month = viewedMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const mondayOffset = (firstDay.getDay() + 6) % 7;
    const startDate = new Date(year, month, 1 - mondayOffset);

    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + index);

      return {
        date,
        key: getDateKey(date),
        inCurrentMonth: date.getMonth() === month,
      };
    });
  }, [viewedMonth]);

  const todayKey = getDateKey(new Date());
  const selectedDateKey = selectedDate ? getDateKey(selectedDate) : null;

  const changeMonth = (offset) => {
    setViewedMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  };

  const selectDate = (date) => {
    onSelect(date);
    setViewedMonth(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900">
          Tháng {viewedMonth.getMonth() + 1}, {viewedMonth.getFullYear()}
        </h3>
        <div className="flex gap-3 text-lg text-slate-500">
          <button type="button" onClick={() => changeMonth(-1)} aria-label="Tháng trước">‹</button>
          <button type="button" onClick={() => changeMonth(1)} aria-label="Tháng sau">›</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-4 text-center text-sm">
        {days.map((day) => (
          <span key={day} className="font-bold text-slate-300">{day}</span>
        ))}
        {calendarCells.map((cell) => {
          const active = selectedDateKey === cell.key;
          const today = todayKey === cell.key;

          return (
            <button
              key={cell.key}
              type="button"
              onClick={() => selectDate(cell.date)}
              className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition ${
                active
                  ? "bg-blue-900 text-white"
                  : cell.inCurrentMonth
                    ? "text-slate-900 hover:bg-blue-50 hover:text-blue-900"
                    : "text-slate-300 hover:bg-slate-100"
              } ${today && !active ? "ring-1 ring-blue-900" : ""}`}
            >
              {cell.date.getDate()}
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function TimeSlots({ selectedSlot, onSelect }) {
  const slots = [
    "08:00 - 09:00",
    "09:30 - 10:30",
    "11:00 - 12:00",
    "13:30 - 14:30",
    "15:00 - 16:00",
    "16:00 - 17:00",
  ];

  return (
    <Card className="p-6">
      <h3 className="mb-5 flex items-center gap-2 text-xl font-bold text-blue-900">
        <span>◷</span> Khung giờ trống
      </h3>
      <div className="space-y-3">
        {slots.map((slot) => {
          const disabled = slot === "11:00 - 12:00";
          const active = selectedSlot === slot;
          return (
            <button
              key={slot}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(slot)}
              className={`flex w-full items-center justify-between rounded-2xl px-5 py-3 text-left text-sm font-semibold transition ${
                active
                  ? "bg-blue-900 text-white shadow"
                  : disabled
                    ? "bg-slate-50 text-slate-300"
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
              }`}
            >
              <span>{slot}</span>
              {disabled && <span className="text-[10px] uppercase text-red-600">Hết chỗ</span>}
              {active && <span>✓</span>}
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function ServiceSelection({
  selectedServiceType,
  setSelectedServiceType,
  selectedServices,
  setSelectedServices,
  selectedDate,
  setSelectedDate,
  selectedSlot,
  setSelectedSlot,
  onNext,
}) {
  const total = useMemo(
    () => services.filter((item) => selectedServices.includes(item.id)).reduce((sum, item) => sum + item.price, 0),
    [selectedServices],
  );

  const toggleService = (id) => {
    setSelectedServices((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const serviceTypes = [
    {
      id: "clinic",
      title: "Khám và tiêm phòng",
      desc: "Khám sức khỏe và tiêm phòng định kỳ",
      icon: serviceVeterinaryClinicIcon,
    },
    {
      id: "grooming",
      title: "Spa & Grooming",
      desc: "Tắm, cắt tỉa, làm đẹp cho thú cưng",
      icon: serviceSpaGroomingIcon,
    },
  ];

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_320px]">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {serviceTypes.map((serviceType) => {
              const active = selectedServiceType === serviceType.id;

              return (
                <button
                  key={serviceType.id}
                  type="button"
                  onClick={() => setSelectedServiceType(serviceType.id)}
                  className={`relative rounded-2xl border-2 bg-white p-7 text-left shadow-[0_4px_13px_rgba(144,202,249,0.85)] transition ${
                    active ? "border-blue-900" : "border-transparent"
                  }`}
                >
                  {active && <img src={serviceSelectedCheck} alt="" className="absolute right-4 top-4 h-4 w-4" />}
                  <div className="flex items-center gap-4">
                    <img src={serviceType.icon} alt="" className="h-12 w-12 rounded object-cover shadow" />
                    <h3 className={`text-xl font-bold ${active ? "text-blue-900" : "text-slate-900"}`}>
                      {serviceType.title}
                    </h3>
                  </div>
                  <p className="mt-5 text-base text-slate-600">{serviceType.desc}</p>
                </button>
              );
            })}
          </div>

          <Card className="p-6">
            <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-blue-900">
              <AssetIcon src={serviceListIcon} /> Danh sách dịch vụ chi tiết
            </h2>
            <div className="relative mb-6">
              <img src={serviceInputSearchIcon} alt="" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2" />
              <input
                type="search"
                placeholder="Tìm kiếm dịch vụ..."
                className="w-full rounded-lg border border-slate-300 py-3 pl-12 pr-5 text-base outline-none focus:border-blue-900"
              />
            </div>
            <div className="max-h-[320px] space-y-4 overflow-y-auto pr-2">
              {services.map((service) => {
                const active = selectedServices.includes(service.id);
                return (
                  <div
                    key={service.id}
                    className={`flex items-center justify-between rounded-2xl p-5 ${
                      active ? "border-l-4 border-blue-900 bg-[#d5e4f3]" : "bg-[#f2f4f6]"
                    }`}
                  >
                    <div>
                      <h3 className="font-bold text-slate-900">{service.name}</h3>
                      <p className="text-sm text-slate-700">{service.desc}</p>
                      <p className="font-bold text-blue-900">{formatMoney(service.price)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleService(service.id)}
                      className={`flex min-w-[68px] items-center justify-center rounded-full border px-5 py-2 text-sm font-bold ${
                        active ? "border-blue-900 bg-blue-900 text-white" : "border-blue-900 bg-white text-blue-900"
                      }`}
                    >
                      {active ? <span className="relative z-10 text-base leading-none">✓</span> : "Chọn"}                    </button>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-100 p-5 shadow">
              <span className="font-bold text-slate-900">Tổng tiền tạm tính</span>
              <div className="text-right">
                <p className="text-2xl font-black text-blue-900">{formatMoney(total)}</p>
                <p className="text-xs text-slate-500">(Chưa bao gồm thuế)</p>
              </div>
            </div>
          </Card>
        </div>
        <aside className="space-y-6">
          <BookingCalendar selectedDate={selectedDate} onSelect={setSelectedDate} />
          <TimeSlots selectedSlot={selectedSlot} onSelect={setSelectedSlot} />
        </aside>
      </div>
      <FlowButtons onNext={onNext} nextDisabled={selectedServices.length === 0 || !selectedDate || !selectedSlot} />
    </>
  );
}

function PetSummaryCard({ selectedPet, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex min-h-[116px] items-center gap-5 rounded-2xl bg-white p-6 text-left shadow-[0_4px_13px_rgba(144,202,249,0.85)] ${
        active ? "border-2 border-blue-900" : "border-2 border-transparent"
      }`}
    >
      {active && <img src={serviceSelectedCheck} alt="" className="absolute right-4 top-4 h-5 w-5" />}
      {selectedPet ? (
        <>
          <img
            src={selectedPet.name === "Max" ? informationSelectedPetPhoto : selectedPet.avatar || petImages[selectedPet.name] || buddyImg}
            alt={selectedPet.name}
            className="h-20 w-20 rounded-full object-cover"
          />
          <span>
            <strong className="block text-lg text-slate-900">{selectedPet.name}</strong>
            <span className="text-sm text-slate-600">{selectedPet.breed} • {selectedPet.age}</span>
          </span>
        </>
      ) : (
        <span>
          <strong className="block text-xl text-slate-900">Chọn Hồ sơ thú cưng</strong>
          <span className="mt-3 block text-base text-slate-600">Bạn đã tạo Hồ sơ thú cưng trước đó</span>
        </span>
      )}
    </button>
  );
}

function InfoForm({ selectedPet, setSelectedPet, onBack, onNext }) {
  const [showPetPicker, setShowPetPicker] = useState(false);

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_390px]">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <PetSummaryCard
              selectedPet={selectedPet}
              active={Boolean(selectedPet)}
              onClick={() => setShowPetPicker(true)}
            />
            <button
              type="button"
              onClick={() => setSelectedPet(null)}
              className={`relative min-h-[116px] rounded-2xl bg-white p-6 text-left shadow-[0_4px_13px_rgba(144,202,249,0.85)] ${
                !selectedPet ? "border-2 border-blue-900" : "border-2 border-transparent"
              }`}
            >
              {!selectedPet && <img src={serviceSelectedCheck} alt="" className="absolute right-4 top-4 h-5 w-5" />}
              <strong className={`block text-xl ${!selectedPet ? "text-blue-900" : "text-slate-900"}`}>
                Thú cưng khác
              </strong>
              <span className="mt-3 block text-base text-slate-600">Bạn chưa tạo Hồ sơ thú cưng cho bé này</span>
            </button>
          </div>

          <Card className="p-8">
            <h2 className="mb-5 text-xl font-black text-blue-900">THÔNG TIN THÚ CƯNG</h2>
            <div className="grid gap-5 md:grid-cols-6">
              <Field className="md:col-span-4" label="Tên thú cưng" required />
              <Field className="md:col-span-2" label="Loài" as="select" options={["Chó", "Mèo", "Khác"]} required />
              <Field className="md:col-span-2" label="Giống" />
              <Field className="md:col-span-2" label="Tuổi" suffix="tuổi" />
              <Field className="md:col-span-2" label="Cân nặng" suffix="kg" required />
              <div className="md:col-span-3">
                <p className="mb-3 text-sm font-medium text-slate-900">Giới tính</p>
                <div className="flex gap-5 text-sm">
                  <label><input type="radio" name="gender" className="mr-2 accent-blue-900" />Đực</label>
                  <label><input type="radio" name="gender" className="mr-2 accent-blue-900" />Cái</label>
                </div>
              </div>
              <div className="md:col-span-3">
                <p className="mb-3 text-sm font-medium text-slate-900">Tình trạng sức khỏe <span className="text-red-500">*</span></p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <label><input type="radio" name="status" className="mr-2 h-4 w-4 cursor-pointer accent-blue-900 text-blue-900 border-gray-300 focus:ring-blue-900" />Bình thường</label>
                  <label><input type="radio" name="status" className="mr-2 h-4 w-4 cursor-pointer accent-blue-900 text-blue-900 border-gray-300 focus:ring-blue-900" />Đang điều trị</label>
                  <label><input type="radio" name="status" className="mr-2 h-4 w-4 cursor-pointer accent-blue-900 text-blue-900 border-gray-300 focus:ring-blue-900" />Có bệnh nền</label>
                </div>
              </div>
              <label className="md:col-span-6">
                <span className="mb-2 block text-sm font-medium text-slate-900">Thông tin thêm</span>
                <textarea 
                placeholder="Nhập ghi chú, yêu cầu đặc biệt hoặc thông tin bổ sung tại đây..." 
                className="h-15 w-full text-sm resize-none rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-900" />
              </label>
            </div>
          </Card>
        </div>

        <Card className="p-8">
          <h2 className="mb-5 text-xl font-black text-blue-900">THÔNG TIN CHỦ THÚ CƯNG</h2>
          <div className="grid gap-5">
            <Field label="Họ và tên" required/>
            <Field label="Số điện thoại" required/>
            <Field label="Email"/>
            <Field label="Lựa chọn chi nhánh gần bạn nhất" as="select" required defaultValue="Phường Linh Xuân, TP. Thủ Đức, TP. Hồ Chí Minh" options={["Phường Linh Xuân, TP. Thủ Đức, TP. Hồ Chí Minh", "Quận 1, TP. Hồ Chí Minh","Quận Gò Vấp, TP. Hồ Chí Minh", "Quận Cầu Giấy, Hà Nội","Quận Hoàng Mai, Hà Nội"]} />
            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input type="checkbox" className="mt-1" />
              <span>Tôi đồng ý với <a className="text-blue-900 underline">Chính sách Huỷ/Đổi lịch hẹn</a> tại Dr.Pet’s House</span>
            </label>
          </div>
        </Card>
      </div>
      <FlowButtons onBack={onBack} onNext={onNext} />
      {showPetPicker && (
        <PetSelectionModal
          selectedPet={selectedPet}
          onClose={() => setShowPetPicker(false)}
          onSelect={(pet) => {
            setSelectedPet(pet);
            setShowPetPicker(false);
          }}
        />
      )}
    </>
  );
}

import { ChevronDown } from "lucide-react";

function Field({
  label,
  required,
  as,
  options = [],
  suffix,
  className = "",
  defaultValue = "",
  type = "text",
}) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm font-medium text-slate-900">
        {label} {required && <span className="text-red-600">*</span>}
      </span>

      <span className="relative block">
        {as === "select" ? (
          <>
            <select
              defaultValue={defaultValue}
              required={required}
              className="h-10 w-full appearance-none rounded-2xl border border-slate-300 bg-white px-4 pr-12 text-sm outline-none focus:border-blue-900"
            >
              {options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </>
        ) : (
          <input
            type={type}
            defaultValue={defaultValue}
            required={required}
            className="h-10 w-full rounded-2xl border border-slate-300 px-4 pr-10 text-sm outline-none focus:border-blue-900"
          />
        )}

        {suffix && (
          <span className="absolute right-4 top-2.5 text-sm text-slate-600">
            {suffix}
          </span>
        )}
      </span>
    </label>
  );
}

function PetSelectionModal({ selectedPet, onSelect, onClose }) {
  const pets = [MOCK_PETS.find((pet) => pet.name === "Max") || MOCK_PETS[0], MOCK_PETS.find((pet) => pet.name === "Luna") || MOCK_PETS[1]].filter(Boolean);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-[#1b4f8a]">Chọn hồ sơ thú cưng</h2>
            <p className="text-xs font-medium text-slate-600">Chọn thú cưng muốn đặt lịch nhé</p>
          </div>
          <button type="button" onClick={onClose} className="p-1" aria-label="Đóng">
            <img src={petPickerCloseIcon} alt="" className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4 p-6">
          {pets.map((pet) => (
            <button
              key={pet.id}
              type="button"
              onClick={() => onSelect(pet)}
              className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left ${
                selectedPet?.id === pet.id ? "border-blue-900" : "border-slate-200"
              }`}
            >
              <img
                src={pet.name === "Max" ? petPickerMaxPhoto : pet.name === "Luna" ? petPickerLunaPhoto : pet.avatar || petImages[pet.name] || buddyImg}
                alt={pet.name}
                className="h-[60px] w-[60px] rounded-full object-cover"
              />
              <span className="flex-1">
                <strong className="block text-lg">{pet.name}</strong>
                <span className="text-xs font-medium text-slate-600">{pet.breed} • {pet.age}</span>
              </span>
              <span className="rounded-full bg-slate-200 px-4 py-1.5 text-xs font-bold">Chọn</span>
            </button>
          ))}
        </div>
        <div className="bg-slate-100 px-6 py-4">
          <button
            type="button"
            disabled={!selectedPet}
            onClick={onClose}
            className="w-full rounded-2xl bg-blue-900 py-3 font-bold text-white disabled:opacity-50"
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
}

function FlowButtons({ onBack, onNext, nextDisabled }) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <button
        type="button"
        onClick={onBack}
        className="rounded bg-secondary-light px-6 py-3 text-sm font-bold uppercase tracking-[0.46px] shadow-elevation"
      >
        ‹ Quay lại
      </button>
      <button
        type="button"
        disabled={nextDisabled}
        onClick={onNext}
        className="rounded bg-secondary px-6 py-3 text-sm font-bold uppercase tracking-[0.46px] shadow-elevation disabled:cursor-not-allowed disabled:opacity-50"
      >
        Tiếp tục ›
      </button>
    </div>
  );
}

function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [selectedServices, setSelectedServices] = useState(["trim"]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("13:30 - 14:30");
  const [selectedPet, setSelectedPet] = useState(null);
  const [paymentMode, setPaymentMode] = useState("store");
  const [activeModal, setActiveModal] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleConfirm = () => {
    if (paymentMode === "bank") {
      setActiveModal("bank");
      return;
    }
    if (paymentMode === "card") {
      setActiveModal("card");
      return;
    }
    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <NavBarAuthenticated />
      <main className="bg-[#e5f6fd]">
        <Stepper step={step} />
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-8 pt-6">
          {step === 1 && (
            <ServiceSelection
              selectedServiceType={selectedServiceType}
              setSelectedServiceType={setSelectedServiceType}
              selectedServices={selectedServices}
              setSelectedServices={setSelectedServices}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <InfoForm
              selectedPet={selectedPet}
              setSelectedPet={setSelectedPet}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <BookingPaymentStep
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              paymentMode={paymentMode}
              setPaymentMode={setPaymentMode}
              onBack={() => setStep(2)}
              onConfirm={handleConfirm}
            />
          )}
        </div>
        <Footer />
      </main>

      {activeModal === "bank" && <BankTransferModal onClose={() => setActiveModal(null)} />}
      {activeModal === "card" && <CreditCardModal onClose={() => setActiveModal(null)} />}
      {success && <BookingSuccessModal />}
    </div>
  );
}

export default BookingPage;
