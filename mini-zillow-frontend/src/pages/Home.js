import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Home() {
  // pagination states
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // properties per page
  const [total, setTotal] = useState(0);

  useEffect(() => {
    api
      .get(`/properties?page=${page}&limit=${limit}`)
      .then((res) => {
        setProperties(res.data.properties); // updated to match backend response shape
        setTotal(res.data.total);
      })
      .catch((err) => console.error(err));
  }, [page, limit]);

  // Calculate total pages
  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div className="space-y-6 container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Latest Listings</h2>

        {/* Select Limit */}
        <div className="mb-4 flex items-center space-x-2">
          <label htmlFor="limit" className="font-medium">
            Properties per page:
          </label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1); // reset to page 1 when limit changes
            }}
            className="border rounded p-1"
          >
            {[5, 10, 20].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((p) => (
            <Link
              to={`/property/${p._id}`}
              key={p._id}
              className="border rounded p-4 bg-white shadow hover:shadow-lg"
            >
              <img
                src={p.images?.[0]}
                alt={p.title}
                className="h-40 w-full object-cover mb-2 rounded"
              />
              <h3 className="font-bold text-lg">{p.title}</h3>
              <p>{p.location}</p>
              <p className="text-green-600 font-semibold">${p.price}</p>
            </Link>
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-3 py-1 font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
