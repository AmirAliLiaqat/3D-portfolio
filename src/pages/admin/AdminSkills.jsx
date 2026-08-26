import { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { styles } from "../../styles";
import ImageUploader from "../../components/admin/ImageUploader";

const AdminSkills = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = usePortfolio();
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", icon: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name) {
      if (editingIndex !== null) {
        updateSkill(editingIndex, formData);
        setEditingIndex(null);
      } else {
        addSkill(formData);
      }
      setFormData({ name: "", icon: "" });
    }
  };

  const handleEdit = (index, skill) => {
    setEditingIndex(index);
    setFormData(skill);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      deleteSkill(index);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className={styles.sectionHeadText}>Manage Skills & Tech Stack</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-tertiary p-6 rounded-xl mt-8 flex flex-col gap-4"
      >
        <h3 className="text-white font-bold text-lg">
          {editingIndex !== null ? "Edit Skill" : "Add New Skill"}
        </h3>

        <input
          type="text"
          placeholder="Skill Name (e.g. React JS)"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-black-100 py-3 px-4 rounded-lg text-white outline-none w-full"
          required
        />

        <ImageUploader
          label="Skill Icon (Cloudinary / Image URL)"
          value={formData.icon}
          onChange={(url) => setFormData((prev) => ({ ...prev, icon: url }))}
          placeholder="Icon URL or upload to Cloudinary"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-[#915EFF] text-white font-bold py-2.5 px-6 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            {editingIndex !== null ? "Update Skill" : "Add Skill"}
          </button>
          {editingIndex !== null && (
            <button
              type="button"
              onClick={() => {
                setEditingIndex(null);
                setFormData({ name: "", icon: "" });
              }}
              className="bg-red-500 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-red-600 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-black-200 p-4 rounded-xl flex flex-col items-center gap-4 relative group border border-white/10"
          >
            <button
              onClick={() => handleDelete(index)}
              className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-black-100 rounded-full"
            >
              <i className="fa fa-trash text-xs"></i>
            </button>
            <button
              onClick={() => handleEdit(index, skill)}
              className="absolute top-2 left-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-black-100 rounded-full"
            >
              <i className="fa fa-pencil text-xs"></i>
            </button>

            <div className="w-16 h-16 rounded-full bg-tertiary flex items-center justify-center p-2 border border-white/10 overflow-hidden">
              {typeof skill.icon === "string" && skill.icon ? (
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <span className="text-sm font-bold text-[#915EFF]">
                  {skill.name[0]}
                </span>
              )}
            </div>
            <p className="text-white font-bold text-center text-sm">{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSkills;
