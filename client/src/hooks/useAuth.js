const useAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const loginUser = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return {
    user,
    isAuthenticated: !!user,
    loginUser,
    logoutUser,
  };
};

export default useAuth;