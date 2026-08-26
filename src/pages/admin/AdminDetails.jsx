import { useState, useEffect } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { styles } from "../../styles";
import ImageUploader from "../../components/admin/ImageUploader";

const AdminDetails = () => {
  const {
    companyDetails,
    updateCompanyDetails,
    services,
    addService,
    updateService,
    deleteService,
  } = usePortfolio();

  const [companyForm, setCompanyForm] = useState({
    name: "",
    tagline: "",
    shortDescription: "",
    fullDescription: "",
    website: "",
    email: "",
    phone: "",
    whatsapp: "",
    location: "",
    logoSquare: "",
    logoBanner: "",
  });

  useEffect(() => {
    if (companyDetails) {
      setCompanyForm(companyDetails);
    }
  }, [companyDetails]);

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    updateCompanyDetails(companyForm);
    alert("Company details updated in MongoDB Atlas!");
  };

  // Services Management State
  const [editingServiceIndex, setEditingServiceIndex] = useState(null);
  const [serviceFormData, setServiceFormData] = useState({ title: "", icon: "", description: "" });

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    if (serviceFormData.title) {
      if (editingServiceIndex !== null) {
        updateService(editingServiceIndex, serviceFormData);
        setEditingServiceIndex(null);
      } else {
        addService(serviceFormData);
      }
      setServiceFormData({ title: "", icon: "", description: "" });
    }
  };

  const handleEditService = (index, service) => {
    setEditingServiceIndex(index);
    setServiceFormData(service);
  };

  const handleDeleteService = (index) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      deleteService(index);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* 1. Company / Agency Management */}
      <section>
        <h2 className={styles.sectionHeadText}>Company Details</h2>
        <p className="text-secondary text-sm mt-1">
          Manage your official Software Agency details (Designs To Deploy) synced live with MongoDB Atlas.
        </p>

        <form
          onSubmit={handleCompanySubmit}
          className="bg-tertiary p-8 rounded-2xl mt-6 flex flex-col gap-6 shadow-card"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col">
              <span className="text-white font-medium mb-2">Company Name</span>
              <input
                type="text"
                name="name"
                value={companyForm.name || ""}
                onChange={handleCompanyChange}
                className="bg-black-100 py-4 px-6 rounded-lg text-white outline-none font-medium"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-2">Tagline</span>
              <input
                type="text"
                name="tagline"
                value={companyForm.tagline || ""}
                onChange={handleCompanyChange}
                className="bg-black-100 py-4 px-6 rounded-lg text-white outline-none font-medium"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-2">Website URL</span>
              <input
                type="text"
                name="website"
                value={companyForm.website || ""}
                onChange={handleCompanyChange}
                className="bg-black-100 py-4 px-6 rounded-lg text-white outline-none font-medium"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-2">Location</span>
              <input
                type="text"
                name="location"
                value={companyForm.location || ""}
                onChange={handleCompanyChange}
                className="bg-black-100 py-4 px-6 rounded-lg text-white outline-none font-medium"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-2">Email Address</span>
              <input
                type="email"
                name="email"
                value={companyForm.email || ""}
                onChange={handleCompanyChange}
                className="bg-black-100 py-4 px-6 rounded-lg text-white outline-none font-medium"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-2">Phone / WhatsApp</span>
              <input
                type="text"
                name="phone"
                value={companyForm.phone || ""}
                onChange={handleCompanyChange}
                className="bg-black-100 py-4 px-6 rounded-lg text-white outline-none font-medium"
              />
            </label>
          </div>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Full Description</span>
            <textarea
              rows="4"
              name="fullDescription"
              value={companyForm.fullDescription || ""}
              onChange={handleCompanyChange}
              className="bg-black-100 py-4 px-6 rounded-lg text-white outline-none font-medium"
            />
          </label>

          {/* Cloudinary Image Uploaders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploader
              label="Square Logo Icon (Cloudinary)"
              value={companyForm.logoSquare}
              onChange={(url) => setCompanyForm((prev) => ({ ...prev, logoSquare: url }))}
              placeholder="Square logo URL"
            />

            <ImageUploader
              label="Banner Logo (Cloudinary)"
              value={companyForm.logoBanner}
              onChange={(url) => setCompanyForm((prev) => ({ ...prev, logoBanner: url }))}
              placeholder="Banner logo URL"
            />
          </div>

          <button
            type="submit"
            className="bg-[#915EFF] text-white font-bold py-3 px-8 rounded-xl w-fit hover:bg-indigo-600 transition-colors shadow-md shadow-[#915EFF]/20"
          >
            Save Company Details
          </button>
        </form>
      </section>

      {/* 2. Services Management */}
      <section>
        <h2 className={styles.sectionHeadText}>Manage Services</h2>

        <form
          onSubmit={handleServiceSubmit}
          className="bg-tertiary p-6 rounded-xl mt-6 flex flex-col gap-4 shadow-card"
        >
          <h3 className="text-white font-bold text-lg">
            {editingServiceIndex !== null ? "Edit Service" : "Add New Service"}
          </h3>
          
          <input
            type="text"
            placeholder="Service Title"
            value={serviceFormData.title}
            onChange={(e) =>
              setServiceFormData({ ...serviceFormData, title: e.target.value })
            }
            className="bg-black-100 py-3 px-4 rounded-lg text-white outline-none w-full"
            required
          />

          <ImageUploader
            label="Service Icon (Cloudinary)"
            value={serviceFormData.icon}
            onChange={(url) => setServiceFormData((prev) => ({ ...prev, icon: url }))}
            placeholder="Service icon URL"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-[#915EFF] text-white font-bold py-2.5 px-6 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              {editingServiceIndex !== null ? "Update Service" : "Add Service"}
            </button>
            {editingServiceIndex !== null && (
              <button
                type="button"
                onClick={() => {
                  setEditingServiceIndex(null);
                  setServiceFormData({ title: "", icon: "", description: "" });
                }}
                className="bg-red-500 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-red-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-black-200 p-6 rounded-xl flex flex-col items-center gap-4 relative group min-h-[150px] justify-center shadow-card border border-white/10"
            >
              <button
                onClick={() => handleDeleteService(index)}
                className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-black-100 rounded-full"
              >
                <i className="fa fa-trash text-xs"></i>
              </button>
              <button
                onClick={() => handleEditService(index, service)}
                className="absolute top-2 left-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-black-100 rounded-full"
              >
                <i className="fa fa-pencil text-xs"></i>
              </button>

              <div className="w-14 h-14 rounded-full flex items-center justify-center p-2 bg-tertiary border border-white/10 overflow-hidden">
                {service.icon && (service.icon.startsWith("http") || service.icon.startsWith("/")) ? (
                  <img src={service.icon} alt={service.title} className="w-full h-full object-contain" />
                ) : (
                  <i className={`${service.icon || "fa-solid fa-star"} text-[#915EFF] text-xl`} />
                )}
              </div>
              <h3 className="text-white font-bold text-center text-[16px]">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDetails;
