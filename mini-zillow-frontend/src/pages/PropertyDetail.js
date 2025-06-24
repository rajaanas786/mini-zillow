import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    api
      .get(`/properties/${id}`)
      .then((res) => setProperty(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!property) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <img
        src={property.images[0]}
        className="rounded w-full h-96 object-cover mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{property.title}</h2>
      <p className="text-gray-700 mb-2">{property.description}</p>
      <p className="text-gray-500">{property.location}</p>
      <p className="text-green-600 font-bold text-xl mt-2">${property.price}</p>
    </div>
  );
}
