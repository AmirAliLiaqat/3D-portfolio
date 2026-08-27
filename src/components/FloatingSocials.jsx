import { useState } from "react";
import { useLocation } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";

const FloatingSocials = () => {
  const location = useLocation();
  const { socialLinks } = usePortfolio();
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
      icon: "fa-brands fa-linkedin-in",
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
      icon: "fa-brands fa-facebook-f",
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
    socialLinks && socialLinks.length > 0
      ? socialLinks
      : defaultSocials;

  const getBrandColor = (social) => {
    if (social.color && social.color.trim() !== "") return social.color;
    const name = (social.name || "").toLowerCase();
    if (name.includes("github")) return "#FFFFFF";
    if (name.includes("linkedin")) return "#0A66C2";
    if (name.includes("instagram")) return "#E4405F";
    if (name.includes("facebook")) return "#1877F2";
    if (name.includes("whatsapp")) return "#25D366";
    if (name.includes("email") || name.includes("mail")) return "#EA4335";
    if (name.includes("twitter") || name.includes("x")) return "#1DA1F2";
    if (name.includes("youtube")) return "#FF0000";
    return "#915EFF";
  };

  const isLightColor = (hex) => {
    if (!hex) return false;
    const cleanHex = hex.replace("#", "");
    if (cleanHex.length !== 6 && cleanHex.length !== 3) return false;
    let r, g, b;
    if (cleanHex.length === 3) {
      r = parseInt(cleanHex[0] + cleanHex[0], 16);
      g = parseInt(cleanHex[1] + cleanHex[1], 16);
      b = parseInt(cleanHex[2] + cleanHex[2], 16);
    } else {
      r = parseInt(cleanHex.substring(0, 2), 16);
      g = parseInt(cleanHex.substring(2, 4), 16);
      b = parseInt(cleanHex.substring(4, 6), 16);
    }
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 180;
  };

  return (
    <div className="fixed right-2 sm:right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center">
      <div className="bg-[#151030]/85 backdrop-blur-xl border border-white/10 p-2 sm:p-2.5 rounded-full shadow-2xl flex flex-col gap-2.5 sm:gap-3 items-center transition-all duration-300">
        {socialList.map((social, index) => {
          const brandColor = getBrandColor(social);
          const isHovered = hoveredIndex === index;
          const lightBg = isLightColor(brandColor);

          return (
            <a
              key={social.name || index}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all duration-300 hover:scale-110 shadow-md"
              style={{
                backgroundColor: isHovered ? brandColor : "rgba(21, 16, 48, 0.8)",
                borderColor: isHovered ? brandColor : "rgba(255, 255, 255, 0.15)",
                boxShadow: isHovered
                  ? `0 0 16px ${brandColor}80, 0 4px 12px rgba(0,0,0,0.4)`
                  : "0 2px 5px rgba(0,0,0,0.2)",
              }}
              aria-label={social.name}
            >
              <i
                className={`${social.icon || "fa-solid fa-link"} text-sm sm:text-base transition-colors duration-300`}
                style={{
                  color: isHovered
                    ? lightBg
                      ? "#151030"
                      : "#ffffff"
                    : brandColor,
                }}
              />

              {/* Hover Tooltip on Left */}
              <span className="absolute right-12 sm:right-14 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 bg-[#151030]/95 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl border border-white/10 flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: brandColor }}
                />
                <span>{social.name}</span>
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default FloatingSocials;
