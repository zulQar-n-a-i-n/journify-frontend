import React from "react";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-28 bg-[#f7f7f7]">
      <motion.div
        className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-20 2xl:px-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 md:gap-4">
          {/* first section */}
          <div className="space-y-4 max-w-[300px]">
            <h1 className="text-2xl font-bold">Journify</h1>
            <p className="text-dark2">
              Journify is your personal space for reflection, growth, and emotional well-being. By combining guided writing, mental health analysis, and AI-powered insights, we help you track your mental patterns, gain clarity, and build a healthier state of mind — one entry at a time.
            </p>
          </div>
          {/* second section */}
          <div class="space-y-4 max-w-[300px]">
            <h1 class="text-2xl font-bold">Contact Us</h1>
            <p class="text-dark2">Based in Pakistan. We usually respond within 24 hours. Contact us on:</p>
            <ul class="list-disc list-inside text-dark2">
              <li>help@journify.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
          {/* third section */}
          <div className="space-y-4 max-w-[300px]">
            <h1 className="text-2xl font-bold">Get In Touch</h1>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Enter your email"
                className="p-3 rounded-s-xl bg-white w-full py-4 focus:ring-0 focus:outline-none placeholder:text-dark2"
              />
              <button className="bg-primary text-white font-semibold py-4 px-6 rounded-e-xl">
                Go
              </button>
            </div>

          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;



