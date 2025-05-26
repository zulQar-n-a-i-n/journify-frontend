import axios from "axios";

// Create the initial instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/dashboard/",
});

// Request interceptor to add the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors and refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;

        // Update localStorage
        localStorage.setItem("token", newAccessToken);

        // Update Authorization header
        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login"; // Redirect to login if refresh fails
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
