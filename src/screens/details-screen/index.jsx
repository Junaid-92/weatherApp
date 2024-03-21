import React from "react";
import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { convertKelvinToCalsius } from "./helpers";

const DetailsScreen = ({ navigation, route }) => {
  const data = route.params.data.data;
  return (
    <View style={styles.body}>
      <StatusBar backgroundColor={"#3167e7"} />
      <View style={styles.cityNameRow}>
        <Text style={styles.cityName}>{data?.name}</Text>
      </View>
      {data && (
        <Image
          source={{
            uri:
              "https://openweathermap.org/img/wn/" +
              data?.weather[0]?.icon +
              "@4x.png",
          }}
          resizeMode="contain"
          style={styles.icon}
        />
      )}
      <Text style={styles.weatherDesc}>{data?.weather[0]?.main}</Text>
      <Text style={styles.temperature}>
        {convertKelvinToCalsius(data?.main?.temp)}°
      </Text>
      <Image
        resizeMode="contain"
        style={styles.horizontalBar}
        source={require("./../../assets/bar.png")}
      />
      <View style={styles.tempAttributesContainer}>
        <View style={styles.innerView}>
          <Image
            tintColor={"white"}
            resizeMode="contain"
            style={styles.attrIcon}
            source={require("../../assets/wind.png")}
          />
          <View>
            <Text style={styles.attValue}>{data?.wind?.speed} Km/h</Text>
            <Text style={styles.attName}>Wind</Text>
          </View>
        </View>
        <View style={styles.innerView}>
          <Image
            tintColor={"white"}
            resizeMode="contain"
            style={styles.attrIcon}
            source={require("../../assets/pressure.png")}
          />
          <View>
            <Text style={styles.attValue}>{data?.main?.pressure} mbar</Text>
            <Text style={styles.attName}>Pressure</Text>
          </View>
        </View>
        <View style={styles.innerView}>
          <Image
            tintColor={"white"}
            resizeMode="contain"
            style={styles.attrIcon}
            source={require("../../assets/humidity.png")}
          />
          <View>
            <Text style={styles.attValue}>{data?.main?.humidity}%</Text>
            <Text style={styles.attName}>Humidity</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#3167e7",
    paddingVertical: hp(3),
    paddingHorizontal: wp(5),
  },
  cityNameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cityName: {
    fontSize: RFPercentage(3),
    fontWeight: "500",
    color: "white",
  },
  weatherDesc: {
    fontSize: RFPercentage(3.2),
    color: "white",
    alignSelf: "center",
    marginBottom: hp(2),
  },
  temperature: {
    fontSize: RFPercentage(4),
    fontWeight: "800",
    color: "white",
    alignSelf: "center",
  },
  icon: { height: wp(50), width: wp(50), alignSelf: "center" },
  horizontalBar: {
    width: wp(90),
    alignSelf: "center",
  },
  tempAttributesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

  },
  innerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  attrIcon: {
    height: wp(7),
    width: wp(7),
    marginRight: wp(2)
  },
  attValue: {
    fontSize: RFPercentage(2),
    color: "white",
    marginBottom: hp(1)
  },
  attName: {
    fontSize: RFPercentage(2),
    fontWeight: "bold",
    color: "white",
  },
});

export default DetailsScreen;
