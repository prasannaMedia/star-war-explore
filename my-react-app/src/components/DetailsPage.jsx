import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

const DetailsPage = () => {
  const { entity, id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [relatedData, setRelatedData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://swapi.dev/api/${entity}/${id}/`
        );
        setData(response.data);

        const relatedPromises = Object.entries(response.data)
          .filter(
            ([, value]) => Array.isArray(value) && value[0]?.startsWith("http")
          )
          .map(async ([key, urls]) => {
            const details = await Promise.all(
              urls.map((url) => axios.get(url))
            );
            return [key, details.map((d) => d.data)];
          });

        const relatedResults = await Promise.all(relatedPromises);
        setRelatedData(Object.fromEntries(relatedResults));
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchData();
  }, [entity, id]);

  const handleBack = () => {
    navigate("/", {
      state: {
        fromEntity: location.state?.page ? entity : "people",
        page: location.state?.page || 1,
      },
    });
  };

  if (!data) return <Loader />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl w-full overflow-auto max-h-[90vh]">
        <button
          onClick={handleBack}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back
        </button>

        <h1 className="text-3xl font-semibold mb-6 text-center">
          {data.name || data.title}
        </h1>

        <h2 className="text-xl font-semibold mb-4">Details:</h2>
        <ul className="space-y-2">
          {Object.entries(data).map(([key, value]) =>
            !Array.isArray(value) && value ? (
              <li key={key} className="flex justify-between">
                <span className="font-medium capitalize">{key}:</span>
                {key === "homeworld" ? (
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Homeworld
                  </a>
                ) : (
                  <span>{value}</span>
                )}
              </li>
            ) : null
          )}
        </ul>

        {Object.entries(relatedData).map(([key, items]) => (
          <div key={key} className="mt-6">
            <h3 className="text-lg font-semibold mb-2 capitalize">{key}</h3>
            <ul className="list-disc pl-5 space-y-1">
              {items.map((item) => (
                <li key={item.url}>{item.name || item.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsPage;
