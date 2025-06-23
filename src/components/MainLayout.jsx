import React, { useState } from 'react';
import Sidebar from './sidebar';
import { MdMenu } from 'react-icons/md';

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between bg-gray-700 dark:bg-gray-900 p-4 shadow-md w-full fixed top-0 left-0 z-40">
        <img src="../assets/logo-nav.png" alt="Logo" className="h-8" />
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl">
          <MdMenu />
        </button>
      </div>

      {/* Sidebar: fixed on desktop, slide-in on mobile */}
      <div>
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <div className="fixed inset-y-0 left-0 w-64 bg-gray-100 dark:bg-gray-900 z-40">
            <Sidebar />
          </div>
        </div>
        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-100 dark:bg-gray-900 transition-transform duration-300 md:hidden ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Overlay on mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
        ></div>
      )}

      {/* Main content with left margin on desktop */}
      <div className="flex-grow md:ml-64 w-full pt-16 md:pt-0 pb-8 bg-gray-300 dark:bg-gray-900 transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
