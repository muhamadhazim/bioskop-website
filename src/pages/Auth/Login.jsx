import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [serverError, setServerError] = useState(""); // For backend error handling
  const navigate = useNavigate(); // Hook to navigate after successful login

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      email: "",
      password: "",
    });
    setServerError(""); // Reset the server error message

    // Validate input
    if (!email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required.",
      }));
      return;
    }

    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required.",
      }));
      return;
    }

    // Make API request using axios
    axios
      .post("http://localhost:8000/api/login", {
        email,
        password,
      })
      .then((response) => {
        // Handle successful login
        console.log("Login successful:", response.data);

        // Store token (optional, can be used for authentication in future requests)
        localStorage.setItem("token", JSON.stringify(response.data.token));

        // Redirect to homepage
        navigate("/"); // Navigate to the homepage (http://localhost:5173/)
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setServerError(error.response.data.error || "An error occurred.");
        } else if (error.request) {
          // The request was made but no response was received
          setServerError("No response from server.");
        } else {
          // Something happened in setting up the request that triggered an error
          setServerError("Error: " + error.message);
        }
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Masuk ke</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              EMAIL
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              PASSWORD
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
            <a
              href="#"
              className="text-sm text-blue-500 hover:underline mt-1 inline-block"
            >
              Lupa Password? Reset Password
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
          >
            Masuk
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Daftar Sekarang
            </Link>
          </p>
        </div>

        {/* Server Error Message */}
        {serverError && (
          <div className="text-center text-red-500 mt-4">
            <p>{serverError}</p>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-xs text-gray-500 mt-6">
          © 2024 KELOMPOK 3 |{" "}
          <a href="#" className="hover:underline">
            Bantuan
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Login;
