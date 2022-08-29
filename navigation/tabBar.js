/* eslint-disable react-native/no-inline-styles */

import React, { useEffect } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { routeNames } from "./routeNames";
import { MaterialIcons } from "@expo/vector-icons";

const TabItem = ({ icon, label, active, onPress, index }) => {
  const animation = new Animated.Value(0);

  Animated.spring(animation, {
    toValue: active ? 1 : 0,
    stiffness: 100,
    useNativeDriver: true,
  }).start();

  const iconTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 0],
  });

  const labelTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={styles.container}>
        <Animated.View
          style={{
            transform: [{ translateX: iconTranslate }],
            opacity: active ? 1 : 0.4,
          }}
        >
          <MaterialIcons name={icon} size={20} color={"red"} />
        </Animated.View>
        <Animated.View
          style={[
            styles.centered,
            { transform: [{ translateX: labelTranslate }] },
          ]}
        >
          {active ? (
            <Animated.Text style={styles.label}>{label}</Animated.Text>
          ) : null}
        </Animated.View>
        <Animated.View
          style={[StyleSheet.absoluteFill, { transform: [{ translateX }] }]}
        >
          <Animated.View style={[styles.cover, { opacity: animation }]} />
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.bar}>
      {state.routeNames.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;
        const iconTab = route.name === routeNames.homeScreen ? "home" : "user";
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabItem
            key={index}
            icon={iconTab}
            label={isFocused ? label : null}
            active={isFocused}
            index={index}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 12,
    paddingBottom: 25,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    height: 40,
    paddingHorizontal: 4,
  },
  icon: {
    width: 18,
    tintColor: "#00b4d8",
  },
  label: {
    color: "#00b4d8",
    fontSize: 12,
    marginLeft: 5,
  },
  cover: {
    height: 40,
    borderRadius: 8,
    backgroundColor: "#00b4d8",
  },
});

export default CustomTabBar;
