const PlaceHeader = ({ place }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          {place.name}
        </h1>
        <p className="text-gray-500 mb-4">
          📍 {place.address}, {place.city}, {place.state} -{" "}
          {place.pincode}
        </p>

        <div className="badge badge-primary badge-lg">
          {place.category}
        </div>
      </div>

      <div className="bg-base-200 p-4 rounded-xl w-fit">
        <p className="font-semibold mb-2">⏰ Timings</p>
        <p>
          {place.openingTime} - {place.closingTime}
        </p>
      </div>
    </div>
  );
};

export default PlaceHeader;
