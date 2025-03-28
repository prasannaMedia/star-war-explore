import React, { useState, useEffect } from 'react';

const SearchBar = ({ setSearchQuery ,setPage,query, setQuery}) => {

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query, setSearchQuery]);

  const onChange= (e) => {
    setQuery(e.target.value);
    setPage(1); 
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        value={query}
        placeholder="Search..."
        onChange={onChange}
        className="w-72 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;