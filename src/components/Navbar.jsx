import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../mock/index.js";
import { usePortfolio } from "../context/PortfolioContext";
import { logo, menu, close } from "../assets";
import { CustomButton } from "./styled";

const Navbar = () => {
  const location = useLocation();
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { details, socialLinks } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Do not render top Navbar in Admin dashboard pages
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const githubLink =
    socialLinks.find((l) => l.name === "GitHub")?.link ||
    "https://github.com/AmirAliLiaqat";
  const linkedinLink =
    socialLinks.find((l) => l.name === "LinkedIn")?.link ||
    "https://www.linkedin.com/in/amir-ali-liaqat";

  const filteredNavLinks = navLinks.filter((link) => link.id !== "company");

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 transition-all duration-300 ${
        scrolled
          ? "bg-primary/90 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            {details.name} &nbsp;
          </p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {filteredNavLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              {link.id === "blogs" ? (
                <Link to="/blogs">{link.title}</Link>
              ) : (
                <Link to={`/#${link.id}`}>{link.title}</Link>
              )}
            </li>
          ))}
        </ul>

        <div>
          <CustomButton
            className="github-btn"
            href={githubLink}
            target="_blank"
          >
            Github
          </CustomButton>

          <CustomButton
            className="linkedin-btn"
            href={linkedinLink}
            target="_blank"
          >
            Linkedin
          </CustomButton>
        </div>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {filteredNavLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-white" : "text-secondary"
                  } font-poppins font-medium cursor-pointer text-[16px]`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(link.title);
                  }}
                >
                  {link.id === "blogs" ? (
                    <Link to="/blogs">{link.title}</Link>
                  ) : (
                    <Link to={`/#${link.id}`}>{link.title}</Link>
                  )}
                </li>
              ))}
              <li>
                <a
                  href={githubLink}
                  target="_blank"
                  className={`${
                    active === "Github" ? "text-white" : "text-secondary"
                  } font-poppins font-medium cursor-pointer text-[16px]`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive("Github");
                  }}
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  href={linkedinLink}
                  target="_blank"
                  className={`${
                    active === "Linkedin" ? "text-white" : "text-secondary"
                  } font-poppins font-medium cursor-pointer text-[16px]`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive("Linkedin");
                  }}
                >
                  Linkedin
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
