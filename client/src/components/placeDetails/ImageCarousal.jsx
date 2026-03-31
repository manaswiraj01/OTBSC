import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageCarousel = ({ images }) => {
  const getHDImage = (url, width = 1600) => {
    if (!url) return url;
    return url.replace(
      "/upload/",
      `/upload/q_auto:best,f_auto,c_limit,w_${width}/`
    );
  };

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [images]);

  const prev = () =>
    setActive((active - 1 + images.length) % images.length);
  const next = () =>
    setActive((active + 1) % images.length);

  return (
    <div className="p-3 md:p-6">
      <div className="relative rounded-3xl overflow-hidden bg-base-100">

        <img
          key={active}
          src={getHDImage(images[active], 2000)}
          alt="Main"
          className="w-full max-w-[600px] mx-auto h-[220px] sm:h-[320px] md:h-[450px] object-cover rounded-2xl"
        />

        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 btn btn-circle btn-sm"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-circle btn-sm"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="flex gap-2 md:gap-3 mt-4 overflow-x-auto">
        {images.map((url, index) => (
          <img
            key={index}
            src={getHDImage(url, 400)}
            alt={`thumb-${index}`}
            onClick={() => setActive(index)}
            className={`h-16 w-24 md:h-24 md:w-32 object-cover rounded-lg cursor-pointer border-2 transition-transform ${
              active === index
                ? "border-primary"
                : "border-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;