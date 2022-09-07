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
import { setLoginStatus } from "../../../store/slices/user/userSlice";
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
    <View
      style={[
        styles.container,
        { paddingTop: inset.top, backgroundColor: "white" },
      ]}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../../assets/logoAppLogin.png")}
          style={{ width: width, height: 50 }}
          resizeMode="contain"
        />
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
        />

        <Button
          onPress={async () => {
            // await dispatch(
            //   postLogin({
            //     Email: email,
            //     Password: password,
            //     RememberMe: false,
            //     type: "candidatelogin",
            //   })
            // ).unwrap();
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
            }}
          >
            Đăng kí
          </Text>
        </TouchableOpacity>
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
