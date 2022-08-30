import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoginStatus } from "../../../store/slices/user/userSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../../components/Button";
import { postLogin } from "../../../api/user/user";
// import TextInput from "../../../components/TextInput";
import Constants from "expo-constants";

const { manifest } = Constants;

const width = Dimensions.get("window").width;

const LoginScreen = () => {
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();
  const refEmail = useRef(null);
  const [email, setEmail] = useState("HoangTVDE140186@fpt.edu.vn");
  const [password, setPassword] = useState("HoangTVDE140186");

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
            const uri = `http://${manifest.debuggerHost
              .split(":")
              .shift()}:4000`;
            const formData = new FormData();
            formData.append("Email", email);
            formData.append("Password", password);

            formData.append("RememberMe", false);

            formData.append("type", "candidatelogin");
            console.log({ uri });
            await dispatch(
              postLogin({
                data: formData,
                // Email: email,
                // Password: password,
                // RememberMe: false,
                // type: "candidatelogin",
              })
            ).unwrap();
            dispatch(setLoginStatus(true));
          }}
          title="Đăng Nhập"
        />
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
