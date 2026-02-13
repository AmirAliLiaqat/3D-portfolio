/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { styles } from "../../styles";

const AdminTestimonials = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } =
    usePortfolio();
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    company: "",
    image: "",
    testimonial: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.testimonial) {
      if (editingIndex !== null) {
        updateTestimonial(editingIndex, formData);
        setEditingIndex(null);
      } else {
        addTestimonial(formData);
      }
      setFormData({
        name: "",
        designation: "",
        company: "",
        image: "",
        testimonial: "",
      });
    }
  };

  const handleEdit = (index, testimonial) => {
    setEditingIndex(index);
    setFormData(testimonial);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      deleteTestimonial(index);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className={styles.sectionHeadText}>Manage Testimonials</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-tertiary p-6 rounded-xl mt-8 flex flex-col gap-4"
      >
        <h3 className="text-white font-bold text-lg">
          {editingIndex !== null ? "Edit Testimonial" : "Add New Testimonial"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-black-100 py-3 px-4 rounded-lg text-white outline-none w-full"
          />
          <input
            type="text"
            placeholder="Designation (e.g. CTO)"
            value={formData.designation}
            onChange={(e) =>
              setFormData({ ...formData, designation: e.target.value })
            }
            className="bg-black-100 py-3 px-4 rounded-lg text-white outline-none w-full"
          />
          <input
            type="text"
            placeholder="Company"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            className="bg-black-100 py-3 px-4 rounded-lg text-white outline-none w-full"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            className="bg-black-100 py-3 px-4 rounded-lg text-white outline-none w-full"
          />
        </div>

        <textarea
          rows="3"
          value={formData.testimonial}
          onChange={(e) =>
            setFormData({ ...formData, testimonial: e.target.value })
          }
          placeholder="Testimonial Text"
          className="bg-black-100 py-3 px-4 rounded-lg text-white outline-none w-full"
        />

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
                  name: "",
                  designation: "",
                  company: "",
                  image: "",
                  testimonial: "",
                });
              }}
              className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((test, index) => (
          <div
            key={index}
            className="bg-black-200 p-6 rounded-2xl relative group"
          >
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEdit(index, test)}
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

            <p className="text-white font-black text-[48px]">"</p>
            <div className="mt-1">
              <p className="text-white tracking-wider text-[18px]">
                {test.testimonial}
              </p>
              <div className="mt-7 flex justify-between items-center gap-1">
                <div className="flex-1 flex flex-col">
                  <p className="text-white font-medium text-[16px]">
                    <span className="blue-text-gradient">@</span> {test.name}
                  </p>
                  <p className="mt-1 text-secondary text-[12px]">
                    {test.designation} of {test.company}
                  </p>
                </div>
                <img
                  src={test.image}
                  alt={`feedback-by-${test.name}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonials;
