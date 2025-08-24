import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";

const Contacts = () => {
  const { isDarkMode } = useTheme();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Simple Phone Icon
  const PhoneIcon = () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      className={`${isDarkMode ? "stroke-[#4ecca3]" : "stroke-black"}`}
    >
      <rect
        x="30"
        y="15"
        width="40"
        height="70"
        rx="8"
        strokeWidth="3"
        fill="none"
      />
      <rect
        x="35"
        y="25"
        width="30"
        height="45"
        rx="2"
        strokeWidth="2"
        fill="none"
      />
      <line
        x1="42"
        y1="20"
        x2="58"
        y2="20"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="50" cy="78" r="3" strokeWidth="2" fill="none" />
    </svg>
  );

  return (
    <section
      className={`min-h-screen py-32 px-6 md:px-12 overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-black" : "bg-stone-100"
      }`}
      id="contact"
      ref={containerRef}
    >
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-center min-h-[70vh]">
          {/* Left Side - Main Content */}
          <motion.div
            className="space-y-16"
            ref={headerRef}
            style={{ y: textY }}
          >
            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={
                headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.8 }}
            >
              <h1
                className={`font-serif leading-none tracking-tight transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
                style={{ fontSize: "clamp(4rem, 12vw, 8rem)" }}
              >
                <div className="font-light">GET IN</div>
                <div className="flex items-center gap-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      headerInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0 }
                    }
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <PhoneIcon />
                  </motion.div>
                  <span className="font-light">TOUCH</span>
                </div>
              </h1>
            </motion.div>

            {/* Email Link */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.8, delay: 0.5 }}
              className="border-b border-current pb-2 inline-block"
            >
              <a
                href="mailto:hello@bigctruckin.com"
                className={`text-2xl md:text-3xl font-light transition-all duration-300 hover:text-[#4ecca3] ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                hello@bigctruckin.com
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side - Additional Info */}
          <motion.div
            className="space-y-12 lg:pl-12"
            ref={contentRef}
            style={{ y: useTransform(scrollYProgress, [0, 1], [30, -30]) }}
          >
            {/* Care Message */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={
                contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
              }
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <p
                className={`text-xl md:text-2xl font-sans-serif  leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                For more information or if you need to get in touch with us, you
                may contact us directly using the provided details.
              </p>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={
                contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
              }
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-3"
            >
              <h3
                className={`text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                ADDRESS
              </h3>
              <div>
                <span
                  className={`text-base transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  QUEZON CITY RANDOM LANG{" "}
                </span>
                <a
                  href="#faq"
                  className="text-[#4ecca3] underline hover:no-underline transition-all duration-300"
                >
                  MAP
                </a>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={
                contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
              }
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h3
                className={`text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Social Links
              </h3>
              <div className="space-y-3">
                {[
                  {
                    name: "Instagram",
                    href: "https://instagram.com/bigctruckin",
                  },
                  {
                    name: "Facebook",
                    href: "https://facebook.com/bigctruckin",
                  },
                  {
                    name: "LinkedIn",
                    href: "https://linkedin.com/company/bigctruckin",
                  },
                ].map((social, index) => (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={
                      contentInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: 20 }
                    }
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-base transition-all duration-300 hover:text-[#4ecca3] hover:translate-x-2 inline-block ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {social.name}
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.a
                href="https://cal.com/valegarcia/intro"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-8 py-4 backdrop-blur-sm rounded-2xl font-medium transition-all duration-300 ${
                  isDarkMode
                    ? "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                    : "bg-black/10 text-black border border-black/20 hover:bg-black/20"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                +63 967343943 Call us
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
