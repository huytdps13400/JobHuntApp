import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routeNames } from "./routeNames";
import * as React from "react";
import Home from "../screens/authentication/home";
import User from "../screens/authentication/user";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export const StackNavigator = (screens) => {
  return (
    <Stack.Navigator>
      {screens.map((screen, index) => (
        <Stack.Screen
          key={`${screen.name}-${index}`}
          name={screen.name}
          component={screen.component}
          options={{ headerShown: false, ...screen.options }}
        />
      ))}
    </Stack.Navigator>
  );
};

const CardsStackScreen = () =>
  StackNavigator({ name: routeNames.userScreen, component: User });

const Tab = createBottomTabNavigator();
const HomeStackScreen = () => {
  return (
    <Tab.Screen
      name={routeNames.homeScreen}
      component={Home}
      options={{ headerShown: false }}
    />
  );
};
const tabScreens = () => {
  return [
    {
      name: routeNames.homeTab,
      component: HomeStackScreen,
    },
    // {
    //   name: routeNames.userScreen,
    //   component: CardsStackScreen,
    // },
  ];
};

export default function () {
  const dataTabScreens = tabScreens();
  return (
    <Tab.Navigator
      defaultScreenOptions={{ tabBarStyle: { display: "none" } }}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name={routeNames.homeScreen}
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name={"home"}
              size={24}
              color={focused ? "#1D438A" : color}
            />
          ),
          tabBarLabelStyle: {
            fontFamily: "SoDoSans-SemiBold",
          },
        }}
        tab
      />
      <Tab.Screen
        name={routeNames.userScreen}
        component={User}
        options={{
          headerShown: false,
          tabBarLabel: "Cá nhân",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name={"person"}
              size={24}
              color={focused ? "#1D438A" : color}
            />
          ),
          tabBarLabelStyle: {
            fontFamily: "SoDoSans-SemiBold",
          },
        }}
      />
    </Tab.Navigator>
  );
}
