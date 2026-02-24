/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { usePortfolio } from "../context/PortfolioContext";
import useEmblaCarousel from "embla-carousel-react";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.3, 0.75)}
    className="testimonial-card flex-[0_0_100%] sm:flex-[0_0_calc(33.333%-1rem)] min-w-0 mx-2"
  >
    <div className="relative p-7 rounded-2xl h-full flex flex-col">
      {/* Decorative quote icon */}
      <div className="absolute -top-2 -left-1">
        <span className="text-[#915EFF] text-[72px] font-serif leading-none opacity-30">
          "
        </span>
      </div>

      {/* Star rating */}
      <div className="flex gap-1 mb-4 mt-2">
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className="fa-solid fa-star text-xs text-[#915EFF]/80"
          />
        ))}
      </div>

      {/* Testimonial text */}
      <p className="text-white/85 text-[15px] leading-[26px] flex-1">
        {testimonial}
      </p>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#915EFF]/20 to-transparent my-5" />

      {/* Author section */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={image}
            alt={`feedback_by-${name}`}
            className="w-12 h-12 rounded-full object-cover"
            style={{ border: "2px solid rgba(145, 94, 255, 0.3)" }}
          />
          {/* Online-like dot */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#38ef7d] border-2 border-[#100d25]" />
        </div>
        <div className="flex-1">
          <h4 className="text-white font-semibold text-[15px]">{name}</h4>
          <p className="text-[#915EFF]/70 text-[12px] mt-0.5">
            {designation}, {company}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  const { testimonials } = usePortfolio();
  const [activeIndex, setActiveIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
    dragFree: true,
    containScroll: "trimSnaps",
    breakpoints: {
      "(min-width: 640px)": { slidesToScroll: 3 },
    },
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : testimonials.length - 1
      );
    }
  }, [emblaApi, testimonials.length]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      setActiveIndex((prev) =>
        prev < testimonials.length - 1 ? prev + 1 : 0
      );
    }
  }, [emblaApi, testimonials.length]);

  return (
    <div className="relative">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#915EFF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative bg-black-100 rounded-[20px] overflow-hidden">
        {/* Top decorative border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#915EFF]/40 to-transparent" />

        <div
          className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px] relative`}
        >
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(145, 94, 255, 0.3) 1px, transparent 0)',
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <motion.div variants={textVariant()}>
              <p className={styles.sectionSubText}>What others say</p>
              <h2 className={styles.sectionHeadText}>
                Testimonials<span className="text-[#915EFF]">.</span>
              </h2>
            </motion.div>

            {/* Navigation arrows */}
            <div className="flex gap-3">
              <button
                className="testimonial-nav-btn w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer"
                onClick={scrollPrev}
                aria-label="Previous testimonial"
              >
                <i className="fa-solid fa-arrow-left text-sm text-[#915EFF]" />
              </button>
              <button
                className="testimonial-nav-btn w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer"
                onClick={scrollNext}
                aria-label="Next testimonial"
              >
                <i className="fa-solid fa-arrow-right text-sm text-[#915EFF]" />
              </button>
            </div>
          </div>
        </div>

        <div className={`-mt-20 pb-14 ${styles.paddingX}`}>
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((testimonial, index) => (
                  <FeedbackCard
                    key={`${testimonial.name}-${index}`}
                    index={index}
                    {...testimonial}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "feedbacks");
