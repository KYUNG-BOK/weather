import { useState, useEffect } from "react";
import axios from "axios";

export const useWeather = (location) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "95b7b59ec96f6ab8981f1f043b8db737";

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
          params: {
            lat: location.lat,
            lon: location.lon,
            appid: API_KEY,
            units: "metric",
            lang: "ko",
          },
        });
       console.log("API 응답 데이터:", res.data);     
        setWeatherData(res.data);
        setError(null);
      } catch (e) {
        setError("날씨 데이터를 가져오는 중 오류가 발생했습니다.");
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  return { weatherData, error, loading };
};
