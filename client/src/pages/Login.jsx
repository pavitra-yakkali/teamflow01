import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../services/authService";
import  useAuth  from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await login(formData);

      loginUser(data.user, data.token);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center">

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-[420px]">

        <h1 className="text-5xl font-bold text-center text-blue-600">
          TeamFlow
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Welcome Back 👋
        </p>

        {error && (
          <p className="text-red-500 text-center mt-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-8">

          <div className="relative mb-5">

            <FaEnvelope className="absolute left-4 top-4 text-gray-400"/>

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          <div className="relative">

            <FaLock className="absolute left-4 top-4 text-gray-400"/>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full border rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4"
            >
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
            </button>

          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl mt-8 transition"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link
            className="text-blue-600 font-semibold"
            to="/register"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;