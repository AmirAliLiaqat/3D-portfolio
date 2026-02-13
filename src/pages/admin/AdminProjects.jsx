/* eslint-disable react/prop-types */
import { styles } from "../../styles";
import { usePortfolio } from "../../context/PortfolioContext";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import { Link } from "react-router-dom";

const AdminProjectCard = ({ index, project, onDelete }) => {
  const { name, description, tags, image } = project;

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full relative"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover gap-2">
            <Link
              to={`/admin/projects/edit/${index}`}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <i className="fa fa-pencil text-white text-[20px]" />
            </Link>
            <div
              onClick={() => onDelete(index)}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-red-600"
            >
              <i className="fa fa-trash text-white text-[20px]" />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">
            {description.substring(0, 100)}...
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const AdminProjects = () => {
  const { projects, deleteProject } = usePortfolio();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className={styles.sectionHeadText}>Manage Projects</h2>
        <Link
          to="/admin/projects/add"
          className="bg-tertiary py-3 px-8 rounded-xl outline-none text-white font-bold shadow-md shadow-primary hover:bg-tertiary/80 transition-colors"
        >
          + Add Project
        </Link>
      </div>

      <div className="mt-10 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <AdminProjectCard
            key={`project-${index}`}
            index={index}
            project={project}
            onDelete={deleteProject}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;
