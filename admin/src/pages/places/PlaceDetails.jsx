import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getPlaceById } from "@/api/place.api";

import PageLoader from "@/components/common/PageLoader";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  ArrowLeft,
  Pencil,
  MapPin,
  Clock3,
  Landmark,
  IndianRupee,
  Phone,
  Mail,
} from "lucide-react";

const PlaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await getPlaceById(id);
        setPlace(res.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load place details");
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  // ✅ Auto image slider
  useEffect(() => {
    if (!place?.photoUrls || place.photoUrls.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % place.photoUrls.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [place]);

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
    return <PageLoader text="Fetching place details..." />;
  }

  if (!place) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground">
        Place not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">
      {/* TOP ACTIONS */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard/places")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Places
        </Button>

        <Button
          onClick={() => navigate(`/dashboard/places/edit/${place._id}`)}
          className="gap-2"
        >
          <Pencil className="w-4 h-4" />
          Edit Place
        </Button>
      </div>

      <Card className="overflow-hidden rounded-3xl border border-border shadow-lg bg-card p-0">
        {/* MAIN IMAGE */}
        <div className="relative w-full h-[260px] md:h-[430px] overflow-hidden bg-black">
          {/* blurred background */}
          <img
            src={place.photoUrls?.[activeImage]}
            alt={place.name}
            className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-30"
          />

          <div className="absolute inset-0 bg-black/35" />

          <div className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-6">
            <img
              src={place.photoUrls?.[activeImage]}
              alt={place.name}
              className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl border border-white/10 transition-all duration-700"
            />
          </div>

          <Badge className="absolute top-4 left-4 z-20 bg-white text-black font-semibold shadow-md">
            {place.category}
          </Badge>
        </div>

        {/* THUMBNAILS */}
        {place.photoUrls?.length > 1 && (
          <div className="px-6 md:px-8 pt-6 flex gap-3 overflow-x-auto">
            {place.photoUrls.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition ${
                  activeImage === index
                    ? "border-white"
                    : "border-border opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`${place.name}-${index}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* CONTENT */}
        <CardContent className="p-6 md:p-8 space-y-8">
          {/* TITLE + META */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              {place.name}
            </h1>

            <div className="flex flex-wrap gap-3 text-sm md:text-base text-muted-foreground">
              <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-xl">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{place.city}, {place.state}</span>
              </div>

              <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-xl">
                <Clock3 className="w-4 h-4 shrink-0" />
                <span>
                  {formatTo12Hour(place.openingTime)} - {formatTo12Hour(place.closingTime)}
                </span>
              </div>

              {/* ✅ rating only if > 0 */}
              {place.rating?.average > 0 && (
                <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-xl">
                  ⭐ <span>{place.rating.average} Rating</span>
                </div>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">About this place</h2>

            <div className="rounded-2xl border border-border bg-muted/20 p-5">
              <p className="text-base text-justify leading-8 text-foreground/90 whitespace-pre-line">
                {place.description}
              </p>
            </div>
          </div>

          {/* LOCATION INFO */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Location Details</h2>

            <div className="rounded-2xl border border-border bg-muted/20 p-5 space-y-3">
              <div className="flex items-start gap-3">
                <Landmark className="w-5 h-5 mt-1 text-muted-foreground" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">
                    {place.address}, {place.city}, {place.state} - {place.pincode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Contact</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border bg-muted/20 p-5 flex items-start gap-3">
                <Phone className="w-5 h-5 mt-1 text-muted-foreground" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">{place.contactPhone || "N/A"}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-muted/20 p-5 flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1 text-muted-foreground" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">{place.contactEmail || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* PRICING */}
          {place.pricing && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Ticket Pricing</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-border bg-muted/20 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <IndianRupee className="w-4 h-4" />
                    <p className="font-medium">Indian Adult</p>
                  </div>
                  <p className="text-2xl font-bold">
                    ₹{place.pricing.indianAdult ?? 0}
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-muted/20 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <IndianRupee className="w-4 h-4" />
                    <p className="font-medium">Indian Student</p>
                  </div>
                  <p className="text-2xl font-bold">
                    ₹{place.pricing.indianStudent ?? 0}
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-muted/20 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <IndianRupee className="w-4 h-4" />
                    <p className="font-medium">Foreigner Adult</p>
                  </div>
                  <p className="text-2xl font-bold">
                    ₹{place.pricing.foreignerAdult ?? 0}
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-muted/20 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <IndianRupee className="w-4 h-4" />
                    <p className="font-medium">Foreigner Student</p>
                  </div>
                  <p className="text-2xl font-bold">
                    ₹{place.pricing.foreignerStudent ?? 0}
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

export default PlaceDetails;