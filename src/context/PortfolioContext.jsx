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
  socialLinks as initialSocialLinks,
} from "../constants";

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [services, setServices] = useState([]);
  const [details, setDetails] = useState(initialDetails);
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to load data safely
  const loadData = (key, initialValue) => {
    try {
      const stored = localStorage.getItem(`portfolio_${key}`);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (e) {
      console.error(`Error loading ${key}`, e);
      return initialValue;
    }
  };

  useEffect(() => {
    setProjects(loadData("projects", initialProjects) || initialProjects);
    setSkills(loadData("skills", initialSkills) || initialSkills);
    setExperience(loadData("experience", initialExperience) || initialExperience);
    setEducation(loadData("education", initialEducation) || initialEducation);
    setTestimonials(loadData("testimonials", initialTestimonials) || initialTestimonials);
    setServices(loadData("services", initialServices) || initialServices);
    setDetails(loadData("details", initialDetails) || initialDetails);
    setSocialLinks(loadData("socialLinks", initialSocialLinks) || initialSocialLinks);
    setLoading(false);
  }, []);

  // Generic save handler
  const saveData = (key, data, setter) => {
    setter(data);
    localStorage.setItem(`portfolio_${key}`, JSON.stringify(data));
  };

  // Projects CRUD
  const addProject = (item) =>
    saveData("projects", [...projects, item], setProjects);
  const updateProject = (index, item) => {
    const updated = [...projects];
    updated[index] = item;
    saveData("projects", updated, setProjects);
  };
  const deleteProject = (index) => {
    saveData(
      "projects",
      projects.filter((_, i) => i !== index),
      setProjects,
    );
  };

  // Skills CRUD
  const addSkill = (item) => saveData("skills", [...skills, item], setSkills);
  const updateSkill = (index, item) => {
    const updated = [...skills];
    updated[index] = item;
    saveData("skills", updated, setSkills);
  };
  const deleteSkill = (index) => {
    saveData(
      "skills",
      skills.filter((_, i) => i !== index),
      setSkills,
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
      setExperience,
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
      setEducation,
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
      setTestimonials,
    );
  };

  // Services CRUD
  const addService = (item) =>
    saveData("services", [...services, item], setServices);
  const updateService = (index, item) => {
    const updated = [...services];
    updated[index] = item;
    saveData("services", updated, setServices);
  };
  const deleteService = (index) => {
    saveData(
      "services",
      services.filter((_, i) => i !== index),
      setServices,
    );
  };

  // Details & Social Links Update
  const updateDetails = (newDetails) => saveData("details", newDetails, setDetails);
  
  const addSocialLink = (item) => saveData("socialLinks", [...socialLinks, item], setSocialLinks);
  const updateSocialLink = (index, item) => {
      const updated = [...socialLinks];
      updated[index] = item;
      saveData("socialLinks", updated, setSocialLinks);
  };
  const deleteSocialLink = (index) => {
      saveData("socialLinks", socialLinks.filter((_, i) => i !== index), setSocialLinks);
  };

  const value = {
    projects,
    addProject,
    updateProject,
    deleteProject,
    skills,
    addSkill,
    updateSkill,
    deleteSkill,
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
    socialLinks,
    addSocialLink,
    updateSocialLink,
    deleteSocialLink,
    loading,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
