import api from "./axiosInstance";

export const fetchUsersApi = (token) => {
  return api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUserApi = (userId, token) => {
  return api.delete(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
