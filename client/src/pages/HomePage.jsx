import React, { useEffect } from "react";
import VideoSection  from "@/components/VideoSection";
import HeroSection from "@/components/HeroSection";

const HomePage = () => {
  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, []);

  return (
    <div data-theme="daisy"  >

     <HeroSection />
   <VideoSection />

    </div>
  );
};

export default HomePage;