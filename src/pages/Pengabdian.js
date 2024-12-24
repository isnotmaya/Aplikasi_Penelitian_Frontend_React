import React, { useState } from 'react';
import useAPI from '../hooks/useAPI';
import endpoints from '../services/endpoints';
import usePostPengabdian from '../hooks/usePostPengabdian';
import usePutPengabdian from '../hooks/usePutPengabdian';
import useDeletePengabdian from '../hooks/useDeletePengabdian';

function Pengabdian() {
  const [kd_pengabdian, setKdpengabdian] = useState('');
  const [judul, setJudul] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [thn_akademik, setThnAkademik] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [status, setStatus] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { postPengabdian, loading: uploading } = usePostPengabdian();
  const { putPengabdian, loading: updating } = usePutPengabdian();
  const { deletePengabdian, loading: deleting } = useDeletePengabdian();
  const { data: pengabdian, loading, error, refetch } = useAPI(endpoints.pengabdian.getAll);

  // Handle submit for POST request (add new penelitian)
  const handleSubmitPost = async () => {
    if (!kd_pengabdian || !judul || !lokasi || !thn_akademik || !tanggal || !status) {
      alert('Harap masukkan semua data.');
      return;
    }

    const result = await postPengabdian(kd_pengabdian, judul, lokasi, thn_akademik, tanggal, status);
    if (result) {
      alert('Pengabdian berhasil ditambahkan!');
      refetch();
      resetForm();
    } else {
      alert('Gagal menambahkan pengabdian!');
    }
  };

  // Reset form fields
  const resetForm = () => {
    setKdpengabdian('');
    setJudul('');
    setLokasi('');
    setThnAkademik('');
    setTanggal('');
    setStatus('');
    setIsEditing(false);
  };

  const handleEditClick = (pengabdian) => {
    setKdpengabdian(pengabdian.kd_pengabdian);
    setJudul(pengabdian.judul);
    setLokasi(pengabdian.lokasi);
    setThnAkademik(pengabdian.thn_akademik);
    setTanggal(pengabdian.tanggal);
    setStatus(pengabdian.status);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (!kd_pengabdian || !judul || !lokasi || !thn_akademik || !tanggal || !status) {
      alert('Harap masukkan semua data.');
      return;
    }

    const result = await putPengabdian(kd_pengabdian, judul, lokasi, thn_akademik, tanggal, status);
    if (result) {
      alert('Data pengabdian berhasil diperbarui!');
      resetForm();
      refetch();
    } else {
      alert('Terjadi kesalahan saat memperbarui data pengabdian.');
    }
  };

  const handleDeleteClick = async (kd_pengabdian) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus data ini?')) return;

    const result = await deletePengabdian(kd_pengabdian);
    if (result) {
      alert('Data pengabdian berhasil dihapus!');
      refetch();
    } else {
      alert('Gagal menghapus data pengabdian.');
    }
  };

  const pengabdianList = Array.isArray(pengabdian?.pengabdian) ? pengabdian.pengabdian : [];

  return (
    <div className="container mt-20 mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Manajemen Pengabdian</h1>

      {/* Form Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Pengabdian' : 'Tambah Pengabdian'}</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Kode Pengabdian"
            className="border p-2 rounded w-full"
            value={kd_pengabdian}
            onChange={(e) => setKdpengabdian(e.target.value)}
          />
          <input
            type="text"
            placeholder="Judul Pengabdian"
            className="border p-2 rounded w-full"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
          />
          <input
            type="text"
            placeholder="Lokasi"
            className="border p-2 rounded w-full"
            value={lokasi}
            onChange={(e) => setLokasi(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tahun Akademik"
            className="border p-2 rounded w-full"
            value={thn_akademik}
            onChange={(e) => setThnAkademik(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />
          <input
            type="text"
            placeholder="Status"
            className="border p-2 rounded w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </form>
        <div className="flex gap-4 mt-4">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded shadow"
              >
                Update
              </button>
              <button
                onClick={resetForm}
                className="bg-red-500 text-white px-4 py-2 rounded shadow"
              >
                Batal
              </button>
            </>
          ) : (
            <button
              onClick={handleSubmitPost}
              className="bg-green-500 text-white px-4 py-2 rounded shadow"
            >
              Tambah
            </button>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Kode Pengabdian</th>
              <th className="py-3 px-6 text-left">Judul</th>
              <th className="py-3 px-6 text-left">Lokasi</th>
              <th className="py-3 px-6 text-left">Tahun Akademik</th>
              <th className="py-3 px-6 text-left">Tanggal</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pengabdianList.length > 0 ? (
              pengabdianList.map((pengabdian) => (
                <tr key={pengabdian.kd_pengabdian} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{pengabdian.kd_pengabdian}</td>
                  <td className="py-3 px-6">{pengabdian.judul}</td>
                  <td className="py-3 px-6">{pengabdian.lokasi}</td>
                  <td className="py-3 px-6">{pengabdian.thn_akademik}</td>
                  <td className="py-3 px-6">{pengabdian.tanggal}</td>
                  <td className="py-3 px-6">{pengabdian.status}</td>
                  <td className="py-3 px-6 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEditClick(pengabdian)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded shadow"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(pengabdian.kd_pengabdian)}
                      className="bg-red-500 text-white px-3 py-1 rounded shadow"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-center">
                  Tidak ada data pengabdian
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pengabdian;
