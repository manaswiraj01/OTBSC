import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:4000/events?limit=9"
      );
      setEvents(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-base-100 text-base-content px-6 py-10">

      <h1 className="text-4xl font-bold text-center mb-10 text-pink-500">
    Events
      </h1>

      {loading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventPage;