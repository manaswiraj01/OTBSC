import React from "react";
import heroImage from "../assets/jodhpur.png";

const HeroSection = () => {
  return (
    <section className="w-full bg-base-200 px-6 md:px-16 pb-20">

      <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE TEXT */}
        <div className="space-y-6 text-center md:text-left ">

          <p className="text-sm tracking-widest text-base-content">
            DISCOVER THE REAL BEAUTY OF
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-pink-500 leading-tight">
            INDIA
          </h1>

          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-pink-500 leading-relaxed">
            THE LAND OF VIBRANT COLORS,
            MAJESTIC FORTS, AND TIMELESS TRADITIONS.
          </h2>

          <p className="text-base-content leading-relaxed max-w-xl mx-auto md:mx-0">
            Each city and town in India possesses its unique charm,
            from the pink-hued streets of Jaipur to the blue expanse
            of Jodhpur and the golden sands of Jaisalmer.
          </p>

        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex justify-center  md:mt-0">

          <img
            src={heroImage}
            alt="India"
            className="
              w-full
              max-w-[500px]
              rounded-2xl
              
              object-cover
            "
          />

        </div>

      </div>

    </section>
  );
};

export default HeroSection;