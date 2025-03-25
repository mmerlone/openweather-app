import { type City } from "../types/City"

const formatWeatherData = (city: City, weatherData: any) => {
    return {
        ...city,
        dt: weatherData.dt,
        temperature: weatherData?.main?.temp,
        humidity: weatherData?.main?.humidity,
        pressure: weatherData?.main?.pressure,
        wind: weatherData?.wind?.speed,
        description: weatherData?.weather
          ? weatherData?.weather[0]?.description
          : "",
        icon: weatherData?.weather ? weatherData?.weather[0]?.icon : "",
      }
}

export const fetchWeatherData = async (city: City) => {
    const params = new URLSearchParams();
    params.append("q", `${city.name},${city.state},${city.country}`);
    params.append("appid", import.meta.env.VITE_OWM_API_KEY);
    params.append("units", "metric");

    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    params.forEach((value, key) => {
      url.searchParams.append(key, value);
    });

    try {
      const response = await fetch(url.toString());
      const jsonData = await response.json();
      return formatWeatherData(city, jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
      return city;
    }
  };