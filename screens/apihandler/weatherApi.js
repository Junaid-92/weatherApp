import React from "react";
import { useQuery } from "react-query";
import { Text, View } from "react-native";

const fetchWeatherData = async () => {
  try {
    // Get user's location
    let city = "";
    let lat = "";
    let lon = "";

    const locationResponse = await fetch("https://geolocation-db.com/json/");
    if (!locationResponse.ok) {
      throw new Error("Failed to fetch location data");
    }
   
    const locationData = await locationResponse.json();
    city = locationData.city;
    lat = locationData.latitude;
    lon = locationData.longitude;
   
    // Get today's date
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    const currentDate = `${yyyy}-${mm}-${dd}`;

    console.log("kama", currentDate)
    // Make weather API call
    const BASE_URL = `https://api.brightsky.dev/weather?lat=${lat}&lon=${lon}&date=${currentDate}`;
    const weatherResponse = await fetch(BASE_URL);
    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const weatherData = await weatherResponse.json();
    
    // Extract necessary data from the weather response
    const result = weatherData.weather;
    const lowerBound = new Date();
    const upperBound = new Date();
    lowerBound.setHours(lowerBound.getHours() - 1);

    // Current Weather Info
    const resultProductData = result.find((a) => {
      const date = new Date(a.timestamp);
      return date >= lowerBound && date <= upperBound;
    });

    // Filter based on the hour now
    const hourData = result.filter((a) => {
      const date = new Date(a.timestamp);
      return (
        date.getHours() === 0 ||
        date.getHours() === 9 ||
        date.getHours() === 13 ||
        date.getHours() === 17 ||
        date.getHours() === 21
      );
    });

    return {
      city: city,
      current: {
        temperature: Math.ceil(resultProductData.temperature),
        wind: resultProductData.wind_speed,
        pressure: Math.floor(resultProductData.pressure_msl),
      },
      nextDay: {
        temperature: Math.ceil(hourData[4].temperature),
        wind: hourData[4].wind_speed,
        pressure: Math.floor(hourData[4].pressure_msl),
      },
      eightAM: {
        temperature: Math.ceil(hourData[0].temperature),
        wind: hourData[0].wind_speed,
        pressure: Math.floor(hourData[0].pressure_msl),
      },
      twelveAM: {
        temperature: Math.ceil(hourData[1].temperature),
        wind: hourData[1].wind_speed,
        pressure: Math.floor(hourData[1].pressure_msl),
      },
      fourPM: {
        temperature: Math.ceil(hourData[2].temperature),
        wind: hourData[2].wind_speed,
        pressure: Math.floor(hourData[2].pressure_msl),
      },
      eightPM: {
        temperature: Math.ceil(hourData[3].temperature),
        wind: hourData[3].wind_speed,
        pressure: Math.floor(hourData[3].pressure_msl),
      },
    };
  } catch (error) {
    throw new Error("Error fetching weather data: " + error.message);
  }
};

export const useWeather = () => {
  return useQuery("weather", fetchWeatherData);
};

const Weather = () => {
  const { data, isLoading, isError } = useWeather();

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error fetching weather data</Text>;

  // Your JSX code rendering weather data here
};

export default Weather;
