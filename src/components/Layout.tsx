import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar />
      {/* Outlet — сюда React Router автоматически подставит ту страницу, на которой находится пользователь */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
