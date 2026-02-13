import { useState, useEffect } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { styles } from "../../styles";

const AdminProfile = () => {
  const {
    details,
    updateDetails,
    socialLinks,
    addSocialLink,
    updateSocialLink,
    deleteSocialLink,
  } = usePortfolio();

  // Local state for details form
  const [localDetails, setLocalDetails] = useState({
    name: "",
    shortName: "",
    role: "",
    description: "",
    about: "",
  });

  // Sync local state with context details
  useEffect(() => {
    if (details) {
      setLocalDetails(details);
    }
  }, [details]);

  // Social Link Form State
  const [socialForm, setSocialForm] = useState({
    name: "",
    link: "",
    icon: "",
  });
  const [editingSocialIndex, setEditingSocialIndex] = useState(null);

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setLocalDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    updateDetails(localDetails);
    alert("Profile details updated!");
  };

  const handleSocialSubmit = (e) => {
    e.preventDefault();
    if (socialForm.name && socialForm.link) {
      if (editingSocialIndex !== null) {
        updateSocialLink(editingSocialIndex, socialForm);
        setEditingSocialIndex(null);
      } else {
        addSocialLink(socialForm);
      }
      setSocialForm({ name: "", link: "", icon: "" });
    }
  };

  const handleEditSocial = (index, link) => {
    setEditingSocialIndex(index);
    setSocialForm(link);
  };

  const handleDeleteSocial = (index) => {
    if (window.confirm("Delete this social link?")) {
      deleteSocialLink(index);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Personal Details Section */}
      <section>
        <h2 className={styles.sectionHeadText}>Personal Details</h2>
        <form
          onSubmit={handleDetailsSubmit}
          className="bg-tertiary p-8 rounded-2xl mt-8 flex flex-col gap-6 shadow-card"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col">
              <span className="text-white font-medium mb-2">Full Name</span>
              <input
                type="text"
                name="name"
                value={localDetails.name || ""}
                onChange={handleDetailsChange}
                className="bg-black-100 py-4 px-6 rounded-lg text-white outline-none font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-2">
                Short Name (for Hero)
              </span>
              <input
                type="text"
                name="shortName"
                value={localDetails.shortName || ""}
                onChange={handleDetailsChange}
                className="bg-black-100 py-4 px-6 rounded-lg text-white outline-none font-medium"
              />
            </label>
            <label className="flex flex-col md:col-span-2">
              <span className="text-white font-medium mb-2">Role / Title</span>
              <input
                type="text"
                name="role"
                value={localDetails.role || ""}
                onChange={handleDetailsChange}
                className="bg-black-100 py-4 px-6 rounded-lg text-white outline-none font-medium"
              />
            </label>
          </div>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">
              Hero Description
            </span>
            <textarea
              rows="3"
              name="description"
              value={localDetails.description || ""}
              onChange={handleDetailsChange}
              className="bg-black-100 py-4 px-6 rounded-lg text-white outline-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">
              About Description
            </span>
            <textarea
              rows="4"
              name="about"
              value={localDetails.about || ""}
              onChange={handleDetailsChange}
              className="bg-black-100 py-4 px-6 rounded-lg text-white outline-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-white text-primary font-bold py-3 px-8 rounded-xl w-fit hover:bg-white/90 transition-colors"
          >
            Save Details
          </button>
        </form>
      </section>

      {/* Social Links Section */}
      <section>
        <h2 className={styles.sectionHeadText}>Social Links</h2>

        <form
          onSubmit={handleSocialSubmit}
          className="bg-tertiary p-6 rounded-xl mt-8 flex flex-col gap-4"
        >
          <h3 className="text-white font-bold text-lg">
            {editingSocialIndex !== null ? "Edit Link" : "Add New Link"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Platform Name (e.g. GitHub)"
              value={socialForm.name}
              onChange={(e) =>
                setSocialForm({ ...socialForm, name: e.target.value })
              }
              className="bg-black-100 py-3 px-4 rounded-lg text-white outline-none w-full"
            />
            <input
              type="text"
              placeholder="URL"
              value={socialForm.link}
              onChange={(e) =>
                setSocialForm({ ...socialForm, link: e.target.value })
              }
              className="bg-black-100 py-3 px-4 rounded-lg text-white outline-none w-full"
            />
            <input
              type="text"
              placeholder="Icon Class (e.g. fa-brands fa-github)"
              value={socialForm.icon}
              onChange={(e) =>
                setSocialForm({ ...socialForm, icon: e.target.value })
              }
              className="bg-black-100 py-3 px-4 rounded-lg text-white outline-none w-full"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-white text-primary font-bold py-2 px-6 rounded-lg hover:bg-white/90 transition-colors"
            >
              {editingSocialIndex !== null ? "Update" : "Add"}
            </button>
            {editingSocialIndex !== null && (
              <button
                type="button"
                onClick={() => {
                  setEditingSocialIndex(null);
                  setSocialForm({ name: "", link: "", icon: "" });
                }}
                className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {socialLinks &&
            socialLinks.map((link, index) => (
              <div
                key={index}
                className="bg-black-200 p-4 rounded-xl flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center">
                    <i className={`${link.icon} text-white`}></i>
                  </div>
                  <div>
                    <p className="text-white font-bold">{link.name}</p>
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-secondary text-xs hover:text-blue-400 truncate max-w-[150px] block"
                    >
                      {link.link}
                    </a>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditSocial(index, link)}
                    className="text-blue-500 hover:text-blue-400"
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteSocial(index)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default AdminProfile;
