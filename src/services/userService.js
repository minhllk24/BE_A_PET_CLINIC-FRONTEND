import apiClient from "./apiClient";

function assertSuccess(response) {
  if (response?.EC !== 0) {
    throw new Error(response?.EM || "Request failed");
  }
  return response.DT;
}

function formatAddressLine(address) {
  return [
    address.address_line,
    address.ward,
    address.district,
    address.province,
  ]
    .filter(Boolean)
    .join(", ");
}

export function normalizeUserProfile(user = {}) {
  return {
    userId: String(user.user_id ?? user.userId ?? ""),
    fullName: user.full_name ?? user.fullName ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "",
    avatarUrl: user.avatar_url ?? user.avatarUrl ?? "",
    status: user.status ?? "",
    roleCode: user.role_code ?? user.roleCode ?? user.role?.role_code ?? "",
    raw: user,
  };
}

export function normalizeAddress(address = {}) {
  return {
    id: String(address.address_id ?? address.id ?? ""),
    addressId: address.address_id ?? address.id,
    name: address.recipient_name ?? address.name ?? "",
    phone: address.recipient_phone ?? address.phone ?? "",
    email: address.recipient_email ?? address.email ?? "",
    country: address.country ?? "Việt Nam",
    address: address.address_line ?? address.address ?? "",
    ward: address.ward ?? "",
    district: address.district ?? "",
    city: address.province ?? address.city ?? "",
    displayAddress: formatAddressLine(address) || address.address || "",
    isDefault: Boolean(address.is_default ?? address.isDefault),
    raw: address,
  };
}

function toUserPayload(profile = {}) {
  return {
    full_name: profile.fullName || profile.full_name,
    email: profile.email || null,
    phone: profile.phone || null,
    avatar_url: profile.avatarUrl || profile.avatar_url || null,
  };
}

function toAddressPayload(address = {}) {
  return {
    recipient_name: address.name || address.recipient || address.recipient_name,
    recipient_phone: address.phone || address.recipient_phone,
    recipient_email: address.email || address.recipient_email || null,
    address_line: address.address || address.address_line,
    ward: address.ward || null,
    district: address.district || null,
    province: address.city || address.province || null,
    country: address.country || "Việt Nam",
    is_default: Boolean(address.isDefault ?? address.is_default),
  };
}

export async function getUserAddresses(userId) {
  const response = await apiClient.get(`/users/${userId}/addresses`);
  const addresses = assertSuccess(response);
  return Array.isArray(addresses) ? addresses.map(normalizeAddress) : [];
}

export async function getUserProfile(userId) {
  const response = await apiClient.get(`/users/${userId}`);
  return normalizeUserProfile(assertSuccess(response));
}

export async function updateUserProfileApi(userId, profile) {
  const response = await apiClient.put(`/users/${userId}`, toUserPayload(profile));
  return normalizeUserProfile(assertSuccess(response));
}

export async function createUserAddress(userId, address) {
  const response = await apiClient.post(
    `/users/${userId}/addresses`,
    toAddressPayload(address),
  );
  return normalizeAddress(assertSuccess(response));
}

export async function updateUserAddress(addressId, address) {
  const response = await apiClient.put(
    `/addresses/${addressId}`,
    toAddressPayload(address),
  );
  return normalizeAddress(assertSuccess(response));
}

export async function deleteUserAddress(addressId) {
  const response = await apiClient.delete(`/addresses/${addressId}`);
  return assertSuccess(response);
}
