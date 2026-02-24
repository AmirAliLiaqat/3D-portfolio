import { Outlet, Navigate, useLocation } from "react-router-dom";
import { StarsCanvas } from "../components/canvas";
import Sidebar from "../components/admin/Sidebar";
import { usePortfolio } from "../context/PortfolioContext";

const AdminLayout = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const { details } = usePortfolio();
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/admin" />;

  // Derive page title from URL
  const pathSegment = location.pathname.split("/").pop();
  const pageTitle =
    pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1).replace(/-/g, " ");

  return (
    <div className="flex h-screen bg-primary relative z-0">
      <StarsCanvas />
      <Sidebar />

      {/* Main Content Area */}
      <div className="admin-main-content flex-1 ml-[270px] overflow-y-auto relative z-10 transition-all duration-300">
        {/* Top Header Bar */}
        <div className="admin-top-bar sticky top-0 z-30 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-xl">{pageTitle}</h1>
            <p className="text-secondary/40 text-xs mt-0.5">
              Manage your portfolio content
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick stats */}
            <div className="admin-header-badge px-4 py-2 rounded-xl flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#38ef7d] animate-pulse" />
              <span className="text-secondary/60 text-xs">Live</span>
            </div>

            {/* Admin avatar */}
            <div className="flex items-center gap-3">
              <div className="admin-avatar w-9 h-9 rounded-xl flex items-center justify-center">
                <span className="text-[#915EFF] font-bold text-sm">
                  {(details?.shortName || "A").charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8 pt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
