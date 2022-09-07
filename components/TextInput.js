import {
  View,
  Text,
  TextInput as BaseTextInput,
  StyleSheet,
} from "react-native";
import React, { forwardRef, useImperativeHandle, useState } from "react";

const TextInput = ({}, ref, rest) => {
  const [value, setValue] = useState("2222");

  const getValue = () => {
    return value;
  };

  useImperativeHandle(ref, () => {
    getValue();
  });
  return (
    <View style={styles.container}>
      <BaseTextInput onChangeText={(text) => setValue(text)} {...rest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    // flex: 1,
    // backgroundColor: "red",
  },
});
export default forwardRef(TextInput);
