import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import AnimatedText from "./AnimatedText";

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms
  const logoY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const gradientY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 0.8, 0.8, 0]
  );

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      className="relative py-32 px-6 md:px-12 bg-black overflow-hidden"
      id="about"
      ref={containerRef}
    >
      {/* Floating geometric elements */}
      <motion.div
        className="absolute top-20 left-10 w-2 h-2 bg-[#4ecca3] rounded-full opacity-40"
        style={{ y: gradientY }}
      />
      <motion.div
        className="absolute top-40 right-20 w-3 h-3 border border-[#4ecca3]/30 rounded-full"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 150]) }}
      />
      <motion.div
        className="absolute bottom-40 left-1/4 w-1 h-20 bg-gradient-to-t from-[#4ecca3]/20 to-transparent"
        style={{ y: useTransform(scrollYProgress, [0, 1], [50, -100]) }}
      />

      {/* Subtle background gradient with parallax */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#4ecca3]/3 via-transparent to-transparent"
        style={{ y: gradientY, opacity: glowOpacity }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Minimalistic Header */}
        <motion.div
          className="text-center mb-20"
          ref={headerRef}
          style={{ y: textY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block text-[#4ecca3] text-sm font-medium tracking-[0.2em] uppercase mb-4"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              Learn about our company
            </motion.span>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-tight tracking-tight mb-6">
              <span className="font-light">About</span>{" "}
              <span className="font-light text-[#4ecca3] italic">Us</span>
            </h2>

            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#4ecca3] to-transparent mx-auto mb-8" />

            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto font-sans-serif">
              We transform data into extraordinary results
            </p>
          </motion.div>
        </motion.div>

        {/* Main Content with Parallax */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
          ref={ref}
        >
          {/* Logo Section with Floating Effect */}
          <motion.div
            className="relative"
            style={{ y: logoY }}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            {/* Subtle glow behind logo */}
            <motion.div
              className="absolute inset-0 bg-[#4ecca3]/5 rounded-3xl blur-3xl scale-110"
              animate={{
                scale: [1.1, 1.2, 1.1],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-3xl p-8 border border-white/5">
              <img
                src="/bigc_logo.png"
                alt="BIG C Truckin Services"
                className="w-full h-auto relative z-10 filter brightness-110"
              />
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div className="space-y-8" style={{ y: textY }}>
            {/* Minimalistic Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#4ecca3]/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50" />

              <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
                {/* Subtle rotating gradient */}
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
                  <motion.div
                    className="text-4xl font-light text-[#4ecca3] mb-2"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  ></motion.div>
                  <h3 className="text-xl font-medium text-white mb-3">
                    ROI Promedio
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Incremento comprobado en campañas de performance marketing
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Clean Text Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div>
                <span className="text-[#4ecca3] text-sm font-medium tracking-wider uppercase mb-3 block">
                  Nuestra Filosofía
                </span>
                <AnimatedText
                  text="Data-Driven Performance"
                  className="text-3xl md:text-4xl font-light text-white mb-6"
                  once={false}
                />
              </div>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p className="font-light">
                  Combinamos análisis profundo con creatividad estratégica para
                  <span className="text-[#4ecca3] font-medium">
                    {" "}
                    maximizar cada inversión publicitaria
                  </span>
                  .
                </p>

                <p className="font-light">
                  Desde adquisición hasta retención, transformamos insights en
                  <span className="text-white font-medium">
                    {" "}
                    resultados medibles y sostenibles
                  </span>
                  .
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent" />
    </section>
  );
};

export default About;
