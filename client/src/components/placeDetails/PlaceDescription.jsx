const PlaceDescription = ({ description }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-2">
        About this place
      </h2>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default PlaceDescription;
