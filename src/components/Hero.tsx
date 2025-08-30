import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "../contexts/ThemeContext";

const Hero = () => {
  const { isDarkMode } = useTheme();
  const controls = useAnimation();
  const [scrollY, setScrollY] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate fade opacity based on scroll position
  const fadeOpacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.5));

  return (
    <>
      <section
        id="home"
        className={`min-h-screen flex items-center justify-center px-6 md:px-12 pt-20 relative overflow-hidden transition-colors duration-300 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 via-black to-gray-800"
            : "bg-gradient-to-br from-zinc-400 via-white to-zinc-300"
        }`}
      >
        {/* Subtle animated glow effects */}
        <div className="absolute inset-0 -z-10">
          {/* Main gradient overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-[#4ecca3]/5 via-transparent to-transparent" />

          {/* Subtle animated glow */}
          <motion.div
            className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#4ecca3]/8 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-[#4ecca3]/6 blur-2xl"
            animate={{
              scale: [1, 0.8, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-100 ${
            isDarkMode ? "bg-black" : "bg-white"
          }`}
          style={{ opacity: 1 - fadeOpacity }}
        />

        <div
          className={`absolute bottom-0 left-0 right-0 h-32 pointer-events-none ${
            isDarkMode
              ? "bg-gradient-to-t from-black to-transparent"
              : "bg-gradient-to-t from-white to-transparent"
          }`}
          style={{ opacity: Math.min(1, 0.3 + (1 - fadeOpacity) * 0.7) }}
        />

        <div className="container mx-auto max-w-7xl relative z-10" ref={ref}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-24">
            {/* Left side - Truck Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: -50 },
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative">
                {/* Main truck image */}
                <motion.img
                  src="/bigc_trucksample.png"
                  alt="BIG-C Refrigerated Truck"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-[#4ecca3]/10 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-lime-400/20 rounded-full blur-lg"
                  animate={{
                    scale: [1, 0.8, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />

                {/* Additional floating elements */}
                <motion.div
                  className="absolute top-1/4 -left-8 w-12 h-12 bg-[#4ecca3]/15 rounded-full blur-md"
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
              </div>
            </motion.div>

            {/* Right side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: 50 },
              }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full lg:w-1/2 text-center lg:text-left"
            >
              {/* Main heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={controls}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 30 },
                }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mb-8"
              >
                <h1
                  className={`text-5xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  <span className="font-medium">
                    Welcome to <span style={{ color: "#4ecca3" }}>BIG C</span>
                  </span>
                  <br />
                  <span
                    className={`font-serif transition-colors duration-300 ${
                      isDarkMode ? "text-[#fcfcfa]" : "text-gray-800"
                    }`}
                  >
                    Trucking Services
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 20 },
                }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="mb-12"
              >
                <p
                  className={`text-xl md:text-2xl font-sans-serif leading-relaxed tracking-tight transition-colors text-justify duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  We are committed to being your trusted partner in logistics,
                  offering dependable trucking services with a strong focus on
                  customer satisfaction. With every delivery, we aim to support
                  your growth and ensure peace of mind.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 20 },
                }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              >
                {/* Primary button */}
                <motion.a
                  href="#contact"
                  className="px-8 py-4 bg-[#4ecca3] text-black font-medium rounded-xl 
                           shadow-lg shadow-[#4ecca3]/20 hover:shadow-[#4ecca3]/30 
                           backdrop-blur-sm hover:bg-[#3db892]
                           transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-medium tracking-tight">Contact Us</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{ opacity: fadeOpacity }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
