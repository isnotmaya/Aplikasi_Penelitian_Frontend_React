// src/Component/hooks/usePutImage.js
import { useState } from 'react';
import api from '../services/api';
import endpoints from '../services/endpoints';

/**
 * usePutImage adalah custom hook yang digunakan untuk memperbarui data gambar di backend.
 * @returns { Object } - Mengembalikan fungsi putImage, serta status loading dan error.
 */
const usePutPengabdian = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fungsi untuk memperbarui data gambar di backend.
   * @param { number } kd_pengabdian- ID gambar yang akan diperbarui.
   * @param { string } judul - Judul gambar.
   * @param { string } lokasi - URL gambar.
   * @param { string } thn_akademik 
   * @param { number } tanggal- ID gambar yang akan diperbarui.
   * @param { string } status 
   * @returns { Promise<Object> } - Mengembalikan data respons dari backend atau error.
   */
  const putPengabdian = async (kd_pengabdian, judul, lokasi, thn_akademik, tanggal, status) => {
    setLoading(true);
    setError(null);

    try {
      // Membuat objek data untuk dikirim
      const data = {
       kd_pengabdian, 
       judul, 
       lokasi,
       thn_akademik,
       tanggal,
       status,
      };

      // Defensive check untuk memastikan endpoints.foto.update terdefinisi
      if (!endpoints.pengabdian || typeof endpoints.pengabdian.update !== 'function') {
        throw new Error('endpoints.pengabdian.update is not defined');
      }

      // Mengirim PUT request ke endpoint yang sesuai
      const response = await api.put(endpoints.pengabdian.update(kd_pengabdian), data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Mengembalikan data respons jika berhasil
      return response.data;
    } catch (err) {
      console.error('Error updating data:', err);
      // Mengambil pesan error dari respons jika tersedia
      setError(err.response?.data?.error || err.message || 'Terjadi kesalahan saat memperbarui data.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { putPengabdian, loading, error };
};

export default usePutPengabdian;
