/* eslint-disable react-refresh/only-export-components */
import { motion } from "framer-motion";
import { styles } from "../styles";
import { usePortfolio } from "../context/PortfolioContext";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const About = () => {
  const { details } = usePortfolio();

  const expertiseItems = [
    {
      icon: "fa-solid fa-code",
      title: "Frontend Mastery",
      description:
        "Proficient in HTML/CSS, Bootstrap, React.js, Next.js, TypeScript & Tailwind CSS for creating responsive, modern interfaces.",
      color: "#915EFF",
    },
    {
      icon: "fa-solid fa-server",
      title: "Backend Development",
      description:
        "Node.js, Express.js & MongoDB for building robust, scalable server-side solutions and RESTful APIs.",
      color: "#38ef7d",
    },
    {
      icon: "fa-brands fa-wordpress",
      title: "WordPress Expert",
      description:
        "Custom themes, plugins, Elementor, WooCommerce, PHP & MySQL for powerful WordPress solutions.",
      color: "#56ccf2",
    },
    {
      icon: "fa-solid fa-mobile-screen-button",
      title: "App Development",
      description:
        "React Native for cross-platform mobile applications with native-like performance and experience.",
      color: "#fc6767",
    },
  ];

  return (
    <>
      <div id="about-section" />
      <motion.div variants={textVariant()} className="mt-4">
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>
          Overview<span className="text-[#915EFF]">.</span>
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-4xl leading-[30px]"
      >
        {details.about}
      </motion.p>

      {/* Expertise Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {expertiseItems.map((item, index) => (
          <motion.div
            key={index}
            variants={fadeIn("up", "spring", index * 0.15, 0.75)}
            className="group relative rounded-2xl p-[1px] overflow-hidden"
          >
            {/* Gradient border */}
            <div
              className="absolute inset-0 rounded-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, ${item.color}40, transparent 50%, ${item.color}20)`,
              }}
            />

            {/* Card content */}
            <div className="relative bg-tertiary rounded-2xl p-6 h-full flex flex-col transition-transform duration-300 group-hover:-translate-y-1">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${item.color}15`,
                  border: `1px solid ${item.color}30`,
                }}
              >
                <i
                  className={`${item.icon} text-xl`}
                  style={{ color: item.color }}
                />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-secondary/80 text-sm leading-relaxed flex-1">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
