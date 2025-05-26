
import React, { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md"; // Import icons
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Lottie from "lottie-react";
import animationData from "./assets/login-animation.json"; // Replace with your Lottie JSON file

function Loginn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: "", password: "" });
  const navigate = useNavigate(); // Initialize the navigate function


  const usernameRegex = /^[A-Za-z][A-Za-z0-9 ]{3,}$/;
  const passwordRegex = /^[A-Za-z0-9][A-Za-z0-9@$!%*?&]{5,}$/;

  const validate = () => {
    let valid = true;
    let newErrors = { username: "", password: "" };

    if (!usernameRegex.test(username)) {
      newErrors.username = "Username must be at least 4 characters and cannot start with number and a space.";

    }

    if (!passwordRegex.test(password)) {
      newErrors.password = "Password must be at least 6 characters, leters,numbers and special characters(not at start)";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };



  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validate()) return;
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/  ", {
        username,
        password

      });


      const token = response.data.token;
      // 2. Store token in localStorage (or cookie, if needed)
      localStorage.setItem('token', token);

      localStorage.setItem('isLoggedIn', 'true');
      console.log("response", response.data);
      navigate("/Dashboard");
      alert("login successfuly");

    } catch (error) {
      console.log("error occoured", error);
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

                <FaUserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                  id="username"
                  name="username"
                  type="username"
                  value={username}
                  required

                  placeholder="Enter username"
                  className="block w-full rounded-md bg-gray-50 pl-10 pr-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                />
              </div>{errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}



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
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  required
                  placeholder="Enter password"
                  className="block w-full rounded-md bg-gray-50 pl-10 pr-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                />
              </div> {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}

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
                className="w-full rounded-md bg-[#2dd4bf] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#2dd4bf] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2dd4bf]"
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