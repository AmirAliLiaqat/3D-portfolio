import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePortfolio } from "../context/PortfolioContext";
import { styles } from "../styles";
import { github, glob } from "../assets";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectDetails = () => {
  const { id } = useParams();
  const { projects } = usePortfolio();

  // Find project by id or index
  const project = projects.find((p, index) => (p.id === id || index.toString() === id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="bg-primary min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-white text-3xl font-bold">Project not found</h2>
        <Link to="/" className="mt-5 text-[#915eff] hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-primary min-h-screen py-20 px-5 sm:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>{project.category.toUpperCase()}</p>
          <h2 className={styles.sectionHeadText}>{project.name}</h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            variants={fadeIn("right", "spring", 0.5, 0.75)}
            className="relative w-full h-[300px] sm:h-[450px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-5 right-5 flex gap-3">
              <div
                onClick={() => window.open(project.source_code_link, "_blank")}
                className="black-gradient w-12 h-12 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-all shadow-lg"
              >
                <img src={github} alt="github" className="w-1/2 h-1/2 object-contain" />
              </div>
              <div
                onClick={() => window.open(project.source_link, "_blank")}
                className="black-gradient w-12 h-12 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-all shadow-lg"
              >
                <img src={glob} alt="live" className="w-1/2 h-1/2 object-contain" />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn("left", "spring", 0.5, 0.75)}
            className="flex flex-col"
          >
            <h3 className="text-white text-2xl font-bold mb-4">Project Overview</h3>
            <p className="text-secondary text-lg leading-relaxed mb-8">
              {project.description}
            </p>

            <h3 className="text-white text-xl font-bold mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-3 mb-10">
              {project.tags.map((tag) => (
                <span
                  key={tag.name}
                  className={`px-4 py-2 rounded-full text-sm font-medium bg-tertiary border border-[#ffffff10] ${tag.color}`}
                >
                  #{tag.name}
                </span>
              ))}
            </div>

            <div className="mt-auto flex gap-5">
              <button
                onClick={() => window.open(project.source_link, "_blank")}
                className="flex-1 bg-[#915eff] py-4 rounded-xl text-white font-bold text-center hover:bg-[#804dee] transition-all shadow-lg shadow-primary"
              >
                Live Demo
              </button>
              <button
                onClick={() => window.open(project.source_code_link, "_blank")}
                className="flex-1 bg-tertiary py-4 rounded-xl text-white font-bold text-center hover:bg-[#2c3046] transition-all border border-[#ffffff10]"
              >
                Github Repo
              </button>
            </div>
          </motion.div>
        </div>

        <div className="mt-20">
          <Link to="/" className="text-secondary hover:text-white flex items-center gap-2 transition-colors">
            <span>←</span> Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
