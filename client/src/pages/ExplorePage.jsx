import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import PlaceCard from "../components/placeCard.jsx";
import {BASE_URL} from "../utils/constants.js";
const categories = ["Museum", "Wildlife", "Monument"];

const ITEMS_PER_PAGE = 8;

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
const [sort, setSort] = useState("latest"); // latest | top

const fetchAllPlaces = async (sort = "latest") => {
  try {
    setLoading(true);
    const res = await axios.get(
      `${BASE_URL}/places?sort=${sort}`
    );
    setPlaces(res?.data?.data || []);
  } catch (err) {
    console.error(err);
    setPlaces([]);
  } finally {
    setLoading(false);
  }
};


  const fetchByCategory = async (category) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/get/places/category/${category}`,
        { withCredentials: true }
      );
      setPlaces(res?.data?.data);
    } catch (err) {
      console.error(err);
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchAllPlaces("latest");
}, []);


  const handleFilter = (category) => {
    setPage(1);
    if (selectedCategory === category) {
      setSelectedCategory(null);
      fetchAllPlaces();
    } else {
      setSelectedCategory(category);
      fetchByCategory(category);
    }
  };

  // 🔍 Search logic (frontend filter)
  const filteredPlaces = useMemo(() => {
    return places.filter((p) =>
      `${p.name} ${p.city}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [places, search]);

  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredPlaces.length / ITEMS_PER_PAGE);
  const paginatedPlaces = filteredPlaces.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero */}
      <div className="hero min-h-[40vh] bg-gradient-to-r from-primary to-secondary text-white">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-5xl font-bold mb-4">
              Explore the World 🌍
            </h1>
            <p className="max-w-xl mx-auto">
              Discover beautiful monuments, museums, and wildlife
              destinations curated just for you.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="🔍 Search by name or city..."
            className="input input-bordered w-full md:max-w-md"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <div className="flex gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`btn btn-sm ${selectedCategory === cat
                    ? "btn-primary"
                    : "btn-outline"
                  }`}
              >
                {cat}
              </button>
            ))}
           <button
  className={`btn btn-sm ${
    sort === "top" ? "btn-primary" : "btn-outline"
  }`}
  onClick={() => {
    const next =
      sort === "top" ? "latest" : "top";

    setSort(next);
    setPage(1);
    fetchAllPlaces(next);
  }}
>
  🏆 Top Rated
</button>


          </div>
        </div>

        {/* Skeleton Loader */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="card bg-base-100 shadow-xl skeleton-shimmer"
              >
                <div className="h-56 bg-gray-300"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cards */}
        {!loading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedPlaces.map((place) => (
                <PlaceCard key={place._id} place={place} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10 gap-2">
                <button
                  className="btn btn-sm"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`btn btn-sm ${page === i + 1
                        ? "btn-primary"
                        : "btn-outline"
                      }`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  className="btn btn-sm"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty */}
        {!loading && filteredPlaces.length === 0 && (
          <div className="text-center mt-16 text-gray-500">
            No places found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
