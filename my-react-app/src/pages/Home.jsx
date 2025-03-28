import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Menu from '../components/Menu';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import useFetchData from '../hooks/useFetchData';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();

  const [selectedMenu, setSelectedMenu] = useState(location?.state?.fromEntity || 'people');
  const [searchQuery, setSearchQuery] = useState('');

  const { data, loading, page, setPage, totalPages } = useFetchData(selectedMenu, searchQuery);

  const handlePageChange = useCallback((newPage) => setPage(newPage), [setPage]);

  const memoizedData = useMemo(() => data, [data]);


  useEffect(() => {
    if (location.state?.fromEntity) {
      setSelectedMenu(location.state.fromEntity);
      setPage(location.state.page)
    }
  }, [location.state]);


  return (
    <div className="p-4 text-sm">
      <Menu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} setPage={handlePageChange} />

      <SearchBar entity={selectedMenu} setSearchQuery={setSearchQuery} />

      <div className="mt-4 overflow-auto max-w-full">
        <DataTable data={memoizedData} loading={loading} page={page} />
        
        <Pagination page={page} setPage={handlePageChange} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Home;
