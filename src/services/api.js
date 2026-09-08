const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "/api");

// Helper for fetch requests
export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("portfolio_admin_token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Remove Content-Type if FormData (e.g. image upload)
  if (options.body instanceof FormData) {
    delete headers["Content-Type"];
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `HTTP Error ${response.status}`);
    }
    return data;
  } catch (error) {
    console.warn(`API Error [${endpoint}]:`, error.message);
    throw error;
  }
};

// API Services object
export const portfolioAPI = {
  // Public Portfolio Data
  getPortfolioData: () => apiRequest("/portfolio"),

  // Contact Form Submission (Nodemailer + DB)
  sendContactInquiry: (contactData) =>
    apiRequest("/contact", {
      method: "POST",
      body: JSON.stringify(contactData),
    }),

  // Admin Authentication
  loginAdmin: (credentials) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  verifyAdminToken: () => apiRequest("/auth/me"),

  // Image Upload to Cloudinary
  uploadImage: (formData) =>
    apiRequest("/upload", {
      method: "POST",
      body: formData,
    }),

  // Admin CRUD
  updateProfile: (profileData) =>
    apiRequest("/admin/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    }),

  updateCompany: (companyData) =>
    apiRequest("/admin/company", {
      method: "PUT",
      body: JSON.stringify(companyData),
    }),

  createProject: (projectData) =>
    apiRequest("/admin/projects", {
      method: "POST",
      body: JSON.stringify(projectData),
    }),

  updateProject: (id, projectData) =>
    apiRequest(`/admin/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(projectData),
    }),

  deleteProject: (id) =>
    apiRequest(`/admin/projects/${id}`, {
      method: "DELETE",
    }),

  createBlog: (blogData) =>
    apiRequest("/admin/blogs", {
      method: "POST",
      body: JSON.stringify(blogData),
    }),

  updateBlog: (id, blogData) =>
    apiRequest(`/admin/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify(blogData),
    }),

  deleteBlog: (id) =>
    apiRequest(`/admin/blogs/${id}`, {
      method: "DELETE",
    }),

  createService: (serviceData) =>
    apiRequest("/admin/services", {
      method: "POST",
      body: JSON.stringify(serviceData),
    }),

  updateService: (id, serviceData) =>
    apiRequest(`/admin/services/${id}`, {
      method: "PUT",
      body: JSON.stringify(serviceData),
    }),

  deleteService: (id) =>
    apiRequest(`/admin/services/${id}`, {
      method: "DELETE",
    }),

  getContactInquiries: () => apiRequest("/admin/contact-inquiries"),
};

// AI Assistant Chat (Groq powered)
export const chatAPI = {
  sendMessage: (messages) =>
    apiRequest("/chat", {
      method: "POST",
      body: JSON.stringify({ messages }),
    }),
};

export default portfolioAPI;
