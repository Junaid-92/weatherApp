import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { QueryClient, QueryClientProvider } from "react-query"; // Import QueryClient and QueryClientProvider
import HomeScreen from "./src/screens/home-screen";
import DetailsScreen from "./src/screens/details-screen";
import { View } from "react-native";

const Stack = createStackNavigator();
const queryClient = new QueryClient(); // Create an instance of QueryClient

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ backgroundColor: "#3167e7", flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              options={{
                headerTitle: "Current Weather",
                headerTitleStyle: { color: "white" },
                headerBackAllowFontScaling: false,
                headerTintColor: "white",
                headerStyle: { backgroundColor: "#0ea0ac" },
              }}
              name="Home"
              component={HomeScreen}
            />
            <Stack.Screen
              options={{
                headerTitle: "Home Screen",
                headerTitleStyle: { color: "white" },
                headerBackAllowFontScaling: false,
                headerTintColor: "white",
                headerStyle: { backgroundColor: "#3167e7" },
              }}
              name="DetailsScreen"
              component={DetailsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </QueryClientProvider>
  );
};

export default App;
