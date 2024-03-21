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

export async function getCurrentWeather() {
  try {
    // Fetch user's IP address
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipResponse.json();
    const ipAddress = ipData.ip;

    // Fetch location data using IP address
    const locationResponse = await fetch(`https://ipinfo.io/${ipAddress}/json`);
    const locationData = await locationResponse.json();
    const { loc } = locationData;

    // Extract latitude and longitude from location data
    const [latitude, longitude] = loc.split(",");

    // Fetch weather data using coordinates
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    // Extract relevant weather information
    const weatherInfo = {
      temperature: data?.main?.temp,
      description: data?.weather[0]?.main,
      icon: data?.weather[0]?.icon,
      city: data?.name,
      country: data?.sys?.country,
    };

    return weatherInfo;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}
