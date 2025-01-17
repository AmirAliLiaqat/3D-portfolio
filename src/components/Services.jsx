/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/no-unknown-property */
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { services } from "../constants";
import { fadeIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const Services = () => {
  return (
    <div className="flex flex-wrap justify-center gap-10">
      {services.map((service, index) => (
        <Tilt className="sm:w-[250px] w-full" key={index}>
          <motion.div
            variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
            className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
          >
            <div
              options={{
                max: 45,
                scale: 1,
                speed: 450,
              }}
              className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
            >
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
        </Tilt>
      ))}
    </div>
  );
};

export default SectionWrapper(Services, "services");
