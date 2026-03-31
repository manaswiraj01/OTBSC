import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getEventById } from "@/api/event.api";

import PageLoader from "@/components/common/PageLoader";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Pencil,
  Landmark,
  FileText,
} from "lucide-react";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEventById(id);
        setEvent(res.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const formattedDate = event?.eventDate
    ? new Date(event.eventDate).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    : "N/A";

  const formatTo12Hour = (time) => {
    if (!time) return "N/A";

    const [hours, minutes] = time.split(":");
    let h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";

    h = h % 12;
    h = h === 0 ? 12 : h;

    return `${h}${minutes !== "00" ? `:${minutes}` : ""} ${ampm}`;
  };

  if (loading) {
    return <PageLoader text="Fetching event details..." />;
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground">
        Event not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">
      {/* TOP ACTIONS */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard/events")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Button>

        <Button
          onClick={() => navigate(`/dashboard/events/edit/${event._id}`)}
          className="gap-2"
        >
          <Pencil className="w-4 h-4" />
          Edit Event
        </Button>
      </div>

      <Card className="overflow-hidden rounded-3xl border border-border shadow-lg bg-card p-0">
        {/* MAIN IMAGE */}
        <div className="relative w-full h-[260px] md:h-[430px] overflow-hidden bg-black">
          {/* blurred background */}
          <img
            src={event.bannerImage}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-70"
          />

          <div className="absolute inset-0 bg-black/35" />

          <div className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-6">
            <img
              src={event.bannerImage}
              alt={event.title}
              className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl border border-white/10 transition-all duration-700"
            />
          </div>

          <Badge className="absolute top-4 left-4 z-20 bg-white text-black font-semibold shadow-md">
            Event
          </Badge>
        </div>

        {/* CONTENT */}
        <CardContent className="p-6 md:p-8 space-y-8">
          {/* TITLE + META */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              {event.title}
            </h1>

            <div className="flex flex-wrap gap-3 text-sm md:text-base text-muted-foreground">
              <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-xl">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{event.place?.name || "N/A"}</span>
              </div>

              <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-xl">
                <CalendarDays className="w-4 h-4 shrink-0" />
                <span>{formattedDate}</span>
              </div>

              <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-xl">
                <Clock3 className="w-4 h-4 shrink-0" />
                <span>{formatTo12Hour(event.startTime)}</span>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5" />
              About this event
            </h2>

            <div className="rounded-2xl border border-border bg-muted/20 p-5">
              <p className="text-base leading-8 text-foreground/90 whitespace-pre-line text-justify">
                {event.description}
              </p>
            </div>
          </div>

          {/* VENUE INFO */}
          {event.place && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Landmark className="w-5 h-5" />
                Venue Details
              </h2>

              <div className="rounded-2xl border border-border bg-muted/20 p-5 space-y-3">
                <div>
                  <p className="font-medium text-lg">{event.place.name}</p>
                  <p className="text-muted-foreground">
                    {event.place.address}, {event.place.city}, {event.place.state}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetails;