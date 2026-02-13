import { Outlet, Navigate } from "react-router-dom";
import { StarsCanvas } from "../components/canvas";
import Sidebar from "../components/admin/Sidebar";

const AdminLayout = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) return <Navigate to="/admin" />;

  return (
    <div className="flex h-screen bg-primary relative z-0">
      <StarsCanvas />
      <Sidebar />
      <div className="flex-1 ml-64 overflow-y-auto p-8 relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
