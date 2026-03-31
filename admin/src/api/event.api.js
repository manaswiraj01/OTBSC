import api from "./axiosInstance";

// GET EVENTS (pagination + search)
export const getEvents = (params) => {
  return api.get("/events", { params });
};

// GET SINGLE EVENT
export const getEventById = (id) => {
  return api.get(`/events/${id}`);
};

// ADD EVENT
export const addEvent = (data) => {
  return api.post("/events/create", data);
};

// UPDATE EVENT
export const updateEvent = (id, data) => {
  return api.patch(`/events/update/${id}`, data);
};

// DELETE EVENT
export const deleteEvent = (id) => {
  return api.delete(`/events/delete/${id}`);
};