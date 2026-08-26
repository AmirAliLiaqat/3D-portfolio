import { useState, useEffect } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { styles } from "../../styles";
import ImageUploader from "../../components/admin/ImageUploader";

const AdminCompany = () => {
  const { companyDetails, updateCompanyDetails } = usePortfolio();

  const [companyForm, setCompanyForm] = useState({
    name: "Designs To Deploy",
    tagline: "Software Agency & Digital Solutions",
    shortDescription: "",
    fullDescription: "",
    website: "https://www.designstodeploy.dev/",
    email: "designstodeploy@gmail.com",
    phone: "+92 300 0000000",
    whatsapp: "+92 300 0000000",
    location: "Lahore, Pakistan",
    logoSquare: "",
    logoBanner: "",
    pillars: [],
    socials: [],
  });

  const [newPillar, setNewPillar] = useState({ title: "", description: "", icon: "fa-solid fa-rocket" });
  const [newSocial, setNewSocial] = useState({ name: "", link: "", icon: "fa-brands fa-github", color: "#915EFF" });

  useEffect(() => {
    if (companyDetails) {
      setCompanyForm((prev) => ({
        ...prev,
        ...companyDetails,
        pillars: companyDetails.pillars || [],
        socials: companyDetails.socials || [],
      }));
    }
  }, [companyDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    updateCompanyDetails(companyForm);
    alert("Company details updated successfully in MongoDB Atlas!");
  };

  // Pillar handlers
  const addPillar = () => {
    if (!newPillar.title) return;
    setCompanyForm((prev) => ({
      ...prev,
      pillars: [...(prev.pillars || []), newPillar],
    }));
    setNewPillar({ title: "", description: "", icon: "fa-solid fa-rocket" });
  };

  const removePillar = (index) => {
    setCompanyForm((prev) => ({
      ...prev,
      pillars: prev.pillars.filter((_, i) => i !== index),
    }));
  };

  // Social handlers
  const addSocial = () => {
    if (!newSocial.name || !newSocial.link) return;
    setCompanyForm((prev) => ({
      ...prev,
      socials: [...(prev.socials || []), newSocial],
    }));
    setNewSocial({ name: "", link: "", icon: "fa-brands fa-github", color: "#915EFF" });
  };

  const removeSocial = (index) => {
    setCompanyForm((prev) => ({
      ...prev,
      socials: prev.socials.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h2 className={styles.sectionHeadText}>Company Details</h2>
        <p className="text-secondary text-sm mt-1">
          View and edit your official Software Agency details (Designs To Deploy) synced live with MongoDB Atlas.
        </p>
      </div>

      <form onSubmit={handleCompanySubmit} className="space-y-8">
        {/* 1. Core Information */}
        <div className="bg-tertiary p-8 rounded-2xl shadow-card space-y-6">
          <h3 className="text-white font-bold text-lg border-b border-white/10 pb-3 flex items-center gap-2">
            <i className="fa-solid fa-building text-[#915EFF]" />
            Agency Overview
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col">
              <span className="text-white font-medium mb-2">Company Name</span>
              <input
                type="text"
                name="name"
                value={companyForm.name || ""}
                onChange={handleChange}
                className="bg-black-100 py-4 px-6 rounded-xl text-white outline-none font-medium"
                required
              />
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-2">Tagline</span>
              <input
                type="text"
                name="tagline"
                value={companyForm.tagline || ""}
                onChange={handleChange}
                placeholder="Software Agency & Digital Solutions"
                className="bg-black-100 py-4 px-6 rounded-xl text-white outline-none font-medium"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-2">Website URL</span>
              <input
                type="url"
                name="website"
                value={companyForm.website || ""}
                onChange={handleChange}
                placeholder="https://www.designstodeploy.dev/"
                className="bg-black-100 py-4 px-6 rounded-xl text-white outline-none font-medium"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-2">Location</span>
              <input
                type="text"
                name="location"
                value={companyForm.location || ""}
                onChange={handleChange}
                placeholder="Lahore, Pakistan"
                className="bg-black-100 py-4 px-6 rounded-xl text-white outline-none font-medium"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-2">Email Address</span>
              <input
                type="email"
                name="email"
                value={companyForm.email || ""}
                onChange={handleChange}
                placeholder="designstodeploy@gmail.com"
                className="bg-black-100 py-4 px-6 rounded-xl text-white outline-none font-medium"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-2">Phone / WhatsApp</span>
              <input
                type="text"
                name="phone"
                value={companyForm.phone || ""}
                onChange={handleChange}
                placeholder="+92 300 0000000"
                className="bg-black-100 py-4 px-6 rounded-xl text-white outline-none font-medium"
              />
            </label>
          </div>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Short Description</span>
            <textarea
              rows="2"
              name="shortDescription"
              value={companyForm.shortDescription || ""}
              onChange={handleChange}
              placeholder="Brief summary of agency services..."
              className="bg-black-100 py-4 px-6 rounded-xl text-white outline-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Full Description</span>
            <textarea
              rows="4"
              name="fullDescription"
              value={companyForm.fullDescription || ""}
              onChange={handleChange}
              placeholder="Detailed description of agency mission and expertise..."
              className="bg-black-100 py-4 px-6 rounded-xl text-white outline-none font-medium"
            />
          </label>
        </div>

        {/* 2. Logos & Branding */}
        <div className="bg-tertiary p-8 rounded-2xl shadow-card space-y-6">
          <h3 className="text-white font-bold text-lg border-b border-white/10 pb-3 flex items-center gap-2">
            <i className="fa-solid fa-photo-film text-[#915EFF]" />
            Branding & Logos
          </h3>

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
        </div>

        {/* 3. Company Pillars */}
        <div className="bg-tertiary p-8 rounded-2xl shadow-card space-y-6">
          <h3 className="text-white font-bold text-lg border-b border-white/10 pb-3 flex items-center gap-2">
            <i className="fa-solid fa-cubes text-[#915EFF]" />
            Agency Pillars / Core Values ({companyForm.pillars?.length || 0})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Pillar Title (e.g. Modern Web Architecture)"
              value={newPillar.title}
              onChange={(e) => setNewPillar({ ...newPillar, title: e.target.value })}
              className="bg-black-100 py-3 px-4 rounded-xl text-white text-sm outline-none"
            />
            <input
              type="text"
              placeholder="Icon Class (e.g. fa-solid fa-code)"
              value={newPillar.icon}
              onChange={(e) => setNewPillar({ ...newPillar, icon: e.target.value })}
              className="bg-black-100 py-3 px-4 rounded-xl text-white text-sm outline-none"
            />
            <button
              type="button"
              onClick={addPillar}
              className="bg-[#915EFF] text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-600 transition-colors text-sm"
            >
              + Add Pillar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {companyForm.pillars?.map((pillar, index) => (
              <div key={index} className="bg-black-200 p-4 rounded-xl relative group border border-white/10">
                <button
                  type="button"
                  onClick={() => removePillar(index)}
                  className="absolute top-2 right-2 text-red-400 p-1.5 bg-black-100 rounded-full hover:text-red-300"
                >
                  <i className="fa fa-trash text-xs" />
                </button>
                <div className="flex items-center gap-3">
                  <i className={`${pillar.icon || "fa-solid fa-star"} text-[#915EFF] text-xl`} />
                  <div>
                    <h4 className="text-white font-bold text-sm">{pillar.title}</h4>
                    {pillar.description && (
                      <p className="text-secondary text-xs mt-1">{pillar.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Company Social Links Section */}
        <div className="bg-tertiary p-8 rounded-2xl shadow-card space-y-6">
          <h3 className="text-white font-bold text-lg border-b border-white/10 pb-3 flex items-center gap-2">
            <i className="fa-solid fa-share-nodes text-[#915EFF]" />
            Company Social Media Links ({companyForm.socials?.length || 0})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Platform Name (e.g. GitHub)"
              value={newSocial.name}
              onChange={(e) => setNewSocial({ ...newSocial, name: e.target.value })}
              className="bg-black-100 py-3 px-4 rounded-xl text-white text-sm outline-none"
            />
            <input
              type="url"
              placeholder="URL (e.g. https://github.com/...)"
              value={newSocial.link}
              onChange={(e) => setNewSocial({ ...newSocial, link: e.target.value })}
              className="bg-black-100 py-3 px-4 rounded-xl text-white text-sm outline-none"
            />
            <button
              type="button"
              onClick={addSocial}
              className="bg-[#915EFF] text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-600 transition-colors text-sm"
            >
              + Add Social Link
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {companyForm.socials?.map((social, index) => (
              <div
                key={index}
                className="bg-black-200 p-4 rounded-xl relative group border border-white/10 flex items-center justify-between"
              >
                <div className="flex items-center gap-3 min-w-0 pr-6">
                  <div className="w-10 h-10 rounded-xl bg-tertiary flex items-center justify-center border border-white/10 flex-shrink-0">
                    <i className={`${social.icon || "fa-solid fa-link"} text-[#915EFF] text-lg`} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-white font-bold text-sm truncate">{social.name}</h4>
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary/70 hover:text-[#915EFF] text-xs truncate block"
                    >
                      {social.link}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeSocial(index)}
                  className="text-red-400 p-1.5 bg-black-100 rounded-full hover:text-red-300 flex-shrink-0"
                  title="Remove Social Link"
                >
                  <i className="fa fa-trash text-xs" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#915EFF] text-white font-bold py-4 px-10 rounded-xl hover:bg-indigo-600 transition-colors shadow-lg shadow-[#915EFF]/30 text-base"
          >
            Save All Company Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminCompany;
