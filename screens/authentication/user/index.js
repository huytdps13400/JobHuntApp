import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontFamily, Icon } from "../../../assets";
import { useDispatch } from "react-redux";
import { setLoginStatus } from "../../../store/slices/user/userSlice";

const UserScreen = () => {
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();
  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <View style={{ alignSelf: "center" }}>
        <Image style={styles.imageView} source={Icon.profile} />
        <Text
          style={{
            fontFamily: FontFamily.SoDoSansSemiBold,
            fontSize: 15,
            marginTop: 10,
          }}
        >
          User Name
        </Text>
      </View>
      <TouchableOpacity
        style={{
          padding: 16,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          backgroundColor: "white",
          marginVertical: 20,
          marginHorizontal: 16,
        }}
      >
        <Text style={{ fontFamily: FontFamily.SoDoSansRegular, fontSize: 14 }}>
          Thông tin cá nhân
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 16,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          backgroundColor: "white",
          marginVertical: 20,
          marginHorizontal: 16,
        }}
        onPress={() => dispatch(setLoginStatus(false))}
      >
        <Text style={{ fontFamily: FontFamily.SoDoSansRegular, fontSize: 14 }}>
          Đăng xuất
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageView: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
});

export default UserScreen;
