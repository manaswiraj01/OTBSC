import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useEvents from "@/hooks/useEvents";

import EventCard from "@/components/events/EventCard";
import DeleteEventModal from "@/components/events/DeleteEventModal";
import Pagination from "@/components/Pagination";
import { SearchBar } from "@/components/common/SearchBar";

import { Button } from "@/components/ui/button";
import PageLoader from "@/components/common/PageLoader";

const Events = () => {
  const navigate = useNavigate();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const {
    events,
    total,
    handleDelete,
    loading,
    fetching,
  } = useEvents(page, setPage, limit, search);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const openDeleteModal = (event) => {
    setSelectedEvent(event);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedEvent) return;

    await handleDelete(selectedEvent);

    setDeleteOpen(false);
    setSelectedEvent(null);
  };

  if (loading) {
    return <PageLoader text="Fetching events..." />;
  }

  return (
    <div className="space-y-8">
      {/* CONTROLS ROW */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <SearchBar
          search={searchInput}
          setSearch={setSearchInput}
          placeholder="Search events..."
        />

        <Button
          className="px-5"
          onClick={() => navigate("/dashboard/events/add")}
        >
          + Add Event
        </Button>
      </div>

      {/* EVENTS GRID */}
      {events.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          {fetching ? "Loading..." : "No events found"}
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onDelete={openDeleteModal}
            />
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <Pagination
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        total={total}
      />

      {/* DELETE MODAL */}
      <DeleteEventModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        event={selectedEvent}
      />
    </div>
  );
};

export default Events;