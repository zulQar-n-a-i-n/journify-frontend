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
      <nav className="flex bg-gray-200 rounded-md  py-4 items-center justify-between  relative z-10">
        
          <h1 className="text-2xl  pl-64  sm:text-4xl font-bold text-black transform origin-left scale-95">
            Journify
          </h1>
        

        <div className=" relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xl font-bold mr-24 text-black px-3 py-3 rounded-lg hover:bg-yellow-100 transition"
          >
            Settings
          </button>

          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-10 bg-transparent"
                onClick={() => setIsOpen(false)}
              />
              <div className="absolute flex justify-center right-0 mt-0 py-1  bg-white border shadow-md rounded-md w-44 z-20">
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

                    className="px-4 py-2 text-lg hover:bg-gray-200 hover:rounded-md cursor-pointer"
                  >
                    Generate Report
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
