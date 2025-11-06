import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "./data/apiPath";

const WeatherModule = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setError("");
    setLoading(true);
    setWeather(null);

    try {
      const response = await axios.get(`${API_URL}/api/weather?city=${city}`);
      setWeather(response.data);
    } catch (err) {
      setError("City not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-80 h-[330px] bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl flex flex-col justify-center items-center p-5 transition-transform hover:scale-[1.02]">
      <div className="text-center w-72">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center justify-center">
          Weather Info
        </h2>

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="w-72 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />

        <button
          onClick={fetchWeather}
          disabled={loading}
          className={`w-72 px-4 py-2 rounded-lg text-white transition-all ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Loading..." : "Get Weather"}
        </button>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>

      {weather && !loading && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold capitalize">{weather.city}</h3>
          <p className="text-gray-600">{weather.temperature} °C</p>
          <p className="text-gray-500">{weather.condition}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherModule;
