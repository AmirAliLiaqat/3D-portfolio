import { useState } from "react";
import { useLocation } from "react-router-dom";

// Official brand icons rendered as inline SVG (original brand artwork)
const BrandIcon = ({ label, children }) => (
  <span className="w-[18px] h-[18px] sm:w-5 sm:h-5 block" aria-hidden="true">
    {children}
  </span>
);

const WORK_PLATFORMS = [
  {
    name: "Fiverr",
    link: "https://www.fiverr.com/amiraliliaqat/",
    color: "#1dbf73",
    icon: (
      <BrandIcon label="Fiverr">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
          <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.83-.487l1.425.4c-.351.848-1.22 1.364-2.255 1.364-1.748 0-2.549-1.355-2.549-2.515 0-1.14.703-2.505 2.45-2.505 1.856 0 2.471 1.384 2.471 2.408 0 .224-.01.37-.02.477zm-1.562-.945c-.04-.42-.342-.81-.889-.81-.508 0-.81.225-.908.81h1.797zM7.508 15.44h1.416l1.767-4.874h-1.62l-.86 2.837-.878-2.837H5.72l1.787 4.874zm-6.6 0H2.51v-3.558h1.524v3.558h1.591v-4.874H2.51v-.302c0-.332.235-.536.606-.536h.918V8.412H2.85c-1.162 0-1.943.712-1.943 1.755v.4H0v1.316h.908v3.558z" />
        </svg>
      </BrandIcon>
    ),
  },
  {
    name: "Upwork",
    link: "https://www.upwork.com/freelancers/~012c5e3e53ccd0b1b9",
    color: "#6fda44",
    icon: (
      <BrandIcon label="Upwork">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
          <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
        </svg>
      </BrandIcon>
    ),
  },
  {
    name: "Freelancer",
    link: "https://www.freelancer.com/u/amirliaqat2020",
    color: "#29b2fe",
    icon: (
      <BrandIcon label="Freelancer">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
          <path d="M14.096 3.076l1.634 2.292L24 3.076M5.503 20.924l4.474-4.374-2.692-2.89m6.133-10.584L11.027 5.23l4.022.15M4.124 3.077l.857 1.76 4.734.294m-3.058 7.072l3.497-6.522L0 5.13m7.064 7.485l3.303 3.548 3.643-3.57 1.13-6.652-4.439-.228Z" />
        </svg>
      </BrandIcon>
    ),
  },
  {
    name: "Wellfound",
    link: "https://wellfound.com/u/amir-ali-liaqat",
    color: "#f5f5f5",
    icon: (
      <BrandIcon label="Wellfound">
        <svg viewBox="154.5 178.0 115.2 72.2" fill="currentColor" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
          <path d="m 178.8,249 -21.1,-68 h 19.6 l 12.5,48.9 13.5,-48.9 H 223 L 236.5,229.9 249,181 h 19.6 l -21.4,68 H 226.3 L 213.1,199.9 199.8,249 Z" />
        </svg>
      </BrandIcon>
    ),
  },
];

const FloatingWorkPlatforms = () => {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed left-2 sm:left-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center">
      <div className="bg-[#151030]/85 backdrop-blur-xl border border-white/10 p-2 sm:p-2.5 rounded-full shadow-2xl flex flex-col gap-2.5 sm:gap-3 items-center transition-all duration-300">
        {WORK_PLATFORMS.map((platform, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <a
              key={platform.name}
              href={platform.link}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all duration-300 hover:scale-110 shadow-md"
              style={{
                backgroundColor: isHovered
                  ? platform.color
                  : "rgba(21, 16, 48, 0.8)",
                borderColor: isHovered
                  ? platform.color
                  : "rgba(255, 255, 255, 0.15)",
                boxShadow: isHovered
                  ? `0 0 16px ${platform.color}80, 0 4px 12px rgba(0,0,0,0.4)`
                  : "0 2px 5px rgba(0,0,0,0.2)",
              }}
              aria-label={`Visit ${platform.name} profile`}
            >
              <span
                className="transition-colors duration-300"
                style={{ color: isHovered ? "#151030" : platform.color }}
              >
                {platform.icon}
              </span>

              <span className="absolute left-12 sm:left-14 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 bg-[#151030]/95 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl border border-white/10 flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: platform.color }}
                />
                <span>{platform.name}</span>
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default FloatingWorkPlatforms;
