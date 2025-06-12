import { div } from "framer-motion/client";
import React from "react";


function Homepage() {
 
 

  return (
   
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white flex flex-col items-center justify-center text-center p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl text-center  font-bold mb-2">not enough entries</h2>
            <p className="mb-4">ythjdjksj jdhsd duwd jdj jfejf ejfe jhsj djhd jdhsd fe.</p>
            <button
              className="bg-blue-500 text-center text-white px-4 py-2 rounded"
              
            >
              Close
            </button>
          </div>
        </div>
  );
}

export default Homepage;

