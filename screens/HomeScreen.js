// HomeScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';
import { useWeather } from './apihandler/weatherApi';

const HomeScreen = ({ navigation }) => {
  const { data: weatherData, isLoading, isError } = useWeather(); // Use the useWeather hook

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : isError ? (
        <Text>Error fetching weather data</Text>
      ) : (
        <>
          <Text>City: {weatherData.city}</Text>
          <Text>Current Temperature: {weatherData.current.temperature}°C</Text>
          <Text>Current Wind Speed: {weatherData.current.wind} km/h</Text>
          <Button title="View Details" onPress={() => navigation.navigate('DetailScreen', { weatherData })} />
        </>
      )}
    </View>
  );
};

export default HomeScreen;
