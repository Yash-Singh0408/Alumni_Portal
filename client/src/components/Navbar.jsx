
// import { useState } from 'react'; 
// import { Link } from 'react-router-dom';
// import { FaTachometerAlt, FaRegCalendarAlt, FaUsers, FaUserGraduate, FaSignOutAlt } from 'react-icons/fa';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="bg-gray-900 text-white p-4 px-10">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo and Links */}
//         <div className="flex items-center space-x-6">
//           <Link to="/" className="text-2xl font-bold mr-8">
//             ALUMNI
//           </Link>
//           <div className="hidden md:flex space-x-4 lg:space-x-10">
//             <Link to="/dashboard" className="hover:text-gray-300 text-lg">Dashboard</Link>
//             <Link to="/events" className="hover:text-gray-300 text-lg">Events</Link>
//             <Link to="/alumni" className="hover:text-gray-300 text-lg">Alumni</Link>
//             <Link to="/students" className="hover:text-gray-300 text-lg">Students</Link>
//           </div>
//         </div>

//         {/* Mobile menu button */}
//         <div className="md:hidden">
//           <button onClick={toggleMenu} className="focus:outline-none">
//             {isOpen ? (
//               // Cross Icon
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             ) : (
//               // Hamburger Icon
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16m-7 6h7"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>

//         {/* Profile Picture */}
//         <div className="relative hidden md:block">
//           <button className="focus:outline-none">
//             <img
//               src="./images/profile.jpg" // Replace with actual profile image source
//               alt=""
//               className="w-10 h-10 rounded-full border border-white"
//               onClick={toggleMenu}
//             />
//           </button>
//           {isOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg">
//               <Link to="#" className="block px-4 py-2 hover:bg-gray-100">
//                 Profile
//               </Link>
//               <Link to="#" className="block px-4 py-2 hover:bg-gray-100">
//                 Logout
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Mobile Side Navbar */}
//       {isOpen && (
//         <div className="fixed left-0 top-0 w-64 h-full bg-gray-900 text-white p-4 md:hidden">
//           <div className="flex flex-col space-y-4">
//           <Link to="/" className="text-2xl font-bold mr-8">
//             ALUMNI
//           </Link>
//             <Link to="/dashboard" className="flex items-center space-x-2 hover:text-gray-300">
//               <FaTachometerAlt />
//               <span>Dashboard</span>
//             </Link>
//             <Link to="/events" className="flex items-center space-x-2 hover:text-gray-300">
//               <FaRegCalendarAlt />
//               <span>Events</span>
//             </Link>
//             <Link to="/alumni" className="flex items-center space-x-2 hover:text-gray-300">
//               <FaUsers />
//               <span>Alumni</span>
//             </Link>
//             <Link to="/students" className="flex items-center space-x-2 hover:text-gray-300">
//               <FaUserGraduate />
//               <span>Students</span>
//             </Link>
//             <Link to="#" className="flex items-center space-x-2 hover:text-gray-300">
//               <FaSignOutAlt />
//               <span>Logout</span>
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

import { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaRegCalendarAlt, FaUsers, FaUserGraduate, FaSignOutAlt } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 text-white p-4 px-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-2xl font-bold mr-8">
            ALUMNI
          </Link>
          <div className="hidden md:flex space-x-4 lg:space-x-10">
            <Link to="/dashboard" className="hover:text-gray-300 text-lg">Dashboard</Link>
            <Link to="/events" className="hover:text-gray-300 text-lg">Events</Link>
            <Link to="/alumni" className="hover:text-gray-300 text-lg">Alumni</Link>
            <Link to="/students" className="hover:text-gray-300 text-lg">Students</Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? (
              // Cross Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Profile Picture */}
        <div className="relative hidden md:block">
          <button className="focus:outline-none">
            <img
              src="./images/profile.jpg" // Replace with actual profile image source
              alt=""
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

      {/* Mobile Side Navbar with Slide Transition */}
      <div 
        className={` fixed left-0 top-0 w-64 h-full bg-gray-900 text-white p-4 transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div className="  flex flex-col space-y-4">
          <Link to="/" className="text-2xl font-bold mr-8">
            ALUMNI
          </Link>
          <Link to="/dashboard" className="flex items-center space-x-2 hover:text-gray-300">
            <FaTachometerAlt />
            <span>Dashboard</span>
          </Link>
          <Link to="/events" className="flex items-center space-x-2 hover:text-gray-300">
            <FaRegCalendarAlt />
            <span>Events</span>
          </Link>
          <Link to="/alumni" className="flex items-center space-x-2 hover:text-gray-300">
            <FaUsers />
            <span>Alumni</span>
          </Link>
          <Link to="/students" className="flex items-center space-x-2 hover:text-gray-300">
            <FaUserGraduate />
            <span>Students</span>
          </Link>
          <Link to="#" className="flex items-center space-x-2 hover:text-gray-300">
            <FaSignOutAlt />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

