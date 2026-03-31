import { MapPin, Clock, Tag } from "lucide-react";

const PlaceHeader = ({ place }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-5 px-2 md:px-0">
      
      <div>
        <h1 className="text-2xl md:text-4xl font-bold mb-2">
          {place.name}
        </h1>

        <p className="text-base-content/90 mb-3 md:mb-4 flex items-start gap-2 text-sm md:text-base">
          <MapPin size={16} className="mt-1 shrink-0" />
          <span>
            {place.address}, {place.city}, {place.state} - {place.pincode}
          </span>
        </p>

        <div className="badge badge-primary badge-md md:badge-lg flex items-center gap-1">
          <Tag size={14} /> {place.category}
        </div>
      </div>

      <div className="bg-base-200 p-3 md:p-4 rounded-xl w-full md:w-fit">
        <p className="font-semibold mb-2 flex items-center gap-2 text-sm md:text-base">
          <Clock size={16} /> Timings
        </p>
        <p className="text-sm md:text-base">
          {place.openingTime} - {place.closingTime}
        </p>
      </div>
    </div>
  );
};

export default PlaceHeader;