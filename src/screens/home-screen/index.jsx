// HomeScreen.js

import React from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { convertKelvinToCalsius, getWeatherData } from "./helpers";
import { useQuery } from "react-query";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { WeatherInfoCard } from "../../components/weather-info-card";

const HomeScreen = ({ navigation }) => {
  const {
    data: weatherData,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["get-location-data"],
    queryFn: () => {
      return getWeatherData();
    },
  });
  const currentTempIcon =
    "https://openweathermap.org/img/wn/" +
    weatherData[1]?.data?.weather[0]?.icon +
    "@4x.png";

  const currentTemp = convertKelvinToCalsius(weatherData[1]?.data?.main?.temp);
  const currentCity = weatherData[1]?.name;
  const currentWeather = weatherData[1]?.data?.weather[0]?.main;

  return (
    <View style={styles.body}>
      <StatusBar backgroundColor={"#0ea0ac"} />
      {isFetching && (
        <ActivityIndicator
          style={styles.loader}
          color={"white"}
          size={"large"}
        />
      )}
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Current Weather</Text>

          <View style={styles.currentTemp}>
            <View style={styles.row}>
              {currentTempIcon && (
                <Image
                  style={styles.icon}
                  resizeMode="contain"
                  source={{
                    uri: currentTempIcon,
                  }}
                />
              )}
              <Text style={styles.currentTempText}>{currentTemp}°</Text>
            </View>
            <Text style={styles.currentCityNameTxt}>{currentCity}</Text>
          </View>
          <Text style={styles.currentWeatherTxt}>{currentWeather}</Text>
        </View>
        <View>
          {weatherData &&
            weatherData.length > 0 &&
            weatherData.map((item, index) => {
              return (
                <WeatherInfoCard
                  onPress={() => {
                    navigation.navigate("DetailsScreen", { data: item });
                  }}
                  key={(Math.random() + index)?.toString()}
                  weather={item?.data.weather[0].main}
                  temperature={item?.data?.main?.temp}
                  name={item?.name}
                  icon={item?.data.weather[0].icon}
                />
              );
            })}
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  body: { flex: 1, backgroundColor: "#0ea0ac", paddingVertical: hp(2.5) },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: RFPercentage(3),
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
  },
  loader: {
    position: "absolute",
    top: hp(50),
    left: wp(50),
  },
  row: { flexDirection: "row", alignItems: "center" },
  currentTemp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  currentCityNameTxt: {
    fontSize: RFPercentage(3),
    marginHorizontal: wp(5),
    fontWeight: "bold",
    color: "white",
  },
  currentWeatherTxt: {
    fontSize: RFPercentage(3.5),
    marginHorizontal: wp(5),
    fontWeight: "bold",
    color: "white",
  },
  currentTempText: {
    fontSize: RFPercentage(5.5),
    fontWeight: "bold",
    color: "white",
  },
  icon: { height: wp(30), width: wp(30) },
});
