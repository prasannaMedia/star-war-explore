import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const SWAPI_BASE_URL = "https://swapi.dev/api";

const useFetchData = (endpoint, searchQuery = "", page = 1) => {
  const fetchEntities = async () => {
    if (searchQuery) {
      const response = await axios.get(`${SWAPI_BASE_URL}/${endpoint}/?search=${searchQuery}`);
      return response.data;
    }
    const response = await axios.get(`${SWAPI_BASE_URL}/${endpoint}/?page=${page}`);
    return response.data;
  };

  const { 
    data, 
    isLoading, 
    error, 
    isPreviousData 
  } = useQuery({
    queryKey: ["entities", endpoint, searchQuery, page], 
    queryFn: () => fetchEntities(),
    keepPreviousData: true,
    staleTime: 5000,
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const totalPages = searchQuery 
    ? Math.ceil(data?.count / 10) 
    : Math.ceil((data?.count || 0) / 10);

  return {
    data: data?.results || [],
    loading: isLoading || isPreviousData,
    error,
    page, 
    totalPages
  };
};

export default useFetchData;