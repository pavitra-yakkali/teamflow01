import API from "./api";

// ================= GET ALL TASKS =================
export const getTasks = async (
  search = "",
  status = "",
  priority = ""
) => {
  const res = await API.get(
    `/tasks?search=${search}&status=${status}&priority=${priority}`
  );

  return res.data;
};

// ================= GET TASK BY ID =================
export const getTaskById = async (id) => {
  const response = await API.get(`/tasks/${id}`);
  return response.data;
};

// ================= CREATE TASK =================
export const createTask = async (taskData) => {
  const response = await API.post("/tasks", taskData);
  return response.data;
};

// ================= UPDATE TASK =================
export const updateTask = async (id, taskData) => {
  const response = await API.put(`/tasks/${id}`, taskData);
  return response.data;
};

// ================= DELETE TASK =================
export const deleteTask = async (id) => {
  const response = await API.delete(`/tasks/${id}`);
  return response.data;
};
// ================= ADD COMMENT =================
export const addComment = async (taskId, text) => {
  const response = await API.post(
    `/tasks/${taskId}/comment`,
    { text }
  );

  return response.data;
};
// ================= ADD COMMENT =================
