import { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { styles } from "../../styles";
import ImageUploader from "../../components/admin/ImageUploader";

const AdminEducation = () => {
  const { education, addEducation, updateEducation, deleteEducation } =
    usePortfolio();
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    date: "",
    grade: "",
    desc: "",
    img: "",
    iconBg: "#383E56",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.school && formData.degree) {
      if (editingIndex !== null) {
        updateEducation(editingIndex, formData);
        setEditingIndex(null);
      } else {
        addEducation(formData);
      }
      setFormData({
        school: "",
        degree: "",
        date: "",
        grade: "",
        desc: "",
        img: "",
        iconBg: "#383E56",
      });
    }
  };

  const handleEdit = (index, edu) => {
    setEditingIndex(index);
    setFormData(edu);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this education?")) {
      deleteEducation(index);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className={styles.sectionHeadText}>Manage Education</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-tertiary p-6 rounded-xl mt-8 flex flex-col gap-4"
      >
        <h3 className="text-white font-bold text-lg">
          {editingIndex !== null ? "Edit Education" : "Add New Education"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="School Name"
            value={formData.school}
            onChange={(e) =>
              setFormData({ ...formData, school: e.target.value })
            }
            className="bg-black-100 py-3 px-4 rounded-lg text-white outline-none w-full"
            required
          />
          <input
            type="text"
            placeholder="Degree"
            value={formData.degree}
            onChange={(e) =>
              setFormData({ ...formData, degree: e.target.value })
            }
            className="bg-black-100 py-3 px-4 rounded-lg text-white outline-none w-full"
            required
          />
          <input
            type="text"
            placeholder="Date (e.g. 2022 - 2026)"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="bg-black-100 py-3 px-4 rounded-lg text-white outline-none w-full"
          />
          <input
            type="text"
            placeholder="Grade / CGPA"
            value={formData.grade}
            onChange={(e) =>
              setFormData({ ...formData, grade: e.target.value })
            }
            className="bg-black-100 py-3 px-4 rounded-lg text-white outline-none w-full"
          />
          <div className="md:col-span-2">
            <label className="text-secondary text-sm block mb-1">
              Icon Background Color
            </label>
            <input
              type="color"
              value={formData.iconBg}
              onChange={(e) =>
                setFormData({ ...formData, iconBg: e.target.value })
              }
              className="bg-black-100 h-10 w-full rounded-lg cursor-pointer outline-none"
            />
          </div>
        </div>

        <ImageUploader
          label="Institution Logo / Image (Cloudinary)"
          value={formData.img}
          onChange={(url) => setFormData((prev) => ({ ...prev, img: url }))}
          placeholder="Cloudinary image URL"
        />

        <textarea
          rows="3"
          value={formData.desc}
          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          placeholder="Description"
          className="bg-black-100 py-3 px-4 rounded-lg text-white outline-none w-full"
        />

        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="bg-[#915EFF] text-white font-bold py-2.5 px-6 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            {editingIndex !== null ? "Update Education" : "Add Education"}
          </button>
          {editingIndex !== null && (
            <button
              type="button"
              onClick={() => {
                setEditingIndex(null);
                setFormData({
                  school: "",
                  degree: "",
                  date: "",
                  grade: "",
                  desc: "",
                  img: "",
                  iconBg: "#383E56",
                });
              }}
              className="bg-red-500 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-red-600 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-10 grid gap-6">
        {education.map((edu, index) => (
          <div
            key={index}
            className="bg-black-200 p-6 rounded-xl relative group border-l-4"
            style={{ borderLeftColor: edu.iconBg }}
          >
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEdit(index, edu)}
                className="text-blue-400 bg-tertiary p-2 rounded-full"
              >
                <i className="fa fa-pencil"></i>
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-400 bg-tertiary p-2 rounded-full"
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>

            <div className="flex items-center gap-4 mb-3">
              {edu.img && (
                <div
                  className="w-12 h-12 rounded-full p-2 flex items-center justify-center overflow-hidden flex-shrink-0"
                  style={{ backgroundColor: edu.iconBg }}
                >
                  <img
                    src={edu.img}
                    alt={edu.school}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div>
                <h3 className="text-white text-[22px] font-bold">{edu.school}</h3>
                <p className="text-secondary text-[16px] font-semibold">
                  {edu.degree}
                </p>
              </div>
            </div>

            <p className="text-secondary text-[14px]">{edu.date}</p>
            <p className="text-white-100 text-[14px] mt-2">{edu.desc}</p>
            <p className="text-white-100 text-[12px] mt-2 font-bold">
              Grade: {edu.grade}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEducation;
