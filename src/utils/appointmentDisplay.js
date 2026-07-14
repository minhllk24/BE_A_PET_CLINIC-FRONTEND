const STATUS_LABELS = {
  pending_payment: "Chờ thanh toán",
  confirmed: "Đã xác nhận",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
  no_show: "Không đến",
};

const STATUS_STYLES = {
  pending_payment: {
    badge: "bg-[#fff9c4] text-[#544600]",
    border: "border-l-[#fcd400]",
  },
  confirmed: {
    badge: "bg-[#d9f4e4] text-[#137333]",
    border: "border-l-[#d6f5e3]",
  },
  completed: {
    badge: "bg-[#dbe8ff] text-[#0d47a1]",
    border: "border-l-[#06105a]",
  },
  cancelled: {
    badge: "bg-[#ffdad6] text-[#ba1a1a]",
    border: "border-l-[#df3b3b]",
  },
  no_show: {
    badge: "bg-[#e6e8ea] text-[#44474e]",
    border: "border-l-[#e6e8ea]",
  },
};

const ONLINE_PAYMENT_METHODS = new Set(["momo", "zalopay", "vnpay", "bank", "atm", "card", "online"]);
const CLINIC_PAYMENT_METHODS = new Set(["cash", "pay_at_clinic", "store"]);

export const APPOINTMENT_FILTERS = [
  { value: "all", label: "Tất cả" },
  { value: "pending_payment", label: STATUS_LABELS.pending_payment },
  { value: "confirmed", label: STATUS_LABELS.confirmed },
  { value: "completed", label: STATUS_LABELS.completed },
  { value: "cancelled", label: STATUS_LABELS.cancelled },
  { value: "no_show", label: STATUS_LABELS.no_show },
];

export function isOnlinePayment(appointment) {
  return ONLINE_PAYMENT_METHODS.has(appointment.paymentMethod);
}

export function isClinicPayment(appointment) {
  return CLINIC_PAYMENT_METHODS.has(appointment.paymentMethod);
}

export function getAppointmentDisplayStatus(appointment) {
  const status =
    appointment.status === "pending_payment" && isClinicPayment(appointment)
      ? "confirmed"
      : appointment.status;

  return {
    value: status,
    label: STATUS_LABELS[status] || STATUS_LABELS.confirmed,
    ...(STATUS_STYLES[status] || STATUS_STYLES.confirmed),
  };
}

export function getAppointmentActions(appointment) {
  const { value: status } = getAppointmentDisplayStatus(appointment);

  if (status === "pending_payment") {
    return [{ key: "pay", label: "THANH TOÁN", variant: "yellow" }];
  }

  if (status === "confirmed") {
    return [
      appointment.canReschedule && { key: "reschedule", label: "ĐỔI LỊCH", variant: "primaryOutline" },
      appointment.canCancel && { key: "cancel", label: "HỦY LỊCH", variant: "dangerOutline" },
    ].filter(Boolean);
  }

  if (status === "completed") {
    return [
      appointment.canRebook && { key: "rebook", label: "ĐẶT LẠI", variant: "yellow" },
      appointment.canReview &&
        !appointment.reviewed && { key: "review", label: "ĐÁNH GIÁ", variant: "primaryOutline" },
    ].filter(Boolean);
  }

  if (status === "cancelled" || status === "no_show") {
    return appointment.canRebook ? [{ key: "rebook", label: "ĐẶT LẠI", variant: "yellow" }] : [];
  }

  return [];
}

export function getAppointmentTimelineSteps(appointment) {
  const { value: status } = getAppointmentDisplayStatus(appointment);
  const hasPaymentStep = !isClinicPayment(appointment);
  const paid = appointment.paymentStatus === "paid";
  const terminal = status === "cancelled" || status === "no_show";

  if (status === "cancelled") {
    return [
      { key: "booked", label: "Đã đặt", state: "completed" },
      hasPaymentStep && { key: "paid", label: "Đã thanh toán", state: paid ? "completed" : "disabled" },
      { key: "cancelled", label: "Đã hủy", state: "active" },
      { key: "completed", label: "Hoàn thành", state: "disabled" },
    ].filter(Boolean);
  }

  if (status === "no_show") {
    return [
      { key: "booked", label: "Đã đặt", state: "completed" },
      hasPaymentStep && { key: "paid", label: "Đã thanh toán", state: paid ? "completed" : "disabled" },
      { key: "confirmed", label: "Đã xác nhận", state: "completed" },
      { key: "no_show", label: "Không đến", state: "active" },
      { key: "completed", label: "Hoàn thành", state: "disabled" },
    ].filter(Boolean);
  }

  return [
    { key: "booked", label: "Đã đặt", state: "completed" },
    hasPaymentStep && {
      key: "paid",
      label: "Đã thanh toán",
      state: paid || status === "completed" ? "completed" : status === "pending_payment" ? "active" : "disabled",
    },
    {
      key: "confirmed",
      label: status === "confirmed" || status === "completed" ? "Đã xác nhận" : "Đang chờ",
      state: status === "pending_payment" ? "disabled" : status === "confirmed" ? "active" : "completed",
    },
    {
      key: "completed",
      label: "Hoàn thành",
      state: status === "completed" ? "active" : terminal ? "disabled" : "disabled",
    },
  ].filter(Boolean);
}
