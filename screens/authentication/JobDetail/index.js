import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { get } from "lodash";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import RenderHTML from "react-native-render-html";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { getJobDetail, getProfileAccount, postProfileCv } from "../../../api/user/user";
import { baseURL } from "../../../apiServer";
import { FontFamily, Icon } from "../../../assets";
import Button from "../../../components/Button";
import { endLoading, startLoading } from "../../../store/slices/user/userSlice";
import ModalConfirmCv from "./ModalConfirmCV";

export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;

const JobDetail = () => {
  const inset = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();
  const { width } = useWindowDimensions();
  const [isShowAlert, setIsShowAlert] = useState(false);

  const RecruitJobId = route.params?.jobId || 1
  console.log({ alo: route.params })
  const { jobDetail, userId, profile } = useSelector(state => state.user)
  const dispatch = useDispatch();

  const getJobDetailHandle = async () => {
    dispatch(startLoading());

    await dispatch(getJobDetail({ jobId: RecruitJobId })).unwrap();
    dispatch(endLoading());

  }
  const onPostCv = async () => {
    dispatch(startLoading());

    await dispatch(postProfileCv({
      UserID: userId,
      JobID: RecruitJobId,
      PhoneUser: profile?.AspNetUserDTO?.PhoneNumber,
      CVOld: userId + 1,
      Base64Content: profile?.CddPathCV,
      FileName: profile?.nameFileCV
    }));
    dispatch(endLoading());


  }
  useEffect(() => {
    if (isFocused) {
      getJobDetailHandle();
      dispatch(getProfileAccount({ userId })).unwrap();

    }
  }, [isFocused])
  const SalaryDTO = get(jobDetail, "SalaryDTO", {});
  const RJTitle = get(jobDetail, "RJTitle", "");
  const RJNameContact = get(jobDetail, "RJNameContact", "");
  const RJ_WorkPlace = get(jobDetail, "RJ_WorkPlace", "");
  const RJExpirationDate = get(jobDetail, "RJExpirationDate", "");
  const RJPostDate = get(jobDetail, "RJPostDate", "");
  const RJ_Describe = get(jobDetail, "RJ_Describe", "<p style='text-align:center;'>Hello World!</p>");
  const RJ_Require = get(jobDetail, "RJ_Require", "<p style='text-align:center;'>Hello World!</p>");
  const RJBenefit = get(jobDetail, "RJBenefit", "<p style='text-align:center;'>Hello World!</p>");


  const RecruitDTO = get(jobDetail, "RecruitDTO", {});
  const RILogo = get(RecruitDTO, "RICoverImage", "https://s3.cloud.cmctelecom.vn/tinhte2/2019/06/4677494_default-placeholder.png");
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
          {RJTitle}
        </Text>
      </View>
      <ScrollView>
        <Image
          source={{ uri: RILogo?.includes('localhost:44315') ? RILogo?.replace('https://localhost:44315', baseURL) : baseURL + RILogo }}
          style={{ width: width, height: width / 2, marginTop: 10 }}
          resizeMode='contain'
        />
        <View style={{ padding: 16 }}>
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
              {get(SalaryDTO, "SShow", "")}
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
              Ngày đăng:{moment(RJPostDate).format("DD/MM/YYYY")}
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
              Hết hạn:{moment(RJExpirationDate).format("DD/MM/YYYY")}
            </Text>
          </View>
          <Text style={{
            fontSize: 18,
            fontFamily: FontFamily.SoDoSansSemiBold,
            flex: 1,
            borderBottomWidth: 1,
            paddingBottom: 10,
            marginTop: 10
          }}>Mô tả công việc</Text>
          <RenderHTML source={{ html: RJ_Describe }} contentWidth={width}
          />
          <Text style={{
            fontSize: 18,
            fontFamily: FontFamily.SoDoSansSemiBold,
            flex: 1,
            borderBottomWidth: 1,
            paddingBottom: 10
          }}>Yêu cầu</Text>
          <RenderHTML source={{ html: RJ_Require }} contentWidth={width}

          />
          <Text style={{
            fontSize: 18,
            fontFamily: FontFamily.SoDoSansSemiBold,
            flex: 1,
            borderBottomWidth: 1,
            paddingBottom: 10
          }}>Quyền Lợi</Text>
          <RenderHTML source={{ html: RJBenefit }} contentWidth={width}


          />
          <View style={{ height: 50 }} />

        </View>
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
          onPress={() => { setIsShowAlert(true) }}
        />
      </View>
      <ModalConfirmCv onSuccess={onPostCv} isShowAlert={isShowAlert} jobDetail={jobDetail} onClose={() => setIsShowAlert(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  iconSearch: {
    width: 24,
    height: 24,
    tintColor: "white",
    marginLeft: 10,
  },
});

export default JobDetail;
