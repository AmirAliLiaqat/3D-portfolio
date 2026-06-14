import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { usePortfolio } from "../context/PortfolioContext";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { CardContainer } from "./styled/Project";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { projects } = usePortfolio();
  const [toggle, setToggle] = useState("all");
  const visibleItems = 6;

  const filteredProjects =
    toggle === "all"
      ? projects
      : projects.filter((item) => item.category === toggle);

  const categories = [
    { value: "all", label: "All" },
    { value: "wordpress", label: "WordPress" },
    { value: "mern", label: "MERN Stack" },
    { value: "app", label: "App Development" },
  ];

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

      {/* Categories Filter */}
      <div className="mt-10 mb-12 flex flex-wrap justify-center items-center gap-4">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setToggle(category.value)}
            className={`px-6 py-2 rounded-xl border-2 transition-all duration-300 font-semibold ${
              toggle === category.value
                ? "bg-[#915eff] border-[#915eff] text-white shadow-lg shadow-primary"
                : "border-[#915eff] text-secondary hover:bg-[#915eff20]"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-7">
        <CardContainer>
          {filteredProjects.slice(0, visibleItems).map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </CardContainer>
      </div>

      <div className="mt-10 flex justify-center">
        <Link to="/projects">
          <motion.button
            variants={fadeIn("", "", 0.1, 1)}
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-[#915eff] transition-all"
          >
            View All Projects
          </motion.button>
        </Link>
      </div>
    </>
  );
};

export default SectionWrapper(Projects, "project");
