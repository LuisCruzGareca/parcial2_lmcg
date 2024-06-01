import { useAuthStore } from "@/stores/indess";
import Axios from "axios";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ENDPOINT,
});
axios.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (config.headers) {
    config.headers["Content-type"] = "application/json";
    config.headers["Authorization"] = "Bearer " + authStore.token;
  }
  return config;
});
export default axios;
