import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePortfolio } from "../../context/PortfolioContext";
import { styles } from "../../styles";
import ImageUploader from "../../components/admin/ImageUploader";

const AdminProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, addProject, updateProject } = usePortfolio();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tags: "",
    category: "wordpress",
    image: "",
    source_code_link: "",
    source_link: "",
  });

  useEffect(() => {
    if (id) {
      const projectToEdit = projects[id];
      if (projectToEdit) {
        setFormData({
          ...projectToEdit,
          tags: projectToEdit.tags
            ? projectToEdit.tags.map((t) => (typeof t === "object" ? t.name : t)).join(", ")
            : "",
        });
      }
    }
  }, [id, projects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process tags
    const processedTags = formData.tags
      .split(",")
      .filter((t) => t.trim())
      .map((tag) => ({
        name: tag.trim(),
        color: "blue-text-gradient",
      }));

    const projectData = {
      ...formData,
      tags: processedTags,
    };

    if (id) {
      updateProject(parseInt(id), projectData);
    } else {
      addProject(projectData);
    }
    navigate("/admin/projects");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-tertiary p-8 rounded-2xl shadow-card w-full">
        <h2 className={styles.sectionHeadText}>
          {id ? "Edit Project" : "Add New Project"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Project Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Project Name"
              className="bg-black-100 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Description</span>
            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Project Description"
              className="bg-black-100 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              required
            />
          </label>

          <div className="md:flex gap-4">
            <label className="flex flex-col w-full">
              <span className="text-white font-medium mb-2">
                Tags (comma separated)
              </span>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="react, tailwind, nodejs"
                className="bg-black-100 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="text-white font-medium mb-2">Category</span>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="bg-black-100 py-4 px-6 text-white rounded-lg outline-none border-none font-medium"
              >
                <option value="wordpress">WordPress</option>
                <option value="mern">MERN Stack</option>
                <option value="fullstack">Fullstack</option>
                <option value="frontend">Frontend</option>
                <option value="mobile">App / Mobile</option>
              </select>
            </label>
          </div>

          {/* Cloudinary Image Uploader */}
          <ImageUploader
            label="Project Image (Cloudinary)"
            value={formData.image}
            onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
            placeholder="Cloudinary image URL"
          />

          <div className="md:flex gap-4">
            <label className="flex flex-col w-full">
              <span className="text-white font-medium mb-2">
                Source Code Link
              </span>
              <input
                type="url"
                name="source_code_link"
                value={formData.source_code_link}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="bg-black-100 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="text-white font-medium mb-2">
                Live Demo Link
              </span>
              <input
                type="url"
                name="source_link"
                value={formData.source_link}
                onChange={handleChange}
                placeholder="https://example.com"
                className="bg-black-100 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              />
            </label>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-[#915EFF] text-white font-bold py-3 px-8 rounded-xl hover:bg-indigo-600 transition-colors shadow-md shadow-[#915EFF]/20"
            >
              {id ? "Update Project" : "Add Project"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/projects")}
              className="bg-transparent py-3 px-8 outline-none w-fit text-white font-bold rounded-xl border border-white/10 hover:bg-black-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProjectForm;
