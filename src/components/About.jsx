/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-unescaped-entities */
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
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

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-5xl leading-[30px]"
      >
        I'm a dedicated front-end developer passionate about crafting
        exceptional web experiences. With a solid foundation of 2 years in web
        development, I have honed my skills across various technologies to
        create dynamic and user-friendly interfaces.
      </motion.p>

      <motion.div className="mt-4 text-secondary text-[17px] max-w-5xl leading-[30px]">
        <h1 className={styles.sectionSubText}>🛠️ My expertise lies in:</h1>
        <ul className="mt-3">
          <li>
            ✅ HTML/CSS: My strong foundation in HTML and CSS ensures that the
            visual aspects of my projects are top-notch, delivering appealing
            designs and layouts.
          </li>
          <li>
            ✅ Bootstrap: I'm experienced in harnessing the potential of
            Bootstrap to create visually appealing, mobile-first, and responsive
            websites that look great across devices.
          </li>
          <li>
            ✅ JavaScript: With a strong command of JavaScript, I build dynamic
            and feature-rich web applications, enhancing user engagement and
            functionality.
          </li>
          <li>
            ✅ TypeScript: My proficiency in TypeScript enables me to write
            clean, maintainable, and error-free code, contributing to robust and
            scalable projects.
          </li>
          <li>
            ✅ React.js: Leveraging the power of React, I excel at building
            responsive and interactive web applications that offer seamless user
            interactions and enhanced performance.
          </li>
          <li>
            ✅ Next.js: I leverage Next.js to build server-side rendered React
            applications, ensuring optimal performance and SEO benefits for
            modern web applications.
          </li>
          <li>
            ✅ WordPress: Having worked extensively with WordPress, I understand
            the intricacies of creating customizable and feature-rich websites,
            empowering clients with easy content management.
          </li>
        </ul>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-5xl leading-[30px]"
      >
        🚀 Currently, I am an integral part of a dynamic team contributing my
        skills to develop cutting-edge web applications. My role involves
        working with React.js, TypeScript, JavaScript, and Next.js, as well as
        backend technologies to build robust, high-performance solutions
        catering to modern user expectations.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
