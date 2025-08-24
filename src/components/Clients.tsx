import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

const Clients = () => {
  const { isDarkMode } = useTheme();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const carouselX = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const clients = [
    { id: 1, name: "Client 1", image: "/placeholder-logo-1.png" },
    { id: 2, name: "Client 2", image: "/placeholder-logo-2.png" },
    { id: 3, name: "Client 3", image: "/placeholder-logo-3.png" },
    { id: 4, name: "Client 4", image: "/placeholder-logo-4.png" },
    { id: 5, name: "Client 5", image: "/placeholder-logo-5.png" },
    { id: 6, name: "Client 6", image: "/placeholder-logo-6.png" },
    { id: 7, name: "Client 7", image: "/placeholder-logo-7.png" },
    { id: 8, name: "Client 8", image: "/placeholder-logo-8.png" },
  ];

  const duplicatedClients = [...clients, ...clients, ...clients];

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const cardWidth = 400; // Width of each card + gap
        const maxScroll = cardWidth * clients.length;

        setCurrentIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          const scrollPosition = newIndex * cardWidth;

          // Reset to beginning when reaching the end of original set
          if (scrollPosition >= maxScroll) {
            setTimeout(() => {
              container.scrollTo({ left: 0, behavior: "auto" });
            }, 50);
            return 0;
          }

          container.scrollTo({
            left: scrollPosition,
            behavior: "smooth",
          });

          return newIndex;
        });
      }
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, [clients.length]);

  return (
    <section
      className={`py-32 px-6 md:px-12 overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
      id="clients"
      ref={containerRef}
    >
      {/* Floating geometric elements */}
      <motion.div
        className="absolute top-32 right-20 w-2 h-2 bg-[#4ecca3] rounded-full opacity-30"
        style={{ y: titleY }}
      />
      <motion.div
        className="absolute bottom-40 left-10 w-1 h-16 bg-gradient-to-t from-[#4ecca3]/20 to-transparent"
        style={{ y: useTransform(scrollYProgress, [0, 1], [30, -80]) }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          ref={headerRef}
          style={{ y: titleY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className={`inline-flex items-center px-4 py-2 backdrop-blur-md rounded-full mb-8 transition-colors duration-300 ${
                isDarkMode
                  ? "bg-black/40 border border-white/10"
                  : "bg-white/40 border border-gray-200/20"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                headerInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-[#4ecca3] text-sm font-medium tracking-wide">
                Nuestros Clientes
              </span>
            </motion.div>

            <h2
              className={`text-5xl md:text-6xl lg:text-7xl font-serif leading-tight tracking-tight mb-6 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              <span className="font-light">Our</span>{" "}
              <span className="font-light text-[#4ecca3] italic">Clients</span>
            </h2>

            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#4ecca3] to-transparent mx-auto mb-8" />

            <p
              className={`text-lg leading-relaxed max-w-2xl mx-auto font-sans-serif transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Marcas que confían en nuestra experiencia para alcanzar resultados
              extraordinarios
            </p>
          </motion.div>
        </motion.div>

        {/* Carousel Section */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Carousel Container */}
          <div className="relative overflow-hidden">
            {/* Gradient Masks */}
            <div
              className={`absolute left-0 top-0 w-20 h-full z-10 transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gradient-to-r from-black to-transparent"
                  : "bg-gradient-to-r from-white to-transparent"
              }`}
            />
            <div
              className={`absolute right-0 top-0 w-20 h-full z-10 transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gradient-to-l from-black to-transparent"
                  : "bg-gradient-to-l from-white to-transparent"
              }`}
            />

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitScrollbar: { display: "none" },
              }}
            >
              {duplicatedClients.map((client, index) => (
                <motion.div
                  key={`${client.id}-${Math.floor(index / clients.length)}`}
                  className="flex-shrink-0 w-80 h-96 group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`relative h-full backdrop-blur-sm rounded-3xl transition-all duration-500 overflow-hidden ${
                      isDarkMode
                        ? "bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 hover:border-white/20"
                        : "bg-gradient-to-br from-gray-100/50 to-white/50 border border-gray-200/20 hover:border-gray-300/40"
                    }`}
                  >
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4ecca3]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content Container */}
                    <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
                      {/* Placeholder for client logo */}
                      <div className="w-64 h-64 bg-gradient-to-br from-[#4ecca3]/20 to-[#4ecca3]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <div className="text-4xl font-light text-[#4ecca3]">
                          {client.name.split(" ")[1]}
                        </div>
                      </div>

                      {/* Client Name */}
                      <h3
                        className={`text-xl font-medium mb-4 text-center transition-colors duration-300 ${
                          isDarkMode ? "text-white" : "text-black"
                        }`}
                      >
                        {client.name}
                      </h3>

                      {/* Bottom accent */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#4ecca3]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {clients.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex % clients.length
                    ? "bg-[#4ecca3] scale-125"
                    : `${
                        isDarkMode
                          ? "bg-gray-600 hover:bg-gray-500"
                          : "bg-gray-400 hover:bg-gray-500"
                      }`
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { number: "50+", label: "Clientes Activos" },
            { number: "200%", label: "ROI Promedio" },
            { number: "24/7", label: "Soporte Dedicado" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-light text-[#4ecca3] mb-2">
                {stat.number}
              </div>
              <div
                className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
