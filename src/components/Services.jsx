/* eslint-disable react-refresh/only-export-components */
import { motion } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";
import { fadeIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const Services = () => {
  const { services } = usePortfolio();
  return (
    <div className="flex flex-wrap justify-center gap-10">
      {services.map((service, index) => (
        <motion.div
          key={index}
          variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
          className="w-full md:w-[45%] lg:w-[22%] green-pink-gradient p-[1px] rounded-[20px] shadow-card"
        >
          <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
            <img
              src={service.icon}
              alt={service.title}
              className="w-16 h-16 object-contain"
            />
            <h3 className="text-white text-[20px] font-bold text-center">
              {service.title}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SectionWrapper(Services, "services");
