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
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status ?? null;
    const data = error.response?.data ?? null;
    const authExpired = status === 401 || data?.EC === -999;

    if (authExpired && !originalRequest._retry && originalRequest.url !== '/refresh') {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post(`${apiClient.defaults.baseURL}/refresh`, {}, { withCredentials: true });
        
        const newToken = refreshResponse.data?.DT?.access_token || refreshResponse.data?.access_token;
        if (newToken) {
          if (localStorage.getItem("accessToken")) {
            localStorage.setItem("accessToken", newToken);
          } else if (sessionStorage.getItem("accessToken")) {
            sessionStorage.setItem("accessToken", newToken);
          }
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        
        return apiClient(originalRequest);
      } catch (refreshError) {
        clearExpiredAuthSession();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

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
