import { StyleSheet } from "react-native";

import Axios from "axios";
import { useDispatch } from "react-redux";
import { endLoading } from "../store/slices/user/userSlice";

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
export const baseURL = 'https://65c0-1-52-231-193.ngrok.io';
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
        return rs(res.data);
      })
      .catch((error) => {
        let err;
        // if (error && error.response) {
        //   err = error.response;
        // } else {
        //   err = "Network error";
        // }
        console.log({ err: error.response });

        rj(err);
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
