import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { usePortfolio } from "../context/PortfolioContext";

const Login = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();
  const { details } = usePortfolio();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate a brief loading delay for UX feel
    setTimeout(() => {
      if (password === "Secureamir2023!") {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/admin/profile");
      } else {
        setError("Invalid credentials. Please try again.");
        setShake(true);
        setTimeout(() => setShake(false), 600);
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="login-page flex items-center justify-center min-h-screen bg-primary relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-150px] right-[-100px] w-[500px] h-[500px] bg-[#915EFF] rounded-full opacity-[0.03] blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-200px] left-[-150px] w-[600px] h-[600px] bg-[#6B3FA0] rounded-full opacity-[0.04] blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(145, 94, 255, 0.4) 1px, transparent 0)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating accents */}
      <div className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-[#915EFF]/30 login-float-1" />
      <div className="absolute top-[60%] right-[20%] w-3 h-3 rounded-full bg-[#915EFF]/20 login-float-2" />
      <div className="absolute bottom-[25%] left-[25%] w-1.5 h-1.5 rounded-full bg-[#915EFF]/25 login-float-3" />

      {/* Login Card */}
      <div
        className={`login-card relative w-full max-w-[420px] mx-4 ${shake ? "login-shake" : ""
          }`}
      >
        {/* Top gradient border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#915EFF]/50 to-transparent rounded-t-2xl" />

        <div className="p-8 sm:p-10">
          {/* Logo & Brand */}
          <div className="flex flex-col items-center mb-8">
            <div className="login-logo-ring w-20 h-20 rounded-2xl flex items-center justify-center mb-5">
              <img
                src={logo}
                alt="logo"
                className="w-11 h-11 object-contain"
              />
            </div>
            <h1 className="text-white font-bold text-2xl">Welcome Back</h1>
            <p className="text-secondary/50 text-sm mt-2 text-center">
              Sign in to{" "}
              <span className="text-[#915EFF]">
                {details?.shortName || "Admin"}
              </span>{" "}
              Dashboard
            </p>
          </div>

          {/* Error Toast */}
          {error && (
            <div className="login-error mb-6 p-3.5 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-circle-exclamation text-red-400 text-sm" />
              </div>
              <span className="text-red-300 text-sm">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <label className="flex flex-col gap-2">
              <span className="text-white/70 font-medium text-sm flex items-center gap-2">
                <i className="fa-solid fa-lock text-[#915EFF] text-xs" />
                Password
              </span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  required
                  className="login-input w-full py-4 px-5 pr-12 text-white rounded-xl outline-none font-medium text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/40 hover:text-[#915EFF] transition-colors cursor-pointer"
                >
                  <i
                    className={`fa-solid fa-${showPassword ? "eye-slash" : "eye"
                      } text-sm`}
                  />
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={loading || !password}
              className="login-submit-btn py-4 px-8 w-full rounded-xl text-white font-semibold text-[15px] flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-arrow-right-to-bracket" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/10 to-transparent" />
            <div className="flex items-center gap-2 text-secondary/30 text-xs mt-1">
              <i className="fa-solid fa-shield-halved text-[#915EFF]/40" />
              <span>Secured admin access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
