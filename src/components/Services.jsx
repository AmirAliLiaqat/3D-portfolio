/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { usePortfolio } from "../context/PortfolioContext";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const ServiceCard = ({ title, icon, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 30 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      type: "spring",
      stiffness: 120,
      damping: 14,
      delay: index * 0.1,
    }}
    whileHover={{ scale: 1.07, y: -6 }}
    className="green-pink-gradient p-[1px] rounded-[20px] shadow-card cursor-pointer"
  >
    <div className="bg-tertiary rounded-[20px] py-5 px-8 min-h-[200px] flex justify-evenly items-center flex-col transition-colors duration-300">
      <img
        src={icon}
        alt={title}
        className="w-14 h-14 object-contain"
      />
      <h3 className="text-white text-[17px] font-bold text-center mt-3">
        {title}
      </h3>
    </div>
  </motion.div>
);

const Services = () => {
  const { services } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState("Services");

  const activeGroup = services.find((s) => s.category === activeCategory);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I Offer</p>
        <h2 className={styles.sectionHeadText}>Services</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px] mb-8"
      >
        I provide a wide range of development and productivity services to help
        bring your ideas to life. From pixel-perfect frontends to robust
        backends, WordPress solutions, and efficient team workflows.
      </motion.p>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {services.map((group) => (
          <button
            key={group.category}
            onClick={() => setActiveCategory(group.category)}
            className={`relative px-6 py-3 rounded-xl font-semibold text-[15px] transition-all duration-300 ${activeCategory === group.category
              ? "bg-[#915eff] text-white shadow-lg shadow-[#915eff40]"
              : "bg-tertiary text-secondary hover:text-white border border-[#ffffff10] hover:border-[#915eff60]"
              }`}
          >
            {group.category}
            <span
              className={`ml-2 text-[12px] px-2 py-0.5 rounded-full ${activeCategory === group.category
                ? "bg-white/20 text-white"
                : "bg-[#915eff20] text-[#915eff]"
                }`}
            >
              {group.items.length}
            </span>
          </button>
        ))}
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {activeGroup &&
          activeGroup.items.map((service, index) => (
            <ServiceCard
              key={`${activeCategory}-${service.title}`}
              index={index}
              {...service}
            />
          ))}
      </div>
    </>
  );
};

export default SectionWrapper(Services, "services");
