// HomeScreen.js

import React, { useEffect } from "react";
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
import {
  convertKelvinToCalsius,
  getCurrentWeather,
  getWeatherData,
} from "./helpers";
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
    queryKey: ["get-weather-data"],
    queryFn: () => {
      return getWeatherData();
    },
  });

  const { data: currentWeatherData, isFetching: isCurrentWeatherFetching } =
    useQuery({
      queryKey: ["get-current-weather-data"],
      queryFn: async () => {
        return await getCurrentWeather();
      },
    });
  const currentTempIcon =
    weatherData &&
    "https://openweathermap.org/img/wn/" +
      weatherData[1]?.data?.weather[0]?.icon +
      "@4x.png";

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
                    uri: currentWeatherData?.icon,
                  }}
                />
              )}
              <Text style={styles.currentTempText}>
                {currentWeatherData?.temperature
                  ? parseInt(currentWeatherData?.temperature) + "°"
                  : ""}
              </Text>
            </View>
            <Text style={styles.currentCityNameTxt}>
              {currentWeatherData?.city}
            </Text>
          </View>
          <Text style={styles.currentWeatherTxt}>
            {currentWeatherData?.description}
          </Text>
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
