import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full">
    <div className="flex flex-col w-full max-w-screen-md mx-auto bg-white text-gray-700 min-h-screen">
      <header className="bg-white shadow p-4">
        <nav className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <main className="p-4">{children}</main>
    </div>
    </div>
  );
};

export default Layout;