import { Info } from "lucide-react";

const PlaceDescription = ({ description }) => {
  return (
    <div className="mb-6 px-2 md:px-0">
      <h2 className="text-xl md:text-2xl font-semibold mb-3 flex items-center gap-2">
        <Info size={20} /> About this place
      </h2>

      <p className="text-sm md:text-base text-base-content/90 text-justify leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default PlaceDescription;