import apiClient from "./apiClient";

function assertSuccess(response) {
  if (response?.EC !== 0) {
    throw new Error(response?.EM || "Request failed");
  }
  return response.DT;
}

function getPrimaryImage(pet = {}) {
  const primaryImage = Array.isArray(pet.pet_images)
    ? pet.pet_images.find((image) => image.is_primary) || pet.pet_images[0]
    : null;

  return pet.profile_image_url || primaryImage?.image_url || null;
}

function formatDateText(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
}

function formatTimeText(value) {
  if (!value) return "--:--";
  const match = String(value).match(/(\d{2}):(\d{2})/);
  return match ? `${match[1]}:${match[2]}` : String(value);
}

export function normalizePet(pet = {}) {
  const healthStatusCode = pet.health_status ?? pet.healthStatusCode ?? pet.healthStatus ?? "unknown";
  const healthStatusMap = {
    healthy: "Bình thường",
    treating: "Đang điều trị",
    need_recheck: "Cần tái khám",
    unknown: "",
  };

  return {
    id: String(pet.pet_id ?? pet.id ?? ""),
    pet_id: pet.pet_id ?? pet.id,
    speciesId: pet.species_id ?? pet.speciesId ?? pet.species?.species_id ?? "",
    breedId: pet.breed_id ?? pet.breedId ?? pet.breed?.breed_id ?? "",
    name: pet.pet_name ?? pet.name ?? "",
    species: pet.species?.species_name ?? pet.species_name ?? pet.species ?? "",
    breed: pet.breed?.breed_name ?? pet.breed_name ?? pet.breed ?? "",
    age: pet.age ?? "",
    gender: pet.gender ?? "",
    weight: pet.weight_kg ? `${pet.weight_kg} kg` : pet.weight ?? "",
    weightKg: pet.weight_kg ?? null,
    birthDate: pet.birth_date ?? pet.birthDate ?? "",
    healthStatusCode,
    healthStatus: healthStatusMap[healthStatusCode] || pet.healthStatus || healthStatusCode,
    medicalNotes: pet.medical_note ?? pet.medicalNotes ?? "",
    lastCheckup: pet.latest_exam_date ?? pet.lastCheckup ?? null,
    avatar: getPrimaryImage(pet),
    medicalRecords: Array.isArray(pet.medicalRecords)
      ? pet.medicalRecords
      : Array.isArray(pet.medical_records)
        ? pet.medical_records.map(normalizeMedicalRecord)
        : [],
    raw: pet,
  };
}

export function normalizeMedicalRecord(record = {}) {
  const attachment = Array.isArray(record.attachments) ? record.attachments[0] : null;
  const condition = record.record_name || record.condition || record.diagnosis || "Bệnh án";

  return {
    ...record,
    id: String(record.record_id || record.id || Date.now()),
    name: record.name || `${condition}.pdf`,
    date: record.date || formatDateText(record.visit_date),
    condition,
    doctor: record.doctor?.full_name || record.doctor || "Chưa rõ",
    notes: record.notes || record.treatment_note || record.diagnosis || record.symptoms || "Không có ghi chú y tế.",
    fileUrl: attachment?.file_url || record.fileUrl || "",
    sourceType: record.source_type,
  };
}

export function normalizeHealthDiary(diary = {}) {
  const entryDate = new Date(diary.entry_date || diary.date);
  const files = Array.isArray(diary.attachments)
    ? diary.attachments.map((attachment) => ({
        id: String(attachment.attachment_id || attachment.id || attachment.file_url),
        name: attachment.file_name || "Tệp đính kèm",
        url: attachment.file_url,
      }))
    : diary.files || [];

  return {
    ...diary,
    id: String(diary.diary_id || diary.id || Date.now()),
    sourceType: diary.sourceType || "diary",
    dateKey: Number.isNaN(entryDate.getTime()) ? diary.dateKey : entryDate.toISOString().slice(0, 10),
    day: Number.isNaN(entryDate.getTime()) ? diary.day : entryDate.getDate(),
    title: diary.title || diary.content || "Ghi chú",
    time: formatTimeText(diary.entry_time || diary.time),
    type: diary.color_code || diary.type || "blue",
    icon: diary.icon_code || diary.icon || "paw",
    files,
  };
}

export function normalizeReminder(reminder = {}) {
  const remindDate = new Date(reminder.remind_date || reminder.date);

  return {
    ...reminder,
    id: String(reminder.reminder_id || reminder.id || Date.now()),
    sourceType: "reminder",
    dateKey: Number.isNaN(remindDate.getTime()) ? reminder.dateKey : remindDate.toISOString().slice(0, 10),
    day: Number.isNaN(remindDate.getTime()) ? reminder.day : remindDate.getDate(),
    title: reminder.title || "Nhắc lịch",
    time: reminder.time || "--:--",
    type: reminder.color_code || reminder.type || "yellow",
    icon: reminder.icon_code || reminder.icon || "paw",
    notes: reminder.notes || "",
    status: reminder.status || "pending",
    files: [],
  };
}

export async function getMyPets() {
  const response = await apiClient.get("/my-pets");
  const data = assertSuccess(response);
  const petsArray = Array.isArray(data) ? data : (data && Array.isArray(data.pets) ? data.pets : []);
  return petsArray.map(normalizePet);
}

