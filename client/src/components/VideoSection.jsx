import React, { useState } from "react";

import wildlifeVideo from "../assets/videos/wildlifeVideo.mp4";
import leopardVideo from "../assets/videos/leopardVideo.mp4";
import hawamahalVideo from "../assets/videos/hawamahalVideo.mp4";

import sariskaImg from "../assets/sariskaImg.jpg";
import jhalanaImg from "../assets/jhalanaImg.jpg";
import hawamahal from "../assets/hawamahal.jpg";

const VideoSection = () => {
    const places = [
        {
            title: "SARISKA TIGER RESERVE",
            description:
                "Sariska Tiger Reserve is a national park where you will find a perfect intermingling of nature.",
            image: sariskaImg,
            video: wildlifeVideo,
        },
        {
            title: "JHALANA LEOPARD RESERVE",
            description:
                "The Jhalana Leopard Reserve is known for its thriving wildlife and beautiful landscapes.",
            image: jhalanaImg,
            video: leopardVideo,
        },
        {
            title: "HAWA MAHAL",
            description:
                "Hawa Mahal is one of the most iconic landmarks of Jaipur.",
            image: hawamahal,
            video: hawamahalVideo,
        },
    ];

    const [selectedVideo, setSelectedVideo] = useState(places[0]);

    return (
        <section className="w-full bg-base-100">
            {/* Important: items-stretch */}
            <div className="flex flex-col md:flex-row items-stretch">

                {/* VIDEO SIDE */}
                <div
                    className="
    relative
    w-full md:w-3/5 lg:w-2/3
    aspect-video
    overflow-hidden
  "
                >
                    <video
                        key={selectedVideo.video}
                        src={selectedVideo.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover block"
                    />
                </div>

                {/* RIGHT PANEL */}
                <div className="w-full md:w-2/5 lg:w-1/3 bg-base-200 p-6 md:p-8 flex flex-col">

                    <h2 className="text-xl md:text-2xl font-bold mb-6">
                        Discover Beautiful Places with US
                    </h2>

                    <div className="space-y-4">

                        {places.map((place, index) => {
                            const isActive = selectedVideo.title === place.title;

                            return (
                                <div
                                    key={index}
                                    onClick={() => setSelectedVideo(place)}
                                    className={`
        flex gap-4 p-4 rounded-xl cursor-pointer 
        transition-all duration-300 border items-start h-[110px]
        ${isActive
                                            ? "bg-pink-500 text-white border-pink-500 shadow-lg"
                                            : "bg-base-100 border-base-300 hover:bg-base-200 dark:hover:bg-base-100"
                                        }
      `}
                                >
                                    <img
                                        src={place.image}
                                        alt={place.title}
                                        className="w-14 h-14 rounded-full object-cover shrink-0"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <h3
                                            className="
      font-semibold
      text-sm md:text-base
      truncate
      leading-relaxed
    "
                                        >
                                            {place.title}
                                        </h3>

                                        <p
                                            className="
      text-xs md:text-sm
      opacity-80
      mt-2
      leading-relaxed
      line-clamp-2 md:line-clamp-2
    "
                                        >
                                            {place.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;