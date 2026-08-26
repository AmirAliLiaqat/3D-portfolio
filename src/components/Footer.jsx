import { useState } from "react";
import { navLinks } from "../mock/index.js";
import { usePortfolio } from "../context/PortfolioContext";
import { Link } from "react-router-dom";
import { logo } from "../assets";

const Footer = () => {
  const [active, setActive] = useState("");
  const { details, socialLinks } = usePortfolio();
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    {
      icon: "fa-solid fa-envelope",
      label: "Email",
      value: "amirliaqat2020@gmail.com",
      link: "mailto:amirliaqat2020@gmail.com",
    },
    {
      icon: "fa-solid fa-phone",
      label: "Phone",
      value: "+92 309 0886518",
      link: "tel:+923090886518",
    },
    {
      icon: "fa-solid fa-location-dot",
      label: "Location",
      value: "Lahore, Pakistan",
      link: null,
    },
    {
      icon: "fa-brands fa-whatsapp",
      label: "WhatsApp",
      value: "+92 309 0886518",
      link: "https://web.whatsapp.com/send?phone=923090886518",
    },
  ];

  return (
    <footer className="relative w-full overflow-hidden">
      {/* Top gradient divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#915EFF]/50 to-transparent" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-16 pt-16 pb-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand & Description */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-3 mb-5"
              onClick={() => {
                setActive("");
                window.scrollTo(0, 0);
              }}
            >
              <img
                src={logo}
                alt="logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-white text-xl font-bold">
                {details.shortName || details.name}
              </span>
            </Link>
            <p className="text-secondary/70 text-sm leading-relaxed mb-6">
              Passionate developer crafting exceptional web experiences with 4+
              years of expertise in modern frontend and full-stack technologies.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((socialLink, index) => (
                <a
                  href={socialLink.link}
                  key={index}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-icon w-10 h-10 rounded-lg flex items-center justify-center text-secondary/60 text-sm"
                  title={socialLink.name}
                >
                  <i className={socialLink.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#915EFF]" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`${active === link.title
                        ? "text-[#915EFF]"
                        : "text-secondary/60"
                      } hover:text-[#915EFF] text-sm transition-all duration-300 flex items-center gap-2 group`}
                    onClick={() => setActive(link.title)}
                  >
                    <span className="w-0 group-hover:w-3 h-[1px] bg-[#915EFF] transition-all duration-300" />
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#915EFF]" />
              Services
            </h3>
            <ul className="space-y-3">
              {[
                "Web Designing",
                "Frontend Development",
                "Backend Development",
                "MERN Stack Development",
                "WordPress Development",
                "App Development",
              ].map((service, index) => (
                <li key={index}>
                  <span className="text-secondary/60 text-sm flex items-center gap-2 group hover:text-[#915EFF] transition-colors duration-300 cursor-default">
                    <span className="w-0 group-hover:w-3 h-[1px] bg-[#915EFF] transition-all duration-300" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#915EFF]" />
              Contact Details
            </h3>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <div className="footer-contact-icon w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i
                      className={`${item.icon} text-[#915EFF] text-sm`}
                    />
                  </div>
                  <div>
                    <p className="text-secondary/50 text-xs uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    {item.link ? (
                      <a
                        href={item.link}
                        target={item.link.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="text-white/80 text-sm hover:text-[#915EFF] transition-colors duration-300"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white/80 text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 mb-6 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-secondary/40 text-sm">
            &copy; {currentYear}{" "}
            <span className="text-[#915EFF]/70">{details.name}</span>. All
            rights reserved.
          </p>

          <div className="flex items-center gap-1 text-secondary/40 text-sm">
            <span>Built with</span>
            <i className="fa-solid fa-heart text-[#915EFF] text-xs mx-1 animate-pulse" />
            <span>using React & Three.js</span>
          </div>

          {/* Back to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="footer-back-to-top w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
            title="Back to top"
          >
            <i className="fa-solid fa-arrow-up text-sm text-[#915EFF]" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
