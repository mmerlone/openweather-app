import React, { useEffect, useRef, useState } from "react";
import { type City } from "../types/City";
import { fetchWeatherData } from "../utils/fetchWeatherData";

interface CityWeatherProps {
  city: City;
}

const CityWeather: React.FC<CityWeatherProps> = ({
  city,
}: CityWeatherProps) => {
  const [data, setData] = useState<City>(city);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const updateEachSecs = 10 * 60 * 1000;
  // const updateEachSecs = 70 * 1000;
  const [timeleft, setTimeLeft] = useState<number>(updateEachSecs);
  const intervalRef = useRef<number | null>(null);

  const {
    name,
    state,
    country,
    dt,
    temperature,
    humidity,
    pressure,
    wind,
    description,
    icon,
  } = data;

  let tClass;
  if (temperature) {
    if (temperature < 5) {
      tClass = "cold";
    } else if (temperature > 5 && temperature < 25) {
      tClass = "temperate";
    } else {
      tClass = "hot";
    }
  } else {
    tClass = "";
  }

  var formatTime = function (input: number) {
    var pad = function (input: number): string {
      return input < 10 ? "0" + input.toString() : input.toString();
    };
    return [
      pad(Math.floor(input / 3600)),
      pad(Math.floor((input % 3600) / 60)),
      pad(Math.floor(input % 60)),
    ].join(":");
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const weatherData = await fetchWeatherData(city);
        setData(weatherData);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1000) {
          fetchData();
          return updateEachSecs;
        } else {
          return prevTimeLeft - 1000;
        }
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [city]);

  return (
    <div className="city-weather">
      <header>
        <h1>
          {name}, {state}, {country}
        </h1>
        {description && (
          <p>
            {description}{" "}
            {icon && (
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={description}
              />
            )}
          </p>
        )}
        {data?.temperature && (
          <div className="temp">
            <p>Temperature: {temperature}°C</p>
            <div className={tClass}>&nbsp;</div>
          </div>
        )}
      </header>
      <article>
        {dt && <p>Updated at {new Date(dt * 1000).toLocaleString()}</p>}
        <ul>
          {data?.humidity && <li>Humidity: {humidity}%</li>}
          {data?.pressure && <li>Pressure: {pressure} hPa</li>}
          {wind && <li>Wind Speed: {wind} m/s</li>}
        </ul>
        {error && (
          <p className="error">
            Error:{" "}
            {error instanceof Error
              ? error.message
              : "An unknown error occurred"}
          </p>
        )}
      </article>
      {loading && <p>Loading...</p>}
      {!loading && !dt && <p>No weather data available.</p>}
      <footer>
        <p>Next update in {formatTime(timeleft / 1000)}</p>
      </footer>
    </div>
  );
};

export default CityWeather;
