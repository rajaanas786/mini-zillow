import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 relative z-10">
      {/* Desktop Layout */}
      <div className="hidden md:flex justify-between items-center">
        {/* Left Links */}
        <div className="flex space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          {token && (
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
          )}
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            🏠 Mini Zillow
          </Link>
        </div>

        {/* Right Links */}
        <div className="flex space-x-4">
          {!token ? (
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Admin
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden justify-between items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <Link
          to="/"
          className="text-xl font-bold text-blue-600 absolute left-1/2 transform -translate-x-1/2"
        >
          🏠 Mini Zillow
        </Link>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link to="/" className="block text-gray-700 hover:text-blue-600">
            Home
          </Link>
          {token && (
            <Link
              to="/dashboard"
              className="block text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </Link>
          )}
          {!token ? (
            <Link
              to="/login"
              className="block text-gray-700 hover:text-blue-600"
            >
              Admin
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="block text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
