import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PortfolioProvider } from "./context/PortfolioContext";
import { Navbar } from "./components";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminProjectForm from "./pages/admin/AdminProjectForm";
import AdminSkills from "./pages/admin/AdminSkills";
import AdminExperience from "./pages/admin/AdminExperience";
import AdminEducation from "./pages/admin/AdminEducation";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminDetails from "./pages/admin/AdminDetails";
import AdminCompany from "./pages/admin/AdminCompany";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminBlogForm from "./pages/admin/AdminBlogForm";
import AdminProfile from "./pages/admin/AdminProfile";
import AllProjects from "./pages/AllProjects";
import ProjectDetails from "./pages/ProjectDetails";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import FloatingSocials from "./components/FloatingSocials";
import AIAssistant from "./components/AIAssistant";

const App = () => {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <Navbar />
        <FloatingSocials />
        <AIAssistant />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="profile" element={<AdminProfile />} />
            <Route path="company" element={<AdminCompany />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="projects/add" element={<AdminProjectForm />} />
            <Route path="projects/edit/:id" element={<AdminProjectForm />} />

            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="blogs/add" element={<AdminBlogForm />} />
            <Route path="blogs/edit/:id" element={<AdminBlogForm />} />

            <Route path="skills" element={<AdminSkills />} />
            <Route path="experience" element={<AdminExperience />} />
            <Route path="education" element={<AdminEducation />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="details" element={<AdminDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
  );
};

export default App;
