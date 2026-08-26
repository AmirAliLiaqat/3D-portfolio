/* eslint-disable react-refresh/only-export-components */
import { motion } from "framer-motion";
import { styles } from "../styles";
import { companyDetails } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const Company = () => {
  return (
    <>
      <div id="company-section" />
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Software Agency & IT Solutions</p>
        <h2 className={styles.sectionHeadText}>
          {companyDetails.name}<span className="text-[#915EFF]">.</span>
        </h2>
      </motion.div>

      {/* Main Showcase Hero Banner */}
      <motion.div
        variants={fadeIn("up", "spring", 0.2, 0.75)}
        className="mt-8 relative rounded-3xl p-[1px] overflow-hidden bg-gradient-to-r from-[#915EFF]/40 via-purple-500/20 to-blue-500/40"
      >
        <div className="bg-tertiary/95 backdrop-blur-xl rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row gap-8 items-center justify-between">
          {/* Company Banner / Logo Container */}
          <div className="w-full lg:w-5/12 flex flex-col items-center justify-center p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
            <div className="relative group overflow-hidden rounded-xl w-full flex items-center justify-center p-3">
              <img
                src={companyDetails.logoBanner}
                alt={companyDetails.name}
                className="max-h-24 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Tagline Badge */}
            <div className="mt-3 px-4 py-1.5 rounded-full bg-[#915EFF]/15 border border-[#915EFF]/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#915EFF] animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-slate-800">
                {companyDetails.tagline}
              </span>
            </div>
          </div>

          {/* Company Details & Description */}
          <div className="w-full lg:w-7/12 flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 p-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-md">
                <img
                  src={companyDetails.logoSquare}
                  alt="Logo Icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-white text-2xl font-bold">
                  {companyDetails.name}
                </h3>
                <p className="text-secondary text-xs flex items-center gap-2">
                  <i className="fa-solid fa-location-dot text-[#915EFF]" />
                  {companyDetails.location}
                </p>
              </div>
            </div>

            <p className="text-secondary text-[15px] sm:text-[16px] leading-[26px] mt-3">
              {companyDetails.fullDescription}
            </p>

            {/* Quick Contact & Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={companyDetails.website}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#915EFF] to-indigo-600 hover:from-indigo-600 hover:to-[#915EFF] text-white font-medium text-sm flex items-center gap-2 transition-all duration-300 shadow-lg shadow-[#915EFF]/25 hover:scale-[1.02]"
              >
                <i className="fa-solid fa-globe text-sm" />
                Visit Website
              </a>

              <a
                href={`mailto:${companyDetails.email}`}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm flex items-center gap-2 border border-white/15 transition-all duration-300 hover:scale-[1.02]"
              >
                <i className="fa-solid fa-envelope text-[#915EFF]" />
                {companyDetails.email}
              </a>

              <a
                href={`tel:${companyDetails.phone}`}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm flex items-center gap-2 border border-white/15 transition-all duration-300 hover:scale-[1.02]"
              >
                <i className="fa-solid fa-phone text-green-400" />
                {companyDetails.phone}
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4 Pillars Grid Cards */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {companyDetails.pillars.map((pillar, index) => (
          <motion.div
            key={pillar.title}
            variants={fadeIn("up", "spring", index * 0.15 + 0.3, 0.75)}
            className="group relative rounded-2xl p-[1px] overflow-hidden"
          >
            {/* Gradient border effect */}
            <div
              className={`absolute inset-0 rounded-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-300 bg-gradient-to-br ${pillar.gradient}`}
            />

            {/* Inner Card Content */}
            <div className="relative bg-tertiary/95 rounded-2xl p-6 h-full flex flex-col justify-between transition-transform duration-300 group-hover:-translate-y-1">
              <div>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${pillar.gradient} text-white shadow-md`}
                >
                  <i className={`${pillar.icon} text-xl`} />
                </div>
                <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                  {pillar.title}
                </h4>
                <p className="text-secondary/80 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Social Media & Official Channels */}
      <motion.div
        variants={fadeIn("up", "tween", 0.5, 0.75)}
        className="mt-10 p-6 rounded-2xl bg-tertiary/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div>
          <h4 className="text-white text-lg font-semibold flex items-center gap-2">
            <i className="fa-solid fa-share-nodes text-[#915EFF]" />
            Connect With Designs To Deploy
          </h4>
          <p className="text-secondary text-sm">
            Follow our company accounts across platforms to view our latest projects and updates.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {companyDetails.socials.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              title={social.name}
              className="px-4 py-2 rounded-xl bg-primary/80 hover:bg-primary border border-white/10 hover:border-[#915EFF]/50 text-white text-sm font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105"
            >
              <i className={`${social.icon} text-base`} style={{ color: social.color }} />
              <span>{social.name}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Company, "company");
