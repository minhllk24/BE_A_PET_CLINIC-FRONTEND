import { productCardImages } from "../components/product/productCardAssets";

export const ORDER_STATUS = {
  awaiting_payment: { label: "Chờ thanh toán", badgeClass: "bg-[#FFF9C4]" },
  processing: { label: "Đang xử lý", badgeClass: "bg-[#FFF4E5]" },
  shipping: { label: "Đang giao hàng", badgeClass: "bg-[#B3E5FC]" },
  delivered: { label: "Đã giao", badgeClass: "bg-[#C8E6C9]" },
  cancelled: { label: "Đã hủy", badgeClass: "bg-[#EF9A9A]" },
};

export const ORDER_FILTERS = [
  { value: "all", label: "Tất cả" },
  ...Object.entries(ORDER_STATUS).map(([value, status]) => ({
    value,
    label: status.label,
  })),
];

const products = [
  {
    id: "petsol-blue",
    name: "Hạt dinh dưỡng cao cấp Petsol",
    price: 50000,
    quantity: 2,
    variant: "Màu xanh",
    size: "1,5kg",
    image: productCardImages.placeholder,
  },
  {
    id: "petsol-salmon",
    name: "Hạt Petsol vị cá hồi",
    price: 75000,
    quantity: 1,
    variant: "Cá hồi",
    size: "2kg",
    image: productCardImages.placeholder,
  },
  {
    id: "pet-bowl",
    name: "Bát ăn chống trượt cho thú cưng",
    price: 65000,
    quantity: 1,
    variant: "Màu vàng",
    size: "M",
    image: productCardImages.placeholder,
  },
  {
    id: "pet-toy",
    name: "Đồ chơi bóng cao su cho chó mèo",
    price: 35000,
    quantity: 1,
    variant: "Màu xanh",
    size: "S",
    image: productCardImages.placeholder,
  },
];

const shared = {
  paymentMethod: "Thanh toán khi nhận hàng",
  shippingFee: 30000,
  discount: 10000,
  recipient: {
    name: "Kiều Tiên",
    phone: "0935010927",
    address:
      "669 Đỗ Mười (Quốc lộ 1A cũ), Khu phố 3, Phường Linh Xuân, Thành phố Thủ Đức, TP.HCM",
  },
};

export const ORDERS = [
  {
    ...shared,
    id: "3354654654525",
    status: "awaiting_payment",
    paymentMethod: "Thanh toán trực tuyến",
    paymentExpiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    orderedAt: new Date().toISOString(),
    estimatedDelivery: null,
    products: [products[0], products[2]],
  },
  {
    ...shared,
    id: "3354654654526",
    status: "processing",
    orderedAt: "2026-05-22T08:30:00",
    estimatedDelivery: "2026-05-27",
    products: [products[0]],
  },
  {
    ...shared,
    id: "3354654654527",
    status: "processing",
    orderedAt: "2026-05-23T10:15:00",
    estimatedDelivery: "2026-05-28",
    products: [products[0], products[1]],
  },
  {
    ...shared,
    id: "3354654654528",
    status: "shipping",
    orderedAt: "2026-05-24T13:45:00",
    estimatedDelivery: "2026-05-29",
    products: [products[1], products[2], products[3]],
  },
  {
    ...shared,
    id: "3354654654529",
    status: "delivered",
    orderedAt: "2026-05-20T09:20:00",
    estimatedDelivery: "2026-05-25",
    products: [products[0], products[2]],
  },
  {
    ...shared,
    id: "3354654654530",
    status: "cancelled",
    orderedAt: "2026-05-18T16:10:00",
    estimatedDelivery: null,
    products: [products[3]],
  },
];

export const getOrderSubtotal = (order) =>
  order.products.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

export const getOrderTotal = (order) =>
  Math.max(0, getOrderSubtotal(order) + order.shippingFee - order.discount);

export const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);

export const formatOrderDate = (value, includeTime = true) =>
  new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...(includeTime
      ? { hour: "2-digit", minute: "2-digit", hour12: false }
      : {}),
  }).format(new Date(value));
