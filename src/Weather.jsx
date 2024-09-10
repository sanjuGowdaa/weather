import React, { useState } from "react";
import "./weather.css";

const api = {
  key: "ac4e18c3b09cb1df48dae58704a5e61d",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        })
        .catch((error) => console.error("Error fetching weather data:", error));
    }
  };

  const dateBuilder = (d) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day}, ${date} ${month} ${year}`;
  };

  return (
    <div
      className={weather.main && weather.main.temp > 16 ? "app warm" : "app"}
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        {weather.main ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name &&
                  weather.sys &&
                  `${weather.name}, ${weather.sys.country}`}
                <div className="date">{dateBuilder(new Date())}</div>
                <div className="weather-box">
                  <div className="temp">{Math.round(weather.main.temp)}°C</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Please enter a city to get weather information.</div>
        )}
      </main>
    </div>
  );
};

export default Weather;
