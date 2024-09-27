/* eslint-disable react/no-unescaped-entities */
import { styles } from "../styles";
import About from "./About";

const Hero = () => {
  return (
    <section
      className={`relative w-full min-h-screen mx-auto`}
      style={{ marginTop: "100px" }}
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
            Hi, I'm <span className="text-[#915EFF]">Amir Ali</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I'm a dedicated front-end developer passionate about crafting
            exceptional web experiences. With a solid foundation of 2 years in
            web development, I have honed my skills across various technologies
            to create dynamic and user-friendly interfaces.
          </p>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            Currently, I am an integral part of a dynamic team contributing my
            skills to develop cutting-edge web applications. My role involves
            working with React.js, TypeScript, JavaScript, and Next.js, as well
            as backend technologies to build robust, high-performance solutions
            catering to modern user expectations.
          </p>
        </div>
      </div>

      <About />
    </section>
  );
};

export default Hero;
