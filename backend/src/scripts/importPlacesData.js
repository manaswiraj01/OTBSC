import axios from "axios";
import { placesData } from "../data/placesData.js";

const API_URL = "http://localhost:4000/admin/add/place";

// optional delay to avoid overload
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const importPlaces = async () => {
  for (const place of placesData) {
    try {
      const res = await axios.post(API_URL, place, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      await delay(500);
    } catch (err) {
      if (err.response) {
        console.log(
          `⚠️ Failed: ${place.name} -> ${err.response.data.message}`
        );
      } else {
        console.log(`❌ Error: ${place.name} -> ${err.message}`);
      }
    }
  }

  console.log("🎉 Import finished");
};

importPlaces();