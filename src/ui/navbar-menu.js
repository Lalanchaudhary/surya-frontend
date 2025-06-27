import React from "react";
import { motion } from "motion/react";



const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-gray-700 hover:text-[#e098b0] font-medium px-4 py-2 rounded-full hover:bg-gray-50 transition-all duration-300">
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}>
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4 md:pt-0">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white  backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-white/[0.2] shadow-xl">
                <motion.div
                  layout
                  className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full  bg-transparent flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4 px-4 md:px-8 py-4">
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src
}) => {
  return (
    <a 
      href={href} 
      className="flex space-x-3 sm:space-x-4 p-2 sm:p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 items-center"
    >
      <img
        src={src}
        width={80}
        height={50}
        alt={title}
        className="shrink-0 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-16 h-12 sm:w-[140px] sm:h-[70px] object-cover" />
      <div>
        <h4 className="text-base sm:text-lg font-semibold mb-1 text-black">
          {title}
        </h4>
        <p className="text-black text-xs sm:text-sm max-w-[7rem] sm:max-w-[10rem]">
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({
  children,
  ...rest
}) => {
  return (
    <a
      {...rest}
      className="text-black dark:text-gray-300 hover:text-[#e098b0] px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300">
      {children}
    </a>
  );
};
