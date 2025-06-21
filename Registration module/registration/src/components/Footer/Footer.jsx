import React from "react";
import { useState } from 'react';
import { motion } from "framer-motion";

const Footer = () => {

  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState("");


  const validateEmail = (email) => {
    // Simple email regex
    const regex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.com$/;
    return regex.test(email);
  };

  const handleClick = () => {
    if (!email.trim()) {
      setError("Please enter your email.");
      setShowMessage(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setShowMessage(false);
      return;
    }

    // If email is valid
    setError("");
    setShowMessage(true);
    setEmail("");

    // Hide message after 3 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 4000);


  };

  return (
    <footer className="py-28 bg-[#f7f7f7]">
      <motion.div
        className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-20 2xl:px-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}

      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 md:gap-4">
          {/* first section */}
          <div className="space-y-4 bg-white px-7 py-7 rounded-xl max-w-[300px]">
            <h1 className="text-2xl font-bold">Journify</h1>
            <p className="text-dark2 ">
              Journify is your personal space for reflection, growth, and emotional well-being. By combining guided writing, mental health analysis, and AI-powered insights, we help you track your mental patterns, gain clarity, and build a healthier state of mind — one entry at a time.
            </p>
          </div>
          {/* second section */}
          <div className="space-y-4  bg-white px-7 py-7 rounded-xl max-w-[300px]">
            <h1 className="text-2xl font-bold">Contact Us</h1>
            <p className="text-dark2">Based in Pakistan. We usually respond within 24 hours. Contact us on:</p>
            <ul className="list-disc list-inside text-dark2">
              <li>help@journify.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
          {/* third section */}
          <div className="space-y-4  max-w-[300px]">
            <h1 className="text-2xl font-bold">Get In Touch</h1>

            <div className="flex items-center">
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 rounded-s-xl bg-white w-full py-4 focus:ring-0 focus:outline-none placeholder:text-dark2"
              />
              <div className="bg-teal-400 rounded-r-xl">
                <button
                  onClick={handleClick}
                  className="bg-primary text-white font-semibold py-4 px-6 rounded-e-xl"
                >
                  Go
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-3 rounded-xl text-center w-full">
                {error}
              </div>
            )}

            {showMessage && (
              <div className="bg-red-100 text-red-700 px-4 py-4 rounded-xl text-center w-full">
                Thanks for subscribing to Newsletter
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;



