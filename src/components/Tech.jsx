/* eslint-disable react-refresh/only-export-components */
import { BallCanvas } from "./canvas";
import { technologies } from "../constants";
import { SectionWrapper } from "../hoc";

const Tech = () => {
  return <div className="flex flex-row flex-wrap justify-center gap-10">
    {technologies.map((technology) => (
      <div className="w-28 h-28" key={technology.name}>
        <BallCanvas icon={technology.icon} />
        <p className="text-sm text-center">{technology.name}</p>
      </div>
    ))}
  </div>;
};

export default SectionWrapper(Tech, 'tech');
