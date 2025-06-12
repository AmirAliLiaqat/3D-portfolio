/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { education } from "../constants";
import { textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

import "react-vertical-timeline-component/style.min.css";

const EducationCard = ({ education }) => (
  <VerticalTimelineElement
    contentStyle={{ backgroundColor: "#1d1836", color: "#fff" }}
    contentArrowStyle={{ borderRight: "7px solid #232631" }}
    date={education.date}
    iconStyle={{ background: education.iconBg }}
  >
    <div>
      <h3 className="text-white text-[24px] font-bold">{education.degree}</h3>
      <p
        className="text-secondary text-[16px] font-semibold"
        style={{ margin: 0 }}
      >
        {education.school}
      </p>
      <p className="text-secondary text-[16px] font-semibold">
        Grade: {education.grade}
      </p>
    </div>

    <div>
      <p className="text-white text-[16px] font-semibold mt-5">
        {education.desc}
      </p>
    </div>
  </VerticalTimelineElement>
);

const Education = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What i have done so far</p>
        <h2 className={styles.sectionHeadText}>Education</h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {education.map((education, index) => (
            <EducationCard key={index} education={education} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Education, "education");
