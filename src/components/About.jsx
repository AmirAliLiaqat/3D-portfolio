/* eslint-disable react-refresh/only-export-components */
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { usePortfolio } from "../context/PortfolioContext";
import { textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { Img } from "./styled";
import { profilePic } from "../assets";

const About = () => {
  const { details, socialLinks } = usePortfolio();
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center w-full">
        <div className="left-column">
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>Introduction</p>
            <h2 className={styles.sectionHeadText}>Overview.</h2>
          </motion.div>

          <motion.div variants={textVariant()} className="flex gap-2">
            {socialLinks.map((socialLink, index) => (
              <motion.a
                href={socialLink.link}
                key={index}
                target="_blank"
                rel="noreferrer"
                className="w-15 h-15 cursor-pointer me-2 transition-all duration-300 hover:text-[#915EFF]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={`${socialLink.icon} fa-2x`}></i>
              </motion.a>
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
              <li>
                ✅ React.js & Next.js for fast, interactive web applications.
              </li>
              <li>
                ✅ WordPress: Custom themes with custom post types, widgets, and
                more.
              </li>
              <li>✅ PHP & MySQL for robust WordPress solutions.</li>
              <li>
                ✅ Node.js, Express.js, and MongoDB for backend development.
              </li>
            </ul>
          </motion.div>

          <motion.div>
            <a
              href="https://drive.google.com/file/d/1DbTAm4LucVcbPvsDsaBpq2whymNxCWEC/view?usp=sharing"
              target="_blank"
              className="inline-block"
            >
              <motion.button
                className="mt-4 bg-[#915EFF] text-white py-2 px-4 rounded transition-all duration-300 hover:bg-[#7a4fd9] hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Resume
              </motion.button>
            </a>
          </motion.div>
        </div>

        <div className="right-column">
          <Tilt
            options={{
              max: 45,
              scale: 1,
              speed: 450,
            }}
          >
            <Img
              src={details.profileImage || profilePic}
              alt={details.name || "amir-ali-liaqat"}
              style={{ width: "500px", height: "400px", marginTop: "50px" }}
            />
          </Tilt>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
