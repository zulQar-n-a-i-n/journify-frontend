import React, { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import axiosInstance from '../api/axiosInstance';

function PersonalProfile({ onClose }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('user/');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div
      className="fixed inset-0 z-40 bg-black bg-opacity-40 "
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>

        <div className="fixed top-4 right-4 z-50 bg-white rounded-2xl  h-1/2 w-1/4 border flex">

          {/* Left: Avatar & Username Full Height */}
          <div className="w-40 h-auto bg-black text-white flex flex-col items-center mx-1 my-1  p-4 rounded-2xl">
            <FaUserCircle className="w-20 h-20 mb-5" />
            <h5 className="text-lg text-center font-bold ">{userData?.username || 'Loading...'} </h5>
          </div>

          {/* Right: Details */}
          <div className="w-2/3 flex flex-col">

            {/* Top Bar: Close Button */}
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <h2 className="text-2xl font-bold text-black">Account Detail</h2>
              <button onClick={onClose} className="text-red-500  font-bold text-xl">×</button>
            </div>

            {/* Info Section */}
            <div className="p-3 pb-20 space-y-8">
              <div>
                <h6 className="text-lg  font-bold  ">Email</h6>
                <p className="mt-2 text-sm font-semibold">{userData?.email || 'Loading...'}</p>
              </div>

              <div>
                <h6 className="text-lg  font-bold ">Date Joined</h6>
                <p className="mt-2 text-sm font-semibold">
                  {userData?.date_joined ? new Date(userData.date_joined).toLocaleDateString() : 'Loading...'}
                </p>
              </div>

              <div>
                <h6 className="text-lg  font-bold ">Account Type</h6>
                <p className="mt-2 text-sm font-semibold ">{userData?.account_type || 'Loading...'}</p>
              </div>
              <div>
                <h6 className="text-lg  font-bold ">Total Entries</h6>
                <p className="mt-2 text-sm font-semibold">{userData?.email || 'Loading...'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalProfile;
