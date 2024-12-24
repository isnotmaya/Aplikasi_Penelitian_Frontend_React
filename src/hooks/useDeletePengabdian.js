import { useState } from 'react';
import api from '../services/api';
import endpoints from '../services/endpoints'; // Pastikan path ini benar

/**
 * useDeleteVideo adalah custom hook yang digunakan untuk menghapus data video dari backend.
 * @returns { Object } - Mengembalikan fungsi deleteVideo, serta status loading dan error.
 */
const useDeletePengabdian = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fungsi untuk menghapus video di backend.
   * @param { number } kd_pengabdian- ID video yang akan dihapus.
   * @returns { Promise<boolean> } - Mengembalikan true jika berhasil, false jika gagal.
   */
  const deletePengabdian = async (kd_pengabdian) => {
    setLoading(true);
    setError(null);

    try {
      // Memastikan endpoint delete terdefinisi
      if (!endpoints.pengabdian || typeof endpoints.pengabdian.delete !== 'function') {
        throw new Error('endpoints.pengabdian.delete is not defined');
      }

      // Mengirim DELETE request ke endpoint yang sesuai
      const response = await api.delete(endpoints.pengabdian.delete(kd_pengabdian), {
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

  return { deletePengabdian, loading, error };
};

export default useDeletePengabdian;
