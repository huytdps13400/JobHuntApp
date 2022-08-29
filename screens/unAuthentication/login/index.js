import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { setLoginStatus } from "../../../store/slices/user/userSlice";

const LoginScreen = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <TouchableOpacity
        style={{ backgroundColor: "red", marginTop: 50 }}
        onPress={() => {
          dispatch(setLoginStatus(true));
        }}
      >
        <Text>LoginScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
