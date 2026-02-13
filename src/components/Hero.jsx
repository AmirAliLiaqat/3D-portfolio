/* eslint-disable react/no-unescaped-entities */
import { styles } from "../styles";
import { usePortfolio } from "../context/PortfolioContext";
import About from "./About";

const Hero = () => {
  const { details } = usePortfolio();

  return (
    <section
      className={`relative w-full min-h-screen mx-auto`}
      style={{ marginTop: "100px" }}
      id="about"
    >
      <div
        className={`max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915EFF]">{details.shortName}</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            {details.description}
          </p>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            {details.about}
          </p>
        </div>
      </div>

      <About />
    </section>
  );
};

export default Hero;
