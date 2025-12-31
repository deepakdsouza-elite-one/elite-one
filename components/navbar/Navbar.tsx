"use client";

import { motion } from "motion/react";

const Navbar = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute top-0 left-0 right-0 h-15 md:h-20 flex items-center border-b border-[#eee] px-[5%]"
    >
      <button className="font-freeZoneMedium text-4xl md:text-[55px] 2xl:text-[65px] font-medium tracking-normal lowercase text-black w-fit">
        <span className="bg-linear-to-r from-[#D9B36C] via-[#C8A15A] to-[#8B6D3A] bg-clip-text text-transparent">
          Elite
        </span>{" "}
        one
      </button>
    </motion.header>
  );
};

export default Navbar;
