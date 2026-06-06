import { useMemo, useState } from "react";
import { appointmentImages } from "../../assets/appointmentImages";
import WriteReviewForm from "../../components/product/WriteReviewForm";
import { MOCK_APPOINTMENTS } from "../../data/mockAppointments";
import {
  APPOINTMENT_FILTERS,
  getAppointmentActions,
  getAppointmentDisplayStatus,
  getAppointmentTimelineSteps,
} from "../../utils/appointmentDisplay";

const formatMoney = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/\s/g, "");

const paymentMethodLabels = {
  cash: "Thanh toán tại phòng khám",
  pay_at_clinic: "Thanh toán tại phòng khám",
  momo: "MoMo",
  zalopay: "ZaloPay",
  vnpay: "Thanh toán trực tuyến",
  bank: "Chuyển khoản ngân hàng",
  atm: "Thẻ ATM",
  card: "Thanh toán trực tuyến",
  online: "Thanh toán trực tuyến",
};

const actionClasses = {
  yellow:
    "bg-[#fff176] text-black shadow-elevation hover:bg-[#fdd835]",
  primaryOutline:
    "border border-[#0d47a1] bg-white text-[#0d47a1] shadow-[0px_1px_3px_rgba(0,0,0,0.12),0px_1px_1px_rgba(0,0,0,0.14),0px_2px_1px_rgba(0,0,0,0.2)] hover:bg-[#e5f6fd]",
  dangerOutline:
    "border border-[#c62828] bg-white text-[#c62828] shadow-[0px_1px_3px_rgba(0,0,0,0.12),0px_1px_1px_rgba(0,0,0,0.14),0px_2px_1px_rgba(0,0,0,0.2)] hover:bg-[#ffdad6]",
};

function SmallIcon({ src, alt = "", className = "" }) {
  return (
    <img src={src} alt={alt} className={`h-[14px] w-[14px] shrink-0 object-contain ${className}`} />
  );
}

function ActionButton({ action, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(action.key)}
      className={`focus-ring-brand inline-flex h-[38px] items-center justify-center rounded px-[22px] py-2 font-['Roboto'] text-[15px] font-medium uppercase leading-[26px] tracking-[0.46px] transition ${actionClasses[action.variant]}`}
    >
      {action.label}
    </button>
  );
}

function AppointmentCard({ appointment, active, onSelect, onAction }) {
  const status = getAppointmentDisplayStatus(appointment);
  const actions = getAppointmentActions(appointment);

  return (
    <article
      className={`flex w-full cursor-pointer items-center justify-between rounded-2xl border-l-4 bg-white py-6 pl-7 pr-6 shadow-[0_4px_10px_rgba(26,43,75,0.05)] transition hover:shadow-[0_8px_20px_rgba(26,43,75,0.09)] ${status.border} ${
        active ? "ring-2 ring-[#90caf9]" : ""
      } ${status.value === "cancelled" ? "opacity-80" : ""}`}
      onClick={() => onSelect(appointment)}
    >
      <div className="flex min-w-0 items-start gap-4">
        <img
          src={appointment.pet.image}
          alt={appointment.pet.name}
          className={`h-16 w-16 shrink-0 rounded-xl object-cover ${status.value === "cancelled" ? "grayscale" : ""}`}
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-['Roboto'] text-xl font-bold leading-7 text-[#031635]">
              {appointment.pet.name}
            </h3>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold leading-4 ${status.badge}`}>
              {status.label}
            </span>
          </div>
          <p className="mt-1 text-sm leading-5 text-[#44474e]">
            Dịch vụ: {appointment.service.name}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-4 text-xs leading-4 text-[#75777f]">
            <span className="inline-flex items-center gap-1">
              <SmallIcon src={appointmentImages.calendarIcon} />
              {appointment.service.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <SmallIcon src={appointmentImages.timeIcon} />
              {appointment.service.time}
            </span>
          </div>
        </div>
      </div>

      <div className="ml-6 flex shrink-0 flex-col items-end gap-3">
        <div className="text-xl font-bold leading-7 text-[#031635]">
          {formatMoney(appointment.service.price)}
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          {actions.map((action) => (
            <ActionButton
              key={action.key}
              action={action}
              onClick={(key) => onAction(key, appointment)}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

function Timeline({ appointment }) {
  const steps = getAppointmentTimelineSteps(appointment);

  return (
    <div className="flex items-start justify-between px-2 py-5">
      {steps.map((step, index) => {
        const completed = step.state === "completed";
        const active = step.state === "active";
        const disabled = step.state === "disabled";
        const color = completed || active ? "bg-[#0d47a1] text-white" : "bg-[#e6e8ea] text-[#75777f]";
        const lineColor = completed ? "bg-[#0d47a1]" : "bg-[#e6e8ea]";

        return (
          <div key={step.key} className="flex flex-1 items-start">
            <div className="flex min-w-[74px] flex-col items-center">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${color} ${
                  disabled ? "opacity-70" : ""
                }`}
              >
                {completed ? (
                  <img src={appointmentImages.stepCheckIcon} alt="" className="h-4 w-4" />
                ) : active ? (
                  "●"
                ) : (
                  "○"
                )}
              </span>
              <span
                className={`mt-2 text-center text-[11px] font-semibold leading-4 ${
                  completed || active ? "text-[#06105a]" : "text-[#75777f]"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && <span className={`mt-[17px] h-0.5 flex-1 ${lineColor}`} />}
          </div>
        );
      })}
    </div>
  );
}

function DetailPanel({ appointment, onClose, onAction }) {
  const status = getAppointmentDisplayStatus(appointment);
  const actions = getAppointmentActions(appointment);
  const showDeadline =
    (appointment.canCancel || appointment.canReschedule) &&
    appointment.freeChangeDaysLeft > 0 &&
    status.value === "confirmed";

  return (
    <aside className="panel-slide-in fixed bottom-6 right-8 top-[92px] z-30 flex w-[508px] flex-col bg-white shadow-[0_24px_60px_rgba(3,22,53,0.14)]">
      <div className="flex items-center justify-between border-b border-[#c2c6d4] px-9 py-5">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className="focus-ring-brand rounded p-1"
            aria-label="Đóng chi tiết lịch hẹn"
          >
            <img src={appointmentImages.backArrow} alt="" className="h-4 w-4" />
          </button>
          <div>
            <h2 className="text-xl font-bold leading-6 text-[#003f87]">Chi tiết lịch hẹn</h2>
            <p className="text-xs font-semibold leading-4 text-[#424752]">Mã lịch #{appointment.code}</p>
          </div>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold leading-4 ${status.badge}`}>
          {status.label}
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-7 py-18">
        <Timeline appointment={appointment} />

        <section className="mt-4 rounded-2xl bg-[#e5f6fd] p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.7px] text-[#003f87]">
            <img src={appointmentImages.personIcon} alt="" className="h-5 w-5" />
            Thông tin chủ thú cưng
          </div>
          <h3 className="text-xl font-semibold leading-7 text-[#191c1e]">{appointment.owner.name}</h3>
          <div className="mt-2 flex flex-wrap gap-3 text-sm font-medium text-[#424752]">
            <span className="inline-flex items-center gap-1">
              <img src={appointmentImages.phoneIcon} alt="" className="h-4 w-4" />
              {appointment.owner.phone}
            </span>
            <span>{appointment.owner.address}</span>
          </div>
        </section>

        <section className="mt-100 rounded-2xl p-3">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.7px] text-[#003f87]">
            <img src={appointmentImages.petIcon} alt="" className="h-5 w-5" />
            Thông tin thú cưng
          </div>
          <div className="flex gap-4">
            <img
              src={appointment.pet.image}
              alt={appointment.pet.name}
              className="h-[105px] w-[106px] rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold leading-7 text-[#191c1e]">
                  {appointment.pet.name}{" "}
                  <span className="font-normal text-[#424752]">({appointment.pet.breed})</span>
                </h3>
                {appointment.pet.healthBadge && (
                  <span className="rounded bg-[#ffdad6] px-2 py-0.5 text-[10px] font-bold uppercase leading-[15px] text-[#ba1a1a]">
                    {appointment.pet.healthBadge}
                  </span>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-4 text-xs leading-4 text-[#424752]">
                <span>Cân nặng: {appointment.pet.weight}</span>
                <span>Tuổi: {appointment.pet.age}</span>
                <span>Giống: {appointment.pet.gender}</span>
              </div>
              {appointment.pet.note && (
                <div className="mt-3 rounded-2xl border-l-4 border-[#fdd835] bg-[#fff9c4] px-4 py-3 text-xs font-medium italic leading-4 text-[#544600]">
                  <span className="inline-flex items-start gap-2">
                    <img src={appointmentImages.infoIcon} alt="" className="mt-0.5 h-4 w-4" />
                    <span>Note: {appointment.pet.note}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-100 rounded-2xl bg-white p-3">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.7px] text-[#22c55e]">
              <img src={appointmentImages.paymentIcon} alt="" className="h-5 w-5" />
              Thanh toán
            </div>
            <span className="rounded-full bg-[rgba(34,197,94,0.1)] px-3 py-1 text-xs font-bold leading-4 text-[#22c55e]">
              {appointment.paymentStatus === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-base text-[#424752]">
              <span>Phương thức</span>
              <strong className="text-sm font-semibold">{paymentMethodLabels[appointment.paymentMethod]}</strong>
            </div>
            <div className="flex items-center justify-between text-base text-[rgba(0,0,0,0.87)]">
              <span>Số tiền cần thanh toán</span>
              <strong className="text-sm font-semibold text-[#424752]">
                {formatMoney(appointment.service.price)}
              </strong>
            </div>
          </div>
        </section>

        <section className="mt-100 rounded-2xl p-3">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.7px] text-[#003f87]">
            <img src={appointmentImages.serviceIcon} alt="" className="h-5 w-5" />
            Chi tiết dịch vụ
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold leading-7 text-[#191c1e]">
                {appointment.service.name}
              </h3>
              <p className="text-base leading-6 text-[#424752]">{appointment.service.description}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold leading-5 tracking-[0.14px] text-[#003f87]">
                {appointment.service.dateText}
              </p>
              <p className="text-xl font-semibold leading-7 text-[#191c1e]">
                {appointment.service.timeRange}
              </p>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-[#c2c6d4] bg-white px-6 pb-6 pt-5">
        {showDeadline && (
          <div className="mb-4 flex items-center justify-center gap-2 text-center text-sm font-semibold leading-5 tracking-[0.14px] text-[rgba(0,0,0,0.87)]">
            <img src={appointmentImages.infoIcon} alt="" className="h-4 w-4" />
            Còn {appointment.freeChangeDaysLeft} ngày để hủy hoặc đổi lịch miễn phí.
          </div>
        )}
        <div className="flex justify-center gap-4">
          {actions.map((action) => (
            <ActionButton
              key={action.key}
              action={action}
              onClick={(key) => onAction(key, appointment)}
            />
          ))}
        </div>
      </footer>
    </aside>
  );
}

function ReviewModal({ appointment, onClose, onSubmit }) {
  return (
    <div className="overlay-fade-in fixed inset-0 z-40 flex items-center justify-center bg-[rgba(6,16,90,0.2)] px-6 backdrop-blur-[2px]">
      <div className="w-full max-w-[992px]">
        <WriteReviewForm
          targetType="service"
          targetId={appointment.service.id}
          targetName={appointment.service.name}
          appointmentId={appointment.id}
          onSubmit={onSubmit}
        />
        <button
          type="button"
          onClick={onClose}
          className="focus-ring-brand mx-auto mt-4 flex justify-center block rounded bg-white/90 px-4 py-2 text-sm font-medium text-[#06105a]"
        >
          x
        </button>
      </div>
    </div>
  );
}

function AppointmentHistoryPage() {
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [reviewAppointmentId, setReviewAppointmentId] = useState(null);

  const selectedAppointment = appointments.find((item) => item.id === selectedId);
  const reviewAppointment = appointments.find((item) => item.id === reviewAppointmentId);

  const counts = useMemo(() => {
    return APPOINTMENT_FILTERS.reduce((acc, filter) => {
      acc[filter.value] =
        filter.value === "all"
          ? appointments.length
          : appointments.filter((item) => getAppointmentDisplayStatus(item).value === filter.value).length;
      return acc;
    }, {});
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return appointments.filter((appointment) => {
      const status = getAppointmentDisplayStatus(appointment).value;
      const matchesFilter = activeFilter === "all" || status === activeFilter;
      const matchesSearch =
        !normalizedSearch ||
        [appointment.pet.name, appointment.service.name, appointment.code]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, appointments, search]);

  const handleAction = (actionKey, appointment) => {
    if (actionKey === "review" && appointment.canReview && !appointment.reviewed) {
      setReviewAppointmentId(appointment.id);
      return;
    }

    if (actionKey === "pay") {
      console.log("Open payment flow", appointment.id);
      return;
    }

    if (actionKey === "rebook") {
      window.location.href = "/booking";
      return;
    }

    console.log("Appointment action", actionKey, appointment.id);
  };

  const handleReviewSubmit = () => {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === reviewAppointmentId
          ? { ...appointment, reviewed: true, canReview: false }
          : appointment,
      ),
    );
    setReviewAppointmentId(null);
  };

  return (
    <div className="relative mx-auto flex w-full max-w-[939px] flex-col gap-8 pb-10">
      <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 pt-1">
        {APPOINTMENT_FILTERS.map((filter) => {
          const active = activeFilter === filter.value;
          return (
            <button
              type="button"
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`focus-ring-brand shrink-0 rounded-full px-6 py-2 text-sm font-semibold leading-5 tracking-[0.14px] transition ${
                active
                  ? "bg-[#0d47a1] text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
                  : "border border-[#c2c6d4] bg-white text-[#424752] hover:border-[#0d47a1]"
              }`}
            >
              {filter.label} ({counts[filter.value] || 0})
            </button>
          );
        })}
      </div>

      <label className="flex w-full items-center justify-between rounded-[42px] border border-[#c2c6d4] bg-white py-2 pl-5 pr-2 backdrop-blur-[11px]">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Tìm kiếm lịch hẹn của bạn..."
          className="min-w-0 flex-1 bg-transparent text-base leading-6 tracking-[0.15px] text-[#5f5f5f] outline-none placeholder:text-[#5f5f5f]"
        />
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fdd835] text-[#06105a]">
          <img src={appointmentImages.searchIcon} alt="" className="h-5 w-5" />
        </span>
      </label>

      <div className="flex flex-col gap-4">
        {filteredAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            active={selectedId === appointment.id}
            onSelect={(item) => setSelectedId(item.id)}
            onAction={handleAction}
          />
        ))}
      </div>

      <button
        type="button"
        className="focus-ring-brand mx-auto inline-flex items-center gap-2 text-sm leading-5 text-[#031635]"
      >
        <img src={appointmentImages.chevronDown} alt="" className="h-2 w-3" />
        Tải thêm lịch sử
      </button>

      <a
        href="/booking"
        className="focus-ring-brand fixed bottom-7 right-24 z-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fcd400] text-3xl leading-none text-[#06105a] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]"
        aria-label="Đặt lịch mới"
      >
        +
      </a>

      {selectedAppointment && (
        <DetailPanel
          appointment={selectedAppointment}
          onClose={() => setSelectedId(null)}
          onAction={handleAction}
        />
      )}

      {reviewAppointment && (
        <ReviewModal
          appointment={reviewAppointment}
          onClose={() => setReviewAppointmentId(null)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
}

export default AppointmentHistoryPage;
