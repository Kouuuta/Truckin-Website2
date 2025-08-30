import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

const About = () => {
  const { isDarkMode } = useTheme();
  const [activeCard, setActiveCard] = useState(0);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [logoRef, logoInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Auto-cycle through info cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const infoCards = [
    {
      title: "Our Mission",
      content:
        "To provide safe, reliable, and efficient trucking services that empower businesses to grow and succeed.",
      accent: "Empowering Growth",
    },
    {
      title: "Our Vision",
      content:
        "To be the most trusted logistics partner, recognized for delivering innovative and sustainable transport solutions.",
      accent: "Trusted Partnership",
    },
    {
      title: "Our Values",
      content:
        "Our values are rooted in reliability, integrity, and a strong commitment to our customers, while continuously striving for improvement.",
      accent: "Excellence Driven",
    },
  ];

  return (
    <section
      className={`relative py-32 px-6 md:px-12 overflow-hidden transition-colors duration-700 ${
        isDarkMode
          ? "bg-black"
          : "bg-gradient-to-br from-stone-50 via-white to-zinc-50"
      }`}
      id="about"
    >
      {/* Vintage Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234ecca3' fill-opacity='0.3'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm15 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating vintage elements */}
      <motion.div
        className="absolute top-20 left-10 w-4 h-4 border-2 border-[#4ecca3]/30 rotate-45"
        animate={{
          rotate: [45, 135, 45],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-40 right-20 w-2 h-16 bg-gradient-to-b from-[#4ecca3]/40 to-transparent"
        animate={{
          height: [64, 80, 64],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: 1,
        }}
      />

      <motion.div
        className="absolute bottom-40 left-1/4 w-8 h-8 border border-[#4ecca3]/25"
        animate={{
          rotate: [0, 180, 360],
          borderRadius: ["0%", "50%", "0%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Vintage-Modern Header */}
        <motion.div className="text-center mb-24" ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={
              headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
            }
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.span
              className="inline-block text-[#4ecca3] text-sm font-medium tracking-[0.2em] uppercase mb-4"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              Learn about our company
            </motion.span>

            <h2
              className={`text-5xl md:text-6xl lg:text-7xl font-serif leading-tight tracking-tight mb-6 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              <span className="font-light">About</span>{" "}
              <span className="font-light text-[#4ecca3] italic">Us</span>
            </h2>

            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#4ecca3] to-transparent mx-auto mb-8" />

            <motion.p
              className={`text-lg leading-relaxed max-w-2xl mx-auto font-sans-serif transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              Driving businesses forward with reliable trucking and logistics
              solutions since our foundation
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Main Content Layout */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start"
          ref={ref}
        >
          {/* Left: Company Logo & Stats */}
          <motion.div
            className="relative"
            ref={logoRef}
            initial={{ opacity: 0, x: -60 }}
            animate={logoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Vintage frame for logo */}
            <div className="relative">
              {/* Decorative corners */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-l-2 border-t-2 border-[#4ecca3]/40" />
              <div className="absolute -top-4 -right-4 w-12 h-12 border-r-2 border-t-2 border-[#4ecca3]/40" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 border-l-2 border-b-2 border-[#4ecca3]/40" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-r-2 border-b-2 border-[#4ecca3]/40" />

              {/* Floating glow effect */}
              <motion.div
                className="absolute inset-0 bg-[#4ecca3]/10 rounded-3xl blur-3xl"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div
                className={`relative backdrop-blur-sm rounded-3xl p-12 transition-all duration-700 ${
                  isDarkMode
                    ? "bg-gradient-to-br from-gray-900/80 to-black/80 border-2 border-white/10"
                    : "bg-gradient-to-br from-white/80 to-gray-100/80 border-2 border-gray-200/30"
                }`}
              >
                <motion.img
                  src="/bigc_logo.png"
                  alt="BIG C Truckin Services"
                  className="w-full h-auto relative z-10 filter brightness-110"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Animated Info Cards */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          >
            {/* Company Description */}
            <motion.div
              className={`relative backdrop-blur-xl rounded-2xl p-8 transition-all duration-500 ${
                isDarkMode
                  ? "bg-black/60 border border-white/10 hover:border-white/20"
                  : "bg-white/60 border border-gray-200/30 hover:border-gray-300/50"
              }`}
            >
              <motion.div
                className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-30"
                style={{
                  background:
                    "conic-gradient(from 0deg, #4ecca3, #60a5fa, #4ecca3)",
                  filter: "blur(20px)",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="relative z-10">
                <motion.h3
                  className={`text-xl font-medium mb-3 transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  BIG C Trucking Services
                </motion.h3>

                <motion.p
                  className={`text-m leading-relaxed transition-colors duration-300 text-justify ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  A trusted logistics and transportation partner dedicated to
                  delivering dependable, efficient, and scalable trucking
                  solutions. We focus on simplifying logistics so businesses can
                  operate with confidence and peace of mind. Our services are
                  built around reliability and performance—ensuring every
                  delivery is on time, every mile is cost-effective, and every
                  client's unique needs are met.
                </motion.p>
              </div>
            </motion.div>

            {/* Cycling Info Cards */}
            <div className="relative h-80">
              {infoCards.map((card, index) => (
                <motion.div
                  key={index}
                  className={`absolute inset-0 backdrop-blur-xl rounded-3xl p-8 transition-all duration-700 ${
                    isDarkMode
                      ? "bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-white/10"
                      : "bg-gradient-to-br from-gray-50/70 to-white/70 border border-gray-200/30"
                  }`}
                  initial={{ opacity: 0, rotateX: -90 }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0,
                    rotateX: activeCard === index ? 0 : -90,
                    z: activeCard === index ? 10 : 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  style={{ perspective: 1000 }}
                >
                  {/* Card content */}
                  <div className="h-full flex flex-col justify-center relative">
                    {/* Decorative accent */}
                    <motion.div
                      className="absolute top-6 right-6 text-[#4ecca3]/20 text-6xl font-serif"
                      animate={{ rotate: [0, 5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      "{index + 1}"
                    </motion.div>

                    <motion.span
                      className="inline-block text-[#4ecca3] text-sm font-medium tracking-[0.2em] uppercase mb-4"
                      initial={{ x: -20 }}
                      animate={{ x: activeCard === index ? 0 : -20 }}
                      transition={{ delay: 0.2 }}
                    >
                      ━━━ {card.accent} ━━━
                    </motion.span>

                    <motion.h4
                      className={`text-3xl font-medium mb-3 transition-colors duration-300  ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                      initial={{ y: 20 }}
                      animate={{ y: activeCard === index ? 0 : 20 }}
                      transition={{ delay: 0.3 }}
                    >
                      {card.title}
                    </motion.h4>

                    <motion.p
                      className={`text-m leading-relaxed transition-colors duration-300 text-justify ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                      initial={{ y: 20 }}
                      animate={{ y: activeCard === index ? 0 : 20 }}
                      transition={{ delay: 0.4 }}
                    >
                      {card.content}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Card navigation dots */}
            <div className="flex justify-center space-x-3 mt-6">
              {infoCards.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeCard === index
                      ? "bg-[#4ecca3] scale-125"
                      : isDarkMode
                      ? "bg-gray-600 hover:bg-gray-500"
                      : "bg-gray-400 hover:bg-gray-500"
                  }`}
                  onClick={() => setActiveCard(index)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle bottom fade with vintage gradient */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-32 transition-colors duration-700 ${
          isDarkMode
            ? "bg-gradient-to-t from-black via-black/90 to-transparent"
            : "bg-gradient-to-t from-stone-50 via-white/80 to-transparent"
        }`}
      />
    </section>
  );
};

export default About;
