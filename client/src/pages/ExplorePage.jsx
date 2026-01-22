import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import PlaceCard from "../components/placeCard.jsx";
import { BASE_URL } from "../utils/constants.js";
const categories = ["Museum", "Wildlife", "Monument"];
import { FiSearch } from "react-icons/fi";

import jalmahal from "../assets/jalmahal.jpg";

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

  // Search logic (frontend filter)
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
    <div className="relative min-h-[calc(100vh-64px)] items-center overflow-hidden top-0">
      {/* Hero Section - Background Image, Text Overlay, Theme-aware */}
      <div className="relative w-full min-h-[520px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[750px] 2xl:min-h-[800px] flex items-center overflow-hidden bg-base-200 dark:bg-gray-900 pt-0">
        {/* Background Image */}
        <img
          src={jalmahal}
          alt="jal Mahal"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ pointerEvents: 'none' }}
        />
        {/* Subtle Overlay for readability */}
        <div className="absolute inset-0 w-full h-full z-10 bg-black/30 dark:bg-black/50" />
        {/* Centered Container for Text */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-16 flex flex-col justify-center items-start py-24 md:py-32">
          <p className="text-left text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white mb-2 drop-shadow-lg">
            Welcome to <span className="font-bold">India&apos;s</span>
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-pink-400 leading-tight drop-shadow-lg">
            Untouched
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
            Diversity
          </h2>
        </div>
      </div>
      {/* Search + Filters */}
      <div className="mt-5 max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
        <div className="mb-10">
          <div className="flex flex-col gap-6">
            {/* SEARCH BAR (CENTERED) */}
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <div className="flex items-center rounded-xl border-2 border-pink-500 bg-base-100 px-4 py-2 shadow-lg backdrop-blur transition-all duration-300 focus-within:bg-base-200 focus-within:shadow-pink-500/30">
                  <span className="text-base-content scale-"><FiSearch /></span>
                  <input
                    type="text"
                    placeholder="Search by name or city..."
                    className="ml-3 w-full bg-transparent text-base-content placeholder-base-content/50 outline-none"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                  />
                </div>
              </div>
            </div>
            {/* FILTER BUTTONS (RIGHT ALIGNED) */}
            <div className="flex flex-wrap justify-center md:justify-end gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleFilter(cat)}
                  className={`rounded-xl border-2 border-pink-500 px-4 py-2 text-sm font-semibold transition-all duration-300 ${selectedCategory === cat ? "bg-pink-500 text-white shadow-lg shadow-pink-500/40" : "bg-transparent text-base-content hover:bg-pink-500 hover:text-white hover:shadow-lg hover:shadow-pink-500/40"}`}
                >
                  {cat}
                </button>
              ))}
              <button
                onClick={() => {
                  const next = sort === "top" ? "latest" : "top";
                  setSort(next);
                  setPage(1);
                  fetchAllPlaces(next);
                }}
                className={`rounded-xl border-2 border-pink-500 px-4 py-2 text-sm font-semibold transition-all duration-300 ${sort === "top" ? "bg-pink-500 text-white shadow-lg shadow-pink-500/40" : "bg-transparent text-base-content hover:bg-pink-500 hover:text-white hover:shadow-lg hover:shadow-pink-500/40"}`}
              >
                Top Rated
              </button>
            </div>
          </div>
        </div>
        {/* Skeleton Loader */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card bg-base-100 shadow-xl skeleton-shimmer">
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
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
                {paginatedPlaces.map((place) => (
                  <PlaceCard key={place._id} place={place} />
                ))}
              </div>
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-wrap justify-center mt-10 gap-2">
                <button className="btn btn-sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
                  Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`btn btn-sm ${page === i + 1 ? "btn-primary" : "btn-outline"}`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button className="btn btn-sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
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
