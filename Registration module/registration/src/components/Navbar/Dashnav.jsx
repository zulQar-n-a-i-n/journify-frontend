import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalProfile from '../../pages/account';

const Dashnav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsOpen(false);
    setShowProfile(false);
    navigate('/Login2');
  };

  return (
    <>
      <nav className="flex bg-gray-200 rounded-md px-3 py-3 items-center relative z-10">
        <img src="/logo.png" alt="logo" className="h-16 sm:h-24 pl-28 w-auto object-contain transform scale-150" />

        <div className="ml-auto pr-12 relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-md font-bold text-black px-3 py-3 rounded-lg hover:bg-yellow-100 transition"
          >
            Settings
          </button>

          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-10 bg-transparent"
                onClick={() => setIsOpen(false)}
              />
              <div className="absolute flex justify-center right-0 mt-0 py-1  bg-white border shadow-md rounded-md w-32 z-20">
                <ul>
                  <li
                    onClick={() => {
                      setIsOpen(false);
                      setShowProfile(true); // show modal
                    }}
                    className="px-4 py-2  text-lg hover:bg-gray-200 hover:rounded-md  cursor-pointer"
                  >
                    Account
                  </li>
                  <li
                    onClick={handleLogout}
                    className="px-4 py-2 text-lg hover:bg-gray-200 hover:rounded-md cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Modal for Profile */}
      {showProfile && (
        <PersonalProfile onClose={() => setShowProfile(false)} />
      )}
    </>
  );
};

export default Dashnav;
