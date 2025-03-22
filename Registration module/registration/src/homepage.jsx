import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Homepage() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    // Clear the authentication token (or any other user session data)
    localStorage.removeItem("authToken");

    // Redirect to the Login page
    navigate("/login2");
  };

  return (
    <div className="min-h-screen bg-gray-300">
      {/* Logout Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={handleLogout}
          className="bg-[#7BAF6F] text-white px-4 py-2 rounded-md hover:bg-[#6A9F5F]"
          >
          Logout
        </button>
      </div>

      {/* Homepage Content */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-center text-2xl font-bold text-black">Welcome to the Homepage!</h2>
          <p className="mt-4 text-center text-sm text-black">
            {/* You have successfully logged in. */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;