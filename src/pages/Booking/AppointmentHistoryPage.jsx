import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appointmentImages } from "../../assets/appointmentImages";
import WriteReviewForm from "../../components/product/WriteReviewForm";
import { useDecisionModal } from "../../components/shared/DecisionModal";
import {
  APPOINTMENT_FILTERS,
  getAppointmentActions,
  getAppointmentDisplayStatus,
  getAppointmentTimelineSteps,
} from "../../utils/appointmentDisplay";
import { formatVnd } from "../../utils/currency";
import {
  cancelAppointment,
  checkoutAppointment,
  createAppointmentServiceReview,
  getAppointmentHistory,
} from "../../services/bookingService";
import { MOCK_APPOINTMENTS } from "../../data/mockAppointments";

const formatMoney = (value) => formatVnd(value);

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
  store: "Thanh toán tại phòng khám",
};

const getAppointmentDate = (appointment) => {
  if (appointment.rawDate) {
    const date = new Date(appointment.rawDate);
    if (!Number.isNaN(date.getTime())) return date;
  }
  const [day, month, year] = appointment.service.dateText.split("/").map(Number);
  const [hour, minute] = appointment.service.timeRange.split(" - ")[0].split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute);
};

const actionClasses = {
  yellow:
    "bg-[#fff176] text-black shadow-elevation hover:bg-[#fdd835]",
  primaryOutline:
    "border border-[#0d47a1] bg-white text-[#0d47a1] shadow-[0px_1px_3px_rgba(0,0,0,0.12),0px_1px_1px_rgba(0,0,0,0.14),0px_2px_1px_rgba(0,0,0,0.2)] hover:bg-[#e5f6fd]",
  dangerOutline:
    "border border-[#c62828] bg-white text-[#c62828] shadow-[0px_1px_3px_rgba(0,0,0,0.12),0px_1px_1px_rgba(0,0,0,0.14),0px_2px_1px_rgba(0,0,0,0.2)] hover:bg-[#ffdad6]",
};

function usePaymentCountdown(expiresAt) {
  const getRemainingSeconds = () =>
    expiresAt
      ? Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000))
      : 0;
  const [remainingSeconds, setRemainingSeconds] = useState(getRemainingSeconds);

  useEffect(() => {
    if (!expiresAt) return undefined;

    const updateRemaining = () => setRemainingSeconds(getRemainingSeconds());
    updateRemaining();
    const intervalId = window.setInterval(updateRemaining, 1000);
    return () => window.clearInterval(intervalId);
  }, [expiresAt]);

  return remainingSeconds;
}

function PaymentCountdown({ remainingSeconds }) {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return (
    <span className={`text-xs font-semibold ${remainingSeconds ? "text-[#c62828]" : "text-[#75777f]"}`}>
      {remainingSeconds
        ? `Thanh toán trong ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
        : "Đã hết thời gian thanh toán"}
    </span>
  );
}

function SmallIcon({ src, alt = "", className = "" }) {
  return (
    <img src={src} alt={alt} className={`h-[14px] w-[14px] shrink-0 object-contain ${className}`} />
  );
}

function ActionButton({ action, onClick, disabled = false }) {
  return (
    <button
      type="button"
      onClick={() => onClick(action.key)}
      disabled={disabled}
      className={`focus-ring-brand inline-flex h-[38px] items-center justify-center rounded px-[22px] py-2 font-['Roboto'] text-[15px] font-medium uppercase leading-[26px] tracking-[0.46px] transition disabled:cursor-not-allowed disabled:border-transparent disabled:bg-[#e4e7ec] disabled:text-[#98a2b3] disabled:shadow-none ${actionClasses[action.variant]}`}
    >
      {action.label}
    </button>
  );
}

function AppointmentCard({ appointment, active, onSelect, onAction, actionLoading }) {
  const status = getAppointmentDisplayStatus(appointment);
  const actions = getAppointmentActions(appointment);
  const remainingSeconds = usePaymentCountdown(appointment.paymentExpiresAt);
  const paymentExpired = status.value === "pending_payment" && remainingSeconds === 0;

  return (
    <article
      className={`flex w-full cursor-pointer items-center justify-between rounded-[16px] border border-[#C2C6D4] bg-white py-6 pl-7 pr-6 transition hover:border-[#1976D2] hover:shadow-md ${
        active ? "ring-2 ring-[#90caf9]" : ""
      } ${status.value === "cancelled" ? "opacity-80" : ""}`}
      onClick={() => onSelect(appointment)}
    >
      <div className="flex min-w-0 items-start gap-4">
        <img
          src={appointment.pet.image || appointmentImages.pets.lulu}
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
        {status.value === "pending_payment" && <PaymentCountdown remainingSeconds={remainingSeconds} />}
        <div className="flex flex-wrap justify-end gap-2">
          {actions.map((action) => (
            <ActionButton
              key={action.key}
              action={action}
              onClick={(key) => onAction(key, appointment)}
              disabled={actionLoading || (action.key === "pay" && paymentExpired)}
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

function DetailPanel({ appointment, onClose, onAction, actionLoading }) {
  const status = getAppointmentDisplayStatus(appointment);
  const actions = getAppointmentActions(appointment);
  const remainingSeconds = usePaymentCountdown(appointment.paymentExpiresAt);
  const paymentExpired = status.value === "pending_payment" && remainingSeconds === 0;
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
              src={appointment.pet.image || appointmentImages.pets.lulu}
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
        {status.value === "pending_payment" && (
          <div className="mb-4 text-center">
            <PaymentCountdown remainingSeconds={remainingSeconds} />
          </div>
        )}
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
              disabled={actionLoading || (action.key === "pay" && paymentExpired)}
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

function SearchAndSort({
  searchInput,
  onSearchInputChange,
  onSearch,
  onClearSearch,
  sortOrder,
  onSortChange,
}) {
  return (
    <form
      className="flex w-full gap-[10px]"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
    >
      <label className="flex h-[52px] min-w-0 flex-1 items-center justify-between rounded-[42px] border border-[rgba(25,118,210,0.5)] bg-white/80 py-2 pl-5 pr-2 backdrop-blur-[11px]">
        <input
          value={searchInput}
          onChange={(event) => onSearchInputChange(event.target.value)}
          placeholder="Tìm kiếm theo Mã lịch hẹn, Thời gian, tên thú cưng hoặc dịch vụ"
          className="min-w-0 flex-1 bg-transparent text-[15px] text-[#5f5f5f] outline-none placeholder:text-[#5f5f5f]"
        />
        {searchInput && (
          <button
            type="button"
            onClick={onClearSearch}
            className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E3F2FD] text-[28px] font-semibold leading-none text-[#0D47A1] transition-colors hover:bg-[#BBDEFB]"
            aria-label="Xóa tìm kiếm lịch hẹn"
          >
            ×
          </button>
        )}
        <button
          type="submit"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-[#fff176]"
          aria-label="Tìm kiếm lịch hẹn"
        >
          <img src={appointmentImages.searchIcon} alt="" className="h-7 w-7" />
        </button>
      </label>

      <label className="flex h-[52px] w-[170px] cursor-pointer items-center gap-[8px] rounded-[42px] border border-[rgba(25,118,210,0.5)] bg-white px-[14px]">
        <svg className="h-4 w-[18px] shrink-0 text-[#414141]" viewBox="0 0 18 12" aria-hidden="true">
          <path d="M1 1h16M1 6h10M1 11h5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <select
          value={sortOrder}
          onChange={(event) => onSortChange(event.target.value)}
          className="w-full cursor-pointer appearance-none bg-transparent text-center text-[14px] font-medium outline-none"
          aria-label="Sắp xếp lịch hẹn"
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
        </select>
      </label>
    </form>
  );
}

function AppointmentHistoryPage() {
  const { confirmCancel, openDecisionModal, showSuccessModal } = useDecisionModal();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedId, setSelectedId] = useState(null);
  const [reviewAppointmentId, setReviewAppointmentId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setLoadError("");

    getAppointmentHistory()
      .then((items) => {
        if (active) setAppointments(items);
      })
      .catch((error) => {
        if (!active) return;
        setAppointments(MOCK_APPOINTMENTS);
        setLoadError(error?.message || "Không thể tải lịch sử đặt lịch, đang hiển thị dữ liệu mẫu.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

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
    const normalizedSearch = searchQuery.trim().toLocaleLowerCase("vi");

    const result = appointments.filter((appointment) => {
      const status = getAppointmentDisplayStatus(appointment).value;
      const matchesFilter = activeFilter === "all" || status === activeFilter;
      const matchesSearch =
        !normalizedSearch ||
        [
          appointment.code,
          appointment.pet.name,
          appointment.service.name,
          appointment.service.date,
          appointment.service.dateText,
          appointment.service.time,
          appointment.service.timeRange,
        ]
          .join(" ")
          .toLocaleLowerCase("vi")
          .includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });

    return [...result].sort((a, b) =>
      sortOrder === "oldest"
        ? getAppointmentDate(a) - getAppointmentDate(b)
        : getAppointmentDate(b) - getAppointmentDate(a),
    );
  }, [activeFilter, appointments, searchQuery, sortOrder]);

  const handleAction = async (actionKey, appointment) => {
    if (actionKey === "review" && appointment.canReview && !appointment.reviewed) {
      setReviewAppointmentId(appointment.id);
      return;
    }

    if (actionKey === "cancel") {
      confirmCancel({
        message: `Bạn chắc chắn muốn hủy lịch hẹn #${appointment.code}?\nHành động này không thể hoàn tác`,
        confirmLabel: "Hủy",
        onConfirm: async () => {
          setActionLoadingId(appointment.id);
          setActionMessage(null);

          try {
            await cancelAppointment(appointment.id);
            setAppointments((current) =>
              current.map((item) =>
                item.id === appointment.id
                  ? {
                      ...item,
                      status: "cancelled",
                      canCancel: false,
                      canReschedule: false,
                      canRebook: true,
                    }
                  : item,
              ),
            );
            setActionMessage({ type: "success", text: "Đã hủy lịch hẹn thành công." });
            showSuccessModal({
              message: "Đã hủy lịch hẹn thành công.\nBạn có thể tiếp tục hoặc quay về trang chủ",
            });
          } catch (error) {
            setActionMessage({
              type: "error",
              text: error?.message || "Không thể hủy lịch hẹn lúc này. Vui lòng thử lại sau.",
            });
          } finally {
            setActionLoadingId(null);
          }
        },
      });
      return;
    }

    if (actionKey === "pay") {
      openDecisionModal({
        type: "cancel",
        title: "XÁC NHẬN",
        message: "Xác nhận thanh toán lịch hẹn tại phòng khám?\nHệ thống sẽ ghi nhận trạng thái chờ thanh toán tại quầy",
        confirmLabel: "Xác nhận",
        onConfirm: async () => {
          setActionLoadingId(appointment.id);
          setActionMessage(null);

          try {
            await checkoutAppointment(appointment.id, { paymentMethod: "store" });
            setAppointments((current) =>
              current.map((item) =>
                item.id === appointment.id
                  ? {
                      ...item,
                      status: "confirmed",
                      paymentMethod: "store",
                      paymentStatus: "waiting_store_payment",
                      canCancel: true,
                      canReschedule: true,
                    }
                  : item,
              ),
            );
            setActionMessage({
              type: "success",
              text: "Đã xác nhận lịch hẹn. Bạn có thể thanh toán tại phòng khám khi đến sử dụng dịch vụ.",
            });
            showSuccessModal({
              message: "Đã xác nhận lịch hẹn thành công.\nBạn có thể tiếp tục hoặc quay về trang chủ",
            });
          } catch (error) {
            setActionMessage({
              type: "error",
              text: error?.message || "Không thể xác nhận thanh toán lịch hẹn lúc này.",
            });
          } finally {
            setActionLoadingId(null);
          }
        },
      });
      return;
    }

    if (actionKey === "reschedule") {
      setActionMessage({ type: "error", text: "Backend chưa có endpoint đổi lịch, tạm thời hãy đặt lịch mới nếu cần đổi giờ." });
      return;
    }

    if (actionKey === "rebook") {
      const rebookServices = appointment.services?.length
        ? appointment.services
        : appointment.service?.id
          ? [{
              id: appointment.service.id,
              serviceId: appointment.service.id,
              name: appointment.service.name,
              serviceTypeId: appointment.service.serviceTypeId,
              quantity: 1,
            }]
          : [];
      navigate("/dat-lich", {
        state: {
          rebookAppointment: {
            serviceTypeId: rebookServices[0]?.serviceTypeId,
            services: rebookServices,
            sourceAppointmentId: appointment.id,
          },
        },
      });
      return;
    }

    setActionMessage({ type: "error", text: "Chức năng này chưa có API phù hợp để xử lý." });
  };

  const handleReviewSubmit = async ({ targetId, rating, review }) => {
    if (!targetId || !rating) {
      setActionMessage({ type: "error", text: "Vui lòng chọn số sao trước khi gửi đánh giá." });
      return;
    }

    setActionLoadingId(reviewAppointmentId);
    setActionMessage(null);

    try {
      await createAppointmentServiceReview({
        serviceId: targetId,
        rating,
        comment: review,
      });
      setAppointments((current) =>
        current.map((appointment) =>
          appointment.id === reviewAppointmentId
            ? { ...appointment, reviewed: true, canReview: false }
            : appointment,
        ),
      );
      setReviewAppointmentId(null);
      setActionMessage({ type: "success", text: "Đã gửi đánh giá dịch vụ thành công." });
    } catch (error) {
      setActionMessage({
        type: "error",
        text: error?.message || "Không thể gửi đánh giá lúc này.",
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="relative mx-auto flex w-full max-w-[939px] flex-col gap-8 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-[28px] font-bold leading-9 text-[#031635]">Lịch sử đặt lịch</h1>
        <p className="text-[15px] leading-6 text-[#667085]">
          Theo dõi lịch hẹn, trạng thái thanh toán và các dịch vụ đã đặt cho thú cưng.
        </p>
      </div>

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

      <SearchAndSort
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        onSearch={() => setSearchQuery(searchInput.trim())}
        onClearSearch={() => {
          setSearchInput("");
          setSearchQuery("");
        }}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      {searchQuery && (
        <p className="text-[16px] leading-[27px] text-[#414141]">
          Kết quả tìm kiếm cho &quot;{searchQuery}&quot;
        </p>
      )}

      {actionMessage && (
        <div
          className={`rounded-xl px-4 py-3 text-sm font-semibold ${
            actionMessage.type === "success"
              ? "bg-[#d9f4e4] text-[#137333]"
              : "bg-[#ffdad6] text-[#ba1a1a]"
          }`}
        >
          {actionMessage.text}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {isLoading ? (
          <p className="py-16 text-center text-[#0D47A1]">Đang tải lịch hẹn...</p>
        ) : filteredAppointments.length ? (
          filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              active={selectedId === appointment.id}
              onSelect={(item) => setSelectedId(item.id)}
              onAction={handleAction}
              actionLoading={actionLoadingId === appointment.id}
            />
          ))
        ) : (
          <p className="py-16 text-center text-[#667085]">Không tìm thấy lịch hẹn phù hợp.</p>
        )}
      </div>
      {loadError && !isLoading && (
        <p className="-mt-2 text-center text-sm text-[#0D47A1]">{loadError}</p>
      )}

      {/* <button
        type="button"
        className="focus-ring-brand mx-auto inline-flex items-center gap-2 text-sm leading-5 text-[#031635]"
      >
        <img src={appointmentImages.chevronDown} alt="" className="h-2 w-3" />
        Tải thêm lịch sử
      </button> */}

      <a
        href="/dat-lich"
        className="focus-ring-brand fixed bottom-11 right-10 z-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fcd400] text-3xl leading-none text-[#06105a] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]"
        aria-label="Đặt lịch mới"
      >
        +
      </a>

      {selectedAppointment && (
        <DetailPanel
          appointment={selectedAppointment}
          onClose={() => setSelectedId(null)}
          onAction={handleAction}
          actionLoading={actionLoadingId === selectedAppointment.id}
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
