import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logo } from "../../assets";
import { usePortfolio } from "../../context/PortfolioContext";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { details } = usePortfolio();
  const [collapsed, setCollapsed] = useState(false);

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
    <div
      className={`admin-sidebar h-screen fixed left-0 top-0 flex flex-col z-20 transition-all duration-300 ${collapsed ? "w-20" : "w-[270px]"
        }`}
    >
      {/* Brand Header */}
      <div className="p-5 flex items-center gap-3 border-b border-white/5">
        <Link to="/" className="flex items-center gap-3 flex-1 min-w-0">
          <div className="admin-sidebar-logo w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
            <img src={logo} alt="logo" className="w-7 h-7 object-contain" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h2 className="text-white font-bold text-sm truncate">
                {details?.shortName || "Admin"}
              </h2>
              <p className="text-[#915EFF] text-[10px] font-medium uppercase tracking-wider">
                Dashboard
              </p>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-secondary/50 hover:text-white transition-colors p-1 cursor-pointer"
        >
          <i
            className={`fa fa-${collapsed ? "angles-right" : "angles-left"} text-xs`}
          />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 flex flex-col gap-1 overflow-y-auto px-3">
        <p
          className={`text-secondary/40 text-[10px] font-semibold uppercase tracking-widest mb-2 ${collapsed ? "text-center" : "px-3"
            }`}
        >
          {collapsed ? "•••" : "Navigation"}
        </p>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-nav-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                  ? "admin-nav-active"
                  : "text-secondary/70 hover:text-white"
                } ${collapsed ? "justify-center" : ""}`}
              title={collapsed ? item.name : undefined}
            >
              <i
                className={`fa ${item.icon} text-[13px] ${collapsed ? "" : "w-5 text-center"
                  }`}
              />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-white/5 space-y-2">
        {/* View Site */}
        <Link
          to="/"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-secondary/50 hover:text-[#915EFF] transition-all duration-200 text-sm ${collapsed ? "justify-center" : ""
            }`}
          title="View Site"
        >
          <i className="fa fa-external-link text-xs" />
          {!collapsed && <span>View Site</span>}
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`admin-logout-btn flex items-center gap-3 px-3 py-2.5 rounded-xl w-full transition-all duration-200 text-sm cursor-pointer ${collapsed ? "justify-center" : ""
            }`}
        >
          <i className="fa fa-sign-out text-xs" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
