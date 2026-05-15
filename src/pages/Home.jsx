import {
  Navbar,
  Hero,
  Services,
  Experience,
  Tech,
  Projects,
  Feedbacks,
  Contact,
  StarsCanvas,
} from "../components";
import { Wrapper } from "../components/styled";
import Education from "../components/Education";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import Blogs from "./Blogs";

const Home = () => {
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Hero />
        <Services />
      </div>
      <Experience />
      {/* <Tech /> */}
      <Education />
      <Projects />
      <Blogs limit={3} />
      <Feedbacks />
      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
      <Wrapper>
        <Footer />
      </Wrapper>
      <ScrollToTop />
    </div>
  );
};

export default Home;
