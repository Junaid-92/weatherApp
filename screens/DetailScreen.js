// screens/DetailScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailScreen = ({ route }) => {
  const { weatherData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.location}>City: {weatherData.city}</Text>
      <Text style={styles.weather}>Current Weather: {weatherData.current.weather}</Text>
      <Text style={styles.temperature}>Temperature: {weatherData.current.temperature}°C</Text>
      <Text style={styles.description}>Wind Speed: {weatherData.current.wind} km/h</Text>
      {/* Add more weather details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  location: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weather: {
    fontSize: 18,
    marginBottom: 5,
  },
  temperature: {
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default DetailScreen;
