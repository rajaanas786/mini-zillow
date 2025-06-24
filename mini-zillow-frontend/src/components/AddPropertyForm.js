import { useState } from "react";
import api from "../api";

export default function AddPropertyForm() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const token = localStorage.getItem("token");
    const formData = new FormData();

    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    images.forEach((img) => formData.append("images", img));

    try {
      await api.post("/properties", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMsg("✅ Property created successfully!");
      setForm({ title: "", location: "", price: "", description: "" });
      setImages([]);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to create property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Add New Property</h2>

      {successMsg && (
        <div className="mb-4 p-3 text-green-800 bg-green-100 border border-green-300 rounded">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="mb-4 p-3 text-red-800 bg-red-100 border border-red-300 rounded">
          {errorMsg}
        </div>
      )}
      {loading && (
        <div className="mb-4 text-blue-600 font-semibold">Please wait...</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border px-3 py-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full border px-3 py-2 rounded"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full border px-3 py-2 rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border px-3 py-2 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        ></textarea>
        <input
          type="file"
          multiple
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setImages([...e.target.files])}
        />
        <button
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
