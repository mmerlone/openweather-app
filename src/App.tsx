import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import { type City } from "./types/City";
import CityWeather from "./components/CityWeather";

function App() {
  const cities: City[] = [
    {
      name: "San Francisco",
      state: "CA",
      country: "USA",
    },
    {
      name: "Joinville",
      state: "SC",
      country: "Brasil",
    },
    {
      name: "Araucária",
      state: "PR",
      country: "Brasil",
    },
  ];

  return (
    <>
      <div>
      <img src="https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png" alt="logo" />
      </div>
      <h1>Openweather app</h1>
      <div className="cards">
        {cities.map((city, i) => (
          <CityWeather city={city} key={i}/>
        ))}
      </div>
    </>
  );
}

export default App;
