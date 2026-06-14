import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { usePortfolio } from "../context/PortfolioContext";
import { fadeIn, textVariant } from "../utils/motion";
import ProjectCard from "../components/ProjectCard";

const AllProjects = () => {
  const { projects } = usePortfolio();
  const [toggle, setToggle] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects =
    toggle === "all"
      ? projects
      : projects.filter((item) => item.category === toggle);

  const categories = [
    { value: "all", label: "All" },
    { value: "wordpress", label: "WordPress" },
    { value: "mern", label: "MERN Stack" },
    { value: "app", label: "App Development" }
  ];

  return (
    <div className="bg-primary min-h-screen py-24 px-5 sm:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Portfolio Showcase</p>
          <h2 className={styles.sectionHeadText}>All Projects</h2>
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Browse through my entire collection of projects. From web applications to UI/UX designs,
          each project represents a unique challenge and a specialized solution.
        </motion.p>

        {/* Categories Filter */}
        <div className="mt-10 mb-12 flex flex-wrap justify-center items-center gap-4">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setToggle(category.value)}
              className={`px-6 py-2 rounded-xl border-2 transition-all duration-300 font-semibold ${toggle === category.value
                  ? "bg-[#915eff] border-[#915eff] text-white shadow-lg shadow-primary"
                  : "border-[#915eff] text-secondary hover:bg-[#915eff20]"
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-7 justify-center">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id || `project-${index}`} index={index} {...project} />
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <button
            onClick={() => window.history.back()}
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-[#915eff] transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
