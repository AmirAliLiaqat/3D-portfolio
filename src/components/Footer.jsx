import { useState } from "react";
import { navLinks } from "../constants";
import { usePortfolio } from "../context/PortfolioContext";
import {
  Copyright,
  FooterContainer,
  FooterWrapper,
  SocialMediaIcons,
} from "./styled";
import { Link } from "react-router-dom";
import { logo } from "../assets";

const Footer = () => {
  const [active, setActive] = useState("");
  const { details, socialLinks } = usePortfolio();
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterWrapper>
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[30px] m-4 sm:m-2 font-bold cursor-pointer flex">
            {details.name} &nbsp;
          </p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
        <SocialMediaIcons>
          {socialLinks.map((socialLink, index) => (
            <a
              href={socialLink.link}
              key={index}
              target="_blank"
              rel="noreferrer"
              className="w-15 h-15 cursor-pointer mx-2 sm:mx-4 hover:text-white transition-colors"
            >
              <i className={`${socialLink.icon} fa-2x`}></i>
            </a>
          ))}
        </SocialMediaIcons>
        <Copyright>
          &copy; {currentYear} {details.name}. All rights reserved.
        </Copyright>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;
