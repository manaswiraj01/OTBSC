import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Pencil, Trash, CalendarDays, Clock3, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event, onDelete }) => {
  const navigate = useNavigate();

  const formattedDate = event?.eventDate
    ? new Date(event.eventDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
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

  const handleNavigate = () => {
    navigate(`/dashboard/events/${event._id}`);
  };

  return (
    <Card
      onClick={handleNavigate}
      className="flex flex-col bg-card border border-border shadow-md 
      hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 
      overflow-hidden rounded-2xl p-0 cursor-pointer active:scale-[0.99] active:opacity-85"
    >
      {/* IMAGE */}
      <div className="relative w-full h-[235px] bg-black overflow-hidden rounded-t-2xl">
        <img
          src={event.bannerImage}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500"
        />

        <Badge
          className="absolute top-3 left-3 bg-white text-black font-semibold shadow-md border border-white/40"
        >
          Event
        </Badge>
      </div>

      {/* CONTENT */}
      <CardContent className="pt-3 px-5 pb-1 space-y-2">
        <h3 className="font-semibold text-xl leading-snug line-clamp-2">
          {event.title}
        </h3>

        <div className="space-y-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="line-clamp-1">{event.place?.name || "N/A"}</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 shrink-0" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock3 className="w-4 h-4 shrink-0" />
              <span>{formatTo12Hour(event.startTime)}</span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* ACTIONS */}
      <CardFooter className="flex gap-2 px-5 pb-4 pt-2 mt-auto">
        <Button
          size="sm"
          className="flex-1 text-black bg-white hover:bg-zinc-200"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/dashboard/events/edit/${event._id}`);
          }}
        >
          <Pencil className="w-4 h-4 mr-1" />
          Edit
        </Button>

        <Button
          size="sm"
          className="flex-1 text-white 
          bg-linear-to-r from-red-500 to-red-700
          hover:from-red-600 hover:to-red-800"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(event);
          }}
        >
          <Trash className="w-4 h-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;