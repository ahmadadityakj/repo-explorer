import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

const Layout = ({ children }: { children: ReactNode }) => {
  const basePath = import.meta.env.VITE_BASE_PATH;

  return (
    <div className="w-full">
    <div className="flex flex-col w-full mx-auto bg-white text-gray-700 min-h-screen">
      <header className="bg-white shadow p-4 flex flex-row justify-between">
        <h2 className="font-bold">Github Repo Explorer</h2>
        <nav className="flex gap-4">
          <NavLink
            className={({ isActive }) => 
              [
                "text-gray-700",
                isActive ? "font-bold text-blue-600" : null
              ].filter(Boolean).join(" ")
            }
            to={basePath}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => 
              [
                "text-gray-700",
                isActive ? "font-bold text-blue-600" : null
              ].filter(Boolean).join(" ")
            }
            to={basePath + "about"}
          >
            About
          </NavLink>
        </nav>
      </header>
      <main className="p-4">{children}</main>
    </div>
    </div>
  );
};

export default Layout;