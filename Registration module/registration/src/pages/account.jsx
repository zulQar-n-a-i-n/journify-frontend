import React, { useEffect, useState } from 'react';
import axios from 'axios';

 function PersonalProfile({ onClose }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8000/api/user/profile/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-xl h-auto border">
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <h2 className="text-lg font-semibold">Account Info</h2>
        <button onClick={onClose} className="text-red-500 font-bold text-xl">×</button>
      </div>
      <div className="flex flex-col md:flex-row p-4">
        <div className="md:w-1/3 flex flex-col items-center justify-center text-white p-4 bg-gradient-to-br from-yellow-300 to-pink-300">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
            alt="Avatar"
            className="w-20 h-20 rounded-full my-5"
          />
          <h5 className="text-lg font-semibold">{userData?.username || 'Loading...'}</h5>
        </div>
        <div className="md:w-2/3 p-4">
          <h6 className="text-lg font-semibold mb-2">Information</h6>
          <hr className="mb-4" />
          <div className="flex flex-col mb-4">
            <div className="w-auto mb-3">
              <h6 className="text-sm font-medium">Email</h6>
              <p className="text-gray-600 text-sm">{userData?.email || 'Loading...'}</p>
            </div>
            <div className="w-auto mb-3">
              <h6 className="text-sm font-medium">Date Joined</h6>
              <p className="text-gray-600 text-sm">{userData?.date_joined ? new Date(userData.date_joined).toLocaleDateString() : 'Loading...'}</p>
            </div>
            <div className="w-auto mb-3">
              <h6 className="text-sm font-medium">Account Type</h6>
              <p className="text-gray-600 text-sm">{userData?.account_type || 'Loading...'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalProfile