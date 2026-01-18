import { useNavigate } from "react-router-dom";

const PlaceCard = ({ place }) => {
  const navigate = useNavigate();
  return (
    <div className="card glass-card shadow-xl hover:scale-105 transition-transform duration-300">
      <figure>
        <img
          src={place.photoUrls?.[0]}
          alt={place.name}
          className="h-56 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title flex justify-between">
          {place.name}
          <div className="badge badge-primary badge-outline">
            {place.category}
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>
                ⭐ {place.rating?.average || 0}
                <span className="text-xs">
                  {" "}
                  ({place.rating?.count || 0})
                </span>
              </span>
            </div>

          </div>
        </h2>

        <p className="text-sm text-gray-600">
          📍 {place.city}, {place.state}
        </p>

        <div className="card-actions justify-between items-center mt-2">
          <span className="text-xs text-gray-400">
            Pincode: {place.pincode}
          </span>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => navigate(`/public/get/place/${place._id}`)}
          >
            View
          </button>

        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
