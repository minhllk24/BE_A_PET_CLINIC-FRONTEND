import { bookingImages } from "../assets/bookingImages";

export const BOOKING_SERVICES = [
  { id: "bath", serviceTypeId: "grooming", name: "Tắm sấy khử mùi", desc: "Vệ sinh sạch sẽ, sấy khô và xịt nước hoa cao cấp", price: 150000, weightSurcharge: { minWeight: 10, amount: 50000 } },
  { id: "trim", serviceTypeId: "grooming", name: "Cắt tỉa lông tạo kiểu", desc: "Tạo kiểu theo yêu cầu, tỉa gọn chân và bụng", price: 250000, weightSurcharge: { minWeight: 10, amount: 50000 } },
  { id: "nails", serviceTypeId: "grooming", name: "Cắt móng & Mài dũa", desc: "Cắt tỉa móng gọn gàng, tránh trầy xước", price: 60000 },
  { id: "ear-cleaning", serviceTypeId: "grooming", name: "Vệ sinh tai", desc: "Làm sạch tai nhẹ nhàng, hỗ trợ giảm mùi và ngứa", price: 80000 },
  { id: "teeth-cleaning", serviceTypeId: "grooming", name: "Vệ sinh răng miệng", desc: "Làm sạch mảng bám cơ bản và khử mùi hơi thở", price: 180000 },
  { id: "parasite-treatment", serviceTypeId: "grooming", name: "Điều trị ve rận", desc: "Xử lý ve rận, bọ chét và tư vấn phòng ngừa tái nhiễm", price: 220000 },
  { id: "general-checkup", serviceTypeId: "clinic", name: "Khám tổng quát", desc: "Kiểm tra cân nặng, nhiệt độ và các dấu hiệu lâm sàng", price: 200000 },
  { id: "deworming", serviceTypeId: "clinic", name: "Tẩy giun định kỳ", desc: "Tư vấn liều dùng và tẩy giun theo cân nặng", price: 120000 },
  { id: "vaccine", serviceTypeId: "clinic", name: "Tiêm phòng vaccine", desc: "Tiêm phòng theo lịch và theo dõi phản ứng sau tiêm", price: 300000 },
];

export const BOOKING_PAYMENT_METHODS = [
  { id: "momo", label: "MoMo", icon: bookingImages.onlineMomoLogo },
  { id: "zalopay", label: "ZaloPay", icon: bookingImages.onlineZalopayLogo },
  { id: "vnpay", label: "VNPay", icon: bookingImages.onlineVnpayLogo },
  { id: "bank", label: "Chuyển khoản ngân hàng", icon: bookingImages.onlineBankIcon },
  { id: "atm", label: "Thẻ ATM", icon: bookingImages.onlineCardIcon },
  { id: "card", label: "Thẻ Tín dụng/Ghi nợ", icon: bookingImages.onlineCreditCardIcon || bookingImages.onlineCardIcon },
];

export const BOOKING_SERVICE_TYPE_RULES = {
  clinic: { slotMinutes: 30, maxAppointmentsPerBranch: 3 },
  grooming: { slotMinutes: 60, maxAppointmentsPerBranch: 2 },
};

export const BOOKING_WORKING_HOURS = {
  start: "08:00",
  end: "20:00",
};

export const BOOKING_SERVICE_TYPES = [
  { id: "clinic", title: "Khám & Điều trị", desc: "Khám sức khỏe và điều trị bệnh", icon: bookingImages.serviceVeterinaryClinicIcon },
  { id: "grooming", title: "Grooming & Spa", desc: "Tắm, cắt tỉa, làm đẹp cho thú cưng", icon: bookingImages.serviceSpaGroomingIcon },
];

