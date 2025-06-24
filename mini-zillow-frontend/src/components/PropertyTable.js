import { useEffect, useState } from "react";
import api from "../api";

export default function PropertyTable() {
  const [properties, setProperties] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
  });

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10; // Items per page
  const token = localStorage.getItem("token");

  const fetchProperties = async () => {
    try {
      const res = await api.get(`/properties?page=${page}&limit=${limit}`);
      setProperties(res.data.properties);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Error loading properties:", err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [page]);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirm) return;

    try {
      await api.delete(`/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProperties(); // refresh list
    } catch (err) {
      console.error("Error deleting property:", err);
    }
  };

  const handleEdit = (property) => {
    setEditId(property._id);
    setForm({
      title: property.title,
      location: property.location,
      price: property.price,
      description: property.description,
    });
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/properties/${editId}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditId(null);
      setForm({ title: "", location: "", price: "", description: "" });
      fetchProperties();
    } catch (err) {
      console.error("Error updating property:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Properties</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p._id}>
                <td className="border px-4 py-2">
                  {editId === p._id ? (
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      className="border px-2 py-1 w-full"
                    />
                  ) : (
                    p.title
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editId === p._id ? (
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) =>
                        setForm({ ...form, location: e.target.value })
                      }
                      className="border px-2 py-1 w-full"
                    />
                  ) : (
                    p.location
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editId === p._id ? (
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                      className="border px-2 py-1 w-full"
                    />
                  ) : (
                    `$${p.price}`
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editId === p._id ? (
                    <button
                      onClick={handleUpdate}
                      className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Modify
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setDeleteId(p._id);
                      setShowModal(true);
                    }}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          ⬅ Previous
        </button>
        <span className="text-gray-700">
          Page {page} of {Math.ceil(total / limit)}
        </span>
        <button
          disabled={page >= Math.ceil(total / limit)}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this property? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await api.delete(`/properties/${deleteId}`, {
                      headers: { Authorization: `Bearer ${token}` },
                    });
                    setShowModal(false);
                    fetchProperties();
                  } catch (err) {
                    console.error("Error deleting:", err);
                    setShowModal(false);
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
