import { useEffect, useMemo, useState } from "react";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";
import BookingPaymentStep from "../../components/booking/BookingPaymentStep";
import BookingSuccessModal from "../../components/booking/BookingSuccessModal";
import { ChevronDown, MapPin } from "lucide-react";
import {
  BOOKING_SERVICES,
  BOOKING_SERVICE_TYPES,
} from "../../data/bookingData";
import { bookingImages } from "../../assets/bookingImages";
import { formatVnd } from "../../utils/currency";

import buddyImg from "../../assets/images/pets/buddy.jpg";
import { useAuth } from "../../context/AuthContext";
import {
  bookAppointment,
  getAppointmentSlots,
  getBranches,
  getServices,
} from "../../services/bookingService";
import { getMyPets, getPetSpecies } from "../../services/petService";

const {
  serviceListIcon,
  serviceInputSearchIcon,
  serviceSelectedCheck,
  informationStepCheck,
  informationSelectedPetPhoto,
  petPickerMaxPhoto,
  petPickerLunaPhoto,
  petPickerCloseIcon,
} = bookingImages;

const petImages = {
  Buddy: buddyImg,
  Luna: petPickerLunaPhoto,
  Max: petPickerMaxPhoto,
  Snow: informationSelectedPetPhoto,
};

const BRANCH_OPTIONS = [
  "Phường Linh Xuân, TP. Thủ Đức, TP. Hồ Chí Minh",
  "Quận 1, TP. Hồ Chí Minh",
  "Quận Gò Vấp, TP. Hồ Chí Minh",
  "Quận Cầu Giấy, Hà Nội",
  "Quận Hoàng Mai, Hà Nội",
];

const formatMoney = (value) => formatVnd(value);
const DEFAULT_SERVICE_TYPE_ID = "clinic";

