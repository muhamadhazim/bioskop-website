import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [imageError, setImageError] = useState({}); // To track image loading errors

  useEffect(() => {
    // Check if a token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      const parsedToken = JSON.parse(token);
      if (parsedToken) {
        setIsLoggedIn(true);
        setUser({
          name: "User", // You can replace this with the actual user data from the token if needed
        });
      }
    }

    // Fetch movie data using Axios
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/movies");
        if (response.data.success) {
          setMovies(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleImageError = (filename) => {
    setImageError((prev) => ({ ...prev, [filename]: true }));
  };

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
                  <span className="text-gray-600 text-sm">{user.name[0]}</span>
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
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Movie Image */}
                <div
                  className="h-48 bg-cover bg-center"
                  style={{
                    backgroundImage: imageError[movie.judul]
                      ? "url('/path/to/placeholder-image.jpg')"
                      : `url(http://localhost:8000/api/showImage/${movie.judul.replace(
                          /\s+/g,
                          ""
                        )}.png)`,
                  }}
                  onError={() => handleImageError(movie.judul)}
                ></div>
                {/* Movie Title */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {movie.judul}
                  </h3>
                  <p className="text-sm text-gray-600">{movie.genre}</p>
                  <p className="text-sm text-gray-600">{movie.durasi}</p>
                  <div className="mt-2 flex justify-center space-x-2">
                    <span className="text-gray-800">{movie.rating}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading movies...</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
