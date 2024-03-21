import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { convertKelvinToCalsius } from "./helpers";
export function WeatherInfoCard({ temperature, name, icon, onPress, weather }) {
  return (
    <View style={styles.card}>
      <View style={styles.cityNameRow}>
        <View style={styles.nameView}>
          <Text style={styles.cityName}>{name}</Text>
          <Text style={styles.temperature}>
            {convertKelvinToCalsius(temperature)}°
          </Text>
          <Text style={styles.weather}>{weather}</Text>
        </View>
        <View>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={{
              uri: "https://openweathermap.org/img/wn/" + icon + "@4x.png",
            }}
          />
        </View>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.detailsBtn}>
        <Text style={styles.detailsBtnText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: wp(90),
    height: hp(17),
    borderRadius: wp(3),
    backgroundColor: "rgba(44, 106, 228, 0.7)",
    alignSelf: "center",
    marginVertical: hp(1),
  },
  cityNameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameView: {
    marginLeft: wp(4),
    marginTop: hp(1),
  },
  temperature: {
    color: "white",
    fontSize: RFPercentage(3),
    fontWeight: "bold",
    marginBottom: hp(0.2),
  },
  weather: {
    color: "white",
    fontSize: RFPercentage(2.5),
    marginBottom: hp(0.2),
  },
  cityName: {
    fontSize: RFPercentage(2),
    color: "white",
  },
  icon: { height: wp(17), width: wp(17) },
  detailsBtn: {
    width: wp(30),
    height: hp(4),
    backgroundColor: "#0a99fe",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    borderRadius: wp(2),
    marginRight: wp(3),
  },
  detailsBtnText: {
    color: "white",
    fontSize: RFPercentage(2),
  },
});
