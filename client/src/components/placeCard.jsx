import { useNavigate } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const PlaceCard = ({ place }) => {
  const navigate = useNavigate();

  return (
    <div className="my-6 ">
      <div
        onClick={() => navigate(`/public/get/place/${place._id}`)}
        className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      >
        {/* IMAGE */}
        <img
          src={place.photoUrls?.[0]}
          alt={place.name}
          className="   object-cover transition-transform duration-500 "
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        {/* TEXT CONTENT */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          {/* PLACE NAME */}
          <h2 className="text-lg font-bold leading-tight">
            {place.name}
          </h2>

          {/* CITY WITH ICON */}
          <div className=" mt-2 flex items-center gap-1 text-sm text-gray-200">
            <MdLocationOn className="h-4 w-4 text-white " />
            <span>{place.city}</span>
          </div>

          {/* RATING + COUNT */}
          {/* RATING BADGE */}
          <div className="mt-2">
            <div className="inline-flex items-center overflow-hidden rounded-full bg-white/20 text-xs font-semibold backdrop-blur">
              <div className="flex items-center gap-1 px-2 py-1 text-yellow-400">
                <span>{place?.rating?.average || 0}</span>
                <span>★</span>
              </div>

              <div className="h-4 w-px bg-white/40"></div>

              <div className="px-2 py-1 text-white">
                {place?.rating?.count || 0}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
