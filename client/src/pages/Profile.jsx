import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Profile = () => {
  return (
    <>
    <Navbar/>
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 mt-10">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-4xl overflow-hidden">
        <div className="p-8 flex flex-col items-center">
          {/* Profile Picture */}
          <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 overflow-hidden">
            <img src="./images/profile.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          
          {/* Name and Details */}
          <h1 className="text-2xl font-bold text-center mb-1">Full Name Student</h1>
          <p className="text-gray-600 text-center mb-1">Bachelor of Computer Applications</p>
          <p className="text-gray-600 text-center mb-4">BATCH 2023</p>
          
          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full">
              Edit Profile
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full">
              Student
            </button>
          </div>
          
          {/* Skills */}
          <div className="w-full mb-6">
            <h2 className="text-lg font-semibold mb-2">Skills :</h2>
            <div className="flex flex-wrap gap-2">
              {['C++', 'Microsoft office', 'C', 'C++', 'Microsoft office', 'C'].map((skill, index) => (
                <span key={index} className="bg-pink-100 text-pink-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* Personal Info */}
          <div className="w-full bg-blue-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Personal Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-medium">username@gmail.com</p>
              </div>
              <div>
                <p className="text-gray-600">Phone</p>
                <p className="font-medium">1234567890</p>
              </div>
              <div>
                <p className="text-gray-600">Year of Passing</p>
                <p className="font-medium">2026</p>
              </div>
            </div>
          </div>
          
          {/* Bio */}
          <div className="w-full bg-blue-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Bio</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Profile;