import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Hero = () => {
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
      <section className="min-h-screen flex items-center justify-center px-6 md:px-12 pt-20 relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Subtle animated glow effects */}
        <div className="absolute inset-0 -z-10">
          {/* Main gradient overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-[#4ecca3]/5 via-transparent to-transparent" />

          {/* Subtle animated glow */}
          <motion.div
            className="absolute top-1/3 left-1/2 w-96 h-96 rounded-full bg-[#4ecca3]/8 blur-3xl transform -translate-x-1/2"
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

          {/* Secondary glow */}
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

        {/* Fade overlay that increases opacity as user scrolls */}
        <div
          className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-100"
          style={{ opacity: 1 - fadeOpacity }}
        />

        {/* Bottom fade gradient that becomes more prominent on scroll */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"
          style={{ opacity: Math.min(1, 0.3 + (1 - fadeOpacity) * 0.7) }}
        />

        <div
          className="container mx-auto max-w-5xl text-center relative z-10"
          ref={ref}
        >
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 30 },
            }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-tight tracking-tight">
              <span className="font-medium">Welcome to BIG C</span>
              <br />
              <span className="font-serif text-[#fcfcfa]">
                Truckin Services
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
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <p className="text-xl md:text-2xl font-sans-serif text-gray-400 leading-relaxed tracking-tight max-w-4xl mx-auto">
              Una agencia de performance enfocada en aumentar tus ventas y
              mejorar tu margen de contribución
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
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Primary button */}
            <motion.a
              href="https://cal.com/valegarcia/intro"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#4ecca3] text-black font-medium rounded-xl 
                       shadow-lg shadow-[#4ecca3]/20 hover:shadow-[#4ecca3]/30 
                       backdrop-blur-sm hover:bg-[#3db892]
                       transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h6 className="font-medium tracking-tight">Hablemos</h6>
            </motion.a>

            {/* Secondary button */}
            <motion.a
              href="#results"
              className="px-8 py-4 bg-gray-800/60 text-white font-medium rounded-xl
                       shadow-lg backdrop-blur-sm border border-gray-700/50
                       hover:bg-gray-700/60 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h6 className="font-medium tracking-tight">Ver Portafolio</h6>
            </motion.a>
          </motion.div>
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
            className="text-gray-400"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
