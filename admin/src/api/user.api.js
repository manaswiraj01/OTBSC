import api from "./axiosInstance";

// ================= FETCH USERS =================
export const fetchUsersApi = (token, page = 1, limit = 10) => {
  return api.get(`/users?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// ================= DELETE USER =================
export const deleteUserApi = (userId, token) => {
  return api.delete(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};