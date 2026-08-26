import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { usePortfolio } from "../context/PortfolioContext";
import BlogCard from "../components/BlogCard";

const Blogs = ({ limit }) => {
  const { blogs = [] } = usePortfolio();
  const displayedBlogs = limit ? blogs.slice(0, limit) : blogs;

  return (
    <div className={`mt-12 bg-black-100 rounded-[20px]`}>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>My technical insights</p>
          <h2 className={styles.sectionHeadText}>Articles & Blogs.</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 justify-items-center`}>
        {displayedBlogs.map((blog, index) => (
          <BlogCard key={blog.id || blog._id || index} index={index} {...blog} />
        ))}
      </div>

      {limit && blogs.length > limit && (
        <div className="flex justify-center pb-10">
          <Link 
            to="/blogs" 
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl hover:bg-secondary transition-all"
            onClick={() => window.scrollTo(0, 0)}
          >
            View All Articles
          </Link>
        </div>
      )}
    </div>
  );
};

export default SectionWrapper(Blogs, "blogs");
