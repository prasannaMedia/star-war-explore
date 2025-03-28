import { useState, useEffect } from 'react';

const SearchBar = ({ setSearchQuery }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(query);
    }, 100);

    return () => clearTimeout(handler);
  }, [query, setSearchQuery]);

  return (
    <div className="mt-4">
      <input
        type="text"
        value={query}
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
        className="w-72 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;