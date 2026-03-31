import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../context/Context.jsx";


import ImageCarousel from "../components/placeDetails/ImageCarousal.jsx";
import PlaceHeader from "../components/placeDetails/placeHeader.jsx";
import PlaceDescription from "../components/placeDetails/PlaceDescription.jsx";
import PricingTable from "../components/placeDetails/PricingTable.jsx";
import ContactSection from "../components/placeDetails/ContactSection.jsx";
import ReviewSection from "../components/placeDetails/ReviewSection.jsx";
import { BASE_URL } from "../utils/constants.js";
import PlaceCard from "../components/PlaceCard.jsx";
const PlaceDetails = () => {
  const { id } = useParams();
const { userData } = useContext(Context);

  const [place, setPlace] = useState(null);
  const [suggested, setSuggested] = useState([]);

   
 useEffect(() => {
  const fetchData = async () => {
    try {
      setPlace(null);        // clear old data
      setSuggested([]);     // clear old suggestions

      const res = await axios.get(
        `${BASE_URL}/public/get/place/${id}`
      );

      const current = res.data.data;
      setPlace(current);

      const allRes = await axios.get(`${BASE_URL}/places`);
      const sameCity = allRes.data.data.filter(
        (p) => p.city === current.city && p._id !== current._id
      );

      setSuggested(sameCity.slice(0, 4));
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, [id]);


  if (!place) return null; // simple, clean as you wanted

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-6xl mx-auto bg-base-100 rounded-3xl overflow-hidden">
        <ImageCarousel images={place.photoUrls} />

        <div className="p-8">
          <PlaceHeader place={place} />
          <PlaceDescription description={place.description} />
          <PricingTable pricing={place.pricing} />
          <ContactSection
            email={place.contactEmail}
            phone={place.contactPhone}
            address={place.address}
          />

          <ReviewSection placeId={place._id} user={userData}/>

          {suggested.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {suggested.map((place) => (
                <PlaceCard key={place._id} place={place} />
              ))}
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
