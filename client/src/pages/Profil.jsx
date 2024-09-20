import React from 'react';

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Cover Image */}
        <div className="h-48 bg-gray-200 relative">
          <div className="absolute bottom-0 left-8 transform translate-y-1/2">
            <div className="w-24 h-24 bg-gray-300 rounded-full border-4 border-white"></div>
          </div>
        </div>
        
        {/* User Info */}
        <div className="pt-16 px-8 pb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Full Name Student</h1>
              <p className="text-gray-600">Bachelor of Computer Applications</p>
              <p className="text-gray-600">BATCH 2023</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="bg-blue-100 text-blue-800 text-[12px] lg:text-sm font-medium px-2.5 py-0.5 rounded mb-2">
                Current role
              </span>
              <span className="bg-green-100 text-green-800 text-[12px] lg:text-sm font-medium px-2.5 py-0.5 rounded">
                Student
              </span>
            </div>
          </div>
          
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded mb-6">
            Edit Profile
          </button>
          
          <div className="mb-6">
            <span className="text-gray-700 font-medium mr-2">Skills</span>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-pink-100 text-pink-800 text-sm font-medium px-2.5 py-0.5 rounded">C++</span>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">Microsoft office</span>
              <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">C</span>
            </div>
          </div>
          
          {/* Personal Info */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
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
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Bio</h2>
              <button className="text-blue-600 hover:text-blue-800">Edit</button>
            </div>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;