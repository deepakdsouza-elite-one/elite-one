"use client";
import { scrollTo } from "@/lib/utils";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <div className="px-[5%] py-20 md:pt-37.5 min-h-[85vh] flex flex-col justify-center">
      <div className="flex flex-col gap-8 items-start">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-[40px] md:text-[50px] 2xl:text-[70px] font-normal leading-tight md:leading-[1.1] max-w-full"
        >
          Transform your story <br />
          with{" "}
          <span className="bg-linear-to-r from-[#D9B36C] via-[#C8A15A] to-[#8B6D3A] bg-clip-text text-transparent">
            Luxury
          </span>{" "}
          video editing
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="text-md 2xl:text-[17px] text-gray-500 leading-[1.7] max-w-full md:max-w-140"
        >
          Professional video editing services for brands, creators, and
          visionaries who demand excellence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="pt-4"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 24px rgba(217, 179, 108, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollTo("services")}
            className="bg-[#D9B36C] text-white px-10 py-4 text-[15px] rounded-full border-none cursor-pointer tracking-[0.5px] font-medium shadow-lg transition-all duration-200 active:shadow-xl"
          >
            Explore Styles
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
