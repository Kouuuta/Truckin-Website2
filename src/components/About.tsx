import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import AnimatedText from "./AnimatedText";
const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });
  return (
    <section className="py-24 px-6 md:px-12 bg-black" id="about">
      <div className="container mx-auto max-w-5xl" ref={ref}>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="md:w-1/2"
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={
              inView
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : {
                    opacity: 0,
                    x: -50,
                  }
            }
            transition={{
              duration: 0.7,
            }}
          >
            <div className="relative">
              <motion.div />
              <img
                src="/bigc_logo.png"
                alt="Yuta Koike"
                className="rounded-lg w-full h-auto relative z-10"
              />
            </div>
          </motion.div>
          <div className="md:w-1/2">
            <motion.span
              className="text-[#4ecca3] font-medium"
              initial={{
                opacity: 0,
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 0,
                    }
              }
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
            >
              About Me
            </motion.span>
            <AnimatedText
              text="Passionate Developer & Designer"
              className="text-3xl md:text-4xl font-bold mt-2 mb-6"
              once={false}
            />
            <motion.p
              className="text-gray-300 mb-6"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      y: 20,
                    }
              }
              transition={{
                duration: 0.7,
                delay: 0.3,
              }}
            >
              I'm a creative developer with a passion for building beautiful,
              functional, and user-friendly websites and applications. With
              expertise in both design and development, I bridge the gap between
              aesthetics and functionality.
            </motion.p>
            <motion.p
              className="text-gray-300 mb-8"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      y: 20,
                    }
              }
              transition={{
                duration: 0.7,
                delay: 0.4,
              }}
            >
              My approach combines technical excellence with creative
              problem-solving, resulting in digital solutions that not only work
              flawlessly but also engage and delight users.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
