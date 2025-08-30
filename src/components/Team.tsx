import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "../contexts/ThemeContext";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Crispulo B. Garcia",
    role: "General Manager",
    image: "",
    bio: "Oversees the entire business operations, sets strategic goals, and ensures all departments align with company objectives.",
  },
  {
    id: 2,
    name: "Priscilla C. Garcia",
    role: "Operations Manager",
    image: "",
    bio: "Focuses on supervising staff and operational processes, ensuring productivity and compliance with company standards.",
  },
  {
    id: 3,
    name: "Kriszandra Garcia",
    role: "Operations Manager",
    image: "",
    bio: "Manages day-to-day business activities, optimizing resources and workflows to maintain efficiency.",
  },
  {
    id: 4,
    name: "Jhean Irinco",
    role: "Operations Assistant",
    image: "",
    bio: "Provides administrative and logistical support to operations managers, helping coordinate schedules, reports, and documentation.",
  },
  {
    id: 5,
    name: "Jerome Geranta",
    role: "Hauling Coordinator",
    image: "",
    bio: "Organizes and monitors hauling schedules, dispatching trucks and ensuring timely transport of goods.",
  },
  {
    id: 6,
    name: "Agusto Asuncion",
    role: "Route Coordinator",
    image: "",
    bio: "Plans and manages delivery or transport routes, optimizing time, fuel, and efficiency for drivers.",
  },
];

const Team = () => {
  const { isDarkMode } = useTheme();
  const [selectedMember, setSelectedMember] = useState(teamMembers[0]);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms
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

  // Auto-advance team members
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedMember((prev) => {
        const currentIndex = teamMembers.findIndex(
          (member) => member.id === prev.id
        );
        const nextIndex = (currentIndex + 1) % teamMembers.length;
        return teamMembers[nextIndex];
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={`relative py-32 px-6 md:px-12 overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
      id="team"
      ref={containerRef}
    >
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
              Meet our leadership
            </motion.span>

            <h2
              className={`text-5xl md:text-6xl lg:text-7xl font-serif leading-tight tracking-tight mb-6 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              <span className="font-light">Our </span>
              <span className="font-light text-[#4ecca3] italic">
                Leadership Team
              </span>
            </h2>

            <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#4ecca3] to-transparent mx-auto mb-8" />

            <p
              className={`text-lg leading-relaxed max-w-2xl mx-auto font-sans-serif transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Experienced professionals dedicated to excellence in logistics and
              transportation
            </p>
          </motion.div>
        </motion.div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
          ref={ref}
        >
          <motion.div
            className="relative"
            style={{ y: textY }}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
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

            <div
              className={`relative backdrop-blur-sm rounded-3xl p-8 transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/5"
                  : "bg-gradient-to-br from-gray-100/50 to-white/50 border border-gray-200/20"
              }`}
            >
              <motion.div
                key={selectedMember.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <div className="aspect-square w-full max-w-sm mx-auto rounded-2xl overflow-hidden mb-6 shadow-xl">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>

                <div className="text-center">
                  <h3
                    className={`text-2xl font-medium mb-2 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {selectedMember.name}
                  </h3>
                  <p className="text-[#4ecca3] text-lg font-medium mb-4">
                    {selectedMember.role}
                  </p>
                  <p
                    className={`text-sm leading-relaxed transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {selectedMember.bio}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div className="space-y-8" style={{ y: textY }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#4ecca3]/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50" />

              <div
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
                  <h3
                    className={`text-xl font-medium mb-6 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Leadership Team
                  </h3>

                  <div className="space-y-3">
                    {teamMembers.map((member) => (
                      <motion.button
                        key={member.id}
                        onClick={() => setSelectedMember(member)}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                          selectedMember.id === member.id
                            ? `${
                                isDarkMode
                                  ? "bg-[#4ecca3]/20 border border-[#4ecca3]/30"
                                  : "bg-[#4ecca3]/10 border border-[#4ecca3]/20"
                              }`
                            : `${
                                isDarkMode
                                  ? "hover:bg-white/5 border border-transparent hover:border-white/10"
                                  : "hover:bg-gray-100/50 border border-transparent hover:border-gray-200/30"
                              }`
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4
                              className={`font-medium truncate transition-colors duration-300 ${
                                selectedMember.id === member.id
                                  ? "text-[#4ecca3]"
                                  : isDarkMode
                                  ? "text-white"
                                  : "text-black"
                              }`}
                            >
                              {member.name}
                            </h4>
                            <p
                              className={`text-sm truncate transition-colors duration-300 ${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {member.role}
                            </p>
                          </div>
                          <div
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              selectedMember.id === member.id
                                ? "bg-[#4ecca3] shadow-lg shadow-[#4ecca3]/50"
                                : isDarkMode
                                ? "bg-gray-600"
                                : "bg-gray-400"
                            }`}
                          />
                        </div>
                      </motion.button>
                    ))}
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
