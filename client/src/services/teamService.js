import API from "./api";

// Get Team Members
export const getTeamMembers = async (projectId) => {
  const res = await API.get(`/team/${projectId}`);
  return res.data;
};

// Add Member
export const addMember = async (
  projectId,
  memberId
) => {
  const res = await API.post(
    `/team/${projectId}`,
    { memberId }
  );

  return res.data;
};

// Remove Member
export const removeMember = async (
  projectId,
  memberId
) => {
  const res = await API.delete(
    `/team/${projectId}/${memberId}`
  );

  return res.data;
};