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

const Home = () => {
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
        <Services />
      </div>
      <Experience />
      <Tech />
      <Education />
      <Projects />
      <Feedbacks />
      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
      <Wrapper>
        <Footer />
      </Wrapper>
    </div>
  );
};

export default Home;
