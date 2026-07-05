import { FaBell, FaUserCircle } from "react-icons/fa";
import  useAuth  from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-8">

      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-6">

        <button className="relative">
          <FaBell className="text-2xl text-gray-600 hover:text-blue-600" />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            0
          </span>
        </button>

        <div className="flex items-center gap-3">
          <FaUserCircle className="text-4xl text-blue-600" />

          <div>
            <h3 className="font-semibold">
              {user?.name || "Guest"}
            </h3>

            <p className="text-sm text-gray-500">
              {user?.role || "Developer"}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;