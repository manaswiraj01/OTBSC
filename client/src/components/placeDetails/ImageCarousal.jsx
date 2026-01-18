import { useEffect, useState } from "react";

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

  return (
    <div className="p-6">
      {/* MAIN IMAGE */}
      <img
        key={active} // 🔥 This triggers fade animation
        src={getHDImage(images[active], 2000)}
srcSet={`
    ${getHDImage(images[active], 1200)} 1200w,
    ${getHDImage(images[active], 2000)} 2000w
  `}
        alt="Main"
        className="w-full h-[420px] object-contain rounded-xl shadow-lg fade-slide"
      />

      {/* THUMBNAILS */}
      <div className="flex gap-3 mt-4 overflow-x-auto">
        {images.map((url, index) => (
          <img
            key={index} // ✅ Unique key per thumbnail
            src={getHDImage(url, 400)}
 // ✅ Show thumbnail, not main image
            alt={`thumb-${index}`}
            onClick={() => setActive(index)}
            className={`h-24 w-32 object-cover rounded-lg cursor-pointer border-2 transition-transform hover:scale-105 ${
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
