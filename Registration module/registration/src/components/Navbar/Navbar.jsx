import React from "react";
import { IoMdMenu } from "react-icons/io";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={`relative z-20 `}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-10 sm:px-8 lg:px-16 xl:px-20 2xl:px-24 pt-8 pb-8 flex justify-between  items-center  ">

        {/* Logo section */}
        <div>
          <h1 className="text-2xl  sm:text-4xl font-bold text-black transform scale-95">
            Journify
          </h1>
        </div>

        {/* Menu section */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-3">

            <div className="flex space-x-1">
              <Link
                to="/Login2"
                className="inline-flex bg-teal-400 text-white font-semibold rounded-lg 
               hover:bg-teal-300 duration-200 shadow-lg 
               hover:shadow-xl  items-center gap-2 group text-sm py-1 px-3 ">Login
              </Link>

              <Link
                to="/Signup"
                className="inline-flex bg-teal-400 text-white font-semibold rounded-lg 
               hover:bg-teal-300 duration-200 shadow-lg 
               hover:shadow-xl  items-center gap-2 group text-sm py-1 px-3 ">Sign Up
              </Link>

              <a
                href="http://127.0.0.1:8000/admin/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex bg-teal-400 text-white font-semibold rounded-lg 
             hover:bg-teal-300  duration-200 shadow-lg 
             hover:shadow-xl items-center gap-2 group text-sm py-1 px-3"
              >
                Admin
              </a>

            </div>
          </ul>
        </div>
        {/* Mobile Hamburger menu section */}
        <div className="lg:hidden">
          <IoMdMenu className="text-4xl" />
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
