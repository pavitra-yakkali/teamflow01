import API from "./api";

export const getDashboardReport = async () => {
  const res = await API.get("/reports/dashboard");
  return res.data;
};

export const exportReport = async () => {
  const res = await API.get(
    "/reports/export",
    {
      responseType: "blob",
    }
  );

  return res.data;
};