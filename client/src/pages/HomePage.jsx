 
import React, { useEffect } from "react";
const HomePage = () => {
   useEffect(() => {
    
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className=" w-screen h-screen mt-20 ">
     
      <iframe
        className=" w-full h-full "
        src="https://www.youtube.com/embed/nF3icHV6TnU?start=20&autoplay=1&mute=1&loop=1&playlist=nF3icHV6TnU&controls=0&modestbranding=1&rel=0"
       
       
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
      ></iframe>

     
    </div>
  );
};

export default HomePage;
