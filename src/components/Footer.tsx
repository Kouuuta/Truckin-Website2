import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const Footer = () => {
  const { isDarkMode } = useTheme();

  // Smooth scroll function
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <footer
      className={`relative py-16 px-6 md:px-12 border-t transition-all duration-300 ${
        isDarkMode
          ? "bg-black border-white/10"
          : "bg-stone-100 border-stone-300/20"
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Company Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src="/bigc_logo.png"
                  alt="BIG C Truckin Services"
                  className="w-full h-full object-contain filter brightness-110"
                />
              </div>
              <div>
                <h3
                  className={`text-xl font-semibold transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  BIG C
                </h3>
                <p
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Truckin Services
                </p>
              </div>
            </motion.div>

            {/* Company Description */}
            <p
              className={`text-sm leading-relaxed max-w-md transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Delivering excellence in transportation and logistics solutions.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h4
              className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Navigation
            </h4>
            <nav className="space-y-3">
              {[
                { name: "Home", href: "#home" },
                { name: "About Us", href: "#about" },
                { name: "Clients", href: "#clients" },
                { name: "Team", href: "#team" },
                { name: "Contacts", href: "#contact" },
              ].map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`block text-sm transition-all duration-300 hover:text-[#4ecca3] hover:translate-x-1 text-left ${
                    isDarkMode
                      ? "text-gray-400 hover:text-[#4ecca3]"
                      : "text-gray-600 hover:text-[#4ecca3]"
                  }`}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.name}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="space-y-6">
            <h4
              className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Connect
            </h4>

            {/* Email */}
            <div className="space-y-3">
              <a
                href="mailto:hello@bigctruckin.com"
                className={`block text-sm transition-all duration-300 hover:text-[#4ecca3] ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                hello@bigctruckin.com
              </a>

              {/* Social Links */}
              <div className="flex space-x-4 pt-2">
                {[
                  {
                    name: "Instagram",
                    href: "https://instagram.com/bigctruckin",
                    icon: "IG",
                  },
                  {
                    name: "Facebook",
                    href: "https://facebook.com/bigctruckin",
                    icon: "FB",
                  },
                  {
                    name: "LinkedIn",
                    href: "https://linkedin.com/company/bigctruckin",
                    icon: "LI",
                  },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                      isDarkMode
                        ? "bg-white/10 text-gray-400 hover:bg-[#4ecca3] hover:text-black"
                        : "bg-black/10 text-gray-600 hover:bg-[#4ecca3] hover:text-black"
                    }`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 transition-colors duration-300 ${
            isDarkMode ? "border-white/10" : "border-stone-300/30"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p
              className={`text-sm transition-colors duration-300 ${
                isDarkMode ? "text-gray-500" : "text-gray-500"
              }`}
            >
              © 2025 BIG C Truckin Services. All rights reserved.
            </p>
          </div>
        </div>

        {/* Subtle decoration */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-[#4ecca3]/50 to-transparent" />
      </div>
    </footer>
  );
};

export default Footer;
