"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Weather() {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchListings() {
      try {
        const res = await axios.get("https://zillow-com1.p.rapidapi.com/propertyExtendedSearch", {
          params: {
            location: "Miami, FL",   // Change to target city
            status_type: "ForSale",
            home_type: "Houses"
          },
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            "x-rapidapi-host": "zillow-com1.p.rapidapi.com"
          }
        });
        setHomes(res.data?.props || []); // adjust to actual API response
      } catch (err) {
        setError("Could not load listings.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🏡 Homes for Sale</h1>

      {loading && <p>Loading listings...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid md:grid-cols-3 gap-6">
        {homes.map((home, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={home.imgSrc || "/placeholder.jpg"}
              alt={home.address || "House"}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{home.address}</h2>
              <p className="text-gray-600">{home.city}, {home.state}</p>
              <p className="mt-2 text-xl font-bold text-green-600">
                ${home.price?.toLocaleString()}
              </p>
              <p className="text-gray-500 text-sm">
                {home.bedrooms} bd • {home.bathrooms} ba • {home.livingArea} sqft
              </p>

              <a
                href={home.detailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
