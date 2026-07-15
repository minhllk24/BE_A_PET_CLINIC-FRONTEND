import { rescueImages } from "../assets/rescueImages";
import apiClient from "./apiClient";

function assertSuccess(response) {
  if (response?.EC !== undefined && response.EC !== 0) {
    throw new Error(response.EM || "Khong the tai du lieu cuu tro");
  }
  return response?.DT ?? response;
}

function getPrimaryImage(images = []) {
  return images.find((item) => item.is_primary)?.image_url || images[0]?.image_url || rescueImages.rescuePlaceholder;
}

export function normalizeAdoptionPet(pet = {}) {
  const state = pet.status === "adopted" ? "adopted" : "waiting";

  return {
    ...pet,
    id: String(pet.adoption_pet_id || pet.id || ""),
    name: pet.name || "Bạn nhỏ",
    image: getPrimaryImage(pet.images || pet.adoption_pet_images || []),
    state,
    ribbon: state === "adopted" ? "Đã có tổ ấm" : "Đang chờ nhận nuôi",
    description: pet.description || pet.personality || "Một bạn nhỏ đang chờ được yêu thương và chăm sóc.",
    status: [pet.species, pet.age_text, pet.region].filter(Boolean).join(" - ") || "Đang chờ nhận nuôi",
    need: pet.adoption_conditions || "Cần một gia đình có thời gian chăm sóc và đồng hành lâu dài.",
  };
}

export function normalizeAdoptionRequest(request = {}) {
  const pet = request.adoption_pet || request.pet || {};
  const status = request.status || "pending";
  const statusLabels = {
    pending: "Đang chờ duyệt",
    approved: "Đã được chấp nhận",
    rejected: "Đã bị từ chối",
  };

  return {
    ...request,
    id: String(request.adoption_request_id || request.id || ""),
    petId: String(pet.adoption_pet_id || pet.id || request.adoption_pet_id || ""),
    petName: pet.name || "Bạn nhỏ",
    petImage: getPrimaryImage(pet.images || pet.adoption_pet_images || []),
    status,
    statusLabel: statusLabels[status] || status,
    submittedAt: request.created_at || request.createdAt || null,
    reason: request.reason || "",
  };
}

export function normalizeRescueStation(station = {}) {
  return {
    ...station,
    id: String(station.station_id || station.id || ""),
    name: station.station_name || "Trạm cứu hộ",
    image: rescueImages.partners.vawa,
    href: station.fanpage_url || station.donation_url || "#",
    region: station.address || "Việt Nam",
    address: station.address || "",
    description: [station.phone ? `Hotline: ${station.phone}` : "Đang cập nhật thông tin liên hệ."],
    phone: station.phone || "",
  };
}

export async function getAdoptionPets() {
  const response = await apiClient.get("/adoptions/pets");
  return assertSuccess(response).map(normalizeAdoptionPet);
}

export async function getRescueStations() {
  const response = await apiClient.get("/rescue/stations");
  return assertSuccess(response).map(normalizeRescueStation);
}

export async function createAdoptionRequest(petId, values) {
  const response = await apiClient.post("/adoptions/requests", {
    adoption_pet_id: petId,
    full_name: values.fullName,
    phone: values.phone,
    gender: values.gender,
    birth_year: values.birthYear,
    address: values.address,
    reason: values.adoptionReason || values.futurePlan || "Mong muốn nhận nuôi và chăm sóc thú cưng.",
    housing_info: [
      values.housingType && `Nhà ở: ${values.housingType}`,
      values.familyConsent && `Gia đình đồng ý: ${values.familyConsent}`,
      values.currentPets && `Thú cưng hiện tại: ${values.currentPets}`,
      values.aloneTime && `Thời gian ở một mình: ${values.aloneTime}`,
    ].filter(Boolean).join("\n"),
    experience: values.futurePlan || values.currentPets || null,
  });
  return assertSuccess(response);
}

export async function getMyAdoptionRequests() {
  const response = await apiClient.get("/adoptions/my-requests");
  const requests = assertSuccess(response);
  return Array.isArray(requests) ? requests.map(normalizeAdoptionRequest) : [];
}
