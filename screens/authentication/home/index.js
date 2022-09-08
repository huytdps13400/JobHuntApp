import { useIsFocused, useNavigation } from "@react-navigation/native";
import { get, values } from "lodash";
import moment from "moment/moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { getSearchJobByKeyWord } from "../../../api/user/user";
import { baseURL } from "../../../apiServer";
import { FontFamily, Icon } from "../../../assets";
import { routeNames } from "../../../navigation/routeNames";
import { setKeyWord } from "../../../store/slices/user/userSlice";

const HomeScreen = () => {
  const inset = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const { listJob, KeywordJob } = useSelector((state) => state.user);
  const [keyword, setKeyword] = useState(KeywordJob);

  const onHandleSearch = async (text) => {
    await dispatch(getSearchJobByKeyWord({ keyWord: text })).unwrap();
  };

  useEffect(() => {
    onHandleSearch('')
  }, []);
  console.log('kaka',)
  useEffect(() => {
    setKeyword(KeywordJob)
  }, [KeywordJob])
  const renderHeader = useMemo(() => {
    return (
      <>
        <View style={styles.boxHeader}>
          <TextInput
            placeholder="Nhập từ khoá tìm kiếm..."
            style={styles.textInputStyle}
            onChangeText={(text) => { setKeyword(text); dispatch(setKeyWord(text)) }}
            value={KeywordJob || ''}

          />
          <TouchableOpacity
            onPress={() => {
              setTimeout(() => {
                onHandleSearch(KeywordJob);

              }, 300)
              console.log({ keyword })
            }}
          >
            <Image
              source={Icon.search}
              style={styles.iconSearch}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </>
    );
  }, [setKeyword, keyword]);
  const renderItem = ({ item, index }) => {
    const SalaryDTO = get(item, 'SalaryDTO', {});
    const RJTitle = get(item, 'RJTitle', '');
    const RJNameContact = get(item, 'RJNameContact', '');
    const RJ_WorkPlace = get(item, 'RJ_WorkPlace', '');
    const RJExpirationDate = get(item, 'RJExpirationDate', '');
    const RecruitDTO = get(item, 'RecruitDTO', {});
    const RILogo = get(RecruitDTO, 'RILogo', '')

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate(routeNames.jobDetailScreen)}
      >
        <Image
          style={{ width: 56, height: 56, borderRadius: 4 }}
          source={{
            uri: baseURL + RILogo,
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
            {RJTitle}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: FontFamily.SoDoSansRegular,
              color: "#285CBD",
              marginBottom: 5,
            }}
          >
            {RJNameContact}
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
              {RJ_WorkPlace}
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
              {get(SalaryDTO, 'SShow', '')}
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
              Hết hạn:{moment(RJExpirationDate).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    return <View style={{ width: 10, height: 10 }} />;
  };

  const renderEmpty = () => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          flex: 1,
        }}
      >
        <Image
          source={Icon.jobSearch}
          style={{
            width: 100,
            height: 100,
          }}
        />
        <Text
          style={{
            fontFamily: FontFamily.SoDoSansRegular,
            fontSize: 14,
            marginTop: 10,
          }}
        >
          Danh sách rỗng.
        </Text>
      </View>
    );
  };
  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        ListHeaderComponent={renderHeader}
        data={listJob || []}
        renderItem={renderItem}
        style={{ backgroundColor: "white" }}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        extraData={listJob}
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
