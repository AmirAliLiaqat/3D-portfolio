/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import {
  projects as initialProjects,
  technologies as initialSkills,
  experiences as initialExperience,
  education as initialEducation,
  testimonials as initialTestimonials,
  services as initialServices,
  details as initialDetails,
  companyDetails as initialCompanyDetails,
  socialLinks as initialSocialLinks,
} from "../mock/index.js";
import { blogs as initialBlogs } from "../mock/blogs.js";
import { portfolioAPI } from "../services/api.js";

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [services, setServices] = useState([]);
  const [details, setDetails] = useState(initialDetails);
  const [companyDetails, setCompanyDetails] = useState(initialCompanyDetails);
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to load cached data safely
  const loadData = (key, initialValue) => {
    try {
      const stored = localStorage.getItem(`portfolio_${key}`);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (e) {
      console.error(`Error loading ${key}`, e);
      return initialValue;
    }
  };

  const fetchBackendData = async () => {
    try {
      setLoading(true);
      const response = await portfolioAPI.getPortfolioData();
      if (response && response.success && response.data) {
        const {
          details: apiDetails,
          companyDetails: apiCompany,
          services: apiServices,
          skills: apiSkills,
          experiences: apiExperiences,
          education: apiEducation,
          projects: apiProjects,
          blogs: apiBlogs,
          testimonials: apiTestimonials,
        } = response.data;

        if (apiDetails) saveData("details", apiDetails, setDetails);
        if (apiCompany) saveData("companyDetails", apiCompany, setCompanyDetails);
        if (apiServices && apiServices.length > 0) saveData("services", apiServices, setServices);
        if (apiSkills && apiSkills.length > 0) saveData("skills", apiSkills, setSkills);
        if (apiExperiences && apiExperiences.length > 0) saveData("experience", apiExperiences, setExperience);
        if (apiEducation && apiEducation.length > 0) saveData("education", apiEducation, setEducation);
        if (apiProjects && apiProjects.length > 0) saveData("projects", apiProjects, setProjects);
        if (apiBlogs && apiBlogs.length > 0) saveData("blogs", apiBlogs, setBlogs);
        if (apiTestimonials && apiTestimonials.length > 0) saveData("testimonials", apiTestimonials, setTestimonials);
      }
    } catch (err) {
      console.warn("Backend API offline or connecting, using database/fallback state:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial state setup from fallback constants/storage
    setProjects(loadData("projects", initialProjects) || initialProjects);
    setBlogs(loadData("blogs", initialBlogs) || initialBlogs);
    setSkills(loadData("skills", initialSkills) || initialSkills);
    setExperience(loadData("experience", initialExperience) || initialExperience);
    setEducation(loadData("education", initialEducation) || initialEducation);
    setTestimonials(loadData("testimonials", initialTestimonials) || initialTestimonials);
    setServices(loadData("services", initialServices) || initialServices);
    setDetails(loadData("details", initialDetails) || initialDetails);
    setCompanyDetails(loadData("companyDetails", initialCompanyDetails) || initialCompanyDetails);
    setSocialLinks(loadData("socialLinks", initialSocialLinks) || initialSocialLinks);

    // Fetch 100% dynamic data from MongoDB Atlas
    fetchBackendData();
  }, []);

  const refreshData = () => fetchBackendData();

  // Save helper
  const saveData = (key, data, setter) => {
    setter(data);
    localStorage.setItem(`portfolio_${key}`, JSON.stringify(data));
  };

  // Projects CRUD
  const addProject = async (item) => {
    try {
      const res = await portfolioAPI.createProject(item);
      if (res && res.data) {
        saveData("projects", [...projects, res.data], setProjects);
        return res.data;
      }
    } catch (e) {
      console.warn("API Error, updating local state:", e.message);
      saveData("projects", [...projects, item], setProjects);
    }
  };

  const updateProject = async (index, item) => {
    try {
      const target = projects[index];
      if (target && target._id) {
        const res = await portfolioAPI.updateProject(target._id, item);
        const updated = [...projects];
        updated[index] = res.data || item;
        saveData("projects", updated, setProjects);
        return;
      }
    } catch (e) {
      console.warn("API Error, updating local state:", e.message);
    }
    const updated = [...projects];
    updated[index] = item;
    saveData("projects", updated, setProjects);
  };

  const deleteProject = async (index) => {
    try {
      const target = projects[index];
      if (target && target._id) {
        await portfolioAPI.deleteProject(target._id);
      }
    } catch (e) {
      console.warn("API Error:", e.message);
    }
    saveData(
      "projects",
      projects.filter((_, i) => i !== index),
      setProjects
    );
  };

  // Blogs CRUD
  const addBlog = async (item) => {
    try {
      const res = await portfolioAPI.createBlog(item);
      if (res && res.data) {
        saveData("blogs", [res.data, ...blogs], setBlogs);
        return res.data;
      }
    } catch (e) {
      saveData("blogs", [item, ...blogs], setBlogs);
    }
  };

  const updateBlog = async (index, item) => {
    try {
      const target = blogs[index];
      if (target && target._id) {
        const res = await portfolioAPI.updateBlog(target._id, item);
        const updated = [...blogs];
        updated[index] = res.data || item;
        saveData("blogs", updated, setBlogs);
        return;
      }
    } catch (e) {
      console.warn("API Error:", e.message);
    }
    const updated = [...blogs];
    updated[index] = item;
    saveData("blogs", updated, setBlogs);
  };

  const deleteBlog = async (index) => {
    try {
      const target = blogs[index];
      if (target && target._id) {
        await portfolioAPI.deleteBlog(target._id);
      }
    } catch (e) {
      console.warn("API Error:", e.message);
    }
    saveData(
      "blogs",
      blogs.filter((_, i) => i !== index),
      setBlogs
    );
  };

  // Services CRUD
  const addService = async (item) => {
    try {
      const res = await portfolioAPI.createService(item);
      if (res && res.data) {
        saveData("services", [...services, res.data], setServices);
        return res.data;
      }
    } catch (e) {
      saveData("services", [...services, item], setServices);
    }
  };

  const updateService = async (index, item) => {
    try {
      const target = services[index];
      if (target && target._id) {
        const res = await portfolioAPI.updateService(target._id, item);
        const updated = [...services];
        updated[index] = res.data || item;
        saveData("services", updated, setServices);
        return;
      }
    } catch (e) {
      console.warn("API Error:", e.message);
    }
    const updated = [...services];
    updated[index] = item;
    saveData("services", updated, setServices);
  };

  const deleteService = async (index) => {
    try {
      const target = services[index];
      if (target && target._id) {
        await portfolioAPI.deleteService(target._id);
      }
    } catch (e) {
      console.warn("API Error:", e.message);
    }
    saveData(
      "services",
      services.filter((_, i) => i !== index),
      setServices
    );
  };

  // Experience CRUD
  const addExperience = (item) =>
    saveData("experience", [...experience, item], setExperience);
  const updateExperience = (index, item) => {
    const updated = [...experience];
    updated[index] = item;
    saveData("experience", updated, setExperience);
  };
  const deleteExperience = (index) => {
    saveData(
      "experience",
      experience.filter((_, i) => i !== index),
      setExperience
    );
  };

  // Education CRUD
  const addEducation = (item) =>
    saveData("education", [...education, item], setEducation);
  const updateEducation = (index, item) => {
    const updated = [...education];
    updated[index] = item;
    saveData("education", updated, setEducation);
  };
  const deleteEducation = (index) => {
    saveData(
      "education",
      education.filter((_, i) => i !== index),
      setEducation
    );
  };

  // Testimonials CRUD
  const addTestimonial = (item) =>
    saveData("testimonials", [...testimonials, item], setTestimonials);
  const updateTestimonial = (index, item) => {
    const updated = [...testimonials];
    updated[index] = item;
    saveData("testimonials", updated, setTestimonials);
  };
  const deleteTestimonial = (index) => {
    saveData(
      "testimonials",
      testimonials.filter((_, i) => i !== index),
      setTestimonials
    );
  };

  // Details & Company Updates
  const updateDetails = async (newDetails) => {
    try {
      const res = await portfolioAPI.updateProfile(newDetails);
      if (res && res.data) {
        saveData("details", res.data, setDetails);
        return;
      }
    } catch (e) {
      console.warn("API Error:", e.message);
    }
    saveData("details", newDetails, setDetails);
  };

  const updateCompanyDetails = async (newCompanyDetails) => {
    try {
      const res = await portfolioAPI.updateCompany(newCompanyDetails);
      if (res && res.data) {
        saveData("companyDetails", res.data, setCompanyDetails);
        return;
      }
    } catch (e) {
      console.warn("API Error:", e.message);
    }
    saveData("companyDetails", newCompanyDetails, setCompanyDetails);
  };

  const value = {
    projects,
    addProject,
    updateProject,
    deleteProject,
    blogs,
    addBlog,
    updateBlog,
    deleteBlog,
    skills,
    experience,
    addExperience,
    updateExperience,
    deleteExperience,
    education,
    addEducation,
    updateEducation,
    deleteEducation,
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    services,
    addService,
    updateService,
    deleteService,
    details,
    updateDetails,
    companyDetails,
    updateCompanyDetails,
    socialLinks,
    loading,
    refreshData,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
