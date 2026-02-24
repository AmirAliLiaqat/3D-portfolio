import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrollPercent(Math.min(percent, 100));
      setVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG circle progress ring
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollPercent / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`scroll-top-btn fixed bottom-8 right-8 z-50 w-14 h-14 flex items-center justify-center cursor-pointer transition-all duration-500 ${visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
        }`}
    >
      {/* Progress ring SVG */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 56 56"
      >
        {/* Track */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="rgba(145, 94, 255, 0.1)"
          strokeWidth="3"
        />
        {/* Progress */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="#915EFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-200"
        />
      </svg>

      {/* Inner button */}
      <div className="scroll-top-inner w-9 h-9 rounded-full flex items-center justify-center relative z-10">
        <i className="fa-solid fa-arrow-up text-[#915EFF] text-sm" />
      </div>
    </button>
  );
};

export default ScrollToTop;
