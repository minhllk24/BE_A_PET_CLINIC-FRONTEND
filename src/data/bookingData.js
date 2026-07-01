import { bookingImages } from "../assets/bookingImages";

export const BOOKING_SERVICES = [
  { id: "bath", name: "Tắm sấy khử mùi", desc: "Vệ sinh sạch sẽ, sấy khô và xịt nước hoa cao cấp", price: 150000, weightSurcharge: { minWeight: 10, amount: 50000 } },
  { id: "trim", name: "Cắt tỉa lông tạo kiểu", desc: "Tạo kiểu theo yêu cầu, tỉa gọn chân và bụng", price: 250000, weightSurcharge: { minWeight: 10, amount: 50000 } },
  { id: "nails", name: "Cắt móng & Mài dũa", desc: "Cắt tỉa móng gọn gàng, tránh trầy xước", price: 60000 },
];

export const BOOKING_PAYMENT_METHODS = [
  { id: "momo", label: "MoMo", icon: bookingImages.onlineMomoLogo },
  { id: "zalopay", label: "ZaloPay", icon: bookingImages.onlineZalopayLogo },
  { id: "vnpay", label: "VNPay", icon: bookingImages.onlineVnpayLogo },
  { id: "bank", label: "Chuyển khoản ngân hàng", icon: bookingImages.onlineBankIcon },
  { id: "atm", label: "Thẻ ATM", icon: bookingImages.onlineCardIcon },
  { id: "card", label: "Thẻ Tín dụng/Ghi nợ", icon: bookingImages.onlineCreditCardIcon || bookingImages.onlineCardIcon },
];

export const BOOKING_TIME_SLOTS = [
  { value: "08:00 - 09:00", available: true },
  { value: "09:30 - 10:30", available: true },
  { value: "11:00 - 12:00", available: false },
  { value: "13:30 - 14:30", available: true },
  { value: "15:00 - 16:00", available: true },
  { value: "16:00 - 17:00", available: true },
];

export const BOOKING_SERVICE_TYPES = [
  { id: "clinic", title: "Khám và tiêm phòng", desc: "Khám sức khỏe và tiêm phòng định kỳ", icon: bookingImages.serviceVeterinaryClinicIcon },
  { id: "grooming", title: "Spa & Grooming", desc: "Tắm, cắt tỉa, làm đẹp cho thú cưng", icon: bookingImages.serviceSpaGroomingIcon },
];

