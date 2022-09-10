import { Alert, StyleSheet } from "react-native";

import Axios from "axios";
import { useDispatch } from "react-redux";
import { endLoading } from "../store/slices/user/userSlice";
import { postCvUrl } from "../api/endpoints/user";

const AxiosInstance = Axios.create({});

export const handleParameter = (props, method) => {
  const { url, body, params, baseUrl } = props;
  return {
    ...props,
    method,
    url,
    data: body,
    params,
    baseUrl,
  };
};
export const baseURL = 'https://d0f0-183-81-45-75.ngrok.io';
// base
function Request(config) {
  console.log("endpoint: nè", `${"http://localhost/8080/"}${config.url}`);
  const defaultConfig = {
    baseURL: baseURL + "/",
    timeout: 3000,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return new Promise((rs, rj) => {
    AxiosInstance.request(StyleSheet.flatten([defaultConfig, config]))
      .then((res) => {
        console.log(res.config)
        if (res.config.url == 'Account/Login') {
          if (res.data.isSuccess) {
            return rs(res.data);
          }
          Alert.alert('Error', res.data.message)
          return rj(' Network error');
        } else if (res.config.url == postCvUrl) {
          if (res.data.status === 'success') {
            Alert.alert('Thông báo', res.data.message)
            rs(res.data);
          } else {
            Alert.alert('Thông báo', res.data.message)
            rj(res.data.message);

          }
        } else {
          return rs(res.data);
        }


      })
      .catch((error) => {
        let err;
        // if (error && error.response) {
        //   err = error.response;
        // } else {
        //   err = "Network error";
        // }
        console.log({ err: error.response });


      });
  });
}

// get
async function Get(params) {
  console.log({ params });
  return Request(handleParameter(params, "GET"));
}

// post
async function Post(params) {
  return Request(handleParameter(params, "POST"));
}

// patch
async function Patch(params) {
  return Request(handleParameter(params, "PATCH"));
}

// put
async function Put(params) {
  return Request(handleParameter(params, "PUT"));
}

// delete
async function Delete(params) {
  return Request(handleParameter(params, "DELETE"));
}
async function PostFormData(param) {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const transformRequest = (data, headers) => {
    return formData;
  };
  return Request(
    handleParameter({ ...param, headers, transformRequest }, "POST")
  );
}

export const NetWorkService = {
  Get,
  Post,
  Put,
  Delete,
  Request,
  Patch,
  PostFormData,
};
