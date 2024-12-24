import React, { useState } from 'react';
import useAPI from '../hooks/useAPI';
import endpoints from '../services/endpoints';
import usePostPenelitian from '../hooks/usePostPenelitian';
import usePutPenelitian from '../hooks/usePutPenelitian';
import useDeletePenelitian from '../hooks/useDeletePenelitian';

function Penelitian() {
  const [kd_penelitian, setKdPenelitian] = useState('');
  const [judul, setJudul] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [thn_akademik, setThnAkademik] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [status, setStatus] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { postPenelitian, loading: uploading } = usePostPenelitian();
  const { putPenelitian, loading: updating } = usePutPenelitian();
  const { deletePenelitian, loading: deleting } = useDeletePenelitian();
  const { data: penelitian, loading, error, refetch } = useAPI(endpoints.penelitian.getAll);

  // Handle submit for POST request (add new penelitian)
  const handleSubmitPost = async () => {
    if (!kd_penelitian || !judul || !lokasi || !thn_akademik || !tanggal || !status) {
      alert('Harap masukkan semua data.');
      return;
    }

    const result = await postPenelitian(kd_penelitian, judul, lokasi, thn_akademik, tanggal, status);
    if (result) {
      alert('Penelitian berhasil ditambahkan!');
      refetch();
      resetForm();
    } else {
      alert('Gagal menambahkan penelitian!');
    }
  };

  // Reset form fields
  const resetForm = () => {
    setKdPenelitian('');
    setJudul('');
    setLokasi('');
    setThnAkademik('');
    setTanggal('');
    setStatus('');
    setIsEditing(false);
  };

  const handleEditClick = (penelitian) => {
    setKdPenelitian(penelitian.kd_penelitian);
    setJudul(penelitian.judul);
    setLokasi(penelitian.lokasi);
    setThnAkademik(penelitian.thn_akademik);
    setTanggal(penelitian.tanggal);
    setStatus(penelitian.status);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (!kd_penelitian || !judul || !lokasi || !thn_akademik || !tanggal || !status) {
      alert('Harap masukkan semua data.');
      return;
    }

    const result = await putPenelitian(kd_penelitian, judul, lokasi, thn_akademik, tanggal, status);
    if (result) {
      alert('Data Penelitian berhasil diperbarui!');
      resetForm();
      refetch();
    } else {
      alert('Terjadi kesalahan saat memperbarui data penelitian.');
    }
  };

  const handleDeleteClick = async (kd_penelitian) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus data ini?')) return;

    const result = await deletePenelitian(kd_penelitian);
    if (result) {
      alert('Data Penelitian berhasil dihapus!');
      refetch();
    } else {
      alert('Gagal menghapus data penelitian.');
    }
  };

  const penelitianList = Array.isArray(penelitian?.penelitian) ? penelitian.penelitian : [];

  return (
    <div className="container mt-20 mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Manajemen Penelitian</h1>

      {/* Form Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Penelitian' : 'Tambah Penelitian'}</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Kode Penelitian"
            className="border p-2 rounded w-full"
            value={kd_penelitian}
            onChange={(e) => setKdPenelitian(e.target.value)}
          />
          <input
            type="text"
            placeholder="Judul Penelitian"
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
              <th className="py-3 px-6 text-left">Kode Penelitian</th>
              <th className="py-3 px-6 text-left">Judul</th>
              <th className="py-3 px-6 text-left">Lokasi</th>
              <th className="py-3 px-6 text-left">Tahun Akademik</th>
              <th className="py-3 px-6 text-left">Tanggal</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {penelitianList.length > 0 ? (
              penelitianList.map((penelitian) => (
                <tr key={penelitian.kd_penelitian} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{penelitian.kd_penelitian}</td>
                  <td className="py-3 px-6">{penelitian.judul}</td>
                  <td className="py-3 px-6">{penelitian.lokasi}</td>
                  <td className="py-3 px-6">{penelitian.thn_akademik}</td>
                  <td className="py-3 px-6">{penelitian.tanggal}</td>
                  <td className="py-3 px-6">{penelitian.status}</td>
                  <td className="py-3 px-6 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEditClick(penelitian)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded shadow"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(penelitian.kd_penelitian)}
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
                  Tidak ada data penelitian
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Penelitian;
