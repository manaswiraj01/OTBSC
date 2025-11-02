import { State, City } from "country-state-city";

const states = State.getStatesOfCountry("IN");
console.log("Total States:", states.length);
console.log(states.slice(0, 5)); // first 5 states

const cities = City.getCitiesOfState("IN", "MH");
console.log("Cities of Maharashtra:", cities.slice(0, 5));
