import apiClient from "./apiClient";

function assertSuccess(response) {
  if (response?.EC !== undefined && response.EC !== 0) {
    throw new Error(response.EM || "Yeu cau dat lich khong thanh cong");
  }
  return response?.DT ?? response;
}

function formatTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) {
    return `${String(date.getUTCHours()).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}`;
  }
  const match = String(value).match(/(\d{2}):(\d{2})/);
  return match ? `${match[1]}:${match[2]}` : String(value);
}

function formatDateText(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
}

function formatShortDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "short", year: "numeric" });
}

function inferServiceType(service) {
  const categoryName = service?.category?.category_name || "";
  if (/groom|spa/i.test(categoryName) || categoryName.includes("Grooming")) return "grooming";
  return "clinic";
}

function normalizeAppointmentStatus(appointment) {
  if (appointment.status === "missed") return "no_show";
  if (appointment.status === "pending" && (appointment.payment_status === "waiting_store_payment" || appointment.payment_method === "store")) {
    return "confirmed";
  }
  if (appointment.status === "pending") return "pending_payment";
  if (
    appointment.payment_status === "unpaid" &&
    appointment.payment_method !== "store" &&
    appointment.status !== "cancelled" &&
    appointment.status !== "completed"
  ) {
    return "pending_payment";
  }
  return appointment.status || "confirmed";
}

function getAppointmentServiceSummary(appointment) {
  const appointmentServices = appointment.appointment_services || appointment.services || [];
  const firstService = appointmentServices[0];
  const serviceNames = appointmentServices
    .map((item) => item.service?.service_name || item.service_name)
    .filter(Boolean);
  const totalPrice = appointmentServices.reduce((sum, item) => {
    const quantity = Number(item.quantity || 1);
    const lineTotal = Number(item.total_price ?? 0);
    if (lineTotal) return sum + lineTotal;
    return sum + Number(item.unit_price || item.service?.base_price || 0) * quantity + Number(item.surcharge_amount || 0);
  }, 0);

  return {
    id: String(firstService?.service_id || firstService?.service?.service_id || ""),
    name: serviceNames.join(", ") || "Dịch vụ",
    description: firstService?.service?.description || "",
    price: totalPrice,
  };
}

function getAppointmentServices(appointment) {
  const appointmentServices = appointment.appointment_services || appointment.services || [];
  return appointmentServices
    .map((item) => {
      const service = item.service || {};
      const serviceId = item.service_id || service.service_id || item.id;
      if (!serviceId) return null;
      return {
        id: String(serviceId),
        serviceId: String(serviceId),
        name: service.service_name || item.service_name || item.name || "",
        serviceTypeId: inferServiceType(service),
        quantity: Number(item.quantity || 1),
      };
    })
    .filter(Boolean);
}

export function normalizeAppointmentHistoryItem(appointment = {}) {
  const startTime = formatTime(appointment.start_time);
  const dateText = formatDateText(appointment.appointment_date);
  const service = getAppointmentServiceSummary(appointment);
  const services = getAppointmentServices(appointment);
  const status = normalizeAppointmentStatus(appointment);
  const pet = appointment.pet || {};
  const speciesName = pet.species?.species_name || appointment.pet_species_snapshot || "";

  return {
    ...appointment,
    id: String(appointment.appointment_id || appointment.id || ""),
    code: appointment.appointment_code || appointment.code || "",
    rawDate: appointment.appointment_date,
    status,
    paymentMethod: appointment.payment_method || (appointment.payment_status === "waiting_store_payment" ? "store" : "online"),
    paymentStatus: appointment.payment_status || "unpaid",
    canCancel: ["pending", "confirmed", "pending_payment"].includes(status),
    canReschedule: ["pending", "confirmed"].includes(status),
    canReview: status === "completed",
    canRebook: ["completed", "cancelled", "no_show"].includes(status),
    reviewed: false,
    freeChangeDaysLeft: 0,
    owner: {
      name: appointment.customer_name_snapshot || appointment.user?.full_name || "",
      phone: appointment.customer_phone_snapshot || appointment.user?.phone || "",
      address: appointment.branch?.address || "",
    },
    pet: {
      name: pet.pet_name || appointment.pet_name_snapshot || "Thú cưng",
      breed: pet.breed?.breed_name || appointment.pet_breed_snapshot || speciesName,
      age: pet.age || "",
      gender: pet.gender === "male" ? "Đực" : pet.gender === "female" ? "Cái" : "",
      weight: pet.weight_kg ? `${pet.weight_kg}kg` : "",
      image: pet.profile_image_url || pet.pet_images?.[0]?.image_url || "",
      healthBadge: pet.health_status === "healthy" ? "" : pet.health_status || "",
      note: pet.medical_note || appointment.note || "",
    },
    service: {
      ...service,
      date: formatShortDate(appointment.appointment_date),
      dateText,
      time: startTime,
      timeRange: appointment.end_time ? `${startTime} - ${formatTime(appointment.end_time)}` : startTime,
    },
    services,
  };
}

