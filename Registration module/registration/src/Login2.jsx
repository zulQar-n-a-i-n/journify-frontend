
import React, { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md"; // Import icons
import axios from "axios";
import { Link , useNavigate} from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Lottie from "lottie-react";
import animationData from "./animation.json"; // Replace with your Lottie JSON file

function Loginn() {
  const [username, setUsername] =useState('');
  const [password, setPassword] =useState('');
  const navigate = useNavigate(); // Initialize the navigate function
  

  const submitHandler= async(e)=>{
    e.preventDefault();
    try {
      const response =await axios.post("http://127.0.0.1:8000/api/login/  ",{
        username,
        password

      });
      console.log("response",response.data);
      navigate("/homepage");
      alert("login successfuly");
      
    } catch (error) {
      console.log("error occoured",error);
      alert("login failed")
      
      
    }
   
   
    setUsername('');
    setPassword('');
  
    
  };
  
 
  return (
   
                <div className="flex items-center justify-center min-h-screen  bg-gray-300">
                  
                  <div className="flex w-full max-w-6xl bg-gray-300 p-0  relative rounded-lg  shadow-lg">
                    
                    {/* Form Section with White Background */}
                    <div className="w-full sm:w-1/2 p-14  bg-white rounded-lg shadow-lg">
                      <h2 className="text-center text-2xl font-bold text-black">Login</h2>
            
                      <form 
                      onSubmit={submitHandler} className="space-y-6 mt-6">
                        
                    
                        <div>
                          <label htmlFor="username" className="text-left block text-sm font-medium text-black">
                            Username
                          </label>
                          <div className="mt-2 relative">
                            
                            <FaUserCircle  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                            onChange={(e)=>{
                             setUsername(e.target.value)
                            }}
                              id="username"
                              name="username"
                              type="username"
                              value={username}
                              
                              placeholder="Enter username"
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
                            onChange={(e)=>{
                              setPassword(e.target.value)
                             }}
                              id="password"
                              name="password"
                              type="password"
                              value={password}
                              placeholder="Enter password"
                              className="block w-full rounded-md bg-gray-50 pl-10 pr-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                            />
                          </div>
            
                          <div className="text-sm text-right">
                          
                            <Link to="/Forgotpassword" className="font-semibold text-black hover:text-indigo-500">
                           Forgot Password
                           </Link>
                          </div>
                        </div>
            
                        {/* Submit Button */}
                        <div>
                          <button
                            type="submit"
                            className="w-full rounded-md bg-[#8FBF7F] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#7BAF6F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FBF7F]"
                          >
                            Sign in
                          </button>
                        </div>


                      </form>
            
                      {/* Footer */}
                      <p className="mt-6 text-center text-sm text-black">
                        New Here?{" "}
                        <Link to="/Signup" className="font-semibold text-black hover:text-indigo-500">
                        Create an Account
                        </Link>
                      </p>
                    </div>
            
                    {/* Animation Section with Gray Background */}
                    {/* Animation Section */}
        <div className="hidden sm:flex w-1/2 justify-center items-center relative bg-gray-300 overflow-hidden">
          {/* Lottie Animation */}
          <Lottie animationData={animationData} className="w-3/4 h-3/4" />

          {/* Bottom Half Section (blurred) */}
          {/* <div className="absolute bottom-0 left-0 w-full h-1/2 backdrop-blur-md rounded-b-lg"></div> */}
        </div>
                  </div>
                </div>
      );
    }
    
  
   

export default Loginn