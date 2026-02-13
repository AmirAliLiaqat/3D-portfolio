import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  const menuItems = [
    { path: "/admin/profile", name: "Profile", icon: "fa-user" },
    { path: "/admin/details", name: "Services", icon: "fa-cogs" },
    { path: "/admin/skills", name: "Skills", icon: "fa-code" },
    { path: "/admin/experience", name: "Experience", icon: "fa-building" },
    { path: "/admin/education", name: "Education", icon: "fa-graduation-cap" },
    { path: "/admin/projects", name: "Projects", icon: "fa-briefcase" },
    {
      path: "/admin/testimonials",
      name: "Testimonials",
      icon: "fa-quote-left",
    },
  ];

  return (
    <div className="bg-primary/50 backdrop-blur-md h-screen w-64 fixed left-0 top-0 border-r border-white/10 flex flex-col z-20">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-white font-bold text-xl">Admin Panel</h2>
      </div>

      <div className="flex-1 py-6 flex flex-col gap-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-6 py-3 text-white transition-colors
                ${isActive ? "bg-tertiary border-l-4 border-secondary" : "hover:bg-tertiary/50"}
              `}
            >
              <i className={`fa ${item.icon} w-6 text-center text-lg`}></i>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-6 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 text-red-500 w-full hover:text-red-400 transition-colors"
        >
          <i className="fa fa-sign-out w-6 text-center text-lg"></i>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
