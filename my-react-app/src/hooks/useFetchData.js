import { useState, useEffect } from 'react';

const useFetchData = (endpoint, query = '') => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    try {
      const searchParam = query ? `search=${query}` : `page=${page}`;
      const url = `https://swapi.dev/api/${endpoint}/?${searchParam}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch data');

      const result = await response.json();
      console.log('Fetched Data:', result);

      setData(result.results || []);
      setTotalPages(Math.ceil((result.count || 0) / 10)); 
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, query, page]);

  return { data, loading, error, page, setPage, totalPages };
};

export default useFetchData;
