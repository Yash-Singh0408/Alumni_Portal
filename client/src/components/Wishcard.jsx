import React from 'react';

export default function Wishcard() {
  return (
    <div className="bg-blue-50 h-48 relative overflow-hidden rounded-xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-y-1/4 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-y-1/4 -translate-x-1/4"></div>
      <div className="absolute bottom-4 left-6 z-10">
        <h1 className="text-5xl font-bold text-gray-900 mb-1">Good Morning, Username!</h1>
        <p className="text-xl text-gray-700">
          Welcome back to the Alumni Network! Here's what's happening today.
        </p>
      </div>
    </div>
  );
}