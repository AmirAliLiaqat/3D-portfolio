/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { github, glob } from "../assets";
// import { projects } from "../constants"; // Removed
import { usePortfolio } from "../context/PortfolioContext";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import {
  CardContainer,
  Container,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from "./styled/Project";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  source_link,
}) => {
  return (
    <div key={`project-${index}`}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt="project_image"
            className="w-full h-full object-cover rounded-2xl"
          />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient mx-1 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <img
                src={github}
                alt="source code"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
            <div
              onClick={() => window.open(source_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <img
                src={glob}
                alt="source link"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </div>
  );
};

const Projects = () => {
  const { projects } = usePortfolio();
  const [toggle, setToggle] = useState("all");
  const [visibleItems, setVisibleItems] = useState(6);

  const filteredProjects =
    toggle === "all"
      ? projects
      : projects.filter((item) => item.category === toggle);

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 3);
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Projects</p>
        <h2 className={styles.sectionHeadText}>Projects</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Following projects showcases my skills and experience through real-world
        examples of my work. Each project is briefly described with links to
        code repositories and live demos in it. It reflects my ability to solve
        complex problems, work with different technologies, and manage projects
        effectively.
      </motion.p>

      <Container>
        <ToggleButtonGroup>
          {[
            { value: "all", label: "All" },
            { value: "wordpress", label: "WordPress" },
            { value: "mern", label: "MERN Stack" },
          ].map((option, index) => (
            <React.Fragment key={option.value}>
              {index > 0 && <Divider />}
              <ToggleButton
                active={toggle === option.value}
                value={option.value}
                onClick={() => {
                  setToggle(option.value);
                  setVisibleItems(6); // Reset visible items when changing category
                }}
              >
                {option.label}
              </ToggleButton>
            </React.Fragment>
          ))}
        </ToggleButtonGroup>
      </Container>

      <div className="mt-10 flex flex-wrap gap-7">
        <CardContainer>
          {filteredProjects.slice(0, visibleItems).map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </CardContainer>
      </div>

      {visibleItems < filteredProjects.length && (
        <div className="mt-10 flex justify-center">
          <motion.button
            variants={fadeIn("", "", 0.1, 1)}
            onClick={handleShowMore}
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            Show More
          </motion.button>
        </div>
      )}
    </>
  );
};

export default SectionWrapper(Projects, "project");
