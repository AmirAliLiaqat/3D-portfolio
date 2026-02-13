import { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { styles } from "../../styles";

const AdminDetails = () => {
  const { services, addService, updateService, deleteService } = usePortfolio();
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ title: "", icon: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title) {
      if (editingIndex !== null) {
        updateService(editingIndex, formData);
        setEditingIndex(null);
      } else {
        addService(formData);
      }
      setFormData({ title: "", icon: "" });
    }
  };

  const handleEdit = (index, service) => {
    setEditingIndex(index);
    setFormData(service);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      deleteService(index);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className={styles.sectionHeadText}>Manage Services</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-tertiary p-6 rounded-xl mt-8 flex flex-col gap-4"
      >
        <h3 className="text-white font-bold text-lg">
          {editingIndex !== null ? "Edit Service" : "Add New Service"}
        </h3>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Service Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="bg-black-100 py-3 px-4 rounded-lg text-white outline-none w-full"
          />
          <input
            type="text"
            placeholder="Icon URL / Asset Name"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="bg-black-100 py-3 px-4 rounded-lg text-white outline-none w-full"
          />
        </div>
        <div className="flex gap-2">
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
                setFormData({ title: "", icon: "" });
              }}
              className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-black-200 p-6 rounded-xl flex flex-col items-center gap-4 relative group min-h-[150px] justify-center box-shadow-card"
          >
            <button
              onClick={() => handleDelete(index)}
              className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-black-100 rounded-full"
            >
              <i className="fa fa-trash"></i>
            </button>
            <button
              onClick={() => handleEdit(index, service)}
              className="absolute top-2 left-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-black-100 rounded-full"
            >
              <i className="fa fa-pencil"></i>
            </button>

            <div className="w-16 h-16 rounded-full flex items-center justify-center p-2">
              {
                /* Simplified icon rendering */
                typeof service.icon === "string" ? (
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <div className="text-white font-bold">Icon</div>
                )
              }
            </div>
            <h3 className="text-white font-bold text-center text-[16px]">
              {service.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDetails;
