import { useNavigate } from "react-router-dom";

const SuggestedPlaces = ({ places }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-14">
      <h2 className="text-2xl font-semibold mb-4">
        🧭 Suggested Places Nearby
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {places.map((p) => (
          <div
            key={p._id}
            className="card bg-base-200 shadow hover:shadow-lg cursor-pointer"
            onClick={() => navigate(`/place/${p._id}`)}
          >
            <figure>
              <img
                src={p.photoUrls?.[0]}
                alt={p.name}
                className="h-40 w-full object-cover"
              />
            </figure>
            <div className="card-body p-4">
              <h3 className="font-semibold text-sm">
                {p.name}
              </h3>
              <p className="text-xs text-gray-500">
                {p.city}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPlaces;
