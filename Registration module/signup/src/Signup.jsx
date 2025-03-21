import React, { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import axios from "axios";
import Lottie from "lottie-react";
import animationData from "./animation.json"; // Replace with your Lottie JSON file

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      console.log("User registered successfully:", response.data);
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration failed:", error.response?.data);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="flex w-full max-w-6xl bg-gray-200 p-0 relative rounded-lg shadow-lg">
        {/* Signup Form Section */}
        <div className="w-full sm:w-1/2 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-center text-2xl font-bold text-black">Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-black">
                Username
              </label>
              <div className="mt-2 relative">
                <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-gray-50 pl-10 pr-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                />
              </div>
            </div>

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
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-gray-50 pl-10 pr-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                />
              </div>
            </div>

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
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-gray-50 pl-10 pr-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                />
              </div>
            </div>

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
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-gray-50 pl-10 pr-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                />
              </div>
            </div>

            <div>
  <button
    type="submit"
    className="w-full rounded-md bg-[#8FBF7F] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#7BAF6F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FBF7F]"
  >
    Register
  </button>
</div>

          </form>

          <p className="mt-6 text-center text-sm text-black">
            Already have an Account?{' '}
            <a href="#" className="font-semibold text-black hover:text-indigo-500">
              Login
            </a>
          </p>
        </div>

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

export default Signup;