export function normalizeBookingService(service) {
  return {
    ...service,
    id: String(service.service_id),
    serviceId: String(service.service_id),
    serviceTypeId: inferServiceType(service),
    name: service.service_name,
    desc: service.description || "",
    price: Number(service.base_price || 0),
    isWeightSurchargeApplied: Boolean(service.is_weight_surcharge_applied),
  };
}

export function normalizeBranch(branch) {
  return {
    ...branch,
    id: String(branch.branch_id),
    label: branch.branch_name ? `${branch.branch_name} - ${branch.address}` : branch.address,
  };
}

export function normalizeSlot(slot) {
  const start = formatTime(slot.start_time);
  const end = formatTime(slot.end_time);
  const bookedCount = Number(slot.booked_count || 0);
  const maxAppointments = Number(slot.max_booking || 1);

  return {
    ...slot,
    id: String(slot.slot_id),
    value: `${start} - ${end}`,
    bookedCount,
    maxAppointments,
    available: slot.status === "available" && bookedCount < maxAppointments,
  };
}

function groupSlotsByTime(slots) {
  const groupedSlots = new Map();

  slots.forEach((slot) => {
    const current = groupedSlots.get(slot.value);
    const remaining = Math.max(0, slot.maxAppointments - slot.bookedCount);

    if (!current) {
      groupedSlots.set(slot.value, {
        ...slot,
        bookedCount: slot.bookedCount,
        maxAppointments: slot.maxAppointments,
        available: slot.available,
        remaining,
      });
      return;
    }

    const currentRemaining = Math.max(0, current.maxAppointments - current.bookedCount);
    const shouldUseSlotForBooking = slot.available && (!current.available || remaining > currentRemaining);

    groupedSlots.set(slot.value, {
      ...current,
      ...(shouldUseSlotForBooking
        ? {
            id: slot.id,
            slot_id: slot.slot_id,
            doctor_id: slot.doctor_id,
            doctor: slot.doctor,
            status: slot.status,
          }
        : {}),
      bookedCount: current.bookedCount + slot.bookedCount,
      maxAppointments: current.maxAppointments + slot.maxAppointments,
      available: current.available || slot.available,
      remaining: current.remaining + remaining,
    });
  });

  return Array.from(groupedSlots.values()).map(({ remaining, ...slot }) => slot);
}

export async function getBranches() {
  const response = await apiClient.get("/branches");
  return assertSuccess(response).map(normalizeBranch);
}

export async function getServices(params = {}) {
  const response = await apiClient.get("/services", { params: { limit: 100, ...params } });
  const payload = assertSuccess(response);
  return (payload?.services || payload || []).map(normalizeBookingService);
}

export async function getAppointmentSlots({ date, branchId, serviceType }) {
  const response = await apiClient.get("/appointments/slots", {
    params: {
      date,
      branch_id: branchId || undefined,
      service_type: serviceType === "grooming" ? "grooming" : "exam",
    },
  });
  return groupSlotsByTime(assertSuccess(response).map(normalizeSlot));
}

export async function bookAppointment(payload) {
  const response = await apiClient.post("/appointments/book", payload);
  return assertSuccess(response);
}

export async function previewAppointmentPricing(payload) {
  const response = await apiClient.post("/appointments/preview-pricing", payload);
  return assertSuccess(response);
}

export async function getAppointmentHistory() {
  const response = await apiClient.get("/appointments/my-history");
  const data = assertSuccess(response);
  const appointmentsArray = Array.isArray(data) ? data : (data && Array.isArray(data.data) ? data.data : []);
  return appointmentsArray.map(normalizeAppointmentHistoryItem);
}

export async function cancelAppointment(appointmentId) {
  const response = await apiClient.patch(`/appointments/${appointmentId}/cancel`);
  return assertSuccess(response);
}

export async function checkoutAppointment(appointmentId, { paymentMethod = "store", voucherCode } = {}) {
  const response = await apiClient.post(`/appointments/${appointmentId}/checkout`, {
    payment_method: paymentMethod,
    voucher_code: voucherCode || undefined,
  });
  return assertSuccess(response);
}

export async function createAppointmentServiceReview({ serviceId, rating, comment }) {
  const response = await apiClient.post("/reviews", {
    target_type: "service",
    target_id: String(serviceId),
    rating,
    comment: comment || "",
  });
  return assertSuccess(response);
}
