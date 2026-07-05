import API from "./api";

// Get all activities
export const getActivities = async () => {
  const res = await API.get("/activity");
  return res.data;
};

// Get recent activities
export const getRecentActivities = async () => {
  const res = await API.get("/activity/recent");
  return res.data;
};

// Create activity
export const createActivity = async (data) => {
  const res = await API.post("/activity", data);
  return res.data;
};