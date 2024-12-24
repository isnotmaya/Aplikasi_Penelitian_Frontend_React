import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';
import Header from '../components/Header';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex"> {/* Tambahkan flex untuk layout */}
      <Navbar />
      <div className="flex-grow flex flex-col"> {/* Konten utama dan header */}
        <Header />
        <main className="p-4 flex-grow overflow-y-auto"> {/* Main content with scroll */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;