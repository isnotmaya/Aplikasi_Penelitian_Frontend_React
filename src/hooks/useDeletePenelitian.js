import { useState } from 'react';
import api from '../services/api';
import endpoints from '../services/endpoints'; // Pastikan path ini benar

/**
 * useDeleteVideo adalah custom hook yang digunakan untuk menghapus data video dari backend.
 * @returns { Object } - Mengembalikan fungsi deleteVideo, serta status loading dan error.
 */
const useDeletePenelitian = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fungsi untuk menghapus video di backend.
   * @param { number } kd_penelitian- ID video yang akan dihapus.
   * @returns { Promise<boolean> } - Mengembalikan true jika berhasil, false jika gagal.
   */
  const deletePenelitian = async (kd_penelitian) => {
    setLoading(true);
    setError(null);

    try {
      // Memastikan endpoint delete terdefinisi
      if (!endpoints.penelitian || typeof endpoints.penelitian.delete !== 'function') {
        throw new Error('endpoints.penelitian.delete is not defined');
      }

      // Mengirim DELETE request ke endpoint yang sesuai
      const response = await api.delete(endpoints.penelitian.delete(kd_penelitian), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Mengembalikan true jika penghapusan berhasil
      if (response.status === 200 || response.status === 204) {
        return true;
      } else {
        setError('Gagal menghapus data.');
        return false;
      }
    } catch (err) {
      console.error('Error deleting data:', err);
      // Mengambil pesan error dari respons jika tersedia
      setError(err.response?.data?.error || err.message || 'Terjadi kesalahan saat menghapus data.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deletePenelitian, loading, error };
};

export default useDeletePenelitian;