export async function getPetDetails(petId) {
  const response = await apiClient.get(`/pets/${petId}`);
  return normalizePet(assertSuccess(response));
}

export async function getPetSpecies() {
  const response = await apiClient.get("/pets/species");
  const species = assertSuccess(response);
  return Array.isArray(species) ? species : [];
}

export async function getPetBreeds(speciesId) {
  if (!speciesId) return [];
  const response = await apiClient.get("/pets/breeds", {
    params: { species_id: speciesId },
  });
  const breeds = assertSuccess(response);
  return Array.isArray(breeds) ? breeds : [];
}

function toPetPayload(pet = {}) {
  const healthStatusMap = {
    "Bình thường": "healthy",
    "Đang điều trị": "treating",
    "Có bệnh nền": "unknown",
    "Cần tái khám": "need_recheck",
  };

  return {
    pet_name: pet.name || pet.pet_name,
    species_id: pet.speciesId || pet.species_id,
    breed_id: pet.breedId || pet.breed_id || null,
    gender: pet.gender || "unknown",
    birth_date: pet.birthDate || pet.birth_date || null,
    age: pet.age || null,
    weight_kg: pet.weightKg || pet.weight_kg || null,
    health_status: healthStatusMap[pet.healthStatus] || pet.healthStatus || pet.health_status || "unknown",
    medical_note: pet.medicalNotes || pet.medical_note || null,
    profile_image_url: pet.avatar || pet.profile_image_url || null,
  };
}

export async function createPet(pet) {
  const response = await apiClient.post("/pets", toPetPayload(pet));
  return normalizePet(assertSuccess(response));
}

export async function updatePet(petId, pet) {
  const response = await apiClient.put(`/pets/${petId}`, toPetPayload(pet));
  return normalizePet(assertSuccess(response));
}

export async function deletePet(petId) {
  const response = await apiClient.delete(`/pets/${petId}`);
  return assertSuccess(response);
}

export async function getMedicalRecordsByPet(petId) {
  const response = await apiClient.get(`/medical-records/pet/${petId}`);
  const records = assertSuccess(response);
  return Array.isArray(records) ? records.map(normalizeMedicalRecord) : [];
}

function toMedicalRecordPayload(record = {}) {
  return {
    pet_id: record.petId || record.pet_id,
    record_name: record.condition || record.record_name || record.name,
    visit_date: record.visitDate || record.visit_date,
    diagnosis: record.diagnosis || record.condition || "",
    treatment_note: record.notes || record.treatment_note || "",
    symptoms: record.symptoms || "",
  };
}

export async function createMedicalRecord(record) {
  const response = await apiClient.post("/medical-records", toMedicalRecordPayload(record));
  return normalizeMedicalRecord(assertSuccess(response));
}

export async function updateMedicalRecord(recordId, record) {
  const response = await apiClient.put(`/medical-records/${recordId}`, toMedicalRecordPayload(record));
  return normalizeMedicalRecord(assertSuccess(response));
}

export async function deleteMedicalRecord(recordId) {
  const response = await apiClient.delete(`/medical-records/${recordId}`);
  return assertSuccess(response);
}

export async function getHealthDiariesByPet(petId, params = {}) {
  const response = await apiClient.get(`/health-diaries/pet/${petId}`, { params });
  const diaries = assertSuccess(response);
  return Array.isArray(diaries) ? diaries.map(normalizeHealthDiary) : [];
}

export async function getRemindersByPet(petId) {
  const response = await apiClient.get(`/reminders/pet/${petId}`);
  const reminders = assertSuccess(response);
  return Array.isArray(reminders) ? reminders.map(normalizeReminder) : [];
}

export async function createHealthDiary(diary) {
  const response = await apiClient.post("/health-diaries", {
    pet_id: diary.petId || diary.pet_id,
    entry_date: diary.entryDate || diary.entry_date,
    entry_time: diary.entryTime || diary.entry_time || null,
    icon_code: diary.icon || diary.icon_code || null,
    color_code: diary.type || diary.color_code || null,
    title: diary.title || "Ghi chú",
    content: diary.content || diary.title || "",
  });
  return normalizeHealthDiary(assertSuccess(response));
}

export async function createReminder(reminder) {
  const response = await apiClient.post("/reminders", {
    pet_id: reminder.petId || reminder.pet_id,
    reminder_type: reminder.reminderType || reminder.reminder_type || "other",
    title: reminder.title || reminder.content || "Nhắc lịch",
    remind_date: reminder.remindDate || reminder.remind_date,
    remind_before_days: reminder.remindBeforeDays ?? reminder.remind_before_days ?? 0,
    repeat_type: reminder.repeatType || reminder.repeat_type || "none",
    notes: reminder.notes || reminder.content || "",
  });
  return normalizeReminder({
    ...assertSuccess(response),
    icon: reminder.icon,
    type: reminder.type,
    time: reminder.time,
  });
}

export async function completeReminder(reminderId) {
  const response = await apiClient.patch(`/reminders/${reminderId}/complete`);
  return normalizeReminder(assertSuccess(response));
}

export async function deleteReminder(reminderId) {
  const response = await apiClient.delete(`/reminders/${reminderId}`);
  return assertSuccess(response);
}
