import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Menu from '../components/Menu';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import useFetchData from '../hooks/useFetchData';

const Home = () => {
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState(location?.state?.fromEntity || 'people');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setPage(1);
  }, [selectedMenu]);

  const { data, loading, totalPages, error } = useFetchData(
    selectedMenu, 
    searchQuery, 
    page
  );

  useEffect(() => {
    if (location.state?.fromEntity) {
      setSelectedMenu(location.state.fromEntity);
      setPage(location.state.page || 1);
    }
  }, [location.state]);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const handleMenuChange = useCallback((menu) => {
    setSelectedMenu(menu);
    setPage(1);
    setSearchQuery(''); 
    setQuery('');
  }, []);

  return (
    <div className="p-4 text-sm">
      <Menu 
        selectedMenu={selectedMenu} 
        setSelectedMenu={handleMenuChange} 
        setPage={handlePageChange} 
      />

      <SearchBar 
        entity={selectedMenu} 
        setSearchQuery={setSearchQuery} 
        setPage={setPage}
        query={query}
        setQuery={setQuery}
      />

      {error && (
        <div className="text-red-500 mb-4">
          Error loading data: {error.message}
        </div>
      )}

      <div className="mt-4 overflow-auto max-w-full">
        <DataTable 
          data={data} 
          loading={loading} 
          page={page} 
        />
        
        <Pagination 
          page={page} 
          setPage={handlePageChange} 
          totalPages={totalPages} 
        />
      </div>
    </div>
  );
};

export default Home;