import { useState } from "react";
import AddPropertyForm from "../components/AddPropertyForm";
import PropertyTable from "../components/PropertyTable";

export default function Dashboard() {
  const [view, setView] = useState("none");

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={() => setView("add")}
          className="cursor-pointer bg-green-100 p-6 rounded shadow hover:bg-green-200 transition"
        >
          <h2 className="text-xl font-semibold">➕ Add Property</h2>
          <p className="text-gray-600 mt-2">Create a new property listing</p>
        </div>

        <div
          onClick={() => setView("view")}
          className="cursor-pointer bg-blue-100 p-6 rounded shadow hover:bg-blue-200 transition"
        >
          <h2 className="text-xl font-semibold">📋 View All Properties</h2>
          <p className="text-gray-600 mt-2">
            Manage and update existing listings
          </p>
        </div>
      </div>

      {view === "add" && <AddPropertyForm />}
      {view === "view" && <PropertyTable />}
    </div>
  );
}