const createEmptyPetInfo = () => ({
  id: `other-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  name: "",
  species: "",
  breed: "",
  age: "",
  weight: "",
  gender: "",
  status: "",
  notes: "",
});

const profileToPetInfo = (pet) => ({
  id: pet.id,
  name: pet.name || "",
  species: pet.species || "",
  breed: pet.breed || "",
  age: pet.age || "",
  weight: pet.weightKg || String(pet.weight || "").replace(/[^\d.,]/g, ""),
  gender:
    pet.gender === "male" || pet.gender === "female"
      ? pet.gender
      : pet.gender === "♂"
        ? "male"
        : pet.gender === "♀"
          ? "female"
          : "",
  status:
    pet.healthStatus === "normal" || pet.healthStatus === "Bình thường"
      ? "normal"
      : pet.healthStatus === "treating" || pet.healthStatus === "Đang điều trị"
        ? "treating"
        : pet.healthStatus
          ? "chronic"
          : "",
  notes: pet.medicalNotes || "",
});

const findSpeciesId = (speciesOptions, speciesName) => {
  const normalizedName = String(speciesName || "").trim().toLowerCase();
  if (!normalizedName) return undefined;

  const aliasMap = {
    chó: ["cho", "chó", "dog", "canine"],
    mèo: ["meo", "mèo", "cat", "feline"],
  };
  const aliases = aliasMap[normalizedName] || [normalizedName];

  const matchedSpecies = speciesOptions.find((species) => {
    const backendName = String(species.species_name || species.name || "").trim().toLowerCase();
    return aliases.some((alias) => backendName === alias || backendName.includes(alias));
  });

  return matchedSpecies?.species_id || matchedSpecies?.id;
};

const toBackendHealthStatus = (status) => {
  if (status === "normal") return "healthy";
  if (status === "treating") return "treating";
  if (status === "need_recheck") return "need_recheck";
  return "unknown";
};

const isPetInfoComplete = (petInfo) =>
  petInfo.name.trim() &&
  petInfo.species &&
  String(petInfo.weight).trim() &&
  petInfo.status;

const getDateKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const getStartOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const isBeforeToday = (date) => getStartOfDay(date) < getStartOfDay(new Date());

const isToday = (date) => getDateKey(date) === getDateKey(new Date());

const getSlotStartMinutes = (slotValue) => {
  const [time] = slotValue.split(" - ");
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
};

const isSlotInPast = (slotValue, selectedDate) => {
  if (!selectedDate || !isToday(selectedDate)) {
    return false;
  }

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  return getSlotStartMinutes(slotValue) < nowMinutes;
};

const isSlotBookable = (slotValue, selectedDate, timeSlots) => {
  const slot = timeSlots.find((item) => item.value === slotValue);

  return Boolean(slot?.available && selectedDate && !isBeforeToday(selectedDate) && !isSlotInPast(slotValue, selectedDate));
};

function AssetIcon({ src, alt = "", className = "h-5 w-5" }) {
  return <img src={src} alt={alt} className={className} />;
}

function Stepper({ step }) {
  const steps = ["Lựa chọn dịch vụ", "Điền thông tin", "Thanh toán"];

  return (
    <div className="mx-auto flex w-full max-w-[320px] items-start justify-center px-0 py-5 md:max-w-[688px] md:px-0 lg:max-w-xl lg:px-4">
      {steps.map((label, index) => {
        const current = index + 1;
        const complete = current < step;
        const active = current === step;

        return (
          <div key={label} className="flex min-w-0 items-start">
            <div className="flex min-w-0 flex-1 flex-col items-center md:min-w-[94px] lg:min-w-[104px]">
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
                className={`mt-2 max-w-[94px] text-center text-xs font-bold leading-4 ${
                  active || complete ? "text-blue-900" : "text-slate-500"
                }`}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <span
                className={`mx-1 mt-3 h-[3px] w-5 md:mx-[10px] md:w-[100px] lg:w-28 ${
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

function Card({ children, className = "", ...props }) {
  return (
    <section
      className={`rounded-2xl bg-white shadow-[0_4px_13px_rgba(144,202,249,0.85)] ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}

function BookingCalendar({ selectedDate, onSelect, invalid = false }) {
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
    if (isBeforeToday(date)) {
      return;
    }

    onSelect(date);
    setViewedMonth(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  return (
    <Card
      className={`p-6 max-sm:p-6 ${invalid ? "ring-2 ring-red-500" : ""}`}
      title={invalid ? "Vui lòng điền thông tin" : undefined}
      data-booking-error={invalid ? "true" : undefined}
      tabIndex={invalid ? -1 : undefined}
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-[20px] font-bold text-slate-900">
          Tháng {viewedMonth.getMonth() + 1}, {viewedMonth.getFullYear()}
        </h3>
        <div className="flex gap-3 text-lg text-slate-500">
          <button type="button" onClick={() => changeMonth(-1)} aria-label="Tháng trước">‹</button>
          <button type="button" onClick={() => changeMonth(1)} aria-label="Tháng sau">›</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-sm md:gap-4">
        {days.map((day) => (
          <span key={day} className="font-bold text-slate-300">{day}</span>
        ))}
        {calendarCells.map((cell) => {
          const active = selectedDateKey === cell.key;
          const today = todayKey === cell.key;
          const disabled = isBeforeToday(cell.date);

          return (
            <button
              key={cell.key}
              type="button"
              disabled={disabled}
              onClick={() => selectDate(cell.date)}
              className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition ${
                active
                  ? "bg-blue-900 text-white"
                  : disabled
                    ? "cursor-not-allowed text-slate-300 opacity-50"
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

function TimeSlots({ selectedDate, selectedSlot, onSelect, timeSlots, invalid = false }) {
  return (
    <Card
      className={`flex h-full min-h-0 flex-col p-6 ${invalid ? "ring-2 ring-red-500" : ""}`}
      title={invalid ? "Vui lòng điền thông tin" : undefined}
      data-booking-error={invalid ? "true" : undefined}
      tabIndex={invalid ? -1 : undefined}
    >
      <h3 className="mb-5 flex items-center gap-2 text-xl font-bold text-blue-900">
        <span>◷</span> Khung giờ trống
      </h3>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
        {timeSlots.map((slot) => {
          const disabled = !slot.available || !selectedDate || isBeforeToday(selectedDate) || isSlotInPast(slot.value, selectedDate);
          const active = selectedSlot === slot.value;
          return (
            <button
              key={slot.value}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(slot.value)}
              className={`flex w-full items-center justify-between rounded-2xl px-5 py-3 text-left text-sm font-semibold transition ${
                active
                  ? "bg-blue-900 text-white shadow"
                  : disabled
                    ? "bg-slate-50 text-slate-300"
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
              }`}
            >
              <span>{slot.value}</span>
              {disabled ? (
                <span className="text-[10px] uppercase text-red-600">
                  {slot.bookedCount >= slot.maxAppointments ? "Hết chỗ" : "Không khả dụng"}
                </span>
              ) : (
                <span className="text-[10px] uppercase opacity-80">
                  Còn {slot.maxAppointments - slot.bookedCount}/{slot.maxAppointments}
                </span>
              )}
              {active && <span>✓</span>}
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function BranchSelectionCard({ selectedBranch, onSelect, branches, invalid = false }) {
  return (
    <Card
      className={`h-full p-6 ${invalid ? "ring-2 ring-red-500" : ""}`}
      title={invalid ? "Vui lòng điền thông tin" : undefined}
      data-booking-error={invalid ? "true" : undefined}
      tabIndex={invalid ? -1 : undefined}
    >
      <label className="block">
        <span className="mb-4 flex items-center gap-2 text-xl font-bold text-blue-900">
          <MapPin size={22} strokeWidth={2.2} />
          Chi nhánh
        </span>
        <span className="relative block">
          <select
            value={selectedBranch}
            onChange={(event) => onSelect(event.target.value)}
            className={`h-12 w-full appearance-none rounded-2xl border bg-[#f2f4f6] px-4 pr-12 text-sm font-semibold text-slate-800 outline-none transition ${
              invalid ? "border-red-500 ring-1 ring-red-500" : "border-transparent focus:border-blue-900"
            }`}
          >
            <option value="" disabled>Chọn chi nhánh</option>
            {branches.map((branch) => (
              <option key={branch.id || branch} value={branch.id || branch}>{branch.label || branch}</option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
          />
        </span>
      </label>
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
  ownerInfo,
  setOwnerInfo,
  branches,
  services,
  timeSlots,
  slotsLoading,
  onNext,
}) {
  const [validationAttempted, setValidationAttempted] = useState(false);
  const visibleServices = useMemo(
    () => services.filter((service) => !selectedServiceType || service.serviceTypeId === selectedServiceType),
    [selectedServiceType, services],
  );
  const total = useMemo(
    () => services.filter((item) => selectedServices.includes(item.id)).reduce((sum, item) => sum + item.price, 0),
    [selectedServices, services],
  );

  const toggleService = (id) => {
    setSelectedServices((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const selectBranch = (branch) => {
    setOwnerInfo((current) => ({ ...current, branch }));
    setSelectedSlot(null);
  };

  const selectDate = (date) => {
    setSelectedDate(date);
    setSelectedSlot((current) => {
      return current && isSlotBookable(current, date, timeSlots) ? current : null;
    });
  };

  const selectServiceType = (serviceTypeId) => {
    setSelectedServiceType(serviceTypeId);
    setSelectedSlot(null);
    setSelectedServices((current) => {
      const allowedServiceIds = new Set(
        services.filter((service) => service.serviceTypeId === serviceTypeId).map((service) => service.id),
      );

      return current.filter((serviceId) => allowedServiceIds.has(serviceId));
    });
  };

  const dateBookable = selectedDate && !isBeforeToday(selectedDate);
  const slotBookable = selectedSlot && isSlotBookable(selectedSlot, selectedDate, timeSlots);

  const handleNext = () => {
    if (selectedServiceType && selectedServices.length > 0 && ownerInfo.branch && dateBookable && slotBookable) {
      onNext();
      return;
    }

    setValidationAttempted(true);
    window.setTimeout(() => {
      const firstInvalid = document.querySelector('[data-booking-error="true"]');
      firstInvalid?.focus();
      firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  };

  return (
    <>
      <div className="grid items-stretch gap-5 md:gap-6 lg:grid-cols-[minmax(0,2fr)_320px]">
        <div
          className={`grid h-full gap-3 rounded-2xl md:grid-cols-2 md:gap-4 lg:gap-6 ${
            validationAttempted && !selectedServiceType ? "ring-2 ring-red-500" : ""
          }`}
          title={validationAttempted && !selectedServiceType ? "Vui lòng điền thông tin" : undefined}
          data-booking-error={validationAttempted && !selectedServiceType ? "true" : undefined}
          tabIndex={validationAttempted && !selectedServiceType ? -1 : undefined}
        >
          {BOOKING_SERVICE_TYPES.map((serviceType) => {
            const active = selectedServiceType === serviceType.id;

            return (
              <button
                key={serviceType.id}
                type="button"
                onClick={() => selectServiceType(serviceType.id)}
                className={`relative h-full rounded-2xl border-2 bg-white p-[26px] text-left shadow-[0_4px_13px_rgba(144,202,249,0.85)] transition ${
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
                <p className="mt-3 text-base leading-6 text-slate-600 lg:mt-5">{serviceType.desc}</p>
              </button>
            );
          })}
        </div>

        <BranchSelectionCard
          selectedBranch={ownerInfo.branch}
          onSelect={selectBranch}
          branches={branches}
          invalid={validationAttempted && !ownerInfo.branch}
        />

        <Card
          className={`flex h-[757px] flex-col p-6 lg:h-[744px] ${validationAttempted && selectedServices.length === 0 ? "ring-2 ring-red-500" : ""}`}
          title={validationAttempted && selectedServices.length === 0 ? "Vui lòng điền thông tin" : undefined}
          data-booking-error={validationAttempted && selectedServices.length === 0 ? "true" : undefined}
          tabIndex={validationAttempted && selectedServices.length === 0 ? -1 : undefined}
        >
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
          <div className="min-h-0 flex-1 space-y-[10px] overflow-y-auto pr-1 md:pr-2">
            {visibleServices.map((service) => {
              const active = selectedServices.includes(service.id);
              return (
                <div
                  key={service.id}
                  className={`flex items-center justify-between gap-3 rounded-2xl p-5 ${
                    active ? "border-l-4 border-blue-900 bg-[#d5e4f3]" : "bg-[#f2f4f6]"
                  }`}
                >
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 md:text-base">{service.name}</h3>
                    <p className="text-xs font-medium leading-4 text-slate-700 md:text-sm">{service.desc}</p>
                    <p className="text-sm font-bold text-blue-900 md:text-base">{formatMoney(service.price)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={`flex min-w-[58px] items-center justify-center rounded-full border px-4 py-2 text-xs font-bold md:min-w-[68px] md:px-5 md:text-sm ${
                      active ? "border-blue-900 bg-blue-900 text-white" : "border-blue-900 bg-white text-blue-900"
                    }`}
                  >
                    {active ? <span className="relative z-10 text-base leading-none">✓</span> : "Chọn"}
                  </button>
                </div>
              );
            })}
            {visibleServices.length === 0 && (
              <p className="rounded-2xl bg-slate-50 p-5 text-sm font-medium text-slate-500">
                Chưa có dịch vụ phù hợp.
              </p>
            )}
          </div>
          <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-100 p-5 shadow">
            <span className="text-sm font-bold text-slate-900 md:text-base">Tổng tiền tạm tính</span>
            <div className="text-right">
              <p className="text-base font-black text-blue-900 md:text-2xl">{formatMoney(total)}</p>
              <p className="text-xs text-slate-500">(Chưa bao gồm thuế)</p>
            </div>
          </div>
        </Card>

        <aside className="grid gap-6 lg:h-[744px] lg:grid-rows-[auto_minmax(0,1fr)]">
          <BookingCalendar selectedDate={selectedDate} onSelect={selectDate} invalid={validationAttempted && !dateBookable} />
          <TimeSlots
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              onSelect={setSelectedSlot}
              timeSlots={timeSlots}
              invalid={validationAttempted && !slotBookable}
            />
            {slotsLoading && <p className="mt-2 text-sm font-medium text-blue-900">Đang tải khung giờ...</p>}
        </aside>
      </div>
      <FlowButtons onNext={handleNext} />
    </>
  );
}

function PetSummaryCard({ selectedPets, active, onClick }) {
  const selectedPet = selectedPets[0];
  const extraCount = Math.max(selectedPets.length - 1, 0);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex min-h-[116px] items-center gap-3 rounded-2xl bg-white p-5 text-left shadow-[0_4px_13px_rgba(144,202,249,0.85)] md:p-[26px] ${
        active ? "border-2 border-blue-900" : "border-2 border-transparent"
      }`}
    >
      {active && <img src={serviceSelectedCheck} alt="" className="absolute right-4 top-4 h-5 w-5" />}
      {selectedPet ? (
        <>
          <img
            src={selectedPet.name === "Max" ? informationSelectedPetPhoto : selectedPet.avatar || petImages[selectedPet.name] || buddyImg}
            alt={selectedPet.name}
            className="h-[60px] w-[60px] shrink-0 rounded-full object-cover md:h-20 md:w-20"
          />
          <span className="min-w-0 flex-1">
            <strong className="block text-lg text-slate-900">{selectedPet.name}</strong>
            <span className="text-sm text-slate-600">{selectedPet.breed} <br/> {selectedPet.age}</span>
          </span>
          {extraCount > 0 && (
            <span className="shrink-0 text-right text-sm font-normal leading-6 tracking-[0.15px] text-[#d32f2f] md:text-base">
              +{extraCount} hồ sơ khác
            </span>
          )}
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

function InfoForm({
  selectedPets,
  setSelectedPets,
  petInfos,
  setPetInfos,
  ownerInfo,
  setOwnerInfo,
  pets,
  petsLoading,
  petsError,
  onBack,
  onNext,
}) {
  const [showPetPicker, setShowPetPicker] = useState(false);
  const [validationAttempted, setValidationAttempted] = useState(false);
  const profileMode = selectedPets.length > 0;
  const activePetInfos = petInfos.length > 0 ? petInfos : [createEmptyPetInfo()];
  const updatePetInfo = (petId, field, value) =>
    setPetInfos((current) =>
      current.map((petInfo) =>
        petInfo.id === petId ? { ...petInfo, [field]: value } : petInfo,
      ),
    );
  const updateOwnerInfo = (field, value) =>
    setOwnerInfo((current) => ({ ...current, [field]: value }));
  const infoComplete =
    activePetInfos.every(isPetInfoComplete) &&
    ownerInfo.name.trim() &&
    ownerInfo.phone.trim() &&
    ownerInfo.agreed;

  const chooseOtherPet = () => {
    setSelectedPets([]);
    setPetInfos([createEmptyPetInfo()]);
  };

  const addOtherPetInfo = () => {
    setPetInfos((current) => [...current, createEmptyPetInfo()]);
  };

  const removeOtherPetInfo = (petId) => {
    setPetInfos((current) =>
      current.length <= 1 ? current : current.filter((petInfo) => petInfo.id !== petId),
    );
  };

  const handleNext = () => {
    if (infoComplete) {
      onNext();
      return;
    }

    setValidationAttempted(true);
    window.setTimeout(() => {
      const firstInvalid = document.querySelector('[data-booking-error="true"]');
      firstInvalid?.focus();
      firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  };

  return (
    <>
      <div className="grid gap-5 md:gap-8 lg:grid-cols-[minmax(0,2fr)_390px]">
        <div className="space-y-6">
          <div className="grid gap-3 md:grid-cols-2 md:gap-6">
            <PetSummaryCard
              selectedPets={selectedPets}
              active={profileMode}
              onClick={() => setShowPetPicker(true)}
            />
            <button
              type="button"
              onClick={chooseOtherPet}
              className={`relative min-h-[116px] rounded-2xl bg-white p-5 text-left shadow-[0_4px_13px_rgba(144,202,249,0.85)] md:p-6 ${
                !profileMode ? "border-2 border-blue-900" : "border-2 border-transparent"
              }`}
            >
              {!profileMode && <img src={serviceSelectedCheck} alt="" className="absolute right-4 top-4 h-5 w-5" />}
              <strong className={`block text-xl ${!profileMode ? "text-blue-900" : "text-slate-900"}`}>
                Thú cưng khác
              </strong>
              <span className="mt-3 block text-base text-slate-600">Bạn chưa tạo Hồ sơ thú cưng cho bé này</span>
            </button>
          </div>

          <div className="space-y-6">
            {activePetInfos.map((petInfo, index) => (
              <PetInfoCard
                key={petInfo.id}
                petInfo={petInfo}
                index={index}
                showIndex={activePetInfos.length > 1}
                canRemove={!profileMode && activePetInfos.length > 1}
                validationAttempted={validationAttempted}
                onChange={updatePetInfo}
                onRemove={removeOtherPetInfo}
              />
            ))}
            {!profileMode && (
              <button
                type="button"
                onClick={addOtherPetInfo}
                className="w-full rounded-2xl border-2 border-blue-900 bg-white px-6 py-4 text-base font-bold text-blue-900 shadow-[0_4px_13px_rgba(144,202,249,0.5)] transition hover:bg-blue-50"
              >
                + Thêm một bé nữa
              </button>
            )}
          </div>
        </div>

        <Card className="p-5 md:p-8">
          <h2 className="mb-5 text-xl font-black text-blue-900">THÔNG TIN CHỦ THÚ CƯNG</h2>
          <div className="grid gap-5">
            <Field label="Họ và tên" required showError={validationAttempted} value={ownerInfo.name} onChange={(event) => updateOwnerInfo("name", event.target.value)}/>
            <Field label="Số điện thoại" required showError={validationAttempted} value={ownerInfo.phone} onChange={(event) => updateOwnerInfo("phone", event.target.value)}/>
            <Field label="Email" value={ownerInfo.email} onChange={(event) => updateOwnerInfo("email", event.target.value)}/>
            <label
              className={`flex items-start gap-3 rounded-lg text-sm text-slate-700 ${validationAttempted && !ownerInfo.agreed ? "ring-2 ring-red-500" : ""}`}
              title={validationAttempted && !ownerInfo.agreed ? "Vui lòng điền thông tin" : undefined}
              data-booking-error={validationAttempted && !ownerInfo.agreed ? "true" : undefined}
              tabIndex={validationAttempted && !ownerInfo.agreed ? -1 : undefined}
            >
              <input type="checkbox" checked={ownerInfo.agreed} onChange={(event) => updateOwnerInfo("agreed", event.target.checked)} className="mt-1" />
              <span>Tôi đồng ý với <a className="text-blue-900 underline">Chính sách Huỷ/Đổi lịch hẹn</a> tại Dr.Pet’s House</span>
            </label>
          </div>
        </Card>
      </div>
      <FlowButtons onBack={onBack} onNext={handleNext} />
      {showPetPicker && (
        <PetSelectionModal
          pets={pets}
          loading={petsLoading}
          error={petsError}
          selectedPets={selectedPets}
          onClose={() => setShowPetPicker(false)}
          onConfirm={(pets) => {
            setSelectedPets(pets);
            setPetInfos(pets.length > 0 ? pets.map(profileToPetInfo) : [createEmptyPetInfo()]);
            setShowPetPicker(false);
          }}
        />
      )}
    </>
  );
}

function PetInfoCard({
  petInfo,
  index,
  showIndex,
  canRemove,
  validationAttempted,
  onChange,
  onRemove,
}) {
  return (
    <Card className="p-5 md:p-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-black text-blue-900">
          THÔNG TIN THÚ CƯNG{showIndex ? ` ${index + 1}` : ""}
        </h2>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(petInfo.id)}
            className="text-sm font-bold text-[#d32f2f]"
          >
            Xóa
          </button>
        )}
      </div>
      <div className="grid gap-5 md:grid-cols-6">
        <Field className="md:col-span-4" label="Tên thú cưng" required showError={validationAttempted} value={petInfo.name} onChange={(event) => onChange(petInfo.id, "name", event.target.value)} />
        <Field className="md:col-span-2" label="Loài" as="select" options={["Chó", "Mèo", "Khác"]} required showError={validationAttempted} value={petInfo.species} onChange={(event) => onChange(petInfo.id, "species", event.target.value)} />
        <Field className="md:col-span-2" label="Giống" value={petInfo.breed} onChange={(event) => onChange(petInfo.id, "breed", event.target.value)} />
        <Field className="md:col-span-2" label="Tuổi" suffix="tuổi" value={petInfo.age} onChange={(event) => onChange(petInfo.id, "age", event.target.value)} />
        <Field className="md:col-span-2" label="Cân nặng" suffix="kg" required showError={validationAttempted} value={petInfo.weight} onChange={(event) => onChange(petInfo.id, "weight", event.target.value)} />
        <div className="md:col-span-3">
          <p className="mb-3 text-sm font-medium text-slate-900">Giới tính</p>
          <div className="flex flex-wrap gap-5 text-sm">
            <label><input type="radio" name={`gender-${petInfo.id}`} checked={petInfo.gender === "male"} onChange={() => onChange(petInfo.id, "gender", "male")} className="mr-2 accent-blue-900" />Đực</label>
            <label><input type="radio" name={`gender-${petInfo.id}`} checked={petInfo.gender === "female"} onChange={() => onChange(petInfo.id, "gender", "female")} className="mr-2 accent-blue-900" />Cái</label>
          </div>
        </div>
        <div className="md:col-span-3">
          <p className="mb-3 text-sm font-medium text-slate-900">Tình trạng sức khỏe <span className="text-red-500">*</span></p>
          <div
            className={`flex flex-wrap gap-4 rounded-lg text-sm ${validationAttempted && !petInfo.status ? "ring-2 ring-red-500" : ""}`}
            title={validationAttempted && !petInfo.status ? "Vui lòng điền thông tin" : undefined}
            data-booking-error={validationAttempted && !petInfo.status ? "true" : undefined}
            tabIndex={validationAttempted && !petInfo.status ? -1 : undefined}
          >
            <label><input type="radio" name={`status-${petInfo.id}`} checked={petInfo.status === "normal"} onChange={() => onChange(petInfo.id, "status", "normal")} className="mr-2 h-4 w-4 cursor-pointer accent-blue-900 text-blue-900 border-gray-300 focus:ring-blue-900" />Bình thường</label>
            <label><input type="radio" name={`status-${petInfo.id}`} checked={petInfo.status === "treating"} onChange={() => onChange(petInfo.id, "status", "treating")} className="mr-2 h-4 w-4 cursor-pointer accent-blue-900 text-blue-900 border-gray-300 focus:ring-blue-900" />Đang điều trị</label>
            <label><input type="radio" name={`status-${petInfo.id}`} checked={petInfo.status === "chronic"} onChange={() => onChange(petInfo.id, "status", "chronic")} className="mr-2 h-4 w-4 cursor-pointer accent-blue-900 text-blue-900 border-gray-300 focus:ring-blue-900" />Có bệnh nền</label>
          </div>
        </div>
        <label className="md:col-span-6">
          <span className="mb-2 block text-sm font-medium text-slate-900">Thông tin thêm</span>
          <textarea
            placeholder="Nhập ghi chú, yêu cầu đặc biệt hoặc thông tin bổ sung tại đây..."
            value={petInfo.notes}
            onChange={(event) => onChange(petInfo.id, "notes", event.target.value)}
            className="h-15 w-full text-sm resize-none rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-900"
          />
        </label>
      </div>
    </Card>
  );
}

function Field({
  label,
  required,
  as,
  options = [],
  suffix,
  className = "",
  defaultValue = "",
  type = "text",
  value,
  onChange,
  showError = false,
}) {
  const invalid = showError && required && !String(value ?? defaultValue ?? "").trim();

  return (
    <label className={className} title={invalid ? "Vui lòng điền thông tin" : undefined}>
      <span className="mb-2 block text-sm font-medium text-slate-900 md:text-base lg:text-sm">
        {label} {required && <span className="text-red-600">*</span>}
      </span>

      <span className="relative block">
        {as === "select" ? (
          <>
            <select
              value={value ?? defaultValue}
              onChange={onChange}
              required={required}
              data-booking-error={invalid ? "true" : undefined}
              className={`h-10 w-full appearance-none rounded-2xl border bg-white px-4 pr-12 text-sm outline-none md:h-[42px] md:text-base lg:h-10 lg:text-sm ${
                invalid ? "border-red-500 ring-1 ring-red-500" : "border-slate-300 focus:border-blue-900"
              }`}
            >
              <option value="" disabled>Chọn thông tin</option>
              {options.map((option) => (
                <option key={option} value={option}>{option}</option>
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
            value={value}
            defaultValue={value === undefined ? defaultValue : undefined}
            onChange={onChange}
            required={required}
            data-booking-error={invalid ? "true" : undefined}
            className={`h-10 w-full rounded-2xl border px-4 pr-10 text-sm outline-none md:h-[42px] md:text-base lg:h-10 lg:text-sm ${
              invalid ? "border-red-500 ring-1 ring-red-500" : "border-slate-300 focus:border-blue-900"
            }`}
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

function PetSelectionModal({ pets, loading, error, selectedPets, onConfirm, onClose }) {
  const [draftPets, setDraftPets] = useState(selectedPets);

  const togglePet = (pet) => {
    setDraftPets((current) =>
      current.some((item) => item.id === pet.id)
        ? current.filter((item) => item.id !== pet.id)
        : [...current, pet],
    );
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/45 p-5 backdrop-blur-sm">
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
          {loading && (
            <p className="rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-600">
              Đang tải hồ sơ thú cưng...
            </p>
          )}
          {!loading && error && (
            <p className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-700">
              {error}
            </p>
          )}
          {!loading && !error && pets.length === 0 && (
            <p className="rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-600">
              Bạn chưa có hồ sơ thú cưng nào.
            </p>
          )}
          {!loading && pets.map((pet) => (
            <button
              key={pet.id}
              type="button"
              onClick={() => togglePet(pet)}
              className={`flex w-full items-center gap-4 rounded-2xl border-2 p-[18px] text-left md:p-4 ${
                draftPets.some((item) => item.id === pet.id) ? "border-blue-900 bg-blue-50" : "border-slate-200"
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
              <span
                className={`rounded-full px-4 py-1.5 text-xs font-bold ${
                  draftPets.some((item) => item.id === pet.id)
                    ? "bg-blue-900 text-white"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                {draftPets.some((item) => item.id === pet.id) ? "✓" : "Chọn"}
              </span>
            </button>
          ))}
        </div>
        <div className="bg-slate-100 px-6 py-4">
          <button
            type="button"
            disabled={draftPets.length === 0}
            onClick={() => onConfirm(draftPets)}
            className="w-full rounded-2xl bg-blue-900 py-3 font-bold text-white disabled:opacity-50"
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
}

function FlowButtons({ onBack, onNext }) {
  return (
    <div className="mt-5 flex w-full items-center justify-between md:mt-6">
      <button
        type="button"
        onClick={onBack}
        className="rounded bg-secondary-light px-5 py-2 text-sm font-bold uppercase tracking-[0.46px] shadow-elevation md:px-6 md:py-3"
      >
        ‹ Quay lại
      </button>
      <button
        type="button"
        onClick={onNext}
        className="rounded bg-secondary px-5 py-2 text-sm font-bold uppercase tracking-[0.46px] shadow-elevation md:px-6 md:py-3"
      >
        Tiếp tục ›
      </button>
    </div>
  );
}

function BookingPage() {
  const { isAuthenticated, requireAuth, userProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedServiceType, setSelectedServiceType] = useState(DEFAULT_SERVICE_TYPE_ID);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [branches, setBranches] = useState(() =>
    BRANCH_OPTIONS.map((branch) => ({ id: branch, label: branch })),
  );
  const [services, setServices] = useState(BOOKING_SERVICES);
  const [timeSlots, setTimeSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [pets, setPets] = useState([]);
  const [petsLoading, setPetsLoading] = useState(false);
  const [petsError, setPetsError] = useState("");
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [selectedPets, setSelectedPets] = useState([]);
  const [petInfos, setPetInfos] = useState(() => [createEmptyPetInfo()]);
  const [ownerInfo, setOwnerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    branch: BRANCH_OPTIONS[0],
    agreed: false,
  });
  const [paymentMode, setPaymentMode] = useState("store");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    setOwnerInfo((current) => ({
      ...current,
      name: current.name || userProfile.fullName || "",
      phone: current.phone || userProfile.phone || "",
      email: current.email || userProfile.email || "",
    }));
  }, [isAuthenticated, userProfile]);

  useEffect(() => {
    if (!isAuthenticated) {
      setPets([]);
      setSelectedPets([]);
      setPetInfos([createEmptyPetInfo()]);
      return undefined;
    }

    let active = true;
    setPetsLoading(true);
    setPetsError("");

    Promise.allSettled([getMyPets(), getPetSpecies()])
      .then(([petsResult, speciesResult]) => {
        if (!active) return;
        if (petsResult.status === "fulfilled") {
          const items = petsResult.value;
          setPets(items);
          setSelectedPets((current) =>
            current.filter((selectedPet) => items.some((pet) => pet.id === selectedPet.id)),
          );
        } else {
          setPetsError(petsResult.reason?.message || "Không thể tải hồ sơ thú cưng");
        }
        if (speciesResult.status === "fulfilled") {
          setSpeciesOptions(speciesResult.value);
        }
      })
      .finally(() => {
        if (active) setPetsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isAuthenticated]);

  useEffect(() => {
    let active = true;
    Promise.all([getBranches(), getServices()])
      .then(([branchData, serviceData]) => {
        if (!active) return;
        if (branchData.length) {
          setBranches(branchData);
          setOwnerInfo((current) => ({
            ...current,
            branch: branchData.some((branch) => branch.id === current.branch) ? current.branch : branchData[0].id,
          }));
        }
        if (serviceData.length) {
          setServices(serviceData);
        }
      })
      .catch((error) => {
        console.warn("Booking APIs unavailable, falling back to static booking data.", error);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedDate || !ownerInfo.branch) {
      setTimeSlots([]);
      setSelectedSlot(null);
      return;
    }

    let active = true;
    setSlotsLoading(true);
    getAppointmentSlots({
      date: getDateKey(selectedDate),
      branchId: ownerInfo.branch,
      serviceType: selectedServiceType,
    })
      .then((slots) => {
        if (!active) return;
        setTimeSlots(slots);
        setSelectedSlot((current) =>
          current && slots.some((slot) => slot.value === current && slot.available) ? current : null,
        );
      })
      .catch((error) => {
        console.warn("Appointment slots API unavailable.", error);
        if (active) {
          setTimeSlots([]);
          setSelectedSlot(null);
        }
      })
      .finally(() => {
        if (active) setSlotsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [ownerInfo.branch, selectedDate, selectedServiceType]);

  const handleConfirm = async ({ quantities } = {}) => {
    const selectedSlotRecord = timeSlots.find((slot) => slot.value === selectedSlot);
    if (!selectedSlotRecord) {
      setBookingError("Vui lòng chọn lại khung giờ.");
      return;
    }

    const firstPetInfo = petInfos[0] || {};
    const servicePayload = services
      .filter((service) => selectedServices.includes(service.id))
      .map((service) => ({
        service_id: service.serviceId || service.id,
        quantity: quantities?.[service.id] || 1,
      }));

    setBookingSubmitting(true);
    setBookingError("");
    try {
      const selectedPetId = selectedPets[0]?.pet_id || selectedPets[0]?.id;
      const validPetId = /^\d+$/.test(String(selectedPetId || "")) ? selectedPetId : undefined;
      const petData = !validPetId && firstPetInfo.name
        ? {
            pet_name: firstPetInfo.name,
            species_id: findSpeciesId(speciesOptions, firstPetInfo.species),
            weight_kg: firstPetInfo.weight || undefined,
            age: firstPetInfo.age || undefined,
            gender: firstPetInfo.gender || "unknown",
            health_status: toBackendHealthStatus(firstPetInfo.status),
            medical_note: firstPetInfo.notes || undefined,
          }
        : undefined;

      if (!validPetId && !petData?.species_id) {
        setBookingError("Không tìm thấy mã loài thú cưng từ backend. Vui lòng chọn lại loài.");
        setBookingSubmitting(false);
        return;
      }

      await bookAppointment({
        slot_id: selectedSlotRecord.id,
        pet_id: validPetId,
        pet_data: petData,
        service_ids: servicePayload,
        customer_name_snapshot: ownerInfo.name,
        customer_phone_snapshot: ownerInfo.phone,
        condition_description: [firstPetInfo.name, firstPetInfo.status].filter(Boolean).join(" - ") || undefined,
        note: firstPetInfo.notes || undefined,
        payment_method: paymentMode === "store" ? "store" : "online",
      });
      setSuccess(true);
    } catch (error) {
      setBookingError(error?.message || "Không thể đặt lịch.");
    } finally {
      setBookingSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <NavBar />
      <main className="bg-[#e5f6fd]">
        <Stepper step={step} />
        <div className="mx-auto w-full max-w-[360px] px-5 pb-6 pt-0 md:max-w-[768px] md:px-10 md:pb-8 lg:max-w-[1280px] lg:px-6 lg:pt-6">
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
              ownerInfo={ownerInfo}
              setOwnerInfo={setOwnerInfo}
              branches={branches}
              services={services}
              timeSlots={timeSlots}
              slotsLoading={slotsLoading}
              onNext={() => requireAuth(() => setStep(2))}
            />
          )}
          {step === 2 && (
            <InfoForm
              selectedPets={selectedPets}
              setSelectedPets={setSelectedPets}
              petInfos={petInfos}
              setPetInfos={setPetInfos}
              ownerInfo={ownerInfo}
              setOwnerInfo={setOwnerInfo}
              pets={pets}
              petsLoading={petsLoading}
              petsError={petsError}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <BookingPaymentStep
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              selectedPet={selectedPets[0] || null}
              selectedPets={selectedPets}
              petInfo={petInfos[0]}
              petInfos={petInfos}
              ownerInfo={ownerInfo}
              selectedServices={services.filter((service) => selectedServices.includes(service.id))}
              paymentMode={paymentMode}
              setPaymentMode={setPaymentMode}
              onBack={() => setStep(2)}
              onConfirm={handleConfirm}
            />
          )}
          {bookingError && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {bookingError}
            </p>
          )}
          {bookingSubmitting && (
            <p className="mt-4 rounded-lg bg-blue-50 px-4 py-3 text-sm font-medium text-blue-900">
              Đang gửi yêu cầu đặt lịch...
            </p>
          )}
        </div>
        <Footer />
      </main>

      {success && <BookingSuccessModal />}
    </div>
  );
}

export default BookingPage;
