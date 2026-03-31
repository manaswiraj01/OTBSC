import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

import TimePicker from "@/components/places/TimePicker";

import { toast } from "react-hot-toast";
import { Spinner } from "../ui/spinner";

const parseTime = (timeStr) => {
  if (!timeStr) {
    return { hour: "06", minute: "00", period: "PM" };
  }

  let [hour, minute] = timeStr.split(":");
  hour = parseInt(hour);

  let period = "AM";

  if (hour >= 12) {
    period = "PM";
    if (hour > 12) hour -= 12;
  }

  if (hour === 0) hour = 12;

  return {
    hour: hour.toString().padStart(2, "0"),
    minute,
    period
  };
};

const formatTimeTo24 = (timeObj) => {
  let hour = parseInt(timeObj.hour);

  if (timeObj.period === "PM" && hour !== 12) {
    hour += 12;
  }

  if (timeObj.period === "AM" && hour === 12) {
    hour = 0;
  }

  return `${hour.toString().padStart(2, "0")}:${timeObj.minute}`;
};

const formatDateForInput = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

const EventForm = ({
  initialData = {},
  mode = "add",
  onSubmit,
  places = []
}) => {
  const isEdit = mode === "edit";

  const [formData, setFormData] = useState({
    title: isEdit ? initialData.title || "" : "",
    description: isEdit ? initialData.description || "" : "",
    place: isEdit ? initialData.place?._id || initialData.place || "" : "",
    eventDate: isEdit ? formatDateForInput(initialData.eventDate) : "",
    startTime: isEdit
      ? parseTime(initialData.startTime)
      : { hour: "", minute: "", period: "" },
  });

  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const onDrop = async (files) => {
    const file = files[0];
    if (!file) return;

    const base64 = await convertToBase64(file);

    setImage({
      preview: URL.createObjectURL(file),
      base64
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (submitting) return;
    if (!image && mode === "add") {
      toast.error("Please select a banner image");
      return;
    }

    setSubmitting(true);

    try {
      await onSubmit({
        ...formData,
        startTime: formatTimeTo24(formData.startTime),
        bannerImage: image?.base64 || initialData.bannerImage
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (mode === "edit" && initialData) {
      if (initialData.bannerImage) {
        setImage({
          preview: initialData.bannerImage,
          base64: initialData.bannerImage
        });
      }

      setFormData(prev => ({
        ...prev,
        startTime: parseTime(initialData.startTime)
      }));
    }
  }, [initialData, mode]);

  return (
    <form onSubmit={submitHandler} className="space-y-6">
      <Input
        name="title"
        placeholder="Event Title"
        value={formData.title}
        onChange={handleChange}
      />

      <Textarea
        name="description"
        placeholder="Event Description"
        value={formData.description}
        onChange={handleChange}
      />

      <Select
        value={formData.place}
        onValueChange={(value) => setFormData(prev => ({ ...prev, place: value }))}
      >
        <SelectTrigger className="bg-zinc-900 w-full border-zinc-700">
          <SelectValue placeholder="Select Place" />
        </SelectTrigger>

        <SelectContent
          position="popper"
          className="bg-zinc-900 border-zinc-700 max-h-65 overflow-y-auto"
        >
          {places.map((place) => (
            <SelectItem key={place._id} value={place._id}>
              {place.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Date + Time Same Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Event Date</p>
          <Input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Start Time</p>
          <TimePicker
            value={formData.startTime}
            onChange={(type, value) => {
              setFormData(prev => ({
                ...prev,
                startTime: {
                  ...prev.startTime,
                  [type]: value
                }
              }));
            }}
          />
        </div>
      </div>

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-zinc-700 rounded-lg p-6 text-center cursor-pointer hover:border-neutral-300 transition"
      >
        <input {...getInputProps()} />

        <p className="text-sm text-muted-foreground">
          {image ? "1 banner image selected" : "Click to select banner image"}
        </p>

        <p className="text-xs text-muted-foreground">
          Only 1 image allowed
        </p>
      </div>

      {image && (
        <div className="mt-4">
          <div className="relative w-full max-w-sm">
            <img
              src={image.preview}
              alt="preview"
              className="h-40 w-full object-cover rounded-md border border-zinc-700"
            />

            <button
              type="button"
              onClick={() => setImage(null)}
              className="absolute top-1 right-1 bg-black text-white text-xs px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full"
      >
        {submitting ? (
          <span className="flex items-center justify-center gap-2">
            <Spinner className="size-4" />
            {mode === "edit" ? "Updating..." : "Creating..."}
          </span>
        ) : (
          mode === "edit" ? "Update Event" : "Create Event"
        )}
      </Button>
    </form>
  );
};

export default EventForm;