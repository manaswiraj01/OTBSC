import { useEffect, useState } from "react";
import {
  getPlaces,
  getPlaceById,
  addPlace,
  updatePlace,
  deletePlace
} from "../api/place.api.js";

const usePlaces = (page, limit, search, category) => {

  const [places, setPlaces] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // FETCH PLACES
  const fetchPlaces = async () => {
    try {

      setLoading(true);

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

  // UPDATE PLACE
  const editPlace = async (id, data) => {
    try {

      await updatePlace(id, data);
      fetchPlaces();

    } catch (error) {
      console.error("Error updating place:", error);
    }
  };

  const handleDelete = async (place) => {
    setPlaces(prev => prev.filter(p => p._id !== place._id));

    try {

      await deletePlace(place._id);

    } catch (error) {

      console.error("Delete failed", error);
      fetchPlaces();

    }

  };

  useEffect(() => {
    fetchPlaces();
  }, [page, limit, search, category]);

  return {
    places,
    total,
    loading,
    fetchPlaces,
    fetchPlaceById,
    createPlace,
    editPlace,
    handleDelete
  };
};

export default usePlaces;