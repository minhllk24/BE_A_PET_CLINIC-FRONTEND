import apiClient from "./apiClient";

function assertSuccess(response) {
  if (response?.EC !== 0) {
    throw new Error(response?.EM || "Request failed");
  }
  return response.DT;
}

export async function applyVoucher({ code, orderValue }) {
  const response = await apiClient.post("/vouchers/apply", {
    code,
    order_value: orderValue,
  });
  return assertSuccess(response);
}
