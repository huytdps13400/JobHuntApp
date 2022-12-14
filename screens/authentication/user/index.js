import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontFamily, Icon } from "../../../assets";
import { useDispatch, useSelector } from "react-redux";
import { endLoading, setLoginStatus, startLoading } from "../../../store/slices/user/userSlice";
import { useEffect } from "react";
import { getProfileAccount } from "../../../api/user/user";
import { get } from "lodash";
import { baseURL } from "../../../apiServer";
import { clearProfileFromPersist } from "../../../store/slices/user/ persits";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { routeNames } from "../../../navigation/routeNames";

const UserScreen = () => {
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation()
  const { userId, profile } = useSelector(state => state.user)
  const onGetProfile = async () => {
    dispatch(startLoading());
    await dispatch(getProfileAccount({ userId })).unwrap();
    dispatch(endLoading());

  }
  useEffect(() => {
    onGetProfile()
  }, [isFocused]);
  const CPAvatar = get(profile, "CPAvatar", "");

  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image style={styles.imageView} source={{ uri: baseURL + CPAvatar }} />
        <Text
          style={{
            fontFamily: FontFamily.SoDoSansSemiBold,
            fontSize: 15,
            marginTop: 10,
          }}
        >
          {profile.CddFullName || 'User Name'}
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
        onPress={() => navigation.navigate(routeNames.InfoProfileScreen)}
      >
        <Text style={{ fontFamily: FontFamily.SoDoSansRegular, fontSize: 14 }}>
          Th??ng tin c?? nh??n
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
        onPress={() => {
          dispatch(setLoginStatus(false));
          clearProfileFromPersist()
        }}
      >
        <Text style={{ fontFamily: FontFamily.SoDoSansRegular, fontSize: 14 }}>
          ????ng xu???t
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
