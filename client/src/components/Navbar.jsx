import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-2xl font-bold">
            Logo
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
            <Link to="/events" className="hover:text-gray-300">Events</Link>
            <Link to="/alumni" className="hover:text-gray-300">Alumni</Link>
            <Link to="/students" className="hover:text-gray-300">Students</Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {/* Profile Picture */}
        <div className="relative hidden md:block">
          <button className="focus:outline-none">
            <img
              src="https://via.placeholder.com/40" // Replace with actual profile image source
              alt="Profile"
              className="w-10 h-10 rounded-full border border-white"
              onClick={toggleMenu}
            />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg">
              <Link to="#" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
              <Link to="#" className="block px-4 py-2 hover:bg-gray-100">
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/dashboard" className="block hover:text-gray-300">Dashboard</Link>
            <Link to="/events" className="block hover:text-gray-300">Events</Link>
            <Link to="/alumni" className="block hover:text-gray-300">Alumni</Link>
            <Link to="/students" className="block hover:text-gray-300">Students</Link>
            <Link to="#" className="block hover:text-gray-300">Profile</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
