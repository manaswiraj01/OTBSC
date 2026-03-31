import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getEventById } from "@/api/event.api";
import { getPlaces } from "@/api/place.api";

import EventForm from "@/components/events/EventForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import useEvents from "@/hooks/useEvents";
import PageLoader from "@/components/common/PageLoader";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const { editEvent } = useEvents();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, placesRes] = await Promise.all([
          getEventById(id),
          getPlaces({ page: 1, limit: 1000 }),
        ]);

        setEvent(eventRes.data.data);
        setPlaces(placesRes.data.data || []);
      } catch (err) {
        toast.error("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (data) => {
    const res = await editEvent(id, data);

    if (res.success) {
      toast.success("Event updated successfully");
      navigate("/dashboard/events");
    } else {
      toast.error(
        res.error?.response?.data?.errors?.description?.message ||
        res.error?.response?.data?.message ||
        "Update failed"
      );
    }
  };

  if (loading || !event) {
    return <PageLoader text="Fetching event details..." />;
  }

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-4xl bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>Edit Event</CardTitle>
        </CardHeader>

        <CardContent>
          <EventForm
            mode="edit"
            initialData={event}
            onSubmit={handleSubmit}
            places={places}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditEvent;