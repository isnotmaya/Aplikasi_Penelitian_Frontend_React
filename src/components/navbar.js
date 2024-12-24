import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState('');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      path: '/'
    },
    {
      title: 'Penelitian',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      path: '/penelitian',
      submenu: [
        { title: 'Usulan Baru', path: '/penelitian/usulan' },
        { title: 'Penelitian Berjalan', path: '/penelitian/berjalan' },
        { title: 'Riwayat', path: '/penelitian/riwayat' }
      ]
    },
    {
      title: 'Pengabdian',
      icon: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z M12 7a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0112 7zm0 10a1 1 0 100-2 1 1 0 000 2z',
      path: '/pengabdian',
      submenu: [
        { title: 'Usulan Baru', path: '/pengabdian/usulan' },
        { title: 'Pengabdian Berjalan', path: '/pengabdian/berjalan' },
        { title: 'Riwayat', path: '/pengabdian/riwayat' }
      ]
    },
  ];

  return (
    <nav className={`w-full md:w-64 h-auto md:h-screen fixed md:sticky top-0 left-0 z-40 transition-all duration-300 ${
      isNavbarScrolled ? 'bg-white shadow-lg' : 'bg-white'
    }`}>
      <div className="p-4 md:p-6 flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-800">SIPENA</span>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </Link>
          <button onClick={toggleMobileMenu} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block flex-1 overflow-y-auto`}>
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <div key={index} className="relative">
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => item.submenu && setActiveSubmenu(activeSubmenu === item.title ? '' : item.title)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                  </svg>
                  <span className="font-medium">{item.title}</span>
                  {item.submenu && (
                    <svg
                      className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                        activeSubmenu === item.title ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {item.submenu && activeSubmenu === item.title && (
                  <div className="mt-1 ml-12 space-y-1">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className={`block px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                          location.pathname === subItem.path
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="hidden md:block pt-6 mt-6 border-t border-gray-100">
          <div className="flex items-center px-4 py-3 rounded-lg bg-blue-50">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">admin@sipena.ac.id</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;