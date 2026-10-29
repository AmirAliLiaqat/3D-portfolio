import { useState } from "react";

// Shows one big screenshot at a time with prev/next arrows and dots.
// Used on project detail pages whose screenshots should be browsed
// one by one (project.carousel === true); other galleries keep the grid.
const ScreenshotCarousel = ({ images, name }) => {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) return null;

  const goTo = (index) =>
    setCurrent(((index % images.length) + images.length) % images.length);

  return (
    <div className="mt-20">
      <h3 className="text-white text-2xl font-bold mb-6">Screenshots</h3>
      <div className="relative max-w-4xl mx-auto">
        <img
          key={`${name}-screenshot-${current}`}
          src={images[current]}
          alt={`${name} screenshot ${current + 1}`}
          className="w-full rounded-2xl shadow-2xl object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              aria-label="Previous screenshot"
              className="black-gradient absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full text-white text-2xl leading-none shadow-lg hover:scale-105 transition-transform"
            >
              &#8249;
            </button>
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              aria-label="Next screenshot"
              className="black-gradient absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full text-white text-2xl leading-none shadow-lg hover:scale-105 transition-transform"
            >
              &#8250;
            </button>
            <div className="flex justify-center gap-2 mt-5">
              {images.map((_, index) => (
                <button
                  key={`${name}-dot-${index}`}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to screenshot ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    index === current
                      ? "w-8 bg-white"
                      : "w-2.5 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScreenshotCarousel;
