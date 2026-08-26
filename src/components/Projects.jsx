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
  const [showAll, setShowAll] = useState(false);

  const initialVisibleCount = 6;

  const filteredProjects = projects.filter((item) => {
    if (toggle === "all") return true;
    const cat = (item.category || "").toLowerCase();
    if (toggle === "wordpress") return cat.includes("wordpress");
    if (toggle === "mern") return cat.includes("mern") || cat.includes("fullstack");
    if (toggle === "mobile") return cat.includes("mobile") || cat.includes("app") || cat.includes("frontend");
    return cat === toggle.toLowerCase();
  });

  const categories = [
    { value: "all", label: "All" },
    { value: "wordpress", label: "WordPress" },
    { value: "mern", label: "MERN Stack" },
    { value: "mobile", label: "App / Mobile" },
  ];

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, initialVisibleCount);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Projects ({projects.length} Total)</p>
        <h2 className={styles.sectionHeadText}>Projects</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Following projects showcase my skills and experience through real-world
        examples of my work. Each project is briefly described with links to
        code repositories and live demos.
      </motion.p>

      {/* Categories Filter */}
      <div className="mt-10 mb-12 flex flex-wrap justify-center items-center gap-3 sm:gap-4">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => {
              setToggle(category.value);
            }}
            className={`px-5 py-2 rounded-xl border-2 transition-all duration-300 font-semibold text-sm sm:text-base ${
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
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project._id || project.id || `project-${index}`} index={index} {...project} />
          ))}
        </CardContainer>
      </div>

      <div className="mt-12 flex flex-wrap justify-center items-center gap-4">
        {filteredProjects.length > initialVisibleCount && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-tertiary border-2 border-[#915eff] py-3 px-8 rounded-xl outline-none text-white font-bold shadow-md hover:bg-[#915eff] transition-all"
          >
            {showAll ? "Show Less" : `Show All ${filteredProjects.length} Projects`}
          </button>
        )}

        <Link to="/projects">
          <motion.button
            variants={fadeIn("", "", 0.1, 1)}
            className="bg-[#915eff] py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-[#7a48e3] transition-all"
          >
            Full Portfolio Page
          </motion.button>
        </Link>
      </div>
    </>
  );
};

export default SectionWrapper(Projects, "project");
