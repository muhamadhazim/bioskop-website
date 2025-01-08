import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  // Simulating login status; replace this with your actual authentication logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Navbar */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-4 sm:px-6">
          {/* Logo */}
          <div className="text-xl font-bold text-gray-800">Home</div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-4 sm:space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Beranda
            </Link>

            {/* Conditional Links Based on Login Status */}
            {isLoggedIn ? (
              <>
                <Link
                  to="/tickets"
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Tiket Saya
                </Link>
                {/* Profile Icon */}
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm">U</span>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="text-white bg-gray-800 px-4 py-2 rounded hover:bg-gray-900 font-medium"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 sm:px-6">
        {/* Grid of Movies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Movie Image */}
              <div className="h-48 bg-gray-300"></div>
              {/* Movie Title */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Deadpool & Wolverine
                </h3>
                <div className="mt-2 flex justify-center space-x-2">
                  {/* Rating Placeholder */}
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
