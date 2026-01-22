 
import React, { useEffect } from "react";
const HomePage = () => {
   useEffect(() => {
    
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div data-theme="daisy" className="w-screen h-screen mt-20 ">
      
    </div>
  );
};

export default HomePage;
