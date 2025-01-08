import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Daftar Akun Baru
        </h2>

        <form>
          {/* Full Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              NAMA LENGKAP
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              EMAIL
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none"
              placeholder="example@example.com"
            />
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
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
          >
            Daftar
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Masuk Sekarang
            </Link>
          </p>
        </div>

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

export default Register;
