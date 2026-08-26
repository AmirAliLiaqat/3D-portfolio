import { useState } from "react";
import { Link } from "react-router-dom";
import { usePortfolio } from "../../context/PortfolioContext";
import { styles } from "../../styles";

const AdminBlogs = () => {
  const { blogs = [], deleteBlog } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get unique categories
  const categories = ["all", ...new Set(blogs.map((b) => b.category).filter(Boolean))];

  // Filtered blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      (blog.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.excerpt || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat =
      selectedCategory === "all" ||
      (blog.category || "").toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const handleDelete = (index, blogTitle) => {
    if (window.confirm(`Are you sure you want to delete "${blogTitle}"?`)) {
      deleteBlog(index);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className={styles.sectionHeadText}>Manage Blogs ({blogs.length})</h2>
          <p className="text-secondary text-sm mt-1">
            Create, edit, and publish technical articles, tutorials, and portfolio blog posts.
          </p>
        </div>

        <Link
          to="/admin/blogs/add"
          className="bg-[#915EFF] hover:bg-indigo-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-[#915EFF]/30 flex items-center gap-2 w-fit"
        >
          <i className="fa-solid fa-[#915EFF] fa-plus text-white text-base" />
          + Add New Blog
        </Link>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-tertiary p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between shadow-card">
        <div className="relative w-full md:w-96">
          <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-secondary text-sm" />
          <input
            type="text"
            placeholder="Search blogs by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black-100 py-3 pl-11 pr-4 rounded-xl text-white outline-none text-sm border border-white/10 focus:border-[#915EFF]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? "bg-[#915EFF] text-white shadow-md shadow-[#915EFF]/30"
                  : "bg-black-100 text-secondary hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="bg-tertiary p-12 rounded-2xl text-center border border-white/10">
          <i className="fa-solid fa-newspaper text-5xl text-secondary/40 mb-3" />
          <h3 className="text-white text-xl font-bold">No Blogs Found</h3>
          <p className="text-secondary text-sm mt-1 mb-6">
            {searchTerm ? "No blogs matched your search term." : "You haven't added any blog posts yet."}
          </p>
          <Link
            to="/admin/blogs/add"
            className="bg-[#915EFF] text-white font-bold py-3 px-6 rounded-xl text-sm"
          >
            Create Your First Blog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog, index) => {
            const originalIndex = blogs.findIndex((b) => (b._id ? b._id === blog._id : b.id === blog.id));
            return (
              <div
                key={blog._id || blog.id || index}
                className="bg-tertiary rounded-2xl border border-white/10 overflow-hidden shadow-card flex flex-col justify-between group hover:border-[#915EFF]/50 transition-all duration-300"
              >
                <div>
                  {/* Featured Image Header */}
                  <div className="relative h-48 w-full bg-black-100 overflow-hidden">
                    <img
                      src={blog.image || "/assets/company/designstodeploy-banner.png"}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "/assets/company/designstodeploy-banner.png";
                      }}
                    />
                    <div className="absolute top-3 left-3 bg-[#151030]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#915EFF] border border-[#915EFF]/30">
                      {blog.category || "General"}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-secondary mb-2">
                      <span>
                        <i className="fa-regular fa-calendar mr-1" />
                        {blog.date || "Recent"}
                      </span>
                      <span>•</span>
                      <span>
                        <i className="fa-regular fa-clock mr-1" />
                        {blog.readTime || "5 min read"}
                      </span>
                    </div>

                    <h3 className="text-white font-bold text-lg leading-snug line-clamp-2 mb-2 group-hover:text-[#915EFF] transition-colors">
                      {blog.title}
                    </h3>

                    <p className="text-secondary text-xs line-clamp-3 leading-relaxed mb-4">
                      {blog.excerpt || blog.content}
                    </p>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {blog.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="bg-black-100 text-secondary text-[11px] px-2.5 py-0.5 rounded-md font-mono"
                          >
                            #{tag.replace(/^#/, "")}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-4 bg-black-200/60 border-t border-white/5 flex items-center justify-between gap-2">
                  <Link
                    to={`/blog/${blog._id || blog.id || originalIndex}`}
                    target="_blank"
                    className="text-secondary hover:text-white text-xs font-medium flex items-center gap-1"
                  >
                    <i className="fa-solid fa-eye text-xs" /> View
                  </Link>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/blogs/edit/${blog._id || blog.id || originalIndex}`}
                      className="bg-[#915EFF]/20 hover:bg-[#915EFF] text-[#915EFF] hover:text-white text-xs font-bold py-1.5 px-3 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <i className="fa-solid fa-pen-to-square" /> Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(originalIndex >= 0 ? originalIndex : index, blog.title)}
                      className="bg-red-500/20 hover:bg-red-600 text-red-400 hover:text-white text-xs font-bold py-1.5 px-3 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <i className="fa-solid fa-trash" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
