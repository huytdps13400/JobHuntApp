import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const Button = ({ onPress, title, style }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.textTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1D438A",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginVertical: 20,
  },
  textTitle: {
    fontFamily: "SoDoSans-SemiBold",
    fontSize: 20,
    color: "white",
  },
});

export default Button;
