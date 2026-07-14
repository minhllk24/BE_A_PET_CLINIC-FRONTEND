import axios from "axios";

const AUTH_STORAGE_KEY = "drPetAuthSession";
const LEGACY_AUTH_STORAGE_KEY = "isAuthenticated";

function clearExpiredAuthSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(LEGACY_AUTH_STORAGE_KEY);
  localStorage.removeItem("accessToken");
  sessionStorage.removeItem("accessToken");
  window.dispatchEvent(new CustomEvent("petclinic:auth-expired"));
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
});

apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status ?? null;
    const data = error.response?.data ?? null;
    const authExpired = status === 401 || data?.EC === -999;
    const message =
      authExpired
        ? "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại."
        : data?.EM ||
          data?.message ||
          data?.error ||
          error.message ||
          "API request failed";

    if (authExpired) {
      clearExpiredAuthSession();
    }

    return Promise.reject({
      status,
      message,
      data,
      authExpired,
    });
  },
);

export default apiClient;
