import PlaceCard from "./PlaceCard";

const TopRatedSection = ({ title, places }) => {
  return (
    <section className="w-full py-4 px-6 md:px-12 bg-base-100 ">

      {/* Header */}
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-2xl md:text-3xl font-bold text-pink-500">
          {title}
        </h2>
      </div>

      {/* Scroll Container */}
      <div className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar snap-x
      ">

        {places.map((place) => (
          <div
            key={place._id}
            className="
              flex-shrink-0
              w-[260px]
              sm:w-[280px]
              md:w-[300px]
              snap-start
            "
          >
            <PlaceCard place={place} />
          </div>
        ))}

      </div>

    </section>
  );
};

export default TopRatedSection;