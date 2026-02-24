import React from "react";
import { Tilt } from "react-tilt";
import { github, glob } from "../assets";
import { Link } from "react-router-dom";

const ProjectCard = ({
  index,
  id,
  name,
  description,
  tags,
  image,
  source_code_link,
  source_link,
}) => {
  return (
    <div>
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
          <Link to={`/project/${id || index}`}>
            <h3 className="text-white font-bold text-[24px] cursor-pointer hover:text-[#915eff] transition-colors">
              {name}
            </h3>
          </Link>
          <p className="mt-2 text-secondary text-[14px] line-clamp-3">
            {description}
          </p>
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

        <div className="mt-4">
          <Link
            to={`/project/${id || index}`}
            className="text-white text-[12px] font-semibold bg-[#915eff] py-2 px-4 rounded-lg hover:bg-[#804dee] transition-all"
          >
            View Details
          </Link>
        </div>
      </Tilt>
    </div>
  );
};

export default ProjectCard;
