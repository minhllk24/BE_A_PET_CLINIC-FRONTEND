export function getNumericPrice(value) {
  if (typeof value === "number") return value;
  return Number(String(value ?? "").replace(/[^\d-]/g, "")) || 0;
}

export function formatVnd(value) {
  return `${new Intl.NumberFormat("vi-VN", {
    maximumFractionDigits: 0,
  }).format(getNumericPrice(value))}đ`;
}
