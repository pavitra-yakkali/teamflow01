import API from "./api";

export const getEvents = async () => {
  const res = await API.get("/events");
  return res.data;
};

export const createEvent = async (data) => {
  const res = await API.post("/events", data);
  return res.data;
};

export const updateEvent = async (id, data) => {
  const res = await API.put(`/events/${id}`, data);
  return res.data;
};

export const deleteEvent = async (id) => {
  const res = await API.delete(`/events/${id}`);
  return res.data;
};