import React from "react";
import { useNavigate } from "react-router-dom";
import { CiLocationOn, CiCalendar, CiClock2 } from "react-icons/ci";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

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
    <div className="card bg-base-300 shadow-md hover:shadow-xl transition duration-300 hover:scale-[1.02] rounded-xl overflow-hidden">

      {/* IMAGE */}
      <figure className="h-full overflow-hidden">
        <img
          src={event.bannerImage}
          alt={event.title}
          className="w-full h-full object-cover "
        />
      </figure>

      {/* CONTENT */}
      <div className="card-body p-4">

        {/* TITLE */}
        <h2 className="card-title text-base font-semibold line-clamp-2">
          {event.title}
        </h2>

        {/* DETAILS (Aligned Properly) */}
        <div className="flex flex-col gap-2 text-sm text-base-content/70 mt-2">

          {/* LOCATION */}
          <div className="flex items-start gap-3">
            <div className="w-5 flex justify-center">
              <CiLocationOn className="text-lg" />
            </div>
            <span className="line-clamp-1">
              {event.place?.name}
            </span>
          </div>

          {/* DATE */}
          <div className="flex items-center gap-3">
            <div className="w-5 flex justify-center">
              <CiCalendar className="text-lg" />
            </div>
            <span>
              {new Date(event.eventDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>

          {/* TIME */}
          <div className="flex items-center gap-3">
            <div className="w-5 flex justify-center">
              <CiClock2 className="text-lg" />
            </div>
            <span>{formatTime(event.startTime)}</span>
          </div>

        </div>

        {/* BUTTON */}
        <div className="card-actions justify-end mt-4">
          <button
            onClick={() => navigate(`/events/${event._id}`)}
            className="btn btn-sm bg-pink-500 text-white border-none hover:opacity-90"
          >
            View Details
          </button>
        </div>

      </div>
    </div>
  );
};

export default EventCard;