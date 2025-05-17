import React, { useState } from 'react';

const Dashnav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex  bg-gray-200 rounded-md px-3 py-3 items-center relative">
      
      {/* Center title */}
      
      <img src="/logo.png" alt="logo" className='h-40  absolute pl-12  w-auto' />

      {/* Right side Settings */}
      <div className="ml-auto relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className=" text-md font-bold text-black px-3 py-3 rounded-lg  hover:bg-yellow-100 transition"
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