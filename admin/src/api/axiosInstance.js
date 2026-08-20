import axios from "axios";

let getTokenFunction = null;

// Clerk ka getToken function yahan set hoga
export const setTokenFunction = (getToken) => {
  getTokenFunction = getToken;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// Har request ke saath Clerk token attach karo
api.interceptors.request.use(
  async (config) => {
    try {
      if (getTokenFunction) {
        const token = await getTokenFunction();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error("Error getting Clerk token:", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;