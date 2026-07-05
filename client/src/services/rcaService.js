import API from "./api";

// ================= GET ALL RCAs =================
export const getRCAs = async (search = "") => {
  const res = await API.get(
    `/rca?search=${search}`
  );
  return res.data;
};

// ================= GET SINGLE RCA =================
export const getRCA = async (id) => {
  const res = await API.get(`/rca/${id}`);
  return res.data;
};

// ================= CREATE RCA =================
export const createRCA = async (data) => {
  const res = await API.post("/rca", data);
  return res.data;
};

// ================= UPDATE RCA =================
export const updateRCA = async (id, data) => {
  const res = await API.put(`/rca/${id}`, data);
  return res.data;
};

// ================= DELETE RCA =================
export const deleteRCA = async (id) => {
  const res = await API.delete(`/rca/${id}`);
  return res.data;
};