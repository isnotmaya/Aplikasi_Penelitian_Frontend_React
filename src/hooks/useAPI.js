// src/hooks/useAPI.js
import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const useAPI = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Fetching data from:', endpoint);
      
      const response = await api.get(endpoint);
      console.log('API Response:', response.data);
      
      setData(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error in useAPI:', err);
      setError('Terjadi kesalahan saat mengambil data');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { 
    data,
    loading, 
    error,
    refetch: fetchData
  };
};

export default useAPI;
