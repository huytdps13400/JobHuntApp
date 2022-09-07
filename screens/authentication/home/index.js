import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontFamily, Icon } from "../../../assets";
import {
  StatusBar,
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from "expo-status-bar";
import { useIsFocused } from "@react-navigation/native";
import { useCallback } from "react";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getSearchJobByKeyWord } from "../../../api/user/user";

const HomeScreen = () => {
  const inset = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { listJob } = useSelector((state) => state.user);
  useEffect(() => {
    if (!isFocused) {
      setStatusBarBackgroundColor("white", true);
      setStatusBarStyle("dark");
    }
  }, [isFocused]);
  const onHandleSearch = useCallback((text) => {
    debounce(() => {
      dispatch(getSearchJobByKeyWord({ keyWord: text })).unwrap();
    }, 500);
  }, []);
  const renderHeader = () => {
    return (
      <View style={styles.boxHeader}>
        <TextInput
          placeholder="Enter KeyWord Title"
          style={styles.textInputStyle}
          onChangeText={(text) => onHandleSearch(text)}
        />
        <TouchableOpacity>
          <Image
            source={Icon.search}
            style={styles.iconSearch}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderItem = () => {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Image
          style={{ width: 56, height: 56, borderRadius: 4 }}
          source={{
            uri: "https://cdn.tgdd.vn/2020/04/GameApp/unnamed-200x200-18.png",
          }}
        />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: FontFamily.SoDoSansSemiBold,
              marginBottom: 5,
            }}
          >
            IT
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: FontFamily.SoDoSansRegular,
              color: "#285CBD",
              marginBottom: 5,
            }}
          >
            Ngân Hàng Á Châu
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Image
              source={Icon.placeholder}
              style={[
                styles.iconSearch,
                { tintColor: "gray", marginLeft: 0, marginRight: 5 },
              ]}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 15,
                fontFamily: FontFamily.SoDoSansRegular,
                flex: 1,
              }}
            >
              Phường 25 - Quận Bình Thạnh - HCM
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Image
              source={Icon.money}
              style={[
                styles.iconSearch,
                { tintColor: "gray", marginLeft: 0, marginRight: 5 },
              ]}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 15,
                fontFamily: FontFamily.SoDoSansRegular,
                flex: 1,
              }}
            >
              Trên 25 triệu
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Image
              source={Icon.calendar}
              style={[
                styles.iconSearch,
                { tintColor: "gray", marginLeft: 0, marginRight: 5 },
              ]}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 15,
                fontFamily: FontFamily.SoDoSansRegular,
                flex: 1,
              }}
            >
              Hết hạn:30/08/2002
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    return <View style={{ width: 10, height: 10 }} />;
  };
  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <StatusBar
        backgroundColor={isFocused ? "#1D438A" : "white"}
        translucent={true}
        animated
        style="light"
      />
      <FlatList
        ListHeaderComponent={renderHeader}
        data={listJob || []}
        renderItem={renderItem}
        style={{ backgroundColor: "white" }}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  boxHeader: {
    backgroundColor: "#1D438A",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInputStyle: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 12,
    borderRadius: 4,
    fontFamily: FontFamily.SoDoSansRegular,
    paddingVertical: 8,
  },
  iconSearch: {
    width: 24,
    height: 24,
    tintColor: "white",
    marginLeft: 10,
  },
  itemContainer: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginHorizontal: 16,
    padding: 16,
    marginTop: 10,
    borderRadius: 4,
    flexDirection: "row",
  },
});

export default HomeScreen;
