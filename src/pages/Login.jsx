import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "../styles";

const Login = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      // Simple hardcoded password for now
      localStorage.setItem("isAuthenticated", "true");
      navigate("/admin/projects");
    } else {
      alert("Invalid password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="bg-tertiary p-8 rounded-2xl shadow-card w-full max-w-md">
        <h2 className={styles.sectionHeadText}>Admin Login</h2>
        <form onSubmit={handleLogin} className="mt-8 flex flex-col gap-6">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="bg-black-100 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <button
            type="submit"
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
