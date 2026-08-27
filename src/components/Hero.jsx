/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { usePortfolio } from "../context/PortfolioContext";
import { profilePic } from "../assets";
import About from "./About";

const Hero = () => {
  const { details, socialLinks } = usePortfolio();
  const designations = details.designations || [];

  // Typewriter effect
  const [displayText, setDisplayText] = useState("");
  const [designationIndex, setDesignationIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (designations.length === 0) return;

    const currentDesignation = designations[designationIndex];
    let timeout;

    if (!isDeleting) {
      if (displayText.length < currentDesignation.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentDesignation.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        setIsDeleting(false);
        setDesignationIndex((prev) => (prev + 1) % designations.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, designationIndex, designations]);

  const stats = [
    { value: "4+", label: "Years Experience" },
    { value: "50+", label: "Projects Completed" },
    { value: "20+", label: "Technologies" },
  ];

  return (
    <section
      className="relative w-full min-h-screen mx-auto overflow-hidden"
      id="about"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-10 w-72 h-72 bg-[#915EFF] rounded-full opacity-5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-[#6B3FA0] rounded-full opacity-5 blur-3xl pointer-events-none" />

      {/* Main Hero Content */}
      <div
        className={`max-w-7xl mx-auto ${styles.paddingX} flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-5 pt-24 lg:pt-28`}
      >
        {/* Left Content */}
        <div className="flex flex-row items-start gap-5 flex-1">
          {/* Decorative Line */}
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="w-5 h-5 rounded-full bg-[#915EFF] shadow-lg shadow-[#915EFF]/30" />
            <div className="w-1 sm:h-80 h-40 violet-gradient" />
          </div>

          {/* Text Content */}
          <div className="hero-animate-in flex-1">
            {/* Badge */}
            <div>
              <span className="hero-badge inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                ✨ Available for Freelance
              </span>
            </div>

            {/* Name */}
            <div>
              <h1 className={`${styles.heroHeadText} text-white`}>
                Hi, I'm{" "}
                <span className="text-[#915EFF] hero-glow-text hero-gradient-underline">
                  {details.shortName}
                </span>
              </h1>
            </div>

            {/* Typewriter Designations */}
            {designations.length > 0 && (
              <div
                className="mt-4 flex items-center gap-2"
                style={{ minHeight: "2.2em" }}
              >
                <span className="text-secondary text-lg sm:text-xl">
                  I'm a
                </span>
                <span className="text-[#915EFF] font-bold lg:text-[30px] sm:text-[26px] text-[20px] hero-glow-text">
                  {displayText}
                  <span className="typewriter-cursor text-white/80">|</span>
                </span>
              </div>
            )}

            {/* Description */}
            <div>
              <p className="mt-4 text-[#dfd9ff]/80 font-normal text-[15px] sm:text-[17px] leading-[28px] max-w-xl">
                {details.description}
              </p>
            </div>

            {/* CTA Buttons & Social Links */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex gap-3">
                <a
                  href="https://drive.google.com/file/d/1G89TtkNx5jTJzqQU6g-l6X4GCH-u0nou/view?usp=drive_link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="hero-btn-primary px-6 py-3 rounded-xl font-semibold text-[15px] flex items-center gap-2 cursor-pointer">
                    <i className="fa-solid fa-file-arrow-down" />
                    View Resume
                  </button>
                </a>
                <a href="#contact">
                  <button className="hero-btn-secondary px-6 py-3 rounded-xl font-semibold text-[15px] flex items-center gap-2 cursor-pointer">
                    <i className="fa-solid fa-paper-plane" />
                    Contact Me
                  </button>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4">
              <div className="w-8 h-[1px] bg-secondary/30" />
              {socialLinks.slice(0, 5).map((link, index) => (
                <a
                  key={index}
                  href={link.link}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-social-icon text-secondary/70 text-lg"
                  title={link.name}
                >
                  <i className={link.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content - Profile Image */}
        <div className="flex-shrink-0 hero-float relative">
          <div className="relative">
            {/* Glowing background */}
            <div className="absolute inset-0 rounded-full bg-[#915EFF]/20 blur-2xl scale-110" />

            {/* Profile Image with animated ring */}
            <div
              className="hero-profile-ring rounded-full overflow-hidden relative z-10 w-[260px] h-[260px] xs:w-[300px] xs:h-[300px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px]"
            >
              <img
                src={details.profileImage || profilePic}
                alt={details.name || "profile"}
                className="w-full h-full object-cover rounded-full"
                style={{ border: "3px solid #151030" }}
              />
            </div>

            {/* Floating accent dots */}
            <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-[#915EFF] shadow-lg shadow-[#915EFF]/40 z-20" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-[#c084fc] shadow-lg shadow-[#c084fc]/40 z-20" />
            <div className="absolute top-1/2 -right-5 w-3 h-3 rounded-full bg-[#6B3FA0] z-20" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className={`max-w-7xl mx-auto ${styles.paddingX} mt-16 lg:mt-20`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="grid grid-cols-3 gap-4 max-w-xl"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="hero-stat-card rounded-xl p-4 text-center"
            >
              <h3 className="text-[#915EFF] font-bold text-2xl sm:text-3xl hero-glow-text">
                {stat.value}
              </h3>
              <p className="text-secondary/70 text-xs sm:text-sm mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="w-full flex justify-center mt-12">
        <a href="#about-section">
          <div className="w-[35px] h-[64px] rounded-3xl border-2 border-secondary/30 flex justify-center items-start p-2">
            <div className="scroll-indicator w-3 h-3 rounded-full bg-secondary" />
          </div>
        </a>
      </div>

      {/* About Section */}
      <About />
    </section>
  );
};

export default Hero;
