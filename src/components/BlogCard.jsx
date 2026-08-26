import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { fadeIn } from "../utils/motion";

const BlogCard = ({ index, id, title, description, image, date, author }) => {
  const authorName =
    typeof author === "object"
      ? author?.name || "Amir Ali Liaqat"
      : author || "Amir Ali Liaqat";

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl w-full h-full flex flex-col"
      >
        <Link to={`/blog/${id}`} className="relative w-full h-[230px] overflow-hidden rounded-2xl">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-2xl hover:scale-110 transition-all duration-500"
          />
        </Link>

        <div className="mt-5 flex-1">
          <h3 className="text-white font-bold text-[24px] leading-[30px]">{title}</h3>
          <p className="mt-2 text-secondary text-[14px] line-clamp-3">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 justify-between items-center text-[12px] text-secondary">
          <span>{date}</span>
          <span className="text-[#915EFF] font-semibold">{authorName}</span>
        </div>
      </Tilt>
    </motion.div>
  );
};

export default BlogCard;
