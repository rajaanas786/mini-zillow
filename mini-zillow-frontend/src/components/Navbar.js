import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Left Nav Links */}
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

      {/* Logo in Center */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🏠 Mini Zillow
        </Link>
      </div>

      {/* Right Auth Links */}
      <div className="flex space-x-4">
        {!token ? (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Admin
            </Link>
            {/* <Link to="/register" className="text-gray-700 hover:text-blue-600">
              Register
            </Link> */}
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
