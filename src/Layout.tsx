import { Outlet } from 'react-router';
import Topbar from './organisms/Topbar';
import { useUIStore } from './stores/uiStore';

const Layout = () => {
    const { darkMode } = useUIStore();
  return (
    <div className={darkMode ? 'dark' : ''}>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white ">
      <Topbar />
      <main className="mt-6 max-w-7xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
    </div>
  );
};

export default Layout;
