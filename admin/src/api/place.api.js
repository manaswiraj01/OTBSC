import api from "./axiosInstance";

// GET PLACES (pagination + search + filter)
export const getPlaces = (params) => {
  return api.get("/get/places", { params });
};

// GET SINGLE PLACE
export const getPlaceById = (id) => {
  return api.get(`/get/place/${id}`);
};

// ADD PLACE
export const addPlace = (data) => {
  return api.post("/add/place", data);
};

// UPDATE PLACE
export const updatePlace = (id, data) => {
  return api.patch(`/update/place/${id}`, data);
};

// DELETE PLACE
export const deletePlace = (id) => {
  return api.delete(`/delete/place/${id}`);
};