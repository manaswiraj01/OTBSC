import { useEffect, useState } from "react";
import {
  getEvents,
  getEventById,
  addEvent,
  updateEvent,
  deleteEvent
} from "../api/event.api.js";

const useEvents = (page, setPage, limit, search) => {
  const [events, setEvents] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  // FETCH EVENTS
  const fetchEvents = async (isInitial = false) => {
    try {
      if (isInitial) {
        setLoading(true);
      } else {
        setFetching(true);
      }

      const res = await getEvents({
        page,
        limit,
        search,
      });

      setEvents(res.data.data || []);
      setTotal(res.data.pagination.totalEvents || 0);

    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  // GET SINGLE EVENT
  const fetchEventById = async (id) => {
    try {
      const res = await getEventById(id);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  // ADD EVENT
  const createEvent = async (data) => {
    try {
      await addEvent(data);
      fetchEvents();
      return { success: true };
    } catch (error) {
      console.error("Error adding event:", error);
      return {
        success: false,
        error
      };
    }
  };

  // UPDATE EVENT
  const editEvent = async (id, data) => {
    try {
      await updateEvent(id, data);
      return { success: true };
    } catch (error) {
      console.error("Error updating event:", error);
      return {
        success: false,
        error
      };
    }
  };

  // DELETE EVENT
  const handleDelete = async (event) => {
    if (events.length === 1 && page > 1) {
      setPage(prev => prev - 1);
    }

    setEvents(prev => prev.filter(e => e._id !== event._id));
    setTotal(prev => prev - 1);

    try {
      await deleteEvent(event._id);
    } catch (error) {
      console.error("Delete failed", error);
      fetchEvents();
    }
  };

  useEffect(() => {
    fetchEvents(events.length === 0);
  }, [page, limit, search]);

  return {
    events,
    total,
    loading,
    fetching,
    fetchEvents,
    fetchEventById,
    createEvent,
    editEvent,
    handleDelete
  };
};

export default useEvents;