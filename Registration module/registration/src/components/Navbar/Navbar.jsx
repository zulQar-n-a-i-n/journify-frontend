import React from "react";
import { IoMdMenu } from "react-icons/io";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

const NavbarMenu = [

];
const Navbar = ({ className = "" }) => {
  return (
    <nav className={`relative z-20 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-10 sm:px-8 lg:px-16 xl:px-20 2xl:px-24 py-2 flex justify-between items-center ">

        {/* Logo section */}
        <div>
          <img
            src={Logo}
            alt="Journify Logo"
            className="h-20 sm:h-24 w-auto object-contain transform scale-150"
          />
        </div>
        {/* Menu section */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-3">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.path}
                  className="inline-block py-2 px-3 hover:text-secondary relative group"
                >
                  <div className="w-2 h-2 bg-secondary absolute mt-4 rounded-full left-1/2 -translate-x-1/2 top-1/2 bottom-0 group-hover:block hidden"></div>
                  {menu.title}
                </Link>
              </li>
            ))}
            <div className="flex space-x-1">
              <Link
                to="/Login2"
                className="inline-flex bg-teal-400 text-white font-semibold rounded-lg 
               hover:bg-teal-400 duration-200 shadow-lg 
               hover:shadow-xl  items-center gap-2 group text-sm py-1 px-3 ">Login
              </Link>

              <Link
                to="/Signup"
                className="inline-flex bg-teal-400 text-white font-semibold rounded-lg 
               hover:bg-teal-400 duration-200 shadow-lg 
               hover:shadow-xl  items-center gap-2 group text-sm py-1 px-3 ">Sign Up
              </Link>

              <a
                href="http://127.0.0.1:8000/admin/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex bg-teal-400 text-white font-semibold rounded-lg 
             hover:bg-teal-400 duration-200 shadow-lg 
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
