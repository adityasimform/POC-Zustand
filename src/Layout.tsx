import { Outlet } from "react-router";
import Topbar from "./organisms/Topbar";
import { useStore } from "./stores/store";

const Layout = () => {
  const darkMode  = useStore(state=> state.darkMode);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50  dark:bg-gray-800  text-gray-900 dark:text-white">
        <Topbar />
        <main className="mt-6 mx-auto p-4 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1720px] ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
