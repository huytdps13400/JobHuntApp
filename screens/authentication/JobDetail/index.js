import { useIsFocused, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontFamily, Icon } from "../../../assets";
import Button from "../../../components/Button";

export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;

const JobDetail = () => {
  const inset = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <View
        style={{
          padding: 16,
          backgroundColor: "#1D438A",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{ width: 24, height: 24, tintColor: "#FFFFFF" }}
            resizeMode="contain"
            source={Icon.leftarrow}
          />
        </TouchableOpacity>

        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            justifyContent: "center",
            marginLeft: 8,
            fontSize: 15,
            fontFamily: FontFamily.SoDoSansSemiBold,
            color: "white",
          }}
        >
          IT support System
        </Text>
      </View>
      <ScrollView>
        <Image
          source={{
            uri: "https://cdn.tgdd.vn/2020/04/GameApp/unnamed-200x200-18.png",
          }}
          style={{ width: width, height: width / 2 }}
        />
        <Text style={{ height: 100, backgroundColor: "white", marginTop: 20 }}>
          JobDetail
        </Text>
        <Text style={{ height: 100, backgroundColor: "white", marginTop: 20 }}>
          JobDetail
        </Text>
        <Text style={{ height: 100, backgroundColor: "white", marginTop: 20 }}>
          JobDetail
        </Text>
        <Text style={{ height: 100, backgroundColor: "white", marginTop: 20 }}>
          JobDetail
        </Text>
        <Text style={{ height: 100, backgroundColor: "white", marginTop: 20 }}>
          JobDetail
        </Text>
        <Text style={{ height: 100, backgroundColor: "white", marginTop: 20 }}>
          JobDetail
        </Text>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 16,
          width: "100%",
          position: "absolute",
          bottom: inset.bottom + 20,
        }}
      >
        <Button
          title={"Ứng tuyển "}
          style={{
            marginVertical: 0,
            backgroundColor: "#1D438A",
            width: "100%",
          }}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default JobDetail;
