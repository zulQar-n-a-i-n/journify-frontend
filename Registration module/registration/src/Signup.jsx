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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize the navigate function


  const usernameRegex = /^[A-Za-z][A-Za-z0-9 ]{3,}$/;
  const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.com$/;

  const passwordRegex = /^[A-Za-z0-9][A-Za-z0-9@$!%*?&]{5,}$/;

  const validate = () => {
    let valid = true;
    let newErrors = { username: "" , email: "" , password: "" };
    if (!usernameRegex.test(username)) {
      newErrors.username = "Username must be at least 4 characters and cannot start with number and a space.";
      valid = false;
    }
    if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }
    if (!passwordRegex.test(password)) {
      newErrors.password ="Password must be at least 6 characters, leters,numbers and special characters(not at start)";
         valid = false;
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match!";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    

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
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md bg-gray-50 pl-10 pr-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                />
              </div>{errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          
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
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-gray-50 pl-10 pr-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                />
              </div>{errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        
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
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-gray-50 pl-10 pr-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                />
              </div> {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          
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
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-md bg-gray-50 pl-10 pr-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                />
              </div>{errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
        
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