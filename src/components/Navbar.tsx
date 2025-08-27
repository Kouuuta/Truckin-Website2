import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScroll, setLastScroll] = useState(0);
  const [menu, setMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<any>(null);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      if (Math.abs(currentScroll - lastScroll) > 10) {
        if (currentScroll > lastScroll && currentScroll > 1000) {
          setScrollDirection("down");
        } else {
          setScrollDirection("up");
        }
        setLastScroll(currentScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  // Robust scroll that accounts for a fixed header
  const scrollToSection = (href: string) => {
    try {
      const element = document.querySelector(href) as HTMLElement | null;
      if (!element) return;

      // compute header height dynamically so offset stays correct across breakpoints
      const headerEl = document.querySelector("header") as HTMLElement | null;
      const headerOffset = headerEl ? headerEl.clientHeight + 8 : 80;

      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } catch (err) {
      // fail silently in production; useful to log in dev
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn("scrollToSection error:", err);
      }
    }
  };

  // Mobile handler: close menu first (so overlay is removed), then scroll after exit animation
  const handleMobileNavClick = (href: string) => {
    // close mobile menu first
    setMenu(false);

    // Delay must be >= exit animation duration used in the mobile menu (0.3s). Add a small buffer.
    const waitMs = 320;
    setTimeout(() => {
      scrollToSection(href);
    }, waitMs);
  };

  const navItems = [
    { title: "Home", href: "#home" },
    { title: "About Us", href: "#about" },
    { title: "Clients", href: "#clients" },
    { title: "Team", href: "#team" },
    { title: "Contacts", href: "#contact" },
  ];

  return (
    <motion.header
      className={`fixed top-4 left-0 w-full z-50 transition-all duration-500 ease-out
        ${
          scrollDirection === "down" && lastScroll > 200
            ? "-translate-y-full"
            : "translate-y-0"
        }
        font-['Oldschool_Grotesk',ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,'Noto_Sans',sans-serif,'Apple_Color_Emoji','Segoe_UI_Emoji','Segoe_UI_Symbol','Noto_Color_Emoji']`}
      initial={false}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <motion.div
        className={`mx-auto transition-all duration-700 ease-out ${
          scrolled ? "max-w-4xl mt-4 px-4" : "max-w-full px-0"
        }`}
        layout
      >
        <motion.div
          className={`relative flex items-center justify-between h-16 transition-all duration-700 ease-out ${
            scrolled
              ? `${
                  isDarkMode
                    ? "bg-black/80 backdrop-blur-xl border border-white/10"
                    : "bg-white/80 backdrop-blur-xl border border-gray-200"
                } rounded-full px-6 shadow-2xl`
              : "bg-transparent px-6"
          }`}
          layout
        >
          {/* Logo */}
          <motion.div className="flex-shrink-0 z-10" layout>
            <a href="/" className="transition-colors duration-300">
              <span className="sr-only">BIG C Truckin Services Logo</span>
              <div className="w-10 h-10 flex items-center">
                <img
                  src="/bigc_logo.png"
                  alt="BIG C Truckin Services"
                  className="w-full h-full object-contain filter brightness-110 transition-all duration-300 hover:scale-105"
                />
              </div>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav className="hidden lg:flex items-center space-x-8" layout>
            {navItems.map((item, index) => (
              <div key={index} className="relative">
                <motion.button
                  onClick={() => scrollToSection(item.href)}
                  className={`relative font-medium transition-colors duration-300 hover:text-[#4ecca3] cursor-pointer ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {item.title}
                </motion.button>
              </div>
            ))}
          </motion.nav>

          {/* Right side controls */}
          <motion.div className="flex items-center space-x-3 z-10" layout>
            {/* Dark mode toggle */}
            <motion.button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`p-2 rounded-full transition-colors duration-300 ${
                isDarkMode
                  ? "text-yellow-400 hover:bg-white/10"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDarkMode ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setMenu(!menu)}
              aria-label="Toggle mobile menu"
              className={`lg:hidden p-2 rounded-full transition-colors ${
                isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  className="w-full h-0.5 bg-current rounded-full"
                  animate={{
                    rotate: menu ? 45 : 0,
                    translateY: menu ? 10 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-current rounded-full"
                  animate={{ opacity: menu ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-current rounded-full"
                  animate={{
                    rotate: menu ? -45 : 0,
                    translateY: menu ? -10 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menu && (
          <motion.div
            className="lg:hidden absolute top-full left-0 w-full mt-2 px-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div
              className={`rounded-2xl p-6 shadow-2xl ${
                scrolled
                  ? `${
                      isDarkMode
                        ? "bg-black/90 backdrop-blur-xl border border-white/10"
                        : "bg-white/90 backdrop-blur-xl border border-gray-200"
                    }`
                  : `${isDarkMode ? "bg-gray-900" : "bg-white"}`
              } transition-colors duration-300`}
            >
              <nav className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => {
                        // close menu, wait for animation, then scroll
                        handleMobileNavClick(item.href);
                      }}
                      className={`block text-xl font-medium py-2 transition-colors hover:text-[#4ecca3] cursor-pointer text-left ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {item.title}
                    </button>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="pt-4"
                >
                  <button
                    onClick={() => {
                      handleMobileNavClick("#contact");
                    }}
                    className="inline-flex items-center px-6 py-3 bg-[#4ecca3] text-black rounded-full font-semibold"
                  >
                    Get in Touch
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
                  </button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
