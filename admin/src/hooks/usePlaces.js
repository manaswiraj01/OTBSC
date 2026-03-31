import { useEffect, useState } from "react";
import {
  getPlaces,
  getPlaceById,
  addPlace,
  updatePlace,
  deletePlace
} from "../api/place.api.js";

const usePlaces = (page, setPage, limit, search, category) => {

  const [places, setPlaces] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  // FETCH PLACES
  const fetchPlaces = async (isInitial = false) => {
    try {
      if (isInitial) {
        setLoading(true);   // only first page load
      } else {
        setFetching(true);  // search / filter / pagination
      }

      const res = await getPlaces({
        page,
        limit,
        search,
        category
      });

      setPlaces(res.data.data);
      setTotal(res.data.pagination.totalPlaces);

    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  // GET SINGLE PLACE
  const fetchPlaceById = async (id) => {
    try {

      const res = await getPlaceById(id);
      return res.data.data;

    } catch (error) {
      console.error("Error fetching place:", error);
    }
  };

  // ADD PLACE
  const createPlace = async (data) => {
    try {

      await addPlace(data);
      fetchPlaces();

    } catch (error) {
      console.error("Error adding place:", error);
    }
  };

  const editPlace = async (id, data) => {
    try {

      await updatePlace(id, data);

      return { success: true };

    } catch (error) {

      console.error("Error updating place:", error);

      return {
        success: false,
        error
      };
    }
  };

  const handleDelete = async (place) => {
    if (places.length === 1 && page > 1) {
      setPage(prev => prev - 1);
    }
    setPlaces(prev => prev.filter(p => p._id !== place._id));
    setTotal(prev => prev - 1);

    try {
      await deletePlace(place._id);
    } catch (error) {
      console.error("Delete failed", error);
      fetchPlaces();
    }

  };

  useEffect(() => {
    fetchPlaces(places.length === 0);
  }, [page, limit, search, category]);

  return {
    places,
    total,
    loading,
    fetching,
    fetchPlaces,
    fetchPlaceById,
    createPlace,
    editPlace,
    handleDelete
  };
};

export default usePlaces;