import express from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { State, City } from "country-state-city";

const locationRouter = express.Router();

locationRouter.get("/states", userAuth, (req, res) => {
  try {
    const states = State.getStatesOfCountry("IN");
    res.status(200).json(states);
  } catch (error) {
    console.error("Error fetching states:", error);
    res.status(500).json({ message: "Failed to fetch states" });
  }
});

locationRouter.get("/state/:stateCode/cities", userAuth, (req, res) => {
  try {
    const { stateCode } = req.params;
    const cities = City.getCitiesOfState("IN", stateCode.toUpperCase());
    res.status(200).json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ message: "Failed to fetch cities" });
  }
});

export default locationRouter;
