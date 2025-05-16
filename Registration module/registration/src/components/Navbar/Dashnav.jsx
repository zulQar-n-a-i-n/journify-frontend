import React, { useState } from 'react';

const Dashnav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between bg-red-600 px-6 py-1 shadow-md relative">
      
      {/* Center title */}
      <h1 className="absolute left-1/2  text-white font-mono text-xl font-bold">
        Journify
      </h1>

      {/* Right side Settings */}
      <div className="ml-auto relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white text-xs font-bold text-red-600 px-2 py-1 rounded-lg shadow hover:bg-gray-300 transition"
        >
          Settings
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 bg-white border shadow-md rounded-md w-40 z-10">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Account</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
            </ul>
          </div>
        )}
      </div>

    </nav>
  );
};

export default Dashnav;
