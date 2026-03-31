import api from "@/api/axiosInstance";

export const getDashboardDataApi = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};