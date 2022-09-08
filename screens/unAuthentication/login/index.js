import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  endLoading,
  setLoginStatus,
  startLoading,
} from "../../../store/slices/user/userSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../../components/Button";
import { postLogin } from "../../../api/user/user";
// import TextInput from "../../../components/TextInput";
import Constants from "expo-constants";
import { FontFamily } from "../../../assets";

const width = Dimensions.get("window").width;

const LoginScreen = () => {
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../../assets/logoAppLogin.png")}
          style={{ width: width, height: width / 2 }}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "100%", justifyContent: "space-evenly" }}>
          <TextInput
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
          <View style={{ height: 20 }} />
          <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />

          <Button
            onPress={async () => {
              dispatch(startLoading());
              await dispatch(
                postLogin({
                  Email: email,
                  Password: password,
                  RememberMe: false,
                  type: "candidatelogin",
                })
              ).unwrap();
              dispatch(endLoading());

              dispatch(setLoginStatus(true));
            }}
            title="Đăng Nhập"
          />
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Thông báo", "Vui lòng đăng kí trên web");
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: FontFamily.SoDoSansSemiBold,
                fontSize: 15,
                marginVertical: 20,
              }}
            >
              Đăng kí
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoginScreen;
