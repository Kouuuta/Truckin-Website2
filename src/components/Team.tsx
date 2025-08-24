import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "María García",
    role: "CEO & Founder",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Carlos Rodriguez",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Ana Martinez",
    role: "Performance Manager",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Diego Silva",
    role: "Data Analyst",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Sofia Herrera",
    role: "Strategy Lead",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
  },
];

const Team = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { scrollYProgress } = useScroll();
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Manual navigation
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const currentMember = teamMembers[currentIndex];

  return (
    <section className="min-h-screen py-20 px-6 md:px-12 bg-black relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4ecca3]/5 to-transparent" />

      <div className="container mx-auto max-w-7xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-[#4ecca3] text-sm font-medium tracking-wide">
              Nuestro Equipo
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl text-white leading-tight tracking-tight mb-6">
            <span className="font-normal">Our </span>
            <span className="font-normal text-[#4ecca3] italic">
              Leadership Team
            </span>
          </h2>

          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#4ecca3] to-transparent mx-auto mb-8" />

          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Conoce a los expertos que impulsan el crecimiento de tu negocio
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Polaroid Carousel Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            {/* Polaroid Stack Background */}
            <div className="relative">
              {/* Background polaroids for stack effect */}
              <div className="absolute -rotate-6 scale-95 opacity-40">
                <div className="w-80 h-96 rounded-2xl shadow-2xl p-2 bg-[#4ecca3]">
                  <div className="w-full h-full bg-white rounded-xl p-4">
                    <div className="w-full h-60 bg-gray-200 rounded-xl mb-4" />
                    <div className="h-6 bg-gray-100 rounded" />
                  </div>
                </div>
              </div>

              <div className="absolute rotate-3 scale-90 opacity-60">
                <div className="w-80 h-96 rounded-2xl shadow-2xl p-2 bg-[#4ecca3]">
                  <div className="w-full h-full bg-white rounded-xl p-4">
                    <div className="w-full h-60 bg-gray-200 rounded-xl mb-4" />
                    <div className="h-6 bg-gray-100 rounded" />
                  </div>
                </div>
              </div>

              {/* Main Polaroid - Clickable */}
              <motion.button
                key={currentMember.id}
                initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
                animate={{ opacity: 1, rotate: 2, scale: 1 }}
                exit={{ opacity: 0, rotate: 5, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 cursor-pointer focus:outline-none"
                onClick={nextSlide}
                type="button"
              >
                <div className="w-80 h-96 rounded-2xl shadow-2xl p-2 bg-[#4ecca3] hover:shadow-3xl transition-all duration-300 hover:bg-[#3db892] border-2 border-[#4ecca3]">
                  <div className="w-full h-full bg-white rounded-xl p-4">
                    <div className="w-full h-60 rounded-xl overflow-hidden mb-4">
                      <img
                        src={currentMember.image}
                        alt={currentMember.name}
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    </div>

                    {/* Name and Role */}
                    <motion.div
                      key={`${currentMember.id}-text`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="text-center pointer-events-none"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {currentMember.name}
                      </h3>
                      <p className="text-gray-600 text-sm font-medium">
                        {currentMember.role}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.button>
            </div>

            {/* Carousel Navigation */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-[#4ecca3] w-8"
                      : "bg-gray-400 hover:bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div className="space-y-8" style={{ y: textY }}>
            {/* Team Introduction Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#4ecca3]/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50" />

              <div className="mt-24 relative bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
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
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Líderes en Performance Marketing
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Nuestro equipo combina años de experiencia en marketing
                    digital, análisis de datos y estrategia comercial. Cada
                    miembro aporta una perspectiva única que nos permite crear
                    campañas que no solo generan tráfico, sino que maximizan tu
                    retorno de inversión.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#4ecca3] rounded-full" />
                      <span className="text-gray-300">
                        +50 campañas exitosas ejecutadas
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#4ecca3] rounded-full" />
                      <span className="text-gray-300">
                        Especialistas certificados en múltiples plataformas
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#4ecca3] rounded-full" />
                      <span className="text-gray-300">
                        Enfoque data-driven en cada decisión
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Team;
