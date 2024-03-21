import { OPEN_WEATHER_API_KEY, coordinatesData } from "./constants";

async function fetchWeatherData(latitude, longitude, name) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API_KEY}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const respData = JSON.parse(JSON.stringify(data));
    return {
      status: "fulfilled",
      value: {
        name: name,
        data: respData,
      },
    };
  } catch (error) {
    return { status: "rejected", reason: error.message };
  }
}

async function fetchWeatherDataForMultipleCoordinates() {
  const promises = coordinatesData.map((coord) =>
    fetchWeatherData(coord.lat, coord.long, coord.name)
  );
  const results = await Promise.allSettled(promises);
  const data = results.map((item) => item.value);
  return data;
}

export async function getWeatherData() {
  const data = await fetchWeatherDataForMultipleCoordinates();
  const filteredData = data
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);
  return filteredData;
}

export function convertKelvinToCalsius(kelvin) {
  if (kelvin) {
    return parseInt(kelvin - 273.15);
  }
}