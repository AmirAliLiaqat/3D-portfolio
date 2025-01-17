import { BrowserRouter } from "react-router-dom";
import {
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Services,
  Navbar,
  Tech,
  Projects,
  StarsCanvas,
} from "./components";
import Footer from "./components/Footer";
import { Wrapper } from "./components/styled";
import Education from "./components/Education";

const App = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
