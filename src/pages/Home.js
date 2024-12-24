import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [activeTab, setActiveTab] = useState('semua');

  // Data statistik
  const stats = [
    { label: 'Total Penelitian', value: '2,845', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { label: 'Total Pengabdian', value: '1,546', icon: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z M12 7a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0112 7zm0 10a1 1 0 100-2 1 1 0 000 2z' },
    { label: 'Publikasi', value: '4,289', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { label: 'Peneliti Aktif', value: '875', icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' }
  ];

  // Data pengumuman
  const announcements = [
    { title: 'Pembukaan Pendaftaran Penelitian 2024', date: '21 Dec 2024', type: 'penelitian' },
    { title: 'Workshop Penulisan Proposal Pengabdian', date: '23 Dec 2024', type: 'pengabdian' },
    { title: 'Batas Akhir Submission Laporan Akhir', date: '25 Dec 2024', type: 'semua' },
    { title: 'Seminar Hasil Penelitian Tahun 2024', date: '28 Dec 2024', type: 'penelitian' }
  ];

  // Data quick links
  const quickLinks = [
    { title: 'Panduan Penelitian', desc: 'Dokumen panduan pengajuan dan pelaksanaan penelitian' },
    { title: 'Template Dokumen', desc: 'Format dan template dokumen yang diperlukan' },
    { title: 'Jadwal Kegiatan', desc: 'Timeline kegiatan penelitian dan pengabdian' },
    { title: 'FAQ', desc: 'Pertanyaan yang sering diajukan' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 h-[500px] relative">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative">
          <div className="pt-32 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sistem Penelitian dan Pengabdian
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Platform terintegrasi untuk mengelola kegiatan penelitian dan pengabdian kepada masyarakat
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/penelitian">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                  Ajukan Penelitian
                </button>
              </Link>
              <Link to="/pengabdian">
                <button className="bg-white hover:bg-gray-100 text-blue-900 px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                  Ajukan Pengabdian
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* Stats Cards */}
        <div className="container mx-auto px-4 absolute -bottom-20 left-0 right-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-28 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pengumuman Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Pengumuman</h2>
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setActiveTab('semua')}
                  className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                    activeTab === 'semua'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setActiveTab('penelitian')}
                  className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                    activeTab === 'penelitian'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Penelitian
                </button>
                <button
                  onClick={() => setActiveTab('pengabdian')}
                  className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                    activeTab === 'pengabdian'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Pengabdian
                </button>
              </div>
              <div className="space-y-4">
                {announcements
                  .filter(item => activeTab === 'semua' || item.type === activeTab)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors duration-300 cursor-pointer"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-800">{item.title}</h3>
                        <span className="text-sm text-gray-500">{item.date}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Links</h2>
              <div className="space-y-4">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                  >
                    <h3 className="font-medium text-gray-800 mb-1">{link.title}</h3>
                    <p className="text-sm text-gray-600">{link.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;