import React, { useEffect, useState } from "react";
import VideoSection from "@/components/VideoSection";
import HeroSection from "@/components/HeroSection";
import TopRatedSection from "@/components/TopRatedSection";
import { BASE_URL } from "../utils/constants.js";

const HomePage = () => {

  const [wildlife, setWildlife] = useState([]);
  const [monuments, setMonuments] = useState([]);
  const [museums, setMuseums] = useState([]);

  const fetchTop = async (category, setter) => {
    try {
      const res = await fetch(
        `${BASE_URL}/get/top-rated?category=${category}`
      );

      const result = await res.json();

      if (result.success) {
        setter(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTop("Wildlife", setWildlife);
    fetchTop("Monument", setMonuments);
    fetchTop("Museum", setMuseums);
  }, []);

  return (
    <div data-theme="daisy">

      <HeroSection />
      <VideoSection />

      <TopRatedSection title="Top Wildlife" places={wildlife} />
      <TopRatedSection title="Top Monuments" places={monuments} />
      <TopRatedSection title="Top Museums" places={museums} />

    </div>
  );
};

export default HomePage;