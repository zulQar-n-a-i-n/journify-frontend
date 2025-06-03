import React from "react";
import { FaBell } from "react-icons/fa";
import BgImage from "../../assets/bg.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const bgStyle = {
  backgroundImage: `url(${BgImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const Subscribe = () => {
  return (
    <section className="bg-[#f7f7f7]">
      <motion.div
        className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-20 2xl:px-24 py-24 md:py-48"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        style={bgStyle}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col justify-center"
        >
          <div className="text-center space-y-4 lg:max-w-[430px] mx-auto">
            <h1 className="text-4xl font-bold !leading-snug">Why Choose Us</h1>
            <p>
              Trusted by thousands to improve mental well-being every day. Join
              a growing community of emotionally aware individuals
            </p>

            <Link
              to="/Pricing"
              className="primary-btn text-white bg-teal-400 py-2 px-6 rounded-lg inline-flex items-center gap-4 group"
            >
              Subscribe Now
              <FaBell className="group-hover:animate-bounce text-white group-hover:text-lg duration-200" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Subscribe;
