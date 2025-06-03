import React, { useEffect, useState } from 'react';
import axios from 'axios';
import userAvatar from '../assets/user-avatar2.png';
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
    <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-xl h-auto w-1/4 border">
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <h2 className="text-2xl font-black">Account Detail</h2>
        <button onClick={onClose} className="text-red-500 font-bold text-xl">×</button>
      </div>
      <div className="flex flex-col md:flex-row p-4">
        <div className="md:w-auto flex flex-col  items-cemter  rounded-md text-white p-4 bg-gradient-to-br from-gray-900 to-gray-700">
          <img
            src={userAvatar}
            alt="Avatar"
            className="w-20 h-20 p-3 bg-white rounded-full my-5"
          />
          <h5 className="text-lg font-bold">{userData?.username || 'Loading...'}</h5>
        </div>
        <div className="md:w-2/3 p-4">
          <h6 className="text-xl font-bold mb-2">User Information</h6>
          <hr className="mb-4" />
          <div className="flex flex-col mb-10">
            <div className="w-auto mb-10">
              <h6 className="text-lg font-bold">Email</h6>
              <p className="text-gray-600 text-sm">{userData?.email || 'Loading...'}</p>
            </div>
            <div className="w-auto mb-10">
              <h6 className="text-lg font-bold">Date Joined</h6>
              <p className="text-gray-600 text-sm">{userData?.date_joined ? new Date(userData.date_joined).toLocaleDateString() : 'Loading...'}</p>
            </div>
            <div className="w-auto mb-3">
              <h6 className="text-lg font-bold">Account Type</h6>
              <p className="text-gray-600 text-sm">{userData?.account_type || 'Loading...'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalProfile