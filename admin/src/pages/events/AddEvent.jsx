import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addEvent } from "@/api/event.api";
import { getPlaces } from "@/api/place.api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import EventForm from "@/components/events/EventForm";
import { useEffect, useState } from "react";
import PageLoader from "@/components/common/PageLoader";

const AddEvent = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await getPlaces({ page: 1, limit: 1000 });
        setPlaces(res.data.data || []);
      } catch (err) {
        toast.error("Failed to load places");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (submitting) return;
      setSubmitting(true);

      await addEvent(data);
      toast.success("Event added successfully");
      navigate("/dashboard/events");

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add event");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <PageLoader text="Fetching places..." />;
  }

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-3xl bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>Add Event</CardTitle>
        </CardHeader>

        <CardContent>
          <EventForm
            mode="add"
            onSubmit={handleSubmit}
            places={places}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddEvent;