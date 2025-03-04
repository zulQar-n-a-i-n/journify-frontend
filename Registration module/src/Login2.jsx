
import React from "react";
import { MdEmail, MdLock } from "react-icons/md"; // Import icons
    

function Loginn() {
  

  return (
   
                <div className="flex items-center justify-center min-h-screen  bg-gray-300">
                  
                  <div className="flex w-full max-w-6xl bg-gray-300 p-0  relative rounded-lg  shadow-lg">
                    
                    {/* Form Section with White Background */}
                    <div className="w-full sm:w-1/2 p-14  bg-white rounded-lg shadow-lg">
                      <h2 className="text-center text-2xl font-bold text-black">Login</h2>
            
                      <form action="#" method="POST" className="space-y-6 mt-6">
                        <div>
                          <label htmlFor="email" className="text-left block text-sm font-medium text-black">
                            Email Address
                          </label>
                          <div className="mt-2 relative">
                            <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="Enter email"
                              className="block w-full rounded-md bg-gray-50 pl-10 pr-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                            />
                          </div>
                        </div>
            
                        <div>
                          <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-black">
                              Password
                            </label>
                          </div>
                          <div className="mt-2 relative">
                            <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                              id="password"
                              name="password"
                              type="password"
                              placeholder="Enter password"
                              className="block w-full rounded-md bg-gray-50 pl-10 pr-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                            />
                          </div>
            
                          <div className="text-sm text-right">
                            <a href="#" className="font-semibold text-black hover:text-indigo-500">
                              Forgot password?
                            </a>
                          </div>
                        </div>
            
                        {/* Submit Button */}
                        <div>
                          <button
                            type="submit"
                            className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
            
                      {/* Footer */}
                      <p className="mt-6 text-center text-sm text-black">
                        New Here?{" "}
                        <a href="#" className="font-semibold text-black hover:text-indigo-500">
                          Create an Account
                        </a>
                      </p>
                    </div>
            
                    {/* Animation Section with Gray Background */}
                    <div className="hidden sm:flex w-1/2 justify-center items-center relative bg-gradient-to-tr from-violet-300 to-green-300">
                      {/* Centered Animation */}
                      <div className="w-52 h-52 bg-gradient-to-tr from-violet-500 to-green-500 rounded-full animate-bounce relative "></div>
            
                      {/* Bottom Half Section (blurred) */}
                      <div className="absolute bottom-0 left-0 w-full h-1/2 backdrop-blur-sm rounded-b-lg"></div>
                    </div>
                  </div>
                </div>
      );
    }
    
  
   

export default Loginn



