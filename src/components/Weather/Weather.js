import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const Weather = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [message, setMessage] = useState("");

  const handleFetchWeather = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://weatherbackend-wgog.onrender.com/weather",
        { location },
        { headers: { Authorization: token } }
      );
      setWeatherData(res.data.weather);
      setMessage(res.data.message);
    } catch (error) {
      setMessage("Error fetching weather data");
    }
  };

  return (
    <div className="weather-container">
      <h2>Know today's Weather.....!!</h2>
      <form onSubmit={handleFetchWeather} className="weather-form">
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="weather-input"
        />
        <button type="submit" className="weather-button">
          Get Weather
        </button>
      </form>
      {message && <p className="weather-message">{message}</p>}
      {weatherData && (
        <div className="weather-data">
          <h3>Weather in {location}</h3>
          <p>Temperature: {weatherData.main.temp}K</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
