import { StyleSheet } from "react-native";

import Axios from "axios";

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

// base
function Request(config) {
  console.log("endpoint: nè", `${config.baseUrl}${config.url}`);
  const defaultConfig = {
    baseURL: config.baseUrl,
    timeout: 30000,
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
        if (error && error.response) {
          err = error.response;
        } else {
          err = "Network error";
        }

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

export const NetWorkService = {
  Get,
  Post,
  Put,
  Delete,
  Request,
  Patch,
};
