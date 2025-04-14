import React from "react";
import { RiComputerLine } from "react-icons/ri";
import { MdEventAvailable } from "react-icons/md";
import { GrSecure } from "react-icons/gr";
import { IoMdHappy } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { MdSpeed } from "react-icons/md";
import { motion } from "framer-motion";

const ServicesData = [
  {
    id: 1,
    title: "Secure",
    description: "We provide round-the-clock support for all your needs.",
    link: "#",
    icon: <GrSecure />,
    delay: 0.2,
  },
  {
    id: 2,
    title: "24/7 Support",
    description: "We provide round-the-clock support for all your needs.",
    link: "#",
    icon: <MdEventAvailable />,
    delay: 0.3,
  },
  {
    id: 3,
    title: "Customizable",
    description: "We provide round-the-clock support for all your needs.",
    link: "#",
    icon: <RiComputerLine />,
    delay: 0.4,
  },
  {
    id: 4,
    title: "Reliable",
    description: "We provide round-the-clock support for all your needs.",
    link: "#",
    icon: <IoMdHappy />,
    delay: 0.5,
  },
  {
    id: 5,
    title: "Fast",
    description: "We provide round-the-clock support for all your needs.",
    link: "#",
    icon:  <MdSpeed />,
    delay: 0.6,
  },
  {
    id: 6,
    title: "24/7 support",
    description: "We provide round-the-clock support for all your needs.",
    link: "#",
    icon: <BiSupport />,
    delay: 0.7,
  },
];

const SlideLeft = (delay) => {
  return {
    initial: {
      opacity: 0,
      x: 50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};
const Services = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-20 2xl:px-24 pb-14 pt-16">
        <h1 className="text-4xl text-center font-bold  pb-10">
         Features We Provides
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {ServicesData.map((service) => (
            <motion.div
              key={service.id}
              variants={SlideLeft(service.delay)}
              initial="initial"
              whileInView={"animate"}
              viewport={{ once: true }}
              className="bg-[#f4f4f4] rounded-2xl flex flex-col gap-2 items-center justify-center p-4 py-7 hover:bg-white hover:scale-110 duration-300 hover:shadow-2xl"
            >
              <div className="text-4xl  mb-2">{service.icon}</div>
              <h1 className="text-lg font-semibold text-center  px-3">{service.title}</h1>
              <p className="text-sm text-center px-3 text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
