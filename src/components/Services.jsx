import { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { usePortfolio } from "../context/PortfolioContext";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const Services = () => {
  const { services = [], skills = [] } = usePortfolio();
  const [activeTab, setActiveTab] = useState("services");

  // Normalize flat services
  const isGroupedServices =
    Array.isArray(services) && services.length > 0 && Array.isArray(services[0]?.items);

  const flatServices = isGroupedServices
    ? services.flatMap((g) => g.items || [])
    : Array.isArray(services)
    ? services
    : [];

  const flatSkills = Array.isArray(skills) ? skills : [];

  // Helper to match category cleanly
  const matchesCategory = (itemCategory, targetCategory) => {
    const cat = (itemCategory || "").toLowerCase();
    const target = targetCategory.toLowerCase();
    if (target === "cloud") return cat.includes("cloud");
    return cat === target || cat.includes(target);
  };

  // Calculate counts per tab
  const getCategoryCount = (category) => {
    if (category === "services") return flatServices.length;
    const countServices = flatServices.filter((s) => matchesCategory(s.category, category)).length;
    const countSkills = flatSkills.filter((sk) => matchesCategory(sk.category, category)).length;
    return countServices + countSkills;
  };

  const tabs = [
    { id: "services", label: "Services", count: getCategoryCount("services") },
    { id: "frontend", label: "Frontend", count: getCategoryCount("frontend") },
    { id: "backend", label: "Backend", count: getCategoryCount("backend") },
    { id: "wordpress", label: "WordPress", count: getCategoryCount("wordpress") },
    { id: "cloud", label: "Cloud Services", count: getCategoryCount("cloud") },
    { id: "productivity", label: "Productivity", count: getCategoryCount("productivity") },
  ];

  // Filter items based on active tab
  const getDisplayedItems = () => {
    if (activeTab === "services") {
      return flatServices.map((s) => ({
        id: s._id || s.id || s.title,
        title: s.title,
        icon: s.icon,
        description: s.description,
        isService: true,
      }));
    }

    const catServices = flatServices
      .filter((s) => matchesCategory(s.category, activeTab))
      .map((s) => ({
        id: s._id || s.id || s.title,
        title: s.title,
        icon: s.icon,
        description: s.description,
        isService: true,
      }));

    const catSkills = flatSkills
      .filter((sk) => matchesCategory(sk.category, activeTab))
      .map((sk) => ({
        id: sk._id || sk.id || sk.name,
        title: sk.name,
        icon: sk.icon,
        isService: false,
      }));

    const combined = [...catServices, ...catSkills];
    return combined;
  };

  const displayedItems = getDisplayedItems();

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>WHAT I OFFER</p>
        <h2 className={styles.sectionHeadText}>Services</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-3 text-secondary text-[16px] sm:text-[17px] max-w-3xl leading-[30px] mb-8"
      >
        I provide a wide range of development, cloud, and productivity services to help bring your
        ideas to life. From pixel-perfect frontends to robust backends, cloud deployments, and
        WordPress solutions.
      </motion.p>

      {/* Filter Tabs with Count Badges */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-12">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm sm:text-base flex items-center gap-2 transition-all duration-300 ${
                isActive
                  ? "bg-[#915eff] text-white shadow-lg shadow-[#915eff]/40 border border-[#915eff]"
                  : "bg-[#1d1836] text-secondary hover:text-white border border-white/10 hover:border-[#915eff]/40"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-white/10 text-secondary"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Services & Skills Grid (5 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {displayedItems.map((item, index) => {
          const isImageIcon =
            typeof item.icon === "string" &&
            (item.icon.startsWith("http") ||
              item.icon.startsWith("/") ||
              item.icon.startsWith("data:"));

          return (
            <motion.div
              key={item.id || `service-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.04, y: -5 }}
              className="relative group rounded-2xl p-[1px] bg-gradient-to-b from-cyan-500/40 via-[#915eff]/30 to-purple-600/40 hover:from-cyan-400 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-cyan-500/5 cursor-pointer"
            >
              <div className="bg-[#151030] rounded-2xl p-6 h-full min-h-[220px] flex flex-col items-center justify-center text-center transition-colors duration-300">
                <div className="w-16 h-16 rounded-2xl bg-tertiary/80 flex items-center justify-center p-3 mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/10 shadow-inner">
                  {isImageIcon ? (
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <i className={`${item.icon || "fa-solid fa-cloud"} text-[#915eff] text-2xl`} />
                  )}
                </div>

                <h3 className="text-white font-bold text-[16px] text-center leading-snug">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default SectionWrapper(Services, "services");
