import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Login failed. Wrong Credentials"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {errorMsg && (
        <div className="mb-4 p-3 text-red-800 bg-red-100 border border-red-300 rounded">
          {errorMsg}
        </div>
      )}
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Login
        </button>
        <p className="text-center text-blue-900">
          Don't have an admin account?
          <span className="ml-1">
            <Link
              to="/register"
              className="text-gray-700 hover:text-blue-600 underline"
            >
              Register
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
}
