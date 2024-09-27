/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services, socialLinks } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
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
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className="text-whtie text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.div variants={textVariant()} className="flex gap-2">
        {socialLinks.map((socialLink, index) => (
          <a
            href={socialLink.link}
            key={index}
            className="w-15 h-15 cursor-pointer me-2"
          >
            <i className={`${socialLink.icon} fa-2x`}></i>
          </a>
        ))}
      </motion.div>

      <motion.div className="mt-4 text-secondary text-[17px] max-w-5xl leading-[30px]">
        <h1 className={styles.sectionSubText}>🛠️ My expertise lies in:</h1>
        <ul className="mt-3">
          <li>✅ Proficient in HTML/CSS for clean, responsive designs.</li>
          <li>
            ✅ Skilled in Bootstrap for mobile-first, visually appealing
            layouts.
          </li>
          <li>✅ JavaScript & TypeScript for dynamic, scalable apps.</li>
          <li>✅ React.js & Next.js for fast, interactive web applications.</li>
          <li>
            ✅ WordPress: Custom themes with custom post types, widgets, and
            more.
          </li>
          <li>✅ PHP & MySQL for robust WordPress solutions.</li>
          <li>✅ Node.js, Express.js, and MongoDB for backend development.</li>
        </ul>
      </motion.div>

      <div className="mt-20 flex flex-wrap justify-center gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
