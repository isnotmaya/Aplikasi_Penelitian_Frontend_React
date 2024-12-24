import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainMenuItems = [
    {
      name: 'Penelitian',
      href: '/penelitian',
      submenu: ['Usulan Baru', 'Penelitian Berjalan', 'Riwayat Penelitian']
    },
    {
      name: 'Pengabdian',
      href: '/pengabdian',
      submenu: ['Usulan Baru', 'Pengabdian Berjalan', 'Riwayat Pengabdian']
    },
    {
      name: 'Publikasi',
      href: '#',
      submenu: ['Jurnal', 'Prosiding', 'HKI']
    },
    { name: 'Repository', href: '#' },
    { name: 'Panduan', href: '#' }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-1">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-blue-200 flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>kontak@sipena.ac.id</span>
            </a>
            <a href="#" className="hover:text-blue-200 flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Bantuan</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-blue-200">FAQ</a>
            <a href="#" className="hover:text-blue-200">Berita</a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`container mx-auto px-4 py-3 transition-colors duration-300 ${
        scrolled ? 'text-gray-800' : 'text-white'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${scrolled ? 'bg-blue-600' : 'bg-white'}`}>
              <svg className={`w-8 h-8 ${scrolled ? 'text-white' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wider">SIPENA</h1>
              <p className={`text-xs transition-colors duration-300 ${
                scrolled ? 'text-gray-600' : 'text-gray-300'
              }`}>Sistem Penelitian dan Pengabdian</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {mainMenuItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setActiveMenu(item.name)}
                onMouseLeave={() => setActiveMenu('')}
              >
                <a
                  href={item.href}
                  className={`py-2 px-1 font-medium hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-all duration-300 ${
                    activeMenu === item.name ? 'border-blue-600' : ''
                  }`}
                >
                  {item.name}
                </a>
                {item.submenu && activeMenu === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 transition-all duration-300">
                    {item.submenu.map((subitem) => (
                      <a
                        key={subitem}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {subitem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button className={`p-2 rounded-full transition-colors duration-300 ${
              scrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-300 ${
              scrolled ? 'bg-blue-600 text-white' : 'bg-white/10'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm font-medium">Peneliti</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-full hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              {mainMenuItems.map((item) => (
                <div key={item.name} className="border-b border-gray-200 pb-2">
                  <a
                    href={item.href}
                    className="block py-2 text-gray-800 hover:text-blue-600"
                  >
                    {item.name}
                  </a>
                  {item.submenu && (
                    <div className="pl-4 mt-1 space-y-1">
                      {item.submenu.map((subitem) => (
                        <a
                          key={subitem}
                          href="#"
                          className="block py-1 text-sm text-gray-600 hover:text-blue-600"
                        >
                          {subitem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;