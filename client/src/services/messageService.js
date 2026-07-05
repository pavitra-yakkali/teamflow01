import API from "./api";

// Get conversation
export const getConversation = async (userId) => {
  const res = await API.get(`/messages/${userId}`);
  return res.data;
};

// Send message (text + attachment)
export const sendMessage = async (formData) => {
  const res = await API.post(
    "/messages",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

// Mark messages as seen
export const markSeen = async (userId) => {
  const res = await API.put(`/messages/seen/${userId}`);
  return res.data;
};