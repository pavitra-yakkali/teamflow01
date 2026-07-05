import API from "./api";

// ================= GET ALL PROJECTS =================
export const getProjects = async (search = "") => {
  const response = await API.get(
    `/projects?search=${search}`
  );
  return response.data;
};

// ================= GET PROJECT BY ID =================
export const getProjectById = async (id) => {
  const response = await API.get(`/projects/${id}`);
  return response.data;
};

// ================= CREATE PROJECT =================
export const createProject = async (projectData) => {
  const response = await API.post(
    "/projects",
    projectData
  );
  return response.data;
};

// ================= UPDATE PROJECT =================
export const updateProject = async (
  id,
  projectData
) => {
  const response = await API.put(
    `/projects/${id}`,
    projectData
  );
  return response.data;
};

// ================= DELETE PROJECT =================
export const deleteProject = async (id) => {
  const response = await API.delete(
    `/projects/${id}`
  );
  return response.data;
};