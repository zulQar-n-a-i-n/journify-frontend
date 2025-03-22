import React from "react";

function Homepage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold text-black">Welcome to the Homepage!</h2>
        <p className="mt-4 text-center text-sm text-black">
          You have successfully logged in.
        </p>
      </div>
    </div>
  );
}

export default Homepage;