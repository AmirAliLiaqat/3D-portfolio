import { useState } from "react";
import { useLocation } from "react-router-dom";

const WORK_PLATFORMS = [
  {
    name: "Fiverr",
    link: "https://www.fiverr.com/amiraliliaqat/",
    icon: "fa-solid fa-f",
    color: "#1dbf73",
  },
  {
    name: "Upwork",
    link: "https://www.upwork.com/freelancers/~012c5e3e53ccd0b1b9",
    icon: "fa-solid fa-arrow-up-right-dots",
    color: "#14a800",
  },
  {
    name: "Freelancer",
    link: "https://www.freelancer.com/u/amirliaqat2020",
    icon: "fa-solid fa-user-tie",
    color: "#29b2fe",
  },
  {
    name: "Wellfound",
    link: "https://wellfound.com/u/amir-ali-liaqat",
    icon: "fa-solid fa-rocket",
    color: "#f5f5f5",
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
              <i
                className={`${platform.icon} text-sm sm:text-base transition-colors duration-300`}
                style={{ color: isHovered ? "#151030" : platform.color }}
                aria-hidden="true"
              />

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
