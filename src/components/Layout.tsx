import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar />
      {/* Unified container for all pages */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="py-4 text-center text-slate-500 text-sm border-t border-slate-800">
        © 2026 EventScheduler. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
