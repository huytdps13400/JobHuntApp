import { View, Text, Animated } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routeNames } from "./routeNames";
import tabNavigation from "./tabNavigation";
import useCachedResources from "../hooks/useCachedResources";
import LoginScreen from "../screens/unAuthentication/login";
import { useSelector } from "react-redux";
import JobDetail from "../screens/authentication/JobDetail";
import Loader from "../components/Loading";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name={routeNames.rootTabNavigation}
            component={tabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={routeNames.jobDetailScreen}
            component={JobDetail}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen
          name={routeNames.loginScreen}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
const Navigation = () => {
  const isLoadingComplete = useCachedResources();
  const { loadingApp } = useSelector((state) => state.user);
  const renderView = () => {
    return (
      <Animated.View style={{ flex: 1 }}>
        {isLoadingComplete && (
          <>
            {/* Root Navigation */}
            <RootNavigator />
            {loadingApp && <Loader />}
          </>
        )}
        {/* Snackbar */}
        {/* <SnackBar /> */}
      </Animated.View>
    );
  };

  return <NavigationContainer>{renderView()}</NavigationContainer>;
};

export default Navigation;
