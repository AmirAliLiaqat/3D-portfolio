import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { blogs } from "../constants/blogs";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className={styles.sectionHeadText}>Blog not found</h2>
        <Link to="/blogs" className="mt-5 text-[#915EFF] font-bold underline">
          Go back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{blog.date} | By {blog.author}</p>
        <h2 className={styles.sectionHeadText}>{blog.title}</h2>
      </motion.div>

      <div className="mt-10 flex flex-col gap-10">
        <motion.div
          variants={fadeIn("", "spring", 0.5, 1)}
          className="relative w-full h-[400px] sm:h-[600px] overflow-hidden rounded-3xl"
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black-100 to-transparent opacity-60" />
        </motion.div>

        <motion.div
          variants={fadeIn("up", "tween", 0.5, 1)}
          className="bg-tertiary p-8 sm:p-12 rounded-3xl text-secondary text-[18px] leading-[30px] max-w-4xl mx-auto w-full prose prose-invert"
        >
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />
          
          <div className="mt-12 pt-8 border-t border-gray-700 flex justify-between items-center">
             <Link to="/blogs" className="text-[#915EFF] font-bold flex items-center gap-2 hover:underline">
               ← Back to Blogs
             </Link>
             <div className="flex gap-4">
               {/* Social Share Placeholders */}
               <span className="text-[14px]">Share:</span>
               <i className="fab fa-twitter cursor-pointer hover:text-white" />
               <i className="fab fa-linkedin cursor-pointer hover:text-white" />
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(BlogDetails, "");
