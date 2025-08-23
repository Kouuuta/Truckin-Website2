import React from "react";
import { motion } from "framer-motion";
interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
}
const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  once = false,
}) => {
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        damping: 8,
        stiffness: 100,
      },
    },
  };
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        damping: 12,
        stiffness: 100,
      },
    },
  };
  return (
    <motion.div
      className={`overflow-hidden flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <motion.span key={index} className="mr-2 mt-1" variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
export default AnimatedText;
