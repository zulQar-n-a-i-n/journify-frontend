import React, { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import animationData from "./assets/signup-animation.json"; // Replace with your Lottie JSON file

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("hello");

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register/", {
        username,
        email,
        password,
      });
      console.log("response", response.data);
    
      // Navigate to the Login page after successful registration
      navigate("/Login2");
      alert("Signup successful!");
    } catch (error) {
      console.log("error occurred", error);
      alert("Signup failed");
    }

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="flex w-full max-w-6xl bg-gray-200 p-0 relative rounded-lg shadow-lg">
        {/* Signup Form Section */}
        <div className="w-full sm:w-1/2 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-center text-2xl font-bold text-black">Sign Up</h2>

          <form onSubmit={submitHandler} className="space-y-6 mt-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-black">
                Username
              </label>
              <div className="mt-2 relative">
                <FaUserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md bg-gray-50 pl-10 pr-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                />
              </div>
            </div>

            {/* Email Field */}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-gray-50 pl-10 pr-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Password
              </label>
              <div className="mt-2 relative">
                <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-gray-50 pl-10 pr-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-black">
                Confirm Password
              </label>
              <div className="mt-2 relative">
                <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-md bg-gray-50 pl-10 pr-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                />
              </div>
            </div>

            {/* Register Button */}
            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-[#8FBF7F] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#7BAF6F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FBF7F]"
              >
                Register
              </button>
            </div>
          </form>

          {/* Navigation to Login Page */}
          <p className="mt-6 text-center text-sm text-black">
            Already have an Account?{" "}
            <Link to="/login2" className="font-semibold text-black hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>

        {/* Animation Section */}
        <div className="hidden sm:flex w-1/2 justify-center items-center relative bg-gray-300 overflow-hidden">
          <Lottie animationData={animationData} className="w-3/4 h-3/4" />
        </div>
      </div>
    </div>
  );
}

export default Signup;