import React from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const extractValue = (value) => {
  if (Array.isArray(value)) return value.length > 0 ? value.join(", ") : "N/A";
  return value || "N/A";
};

const DataTable = ({ data, page, loading }) => {
  const navigate = useNavigate();

  const headers = data.length
    ? Object.keys(data[0]).filter(
        (key) => !Array.isArray(data[0][key]) && key !== "url"
      )
    : [];

  const handleDetailsClick = (item) => {
    const [, entity, id] = item.url.split("/").filter(Boolean).slice(-3);
    navigate(`/details/${entity}/${id}`, { state: { page: page } });
  };

  const handleLinkClick = (url) => {
    const [, entity, id] = url.split("/").filter(Boolean).slice(-3);
    navigate(`/details/${entity}/${id}/`);
  };

  return (
    <div className="overflow-x-auto mt-8">
      <table className="w-full mx-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            {headers.map((header) => (
              <th key={header} className="py-3 px-4 text-left">
                {header.toUpperCase()}
              </th>
            ))}
            <th className="py-3 px-4">DETAILS</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={headers.length + 1} className="text-center py-4">
                <Loader />
              </td>
            </tr>
          ) : data.length ? (
            data.map((item, index) => (
              <tr
                key={index}
                className="even:bg-gray-100 odd:bg-white hover:bg-blue-100 transition-colors"
              >
                {headers.map((header) => (
                  <td key={header} className="py-2 px-4 truncate max-w-[150px]">
                    {header === "homeworld" && item[header] ? (
                      <button
                        onClick={() => handleLinkClick(item[header])}
                        className="text-blue-600 hover:underline"
                      >
                        Homeworld
                      </button>
                    ) : (
                      extractValue(item[header])
                    )}
                  </td>
                ))}
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDetailsClick(item)}
                    className="text-lg cursor-pointer hover:scale-110 transition-transform"
                  >
                    🔍
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length + 1}
                className="py-4 px-4 text-center"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;