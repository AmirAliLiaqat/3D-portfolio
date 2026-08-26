import { useLocation } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";

const FloatingSocials = () => {
  const location = useLocation();
  const { companyDetails } = usePortfolio();

  // Hide floating bar on admin pages
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  // Fallback social list
  const defaultSocials = [
    {
      name: "GitHub",
      link: "https://github.com/AmirAliLiaqat",
      icon: "fa-brands fa-github",
      color: "#FFFFFF",
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/company/designstodeploy",
      icon: "fa-brands fa-linkedin",
      color: "#0A66C2",
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/designs.to.deploy/",
      icon: "fa-brands fa-instagram",
      color: "#E4405F",
    },
    {
      name: "Facebook",
      link: "https://www.facebook.com/designstodeploy",
      icon: "fa-brands fa-facebook",
      color: "#1877F2",
    },
    {
      name: "WhatsApp",
      link: "https://wa.me/923090886518",
      icon: "fa-brands fa-whatsapp",
      color: "#25D366",
    },
    {
      name: "Email",
      link: "mailto:designstodeploy@gmail.com",
      icon: "fa-solid fa-envelope",
      color: "#EA4335",
    },
  ];

  const socialList =
    companyDetails?.socials && companyDetails.socials.length > 0
      ? companyDetails.socials
      : defaultSocials;

  return (
    <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3">
      <div className="bg-[#151030]/85 backdrop-blur-xl border border-white/10 p-2 sm:p-2.5 rounded-full shadow-2xl shadow-[#915eff]/20 flex flex-col gap-3 items-center transition-all duration-300 hover:border-[#915eff]/50">
        {socialList.map((social, index) => (
          <a
            key={social.name || index}
            href={social.link}
            target="_blank"
            rel="noreferrer"
            className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-tertiary/90 hover:bg-[#915eff] flex items-center justify-center border border-white/10 hover:border-[#915eff] transition-all duration-300 hover:scale-110 shadow-md"
            aria-label={social.name}
          >
            <i
              className={`${social.icon || "fa-solid fa-link"} text-sm sm:text-base group-hover:text-white transition-colors duration-300`}
              style={{ color: social.color || "#915EFF" }}
            />

            {/* Hover Tooltip on Left */}
            <span className="absolute right-14 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 bg-[#151030] text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl border border-white/10 flex items-center gap-1.5">
              <span>{social.name}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FloatingSocials;
