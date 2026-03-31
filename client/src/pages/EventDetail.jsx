import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CiLocationOn, CiCalendar, CiClock2 } from "react-icons/ci";

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/events/${eventId}`
        );
        setEvent(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) return null;

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    let h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";

    h = h % 12;
    h = h ? h : 12;

    return minute === "00"
      ? `${h} ${ampm}`
      : `${h}:${minute} ${ampm}`;
  };

  return (
    // 🔥 OUTER BG
    <div className="min-h-screen bg-base-300 sm:p-6">

      {/* 🔥 MAIN CARD */}
      <div className="max-w-3xl mx-auto bg-base-100 p-5  rounded-2xl ">

        {/* 🔥 IMAGE SECTION */}
        <div className="px-4 sm:px-6 pt-6 sm:pt-8">
          
          {/* Image wrapper for better look */}
          <div className="rounded-xl">
            <img
              src={event.bannerImage}
              alt={event.title}
              className="
                w-full
                max-h-[600px]
                object-contain
                rounded-lg
              "
            />
          </div>

        </div>

        {/* 🔥 CONTENT */}
        <div className="p-4 sm:p-6">

          {/* TITLE */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
            {event.title}
          </h1>

          {/* PLACE */}
          <div className="flex items-center gap-2 text-xs sm:text-sm opacity-80 mb-6">
            <CiLocationOn />
            {event.place?.name}
          </div>

          {/* INFO CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">

            {/* DATE */}
            <div className="bg-base-200 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-sm opacity-80 mb-1">
                <CiCalendar />
                Date
              </div>
              <p className="text-sm opacity-90">
                {new Date(event.eventDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* TIME */}
            <div className="bg-base-200 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-sm opacity-80 mb-1">
                <CiClock2 />
                Time
              </div>
              <p className="text-sm opacity-90">
                {formatTime(event.startTime)}
              </p>
            </div>

            {/* LOCATION */}
            <div className="bg-base-200 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-sm opacity-80 mb-1">
                <CiLocationOn />
                Location
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                {event.place?.address}
              </p>
            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="bg-base-200 rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-2 opacity-80">
              About Event
            </h2>
            <p className="text-sm opacity-90 leading-relaxed text-justify">
              {event.description}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventDetail;