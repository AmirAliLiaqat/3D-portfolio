import { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { styles } from "../../styles";

const AdminExperience = () => {
  const { experience, addExperience, updateExperience, deleteExperience } =
    usePortfolio();
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    company_name: "",
    icon: "",
    iconBg: "#383E56",
    date: "",
    points: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.company_name) {
      if (editingIndex !== null) {
        updateExperience(editingIndex, formData);
        setEditingIndex(null);
      } else {
        addExperience(formData);
      }
      setFormData({
        title: "",
        company_name: "",
        icon: "",
        iconBg: "#383E56",
        date: "",
        points: [],
      });
    }
  };

  const handleEdit = (index, exp) => {
    setEditingIndex(index);
    setFormData(exp);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      deleteExperience(index);
    }
  };

  const handlePointChange = (pointIndex, value) => {
    const newPoints = [...formData.points];
    newPoints[pointIndex] = value;
    setFormData({ ...formData, points: newPoints });
  };

  const addPoint = () => {
    setFormData({ ...formData, points: [...formData.points, ""] });
  };

  const removePoint = (pointIndex) => {
    setFormData({
      ...formData,
      points: formData.points.filter((_, i) => i !== pointIndex),
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className={styles.sectionHeadText}>Manage Experience</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-tertiary p-6 rounded-xl mt-8 flex flex-col gap-4"
      >
        <h3 className="text-white font-bold text-lg">
          {editingIndex !== null ? "Edit Experience" : "Add New Experience"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title (e.g. Web Developer)"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="bg-black-100 py-3 px-4 rounded-lg text-white outline-none w-full"
          />
          <input
            type="text"
            placeholder="Company Name"
            value={formData.company_name}
            onChange={(e) =>
              setFormData({ ...formData, company_name: e.target.value })
            }
            className="bg-black-100 py-3 px-4 rounded-lg text-white outline-none w-full"
          />
          <input
            type="text"
            placeholder="Date (e.g. Jan 2022 - Present)"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="bg-black-100 py-3 px-4 rounded-lg text-white outline-none w-full"
          />
          <input
            type="text"
            placeholder="Icon URL / Class"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="bg-black-100 py-3 px-4 rounded-lg text-white outline-none w-full"
          />
          <div className="md:col-span-2">
            <label className="text-secondary text-sm block mb-1">
              Icon Background Color
            </label>
            <input
              type="color"
              placeholder="Icon Background Color"
              value={formData.iconBg}
              onChange={(e) =>
                setFormData({ ...formData, iconBg: e.target.value })
              }
              className="bg-black-100 h-10 w-full rounded-lg cursor-pointer outline-none"
            />
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <label className="text-white font-bold block mb-2">
            Points / Responsibilities
          </label>
          {formData.points.map((point, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={point}
                onChange={(e) => handlePointChange(i, e.target.value)}
                className="bg-black-100 py-2 px-4 rounded-lg text-white outline-none w-full"
                placeholder={`Point ${i + 1}`}
              />
              <button
                type="button"
                onClick={() => removePoint(i)}
                className="text-red-500 hover:text-red-400 p-2"
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addPoint}
            className="text-blue-500 hover:text-blue-400 mt-2 text-sm"
          >
            + Add Point
          </button>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="bg-white text-primary font-bold py-2 px-6 rounded-lg hover:bg-white/90 transition-colors"
          >
            {editingIndex !== null ? "Update" : "Add"}
          </button>
          {editingIndex !== null && (
            <button
              type="button"
              onClick={() => {
                setEditingIndex(null);
                setFormData({
                  title: "",
                  company_name: "",
                  icon: "",
                  iconBg: "#383E56",
                  date: "",
                  points: [],
                });
              }}
              className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-10 grid gap-6">
        {experience.map((exp, index) => (
          <div
            key={index}
            className="bg-black-200 p-6 rounded-xl relative group border-l-4"
            style={{ borderLeftColor: exp.iconBg }}
          >
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEdit(index, exp)}
                className="text-blue-500 bg-tertiary p-2 rounded-full"
              >
                <i className="fa fa-pencil"></i>
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 bg-tertiary p-2 rounded-full"
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>

            <h3 className="text-white text-[24px] font-bold">{exp.title}</h3>
            <p
              className="text-secondary text-[16px] font-semibold"
              style={{ margin: 0 }}
            >
              {exp.company_name}
            </p>
            <ul className="mt-5 list-disc ml-5 space-y-2">
              {exp.points.map((point, pointIndex) => (
                <li
                  key={`experience-point-${pointIndex}`}
                  className="text-white-100 text-[14px] pl-1 tracking-wider"
                >
                  {point}
                </li>
              ))}
            </ul>
            <p className="text-secondary text-[12px] mt-2">{exp.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminExperience;
