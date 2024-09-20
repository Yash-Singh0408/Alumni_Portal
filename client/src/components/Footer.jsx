import { Link } from 'react-router-dom';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-4  mx-2 lg:mx-10 px-8 rounded-xl mt-20 mb-2">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p>&copy; 2024 Almightyverse.com</p>
        </div>
        <div className="flex space-x-4">
          <Link to="#" className="w-8 h-8 hover:bg-gray-700 bg-gray-800 rounded-full flex items-center justify-center" aria-label="GitHub">
            <FaGithub />
          </Link>
          <Link to="#" className="w-8 h-8 hover:bg-gray-700 bg-gray-800 rounded-full flex items-center justify-center" aria-label="Instagram">
            <FaInstagram />
          </Link>
          <Link to="#" className="w-8 h-8 hover:bg-gray-700 bg-gray-800 rounded-full flex items-center justify-center" aria-label="LinkedIn">
            <FaLinkedin />
          </Link>
          <Link to="#" className="w-8 h-8 hover:bg-gray-700 bg-gray-800 rounded-full flex items-center justify-center" aria-label="Twitter">
            <FaTwitter />
          </Link>
        </div>
      </div>
    </footer>
  );
}